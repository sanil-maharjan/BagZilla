import React from 'react';

export default function PaymentStatusError({ errorMsg }) {
    return (
        <div className="text-center space-y-4">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-sm font-semibold max-w-md mx-auto">
                {errorMsg || 'We were unable to verify your payment status.'}
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
                If you believe this is in error and funds have been deducted from your wallet, please contact BagZilla customer support with your checkout details.
            </p>
        </div>
    );
}
