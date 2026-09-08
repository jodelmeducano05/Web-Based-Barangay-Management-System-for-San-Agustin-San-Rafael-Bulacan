import React, { useState } from "react";

const styles = `
* { box-sizing: border-box; } body { margin: 0; font-family: Inter, ui-sans-serif, system-ui; background: #f4f8fc; color: #17243a; }
button,input,select,textarea{font:inherit} button{cursor:pointer}
.login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f6f8ff,#eefbfd);padding:24px}
.login-card{width:430px;background:#fff;border:1px solid #e4e9f0;border-radius:14px;padding:34px;box-shadow:0 10px 35px rgba(18,43,76,.08)}
.logo{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#eaffed;border:3px solid #39d46d;color:#075a28;font-weight:800;margin:auto}
.role-row{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.role-btn{height:38px;background:white;border:1px solid #d6dce5;border-radius:7px;font-size:12px;font-weight:600}
.role-btn.active{background:#092451;color:white}
.input{width:100%;height:42px;border:1px solid #d4dbe5;border-radius:7px;padding:0 12px}
.primary{border:0;background:#092451;color:#fff;border-radius:7px;height:42px;padding:0 17px;font-weight:700}
.primary.full{width:100%}
.layout{min-height:100vh;display:flex}
.sidebar{width:250px;background:#092451;color:#cdd8eb;display:flex;flex-direction:column;padding:25px 14px 14px}
.nav-btn{width:100%;height:42px;border:0;background:transparent;color:#b9c5d9;border-radius:6px;text-align:left;padding:0 12px;margin:3px 0;display:flex;gap:11px;align-items:center;font-size:12px}
.nav-btn:hover{background:rgba(255,255,255,.08);color:#fff}
.nav-btn.active{background:#57f58b;color:#073d20;font-weight:800}
.sidebar-bottom{margin-top:auto;border-top:1px solid rgba(255,255,255,.12);padding-top:10px}
.main{flex:1;min-width:0}
.topbar{height:58px;background:#fff;border-bottom:1px solid #dfe5ed;display:flex;align-items:center;justify-content:space-between;padding:0 24px}
.search{width:330px;height:34px;border:1px solid #d4dbe5;border-radius:7px;background:#f8fafc;padding:0 12px;display:flex;align-items:center}
.search input{border:0;outline:0;background:transparent;width:100%}
.content{padding:20px;max-width:1180px;margin:auto}
.page-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.welcome{background:#fff;border:1px solid #e2e8f0;border-radius:13px;padding:25px 28px;display:flex;justify-content:space-between;align-items:center}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}
.stat-card{background:#fff;border:1px solid #e1e7ef;border-radius:10px;padding:14px;cursor:pointer}
.stat-card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.06)}
.stat-card b{font-size:22px;display:block}
.panel{background:#fff;border:1px solid #e1e7ef;border-radius:11px;overflow:hidden;margin-bottom:14px}
.panel-head{padding:15px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #edf0f4}
.table{width:100%;border-collapse:collapse;font-size:11px}
.table th{background:#f5f7fa;color:#667085;text-align:left;font-size:9px;padding:10px 12px}
.table td{padding:12px;border-top:1px solid #edf0f4}
.status{display:inline-flex;padding:5px 9px;border-radius:14px;font-size:9px;font-weight:700}
.pending{background:#dfe7f7;color:#37557d} .resolved{background:#d5f9df;color:#16813d} .processing{background:#fff0c7;color:#9a6500} .ready{background:#d6fae1;color:#14753a}
.filter{border:1px solid #d6dde7;background:#fff;border-radius:16px;padding:6px 12px;font-size:10px;font-weight:700}
.filter.active{background:#092451;color:#fff}
.form-card{background:#fff;border:1px solid #e1e7ef;border-radius:10px;padding:15px}
.select,.textarea{width:100%;border:1px solid #d4dbe5;border-radius:7px;background:#f8fafc;padding:10px;font-size:11px}
.select{height:39px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.form-layout{display:grid;grid-template-columns:1fr 285px;gap:14px}
.grid-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.action-card{background:#fff;border:1px solid #e1e7ef;border-radius:11px;padding:15px;min-height:110px;text-align:left}
.action-card:hover{box-shadow:0 8px 22px rgba(0,0,0,.08)}
.label{font-size:11px;font-weight:700;display:block;margin:10px 0 6px}
.modal-bg{position:fixed;inset:0;background:rgba(8,20,40,.45);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px}
.modal{background:#fff;border-radius:12px;padding:20px;width:480px;max-width:100%}
.toast{position:fixed;right:20px;bottom:20px;background:#092451;color:white;padding:12px 16px;border-radius:8px;font-size:11px;z-index:99}
.announcement-grid{display:grid;grid-template-columns:2fr 1fr;gap:12px}
.feature{background:#fff;border:1px solid #e0e6ee;border-radius:10px;display:grid;grid-template-columns:43% 57%;min-height:185px;overflow:hidden}
.feature-img{background:linear-gradient(135deg,#c9d9e7,#eef4f8);display:flex;align-items:center;justify-content:center;font-size:40px}
`;

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "requests", label: "Document Requests" },
  { id: "announcements", label: "Announcements" },
  { id: "blotter", label: "Blotter Reports" },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Secretary");
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);

  const [requests, setRequests] = useState([
    { id: "#REQ-2023-089", name: "Maria Santos", type: "Barangay Clearance", date: "Oct 24, 2023", status: "Processing" },
    { id: "#REQ-2023-088", name: "Juan Dela Cruz", type: "Certificate of Indigency", date: "Oct 22, 2023", status: "Pending Review" },
    { id: "#REQ-2023-085", name: "Pedro Reyes", type: "Business Permit", date: "Oct 15, 2023", status: "Ready for Pickup" },
    { id: "#REQ-2023-042", name: "Ana Cruz", type: "Community Tax", date: "Sep 01, 2023", status: "Completed" },
  ]);

  const [blotter, setBlotter] = useState([
    { id: "BLT-2023-089", date: "Oct 24, 2023", complainant: "Juan Dela Cruz", respondent: "Pedro Santos", type: "Noise Complaint", status: "Under Review" },
    { id: "BLT-2023-088", date: "Oct 22, 2023", complainant: "Maria Clara", respondent: "Ana Reyes", type: "Dispute", status: "Resolved" },
    { id: "BLT-2023-085", date: "Oct 15, 2023", complainant: "Jose Rizal", respondent: "Unknown", type: "Theft", status: "For Mediation" },
  ]);

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(""), 2000); };

  if (!loggedIn) {
    return (
      <>
        <style>{styles}</style>
        <div className="login-page">
          <div className="login-card">
            <div className="logo">✿</div>
            <h1 style={{textAlign:'center', fontSize:20}}>Barangay Management System</h1>
            <label className="label">Select your role</label>
            <div className="role-row">
              {["Resident","Captain","Secretary"].map(r=>(
                <button key={r} className={`role-btn ${role===r?'active':''}`} onClick={()=>setRole(r)}>{r}</button>
              ))}
            </div>
            <label className="label">Username</label><input className="input" placeholder="Username" />
            <label className="label">Password</label><input className="input" type="password" placeholder="Password" />
            <button className="primary full" style={{marginTop:16}} onClick={()=>setLoggedIn(true)}>Sign In as {role} ↪</button>
          </div>
        </div>
      </>
    );
  }

  let screen = null;

  if (page === "dashboard") {
    if (role === "Secretary") {
      screen = (
        <>
          <div className="welcome">
            <div><h1 style={{margin:0}}>Secretary's Dashboard</h1><p style={{fontSize:12, color:'#6b7280'}}>Good morning! Here's what's happening today.</p></div>
            <button className="primary" onClick={()=>setPage('requests')}>+ New Request</button>
          </div>
          <div className="stat-grid">
            <div className="stat-card" onClick={()=>setPage('requests')}><b>35</b>Total Requests</div>
            <div className="stat-card" onClick={()=>setPage('requests')}><b>8</b>Pending Review</div>
            <div className="stat-card" onClick={()=>setPage('blotter')}><b>5</b>Blotter Active</div>
            <div className="stat-card" onClick={()=>setPage('announcements')}><b>3</b>New Announcements</div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 300px', gap:14}}>
            <div className="panel">
              <div className="panel-head"><h3>Document Request Queue</h3><button className="filter" onClick={()=>setPage('requests')}>View All</button></div>
              <table className="table">
                <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Status</th></tr></thead>
                <tbody>{requests.map(r=><tr key={r.id} style={{cursor:'pointer'}} onClick={()=>setModal({type:'view-request', data:r})}><td>{r.id}</td><td>{r.name}</td><td>{r.type}</td><td><span className="status">{r.status}</span></td></tr>)}</tbody>
              </table>
            </div>
            <div className="panel" style={{padding:15}}>
              <h3>Quick Actions</h3>
              <button className="primary full" style={{marginBottom:8}} onClick={()=>setPage('announcements')}>Create Announcement</button>
              <button className="primary full" style={{background:'#fff', color:'#092451', border:'1px solid #d4dbe5'}} onClick={()=>setPage('blotter')}>View Blotter</button>
              <h4 style={{marginTop:16, fontSize:12}}>Recent Actions</h4>
              <p style={{fontSize:10, color:'#6b7280', cursor:'pointer'}} onClick={()=>showToast("Action viewed")}>✓ Approved #REQ-088 - 2h ago</p>
            </div>
          </div>
        </>
      );
    } else if (role === "Captain") {
      screen = (
        <>
          <div className="welcome"><div><h1 style={{margin:0}}>Good Morning, Captain</h1><p style={{fontSize:12, color:'#6b7280'}}>System overview for San Agustin</p></div><button className="primary" onClick={()=>showToast("Generating report...")}>Generate Report</button></div>
          <div className="stat-grid">
            <div className="stat-card" onClick={()=>setPage('requests')}><b>84</b>Residents Served</div>
            <div className="stat-card" onClick={()=>setPage('blotter')}><b>15</b>Blotter Cases</div>
            <div className="stat-card" onClick={()=>setPage('announcements')}><b>7</b>Announcements</div>
            <div className="stat-card"><b>3</b>Pending Signatures</div>
          </div>
          <div className="panel">
            <div className="panel-head"><h3>Recent Blotter Reports</h3><button className="filter" onClick={()=>setPage('blotter')}>View All</button></div>
            <table className="table"><thead><tr><th>Case ID</th><th>Complainant</th><th>Type</th><th>Status</th></tr></thead>
            <tbody>{blotter.map(b=><tr key={b.id} onClick={()=>setModal({type:'view-blotter', data:b})} style={{cursor:'pointer'}}><td>{b.id}</td><td>{b.complainant}</td><td>{b.type}</td><td><span className="status">{b.status}</span></td></tr>)}</tbody></table>
          </div>
        </>
      );
    } else {
      screen = (
        <>
          <div className="welcome"><div><h1 style={{margin:0}}>Welcome back, Maria!</h1><p style={{fontSize:12, color:'#6b7280'}}>Your resident dashboard</p></div></div>
          <div className="grid-actions" style={{marginTop:16}}>
            <button className="action-card" onClick={()=>setPage('requests')}><h3>Request Document</h3><p style={{fontSize:11, color:'#6b7280'}}>Barangay clearance, indigency</p></button>
            <button className="action-card" onClick={()=>setPage('blotter')}><h3>File Blotter</h3><p style={{fontSize:11, color:'#6b7280'}}>Report incident</p></button>
            <button className="action-card" onClick={()=>setPage('announcements')}><h3>Announcements</h3><p style={{fontSize:11, color:'#6b7280'}}>View updates</p></button>
          </div>
        </>
      );
    }
  }

  if (page === "requests") {
    screen = (
      <div className="panel">
        <div className="panel-head"><div><h2 style={{margin:0}}>Document Requests</h2><p style={{fontSize:11, color:'#6b7280', margin:0}}>Manage and track - 142 Total, 18 Pending, 34 Ready</p></div><button className="primary" onClick={()=>setModal({type:'new-request'})}>⊕ New Request</button></div>
        <table className="table">
          <thead><tr><th>REQUEST ID</th><th>DOCUMENT TYPE</th><th>DATE</th><th>STATUS</th><th>ACTION</th></tr></thead>
          <tbody>{requests.map(r=><tr key={r.id}><td><b>{r.id}</b></td><td>{r.type}</td><td>{r.date}</td><td><span className="status">{r.status}</span></td><td><button className="filter" onClick={()=>setModal({type:'view-request', data:r})}>View</button><button className="filter" style={{marginLeft:6}} onClick={()=>{setRequests(requests.map(x=>x.id===r.id?{...x, status:'Ready for Pickup'}:x)); showToast("Approved!")}}>Approve</button></td></tr>)}</tbody>
        </table>
      </div>
    );
  }

  if (page === "blotter") {
    screen = (
      <div className="panel">
        <div className="panel-head"><h2>Blotter Management</h2><button className="primary" onClick={()=>setModal({type:'new-blotter'})}>+ File New Blotter Report</button></div>
        <div style={{padding:12, display:'flex', gap:8}}><select className="select" style={{width:120}}><option>All Status</option></select><select className="select" style={{width:120}}><option>All Type</option></select></div>
        <table className="table">
          <thead><tr><th>CASE ID</th><th>DATE FILED</th><th>COMPLAINANT</th><th>TYPE</th><th>STATUS</th><th>ACTION</th></tr></thead>
          <tbody>{blotter.map(b=><tr key={b.id}><td>{b.id}</td><td>{b.date}</td><td>{b.complainant}</td><td>{b.type}</td><td><span className="status">{b.status}</span></td><td><button className="filter" onClick={()=>setModal({type:'view-blotter', data:b})}>View</button></td></tr>)}</tbody>
        </table>
      </div>
    );
  }

  if (page === "announcements") {
    screen = (
      <>
        <div className="page-head"><h1>Community Announcements</h1><button className="primary" onClick={()=>setModal({type:'new-announcement'})}>+ Post Announcement</button></div>
        <div className="announcement-grid">
          <div className="feature">
            <div className="feature-img">🚧</div>
            <div style={{padding:15}}><span style={{background:'#ffe1dc', color:'#bd3528', fontSize:8, padding:'4px 6px', borderRadius:4, fontWeight:800}}>Urgent Alert</span><h2 style={{fontSize:16}}>Main Street Water Main Repair Schedule</h2><p style={{fontSize:11, color:'#6b7280'}}>Emergency repairs on main water line...</p><button className="filter" onClick={()=>showToast("Full details opened")}>Read Full Details →</button></div>
          </div>
          <div className="form-card" onClick={()=>showToast("Vaccine drive details")} style={{cursor:'pointer'}}><b style={{fontSize:10}}>PUBLIC HEALTH</b><h3>Annual Flu Vaccine Drive</h3><p style={{fontSize:11, color:'#6b7280'}}>Free flu vaccinations at Community Center...</p></div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:12}}>
          <div className="form-card" style={{cursor:'pointer'}} onClick={()=>showToast("Festival details")}><h3>Autumn Festival in Centennial Park</h3></div>
          <div className="form-card" style={{cursor:'pointer'}} onClick={()=>showToast("Zoning forum")}><h3>Open Forum: Zoning Ordinance Updates</h3></div>
          <div className="form-card" style={{cursor:'pointer'}} onClick={()=>showToast("Waste schedule")}><h3>Holiday Waste Collection Schedule</h3></div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="layout">
        <aside className="sidebar">
          <div style={{fontWeight:800, color:'#fff', marginBottom:20}}>Barangay Management System</div>
          <nav>
            {navItems.map(i=>(
              <button key={i.id} className={`nav-btn ${page===i.id?'active':''}`} onClick={()=>setPage(i.id)}>{i.label}</button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <button className="nav-btn" onClick={()=>showToast("Settings opened")}>⚙ Settings</button>
            <button className="nav-btn" onClick={()=>setLoggedIn(false)}>↪ Sign Out ({role})</button>
          </div>
        </aside>
        <main className="main">
          <header className="topbar"><div className="search"><input placeholder="Search records, docs..." /></div><span>{role}</span></header>
          <div className="content">{screen}</div>
        </main>
      </div>

      {modal && (
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            {modal.type==='view-request' && <>
              <h3>{modal.data.id}</h3><p style={{fontSize:12}}>{modal.data.name}<br/>{modal.data.type} - {modal.data.status}</p>
              <button className="primary full" onClick={()=>setModal(null)}>Close</button>
            </>}
            {modal.type==='new-request' && <>
              <h3>Request a Document</h3>
              <label className="label">Full Name</label><input className="input" placeholder="Juan Dela Cruz" />
              <label className="label">Document Type</label><select className="select"><option>Barangay Clearance</option><option>Indigency</option><option>Business Permit</option></select>
              <button className="primary full" style={{marginTop:12}} onClick={()=>{setModal(null); showToast("Request Submitted!")}}>Submit Request</button>
            </>}
            {modal.type==='view-blotter' && <>
              <h3>{modal.data.id}</h3><p style={{fontSize:12}}>{modal.data.complainant} vs {modal.data.respondent}<br/>{modal.data.type}</p>
              <button className="primary full" onClick={()=>setModal(null)}>Close</button>
            </>}
            {modal.type==='new-blotter' && <>
              <h3>File a New Blotter Report</h3>
              <p style={{fontSize:11, color:'#6b7280'}}>1. Incident Details - lahat napipindot</p>
              <label className="label">Incident Type</label><select className="select"><option>Noise Complaint</option><option>Dispute</option><option>Theft</option></select>
              <div className="form-row" style={{marginTop:8}}>
                <div><label className="label">Date</label><input className="input" type="date" /></div>
                <div><label className="label">Time</label><input className="input" type="time" /></div>
              </div>
              <label className="label">Location</label><input className="input" placeholder="Specific address..." />
              <label className="label" style={{marginTop:12}}>2. Complainant & Respondent Info</label>
              <div className="form-row">
                <div><input className="input" placeholder="Respondent Name" /></div>
                <div><input className="input" placeholder="Relationship" /></div>
              </div>
              <label className="label">3. Incident Narrative</label><textarea className="textarea" placeholder="Describe what happened..." />
              <button className="primary full" style={{marginTop:12}} onClick={()=>{setModal(null); showToast("Blotter Report Submitted!")}}>Submit Blotter Report</button>
            </>}
            {modal.type==='new-announcement' && <>
              <h3>Post Public Announcement</h3>
              <input className="input" placeholder="Title" />
              <textarea className="textarea" style={{marginTop:8, minHeight:100}} placeholder="Content..." />
              <button className="primary full" style={{marginTop:10}} onClick={()=>{setModal(null); showToast("Published!")}}>Publish</button>
            </>}
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default App;
