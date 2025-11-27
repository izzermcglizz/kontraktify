// eSign Builder - New Horizontal Layout
// This replaces the old create.js functionality with the new design

// PDF.js Configuration
if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// State
let pdfFile = null;
let pdfDoc = null;
let pdfPages = [];
let signers = [];
let fields = [];
let currentSigner = null;
let currentPage = 1;
let currentZoom = 1.0;
let selectedField = null;
let dragState = {
    isDragging: false,
    fieldType: null,
    ghostElement: null
};

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    // Check if Supabase is initialized
    if (typeof supabase === 'undefined') {
        if (typeof initSupabase === 'function') {
            initSupabase();
        } else {
            console.error('Supabase not initialized');
            return;
        }
    }
    
    // Check authentication
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
            window.location.href = 'login.html';
            return;
        }
    } catch (e) {
        console.error('Auth check error:', e);
        // Continue anyway for development
    }
    
    // Check if loading a draft from URL
    const urlParams = new URLSearchParams(window.location.search);
    const envelopeId = urlParams.get('envelope');
    
    if (envelopeId) {
        await loadDraft(envelopeId);
    } else {
        // Load data from previous step
        const recipientsData = sessionStorage.getItem('esign_recipients');
        if (recipientsData) {
            recipients = JSON.parse(recipientsData);
            renderSignersList();
            if (recipients.length > 0) {
                selectSigner(recipients[0]);
            }
        } else {
            // Add default signer if none exists
            const defaultSigner = {
                id: 'signer_' + Date.now(),
                name: 'Signer 1',
                email: '',
                order: 1
            };
            signers.push(defaultSigner);
            selectSigner(defaultSigner);
            renderSignersList();
        }
    }
    
    // Setup functionality
    setupFieldDragAndDrop();
    setupCanvasDropZone();
    setupFieldProperties();
    setupDocumentControls();
    
    // Try to load PDF if available
    const pdfData = sessionStorage.getItem('esign_pdf_file');
    if (pdfData) {
        // Note: File object can't be stored in sessionStorage
        // Would need to use IndexedDB or pass file differently
        // For now, show empty state with message
    }
});

// Setup field drag and drop from toolbox
function setupFieldDragAndDrop() {
    const fieldItems = document.querySelectorAll('.field-item[draggable="true"]');
    
    fieldItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            const fieldType = item.getAttribute('data-field-type');
            dragState.isDragging = true;
            dragState.fieldType = fieldType;
            
            // Create ghost element
            dragState.ghostElement = item.cloneNode(true);
            dragState.ghostElement.classList.add('drag-ghost');
            document.body.appendChild(dragState.ghostElement);
            
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', fieldType);
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', (e) => {
            dragState.isDragging = false;
            dragState.fieldType = null;
            item.classList.remove('dragging');
            if (dragState.ghostElement) {
                dragState.ghostElement.remove();
                dragState.ghostElement = null;
            }
        });
    });
}

// Setup canvas drop zone
function setupCanvasDropZone() {
    const canvasArea = document.getElementById('canvasArea');
    
    canvasArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        canvasArea.classList.add('drag-over');
        
        // Update ghost position
        if (dragState.ghostElement) {
            dragState.ghostElement.style.left = e.clientX + 'px';
            dragState.ghostElement.style.top = e.clientY + 'px';
        }
    });
    
    canvasArea.addEventListener('dragleave', (e) => {
        canvasArea.classList.remove('drag-over');
    });
    
    canvasArea.addEventListener('drop', (e) => {
        e.preventDefault();
        canvasArea.classList.remove('drag-over');
        
        if (!dragState.fieldType || !pdfDoc) return;
        
        // Get drop position relative to document page
        const pageElement = document.querySelector('.document-page');
        if (!pageElement) return;
        
        const rect = pageElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create field at drop position
        createFieldOnDocument(dragState.fieldType, x, y, currentPage);
    });
}

