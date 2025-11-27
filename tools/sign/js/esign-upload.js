// eSign Upload & Recipients Step

let pdfFile = null;
let recipients = [];
let signInOrder = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupUpload();
    addRecipient(); // Add first recipient by default
    updateNextButton();
});

// Setup upload
function setupUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('pdfFileInput');
    
    uploadZone.addEventListener('click', () => fileInput.click());
    
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragging');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragging');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragging');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handleFileSelect(file);
        } else {
            alert('Please select a PDF file');
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    });
}

// Handle file select
function handleFileSelect(file) {
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
    }
    
    pdfFile = file;
    
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.classList.add('show');
    
    updateNextButton();
}

// Remove file
window.removeFile = function() {
    pdfFile = null;
    document.getElementById('pdfFileInput').value = '';
    document.getElementById('fileInfo').classList.remove('show');
    updateNextButton();
};

// Format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Add recipient
window.addRecipient = function() {
    const recipient = {
        id: 'recipient_' + Date.now(),
        name: '',
        email: '',
        role: 'signer',
        order: recipients.length + 1
    };
    
    recipients.push(recipient);
    renderRecipients();
    updateNextButton();
};

// Remove recipient
window.removeRecipient = function(id) {
    recipients = recipients.filter(r => r.id !== id);
    // Reorder if sign in order is enabled
    if (signInOrder) {
        recipients.forEach((r, index) => {
            r.order = index + 1;
        });
    }
    renderRecipients();
    updateNextButton();
};

// Render recipients
function renderRecipients() {
    const container = document.getElementById('recipientsList');
    container.innerHTML = recipients.map(recipient => {
        const orderHtml = signInOrder ? `
            <div class="order-number">${recipient.order}</div>
        ` : '';
        
        return `
            <div class="recipient-item ${signInOrder ? 'has-order' : ''}">
                ${orderHtml}
                <input 
                    type="text" 
                    class="input-field" 
                    placeholder="Name"
                    value="${recipient.name}"
                    onchange="updateRecipient('${recipient.id}', 'name', this.value)"
                />
                <input 
                    type="email" 
                    class="input-field" 
                    placeholder="Email"
                    value="${recipient.email}"
                    onchange="updateRecipient('${recipient.id}', 'email', this.value)"
                />
                <select 
                    class="select-field" 
                    onchange="updateRecipient('${recipient.id}', 'role', this.value)"
                >
                    <option value="signer" ${recipient.role === 'signer' ? 'selected' : ''}>Signer</option>
                    <option value="cc" ${recipient.role === 'cc' ? 'selected' : ''}>CC</option>
                </select>
                ${recipients.length > 1 ? `
                    <button class="remove-recipient" onclick="removeRecipient('${recipient.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Update recipient
window.updateRecipient = function(id, field, value) {
    const recipient = recipients.find(r => r.id === id);
    if (recipient) {
        recipient[field] = value;
        updateNextButton();
    }
};

// Toggle sign in order
window.toggleSignOrder = function() {
    signInOrder = document.getElementById('signInOrder').checked;
    if (signInOrder) {
        recipients.forEach((r, index) => {
            r.order = index + 1;
        });
    }
    renderRecipients();
};

// Update next button
function updateNextButton() {
    const nextBtn = document.getElementById('nextBtn');
    const hasFile = pdfFile !== null;
    const hasValidRecipients = recipients.length > 0 && 
        recipients.some(r => r.role === 'signer' && r.name && r.email);
    
    nextBtn.disabled = !(hasFile && hasValidRecipients);
}

// Go to next step
window.goToNextStep = async function() {
    if (!pdfFile || recipients.length === 0) {
        alert('Please upload a PDF and add at least one signer');
        return;
    }
    
    // Upload PDF to Supabase storage first
    if (!supabase) {
        alert('⚠️ Supabase not configured');
        return;
    }
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert('⚠️ Anda harus login terlebih dahulu');
            return;
        }
        
        // Create draft envelope first
        const fileName = `draft_${Date.now()}_${pdfFile.name}`;
        const { data: upload, error: uploadErr } = await supabase.storage
            .from('documents')
            .upload(fileName, pdfFile);
        
        if (uploadErr) throw uploadErr;
        
        // Create draft envelope
        const { data: envelope, error: envErr } = await supabase
            .from('envelopes')
            .insert({
                title: pdfFile.name,
                pdf_url: upload.path,
                user_id: user.id,
                status: 'draft'
            })
            .select()
            .single();
        
        if (envErr) throw envErr;
        
        // Save recipients
        const recipientData = recipients.map(r => ({
            envelope_id: envelope.id,
            name: r.name,
            email: r.email,
            order_num: r.order,
            role: r.role || 'signer'
        }));
        
        await supabase
            .from('recipients')
            .insert(recipientData);
        
        // Store in sessionStorage for next step
        sessionStorage.setItem('esign_recipients', JSON.stringify(recipients));
        sessionStorage.setItem('esign_sign_in_order', signInOrder);
        sessionStorage.setItem('esign_envelope_id', envelope.id);
        
        // Redirect to create.html with envelope ID
        window.location.href = `create.html?envelope=${envelope.id}`;
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
};

