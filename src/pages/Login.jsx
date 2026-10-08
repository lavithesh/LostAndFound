import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/login", {
                email: email,
                password: password
            });

            console.log("Login response:", response.data);

            setUser(response.data);

            if (response.data.role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {

            console.error("Login error:", err);

            setError(
                typeof err.response?.data === "string"
                    ? err.response.data
                    : "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="login-page">

            {/* LEFT BRAND SECTION */}

            <div className="login-brand">

                <div className="brand-content">

                    <div className="brand-logo">
                        🔎
                    </div>

                    <h1>
                        Lost<span>&</span>Found
                    </h1>

                    <p>
                        Helping people reconnect with the
                        things that matter most.
                    </p>

                    <div className="brand-features">

                        <div>
                            <span>✓</span>
                            Report lost items
                        </div>

                        <div>
                            <span>✓</span>
                            Find missing belongings
                        </div>

                        <div>
                            <span>✓</span>
                            Connect with your community
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT LOGIN SECTION */}

            <div className="login-section">

                <div className="login-card">

                    <button
                        className="login-back"
                        onClick={() => navigate("/")}
                    >
                        ← Back to home
                    </button>


                    <div className="login-heading">

                        <span className="welcome-badge">
                            Welcome back
                        </span>

                        <h2>
                            Sign in to your account
                        </h2>

                        <p>
                            Enter your details to continue.
                        </p>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="login-error">

                            <span>⚠</span>

                            <div>
                                {error}
                            </div>

                        </div>

                    )}


                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

                        <div className="premium-input">

                            <label>
                                Email address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="premium-input">

                            <div className="password-label">

                                <label>
                                    Password
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/forgot-password")
                                    }
                                >
                                    Forgot password?
                                </button>

                            </div>


                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="premium-login-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="login-spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <span>→</span>
                                </>
                            )}

                        </button>

                    </form>


                    {/* REGISTER */}

                    <div className="register-line">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            onClick={() =>
                                navigate("/register")
                            }
                        >
                            Create account
                        </button>

                    </div>


                    <div className="login-security">

                        🔐 Your information is securely protected

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;