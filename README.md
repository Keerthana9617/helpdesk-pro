# HelpDesk Pro – Customer Support Ticket Management System

A full-stack customer support ticket management application built using **React, Django REST Framework, and MySQL**. HelpDesk Pro helps support teams manage customer tickets, track their status, and monitor support operations through an interactive dashboard.

## 🚀 Features

- **Dashboard:** View ticket statistics and support activity.
- **Ticket Management:** Create, view, update, and delete support tickets.
- **Ticket Status Tracking:** Manage tickets through Open, In Progress, and Resolved statuses.
- **Priority Management:** Categorize tickets by Low, Medium, High, and Urgent priority.
- **Category Management:** Organize tickets into General, Technical, Billing, and Account categories.
- **Customer Management:** View customer information.
- **Reports & Analytics:** Visualize ticket information using charts.
- **Profile Management:** Update administrator profile information.
- **Settings:** Manage application preferences.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| Vite | Frontend build tool |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive UI |
| Lucide React | Icons |
| Recharts | Data visualization |
| Python | Backend development |
| Django | Backend framework |
| Django REST Framework | REST API development |
| MySQL | Database |
| Git & GitHub | Version control |

## 📁 Project Structure

```text
helpdesk-pro/
│
├── backend/
│   ├── config/
│   ├── tickets/
│   ├── manage.py
│   └── .env
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js and npm
- Python
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Keerthana9617/helpdesk-pro.git
cd helpdesk-pro
```

### 2. Frontend Setup

Open a terminal in the project root directory.

```bash
npm install
npm run dev
```

The frontend will run at:

`http://localhost:5173/`

### 3. Backend Setup

Open another terminal.

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required packages:

```bash
pip install Django==5.2.19 djangorestframework==3.18.3 django-cors-headers==4.9.0 PyMySQL python-dotenv
```

### 4. MySQL Database Configuration

Create a MySQL database:

```sql
CREATE DATABASE helpdesk_db;
```

Create a `.env` file inside the backend directory:

```env
DB_NAME=helpdesk_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

Replace the password with your local MySQL password.

**Important:** Never upload your `.env` file or database credentials to GitHub.

### 5. Run Database Migrations

From the backend directory, run:

```bash
python manage.py migrate
```

### 6. Start Django Server

```bash
python manage.py runserver
```

The backend API will be available at:

`http://127.0.0.1:8000/api/`

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/` | Retrieve all tickets |
| POST | `/api/` | Create a new ticket |
| GET | `/api/<id>/` | Retrieve a specific ticket |
| PUT | `/api/<id>/` | Update a ticket |
| DELETE | `/api/<id>/` | Delete a ticket |

## 🎯 Project Objective

This project was developed to gain practical experience in full-stack web development, REST API integration, database connectivity, frontend state management, and CRUD operations.

It demonstrates how a React frontend communicates with a Django REST API and stores application data in a MySQL database.
## 📸 Application Screenshot

![HelpDesk Pro Dashboard](screenshots/dashboard.png)

## 👩‍💻 Developer

**Keerthana Dharmalingam**

Full Stack Developer | React | Python | Django | MySQL

GitHub: [Keerthana9617](https://github.com/Keerthana9617)

Project Repository: [HelpDesk Pro](https://github.com/Keerthana9617/helpdesk-pro)

---

*Built with React, Django REST Framework, and MySQL.*