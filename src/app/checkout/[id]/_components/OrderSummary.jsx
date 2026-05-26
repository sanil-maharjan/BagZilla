import React from 'react';
import { Tag, ShieldCheck, Loader2 } from 'lucide-react';

export default function OrderSummary({
    product,
    qty,
    subtotal,
    deliveryFee,
    total,
    promoCode,
    setPromoCode,
    appliedPromo,
    handleApplyPromo,
    handleRemovePromo,
    promoError,
    discountAmount,
    isFormValid,
    onPayWithEsewa,
    onPayWithKhalti,
    isProcessing = false
}) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Product Details Row */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-20 h-20 object-cover rounded-xl border border-gray-100" 
                />
                <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Qty: {qty}</p>
                    <p className="text-[var(--brand-primary)] font-bold mt-1">रू {product.price.toLocaleString()}</p>
                </div>
            </div>

            {/* Promo Code Input */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Tag size={16} /> Promo Code
                </label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none uppercase font-semibold text-sm placeholder:normal-case placeholder:font-normal" 
                        placeholder="ENTER CODE" 
                        disabled={!!appliedPromo || isProcessing}
                    />
                    {appliedPromo ? (
                        <button 
                            type="button"
                            onClick={handleRemovePromo} 
                            disabled={isProcessing}
                            className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors text-sm cursor-pointer"
                        >
                            Remove
                        </button>
                    ) : (
                        <button 
                            type="button"
                            onClick={handleApplyPromo} 
                            disabled={isProcessing}
                            className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors text-sm cursor-pointer"
                        >
                            Apply
                        </button>
                    )}
                </div>
                {promoError && <p className="text-red-500 text-xs mt-2">{promoError}</p>}
                {appliedPromo && <p className="text-green-600 text-xs mt-2 font-medium">Promo code ({appliedPromo.code}) applied successfully!</p>}
            </div>

            {/* Totals Section */}
            <div className="space-y-3 mb-8">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({qty} items)</span>
                    <span>रू {subtotal.toLocaleString()}</span>
                </div>
                {appliedPromo && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount ({appliedPromo.code})</span>
                        <span>- रू {discountAmount.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                        {deliveryFee === 0 ? 'Free' : `रू ${deliveryFee}`}
                    </span>
                </div>
                <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-[var(--brand-primary)]">रू {total.toLocaleString()}</span>
                </div>
            </div>

            {/* Secure Payment Trigger Buttons */}
            <div className="space-y-4">
                <p className="text-xs text-center text-gray-500 mb-2 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} /> Secure Checkout
                </p>

                {/* eSewa Payment Button */}
                <button 
                    type="button"
                    onClick={onPayWithEsewa}
                    disabled={!isFormValid || isProcessing}
                    className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                        isFormValid && !isProcessing
                            ? 'bg-[#60bb46] hover:bg-[#52a33c] hover:shadow-lg text-white' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                        </>
                    ) : (
                        'Pay with eSewa'
                    )}
                </button>

                {/* Khalti Payment Button */}
                <button 
                    type="button"
                    onClick={onPayWithKhalti}
                    disabled={!isFormValid || isProcessing}
                    className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                        isFormValid && !isProcessing
                            ? 'bg-[#5c2d91] hover:bg-[#4a2474] hover:shadow-lg text-white' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                        </>
                    ) : (
                        'Pay with Khalti'
                    )}
                </button>

                {/* Validation Message */}
                {!isFormValid && (
                    <p className="text-center text-xs text-red-500 mt-2">
                        Please fill in all required delivery details to proceed.
                    </p>
                )}
            </div>
        </div>
    );
}
