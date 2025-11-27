// eSign Dashboard functionality

let currentUser = null;
let allDocuments = [];

// Initialize dashboard
async function initESignDashboard() {
    currentUser = await window.authSystem?.getCurrentUser();
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    displayUserInfo();
    await loadDocuments();
    setupFilters();
}

// Display user info
function displayUserInfo() {
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');
    const userAvatarEl = document.getElementById('userAvatar');
    
    if (currentUser) {
        const name = currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'User';
        const initial = name.charAt(0).toUpperCase();
        const email = currentUser.email || 'user@example.com';
        
        if (userNameEl) userNameEl.textContent = name;
        if (userEmailEl) userEmailEl.textContent = email;
        if (userAvatarEl) userAvatarEl.textContent = initial;
    }
}

// Load documents
async function loadDocuments() {
    if (!currentUser || !supabase) return;
    
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
        
        allDocuments = envelopes || [];
        updateStats(allDocuments);
        renderDocumentsTable(allDocuments);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Update stats
function updateStats(documents) {
    const drafts = documents.filter(d => d.status === 'draft' || (!d.status && !d.track_token)).length;
    const waiting = documents.filter(d => {
        if (d.status === 'completed' || d.status === 'declined' || d.status === 'expired' || d.status === 'draft') return false;
        const recipients = d.recipients || [];
        if (recipients.length === 0) return false;
        const signedCount = recipients.filter(r => r.status === 'signed').length;
        return signedCount < recipients.length;
    }).length;
    const completed = documents.filter(d => d.status === 'completed').length;
    const declined = documents.filter(d => d.status === 'declined' || d.status === 'expired').length;
    
    document.getElementById('draftsCount').textContent = drafts;
    document.getElementById('waitingCount').textContent = waiting;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('declinedCount').textContent = declined;
}

// Render documents table
function renderDocumentsTable(documents) {
    const tbody = document.getElementById('documentsTableBody');
    if (!tbody) return;
    
    if (documents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <div class="empty-icon">📄</div>
                    <h3>No documents yet</h3>
                    <p>Create your first eSign document</p>
                    <button class="btn btn-primary" onclick="window.location.href='esign-upload.html'" style="margin-top: 16px;">New eSign</button>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = documents.map(doc => {
        const recipients = doc.recipients || [];
        const signedCount = recipients.filter(r => r.status === 'signed').length;
        const totalCount = recipients.length;
        
        let status = 'draft';
        let statusClass = 'status-draft';
        let statusText = 'Draft';
        
        // Check if it's a draft (no track_token means it's a draft)
        if (doc.status === 'draft' || (!doc.status && !doc.track_token)) {
            status = 'draft';
            statusClass = 'status-draft';
            statusText = 'Draft';
        } else if (doc.status === 'completed') {
            status = 'completed';
            statusClass = 'status-completed';
            statusText = 'Completed';
        } else if (doc.status === 'declined') {
            status = 'declined';
            statusClass = 'status-declined';
            statusText = 'Declined';
        } else if (doc.status === 'expired') {
            status = 'expired';
            statusClass = 'status-expired';
            statusText = 'Expired';
        } else if (signedCount > 0 && signedCount < totalCount) {
            status = 'waiting';
            statusClass = 'status-waiting';
            statusText = 'Waiting for signature';
        } else if (signedCount === 0 && totalCount > 0) {
            status = 'sent';
            statusClass = 'status-waiting';
            statusText = 'Sent';
        }
        
        const signersText = recipients.length > 0 
            ? recipients.slice(0, 2).map(r => r.name).join(', ') + (recipients.length > 2 ? ` +${recipients.length - 2}` : '')
            : 'No signers';
        
        const lastUpdated = new Date(doc.updated_at || doc.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        const docLink = status === 'draft' 
            ? `create.html?envelope=${doc.id}`
            : `tracking.html?token=${doc.track_token}`;
        
        return `
            <tr onclick="window.location.href='${docLink}'" style="cursor: pointer;">
                <td>
                    <div style="font-weight: 600; color: var(--primary);">${doc.title || 'Untitled Document'}</div>
                </td>
                <td>
                    <span class="status-pill ${statusClass}">${statusText}</span>
                </td>
                <td>${signersText}</td>
                <td>${lastUpdated}</td>
                <td>
                    <div class="action-buttons" onclick="event.stopPropagation()">
                        <button class="action-btn" onclick="window.location.href='${docLink}'" title="View">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        ${status === 'draft' ? `
                            <button class="action-btn" onclick="window.location.href='create.html?envelope=${doc.id}'" title="Continue">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        ` : ''}
                        ${status === 'completed' ? `
                            <button class="action-btn" onclick="downloadPDF('${doc.id}')" title="Download">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Setup filters
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    const applyFilters = () => {
        let filtered = [...allDocuments];
        
        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(doc => {
                const title = (doc.title || '').toLowerCase();
                const recipients = (doc.recipients || []).map(r => r.name.toLowerCase() + ' ' + (r.email || '').toLowerCase()).join(' ');
                return title.includes(searchTerm) || recipients.includes(searchTerm);
            });
        }
        
        // Status filter
        const status = statusFilter.value;
        if (status !== 'all') {
            filtered = filtered.filter(doc => {
                if (status === 'draft') return !doc.status || doc.status === 'draft';
                if (status === 'sent') {
                    const recipients = doc.recipients || [];
                    return recipients.length > 0 && recipients.every(r => r.status !== 'signed');
                }
                if (status === 'completed') return doc.status === 'completed';
                if (status === 'declined') return doc.status === 'declined';
                if (status === 'expired') return doc.status === 'expired';
                return true;
            });
        }
        
        // Date filter
        const dateValue = dateFilter.value;
        if (dateValue !== 'all' && dateValue !== 'custom') {
            const days = parseInt(dateValue);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            filtered = filtered.filter(doc => {
                const docDate = new Date(doc.created_at);
                return docDate >= cutoffDate;
            });
        }
        
        renderDocumentsTable(filtered);
    };
    
    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
}

// Download PDF
window.downloadPDF = async function(envelopeId) {
    // Implementation for downloading signed PDF
    alert('Download PDF - coming soon!');
};

// Initialize on load
document.addEventListener('DOMContentLoaded', initESignDashboard);

