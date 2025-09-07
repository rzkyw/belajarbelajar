import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(true); 
  const location = useLocation();

  return (
    <div className="sidebar-container">
      <button
        onClick={() => setOpen(!open)}
        className="hamburger-btn"
        style={{ left: open ? "160px" : "15px" }}
      >
        {open ? "☰" : "☰"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}> 🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/users" className={location.pathname === "/users" ? "active" : ""}
            >
            👤 Users
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={location.pathname === "/settings" ? "active" : ""}
            >
              ⚙️ Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
