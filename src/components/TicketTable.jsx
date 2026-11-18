
import { Eye, Trash2 } from "lucide-react";

function TicketTable({ tickets, onStatusChange, onDelete }) {
  return (
    <div className="ticket-table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Customer</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>

              <td>
                <div className="customer-info">
                  <div className="customer-avatar">
                    {ticket.avatar}
                  </div>
                  <div>
                    <strong>{ticket.customer}</strong>
                    <p>{ticket.email}</p>
                  </div>
                </div>
              </td>

              <td>{ticket.subject}</td>

              <td>
                <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </span>
              </td>

              <td>
                <select
                  className={`status-select ${ticket.status.toLowerCase().replace(" ", "-")}`}
                  value={ticket.status}
                  onChange={(event) =>
                    onStatusChange(ticket.id, event.target.value)
                  }
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>

              <td>{ticket.date}</td>

              <td>
                <button className="view-ticket-btn" title="View ticket">
                  <Eye size={18} />
                </button>

                <button
                  className="view-ticket-btn"
                  title="Delete ticket"
                  onClick={() => onDelete(ticket.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tickets.length === 0 && (
        <p className="empty-message">No tickets found.</p>
      )}
    </div>
  );
}

export default TicketTable;
