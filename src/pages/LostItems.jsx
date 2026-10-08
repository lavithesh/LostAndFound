import { useEffect, useState } from "react";

import ItemCard from "../components/ItemCard";
import { getLostItems } from "../services/lostItemService";

function LostItems() {

    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        getLostItems()
            .then((response) => {

                console.log("Lost items:", response.data);

                setItems(response.data);

            })
            .catch((error) => {

                console.error("Failed to load lost items:", error);

                setError(
                    "Unable to load lost items. Please try again."
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);


    return (

        <main className="items-page">

            {/* Header */}

            <div className="items-header">

                <div>

                    <div className="items-header-label">
                        LOST ITEMS
                    </div>

                    <h1>
                        Recently Lost
                    </h1>

                    <p>
                        Browse items reported as lost by our community.
                    </p>

                </div>

            </div>


            {/* Loading */}

            {loading && (

                <div className="loading-container">
                    Loading lost items...
                </div>

            )}


            {/* Error */}

            {!loading && error && (

                <div className="error-container">
                    {error}
                </div>

            )}


            {/* Items */}

            {!loading && !error && items.length > 0 && (

                <div className="items-grid">

                    {items.map((item) => (

                        <ItemCard
                            key={item.id}
                            item={item}
                            type="lost"
                        />

                    ))}

                </div>

            )}


            {/* Empty */}

            {!loading && !error && items.length === 0 && (

                <div className="empty-items">

                    <div className="empty-items-icon">
                        🔎
                    </div>

                    <h3>
                        No lost items yet
                    </h3>

                    <p>
                        There are currently no items reported as lost.
                    </p>

                </div>

            )}

        </main>

    );
}

export default LostItems;