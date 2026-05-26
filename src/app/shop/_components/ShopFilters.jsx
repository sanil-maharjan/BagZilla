import React from 'react';
import { motion } from 'framer-motion';

const categories = ["All", "Luxury", "Backpack", "Office", "Casual"];

export default function ShopFilters({ activeCategory, setActiveCategory }) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, idx) => (
                <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        activeCategory === category 
                            ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-md' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                >
                    {category}
                </motion.button>
            ))}
        </div>
    );
}
