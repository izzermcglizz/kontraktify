// iPaymu Payment Configuration - Shared across all subdomains

// iPaymu Configuration
// Get these from your iPaymu dashboard: https://my.ipaymu.com
const IPAYMU_VA = '0000005776604685'; // Virtual Account number
const IPAYMU_API_KEY = 'SANDBOX98A25EA0-9F38-49BC-82C1-9DD6EB48AFBC'; // API Key (Sandbox)

// Pricing
const PRICE_PER_TEMPLATE = 350000; // Rp 350,000 per template
const PRICE_PER_SIGN_DOCUMENT = 50000; // Rp 50,000 per e-signature document
const PRICE_PER_COMPARE = 50000; // Rp 50,000 per document comparison

// Payment status
const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    EXPIRED: 'expired'
};

// Tool types for payment tracking
const TOOL_TYPE = {
    TEMPLATE: 'template',
    SIGN: 'sign',
    COMPARE: 'compare'
};

/**
 * Create payment via iPaymu API
 * @param {Object} params - Payment parameters
 * @param {string} params.product - Product name
 * @param {number} params.amount - Amount in Rupiah
 * @param {string} params.email - Customer email
 * @param {string} params.name - Customer name
 * @param {string} params.phone - Customer phone
 * @param {string} params.referenceId - Reference ID for tracking
 * @param {string} params.toolType - Tool type (template/sign/compare)
 * @param {string} params.returnUrl - Return URL after payment
 * @returns {Promise<Object>} Payment response
 */
async function createPayment(params) {
    if (!IPAYMU_VA || IPAYMU_VA === 'YOUR_IPAYMU_VA_HERE' || 
        !IPAYMU_API_KEY || IPAYMU_API_KEY === 'YOUR_IPAYMU_API_KEY_HERE') {
        throw new Error('iPaymu credentials not configured. Please set IPAYMU_VA and IPAYMU_API_KEY in shared/config/payment.js');
    }

    const paymentData = {
        product: params.product,
        qty: 1,
        price: params.amount,
        buyername: params.name,
        buyermail: params.email,
        buyerphone: params.phone,
        notifyUrl: `${getSiteURL()}/api/payment/notify`,
        returnUrl: params.returnUrl || `${getSiteURL()}/payment/success`,
        cancelUrl: `${getSiteURL()}/payment/cancel`,
        referenceId: params.referenceId,
        // Additional metadata
        metadata: {
            toolType: params.toolType,
            referenceId: params.referenceId
        }
    };

    try {
        // Call Supabase Edge Function for iPaymu payment
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
 * Verify payment status
 * @param {string} transactionId - iPaymu transaction ID
 * @returns {Promise<Object>} Payment status
 */
async function verifyPayment(transactionId) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('ipaymu_transaction_id', transactionId)
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
                ipaymu_transaction_id: paymentData.transactionId,
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

// Helper to get site URL (import from supabase.js if needed)
function getSiteURL() {
    return window.location.origin;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IPAYMU_VA,
        IPAYMU_API_KEY,
        PRICE_PER_TEMPLATE,
        PRICE_PER_SIGN_DOCUMENT,
        PRICE_PER_COMPARE,
        PAYMENT_STATUS,
        TOOL_TYPE,
        createPayment,
        verifyPayment,
        savePaymentRecord
    };
}

