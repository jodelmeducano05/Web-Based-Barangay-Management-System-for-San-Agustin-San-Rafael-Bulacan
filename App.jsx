import React, { useState } from "react";
import barangayLogo from "./barangay-logo.jpg";
import "./responsive.css";
const BARANGAY = "SAN AGUSTIN, SAN RAFAEL, BULACAN";
const COLORS = { primary: "#213359", secondary: "#4ADE80" };
const INITIAL_USERS = [
  { email: "resident@gmail.com", password: "res123", role: "Resident", name: "Resident" },
  { email: "captain@gmail.com", password: "cap123", role: "Captain", name: "Captain" },
  { email: "secretary@gmail.com", password: "sec123", role: "Secretary", name: "Secretary" },
  { email: "developer@demo.local", password: "devdemo123", role: "Developer", name: "Demo Developer" },
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
  const [users, setUsers] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem("barangay_demo_users_v2")); return Array.isArray(saved) ? saved : INITIAL_USERS; }
    catch { return INITIAL_USERS; }
  });
  React.useEffect(() => { localStorage.setItem("barangay_demo_users_v2", JSON.stringify(users)); }, [users]);
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
    if (found.status === "Pending") return notify("Pending Developer Approval. Hindi pa puwedeng mag-login.");
    if (found.status === "Rejected") return notify("Rejected ang account request. Makipag-ugnayan sa developer.");
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
          {user.role === "Developer" ? <DeveloperDashboard users={users} setUsers={setUsers} notify={notify} /> : <>
          {page === "Dashboard" && <Dashboard user={user} setPage={setPage} documents={documents} blotters={blotters} announcements={announcements} />}
          {page === "Documents" && <Documents role={user.role} documents={documents} setDocuments={setDocuments} notify={notify} />}
          {page === "Blotter Reports" && <Blotters role={user.role} blotters={blotters} setBlotters={setBlotters} notify={notify} />}
          {page === "Announcements" && <Announcements role={user.role} announcements={announcements} setAnnouncements={setAnnouncements} notify={notify} />}
          </>}
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
  const [signup, setSignup] = useState({ name: "", email: "", password: "", role: "Resident" });
  const [resetEmail, setResetEmail] = useState("");
  const register = e => {
    e.preventDefault();
    if (!signup.name.trim() || !signup.email.trim() || !signup.password) return notify("Kumpletuhin ang form.");
    if (users.some(u => u.email.toLowerCase() === signup.email.trim().toLowerCase())) return notify("May account na sa email na yan.");
    const status = signup.role === "Resident" ? "Approved" : "Pending";
    setUsers(prev => [...prev, { ...signup, email: signup.email.trim(), status }]);
    setEmail(signup.email.trim());
    setSignup({ name: "", email: "", password: "", role: "Resident" });
    setModal("");
    notify(status === "Pending" ? "Request submitted! Hintayin ang Developer Approval." : "Resident account created! Maaari ka nang mag-login.");
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
          </div>
          <div style={{ textAlign: "right", margin: "12px 0 18px" }}><button type="button" style={styles.link} onClick={() => setModal("forgot")}>Forgot Password?</button></div>
          <button style={{ ...styles.primary, width: "100%", background: COLORS.primary, color: "white" }} type="submit">Login</button>
        </form>
        <p style={{ color: "#64748b", margin: "20px 0" }}>OR</p>
        <button style={{ ...styles.secondary, width: "100%" }} type="button" onClick={demoGoogleLogin}>🌐 Continue as Resident (Google)</button>
        <p style={{ fontSize: 13, marginTop: 22 }}>Don't have an account? <button style={styles.link} onClick={() => setModal("signup")}>Sign Up</button></p>
      </div>
      {modal === "signup" && <Modal title={`Create Account - ${BARANGAY}`} close={() => setModal("")}>
        <form onSubmit={register}>
          <input style={styles.input} placeholder="Full Name" value={signup.name} onChange={e => setSignup({ ...signup, name: e.target.value })} required />
          <input style={styles.input} type="email" placeholder="Email" value={signup.email} onChange={e => setSignup({ ...signup, email: e.target.value })} required />
          <div style={{ ...styles.passwordWrap, marginBottom: 14 }}><input style={{ ...styles.input, marginBottom: 0, paddingRight: 55 }} type={signupPasswordVisible ? "text" : "password"} placeholder="Password" value={signup.password} onChange={e => setSignup({ ...signup, password: e.target.value })} required /><button type="button" style={styles.eye} onClick={() => setSignupPasswordVisible(v => !v)} aria-label={signupPasswordVisible ? "Hide password" : "Show password"}>{signupPasswordVisible ? "🙈" : "👁️"}</button></div>
          <label style={styles.label}>Account Role</label>
          <select style={styles.input} value={signup.role} onChange={e => setSignup({ ...signup, role: e.target.value })}>
            <option value="Resident">Resident</option><option value="Secretary">Secretary</option><option value="Captain">Captain</option>
          </select>
          <p style={{ fontSize: 12, color: "#64748b" }}>{signup.role === "Resident" ? "Resident accounts can log in immediately." : "Requires System Developer approval before login."}</p>
          <div style={styles.actions}><button style={styles.primary} type="submit">Create Account</button><button style={styles.secondary} type="button" onClick={() => setModal("")}>Cancel</button></div>
        </form>
      </Modal>}
      {modal === "forgot" && <Modal title="Reset Password" close={() => setModal("")}>
        <p style={{ color: "#64748b", fontSize: 13 }}>Password reset emails require a backend email service. This demo does not send reset links.</p>
        <input style={styles.input} type="email" placeholder="your@email.com" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
        <div style={styles.actions}><button style={styles.secondary} onClick={() => setModal("")}>Close</button></div>
      </Modal>}
    </div>
  );
}

