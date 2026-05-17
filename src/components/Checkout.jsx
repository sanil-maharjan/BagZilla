import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Internal Data
import { products } from '../data/products';

// Custom Hooks
import { useCheckout } from '../hooks/useCheckout';

// Modular Components
import CheckoutHeader from './checkout/CheckoutHeader';
import DeliveryForm from './checkout/DeliveryForm';
import OrderSummary from './checkout/OrderSummary';

export default function Checkout() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    
    const qty = parseInt(searchParams.get('qty')) || 1;
    const product = products.find(p => p.id === parseInt(id));

    // Delegate all state management and payment verification triggers to hook
    const {
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
    } = useCheckout({ product, qty });

    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center text-2xl font-bold flex flex-col items-center justify-center gap-4">
                <span>Product not found</span>
                <Link to="/shop" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[var(--bg-base)] py-12"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Subcomponent */}
                <CheckoutHeader productId={product.id} />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left - Delivery Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full lg:w-7/12"
                    >
                        <DeliveryForm 
                            formData={formData} 
                            handleInputChange={handleInputChange} 
                        />
                    </motion.div>

                    {/* Right - Order Summary & Payment */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full lg:w-5/12"
                    >
                        <OrderSummary 
                            product={product}
                            qty={qty}
                            subtotal={subtotal}
                            deliveryFee={deliveryFee}
                            total={total}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            appliedPromo={appliedPromo}
                            handleApplyPromo={handleApplyPromo}
                            handleRemovePromo={handleRemovePromo}
                            promoError={promoError}
                            discountAmount={discountAmount}
                            isFormValid={isFormValid}
                            onPayWithEsewa={handlePayWithEsewa}
                            onPayWithKhalti={handlePayWithKhalti}
                            isProcessing={isProcessing}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
