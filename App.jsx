import React, { useState } from "react";

const styles = `
* { box-sizing: border-box; } body { margin: 0; font-family: Inter, system-ui; background: #f4f8fc; color: #17243a; }
button,input,select,textarea{font:inherit} button{cursor:pointer}
.login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f6f8ff,#eefbfd);padding:24px}
.login-card{width:430px;background:#fff;border:1px solid #e4e9f0;border-radius:14px;box-shadow:0 10px 35px rgba(18,43,76,.08);padding:34px}
.logo{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#eaffed;border:3px solid #39d46d;color:#075a28;font-weight:800;margin:auto}
.login-title{text-align:center;font-size:20px;margin:12px auto 6px}
.login-sub{text-align:center;color:#6b7280;font-size:13px;margin-bottom:24px}
.label{font-size:12px;font-weight:700;display:block;margin:12px 0 7px}
.role-row{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.role-btn{height:38px;background:white;border:1px solid #d6dce5;border-radius:7px;font-size:12px;font-weight:600}
.role-btn.active{background:#092451;color:white;border-color:#092451}
.input{width:100%;height:42px;border:1px solid #d4dbe5;border-radius:7px;padding:0 12px;outline:none}
.primary{border:0;background:#092451;color:#fff;border-radius:7px;height:42px;padding:0 17px;font-weight:700}
.primary.full{width:100%}
.layout{min-height:100vh;display:flex}
.sidebar{width:250px;background:#092451;color:#cdd8eb;display:flex;flex-direction:column;padding:25px 14px 14px;flex-shrink:0}
.brand{display:flex;gap:10px;align-items:center;padding:0 8px 25px;border-bottom:1px solid rgba(255,255,255,.12)}
.brand .logo{margin:0;width:36px;height:36px;font-size:17px;border-width:2px}
.brand-text{font-size:14px;font-weight:800;color:#fff;line-height:1.15}
.nav{padding-top:20px}
.nav-btn{width:100%;height:42px;border:0;background:transparent;color:#b9c5d9;border-radius:6px;text-align:left;padding:0 12px;margin:3px 0;font-size:12px;display:flex;align-items:center;gap:11px}
.nav-btn:hover{background:rgba(255,255,255,.08);color:#fff}
.nav-btn.active{background:#57f58b;color:#073d20;font-weight:800}
.sidebar-bottom{margin-top:auto;border-top:1px solid rgba(255,255,255,.12);padding-top:10px}
.main{flex:1;min-width:0}
.topbar{height:58px;background:#fff;border-bottom:1px solid #dfe5ed;display:flex;align-items:center;justify-content:space-between;padding:0 24px}
.search{width:330px;height:34px;border:1px solid #d4dbe5;border-radius:7px;background:#f8fafc;padding:0 12px 0 34px;position:relative;font-size:12px;display:flex;align-items:center}
.search input{border:0;outline:0;background:transparent;width:100%}
.search span{position:absolute;left:11px}
.content{padding:20px;max-width:1180px;margin:auto}
.page-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.page-head h1{margin:0;font-size:24px}
.welcome{background:#fff;border:1px solid #e2e8f0;border-radius:13px;padding:25px 28px;display:flex;justify-content:space-between;align-items:center}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}
.stat-card{background:#fff;border:1px solid #e1e7ef;border-radius:10px;padding:14px;cursor:pointer;transition:.15s}
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
.action-card{background:#fff;border:1px solid #e1e7ef;border-radius:11px;padding:15px;min-height:130px;text-align:left;transition:.15s}
.action-card:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.08)}
.action-icon{width:32px;height:32px;border-radius:7px;display:flex;align-items:center;justify-content:center;background:#e8efff;margin-bottom:12px}
.toast{position:fixed;right:20px;bottom:20px;background:#092451;color:white;padding:12px 16px;border-radius:8px;font-size:11px;box-shadow:0 10px 30px rgba(0,0,0,.18);z-index:99}
.modal-bg{position:fixed;inset:0;background:rgba(8,20,40,.45);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px}
.modal{background:#fff;border-radius:12px;padding:20px;width:480px;max-width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25)}
.clickable{cursor:pointer;text-decoration:underline;color:#0a2d60;font-weight:700}
`;

