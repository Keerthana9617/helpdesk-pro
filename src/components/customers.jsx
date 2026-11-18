
import { Users, Ticket, Clock, CheckCircle } from "lucide-react";

function Customers({ tickets }) {
  // Create a unique customer list from tickets
  const customers = Object.values(
    tickets.reduce((customerList, ticket) => {
      const email = ticket.email.toLowerCase();

      if (!customerList[email]) {
        customerList[email] = {
          name: ticket.customer,
          email: ticket.email,
          avatar: ticket.avatar,
          totalTickets: 0,
          openTickets: 0,
          resolvedTickets: 0,
        };
      }

      customerList[email].totalTickets++;

      if (ticket.status === "Open") {
        customerList[email].openTickets++;
      }

      if (ticket.status === "Resolved") {
        customerList[email].resolvedTickets++;
      }

      return customerList;
    }, {})
  );

  return (
    <div className="customers-page">

      <div className="dashboard-heading">
        <div>
          <h2>Customer Management</h2>
          <p>View and manage your registered customers.</p>
        </div>

        <div className="customer-total">
          <Users size={20} />
          <span>{customers.length} Customers</span>
        </div>
      </div>

      <div className="customers-grid">
        {customers.map((customer) => (
          <div className="customer-card" key={customer.email}>

            <div className="customer-card-header">
              <div className="customer-large-avatar">
                {customer.avatar}
              </div>

              <div>
                <h3>{customer.name}</h3>
                <p>{customer.email}</p>
              </div>
            </div>

            <div className="customer-stats">

              <div>
                <Ticket size={17} />
                <span>Total Tickets</span>
                <strong>{customer.totalTickets}</strong>
              </div>

              <div>
                <Clock size={17} />
                <span>Open Tickets</span>
                <strong>{customer.openTickets}</strong>
              </div>

              <div>
                <CheckCircle size={17} />
                <span>Resolved</span>
                <strong>{customer.resolvedTickets}</strong>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Customers;
