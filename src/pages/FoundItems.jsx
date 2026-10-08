import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getFoundItems } from "../services/foundItemService";

function FoundItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getFoundItems()
            .then((response) => {
                console.log("Found items:", response.data);
                setItems(response.data);
            })
            .catch((error) => {
                console.error("Failed to load found items:", error);
                setError("Unable to load found items. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main className="items-page">

            <div className="items-header">
                <div>
                    <div className="items-header-label">
                        FOUND ITEMS
                    </div>

                    <h1>Recently Found</h1>

                    <p>
                        Browse items found and reported by our community.
                    </p>
                </div>
            </div>

            {loading && (
                <div className="loading-container">
                    Loading found items...
                </div>
            )}

            {!loading && error && (
                <div className="error-container">
                    {error}
                </div>
            )}

            {!loading && !error && items.length > 0 && (
                <div className="items-grid">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            type="found"
                        />
                    ))}
                </div>
            )}

            {!loading && !error && items.length === 0 && (
                <div className="empty-items">
                    <div className="empty-items-icon">
                        🔎
                    </div>

                    <h3>No found items yet</h3>

                    <p>
                        There are currently no items reported as found.
                    </p>
                </div>
            )}

        </main>
    );
}

export default FoundItems;