// Create field on document
function createFieldOnDocument(fieldType, x, y, pageNum) {
    if (!currentSigner) {
        alert('Please select a signer first');
        return;
    }
    
    const fieldId = 'field_' + Date.now();
    const field = {
        id: fieldId,
        type: fieldType,
        pageNum: pageNum,
        x: x / currentZoom,
        y: y / currentZoom,
        width: getDefaultFieldWidth(fieldType),
        height: getDefaultFieldHeight(fieldType),
        signerId: currentSigner.id,
        signerName: currentSigner.name,
        label: getDefaultFieldLabel(fieldType),
        required: true,
        placeholder: ''
    };
    
    fields.push(field);
    renderFieldOnDocument(field);
    updateFieldCounts();
    selectField(field);
}

// Get default field dimensions
function getDefaultFieldWidth(type) {
    const widths = {
        signature: 200,
        initials: 100,
        name: 150,
        date: 120,
        email: 180,
        text: 200,
        checkbox: 20
    };
    return widths[type] || 150;
}

function getDefaultFieldHeight(type) {
    const heights = {
        signature: 60,
        initials: 40,
        name: 30,
        date: 30,
        email: 30,
        text: 30,
        checkbox: 20
    };
    return heights[type] || 30;
}

function getDefaultFieldLabel(type) {
    const labels = {
        signature: 'Signature',
        initials: 'Initials',
        name: 'Name',
        date: 'Date',
        email: 'Email',
        text: 'Text',
        checkbox: 'Checkbox'
    };
    return labels[type] || 'Field';
}

// Render field on document
function renderFieldOnDocument(field) {
    const pageElement = document.querySelector(`.document-page[data-page="${field.pageNum}"]`);
    if (!pageElement) return;
    
    const pageContent = pageElement.querySelector('.page-content');
    if (!pageContent) return;
    
    const fieldElement = document.createElement('div');
    fieldElement.className = 'field-on-document';
    fieldElement.setAttribute('data-field-id', field.id);
    fieldElement.setAttribute('data-field-type', field.type);
    fieldElement.style.left = (field.x * currentZoom) + 'px';
    fieldElement.style.top = (field.y * currentZoom) + 'px';
    fieldElement.style.width = (field.width * currentZoom) + 'px';
    fieldElement.style.height = (field.height * currentZoom) + 'px';
    fieldElement.textContent = `${field.label} - ${field.signerName}`;
    
    fieldElement.addEventListener('click', (e) => {
        e.stopPropagation();
        selectField(field);
    });
    
    pageContent.appendChild(fieldElement);
}

// Select field
function selectField(field) {
    // Remove previous selection
    document.querySelectorAll('.field-on-document').forEach(el => {
        el.classList.remove('active');
    });
    
    selectedField = field;
    
    // Highlight selected field
    const fieldElement = document.querySelector(`[data-field-id="${field.id}"]`);
    if (fieldElement) {
        fieldElement.classList.add('active');
    }
    
    // Show field properties
    showFieldProperties(field);
}

// Show field properties panel
function showFieldProperties(field) {
    const propsPanel = document.getElementById('fieldProperties');
    propsPanel.style.display = 'block';
    
    document.getElementById('fieldLabel').value = field.label;
    document.getElementById('fieldPlaceholder').value = field.placeholder || '';
    document.getElementById('fieldRequired').checked = field.required;
    
    // Update signer dropdown
    const signerSelect = document.getElementById('fieldSigner');
    signerSelect.innerHTML = signers.map(s => 
        `<option value="${s.id}" ${s.id === field.signerId ? 'selected' : ''}>${s.name}</option>`
    ).join('');
    
    // Setup property change listeners
    document.getElementById('fieldLabel').onchange = (e) => {
        field.label = e.target.value;
        updateFieldDisplay(field);
    };
    
    document.getElementById('fieldSigner').onchange = (e) => {
        const signer = signers.find(s => s.id === e.target.value);
        if (signer) {
            field.signerId = signer.id;
            field.signerName = signer.name;
            updateFieldDisplay(field);
        }
    };
    
    document.getElementById('fieldRequired').onchange = (e) => {
        field.required = e.target.checked;
        updateFieldCounts();
    };
    
    document.getElementById('fieldPlaceholder').onchange = (e) => {
        field.placeholder = e.target.value;
    };
}

