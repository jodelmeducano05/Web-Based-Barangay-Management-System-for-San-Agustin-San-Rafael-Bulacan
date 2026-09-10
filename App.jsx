import React, { useState } from "react";

const LOGO = "/barangay-logo.png";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f5f7fb",
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
    color: "#172554",
  },

  loginPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #062d63 0%, #0b4b91 55%, #0fa968 100%)",
    padding: 20,
  },

  loginCard: {
    width: "100%",
    maxWidth: 460,
    background: "#fff",
    borderRadius: 24,
    padding: 35,
    boxShadow: "0 25px 70px rgba(0,0,0,.25)",
  },

  loginLogo: {
    width: 95,
    height: 95,
    objectFit: "contain",
    display: "block",
    margin: "0 auto 15px",
  },

  center: {
    textAlign: "center",
  },

  title: {
    margin: "5px 0",
    fontSize: 28,
    fontWeight: 800,
    color: "#092f63",
  },

  subtitle: {
    color: "#64748b",
    marginBottom: 25,
  },

  input: {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #d7deea",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    marginTop: 7,
    boxSizing: "border-box",
  },

  label: {
    fontSize: 13,
    fontWeight: 700,
    color: "#334155",
  },

  formGroup: {
    marginBottom: 17,
  },

  primaryButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: 10,
    background: "#0b4b91",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 15,
  },

  googleButton: {
    width: "100%",
    padding: "13px",
    border: "1px solid #d7deea",
    borderRadius: 10,
    background: "white",
    color: "#334155",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
    marginTop: 12,
  },

  linkButton: {
    border: "none",
    background: "transparent",
    color: "#0b5cab",
    cursor: "pointer",
    fontWeight: 700,
  },

  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginBottom: 18,
  },

  roleButton: {
    padding: "12px 5px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 12,
    border: "1px solid #d7deea",
    background: "#f8fafc",
  },

  layout: {
    minHeight: "100vh",
    display: "flex",
  },

  sidebar: {
    width: 245,
    minHeight: "100vh",
    background: "linear-gradient(180deg,#061b45,#092b63)",
    color: "white",
    padding: 20,
    boxSizing: "border-box",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 35,
  },

  brandLogo: {
    width: 52,
    height: 52,
    objectFit: "contain",
    background: "white",
    borderRadius: "50%",
  },

  brandText: {
    fontWeight: 800,
    lineHeight: 1.2,
    fontSize: 15,
  },

  menuButton: {
    width: "100%",
    border: "none",
    padding: "12px 14px",
    marginBottom: 7,
    borderRadius: 9,
    color: "#dbeafe",
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: 700,
  },

  activeMenu: {
    background: "#16d66d",
    color: "#062e24",
  },

  bottomMenu: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  main: {
    marginLeft: 245,
    width: "calc(100% - 245px)",
    minHeight: "100vh",
    boxSizing: "border-box",
  },

  topbar: {
    height: 70,
    background: "#fff",
    borderBottom: "1px solid #e5eaf2",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    boxSizing: "border-box",
  },

  search: {
    width: 330,
    maxWidth: "45%",
    padding: "11px 15px",
    borderRadius: 20,
    border: "1px solid #e2e8f0",
    outline: "none",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 700,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 30,
  },

  headingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 25,
  },

  heading: {
    margin: 0,
    fontSize: 28,
    color: "#173b76",
  },

  description: {
    margin: "7px 0 0",
    color: "#718096",
  },

  button: {
    border: "none",
    borderRadius: 9,
    padding: "11px 16px",
    background: "#0b4b91",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 800,
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(210px,1fr))",
    gap: 18,
    marginBottom: 25,
  },

  card: {
    background: "#fff",
    borderRadius: 15,
    padding: 20,
    border: "1px solid #e6ebf2",
    boxShadow: "0 5px 18px rgba(15,23,42,.04)",
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: 800,
    color: "#64748b",
    textTransform: "uppercase",
  },

  number: {
    fontSize: 31,
    fontWeight: 900,
    margin: "8px 0",
    color: "#163d78",
  },

  small: {
    fontSize: 12,
    color: "#64748b",
  },

  section: {
    background: "#fff",
    borderRadius: 15,
    padding: 20,
    border: "1px solid #e6ebf2",
    marginBottom: 22,
  },

  sectionTitle: {
    margin: "0 0 17px",
    fontSize: 17,
    color: "#173b76",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },

  th: {
    textAlign: "left",
    padding: 12,
    background: "#f8fafc",
    color: "#64748b",
    fontSize: 11,
  },

  td: {
    padding: 13,
    borderBottom: "1px solid #edf1f5",
  },

  badge: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 800,
  },

  greenBadge: {
    background: "#dcfce7",
    color: "#15803d",
  },

  blueBadge: {
    background: "#dbeafe",
    color: "#1d4ed8",
  },

  redBadge: {
    background: "#fee2e2",
    color: "#dc2626",
  },

  yellowBadge: {
    background: "#fef3c7",
    color: "#a16207",
  },

  modalBg: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,15,40,.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 50,
  },

  modal: {
    background: "#fff",
    width: "100%",
    maxWidth: 500,
    borderRadius: 18,
    padding: 25,
    boxShadow: "0 25px 70px rgba(0,0,0,.25)",
  },

  textarea: {
    width: "100%",
    minHeight: 120,
    resize: "vertical",
    padding: 13,
    border: "1px solid #d7deea",
    borderRadius: 10,
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  actionRow: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
    marginTop: 20,
  },

  secondaryButton: {
    border: "1px solid #d7deea",
    background: "#fff",
    color: "#334155",
    borderRadius: 9,
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: 700,
  },

  /* =========================
     RESIDENT STYLES
  ========================= */

  cardGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
    marginBottom: 25,
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 12,
  },

  tableCard: {
    background: "#fff",
    borderRadius: 15,
    padding: 20,
    border: "1px solid #e6ebf2",
    boxShadow: "0 5px 18px rgba(15,23,42,.04)",
    overflowX: "auto",
    marginBottom: 25,
  },

  pending: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 800,
    background: "#fef3c7",
    color: "#a16207",
  },

  approved: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 800,
    background: "#dcfce7",
    color: "#15803d",
  },

  feedCard: {
    background: "#fff",
    borderRadius: 15,
    padding: 18,
    border: "1px solid #e6ebf2",
    marginBottom: 15,
    boxShadow: "0 5px 18px rgba(15,23,42,.04)",
  },

  filterButtons: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    margin: "20px 0",
  },

  filterButton: {
    border: "1px solid #d7deea",
    background: "#fff",
    color: "#475569",
    padding: "9px 15px",
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: 700,
  },

  activeFilter: {
    border: "none",
    background: "#0b4b91",
    color: "#fff",
    padding: "9px 15px",
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: 700,
  },

  announcementGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 18,
  },

  announcementCard: {
    background: "#fff",
    borderRadius: 15,
    padding: 20,
    border: "1px solid #e6ebf2",
    boxShadow: "0 5px 18px rgba(15,23,42,.04)",
  },

  announcementCategory: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: 20,
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: 10,
    fontWeight: 800,
    marginBottom: 10,
  },

  residentActionCard: {
    cursor: "pointer",
    transition: "transform .15s ease",
  },
};

