
import { useState } from "react";
import { Save, User, Bell, Monitor } from "lucide-react";

function Settings({ profile, setProfile }) {
  const [appInfo, setAppInfo] = useState({
    name: "HelpDesk Pro",
    description: "Customer Support Ticket Management System",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    newTicket: true,
    statusUpdate: false,
  });

  const [savedMessage, setSavedMessage] = useState("");

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAppChange = (event) => {
    const { name, value } = event.target;

    setAppInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;

    setNotifications((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSavedMessage("Settings saved successfully!");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  return (
    <div className="settings-page">
      <div className="dashboard-heading">
        <div>
          <h2>Application Settings</h2>
          <p>Manage your profile and application preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSave} autoComplete="off">

        {/* PROFILE SETTINGS */}
        <div className="settings-card">
          <div className="settings-card-heading">
            <User size={21} />
            <div>
              <h3>Profile Settings</h3>
              <p>Manage your administrator information.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                name="role"
                value={profile.role}
                onChange={handleProfileChange}
                required
              />
            </div>
          </div>
        </div>

        {/* APPLICATION SETTINGS */}
        <div className="settings-card">
          <div className="settings-card-heading">
            <Monitor size={21} />
            <div>
              <h3>Application Settings</h3>
              <p>Customize your application information.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label>Application Name</label>
              <input
                name="name"
                value={appInfo.name}
                onChange={handleAppChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                name="description"
                value={appInfo.description}
                onChange={handleAppChange}
                required
              />
            </div>
          </div>
        </div>

        {/* NOTIFICATION SETTINGS */}
        <div className="settings-card">
          <div className="settings-card-heading">
            <Bell size={21} />
            <div>
              <h3>Notification Preferences</h3>
              <p>Choose which notifications you want to receive.</p>
            </div>
          </div>

          <div className="notification-options">
            <label className="notification-option">
              <span>
                <strong>Email Notifications</strong>
                <small>Receive notifications through email.</small>
              </span>
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
              />
            </label>

            <label className="notification-option">
              <span>
                <strong>New Ticket Alerts</strong>
                <small>Get notified when a new ticket is created.</small>
              </span>
              <input
                type="checkbox"
                name="newTicket"
                checked={notifications.newTicket}
                onChange={handleNotificationChange}
              />
            </label>

            <label className="notification-option">
              <span>
                <strong>Status Update Alerts</strong>
                <small>Get notified when ticket status changes.</small>
              </span>
              <input
                type="checkbox"
                name="statusUpdate"
                checked={notifications.statusUpdate}
                onChange={handleNotificationChange}
              />
            </label>
          </div>
        </div>

        <div className="settings-save-area">
          {savedMessage && (
            <p className="settings-success">{savedMessage}</p>
          )}

          <button type="submit" className="create-btn">
            <Save size={17} />
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}

export default Settings;