function Layout({ user, page, setPage, logout, children }) {
  const menu = user.role === "Developer" ? [{ name: "Dashboard", icon: "🏠" }] : [{ name: "Dashboard", icon: "🏠" }, { name: "Documents", icon: "📄" }, { name: "Announcements", icon: "📢" }, { name: "Blotter Reports", icon: "📋" }];
  return <div style={styles.layout}>
    <aside style={styles.sidebar}>
      <div style={styles.brand}><img src={barangayLogo} alt="Barangay Logo" style={styles.sidebarLogo} /><div><strong>SAN AGUSTIN</strong><p style={{ fontSize: 10, color: COLORS.secondary, margin: "4px 0" }}>{BARANGAY}</p></div></div>
      <div style={styles.roleBox}><small style={{ color: COLORS.secondary }}>Current Module</small><strong>{user.role} Dashboard</strong><span style={styles.rolePill}>{user.role}</span></div>
      <p style={{ color: COLORS.secondary, fontSize: 11, paddingLeft: 12 }}>MAIN MENU</p>
      <nav>{menu.map(m => <button key={m.name} style={{ ...styles.navButton, ...(page === m.name ? styles.navActive : {}) }} onClick={() => setPage(m.name)}>{m.icon}　{m.name}</button>)}</nav>
      <div style={{ marginTop: "auto", paddingTop: 25 }}><button style={styles.logout} onClick={logout}>Logout</button></div>
    </aside>
    <main style={styles.main}>
      <header style={styles.topbar}><div><small style={{ color: "#64748b" }}>Home / {page} / {BARANGAY}</small><h1 style={{ color: COLORS.primary, fontSize: 23, margin: "7px 0 0" }}>{page}</h1></div><div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={styles.avatar}>{user.role.charAt(0)}</span><div><strong>{user.role}</strong><div style={{ color: "#64748b", fontSize: 12 }}>{user.email}</div></div></div></header>
      <div style={styles.content}>{children}</div>
    </main>
  </div>;
}

function DeveloperDashboard({ users, setUsers, notify }) {
  const requests = users.filter(u => ["Captain", "Secretary"].includes(u.role) && u.status === "Pending");
  const update = (email, status) => {
    setUsers(prev => prev.map(u => u.email === email ? { ...u, status } : u));
    notify(`Account ${status.toLowerCase()}: ${email}`);
  };
  return <section style={styles.card}>
    <h2>Developer Approval Dashboard (Demo)</h2>
    <p>Captain and Secretary registration requests awaiting approval.</p>
    {requests.length === 0 ? <p>No pending account requests.</p> : requests.map(u =>
      <div key={u.email} style={{ padding: 14, borderBottom: "1px solid #ddd" }}>
        <strong>{u.name}</strong> — {u.role}<p>{u.email}</p>
        <div style={styles.actions}>
          <button style={styles.primary} onClick={() => update(u.email, "Approved")}>Approve</button>
          <button style={styles.delete} onClick={() => update(u.email, "Rejected")}>Reject</button>
        </div>
      </div>)}
    <p style={{ fontSize: 12 }}>Demo only: account data and approval are stored in this browser, not a secure server.</p>
  </section>;
}

