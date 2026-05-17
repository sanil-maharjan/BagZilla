import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Internal Data
import { products } from '../data/products';
import { offersData } from '../data/offersData';
import { copyToClipboard } from '../utils/clipboard';

// Modular Subcomponents
import ProductImage from './productDetails/ProductImage';
import ProductInfo from './productDetails/ProductInfo';
import ProductActions from './productDetails/ProductActions';
import ProductDetailedFeatures from './productDetails/ProductDetailedFeatures';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    
    // Check if product has an offer
    const productOffer = offersData.find(o => o.product.id === product?.id);

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
        navigate(`/checkout/${product.id}?qty=${quantity}`);
    };

    const handleAddToCart = () => {
        toast.success(`${quantity} x ${product.name} added to cart!`);
    };
    
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
