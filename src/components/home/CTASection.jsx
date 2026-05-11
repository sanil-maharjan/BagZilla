import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/cta.css";

export default function CTASection() {
    return (
        <section className="cta-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="cta-box"
                >
                    {/* Animated blobs */}
                    <div className="cta-blob-1" />
                    <div className="cta-blob-2" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="cta-title"
                    >
                        Ready to find your perfect bag?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="cta-description"
                    >
                        Join thousands of happy customers and upgrade your style with our
                        premium collection today.
                    </motion.p>

                    <Link to="/auth" className="no-underline">
                        <motion.button
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            className="cta-btn"
                        >
                            Join Now for Discounts <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
