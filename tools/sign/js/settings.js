// Settings page functionality

let currentUser = null;

// Initialize settings page
async function initSettings() {
    // Check if user is logged in
    currentUser = await window.authSystem?.getCurrentUser();
    
    if (!currentUser) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    // Display user info
    displayUserInfo();
    
    // Load user settings
    await loadUserSettings();
    
    // Setup form handlers
    setupFormHandlers();
}

// Display user info
function displayUserInfo() {
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');
    const userAvatarEl = document.getElementById('userAvatar');
    const profilePictureEl = document.getElementById('profilePicture');
    const emailInput = document.getElementById('email');
    const displayNameInput = document.getElementById('displayName');
    
    if (currentUser) {
        const name = currentUser.user_metadata?.name || currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User';
        const initial = name.charAt(0).toUpperCase();
        const email = currentUser.email || 'user@example.com';
        
        if (userNameEl) userNameEl.textContent = name;
        if (userEmailEl) userEmailEl.textContent = email;
        if (userAvatarEl) userAvatarEl.textContent = initial;
        if (profilePictureEl) profilePictureEl.textContent = initial;
        if (emailInput) emailInput.value = email;
        if (displayNameInput) displayNameInput.value = name;
    }
}

// Load user settings from database or localStorage
async function loadUserSettings() {
    if (!currentUser) return;
    
    try {
        // Load from localStorage (you can extend this to load from database)
        const savedSettings = localStorage.getItem(`user_settings_${currentUser.id}`);
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            
            // Load preferences
            if (settings.emailNotifications !== undefined) {
                document.getElementById('emailNotifications').checked = settings.emailNotifications;
            }
            if (settings.autoSave !== undefined) {
                document.getElementById('autoSave').checked = settings.autoSave;
            }
            if (settings.twoFactor !== undefined) {
                document.getElementById('twoFactor').checked = settings.twoFactor;
            }
            if (settings.language) {
                document.getElementById('language').value = settings.language;
            }
            if (settings.timezone) {
                document.getElementById('timezone').value = settings.timezone;
            }
            if (settings.phone) {
                document.getElementById('phone').value = settings.phone;
            }
            if (settings.company) {
                document.getElementById('company').value = settings.company;
            }
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Setup form handlers
function setupFormHandlers() {
    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Security form
    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', handlePasswordChange);
    }
}

// Handle profile update
async function handleProfileUpdate(e) {
    e.preventDefault();
    
    if (!currentUser || !supabase) return;
    
    const displayName = document.getElementById('displayName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();
    
    try {
        // Update user metadata
        const { data, error } = await supabase.auth.updateUser({
            data: {
                name: displayName,
                full_name: displayName,
                phone: phone,
                company: company
            }
        });
        
        if (error) throw error;
        
        // Update localStorage settings
        const settings = JSON.parse(localStorage.getItem(`user_settings_${currentUser.id}`) || '{}');
        settings.phone = phone;
        settings.company = company;
        localStorage.setItem(`user_settings_${currentUser.id}`, JSON.stringify(settings));
        
        // Update UI
        displayUserInfo();
        
        showAlert('Profile updated successfully!', 'success');
        
        // Reload user data
        currentUser = await window.authSystem?.getCurrentUser();
        displayUserInfo();
        
    } catch (error) {
        console.error('Error updating profile:', error);
        showAlert('Failed to update profile: ' + error.message, 'error');
    }
}

// Handle password change
async function handlePasswordChange(e) {
    e.preventDefault();
    
    if (!currentUser || !supabase) return;
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showAlert('Please fill in all password fields', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showAlert('New password must be at least 8 characters long', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match', 'error');
        return;
    }
    
    try {
        // Update password
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        
        if (error) throw error;
        
        // Clear form
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        
        showAlert('Password updated successfully!', 'success');
        
    } catch (error) {
        console.error('Error updating password:', error);
        showAlert('Failed to update password: ' + error.message, 'error');
    }
}

// Save preferences
async function savePreferences() {
    if (!currentUser) return;
    
    const preferences = {
        emailNotifications: document.getElementById('emailNotifications').checked,
        autoSave: document.getElementById('autoSave').checked,
        twoFactor: document.getElementById('twoFactor').checked,
        language: document.getElementById('language').value,
        timezone: document.getElementById('timezone').value
    };
    
    try {
        // Save to localStorage (you can extend this to save to database)
        localStorage.setItem(`user_settings_${currentUser.id}`, JSON.stringify(preferences));
        
        showAlert('Preferences saved successfully!', 'success');
        
    } catch (error) {
        console.error('Error saving preferences:', error);
        showAlert('Failed to save preferences', 'error');
    }
}

// Handle avatar change
window.handleAvatarChange = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showAlert('Please select an image file', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showAlert('Image size must be less than 5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatarEl = document.getElementById('profilePicture');
        const sidebarAvatarEl = document.getElementById('userAvatar');
        
        // Update avatar display (you can upload to Supabase Storage here)
        // For now, just show a preview
        avatarEl.style.backgroundImage = `url(${e.target.result})`;
        avatarEl.style.backgroundSize = 'cover';
        avatarEl.style.backgroundPosition = 'center';
        avatarEl.textContent = '';
        
        if (sidebarAvatarEl) {
            sidebarAvatarEl.style.backgroundImage = `url(${e.target.result})`;
            sidebarAvatarEl.style.backgroundSize = 'cover';
            sidebarAvatarEl.style.backgroundPosition = 'center';
            sidebarAvatarEl.textContent = '';
        }
        
        showAlert('Avatar updated! (Note: This is a preview. Upload to storage not implemented yet.)', 'success');
    };
    reader.readAsDataURL(file);
};

// Remove avatar
window.removeAvatar = function() {
    const avatarEl = document.getElementById('profilePicture');
    const sidebarAvatarEl = document.getElementById('userAvatar');
    const initial = currentUser?.email?.charAt(0).toUpperCase() || 'U';
    
    avatarEl.style.backgroundImage = '';
    avatarEl.textContent = initial;
    
    if (sidebarAvatarEl) {
        sidebarAvatarEl.style.backgroundImage = '';
        sidebarAvatarEl.textContent = initial;
    }
    
    showAlert('Avatar removed', 'success');
};

// Reset profile form
window.resetProfileForm = function() {
    displayUserInfo();
    showAlert('Form reset', 'success');
};

// Confirm delete account
window.confirmDeleteAccount = function() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }
    
    if (!confirm('This will permanently delete all your data. Type DELETE to confirm.')) {
        return;
    }
    
    const confirmation = prompt('Type DELETE to confirm account deletion:');
    if (confirmation !== 'DELETE') {
        showAlert('Account deletion cancelled', 'error');
        return;
    }
    
    deleteAccount();
};

// Delete account
async function deleteAccount() {
    if (!currentUser || !supabase) return;
    
    try {
        // Note: Supabase doesn't have a direct delete user method
        // You would need to implement this via Edge Function or Admin API
        showAlert('Account deletion is not yet implemented. Please contact support.', 'error');
        
        // For now, just sign out
        // await window.authSystem?.handleLogout();
        // window.location.href = '../index.html';
        
    } catch (error) {
        console.error('Error deleting account:', error);
        showAlert('Failed to delete account: ' + error.message, 'error');
    }
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Handle logout
window.handleLogout = async function() {
    if (confirm('Are you sure you want to logout?')) {
        await window.authSystem?.handleLogout();
        window.location.href = '../index.html';
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', initSettings);

