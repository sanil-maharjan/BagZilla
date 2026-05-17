import React from 'react';
import { motion } from 'framer-motion';

export default function ShopHeader() {
    return (
        <div className="text-center mb-12">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
                Our Collection
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500"
            >
                Find the perfect bag for your style and needs
            </motion.p>
        </div>
    );
}
