import React, { useState } from "react";

const requests = [
  {
    id: "#REQ-2023-089",
    type: "Barangay Clearance",
    date: "Oct 24, 2023",
    status: "Processing",
  },
  {
    id: "#REQ-2023-088",
    type: "Certificate of Indigency",
    date: "Oct 22, 2023",
    status: "Pending Review",
  },
  {
    id: "#REQ-2023-085",
    type: "Business Permit",
    date: "Oct 15, 2023",
    status: "Ready for Pickup",
  },
  {
    id: "#REQ-2023-042",
    type: "Community Tax Certificate",
    date: "Sep 01, 2023",
    status: "Completed",
  },
];

function Sidebar({ page, setPage }) {
  const menus = [
    ["Dashboard", "🏠"],
    ["Document Requests", "📄"],
    ["Announcements", "📢"],
    ["Blotter Reports", "⚖️"],
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">🌿</div>
        <div>
          <b>Barangay</b>
          <br />
          <b>Management</b>
          <br />
          <b>System</b>
        </div>
      </div>

      <nav>
        {menus.map(([name, icon]) => (
          <button
            key={name}
            className={page === name ? "menu active" : "menu"}
            onClick={() => setPage(name)}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}
      </nav>

      <button className="settings">⚙ Settings</button>
    </aside>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="search">🔍 Search records, docs...</div>
      <div className="header-icons">🔔　👤</div>
    </header>
  );
}

function Status({ children }) {
  return (
    <span className={`status ${children.replaceAll(" ", "-").toLowerCase()}`}>
      {children}
    </span>
  );
}

function Dashboard({ setPage }) {
  return (
    <>
      <h1>Welcome back, Maria!</h1>
      <p className="muted">Your resident dashboard is updated for today.</p>

      <div className="dashboard-grid">
        <section>
          <div className="welcome-card">
            <div>
              <h2>Welcome back, Maria!</h2>
              <p>Your resident dashboard is updated for today.</p>
            </div>
            <div className="mini-image">📋</div>
          </div>

          <h2 className="section-title">Quick Actions</h2>

          <div className="quick-actions">
            <button onClick={() => setPage("Request Document")}>
              <strong>📄</strong>
              <h3>Request Document</h3>
              <p>Barangay clearance, indigency, etc.</p>
            </button>

            <button onClick={() => setPage("Blotter Reports")}>
              <strong>⚖️</strong>
              <h3>File Blotter</h3>
              <p>Report an incident or dispute.</p>
            </button>

            <button onClick={() => setPage("Announcements")}>
              <strong>📢</strong>
              <h3>Announcements</h3>
              <p>View latest community updates.</p>
            </button>
          </div>

          <div className="card">
            <div className="card-title">
              <h2>My Active Requests</h2>
              <button onClick={() => setPage("Document Requests")}>
                View All
              </button>
            </div>

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
                {requests.slice(0, 2).map((r) => (
                  <tr key={r.id}>
                    <td>{r.type}</td>
                    <td>{r.date}</td>
                    <td><Status>{r.status}</Status></td>
                    <td>👁</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CommunityFeed />
      </div>
    </>
  );
}

function CommunityFeed() {
  return (
    <div className="card feed">
      <h2>📋 Community Feed</h2>

      <div className="feed-item">
        <b>📢 Barangay Assembly</b>
        <p>Join us for the semi-annual barangay assembly this...</p>
        <small>2 hours ago</small>
      </div>

      <div className="feed-item">
        <b>💧 Water Interruption Advisory</b>
        <p>Maynilad announces a temporary water service...</p>
        <small>5 hours ago</small>
      </div>

      <div className="feed-item">
        <b>🏥 Medical Mission</b>
        <p>Free medical check-up and medicines will be provided...</p>
        <small>1 day ago</small>
      </div>

      <div className="load-more">Load More</div>
    </div>
  );
}

function DocumentRequests({ setPage }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Document Requests</h1>
          <p>Manage and track your official document requests.</p>
        </div>

        <button className="primary" onClick={() => setPage("Request Document")}>
          ＋ New Request
        </button>
      </div>

      <div className="request-layout">
        <div className="card request-status">
          <h3>Request Status</h3>
          <p className="muted">Overview of your recent document activity.</p>

          <div className="stats">
            <div>
              <small>PROCESSING</small>
              <strong>2</strong>
            </div>

            <div>
              <small>READY</small>
              <strong>1</strong>
            </div>
          </div>
        </div>

        <div className="card requests-table">
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
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.type}</td>
                  <td>{r.date}</td>
                  <td>
                    <Status>{r.status}</Status>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function RequestDocument() {
  const [file, setFile] = useState(null);

  return (
    <>
      <div className="back">← Back to Document Requests</div>

      <div className="page-heading">
        <div>
          <h1>Request a Document</h1>
          <p>
            Fill out the details below to request a new official document.
          </p>
        </div>
      </div>

      <div className="form-layout">
        <form
          className="card form-card"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Document request submitted!");
          }}
        >
          <label>Select Document Type *</label>
          <select required>
            <option value="">Select a document...</option>
            <option>Barangay Clearance</option>
            <option>Certificate of Indigency</option>
            <option>Business Permit</option>
            <option>Community Tax Certificate</option>
          </select>

          <div className="two-columns">
            <div>
              <label>Full Name *</label>
              <input placeholder="Juan Dela Cruz" required />
            </div>

            <div>
              <label>Contact Number *</label>
              <input placeholder="+63 900 000 0000" required />
            </div>
          </div>

          <label>Purpose of Request *</label>
          <textarea
            placeholder="Briefly describe why you need this document..."
            required
          />

          <label>Requirements Upload *</label>
          <p className="muted">
            Please upload valid ID or supporting documents.
          </p>

          <label className="upload">
            <input
              type="file"
              accept=".svg,.png,.jpg,.jpeg,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="upload-icon">📄</div>
            <b>Click to upload or drag and drop</b>
            <small>SVG, PNG, JPG or PDF (max. 5MB)</small>
            {file && <span>Selected: {file.name}</span>}
          </label>

          <div className="form-buttons">
            <button type="button">Cancel</button>
            <button className="primary" type="submit">
              Submit Request
            </button>
          </div>
        </form>

        <div>
          <div className="guide">
            <h3>💡 Request Guide</h3>
            <p>
              <b>1. Select Accurate Document</b>
              <br />
              Ensure you pick the correct document type.
            </p>

            <p>
              <b>2. Clear Purpose</b>
              <br />
              Be specific about the purpose of your request.
            </p>

            <p>
              <b>3. Valid Attachments</b>
              <br />
              Upload clear and legible copies of your requirements.
            </p>
          </div>

          <div className="card assistance">
            <h3>❓ Need Assistance?</h3>
            <p>
              If you are unsure which document to request, contact the
              administrative office.
            </p>
            <b>Contact Support →</b>
          </div>
        </div>
      </div>
    </>
  );
}

function Announcements() {
  return (
    <>
      <h1>Announcements</h1>
      <p className="muted">Latest updates from your barangay.</p>

      <div className="announcement card">
        <h2>📢 Barangay Assembly</h2>
        <p>
          All residents are invited to attend the semi-annual barangay
          assembly.
        </p>
        <small>Posted 2 hours ago</small>
      </div>

      <div className="announcement card">
        <h2>💧 Water Interruption Advisory</h2>
        <p>Temporary water service interruption is scheduled.</p>
        <small>Posted 5 hours ago</small>
      </div>

      <div className="announcement card">
        <h2>🏥 Medical Mission</h2>
        <p>Free medical check-up and medicines will be provided.</p>
        <small>Posted yesterday</small>
      </div>
    </>
  );
}

function BlotterReports() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <h1>Blotter Reports</h1>
      <p className="muted">
        Report incidents or disputes to the barangay office.
      </p>

      <form
        className="card blotter"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <label>Incident Type *</label>
        <select required>
          <option value="">Select incident type...</option>
          <option>Noise Complaint</option>
          <option>Dispute</option>
          <option>Property Issue</option>
          <option>Other</option>
        </select>

        <label>Incident Date *</label>
        <input type="date" required />

        <label>Description *</label>
        <textarea
          placeholder="Describe the incident..."
          required
        />

        <label>Location *</label>
        <input placeholder="Incident location" required />

        <button className="primary">Submit Blotter Report</button>

        {submitted && (
          <div className="success">
            ✓ Blotter report submitted successfully.
          </div>
        )}
      </form>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />

      <main>
        <Header />

        <div className="content">
          {page === "Dashboard" && <Dashboard setPage={setPage} />}
          {page === "Document Requests" && (
            <DocumentRequests setPage={setPage} />
          )}
          {page === "Request Document" && <RequestDocument />}
          {page === "Announcements" && <Announcements />}
          {page === "Blotter Reports" && <BlotterReports />}
        </div>
      </main>
    </div>
  );
}
