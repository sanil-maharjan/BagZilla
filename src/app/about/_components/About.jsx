"use client";

import AboutHero from './AboutHero';
import AboutFeatures from './AboutFeatures';
import { motion } from 'framer-motion';
import '../about.css';

export default function About() {
    return (
        <motion.div
            className="about-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="about-container">
                <AboutHero />
                <AboutFeatures />
            </div>
        </motion.div>
    );
}
