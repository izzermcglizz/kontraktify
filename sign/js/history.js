// History Page Functionality

let currentFilter = 'all';
let currentEmail = null;
let allHistoryItems = [];

// Initialize
function initHistoryPage() {
    // Check for token in URL (from email link)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    
    if (token) {
        loadHistoryByToken(token);
    } else if (email) {
        document.getElementById('historyEmail').value = email;
        loadHistoryByEmail(email);
    }
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Load history button
    const loadBtn = document.getElementById('loadHistoryBtn');
    if (loadBtn) {
        loadBtn.addEventListener('click', handleLoadHistory);
    }
    
    // Enter key on email input
    const emailInput = document.getElementById('historyEmail');
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleLoadHistory();
            }
        });
    }
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter
            currentFilter = btn.dataset.filter;
            renderHistoryItems();
        });
    });
}

function handleLoadHistory() {
    const emailInput = document.getElementById('historyEmail');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    if (!email) {
        showError('Masukkan email Anda terlebih dahulu');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Format email tidak valid');
        return;
    }
    
    currentEmail = email;
    loadHistoryByEmail(email);
}

async function loadHistoryByEmail(email) {
    showLoading();
    hideError();
    hideContent();
    
    try {
        if (!initSupabase || !supabase) {
            throw new Error('Database not available');
        }
        
        // Load E-Signature documents
        const { data: envelopes, error: envError } = await supabase
            .from('envelopes')
            .select('*')
            .eq('user_email', email)
            .order('created_at', { ascending: false });
        
        if (envError) {
            console.error('Error loading envelopes:', envError);
        }
        
        // Transform data
        const items = [];
        
        if (envelopes) {
            envelopes.forEach(env => {
                items.push({
                    id: env.id,
                    type: 'e-signature',
                    title: env.title || 'Dokumen E-Signature',
                    createdAt: env.created_at,
                    status: getEnvelopeStatus(env),
                    trackLink: `${window.location.origin}/sign/status.html?id=${env.id}`,
                    historyToken: env.history_token
                });
            });
        }
        
        // TODO: Load Compare documents when table exists
        // TODO: Load Template purchases when table exists
        
        allHistoryItems = items;
        renderHistoryItems();
        
    } catch (error) {
        console.error('Error loading history:', error);
        showError('Gagal memuat history. Pastikan email yang Anda masukkan benar.');
    }
}

async function loadHistoryByToken(token) {
    showLoading();
    hideError();
    hideContent();
    
    try {
        if (!initSupabase || !supabase) {
            throw new Error('Database not available');
        }
        
        // Load document by token
        const { data: envelopes, error } = await supabase
            .from('envelopes')
            .select('*')
            .eq('history_token', token)
            .limit(1);
        
        if (error) throw error;
        
        if (!envelopes || envelopes.length === 0) {
            showError('Token tidak valid atau sudah kadaluarsa');
            return;
        }
        
        const env = envelopes[0];
        currentEmail = env.user_email;
        
        // Pre-fill email input
        const emailInput = document.getElementById('historyEmail');
        if (emailInput) {
            emailInput.value = env.user_email;
        }
        
        // Load all history for this email
        await loadHistoryByEmail(env.user_email);
        
    } catch (error) {
        console.error('Error loading history by token:', error);
        showError('Gagal memuat history. Token tidak valid.');
    }
}

function getEnvelopeStatus(envelope) {
    // Check if all recipients have signed
    if (envelope.recipients) {
        const allSigned = envelope.recipients.every(r => r.signed_at);
        if (allSigned) return 'completed';
        
        const anySigned = envelope.recipients.some(r => r.signed_at);
        if (anySigned) return 'in-progress';
    }
    
    return 'pending';
}

function renderHistoryItems() {
    const listContainer = document.getElementById('historyList');
    const emptyState = document.getElementById('historyEmpty');
    
    if (!listContainer) return;
    
    // Filter items
    let filteredItems = allHistoryItems;
    if (currentFilter !== 'all') {
        filteredItems = allHistoryItems.filter(item => item.type === currentFilter);
    }
    
    // Clear list
    listContainer.innerHTML = '';
    
    if (filteredItems.length === 0) {
        listContainer.style.display = 'none';
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        return;
    }
    
    listContainer.style.display = 'grid';
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Render items
    filteredItems.forEach(item => {
        const itemEl = createHistoryItemElement(item);
        listContainer.appendChild(itemEl);
    });
    
    showContent();
}

function createHistoryItemElement(item) {
    const div = document.createElement('div');
    div.className = 'history-item';
    
    const icon = getIconForType(item.type);
    const statusText = getStatusText(item.status);
    const date = formatDate(item.createdAt);
    
    div.innerHTML = `
        <div class="history-item-icon">${icon}</div>
        <div class="history-item-content">
            <div class="history-item-title">${escapeHtml(item.title)}</div>
            <div class="history-item-meta">
                <span>${date}</span>
                <span class="history-item-status ${item.status}">${statusText}</span>
            </div>
        </div>
        <div class="history-item-actions">
            ${item.trackLink ? `<a href="${item.trackLink}" class="history-item-btn primary">Lihat</a>` : ''}
            ${item.historyToken ? `<a href="history.html?token=${item.historyToken}" class="history-item-btn">History</a>` : ''}
        </div>
    `;
    
    return div;
}

function getIconForType(type) {
    const icons = {
        'e-signature': '✍️',
        'compare': '📊',
        'templates': '📄'
    };
    return icons[type] || '📄';
}

function getStatusText(status) {
    const texts = {
        'pending': 'Pending',
        'in-progress': 'In Progress',
        'completed': 'Selesai'
    };
    return texts[status] || 'Unknown';
}

function formatDate(dateString) {
    if (!dateString) return 'Tanggal tidak tersedia';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    const loading = document.getElementById('historyLoading');
    if (loading) loading.style.display = 'block';
}

function hideLoading() {
    const loading = document.getElementById('historyLoading');
    if (loading) loading.style.display = 'none';
}

function showError(message) {
    hideLoading();
    const error = document.getElementById('historyError');
    const errorMsg = document.querySelector('.error-message');
    if (error) error.style.display = 'block';
    if (errorMsg) errorMsg.textContent = message;
}

function hideError() {
    const error = document.getElementById('historyError');
    if (error) error.style.display = 'none';
}

function showContent() {
    hideLoading();
    hideError();
    const content = document.getElementById('historyContent');
    if (content) content.style.display = 'block';
}

function hideContent() {
    const content = document.getElementById('historyContent');
    if (content) content.style.display = 'none';
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistoryPage);
} else {
    initHistoryPage();
}

