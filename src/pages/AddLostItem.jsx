import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addLostItem } from "../services/lostItemService";

function AddLostItem() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    dateLost: "",
    image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setFormData((previous) => ({
      ...previous,
      image: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();

      data.append("itemName", formData.itemName);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("dateLost", formData.dateLost);
      data.append("status", "LOST");

      if (formData.image) {
        data.append("imageFile", formData.image);
      }

      console.log("Sending lost item with image:", formData.image);

      const response = await addLostItem(data);

      console.log("Lost item added successfully:", response.data);

      setFormData({
        itemName: "",
        description: "",
        location: "",
        dateLost: "",
        image: null,
      });

      alert("Lost item reported successfully!");
    } catch (error) {
      console.error("Error adding lost item:", error);

      if (error.response?.data) {
        alert(error.response.data);
      } else {
        alert("Failed to report lost item. Please try again.");
      }
    }
  };

  return (
    <main className="add-lost-page">
      {/* Background decorations */}
      <div className="lost-page-glow lost-glow-one"></div>
      <div className="lost-page-glow lost-glow-two"></div>

      <div className="add-lost-container">
        {/* Back button */}
        <Link to="/dashboard" className="back-dashboard">
          <span>←</span>
          Back to Dashboard
        </Link>

        {/* Header */}
        <section className="add-lost-header">
          <div className="lost-header-badge">
            <span className="badge-dot"></span>
            LOST ITEM REPORT
          </div>

          <h1>
            Help bring your
            <br />
            <span>lost item home.</span>
          </h1>

          <p>
            Tell us about the item you've lost. Adding accurate details makes it
            easier for someone to recognize and return it.
          </p>
        </section>

        {/* Main form card */}
        <section className="lost-form-card">
          <div className="form-card-header">
            <div className="form-card-icon">🔎</div>

            <div>
              <h2>Item Details</h2>
              <p>Provide the information about your lost item</p>
            </div>
          </div>

          <div className="form-divider"></div>

          <form onSubmit={handleSubmit}>
            {/* Item name */}
            <div className="premium-form-group">
              <label htmlFor="itemName">
                Item Name
                <span>*</span>
              </label>

              <div className="input-wrapper">
                <span className="input-icon">✦</span>

                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="What did you lose?"
                  required
                />
              </div>

              <small>Example: Black leather wallet</small>
            </div>

            {/* Description */}
            <div className="premium-form-group">
              <label htmlFor="description">
                Description
                <span>*</span>
              </label>

              <div className="textarea-wrapper">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the item, its color, brand, unique features, or anything that could help identify it..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <small>
                Include unique details that can help identify your item.
              </small>
            </div>

            {/* Location + Date */}
            <div className="premium-form-row">
              <div className="premium-form-group">
                <label htmlFor="location">
                  Lost Location
                  <span>*</span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">⌖</span>

                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Where did you lose it?"
                    required
                  />
                </div>
              </div>

              <div className="premium-form-group">
                <label htmlFor="dateLost">
                  Date Lost
                  <span>*</span>
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">◷</span>

                  <input
                    type="date"
                    id="dateLost"
                    name="dateLost"
                    value={formData.dateLost}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="premium-form-group">
              <label htmlFor="image">
                Item Image
                <span className="optional-label">OPTIONAL</span>
              </label>

              <div className="image-input-box">
                <div className="image-upload-icon">↑</div>

                <div className="image-input-content">
                  <strong>Upload an image</strong>

                  <span>A photo can make your report easier to recognize.</span>

                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Information box */}
            <div className="lost-info-box">
              <div className="info-icon">✦</div>

              <div>
                <strong>Keep your information accurate</strong>

                <p>
                  The details you provide will help other users identify your
                  item if they find it.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <Link to="/dashboard" className="cancel-button">
                Cancel
              </Link>

              <button type="submit" className="lost-submit-button">
                <span>Report Lost Item</span>
                <span className="submit-arrow">→</span>
              </button>
            </div>
          </form>
        </section>

        {/* Bottom note */}
        <div className="lost-page-footer">
          <span>🔒</span>
          Your report will be associated with your account.
        </div>
      </div>
    </main>
  );
}

export default AddLostItem;
