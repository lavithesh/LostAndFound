import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ItemDetails() {
  const { type, id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const endpoint =
          type === "found" ? `/foundItem/${id}` : `/lostItem/${id}`;

        const response = await api.get(endpoint);

        console.log("Item details:", response.data);

        setItem(response.data);
      } catch (error) {
        console.error("Failed to load item:", error);

        setError("Unable to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <main className="items-page">
        <div className="loading-container">Loading item details...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="items-page">
        <div className="error-container">{error}</div>
      </main>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <main className="items-page">
      <div className="items-header">
        <div>
          <div className="items-header-label">ITEM DETAILS</div>

          <h1>{item.itemName}</h1>

          <p>Complete information about this reported item.</p>
        </div>
      </div>

      <div className="item-card">
        <div className="item-image">
          {item.image ? (
            <img
              src={`http://localhost:9000${item.image}`}
              alt={item.itemName}
            />
          ) : (
            <div className="no-image">📦</div>
          )}

          <span className="status-badge">{item.status}</span>
        </div>

        <div className="item-content">
          <h3>{item.itemName}</h3>

          <p className="item-description">{item.description}</p>

          <div className="item-details">
            <div className="item-detail">
              <span>📍</span>
              <span>{item.location}</span>
            </div>

            <div className="item-detail">
              <span>📅</span>
              <span>{item.dateLost}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/lost-items">← Back to Lost Items</Link>
      </div>
    </main>
  );
}

export default ItemDetails;
