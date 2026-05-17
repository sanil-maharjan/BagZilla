import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

export default function ProductInfo({ product, productOffer, onCopyPromo }) {
    return (
        <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                {product.name}
            </h1>
            
            {productOffer && (
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onCopyPromo(productOffer.code)}
                    className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-bold mb-6 border border-red-100 cursor-pointer hover:bg-red-100 transition-colors"
                    title="Click to copy promo code"
                >
                    <Tag size={16} />
                    {productOffer.discount} with code: <span className="underline decoration-dotted underline-offset-4">{productOffer.code}</span>
                </motion.div>
            )}
            
            <div className="mb-8 pb-8 border-b border-gray-100">
                <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-6">
                    रू {product.price.toLocaleString()}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                </p>
            </div>

            {/* Specifications Mini-Grid */}
            <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
                    Specifications
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                        <span className="text-gray-500 block mb-1">Category</span>
                        <span className="text-gray-900 font-semibold">{product.category}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block mb-1">Material</span>
                        <span className="text-gray-900 font-semibold">
                            {product.tags?.includes('leather') ? 'Premium Leather' : 'High-Quality Fabric'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