function Dashboard({ user, setPage, documents, blotters, announcements }) {
  const stats = [
    { label: "Document Requests", value: documents.length, icon: "📄", page: "Documents" },
    { label: "Pending Verification", value: documents.filter(d => d.status === "Pending").length, icon: "⏳", page: "Documents" },
    { label: "For Captain Approval", value: documents.filter(d => d.status === "Verified").length, icon: "✅", page: "Documents" },
    { label: "Blotter Reports", value: blotters.length, icon: "📋", page: "Blotter Reports" },
  ];
  return <>
    <div style={styles.welcome}><div><h2>Welcome, {user.role}!</h2><p>{user.role === "Captain" ? "Review and approve requests and reports." : user.role === "Secretary" ? "Verify documents and process blotter reports." : "Request documents and track report status."}<br />You are using <strong>{user.role} Dashboard</strong>.</p></div><span>📅 {today()}</span></div>
    <div style={styles.stats}>{stats.map(s => <button key={s.label} style={styles.stat} onClick={() => setPage(s.page)}><span style={{ fontSize: 30 }}>{s.icon}</span><span><small>{s.label}</small><strong style={{ display: "block", fontSize: 27, color: COLORS.primary }}>{s.value}</strong></span></button>)}</div>
    <div style={styles.twoColumns}><section style={styles.card}><h2>Quick Actions - {BARANGAY}</h2><div style={styles.quickActions}><button style={styles.quickButton} onClick={() => setPage("Documents")}>📄 {user.role === "Resident" ? "Request Document" : user.role === "Secretary" ? "Verify Documents" : "Approve Documents"}</button><button style={styles.quickButton} onClick={() => setPage("Blotter Reports")}>📋 {user.role === "Resident" ? "View My Blotter Status" : user.role === "Secretary" ? "Process Blotter Reports" : "Review Blotter Reports"}</button><button style={styles.quickButton} onClick={() => setPage("Announcements")}>📢 View Announcements ({announcements.length})</button></div></section><section style={styles.card}><h2>Recent Activity</h2><p>📄 Total Document Requests: {documents.length}</p><p>⏳ Pending Documents: {documents.filter(d => d.status === "Pending").length}</p><p>📋 Total Blotter Reports: {blotters.length}</p><p>📢 Announcements: {announcements.length}</p></section></div>
  </>;
}

