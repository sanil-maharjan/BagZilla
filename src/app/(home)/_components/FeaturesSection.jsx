import { motion } from "framer-motion";
import './features.css';
import { featuresData } from '@/data/featuresData.js';
import { ShoppingBag, ShieldCheck, Star, Truck } from "lucide-react";

const ICONS = { ShoppingBag, ShieldCheck, Star, Truck };

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FeaturesSection() {
    return (
        <section className="features-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="features-section-title">Why Choose BagZilla?</h2>
                    <p className="features-section-subtitle">
                        We go beyond just selling bags — we deliver experiences.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {featuresData.map((f, idx) => {
                        const IconComponent = ICONS[f.icon];
                        return (
                            <motion.div key={idx} variants={cardVariants}>
                                <div className="feature-card">
                                    <div className="feature-icon-wrapper">
                                        {IconComponent && <IconComponent size={28} />}
                                    </div>
                                    <h5 className="feature-title">{f.title}</h5>
                                    <p className="feature-desc">{f.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
