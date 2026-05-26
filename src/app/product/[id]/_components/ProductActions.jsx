import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart, Zap, Heart } from 'lucide-react';

export default function ProductActions({ quantity, setQuantity, onBuyNow, onAddToCart }) {
    return (
        <div className="w-full">
            {/* Quantity */}
            <div className="flex items-center gap-6 mb-10">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Quantity
                </span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                    <button 
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                        className="p-3 hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none cursor-pointer"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="w-16 text-center text-base font-bold text-gray-900 select-none">
                        {quantity}
                    </span>
                    <button 
                        type="button"
                        onClick={() => setQuantity(quantity + 1)} 
                        className="p-3 hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none cursor-pointer"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <motion.button 
                    onClick={onBuyNow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[var(--brand-secondary)] hover:bg-[var(--brand-primary)] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Zap size={20} />
                    Buy Now
                </motion.button>
                <motion.button 
                    onClick={onAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[var(--brand-primary)] hover:bg-[#003366] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    <ShoppingCart size={20} />
                    Add to Cart
                </motion.button>
                <motion.button 
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-600 font-bold py-4 px-6 rounded-xl shadow-sm transition-colors flex items-center justify-center border border-gray-200 hover:border-red-200 cursor-pointer"
                    title="Add to Wishlist"
                >
                    <Heart size={20} />
                </motion.button>
            </div>
        </div>
    );
}
