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
    const userEmailEl = document.getElementById('userEmail');
    
    if (currentUser) {
        const name = currentUser.user_metadata?.name || currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User';
        const initial = name.charAt(0).toUpperCase();
        const email = currentUser.email || 'user@example.com';
        
        if (userNameEl) userNameEl.textContent = name;
        if (userAvatarEl) userAvatarEl.textContent = initial;
        if (userEmailEl) userEmailEl.textContent = email;
    }
}

// Load all user documents (e-signature, templates, compare)
async function loadDocuments() {
    if (!currentUser) return;
    
    try {
        // Load e-signature documents
        const { data: envelopes, error: envelopesError } = await supabase
            .from('envelopes')
            .select('*, recipients(*)')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });
        
        if (envelopesError) {
            console.error('Error loading e-signature documents:', envelopesError);
        }
        
        // Load template purchases
        const { data: templates, error: templatesError } = await supabase
            .from('template_purchases')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('purchase_date', { ascending: false });
        
        if (templatesError) {
            console.error('Error loading template purchases:', templatesError);
        }
        
        // Load compare history
        const { data: compares, error: comparesError } = await supabase
            .from('compare_history')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('compared_at', { ascending: false });
        
        if (comparesError) {
            console.error('Error loading compare history:', comparesError);
        }
        
        // Display all documents
        displayESignDocuments(envelopes || []);
        displayTemplatePurchases(templates || []);
        displayCompareHistory(compares || []);
        
        // Update stats
        updateStats(envelopes || [], templates || [], compares || []);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display e-signature documents
function displayESignDocuments(documents) {
    const container = document.getElementById('esignDocumentsList');
    if (!container) return;
    
    if (documents.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">✍️</div>
                <h3>Belum ada dokumen e-signature</h3>
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

// Display template purchases
function displayTemplatePurchases(purchases) {
    const container = document.getElementById('templatePurchasesList');
    if (!container) return;
    
    if (purchases.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">📋</div>
                <h3>Belum ada template yang dibeli</h3>
                <p>Jelajahi template kami di halaman Templates</p>
                <a href="../../templates/index.html" class="create-btn" style="margin-top: 20px;">Jelajahi Templates</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = purchases.map(purchase => {
        const purchaseDate = new Date(purchase.purchase_date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const downloadLink = purchase.download_url || `../../templates/${purchase.template_slug}.html`;
        
        return `
            <div class="document-card" onclick="window.location.href='${downloadLink}'">
                <div class="document-title">${purchase.template_name}</div>
                <div class="document-meta">Dibeli ${purchaseDate}</div>
                <div>
                    <span class="document-status status-completed">Dibeli</span>
                </div>
            </div>
        `;
    }).join('');
}

// Display compare history
function displayCompareHistory(history) {
    const container = document.getElementById('compareHistoryList');
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">🔍</div>
                <h3>Belum ada riwayat perbandingan</h3>
                <p>Mulai dengan membandingkan dokumen</p>
                <a href="../../compare/index.html" class="create-btn" style="margin-top: 20px;">Coba Compare</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = history.map(item => {
        const comparedDate = new Date(item.compared_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const resultLink = item.result_url || '#';
        
        return `
            <div class="document-card" onclick="window.location.href='${resultLink}'">
                <div class="document-title">${item.document1_name} vs ${item.document2_name}</div>
                <div class="document-meta">Dibandingkan ${comparedDate}</div>
                <div>
                    <span class="document-status status-completed">Selesai</span>
                </div>
            </div>
        `;
    }).join('');
}

// Update stats
function updateStats(esignDocs, templates, compares) {
    const totalESign = esignDocs.length;
    const totalTemplates = templates.length;
    const totalCompares = compares.length;
    
    // Calculate pending e-signature documents
    const pending = esignDocs.filter(d => {
        const recipients = d.recipients || [];
        const signedCount = recipients.filter(r => r.status === 'signed').length;
        return signedCount < recipients.length;
    }).length;
    
    // Update summary cards
    const esignValueEl = document.getElementById('esignValue');
    const compareValueEl = document.getElementById('compareValue');
    const templatesValueEl = document.getElementById('templatesValue');
    
    if (esignValueEl) {
        if (pending > 0) {
            esignValueEl.textContent = `${pending} Item${pending > 1 ? 's' : ''} pending`;
        } else if (totalESign > 0) {
            esignValueEl.textContent = `${totalESign} Document${totalESign > 1 ? 's' : ''}`;
        } else {
            esignValueEl.textContent = 'No documents';
        }
    }
    
    if (compareValueEl) {
        compareValueEl.textContent = `${totalCompares} job${totalCompares !== 1 ? 's' : ''}`;
    }
    
    if (templatesValueEl) {
        templatesValueEl.textContent = `${totalTemplates} template${totalTemplates !== 1 ? 's' : ''}`;
    }
    
    // Build recent activity list
    buildRecentActivity(esignDocs, templates, compares);
}

// Build recent activity list
function buildRecentActivity(esignDocs, templates, compares) {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = [];
    
    // Add e-signature activities
    esignDocs.slice(0, 5).forEach(doc => {
        const recipients = doc.recipients || [];
        const signedCount = recipients.filter(r => r.status === 'signed').length;
        const totalCount = recipients.length;
        const isCompleted = doc.status === 'completed';
        
        let activityText = '';
        if (isCompleted) {
            activityText = `You completed an eSign for ${doc.title || 'Untitled Document'}`;
        } else if (signedCount > 0) {
            activityText = `You started an eSign for ${doc.title || 'Untitled Document'}`;
        } else {
            activityText = `You created an eSign for ${doc.title || 'Untitled Document'}`;
        }
        
        activities.push({
            type: 'esign',
            text: activityText,
            time: doc.created_at,
            link: doc.track_token ? `status.html?token=${doc.track_token}` : '#'
        });
    });
    
    // Add compare activities
    compares.slice(0, 5).forEach(compare => {
        activities.push({
            type: 'compare',
            text: `You compared ${compare.document1_name} vs ${compare.document2_name}`,
            time: compare.compared_at,
            link: compare.result_url || '#'
        });
    });
    
    // Add template activities
    templates.slice(0, 5).forEach(template => {
        activities.push({
            type: 'template',
            text: `You saved a new template "${template.template_name}"`,
            time: template.purchase_date,
            link: template.download_url || `../../templates/${template.template_slug}.html`
        });
    });
    
    // Sort by time (most recent first)
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // Take only 10 most recent
    const recentActivities = activities.slice(0, 10);
    
    if (recentActivities.length === 0) {
        activityList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No recent activity</h3>
                <p>Your recent activities will appear here</p>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = recentActivities.map(activity => {
        const timeAgo = getTimeAgo(new Date(activity.time));
        
        let iconSvg = '';
        if (activity.type === 'esign') {
            iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>`;
        } else if (activity.type === 'compare') {
            iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
            </svg>`;
        } else {
            iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
            </svg>`;
        }
        
        return `
            <div class="activity-item" onclick="window.location.href='${activity.link}'">
                <div class="activity-icon">${iconSvg}</div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${timeAgo}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Get time ago string
function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        if (days === 1) return 'Yesterday';
        return `${days} days ago`;
    }
    
    // For older dates, show formatted date
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
}

// Handle logout
window.handleLogout = async function() {
    if (confirm('Are you sure you want to logout?')) {
        await window.authSystem?.handleLogout();
        window.location.href = '../index.html';
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', initDashboard);

