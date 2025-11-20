// Email System for History Tracking

// Generate unique history token
function generateHistoryToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Validate email format
function validateEmail(email) {
    if (!email) return { valid: false, message: 'Email tidak boleh kosong' };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Format email tidak valid' };
    }
    
    return { valid: true, message: '' };
}

// Store email with document in Supabase
async function storeEmailWithDocument(email, documentId, historyToken) {
    if (!supabase) {
        console.warn('Supabase not initialized');
        return { success: false, error: 'Database not available' };
    }
    
    try {
        // Update document with email and history token
        const { error } = await supabase
            .from('envelopes')
            .update({
                user_email: email,
                history_token: historyToken
            })
            .eq('id', documentId);
        
        if (error) {
            console.error('Error storing email:', error);
            return { success: false, error: error.message };
        }
        
        return { success: true };
    } catch (error) {
        console.error('Error storing email:', error);
        return { success: false, error: error.message };
    }
}

// Send email with links (via Supabase Edge Function or service)
async function sendEmailWithLinks(email, signerLinks, trackLink, historyLink) {
    if (!supabase) {
        console.warn('Supabase not initialized - using mailto fallback');
        return sendEmailViaMailto(email, signerLinks, trackLink, historyLink);
    }
    
    try {
        // Try to use Supabase Edge Function for sending email
        const { data, error } = await supabase.functions.invoke('send-email', {
            body: {
                to: email,
                subject: 'Dokumen E-Signature Anda - Kontraktify',
                signerLinks: signerLinks,
                trackLink: trackLink,
                historyLink: historyLink
            }
        });
        
        if (error) {
            console.warn('Edge function not available, using mailto fallback');
            return sendEmailViaMailto(email, signerLinks, trackLink, historyLink);
        }
        
        return { success: true, method: 'edge-function' };
    } catch (error) {
        console.warn('Error sending email via edge function, using mailto fallback');
        return sendEmailViaMailto(email, signerLinks, trackLink, historyLink);
    }
}

// Fallback: Send email via mailto link
function sendEmailViaMailto(email, signerLinks, trackLink, historyLink) {
    const subject = encodeURIComponent('Dokumen E-Signature Anda - Kontraktify');
    
    let body = 'Halo,\n\n';
    body += 'Dokumen E-Signature Anda sudah siap. Berikut adalah link-link yang Anda perlukan:\n\n';
    
    if (signerLinks && signerLinks.length > 0) {
        body += 'Link untuk Signer:\n';
        signerLinks.forEach((link, index) => {
            body += `${index + 1}. ${link.url}\n`;
        });
        body += '\n';
    }
    
    if (trackLink) {
        body += `Link untuk Track Progress:\n${trackLink}\n\n`;
    }
    
    if (historyLink) {
        body += `Link untuk History:\n${historyLink}\n\n`;
    }
    
    body += 'Terima kasih,\nKontraktify';
    
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    return { success: true, method: 'mailto' };
}

// Create email input component HTML
function createEmailInputHTML() {
    return `
        <div class="email-input-section" id="emailInputSection" style="display: none;">
            <div class="email-input-header">
                <h3 class="email-input-title">Kirim ke Email (Opsional)</h3>
                <p class="email-input-description">Masukkan email untuk menerima link dan history dokumen</p>
            </div>
            <div class="email-input-wrapper">
                <input 
                    type="email" 
                    id="userEmail" 
                    class="email-input-field" 
                    placeholder="nama@email.com"
                    autocomplete="email"
                />
                <div class="email-error" id="emailError" style="display: none;"></div>
            </div>
        </div>
    `;
}

// Show email input section
function showEmailInput() {
    const section = document.getElementById('emailInputSection');
    if (section) {
        section.style.display = 'block';
        // Focus on input after animation
        setTimeout(() => {
            const input = document.getElementById('userEmail');
            if (input) input.focus();
        }, 300);
    }
}

// Get email from input
function getEmailFromInput() {
    const input = document.getElementById('userEmail');
    if (!input) return null;
    
    const email = input.value.trim();
    if (!email) return null;
    
    const validation = validateEmail(email);
    if (!validation.valid) {
        showEmailError(validation.message);
        return null;
    }
    
    hideEmailError();
    return email;
}

// Show email error
function showEmailError(message) {
    const errorEl = document.getElementById('emailError');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

// Hide email error
function hideEmailError() {
    const errorEl = document.getElementById('emailError');
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

// Export functions
window.emailSystem = {
    generateHistoryToken,
    validateEmail,
    storeEmailWithDocument,
    sendEmailWithLinks,
    createEmailInputHTML,
    showEmailInput,
    getEmailFromInput,
    showEmailError,
    hideEmailError
};

