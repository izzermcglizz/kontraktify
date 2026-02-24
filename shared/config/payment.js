// Midtrans Payment Configuration - Shared across all subdomains

// Helper to decode credentials (simple obfuscation)
function getConfigValue(encoded) {
  try {
    return atob(encoded);
  } catch (e) {
    return encoded; // Fallback if decoding fails
  }
}

// Midtrans Configuration
// Get these from your Midtrans dashboard: https://dashboard.midtrans.com
// Note: Use Sandbox for testing, Production for live
const MIDTRANS_SERVER_KEY = getConfigValue('YOUR_SERVER_KEY_BASE64'); // Server Key (keep secret!)
const MIDTRANS_CLIENT_KEY = 'YOUR_CLIENT_KEY_HERE'; // Client Key (can be public)
const MIDTRANS_IS_PRODUCTION = false; // Set to true for production

// Midtrans Snap URL
const MIDTRANS_SNAP_URL = MIDTRANS_IS_PRODUCTION 
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js';

// Pricing
const PRICE_PER_TEMPLATE = 350000; // Rp 350,000 per template
const PRICE_PER_SIGN_DOCUMENT = 50000; // Rp 50,000 per e-signature document
const PRICE_PER_COMPARE = 50000; // Rp 50,000 per document comparison

// Payment status
const PAYMENT_STATUS = {
    PENDING: 'pending',
    SUCCESS: 'success',
    SETTLEMENT: 'settlement',
    FAILED: 'failed',
    EXPIRED: 'expired',
    CANCEL: 'cancel',
    DENY: 'deny'
};

// Tool types for payment tracking
const TOOL_TYPE = {
    TEMPLATE: 'template',
    SIGN: 'sign',
    COMPARE: 'compare'
};

/**
 * Create payment via Midtrans Snap API
 * @param {Object} params - Payment parameters
 * @param {string} params.product - Product name
 * @param {number} params.amount - Amount in Rupiah
 * @param {string} params.email - Customer email
 * @param {string} params.name - Customer name
 * @param {string} params.phone - Customer phone
 * @param {string} params.referenceId - Reference ID for tracking
 * @param {string} params.toolType - Tool type (template/sign/compare)
 * @returns {Promise<Object>} Payment response with snap_token
 */
async function createPayment(params) {
    if (!MIDTRANS_SERVER_KEY || MIDTRANS_SERVER_KEY === 'YOUR_SERVER_KEY_BASE64' || 
        !MIDTRANS_CLIENT_KEY || MIDTRANS_CLIENT_KEY === 'YOUR_CLIENT_KEY_HERE') {
        throw new Error('Midtrans credentials not configured. Please set MIDTRANS_SERVER_KEY and MIDTRANS_CLIENT_KEY in shared/config/payment.js');
    }

    const paymentData = {
        transaction_details: {
            order_id: params.referenceId,
            gross_amount: params.amount
        },
        item_details: [{
            id: params.toolType,
            price: params.amount,
            quantity: 1,
            name: params.product
        }],
        customer_details: {
            first_name: params.name,
            email: params.email,
            phone: params.phone
        },
        custom_field1: params.toolType,
        custom_field2: params.referenceId,
        callbacks: {
            finish: `${getSiteURL()}/payment/finish`
        }
    };

    try {
        // Call Supabase Edge Function for Midtrans payment
        if (typeof supabase === 'undefined' || !supabase) {
            throw new Error('Supabase not initialized. Call initSupabase() first.');
        }

        const { data, error } = await supabase.functions.invoke('create-payment', {
            body: paymentData
        });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Payment creation error:', error);
        throw error;
    }
}

/**
 * Open Midtrans Snap payment window
 * @param {string} snapToken - Snap token from createPayment
 * @param {Object} callbacks - Payment callbacks
 */
function openSnapPayment(snapToken, callbacks = {}) {
    if (typeof window.snap === 'undefined') {
        console.error('Midtrans Snap script not loaded');
        throw new Error('Midtrans Snap not loaded. Please include Snap.js in your HTML.');
    }

    window.snap.pay(snapToken, {
        onSuccess: function(result) {
            console.log('Payment success:', result);
            if (callbacks.onSuccess) callbacks.onSuccess(result);
        },
        onPending: function(result) {
            console.log('Payment pending:', result);
            if (callbacks.onPending) callbacks.onPending(result);
        },
        onError: function(result) {
            console.error('Payment error:', result);
            if (callbacks.onError) callbacks.onError(result);
        },
        onClose: function() {
            console.log('Payment popup closed');
            if (callbacks.onClose) callbacks.onClose();
        }
    });
}

/**
 * Verify payment status
 * @param {string} orderId - Midtrans order ID
 * @returns {Promise<Object>} Payment status
 */
async function verifyPayment(orderId) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error} = await supabase
            .from('payments')
            .select('*')
            .eq('order_id', orderId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Payment verification error:', error);
        throw error;
    }
}

/**
 * Save payment record to database
 * @param {Object} paymentData - Payment data
 * @returns {Promise<Object>} Saved payment record
 */
async function savePaymentRecord(paymentData) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase
            .from('payments')
            .insert({
                user_email: paymentData.email,
                amount: paymentData.amount,
                status: paymentData.status || PAYMENT_STATUS.PENDING,
                order_id: paymentData.orderId,
                transaction_id: paymentData.transactionId,
                tool_type: paymentData.toolType,
                reference_id: paymentData.referenceId
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Save payment record error:', error);
        throw error;
    }
}

// Helper to get site URL
function getSiteURL() {
    return window.location.origin;
}

// Load Midtrans Snap script dynamically
function loadSnapScript() {
    return new Promise((resolve, reject) => {
        if (typeof window.snap !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = MIDTRANS_SNAP_URL;
        script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MIDTRANS_SERVER_KEY,
        MIDTRANS_CLIENT_KEY,
        MIDTRANS_IS_PRODUCTION,
        MIDTRANS_SNAP_URL,
        PRICE_PER_TEMPLATE,
        PRICE_PER_SIGN_DOCUMENT,
        PRICE_PER_COMPARE,
        PAYMENT_STATUS,
        TOOL_TYPE,
        createPayment,
        openSnapPayment,
        verifyPayment,
        savePaymentRecord,
        loadSnapScript
    };
}
