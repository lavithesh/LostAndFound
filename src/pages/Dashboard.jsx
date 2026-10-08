import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Dashboard() {

    const { user, loading } = useAuth();

    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setDataLoading(true);

            const [lostResponse, foundResponse] = await Promise.all([
                api.get("/"),
                api.get("/foundItem")
            ]);

            setLostItems(lostResponse.data);
            setFoundItems(foundResponse.data);

        } catch (error) {
            console.error("Dashboard loading error:", error);
        } finally {
            setDataLoading(false);
        }
    };

    if (loading || dataLoading) {
        return (
            <div className="premium-dashboard-loading">
                <div className="premium-loader"></div>
                <p>Preparing your dashboard...</p>
            </div>
        );
    }

    return (
        <main className="premium-dashboard">

            {/* Background decoration */}
            <div className="dashboard-glow glow-one"></div>
            <div className="dashboard-glow glow-two"></div>

            <div className="dashboard-wrapper">

                {/* ================= HERO ================= */}

                <section className="dashboard-welcome">

                    <div className="welcome-content">

                        <span className="welcome-label">
                            <span className="label-dot"></span>
                            PERSONAL DASHBOARD
                        </span>

                        <h1>
                            Welcome back,
                            <br />
                            <span>{user?.name}</span>
                            <span className="wave">👋</span>
                        </h1>

                        <p>
                            Keep track of your lost and found activity,
                            all in one place.
                        </p>

                    </div>


                    <div className="profile-mini-card">

                        <div className="profile-avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="profile-details">
                            <strong>{user?.name}</strong>
                            <span>{user?.email}</span>

                            <div className="profile-role">
                                {user?.role || "USER"}
                            </div>
                        </div>

                    </div>

                </section>


                {/* ================= STATISTICS ================= */}

                <section className="dashboard-stat-grid">

                    {/* Lost */}
                    <div className="premium-stat-card">

                        <div className="stat-top">
                            <div className="stat-symbol lost-symbol">
                                <span>⌕</span>
                            </div>

                            <span className="stat-menu">•••</span>
                        </div>

                        <div className="stat-number">
                            {lostItems.length}
                        </div>

                        <div className="stat-title">
                            Lost Items
                        </div>

                        <div className="stat-description">
                            Items reported as lost
                        </div>

                        <div className="stat-line">
                            <span style={{ width: "72%" }}></span>
                        </div>

                    </div>


                    {/* Found */}
                    <div className="premium-stat-card">

                        <div className="stat-top">
                            <div className="stat-symbol found-symbol">
                                ✓
                            </div>

                            <span className="stat-menu">•••</span>
                        </div>

                        <div className="stat-number">
                            {foundItems.length}
                        </div>

                        <div className="stat-title">
                            Found Items
                        </div>

                        <div className="stat-description">
                            Items reported by users
                        </div>

                        <div className="stat-line">
                            <span style={{ width: "58%" }}></span>
                        </div>

                    </div>


                    {/* Total */}
                    <div className="premium-stat-card featured-stat">

                        <div className="stat-top">
                            <div className="stat-symbol total-symbol">
                                ✦
                            </div>

                            <span className="stat-menu">•••</span>
                        </div>

                        <div className="stat-number">
                            {lostItems.length + foundItems.length}
                        </div>

                        <div className="stat-title">
                            Total Activity
                        </div>

                        <div className="stat-description">
                            Lost & found activity
                        </div>

                        <div className="stat-line">
                            <span style={{ width: "85%" }}></span>
                        </div>

                    </div>

                </section>


                {/* ================= MAIN GRID ================= */}

                <section className="dashboard-main-grid">

                    {/* Quick Actions */}

                    <div className="dashboard-panel actions-panel">

                        <div className="panel-heading">

                            <div>
                                <span className="panel-eyebrow">
                                    GET STARTED
                                </span>

                                <h2>What would you like to do?</h2>
                            </div>

                        </div>


                        <div className="action-grid">

                            <Link
                                to="/add-lost-item"
                                className="premium-action lost-action"
                            >

                                <div className="action-icon">
                                    🔎
                                </div>

                                <div className="action-content">
                                    <h3>Report Lost Item</h3>

                                    <p>
                                        Tell others about something
                                        you've lost.
                                    </p>
                                </div>

                                <span className="action-arrow">
                                    ↗
                                </span>

                            </Link>


                            <Link
                                to="/add-found-item"
                                className="premium-action found-action"
                            >

                                <div className="action-icon">
                                    📦
                                </div>

                                <div className="action-content">
                                    <h3>Report Found Item</h3>

                                    <p>
                                        Help someone recover their
                                        belongings.
                                    </p>
                                </div>

                                <span className="action-arrow">
                                    ↗
                                </span>

                            </Link>

                        </div>

                    </div>


                    {/* Account Overview */}

                    <div className="dashboard-panel account-panel">

                        <div className="panel-heading">

                            <div>
                                <span className="panel-eyebrow">
                                    ACCOUNT
                                </span>

                                <h2>Your Profile</h2>
                            </div>

                        </div>


                        <div className="account-info">

                            <div className="account-avatar">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <strong>{user?.name}</strong>
                                <span>{user?.email}</span>
                            </div>

                        </div>


                        <div className="account-divider"></div>


                        <div className="account-row">
                            <span>Account type</span>
                            <strong>{user?.role || "USER"}</strong>
                        </div>

                        <div className="account-row">
                            <span>Lost reports</span>
                            <strong>{lostItems.length}</strong>
                        </div>

                        <div className="account-row">
                            <span>Found reports</span>
                            <strong>{foundItems.length}</strong>
                        </div>


                        <Link
                            to="/profile"
                            className="profile-button"
                        >
                            View Profile
                            <span>→</span>
                        </Link>

                    </div>

                </section>


                {/* ================= ACTIVITY ================= */}

                <section className="dashboard-panel activity-panel">

                    <div className="panel-heading activity-heading">

                        <div>
                            <span className="panel-eyebrow">
                                OVERVIEW
                            </span>

                            <h2>Recent Activity</h2>
                        </div>

                        <Link
                            to="/my-items"
                            className="view-all"
                        >
                            View all →
                        </Link>

                    </div>


                    <div className="empty-activity">

                        <div className="empty-icon">
                            ✦
                        </div>

                        <div>
                            <h3>Your activity will appear here</h3>

                            <p>
                                Once you report a lost or found item,
                                you'll see your recent activity here.
                            </p>
                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default Dashboard;