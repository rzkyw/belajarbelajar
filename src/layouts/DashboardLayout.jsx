import { useState } from "react";
import "./DashboardLayout.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <div className="header">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <Header />
      </div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      <main className="main">{children}</main>
    </div>
  );
}