/* =========================================================
   LOGIN
========================================================= */

function Login({ onLogin }) {
  const [role, setRole] = useState("Resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (mode === "signup") {
      setMessage(
        "Account created successfully! You can now login."
      );
      setMode("login");
      return;
    }

    if (!email || !password) {
      setMessage(
        "Please enter your email and password."
      );
      return;
    }

    onLogin(role, email);
  };

  const googleLogin = () => {
    onLogin(role, "Google Account");
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <img
          src={LOGO}
          alt="Barangay Logo"
          style={styles.loginLogo}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div style={styles.center}>
          <h1 style={styles.title}>
            Barangay Management System
          </h1>

          <p style={styles.subtitle}>
            San Agustin, San Rafael, Bulacan
          </p>
        </div>

        <div style={styles.roleGrid}>
          {["Resident", "Captain", "Secretary"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setRole(item);
                  setMessage("");
                }}
                style={{
                  ...styles.roleButton,
                  ...(role === item
                    ? {
                        background: "#16d66d",
                        borderColor: "#16d66d",
                        color: "#063b28",
                      }
                    : {}),
                }}
              >
                {item}
              </button>
            )
          )}
        </div>

        <form onSubmit={submit}>
          {mode === "signup" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Full Name
              </label>

              <input
                style={styles.input}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Email Address
            </label>

            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
            />
          </div>

          {mode !== "forgot" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Password
              </label>

              <input
                type="password"
                style={styles.input}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
              />
            </div>
          )}

          {mode === "forgot" ? (
            <>
              <button
                type="button"
                style={styles.primaryButton}
                onClick={() => {
                  setMessage(
                    "Password reset instructions have been sent."
                  );
                  setMode("login");
                }}
              >
                Send Reset Link
              </button>

              <div
                style={{
                  ...styles.center,
                  marginTop: 15,
                }}
              >
                <button
                  type="button"
                  style={styles.linkButton}
                  onClick={() => setMode("login")}
                >
                  ← Back to Login
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="submit"
                style={styles.primaryButton}
              >
                {mode === "signup"
                  ? "Create Account"
                  : `Login as ${role}`}
              </button>

              <button
                type="button"
                style={styles.googleButton}
                onClick={googleLogin}
              >
                🔵 Continue with Google
              </button>

              {mode === "login" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 15,
                    fontSize: 13,
                  }}
                >
                  <button
                    type="button"
                    style={styles.linkButton}
                    onClick={() =>
                      setMode("forgot")
                    }
                  >
                    Forgot Password?
                  </button>

                  <button
                    type="button"
                    style={styles.linkButton}
                    onClick={() =>
                      setMode("signup")
                    }
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {mode === "signup" && (
                <div
                  style={{
                    ...styles.center,
                    marginTop: 15,
                    fontSize: 13,
                  }}
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    style={styles.linkButton}
                    onClick={() =>
                      setMode("login")
                    }
                  >
                    Login
                  </button>
                </div>
              )}
            </>
          )}
        </form>

        {message && (
          <div
            style={{
              marginTop: 18,
              padding: 12,
              borderRadius: 9,
              background: "#eff6ff",
              color: "#1d4ed8",
              fontSize: 13,
            }}
          >
            {message}
          </div>
        )}

        <p
          style={{
            ...styles.center,
            color: "#94a3b8",
            fontSize: 11,
            marginTop: 25,
          }}
        >
          Selected Role: <b>{role}</b>
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  role,
  page,
  setPage,
  logout,
}) {
  let menu = [];

  if (role === "Captain") {
    menu = [
      "Dashboard",
      "Document Requests",
      "Announcements",
      "Blotter Reports",
    ];
  } else if (role === "Secretary") {
    menu = [
      "Dashboard",
      "Document Requests",
      "Announcements",
      "Blotter Reports",
    ];
  } else {
    menu = [
      "Dashboard",
      "My Requests",
      "Announcements",
      "My Reports",
    ];
  }

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <img
          src={LOGO}
          alt=""
          style={styles.brandLogo}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div style={styles.brandText}>
          Barangay
          <br />
          Management
          <br />
          System
        </div>
      </div>

      {menu.map((item) => (
        <button
          key={item}
          style={{
            ...styles.menuButton,
            ...(page === item
              ? styles.activeMenu
              : {}),
          }}
          onClick={() => setPage(item)}
        >
          {item === "Dashboard" && "▦ "}
          {item === "Document Requests" && "▤ "}
          {item === "Announcements" && "📢 "}
          {item === "Blotter Reports" && "⚖ "}
          {item === "My Requests" && "📄 "}
          {item === "My Reports" && "⚠ "}
          {item}
        </button>
      ))}

      <div style={styles.bottomMenu}>
        <button
          style={styles.menuButton}
          onClick={() =>
            alert("Settings page")
          }
        >
          ⚙ Settings
        </button>

        <button
          style={styles.menuButton}
          onClick={logout}
        >
          ⇥ Logout
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   TOPBAR
========================================================= */

function Topbar({ role }) {
  return (
    <div style={styles.topbar}>
      <input
        style={styles.search}
        placeholder="Search records, names, or IDs..."
      />

      <div style={styles.profile}>
        🔔
        <div style={styles.avatar}>👤</div>
        <span>{role}</span>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        {title}
      </div>

      <div style={styles.number}>
        {value}
      </div>

      <div style={styles.small}>
        {subtitle}
      </div>
    </div>
  );
}

/* =========================================================
   CAPTAIN DASHBOARD
========================================================= */

function CaptainDashboard({
  setPage,
  openModal,
}) {
  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            Good Morning, Captain
          </h1>

          <p style={styles.description}>
            Here's an overview of the barangay's
            administrative status today.
          </p>
        </div>

        <div>
          <button
            style={{
              ...styles.secondaryButton,
              marginRight: 8,
            }}
            onClick={() =>
              alert("Daily report generated.")
            }
          >
            ↓ Print Daily Report
          </button>

          <button
            style={styles.button}
            onClick={() =>
              openModal("New Record")
            }
          >
            + New Record
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          System Overview Active
        </h3>

        <div style={styles.cards}>
          <StatCard
            title="Certificates Issued"
            value="84"
            subtitle="This week"
          />

          <StatCard
            title="Pending Requests"
            value="15"
            subtitle="Require review"
          />

          <StatCard
            title="Active Blotters"
            value="7"
            subtitle="Currently open cases"
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0,2fr) minmax(260px,1fr)",
          gap: 20,
        }}
      >
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            Recent Critical Reports
          </h3>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>
                    CATEGORY
                  </th>
                  <th style={styles.th}>
                    SUBJECT
                  </th>
                  <th style={styles.th}>DATE</th>
                  <th style={styles.th}>STATUS</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td style={styles.td}>
                    BL-2023-089
                  </td>

                  <td style={styles.td}>
                    Disturbance
                  </td>

                  <td style={styles.td}>
                    Noise complaint at Block 4
                  </td>

                  <td style={styles.td}>
                    Oct 24
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...styles.redBadge,
                      }}
                    >
                      Unresolved
                    </span>
                  </td>
                </tr>

                <tr>
                  <td style={styles.td}>
                    BL-2023-088
                  </td>

                  <td style={styles.td}>
                    Property
                  </td>

                  <td style={styles.td}>
                    Property damage report
                  </td>

                  <td style={styles.td}>
                    Oct 23
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...styles.yellowBadge,
                      }}
                    >
                      Hearing
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            style={{
              ...styles.linkButton,
              marginTop: 15,
            }}
            onClick={() =>
              setPage("Blotter Reports")
            }
          >
            View All →
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            System Activity
          </h3>

          <p style={styles.small}>
            🟢 Just now
          </p>

          <p>
            Admin approved Certificate Request.
          </p>

          <hr />

          <p style={styles.small}>
            🔴 15 minutes ago
          </p>

          <p>
            New blotter report was logged.
          </p>

          <hr />

          <p style={styles.small}>
            🔵 1 hour ago
          </p>

          <p>
            Resident record updated.
          </p>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SECRETARY DASHBOARD