// Update field display
function updateFieldDisplay(field) {
    const fieldElement = document.querySelector(`[data-field-id="${field.id}"]`);
    if (fieldElement) {
        fieldElement.textContent = `${field.label} - ${field.signerName}`;
    }
}

// Setup signers list
function setupSignersList() {
    // Will be populated when signers are loaded
}

// Add signer
window.addSigner = function() {
    const name = prompt('Enter signer name:');
    if (!name) return;
    
    const email = prompt('Enter signer email:');
    if (!email) return;
    
    const signer = {
        id: 'signer_' + Date.now(),
        name: name,
        email: email,
        order: signers.length + 1
    };
    
    signers.push(signer);
    renderSignersList();
    selectSigner(signer);
};

// Render signers list
function renderSignersList() {
    const signersList = document.getElementById('signersList');
    signersList.innerHTML = signers.map(signer => `
        <div class="signer-item ${signer.id === currentSigner?.id ? 'active' : ''}" 
             onclick="selectSignerById('${signer.id}')">
            <div class="signer-avatar">${signer.name.charAt(0).toUpperCase()}</div>
            <div class="signer-info">
                <div class="signer-name">${signer.name}</div>
                <div class="signer-role">Signer ${signer.order}</div>
            </div>
        </div>
    `).join('');
}

// Select signer
window.selectSignerById = function(signerId) {
    const signer = signers.find(s => s.id === signerId);
    if (signer) {
        currentSigner = signer;
        renderSignersList();
    }
};

function selectSigner(signer) {
    currentSigner = signer;
    renderSignersList();
}

// Setup field properties panel
function setupFieldProperties() {
    // Handled in showFieldProperties
}

// Setup document controls
function setupDocumentControls() {
    // Zoom controls
    window.zoomIn = function() {
        currentZoom = Math.min(currentZoom + 0.1, 2.0);
        updateZoom();
    };
    
    window.zoomOut = function() {
        currentZoom = Math.max(currentZoom - 0.1, 0.5);
        updateZoom();
    };
    
    window.fitToWidth = function() {
        // Implement fit to width
        console.log('Fit to width');
    };
    
    window.fitToPage = function() {
        // Implement fit to page
        console.log('Fit to page');
    };
}

// Update zoom
function updateZoom() {
    const zoomValueEl = document.getElementById('zoomValue');
    if (zoomValueEl) {
        zoomValueEl.textContent = Math.round(currentZoom * 100) + '%';
    }
    
    // Update document scale
    document.querySelectorAll('.document-page').forEach(page => {
        page.style.transform = `scale(${currentZoom})`;
        page.style.transformOrigin = 'top center';
    });
    
    // Update field positions
    fields.forEach(field => {
        updateFieldDisplay(field);
    });
}

// Update field counts and warnings
function updateFieldCounts() {
    const requiredFields = fields.filter(f => f.required);
    const totalRequired = requiredFields.length;
    
    const warningText = document.getElementById('warningText');
    const warningMessage = document.getElementById('warningMessage');
    const reviewBtn = document.getElementById('reviewBtn');
    const sendBtn = document.getElementById('sendBtn');
    
    if (totalRequired === 0) {
        warningText.style.display = 'none';
        reviewBtn.disabled = false;
        sendBtn.disabled = false;
    } else {
        warningText.style.display = 'flex';
        warningMessage.textContent = `${totalRequired} required field${totalRequired > 1 ? 's' : ''} missing`;
        reviewBtn.disabled = true;
        sendBtn.disabled = true;
    }
}

// Preview as signer
window.previewAsSigner = function() {
    alert('Preview mode - coming soon!');
};

