// Document Tracking functionality

let currentDocument = null;

document.addEventListener('DOMContentLoaded', async function() {
    // Get document token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
        await loadDocument(token);
    } else {
        // Show empty state or redirect
        console.error('No token provided');
    }
});

async function loadDocument(token) {
    if (!supabase) return;
    
    try {
        const { data: envelope, error } = await supabase
            .from('envelopes')
            .select('*, recipients(*)')
            .eq('track_token', token)
            .single();
        
        if (error) throw error;
        
        currentDocument = envelope;
        displayDocument(envelope);
        
    } catch (error) {
        console.error('Error loading document:', error);
    }
}

function displayDocument(envelope) {
    // Update title and status
    document.getElementById('documentTitle').textContent = envelope.title || 'Untitled Document';
    
    const statusEl = document.getElementById('documentStatus');
    const recipients = envelope.recipients || [];
    const signedCount = recipients.filter(r => r.status === 'signed').length;
    const totalCount = recipients.length;
    
    if (envelope.status === 'completed') {
        statusEl.textContent = 'Completed';
        statusEl.className = 'status-badge status-completed';
    } else if (signedCount === totalCount && totalCount > 0) {
        statusEl.textContent = 'Completed';
        statusEl.className = 'status-badge status-completed';
    } else {
        statusEl.textContent = 'Waiting for signature';
        statusEl.className = 'status-badge status-waiting';
    }
    
    // Render timeline
    renderTimeline(envelope);
    
    // Render signers
    renderSignersStatus(envelope.recipients || []);
}

function renderTimeline(envelope) {
    const timeline = document.getElementById('timeline');
    const events = [];
    
    // Created event
    events.push({
        text: `Document created`,
        time: new Date(envelope.created_at)
    });
    
    // Sent events
    const recipients = envelope.recipients || [];
    recipients.forEach(recipient => {
        if (recipient.sent_at) {
            events.push({
                text: `Sent to ${recipient.name}`,
                time: new Date(recipient.sent_at)
            });
        }
        
        if (recipient.viewed_at) {
            events.push({
                text: `Viewed by ${recipient.name}`,
                time: new Date(recipient.viewed_at)
            });
        }
        
        if (recipient.status === 'signed' && recipient.signed_at) {
            events.push({
                text: `Signed by ${recipient.name}`,
                time: new Date(recipient.signed_at)
            });
        }
    });
    
    // Sort by time
    events.sort((a, b) => a.time - b.time);
    
    timeline.innerHTML = events.map(event => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-text">${event.text}</div>
                <div class="timeline-time">${formatTime(event.time)}</div>
            </div>
        </div>
    `).join('');
}

function renderSignersStatus(recipients) {
    const container = document.getElementById('signersStatusList');
    container.innerHTML = recipients.map(recipient => {
        const status = recipient.status === 'signed' ? 'signed' : 'pending';
        const statusText = recipient.status === 'signed' ? 'Signed' : 'Pending';
        const statusClass = recipient.status === 'signed' ? 'chip-signed' : 'chip-pending';
        
        return `
            <div class="signer-status-item">
                <div class="signer-avatar">${recipient.name.charAt(0).toUpperCase()}</div>
                <div class="signer-info">
                    <div class="signer-name">${recipient.name}</div>
                    <div class="signer-email">${recipient.email || 'No email'}</div>
                </div>
                <span class="status-chip ${statusClass}">${statusText}</span>
            </div>
        `;
    }).join('');
}

function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

window.resendEmail = function() {
    alert('Resend email - coming soon!');
};

window.downloadPDF = async function() {
    if (!currentDocument) return;
    
    // Use existing download logic from status.js
    const finalUrl = currentDocument.final_pdf_url || currentDocument.signed_pdf_url || currentDocument.pdf_url;
    if (finalUrl) {
        window.open(finalUrl, '_blank');
    } else {
        alert('PDF not available yet');
    }
};

window.voidEnvelope = function() {
    if (!confirm('Are you sure you want to void this envelope? This action cannot be undone.')) {
        return;
    }
    
    alert('Void envelope - coming soon!');
};

