import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">

                    <div className="logo-icon">
                        LF
                    </div>

                    <div className="logo-text">
                        <span>Lost</span>
                        <span>&</span>
                        <span>Found</span>
                    </div>

                </Link>


                {/* Navigation */}
                <div className="navbar-links">

                    <Link to="/" className="nav-link">
                        Home
                    </Link>

                    <Link to="/lost-items" className="nav-link">
                        Lost Items
                    </Link>

                    <Link to="/found-items" className="nav-link">
                        Found Items
                    </Link>

                    {/* Show Dashboard only when logged in */}
                    {user && (
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    )}

                </div>


                {/* Right side */}
                <div className="navbar-actions">

                    {!user ? (
                        <>
                            <Link to="/login" className="login-btn">
                                Login
                            </Link>

                            <Link to="/register" className="register-btn">
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="nav-user">
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;