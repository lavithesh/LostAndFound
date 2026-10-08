import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmpassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmpassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post("/register", formData);

            console.log("Register response:", response.data);

            // Save email for OTP page
            localStorage.setItem("registrationEmail", formData.email);

              

navigate("/verify-otp", {
    state: {
        email: formData.email
    }
});

        } catch (error) {

            console.error("Registration error:", error);

            if (error.response) {
                setError(
                    error.response.data?.message ||
                    "Registration failed. Please check your details."
                );
            } else {
                setError("Unable to connect to server.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="register-page">

            <div className="register-container">

                {/* LEFT SIDE */}

                <div className="register-left">

                    <div className="register-brand">
                        <div className="register-brand-icon">
                            🔎
                        </div>

                        <span>
                            Lost<span>&</span>Found
                        </span>
                    </div>


                    <div className="register-intro">

                        <p className="register-label">
                            JOIN THE COMMUNITY
                        </p>

                        <h1>
                            Help something
                            <br />
                            <span>find its way home.</span>
                        </h1>

                        <p className="register-description">
                            Create your account and become part of a
                            community helping people recover their lost
                            belongings.
                        </p>


                        <div className="register-benefits">

                            <div className="register-benefit">
                                <div>✓</div>
                                <span>Report lost belongings</span>
                            </div>

                            <div className="register-benefit">
                                <div>✓</div>
                                <span>Report items you've found</span>
                            </div>

                            <div className="register-benefit">
                                <div>✓</div>
                                <span>Reconnect people with their items</span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="register-right">

                    <div className="register-card">

                        <div className="register-mobile-brand">
                            🔎 Lost&Found
                        </div>


                        <h2>Create your account</h2>

                        <p className="register-subtitle">
                            Join Lost & Found and help reunite people
                            with their belongings.
                        </p>


                        {error && (
                            <div className="register-error">
                                {error}
                            </div>
                        )}


                        <form onSubmit={handleSubmit}>


                            {/* NAME */}

                            <div className="register-form-group">

                                <label>Full name</label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* EMAIL + MOBILE */}

                            <div className="register-row">

                                <div className="register-form-group">

                                    <label>Email address</label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="register-form-group">

                                    <label>Mobile number</label>

                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Mobile number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div className="register-form-group">

                                <label>Password</label>

                                <div className="register-password">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? "🙈" : "👁"}
                                    </button>

                                </div>

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <div className="register-form-group">

                                <label>Confirm password</label>

                                <div className="register-password">

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmpassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmpassword}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? "🙈" : "👁"}
                                    </button>

                                </div>

                            </div>


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="register-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Creating account..."
                                    : "Create account"
                                }

                                {!loading && <span>→</span>}

                            </button>

                        </form>


                        <div className="register-login">

                            Already have an account?

                            <Link to="/login">
                                Sign in
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;