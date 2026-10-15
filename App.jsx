import React, { useState } from "react";
import barangayLogo from "./barangay-logo.jpg";

const BARANGAY = "SAN AGUSTIN, SAN RAFAEL, BULACAN";
const COLORS = { primary: "#213359", secondary: "#4ADE80" };
const INITIAL_USERS = [
  { email: "resident@gmail.com", password: "res123", role: "Resident", name: "Resident" },
  { email: "captain@gmail.com", password: "cap123", role: "Captain", name: "Captain" },
  { email: "secretary@gmail.com", password: "sec123", role: "Secretary", name: "Secretary" },
];
const INITIAL_DOCUMENTS = [
  { id: "DOC-001", resident: "Juan Dela Cruz", type: "Barangay Clearance", date: "September 14, 2026", status: "Pending" },
  { id: "DOC-002", resident: "Maria Santos", type: "Certificate of Residency", date: "September 13, 2026", status: "Verified" },
  { id: "DOC-003", resident: "Pedro Reyes", type: "Certificate of Indigency", date: "September 12, 2026", status: "Approved" },
];
const INITIAL_BLOTTERS = [
  { id: "BR-0012", complainant: "Juan Dela Cruz", incident: "Noise Complaint", date: "September 14, 2026", status: "Pending" },
  { id: "BR-0011", complainant: "Maria Santos", incident: "Dispute", date: "September 13, 2026", status: "Under Review" },
  { id: "BR-0010", complainant: "Pedro Reyes", incident: "Property Concern", date: "September 12, 2026", status: "Resolved" },
];
const INITIAL_ANNOUNCEMENTS = [
  { id: 1, title: "Barangay General Assembly", date: "September 20, 2026", description: "All residents are invited to attend the barangay general assembly at Brgy Hall of SAN AGUSTIN." },
  { id: 2, title: "Clean-up Drive", date: "September 22, 2026", description: "Community clean-up drive will be held at the covered court of SAN AGUSTIN." },
  { id: 3, title: "Health Check-up", date: "September 25, 2026", description: "Free medical check-up for residents of SAN AGUSTIN." },
];
const today = () => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const nextId = (items, prefix, digits) => `${prefix}${String(Math.max(0, ...items.map(x => Number(String(x.id).replace(prefix, "")) || 0)) + 1).padStart(digits, "0")}`;

export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Dashboard");
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [blotters, setBlotters] = useState(INITIAL_BLOTTERS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [toast, setToast] = useState("");
  const notify = message => { setToast(message); };
  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!found) return notify("Mali ang email o password!");
    setUser(found);
    setPage("Dashboard");
    notify(`Welcome ${found.role}!`);
  };
  const demoGoogleLogin = () => {
    setUser({ email: "demo.resident@gmail.com", name: "Google Demo Resident", role: "Resident" });
    setPage("Dashboard");
    notify("Welcome Resident! Demo Google login successful.");
  };
  const logout = () => { setUser(null); setPage("Dashboard"); setToast(""); };
  return (
    <div style={styles.root}>
      {toast && <div style={styles.toast} role="status">{toast}<button style={styles.toastClose} onClick={() => setToast("")}>×</button></div>}
      {!user ? <Login login={login} demoGoogleLogin={demoGoogleLogin} users={users} setUsers={setUsers} notify={notify} /> : (
        <Layout user={user} page={page} setPage={setPage} logout={logout}>
          {page === "Dashboard" && <Dashboard user={user} setPage={setPage} documents={documents} blotters={blotters} announcements={announcements} />}
          {page === "Documents" && <Documents role={user.role} documents={documents} setDocuments={setDocuments} notify={notify} />}
          {page === "Blotter Reports" && <Blotters role={user.role} blotters={blotters} setBlotters={setBlotters} notify={notify} />}
          {page === "Announcements" && <Announcements role={user.role} announcements={announcements} setAnnouncements={setAnnouncements} notify={notify} />}
        </Layout>
      )}
    </div>
  );
}

function Login({ login, demoGoogleLogin, users, setUsers, notify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);
  const [modal, setModal] = useState("");
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [resetEmail, setResetEmail] = useState("");
  const register = e => {
    e.preventDefault();
    if (!signup.name.trim() || !signup.email.trim() || !signup.password) return notify("Kumpletuhin ang form.");
    if (users.some(u => u.email.toLowerCase() === signup.email.trim().toLowerCase())) return notify("May account na sa email na yan.");
    setUsers(prev => [...prev, { ...signup, email: signup.email.trim(), role: "Resident" }]);
    setEmail(signup.email.trim());
    setSignup({ name: "", email: "", password: "" });
    setModal("");
    notify("Resident account created! Maaari ka nang mag-login.");
  };
  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <img src={barangayLogo} alt="Barangay Logo" style={styles.loginLogo} />
        <h1 style={{ color: COLORS.primary, fontSize: 24 }}>Barangay Management System</h1>
        <p style={{ color: COLORS.primary, fontWeight: 700, fontSize: 12 }}>{BARANGAY}</p>
        <form onSubmit={e => { e.preventDefault(); login(email, password); }}>
          <label style={styles.label}>Email Address</label>
          <input style={styles.input} type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={styles.label}>Password</label>
          <div style={styles.passwordWrap}>
            <input style={{ ...styles.input, marginBottom: 0, paddingRight: 55 }} type={visible ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="button" style={styles.eye} onClick={() => setVisible(v => !v)}>{visible ? "🙈" : "👁️"}</button>
