import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Key, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/forgot-password.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // send the reset email here
        setSubmitted(true);
    };

    return (
        <motion.div 
            className="forgot-password-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="forgot-password-card text-center"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
                {/* Back Link */}
                <Link
                    to="/auth?mode=signin"
                    className="forgot-password-back absolute left-8 top-8"
                >
                    <ArrowLeft />
                    Back to Login
                </Link>

                <div className="text-center mt-12">
                    {/* Icon */}
                    <div className="forgot-password-icon">
                        <Key className="w-8 h-8" />
                    </div>

                    {/* Heading & Text */}
                    <h2 className="forgot-password-title">
                        Forgot Password?
                    </h2>
                    <p className="forgot-password-desc">
                        Enter your email and we'll send you a link to reset your password.
                    </p>

                    {/* Form */}
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="text-left mt-6">
                            <div className="forgot-password-input-wrapper">
                                <label className="forgot-password-label">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="forgot-password-input-icon">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="email"
                                        className="forgot-password-input"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="forgot-password-btn"
                            >
                                Send Reset Link
                            </button>
                        </form>
                    ) : (
                        <motion.div 
                            className="forgot-password-success mt-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Reset link sent! Please check your email for further instructions.
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
