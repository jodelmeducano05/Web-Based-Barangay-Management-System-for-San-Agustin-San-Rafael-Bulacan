import React, { useState } from "react";
import barangayLogo from "./barangay-logo.jpg";

const BARANGAY = "SAN AGUSTIN, SAN RAFAEL, BULACAN";

const COLORS = {
  primary: "#213359",
  secondary: "#4ADE80",
  lightGreen: "#DCFCE7",
  darkGreen: "#166534",
  white: "#FFFFFF",
  gray: "#F3F4F6",
  dark: "#1F2937",
  red: "#DC2626",
  yellow: "#F59E0B",
};

const INITIAL_USERS = [
  {
    email: "resident@gmail.com",
    password: "res123",
    role: "Resident",
  },
  {
    email: "captain@gmail.com",
    password: "cap123",
    role: "Captain",
  },
  {
    email: "secretary@gmail.com",
    password: "sec123",
    role: "Secretary",
  },
];

const INITIAL_DOCUMENTS = [
  {
    id: "DOC-001",
    resident: "Juan Dela Cruz",
    type: "Barangay Clearance",
    date: "September 14, 2026",
    status: "Pending",
    verifiedBy: "",
    approvedBy: "",
  },
  {
    id: "DOC-002",
    resident: "Maria Santos",
    type: "Certificate of Residency",
    date: "September 13, 2026",
    status: "Approved",
    verifiedBy: "Barangay Secretary",
    approvedBy: "Punong Barangay / Captain",
  },
  {
    id: "DOC-003",
    resident: "Pedro Reyes",
    type: "Certificate of Indigency",
    date: "September 12, 2026",
    status: "For Captain Approval",
    verifiedBy: "Barangay Secretary",
    approvedBy: "",
  },
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Barangay Clean-Up Drive",
    message:
      "All residents are invited to participate in the barangay clean-up drive this coming Saturday.",
    date: "September 15, 2026",
  },
  {
    id: 2,
    title: "Barangay Assembly",
    message:
      "The monthly barangay assembly will be held at the Barangay Hall.",
    date: "September 12, 2026",
  },
];

const INITIAL_BLOTTERS = [
  {
    id: "BLT-001",
    complainant: "Juan Dela Cruz",
    respondent: "Pedro Reyes",
    incident: "Noise disturbance",
    date: "September 10, 2026",
    status: "Pending",
  },
  {
    id: "BLT-002",
    complainant: "Maria Santos",
    respondent: "Unknown",
    incident: "Property dispute",
    date: "September 8, 2026",
    status: "Under Review",
  },
];

