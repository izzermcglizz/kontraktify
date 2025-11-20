// PDF.js Configuration (guarded so if CDN gagal load, script lain tetap jalan)
if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
} else {
    console.error('pdfjsLib not loaded. PDF preview will not work until the PDF.js script loads correctly.');
}

// State
let pdfFile = null;
let pdfDoc = null;
let signers = [];
let fields = [];
let selectedSigner = null;
let selectedFieldType = null;

// Initialize
function initCreatePage() {
    try {
        initSupabase();
    } catch (e) {
        console.error('initSupabase error:', e);
    }
    setupUploadArea();
    setupSignerInput();
    setupFieldSelection();
    setupGenerateButton();
    updateStepIndicator(1);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCreatePage);
} else {
    // DOM sudah siap, langsung jalan
    initCreatePage();
}

// Upload Button Setup
function setupUploadArea() {
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('pdfFile');
    
    if (!uploadButton || !fileInput) {
        console.error('Upload elements not found');
        return;
    }
    
    // Direct click handler - trigger file input when label is clicked
    uploadButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Upload button clicked, triggering file input...');
        fileInput.click();
    });
    
    // File input change - handle file selection
    fileInput.addEventListener('change', (e) => {
        console.log('File input changed:', e.target.files);
        const file = e.target.files && e.target.files[0];
        if (file) {
            console.log('File selected:', file.name, file.type, file.size);
            handleFileUpload(file);
        } else {
            console.log('No file selected');
        }
    });
    
    console.log('Upload button setup complete');
    console.log('Upload button element:', uploadButton);
    console.log('File input element:', fileInput);
}

// Handle File Upload
async function handleFileUpload(file) {
    console.log('handleFileUpload called with:', file);
    
    if (!file) {
        console.error('No file provided');
        return;
    }
    
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        alert('File too large! Maximum 10MB');
        return;
    }
    
    pdfFile = file;
    console.log('PDF file set:', pdfFile.name);
    
    // Show file info
    const fileNameEl = document.getElementById('fileName');
    const fileSizeEl = document.getElementById('fileSize');
    const fileInfoEl = document.getElementById('fileInfo');
    
    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = formatFileSize(file.size);
    if (fileInfoEl) fileInfoEl.style.display = 'block';
    
    // Show signers section
    const signersSection = document.getElementById('signersSection');
    if (signersSection) {
        signersSection.style.display = 'block';
        console.log('Signers section shown');
    }
    
    // Update step indicator
    updateStepIndicator(1);
    updateGenerateButton();
    
    // Render PDF
    try {
        await renderPDF(file);
        console.log('PDF rendered successfully');
    } catch (error) {
        console.error('PDF rendering error:', error);
        alert('Error rendering PDF: ' + error.message);
    }
}

