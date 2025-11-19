// PDF.js Configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// State
let recipient = null;
let envelope = null;
let fields = [];
let currentFieldIndex = 0;
let signaturePad = null;
let currentTab = 'draw';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadDocument();
});

// Load Document
async function loadDocument() {
    try {
        const token = new URLSearchParams(window.location.search).get('token');
        
        if (!token) {
            showInvalidState();
            return;
        }
        
        // Initialize Supabase
        if (!initSupabase()) {
            alert('Configuration error. Please contact support.');
            return;
        }
        
        // Fetch recipient
        const { data: recData, error: recErr } = await supabase
            .from('recipients')
            .select('*, envelopes(*)')
            .eq('magic_token', token)
            .single();
        
        if (recErr || !recData) {
            showInvalidState();
            return;
        }
        
        recipient = recData;
        envelope = recData.envelopes;
        
        // Check if already signed
        if (recipient.status === 'signed') {
            showSignedState();
            return;
        }
        
        // Fetch fields
        const { data: fieldsData } = await supabase
            .from('signature_fields')
            .select('*')
            .eq('recipient_id', recipient.id)
            .order('page_num', { ascending: true });
        
        fields = (fieldsData || []).map(f => ({ ...f, filled: false }));
        
        // Display
        document.getElementById('signerName').textContent = recipient.name;
        document.getElementById('docTitle').textContent = envelope.title;
        
        // Render PDF
        await renderPDF();
        
        // Setup
        setupSignatureModal();
        setupNavigation();
        
        // Show content
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        
        updateProgress();
        
    } catch (error) {
        console.error('Error:', error);
        showInvalidState();
    }
}

// Render PDF
async function renderPDF() {
    const { data } = supabase.storage.from('documents').getPublicUrl(envelope.pdf_url);
    const pdf = await pdfjsLib.getDocument(data.publicUrl).promise;
    const container = document.getElementById('pdfPages');
    container.innerHTML = '';
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
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
        
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        // Add field overlays
        const pageFields = fields.filter(f => f.page_num === pageNum);
        pageFields.forEach((field, idx) => {
            const box = document.createElement('div');
            box.className = 'signature-field';
            box.id = `field-${fields.indexOf(field)}`;
            box.style.cssText = `
                left: ${field.x}px;
                top: ${field.y}px;
                width: ${field.width}px;
                height: ${field.height}px;
                cursor: pointer;
            `;
            
            const labels = {
                signature: '✍️ Click to sign',
                name: '👤 Your name',
                date: '📅 Date',
                text: '📝 Enter text'
            };
            box.textContent = labels[field.field_type];
            
            box.addEventListener('click', () => openSignatureModal(fields.indexOf(field)));
            wrapper.appendChild(box);
        });
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
function openSignatureModal(idx) {
    currentFieldIndex = idx;
    const field = fields[idx];
    
    if (field.field_type === 'date') {
        const today = new Date().toLocaleDateString('id-ID');
        field.signatureData = today;
        field.filled = true;
        
        const box = document.getElementById(`field-${idx}`);
        box.textContent = today;
        box.classList.add('completed');
        
        updateProgress();
        if (idx < fields.length - 1) setTimeout(() => navigateToField(idx + 1), 500);
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
    
    const box = document.getElementById(`field-${currentFieldIndex}`);
    box.innerHTML = `<img src="${sigData}" style="width: 100%; height: 100%; object-fit: contain;">`;
    box.classList.add('completed');
    
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
        const sigField = fields.find(f => f.field_type === 'signature');
        
        await supabase
            .from('recipients')
            .update({
                status: 'signed',
                signature_data: sigField?.signatureData,
                signed_at: new Date().toISOString()
            })
            .eq('id', recipient.id);
        
        // Check if all signed
        const { data: allRecs } = await supabase
            .from('recipients')
            .select('status')
            .eq('envelope_id', envelope.id);
        
        if (allRecs.every(r => r.status === 'signed')) {
            await supabase
                .from('envelopes')
                .update({ status: 'completed' })
                .eq('id', envelope.id);
        }
        
        alert('✓ Document signed successfully!');
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting signature');
    }
}
