import React, { useState } from "react";
import barangayLogo from "./barangay-logo.jpg";
const BARANGAY = "SAN AGUSTIN, SAN RAFAEL, BULACAN";
const COLORS = {
  primary: "#213359",
  secondary: "#4ADE80",
};
const INITIAL_USERS = [
  { email: "resident@gmail.com", password: "res123", role: "Resident" },
  { email: "captain@gmail.com", password: "cap123", role: "Captain" },
  { email: "secretary@gmail.com", password: "sec123", role: "Secretary" },
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
    { id: "DOC-002", resident: "Maria Santos", type: "Certificate of Residency", date: "September 13, 2026", status: "Verified" },
    { id: "DOC-003", resident: "Pedro Reyes", type: "Certificate of Indigency", date: "September 12, 2026", status: "Approved" },
  ]);
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Barangay General Assembly", date: "September 20, 2026", description: "All residents are invited to attend the barangay general assembly at Brgy Hall of SAN AGUSTIN." },
    { id: 2, title: "Clean-up Drive", date: "September 22, 2026", description: "Community clean-up drive will be held at the covered court of SAN AGUSTIN." },
  ]);
  const [blotters, setBlotters] = useState([
    { id: "BR-0012", complainant: "Juan Dela Cruz", incident: "Noise Complaint", date: "September 14, 2026", status: "Pending" },
    { id: "BR-0011", complainant: "Maria Santos", incident: "Dispute", date: "September 13, 2026", status: "Under Review" },
    { id: "BR-0010", complainant: "Pedro Reyes", incident: "Property Concern", date: "September 12, 2026", status: "Resolved" },
  ]);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const handleLogin = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) { showToast("Mali ang email o password!"); return; }
    setUser(found); setStage("modules"); showToast(`Welcome ${found.role} - ${found.email}`);
  };
  const handleGoogleLogin = () => {
    const googleUser = { email: "Google User", role: "Resident", password: "google" };
    setUser(googleUser); setStage("modules");
  };
  const handleLogout = () => { setUser(null); setSelectedModule(null); setActivePage("Dashboard"); setStage("login"); };
  const handleModuleSelect = (modName) => {
    const modRole = modName.replace(" Dashboard", "");
    if (user.role !== modRole) {
      showToast(`⛔ ACCESS DENIED: ${user.role} ka lang. Hindi mo pwedeng buksan ang ${modRole} Dashboard!`); return;
    }
    setSelectedModule(modName); setStage("app"); setActivePage("Dashboard");
  };
  if (stage === "login") return <Login onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} users={users} setUsers={setUsers} toast={toast} showToast={showToast} />;
  if (stage === "modules") return <DashboardModules onSelect={handleModuleSelect} logout={handleLogout} user={user} toast={toast} showToast={showToast} />;
  return (
    <>
      {toast && <div style={styles.toast}>{toast}</div>}
      <DashboardLayout user={user} selectedModule={selectedModule} activePage={activePage} setActivePage={setActivePage} logout={handleLogout} backToModules={() => setStage("modules")} documents={documents} setDocuments={setDocuments} announcements={announcements} setAnnouncements={setAnnouncements} blotters={blotters} setBlotters={setBlotters} showToast={showToast} />
    </>
  );
}

