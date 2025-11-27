// Review & Send functionality

document.addEventListener('DOMContentLoaded', async function() {
    // Load data from previous steps
    const recipientsData = sessionStorage.getItem('esign_recipients');
    const signInOrder = sessionStorage.getItem('esign_sign_in_order') === 'true';
    const reminderSetting = sessionStorage.getItem('esign_reminder') || 'Send reminders every 3 days';
    const expirationSetting = sessionStorage.getItem('esign_expiration') || 'Expires in 7 days';
    
    // Update summary
    document.getElementById('summarySignOrder').textContent = signInOrder ? 'Yes' : 'No';
    document.getElementById('summaryReminders').textContent = reminderSetting;
    document.getElementById('summaryExpiration').textContent = expirationSetting;
    
    // Render recipients
    if (recipientsData) {
        const recipients = JSON.parse(recipientsData);
        renderRecipients(recipients, signInOrder);
    }
    
    // Update document info
    const pdfData = sessionStorage.getItem('esign_pdf_file');
    if (pdfData) {
        const pdf = JSON.parse(pdfData);
        document.getElementById('summaryDocName').textContent = pdf.name;
        document.getElementById('documentName').textContent = pdf.name;
    }
    
    document.getElementById('summaryCreated').textContent = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
});

function renderRecipients(recipients, signInOrder) {
    const container = document.getElementById('recipientsList');
    container.innerHTML = recipients
        .filter(r => r.role === 'signer')
        .sort((a, b) => signInOrder ? a.order - b.order : 0)
        .map(recipient => `
            <div class="recipient-item">
                <div class="recipient-avatar">${recipient.name.charAt(0).toUpperCase()}</div>
                <div class="recipient-info">
                    <div class="recipient-name">${recipient.name}</div>
                    <div class="recipient-email">${recipient.email}</div>
                </div>
                ${signInOrder ? `<div class="recipient-order">Order ${recipient.order}</div>` : ''}
            </div>
        `).join('');
}

window.previewAsSigner = function() {
    alert('Preview mode - coming soon!');
};

window.sendForSignature = async function() {
    // Get data from sessionStorage
    const recipientsData = sessionStorage.getItem('esign_recipients');
    const fieldsData = sessionStorage.getItem('esign_fields');
    
    if (!recipientsData || !fieldsData) {
        alert('Missing data. Please go back and complete the form.');
        return;
    }
    
    // Call generateLinks if available (from create-builder.js)
    if (typeof generateLinks === 'function') {
        // Need to restore state first
        window.signers = JSON.parse(recipientsData);
        window.fields = JSON.parse(fieldsData);
        
        // PDF file would need to be handled differently (IndexedDB or passed via URL)
        // For now, redirect to create page with generate flag
        window.location.href = 'create.html?generate=true';
    } else {
        // Fallback: redirect to create page to generate links
        window.location.href = 'create.html?generate=true';
    }
};

