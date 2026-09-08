import React, { useState } from "react";

const styles = `
/* === EXISTING STYLES MO + NEW === */
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, ui-sans-serif, system-ui; background: #f4f8fc; color: #17243a; }
button, input, select, textarea { font: inherit; } button { cursor: pointer; }

/* LOGIN */
.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f6f8ff, #eefbfd); padding: 24px; }
.login-card { width: 430px; background: #fff; border: 1px solid #e4e9f0; border-radius: 14px; box-shadow: 0 10px 35px rgba(18,43,76,.08); padding: 34px; }
.logo { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #eaffed; border: 3px solid #39d46d; color: #075a28; font-size: 23px; font-weight: 800; margin: auto; }
.login-title { text-align: center; font-size: 20px; margin: 12px auto 6px; max-width: 170px; }
.login-sub { text-align: center; color: #6b7280; font-size: 13px; margin-bottom: 24px; }
.label { font-size: 12px; font-weight: 700; color: #243047; display: block; margin: 12px 0 7px; }
.role-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
.role-btn { height: 38px; background: white; border: 1px solid #d6dce5; border-radius: 7px; color: #4b5563; font-size: 12px; font-weight: 600; }
.role-btn.active { background: #092451; color: white; border-color: #092451; }
.input-wrap { position: relative; }
.input { width: 100%; height: 42px; border: 1px solid #d4dbe5; background: #fff; border-radius: 7px; padding: 0 40px 0 38px; outline: none; }
.input-icon { position: absolute; left: 13px; top: 11px; color: #8b95a5; }
.eye { position: absolute; right: 12px; top: 10px; border: 0; background: transparent; }
.primary { border: 0; background: #092451; color: #fff; border-radius: 7px; height: 42px; padding: 0 17px; font-weight: 700; }
.primary.full { width: 100%; }

/* LAYOUT */
.layout { min-height: 100vh; display: flex; }
.sidebar { width: 250px; background: #092451; color: #cdd8eb; display: flex; flex-direction: column; padding: 25px 14px 14px; flex-shrink: 0; }
.brand { display: flex; gap: 10px; align-items: center; padding: 0 8px 25px; border-bottom: 1px solid rgba(255,255,255,.12); }
.brand .logo { margin: 0; width: 36px; height: 36px; font-size: 17px; border-width: 2px; }
.brand-text { font-size: 14px; font-weight: 800; color: #fff; line-height: 1.15; }
.nav { padding-top: 20px; }
.nav-btn { width: 100%; height: 42px; border: 0; background: transparent; color: #b9c5d9; border-radius: 6px; text-align: left; padding: 0 12px; margin: 3px 0; font-size: 12px; display: flex; align-items: center; gap: 11px; }
.nav-btn:hover { background: rgba(255,255,255,.08); color: #fff; }
.nav-btn.active { background: #57f58b; color: #073d20; font-weight: 800; }
.sidebar-bottom { margin-top: auto; border-top: 1px solid rgba(255,255,255,.12); padding-top: 10px; }
.main { flex: 1; min-width: 0; }
.topbar { height: 58px; background: #fff; border-bottom: 1px solid #dfe5ed; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
.search { width: 330px; height: 34px; border: 1px solid #d4dbe5; border-radius: 7px; background: #f8fafc; padding: 0 12px 0 34px; position: relative; font-size: 12px; }
.search input { border: 0; outline: 0; background: transparent; width: 100%; height: 100%; }
.content { padding: 20px; max-width: 1180px; margin: auto; }
.page-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-head h1 { margin: 0; font-size: 24px; }

/* DASHBOARD SHARED */
.welcome { background: #fff; border: 1px solid #e2e8f0; border-radius: 13px; padding: 25px 28px; display: flex; align-items: center; justify-content: space-between; }
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 18px 0; }
.stat-card { background: #fff; border: 1px solid #e1e7ef; border-radius: 10px; padding: 14px; }
.stat-card b { font-size: 22px; display: block; }
.stat-card span { font-size: 11px; color: #6b7280; }
.panel { background: #fff; border: 1px solid #e1e7ef; border-radius: 11px; overflow: hidden; }
.panel-head { padding: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #edf0f4; }
.table { width: 100%; border-collapse: collapse; font-size: 11px; }
.table th { background: #f5f7fa; color: #667085; text-align: left; font-size: 9px; padding: 10px 12px; }
.table td { padding: 12px; border-top: 1px solid #edf0f4; }
.status { display: inline-flex; padding: 5px 9px; border-radius: 14px; font-size: 9px; font-weight: 700; }
.pending { background: #dfe7f7; color: #37557d; } .resolved { background: #d5f9df; color: #16813d; } .processing { background: #fff0c7; color: #9a6500; }
.filter { border: 1px solid #d6dde7; background: #fff; border-radius: 16px; padding: 6px 12px; font-size: 10px; font-weight: 700; }
.filter.active { background: #092451; color: #fff; }
.form-card { background: #fff; border: 1px solid #e1e7ef; border-radius: 10px; padding: 15px; }
.select, .textarea { width: 100%; border: 1px solid #d4dbe5; border-radius: 7px; background: #f8fafc; padding: 10px; font-size: 11px; }
.select { height: 39px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-layout { display: grid; grid-template-columns: 1fr 285px; gap: 14px; }
.guide { background: #092451; color: #fff; border-radius: 9px; padding: 16px; font-size: 11px; }
`;

