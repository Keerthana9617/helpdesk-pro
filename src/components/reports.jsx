
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Reports({ tickets }) {
  const open = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const statusData = [
    { name: "Open", value: open, color: "#f59e0b" },
    { name: "In Progress", value: inProgress, color: "#8b5cf6" },
    { name: "Resolved", value: resolved, color: "#10b981" },
  ];

  const priorityData = [
    {
      name: "Low",
      tickets: tickets.filter((t) => t.priority === "Low").length,
    },
    {
      name: "Medium",
      tickets: tickets.filter((t) => t.priority === "Medium").length,
    },
    {
      name: "High",
      tickets: tickets.filter((t) => t.priority === "High").length,
    },
    {
      name: "Urgent",
      tickets: tickets.filter((t) => t.priority === "Urgent").length,
    },
  ];

  return (
    <div className="reports-page">

      <div className="dashboard-heading">
        <div>
          <h2>Support Reports</h2>
          <p>Analyze your customer support performance.</p>
        </div>
      </div>

      <div className="report-summary">
        <div className="report-card">
          <p>Total Tickets</p>
          <h2>{tickets.length}</h2>
        </div>

        <div className="report-card">
          <p>Open Tickets</p>
          <h2>{open}</h2>
        </div>

        <div className="report-card">
          <p>In Progress</p>
          <h2>{inProgress}</h2>
        </div>

        <div className="report-card">
          <p>Resolved Tickets</p>
          <h2>{resolved}</h2>
        </div>
      </div>

      <div className="reports-grid">

        <div className="report-chart-card">
          <h3>Ticket Status Distribution</h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label
              >
                {statusData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="report-chart-card">
          <h3>Ticket Priority Distribution</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="tickets"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Reports;
