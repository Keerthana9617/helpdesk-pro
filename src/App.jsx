
import { useMemo, useState, useEffect } from "react";


import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TicketTable from "./components/TicketTable";
import CreateTicketModal from "./components/CreateTicketModal";
import Customers from "./components/Customers";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import MyProfile from "./components/MyProfile";

import {
  Ticket,
  FolderOpen,
  Clock,
  CheckCircle,
  Plus,
  Search,
} from "lucide-react";

function App() {
  // APPLICATION STATES

  const [tickets, setTickets] = useState([]);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      return response.json();
    })
    .then((data) => {
      const formattedTickets = data.map((ticket) => ({
        ...ticket,
        id: `HD-${String(ticket.id).padStart(4, "0")}`,
        customer: ticket.customer_name,
        date: ticket.created_at.split("T")[0],
        avatar: ticket.customer_name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase(),
      }));

      setTickets(formattedTickets);
    })
    .catch((error) => {
      console.error("Error fetching tickets:", error);
    });
}, []);


  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@helpdeskpro.com",
    role: "Administrator",
  });

  const [activePage, setActivePage] = useState("Dashboard");
  useEffect(() => {
  const openSettings = () => setActivePage("Settings");

  window.addEventListener("open-settings", openSettings);

  return () => {
    window.removeEventListener("open-settings", openSettings);
  };
}, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");


  // DASHBOARD STATISTICS

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;


  // SEARCH AND FILTER LOGIC

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tickets, search, statusFilter, priorityFilter]);


  // CREATE NEW TICKET

  
const handleCreateTicket = async (newTicket) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: newTicket.customer,
        email: newTicket.email,
        subject: newTicket.subject,
        description: newTicket.description,
        category: newTicket.category,
        priority: newTicket.priority,
        status: "Open",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    const savedTicket = await response.json();

    const formattedTicket = {
      ...savedTicket,
      id: `HD-${String(savedTicket.id).padStart(4, "0")}`,
      customer: savedTicket.customer_name,
      date: savedTicket.created_at.split("T")[0],
      avatar: savedTicket.customer_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase(),
    };

    setTickets((previousTickets) => [
      formattedTicket,
      ...previousTickets,
    ]);

  } catch (error) {
    console.error("Error creating ticket:", error);
    alert("Unable to create ticket. Please try again.");
  }
};

  // UPDATE TICKET STATUS

const handleStatusChange = async (ticketId, newStatus) => {
  try {
    const ticket = tickets.find(
      (item) => item.id === ticketId
    );

    if (!ticket) return;

    const databaseId = Number(
      ticketId.replace("HD-", "")
    );
   
    const response = await fetch(
      `http://127.0.0.1:8000/api/${databaseId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: ticket.customer_name,
          email: ticket.email,
          subject: ticket.subject,
          description: ticket.description,
          category: ticket.category,
          priority: ticket.priority,
          status: newStatus,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update ticket");
    }

    const updatedTicket = await response.json();

    setTickets((previousTickets) =>
      previousTickets.map((item) =>
        item.id === ticketId
          ? {
              ...item,
              ...updatedTicket,
              id: ticketId,
              customer: updatedTicket.customer_name,
              date: updatedTicket.created_at.split("T")[0],
            }
          : item
      )
    );

  } catch (error) {
    console.error("Error updating ticket:", error);
    alert("Unable to update ticket status.");
  }
};

 const handleDeleteTicket = async (ticketId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ticket?"
  );

  if (!confirmDelete) return;

  try {
    const databaseId = Number(ticketId.replace("HD-", ""));

    const response = await fetch(
      `http://127.0.0.1:8000/api/${databaseId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete ticket");
    }

    setTickets((previousTickets) =>
      previousTickets.filter((ticket) => ticket.id !== ticketId)
    );

    alert("Ticket deleted successfully!");
  } catch (error) {
    console.error("Error deleting ticket:", error);
    alert("Unable to delete ticket. Please try again.");
  }
};


  // MAIN APPLICATION LAYOUT

  return (
    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        profile={profile}
      />


      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* HEADER */}

       <Header
  activePage={activePage}
  profile={profile}
  onOpenProfile={() => setActivePage("My Profile")}
/>


        {/* PAGE CONTENT */}

        <div className="dashboard-content">


          {/* DASHBOARD PAGE */}

          {activePage === "Dashboard" && (
            <>

              <div className="dashboard-heading">
                <div>
                  <h2>Dashboard Overview</h2>
                  <p>
                    Monitor and manage your customer support tickets.
                  </p>
                </div>

                <button
                  className="add-ticket-btn"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus size={18} />
                  Create Ticket
                </button>
              </div>


              {/* STATISTICS CARDS */}

              <div className="stats-grid">

                <StatCard
                  title="Total Tickets"
                  value={totalTickets}
                  icon={<Ticket size={22} />}
                  color="blue"
                  description="All support tickets"
                />

                <StatCard
                  title="Open Tickets"
                  value={openTickets}
                  icon={<FolderOpen size={22} />}
                  color="orange"
                  description="Awaiting response"
                />

                <StatCard
                  title="In Progress"
                  value={inProgressTickets}
                  icon={<Clock size={22} />}
                  color="purple"
                  description="Currently being handled"
                />

                <StatCard
                  title="Resolved"
                  value={resolvedTickets}
                  icon={<CheckCircle size={22} />}
                  color="green"
                  description="Successfully closed"
                />

              </div>

            </>
          )}


          {/* TICKETS PAGE */}

          {(activePage === "Dashboard" ||
            activePage === "All Tickets") && (

            <div className="ticket-section">

              <div className="ticket-section-header">

                <div>
                  <h2>
                    {activePage === "Dashboard"
                      ? "Recent Tickets"
                      : "All Tickets"}
                  </h2>

                  <p>
                    Manage and track customer support requests.
                  </p>
                </div>

                {activePage === "All Tickets" && (
                  <button
                    className="add-ticket-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus size={18} />
                    Create Ticket
                  </button>
                )}

              </div>


              {/* SEARCH AND FILTERS */}

              <div className="ticket-toolbar">

                <div className="ticket-search">
                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search by ID, customer or subject..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />
                </div>


                <div className="ticket-filters">

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                  >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>


                  <select
                    value={priorityFilter}
                    onChange={(event) =>
                      setPriorityFilter(event.target.value)
                    }
                  >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>

                </div>

              </div>


              {/* TICKET TABLE */}

              <TicketTable
                tickets={filteredTickets}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTicket}
              />

            </div>

          )}


          {/* CUSTOMERS PAGE */}

          {activePage === "Customers" && (
            <Customers tickets={tickets} />
          )}


          {/* REPORTS PAGE */}

          {activePage === "Reports" && (
            <Reports tickets={tickets} />
          )}


          {/* SETTINGS PAGE */}

          {activePage === "Settings" && (
            <Settings
              profile={profile}
              setProfile={setProfile}
            />
          )}
          {activePage === "My Profile" && (
  <MyProfile profile={profile} />
)}

        </div>


        {/* CREATE TICKET MODAL */}

        <CreateTicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateTicket}
        />

      </main>

    </div>
  );
}
export default App;
