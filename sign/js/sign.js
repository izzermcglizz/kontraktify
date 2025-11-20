// PDF.js Configuration
if (typeof pdfjsLib !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
} else {
    console.error('PDF.js library not loaded!');
}

// State
let recipient = null;
let envelope = null;
let fields = [];
let currentFieldIndex = 0;
let signaturePad = null;
let currentTab = 'draw';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded');
    console.log('Libraries check:', {
        supabase: typeof window.supabase !== 'undefined',
        pdfjsLib: typeof pdfjsLib !== 'undefined',
        SignaturePad: typeof SignaturePad !== 'undefined',
        PDFLib: typeof PDFLib !== 'undefined'
    });
    
    // Wait a bit for libraries to fully load
    setTimeout(async () => {
        try {
            await loadDocument();
        } catch (error) {
            console.error('Fatal error in loadDocument:', error);
            const loadingState = document.getElementById('loadingState');
            if (loadingState) {
                loadingState.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <h2 style="color: #ef4444;">Error Loading Document</h2>
                        <p>${error.message}</p>
                        <p style="font-size: 12px; color: #666; margin-top: 20px;">Check browser console (F12) for details</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 20px;">Refresh Page</button>
                    </div>
                `;
            }
        }
    }, 100);
});

// Load Document
async function loadDocument() {
    console.log('Starting loadDocument...');
    try {
        const token = new URLSearchParams(window.location.search).get('token');
        console.log('Token:', token);
        
        if (!token) {
            console.error('No token provided');
            showInvalidState();
            return;
        }
        
        // Initialize Supabase
        console.log('Initializing Supabase...');
        if (!initSupabase()) {
            console.error('Failed to initialize Supabase');
            alert('Configuration error. Please contact support.');
            return;
        }
        console.log('Supabase initialized');
        
        // Fetch recipient
        console.log('Fetching recipient...');
        const { data: recData, error: recErr } = await supabase
            .from('recipients')
            .select('*, envelopes(*)')
            .eq('magic_token', token)
            .single();
        
        console.log('Recipient fetch result:', { recData, recErr });
        
        if (recErr) {
            console.error('Error fetching recipient:', recErr);
            showInvalidState();
            return;
        }
        
        if (!recData) {
            console.error('Recipient not found');
            showInvalidState();
            return;
        }
        
        recipient = recData;
        envelope = recData.envelopes;
        console.log('Recipient and envelope loaded:', { recipient, envelope });
        
        if (!envelope) {
            console.error('Envelope not found in recipient data');
            showInvalidState();
            return;
        }
        
        // Check if already signed
        if (recipient.status === 'signed') {
            showSignedState();
            return;
        }
        
        // Fetch fields
        console.log('Fetching signature fields for recipient:', recipient.id);
        const { data: fieldsData, error: fieldsErr } = await supabase
            .from('signature_fields')
            .select('*')
            .eq('recipient_id', recipient.id)
            .order('page_num', { ascending: true });
        
        console.log('Fields fetch result:', { fieldsData, fieldsErr });
        
        if (fieldsErr) {
            console.error('Error fetching fields:', fieldsErr);
        }
        
        fields = (fieldsData || []).map(f => ({ ...f, filled: false }));
        console.log('Fields loaded:', fields.length);
        
        // Display
        const signerNameEl = document.getElementById('signerName');
        const docTitleEl = document.getElementById('docTitle');
        if (signerNameEl) signerNameEl.textContent = recipient.name;
        if (docTitleEl) docTitleEl.textContent = envelope.title;
        
        // Render PDF
        try {
            await renderPDF();
        } catch (pdfError) {
            console.error('Error rendering PDF:', pdfError);
            alert('Failed to load PDF. Please try again.');
            showInvalidState();
            return;
        }
        
        // Setup
        try {
            setupSignatureModal();
            setupNavigation();
        } catch (setupError) {
            console.error('Error setting up UI:', setupError);
        }
        
        // Show content
        const loadingState = document.getElementById('loadingState');
        const mainContent = document.getElementById('mainContent');
        if (loadingState) loadingState.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        
        updateProgress();
        
    } catch (error) {
        console.error('Error loading document:', error);
        alert('Error loading document: ' + error.message);
        showInvalidState();
    }
}

// Render PDF
async function renderPDF() {
    console.log('Starting renderPDF...');
    console.log('Envelope:', envelope);
    
    if (!envelope || !envelope.pdf_url) {
        console.error('PDF URL not found in envelope:', envelope);
        throw new Error('PDF URL not found');
    }
    
    console.log('PDF URL:', envelope.pdf_url);
    const { data } = supabase.storage.from('documents').getPublicUrl(envelope.pdf_url);
    console.log('Public URL data:', data);
    
    if (!data || !data.publicUrl) {
        console.error('Failed to get public URL:', data);
        throw new Error('Failed to get PDF URL');
    }
    
    const pdfUrl = data.publicUrl;
    console.log('Loading PDF from:', pdfUrl);
    
    const container = document.getElementById('pdfPages');
    if (!container) {
        console.error('PDF container element not found');
        throw new Error('PDF container not found');
    }
    
    container.innerHTML = '';
    
    // Check if PDF.js is loaded
    if (typeof pdfjsLib === 'undefined') {
        console.error('PDF.js library not loaded!');
        throw new Error('PDF.js library not loaded. Please refresh the page.');
    }
    
    let pdf;
    try {
        console.log('Calling pdfjsLib.getDocument...');
        pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        console.log('PDF loaded, pages:', pdf.numPages);
    } catch (error) {
        console.error('Error loading PDF:', error);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        throw new Error('Failed to load PDF: ' + error.message);
    }
    
    if (!pdf || !pdf.numPages) {
        console.error('Invalid PDF:', pdf);
        throw new Error('Invalid PDF document');
    }
    
    console.log('Rendering', pdf.numPages, 'pages...');
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        try {
            console.log(`Rendering page ${pageNum}/${pdf.numPages}...`);
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.4 });
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            const wrapper = document.createElement('div');
            wrapper.className = 'pdf-page-wrapper';
            wrapper.appendChild(canvas);
            container.appendChild(wrapper);
            
            console.log(`Rendering page ${pageNum} to canvas...`);
            await page.render({ canvasContext: ctx, viewport }).promise;
            console.log(`Page ${pageNum} rendered successfully`);
            
            // Add field overlays
            const pageFields = fields.filter(f => f.page_num === pageNum);
            pageFields.forEach((field, idx) => {
                const fieldIndex = fields.indexOf(field);
                const box = document.createElement('div');
                box.className = 'signature-field';
                box.id = `field-${fieldIndex}`;
                box.dataset.fieldId = field.id; // Store field ID for reference
                box.style.cssText = `
                    position: absolute;
                    left: ${field.x}px;
                    top: ${field.y}px;
                    width: ${field.width}px;
                    height: ${field.height}px;
                    cursor: pointer;
                `;
                
                // If field already has signature data, show it
                if (field.signatureData || field.signature_data) {
                    const sigData = field.signatureData || field.signature_data;
                    if (sigData.startsWith('data:image')) {
                        box.innerHTML = `<img src="${sigData}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;">`;
                    } else {
                        box.textContent = sigData;
                    }
                    box.classList.add('completed');
                } else {
                    const labels = {
                        signature: '✍️ Click to sign',
                        name: '👤 Your name',
                        date: '📅 Date',
                        text: '📝 Enter text'
                    };
                    box.textContent = labels[field.field_type] || 'Click to fill';
                }
                
                box.addEventListener('click', () => openSignatureModal(fieldIndex));
                wrapper.appendChild(box);
            });
        } catch (pageError) {
            console.error(`Error rendering page ${pageNum}:`, pageError);
        }
    }
}

// Show States
function showInvalidState() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('invalidState').style.display = 'block';
}

function showSignedState() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('signedState').style.display = 'block';
    document.getElementById('signedDate').textContent = new Date(recipient.signed_at).toLocaleString('id-ID');
}

// Setup Signature Modal
function setupSignatureModal() {
    const canvas = document.getElementById('signatureCanvas');
    signaturePad = new SignaturePad(canvas, {
        backgroundColor: '#fafafa',
        penColor: '#0a0a0a',
        minWidth: 1,
        maxWidth: 3
    });
    
    document.getElementById('typedSignature').addEventListener('input', (e) => {
        document.getElementById('signaturePreview').textContent = e.target.value;
    });
    
    document.getElementById('signatureUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File too large! Max 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.getElementById('uploadedSignature');
                img.src = event.target.result;
                img.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

// Setup Navigation
function setupNavigation() {
    document.getElementById('startBtn').addEventListener('click', () => {
        currentFieldIndex = 0;
        navigateToField(0);
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentFieldIndex > 0) navigateToField(currentFieldIndex - 1);
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentFieldIndex < fields.length - 1) navigateToField(currentFieldIndex + 1);
    });
    
    document.getElementById('completeBtn').addEventListener('click', completeSignature);
}

// Navigate to Field
function navigateToField(index) {
    currentFieldIndex = index;
    
    const fieldBox = document.getElementById(`field-${index}`);
    if (fieldBox) {
        fieldBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    if (!fields[index].filled) {
        setTimeout(() => openSignatureModal(index), 300);
    }
    
    updateProgress();
}

// Open Signature Modal
async function openSignatureModal(idx) {
    currentFieldIndex = idx;
    const field = fields[idx];
    
    if (field.field_type === 'date') {
        const today = new Date().toLocaleDateString('id-ID');
        field.signatureData = today;
        field.filled = true;
        
        // Save to database
        try {
            await supabase
                .from('signature_fields')
                .update({ signature_data: today })
                .eq('id', field.id);
        } catch (error) {
            console.warn('Failed to save date to database:', error);
        }
        
        const box = document.getElementById(`field-${idx}`);
        if (box) {
            box.textContent = today;
            box.classList.add('completed');
            box.style.border = '2px solid #10b981';
            box.style.background = '#ffffff';
        }
        
        updateProgress();
        if (idx < fields.length - 1) setTimeout(() => navigateToField(idx + 1), 500);
    } else if (field.field_type === 'name' || field.field_type === 'text') {
        // For name and text fields, open a simple input modal
        const text = prompt(`Enter ${field.field_type === 'name' ? 'your name' : 'text'}:`);
        if (text && text.trim()) {
            field.signatureData = text.trim();
            field.filled = true;
            
            // Save to database
            try {
                await supabase
                    .from('signature_fields')
                    .update({ signature_data: text.trim() })
                    .eq('id', field.id);
            } catch (error) {
                console.warn('Failed to save text to database:', error);
            }
            
            const box = document.getElementById(`field-${idx}`);
            if (box) {
                box.textContent = text.trim();
                box.classList.add('completed');
                box.style.border = '2px solid #10b981';
                box.style.background = '#ffffff';
            }
            
            updateProgress();
            if (idx < fields.length - 1) setTimeout(() => navigateToField(idx + 1), 300);
        }
    } else {
        document.getElementById('signatureModal').classList.add('active');
    }
}

// Switch Tab
window.switchTab = function(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('drawTab').style.display = tab === 'draw' ? 'block' : 'none';
    document.getElementById('typeTab').style.display = tab === 'type' ? 'block' : 'none';
    document.getElementById('uploadTab').style.display = tab === 'upload' ? 'block' : 'none';
}

window.clearSignature = function() {
    if (signaturePad) signaturePad.clear();
}

window.closeSignatureModal = function() {
    document.getElementById('signatureModal').classList.remove('active');
}

// Confirm Signature
window.confirmSignature = async function() {
    let sigData = null;
    
    if (currentTab === 'draw') {
        if (signaturePad.isEmpty()) {
            alert('Please draw your signature');
            return;
        }
        sigData = signaturePad.toDataURL();
    } else if (currentTab === 'type') {
        const text = document.getElementById('typedSignature').value.trim();
        if (!text) {
            alert('Please type your name');
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 400, 100);
        ctx.font = '38px "Brush Script MT", cursive';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 200, 50);
        sigData = canvas.toDataURL();
    } else {
        const img = document.getElementById('uploadedSignature');
        if (!img.src) {
            alert('Please upload an image');
            return;
        }
        sigData = img.src;
    }
    
    fields[currentFieldIndex].signatureData = sigData;
    fields[currentFieldIndex].filled = true;
    
    // Save signature data to database
    try {
        await supabase
            .from('signature_fields')
            .update({ signature_data: sigData })
            .eq('id', fields[currentFieldIndex].id);
    } catch (error) {
        console.warn('Failed to save signature to database:', error);
    }
    
    const box = document.getElementById(`field-${currentFieldIndex}`);
    if (box) {
        // Clear previous content
        box.textContent = '';
        box.innerHTML = `<img src="${sigData}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px; display: block;">`;
        box.classList.add('completed');
        box.style.border = '2px solid #10b981';
        box.style.background = '#ffffff';
    }
    
    closeSignatureModal();
    updateProgress();
    
    if (currentFieldIndex < fields.length - 1) {
        setTimeout(() => navigateToField(currentFieldIndex + 1), 300);
    }
}

// Update Progress
function updateProgress() {
    const filled = fields.filter(f => f.filled).length;
    const total = fields.length;
    
    document.getElementById('progressText').textContent = `Field ${currentFieldIndex + 1} of ${total}`;
    document.getElementById('progressSub').textContent = `${filled} completed`;
    
    document.getElementById('prevBtn').disabled = currentFieldIndex === 0;
    
    if (filled === total) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('completeBtn').style.display = 'block';
    } else {
        document.getElementById('nextBtn').disabled = currentFieldIndex === total - 1;
    }
}

// Complete Signature
async function completeSignature() {
    if (fields.some(f => !f.filled)) {
        alert('Please complete all fields');
        return;
    }
    
    try {
        // Show loading
        document.getElementById('loadingModal')?.classList.add('active') || 
        (() => {
            const loader = document.createElement('div');
            loader.id = 'loadingModal';
            loader.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999;';
            loader.innerHTML = '<div style="background: white; padding: 32px; border-radius: 12px; text-align: center;"><div class="spinner"></div><p style="margin-top: 16px;">Processing signature...</p></div>';
            document.body.appendChild(loader);
        })();
        
        const sigField = fields.find(f => f.field_type === 'signature');
        
        // Update recipient status
        await supabase
            .from('recipients')
            .update({
                status: 'signed',
                signature_data: sigField?.signatureData,
                signed_at: new Date().toISOString()
            })
            .eq('id', recipient.id);
        
        // First, ensure all signature data is saved to database
        console.log('Saving all signature data to database...');
        for (const field of fields) {
            if (field.signatureData && field.id) {
                try {
                    await supabase
                        .from('signature_fields')
                        .update({ signature_data: field.signatureData })
                        .eq('id', field.id);
                    console.log(`Saved signature for field ${field.id}`);
                } catch (error) {
                    console.warn(`Failed to save field ${field.id}:`, error);
                }
            }
        }
        
        // Wait a bit for database to sync
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Flatten PDF with signatures
        console.log('Flattening PDF with signatures...');
        await flattenPDFWithSignatures();
        
        // Check if all signed
        const { data: allRecs } = await supabase
            .from('recipients')
            .select('status')
            .eq('envelope_id', envelope.id);
        
        if (allRecs && allRecs.every(r => r.status === 'signed')) {
            // Generate final PDF with all signatures
            console.log('All recipients signed, generating final PDF...');
            await generateFinalPDF();
            
            await supabase
                .from('envelopes')
                .update({ status: 'completed' })
                .eq('id', envelope.id);
        }
        
        document.getElementById('loadingModal')?.classList.remove('active');
        alert('✓ Document signed successfully!');
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loadingModal')?.classList.remove('active');
        alert('Error submitting signature: ' + error.message);
    }
}

// Flatten PDF with signatures for this recipient
async function flattenPDFWithSignatures() {
    try {
        console.log('Starting flattenPDFWithSignatures...');
        console.log('PDF URL:', envelope.pdf_url);
        
        // Get PDF from storage - use signed_pdf_url if exists (incremental signing)
        const pdfUrlToUse = envelope.signed_pdf_url || envelope.pdf_url;
        console.log('Using PDF URL:', pdfUrlToUse);
        
        const { data: pdfData, error: downloadError } = await supabase.storage
            .from('documents')
            .download(pdfUrlToUse);
        
        if (downloadError) {
            console.error('Download error:', downloadError);
            throw new Error('Failed to download PDF: ' + downloadError.message);
        }
        
        if (!pdfData) throw new Error('Failed to download PDF');
        
        const arrayBuffer = await pdfData.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();
        
        console.log('PDF loaded, pages:', pages.length);
        
        // Get all fields for this recipient with fresh data from database
        const { data: allFields, error: fieldsError } = await supabase
            .from('signature_fields')
            .select('*')
            .eq('recipient_id', recipient.id);
        
        if (fieldsError) {
            console.error('Error fetching fields:', fieldsError);
        }
        
        console.log('Fields to process:', allFields?.length || 0);
        
        // Also use fields from memory as fallback
        const fieldsToProcess = allFields || fields;
        
        // Add signatures to PDF
        for (const field of fieldsToProcess) {
            const pageIndex = field.page_num - 1;
            if (pageIndex < 0 || pageIndex >= pages.length) {
                console.warn(`Page ${field.page_num} not found (index ${pageIndex}, total pages: ${pages.length})`);
                continue;
            }
            
            const page = pages[pageIndex];
            if (!page || typeof page.getSize !== 'function') {
                console.warn(`Invalid page object for page ${field.page_num}`);
                continue;
            }
            
            const pageSize = page.getSize();
            
            // Get viewport using PDF.js (not pdf-lib)
            // We need to load the page using PDF.js to get viewport, but we're using pdf-lib for editing
            // So we'll calculate viewport manually based on page size
            const scale = 1.4;
            const viewportWidth = pageSize.width * scale;
            const viewportHeight = pageSize.height * scale;
            
            console.log(`Page ${field.page_num} size:`, pageSize, 'calculated viewport:', { width: viewportWidth, height: viewportHeight });
            
            // The coordinates in database are in pixels from PDF.js viewer (scale 1.4)
            // PDF coordinates are in points (72 DPI), and origin is bottom-left
            // HTML/CSS uses top-left origin, PDF uses bottom-left
            
            // Convert from viewer pixels (at scale 1.4) to PDF points
            // The viewport width/height in pixels corresponds to pageSize in points
            const scaleX = pageSize.width / viewportWidth;
            const scaleY = pageSize.height / viewportHeight;
            
            // X coordinate: same direction, just scale
            const x = field.x * scaleX;
            
            // Y coordinate: invert (PDF origin is bottom-left, HTML is top-left)
            // field.y is from top, we need distance from bottom
            const y = pageSize.height - (field.y * scaleY) - (field.height * scaleY);
            
            // Width and height: just scale
            const width = field.width * scaleX;
            const height = field.height * scaleY;
            
            console.log(`Field ${field.id} (${field.field_type}):`, {
                original: { x: field.x, y: field.y, width: field.width, height: field.height },
                converted: { x, y, width, height },
                pageSize
            });
            
            // Get signature data - prefer database, fallback to memory
            let sigData = field.signature_data || fields.find(f => f.id === field.id)?.signatureData;
            
            // For date fields, use current date if not set
            if (!sigData && field.field_type === 'date') {
                sigData = new Date().toLocaleDateString('id-ID');
            }
            
            if (!sigData) {
                console.warn(`No signature data for field ${field.id}`);
                continue;
            }
            
            console.log(`Processing field ${field.id} (${field.field_type}) with data length:`, sigData.length);
            
            if (field.field_type === 'signature' || field.field_type === 'name' || field.field_type === 'text') {
                // Handle image signature
                if (sigData.startsWith('data:image')) {
                    try {
                        // Try PNG first, then JPG
                        let image;
                        if (sigData.includes('data:image/png')) {
                            image = await pdfDoc.embedPng(sigData);
                        } else if (sigData.includes('data:image/jpeg') || sigData.includes('data:image/jpg')) {
                            image = await pdfDoc.embedJpg(sigData);
                        } else {
                            // Try both
                            try {
                                image = await pdfDoc.embedPng(sigData);
                            } catch {
                                image = await pdfDoc.embedJpg(sigData);
                            }
                        }
                        
                        page.drawImage(image, {
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                        });
                        console.log(`✓ Image signature added to field ${field.id}`);
                    } catch (e) {
                        console.warn('Failed to embed image, trying as text:', e);
                        // Fallback to text
                        page.drawText(sigData.substring(0, 50), {
                            x: x,
                            y: y + height / 2,
                            size: Math.min(12, height * 0.3),
                        });
                    }
                } else {
                    // Text signature
                    page.drawText(sigData, {
                        x: x,
                        y: y + height / 2,
                        size: Math.min(12, height * 0.3),
                    });
                    console.log(`✓ Text signature added to field ${field.id}`);
                }
            } else if (field.field_type === 'date') {
                page.drawText(sigData, {
                    x: x,
                    y: y + height / 2,
                    size: Math.min(12, height * 0.3),
                });
                console.log(`✓ Date added to field ${field.id}`);
            }
        }
        
        // Save flattened PDF
        console.log('Saving flattened PDF...');
        const pdfBytes = await pdfDoc.save();
        const fileName = `signed_${Date.now()}_${envelope.pdf_url.split('/').pop()}`;
        console.log('File name:', fileName);
        
        const { data: uploadData, error: uploadErr } = await supabase.storage
            .from('documents')
            .upload(fileName, pdfBytes, {
                contentType: 'application/pdf',
                upsert: false
            });
        
        if (uploadErr) {
            console.error('Upload error:', uploadErr);
            throw uploadErr;
        }
        
        console.log('PDF uploaded successfully:', uploadData);
        
        // Update envelope with signed PDF URL
        const { error: updateErr } = await supabase
            .from('envelopes')
            .update({ signed_pdf_url: fileName })
            .eq('id', envelope.id);
        
        if (updateErr) {
            console.error('Update error:', updateErr);
        } else {
            console.log('Envelope updated with signed_pdf_url:', fileName);
            // Update local envelope object
            envelope.signed_pdf_url = fileName;
        }
        
    } catch (error) {
        console.error('Error flattening PDF:', error);
        throw error;
    }
}

// Generate final PDF with all signatures from all recipients
async function generateFinalPDF() {
    try {
        // Get the latest signed PDF or original
        const pdfUrl = envelope.signed_pdf_url || envelope.pdf_url;
        const { data: pdfData } = await supabase.storage
            .from('documents')
            .download(pdfUrl);
        
        if (!pdfData) throw new Error('Failed to download PDF');
        
        const arrayBuffer = await pdfData.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();
        
        // Get all recipients and their fields
        const { data: allRecipients } = await supabase
            .from('recipients')
            .select('*, signature_fields(*)')
            .eq('envelope_id', envelope.id)
            .eq('status', 'signed');
        
        // Add all signatures
        for (const rec of allRecipients || []) {
            for (const field of rec.signature_fields || []) {
                const pageIndex = field.page_num - 1;
                if (pageIndex < 0 || pageIndex >= pages.length) {
                    console.warn(`Page ${field.page_num} not found in final PDF`);
                    continue;
                }
                
                const page = pages[pageIndex];
                if (!page || typeof page.getSize !== 'function') {
                    console.warn(`Invalid page object for page ${field.page_num}`);
                    continue;
                }
                
                const pageSize = page.getSize();
                
                // Calculate viewport manually (same as flattenPDFWithSignatures)
                const scale = 1.4;
                const viewportWidth = pageSize.width * scale;
                const viewportHeight = pageSize.height * scale;
                
                // Convert coordinates same way as flattenPDFWithSignatures
                const scaleX = pageSize.width / viewportWidth;
                const scaleY = pageSize.height / viewportHeight;
                
                const x = field.x * scaleX;
                const y = pageSize.height - (field.y * scaleY) - (field.height * scaleY);
                const width = field.width * scaleX;
                const height = field.height * scaleY;
                
                // Get signature from signature_fields table
                let sigData = field.signature_data;
                
                // For date fields, use current date if not set
                if (!sigData && field.field_type === 'date') {
                    sigData = new Date().toLocaleDateString('id-ID');
                }
                
                if (!sigData) continue;
                
                if (field.field_type === 'signature' && sigData.startsWith('data:image')) {
                    try {
                        let image;
                        if (sigData.includes('data:image/png')) {
                            image = await pdfDoc.embedPng(sigData);
                        } else {
                            image = await pdfDoc.embedJpg(sigData);
                        }
                        page.drawImage(image, {
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                        });
                    } catch (e) {
                        console.warn('Failed to embed signature image:', e);
                    }
                } else {
                    page.drawText(sigData, {
                        x: x,
                        y: y + height / 2,
                        size: Math.min(12, height * 0.3),
                    });
                }
            }
        }
        
        // Save final PDF
        const pdfBytes = await pdfDoc.save();
        const fileName = `final_${Date.now()}_${envelope.pdf_url.split('/').pop()}`;
        
        const { error: uploadErr } = await supabase.storage
            .from('documents')
            .upload(fileName, pdfBytes, {
                contentType: 'application/pdf',
                upsert: false
            });
        
        if (uploadErr) throw uploadErr;
        
        // Update envelope with final PDF URL
        await supabase
            .from('envelopes')
            .update({ final_pdf_url: fileName })
            .eq('id', envelope.id);
        
    } catch (error) {
        console.error('Error generating final PDF:', error);
        throw error;
    }
}
