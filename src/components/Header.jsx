
import { useState } from "react";

import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function Header({ activePage, profile, onOpenProfile }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

 const handleProfile = () => {
  setIsDropdownOpen(false);
  onOpenProfile();
};

  const handleSettings = () => {
    setIsDropdownOpen(false);
    window.dispatchEvent(new CustomEvent("open-settings"));
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    alert("Logout functionality will be added later.");
  };

  return (
    <header className="header">

      {/* Page Information */}
      <div className="header-title">
        <h1>{activePage}</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Header Actions */}
      <div className="header-actions">

        {/* Search Bar */}
        <div className="header-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search anything..."
          />
        </div>

        {/* Notifications */}
        <button className="notification-btn">
          <Bell size={21} />
          <span className="notification-dot"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="header-profile">

          <button
            type="button"
            className="profile-dropdown-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="profile-avatar">{initials}</div>

            <div className="header-user-info">
              <h4>{profile.name}</h4>
              <p>{profile.role}</p>
            </div>

            <ChevronDown
              size={16}
              className={isDropdownOpen ? "rotate-arrow" : ""}
            />
          </button>

          {isDropdownOpen && (
            <div className="profile-dropdown">

              <button onClick={handleProfile}>
                <User size={17} />
                My Profile
              </button>

              <button onClick={handleSettings}>
                <Settings size={17} />
                Settings
              </button>

              <div className="dropdown-divider"></div>

              <button onClick={handleLogout}>
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default Header;
