import { Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import officeBag from '../../assets/images/office-hand-bag.jpg';

export default function AboutHero() {
    return (
        <motion.div
            className="about-hero-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h1 className="about-hero-title">
                    Our Journey at <span className="about-hero-brand">BagZilla</span>
                </h1>
                <p className="about-hero-desc">
                    Founded in 2026, BagZilla started with a simple mission: to provide the people of Nepal with high-quality, stylish, and durable bags at prices that make sense.
                </p>
                <p className="about-hero-desc">
                    We believe that a bag is more than just an accessory; it's a companion that carries your world. Whether you're a student, a professional, or an adventurer, we have something designed specifically for you.
                </p>

                <div className="about-stats-container">
                    <div className="about-stat-pill">
                        <div className="about-stat-icon">
                            <Heart className="w-5 h-5" />
                        </div>
                        <span className="about-stat-text">10k+ Happy Souls</span>
                    </div>
                    <div className="about-stat-pill">
                        <div className="about-stat-icon">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="about-stat-text">100% Authentic</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="about-hero-image-wrapper"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <img
                    src={officeBag}
                    alt="Office Hand Bag"
                    className="about-hero-image"
                />
            </motion.div>
        </motion.div>
    );
}