function Login({ onLogin, onGoogleLogin, users, setUsers, showToast }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false); const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", role: "Resident" });
  const handleSignup = () => {
    if(!signupData.name || !signupData.email || !signupData.password) return showToast("Kumpletuhin ang form");
    if(users.find(u => u.email.toLowerCase() === signupData.email.toLowerCase())){ return showToast("May account na sa email na yan"); }
    const newUser = { email: signupData.email, password: signupData.password, role: signupData.role, name: signupData.name };
    setUsers([...users, newUser]); setShowSignup(false); showToast(`Account created as ${signupData.role}!`); 
  }
  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <img src={barangayLogo} alt="Barangay Logo" style={styles.logoCircle} />
        <h1 style={styles.loginTitle}>Barangay Management System</h1><p style={styles.loginSubtitle}>{BARANGAY}</p>
        <div style={{background:'#f1f5f9', padding:'10px', borderRadius:'8px', marginBottom:'15px', fontSize:'11px', textAlign:'left'}}><b>Demo:</b><br/> resident@gmail.com / res123<br/> captain@gmail.com / cap123<br/> secretary@gmail.com / sec123</div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(email, password); }}>
          <label style={styles.label}>Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          <label style={styles.label}>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.loginButton}>Login</button>
        </form>
        <p style={styles.signupText}>Don't have an account? <button style={styles.linkButton} onClick={() => setShowSignup(true)}>Sign Up</button></p>
      </div>
      {showSignup && (
        <div style={styles.modalOverlay} onClick={() => setShowSignup(false)}><div style={styles.modal} onClick={e=>e.stopPropagation()}>
          <h3>Create Account</h3><input style={styles.input} placeholder="Full Name" value={signupData.name} onChange={e=>setSignupData({...signupData, name:e.target.value})} />
          <input style={styles.input} placeholder="Email" value={signupData.email} onChange={e=>setSignupData({...signupData, email:e.target.value})} />
          <input style={styles.input} placeholder="Password" type="password" value={signupData.password} onChange={e=>setSignupData({...signupData, password:e.target.value})} />
          <select style={styles.input} value={signupData.role} onChange={e=>setSignupData({...signupData, role:e.target.value})}><option>Resident</option><option>Captain</option><option>Secretary</option></select>
          <button style={styles.primaryButton} onClick={handleSignup}>Sign Up as {signupData.role}</button>
        </div></div>
      )}
    </div>
  );
}

function DashboardModules({ onSelect, logout, user }) {
  const modules = [
    { name: "Resident Dashboard", role: "Resident", icon: "👥", color: COLORS.primary, description: "Nag-request ng documents at tumitingin ng sariling impormasyon." },
    { name: "Captain Dashboard", role: "Captain", icon: "⭐", color: COLORS.secondary, description: "Nag-aapprove at nagre-review ng mga report at request." },
    { name: "Secretary Dashboard", role: "Secretary", icon: "📝", color: COLORS.primary, description: "Nag-eencode, nag-aayos, at nagpo-process ng mga records." },
  ];
  return (
    <div style={styles.modulePage}><header style={styles.moduleTopbar}><div style={styles.brandArea}><img src={barangayLogo} alt="logo" style={styles.smallLogo} /><div><h2 style={styles.brandTitle}>Barangay System</h2><p style={styles.brandSubtitle}>{BARANGAY} | Role: {user.role}</p></div></div><button style={styles.logoutButton} onClick={logout}>Logout</button></header>
      <main style={styles.moduleContent}><div style={styles.moduleGrid}>{modules.map((m) => { const isAllowed = user.role === m.role; return (<div key={m.name} style={{...styles.moduleCard, opacity: isAllowed ? 1 : 0.6, border: isAllowed ? `2px solid ${m.color}` : '1px solid #e2e8f0'}} onClick={() => onSelect(m.name)}>{!isAllowed && <div style={styles.lockedBadge}>🔒 LOCKED</div>}<div style={{ ...styles.moduleIcon, background: `${m.color}18`, color: m.color }}>{m.icon}</div><h2 style={styles.moduleTitle}>{m.name}</h2><p style={styles.moduleDescription}>{m.description}</p><button style={{ ...styles.moduleButton, background: isAllowed ? m.color : '#94a3b8' }}>{isAllowed ? 'Open →' : 'Access Denied'}</button></div>)})}</div></main></div>
  );
}

