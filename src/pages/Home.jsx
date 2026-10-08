import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">

                <div className="hero-content">

                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Reconnecting people with what matters
                    </div>

                    <h1>
                        Find What's Lost.
                        <br />
                        <span>Return What's Found.</span>
                    </h1>

                    <p>
                        A simple and trusted platform to report lost items,
                        discover found belongings, and help reunite people
                        with what matters most.
                    </p>


                    {/* Search */}
                    <div className="search-box">

                        <span className="search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search for a lost or found item..."
                        />

                        <button>
                            Search
                        </button>

                    </div>


                    {/* Buttons */}
                    <div className="hero-buttons">

                        <Link
                            to="/add-lost-item"
                            className="primary-btn"
                        >
                            Report Lost Item
                            <span>→</span>
                        </Link>

                        <Link
                            to="/add-found-item"
                            className="secondary-btn"
                        >
                            Report Found Item
                            <span>→</span>
                        </Link>

                    </div>

                </div>

            </section>


            {/* Statistics */}
            <section className="stats-section">

                <div className="stat-card">

                    <div className="stat-number">
                        120+
                    </div>

                    <div className="stat-label">
                        Lost Items
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-number">
                        85+
                    </div>

                    <div className="stat-label">
                        Found Items
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-number">
                        60+
                    </div>

                    <div className="stat-label">
                        Items Reunited
                    </div>

                </div>

            </section>


            {/* Recently Reported */}
            <section className="recent-section">

                <div className="section-heading">

                    <div>
                        <p className="section-small-title">
                            RECENT ACTIVITY
                        </p>

                        <h2>
                            Recently Reported
                        </h2>
                    </div>

                    <Link
                        to="/lost-items"
                        className="view-all"
                    >
                        View all →
                    </Link>

                </div>


                <div className="recent-grid">

                    <div className="empty-card">

                        <div className="empty-icon">
                            🔎
                        </div>

                        <h3>
                            Items will appear here
                        </h3>

                        <p>
                            Recently reported lost and found items
                            will be displayed here.
                        </p>

                    </div>


                    <div className="empty-card">

                        <div className="empty-icon">
                            📦
                        </div>

                        <h3>
                            Report an item
                        </h3>

                        <p>
                            Help someone find their belongings by
                            reporting an item.
                        </p>

                    </div>


                    <div className="empty-card">

                        <div className="empty-icon">
                            🤝
                        </div>

                        <h3>
                            Help reunite
                        </h3>

                        <p>
                            Your small action could help someone
                            recover something important.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;