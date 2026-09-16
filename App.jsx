import React, { useState } from "react";
import barangayLogo from "./barangay-logo.jpg";

const BARANGAY = "SAN AGUSTINE, SAN RAFAEL, BULACAN";

const INITIAL_USERS = [
{ email: "resident@gmail.com", password: "123", role: "Resident" },
{ email: "captain@gmail.com", password: "123", role: "Captain" },
{ email: "secretary@gmail.com", password: "123", role: "Secretary" },
];

export default function App() {
const [users, setUsers] = useState(INITIAL_USERS);
const [user, setUser] = useState(null);
const [stage, setStage] = useState("login");
const [selectedModule, setSelectedModule] = useState(null);
const [activePage, setActivePage] = useState("Dashboard");
const [toast, setToast] = useState(null);

const [documents, setDocuments] = useState([
{ id: "DOC-001", resident: "Juan Dela Cruz", type: "Barangay Clearance", date: "September 14, 2026", status: "Pending" },
{ id: "DOC-002", resident: "Maria Santos", type: "Certificate of Residency", date: "September 13, 2026", status: "Approved" },
{ id: "DOC-003", resident: "【entity-Pedro Reyes¦canonical_name=Pedro Reyes】", type: "Certificate of Indigency", date: "September 12, 2026", status: "Processing" },
]);
const [announcements, setAnnouncements] = useState([
{ id: 1, title: "Barangay General Assembly", date: "September 20, 2026", description: "All residents are invited to attend the barangay general assembly at Brgy Hall of SAN AGUSTINE." },
{ id: 2, title: "Clean-up Drive", date: "September 22, 2026", description: "Community clean-up drive will be held at the covered court of SAN AGUSTINE." },
{ id: 3, title: "Health Check-up", date: "September 25, 2026", description: "Free medical check-up for residents of SAN AGUSTINE." },
]);
const [blotters, setBlotters] = useState([
{ id: "BR-0012", complainant: "Juan Dela Cruz", incident: "Noise Complaint", date: "September 14, 2026", status: "Under Review" },
{ id: "BR-0011", complainant: "Maria Santos", incident: "Dispute", date: "September 13, 2026", status: "Resolved" },
{ id: "BR-0010", complainant: "【entity-Pedro Reyes¦canonical_name=Pedro Reyes】", incident: "Property Concern", date: "September 12, 2026", status: "Pending" },
]);

const showToast = (msg) => {
setToast(msg);
setTimeout(() => setToast(null), 3000);
};

const handleLogin = (email, password) => {
const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
if (!found) {
showToast("Mali ang email o password!");
return;
}
setUser(found);
setStage("modules");
showToast(`Welcome ${found.role} - ${found.email}`);
};

const handleGoogleLogin = () => {
const googleUser = { email: "Google User", role: "Resident", password: "google" };
setUser(googleUser);
setStage("modules");
};

const handleLogout = () => {
setUser(null);
setSelectedModule(null);
setActivePage("Dashboard");
setStage("login");
};

const handleModuleSelect = (modName) => {
const modRole = modName.replace(" Dashboard", "");
if (user.role !== modRole) {
showToast(`⛔ ACCESS DENIED: ${user.role} ka lang. Hindi mo pwedeng buksan ang ${modRole} Dashboard!`);
return;
}
setSelectedModule(modName);
setStage("app");
setActivePage("Dashboard");
showToast(`Opened ${modName} - ${BARANGAY}`);
};

if (stage === "login") return <Login onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} users={users} setUsers={setUsers} toast={toast} showToast={showToast} />;
if (stage === "modules") return <DashboardModules onSelect={handleModuleSelect} logout={handleLogout} user={user} toast={toast} showToast={showToast} />;

return (
<>
{toast && <div style={styles.toast}>{toast}</div>}
<DashboardLayout
user={user}
selectedModule={selectedModule}
activePage={activePage}
setActivePage={setActivePage}
logout={handleLogout}
backToModules={() => setStage("modules")}
documents={documents} setDocuments={setDocuments}
announcements={announcements} setAnnouncements={setAnnouncements}
blotters={blotters} setBlotters={setBlotters}
showToast={showToast}
/>
</>
);
}

function Login({ onLogin, onGoogleLogin, users, setUsers, showToast }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showForgot, setShowForgot] = useState(false);
const [showSignup, setShowSignup] = useState(false);
const [signupData, setSignupData] = useState({ name: "", email: "", password: "", role: "Resident" });

