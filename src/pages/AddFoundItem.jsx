import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addFoundItem } from "../services/foundItemService";

function AddFoundItem() {
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
      data.append("status", "FOUND");

      if (formData.image) {
        data.append("imageFile", formData.image);
      }

      console.log("Sending found item with image:", formData.image);

      const response = await addFoundItem(data);

      console.log("Found item added successfully:", response.data);

      setFormData({
        itemName: "",
        description: "",
        location: "",
        dateLost: "",
        image: null,
      });

      alert("Found item reported successfully!");
    } catch (error) {
      console.error("Error adding found item:", error);

      if (error.response?.data) {
        alert(error.response.data);
      } else {
        alert("Failed to report found item. Please try again.");
      }
    }
  };

  return (
    <main className="add-found-page">
      <div className="found-page-glow found-glow-one"></div>
      <div className="found-page-glow found-glow-two"></div>

      <div className="add-found-container">
        {/* Back to dashboard */}

        <Link to="/dashboard" className="back-dashboard found-back">
          <span>←</span>
          Back to Dashboard
        </Link>

        {/* Header */}

        <section className="add-found-header">
          <div className="found-header-badge">
            <span className="found-badge-dot"></span>
            FOUND ITEM REPORT
          </div>

          <h1>
            Help someone
            <br />
            <span>find their item.</span>
          </h1>

          <p>
            Found something that doesn't belong to you? Share the details and
            help reunite it with its owner.
          </p>
        </section>

        {/* Form card */}

        <section className="found-form-card">
          <div className="found-form-card-header">
            <div className="found-form-card-icon">📦</div>

            <div>
              <h2>Found Item Details</h2>

              <p>Provide the information about the item you found</p>
            </div>
          </div>

          <div className="found-form-divider"></div>

          <form onSubmit={handleSubmit}>
            {/* Item name */}

            <div className="found-form-group">
              <label htmlFor="itemName">
                Item Name
                <span>*</span>
              </label>

              <div className="found-input-wrapper">
                <span className="found-input-icon">✦</span>

                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="What did you find?"
                  required
                />
              </div>

              <small>Example: Black wallet</small>
            </div>

            {/* Description */}

            <div className="found-form-group">
              <label htmlFor="description">
                Description
                <span>*</span>
              </label>

              <div className="found-textarea-wrapper">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the item, color, brand, unique features, or anything that could help identify it..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <small>
                Include details that can help the owner recognize their item.
              </small>
            </div>

            {/* Location + Date */}

            <div className="found-form-row">
              <div className="found-form-group">
                <label htmlFor="location">
                  Found Location
                  <span>*</span>
                </label>

                <div className="found-input-wrapper">
                  <span className="found-input-icon">⌖</span>

                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Where did you find it?"
                    required
                  />
                </div>
              </div>

              <div className="found-form-group">
                <label htmlFor="dateLost">
                  Date Found
                  <span>*</span>
                </label>

                <div className="found-input-wrapper">
                  <span className="found-input-icon">◷</span>

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

            <div className="found-form-group">
              <label htmlFor="image">
                Item Image
                <span className="found-optional-label">OPTIONAL</span>
              </label>

              <div className="found-image-input-box">
                <div className="found-image-upload-icon">↑</div>

                <div className="found-image-input-content">
                  <strong>Upload an image</strong>

                  <span>
                    A photo can help the owner recognize their belongings.
                  </span>

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

            {/* Info */}

            <div className="found-info-box">
              <div className="found-info-icon">✦</div>

              <div>
                <strong>Help return it safely</strong>

                <p>
                  Avoid sharing sensitive information. Provide enough details
                  for the owner to recognize their item.
                </p>
              </div>
            </div>

            {/* Buttons */}

            <div className="found-form-actions">
              <Link to="/dashboard" className="found-cancel-button">
                Cancel
              </Link>

              <button type="submit" className="found-submit-button">
                <span>Report Found Item</span>

                <span className="found-submit-arrow">→</span>
              </button>
            </div>
          </form>
        </section>

        {/* Footer */}

        <div className="found-page-footer">
          <span>🔒</span>
          Your report will be associated with your account.
        </div>
      </div>
    </main>
  );
}

export default AddFoundItem;
