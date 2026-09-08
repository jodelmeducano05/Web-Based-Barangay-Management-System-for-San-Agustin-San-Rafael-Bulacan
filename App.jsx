import React, { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Resident");
  const [page, setPage] = useState("Dashboard");

  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [requests, setRequests] = useState([
    {
      id: "REQ-2023-089",
      type: "Barangay Clearance",
      date: "Oct 24, 2023",
      status: "Processing",
    },
    {
      id: "REQ-2023-088",
      type: "Certificate of Indigency",
      date: "Oct 22, 2023",
      status: "Pending Review",
    },
    {
      id: "REQ-2023-085",
      type: "Business Permit",
      date: "Oct 15, 2023",
      status: "Ready for Pickup",
    },
    {
      id: "REQ-2023-042",
      type: "Community Tax Certificate",
      date: "Sep 01, 2023",
      status: "Completed",
    },
  ]);

  const [announcements] = useState([
    {
      title: "Barangay Assembly",
      text: "Join us for the semi-annual barangay assembly.",
      date: "2 hours ago",
    },
    {
      title: "Water Interruption Advisory",
      text: "Maynilad announces a temporary water service interruption.",
      date: "5 hours ago",
    },
    {
      title: "Medical Mission",
      text: "Free medical check-up and medicines will be provided.",
      date: "1 day ago",
    },
  ]);

  const [blotters, setBlotters] = useState([
    {
      id: "BLT-001",
      complainant: "Juan Dela Cruz",
      type: "Noise Complaint",
      status: "Resolved",
      date: "Oct 20, 2023",
    },
    {
      id: "BLT-002",
      complainant: "Maria Santos",
      type: "Dispute",
      status: "Under Review",
      date: "Oct 23, 2023",
    },
  ]);

  const [documentType, setDocumentType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");

  const [blotterType, setBlotterType] = useState("");
  const [blotterDescription, setBlotterDescription] = useState("");

  const menu = [
    "Dashboard",
    "Document Requests",
    "Announcements",
    "Blotter Reports",
  ];

  const styles = {
    app: {
      minHeight: "100vh",
      fontFamily:
        "Inter, Arial, Helvetica, sans-serif",
      background: "#f5f7fb",
      color: "#172033",
    },

    loginPage: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg, #061a3d 0%, #092d66 55%, #0b7a43 100%)",
      padding: "20px",
    },

    loginCard: {
      width: "100%",
      maxWidth: "460px",
      background: "#fff",
      borderRadius: "24px",
      padding: "35px",
      boxShadow: "0 25px 70px rgba(0,0,0,.25)",
    },

    logo: {
      width: "95px",
      height: "95px",
      objectFit: "contain",
      display: "block",
      margin: "0 auto 12px",
    },

    title: {
      textAlign: "center",
      fontSize: "25px",
      fontWeight: "800",
      color: "#061a3d",
      marginBottom: "5px",
    },

    subtitle: {
      textAlign: "center",
      color: "#697386",
      marginBottom: "25px",
    },

    label: {
      display: "block",
      fontWeight: "700",
      fontSize: "14px",
      marginBottom: "7px",
    },

    input: {
      width: "100%",
      padding: "13px 14px",
      border: "1px solid #d8deea",
      borderRadius: "10px",
      marginBottom: "15px",
      outline: "none",
      fontSize: "14px",
      boxSizing: "border-box",
    },

    select: {
      width: "100%",
      padding: "13px 14px",
      border: "1px solid #d8deea",
      borderRadius: "10px",
      marginBottom: "15px",
      background: "#fff",
      fontSize: "14px",
      boxSizing: "border-box",
    },

    primaryButton: {
      width: "100%",
      border: "none",
      padding: "14px",
      borderRadius: "10px",
      background: "#092d66",
      color: "#fff",
      fontWeight: "800",
      cursor: "pointer",
      fontSize: "15px",
    },

    googleButton: {
      width: "100%",
      border: "1px solid #d8deea",
      padding: "13px",
      borderRadius: "10px",
      background: "#fff",
      color: "#222",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "10px",
    },

    linkButton: {
      background: "none",
      border: "none",
      color: "#1266d6",
      cursor: "pointer",
      fontWeight: "700",
    },

    layout: {
      display: "flex",
      minHeight: "100vh",
    },

    sidebar: {
      width: "245px",
      background: "#061a3d",
      color: "#fff",
      padding: "22px 15px",
      boxSizing: "border-box",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
    },

    brand: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "8px 10px 25px",
      borderBottom: "1px solid rgba(255,255,255,.12)",
      marginBottom: "20px",
    },

    brandLogo: {
      width: "48px",
      height: "48px",
      objectFit: "contain",
      background: "#fff",
      borderRadius: "50%",
    },

    brandText: {
      fontWeight: "800",
      fontSize: "14px",
      lineHeight: "1.25",
    },

    navButton: {
      width: "100%",
      textAlign: "left",
      border: "none",
      background: "transparent",
      color: "#dce7ff",
      padding: "13px 14px",
      borderRadius: "9px",
      cursor: "pointer",
      marginBottom: "5px",
      fontWeight: "650",
    },

    main: {
      marginLeft: "245px",
      width: "calc(100% - 245px)",
      minHeight: "100vh",
    },

    topbar: {
      height: "72px",
      background: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 30px",
      borderBottom: "1px solid #e6eaf0",
      boxSizing: "border-box",
    },

    content: {
      padding: "30px",
      maxWidth: "1400px",
      margin: "auto",
    },

    card: {
      background: "#fff",
      borderRadius: "15px",
      padding: "22px",
      boxShadow: "0 4px 18px rgba(20,40,80,.06)",
      border: "1px solid #e9edf4",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "18px",
      marginBottom: "22px",
    },

    statNumber: {
      fontSize: "30px",
      fontWeight: "800",
      marginTop: "8px",
    },

    actionButton: {
      border: "none",
      borderRadius: "12px",
      padding: "18px",
      background: "#f1f5ff",
      cursor: "pointer",
      textAlign: "left",
      fontWeight: "750",
      minHeight: "110px",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    th: {
      textAlign: "left",
      padding: "13px",
      background: "#f5f7fb",
      fontSize: "13px",
    },

    td: {
      padding: "14px 13px",
      borderBottom: "1px solid #edf0f5",
      fontSize: "14px",
    },

    badge: {
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "800",
    },

    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      zIndex: 1000,
    },

    modal: {
      width: "100%",
      maxWidth: "470px",
      background: "#fff",
      borderRadius: "18px",
      padding: "25px",
    },
  };

  function login() {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoggedIn(true);
    setPage("Dashboard");
  }

  function googleLogin() {
    alert(
      "Google Account Login selected.\n\nFor production, connect Firebase Google Authentication."
    );

    setLoggedIn(true);
    setPage("Dashboard");
  }

  function signup() {
    if (!signupName || !signupEmail || !signupPassword) {
      alert("Please complete all sign up fields.");
      return;
    }

    alert("Account created successfully!");
    setShowSignup(false);
    setEmail(signupEmail);
    setPassword(signupPassword);
  }

  function forgotPassword() {
    if (!email) {
      alert("Enter your email address first.");
      return;
    }

    alert(
      "Password reset instructions have been sent to " +
        email
    );

    setShowForgot(false);
  }

  function submitDocument() {
    if (!documentType || !fullName || !purpose) {
      alert("Please complete the required fields.");
      return;
    }

    const newRequest = {
      id:
        "REQ-" +
        new Date().getFullYear() +
        "-" +
        String(requests.length + 90).padStart(3, "0"),
      type: documentType,
      date: new Date().toLocaleDateString(),
      status: "Pending Review",
    };

    setRequests([newRequest, ...requests]);

    alert("Document request submitted successfully!");

    setDocumentType("");
    setFullName("");
    setContact("");
    setPurpose("");
    setPage("Document Requests");
  }

  function submitBlotter() {
    if (!blotterType || !blotterDescription) {
      alert("Please complete the blotter report.");
      return;
    }

    const newBlotter = {
      id: "BLT-" + String(blotters.length + 1).padStart(3, "0"),
      complainant: fullName || "Resident",
      type: blotterType,
      status: "Under Review",
      date: new Date().toLocaleDateString(),
    };

    setBlotters([newBlotter, ...blotters]);

    alert("Blotter report submitted.");

    setBlotterType("");
    setBlotterDescription("");
    setPage("Blotter Reports");
  }

  function logout() {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  }

  function StatusBadge({ status }) {
    let background = "#eef2f7";
    let color = "#4b5563";

    if (status === "Processing") {
      background = "#fff2cc";
      color = "#946200";
    }

    if (status === "Pending Review") {
      background = "#e9edf2";
      color = "#56606d";
    }

    if (status === "Ready for Pickup") {
      background = "#d9fbe5";
      color = "#087a35";
    }

    if (status === "Completed" || status === "Resolved") {
      background = "#d9fbe5";
      color = "#087a35";
    }

    return (
      <span
        style={{
          ...styles.badge,
          background,
          color,
        }}
      >
        {status}
      </span>
    );
  }

  function LoginPage() {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <img
            src="/barangay-logo.png"
            alt="Barangay San Agustin Logo"
            style={styles.logo}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div style={styles.title}>
            Barangay Management System
          </div>

          <div style={styles.subtitle}>
            Barangay San Agustin
            <br />
            San Rafael, Bulacan
          </div>

          <label style={styles.label}>Login as</label>

          <select
            style={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Resident">Resident</option>
            <option value="Captain">Barangay Captain</option>
            <option value="Secretary">Barangay Secretary</option>
          </select>

          <label style={styles.label}>
            Email Address
          </label>

          <input
            style={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label}>Password</label>

          <input
            style={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            style={styles.primaryButton}
            onClick={login}
          >
            Login as {role}
          </button>

          <button
            style={styles.googleButton}
            onClick={googleLogin}
          >
            🔵 Continue with Google
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "18px",
              fontSize: "13px",
            }}
          >
            <button
              style={styles.linkButton}
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </button>

            <button
              style={styles.linkButton}
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>

        {showForgot && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Forgot Password</h2>

              <p style={{ color: "#667085" }}>
                Enter your email and we'll send you
                instructions to reset your password.
              </p>

              <input
                style={styles.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                style={styles.primaryButton}
                onClick={forgotPassword}
              >
                Send Reset Link
              </button>

              <button
                style={{
                  ...styles.googleButton,
                  marginTop: "8px",
                }}
                onClick={() => setShowForgot(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showSignup && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Create Account</h2>

              <label style={styles.label}>
                Full Name
              </label>

              <input
                style={styles.input}
                placeholder="Juan Dela Cruz"
                value={signupName}
                onChange={(e) =>
                  setSignupName(e.target.value)
                }
              />

              <label style={styles.label}>
                Email Address
              </label>

              <input
                style={styles.input}
                type="email"
                placeholder="juan@email.com"
                value={signupEmail}
                onChange={(e) =>
                  setSignupEmail(e.target.value)
                }
              />

              <label style={styles.label}>
                Password
              </label>

              <input
                style={styles.input}
                type="password"
                placeholder="Create password"
                value={signupPassword}
                onChange={(e) =>
                  setSignupPassword(e.target.value)
                }
              />

              <button
                style={styles.primaryButton}
                onClick={signup}
              >
                Create Account
              </button>

              <button
                style={styles.googleButton}
                onClick={() => setShowSignup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  function Dashboard() {
    if (role === "Captain") {
      return <CaptainDashboard />;
    }

    if (role === "Secretary") {
      return <SecretaryDashboard />;
    }

    return <ResidentDashboard />;
  }

  function ResidentDashboard() {
    return (
      <>
        <h1>Welcome back, Maria!</h1>

        <p style={{ color: "#667085" }}>
          Your resident dashboard is updated for today.
        </p>

        <div style={styles.grid}>
          <button
            style={styles.actionButton}
            onClick={() => setPage("Document Requests")}
          >
            📄
            <br />
            <br />
            Request Document
            <br />
            <small>
              Barangay clearance, indigency, etc.
            </small>
          </button>

          <button
            style={styles.actionButton}
            onClick={() => setPage("Blotter Reports")}
          >
            🚨
            <br />
            <br />
            File Blotter
            <br />
            <small>
              Report an incident or dispute.
            </small>
          </button>

          <button
            style={styles.actionButton}
            onClick={() => setPage("Announcements")}
          >
            📢
            <br />
            <br />
            Announcements
            <br />
            <small>
              View latest community updates.
            </small>
          </button>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div>Processing Requests</div>
            <div style={styles.statNumber}>
              {
                requests.filter(
                  (r) => r.status === "Processing"
                ).length
              }
            </div>
          </div>

          <div style={styles.card}>
            <div>Pending Requests</div>
            <div style={styles.statNumber}>
              {
                requests.filter(
                  (r) => r.status === "Pending Review"
                ).length
              }
            </div>
          </div>

          <div style={styles.card}>
            <div>Completed</div>
            <div style={styles.statNumber}>
              {
                requests.filter(
                  (r) => r.status === "Completed"
                ).length
              }
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2>My Active Requests</h2>

          <RequestTable />
        </div>
      </>
    );
  }

  function CaptainDashboard() {
    return (
      <>
        <h1>Captain Dashboard</h1>

        <p style={{ color: "#667085" }}>
          Barangay Captain administrative overview.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            👥
            <div>Registered Residents</div>
            <div style={styles.statNumber}>1,248</div>
          </div>

          <div style={styles.card}>
            📄
            <div>Document Requests</div>
            <div style={styles.statNumber}>
              {requests.length}
            </div>
          </div>

          <div style={styles.card}>
            🚨
            <div>Blotter Reports</div>
            <div style={styles.statNumber}>
              {blotters.length}
            </div>
          </div>

          <div style={styles.card}>
            📢
            <div>Announcements</div>
            <div style={styles.statNumber}>
              {announcements.length}
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2>Recent Document Requests</h2>
          <RequestTable />
        </div>
      </>
    );
  }

  function SecretaryDashboard() {
    return (
      <>
        <h1>Secretary Dashboard</h1>

        <p style={{ color: "#667085" }}>
          Manage documents, residents and barangay
          records.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            📥
            <div>Pending Documents</div>
            <div style={styles.statNumber}>
              {
                requests.filter(
                  (r) => r.status !== "Completed"
                ).length
              }
            </div>
          </div>

          <div style={styles.card}>
            🗂
            <div>Total Requests</div>
            <div style={styles.statNumber}>
              {requests.length}
            </div>
          </div>

          <div style={styles.card}>
            🚨
            <div>Blotter Reports</div>
            <div style={styles.statNumber}>
              {blotters.length}
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2>Document Processing</h2>
          <RequestTable />
        </div>
      </>
    );
  }

  function RequestTable() {
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>REQUEST ID</th>
              <th style={styles.th}>DOCUMENT TYPE</th>
              <th style={styles.th}>DATE</th>
              <th style={styles.th}>STATUS</th>
              <th style={styles.th}>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td style={styles.td}>{request.id}</td>
                <td style={styles.td}>
                  {request.type}
                </td>
                <td style={styles.td}>
                  {request.date}
                </td>
                <td style={styles.td}>
                  <StatusBadge
                    status={request.status}
                  />
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() =>
                      alert(
                        `Request ${request.id}\n\nDocument: ${request.type}\nStatus: ${request.status}`
                      )
                    }
                    style={{
                      border: "none",
                      background: "#eef3ff",
                      padding: "8px 12px",
                      borderRadius: "7px",
                      cursor: "pointer",
                    }}
                  >
                    👁 View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function DocumentRequests() {
    return (
      <>
        <h1>Document Requests</h1>

        <p style={{ color: "#667085" }}>
          Manage and track your official document
          requests.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <b>PROCESSING</b>
            <div style={styles.statNumber}>
              {
                requests.filter(
                  (r) => r.status === "Processing"
                ).length
              }
            </div>
          </div>

          <div style={styles.card}>
            <b>READY</b>
            <div style={styles.statNumber}>
              {
                requests.filter(
                  (r) => r.status === "Ready for Pickup"
                ).length
              }
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2>My Requests</h2>
          <RequestTable />
        </div>

        <br />

        <div style={styles.card}>
          <h2>Request a Document</h2>

          <label style={styles.label}>
            Select Document Type *
          </label>

          <select
            style={styles.select}
            value={documentType}
            onChange={(e) =>
              setDocumentType(e.target.value)
            }
          >
            <option value="">
              Select a document...
            </option>
            <option>Barangay Clearance</option>
            <option>Certificate of Indigency</option>
            <option>Certificate of Residency</option>
            <option>Business Permit</option>
            <option>Community Tax Certificate</option>
          </select>

          <label style={styles.label}>
            Full Name *
          </label>

          <input
            style={styles.input}
            placeholder="Juan Dela Cruz"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />

          <label style={styles.label}>
            Contact Number
          </label>

          <input
            style={styles.input}
            placeholder="+63 900 000 0000"
            value={contact}
            onChange={(e) =>
              setContact(e.target.value)
            }
          />

          <label style={styles.label}>
            Purpose of Request *
          </label>

          <textarea
            style={{
              ...styles.input,
              minHeight: "100px",
              resize: "vertical",
            }}
            placeholder="Briefly describe why you need this document..."
            value={purpose}
            onChange={(e) =>
              setPurpose(e.target.value)
            }
          />

          <button
            style={{
              ...styles.primaryButton,
              maxWidth: "250px",
            }}
            onClick={submitDocument}
          >
            Submit Request
          </button>
        </div>
      </>
    );
  }

  function Announcements() {
    return (
      <>
        <h1>Announcements</h1>

        <p style={{ color: "#667085" }}>
          Latest updates from Barangay San Agustin.
        </p>

        <div style={styles.grid}>
          {announcements.map((announcement, index) => (
            <div style={styles.card} key={index}>
              <div style={{ fontSize: "30px" }}>
                📢
              </div>

              <h3>{announcement.title}</h3>

              <p style={{ color: "#667085" }}>
                {announcement.text}
              </p>

              <small>{announcement.date}</small>

              <br />
              <br />

              <button
                style={{
                  ...styles.primaryButton,
                  width: "auto",
                  padding: "9px 15px",
                }}
                onClick={() =>
                  alert(
                    `${announcement.title}\n\n${announcement.text}`
                  )
                }
              >
                View Announcement
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }

  function BlotterReports() {
    return (
      <>
        <h1>Blotter Reports</h1>

        <p style={{ color: "#667085" }}>
          Report incidents or disputes to the barangay.
        </p>

        <div style={styles.card}>
          <h2>File a Blotter Report</h2>

          <label style={styles.label}>
            Report Type *
          </label>

          <select
            style={styles.select}
            value={blotterType}
            onChange={(e) =>
              setBlotterType(e.target.value)
            }
          >
            <option value="">
              Select report type...
            </option>
            <option>Noise Complaint</option>
            <option>Dispute</option>
            <option>Property Issue</option>
            <option>Public Disturbance</option>
            <option>Other</option>
          </select>

          <label style={styles.label}>
            Description *
          </label>

          <textarea
            style={{
              ...styles.input,
              minHeight: "130px",
              resize: "vertical",
            }}
            placeholder="Describe the incident..."
            value={blotterDescription}
            onChange={(e) =>
              setBlotterDescription(e.target.value)
            }
          />

          <button
            style={{
              ...styles.primaryButton,
              maxWidth: "230px",
            }}
            onClick={submitBlotter}
          >
            Submit Blotter
          </button>
        </div>

        <br />

        <div style={styles.card}>
          <h2>My Reports</h2>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>REPORT ID</th>
                  <th style={styles.th}>COMPLAINANT</th>
                  <th style={styles.th}>TYPE</th>
                  <th style={styles.th}>DATE</th>
                  <th style={styles.th}>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {blotters.map((b) => (
                  <tr key={b.id}>
                    <td style={styles.td}>{b.id}</td>
                    <td style={styles.td}>
                      {b.complainant}
                    </td>
                    <td style={styles.td}>
                      {b.type}
                    </td>
                    <td style={styles.td}>{b.date}</td>
                    <td style={styles.td}>
                      <StatusBadge status={b.status} />
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

  function PageContent() {
    if (page === "Dashboard") {
      return <Dashboard />;
    }

    if (page === "Document Requests") {
      return <DocumentRequests />;
    }

    if (page === "Announcements") {
      return <Announcements />;
    }

    if (page === "Blotter Reports") {
      return <BlotterReports />;
    }

    return <Dashboard />;
  }

  if (!loggedIn) {
    return <LoginPage />;
  }

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <img
            src="/barangay-logo.png"
            alt="Barangay Logo"
            style={styles.brandLogo}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div style={styles.brandText}>
            BARANGAY
            <br />
            MANAGEMENT
            <br />
            SYSTEM
          </div>
        </div>

        {menu.map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            style={{
              ...styles.navButton,
              background:
                page === item
                  ? "#39e878"
                  : "transparent",
              color:
                page === item ? "#061a3d" : "#dce7ff",
            }}
          >
            {item === "Dashboard" && "▦ "}
            {item === "Document Requests" && "▣ "}
            {item === "Announcements" && "📢 "}
            {item === "Blotter Reports" && "⚠ "}
            {item}
          </button>
        ))}

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "15px",
            right: "15px",
          }}
        >
          <button
            style={styles.navButton}
            onClick={() =>
              alert(
                "Settings\n\nAccount and system settings."
              )
            }
          >
            ⚙ Settings
          </button>

          <button
            style={{
              ...styles.navButton,
              color: "#ffb4b4",
            }}
            onClick={logout}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <b>{page}</b>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <button
              onClick={() =>
                alert("You have no new notifications.")
              }
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "19px",
              }}
            >
              🔔
            </button>

            <div>
              <b>{role}</b>
              <div
                style={{
                  fontSize: "12px",
                  color: "#667085",
                }}
              >
                {email || "demo@barangay.gov.ph"}
              </div>
            </div>
          </div>
        </header>

        <section style={styles.content}>
          <PageContent />
        </section>
      </main>
    </div>
  );
}
