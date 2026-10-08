import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { updateLostItem } from "../services/lostItemService";

function EditLostItem() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        itemName: "",
        description: "",
        location: "",
        dateLost: "",
        image: "",
        status: "LOST"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadItem();
    }, [id]);

    const loadItem = async () => {

        try {

            const response = await api.get(`/lostItem/${id}`);

            const item = response.data;

            setFormData({
                itemName: item.itemName || "",
                description: item.description || "",
                location: item.location || "",
                dateLost: item.dateLost || "",
                image: item.image || "",
                status: item.status || "LOST"
            });

        } catch (error) {

            console.error("Error loading lost item:", error);

            if (error.response?.status === 401) {
                alert("Your session has expired. Please login again.");
                navigate("/login");
            } else {
                alert("Unable to load the lost item.");
                navigate("/my-items");
            }

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);

        try {

            await updateLostItem(id, formData);

            alert("Lost item updated successfully!");

            navigate("/my-items");

        } catch (error) {

            console.error("Error updating lost item:", error);

            if (error.response?.status === 403) {
                alert("You are not authorized to update this item.");
            } else if (error.response?.status === 401) {
                alert("Your session has expired. Please login again.");
                navigate("/login");
            } else if (error.response?.status === 404) {
                alert("Lost item not found.");
            } else {
                alert("Failed to update the lost item.");
            }

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-item-page">
                <div className="edit-item-loading">
                    Loading item...
                </div>
            </div>
        );
    }

    return (
        <div className="edit-item-page">

            <div className="edit-item-container">

                <div className="edit-item-header">

                    <Link to="/my-items" className="back-link">
                        ← Back to My Items
                    </Link>

                    <div className="edit-item-title">
                        <span className="edit-item-icon">✏️</span>

                        <div>
                            <h1>Edit Lost Item</h1>
                            <p>Update the details of your lost item.</p>
                        </div>
                    </div>

                </div>

                <form
                    className="edit-item-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="itemName">
                            Item Name
                        </label>

                        <input
                            id="itemName"
                            name="itemName"
                            type="text"
                            value={formData.itemName}
                            onChange={handleChange}
                            placeholder="Enter item name"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the item..."
                            rows="5"
                            required
                        />

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="location">
                                Lost Location
                            </label>

                            <input
                                id="location"
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Where did you lose it?"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="dateLost">
                                Date Lost
                            </label>

                            <input
                                id="dateLost"
                                name="dateLost"
                                type="date"
                                value={formData.dateLost}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label htmlFor="image">
                            Image URL
                        </label>

                        <input
                            id="image"
                            name="image"
                            type="text"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />

                    </div>

                    <div className="edit-item-actions">

                        <Link
                            to="/my-items"
                            className="cancel-button"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditLostItem;