import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { products } from '../../data/products';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim()) {
            const results = products.filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) || 
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
            setIsSearchOpen(true);
        } else {
            setSearchResults([]);
            setIsSearchOpen(false);
        }
    };

    return (
        <div className="relative" ref={searchRef}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
                placeholder="Search bags..."
                className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all w-52"
            />
            <div className="absolute left-3 top-2 text-gray-400">
                <FiSearch size={18} />
            </div>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 md:left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                        <div className="max-h-80 overflow-y-auto p-2">
                            {searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <NavLink 
                                        key={product.id} 
                                        to={`/product/${product.id}`}
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery("");
                                        }}
                                        className="flex items-center gap-3 p-2 hover:bg-[var(--bg-base)] rounded-lg transition-colors"
                                    >
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                                            <p className="text-xs text-gray-500">रू {product.price}</p>
                                        </div>
                                    </NavLink>
                                ))
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500">
                                    No results found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
