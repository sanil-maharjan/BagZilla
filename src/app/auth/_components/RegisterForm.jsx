"use client";

import React, { useState } from "react";
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from "react-icons/fi";
import '../register-form.css';

export default function RegisterForm({ onModeChange }) {
    const { register } = useAuth();

    const [registerForm, setRegisterForm] = useState({
        fullname: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        usertype: "user",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!termsAccepted) {
            toast.error("You must accept the terms and conditions.");
            setLoading(false);
            return;
        }

        if (registerForm.phone_number.replace(/\D/g, '').length < 10) {
            toast.error("Phone number must be at least 10 digits.");
            setLoading(false);
            return;
        }

        if (registerForm.password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        if (registerForm.password !== registerForm.confirm_password) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        const result = await register(registerForm);

        if (result.success) {
            toast.success(result.message);
            setTimeout(() => onModeChange("signin"), 2000);
        } else {
            toast.error(result.message);
        }

        setLoading(false);
    };

    const togglePassword = () => setShowPassword((prev) => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    return (
        <form onSubmit={handleRegister} className="w-100">
            <h2 className="mb-2">Create Account</h2>
            <p className="text-muted mb-3">Create your BagZilla account</p>

            {/* Full Name */}
            <div className="mb-2">
                <input
                    type="text"
                    className="form-control auth-input"
                    placeholder="Full Name"
                    value={registerForm.fullname}
                    onChange={(e) =>
                        setRegisterForm({ ...registerForm, fullname: e.target.value })
                    }
                    required
                />
            </div>

            {/* Email */}
            <div className="mb-2">
                <input
                    type="email"
                    className="form-control auth-input"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={(e) =>
                        setRegisterForm({ ...registerForm, email: e.target.value })
                    }
                    required
                />
            </div>

            {/* Phone */}
            <div className="mb-2">
                <input
                    type="tel"
                    className="form-control auth-input"
                    placeholder="Phone Number"
                    value={registerForm.phone_number}
                    onChange={(e) =>
                        setRegisterForm({ ...registerForm, phone_number: e.target.value })
                    }
                    required
                />
            </div>

            {/* Password */}
            <div className="auth-password mb-2">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control auth-input"
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={(e) =>
                        setRegisterForm({ ...registerForm, password: e.target.value })
                    }
                    required
                />
                {showPassword ? (
                    <FiEyeOff
                        className="auth-eye"
                        onClick={togglePassword}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") togglePassword();
                        }}
                        aria-label="Hide password"
                    />
                ) : (
                    <FiEye
                        className="auth-eye"
                        onClick={togglePassword}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") togglePassword();
                        }}
                        aria-label="Show password"
                    />
                )}
            </div>

            {/* Confirm Password */}
            <div className="auth-password mb-3">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control auth-input"
                    placeholder="Confirm Password"
                    value={registerForm.confirm_password}
                    onChange={(e) =>
                        setRegisterForm({
                            ...registerForm,
                            confirm_password: e.target.value,
                        })
                    }
                    required
                />
                {showConfirmPassword ? (
                    <FiEyeOff
                        className="auth-eye"
                        onClick={toggleConfirmPassword}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") toggleConfirmPassword();
                        }}
                        aria-label="Hide confirm password"
                    />
                ) : (
                    <FiEye
                        className="auth-eye"
                        onClick={toggleConfirmPassword}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") toggleConfirmPassword();
                        }}
                        aria-label="Show confirm password"
                    />
                )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-4 flex items-start gap-2 text-sm text-gray-600">
                <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-[var(--brand-primary)] rounded border-gray-300 focus:ring-[var(--brand-primary)]"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="leading-tight">
                    I agree to the{" "}
                    <a href="/terms" target="_blank" className="text-[var(--brand-primary)] hover:underline font-medium">Terms and Conditions</a>
                    {" "}and{" "}
                    <a href="/privacy" target="_blank" className="text-[var(--brand-primary)] hover:underline font-medium">Privacy Policy</a>.
                </label>
            </div>

            <button type="submit" className={`btn auth-btn ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading || !termsAccepted}>
                {loading ? "SIGNING UP..." : "SIGN UP"}
            </button>
        </form>
    );
}
