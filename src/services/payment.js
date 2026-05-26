/**
 * services/payment.js
 * Service layer for Khalti and eSewa payment integration.
 */

/**
 * Generate HMAC-SHA256 signature in Base64 for eSewa using native browser Web Crypto API.
 * This avoids importing heavy libraries like crypto-js.
 * 
 * @param {string} secret The eSewa UAT/Production Secret Key
 * @param {string} message The signature message, formatted as 'total_amount=VAL,transaction_uuid=VAL,product_code=VAL'
 * @returns {Promise<string>} The Base64 signature
 */
export async function generateEsewaSignature(secret, message) {
    const enc = new TextEncoder();
    const key = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
    );
    const signature = await window.crypto.subtle.sign(
        "HMAC",
        key,
        enc.encode(message)
    );
    
    // Convert ArrayBuffer to base64 character string securely
    const hashArray = Array.from(new Uint8Array(signature));
    const hashString = hashArray.map(b => String.fromCharCode(b)).join('');
    return btoa(hashString);
}

/**
 * Initiates a Khalti payment via the local Vite dev server proxy.
 * The Vite proxy attaches the secret API authorization key securely.
 */
export async function initiateKhaltiPayment({ amount, purchaseOrderId, purchaseOrderName, customerInfo }) {
    try {
        const payload = {
            return_url: `${window.location.origin}/payment-status?gateway=khalti`,
            website_url: window.location.origin,
            amount: Math.round(amount * 100), // convert rupees to paisa
            purchase_order_id: purchaseOrderId,
            purchase_order_name: purchaseOrderName,
            customer_info: {
                name: customerInfo.name || "BagZilla Customer",
                email: customerInfo.email || "customer@bagzilla.com",
                phone: customerInfo.phone
            }
        };

        const response = await fetch("/api/khalti/epayment/initiate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data };
        } else {
            console.error("Khalti initiation failed response:", data);
            // Handle array-based validation errors from Khalti
            const errorMsg = typeof data === 'object' 
                ? Object.values(data).flat().join(" ")
                : "Khalti payment initiation failed.";
            return { success: false, error: errorMsg };
        }
    } catch (error) {
        console.error("Khalti initiation error:", error);
        return { success: false, error: "Unable to connect to Khalti servers." };
    }
}

/**
 * Verifies Khalti transaction status using lookup API via secure Vite proxy.
 */
export async function lookupKhaltiPayment(pidx) {
    try {
        const response = await fetch("/api/khalti/epayment/lookup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pidx })
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, error: data.detail || "Khalti payment verification failed." };
        }
    } catch (error) {
        console.error("Khalti lookup error:", error);
        return { success: false, error: "Network error verifying Khalti payment status." };
    }
}

/**
 * Verifies eSewa transaction status via the local Vite dev server status check proxy.
 */
export async function lookupEsewaPayment({ totalAmount, transactionUuid, productCode = "EPAYTEST" }) {
    try {
        // eSewa status check endpoint expects total_amount, transaction_uuid, and product_code
        const params = new URLSearchParams({
            product_code: productCode,
            total_amount: totalAmount.toString(),
            transaction_uuid: transactionUuid
        });

        const response = await fetch(`/api/esewa/transaction/status/?${params.toString()}`);
        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, error: data.error_message || "eSewa verification request timed out." };
        }
    } catch (error) {
        console.error("eSewa lookup error:", error);
        return { success: false, error: "Network error verifying eSewa payment status." };
    }
}
