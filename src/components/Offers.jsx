import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { offersData } from "../data/offersData";
import OffersHeader from "./offers/OffersHeader";
import OfferCard from "./offers/OfferCard";

export default function Offers({ setProgress }) {
    useEffect(() => {
        if (setProgress) {
            setProgress(20);
            const timer = setTimeout(() => setProgress(100), 500);
            return () => clearTimeout(timer);
        }
    }, [setProgress]);

    return (
        <motion.div 
            className="min-h-screen bg-[var(--bg-base)] py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <OffersHeader />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    {offersData.map((offer, idx) => (
                        <OfferCard key={offer.id} offer={offer} idx={idx} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
