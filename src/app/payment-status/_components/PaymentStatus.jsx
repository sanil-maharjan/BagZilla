"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Custom Hook
import { usePaymentStatus } from '@/hooks/usePaymentStatus';

// Modular Subcomponents
import PaymentStatusHeader from './PaymentStatusHeader';
import ReceiptDetails from './ReceiptDetails';
import PaymentStatusActions from './PaymentStatusActions';
import PaymentStatusLoading from './PaymentStatusLoading';
import PaymentStatusError from './PaymentStatusError';

import '../PaymentStatus.css';

export default function PaymentStatus() {
    const { loading, status, paymentDetails, errorMsg, gateway } = usePaymentStatus();

    // Framer Motion Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    if (loading) {
        return <PaymentStatusLoading />;
    }

    return (
        <div className="min-h-screen bg-[var(--bg-base)] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="max-w-3xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
                {/* Header Component */}
                <PaymentStatusHeader 
                    status={status}
                    gateway={paymentDetails?.gateway || (gateway === 'khalti' ? 'Khalti' : 'eSewa')}
                    errorMsg={errorMsg}
                />

                {/* Body Component */}
                <div className="p-8">
                    {status === 'success' && paymentDetails ? (
                        <ReceiptDetails paymentDetails={paymentDetails} />
                    ) : (
                        <PaymentStatusError errorMsg={errorMsg} />
                    )}

                    {/* Actions Component */}
                    <PaymentStatusActions status={status} />
                </div>
            </motion.div>
        </div>
    );
}