========================================================= */

function SecretaryDashboard({
  setPage,
  openModal,
}) {
  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            Secretary's Dashboard
          </h1>

          <p style={styles.description}>
            Overview of barangay operations and
            pending tasks.
          </p>
        </div>

        <div>
          <button
            style={{
              ...styles.secondaryButton,
              marginRight: 8,
            }}
            onClick={() =>
              alert("Report generated.")
            }
          >
            ↓ Generate Report
          </button>

          <button
            style={styles.button}
            onClick={() =>
              openModal("New Record")
            }
          >
            + New Record
          </button>
        </div>
      </div>

      <div style={styles.cards}>
        <StatCard
          title="Pending Docs"
          value="34"
          subtitle="12 require urgent review"
        />

        <StatCard
          title="Blotter Reports"
          value="8"
          subtitle="3 unresolved cases"
        />

        <StatCard
          title="Scheduled Hearings"
          value="5"
          subtitle="Next hearing: Tomorrow"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0,2fr) minmax(250px,1fr)",
          gap: 20,
        }}
      >
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            Document Request Queue
          </h3>

          <p style={styles.small}>
            Manage and process incoming citizen
            requests.
          </p>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>
                    REQUEST ID
                  </th>

                  <th style={styles.th}>
                    RESIDENT NAME
                  </th>

                  <th style={styles.th}>
                    DOCUMENT TYPE
                  </th>

                  <th style={styles.th}>
                    STATUS
                  </th>

                  <th style={styles.th}>
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>
                <SecretaryRow
                  id="REQ-2023-045"
                  name="Maria Clara"
                  doc="Barangay Clearance"
                  status="New"
                />

                <SecretaryRow
                  id="REQ-2023-044"
                  name="Jose Rizal"
                  doc="Certificate of Indigency"
                  status="In Progress"
                />

                <SecretaryRow
                  id="REQ-2023-043"
                  name="Andres Bonifacio"
                  doc="Business Permit"
                  status="Missing Docs"
                />

                <SecretaryRow
                  id="REQ-2023-042"
                  name="Emilia Aguinaldo"
                  doc="Barangay Clearance"
                  status="New"
                />
              </tbody>
            </table>
          </div>

          <button
            style={{
              ...styles.linkButton,
              marginTop: 15,
            }}
            onClick={() =>
              setPage("Document Requests")
            }
          >
            View All Requests →
          </button>
        </div>

        <div>
          <div
            style={{
              ...styles.section,
              background:
                "linear-gradient(135deg,#0b4b91,#173e82)",
              color: "white",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              Upcoming Hearing
            </h3>

            <div
              style={{
                background: "white",
                color: "#173b76",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <b>OCT 24</b>

              <p style={{ margin: "8px 0" }}>
                Case #BL-892
              </p>

              <small>
                10:00 AM • Barangay Hall
              </small>
            </div>

            <button
              style={{
                ...styles.secondaryButton,
                width: "100%",
                marginTop: 12,
              }}
              onClick={() =>
                alert(
                  "Hearing details opened."
                )
              }
            >
              View Details
            </button>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              Recent Actions
            </h3>

            <p>
              ✓ Approved Barangay Clearance
            </p>

            <p>
              ✎ Updated Resident Record
            </p>

            <p>
              ⚖ Logged new Blotter Report
            </p>

            <p>
              ▣ Printed Certificate
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SECRETARY ROW
========================================================= */

function SecretaryRow({
  id,
  name,
  doc,
  status,
}) {
  let badge = styles.blueBadge;

  if (status === "New") {
    badge = styles.greenBadge;
  }

  if (status === "Missing Docs") {
    badge = styles.redBadge;
  }

  return (
    <tr>
      <td style={styles.td}>{id}</td>

      <td style={styles.td}>
        <b>{name}</b>
      </td>

      <td style={styles.td}>{doc}</td>

      <td style={styles.td}>
        <span
          style={{
            ...styles.badge,
            ...badge,
          }}
        >
          {status}
        </span>
      </td>

      <td style={styles.td}>
        <button
          style={{
            ...styles.button,
            padding: "7px 13px",
            fontSize: 12,
          }}
          onClick={() =>
            alert(`Reviewing ${id}`)
          }
        >
          Review
        </button>
      </td>
    </tr>
  );
}

/* =========================================================
   DOCUMENT REQUESTS
   CAPTAIN + SECRETARY ONLY
========================================================= */

function DocumentRequests({ openModal }) {
  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            Document Requests
          </h1>

          <p style={styles.description}>
            Manage and process pending civic
            documents.
          </p>
        </div>

        <div>
          <button
            style={{
              ...styles.secondaryButton,
              marginRight: 8,
            }}
            onClick={() =>
              alert("Filter opened.")
            }
          >
            ⚲ Filter
          </button>

          <button
            style={styles.button}
            onClick={() =>
              alert("Export completed.")
            }
          >
            ↓ Export
          </button>
        </div>
      </div>

      <div style={styles.cards}>
        <StatCard
          title="Total Pending"
          value="142"
          subtitle="All requests"
        />

        <StatCard
          title="Urgent Reviews"
          value="18"
          subtitle="Needs immediate action"
        />

        <StatCard
          title="Ready for Pickup"
          value="34"
          subtitle="Completed documents"
        />
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          Request Queue
        </h3>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  REQ ID
                </th>

                <th style={styles.th}>
                  RESIDENT NAME
                </th>

                <th style={styles.th}>
                  DOCUMENT TYPE
                </th>

                <th style={styles.th}>
                  DATE SUBMITTED
                </th>

                <th style={styles.th}>
                  STATUS
                </th>

                <th style={styles.th}>
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              <RequestRow
                id="REQ-0892"
                name="Maria Clara Los Santos"
                doc="Certificate of Residency"
                date="Oct 24, 09:15 AM"
                status="Pending"
              />

              <RequestRow
                id="REQ-0891"
                name="Juan Dela Cruz"
                doc="Certificate of Indigency"
                date="Oct 22, 14:30 PM"
                status="Urgent"
              />

              <RequestRow
                id="REQ-0890"
                name="Elena Ramos"
                doc="Business Permit"
                date="Oct 24, 08:45 AM"
                status="Pending"
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   REQUEST ROW
========================================================= */

function RequestRow({
  id,
  name,
  doc,
  date,
  status,
}) {
  return (
    <tr>
      <td style={styles.td}>{id}</td>

      <td style={styles.td}>
        <b>{name}</b>
      </td>

      <td style={styles.td}>{doc}</td>

      <td style={styles.td}>{date}</td>

      <td style={styles.td}>
        <span
          style={{
            ...styles.badge,
            ...(status === "Urgent"
              ? styles.redBadge
              : styles.blueBadge),
          }}
        >
          {status}
        </span>
      </td>

      <td style={styles.td}>
        <button
          style={{
            ...styles.button,
            padding: "7px 14px",
            fontSize: 12,
          }}
          onClick={() =>
            alert(`Review ${id}`)
          }
        >
          Review
        </button>
      </td>
    </tr>
  );
}

/* =========================================================
   CAPTAIN + SECRETARY ANNOUNCEMENTS
   THIS DESIGN IS NOT USED BY RESIDENT
========================================================= */

function Announcements({ openModal }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState("General");
  const [body, setBody] = useState("");

  const publish = () => {
    if (!title || !body) {
      alert(
        "Please complete the announcement."
      );
      return;
    }

    alert(
      "Announcement published successfully!"
    );

    setTitle("");
    setBody("");
  };

  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            Announcements
          </h1>

          <p style={styles.description}>
            Draft and publish official
            communications to barangay residents.
          </p>
        </div>

        <button
          style={styles.button}
          onClick={publish}
        >
          ▶ Publish Now
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0,2fr) minmax(250px,1fr)",
          gap: 20,
        }}
      >
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            New Public Announcement
          </h3>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Announcement Title
            </label>

            <input
              style={styles.input}
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Scheduled Power Interruption"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Category
            </label>

            <select
              style={styles.input}
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>General</option>
              <option>Emergency</option>
              <option>Community Event</option>
              <option>Maintenance</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Content
            </label>

            <textarea
              style={styles.textarea}
              value={body}
              onChange={(e) =>
                setBody(e.target.value)
              }
              placeholder="Enter the announcement details here..."
            />
          </div>

          <div style={styles.actionRow}>
            <button
              style={styles.secondaryButton}
              onClick={() =>
                alert("Draft saved.")
              }
            >
              Save as Draft
            </button>

            <button
              style={styles.button}
              onClick={publish}
            >
              ▶ Publish Now
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            Recent Activity
          </h3>

          <p>
            <b>Water Main Maintenance</b>
          </p>

          <small>
            Zone 3 East • 2 hrs ago
          </small>

          <hr />

          <p>
            <b>
              Monthly Town Hall Meeting
            </b>
          </p>

          <small>
            Tomorrow • 9:00 AM
          </small>

          <hr />

          <p>
            <b>
              Community Center Renovation
            </b>
          </p>

          <small>Draft</small>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   BLOTTER REPORTS
   CAPTAIN + SECRETARY ONLY
========================================================= */

function BlotterReports({ openModal }) {
  const reports = [
    [
      "BL-2023-0142",
      "Oct 24, 2023",
      "Maria Santos / Juan Dela Cruz",
      "Noise Complaint",
      "Pending Review",
    ],

    [
      "BL-2023-0141",
      "Oct 22, 2023",
      "Roberto Garcia / Unknown",
      "Property Damage",
      "Hearing Scheduled",
    ],

    [
      "BL-2023-0140",
      "Oct 20, 2023",
      "Elena Reyes / Carlos Mendoza",
      "Physical Injury",
      "Resolved",
    ],

    [
      "BL-2023-0139",
      "Oct 18, 2023",
      "Ana Lim / Neighbor",
      "Waste Disposal",
      "Hearing Scheduled",
    ],
  ];

  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            Blotter Reports
          </h1>

          <p style={styles.description}>
            Manage and track all filed incidents
            within the barangay jurisdiction.
          </p>
        </div>

        <button
          style={styles.button}
          onClick={() =>
            openModal("New Blotter Entry")
          }
        >
          + New Blotter Entry
        </button>
      </div>

      <div style={styles.section}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <select style={styles.input}>
            <option>All Statuses</option>
            <option>
              Pending Review
            </option>
            <option>Resolved</option>
            <option>
              Hearing Scheduled
            </option>
          </select>

          <select style={styles.input}>
            <option>All Types</option>
            <option>
              Noise Complaint
            </option>
            <option>
              Property Damage
            </option>
            <option>
              Physical Injury
            </option>
            <option>
              Waste Disposal
            </option>
          </select>

          <input
            type="date"
            style={styles.input}
          />
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  CASE ID
                </th>

                <th style={styles.th}>
                  DATE FILED
                </th>

                <th style={styles.th}>
                  COMPLAINANT / RESPONDENT
                </th>

                <th style={styles.th}>
                  INCIDENT TYPE
                </th>

                <th style={styles.th}>
                  STATUS
                </th>

                <th style={styles.th}>
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.map((r, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    {r[0]}
                  </td>

                  <td style={styles.td}>
                    {r[1]}
                  </td>

                  <td style={styles.td}>
                    {r[2]}
                  </td>

                  <td style={styles.td}>
                    {r[3]}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...(r[4] ===
                        "Resolved"
                          ? styles.greenBadge
                          : r[4] ===
                            "Pending Review"
                          ? styles.redBadge
                          : styles.blueBadge),
                      }}
                    >
                      {r[4]}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={{
                        ...styles.button,
                        padding:
                          "7px 12px",
                        fontSize: 12,
                      }}
                      onClick={() =>
                        alert(
                          `Opening case ${r[0]}`
                        )
                      }
                    >
                      View
                    </button>
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

/* =========================================================
   RESIDENT DASHBOARD
========================================================= */

function ResidentDashboard({
  setPage,
  openModal,
}) {
  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            Welcome back, Maria!
          </h1>

          <p style={styles.description}>
            Your resident dashboard is updated
            for today.
          </p>
        </div>

        <button
          style={styles.button}
          onClick={() =>
            setPage("My Requests")
          }
        >
          + Request Document
        </button>
      </div>

      {/* Quick Actions */}

      <h3 style={{ marginTop: 28 }}>
        Quick Actions
      </h3>

      <div style={styles.cardGrid}>
        <div
          style={{
            ...styles.card,
            ...styles.residentActionCard,
          }}
          onClick={() =>
            setPage("My Requests")
          }
        >
          <h3>📄</h3>

          <h3>Request Document</h3>

          <p>
            Request barangay certificates and
            other documents.
          </p>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.residentActionCard,
          }}
          onClick={() =>
            setPage("My Reports")
          }
        >
          <h3>⚠️</h3>

          <h3>File Blotter</h3>

          <p>
            Report an incident to the barangay.
          </p>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.residentActionCard,
          }}
          onClick={() =>
            setPage("Announcements")
          }
        >
          <h3>📢</h3>

          <h3>Announcements</h3>

          <p>
            View the latest community
            announcements.
          </p>
        </div>
      </div>

      {/* Active Requests */}

      <div style={styles.sectionHeader}>
        <h3>My Active Requests</h3>

        <button
          style={styles.linkButton}
          onClick={() =>
            setPage("My Requests")
          }
        >
          View All
        </button>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                TYPE
              </th>

              <th style={styles.th}>
                DATE FILED
              </th>

              <th style={styles.th}>
                STATUS
              </th>

              <th style={styles.th}>
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={styles.td}>
                Barangay Clearance
              </td>

              <td style={styles.td}>
                Oct 24, 2023
              </td>

              <td style={styles.td}>
                <span
                  style={styles.pending}
                >
                  Pending
                </span>
              </td>

              <td style={styles.td}>
                👁
              </td>
            </tr>

            <tr>
              <td style={styles.td}>
                Birth Certificate
              </td>

              <td style={styles.td}>
                Oct 20, 2023
              </td>

              <td style={styles.td}>
                <span
                  style={styles.approved}
                >
                  Approved
                </span>
              </td>

              <td style={styles.td}>
                👁
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Community Feed */}

      <div style={styles.sectionHeader}>
        <h3>Community Feed</h3>

        <button
          style={styles.linkButton}
          onClick={() =>
            setPage("Announcements")
          }
        >
          View All
        </button>
      </div>

      <div style={styles.feedCard}>
        <h4>📢 Barangay Assembly</h4>

        <p>
          Join us for the upcoming barangay
          assembly and community meeting.
        </p>

        <small>
          Today • 8:00 AM
        </small>
      </div>

      <div style={styles.feedCard}>
        <h4>
          💧 Water Interruption Advisory
        </h4>

        <p>
          Please be advised of a scheduled water
          service interruption.
        </p>

        <small>Tomorrow</small>
      </div>
    </>
  );
}

