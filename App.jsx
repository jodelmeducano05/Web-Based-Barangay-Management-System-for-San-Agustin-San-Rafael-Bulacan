import React, { useState } from "react";

const styles = `
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, system-ui; background: #f4f8fc; }
button,input,select,textarea{font:inherit} button{cursor:pointer}
.layout{min-height:100vh;display:flex}
.sidebar{width:250px;background:#092451;color:#cdd8eb;display:flex;flex-direction:column;padding:20px 12px}
.nav-btn{width:100%;height:40px;border:0;background:transparent;color:#b9c5d9;border-radius:6px;text-align:left;padding:0 12px;margin:3px 0;display:flex;gap:10px;align-items:center}
.nav-btn.active{background:#57f58b;color:#073d20;font-weight:800}
.main{flex:1}
.topbar{height:56px;background:#fff;border-bottom:1px solid #dfe5ed;display:flex;align-items:center;justify-content:space-between;padding:0 20px}
.content{padding:20px;max-width:1180px;margin:auto}
.panel{background:#fff;border:1px solid #e1e7ef;border-radius:10px;overflow:hidden}
.panel-head{padding:14px;display:flex;justify-content:space-between;border-bottom:1px solid #eee}
.table{width:100%;border-collapse:collapse;font-size:11px}
.table th{background:#f5f7fa;padding:10px;text-align:left;font-size:10px;color:#667085}
.table td{padding:10px;border-top:1px solid #eee}
.status{padding:4px 8px;border-radius:12px;font-size:9px;font-weight:700;background:#dfe7f7}
.primary{border:0;background:#092451;color:#fff;border-radius:6px;height:36px;padding:0 14px;font-weight:700}
.filter{border:1px solid #d6dde7;background:#fff;border-radius:16px;padding:5px 10px;font-size:10px;font-weight:700}
.filter.active{background:#092451;color:#fff}
.input,.select,.textarea{width:100%;border:1px solid #d4dbe5;border-radius:7px;padding:8px;font-size:12px}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0}
.stat-card{background:#fff;border:1px solid #e1e7ef;border-radius:10px;padding:14px;cursor:pointer}
.stat-card:hover{box-shadow:0 6px 16px rgba(0,0,0,.08);transform:translateY(-2px)}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:50}
.modal{background:#fff;border-radius:12px;padding:20px;width:450px}
.toast{position:fixed;right:20px;bottom:20px;background:#092451;color:#fff;padding:10px 14px;border-radius:8px;font-size:12px}
`;