const handleSignup = () => {
if(!signupData.name || !signupData.email || !signupData.password) return showToast("Kumpletuhin ang form");
if(users.find(u => u.email.toLowerCase() === signupData.email.toLowerCase())){
return showToast("May account na sa email na yan");
}
const newUser = { email: signupData.email, password: signupData.password, role: signupData.role, name: signupData.name };
setUsers([...users, newUser]);
setShowSignup(false);
showToast(`Account created as ${signupData.role}! Pwede ka na mag login.`);
setSignupData({ name: "", email: "", password: "", role: "Resident" });
}

return (
<div style={styles.loginPage}>
<div style={styles.loginCard}>
<img src={barangayLogo} alt="Barangay Logo" style={styles.logoCircle} />
<h1 style={styles.loginTitle}>Barangay Management System</h1>
<p style={styles.loginSubtitle}>{BARANGAY}</p>
<div style={{background:'#f1f5f9', padding:'10px', borderRadius:'8px', marginBottom:'15px', fontSize:'11px', textAlign:'left'}}>
<b>Demo Accounts (password: 123):</b><br/>
resident@gmail.com - Resident<br/>
captain@gmail.com - Captain<br/>
secretary@gmail.com - Secretary
</div>
<form onSubmit={(e) => { e.preventDefault(); if (!email || !password) return showToast("Please enter email and password"); onLogin(email, password); }}>
<label style={styles.label}>Email Address</label>
<input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
<label style={styles.label}>Password</label>
<input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
<div style={styles.forgotContainer}>
<button type="button" style={styles.linkButton} onClick={() => setShowForgot(true)}>Forgot Password?</button>
</div>
<button type="submit" style={styles.loginButton}>Login</button>
</form>
<div style={styles.divider}><span>OR</span></div>
<button style={styles.googleButton} onClick={onGoogleLogin}>
<span style={styles.googleIcon}>G</span> Continue as Resident (Google)
</button>
<p style={styles.signupText}>Don't have an account? <button style={styles.linkButton} onClick={() => setShowSignup(true)}>Sign Up</button></p>
</div>

{showForgot && (
<div style={styles.modalOverlay} onClick={() => setShowForgot(false)}>
<div style={styles.modal} onClick={e => e.stopPropagation()}>
<h3>Reset Password - {BARANGAY}</h3>
<p style={{color:'#64748b', fontSize:'13px'}}>Enter your email to receive reset link</p>
<input style={styles.input} placeholder="your@email.com" />
<div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
<button style={styles.primaryButton} onClick={() => { setShowForgot(false); showToast("Reset link sent!"); }}>Send Link</button>
<button style={styles.secondaryButton} onClick={() => setShowForgot(false)}>Cancel</button>
</div>
</div>
</div>
)}
{showSignup && (
<div style={styles.modalOverlay} onClick={() => setShowSignup(false)}>
<div style={styles.modal} onClick={e => e.stopPropagation()}>
<h3>Create Account - {BARANGAY}</h3>
<p style={{fontSize:'12px', color:'#64748b'}}>Piliin ang role mo. Isang role lang per account.</p>
<input style={styles.input} placeholder="Full Name" value={signupData.name} onChange={e=>setSignupData({...signupData, name:e.target.value})} />
<input style={styles.input} placeholder="Email" value={signupData.email} onChange={e=>setSignupData({...signupData, email:e.target.value})} />
<input style={styles.input} placeholder="Password" type="password" value={signupData.password} onChange={e=>setSignupData({...signupData, password:e.target.value})} />
<label style={styles.label}>Select Role</label>
<select style={styles.input} value={signupData.role} onChange={e=>setSignupData({...signupData, role:e.target.value})}>
<option value="Resident">Resident</option>
<option value="Captain">Captain</option>
<option value="Secretary">Secretary</option>
</select>
<div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
<button style={styles.primaryButton} onClick={handleSignup}>Sign Up as {signupData.role}</button>
<button style={styles.secondaryButton} onClick={() => setShowSignup(false)}>Cancel</button>
</div>
</div>
</div>
)}
</div>
);
}

