import React from 'react';

export default function PaymentStatusLoading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-base)] px-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mt-4">
                    Verifying Secure Payment
                </h3>
                <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                    Please do not refresh the page or click back. We are communicating with the payment gateways to authenticate your transaction.
                </p>
            </div>
        </div>
    );
}
