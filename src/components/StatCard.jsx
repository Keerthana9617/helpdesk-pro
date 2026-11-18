
function StatCard({ title, value, icon, color, description }) {
  return (
    <div className="stat-card">

      {/* Card Header */}
      <div className="stat-card-header">
        <p>{title}</p>

        <div className={`stat-icon ${color}`}>
          {icon}
        </div>
      </div>

      {/* Card Value */}
      <h2>{value}</h2>

      {/* Card Description */}
      <p className="stat-description">
        {description}
      </p>

    </div>
  );
}

export default StatCard;
