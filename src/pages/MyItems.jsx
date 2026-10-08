import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyLostItems, deleteLostItem } from "../services/lostItemService";
import { getMyFoundItems,deleteFoundItem} from "../services/foundItemService";
import { useNavigate } from "react-router-dom";


function MyItems() {

    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadMyItems();
    }, []);

    const loadMyItems = async () => {

        try {

            setLoading(true);
            setError("");

            const [lostResponse, foundResponse] = await Promise.all([
                getMyLostItems(),
                getMyFoundItems()
            ]);

            setLostItems(lostResponse.data);
            setFoundItems(foundResponse.data);

        } catch (error) {

            console.error("Error loading my items:", error);

            setError(
                "Unable to load your items. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleDeleteFoundItem = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this found item?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteFoundItem(id);

        setFoundItems((previousItems) =>
            previousItems.filter((item) => item.id !== id)
        );

        alert("Found item deleted successfully!");

    } catch (error) {

        console.error(
            "Error deleting found item:",
            error
        );

        if (error.response?.status === 403) {
            alert("You are not authorized to delete this item.");
        } else if (error.response?.status === 401) {
            alert("Your session has expired. Please login again.");
        } else if (error.response?.status === 404) {
            alert("Found item not found.");
        } else {
            alert("Failed to delete the found item.");
        }
    }
};

    const handleDeleteLostItem = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this lost item?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteLostItem(id);

        setLostItems((previousItems) =>
            previousItems.filter((item) => item.id !== id)
        );

        alert("Lost item deleted successfully!");

    } catch (error) {

        console.error(
            "Error deleting lost item:",
            error
        );

        if (error.response?.status === 403) {
            alert("You are not authorized to delete this item.");
        } else if (error.response?.status === 401) {
            alert("Your session has expired. Please login again.");
        } else {
            alert("Failed to delete the lost item.");
        }
    }
};

    if (loading) {
        return (
            <div className="my-items-loading">
                <div className="my-items-loader"></div>
                <p>Loading your items...</p>
            </div>
        );
    }

    return (
        <main className="my-items-page">

            <div className="my-items-glow my-glow-one"></div>
            <div className="my-items-glow my-glow-two"></div>

            <div className="my-items-container">

                {/* Back */}

                <Link
                    to="/dashboard"
                    className="my-items-back"
                >
                    <span>←</span>
                    Back to Dashboard
                </Link>


                {/* Header */}

                <section className="my-items-header">

                    <div className="my-items-badge">
                        <span></span>
                        YOUR ACTIVITY
                    </div>

                    <h1>
                        Your lost &
                        <br />
                        <span>found items.</span>
                    </h1>

                    <p>
                        Manage the items you've reported and keep
                        track of your lost and found activity.
                    </p>

                </section>


                {/* Error */}

                {error && (
                    <div className="my-items-error">
                        {error}
                    </div>
                )}


                {/* Summary */}

                <section className="my-items-summary">

                    <div className="summary-card">
                        <div className="summary-icon lost-summary-icon">
                            🔎
                        </div>

                        <div>
                            <strong>{lostItems.length}</strong>
                            <span>Lost Items</span>
                        </div>
                    </div>


                    <div className="summary-card">
                        <div className="summary-icon found-summary-icon">
                            📦
                        </div>

                        <div>
                            <strong>{foundItems.length}</strong>
                            <span>Found Items</span>
                        </div>
                    </div>


                    <div className="summary-card total-summary-card">
                        <div className="summary-icon total-summary-icon">
                            ✦
                        </div>

                        <div>
                            <strong>
                                {lostItems.length + foundItems.length}
                            </strong>
                            <span>Total Reports</span>
                        </div>
                    </div>

                </section>


                {/* Lost Items */}

                <section className="my-items-section">

                    <div className="my-items-section-heading">

                        <div>
                            <span className="section-eyebrow">
                                LOST
                            </span>

                            <h2>
                                Items you've lost
                            </h2>
                        </div>

                        <Link
                            to="/add-lost-item"
                            className="section-add-button lost-add-button"
                        >
                            + Report Lost
                        </Link>

                    </div>


                    {lostItems.length === 0 ? (

                        <div className="my-items-empty">

                            <div className="empty-item-icon lost-empty-icon">
                                🔎
                            </div>

                            <h3>
                                No lost items yet
                            </h3>

                            <p>
                                You haven't reported any lost items.
                            </p>

                            <Link
                                to="/add-lost-item"
                                className="empty-action-button lost-empty-button"
                            >
                                Report Lost Item
                                <span>→</span>
                            </Link>

                        </div>

                    ) : (

                        <div className="my-items-grid">

                            {lostItems.map((item) => (

                                <div
                                    className="my-item-card lost-item-card"
                                    key={item.id}
                                >

                                    <div className="item-card-top">

                                        <div className="item-type lost-type">
                                            LOST
                                        </div>

                                        <div className="item-status">
                                            {item.status || "LOST"}
                                        </div>

                                    </div>


                                    <div className="item-card-icon">
                                        🔎
                                    </div>


                                    <h3>
                                        {item.itemName}
                                    </h3>


                                    <p className="item-description">
                                        {item.description}
                                    </p>


                                    <div className="item-meta">

                                        <div>
                                            <span>⌖</span>
                                            {item.location}
                                        </div>

                                        <div>
                                            <span>◷</span>
                                            {item.dateLost}
                                        </div>

                                    </div>


                                    <div className="item-card-actions">

                                        <button
                                            className="item-edit-button"
                                            type="button"
                                            onClick={() => navigate(`/edit-lost-item/${item.id}`)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="item-delete-button"
                                            type="button"
                                             onClick={() => handleDeleteLostItem(item.id)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* Found Items */}

                <section className="my-items-section found-items-section">

                    <div className="my-items-section-heading">

                        <div>
                            <span className="section-eyebrow found-section-eyebrow">
                                FOUND
                            </span>

                            <h2>
                                Items you've found
                            </h2>
                        </div>

                        <Link
                            to="/add-found-item"
                            className="section-add-button found-add-button"
                        >
                            + Report Found
                        </Link>

                    </div>


                    {foundItems.length === 0 ? (

                        <div className="my-items-empty">

                            <div className="empty-item-icon found-empty-icon">
                                📦
                            </div>

                            <h3>
                                No found items yet
                            </h3>

                            <p>
                                You haven't reported any found items.
                            </p>

                            <Link
                                to="/add-found-item"
                                className="empty-action-button found-empty-button"
                            >
                                Report Found Item
                                <span>→</span>
                            </Link>

                        </div>

                    ) : (

                        <div className="my-items-grid">

                            {foundItems.map((item) => (

                                <div
                                    className="my-item-card found-item-card"
                                    key={item.id}
                                >

                                    <div className="item-card-top">

                                        <div className="item-type found-type">
                                            FOUND
                                        </div>

                                        <div className="item-status found-status">
                                            {item.status || "FOUND"}
                                        </div>

                                    </div>


                                    <div className="item-card-icon found-card-icon">
                                        📦
                                    </div>


                                    <h3>
                                        {item.itemName}
                                    </h3>


                                    <p className="item-description">
                                        {item.description}
                                    </p>


                                    <div className="item-meta">

                                        <div>
                                            <span>⌖</span>
                                            {item.location}
                                        </div>

                                        <div>
                                            <span>◷</span>
                                            {item.dateLost}
                                        </div>

                                    </div>


                                    <div className="item-card-actions">

                                        <button
                                            className="item-edit-button"
                                            type="button"
                                            onClick={() => navigate(`/edit-found-item/${item.id}`)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="item-delete-button"
                                            type="button"
                                             onClick={() => handleDeleteFoundItem(item.id)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* Bottom */}

                <div className="my-items-bottom-note">
                    <span>✦</span>
                    You can manage your reports from this page.
                </div>

            </div>

        </main>
    );
}

export default MyItems;