function DashboardModules({ onSelect, logout, user }) {
const modules = [
{ name: "Resident Dashboard", role: "Resident", icon: "🏠", color: "#2563eb", description: "Access resident services, document requests, announcements, and blotter reports in SAN AGUSTINE." },
{ name: "Captain Dashboard", role: "Captain", icon: "👨💼", color: "#16a34a", description: "Manage barangay operations, residents, documents, announcements, and reports for SAN AGUSTINE." },
{ name: "Secretary Dashboard", role: "Secretary", icon: "📋", color: "#9333ea", description: "Manage records, document requests, announcements, and barangay reports of SAN AGUSTINE." },
];
return (
<div style={styles.modulePage}>
<header style={styles.moduleTopbar}>
<div style={styles.brandArea}>
<img src={barangayLogo} alt="logo" style={styles.smallLogo} />
<div><h2 style={styles.brandTitle}>Barangay Management System</h2><p style={styles.brandSubtitle}>{BARANGAY} | Role: {user.role}</p></div>
</div>
<div style={styles.userArea}><div style={styles.userInfo}><strong>{user.email}</strong><span style={{background:'#dcfce7', color:'#16a34a', padding:'2px 8px', borderRadius:'20px', fontSize:'10px', marginTop:'3px', fontWeight:'bold'}}>{user.role}</span></div><button style={styles.logoutButton} onClick={logout}>Logout</button></div>
</header>
<main style={styles.moduleContent}>
<div style={styles.welcomeBox}><h1>Welcome to Barangay SAN AGUSTINE</h1><p>Ikaw ay naka-login bilang <b>{user.role}</b>. Isang dashboard lang ang pwede mong buksan - {BARANGAY}</p></div>
<div style={styles.moduleGrid}>
{modules.map((m) => {
const isAllowed = user.role === m.role;
return (
<div key={m.name} style={{...styles.moduleCard, opacity: isAllowed ? 1 : 0.6, border: isAllowed ? `2px solid ${m.color}` : '1px solid #e2e8f0', cursor: isAllowed ? 'pointer' : 'not-allowed'}} onClick={() => onSelect(m.name)}>
{!isAllowed && <div style={styles.lockedBadge}>🔒 LOCKED - {user.role} ka lang</div>}
{isAllowed && <div style={{...styles.lockedBadge, background:'#dcfce7', color:'#16a34a'}}>✅ ALLOWED FOR YOU</div>}
<div style={{ ...styles.moduleIcon, background: `${m.color}18`, color: m.color }}>{m.icon}</div>
<h2 style={styles.moduleTitle}>{m.name}</h2>
<p style={styles.moduleDescription}>{m.description}</p>
<button style={{ ...styles.moduleButton, background: isAllowed ? m.color : '#94a3b8' }} onClick={(e) => { e.stopPropagation(); onSelect(m.name); }}>
{isAllowed ? 'Open Dashboard →' : 'Access Denied ⛔'}
</button>
</div>
)
})}
</div>
</main>
</div>
);
}

function DashboardLayout({ user, selectedModule, activePage, setActivePage, logout, backToModules, documents, setDocuments, announcements, setAnnouncements, blotters, setBlotters, showToast }) {
const role = selectedModule.replace(" Dashboard", "");
const menuItems = [{ name: "Dashboard", icon: "📊" }, { name: "Documents", icon: "📄" }, { name: "Announcements", icon: "📢" }, { name: "Blotter Reports", icon: "📝" }];
return (
<div style={styles.dashboardLayout}>
<aside style={styles.sidebar}>
<div style={styles.sidebarBrand}>
<img src={barangayLogo} alt="logo" style={styles.sidebarLogo} />
<div><h2 style={styles.sidebarTitle}>SAN AGUSTINE</h2><p style={styles.sidebarSubtitle}>{BARANGAY}</p></div>
</div>
<div style={styles.moduleBadge}><span style={{color:'#a7f3d0', fontSize:'11px'}}>Current Module</span><strong>{selectedModule}</strong><span style={{fontSize:'10px', background:'#16a34a', padding:'2px 6px', borderRadius:'10px', marginTop:'5px', width:'fit-content'}}>{user.role}</span></div>
<nav style={styles.sidebarNav}><p style={styles.menuLabel}>MAIN MENU</p>
{menuItems.map((item) => (
<button
key={item.name}
onClick={() => { setActivePage(item.name); showToast(`Opened ${item.name}`); }}
style={{ ...styles.sidebarMenu, ...(activePage === item.name ? styles.sidebarMenuActive : {}) }}
onMouseEnter={(e) => { if(activePage !== item.name) e.currentTarget.style.background = 'rgba(22,163,74,0.15)'}}
onMouseLeave={(e) => { if(activePage !== item.name) e.currentTarget.style.background = 'transparent'}}
>
<span>{item.icon}</span><span>{item.name}</span>
</button>
))}
</nav>
<div style={styles.sidebarBottom}>
<button style={styles.changeModuleButton} onClick={() => { backToModules(); showToast("Changed module"); }}>🔄 Change Module</button>
<button style={styles.sidebarLogout} onClick={logout}>🚪 Logout</button>
</div>
</aside>
<main style={styles.mainContent}>
<header style={styles.dashboardTopbar}><div><p style={styles.breadcrumb}>Home / {activePage} / {BARANGAY}</p><h1 style={styles.pageTitle}>{activePage}</h1></div>
<div style={styles.dashboardUser}><div style={styles.avatar}>{role.charAt(0)}</div><div><strong>{role}</strong><br/><span style={{fontSize:'11px', color:'#64748b'}}>{user.email}</span></div></div>
</header>
<section style={styles.pageContent}>
{activePage === "Dashboard" && <DashboardHome role={role} selectedModule={selectedModule} setActivePage={setActivePage} showToast={showToast} />}
{activePage === "Documents" && <DocumentsPage role={role} documents={documents} setDocuments={setDocuments} showToast={showToast} />}
{activePage === "Announcements" && <AnnouncementsPage role={role} announcements={announcements} setAnnouncements={setAnnouncements} showToast={showToast} />}
{activePage === "Blotter Reports" && <BlotterReportsPage role={role} blotters={blotters} setBlotters={setBlotters} showToast={showToast} />}
</section>
</main>
</div>
);
}

