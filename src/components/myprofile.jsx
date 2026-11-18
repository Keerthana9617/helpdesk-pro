import { User, Mail, Shield } from "lucide-react";

function MyProfile({ profile }) {
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-large-avatar">
          {initials}
        </div>

        <h2>{profile.name}</h2>
        <p>{profile.role}</p>

        <div className="profile-details">
          <div>
            <User size={20} />
            <span>{profile.name}</span>
          </div>

          <div>
            <Mail size={20} />
            <span>{profile.email}</span>
          </div>

          <div>
            <Shield size={20} />
            <span>{profile.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;