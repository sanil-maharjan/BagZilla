import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { lookupKhaltiPayment, lookupEsewaPayment } from '../services/payment';

// Helper to save completed orders to localStorage
const completeOrder = (orderKey, gateway, transactionId, amount) => {
    try {
        const pendingKey = `pending_order_${orderKey}`;
        const storedPending = localStorage.getItem(pendingKey);
        let orderDetails = null;

        if (storedPending) {
            orderDetails = JSON.parse(storedPending);
            // Clear all pending references
            localStorage.removeItem(pendingKey);
            if (orderDetails.transactionUuid) {
                localStorage.removeItem(`pending_order_${orderDetails.transactionUuid}`);
            }
            if (orderDetails.purchaseOrderId) {
                localStorage.removeItem(`pending_order_${orderDetails.purchaseOrderId}`);
            }
            if (orderDetails.pidx) {
                localStorage.removeItem(`pending_order_${orderDetails.pidx}`);
            }
        } else {
            // Fallback mock if no pending order is found
            const storedUser = localStorage.getItem('user');
            const userObj = storedUser ? JSON.parse(storedUser) : null;
            
            // Extract product ID from the orderKey if formatted like BAGZILLA-ORDER-[timestamp]-[productId]
            const parts = orderKey ? orderKey.split('-') : [];
            let productId = 1; // Fallback to first product
            if (parts.length > 0) {
                const lastPart = parseInt(parts[parts.length - 1]);
                if (!isNaN(lastPart)) {
                    productId = lastPart;
                }
            }

            orderDetails = {
                productId: productId,
                qty: 1,
                userId: userObj ? userObj.id : null,
                total: amount,
                date: new Date().toLocaleDateString(),
                gateway: gateway
            };
        }

        // Save to completed orders list
        const allOrders = JSON.parse(localStorage.getItem('orders_list') || '[]');
        
        // Avoid duplicate saves
        if (!allOrders.some(o => o.transactionId === transactionId)) {
            const completedOrder = {
                id: 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                transactionId: transactionId,
                orderId: orderKey,
                productId: orderDetails.productId,
                qty: orderDetails.qty,
                amount: amount,
                gateway: gateway,
                date: orderDetails.date || new Date().toLocaleDateString(),
                status: 'Completed',
                userId: orderDetails.userId
            };

            allOrders.push(completedOrder);
            localStorage.setItem('orders_list', JSON.stringify(allOrders));
        }
    } catch (e) {
        console.error("Error saving completed order:", e);
    }
};