function DashboardHome({ role, selectedModule, setActivePage, showToast }) {
const stats = [
{ title: "Document Requests", value: "24", icon: "📄", color: "#2563eb" },
{ title: "Announcements", value: "8", icon: "📢", color: "#16a34a" },
{ title: "Blotter Reports", value: "12", icon: "📝", color: "#ea580c" },
{ title: "Pending Requests", value: "6", icon: "⏳", color: "#9333ea" },
];
return (
<div>
<div style={{...styles.dashboardWelcome, background:"linear-gradient(135deg, #0a1931, #16a34a)"}}><div><h2>Welcome, {role}!</h2><p>You are using <strong>{selectedModule}</strong> - {BARANGAY}</p></div><div style={styles.dateBox}><span>📅</span><span>{new Date().toLocaleDateString()}</span></div></div>
<div style={styles.statsGrid}>{stats.map((s) => (<div style={styles.statCard} key={s.title} onClick={() => showToast(`${s.title}: ${s.value}`)}><div style={{ ...styles.statIcon, background: `${s.color}18`, color: s.color }}>{s.icon}</div><div><p style={styles.statTitle}>{s.title}</p><h2 style={styles.statValue}>{s.value}</h2></div></div>))}</div>
<div style={styles.sectionGrid}>
<div style={styles.contentCard}><h2>Quick Actions - {BARANGAY}</h2>
<div style={styles.quickActions}>
<button style={styles.quickActionButton} onClick={() => setActivePage("Documents")}><span>📄</span><span>View Documents</span></button>
<button style={styles.quickActionButton} onClick={() => setActivePage("Announcements")}><span>📢</span><span>View Announcements</span></button>
<button style={styles.quickActionButton} onClick={() => setActivePage("Blotter Reports")}><span>📝</span><span>View Blotter Reports</span></button>
</div>
</div>
<div style={styles.contentCard}><h2>Recent Activity</h2>
<div style={styles.activityList}>
<div style={styles.activityItem}><span style={{...styles.dot, background:'#2563eb'}}></span><div><strong>New document request</strong><p style={{margin:'4px 0', fontSize:'12px', color:'#64748b'}}>Barangay Clearance - SAN AGUSTINE</p><small>Today, 9:30 AM</small></div></div>
<div style={styles.activityItem}><span style={{...styles.dot, background:'#16a34a'}}></span><div><strong>New announcement posted</strong><p style={{margin:'4px 0', fontSize:'12px', color:'#64748b'}}>Barangay meeting - SAN AGUSTINE</p><small>Yesterday, 3:00 PM</small></div></div>
<div style={styles.activityItem}><span style={{...styles.dot, background:'#ea580c'}}></span><div><strong>Blotter report updated</strong><p style={{margin:'4px 0', fontSize:'12px', color:'#64748b'}}>Report #BR-0012</p><small>Yesterday, 10:15 AM</small></div></div>
</div>
</div>
</div>
</div>
);
}

function DocumentsPage({ role, documents, setDocuments, showToast }) {
const [showForm, setShowForm] = useState(false);
const [showDetail, setShowDetail] = useState(null);
const [form, setForm] = useState({ resident: "", type: "Barangay Clearance" });
const [search, setSearch] = useState("");

const handleSubmit = () => {
if (!form.resident) return showToast("Enter resident name");
const newDoc = { id: `DOC-${String(documents.length+1).padStart(3,'0')}`, resident: form.resident, type: form.type, date: new Date().toLocaleDateString(), status: "Pending" };
setDocuments([newDoc, ...documents]);
setForm({ resident: "", type: "Barangay Clearance" });
setShowForm(false);
showToast(`Document ${newDoc.id} created - ${BARANGAY}`);
};

const filtered = documents.filter(d => d.resident.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase()));

