"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiCalendar, FiCreditCard, FiHash, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import '../orders.css';

export default function Orders() {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const { products } = useProducts();
    const router = useRouter();
    const [userOrders, setUserOrders] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/auth?mode=signin&from=/orders');
        }
    }, [authLoading, isAuthenticated, router]);

    // Fetch and filter orders belonging to the logged-in user
    useEffect(() => {
        if (user) {
            try {
                const storedOrders = localStorage.getItem('orders_list');
                const allOrders = storedOrders ? JSON.parse(storedOrders) : [];
                
                // Filter orders belonging to current user ID
                const filtered = allOrders.filter(order => order.userId === user.id);
                
                // Sort by date (descending order, newest first)
                const sorted = filtered.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
                
                setUserOrders(sorted);
            } catch (error) {
                console.error("Error reading user orders:", error);
            } finally {
                setPageLoading(false);
            }
        }
    }, [user]);

    if (authLoading || pageLoading) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null; // Avoid rendering if redirecting

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="orders-page"
        >
            <div className="orders-container">
                {/* Header */}
                <div className="orders-header">
                    <h1 className="orders-title">My Purchase History</h1>
                    <p className="orders-subtitle">Track, view, and manage your recent orders on BagZilla</p>
                </div>

                {/* Main List */}
                {userOrders.length === 0 ? (
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="empty-orders"
                    >
                        <div className="empty-orders-icon-container">
                            <FiShoppingBag size={40} />
                        </div>
                        <h2 className="empty-orders-title">No Orders Placed Yet</h2>
                        <p className="empty-orders-text">
                            It looks like you haven't ordered any premium bags yet. Go explore our shop and find your style!
                        </p>
                        <Link href="/shop" className="btn-shop-now">
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="orders-list">
                        {userOrders.map((order, index) => {
                            const product = products.find(p => p.id === order.productId);
                            
                            return (
                                <motion.div 
                                    key={order.id}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="order-card"
                                >
                                    {/* Order Meta Header */}
                                    <div className="order-card-header">
                                        <div className="order-meta-group">
                                            <div className="order-meta-item">
                                                <span className="order-meta-label">Date Placed</span>
                                                <span className="order-meta-value flex items-center gap-1">
                                                    <FiCalendar size={13} className="text-gray-400" />
                                                    {order.date}
                                                </span>
                                            </div>
                                            <div className="order-meta-item">
                                                <span className="order-meta-label">Transaction ID</span>
                                                <span className="order-meta-value mono flex items-center gap-1">
                                                    <FiHash size={13} className="text-gray-400" />
                                                    {order.transactionId}
                                                </span>
                                            </div>
                                            <div className="order-meta-item">
                                                <span className="order-meta-label">Payment Method</span>
                                                <span className="order-meta-value flex items-center gap-1.5 text-gray-700">
                                                    <FiCreditCard size={13} className="text-gray-400" />
                                                    <span className="gateway-badge">
                                                        <div className={`gateway-dot ${
                                                            order.gateway.toLowerCase().includes('khalti') ? 'khalti' : 'esewa'
                                                        }`} />
                                                        {order.gateway}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    {/* Order Product Info Body */}
                                    <div className="order-card-body">
                                        {product ? (
                                            <>
                                                <div className="order-product-image-container">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        className="order-product-image"
                                                    />
                                                </div>
                                                <div className="order-product-details">
                                                    <span className="order-product-category">{product.category}</span>
                                                    <Link href={`/product/${product.id}`} className="order-product-name">
                                                        {product.name}
                                                    </Link>
                                                    <span className="order-product-qty-price">
                                                        Qty: {order.qty} × रू {product.price.toLocaleString()}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="order-product-details">
                                                <span className="order-product-category">Item</span>
                                                <span className="order-product-name text-gray-400 italic">Product details unavailable</span>
                                                <span className="order-product-qty-price">Qty: {order.qty}</span>
                                            </div>
                                        )}

                                        {/* Total Pricing Group */}
                                        <div className="order-price-group">
                                            <span className="order-total-label">Total Amount</span>
                                            <span className="order-total-val">रू {order.amount.toLocaleString()}</span>
                                            {product && (
                                                <Link 
                                                    href={`/product/${product.id}`} 
                                                    className="mt-2 text-xs font-bold text-[var(--brand-primary)] hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    Buy Again <FiArrowRight size={12} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