function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [user, setUser] = useState(null);
  const [stage, setStage] = useState("login");
  const [selectedModule, setSelectedModule] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");
  const [toast, setToast] = useState("");

  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [announcements, setAnnouncements] = useState(
    INITIAL_ANNOUNCEMENTS
  );
  const [blotters, setBlotters] = useState(INITIAL_BLOTTERS);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleLogin = (email, password) => {
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!foundUser) {
      showToast("Invalid email or password.");
      return;
    }

    setUser(foundUser);
    setStage("modules");
    showToast(`Welcome, ${foundUser.role}!`);
  };

  const handleGoogleLogin = () => {
    const googleUser = {
      email: "googleuser@gmail.com",
      password: "",
      role: "Resident",
    };

    const exists = users.some(
      (u) => u.email === googleUser.email
    );

    if (!exists) {
      setUsers((prev) => [...prev, googleUser]);
    }

    setUser(googleUser);
    setStage("modules");
    showToast("Logged in as Resident.");
  };

  const handleSignup = (email, password, role) => {
    if (!email || !password || !role) {
      showToast("Please complete all fields.");
      return;
    }

    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      showToast("Email already registered.");
      return;
    }

    const newUser = {
      email,
      password,
      role,
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setStage("modules");
    showToast("Account created successfully.");
  };

  const logout = () => {
    setUser(null);
    setSelectedModule("");
    setActivePage("Dashboard");
    setStage("login");
    showToast("Logged out successfully.");
  };

  const selectModule = (moduleName) => {
    const moduleRole = moduleName.replace(" Dashboard", "");

    if (user.role !== moduleRole) {
      showToast(
        `This module is only available for ${moduleRole}.`
      );
      return;
    }

    setSelectedModule(moduleName);
    setActivePage("Dashboard");
    setStage("app");
  };

  if (stage === "login") {
    return (
      <>
        <Login
          onLogin={handleLogin}
          onGoogleLogin={handleGoogleLogin}
          onSignup={handleSignup}
          showToast={showToast}
        />

        {toast && <Toast message={toast} />}
      </>
    );
  }

  if (stage === "modules") {
    return (
      <>
        <DashboardModules
          user={user}
          onSelectModule={selectModule}
          onLogout={logout}
        />

        {toast && <Toast message={toast} />}
      </>
    );
  }

  return (
    <>
      <DashboardLayout
        user={user}
        selectedModule={selectedModule}
        activePage={activePage}
        setActivePage={setActivePage}
        logout={logout}
        documents={documents}
        setDocuments={setDocuments}
        announcements={announcements}
        setAnnouncements={setAnnouncements}
        blotters={blotters}
        setBlotters={setBlotters}
        showToast={showToast}
      />

      {toast && <Toast message={toast} />}
    </>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login({
  onLogin,
  onGoogleLogin,
  onSignup,
  showToast,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("Resident");

  const [forgotEmail, setForgotEmail] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const submitSignup = (e) => {
    e.preventDefault();

    onSignup(
      signupEmail,
      signupPassword,
      signupRole
    );

    setShowSignup(false);
  };

  const submitForgot = (e) => {
    e.preventDefault();

    if (!forgotEmail) {
      showToast("Please enter your email.");
      return;
    }

    showToast(
      "Password reset instructions have been sent."
    );

    setForgotEmail("");
    setShowForgot(false);
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <div style={styles.loginLogoContainer}>
          <img
            src={barangayLogo}
            alt="Barangay Logo"
            style={styles.loginLogo}
          />
        </div>

        <h1 style={styles.loginTitle}>
          Barangay Management System
        </h1>

        <p style={styles.loginSubtitle}>
          {BARANGAY}
        </p>

        <form onSubmit={submitLogin}>
          <label style={styles.label}>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.loginButton}
          >
            Login
          </button>
        </form>

        <button
          onClick={onGoogleLogin}
          style={styles.googleButton}
        >
          <span style={{ fontSize: 18 }}>G</span>
          Continue with Google
        </button>

        <div style={styles.loginLinks}>
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
            Create Account
          </button>
        </div>

        <div style={styles.demoBox}>
          <strong>Demo Accounts</strong>

          <div>Resident: resident@gmail.com / res123</div>
          <div>Captain: captain@gmail.com / cap123</div>
          <div>
            Secretary: secretary@gmail.com / sec123
          </div>
        </div>
      </div>

      {showSignup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Create Account</h2>

            <form onSubmit={submitSignup}>
              <label style={styles.label}>Email</label>

              <input
                type="email"
                value={signupEmail}
                onChange={(e) =>
                  setSignupEmail(e.target.value)
                }
                placeholder="Email"
                style={styles.input}
                required
              />

              <label style={styles.label}>Password</label>

              <input
                type="password"
                value={signupPassword}
                onChange={(e) =>
                  setSignupPassword(e.target.value)
                }
                placeholder="Password"
                style={styles.input}
                required
              />

              <label style={styles.label}>Role</label>

              <select
                value={signupRole}
                onChange={(e) =>
                  setSignupRole(e.target.value)
                }
                style={styles.input}
              >
                <option value="Resident">Resident</option>
                <option value="Captain">Captain</option>
                <option value="Secretary">Secretary</option>
              </select>

              <button
                type="submit"
                style={styles.loginButton}
              >
                Create Account
              </button>
            </form>

            <button
              style={styles.closeButton}
              onClick={() => setShowSignup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showForgot && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Forgot Password</h2>

            <p style={styles.modalText}>
              Enter your registered email to receive
              password reset instructions.
            </p>

            <form onSubmit={submitForgot}>
              <label style={styles.label}>Email</label>

              <input
                type="email"
                value={forgotEmail}
                onChange={(e) =>
                  setForgotEmail(e.target.value)
                }
                placeholder="Enter your email"
                style={styles.input}
                required
              />

              <button
                type="submit"
                style={styles.loginButton}
              >
                Send Reset Link
              </button>
            </form>

            <button
              style={styles.closeButton}
              onClick={() => setShowForgot(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MODULE SELECTION
========================================================= */

function DashboardModules({
  user,
  onSelectModule,
  onLogout,
}) {
  const modules = [
    {
      name: "Resident Dashboard",
      role: "Resident",
      icon: "👤",
      description:
        "Access your requests, documents, announcements and reports.",
    },
    {
      name: "Captain Dashboard",
      role: "Captain",
      icon: "🏛️",
      description:
        "Manage approvals, barangay documents and reports.",
    },
    {
      name: "Secretary Dashboard",
      role: "Secretary",
      icon: "📋",
      description:
        "Verify documents, manage announcements and records.",
    },
  ];

  return (
    <div style={styles.modulesPage}>
      <div style={styles.modulesHeader}>
        <div style={styles.modulesLogoArea}>
          <img
            src={barangayLogo}
            alt="Barangay Logo"
            style={styles.modulesLogo}
          />

          <div>
            <h1 style={styles.modulesTitle}>
              Barangay Management System
            </h1>

            <p style={styles.modulesSubtitle}>
              {BARANGAY}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={styles.moduleLogout}
        >
          🚪 Logout
        </button>
      </div>

      <div style={styles.welcomeBox}>
        <h2>
          Welcome, {user.role}
        </h2>

        <p>
          Select your dashboard module to continue.
        </p>
      </div>

      <div style={styles.moduleGrid}>
        {modules.map((module) => {
          const allowed = user.role === module.role;

          return (
            <div
              key={module.name}
              style={{
                ...styles.moduleCard,
                opacity: allowed ? 1 : 0.5,
                cursor: allowed
                  ? "pointer"
                  : "not-allowed",
              }}
              onClick={() =>
                allowed &&
                onSelectModule(module.name)
              }
            >
              <div style={styles.moduleIcon}>
                {module.icon}
              </div>

              <h2 style={styles.moduleName}>
                {module.name}
              </h2>

              <p style={styles.moduleDescription}>
                {module.description}
              </p>

              <div
                style={{
                  ...styles.moduleStatus,
                  background: allowed
                    ? COLORS.lightGreen
                    : "#E5E7EB",
                  color: allowed
                    ? COLORS.darkGreen
                    : "#6B7280",
                }}
              >
                {allowed
                  ? "Available"
                  : "Restricted"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN DASHBOARD LAYOUT
========================================================= */

function DashboardLayout({
  user,
  selectedModule,
  activePage,
  setActivePage,
  logout,
  documents,
  setDocuments,
  announcements,
  setAnnouncements,
  blotters,
  setBlotters,
  showToast,
}) {
  const role = selectedModule.replace(
    " Dashboard",
    ""
  );

  const menuItems = [
    {
      name: "Dashboard",
      icon: "🏠",
    },
    {
      name: "Documents",
      icon: "📄",
    },
    {
      name: "Announcements",
      icon: "📢",
    },
    {
      name: "Blotter Reports",
      icon: "📑",
    },
  ];

  return (
    <div style={styles.appLayout}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <img
            src={barangayLogo}
            alt="Barangay Logo"
            style={styles.sidebarLogo}
          />

          <div>
            <h2 style={styles.sidebarTitle}>
              Brgy. San Agustin
            </h2>

            <p style={styles.sidebarSubtitle}>
              San Rafael, Bulacan
            </p>
          </div>
        </div>

        <div style={styles.roleBadge}>
          {role}
        </div>

        <nav style={styles.sidebarNav}>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                setActivePage(item.name)
              }
              style={{
                ...styles.sidebarButton,
                ...(activePage === item.name
                  ? styles.sidebarButtonActive
                  : {}),
              }}
            >
              <span style={styles.menuIcon}>
                {item.icon}
              </span>

              {item.name}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarBottom}>
          <button
            style={styles.sidebarLogout}
            onClick={logout}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.topHeader}>
          <div>
            <h1 style={styles.pageTitle}>
              {activePage}
            </h1>

            <p style={styles.pageSubtitle}>
              {BARANGAY}
            </p>
          </div>

          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              {user.role.charAt(0)}
            </div>

            <div>
              <strong>{user.role}</strong>
              <div style={styles.userEmail}>
                {user.email}
              </div>
            </div>
          </div>
        </header>

        <div style={styles.contentArea}>
          {activePage === "Dashboard" && (
            <DashboardHome
              user={user}
              documents={documents}
              blotters={blotters}
              announcements={announcements}
            />
          )}

          {activePage === "Documents" && (
            <DocumentsPage
              user={user}
              documents={documents}
              setDocuments={setDocuments}
              showToast={showToast}
            />
          )}

          {activePage === "Announcements" && (
            <AnnouncementsPage
              user={user}
              announcements={announcements}
              setAnnouncements={setAnnouncements}
              showToast={showToast}
            />
          )}

          {activePage === "Blotter Reports" && (
            <BlotterReportsPage
              user={user}
              blotters={blotters}
              setBlotters={setBlotters}
              showToast={showToast}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   DASHBOARD HOME
========================================================= */

function Dashboard run