return (
<div>
<div style={styles.pageHeader}><div><h2>Document Requests - {BARANGAY}</h2><p>Manage barangay document requests.</p></div><button style={styles.primaryButton} onClick={() => setShowForm(!showForm)}>{showForm ? "Close Form" : "+ New Request"}</button></div>
{showForm && (
<div style={styles.formCard}><h3>Create Document Request - {BARANGAY}</h3>
<input style={styles.input} placeholder="Resident Name - SAN AGUSTINE" value={form.resident} onChange={e => setForm({...form, resident:e.target.value})} />
<select style={styles.input} value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
<option>Barangay Clearance</option><option>Certificate of Residency</option><option>Certificate of Indigency</option><option>Business Clearance</option>
</select>
<button style={styles.primaryButton} onClick={handleSubmit}>Submit Request</button>
</div>
)}
<div style={styles.tableCard}>
<div style={styles.cardHeader}><h3>Document List</h3><input style={{...styles.input, width:'200px', margin:0}} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div>
<div style={styles.tableWrapper}><table style={styles.table}><thead><tr><th>ID</th><th>Resident</th><th>Type</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
<tbody>{filtered.map(doc => (<tr key={doc.id}><td>{doc.id}</td><td>{doc.resident}</td><td>{doc.type}</td><td>{doc.date}</td><td><span style={styles.statusBadge}>{doc.status}</span></td><td><button style={styles.viewButton} onClick={() => setShowDetail(doc)}>View</button></td></tr>))}</tbody>
</table></div>
</div>
{showDetail && (
<div style={styles.modalOverlay} onClick={() => setShowDetail(null)}><div style={styles.modal} onClick={e=>e.stopPropagation()}>
<h3>{showDetail.id} - {BARANGAY}</h3><p><b>Resident:</b> {showDetail.resident}</p><p><b>Type:</b> {showDetail.type}</p><p><b>Status:</b> {showDetail.status}</p>
<div style={{display:'flex', gap:'8px', marginTop:'15px', flexWrap:'wrap'}}>
{["Pending","Processing","Approved"].map(s => <button key={s} style={{...styles.viewButton, background: showDetail.status===s ? '#16a34a':'#dcfce7', color: showDetail.status===s ? 'white':'#16a34a'}} onClick={() => { setDocuments(documents.map(d=> d.id===showDetail.id ? {...d, status:s} : d)); setShowDetail({...showDetail, status:s}); showToast(`Status changed to ${s}`); }}>{s}</button>)}
<button style={styles.secondaryButton} onClick={() => setShowDetail(null)}>Close</button>
</div>
</div></div>
)}
</div>
);
}

function AnnouncementsPage({ role, announcements, setAnnouncements, showToast }) {
const [showForm, setShowForm] = useState(false);
const [form, setForm] = useState({ title: "", date: "", description: "" });
const [detail, setDetail] = useState(null);
const canManage = role === "Captain" || role === "Secretary";

const handlePost = () => {
if (!form.title) return showToast("Enter title");
setAnnouncements([{ id: Date.now(), ...form, date: form.date || new Date().toLocaleDateString() }, ...announcements]);
setForm({ title:"", date:"", description:"" });
setShowForm(false);
showToast(`Announcement posted - ${BARANGAY}`);
};

return (
<div>
<div style={styles.pageHeader}><div><h2>Announcements - {BARANGAY}</h2><p>Latest barangay announcements.</p></div>{canManage && <button style={styles.primaryButton} onClick={() => setShowForm(!showForm)}>{showForm ? "Close Form" : "+ Add Announcement"}</button>}</div>
{showForm && canManage && (
<div style={styles.formCard}><h3>New Announcement - {BARANGAY}</h3>
<input style={styles.input} placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
<input type="date" style={styles.input} value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
<textarea style={styles.textarea} placeholder="Details - SAN AGUSTINE" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}></textarea>
<button style={styles.primaryButton} onClick={handlePost}>Post Announcement</button>
</div>
)}
<div style={styles.announcementGrid}>{announcements.map(a => (
<div style={styles.announcementCard} key={a.id}>
<div style={styles.announcementIcon}>📢</div>
<div><h3>{a.title}</h3><p style={{color:'#16a34a', fontSize:'12px'}}>📅 {a.date} • {BARANGAY}</p><p style={{fontSize:'13px', color:'#475569'}}>{a.description}</p>
<div style={{display:'flex', gap:'8px', marginTop:'10px'}}><button style={styles.textButton} onClick={() => setDetail(a)}>Read More →</button>{canManage && <button style={styles.textButton} onClick={() => { setAnnouncements(announcements.filter(x=>x.id!==a.id)); showToast("Deleted"); }}>Delete</button>}</div></div>
</div>
))}</div>
{detail && <div style={styles.modalOverlay} onClick={()=>setDetail(null)}><div style={styles.modal} onClick={e=>e.stopPropagation()}><h3>{detail.title}</h3><p style={{fontSize:'12px', color:'#64748b'}}>{detail.date} • {BARANGAY}</p><p>{detail.description}</p><button style={styles.primaryButton} onClick={()=>setDetail(null)}>Close</button></div></div>}
</div>
);
}

