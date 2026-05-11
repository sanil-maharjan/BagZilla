import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import "../../styles/toppicks.css";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TopPicks() {
    const topPicks = products.slice(0, 4);

    return (
        <section className="toppicks-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="toppicks-title">Our Top Picks</h2>
                        <p className="toppicks-subtitle">Loved by thousands of happy customers</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="hidden md:block"
                    >
                        <Link to="/shop" className="toppicks-explore-link">
                            Explore All <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>

                {/* Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {topPicks.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="product-card">
                                <div className="product-image-wrapper">
                                    <span className="product-category-badge">{item.category}</span>
                                    <img src={item.image} alt={item.name} />
                                    <div className="product-overlay">
                                        <button className="product-add-btn">Add to Cart</button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <p className="product-name">{item.name}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="product-price">
                                            रू {item.price.toLocaleString()}
                                        </span>
                                        <div className="product-stars">
                                            {Array.from({ length: item.rating }).map((_, i) => (
                                                <Star key={i} size={13} fill="currentColor" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile CTA */}
                <div className="mt-10 text-center md:hidden">
                    <Link
                        to="/shop"
                        className="inline-block w-full py-3 px-8 rounded-full border-2 font-bold text-sm"
                        style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)" }}
                    >
                        Explore All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
