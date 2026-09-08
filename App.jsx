import React, { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("Dashboard");

  const menu = [
    "Dashboard",
    "Document Requests",
    "Announcements",
    "Blotter Reports",
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* BARANGAY LOGO */}
        <div className="barangay-brand">
          <img
            src="/barangay-logo.png"
            alt="Barangay San Agustin Logo"
            className="barangay-logo"
          />

          <div>
            <h2>Barangay</h2>
            <h2>Management</h2>
            <h2>System</h2>
          </div>
        </div>

        {/* MENU */}
        <nav>
          {menu.map((item) => (
            <button
              key={item}
              className={page === item ? "active" : ""}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          className="settings"
          onClick={() => setPage("Settings")}
        >
          ⚙ Settings
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        <header className="topbar">
          <input
            type="text"
            placeholder="Search records, documents..."
          />

          <div className="top-icons">
            🔔 👤
          </div>
        </header>

        {page === "Dashboard" && (
          <Dashboard setPage={setPage} />
        )}

        {page === "Document Requests" && (
          <DocumentRequests />
        )}

        {page === "Announcements" && (
          <Announcements />
        )}

        {page === "Blotter Reports" && (
          <BlotterReports />
        )}

        {page === "Settings" && (
          <Settings />
        )}

      </main>
    </div>
  );
}

/* DASHBOARD */
function Dashboard({ setPage }) {
  return (
    <section>

      <div className="welcome">
        <h1>Welcome back, Maria!</h1>
        <p>Your resident dashboard is updated for today.</p>
      </div>

      <h2>Quick Actions</h2>

      <div className="quick-actions">

        <div
          className="action-card"
          onClick={() => setPage("Document Requests")}
        >
          📄
          <h3>Request Document</h3>
          <p>Barangay clearance, indigency, etc.</p>
        </div>

        <div
          className="action-card"
          onClick={() => setPage("Blotter Reports")}
        >
          ⚖
          <h3>File Blotter</h3>
          <p>Report an incident or dispute.</p>
        </div>

        <div
          className="action-card"
          onClick={() => setPage("Announcements")}
        >
          📢
          <h3>Announcements</h3>
          <p>View latest community updates.</p>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="panel">
          <h2>My Active Requests</h2>

          <table>
            <thead>
              <tr>
                <th>TYPE</th>
                <th>DATE FILED</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Barangay Clearance</td>
                <td>Oct 24, 2023</td>
                <td>
                  <span className="status processing">
                    Processing
                  </span>
                </td>
                <td>👁</td>
              </tr>

              <tr>
                <td>Certificate of Indigency</td>
                <td>Oct 22, 2023</td>
                <td>
                  <span className="status pending">
                    Pending Review
                  </span>
                </td>
                <td>👁</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h2>Community Feed</h2>

          <div className="feed">
            <h3>📢 Barangay Assembly</h3>
            <p>Join us for the semi-annual barangay assembly.</p>
          </div>

          <div className="feed">
            <h3>💧 Water Interruption Advisory</h3>
            <p>Maynilad announces a temporary water service interruption.</p>
          </div>

          <div className="feed">
            <h3>🏥 Medical Mission</h3>
            <p>Free medical check-up and medicines will be provided.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* DOCUMENT REQUESTS */
function DocumentRequests() {
  return (
    <section>
      <h1>Document Requests</h1>
      <p>Manage and track your official document requests.</p>

      <button className="primary-btn">
        ＋ New Request
      </button>

      <div className="panel">
        <h2>My Requests</h2>

        <table>
          <thead>
            <tr>
              <th>REQUEST ID</th>
              <th>DOCUMENT TYPE</th>
              <th>DATE SUBMITTED</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#REQ-2023-089</td>
              <td>Barangay Clearance</td>
              <td>Oct 24, 2023</td>
              <td>Processing</td>
            </tr>

            <tr>
              <td>#REQ-2023-088</td>
              <td>Certificate of Indigency</td>
              <td>Oct 22, 2023</td>
              <td>Pending Review</td>
            </tr>

            <tr>
              <td>#REQ-2023-085</td>
              <td>Business Permit</td>
              <td>Oct 15, 2023</td>
              <td>Ready for Pickup</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ANNOUNCEMENTS */
function Announcements() {
  return (
    <section>
      <h1>Announcements</h1>

      <div className="panel">
        <h2>📢 Barangay Assembly</h2>
        <p>Join us for the semi-annual barangay assembly.</p>
      </div>

      <div className="panel">
        <h2>💧 Water Interruption Advisory</h2>
        <p>Temporary water service interruption.</p>
      </div>

      <div className="panel">
        <h2>🏥 Medical Mission</h2>
        <p>Free medical check-up and medicines will be provided.</p>
      </div>
    </section>
  );
}

/* BLOTTER */
function BlotterReports() {
  return (
    <section>
      <h1>Blotter Reports</h1>

      <button className="primary-btn">
        ＋ File Blotter Report
      </button>

      <div className="panel">
        <h2>My Reports</h2>
        <p>No blotter reports available.</p>
      </div>
    </section>
  );
}

/* SETTINGS */
function Settings() {
  return (
    <section>
      <h1>Settings</h1>

      <div className="panel">
        <h2>Account Settings</h2>
        <p>Manage your profile and account preferences.</p>
      </div>
    </section>
  );
}

export default App;A