// Render PDF
async function renderPDF(file) {
    const pdfjs = window.pdfjsLib;
    if (!pdfjs) {
        console.error('pdfjsLib is not available. Cannot render PDF.');
        alert('PDF viewer gagal load (library PDF.js tidak tersedia).\n\nCoba:\n- Refresh halaman\n- Pastikan koneksi internet aktif\n- Atau buka lagi nanti.');
        return;
    }

    const arrayBuffer = await file.arrayBuffer();
    pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    const container = document.getElementById('pdfPages');
    const thumbContainer = document.getElementById('pageThumbnails');
    container.innerHTML = '';
    thumbContainer.innerHTML = '';
    
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        
        // Main canvas (large)
        const viewport = page.getViewport({ scale: 1.4 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'pdf-page-wrapper';
        wrapper.id = `page-${pageNum}`;
        wrapper.dataset.page = pageNum;
        wrapper.appendChild(canvas);
        container.appendChild(wrapper);
        
        await page.render({ canvasContext: context, viewport }).promise;
        
        // Setup drop zone for drag and drop
        setupDropZone(wrapper, pageNum);
        
        // Thumbnail canvas (small)
        const thumbViewport = page.getViewport({ scale: 0.2 });
        const thumbCanvas = document.createElement('canvas');
        const thumbContext = thumbCanvas.getContext('2d');
        thumbCanvas.width = thumbViewport.width;
        thumbCanvas.height = thumbViewport.height;
        thumbCanvas.style.width = '100%';
        thumbCanvas.style.height = 'auto';
        thumbCanvas.style.cursor = 'pointer';
        thumbCanvas.style.borderRadius = '6px';
        
        const thumbWrapper = document.createElement('div');
        thumbWrapper.className = 'thumbnail-item';
        thumbWrapper.appendChild(thumbCanvas);
        
        const thumbLabel = document.createElement('div');
        thumbLabel.className = 'thumbnail-label';
        thumbLabel.textContent = `Page ${pageNum}`;
        thumbWrapper.appendChild(thumbLabel);
        
        thumbWrapper.addEventListener('click', () => {
            document.getElementById(`page-${pageNum}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
            thumbWrapper.classList.add('active');
            setTimeout(() => thumbWrapper.classList.remove('active'), 1000);
        });
        
        thumbContainer.appendChild(thumbWrapper);
        
        await page.render({ canvasContext: thumbContext, viewport: thumbViewport }).promise;
    }
    
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('pdfViewer').style.display = 'block';
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Signer Input
function setupSignerInput() {
    const input = document.getElementById('signerName');
    const btn = document.getElementById('addSignerBtn');
    
    btn.addEventListener('click', addSigner);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSigner();
        }
    });
}

// Add Signer
function addSigner() {
    const input = document.getElementById('signerName');
    const name = input.value.trim();
    
    if (!name) return;
    
    const signer = {
        id: Date.now(),
        name,
        order: signers.length + 1,
        color: getSignerColor(signers.length)
    };
    
    signers.push(signer);
    input.value = '';
    
    renderSignersList();
    updateSignerDropdown();
    updateStepIndicator(2);
    updateGenerateButton();
    
    // Show fields section
    document.getElementById('fieldsSection').style.display = 'block';
    selectedSigner = signer;
    
    updateGenerateButton();
}

// Render Signers
function renderSignersList() {
    const list = document.getElementById('signersList');
    
    list.innerHTML = signers.map(signer => `
        <div class="signer-item">
            <div class="signer-badge" style="background: ${signer.color};">
                ${signer.order}
            </div>
            <div class="signer-info">
                <div class="signer-name">${signer.name}</div>
                <div class="signer-label">Signer ${signer.order}</div>
            </div>
            <button class="remove-signer" onclick="removeSigner(${signer.id})">×</button>
        </div>
    `).join('');
}

// Update Signer Dropdown
function updateSignerDropdown() {
    const dropdown = document.getElementById('currentSigner');
    const oldValue = dropdown.value;
    dropdown.innerHTML = signers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    
    // Remove old listeners and add new one
    const newDropdown = dropdown.cloneNode(true);
    dropdown.parentNode.replaceChild(newDropdown, dropdown);
    
    newDropdown.addEventListener('change', (e) => {
        selectedSigner = signers.find(s => s.id == e.target.value);
    });
    
    // Restore selection if still valid
    if (oldValue && signers.find(s => s.id == oldValue)) {
        newDropdown.value = oldValue;
        selectedSigner = signers.find(s => s.id == oldValue);
    } else if (signers.length > 0) {
        newDropdown.value = signers[0].id;
        selectedSigner = signers[0];
    }
}

// Remove Signer
window.removeSigner = function(id) {
    signers = signers.filter(s => s.id !== id);
    fields = fields.filter(f => f.signerId !== id);
    
    renderSignersList();
    updateSignerDropdown();
    renderFields();
    updateGenerateButton();
    
    if (signers.length === 0) {
        document.getElementById('fieldsSection').style.display = 'none';
        selectedSigner = null;
    } else {
        selectedSigner = signers[0];
    }
}

// Field Selection - Setup Drag and Drop
function setupFieldSelection() {
    document.querySelectorAll('.field-item').forEach(item => {
        // Drag start
        item.addEventListener('dragstart', (e) => {
            if (!selectedSigner) {
                e.preventDefault();
                alert('Please select a signer first');
                return;
            }
            selectedFieldType = item.dataset.fieldType;
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text/plain', selectedFieldType);
        });
        
        // Drag end
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });
}

// Setup Drop Zone on PDF Pages
function setupDropZone(wrapper, pageNum) {
    wrapper.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        wrapper.style.outline = '2px dashed var(--primary)';
        wrapper.style.outlineOffset = '4px';
    });
    
    wrapper.addEventListener('dragleave', () => {
        wrapper.style.outline = 'none';
    });
    
    wrapper.addEventListener('drop', (e) => {
        e.preventDefault();
        wrapper.style.outline = 'none';
        
        if (!selectedSigner || !selectedFieldType) {
            if (!selectedSigner) alert('Please select a signer first');
            if (!selectedFieldType) alert('Please drag a field from the sidebar');
            return;
        }
        
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        placeFieldAtPosition(x, y, wrapper, pageNum);
    });
}

// Place Field at Position
function placeFieldAtPosition(x, y, wrapper, pageNum) {
    const sizes = {
        signature: { width: 220, height: 70 },
        name: { width: 200, height: 40 },
        date: { width: 150, height: 40 },
        text: { width: 220, height: 40 }
    };
    
    const size = sizes[selectedFieldType];
    
    // Keep within bounds
    const maxX = wrapper.offsetWidth - size.width;
    const maxY = wrapper.offsetHeight - size.height;
    
    const field = {
        id: Date.now() + Math.random(),
        signerId: selectedSigner.id,
        signerName: selectedSigner.name,
        type: selectedFieldType,
        pageNum,
        x: Math.max(0, Math.min(x - size.width / 2, maxX)),
        y: Math.max(0, Math.min(y - size.height / 2, maxY)),
        width: size.width,
        height: size.height,
        color: selectedSigner.color
    };
    
    fields.push(field);
    renderFields();
    updateGenerateButton();
}

// Render Fields on PDF
function renderFields() {
    document.querySelectorAll('.placed-field').forEach(el => el.remove());
    
    fields.forEach(field => {
        const wrapper = document.querySelector(`.pdf-page-wrapper[data-page="${field.pageNum}"]`);
        if (!wrapper) return;
        
        const box = document.createElement('div');
        box.className = 'placed-field';
        box.dataset.fieldId = field.id;
        box.style.cssText = `
            left: ${field.x}px;
            top: ${field.y}px;
            width: ${field.width}px;
            height: ${field.height}px;
            border: 3px solid ${field.color};
            background: ${field.color}15;
            color: ${field.color};
        `;
        
        const labels = {
            signature: '✍️ Signature',
            name: '👤 Name',
            date: '📅 Date',
            text: '📝 Text'
        };
        box.innerHTML = `<span style="font-weight: 700;">${labels[field.type]}</span>`;
        
        // Delete button
        const delBtn = document.createElement('button');
        delBtn.className = 'field-delete';
        delBtn.innerHTML = '×';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeField(field.id);
        });
        
        box.appendChild(delBtn);
        
        // Make draggable
        makeDraggable(box, field, wrapper);
        
        wrapper.appendChild(box);
    });
}

// Make Field Draggable
function makeDraggable(element, field, wrapper) {
    let isDragging = false;
    let offsetX, offsetY;
    
    element.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        
        isDragging = true;
        const rect = wrapper.getBoundingClientRect();
        offsetX = e.clientX - rect.left - field.x;
        offsetY = e.clientY - rect.top - field.y;
        
        element.style.cursor = 'grabbing';
        element.style.zIndex = '999';
        e.preventDefault();
        e.stopPropagation();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const rect = wrapper.getBoundingClientRect();
        let newX = e.clientX - rect.left - offsetX;
        let newY = e.clientY - rect.top - offsetY;
        
        // Keep within bounds
        newX = Math.max(0, Math.min(newX, rect.width - field.width));
        newY = Math.max(0, Math.min(newY, rect.height - field.height));
        
        field.x = newX;
        field.y = newY;
        
        element.style.left = newX + 'px';
        element.style.top = newY + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'move';
            element.style.zIndex = 'auto';
        }
    });
}

// Remove Field
function removeField(id) {
    fields = fields.filter(f => f.id !== id);
    renderFields();
    updateGenerateButton();
}


// Step Indicator
function updateStepIndicator(step) {
    const fill = document.getElementById('stepIndicatorFill');
    const labels = document.querySelectorAll('.step-label');
    
    if (!fill) return;
    
    // Update progress (25% per step)
    const progress = (step / 4) * 100;
    fill.style.width = progress + '%';
    
    // Update active labels
    labels.forEach((label, index) => {
        if (index + 1 <= step) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
}

// Update Generate Button
function updateGenerateButton() {
    const btn = document.getElementById('generateBtn');
    const ready = pdfFile && signers.length > 0 && fields.length > 0;
    btn.disabled = !ready;
    btn.textContent = ready ? `Generate Links (${fields.length} fields)` : 'Generate Links';
    
    // Update step indicator
    if (ready) {
        updateStepIndicator(4);
    } else if (fields.length > 0) {
        updateStepIndicator(3);
    } else if (signers.length > 0) {
        updateStepIndicator(2);
    } else if (pdfFile) {
        updateStepIndicator(1);
    }
}

// Generate Links
function setupGenerateButton() {
    document.getElementById('generateBtn').addEventListener('click', generateLinks);
}

async function generateLinks() {
    if (!supabase) {
        alert('⚠️ Supabase not configured\n\nCheck SETUP_GUIDE.md to setup database');
        return;
    }
    
    document.getElementById('loadingModal').classList.add('active');
    
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
                pdf_url: upload.path
            })
            .select()
            .single();
        
        if (envErr) throw envErr;
        
        // Create recipients
        const recipients = signers.map(s => ({
            envelope_id: envelope.id,
            name: s.name,
            order_num: s.order,
            magic_token: generateToken()
        }));
        
        const { data: recs, error: recsErr } = await supabase
            .from('recipients')
            .insert(recipients)
            .select();
        
        if (recsErr) throw recsErr;
        
        // Create fields
        const fieldData = fields.map(f => {
            const rec = recs.find(r => r.order_num === signers.find(s => s.id === f.signerId).order);
            return {
                envelope_id: envelope.id,
                recipient_id: rec.id,
                field_type: f.type,
                page_num: f.pageNum,
                x: f.x,
                y: f.y,
                width: f.width,
                height: f.height
            };
        });
        
        const { error: fieldsErr } = await supabase
            .from('signature_fields')
            .insert(fieldData);
        
        if (fieldsErr) throw fieldsErr;
        
        // Generate history token
        const historyToken = window.emailSystem ? window.emailSystem.generateHistoryToken() : generateToken();
        
        // Store email if provided
        const userEmail = window.emailSystem ? window.emailSystem.getEmailFromInput() : null;
        if (userEmail && window.emailSystem) {
            await window.emailSystem.storeEmailWithDocument(userEmail, envelope.id, historyToken);
        }
        
        // Show links
        showLinksModal(recs, trackToken, envelope.id, historyToken, userEmail);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    } finally {
        document.getElementById('loadingModal').classList.remove('active');
    }
}

// Show Links Modal
function showLinksModal(recipients, trackToken, envelopeId, historyToken, userEmail) {
    const baseUrl = window.location.origin + window.location.pathname.replace('create.html', '');
    
    const html = recipients
        .sort((a, b) => a.order_num - b.order_num)
        .map(rec => {
            const signer = signers.find(s => s.order === rec.order_num);
            const link = `${baseUrl}sign.html?token=${rec.magic_token}`;
            return `
                <div class="link-box" style="border-left: 4px solid ${signer.color};">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <div class="signer-badge" style="background: ${signer.color};">${signer.order}</div>
                        <div>
                            <div style="font-weight: 700; font-size: 14px;">${rec.name}</div>
                            <div style="font-size: 12px; color: var(--text-muted);">Signer ${rec.order_num}</div>
                        </div>
                    </div>
                    <div class="link-input">
                        <input type="text" value="${link}" readonly onclick="this.select()">
                        <button class="copy-btn" onclick="copyLink(this, '${link}')">Copy</button>
                    </div>
                    <button class="btn btn-secondary btn-full" onclick="shareWhatsApp('${rec.name}', '${link}')" style="margin-top: 10px; font-size: 13px;">
                        📱 Share via WhatsApp
                    </button>
                </div>
            `;
        }).join('');
    
    // Add email input section if email system is available
    const emailSectionContainer = document.getElementById('emailInputSectionContainer');
    if (emailSectionContainer && window.emailSystem) {
        emailSectionContainer.innerHTML = window.emailSystem.createEmailInputHTML();
        window.emailSystem.showEmailInput();
    }
    
    // Store data for email sending
    window._modalData = {
        recipients,
        trackToken,
        envelopeId,
        historyToken,
        baseUrl
    };
    document.getElementById('signerLinks').innerHTML = html;
    const trackLink = `${baseUrl}status.html?token=${trackToken}`;
    document.getElementById('trackLink').value = trackLink;
    
    // Store track link in modal data
    if (window._modalData) {
        window._modalData.trackLink = trackLink;
    }
    
    document.getElementById('linksModal').classList.add('active');
}

// Copy Link
window.copyLink = async function(btn, link) {
    try {
        await navigator.clipboard.writeText(link);
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        btn.previousElementSibling.select();
        document.execCommand('copy');
        btn.textContent = '✓ Copied';
    }
}

window.copyTrackLink = function() {
    const input = document.getElementById('trackLink');
    copyLink(input.nextElementSibling, input.value);
}

window.shareWhatsApp = function(name, link) {
    const msg = encodeURIComponent(`Hi ${name}, please sign this document: ${link}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
}

window.closeLinksModal = async function() {
    // Send email if email was provided
    if (window._modalData && window.emailSystem) {
        const userEmail = window.emailSystem.getEmailFromInput();
        if (userEmail) {
            try {
                const signerLinks = window._modalData.recipients.map(rec => {
                    const signer = signers.find(s => s.order === rec.order_num);
                    return {
                        name: rec.name,
                        url: `${window._modalData.baseUrl}sign.html?token=${rec.magic_token}`
                    };
                });
                
                const historyLink = `${window.location.origin}/sign/history.html?token=${window._modalData.historyToken}`;
                
                await window.emailSystem.sendEmailWithLinks(
                    userEmail,
                    signerLinks,
                    window._modalData.trackLink,
                    historyLink
                );
            } catch (error) {
                console.error('Error sending email:', error);
                // Don't block modal close if email fails
            }
        }
    }
    
    // Clear modal data
    window._modalData = null;
    
    document.getElementById('linksModal').classList.remove('active');
    if (confirm('Create another document?')) window.location.reload();
}

// Helpers
function getSignerColor(index) {
    const colors = ['#0066cc', '#dc3545', '#6f42c1', '#20c997', '#fd7e14', '#28a745'];
    return colors[index % colors.length];
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
