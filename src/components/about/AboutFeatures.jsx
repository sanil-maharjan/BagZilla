import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { aboutFeaturesData } from '../../../src/data/aboutFeaturesData.js';
import '../../../src/styles/features.css';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutFeatures() {
    return (
        <motion.div
            className="about-features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {aboutFeaturesData.map((feature, idx) => {
                const IconComponent = Icons[feature.icon];
                return (
                    <motion.div key={idx} variants={cardVariants} className="feature-card">
                        <div className="feature-icon-wrapper">
                            {IconComponent && <IconComponent className="w-7 h-7" />}
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-desc">{feature.desc}</p>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
