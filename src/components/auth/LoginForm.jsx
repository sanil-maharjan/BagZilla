import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/login-form.css";

export default function LoginForm({ onModeChange }) {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" | "error"

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const result = await login(loginForm.email, loginForm.password);

        if (result.success) {
            setMessage("Login successful! Redirecting...");
            setMessageType("success");
            setTimeout(() => navigate("/"), 1500);
        } else {
            setMessage(result.message);
            setMessageType("error");
        }

        setLoading(false);
    };

    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
        <form onSubmit={handleLogin} className="w-100">
            <h2 className="mb-2">Sign In</h2>
            <p className="text-muted mb-4">Welcome back! Please sign in.</p>

            {message && (
                <div
                    className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"
                        } mb-3`}
                >
                    {message}
                </div>
            )}

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
                <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} auth-eye`}
                    onClick={togglePassword}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") togglePassword();
                    }}
                    aria-label="Toggle password visibility"
                />
            </div>

            {/* Forgot Password */}
            <Link
                to="/forgot-password"
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