export function usePaymentStatus() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('pending'); // 'success', 'failed', 'pending', 'canceled'
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    // Parse parameters robustly from location.search to handle eSewa's double '?' redirect bug
    const searchString = window.location.search;
    
    let gateway = searchParams.get('gateway') || '';
    if (gateway.includes('?')) {
        gateway = gateway.split('?')[0];
    }
    if (!gateway && (searchString.includes('data=') || searchParams.has('data'))) {
        gateway = 'esewa';
    }

    let khaltiStatus = searchParams.get('status') || '';
    if (searchString.includes('status=')) {
        const statusMatch = searchString.match(/[?&]status=([^?&]+)/);
        if (statusMatch) {
            khaltiStatus = decodeURIComponent(statusMatch[1]);
        }
    }
    const isEsewaFailed = khaltiStatus === 'failed';

    let encodedData = searchParams.get('data') || '';
    if (!encodedData && searchString.includes('data=')) {
        const dataMatch = searchString.match(/[?&]data=([^?&]+)/);
        if (dataMatch) {
            encodedData = dataMatch[1];
        }
    }

    let pidx = searchParams.get('pidx') || '';
    if (!pidx && searchString.includes('pidx=')) {
        const pidxMatch = searchString.match(/[?&]pidx=([^?&]+)/);
        if (pidxMatch) {
            pidx = pidxMatch[1];
        }
    }

    let amountParam = parseFloat(searchParams.get('amount')) || 4500;
    if (searchString.includes('amount=')) {
        const amountMatch = searchString.match(/[?&]amount=([^?&]+)/);
        if (amountMatch) {
            amountParam = parseFloat(amountMatch[1]) || 4500;
        }
    }

    const verificationStarted = useRef(false);

    // Seed mock orders for preset users if not already seeded
    useEffect(() => {
        const hasSeeded = localStorage.getItem('orders_seeded');
        if (!hasSeeded) {
            const mockOrders = [
                {
                    id: 'ORD-MOCK-1',
                    transactionId: 'TXN-ESW-1001234',
                    orderId: 'BAGZILLA-1716182400000-1',
                    productId: 1, // Classic Leather Tote
                    qty: 1,
                    amount: 4500,
                    gateway: 'eSewa',
                    date: '2026-05-10',
                    status: 'Completed',
                    userId: 2 // User1
                },
                {
                    id: 'ORD-MOCK-2',
                    transactionId: 'TXN-KHL-2005432',
                    orderId: 'BAGZILLA-ORDER-1716223400000-2',
                    productId: 2, // Urban Explorer Backpack
                    qty: 1,
                    amount: 3200,
                    gateway: 'Khalti',
                    date: '2026-05-12',
                    status: 'Completed',
                    userId: 2 // User1
                },
                {
                    id: 'ORD-MOCK-3',
                    transactionId: 'TXN-ESW-3006789',
                    orderId: 'BAGZILLA-1716244500000-3',
                    productId: 3, // Professional Briefcase
                    qty: 1,
                    amount: 5800,
                    gateway: 'eSewa',
                    date: '2026-05-15',
                    status: 'Completed',
                    userId: 3 // User2
                },
                {
                    id: 'ORD-MOCK-4',
                    transactionId: 'TXN-KHL-4009876',
                    orderId: 'BAGZILLA-ORDER-1716289000000-4',
                    productId: 4, // Compact Crossbody Bag
                    qty: 2,
                    amount: 4200,
                    gateway: 'Khalti',
                    date: '2026-05-18',
                    status: 'Processing',
                    userId: 3 // User2
                },
                {
                    id: 'ORD-MOCK-5',
                    transactionId: 'TXN-ESW-5001122',
                    orderId: 'BAGZILLA-1716301200000-5',
                    productId: 5, // Sleek Handbag
                    qty: 1,
                    amount: 3800,
                    gateway: 'eSewa',
                    date: '2026-05-19',
                    status: 'Completed',
                    userId: 1 // Sanil Maharjan
                }
            ];
            localStorage.setItem('orders_list', JSON.stringify(mockOrders));
            localStorage.setItem('orders_seeded', 'true');
        }
    }, []);

    useEffect(() => {
        if (!gateway) {
            setLoading(false);
            setStatus('failed');
            setErrorMsg('Invalid payment gateway specified.');
            return;
        }

        // Prevent double execution in React Strict Mode
        if (verificationStarted.current) return;
        verificationStarted.current = true;

        if (gateway === 'esewa') {
            handleEsewaCallback();
        } else if (gateway === 'khalti') {
            handleKhaltiCallback();
        }
    }, [searchParams, gateway]);

    /**
     * Parse and verify eSewa success callback details
     */
    const handleEsewaCallback = async () => {
        if (isEsewaFailed) {
            setLoading(false);
            setStatus('failed');
            setErrorMsg('The transaction was canceled or failed during payment processing at eSewa.');
            return;
        }

        if (!encodedData) {
            setLoading(false);
            setStatus('failed');
            setErrorMsg('No payment data received from eSewa.');
            return;
        }

        // Support Simulation Fallback Mode if parameter matches
        if (encodedData === 'SIMULATED_SUCCESS') {
            const orderId = 'SIM-ESW-ORD-' + Date.now();
            const transactionId = 'SIM-ESW-TXN-' + Math.floor(Math.random() * 10000000);
            setLoading(false);
            setStatus('success');
            setPaymentDetails({
                gateway: 'eSewa (Simulated)',
                transactionId: transactionId,
                orderId: orderId,
                amount: amountParam,
                status: 'Completed',
                date: new Date().toLocaleDateString()
            });
            completeOrder(orderId, 'eSewa (Simulated)', transactionId, amountParam);
            toast.success("eSewa Simulated Payment Verified!");
            return;
        }

        try {
            // Decode Base64 data from eSewa redirect
            const decodedString = atob(encodedData);
            const data = JSON.parse(decodedString);
            
            // Check status in local payload
            if (data.status !== 'COMPLETE') {
                setLoading(false);
                setStatus('failed');
                setErrorMsg(`eSewa Transaction Status: ${data.status || 'FAILED'}`);
                return;
            }

            // Secure step: Invoke eSewa Status Check API via Vite Proxy to confirm integrity
            const verificationResult = await lookupEsewaPayment({
                totalAmount: parseFloat(data.total_amount),
                transactionUuid: data.transaction_uuid,
                productCode: data.product_code || 'EPAYTEST'
            });

            if (verificationResult.success && verificationResult.data.status === 'COMPLETE') {
                const txnId = verificationResult.data.ref_id || data.transaction_code;
                const ordId = verificationResult.data.transaction_uuid;
                const amt = verificationResult.data.total_amount;
                setStatus('success');
                setPaymentDetails({
                    gateway: 'eSewa',
                    transactionId: txnId,
                    orderId: ordId,
                    amount: amt,
                    status: 'Completed',
                    date: new Date().toLocaleDateString()
                });
                completeOrder(ordId, 'eSewa', txnId, amt);
                toast.success("eSewa payment verified successfully!");
            } else {
                setStatus('failed');
                setErrorMsg("eSewa transaction verification failed or is not yet marked COMPLETE.");
                toast.error("Payment verification failed.");
            }
        } catch (error) {
            console.error("eSewa callback handling error:", error);
            setStatus('failed');
            setErrorMsg('Failed to process payment receipt data.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Parse and verify Khalti callback details
     */
    const handleKhaltiCallback = async () => {
        if (khaltiStatus === 'User canceled') {
            setLoading(false);
            setStatus('canceled');
            setErrorMsg('Payment canceled by user.');
            return;
        }

        if (!pidx) {
            setLoading(false);
            setStatus('failed');
            setErrorMsg('No transaction identifier received from Khalti.');
            return;
        }

        // Support Simulation Fallback Mode if parameter matches
        if (pidx === 'SIMULATED_SUCCESS') {
            const orderId = 'SIM-KHL-ORD-' + Date.now();
            const transactionId = 'SIM-KHL-TXN-' + Math.floor(Math.random() * 10000000);
            setLoading(false);
            setStatus('success');
            setPaymentDetails({
                gateway: 'Khalti (Simulated)',
                transactionId: transactionId,
                orderId: orderId,
                amount: amountParam,
                status: 'Completed',
                fee: 0,
                date: new Date().toLocaleDateString()
            });
            completeOrder(orderId, 'Khalti (Simulated)', transactionId, amountParam);
            toast.success("Khalti Simulated Payment Verified!");
            return;
        }

        try {
            // Verify payment status with Khalti's server-side Lookup API
            const result = await lookupKhaltiPayment(pidx);

            if (result.success && result.data.status === 'Completed') {
                const txnId = result.data.transaction_id;
                const ordId = result.data.pidx;
                const amt = result.data.total_amount / 100; // convert paisa back to rupees
                setStatus('success');
                setPaymentDetails({
                    gateway: 'Khalti',
                    transactionId: txnId,
                    orderId: ordId,
                    amount: amt,
                    status: result.data.status,
                    fee: result.data.fee,
                    date: new Date().toLocaleDateString()
                });
                completeOrder(ordId, 'Khalti', txnId, amt);
                toast.success("Khalti payment verified successfully!");
            } else {
                setStatus('failed');
                setErrorMsg(`Transaction lookup returned status: ${result.data?.status || 'Failed'}`);
                toast.error("Payment verification failed.");
            }
        } catch (error) {
            console.error("Khalti callback lookup error:", error);
            setStatus('failed');
            setErrorMsg('Error executing Khalti secure verification.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        status,
        paymentDetails,
        errorMsg,
        gateway
    };
}
