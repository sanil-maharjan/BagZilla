import React from "react";
import { motion } from "framer-motion";

export default function OffersHeader() {
    return (
        <div className="text-center mb-10">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
                Exclusive <span className="text-[var(--brand-primary)]">Offers</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
                Grab the best deals before they're gone! Explore our curated selections with massive discounts.
            </motion.p>
        </div>
    );
}
