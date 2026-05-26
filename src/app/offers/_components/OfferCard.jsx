"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { copyToClipboard } from '@/utils/clipboard';
import { useProducts } from '@/context/ProductContext';

export default function OfferCard({ offer, idx }) {
    const { products } = useProducts();
    const product = products.find(p => p.id === offer.product_id || p.id === offer.productId);
    
    if (!product) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden group"
        >
            {/* Background Accent */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
            
            <div className="absolute top-6 right-6">
                <Tag className="text-[var(--brand-primary)] opacity-20 group-hover:opacity-100 transition-opacity" size={48} />
            </div>

            <div className="relative z-10">
                <h2 className="text-3xl font-black text-[var(--brand-primary)] mb-2">{offer.discount}</h2>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{offer.title}</h3>
                
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                        const success = await copyToClipboard(offer.code);
                        if (success) {
                            toast.success(`Promo code "${offer.code}" copied!`, {
                                autoClose: 2000,
                                hideProgressBar: true,
                            });
                        } else {
                            toast.error("Failed to copy code.");
                        }
                    }}
                    className="inline-flex items-center bg-gray-50 px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-8 cursor-pointer hover:bg-gray-100 transition-colors"
                    title="Click to copy promo code"
                >
                    <span className="text-xs text-gray-500 font-semibold tracking-wider mr-2">CODE:</span>
                    <span className="font-bold text-gray-900 tracking-wide">{offer.code}</span>
                </motion.div>

                <Link href={`/product/${product.id}`} className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-2xl border border-gray-100 group/item cursor-pointer block">
                    <img
                        src={product.image}
                        className="w-20 h-20 rounded-xl object-cover shadow-sm group-hover/item:scale-105 transition-transform"
                        alt={product.name}
                    />
                    <div>
                        <p className="font-bold text-gray-800 line-clamp-1 group-hover/item:text-[var(--brand-primary)] transition-colors">{product.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Starting from <span className="font-semibold text-[var(--brand-primary)]">रू {product.price}</span>
                        </p>
                    </div>
                </Link>

                <Link href={`/product/${product.id}`} className="mt-8 w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn">
                    Shop Now 
                    <motion.div className="group-hover/btn:translate-x-1 transition-transform">
                        <ArrowRight size={20} />
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
}