// Save draft
window.saveDraft = async function() {
    if (!supabase) {
        alert('⚠️ Supabase not configured');
        return;
    }
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        alert('⚠️ Anda harus login terlebih dahulu');
        return;
    }
    
    if (!pdfFile) {
        alert('Please upload a PDF first');
        return;
    }
    
    try {
        // Check if we're updating an existing draft
        const urlParams = new URLSearchParams(window.location.search);
        const envelopeId = urlParams.get('envelope');
        
        let pdfUrl = null;
        
        if (envelopeId) {
            // Get existing PDF URL
            const { data: existing } = await supabase
                .from('envelopes')
                .select('pdf_url')
                .eq('id', envelopeId)
                .single();
            
            if (existing && existing.pdf_url) {
                pdfUrl = existing.pdf_url;
            }
        }
        
        // Upload PDF if not already uploaded
        if (!pdfUrl) {
            const fileName = `${Date.now()}_${pdfFile.name}`;
            const { data: upload, error: uploadErr } = await supabase.storage
                .from('documents')
                .upload(fileName, pdfFile);
            
            if (uploadErr) throw uploadErr;
            pdfUrl = upload.path;
        }
        
        // Create or update envelope as draft
        const envelopeData = {
            title: pdfFile.name,
            pdf_url: pdfUrl,
            user_id: user.id,
            status: 'draft',
            updated_at: new Date().toISOString()
        };
        
        let envelope;
        if (envelopeId) {
            // Update existing
            const { data, error: envErr } = await supabase
                .from('envelopes')
                .update(envelopeData)
                .eq('id', envelopeId)
                .select()
                .single();
            
            if (envErr) throw envErr;
            envelope = data;
        } else {
            // Create new
            const { data, error: envErr } = await supabase
                .from('envelopes')
                .insert(envelopeData)
                .select()
                .single();
            
            if (envErr) throw envErr;
            envelope = data;
            
            // Update URL to include envelope ID
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('envelope', envelope.id);
            window.history.replaceState({}, '', newUrl);
        }
        
        // Save recipients
        if (signers.length > 0) {
            // Delete existing recipients
            await supabase
                .from('recipients')
                .delete()
                .eq('envelope_id', envelope.id);
            
            // Insert new recipients
            const recipientData = signers.map(s => ({
                envelope_id: envelope.id,
                name: s.name,
                email: s.email,
                order_num: s.order,
                role: s.role || 'signer'
            }));
            
            await supabase
                .from('recipients')
                .insert(recipientData);
        }
        
        // Save fields
        if (fields.length > 0) {
            // Delete existing fields
            await supabase
                .from('signature_fields')
                .delete()
                .eq('envelope_id', envelope.id);
            
            // Get recipients for field mapping
            const { data: recs } = await supabase
                .from('recipients')
                .select('id, order_num')
                .eq('envelope_id', envelope.id);
            
            if (recs) {
                const fieldData = fields.map(f => {
                    const rec = recs.find(r => r.order_num === (signers.find(s => s.id === f.signerId)?.order || 1));
                    return {
                        envelope_id: envelope.id,
                        recipient_id: rec?.id || null,
                        field_type: f.type,
                        page_num: f.pageNum,
                        x: f.x,
                        y: f.y,
                        width: f.width,
                        height: f.height,
                        label: f.label,
                        required: f.required,
                        placeholder: f.placeholder
                    };
                });
                
                await supabase
                    .from('signature_fields')
                    .insert(fieldData);
            }
        }
        
        alert('✅ Draft saved successfully!');
        
    } catch (error) {
        console.error('Error saving draft:', error);
        alert('Error saving draft: ' + error.message);
    }
};

// Review & Send
window.addEventListener('DOMContentLoaded', function() {
    const reviewBtn = document.getElementById('reviewBtn');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            if (fields.length === 0) {
                alert('Please add at least one field');
                return;
            }
            
            // Save current state
            sessionStorage.setItem('esign_fields', JSON.stringify(fields));
            sessionStorage.setItem('esign_sign_in_order', document.getElementById('signInOrder')?.checked || false);
            sessionStorage.setItem('esign_reminder', document.getElementById('reminderSetting')?.value || 'Send reminders every 3 days');
            sessionStorage.setItem('esign_expiration', document.getElementById('expirationSetting')?.value || 'Expires in 7 days');
            
            // Navigate to review page
            window.location.href = 'review-send.html';
        });
    }
});