const blotterData = [
  { id: "BLT-2023-089", date: "Oct 24, 2023", complainant: "Juan Dela Cruz", respondent: "Pedro Santos", type: "Noise Complaint", status: "Under Review" },
  { id: "BLT-2023-088", date: "Oct 22, 2023", complainant: "Maria Clara", respondent: "Ana Reyes", type: "Dispute", status: "Resolved" },
  { id: "BLT-2023-085", date: "Oct 15, 2023", complainant: "Jose Rizal", respondent: "Unknown", type: "Theft", status: "For Mediation" },
];

// ... DAGDAG NA COMPONENTS PARA SA SCREENSHOTS

function BlotterManagement() {
  return (
    <div className="content">
      <div className="page-head">
        <h1>Blotter Reports</h1>
        <button className="primary">+ File Blotter Report</button>
      </div>
      <div className="panel">
        <div className="panel-head">
          <div style={{display:'flex', gap:8}}>
            <select className="select" style={{width:120, height:32}}><option>All Status</option></select>
            <select className="select" style={{width:120, height:32}}><option>All Type</option></select>
          </div>
          <div className="search" style={{width:200}}><input placeholder="Search case..." /></div>
        </div>
        <table className="table">
          <thead><tr><th>CASE ID</th><th>DATE FILED</th><th>COMPLAINANT</th><th>TYPE</th><th>STATUS</th><th>ACTION</th></tr></thead>
          <tbody>
            {blotterData.map(b=>(
              <tr key={b.id}><td><b>{b.id}</b></td><td>{b.date}</td><td>{b.complainant}</td><td>{b.type}</td><td><span className="status pending">{b.status}</span></td><td>View</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SecretaryDashboard({ setPage }) {
  return (
    <div className="content">
      <div className="welcome">
        <div><h1>Secretary's Dashboard</h1><p>Good morning! Here's what's happening today.</p></div>
        <button className="primary" onClick={()=>setPage('requests')}>+ New Request</button>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><b>142</b><span>Total Requests</span></div>
        <div className="stat-card"><b>18</b><span>Pending Review</span></div>
        <div className="stat-card"><b>34</b><span>For Pickup</span></div>
        <div className="stat-card"><b>5</b><span>Blotter Active</span></div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 300px', gap:14}}>
        <div className="panel">
          <div className="panel-head"><h3>Document Request Queue</h3><button onClick={()=>setPage('requests')}>View All</button></div>
          <table className="table"><thead><tr><th>ID</th><th>NAME</th><th>TYPE</th><th>STATUS</th></tr></thead>
          <tbody><tr><td>#REQ-089</td><td>Maria Santos</td><td>Clearance</td><td><span className="status processing">Processing</span></td></tr></tbody></table>
        </div>
        <div className="panel" style={{padding:15}}>
          <h3>Quick Post</h3>
          <button className="primary full" onClick={()=>setPage('announcements')}>Create Announcement</button>
        </div>
      </div>
    </div>
  )
}

function CaptainDashboard({ setPage }) {
  return (
    <div className="content">
      <div className="welcome"><div><h1>Good Morning, Captain</h1><p>System overview for today.</p></div><button className="primary">Generate Report</button></div>
      <div className="stat-grid">
        <div className="stat-card"><b>84</b><span>Residents</span></div>
        <div className="stat-card"><b>15</b><span>Blotter Cases</span></div>
        <div className="stat-card"><b>7</b><span>Announcements</span></div>
      </div>
    </div>
  )
}

function AnnouncementCreate() {
  return (
    <div className="content">
      <h1>Post Public Announcement</h1>
      <div className="form-layout">
        <div className="form-card">
          <label className="label">Announcement Title</label><input className="input" placeholder="e.g., Water Interruption..." />
          <div className="form-row"><div><label className="label">Category</label><select className="select"><option>Infrastructure</option><option>Events</option></select></div><div><label className="label">Priority</label><select className="select"><option>Normal</option><option>Urgent</option></select></div></div>
          <label className="label">Content</label><textarea className="textarea" style={{minHeight:140}} placeholder="Write announcement..." />
          <div style={{marginTop:14, display:'flex', justifyContent:'flex-end', gap:8}}><button className="filter">Save as Draft</button><button className="primary">Publish Announcement</button></div>
        </div>
        <div className="form-card"><h3>Publishing</h3><p style={{fontSize:11, color:'#6b7280'}}>This will be visible to all residents on their dashboard.</p></div>
      </div>
    </div>
  )
}

// --- MAIN APP LOGIC ---
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Resident");
  const [page, setPage] = useState("dashboard");

  if (!loggedIn) {
    return <><style>{styles}</style>
      <div className="login-page"><div className="login-card">
        <div className="logo">✿</div>
        <h1 className="login-title">Barangay Management System</h1>
        <div className="role-row">
          {["Resident","Captain","Secretary"].map(r=>(
            <button key={r} className={`role-btn ${role===r?'active':''}`} onClick={()=>setRole(r)}>{r}</button>
          ))}
        </div>
        <label className="label">Username</label><input className="input" placeholder="Enter username" />
        <label className="label">Password</label><input className="input" type="password" placeholder="Password" />
        <button className="primary full" style={{marginTop:16}} onClick={()=>setLoggedIn(true)}>Sign In as {role} ↪</button>
      </div></div>
    </>
  }

  let screen;
  if (role === "Secretary" && page === "dashboard") screen = <SecretaryDashboard setPage={setPage} />;
  else if (role === "Captain" && page === "dashboard") screen = <CaptainDashboard setPage={setPage} />;
  else if (page === "blotter") screen = role !== "Resident" ? <BlotterManagement /> : <div className="content">File Blotter (Resident)</div>;
  else if (page === "announcements") screen = role !== "Resident" ? <AnnouncementCreate /> : <div className="content">Announcements Feed</div>;
  else screen = <SecretaryDashboard setPage={setPage} />;

  if(role === "Resident") {
     // gamitin mo yung original Dashboard/Requests mo dito
     screen = <div className="content"><h1>Welcome back, Resident!</h1><p>Role: {role} - Original Resident UI mo dito.</p></div>
     if(page==='blotter') screen = <BlotterManagement />
     if(page==='requests') screen = <div className="content"><h1>Document Requests</h1></div>
  }

  return <>
    <style>{styles}</style>
    <div className="layout">
      <aside className="sidebar">
        <div className="brand"><div className="logo">✿</div><div className="brand-text">Barangay<br/>Management<br/>System</div></div>
        <nav className="nav">
          {[
            {id:'dashboard', label:'Dashboard'},
            {id:'requests', label:'Document Requests'},
            {id:'announcements', label:'Announcements'},
            {id:'blotter', label:'Blotter Reports'},
          ].map(i=><button key={i.id} className={`nav-btn ${page===i.id?'active':''}`} onClick={()=>setPage(i.id)}>{i.label}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className="nav-btn" onClick={()=>setLoggedIn(false)}>Sign Out</button></div>
      </aside>
      <main className="main"><header className="topbar"><div className="search"><input placeholder="Search records..." /></div></header>{screen}</main>
    </div>
  </>
}
