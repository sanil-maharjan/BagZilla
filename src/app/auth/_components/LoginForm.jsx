"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from "react-icons/fi";
import '../login-form.css';

export default function LoginForm({ onModeChange }) {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(loginForm.email, loginForm.password);

        if (result.success) {
            toast.success("Login successful! Redirecting...");
            const redirectUrl = searchParams.get("from") || "/";
            setTimeout(() => router.push(redirectUrl), 1500);
        } else {
            toast.error(result.message);
        }

        setLoading(false);
    };

    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
        <form onSubmit={handleLogin} className="w-100">
            <h2 className="mb-2">Sign In</h2>
            <p className="text-muted mb-4">Welcome back! Please sign in.</p>

            {/* Email */}
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control auth-input"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
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
                    value={loginForm.password}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
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

            {/* Forgot Password */}
            <Link
                href="/forgot-password"
                className="text-right text-red-500 hover:text-red-600 mb-4 block no-underline font-medium transition-colors"
            >
                Forgot password?
            </Link>

            <button type="submit" className="btn auth-btn" disabled={loading}>
                {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
        </form>
    );
}
