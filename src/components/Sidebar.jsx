
import {
  Headset,
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

function Sidebar({ activePage, onNavigate, profile }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "All Tickets", icon: Ticket },
    { name: "Customers", icon: Users },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Headset size={24} />
        </div>
        <h2>HelpDesk Pro</h2>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-heading">MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-profile">
        <div className="profile-avatar">{initials}</div>

        <div className="profile-info">
          <h4>{profile.name}</h4>
          <p>{profile.role}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