export default function App(){
  const [page,setPage]=useState('dashboard');
  const [role,setRole]=useState('Secretary');
  const [toast,setToast]=useState('');
  const [modal,setModal]=useState(null);
  const [requests,setRequests]=useState([
    {id:"#REQ-2023-089", name:"Maria Santos", type:"Barangay Clearance", date:"Oct 24, 2023", status:"Processing"},
    {id:"#REQ-2023-088", name:"Juan Cruz", type:"Indigency", date:"Oct 22, 2023", status:"Pending Review"},
    {id:"#REQ-2023-085", name:"Pedro Reyes", type:"Business Permit", date:"Oct 15, 2023", status:"Ready for Pickup"},
  ]);
  const [blotter,setBlotter]=useState([
    {id:"BLT-089", date:"Oct 24, 2023", complainant:"Juan Dela Cruz", respondent:"Pedro Santos", type:"Noise", status:"Under Review"},
  ]);

  const show = (t)=>{ setToast(t); setTimeout(()=>setToast(''),2000) }

  return (<>
    <style>{styles}</style>
    <div className="layout">
      <aside className="sidebar">
        <h3>Barangay System</h3>
        <div style={{marginTop:10}}>
          {['dashboard','requests','announcements','blotter'].map(p=>(
            <button key={p} className={`nav-btn ${page===p?'active':''}`} onClick={()=>setPage(p)}>{p}</button>
          ))}
        </div>
        <div style={{marginTop:'auto'}}>
          <button className="nav-btn" onClick={()=>show("Settings clicked")}>Settings</button>
          <button className="nav-btn" onClick={()=>show("Signed out")}>Sign Out</button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <b>{role} Dashboard</b>
          <div style={{display:'flex',gap:8}}>
            <button className="filter" onClick={()=>setRole(role==='Secretary'?'Captain':'Secretary')}>Switch to {role==='Secretary'?'Captain':'Secretary'}</button>
            <button className="primary" onClick={()=>setModal({type:'new-request'})}>+ New Request</button>
          </div>
        </div>

        <div className="content">
          {page==='dashboard' && <>
            <div className="stat-grid">
              <div className="stat-card" onClick={()=>setPage('requests')}><b>142</b><br/>Total Requests</div>
              <div className="stat-card" onClick={()=>setPage('requests')}><b>18</b><br/>Pending Review</div>
              <div className="stat-card" onClick={()=>setPage('requests')}><b>34</b><br/>For Pickup</div>
              <div className="stat-card" onClick={()=>setPage('blotter')}><b>{blotter.length}</b><br/>Blotter Active</div>
            </div>
            <div className="panel">
              <div className="panel-head"><h4>Document Request Queue</h4><button className="filter" onClick={()=>setPage('requests')}>View All</button></div>
              <table className="table">
                <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>{requests.map(r=>(
                  <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.type}</td><td><span className="status">{r.status}</span></td>
                  <td><button className="filter" onClick={()=>setModal({type:'view-request', data:r})}>View</button></td></tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {page==='requests' && <>
            <div className="panel">
              <div className="panel-head"><h3>Document Requests - 142</h3><button className="primary" onClick={()=>setModal({type:'new-request'})}>+ New</button></div>
              <table className="table">
                <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>{requests.map(r=>(
                  <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.type}</td><td>{r.date}</td><td><span className="status">{r.status}</span></td>
                  <td><button className="filter" onClick={()=>setModal({type:'view-request', data:r})}>View</button>
                  <button className="filter" onClick={()=>{ setRequests(requests.map(x=>x.id===r.id?{...x, status:'Ready for Pickup'}:x)); show("Approved!")}}>Approve</button></td></tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {page==='blotter' && <>
            <div className="panel">
              <div className="panel-head"><h3>Blotter Reports</h3><button className="primary" onClick={()=>setModal({type:'new-blotter'})}>+ File Blotter</button></div>
              <table className="table">
                <thead><tr><th>Case ID</th><th>Date</th><th>Complainant</th><th>Type</th><th>Action</th></tr></thead>
                <tbody>{blotter.map(b=>(
                  <tr key={b.id}><td>{b.id}</td><td>{b.date}</td><td>{b.complainant}</td><td>{b.type}</td>
                  <td><button className="filter" onClick={()=>setModal({type:'view-blotter', data:b})}>View</button></td></tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {page==='announcements' && <>
            <div className="panel" style={{padding:16}}>
              <h3>Post Public Announcement</h3>
              <input className="input" placeholder="Title" />
              <textarea className="textarea" style={{marginTop:10, minHeight:100}} placeholder="Content..." />
              <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:10}}>
                <button className="filter" onClick={()=>show("Saved as draft")}>Save Draft</button>
                <button className="primary" onClick={()=>show("Published!")}>Publish</button>
              </div>
            </div>
          </>}
        </div>
      </main>
    </div>

    {modal && (
      <div className="modal-bg" onClick={()=>setModal(null)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          {modal.type==='view-request' && <>
            <h3>{modal.data.id}</h3>
            <p style={{fontSize:12}}>{modal.data.name} - {modal.data.type}<br/>Status: {modal.data.status}</p>
            <button className="primary" style={{width:'100%'}} onClick={()=>setModal(null)}>Close - Napipindot to!</button>
          </>}
          {modal.type==='new-request' && <>
            <h3>New Request - Lahat ng field napipindot</h3>
            <input className="input" placeholder="Full Name" />
            <select className="select" style={{marginTop:8}}><option>Barangay Clearance</option><option>Indigency</option></select>
            <button className="primary" style={{width:'100%', marginTop:10}} onClick={()=>{setModal(null); show("Request Added!")}}>Submit - Click Me</button>
          </>}
          {modal.type==='new-blotter' && <>
            <h3>File Blotter Report</h3>
            <label style={{fontSize:11, fontWeight:700}}>Respondent Name</label>
            <input className="input" placeholder="Who is complaint against?" />
            <label style={{fontSize:11, fontWeight:700, marginTop:8, display:'block'}}>Relationship</label>
            <input className="input" placeholder="Neighbor, etc" />
            <button className="primary" style={{width:'100%', marginTop:10}} onClick={()=>{setModal(null); show("Blotter Filed!")}}>Submit Report</button>
          </>}
          {modal.type==='view-blotter' && <>
            <h3>{modal.data.id}</h3>
            <p style={{fontSize:12}}>{modal.data.complainant} vs {modal.data.respondent}</p>
            <button className="primary" style={{width:'100%'}} onClick={()=>setModal(null)}>Close</button>
          </>}
        </div>
      </div>
    )}
    {toast && <div className="toast">{toast}</div>}
  </>)
}
