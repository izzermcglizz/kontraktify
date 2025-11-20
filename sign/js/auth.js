// Authentication System for Kontraktify Sign

// Initialize Supabase with auth
function initSupabaseWithAuth() {
    if (!initSupabase()) {
        return null;
    }
    return supabase;
}

// Check if user is logged in
async function getCurrentUser() {
    const client = initSupabaseWithAuth();
    if (!client) return null;
    
    const { data: { user }, error } = await client.auth.getUser();
    if (error) {
        console.error('Error getting user:', error);
        return null;
    }
    return user;
}

// Show error message
function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

// Hide error message
function hideError(fieldId) {
    const errorEl = document.getElementById(fieldId);
    if (errorEl) {
        errorEl.classList.remove('show');
    }
}

// Hide all errors
function hideAllErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('show');
    });
}

// Login
async function handleLogin(email, password) {
    const client = initSupabaseWithAuth();
    if (!client) {
        alert('Error: Supabase not initialized');
        return false;
    }
    
    hideAllErrors();
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Memproses...';
    }
    
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email.trim(),
            password: password
        });
        
        if (error) {
            console.error('Login error:', error);
            
            if (error.message.includes('Invalid login credentials')) {
                showError('passwordError', 'Email atau password salah');
            } else if (error.message.includes('Email not confirmed')) {
                showError('emailError', 'Email belum dikonfirmasi. Cek email Anda.');
            } else {
                showError('passwordError', error.message);
            }
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Masuk';
            }
            return false;
        }
        
        // Success - redirect to dashboard
        window.location.href = 'dashboard.html';
        return true;
        
    } catch (error) {
        console.error('Unexpected error:', error);
        showError('passwordError', 'Terjadi kesalahan. Silakan coba lagi.');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Masuk';
        }
        return false;
    }
}

// Register
async function handleRegister(name, email, password, confirmPassword) {
    const client = initSupabaseWithAuth();
    if (!client) {
        alert('Error: Supabase not initialized');
        return false;
    }
    
    hideAllErrors();
    
    // Validation
    if (password.length < 6) {
        showError('passwordError', 'Password minimal 6 karakter');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Password tidak cocok');
        return false;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mendaftar...';
    }
    
    try {
        const { data, error } = await client.auth.signUp({
            email: email.trim(),
            password: password,
            options: {
                data: {
                    name: name.trim(),
                    full_name: name.trim()
                }
            }
        });
        
        if (error) {
            console.error('Register error:', error);
            
            if (error.message.includes('already registered')) {
                showError('emailError', 'Email sudah terdaftar. Silakan login.');
            } else if (error.message.includes('Password')) {
                showError('passwordError', error.message);
            } else {
                showError('emailError', error.message);
            }
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Daftar';
            }
            return false;
        }
        
        // Success - show message and redirect
        alert('✓ Akun berhasil dibuat! Silakan cek email untuk konfirmasi (jika diperlukan).');
        window.location.href = 'login.html';
        return true;
        
    } catch (error) {
        console.error('Unexpected error:', error);
        showError('emailError', 'Terjadi kesalahan. Silakan coba lagi.');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Daftar';
        }
        return false;
    }
}

// Logout
async function handleLogout() {
    const client = initSupabaseWithAuth();
    if (!client) return;
    
    const { error } = await client.auth.signOut();
    if (error) {
        console.error('Logout error:', error);
        alert('Error logging out: ' + error.message);
    } else {
        window.location.href = 'login.html';
    }
}

// Setup login form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        await handleLogin(email, password);
    });
}

// Setup register form
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        await handleRegister(name, email, password, confirmPassword);
    });
}

// Google Login
async function handleGoogleLogin() {
    const client = initSupabaseWithAuth();
    if (!client) {
        alert('Error: Supabase not initialized');
        return;
    }
    
    try {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/sign/dashboard.html`
            }
        });
        
        if (error) {
            console.error('Google login error:', error);
            alert('Error: ' + error.message);
        }
        // OAuth will redirect automatically
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
    }
}

// Facebook Login
async function handleFacebookLogin() {
    const client = initSupabaseWithAuth();
    if (!client) {
        alert('Error: Supabase not initialized');
        return;
    }
    
    try {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${window.location.origin}/sign/dashboard.html`
            }
        });
        
        if (error) {
            console.error('Facebook login error:', error);
            alert('Error: ' + error.message);
        }
        // OAuth will redirect automatically
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
    }
}

// Export functions
window.authSystem = {
    getCurrentUser,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGoogleLogin,
    handleFacebookLogin
};

// Make functions globally available
window.handleGoogleLogin = handleGoogleLogin;
window.handleFacebookLogin = handleFacebookLogin;

