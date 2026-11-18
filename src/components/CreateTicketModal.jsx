
import { useState } from "react";
import { X } from "lucide-react";

function CreateTicketModal({ isOpen, onClose, onCreate }) {
 const [formData, setFormData] = useState({
  customer: "",
  email: "",
  subject: "",
  description: "",
  category: "General",
  priority: "Medium",
});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onCreate(formData);

   setFormData({
  customer: "",
  email: "",
  subject: "",
  description: "",
  category: "General",
  priority: "Medium",
});

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="ticket-modal">

        <div className="modal-header">
          <div>
            <h2>Create New Ticket</h2>
            <p>Add a new customer support request.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Ticket Subject</label>
            
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter ticket subject"
              required
            />
          </div>
         
<div className="form-group">
  <label>Ticket Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Describe the issue..."
    rows={4}
    required
  />
</div>


          <div className="form-row">

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="create-btn">
              Create Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateTicketModal;
