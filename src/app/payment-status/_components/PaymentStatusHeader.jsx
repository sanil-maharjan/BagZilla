import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export default function PaymentStatusHeader({ status, gateway, errorMsg }) {
    const iconVariants = {
        hidden: { scale: 0, rotate: -45 },
        visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.2 } }
    };

    return (
        <div className={`py-12 text-center text-white relative ${
            status === 'success' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
            status === 'canceled' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
            'bg-gradient-to-br from-red-500 to-rose-600'
        }`}>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent)] pointer-events-none" />
            
            <motion.div 
                variants={iconVariants}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/30 mb-4"
            >
                {status === 'success' && <CheckCircle2 size={42} className="text-white" />}
                {status === 'canceled' && <AlertCircle size={42} className="text-white" />}
                {status === 'failed' && <XCircle size={42} className="text-white" />}
            </motion.div>

            <h2 className="text-3xl font-extrabold tracking-tight">
                {status === 'success' && 'Payment Successful!'}
                {status === 'canceled' && 'Payment Canceled'}
                {status === 'failed' && 'Payment Failed'}
            </h2>
            <p className="mt-2 text-white/80 font-medium px-4">
                {status === 'success' && `Thank you! Your transaction via ${gateway} was authorized.`}
                {status === 'canceled' && 'You have terminated the checkout process.'}
                {status === 'failed' && (errorMsg || 'An error occurred during authentication.')}
            </p>
        </div>
    );
}
