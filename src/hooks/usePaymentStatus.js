import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { lookupKhaltiPayment, lookupEsewaPayment } from '../services/payment';

export function usePaymentStatus() {
    const [searchParams] = useSearchParams();
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
            setLoading(false);
            setStatus('success');
            setPaymentDetails({
                gateway: 'eSewa (Simulated)',
                transactionId: 'SIM-ESW-TXN-' + Math.floor(Math.random() * 10000000),
                orderId: 'SIM-ESW-ORD-' + Date.now(),
                amount: amountParam,
                status: 'Completed',
                date: new Date().toLocaleDateString()
            });
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
                setStatus('success');
                setPaymentDetails({
                    gateway: 'eSewa',
                    transactionId: verificationResult.data.ref_id || data.transaction_code,
                    orderId: verificationResult.data.transaction_uuid,
                    amount: verificationResult.data.total_amount,
                    status: 'Completed',
                    date: new Date().toLocaleDateString()
                });
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
            setLoading(false);
            setStatus('success');
            setPaymentDetails({
                gateway: 'Khalti (Simulated)',
                transactionId: 'SIM-KHL-TXN-' + Math.floor(Math.random() * 10000000),
                orderId: 'SIM-KHL-ORD-' + Date.now(),
                amount: amountParam,
                status: 'Completed',
                fee: 0,
                date: new Date().toLocaleDateString()
            });
            toast.success("Khalti Simulated Payment Verified!");
            return;
        }

        try {
            // Verify payment status with Khalti's server-side Lookup API
            const result = await lookupKhaltiPayment(pidx);

            if (result.success && result.data.status === 'Completed') {
                setStatus('success');
                setPaymentDetails({
                    gateway: 'Khalti',
                    transactionId: result.data.transaction_id,
                    orderId: result.data.pidx,
                    amount: result.data.total_amount / 100, // convert paisa back to rupees
                    status: result.data.status,
                    fee: result.data.fee,
                    date: new Date().toLocaleDateString()
                });
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
