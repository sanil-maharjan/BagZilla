"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AuthPanel from "./AuthPanel";
import '../auth.css';

export default function Auth() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";

    // Lock body scroll on desktop while the auth page is mounted
    useEffect(() => {
        document.body.classList.add("auth-page-active");
        document.documentElement.classList.add("auth-page-active");
        return () => {
            document.body.classList.remove("auth-page-active");
            document.documentElement.classList.remove("auth-page-active");
        };
    }, []);

    const handleModeChange = (newMode) => {
        const from = searchParams.get("from");
        const query = from ? `?mode=${newMode}&from=${encodeURIComponent(from)}` : `?mode=${newMode}`;
        router.push(`/auth${query}`);
    };

    return (
        <motion.div
            className="auth-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className={`auth-container ${mode === "signup" ? "signup" : ""}`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
                {/* FORM AREA — slides left on signup */}
                <div className="auth-form-wrapper">
                    {mode === "signin" ? (
                        <LoginForm onModeChange={handleModeChange} />
                    ) : (
                        <RegisterForm onModeChange={handleModeChange} />
                    )}
                </div>

                {/* GRADIENT SIDE PANEL — slides right on signup */}
                <AuthPanel mode={mode} onModeChange={handleModeChange} />

            </motion.div>
        </motion.div>
    );
}