function DashboardLayout({ user, selectedModule, activePage, setActivePage, logout, backToModules, documents, setDocuments, announcements, setAnnouncements, blotters, setBlotters, showToast }) {
  const role = selectedModule.replace(" Dashboard", "");
  const menuItems = [{ name: "Dashboard", icon: "🏠" }, { name: "Documents", icon: "📄" }, { name: "Announcements", icon: "📢" }, { name: "Blotter Reports", icon: "📋" }];
  return (
    <div style={styles.dashboardLayout}>
      <aside style={styles.sidebar}><div style={styles.sidebarBrand}><img src={barangayLogo} alt="logo" style={styles.sidebarLogo} /><div><h2 style={styles.sidebarTitle}>SAN AGUSTIN</h2><p style={styles.sidebarSubtitle}>{BARANGAY}</p></div></div>
        <nav style={styles.sidebarNav}>{menuItems.map((item) => (<button key={item.name} onClick={() => setActivePage(item.name)} style={{ ...styles.sidebarMenu, ...(activePage === item.name ? styles.sidebarMenuActive : {}) }}><span>{item.icon}</span><span>{item.name}</span></button>))}</nav>
        <div style={styles.sidebarBottom}><button style={styles.changeModuleButton} onClick={backToModules}>Change Module</button><button style={styles.sidebarLogout} onClick={logout}>Logout</button></div>
      </aside>
      <main style={styles.mainContent}><header style={styles.dashboardTopbar}><h1 style={styles.pageTitle}>{activePage} - {role}</h1><div style={styles.dashboardUser}><div style={styles.avatar}>{role.charAt(0)}</div><strong>{user.email}</strong></div></header>
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

function DashboardHome({ role }) {
  return (<div><div style={{...styles.dashboardWelcome, background:`linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`}}><div><h2>Welcome, {role}!</h2><p>{role === 'Captain' ? 'Ikaw ang mag-aapprove at magre-review ng reports.' : role === 'Secretary' ? 'Ikaw ang mag-eencode at magpo-process ng records.' : 'Pwede ka mag-request ng documents at makita status ng request mo.'}</p></div></div></div>);
}

// ===== DOCUMENTS - FINAL ROLE LOGIC =====
function DocumentsPage({ role, documents, setDocuments, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [form, setForm] = useState({ resident: "", type: "Barangay Clearance" });
  const [search, setSearch] = useState("");
  const handleSubmit = () => {
    if (!form.resident) return showToast("Enter resident name");
    const newDoc = { id: `DOC-${String(documents.length+1).padStart(3,'0')}`, resident: form.resident, type: form.type, date: new Date().toLocaleDateString(), status: "Pending" };
    setDocuments([newDoc, ...documents]); setForm({ resident: "", type: "Barangay Clearance" }); setShowForm(false); showToast(`Request Created - Pending for Secretary Verification`);
  };
  const handleStatusChange = (docId, newStatus) => {
    if (newStatus === "Verified" && role !== "Secretary") return showToast("⛔ Secretary lang pwede mag Verified!");
    if ((newStatus === "Approved" || newStatus === "Rejected") && role !== "Captain") return showToast("⛔ Captain lang pwede mag Approve/Reject!");
    setDocuments(documents.map(d=> d.id===docId ? {...d, status:newStatus} : d));
    if(showDetail) setShowDetail({...showDetail, status:newStatus});
    showToast(`Status: ${newStatus}`);
  };
  const filtered = documents.filter(d => d.resident.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={styles.pageHeader}><div><h2>Document Requests</h2><p>{role === 'Resident' ? 'Mag-request at tingnan ang status ng request mo.' : role === 'Secretary' ? 'I-verify at i-process ang mga document requests.' : 'I-approve o i-reject ang mga verified documents.'}</p></div>{role === "Resident" && <button style={styles.primaryButton} onClick={() => setShowForm(!showForm)}>{showForm ? "Close" : "+ New Request"}</button>}</div>
      {showForm && role === "Resident" && (<div style={styles.formCard}><input style={styles.input} placeholder="Resident Name" value={form.resident} onChange={e => setForm({...form, resident:e.target.value})} /><select style={styles.input} value={form.type} onChange={e => setForm({...form, type:e.target.value})}><option>Barangay Clearance</option><option>Certificate of Residency</option><option>Certificate of Indigency</option><option>Business Clearance</option></select><button style={styles.primaryButton} onClick={handleSubmit}>Submit Request</button></div>)}
      <div style={styles.tableCard}><div style={styles.tableWrapper}><table style={styles.table}><thead><tr><th>ID</th><th>Resident</th><th>Type</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map(doc => (<tr key={doc.id}><td>{doc.id}</td><td>{doc.resident}</td><td>{doc.type}</td><td><span style={styles.statusBadge}>{doc.status}</span></td><td><button style={styles.viewButton} onClick={() => setShowDetail(doc)}>View</button></td></tr>))}</tbody></table></div></div>
      {showDetail && (<div style={styles.modalOverlay} onClick={() => setShowDetail(null)}><div style={styles.modal} onClick={e=>e.stopPropagation()}><h3>{showDetail.id}</h3><p>Resident: {showDetail.resident}</p><p>Type: {showDetail.type}</p><p>Status: <b>{showDetail.status}</b></p><div style={{display:'flex', gap:'8px', marginTop:'15px', flexWrap:'wrap'}}>
        {role === "Secretary" && showDetail.status === "Pending" && (<button style={{...styles.primaryButton, background:'#3b82f6', color:'white'}} onClick={() => handleStatusChange(showDetail.id, "Verified")}>✓ Verified (Secretary)</button>)}
        {role === "Captain" && showDetail.status === "Verified" && (<><button style={{...styles.primaryButton, background:'#22c55e', color:'white'}} onClick={() => handleStatusChange(showDetail.id, "Approved")}>✔ Approve (Captain)</button><button style={{...styles.primaryButton, background:'#ef4444', color:'white'}} onClick={() => handleStatusChange(showDetail.id, "Rejected")}>✖ Reject (Captain)</button></>)}
        {role === "Secretary" && showDetail.status !== "Pending" && <div style={styles.infoBox}>Tapos mo na i-verify. Si Captain na bahala mag approve.</div>}
        {role === "Captain" && showDetail.status === "Pending" && <div style={styles.infoBoxError}>⛔ Hintayin ma-verify ni Secretary muna.</div>}
        {role === "Resident" && <div style={styles.infoBox}>Antayin ma-verify ni Secretary at ma-approve ni Captain.</div>}
        <button style={styles.secondaryButton} onClick={() => setShowDetail(null)}>Close</button></div></div></div>)}
    </div>
  );
}

// ===== BLOTTER - FINAL ROLE LOGIC =====
function BlotterReportsPage({ role, blotters, setBlotters, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ complainant:"", incident:"", description:"" });
  
  const handleSubmit = () => {
    if (!form.complainant) return showToast("Enter complainant");
    const newB = { id: `BR-${String(blotters.length+10).padStart(4,'0')}`, complainant: form.complainant, incident: form.incident || "General Complaint", date: new Date().toLocaleDateString(), status: "Pending" };
    setBlotters([newB, ...blotters]); setShowForm(false); setForm({ complainant:"", incident:"", description:"" }); showToast(`Blotter ${newB.id} filed - Pending for Secretary`);
  };

  const handleBlotterStatus = (id, newStatus) => {
    // Secretary = nagpo-process, Captain = nag-aapprove
    if ((newStatus === "Under Review" || newStatus === "Processing") && role !== "Secretary") {
      return showToast("⛔ Si Secretary lang pwede mag-process ng report!");
    }
    if ((newStatus === "Resolved" || newStatus === "Dismissed") && role !== "Captain") {
      return showToast("⛔ Si Captain lang pwede mag-resolve/dismiss!");
    }
    setBlotters(blotters.map(b=> b.id===id ? {...b, status:newStatus}:b));
    if(detail) setDetail({...detail, status:newStatus});
    showToast(`Blotter Status: ${newStatus}`);
  };

  return (
    <div>
      <div style={styles.pageHeader}><div><h2>Blotter Reports - {BARANGAY}</h2><p>{role === 'Resident' ? 'Tumitingin ng sariling impormasyon at report status.' : role === 'Secretary' ? 'Nag-eencode at nagpo-process ng mga blotter records.' : 'Nag-aapprove at nagre-review ng mga report.'}</p></div>
        {/* LAHAT PWEDE MAG FILE PERO RESIDENT MAIN */}
        <button style={styles.primaryButton} onClick={() => setShowForm(!showForm)}>{showForm ? "Close Form" : "+ New Blotter"}</button>
      </div>

      {showForm && (
        <div style={styles.formCard}><h3>Create Blotter Report - {role === 'Secretary' ? 'Encode New Record' : 'File Report'}</h3>
          <input style={styles.input} placeholder="Complainant Name" value={form.complainant} onChange={e=>setForm({...form, complainant:e.target.value})} />
          <input style={styles.input} placeholder="Incident Type (ex: Noise, Dispute)" value={form.incident} onChange={e=>setForm({...form, incident:e.target.value})} />
          <textarea style={styles.textarea} placeholder="Description / Details" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}></textarea>
          <button style={styles.primaryButton} onClick={handleSubmit}>Submit Report</button>
        </div>
      )}

      <div style={styles.tableCard}><div style={styles.tableWrapper}><table style={styles.table}><thead><tr><th>Report ID</th><th>Complainant</th><th>Incident</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>{blotters.map(r => (<tr key={r.id}><td>{r.id}</td><td>{r.complainant}</td><td>{r.incident}</td><td>{r.date}</td><td><span style={{...styles.statusBadge, background: r.status === 'Under Review' ? '#dbeafe' : r.status === 'Resolved' ? '#dcfce7' : r.status === 'Dismissed' ? '#fee2e2' : '#fef9c3'}}>{r.status}</span></td><td><button style={styles.viewButton} onClick={()=>setDetail(r)}>View</button></td></tr>))}</tbody>
      </table></div></div>

      {detail && <div style={styles.modalOverlay} onClick={()=>setDetail(null)}><div style={styles.modal} onClick={e=>e.stopPropagation()}><h3>{detail.id}</h3><p><b>Complainant:</b> {detail.complainant}</p><p><b>Incident:</b> {detail.incident}</p><p><b>Status:</b> {detail.status}</p>
        <div style={{display:'flex', gap:'8px', marginTop:'12px', flexWrap:'wrap'}}>
          
          {/* SECRETARY - ENCODER / PROCESSOR */}
          {role === "Secretary" && detail.status === "Pending" && (
            <button style={{...styles.primaryButton, background:'#3b82f6', color:'white'}} onClick={()=>handleBlotterStatus(detail.id, "Under Review")}>📝 Process / Under Review</button>
          )}
          {role === "Secretary" && detail.status === "Under Review" && (
            <div style={styles.infoBox}>Na-process mo na. Hintayin si Captain mag-review at mag-resolve.</div>
          )}

          {/* CAPTAIN - APPROVER / REVIEWER */}
          {role === "Captain" && detail.status === "Under Review" && (
            <>
              <button style={{...styles.primaryButton, background:'#22c55e', color:'white'}} onClick={()=>handleBlotterStatus(detail.id, "Resolved")}>✔ Approve / Resolved</button>
              <button style={{...styles.primaryButton, background:'#ef4444', color:'white'}} onClick={()=>handleBlotterStatus(detail.id, "Dismissed")}>✖ Dismiss / Reject</button>
            </>
          )}
          {role === "Captain" && detail.status === "Pending" && (
            <div style={styles.infoBoxError}>⛔ Si Secretary muna mag-process nito bago mo i-review.</div>
          )}

          {/* RESIDENT - VIEWER ONLY */}
          {role === "Resident" && (
            <div style={styles.infoBox}>View only - Status: {detail.status}. Si Secretary magpo-process, si Captain mag-aapprove.</div>
          )}

          <button style={styles.secondaryButton} onClick={()=>setDetail(null)}>Close</button>
        </div>
      </div></div>}
    </div>
  );
}

