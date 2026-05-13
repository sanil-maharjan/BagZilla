import "../../styles/auth-panel.css";

export default function AuthPanel({ mode, onModeChange }) {
    return (
        <div className="auth-panel">
            {mode === "signin" ? (
                <div className="auth-panel-content">
                    <h3>Hello, Friend 👋</h3>
                    <p>New here? Create an account and start shopping.</p>
                    <button
                        className="auth-panel-btn"
                        onClick={() => onModeChange("signup")}
                    >
                        SIGN UP
                    </button>
                </div>
            ) : (
                <div className="auth-panel-content">
                    <h3>Welcome Back 👋</h3>
                    <p>Already have an account? Sign in to continue.</p>
                    <button
                        className="auth-panel-btn"
                        onClick={() => onModeChange("signin")}
                    >
                        SIGN IN
                    </button>
                </div>
            )}
        </div>
    );
}
