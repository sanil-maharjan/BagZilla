import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
// import { offersData } from '../data/offersData';
import { useProducts } from '../context/ProductContext';
import { initiateKhaltiPayment, generateEsewaSignature } from '../services/payment';
import { useAuth } from '../context/AuthContext';

export function useCheckout({ product, qty }) {
    const { user } = useAuth();
    const { offers } = useProducts();
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        location: '',
        landmark: '',
        details: ''
    });
    
    // Promo State
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');
    
    // Loading State
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = product ? product.price * qty : 0;
    
    // Calculate Discount
    let discountAmount = 0;
    if (appliedPromo) {
        if (appliedPromo.discount.includes('%')) {
            const percent = parseInt(appliedPromo.discount);
            discountAmount = subtotal * (percent / 100);
        } else if (appliedPromo.discount.includes('रू')) {
            const amount = parseInt(appliedPromo.discount.replace(/[^0-9]/g, ''));
            discountAmount = amount;
        }
    }
    
    // Check if product has an offer for free delivery logic
    const productOffer = product ? offers.find(o => o.product_id === product.id || o.productId === product.id) : null;
    const deliveryFee = productOffer ? 0 : 100;
    
    const total = Math.max(0, subtotal - discountAmount + deliveryFee);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyPromo = () => {
        setPromoError('');
        if (!promoCode.trim()) return;

        // Find promo code
        const offer = offers.find(o => o.code.toUpperCase() === promoCode.toUpperCase());
        
        if (!offer) {
            setPromoError('Invalid promo code');
            setAppliedPromo(null);
            return;
        }

        // Restrict to specific product
        if (offer.product_id !== product.id && offer.productId !== product.id) {
            setPromoError(`This promo code is not valid for this product`);
            setAppliedPromo(null);
            return;
        }

        setAppliedPromo(offer);
        setPromoError('');
        toast.success("Promo code applied successfully!");
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
        toast.info("Promo code removed.");
    };

    // Validation
    const isFormValid = formData.fullName.trim() !== '' && 
                        formData.phone.trim() !== '' && 
                        formData.location.trim() !== '';

    /**
     * Handles Pay with eSewa Payment redirection using dynamic form POSTing
     */
    const handlePayWithEsewa = async () => {
        if (!isFormValid) {
            toast.error("Please fill in all required delivery details.");
            return;
        }

        setIsProcessing(true);
        toast.info("Preparing eSewa payment gateway...", { autoClose: 1500 });

        try {
            // Generate unique transaction UUID
            const transactionUuid = `BAGZILLA-${Date.now()}-${product.id}`;
            const uatSecret = "8gBm/:&EnhH.1/q"; // Standard Sandbox Secret Key
            const uatProductCode = "EPAYTEST";  // Standard Sandbox Product Code

            // Format total for eSewa
            const amountVal = total - deliveryFee;
            const deliveryChargeVal = deliveryFee;
            const totalVal = total;

            // Signature Input
            const signatureMsg = `total_amount=${totalVal},transaction_uuid=${transactionUuid},product_code=${uatProductCode}`;
            
            // Generate signature securely in browser using Web Crypto API
            const signature = await generateEsewaSignature(uatSecret, signatureMsg);

            // Create dynamic eSewa redirection form
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

            const fields = {
                "amount": amountVal.toString(),
                "tax_amount": "0",
                "product_service_charge": "0",
                "product_delivery_charge": deliveryChargeVal.toString(),
                "product_code": uatProductCode,
                "total_amount": totalVal.toString(),
                "transaction_uuid": transactionUuid,
                "success_url": `${window.location.origin}/payment-status?gateway=esewa`,
                "failure_url": `${window.location.origin}/payment-status?gateway=esewa&status=failed`,
                "signed_field_names": "total_amount,transaction_uuid,product_code",
                "signature": signature
            };

            // Save pending order details in localStorage
            const pendingOrder = {
                productId: product.id,
                qty: qty,
                userId: user ? user.id : null,
                total: totalVal,
                date: new Date().toLocaleDateString(),
                gateway: 'eSewa',
                transactionUuid: transactionUuid
            };
            localStorage.setItem(`pending_order_${transactionUuid}`, JSON.stringify(pendingOrder));

            // Inject fields as hidden inputs
            Object.entries(fields).forEach(([name, val]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = val;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error("eSewa redirection error:", error);
            toast.error("Failed to redirect to eSewa. Please try again.");
            setIsProcessing(false);
        }
    };

    /**
     * Handles Pay with Khalti payment initiation via Vite server proxy
     */
    const handlePayWithKhalti = async () => {
        if (!isFormValid) {
            toast.error("Please fill in all required delivery details.");
            return;
        }

        setIsProcessing(true);
        toast.info("Initiating secure Khalti checkout...", { autoClose: 1500 });

        const purchaseOrderId = `BAGZILLA-ORDER-${Date.now()}-${product.id}`;

        const result = await initiateKhaltiPayment({
            amount: total,
            purchaseOrderId,
            purchaseOrderName: product.name.substring(0, 90),
            customerInfo: {
                name: formData.fullName,
                phone: formData.phone
            }
        });

        if (result.success && result.data.payment_url) {
            // Save pending order details in localStorage under both keys
            const pendingOrder = {
                productId: product.id,
                qty: qty,
                userId: user ? user.id : null,
                total: total,
                date: new Date().toLocaleDateString(),
                gateway: 'Khalti',
                purchaseOrderId: purchaseOrderId,
                pidx: result.data.pidx
            };
            localStorage.setItem(`pending_order_${purchaseOrderId}`, JSON.stringify(pendingOrder));
            localStorage.setItem(`pending_order_${result.data.pidx}`, JSON.stringify(pendingOrder));

            toast.success("Redirection to Khalti...");
            window.location.href = result.data.payment_url;
        } else {
            toast.error(result.error || "Failed to initiate Khalti payment. Please try again.");
            setIsProcessing(false);
        }
    };

    return {
        formData,
        promoCode,
        setPromoCode,
        appliedPromo,
        promoError,
        isProcessing,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        handleInputChange,
        handleApplyPromo,
        handleRemovePromo,
        isFormValid,
        handlePayWithEsewa,
        handlePayWithKhalti
    };
}
