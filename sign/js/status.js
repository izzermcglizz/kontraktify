// State
let envelope = null;
let recipients = [];
let countdown = 30;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadStatus();
    setupAutoRefresh();
});

// Load Status
async function loadStatus() {
    try {
        const token = new URLSearchParams(window.location.search).get('token');
        
        if (!token) {
            showInvalidState();
            return;
        }
        
        // Initialize Supabase
        if (!initSupabase()) {
            alert('Configuration error');
            return;
        }
        
        // Fetch envelope
        const { data: envData, error: envErr } = await supabase
            .from('envelopes')
            .select('*, recipients(*)')
            .eq('track_token', token)
            .single();
        
        if (envErr || !envData) {
            showInvalidState();
            return;
        }
        
        envelope = envData;
        recipients = (envData.recipients || []).sort((a, b) => a.order_num - b.order_num);
        
        displayStatus();
        
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        showInvalidState();
    }
}

// Display Status
function displayStatus() {
    document.getElementById('docTitle').textContent = envelope.title;
    
    const created = new Date(envelope.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('createdDate').textContent = created;
    
    const signedCount = recipients.filter(r => r.status === 'signed').length;
    const totalCount = recipients.length;
    const percentage = Math.round((signedCount / totalCount) * 100);
    
    // Status icon
    const icon = document.getElementById('statusIcon');
    const text = document.getElementById('statusText');
    
    if (envelope.status === 'completed') {
        icon.style.background = '#10b981';
        icon.textContent = '✓';
        text.textContent = 'All signatures collected';
        text.style.color = '#065f46';
        document.getElementById('downloadSection').style.display = 'block';
        document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
    } else {
        icon.style.background = '#fbbf24';
        icon.textContent = '⏳';
        text.textContent = `Waiting for signatures (${signedCount}/${totalCount})`;
        text.style.color = '#92400e';
    }
    
    // Progress
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${signedCount} of ${totalCount} signed (${percentage}%)`;
    
    // Signers list
    displaySigners();
}

// Display Signers
function displaySigners() {
    const list = document.getElementById('signersList');
    
    list.innerHTML = recipients.map(rec => {
        const signed = rec.status === 'signed';
        const date = signed ? new Date(rec.signed_at).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }) : '';
        
        return `
            <div style="display: flex; align-items: center; gap: 16px; padding: 18px; background: ${signed ? '#ecfdf5' : '#fafafa'}; border-radius: 12px; border: 2px solid ${signed ? '#10b981' : '#e5e7eb'}; transition: all 0.2s;">
                <div style="width: 48px; height: 48px; border-radius: 14px; background: ${signed ? '#10b981' : '#d4d4d8'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    ${signed ? '✓' : rec.order_num}
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">${rec.name}</div>
                    <div style="font-size: 13px; color: ${signed ? '#047857' : 'var(--text-muted)'};">
                        ${signed ? `Signed ${date}` : 'Awaiting signature'}
                    </div>
                </div>
                <span class="status-badge ${signed ? 'signed' : 'pending'}">
                    ${signed ? 'Signed' : 'Pending'}
                </span>
            </div>
        `;
    }).join('');
}

// Show Invalid
function showInvalidState() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('invalidState').style.display = 'block';
}

// Auto-Refresh
function setupAutoRefresh() {
    setInterval(async () => {
        await loadStatus();
        countdown = 30;
    }, 30000);
    
    setInterval(() => {
        countdown--;
        if (countdown < 0) countdown = 30;
        document.getElementById('countdown').textContent = countdown;
    }, 1000);
}

// Download PDF
async function downloadPDF() {
    try {
        const url = envelope.final_pdf_url || envelope.pdf_url;
        const { data } = supabase.storage.from('documents').getPublicUrl(url);
        window.open(data.publicUrl, '_blank');
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download PDF');
    }
}
