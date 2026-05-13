import React, { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import AuthPanel from "./auth/AuthPanel";
import "../styles/auth.css";

export default function Auth() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    // Resolve mode from URL param or router location state
    const urlMode = searchParams.get("mode");
    const stateMode =
        location.state?.form === "register"
            ? "signup"
            : location.state?.form === "login"
                ? "signin"
                : null;

    const initialMode = urlMode || stateMode || "signin";
    const mode = initialMode === "signup" ? "signup" : "signin";

    // If mode came from location.state without a URL param, sync URL
    useEffect(() => {
        if (stateMode && !urlMode) {
            setSearchParams({ mode: stateMode }, { replace: true });
        }
    }, [stateMode, urlMode, setSearchParams]);

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
        setSearchParams({ mode: newMode });
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
