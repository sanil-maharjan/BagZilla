"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/context/ProductContext';
import ShopHeader from './ShopHeader';
import ShopFilters from './ShopFilters';
import ShopProductCard from './ShopProductCard';

export default function Shop() {
    const { products, loading } = useProducts();
    const [activeCategory, setActiveCategory] = useState("All");

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-base)] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    const filteredProducts = activeCategory === "All" 
        ? products 
        : products.filter(p => p.category === activeCategory);

    return (
        <motion.div 
            className="min-h-screen bg-[var(--bg-base)] py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ShopHeader />
                <ShopFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <ShopProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
