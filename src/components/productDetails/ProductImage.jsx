import React from 'react';
import { motion } from 'framer-motion';

export default function ProductImage({ image, name, category }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2"
        >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative group shadow-inner">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[var(--brand-primary)] shadow-sm">
                    {category}
                </div>
            </div>
        </motion.div>
    );
}
