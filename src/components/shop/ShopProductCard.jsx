import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { offersData } from '../../data/offersData';

export default function ShopProductCard({ product }) {
    const offer = offersData.find(o => o.product.id === product.id);
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
        >
            <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden group block">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                        {product.category}
                    </div>
                    {offer && (
                        <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                            <Tag size={12} /> {offer.discount}
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-6 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[var(--brand-primary)] transition-colors">{product.name}</h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-[var(--brand-primary)] font-bold text-lg">
                        रू {product.price.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                        <Link to={`/product/${product.id}`} className="p-2 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 rounded-full hover:bg-[var(--brand-primary)] hover:text-white transition-colors">
                            <Eye size={18} />
                        </Link>
                        <button className="p-2 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 rounded-full hover:bg-[var(--brand-primary)] hover:text-white transition-colors">
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