// Send for signature (disabled on step 2, redirects to review)
window.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.disabled = true; // Disabled on step 2, should go to review first
        sendBtn.addEventListener('click', function() {
            // Redirect to review page instead
            const reviewBtn = document.getElementById('reviewBtn');
            if (reviewBtn && !reviewBtn.disabled) {
                reviewBtn.click();
            }
        });
    }
});

// Generate links (called from review-send page)
async function generateLinks() {
    if (!supabase) {
        alert('⚠️ Supabase not configured');
        return;
    }
    
    // Get current user and email from session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        alert('⚠️ Anda harus login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }
    
    const userEmail = user.email;
    const userId = user.id;
    
    if (!pdfFile) {
        alert('Please upload a PDF first');
        return;
    }
    
    if (signers.length === 0) {
        alert('Please add at least one signer');
        return;
    }
    
    if (fields.length === 0) {
        alert('Please add at least one field');
        return;
    }
    
    // Show loading
    const loadingModal = document.getElementById('loadingModal');
    if (loadingModal) loadingModal.classList.add('active');
    
    try {
        // Upload PDF
        const fileName = `${Date.now()}_${pdfFile.name}`;
        const { data: upload, error: uploadErr } = await supabase.storage
            .from('documents')
            .upload(fileName, pdfFile);
        
        if (uploadErr) throw uploadErr;
        
        // Create envelope
        const trackToken = generateToken();
        const { data: envelope, error: envErr } = await supabase
            .from('envelopes')
            .insert({
                title: pdfFile.name,
                track_token: trackToken,
                pdf_url: upload.path,
                user_id: userId,
                status: 'sent'
            })
            .select()
            .single();
        
        if (envErr) throw envErr;
        
        // Create recipients
        const recipientData = signers.map(s => ({
            envelope_id: envelope.id,
            name: s.name,
            email: s.email,
            order_num: s.order,
            magic_token: generateToken(),
            role: s.role || 'signer'
        }));
        
        const { data: recs, error: recsErr } = await supabase
            .from('recipients')
            .insert(recipientData)
            .select();
        
        if (recsErr) throw recsErr;
        
        // Create fields
        const fieldData = fields.map(f => {
            const rec = recs.find(r => r.order_num === (signers.find(s => s.id === f.signerId)?.order || 1));
            return {
                envelope_id: envelope.id,
                recipient_id: rec.id,
                field_type: f.type,
                page_num: f.pageNum,
                x: f.x,
                y: f.y,
                width: f.width,
                height: f.height,
                label: f.label,
                required: f.required,
                placeholder: f.placeholder
            };
        });
        
        const { error: fieldsErr } = await supabase
            .from('signature_fields')
            .insert(fieldData);
        
        if (fieldsErr) throw fieldsErr;
        
        // Generate history token
        const historyToken = generateToken();
        
        // Store email with document
        if (window.emailSystem) {
            await window.emailSystem.storeEmailWithDocument(userEmail, envelope.id, historyToken);
        }
        
        // Prepare links for email
        const baseUrl = window.location.origin + window.location.pathname.replace('create.html', '').replace('review-send.html', '');
        const trackLink = `${baseUrl}tracking.html?token=${trackToken}`;
        const historyLink = `${baseUrl}history.html?token=${historyToken}`;
        
        const signerLinksForEmail = recs
            .sort((a, b) => a.order_num - b.order_num)
            .map(rec => {
                const link = `${baseUrl}sign.html?token=${rec.magic_token}`;
                return {
                    name: rec.name,
                    url: link
                };
            });
        
        // Send email with links
        if (window.emailSystem) {
            await window.emailSystem.sendEmailWithLinks(
                userEmail,
                signerLinksForEmail,
                trackLink,
                historyLink
            );
        }
        
        // Redirect to tracking page
        window.location.href = `tracking.html?token=${trackToken}`;
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    } finally {
        const loadingModal = document.getElementById('loadingModal');
        if (loadingModal) loadingModal.classList.remove('active');
    }
}

// Update document name
function updateDocumentName(name) {
    const docNameEl = document.getElementById('documentName');
    if (docNameEl) {
        docNameEl.textContent = name;
    }
}

