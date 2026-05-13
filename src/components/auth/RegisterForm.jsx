import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/register-form.css";

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
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" | "error"

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (registerForm.password !== registerForm.confirm_password) {
            setMessage("Passwords do not match");
            setMessageType("error");
            setLoading(false);
            return;
        }

        const result = await register(registerForm);

        if (result.success) {
            setMessage(result.message);
            setMessageType("success");
            setTimeout(() => onModeChange("signin"), 2000);
        } else {
            setMessage(result.message);
            setMessageType("error");
        }

        setLoading(false);
    };

    const togglePassword = () => setShowPassword((prev) => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    return (
        <form onSubmit={handleRegister} className="w-100">
            <h2 className="mb-2">Create Account</h2>
            <p className="text-muted mb-3">Create your BagZilla account</p>

            {message && (
                <div
                    className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"
                        } mb-3`}
                >
                    {message}
                </div>
            )}

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
                <i
                    className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                        } auth-eye`}
                    onClick={toggleConfirmPassword}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleConfirmPassword();
                    }}
                    aria-label="Toggle confirm password visibility"
                />
            </div>

            <button type="submit" className="btn auth-btn" disabled={loading}>
                {loading ? "SIGNING UP..." : "SIGN UP"}
            </button>
        </form>
    );
}