function AnnouncementsPage({ role, announcements, setAnnouncements, showToast }) {
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState({ title: "", date: "", description: "" });
  const canManage = role === "Captain" || role === "Secretary";
  const handlePost = () => {
    if (!form.title) return showToast("Enter title");
    setAnnouncements([{ id: Date.now(), ...form, date: form.date || new Date().toLocaleDateString() }, ...announcements]);
    setForm({ title:"", date:"", description:"" }); setShowForm(false); showToast(`Announcement posted`);
  };
  return (<div><div style={styles.pageHeader}><div><h2>Announcements</h2></div>{canManage && <button style={styles.primaryButton} onClick={() => setShowForm(!showForm)}>{showForm ? "Close" : "+ Add"}</button>}</div>{showForm && canManage && (<div style={styles.formCard}><input style={styles.input} placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} /><input type="date" style={styles.input} value={form.date} onChange={e=>setForm({...form, date:e.target.value})} /><textarea style={styles.textarea} value={form.description} onChange={e=>setForm({...form, description:e.target.value})}></textarea><button style={styles.primaryButton} onClick={handlePost}>Post</button></div>)}<div style={styles.announcementGrid}>{announcements.map(a => (<div style={styles.announcementCard} key={a.id}><div><h3>{a.title}</h3><p>{a.description}</p></div></div>))}</div></div>);
}

