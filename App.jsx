import React, { useState } from 'react'

function App() {
  const [page, setPage] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('resident')
  const LOGO = "/Web-Based-Barangay-Management-System-for-San-Agustin-San-Rafael-Bulacan/barangay_logo_small.png"

  const [residents, setResidents] = useState([
    { id: 1, name: 'Juan Dela Cruz', age: 32, purok: 'Purok 1', contact: '09123456789', status: 'Active' },
    { id: 2, name: 'Maria Santos', age: 28, purok: 'Purok 2', contact: '09123456788', status: 'Active' },
    { id: 3, name: 'Pedro Reyes', age: 45, purok: 'Purok 3', contact: '09123456787', status: 'Active' },
    { id: 4, name: 'Ana Rivera', age: 24, purok: 'Purok 1', contact: '09123456786', status: 'Active' },
  ])
  const [certificates, setCertificates] = useState([
    { id: 1, resident: 'Juan Dela Cruz', type: 'Barangay Clearance', date: '2024-12-01', status: 'Issued' },
    { id: 2, resident: 'Maria Santos', type: 'Indigency', date: '2024-12-02', status: 'Pending' },
    { id: 3, resident: 'Pedro Reyes', type: 'Residency', date: '2024-12-03', status: 'Issued' },
  ])
  const [blotters, setBlotters] = useState([
    { id: 1, complainant: 'Juan Dela Cruz', respondent: 'Pedro Reyes', issue: 'Noise Complaint', date: '2024-12-01', status: 'Pending' },
    { id: 2, complainant: 'Maria Santos', respondent: 'Ana Rivera', issue: 'Property Dispute', date: '2024-12-02', status: 'Resolved' },
  ])
  const [officials] = useState([
    { name: 'Hon. Jose Dela Cruz', position: 'Barangay Captain', contact: '0912-345-6789' },
    { name: 'Hon. Maria Lopez', position: 'Secretary', contact: '0912-345-6788' },
    { name: 'Hon. Pedro Santos', position: 'Treasurer', contact: '0912-345-6787' },
    { name: 'Hon. Ana Rivera', position: 'Kagawad', contact: '0912-345-6786' },
  ])
  const [announcements] = useState([
    { id: 1, title: 'Barangay Clean-up Drive', date: 'Dec 10, 2024', desc: 'Lahat inaanyayahan sa clean-up drive sa Sabado 6AM.' },
    { id: 2, title: 'Free Medical Mission', date: 'Dec 15, 2024', desc: 'Libre check-up at gamot sa Barangay Hall.' },
  ])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="bg-white w-[420px] p-8 rounded-xl border shadow-sm text-center">
          <img src={LOGO} className="w-24 h-24 mx-auto mb-3 object-contain" alt="logo" />
          <h1 className="font-bold">Barangay Management System</h1>
          <p className="text-[11px] font-bold text-green-700 mb-6">SAN AGUSTIN, SAN RAFAEL, BULACAN</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button onClick={()=>setRole('resident')} className={`py-3 rounded-xl text-xs font-bold border-2 ${role==='resident'?'bg-[#1e293b] text-white':'bg-white'}`}>Resident</button>
            <button onClick={()=>setRole('captain')} className={`py-3 rounded-xl text-xs font-bold border-2 ${role==='captain'?'bg-[#1e293b] text-white':'bg-white'}`}>Captain</button>
            <button onClick={()=>setRole('secretary')} className={`py-3 rounded-xl text-xs font-bold border-2 ${role==='secretary'?'bg-[#1e293b] text-white':'bg-white'}`}>Secretary</button>
          </div>
          <input className="w-full border rounded-lg px-3 py-2.5 text-sm mb-2" placeholder="Username" />
          <input type="password" className="w-full border rounded-lg px-3 py-2.5 text-sm mb-4" placeholder="Password" />
          <button onClick={()=>setIsLoggedIn(true)} className="w-full bg-[#1e3a5f] text-white py-3 rounded-xl font-bold">Sign In as {role.toUpperCase()} →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="w-[250px] bg-[#1e3a5f] text-white flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <img src={LOGO} className="w-10 h-10 rounded-full bg-white p-1 object-contain" alt="" />
          <div><p className="text-[11px] font-bold leading-tight">Brgy. San<br/>Agustin</p><p className="text-[9px] bg-[#22c55e] px-2 py-0.5 rounded-full mt-1 inline-block uppercase">{role}</p></div>
        </div>
        <div className="p-3 space-y-1 flex-1">
          <button onClick={()=>setPage('dashboard')} className={`w-full text-left px-3 py-3 rounded-xl text-sm ${page==='dashboard'?'bg-[#22c55e]':''}`}>📊 Dashboard</button>
          <button onClick={()=>setPage('residents')} className={`w-full text-left px-3 py-3 rounded-xl text-sm ${page==='residents'?'bg-[#22c55e]':''}`}>👥 Residents ({residents.length})</button>
          <button onClick={()=>setPage('certificates')} className={`w-full text-left px-3 py-3 rounded-xl text-sm ${page==='certificates'?'bg-[#22c55e]':''}`}>📄 Certificates ({certificates.length})</button>
          <button onClick={()=>setPage('blotter')} className={`w-full text-left px-3 py-3 rounded-xl text-sm ${page==='blotter'?'bg-[#22c55e]':''}`}>📝 Blotter ({blotters.length})</button>
          <button onClick={()=>setPage('officials')} className={`w-full text-left px-3 py-3 rounded-xl text-sm ${page==='officials'?'bg-[#22c55e]':''}`}>👔 Officials</button>
          <button onClick={()=>setPage('announcements')} className={`w-full text-left px-3 py-3 rounded-xl text-sm ${page==='announcements'?'bg-[#22c55e]':''}`}>📢 Announcements</button>
        </div>
        <div className="p-4 border-t border-white/10"><button onClick={()=>setIsLoggedIn(false)} className="text-xs text-white/60">← Sign out</button></div>
      </div>

      <div className="flex-1">
        <div className="h-[64px] bg-white border-b flex items-center justify-between px-8">
          <h1 className="font-bold capitalize flex items-center gap-2"><img src={LOGO} className="w-6 h-6 object-contain" /> {page} - {role}</h1>
          <button onClick={()=>{ const name=prompt('Name?'); if(name) setResidents([...residents,{id:Date.now(),name,age:20,purok:'Purok 1',contact:'0912',status:'Active'}])}} className="text-xs bg-[#1e3a5f] text-white px-4 py-1.5 rounded-full">+ New {page}</button>
        </div>

        <div className="p-6">
          {page==='dashboard' && (
            <div className="space-y-6">
              <div className="bg-white border rounded-xl p-5 flex items-center gap-4"><img src={LOGO} className="w-14 h-14 object-contain" /><div><p className="font-bold text-sm">Barangay San Agustin Dashboard</p><p className="text-xs text-gray-500">Security • Health • Shelter • Food - TOP PRIORITY</p></div></div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border rounded-xl p-5"><p className="text-xs text-gray-500">Total Residents</p><p className="text-2xl font-bold mt-1">{residents.length}</p><button onClick={()=>setPage('residents')} className="text-[10px] text-blue-600 mt-2">View all →</button></div>
                <div className="bg-white border rounded-xl p-5"><p className="text-xs text-gray-500">Certificates</p><p className="text-2xl font-bold mt-1">{certificates.length}</p><button onClick={()=>setPage('certificates')} className="text-[10px] text-green-600 mt-2">View all →</button></div>
                <div className="bg-white border rounded-xl p-5"><p className="text-xs text-gray-500">Blotters</p><p className="text-2xl font-bold mt-1">{blotters.length}</p><button onClick={()=>setPage('blotter')} className="text-[10px] text-orange-600 mt-2">View all →</button></div>
                <div className="bg-white border rounded-xl p-5"><p className="text-xs text-gray-500">Officials</p><p className="text-2xl font-bold mt-1">{officials.length}</p><button onClick={()=>setPage('officials')} className="text-[10px] text-purple-600 mt-2">View all →</button></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border rounded-xl p-5"><h3 className="font-bold text-sm mb-3">Recent Residents</h3>{residents.slice(0,3).map(r=><div key={r.id} className="flex justify-between py-2 border-b text-sm"><span>{r.name}</span><span className="text-xs text-gray-500">{r.purok}</span></div>)}</div>
                <div className="bg-white border rounded-xl p-5"><h3 className="font-bold text-sm mb-3">Latest Announcements</h3>{announcements.map(a=><div key={a.id} className="py-2 border-b"><p className="text-sm font-medium">{a.title}</p><p className="text-[11px] text-gray-500">{a.desc}</p></div>)}</div>
              </div>
            </div>
          )}

          {page==='residents' && (
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="p-5 flex justify-between items-center bg-gray-50"><h3 className="font-bold">Residents List - {residents.length} records</h3><button onClick={()=>{ const n=prompt('Resident name?'); if(n) setResidents([...residents,{id:Date.now(),name:n,age:25,purok:'Purok 1',contact:'0912',status:'Active'}])}} className="text-xs bg-[#22c55e] text-white px-4 py-2 rounded-full">+ Add Resident</button></div>
              <table className="w-full text-sm"><thead className="bg-gray-50 text-xs"><tr><th className="p-3 text-left">Name</th><th className="p-3">Age</th><th className="p-3">Purok</th><th className="p-3">Contact</th><th className="p-3">Action</th></tr></thead><tbody>{residents.map(r=><tr key={r.id} className="border-t hover:bg-gray-50"><td className="p-3 font-medium">{r.name}</td><td className="p-3 text-center">{r.age}</td><td className="p-3 text-center">{r.purok}</td><td className="p-3 text-center">{r.contact}</td><td className="p-3 text-center"><button onClick={()=>alert('Viewing '+r.name)} className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full mr-1">View</button><button onClick={()=>setResidents(residents.filter(x=>x.id!==r.id))} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">Delete</button></td></tr>)}</tbody></table>
            </div>
          )}

          {page==='certificates' && (
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="p-5 flex justify-between items-center bg-gray-50"><h3 className="font-bold">Certificates - {certificates.length} records</h3><button onClick={()=>{ const n=prompt('Resident?'); if(n) setCertificates([...certificates,{id:Date.now(),resident:n,type:'Clearance',date:new Date().toISOString().split('T')[0],status:'Pending'}])}} className="text-xs bg-[#22c55e] text-white px-4 py-2 rounded-full">+ Issue</button></div>
              <table className="w-full text-sm"><thead className="bg-gray-50 text-xs"><tr><th className="p-3 text-left">Resident</th><th className="p-3">Type</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead><tbody>{certificates.map(c=><tr key={c.id} className="border-t hover:bg-gray-50"><td className="p-3 font-medium">{c.resident}</td><td className="p-3 text-center">{c.type}</td><td className="p-3 text-center">{c.date}</td><td className="p-3 text-center"><span className={`text-[10px] px-2 py-1 rounded-full ${c.status==='Issued'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{c.status}</span></td><td className="p-3 text-center"><button onClick={()=>alert('Print '+c.type)} className="text-xs bg-[#1e3a5f] text-white px-3 py-1 rounded-full">Print</button></td></tr>)}</tbody></table>
            </div>
          )}

          {page==='blotter' && (
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="p-5 flex justify-between items-center bg-gray-50"><h3 className="font-bold">Blotter Records</h3><button onClick={()=>{ const i=prompt('Issue?'); if(i) setBlotters([...blotters,{id:Date.now(),complainant:'Juan',respondent:'Pedro',issue:i,date:new Date().toISOString().split('T')[0],status:'Pending'}])}} className="text-xs bg-orange-500 text-white px-4 py-2 rounded-full">+ New Blotter</button></div>
              <table className="w-full text-sm"><thead className="bg-gray-50 text-xs"><tr><th className="p-3 text-left">Complainant</th><th className="p-3">Respondent</th><th className="p-3">Issue</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead><tbody>{blotters.map(b=><tr key={b.id} className="border-t hover:bg-gray-50"><td className="p-3">{b.complainant}</td><td className="p-3">{b.respondent}</td><td className="p-3">{b.issue}</td><td className="p-3 text-center"><span className={`text-[10px] px-2 py-1 rounded-full ${b.status==='Resolved'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{b.status}</span></td><td className="p-3 text-center"><button onClick={()=>alert(b.issue)} className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">View</button></td></tr>)}</tbody></table>
            </div>
          )}

          {page==='officials' && (
            <div className="grid grid-cols-2 gap-4">{officials.map((o,i)=><div key={i} className="bg-white border rounded-xl p-5 flex gap-4"><div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold">{o.name[5]}</div><div><p className="font-bold text-sm">{o.name}</p><p className="text-xs text-green-600">{o.position}</p><p className="text-xs text-gray-500 mt-1">{o.contact}</p><button onClick={()=>alert('Contact '+o.name)} className="mt-2 text-[10px] bg-gray-100 px-3 py-1 rounded-full">Contact</button></div></div>)}</div>
          )}

          {page==='announcements' && (
            <div className="space-y-4">{announcements.map(a=><div key={a.id} className="bg-white border rounded-xl p-6"><div className="flex justify-between"><h3 className="font-bold">{a.title}</h3><span className="text-xs text-gray-500">{a.date}</span></div><p className="text-sm text-gray-600 mt-2">{a.desc}</p><button onClick={()=>alert(a.title)} className="mt-3 text-xs bg-blue-500 text-white px-4 py-1.5 rounded-full">Read more →</button></div>)}<button onClick={()=>alert('New Announcement')} className="w-full bg-white border-2 border-dashed rounded-xl p-4 text-sm text-gray-500 hover:border-[#1e3a5f]">+ Post New Announcement</button></div>
          )}
        </div>
      </div>
    </div>
  )
}
export default App