// DATA
const initialRequests = [
  { id: "#REQ-2023-089", name: "Maria Santos", type: "Barangay Clearance", date: "Oct 24, 2023", status: "Processing" },
  { id: "#REQ-2023-088", name: "Juan Dela Cruz", type: "Certificate of Indigency", date: "Oct 22, 2023", status: "Pending Review" },
  { id: "#REQ-2023-085", name: "Pedro Reyes", type: "Business Permit", date: "Oct 15, 2023", status: "Ready for Pickup" },
  { id: "#REQ-2023-042", name: "Ana Cruz", type: "Community Tax Certificate", date: "Sep 01, 2023", status: "Completed" },
];
const initialBlotter = [
  { id: "BLT-2023-089", date: "Oct 24, 2023", complainant: "Juan Dela Cruz", respondent: "Pedro Santos", type: "Noise Complaint", status: "Under Review" },
  { id: "BLT-2023-088", date: "Oct 22, 2023", complainant: "Maria Clara", respondent: "Ana Reyes", type: "Dispute", status: "Resolved" },
];

function Status({ value }) {
  let cls = "pending";
  if (value === "Processing" || value === "Under Review") cls = "processing";
  if (value === "Ready for Pickup") cls = "ready";
  if (value === "Completed" || value === "Resolved") cls = "resolved";
  return <span className={`status ${cls}`}>• {value}</span>;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Resident");
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState("");
  const [requests, setRequests] = useState(initialRequests);
  const [blotter, setBlotter] = useState(initialBlotter);
  const [showModal, setShowModal] = useState(null); // {type, data}
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""), 2000); };

  // LOGIN
  if (!loggedIn) {
    return (<><style>{styles}</style>
      <div className="login-page"><div className="login-card">
        <div className="logo">✿</div>
        <h1 className="login-title">Barangay Management System</h1>
        <p style={{textAlign:'center', fontSize:13, color:'#6b7280'}}>Sign in to access your dashboard.</p>
        <label className="label">Select your role</label>
        <div className="role-row">{["Resident","Captain","Secretary"].map(r=>(
          <button key={r} className={`role-btn ${role===r?'active':''}`} onClick={()=>setRole(r)}>{r}</button>
        ))}</div>
        <label className="label">Username</label><input className="input" placeholder="Enter username" />
        <label className="label">Password</label><input className="input" type="password" placeholder="Password" />
        <button className="primary full" style={{marginTop:16}} onClick={()=>{setLoggedIn(true); showToast(Logged in as ${role})}}>Sign In as {role} ↪</button>
      </div></div>
    </>);
  }

  return (<><style>{styles}</style>
    <div className="layout">
      <aside className="sidebar">
        <div className="brand"><div className="logo">✿</div><div className="brand-text">Barangay<br/>Management<br/>System</div></div>
        <nav className="nav">
          {[
            {id:'dashboard', label:'Dashboard'},
            {id:'requests', label:'Document Requests'},
            {id:'announcements', label:'Announcements'},
            {id:'blotter', label:'Blotter Reports'},
          ].map(i=><button key={i.id} className={`nav-btn ${page===i.id?'active':''}`} onClick={()=>{setPage(i.id); showToast(i.label)}}>{i.label}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-btn" onClick={()=>showToast("Settings - coming soon!")}>⚙ Settings</button>
          <button className="nav-btn" onClick={()=>setLoggedIn(false)}>↪ Sign Out ({role})</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search records, docs..." /></div>
          <div style={{display:'flex', gap:12}}>
            <button className="filter" onClick={()=>showToast("No new notifications")}>♧ Notifications</button>
            <button className="filter" onClick={()=>showToast(Profile: ${role})}>◎ {role}</button>
          </div>
        </header>

        <div className="content">
          {/* DASHBOARD */}
          {page==='dashboard' && (
            <>
              <div className="welcome">
                <div><h1 style={{margin:0}}>{role==='Captain' ? 'Good Morning, Captain' : role==='Secretary' ? "Secretary's Dashboard" : 'Welcome back, Maria!'}</h1><p style={{color:'#697386', fontSize:12}}>Your {role.toLowerCase()} dashboard is updated for today.</p></div>
                <button className="primary" onClick={()=>{setPage('requests'); showToast("New Request Form")}}>⊕ New Request</button>
              </div>

              <div className="stat-grid">
                <div className="stat-card" onClick={()=>setPage('requests')}><b>142</b><span>Total Requests</span><br/><small className="clickable">View all →</small></div>
                <div className="stat-card" onClick={()=>{setPage('requests'); setFilterStatus('Pending Review')}}><b>18</b><span>Pending Review</span><br/><small className="clickable">Filter →</small></div>
                <div className="stat-card" onClick={()=>{setPage('requests'); setFilterStatus('Ready for Pickup')}}><b>34</b><span>Ready for Pickup</span><br/><small className="clickable">View →</small></div>
                <div className="stat-card" onClick={()=>setPage('blotter')}><b>{blotter.length}</b><span>Blotter Active</span><br/><small className="clickable">Manage →</small></div>
              </div>

              <div className="grid-actions">
                <button className="action-card" onClick={()=>setPage('requests')}><div className="action-icon">▤</div><h3>Request Document</h3><p>Barangay clearance, indigency, etc.</p></button>
                <button className="action-card" onClick={()=>setPage('blotter')}><div className="action-icon">⚔</div><h3>File Blotter</h3><p>Report an incident or dispute.</p></button>
                <button className="action-card" onClick={()=>setPage('announcements')}><div className="action-icon">⚑</div><h3>Announcements</h3><p>View latest community updates.</p></button>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 270px', gap:14, marginTop:14}}>
                <div className="panel">
                  <div className="panel-head"><h3>My Active Requests</h3><button className="clickable" onClick={()=>setPage('requests')}>View All</button></div>
                  <table className="table"><thead><tr><th>TYPE</th><th>DATE</th><th>STATUS</th><th>ACTION</th></tr></thead>
                  <tbody>{requests.slice(0,3).map(r=><tr key={r.id}><td>{r.type}</td><td>{r.date}</td><td><Status value={r.status}/></td><td><span className="clickable" onClick={()=>setShowModal({type:'request', data:r})}>View</span></td></tr>)}</tbody></table>
                </div>
                <div className="panel"><div className="panel-head"><h3>Community Feed</h3></div>
                  <div style={{padding:'12px', fontSize:11, cursor:'pointer'}} onClick={()=>{setPage('announcements'); showToast("Opening Announcements")}}><b>Barangay Assembly</b><p style={{color:'#6b7280'}}>Join us for semi-annual assembly...</p></div>
                </div>
              </div>
            </>
          )}

          {/* REQUESTS */}
          {page==='requests' && (
            <div className="panel">
              <div className="panel-head">
                <h2>Document Requests</h2>
                <div style={{display:'flex', gap:8}}>
                  {["All","Pending Review","Processing","Ready for Pickup"].map(s=>(
                    <button key={s} className={`filter ${filterStatus===s?'active':''}`} onClick={()=>setFilterStatus(s)}>{s}</button>
                  ))}
                  <button className="primary" onClick={()=>setShowModal({type:'new-request'})}>⊕ New Request</button>
                </div>
              </div>
              <table className="table">
                <thead><tr><th>REQUEST ID</th><th>NAME</th><th>TYPE</th><th>DATE</th><th>STATUS</th><th>ACTION</th></tr></thead>
                <tbody>{requests.filter(r=> (filterStatus==='All'||r.status===filterStatus) && r.id.toLowerCase().includes(search.toLowerCase())).map(r=>(
                  <tr key={r.id}><td><b>{r.id}</b></td><td>{r.name}</td><td>{r.type}</td><td>{r.date}</td><td><Status value={r.status}/></td>
                  <td style={{display:'flex', gap:8}}><span className="clickable" onClick={()=>setShowModal({type:'request', data:r})}>View</span><span className="clickable" onClick={()=>{setRequests(requests.map(x=>x.id===r.id? {...x, status:'Processing'}:x)); showToast("Status updated to Processing")}}>Approve</span></td></tr>
                ))}</tbody>
              </table>
            </div>
          )}

          {/* BLOTTER */}
          {page==='blotter' && (
            <div className="panel">
              <div className="panel-head"><h2>Blotter Reports</h2><button className="primary" onClick={()=>setShowModal({type:'new-blotter'})}>+ File Blotter</button></div>
              <table className="table"><thead><tr><th>CASE ID</th><th>DATE</th><th>COMPLAINANT</th><th>TYPE</th><th>STATUS</th><th>ACTION</th></tr></thead>
              <tbody>{blotter.filter(b=>b.id.toLowerCase().includes(search.toLowerCase())).map(b=>(
                <tr key={b.id}><td><b>{b.id}</b></td><td>{b.date}</td><td>{b.complainant}</td><td>{b.type}</td><td><Status value={b.status}/></td><td><span className="clickable" onClick={()=>setShowModal({type:'blotter', data:b})}>View</span> | <span className="clickable" onClick={()=>setBlotter(blotter.filter(x=>x.id!==b.id))}>Delete</span></td></tr>
              ))}</tbody></table>
            </div>
          )}

          {/* ANNOUNCEMENTS */}
          {page==='announcements' && (
            <div className="form-layout">
              <div className="form-card">
                <h3>Post Public Announcement</h3>
                <label className="label">Title</label><input className="input" placeholder="Announcement Title" id="annTitle" />
                <label className="label">Content</label><textarea className="textarea" style={{minHeight:120}} placeholder="Write..." id="annContent"></textarea>
                <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:12}}>
                  <button className="filter" onClick={()=>showToast("Saved as Draft")}>Save as Draft</button>
                  <button className="primary" onClick={()=>{showToast("Announcement Published!"); setPage('dashboard')}}>Publish Announcement</button>
                </div>
              </div>
              <div className="form-card"><h3>Recent</h3><p style={{fontSize:11, color:'#6b7280', cursor:'pointer'}} onClick={()=>showToast("Viewing announcement")}>🚧 Main Street Water Repair - Today 8AM</p></div>
            </div>
          )}
        </div>
      </main>
    </div>

    {/* MODALS - LAHAT NAPIPINDOT */}
    {showModal && (
      <div className="modal-bg" onClick={()=>setShowModal(null)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          {showModal.type==='request' && <>
            <h3>{showModal.data.id} - {showModal.data.type}</h3><p style={{fontSize:12, color:'#6b7280'}}>Name: {showModal.data.name}<br/>Date: {showModal.data.date}<br/>Status: {showModal.data.status}</p>
            <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:16}}>
              <button className="filter" onClick={()=>setShowModal(null)}>Close</button>
              <button className="primary" onClick={()=>{setRequests(requests.map(x=>x.id===showModal.data.id? {...x, status:'Ready for Pickup'}:x)); setShowModal(null); showToast("Marked Ready for Pickup")}}>Mark Ready</button>
            </div>
          </>}
          {showModal.type==='blotter' && <>
            <h3>{showModal.data.id}</h3><p style={{fontSize:12}}>{showModal.data.complainant} vs {showModal.data.respondent}<br/>{showModal.data.type} - {showModal.data.status}</p>
            <button className="primary full" onClick={()=>setShowModal(null)}>Close</button>
          </>}
          {showModal.type==='new-request' && <>
            <h3>New Document Request</h3>
            <label className="label">Full Name</label><input className="input" placeholder="Juan Dela Cruz" />
            <label className="label">Document Type</label><select className="select"><option>Barangay Clearance</option><option>Indigency</option><option>Business Permit</option></select>
            <label className="label">Purpose</label><textarea className="textarea" placeholder="Purpose..."></textarea>
            <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:12}}>
              <button className="filter" onClick={()=>setShowModal(null)}>Cancel</button>
              <button className="primary" onClick={()=>{const newId=`#REQ-${Date.now().toString().slice(-4)}`; setRequests([{id:newId, name:'New Resident', type:'Barangay Clearance', date:'Today', status:'Pending Review'}, ...requests]); setShowModal(null); showToast("Request Submitted!")}}>Submit</button>
            </div>
          </>}
          {showModal.type==='new-blotter' && <>
            <h3>File New Blotter Report</h3>
            <label className="label">Incident Type</label><select className="select"><option>Noise Complaint</option><option>Dispute</option><option>Theft</option></select>
            <label className="label">Complainant</label><input className="input" placeholder="Your name" />
            <label className="label">Narrative</label><textarea className="textarea" placeholder="Describe incident..."></textarea>
            <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:12}}>
              <button className="filter" onClick={()=>setShowModal(null)}>Cancel</button>
              <button className="primary" onClick={()=>{const newId=`BLT-${Date.now().toString().slice(-4)}`; setBlotter([{id:newId, date:'Today', complainant:'You', respondent:'Unknown', type:'Dispute', status:'Under Review'}, ...blotter]); setShowModal(null); showToast("Blotter Filed!")}}>Submit Report</button>
            </div>
          </>}
        </div>
      </div>
    )}

    {toast && <div className="toast">{toast}</div>}
  </>);
}
