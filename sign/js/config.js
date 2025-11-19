// Sign subdomain now uses shared config
// Import shared Supabase config
// Note: In production, these should be loaded from shared/config/supabase.js
// For now, keeping local config for backward compatibility

// Supabase Configuration (from shared/config/supabase.js)
const SUPABASE_URL = 'https://pkujwqglpqbfpmspzwhw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdWp3cWdscHFiZnBtc3B6d2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDUwNTIsImV4cCI6MjA3ODQyMTA1Mn0.ZoRES0AxhxT0iNxM90WJ549zvalY70whyA5LVJsCgBw';

// Initialize Supabase client
let supabase = null;

// Check if Supabase library is loaded
function initSupabase() {
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase library not loaded');
        return false;
    }
    
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE') {
        console.warn('Supabase credentials not configured');
        alert('⚠️ Supabase belum di-setup!\n\nBaca SETUP_GUIDE.md untuk setup Supabase.\n\nUntuk sekarang, semua data hanya tersimpan sementara di browser.');
        return false;
    }
    
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return true;
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        return false;
    }
}

// Helper function to generate secure random tokens
function generateToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Get current site URL
function getSiteURL() {
  return window.location.origin;
}

