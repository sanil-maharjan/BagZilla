import React from 'react';
import { Receipt, Calendar } from 'lucide-react';

export default function ReceiptDetails({ paymentDetails }) {
    if (!paymentDetails) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-900 font-bold text-lg flex items-center gap-2">
                    <Receipt className="text-gray-400" size={18} /> Receipt Details
                </span>
                <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs border border-emerald-100">
                    Verified
                </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="space-y-1">
                    <span className="text-gray-400 text-xs block font-semibold uppercase">Gateway</span>
                    <span className="text-gray-800 font-bold text-base flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                            paymentDetails.gateway.includes('Khalti') ? 'bg-[#5c2d91]' : 'bg-[#60bb46]'
                        }`} />
                        {paymentDetails.gateway}
                    </span>
                </div>
                <div className="space-y-1">
                    <span className="text-gray-400 text-xs block font-semibold uppercase">Transaction ID</span>
                    <span className="text-gray-800 font-mono font-bold text-sm tracking-tight overflow-ellipsis overflow-hidden block">
                        {paymentDetails.transactionId}
                    </span>
                </div>
                <div className="space-y-1">
                    <span className="text-gray-400 text-xs block font-semibold uppercase">Order ID</span>
                    <span className="text-gray-800 font-mono text-xs overflow-ellipsis overflow-hidden block">
                        {paymentDetails.orderId}
                    </span>
                </div>
                <div className="space-y-1">
                    <span className="text-gray-400 text-xs block font-semibold uppercase">Transaction Date</span>
                    <span className="text-gray-800 font-medium flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" />
                        {paymentDetails.date}
                    </span>
                </div>
            </div>

            {/* Pricing Row */}
            <div className="flex justify-between items-center bg-[var(--brand-primary)]/5 p-6 rounded-2xl border border-[var(--brand-primary)]/10">
                <span className="text-gray-700 font-extrabold text-base">Amount Paid</span>
                <span className="text-[var(--brand-primary)] font-black text-2xl">
                    रू {paymentDetails.amount.toLocaleString()}
                </span>
            </div>

            <p className="text-center text-xs text-gray-400">
                A confirmation receipt and shipping updates will be sent to your contact shortly.
            </p>
        </div>
    );
}
