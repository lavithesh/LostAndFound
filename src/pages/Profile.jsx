import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Profile() {
  const { user, setUser } = useAuth();

  const fileInputRef = useRef(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    profilePhoto: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        mobile: user.mobile || "",
        profilePhoto: user.profilePhoto || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    setPasswordError("");
    setChangingPassword(true);

    try {
      const response = await api.put("/change-password", passwordData);

      alert(response.data);

      setShowPasswordModal(false);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);

      setPasswordError(error.response?.data || "Failed to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setUploadingPhoto(true);

    try {
      const data = new FormData();

      data.append("file", file);

      const response = await api.post("/profile/photo", data);

      setUser(response.data);

      alert("Profile photo updated successfully!");
    } catch (error) {
      console.error("Error uploading profile photo:", error);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
      } else {
        alert("Failed to upload profile photo.");
      }
    } finally {
      setUploadingPhoto(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);

    try {
      const response = await api.put("/profile", formData);

      setUser(response.data);

      setIsEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
      } else {
        alert("Failed to update profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Top Navigation */}

        <div className="profile-topbar">
          <Link to="/dashboard" className="profile-back-link">
            ← Back to Dashboard
          </Link>

          {!isEditing && (
            <button
              type="button"
              className="profile-top-edit"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {/* Profile Hero */}

        <div className="profile-hero">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {user.profilePhoto ? (
                <img
                  src={`http://localhost:9000${user.profilePhoto}`}
                  alt="Profile"
                />
              ) : (
                initials
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />

            <button
              type="button"
              className="avatar-camera-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
            >
              {uploadingPhoto ? "⏳" : "📷"}
            </button>
          </div>

          <div className="profile-hero-info">
            <div className="profile-name-row">
              <h1>{user.name || "User"}</h1>

              <span className="profile-role">{user.role || "USER"}</span>
            </div>

            <p className="profile-email">{user.email}</p>

            <p className="profile-subtitle">
              Manage your personal information and account settings.
            </p>
          </div>
        </div>

        {/* Main Content */}

        <div className="profile-content">
          {/* Personal Information */}

          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2>Personal Information</h2>
                <p>Your basic account information</p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave}>
                <div className="profile-form-grid">
                  <div className="profile-input-group">
                    <label>Full Name</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="profile-input-group">
                    <label>Email</label>

                    <input type="email" value={user.email} disabled />

                    <small>Email cannot be changed here.</small>
                  </div>

                  <div className="profile-input-group">
                    <label>Mobile Number</label>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label>Role</label>

                    <input type="text" value={user.role || "USER"} disabled />
                  </div>
                </div>

                {/* Address */}

                <div className="profile-subsection">
                  <div className="profile-subsection-title">
                    <span>🏠</span>

                    <div>
                      <h3>Address</h3>
                      <p>Add your contact address for easier item returns.</p>
                    </div>
                  </div>

                  <div className="profile-form-grid">
                    <div className="profile-input-group profile-full-width">
                      <label>Address</label>

                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House / Apartment / Street"
                        rows="3"
                      />
                    </div>

                    <div className="profile-input-group">
                      <label>City</label>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="profile-input-group">
                      <label>State</label>

                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                      />
                    </div>

                    <div className="profile-input-group">
                      <label>Pincode</label>

                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter pincode"
                        maxLength="6"
                      />
                    </div>
                  </div>
                </div>

                {/* Edit Actions */}

                <div className="profile-form-actions">
                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={() => {
                      setIsEditing(false);

                      setFormData({
                        name: user.name || "",
                        mobile: user.mobile || "",
                        profilePhoto: user.profilePhoto || "",
                        address: user.address || "",
                        city: user.city || "",
                        state: user.state || "",
                        pincode: user.pincode || "",
                      });
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="profile-save-button"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="info-icon">👤</span>

                  <div>
                    <span className="info-label">Full Name</span>

                    <strong>{user.name || "Not available"}</strong>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="info-icon">📧</span>

                  <div>
                    <span className="info-label">Email</span>

                    <strong>{user.email || "Not available"}</strong>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="info-icon">📱</span>

                  <div>
                    <span className="info-label">Mobile</span>

                    <strong>{user.mobile || "Not available"}</strong>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="info-icon">🛡️</span>

                  <div>
                    <span className="info-label">Account Type</span>

                    <strong>{user.role || "USER"}</strong>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Address Display */}

          {!isEditing && (
            <section className="profile-section">
              <div className="profile-section-header">
                <div>
                  <h2>Address</h2>
                  <p>Your saved contact address</p>
                </div>
              </div>

              <div className="address-display">
                <div className="address-icon">🏠</div>

                <div className="address-details">
                  <strong>{user.address || "No address added"}</strong>

                  <span>
                    {[user.city, user.state, user.pincode]
                      .filter(Boolean)
                      .join(", ") || "Add your address from Edit Profile"}
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* Activity */}

          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2>My Activity</h2>
                <p>Your Lost & Found activity</p>
              </div>
            </div>

            <div className="profile-activity-grid">
              <Link to="/my-items" className="activity-card lost-activity">
                <div className="activity-icon">🔴</div>

                <div>
                  <strong>My Lost Items</strong>
                  <span>View your reported lost items</span>
                </div>

                <span className="activity-arrow">→</span>
              </Link>

              <Link to="/my-items" className="activity-card found-activity">
                <div className="activity-icon">🟢</div>

                <div>
                  <strong>My Found Items</strong>
                  <span>View items you have found</span>
                </div>

                <span className="activity-arrow">→</span>
              </Link>
            </div>
          </section>

          {/* Account & Security */}

          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2>Account & Security</h2>
                <p>Manage your account security</p>
              </div>
            </div>

            <div className="security-card">
              <div className="security-icon">🔐</div>

              <div className="security-info">
                <strong>Password</strong>

                <span>Keep your account secure with a strong password.</span>
              </div>

              <button
                type="button"
                className="security-button"
                onClick={() => {
                  setPasswordError("");

                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });

                  setShowPasswordModal(true);
                }}
              >
                Change Password
              </button>
            </div>
          </section>

          {/* Account Details */}

          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2>Account Details</h2>
                <p>Information about your account</p>
              </div>
            </div>

            <div className="account-details-grid">
              <div>
                <span>User ID</span>
                <strong>#{user.id}</strong>
              </div>

              <div>
                <span>Account Role</span>
                <strong>{user.role || "USER"}</strong>
              </div>
            </div>
          </section>
        </div>
      </div>

      {showPasswordModal && (
        <div
          className="password-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !changingPassword
            ) {
              setShowPasswordModal(false);
            }
          }}
        >
          <div
            className="password-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="password-modal-header">
              <div>
                <h2>Change Password</h2>
                <p>Update your account password securely.</p>
              </div>

              <button
                type="button"
                className="password-modal-close"
                onClick={() => {
                  if (!changingPassword) {
                    setShowPasswordModal(false);
                  }
                }}
              >
                ×
              </button>
            </div>

            <form
              className="password-modal-form"
              onSubmit={handleChangePassword}
            >
              <div className="password-input-group">
                <label>Current Password</label>

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="password-input-group">
                <label>New Password</label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="password-input-group">
                <label>Confirm New Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {passwordError && (
                <div className="password-error">
                  {passwordError}
                </div>
              )}

              <div className="password-modal-actions">
                <button
                  type="button"
                  className="password-cancel-button"
                  disabled={changingPassword}
                  onClick={() => {
                    setShowPasswordModal(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="password-submit-button"
                  disabled={changingPassword}
                >
                  {changingPassword
                    ? "Changing..."
                    : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