// Load draft
async function loadDraft(envelopeId) {
    if (!supabase) return;
    
    try {
        const { data: envelope, error: envErr } = await supabase
            .from('envelopes')
            .select('*, recipients(*), signature_fields(*)')
            .eq('id', envelopeId)
            .single();
        
        if (envErr) throw envErr;
        
        // Load PDF
        if (envelope.pdf_url) {
            const { data: pdfBlob, error: pdfErr } = await supabase.storage
                .from('documents')
                .download(envelope.pdf_url);
            
            if (!pdfErr && pdfBlob) {
                const file = new File([pdfBlob], envelope.title || 'document.pdf', { type: 'application/pdf' });
                pdfFile = file;
                await loadPDF(file);
            }
        }
        
        // Load recipients
        if (envelope.recipients && envelope.recipients.length > 0) {
            recipients = envelope.recipients.map((r, index) => ({
                id: r.id,
                name: r.name,
                email: r.email,
                order: r.order_num || index + 1,
                role: r.role || 'signer'
            }));
            renderSignersList();
            if (recipients.length > 0) {
                selectSigner(recipients[0]);
            }
        }
        
        // Load fields
        if (envelope.signature_fields && envelope.signature_fields.length > 0) {
            fields = envelope.signature_fields.map(f => {
                const recipient = recipients.find(r => r.id === f.recipient_id);
                return {
                    id: f.id,
                    type: f.field_type,
                    pageNum: f.page_num,
                    x: f.x,
                    y: f.y,
                    width: f.width,
                    height: f.height,
                    signerId: f.recipient_id,
                    signerName: recipient?.name || 'Unknown',
                    label: f.label,
                    required: f.required,
                    placeholder: f.placeholder || ''
                };
            });
            
            // Render fields after PDF is loaded
            setTimeout(() => {
                fields.forEach(field => {
                    renderFieldOnDocument(field);
                });
                updateFieldCounts();
            }, 500);
        }
        
        updateDocumentName(envelope.title || 'Untitled Document');
        
    } catch (error) {
        console.error('Error loading draft:', error);
        alert('Error loading draft: ' + error.message);
    }
}

// Handle PDF upload
window.handlePDFUpload = function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        loadPDF(file);
    } else {
        alert('Please select a PDF file');
    }
};

// Load PDF (this will be called when user uploads or from previous step)
window.loadPDF = async function(file) {
    if (!file) {
        // Try to get from sessionStorage or previous step
        const pdfData = sessionStorage.getItem('esign_pdf_file');
        if (!pdfData) {
            // Show empty state
            return;
        }
        // Would need to handle file retrieval differently
        return;
    }
    
    pdfFile = file;
    updateDocumentName(file.name);
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        // Hide empty state
        const emptyState = document.getElementById('emptyState');
        const documentPages = document.getElementById('documentPages');
        if (emptyState) emptyState.style.display = 'none';
        if (documentPages) documentPages.style.display = 'flex';
        
        // Render all pages
        await renderAllPages();
        
        // Update page selector
        const pageSelector = document.getElementById('pageSelector');
        if (pageSelector) {
            pageSelector.innerHTML = '';
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `Page ${i} of ${pdfDoc.numPages}`;
                pageSelector.appendChild(option);
            }
        }
        
    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF: ' + error.message);
    }
};

// Render all pages
async function renderAllPages() {
    const container = document.getElementById('documentPages');
    container.innerHTML = '';
    
    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 });
        
        const pageDiv = document.createElement('div');
        pageDiv.className = 'document-page';
        pageDiv.setAttribute('data-page', i);
        pageDiv.style.width = viewport.width + 'px';
        pageDiv.style.height = viewport.height + 'px';
        
        const pageContent = document.createElement('div');
        pageContent.className = 'page-content';
        pageContent.style.width = '100%';
        pageContent.style.height = '100%';
        pageContent.style.position = 'relative';
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
        
        pageContent.appendChild(canvas);
        pageDiv.appendChild(pageContent);
        container.appendChild(pageDiv);
    }
}

// Note: Need to add upload functionality to left panel
// This can be a button at the top of the left panel

