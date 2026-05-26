"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Internal Data
import { useProducts } from '@/context/ProductContext';
// import { offersData } from '@/data/offersData';
import { copyToClipboard } from '@/utils/clipboard';

// Modular Subcomponents
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';
import ProductDetailedFeatures from './ProductDetailedFeatures';

export default function ProductDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { products, offers, loading } = useProducts();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-base)] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    // Check if product has an offer
    const productOffer = offers.find(o => o.product_id === product?.id || o.productId === product?.id);

    const handleCopyPromo = async (text) => {
        const success = await copyToClipboard(text);
        if (success) {
            toast.success(`Promo code "${text}" copied!`, {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } else {
            toast.error("Failed to copy code. Please try manually.", {
                autoClose: 2000,
            });
        }
    };

    const handleBuyNow = () => {
        router.push(`/checkout/${product.id}?qty=${quantity}`);
    };

    const handleAddToCart = () => {
        toast.success(`${quantity} x ${product.name} added to cart!`);
    };
    
    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center text-2xl font-bold flex flex-col items-center justify-center gap-4">
                <span>Product not found</span>
                <Link href="/shop" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12">
                    {/* Left - Image Component */}
                    <ProductImage 
                        image={product.image}
                        name={product.name}
                        category={product.category}
                    />

                    {/* Right - Product Details Component */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full lg:w-1/2 flex flex-col justify-center"
                    >
                        <ProductInfo 
                            product={product}
                            productOffer={productOffer}
                            onCopyPromo={handleCopyPromo}
                        />

                        <ProductActions 
                            quantity={quantity}
                            setQuantity={setQuantity}
                            onBuyNow={handleBuyNow}
                            onAddToCart={handleAddToCart}
                        />
                    </motion.div>
                </div>

                {/* Bottom Section - Detailed Features Component */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 pt-12 border-t border-gray-100"
                >
                    <ProductDetailedFeatures features={product.features} />
                </motion.div>
            </div>
        </motion.div>
    );
}