function Documents({ role, documents, setDocuments, notify }) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ resident: "", type: "Barangay Clearance", purpose: "" });
  const [search, setSearch] = useState("");
  const [detailId, setDetailId] = useState(null);
  const detail = documents.find(d => d.id === detailId);
  const submit = e => {
    e.preventDefault();
    if (role !== "Resident") return notify("Residents only.");
    if (!form.resident.trim()) return notify("Enter resident name.");
    if (!form.purpose.trim()) return notify("Enter purpose of request.");
    const item = { id: nextId(documents, "DOC-", 3), resident: form.resident.trim(), type: form.type, purpose: form.purpose.trim(), date: today(), status: "Pending" };
    setDocuments(prev => [item, ...prev]);
    setForm({ resident: "", type: "Barangay Clearance", purpose: "" }); setFormOpen(false); notify("Request Created - Pending for Secretary");
  };
  const updateStatus = (id, status) => {
    const current = documents.find(d => d.id === id);
    if (!current) return;
    if (status === "Verified" && (role !== "Secretary" || current.status !== "Pending")) return notify("Only Secretary can verify pending requests.");
    if (["Approved", "Rejected"].includes(status) && (role !== "Captain" || current.status !== "Verified")) return notify("Only Captain can approve or reject verified requests.");
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, status } : d)); notify(`Status: ${status}`);
  };
  const remove = id => {
    if (role !== "Resident") return notify("Resident only can delete document requests in this demo.");
    if (!window.confirm("Are you sure you want to delete this document request?")) return;
    setDocuments(prev => prev.filter(d => d.id !== id)); setDetailId(null); notify("Document Request deleted successfully!");
  };
  const filtered = documents.filter(d => `${d.id} ${d.resident} ${d.type} ${d.status}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <div style={styles.pageHeader}><div><h2>Document Requests - {BARANGAY}</h2><p>{role === "Resident" ? "Mag-request at tingnan ang status." : role === "Secretary" ? "Nag-eencode at nagpo-process ng documents." : "Nag-aapprove at nagre-review ng requests."}</p></div>{role === "Resident" && <button style={styles.primary} onClick={() => setFormOpen(v => !v)}>{formOpen ? "Close" : "+ New Request"}</button>}</div>
    {formOpen && role === "Resident" && <form style={styles.formCard} onSubmit={submit}><h3>Create Document Request</h3><input style={styles.input} placeholder="Resident Name" value={form.resident} onChange={e => setForm({ ...form, resident: e.target.value })} required /><select style={styles.input} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>{["Barangay Clearance", "Certificate of Residency", "Certificate of Indigency", "Business Clearance"].map(t => <option key={t}>{t}</option>)}</select><textarea style={styles.textarea} placeholder="Purpose of Request (e.g. employment, school requirement)" value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} required /><button style={styles.primary} type="submit">Submit Request</button></form>}
    <section style={styles.card}><div style={styles.cardHeader}><h3>Document List</h3><input style={{ ...styles.input, maxWidth: 220, margin: 0 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div><div style={styles.tableScroll}><table style={styles.table}><thead><tr><th>ID</th><th>Resident</th><th>Type</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map(d => <tr key={d.id}><td>{d.id}</td><td>{d.resident}</td><td>{d.type}</td><td>{d.date}</td><td><Status value={d.status} /></td><td><div style={styles.actions}><button style={styles.view} onClick={() => setDetailId(d.id)}>View</button>{role === "Resident" && <button style={styles.delete} onClick={() => remove(d.id)}>Delete</button>}</div></td></tr>)}</tbody></table>{!filtered.length && <p>No documents found.</p>}</div></section>
    {detail && <Modal title={`${detail.id} - ${BARANGAY}`} close={() => setDetailId(null)}><p><b>Resident:</b> {detail.resident}</p><p><b>Type:</b> {detail.type}</p><p><b>Purpose:</b> {detail.purpose || "Not specified"}</p><p><b>Date:</b> {detail.date}</p><p><b>Status:</b> <Status value={detail.status} /></p><div style={styles.actions}>{role === "Secretary" && detail.status === "Pending" && <button style={styles.primary} onClick={() => updateStatus(detail.id, "Verified")}>✓ Verify (Secretary)</button>}{role === "Captain" && detail.status === "Verified" && <><button style={styles.primary} onClick={() => updateStatus(detail.id, "Approved")}>✔ Approve</button><button style={styles.delete} onClick={() => updateStatus(detail.id, "Rejected")}>✖ Reject</button></>}{role === "Captain" && detail.status === "Pending" && <p style={styles.notice}>Hintayin muna ang Secretary verification.</p>}{role === "Resident" && <p style={styles.notice}>View status only. Secretary verifies and Captain approves.</p>}<button style={styles.secondary} onClick={() => setDetailId(null)}>Close</button></div></Modal>}
  </>;
}

function Blotters({ role, blotters, setBlotters, notify }) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ complainant: "", incident: "", description: "" });
  const [detailId, setDetailId] = useState(null);
  const detail = blotters.find(b => b.id === detailId);
  const submit = e => {
    e.preventDefault();
    if (role === "Secretary") return notify("Secretary cannot create new blotter reports.");
    if (!form.complainant.trim()) return notify("Enter complainant name.");
    const item = { id: nextId(blotters, "BR-", 4), complainant: form.complainant.trim(), incident: form.incident.trim() || "General Complaint", description: form.description, date: today(), status: "Pending" };
    setBlotters(prev => [item, ...prev]); setForm({ complainant: "", incident: "", description: "" }); setFormOpen(false); notify(`Blotter ${item.id} filed`);
  };
  const updateStatus = (id, status) => {
    const current = blotters.find(b => b.id === id);
    if (!current) return;
    if (status === "Under Review" && (role !== "Secretary" || current.status !== "Pending")) return notify("Only Secretary can process pending reports.");
    if (["Resolved", "Dismissed"].includes(status) && (role !== "Captain" || current.status !== "Under Review")) return notify("Only Captain can resolve or dismiss reviewed reports.");
    setBlotters(prev => prev.map(b => b.id === id ? { ...b, status } : b)); notify(`Blotter: ${status}`);
  };
  const remove = id => {
    if (role !== "Resident") return notify("Resident only can delete blotter reports in this demo.");
    if (!window.confirm("Are you sure you want to delete this blotter report?")) return;
    setBlotters(prev => prev.filter(b => b.id !== id)); setDetailId(null); notify("Blotter Report deleted successfully!");
  };
  return <>
    <div style={styles.pageHeader}><div><h2>Blotter Reports - {BARANGAY}</h2><p>{role === "Resident" ? "Tumitingin ng report status." : role === "Secretary" ? "Nagpo-process ng blotter reports." : "Nagre-review at nagre-resolve ng mga report."}</p></div>{role !== "Secretary" && <button style={styles.primary} onClick={() => setFormOpen(v => !v)}>{formOpen ? "Close Form" : "+ New Blotter"}</button>}</div>
    {formOpen && role !== "Secretary" && <form style={styles.formCard} onSubmit={submit}><h3>Create Blotter Report</h3><input style={styles.input} placeholder="Complainant Name" value={form.complainant} onChange={e => setForm({ ...form, complainant: e.target.value })} required /><input style={styles.input} placeholder="Incident Type" value={form.incident} onChange={e => setForm({ ...form, incident: e.target.value })} /><textarea style={styles.textarea} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /><button style={styles.primary} type="submit">Submit Report</button></form>}
    <section style={styles.card}><div style={styles.tableScroll}><table style={styles.table}><thead><tr><th>Report ID</th><th>Complainant</th><th>Incident</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>{blotters.map(b => <tr key={b.id}><td>{b.id}</td><td>{b.complainant}</td><td>{b.incident}</td><td>{b.date}</td><td><Status value={b.status} /></td><td><div style={styles.actions}><button style={styles.view} onClick={() => setDetailId(b.id)}>View</button>{role === "Resident" && <button style={styles.delete} onClick={() => remove(b.id)}>Delete</button>}</div></td></tr>)}</tbody></table>{!blotters.length && <p>No blotter reports found.</p>}</div></section>
    {detail && <Modal title={`${detail.id} - ${BARANGAY}`} close={() => setDetailId(null)}><p><b>Complainant:</b> {detail.complainant}</p><p><b>Incident:</b> {detail.incident}</p>{detail.description && <p><b>Description:</b> {detail.description}</p>}<p><b>Status:</b> <Status value={detail.status} /></p><div style={styles.actions}>{role === "Secretary" && detail.status === "Pending" && <button style={styles.primary} onClick={() => updateStatus(detail.id, "Under Review")}>📝 Process / Under Review</button>}{role === "Captain" && detail.status === "Under Review" && <><button style={styles.primary} onClick={() => updateStatus(detail.id, "Resolved")}>✔ Resolve</button><button style={styles.delete} onClick={() => updateStatus(detail.id, "Dismissed")}>✖ Dismiss</button></>}{role === "Captain" && detail.status === "Pending" && <p style={styles.notice}>Secretary must process this report first.</p>}{role === "Resident" && <p style={styles.notice}>View status only. Secretary processes and Captain reviews.</p>}<button style={styles.secondary} onClick={() => setDetailId(null)}>Close</button></div></Modal>}
  </>;
}

function Announcements({ role, announcements, setAnnouncements, notify }) {
  const canManage = role === "Captain" || role === "Secretary";
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", description: "" });
  const [detailId, setDetailId] = useState(null);
  const detail = announcements.find(a => a.id === detailId);
  const submit = e => {
    e.preventDefault();
    if (!canManage) return notify("Access denied.");
    if (!form.title.trim()) return notify("Enter title.");
    setAnnouncements(prev => [{ id: Date.now(), title: form.title.trim(), date: form.date || today(), description: form.description }, ...prev]);
    setForm({ title: "", date: "", description: "" }); setFormOpen(false); notify("Announcement posted!");
  };
  const remove = id => {
    if (!canManage) return notify("Access denied.");
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    setAnnouncements(prev => prev.filter(a => a.id !== id)); setDetailId(null); notify("Announcement deleted successfully!");
  };
  return <>
    <div style={styles.pageHeader}><div><h2>Announcements - {BARANGAY}</h2><p>Latest barangay announcements.</p></div>{canManage && <button style={styles.primary} onClick={() => setFormOpen(v => !v)}>{formOpen ? "Close Form" : "+ Add Announcement"}</button>}</div>
    {formOpen && canManage && <form style={styles.formCard} onSubmit={submit}><h3>New Announcement - {BARANGAY}</h3><input style={styles.input} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /><input style={styles.input} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /><textarea style={styles.textarea} placeholder="Details - SAN AGUSTIN" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /><button style={styles.primary} type="submit">Post Announcement</button></form>}
    <div style={styles.announcementGrid}>{announcements.map(a => <article key={a.id} style={styles.announcement}><span style={styles.announcementIcon}>📢</span><div style={{ minWidth: 0 }}><h3 style={{ marginTop: 0 }}>{a.title}</h3><p style={{ color: COLORS.primary, fontSize: 12, fontWeight: 700 }}>{a.date} • {BARANGAY}</p><p style={{ color: "#475569", fontSize: 13 }}>{a.description}</p><div style={styles.actions}><button style={styles.link} onClick={() => setDetailId(a.id)}>Read More →</button>{canManage && <button style={{ ...styles.link, color: "#dc2626" }} onClick={() => remove(a.id)}>Delete</button>}</div></div></article>)}</div>
    {detail && <Modal title={detail.title} close={() => setDetailId(null)}><p style={{ fontSize: 12, color: "#64748b" }}>{detail.date} • {BARANGAY}</p><p>{detail.description}</p><button style={styles.primary} onClick={() => setDetailId(null)}>Close</button></Modal>}
  </>;
}

function Status({ value }) {
  const bg = ({ Approved: "#dcfce7", Resolved: "#dcfce7", Verified: "#dbeafe", "Under Review": "#dbeafe", Rejected: "#fee2e2", Dismissed: "#fee2e2", Pending: "#fef9c3" })[value] || "#f1f5f9";
  return <span style={{ ...styles.status, background: bg }}>{value}</span>;
}
function Modal({ title, close, children }) {
  return <div style={styles.overlay} onClick={close}><div style={styles.modal} role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}><h3 style={{ color: COLORS.primary, marginTop: 0 }}>{title}</h3>{children}</div></div>;
}

const styles = {
  root: { minHeight: "100vh", fontFamily: "Arial, sans-serif", color: "#1e293b", background: "#f8fafc" },
  toast: { position: "fixed", top: 20, right: 20, zIndex: 9999, background: COLORS.primary, color: "white", padding: "12px 16px", borderRadius: 9, boxShadow: "0 10px 25px #0003", maxWidth: 340 },
  toastClose: { background: "none", border: 0, color: "white", fontSize: 20, cursor: "pointer", marginLeft: 12 },
  loginPage: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, boxSizing: "border-box", background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}30)` },
  loginCard: { background: "white", width: "100%", maxWidth: 430, padding: 35, boxSizing: "border-box", borderRadius: 20, textAlign: "center", boxShadow: "0 15px 45px #0002" },
  loginLogo: { width: 90, height: 90, objectFit: "cover", borderRadius: "50%", border: `3px solid ${COLORS.secondary}`, display: "block", margin: "0 auto 15px auto" },
  label: { display: "block", textAlign: "left", fontSize: 13, fontWeight: 700, margin: "12px 0 7px" },
  input: { width: "100%", boxSizing: "border-box", padding: 12, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, marginBottom: 14, background: "white" },
  textarea: { width: "100%", boxSizing: "border-box", padding: 12, border: "1px solid #cbd5e1", borderRadius: 8, minHeight: 100, resize: "vertical", marginBottom: 14, fontFamily: "inherit" },
  passwordWrap: { position: "relative" },
  eye: { position: "absolute", right: 10, top: 6, border: 0, background: "none", cursor: "pointer", fontSize: 19 },
  primary: { padding: "11px 17px", border: 0, borderRadius: 8, background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, cursor: "pointer" },
  secondary: { padding: "11px 17px", border: "1px solid #cbd5e1", borderRadius: 8, background: "#f8fafc", color: COLORS.primary, fontWeight: 700, cursor: "pointer" },
  link: { border: 0, background: "none", color: COLORS.primary, fontWeight: 700, cursor: "pointer", padding: 0 },
  layout: { display: "flex", minHeight: "100vh" },
  sidebar: { width: 260, flexShrink: 0, boxSizing: "border-box", background: COLORS.primary, color: "white", padding: "24px 16px", display: "flex", flexDirection: "column", borderRight: `3px solid ${COLORS.secondary}` },
  brand: { display: "flex", gap: 10, alignItems: "center", padding: "0 6px 20px", borderBottom: `1px solid ${COLORS.secondary}` },
  sidebarLogo: { width: 44, height: 44, objectFit: "cover", borderRadius: 9, border: `2px solid ${COLORS.secondary}`, background: "white" },
  roleBox: { border: `1px solid ${COLORS.secondary}`, borderRadius: 9, padding: 12, margin: "22px 0", display: "flex", flexDirection: "column", gap: 7 },
  rolePill: { background: COLORS.secondary, color: COLORS.primary, padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 700, alignSelf: "flex-start" },
  navButton: { width: "100%", textAlign: "left", padding: 14, border: 0, borderRadius: 8, background: "transparent", color: "#e2e8f0", cursor: "pointer", marginBottom: 6, fontSize: 14 },
  navActive: { background: COLORS.secondary, color: COLORS.primary, fontWeight: 700 },
  logout: { width: "100%", padding: 12, border: `1px solid ${COLORS.secondary}`, background: COLORS.primary, color: "white", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  main: { flex: 1, minWidth: 0 },
  topbar: { background: "white", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15, flexWrap: "wrap", borderBottom: "1px solid #e2e8f0" },
  avatar: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: "50%", background: COLORS.secondary, color: COLORS.primary, fontWeight: 700 },
  content: { padding: "28px 32px" },
  welcome: { borderRadius: 16, padding: 25, background: `linear-gradient(135deg, ${COLORS.primary}, #34694b)`, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 15, marginBottom: 25 },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16, marginBottom: 24 },
  stat: { background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer" },
  twoColumns: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 22 },
  card: { background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 22, marginBottom: 20 },
  quickActions: { display: "grid", gap: 12 },
  quickButton: { padding: 15, borderRadius: 9, background: "#f8fafc", border: "1px solid #e2e8f0", cursor: "pointer", textAlign: "left" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 15, marginBottom: 24 },
  formCard: { background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 24, maxWidth: 650, marginBottom: 24 },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15, flexWrap: "wrap", marginBottom: 15 },
  tableScroll: { overflowX: "auto" },
  table: { width: "100%", minWidth: 750, borderCollapse: "collapse", textAlign: "left", lineHeight: 2.5 },
  status: { padding: "6px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: COLORS.primary, whiteSpace: "nowrap" },
  actions: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 8 },
  view: { border: 0, background: "#dcfce7", color: COLORS.primary, padding: "8px 13px", borderRadius: 6, fontWeight: 700, cursor: "pointer" },
  delete: { border: 0, background: "#dc2626", color: "white", padding: "8px 13px", borderRadius: 6, fontWeight: 700, cursor: "pointer" },
  overlay: { position: "fixed", inset: 0, background: "#0f172a88", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 18 },
  modal: { background: "white", padding: 25, borderRadius: 14, width: "100%", maxWidth: 460, boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 50px #0003" },
  notice: { background: "#f1f5f9", padding: 10, borderRadius: 8, fontSize: 12, width: "100%" },
  announcementGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 20 },
  announcement: { background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 22, display: "flex", gap: 15 },
  announcementIcon: { width: 45, height: 45, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.secondary, fontSize: 22 },
};