function BlotterReportsPage({ role, blotters, setBlotters, showToast }) {
const [showForm, setShowForm] = useState(false);
const [detail, setDetail] = useState(null);
const [form, setForm] = useState({ complainant:"", incident:"", description:"" });

const handleSubmit = () => {
if (!form.complainant) return showToast("Enter complainant");
const newB = { id: `BR-${String(blotters.length+10).padStart(4,'0')}`, complainant: form.complainant, incident: form.incident || "General Complaint", date: new Date().toLocaleDateString(), status: "Pending" };
setBlotters([newB, ...blotters]);
setShowForm(false);
setForm({ complainant:"", incident:"", description:"" });
showToast(`Blotter ${newB.id} filed - ${BARANGAY}`);
};

return (
<div>
<div style={styles.pageHeader}><div><h2>Blotter Reports - {BARANGAY}</h2><p>Manage incident reports for SAN AGUSTINE.</p></div><button style={styles.primaryButton} onClick={() => setShowForm(!showForm)}>{showForm ? "Close Form" : "+ New Blotter Report"}</button></div>
{showForm && (
<div style={styles.formCard}><h3>Create Blotter Report - {BARANGAY}</h3>
<input style={styles.input} placeholder="Complainant Name" value={form.complainant} onChange={e=>setForm({...form, complainant:e.target.value})} />
<input style={styles.input} placeholder="Incident Type" value={form.incident} onChange={e=>setForm({...form, incident:e.target.value})} />
<textarea style={styles.textarea} placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}></textarea>
<button style={styles.primaryButton} onClick={handleSubmit}>Submit Report</button>
</div>
)}
<div style={styles.tableCard}><div style={styles.tableWrapper}><table style={styles.table}><thead><tr><th>Report ID</th><th>Complainant</th><th>Incident</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
<tbody>{blotters.map(r => (<tr key={r.id}><td>{r.id}</td><td>{r.complainant}</td><td>{r.incident}</td><td>{r.date}</td><td><span style={styles.statusBadge}>{r.status}</span></td><td><button style={styles.viewButton} onClick={()=>setDetail(r)}>View</button></td></tr>))}</tbody>
</table></div></div>
{detail && <div style={styles.modalOverlay} onClick={()=>setDetail(null)}><div style={styles.modal} onClick={e=>e.stopPropagation()}><h3>{detail.id} - {BARANGAY}</h3><p><b>Complainant:</b> {detail.complainant}</p><p><b>Incident:</b> {detail.incident}</p><p><b>Status:</b> {detail.status}</p><div style={{display:'flex', gap:'8px', marginTop:'12px'}}>{["Pending","Under Review","Resolved"].map(s=> <button key={s} style={{...styles.viewButton, background: detail.status===s ? '#16a34a':'#dcfce7', color: detail.status===s ? 'white':'#16a34a'}} onClick={()=>{ setBlotters(blotters.map(b=> b.id===detail.id ? {...b, status:s}:b)); setDetail({...detail, status:s}); showToast(`Status: ${s}`); }}>{s}</button>)}<button style={styles.secondaryButton} onClick={()=>setDetail(null)}>Close</button></div></div></div>}
</div>
);
}