const styles = {
  toast: { position:'fixed', top:'20px', right:'20px', background:'#213359', color:'white', padding:'12px 18px', borderRadius:'10px', zIndex:9999, fontSize:'13px' },
  lockedBadge: { position:'absolute', top:'12px', right:'12px', background:'#fee2e2', color:'#dc2626', fontSize:'10px', fontWeight:'bold', padding:'5px 10px', borderRadius:'20px' },
  modalOverlay: { position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px' },
  modal: { background:'white', padding:'25px', borderRadius:'14px', maxWidth:'450px', width:'100%' },
  secondaryButton: { padding:'10px 16px', background:'#f1f5f9', color:'#334155', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' },
  infoBox: { fontSize:'12px', color:'#64748b', padding:'8px', background:'#f1f5f9', borderRadius:'6px', width:'100%' },
  infoBoxError: { fontSize:'12px', color:'#ef4444', padding:'8px', background:'#fef2f2', borderRadius:'6px', width:'100%' },
  loginPage: { minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:`linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}30)`, padding:"20px", fontFamily:"Arial, sans-serif" },
  loginCard: { width:"100%", maxWidth:"430px", background:"#ffffff", padding:"35px", borderRadius:"20px", boxShadow:"0 15px 45px rgba(0, 0, 0, 0.10)", textAlign:"center" },
  logoCircle: { width:"90px", height:"90px", margin:"0 auto 18px", borderRadius:"50%", objectFit:"cover", border:`3px solid ${COLORS.secondary}`, display:"block" },
  loginTitle: { color:COLORS.primary, fontSize:"22px", margin:"0 0 8px" }, loginSubtitle: { color:COLORS.secondary, fontSize:"13px", marginBottom:"15px", fontWeight:'bold' },
  label: { display:"block", textAlign:"left", color:"#334155", fontSize:"13px", fontWeight:"bold", marginBottom:"7px" },
  input: { width:"100%", padding:"13px", marginBottom:"16px", border:"1px solid #cbd5e1", borderRadius:"9px", fontSize:"14px", outline:"none", boxSizing:"border-box" },
  textarea: { width:"100%", minHeight:"100px", padding:"13px", marginBottom:"16px", border:"1px solid #cbd5e1", borderRadius:"9px", fontSize:"14px", boxSizing:"border-box" },
  loginButton: { width:"100%", padding:"14px", background:COLORS.primary, color:"#ffffff", border:"none", borderRadius:"9px", cursor:"pointer", fontWeight:"bold", fontSize:"15px" },
  linkButton: { background:"none", border:"none", color:COLORS.secondary, cursor:"pointer", padding:0, fontSize:"13px", fontWeight:"bold" },
  signupText: { color:"#64748b", fontSize:"13px", marginTop:"25px" },
  modulePage: { minHeight:"100vh", background:"#f8fafc", fontFamily:"Arial, sans-serif" },
  moduleTopbar: { background:"#ffffff", padding:"18px 35px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`2px solid ${COLORS.secondary}` },
  brandArea: { display:"flex", alignItems:"center", gap:"12px" }, smallLogo: { width:"45px", height:"45px", borderRadius:"12px", objectFit:"cover" },
  brandTitle: { margin:0, fontSize:"18px", color:COLORS.primary }, brandSubtitle: { margin:"4px 0 0", fontSize:"11px", color:COLORS.secondary, fontWeight:'bold' },
  logoutButton: { padding:"10px 18px", background:COLORS.secondary, color:COLORS.primary, border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
  moduleContent: { maxWidth:"1150px", margin:"0 auto", padding:"45px 25px" }, moduleGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"25px" },
  moduleCard: { background:"#ffffff", borderRadius:"18px", padding:"32px", textAlign:"center", boxShadow:"0 8px 25px rgba(0,0,0,0.07)", border:"1px solid #e2e8f0", position:'relative' },
  moduleIcon: { width:"85px", height:"85px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"42px" },
  moduleTitle: { color:"#1e293b", fontSize:"21px", marginBottom:"12px" }, moduleDescription: { color:"#64748b", lineHeight:1.6, minHeight:"75px", fontSize:"14px" },
  moduleButton: { marginTop:"18px", padding:"12px 20px", color:"#ffffff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
  dashboardLayout: { display:"flex", minHeight:"100vh", background:"#f8fafc", fontFamily:"Arial, sans-serif" },
  sidebar: { width:"260px", background:COLORS.primary, color:"#ffffff", padding:"24px 16px", display:"flex", flexDirection:"column", borderRight:`3px solid ${COLORS.secondary}` },
  sidebarBrand: { display:"flex", alignItems:"center", gap:"10px", padding:"0 10px 25px", borderBottom:`1px solid ${COLORS.secondary}` },
  sidebarLogo: { width:"43px", height:"43px", borderRadius:"10px", objectFit:"cover", background:"white" }, sidebarTitle: { margin:0, fontSize:"18px", color:"white" }, sidebarSubtitle: { margin:"3px 0 0", color:COLORS.secondary, fontSize:"10px", fontWeight:"bold" },
  sidebarNav: { display:"flex", flexDirection:"column", gap:"7px", marginTop:"20px" }, sidebarMenu: { width:"100%", display:"flex", alignItems:"center", gap:"13px", padding:"13px 14px", background:"transparent", border:"none", borderRadius:"9px", color:"#cbd5e1", cursor:"pointer", textAlign:"left", fontSize:"14px" },
  sidebarMenuActive: { background:COLORS.secondary, color:COLORS.primary, fontWeight:"bold" },
  sidebarBottom: { marginTop:"auto", display:"flex", flexDirection:"column", gap:"10px", paddingTop:"25px" },
  changeModuleButton: { padding:"12px", background:COLORS.primary, color:"#e0f2fe", border:`1px solid ${COLORS.secondary}`, borderRadius:"8px", cursor:"pointer" },
  sidebarLogout: { padding:"12px", background:COLORS.primary, color:"#ffffff", border:`1px solid ${COLORS.secondary}`, borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
  mainContent: { flex:1, minWidth:0 }, dashboardTopbar: { background:"#ffffff", padding:"25px 35px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #e2e8f0" },
  pageTitle: { margin:0, color:COLORS.primary, fontSize:"22px" }, dashboardUser: { display:"flex", alignItems:"center", gap:"10px" },
  avatar: { width:"42px", height:"42px", borderRadius:"50%", background:COLORS.secondary, color:COLORS.primary, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold", fontSize:"18px" },
  pageContent: { padding:"30px 35px" }, dashboardWelcome: { color:"#ffffff", borderRadius:"16px", padding:"25px", marginBottom:"25px" },
  pageHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", gap:"15px", flexWrap:"wrap", marginBottom:"25px" },
  primaryButton: { padding:"12px 18px", background:COLORS.secondary, color:COLORS.primary, border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" },
  formCard: { background:"#ffffff", padding:"25px", borderRadius:"14px", border:"1px solid #e2e8f0", marginBottom:"25px", maxWidth:"650px" },
  tableCard: { background:"#ffffff", borderRadius:"14px", border:"1px solid #e2e8f0", padding:"22px" }, tableWrapper: { overflowX:"auto" }, table: { width:"100%", borderCollapse:"collapse", minWidth:"750px" },
  statusBadge: { display:"inline-block", padding:"6px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:"bold", background:'#dcfce7', color:COLORS.primary },
  viewButton: { padding:"7px 13px", background:'#dcfce7', color:COLORS.primary, border:"none", borderRadius:"6px", cursor:"pointer", fontWeight:"bold" },
  announcementGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"20px" }, announcementCard: { background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:"14px", padding:"22px" },
};
