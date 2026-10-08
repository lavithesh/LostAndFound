import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const email = location.state?.email || "";

    const handleVerify = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email) {
            setError("Email not found. Please register again.");
            return;
        }

        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/otp", null, {
                params: {
                    otp: Number(otp),
                    email: email
                }
            });

            setMessage("Account verified successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Invalid or expired OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setMessage("");
        setError("");

        if (!email) {
            setError("Email not found. Please register again.");
            return;
        }

        try {
            await api.get(
                `/resend-otp/${encodeURIComponent(email)}`
            );

            setMessage("A new OTP has been sent to your email.");

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to resend OTP. Please try again."
            );
        }
    };

    return (
        <div className="verify-page">

            {/* Background decoration */}
            <div className="verify-glow verify-glow-one"></div>
            <div className="verify-glow verify-glow-two"></div>

            <div className="verify-container">

                {/* Left section */}
                <div className="verify-info">

                    <div className="brand-logo">
                        <div className="brand-icon">LF</div>

                        <span>Lost<span>&</span>Found</span>
                    </div>

                    <div className="verify-info-content">

                        <div className="shield-large">
                            🔐
                        </div>

                        <h1>
                            Almost there.
                        </h1>

                        <p>
                            We've sent a verification code to your
                            email address. Enter the code to complete
                            your account registration.
                        </p>

                        <div className="security-points">

                            <div>
                                <span>✓</span>
                                Secure email verification
                            </div>

                            <div>
                                <span>✓</span>
                                Your account is protected
                            </div>

                            <div>
                                <span>✓</span>
                                OTP expires in 2 minutes
                            </div>

                        </div>

                    </div>

                </div>


                {/* Right section */}
                <div className="verify-card">

                    <div className="verify-icon">
                        <span>✉</span>
                    </div>

                    <h2>
                        Verify your email
                    </h2>

                    <p className="verify-subtitle">
                        Enter the 6-digit verification code
                        we sent to
                    </p>

                    <div className="email-badge">
                        <span>✉</span>
                        {email || "your email"}
                    </div>


                    <form onSubmit={handleVerify}>

                        <div className="otp-label">
                            <label>Verification code</label>

                            <span>
                                {otp.length}/6
                            </span>
                        </div>

                        <input
                            className="otp-input"
                            type="text"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6)
                                )
                            }
                            placeholder="000000"
                            maxLength="6"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            autoFocus
                        />

                        {/* OTP boxes visual */}
                        <div className="otp-dots">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <div
                                    key={index}
                                    className={
                                        index < otp.length
                                            ? "otp-dot active"
                                            : "otp-dot"
                                    }
                                >
                                    {otp[index] || ""}
                                </div>
                            ))}
                        </div>


                        {error && (
                            <div className="verify-error">
                                <span>!</span>
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="verify-success">
                                <span>✓</span>
                                {message}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="verify-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify account
                                    <span>→</span>
                                </>
                            )}
                        </button>

                    </form>


                    <div className="resend-area">

                        <p>
                            Didn't receive the code?
                        </p>

                        <button
                            type="button"
                            onClick={handleResend}
                            className="resend-button"
                        >
                            Resend OTP
                        </button>

                    </div>


                    <button
                        className="back-register"
                        onClick={() => navigate("/register")}
                    >
                        ← Back to registration
                    </button>

                </div>

            </div>

        </div>
    );
}

export default VerifyOtp;