const styles = {
toast: { position:'fixed', top:'20px', right:'20px', background:'#0f172a', color:'white', padding:'12px 18px', borderRadius:'10px', zIndex:9999, fontSize:'13px', boxShadow:'0 10px 30px rgba(0,0,0,0.2)' },
lockedBadge: { position:'absolute', top:'12px', right:'12px', background:'#fee2e2', color:'#dc2626', fontSize:'10px', fontWeight:'bold', padding:'5px 10px', borderRadius:'20px' },
modalOverlay: { position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px' },
modal: { background:'white', padding:'25px', borderRadius:'14px', maxWidth:'450px', width:'100%', boxShadow:'0 20px 50px rgba(0,0,0,0.2)' },
secondaryButton: { padding:'10px 16px', background:'#f1f5f9', color:'#334155', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' },
dot: { width:'10px', height:'10px', borderRadius:'50%', marginTop:'5px', flexShrink:0 },
loginPage: { minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"linear-gradient(135deg, #dbeafe, #dcfce7)", padding:"20px", fontFamily:"Arial, sans-serif" },
loginCard: { width:"100%", maxWidth:"430px", background:"#ffffff", padding:"35px", borderRadius:"20px", boxShadow:"0 15px 45px rgba(0, 0, 0, 0.10)", textAlign:"center" },
logoCircle: { width:"90px", height:"90px", margin:"0 auto 18px", borderRadius:"50%", objectFit:"cover", border:"3px solid #16a34a", display:"block" },
loginTitle: { color:"#0a1931", fontSize:"22px", margin:"0 0 8px" },
loginSubtitle: { color:"#16a34a", fontSize:"13px", marginBottom:"15px", fontWeight:'bold' },
label: { display:"block", textAlign:"left", color:"#334155", fontSize:"13px", fontWeight:"bold", marginBottom:"7px" },
input: { width:"100%", padding:"13px", marginBottom:"16px", border:"1px solid #cbd5e1", borderRadius:"9px", fontSize:"14px", outline:"none", boxSizing:"border-box" },
textarea: { width:"100%", minHeight:"100px", padding:"13px", marginBottom:"16px", border:"1px solid #cbd5e1", borderRadius:"9px", fontSize:"14px", resize:"vertical", boxSizing:"border-box" },
forgotContainer: { textAlign:"right", marginBottom:"18px" },
linkButton: { background:"none", border:"none", color:"#16a34a", cursor:"pointer", padding:0, fontSize:"13px", fontWeight:"bold" },
loginButton: { width:"100%", padding:"14px", background:"#0a1931", color:"#ffffff", border:"none", borderRadius:"9px", cursor:"pointer", fontWeight:"bold", fontSize:"15px" },
divider: { display:"flex", alignItems:"center", justifyContent:"center", margin:"22px 0", color:"#94a3b8", fontSize:"12px" },
googleButton: { width:"100%", padding:"13px", background:"#ffffff", color:"#334155", border:"1px solid #cbd5e1", borderRadius:"9px", cursor:"pointer", fontSize:"14px", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" },
googleIcon: { fontWeight:"bold", fontSize:"18px", color:"#16a34a" },
signupText: { color:"#64748b", fontSize:"13px", marginTop:"25px" },
modulePage: { minHeight:"100vh", background:"#f8fafc", fontFamily:"Arial, sans-serif" },
moduleTopbar: { background:"#ffffff", padding:"18px 35px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"2px solid #16a34a", gap:"20px", flexWrap:"wrap" },
brandArea: { display:"flex", alignItems:"center", gap:"12px" },
smallLogo: { width:"45px", height:"45px", borderRadius:"12px", objectFit:"cover", border:"2px solid #16a34a" },
brandTitle: { margin:0, fontSize:"18px", color:"#0a1931" },
brandSubtitle: { margin:"4px 0 0", fontSize:"11px", color:"#16a34a", fontWeight:'bold' },
userArea: { display:"flex", alignItems:"center", gap:"18px" },
userInfo: { display:"flex", flexDirection:"column", textAlign:"right", fontSize:"13px", color:"#334155" },
logoutButton: { padding:"10px 18px", background:"#16a34a", color:"#ffffff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
moduleContent: { maxWidth:"1150px", margin:"0 auto", padding:"45px 25px" },
welcomeBox: { textAlign:"center", marginBottom:"38px" },
moduleGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"25px" },
moduleCard: { background:"#ffffff", borderRadius:"18px", padding:"32px", textAlign:"center", boxShadow:"0 8px 25px rgba(0,0,0,0.07)", border:"1px solid #e2e8f0", position:'relative' },
moduleIcon: { width:"85px", height:"85px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"42px" },
moduleTitle: { color:"#1e293b", fontSize:"21px", marginBottom:"12px" },
moduleDescription: { color:"#64748b", lineHeight:1.6, minHeight:"75px", fontSize:"14px" },
moduleButton: { marginTop:"18px", padding:"12px 20px", color:"#ffffff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
// SIDEBAR GREEN + NAVY BLUE
dashboardLayout: { display:"flex", minHeight:"100vh", background:"#f8fafc", fontFamily:"Arial, sans-serif" },
sidebar: { width:"260px", background:"linear-gradient(180deg, #0a1931 0%, #0f2d4d 100%)", color:"#ffffff", padding:"24px 16px", display:"flex", flexDirection:"column", boxSizing:"border-box", borderRight:"3px solid #16a34a" },
sidebarBrand: { display:"flex", alignItems:"center", gap:"10px", padding:"0 10px 25px", borderBottom:"1px solid #16a34a" },
sidebarLogo: { width:"43px", height:"43px", borderRadius:"10px", objectFit:"cover", background:"white", border:"2px solid #16a34a" },
sidebarTitle: { margin:0, fontSize:"18px", color:"white" },
sidebarSubtitle: { margin:"3px 0 0", color:"#86efac", fontSize:"10px", fontWeight:"bold" },
moduleBadge: { background:"#112a46", borderRadius:"10px", padding:"13px", margin:"22px 0", display:"flex", flexDirection:"column", gap:"6px", border:"1px solid #16a34a" },
sidebarNav: { display:"flex", flexDirection:"column", gap:"7px" },
menuLabel: { color:"#4ade80", fontSize:"11px", fontWeight:"bold", padding:"0 12px", marginBottom:"5px", letterSpacing:"1px" },
sidebarMenu: { width:"100%", display:"flex", alignItems:"center", gap:"13px", padding:"13px 14px", background:"transparent", border:"none", borderRadius:"9px", color:"#cbd5e1", cursor:"pointer", textAlign:"left", fontSize:"14px", transition:"0.2s" },
sidebarMenuActive: { background:"#16a34a", color:"#ffffff", fontWeight:"bold", boxShadow:"0 4px 12px rgba(22,163,74,0.4)" },
sidebarBottom: { marginTop:"auto", display:"flex", flexDirection:"column", gap:"10px", paddingTop:"25px", borderTop:"1px solid rgba(22,163,74,0.3)" },
changeModuleButton: { padding:"12px", background:"#1a3a5f", color:"#e0f2fe", border:"1px solid #16a34a", borderRadius:"8px", cursor:"pointer" },
sidebarLogout: { padding:"12px", background:"#14532d", color:"#ffffff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
mainContent: { flex:1, minWidth:0 },
dashboardTopbar: { background:"#ffffff", padding:"25px 35px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #e2e8f0", gap:"20px", flexWrap:"wrap" },
breadcrumb: { color:"#94a3b8", fontSize:"11px", margin:"0 0 8px", fontWeight:'bold' },
pageTitle: { margin:0, color:"#0a1931", fontSize:"22px" },
dashboardUser: { display:"flex", alignItems:"center", gap:"10px" },
avatar: { width:"42px", height:"42px", borderRadius:"50%", background:"#dcfce7", color:"#16a34a", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold", fontSize:"18px", border:"2px solid #16a34a" },
pageContent: { padding:"30px 35px" },
dashboardWelcome: { background:"linear-gradient(135deg, #1d4ed8, #2563eb)", color:"#ffffff", borderRadius:"16px", padding:"25px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"20px", flexWrap:"wrap", marginBottom:"25px" },
dateBox: { background:"rgba(255,255,255,0.18)", padding:"12px 15px", borderRadius:"9px", display:"flex", gap:"8px" },
statsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"18px", marginBottom:"25px" },
statCard: { background:"#ffffff", padding:"22px", borderRadius:"14px", display:"flex", alignItems:"center", gap:"15px", border:"1px solid #e2e8f0", cursor:'pointer' },
statIcon: { width:"50px", height:"50px", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"25px" },
statTitle: { color:"#64748b", fontSize:"13px", margin:0 },
statValue: { color:"#1e293b", fontSize:"25px", margin:"7px 0 0" },
sectionGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"25px" },
contentCard: { background:"#ffffff", borderRadius:"14px", padding:"23px", border:"1px solid #e2e8f0" },
cardHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", gap:"15px", marginBottom:"20px" },
quickActions: { display:"grid", gap:"12px" },
quickActionButton: { display:"flex", alignItems:"center", gap:"12px", padding:"15px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:"10px", cursor:"pointer", textAlign:"left", color:"#334155" },
activityList: { display:"flex", flexDirection:"column", gap:"18px" },
activityItem: { display:"flex", gap:"12px" },
pageHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", gap:"15px", flexWrap:"wrap", marginBottom:"25px" },
primaryButton: { padding:"12px 18px", background:"#16a34a", color:"#ffffff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
formCard: { background:"#ffffff", padding:"25px", borderRadius:"14px", border:"1px solid #e2e8f0", marginBottom:"25px", maxWidth:"650px" },
tableCard: { background:"#ffffff", borderRadius:"14px", border:"1px solid #e2e8f0", padding:"22px" },
tableWrapper: { overflowX:"auto" },
table: { width:"100%", borderCollapse:"collapse", minWidth:"750px" },
statusBadge: { display:"inline-block", padding:"6px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:"bold", background:'#dcfce7', color:'#16a34a' },
viewButton: { padding:"7px 13px", background:"#dcfce7", color:"#16a34a", border:"none", borderRadius:"6px", cursor:"pointer", fontWeight:"bold" },
announcementGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"20px" },
announcementCard: { background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:"14px", padding:"22px", display:"flex", gap:"15px" },
announcementIcon: { width:"45px", height:"45px", borderRadius:"10px", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 },
textButton: { border:"none", background:"none", color:"#16a34a", cursor:"pointer", padding:0, fontWeight:"bold" },
};