/* =========================================================
   RESIDENT ANNOUNCEMENTS
   RESIDENT ONLY
========================================================= */

function ResidentAnnouncement() {
  const announcements = [
    {
      category: "INFRASTRUCTURE",
      title:
        "Main Street Water Main Repair Schedule",
      description:
        "Emergency repairs on the main water line will begin tomorrow. Expect partial lane closures.",
      date: "Today • 8:00 AM",
    },

    {
      category: "PUBLIC HEALTH",
      title:
        "Annual Flu Vaccination Drive Begins Next Week",
      description:
        "The health center will provide free vaccination services to residents.",
      date: "Oct 12, 2023",
    },

    {
      category: "EVENTS",
      title: "Barangay Festival",
      description:
        "Join the community for the annual barangay festival.",
      date: "Oct 15 • 10 AM",
    },

    {
      category: "SERVICES",
      title:
        "Holiday Waste Collection Schedule",
      description:
        "Trash and recycling collection schedules will be adjusted during the holiday.",
      date: "Oct 20, 2023",
    },
  ];

  return (
    <>
      <h1 style={styles.heading}>
        Announcements
      </h1>

      <p style={styles.description}>
        Stay updated with the latest news,
        alerts, and events in your area.
      </p>

      <div style={styles.filterButtons}>
        <button
          style={styles.activeFilter}
        >
          All
        </button>

        <button
          style={styles.filterButton}
        >
          Public Health
        </button>

        <button
          style={styles.filterButton}
        >
          Infrastructure
        </button>

        <button
          style={styles.filterButton}
        >
          Events
        </button>
      </div>

      <div style={styles.announcementGrid}>
        {announcements.map(
          (item, index) => (
            <div
              style={styles.announcementCard}
              key={index}
            >
              <span
                style={
                  styles.announcementCategory
                }
              >
                {item.category}
              </span>

              <h2
                style={{
                  color: "#173b76",
                  fontSize: 19,
                  margin:
                    "5px 0 10px",
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>

              <small
                style={{
                  color: "#94a3b8",
                }}
              >
                {item.date}
              </small>
            </div>
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   RESIDENT MY REQUESTS
========================================================= */

function ResidentRequests() {
  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            My Requests
          </h1>

          <p style={styles.description}>
            View and track your submitted
            document requests.
          </p>
        </div>

        <button
          style={styles.button}
          onClick={() =>
            alert(
              "New document request opened."
            )
          }
        >
          + Request Document
        </button>
      </div>

      <div style={styles.cards}>
        <StatCard
          title="Total Requests"
          value="2"
          subtitle="Your submitted requests"
        />

        <StatCard
          title="Pending"
          value="1"
          subtitle="Waiting for processing"
        />

        <StatCard
          title="Approved"
          value="1"
          subtitle="Ready for release"
        />
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          My Document Requests
        </h3>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  REQUEST ID
                </th>

                <th style={styles.th}>
                  DOCUMENT
                </th>

                <th style={styles.th}>
                  DATE FILED
                </th>

                <th style={styles.th}>
                  STATUS
                </th>

                <th style={styles.th}>
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={styles.td}>
                  REQ-2023-045
                </td>

                <td style={styles.td}>
                  Barangay Clearance
                </td>

                <td style={styles.td}>
                  Oct 24, 2023
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      ...styles.yellowBadge,
                    }}
                  >
                    Pending
                  </span>
                </td>

                <td style={styles.td}>
                  <button
                    style={{
                      ...styles.secondaryButton,
                      padding:
                        "7px 12px",
                    }}
                    onClick={() =>
                      alert(
                        "Request details opened."
                      )
                    }
                  >
                    View
                  </button>
                </td>
              </tr>

              <tr>
                <td style={styles.td}>
                  REQ-2023-038
                </td>

                <td style={styles.td}>
                  Birth Certificate
                </td>

                <td style={styles.td}>
                  Oct 20, 2023
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      ...styles.greenBadge,
                    }}
                  >
                    Approved
                  </span>
                </td>

                <td style={styles.td}>
                  <button
                    style={{
                      ...styles.secondaryButton,
                      padding:
                        "7px 12px",
                    }}
                    onClick={() =>
                      alert(
                        "Request details opened."
                      )
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   RESIDENT MY REPORTS
========================================================= */

function ResidentReports() {
  return (
    <>
      <div style={styles.headingRow}>
        <div>
          <h1 style={styles.heading}>
            My Reports
          </h1>

          <p style={styles.description}>
            File and track incidents that you
            reported to the barangay.
          </p>
        </div>

        <button
          style={styles.button}
          onClick={() =>
            alert(
              "New blotter report form opened."
            )
          }
        >
          + File Blotter
        </button>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          My Filed Reports
        </h3>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  CASE ID
                </th>

                <th style={styles.th}>
                  DATE FILED
                </th>

                <th style={styles.th}>
                  INCIDENT
                </th>

                <th style={styles.th}>
                  STATUS
                </th>

                <th style={styles.th}>
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={styles.td}>
                  MY-BL-001
                </td>

                <td style={styles.td}>
                  Oct 24, 2023
                </td>

                <td style={styles.td}>
                  Noise Complaint
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      ...styles.blueBadge,
                    }}
                  >
                    Under Review
                  </span>
                </td>

                <td style={styles.td}>
                  <button
                    style={{
                      ...styles.secondaryButton,
                      padding:
                        "7px 12px",
                    }}
                    onClick={() =>
                      alert(
                        "Report details opened."
                      )
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SIMPLE PAGE
========================================================= */

function SimplePage({ title }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        {title}
      </h2>

      <p style={styles.description}>
        This section is ready for your barangay
        management functions.
      </p>

      <button
        style={styles.button}
        onClick={() =>
          alert(
            `${title} opened successfully.`
          )
        }
      >
        Open {title}
      </button>
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({ title, close }) {
  const [name, setName] = useState("");
  const [details, setDetails] =
    useState("");

  return (
    <div style={styles.modalBg}>
      <div style={styles.modal}>
        <h2 style={{ marginTop: 0 }}>
          {title}
        </h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Name / Subject
          </label>

          <input
            style={styles.input}
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter information"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Details
          </label>

          <textarea
            style={styles.textarea}
            value={details}
            onChange={(e) =>
              setDetails(e.target.value)
            }
            placeholder="Enter details..."
          />
        </div>

        <div style={styles.actionRow}>
          <button
            style={styles.secondaryButton}
            onClick={close}
          >
            Cancel
          </button>

          <button
            style={styles.button}
            onClick={() => {
              alert(
                `${title} saved successfully!`
              );
              close();
            }}
          >
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] =
    useState("Dashboard");
  const [modal, setModal] =
    useState(null);

  /* =====================================================
     ROLE PERMISSIONS
  ===================================================== */

  const permissions = {
    Resident: [
      "Dashboard",
      "My Requests",
      "Announcements",
      "My Reports",
    ],

    Captain: [
      "Dashboard",
      "Document Requests",
      "Announcements",
      "Blotter Reports",
    ],

    Secretary: [
      "Dashboard",
      "Document Requests",
      "Announcements",
      "Blotter Reports",
    ],
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const login = (role, email) => {
    setUser({
      role,
      email,
    });

    setPage("Dashboard");
    setModal(null);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    setUser(null);
    setPage("Dashboard");
    setModal(null);
  };

  /* =====================================================
     PERMISSION-CHECKED PAGE NAVIGATION

     This prevents one role from manually trying to
     navigate to another role's page.
  ===================================================== */

  const changePage = (requestedPage) => {
    if (!user) {
      return;
    }

    const allowedPages =
      permissions[user.role] || [];

    if (
      allowedPages.includes(requestedPage)
    ) {
      setPage(requestedPage);
      setModal(null);
    } else {
      alert(
        `Access denied. ${user.role} does not have permission to open "${requestedPage}".`
      );
    }
  };

  /* =====================================================
     MODAL PERMISSION

     Only Captain and Secretary can use admin modals.
  ===================================================== */

  const openModal = (title) => {
    if (
      !user ||
      !["Captain", "Secretary"].includes(
        user.role
      )
    ) {
      alert(
        "Access denied. This function is only available to Captain or Secretary."
      );
      return;
    }

    setModal(title);
  };

  const closeModal = () => {
    setModal(null);
  };

  /* =====================================================
     LOGIN SCREEN
  ===================================================== */

  if (!user) {
    return <Login onLogin={login} />;
  }

  /* =====================================================
     EXTRA SECURITY CHECK

     If the current page is not allowed for the
     logged-in role, automatically return to Dashboard.
  ===================================================== */

  const allowedPages =
    permissions[user.role] || [];

  if (!allowedPages.includes(page)) {
    setPage("Dashboard");

    return null;
  }

  /* =====================================================
     PAGE CONTENT
  ===================================================== */

  let content;

  /* ================= DASHBOARD ================= */

  if (page === "Dashboard") {
    if (user.role === "Captain") {
      content = (
        <CaptainDashboard
          setPage={changePage}
          openModal={openModal}
        />
      );
    } else if (
      user.role === "Secretary"
    ) {
      content = (
        <SecretaryDashboard
          setPage={changePage}
          openModal={openModal}
        />
      );
    } else {
      content = (
        <ResidentDashboard
          setPage={changePage}
          openModal={openModal}
        />
      );
    }
  }

  /* ============ DOCUMENT REQUESTS ============ */

  else if (
    page === "Document Requests"
  ) {
    if (
      user.role === "Captain" ||
      user.role === "Secretary"
    ) {
      content = (
        <DocumentRequests
          openModal={openModal}
        />
      );
    } else {
      content = (
        <AccessDenied
          role={user.role}
          page="Document Requests"
        />
      );
    }
  }

  /* ================ ANNOUNCEMENTS ================ */

  else if (page === "Announcements") {
    /*
      IMPORTANT:

      Resident:
        ResidentAnnouncement

      Captain:
        Original Announcements

      Secretary:
        Original Announcements
    */

    if (user.role === "Resident") {
      content = <ResidentAnnouncement />;
    } else {
      content = (
        <Announcements
          openModal={openModal}
        />
      );
    }
  }

  /* ============== BLOTTER REPORTS ============== */

  else if (
    page === "Blotter Reports"
  ) {
    if (
      user.role === "Captain" ||
      user.role === "Secretary"
    ) {
      content = (
        <BlotterReports
          openModal={openModal}
        />
      );
    } else {
      content = (
        <AccessDenied
          role={user.role}
          page="Blotter Reports"
        />
      );
    }
  }

  /* ================ MY REQUESTS ================ */

  else if (page === "My Requests") {
    if (user.role === "Resident") {
      content = <ResidentRequests />;
    } else {
      content = (
        <AccessDenied
          role={user.role}
          page="My Requests"
        />
      );
    }
  }

  /* ================= MY REPORTS ================= */

  else if (page === "My Reports") {
    if (user.role === "Resident") {
      content = <ResidentReports />;
    } else {
      content = (
        <AccessDenied
          role={user.role}
          page="My Reports"
        />
      );
    }
  }

  /* ================= OTHER ================= */

  else {
    content = (
      <SimplePage title={page} />
    );
  }

  /* =====================================================
     FINAL UI
  ===================================================== */

  return (
    <div style={styles.app}>
      <div style={styles.layout}>
        <Sidebar
          role={user.role}
          page={page}
          setPage={changePage}
          logout={logout}
        />

        <main style={styles.main}>
          <Topbar role={user.role} />

          <div style={styles.content}>
            {content}
          </div>
        </main>
      </div>

      {modal && (
        <Modal
          title={modal}
          close={closeModal}
        />
      )}
    </div>
  );
}

/* =========================================================
   ACCESS DENIED
========================================================= */

function AccessDenied({
  role,
  page,
}) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        Access Denied
      </h2>

      <p style={styles.description}>
        The <b>{role}</b> role does not have
        permission to access{" "}
        <b>{page}</b>.
      </p>
    </div>
  );
}

export default App;
