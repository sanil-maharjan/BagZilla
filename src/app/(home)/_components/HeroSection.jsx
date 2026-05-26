"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import heroImg from '@/assets/images/hero-bag.jpg';
import './hero.css';

const fadeLeft = { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, ease: "easeOut" } };
const fadeScale = { initial: { opacity: 0, scale: 0.85, rotate: 3 }, animate: { opacity: 1, scale: 1, rotate: 0 }, transition: { duration: 1, ease: "easeOut" } };

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Content */}
                    <motion.div {...fadeLeft} className="flex-1 flex flex-col">
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hero-badge"
                        >
                            Exclusive Collection 2026
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            className="hero-title mb-5"
                        >
                            Style Meets <span className="accent">Durability</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="hero-description mb-8"
                        >
                            Discover the perfect companion for your journey. From sleek office
                            briefcases to rugged adventure backpacks — quality you deserve.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap gap-4 mb-12"
                        >
                            <Link href="/shop" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hero-btn-primary"
                                >
                                    Shop Now <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                            <Link href="/offers" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hero-btn-secondary"
                                >
                                    View Offers
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="hero-stat-block"
                        >
                            <div className="text-center">
                                <div className="hero-stat-value">10k+</div>
                                <div className="hero-stat-label">Customers</div>
                            </div>
                            <div className="text-center hero-stat-divider">
                                <div className="hero-stat-value">500+</div>
                                <div className="hero-stat-label">Designs</div>
                            </div>
                            <div className="text-center">
                                <div className="hero-stat-value">4.9★</div>
                                <div className="hero-stat-label">Rating</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div {...fadeScale} className="flex-1 hero-image-wrapper">
                        <img
                            src={heroImg?.src || heroImg}
                            alt="Premium Bags Collection"
                            className="hero-image"
                        />

                        {/* Floating card */}
                        <motion.div
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            className="hero-floating-card hidden md:flex"
                        >
                            <div className="hero-floating-icon">
                                <TrendingUp size={22} color="#16a34a" />
                            </div>
                            <div>
                                <p className="hero-floating-title">Trending Now</p>
                                <p className="hero-floating-sub">Premium Leather Sets</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
