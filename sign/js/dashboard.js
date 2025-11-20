// Dashboard functionality

let currentUser = null;

// Initialize dashboard
async function initDashboard() {
    // Check if user is logged in
    currentUser = await window.authSystem?.getCurrentUser();
    
    if (!currentUser) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    // Display user info
    displayUserInfo();
    
    // Load documents
    await loadDocuments();
}

// Display user info
function displayUserInfo() {
    const userNameEl = document.getElementById('userName');
    const userAvatarEl = document.getElementById('userAvatar');
    
    if (currentUser) {
        const name = currentUser.user_metadata?.name || currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User';
        const initial = name.charAt(0).toUpperCase();
        
        if (userNameEl) userNameEl.textContent = name;
        if (userAvatarEl) userAvatarEl.textContent = initial;
    }
}

// Load user documents
async function loadDocuments() {
    if (!currentUser) return;
    
    try {
        const { data: envelopes, error } = await supabase
            .from('envelopes')
            .select('*, recipients(*)')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error loading documents:', error);
            return;
        }
        
        displayDocuments(envelopes || []);
        updateStats(envelopes || []);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display documents
function displayDocuments(documents) {
    const container = document.getElementById('documentsList');
    if (!container) return;
    
    if (documents.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">📄</div>
                <h3>Belum ada dokumen</h3>
                <p>Mulai dengan membuat dokumen baru</p>
                <a href="create.html" class="create-btn" style="margin-top: 20px;">Buat Dokumen Baru</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = documents.map(doc => {
        const recipients = doc.recipients || [];
        const signedCount = recipients.filter(r => r.status === 'signed').length;
        const totalCount = recipients.length;
        const isCompleted = doc.status === 'completed';
        const isPending = signedCount < totalCount && signedCount > 0;
        
        let statusClass = 'status-pending';
        let statusText = 'Menunggu';
        
        if (isCompleted) {
            statusClass = 'status-completed';
            statusText = 'Selesai';
        } else if (isPending) {
            statusClass = 'status-signed';
            statusText = `${signedCount}/${totalCount} Ditandatangani`;
        }
        
        const createdDate = new Date(doc.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const trackLink = doc.track_token ? `status.html?token=${doc.track_token}` : '#';
        
        return `
            <div class="document-card" onclick="window.location.href='${trackLink}'">
                <div class="document-title">${doc.title || 'Untitled Document'}</div>
                <div class="document-meta">Dibuat ${createdDate}</div>
                <div>
                    <span class="document-status ${statusClass}">${statusText}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Update stats
function updateStats(documents) {
    const total = documents.length;
    const pending = documents.filter(d => {
        const recipients = d.recipients || [];
        const signedCount = recipients.filter(r => r.status === 'signed').length;
        return signedCount < recipients.length && signedCount > 0;
    }).length;
    const completed = documents.filter(d => d.status === 'completed').length;
    
    const totalEl = document.getElementById('totalDocs');
    const pendingEl = document.getElementById('pendingDocs');
    const completedEl = document.getElementById('completedDocs');
    
    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;
    if (completedEl) completedEl.textContent = completed;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initDashboard);

