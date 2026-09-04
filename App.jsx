import React, { useState } from 'react'

function App() {
  const [page, setPage] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('resident')

  // LOGO - ilagay mo barangay_logo_small.png sa public folder
  const LOGO = "/Web-Based-Barangay-Management-System-for-San-Agustin-San-Rafael-Bulacan/barangay_logo_small.png"

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="bg-white w-[420px] p-8 rounded-xl border shadow-sm text-center">
          <img src={LOGO} alt="Brgy Logo" className="w-24 h-24 mx-auto mb-3 object-contain" onError={(e)=>e.target.src="https://i.imgur.com/8Km9tLL.png"} />
          <h1 className="font-bold text-[15px]">Barangay Management System</h1>
          <p className="text-[11px] font-bold text-green-700">BARANGAY SAN AGUSTIN</p>
          <p className="text-[10px] text-gray-500 mb-6">SAN RAFAEL, BULACAN - TOP PRIORITY</p>

          <div className="text-left space-y-3">
            <label className="text-xs font-bold">PILIIN MO - LAHAT NAPIPINDOT!</label>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setRole('resident')} className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${role==='resident'? 'bg-[#1e293b] text-white border-[#1e293b] scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>👤 Resident</button>
              <button onClick={() => setRole('captain')} className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${role==='captain'? 'bg-[#1e293b] text-white border-[#1e293b] scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>⭐ Captain</button>
              <button onClick={() => setRole('secretary')} className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${role==='secretary'? 'bg-[#1e293b] text-white border-[#1e293b] scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>📝 Secretary</button>
            </div>

            <div className="pt-2"><label className="text-xs font-medium">Username</label><input className="w-full mt-1 border rounded-lg px-3 py-2.5 text-sm focus:border-[#1e293b] focus:outline-none" placeholder={role + " username"} /></div>
            <div><label className="text-xs font-medium">Password</label><input type="password" className="w-full mt-1 border rounded-lg px-3 py-2.5 text-sm focus:border-[#1e293b] focus:outline-none" placeholder="••••••••" /></div>

            <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white py-3 rounded-xl text-sm font-bold mt-2 transition">Sign In as {role.toUpperCase()} →</button>

            <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-center">
              <p className="text-[10px] text-green-800 font-bold">✓ Naka-select: {role.toUpperCase()} - Lahat napipindot!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const allMenus = {
    resident: [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'residents', label: 'My Profile', icon: '👤' },
      { id: 'certificates', label: 'My Certificates', icon: '📄' },
      { id: 'announcements', label: 'Announcements', icon: '📢' },
    ],
    captain: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'residents', label: 'Residents', icon: '👥' },
      { id: 'certificates', label: 'Certificates', icon: '📄' },
      { id: 'blotter', label: 'Blotter', icon: '📝' },
      { id: 'officials', label: 'Officials', icon: '👔' },
      { id: 'announcements', label: 'Announcements', icon: '📢' },
    ],
    secretary: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'residents', label: 'Residents', icon: '👥' },
      { id: 'certificates', label: 'Certificates', icon: '📄' },
      { id: 'blotter', label: 'Blotter', icon: '📝' },
      { id: 'announcements', label: 'Announcements', icon: '📢' },
    ]
  }

  const currentMenu = allMenus[role]

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* SIDEBAR - LAHAT NAPIPINDOT */}
      <div className="w-[250px] bg-[#1e3a5f] text-white flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <img src={LOGO} className="w-11 h-11 rounded-full bg-white p-1 object-contain" alt="logo" onError={(e)=>e.target.style.display='none'} />
          <div><p className="text-[11px] font-bold leading-tight">Brgy. San<br/>Agustin</p><p className="text-[9px] bg-[#22c55e] px-2 py-0.5 rounded-full mt-1 inline-block font-bold uppercase">{role}</p></div>
        </div>

        <div className="p-3 space-y-1 flex-1">
          <p className="text-[10px] text-white/40 px-3 py-2 font-bold">LAHAT NAPIPINDOT ↓</p>
          {currentMenu.map(m => (
            <button key={m.id} onClick={() => setPage(m.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium transition-all ${page===m.id? 'bg-[#22c55e] text-white shadow-lg scale-[1.02]' : 'text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1'}`}>
              <span className="text-[16px]">{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button onClick={() => setPage('dashboard')} className="w-full text-left text-[11px] text-white/60 hover:text-white">🏠 Home</button>
          <button onClick={() => {setIsLoggedIn(false); setPage('dashboard')}} className="w-full text-left text-[12px] text-white/60 hover:text-white">← Sign out ({role})</button>
        </div>
      </div>

      {/* MAIN - LAHAT NG PAGE NAPIPINDOT */}
      <div className="flex-1">
        <div className="h-[64px] bg-white border-b flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <img src={LOGO} className="w-8 h-8 object-contain" alt="" onError={(e)=>e.target.style.display='none'} />
            <h1 className="font-bold text-sm capitalize">{page} - <span className="text-[#22c55e] uppercase">{role}</span></h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => alert('Print clicked!')} className="text-xs border rounded-full px-4 py-1.5 hover:bg-gray-50">🖨️ Print</button>
            <button onClick={() => alert('New Record for ' + role)} className="text-xs bg-[#1e3a5f] text-white rounded-full px-4 py-1.5 hover:bg-[#152a45]">+ New</button>
          </div>
        </div>

        <div className="p-8">
          {page === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
                <img src={LOGO} className="w-14 h-14 object-contain" alt="" />
                <div><p className="font-bold text-sm">Welcome {role.toUpperCase()}! - Brgy. San Agustin</p><p className="text-xs text-gray-500">Security • Health • Shelter • Food - TOP PRIORITY | Lahat ng button gumagana!</p></div>
                <button onClick={() => setPage('residents')} className="ml-auto bg-[#22c55e] text-white text-xs px-4 py-2 rounded-full">View Residents →</button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => setPage('certificates')} className="bg-white rounded-xl border p-5 text-left hover:shadow-md hover:border-[#22c55e] transition text-left"><p className="text-xs text-gray-500">📄 Certificates</p><p className="text-2xl font-bold mt-2">12</p><p className="text-[10px] text-[#22c55e] mt-1">Click to view →</p></button>
                <button onClick={() => setPage('blotter')} className="bg-white rounded-xl border p-5 text-left hover:shadow-md hover:border-orange-400 transition"><p className="text-xs text-gray-500">📝 Blotters</p><p className="text-2xl font-bold mt-2">3</p><p className="text-[10px] text-orange-500 mt-1">Click to view →</p></button>
                <button onClick={() => setPage('residents')} className="bg-white rounded-xl border p-5 text-left hover:shadow-md hover:border-blue-400 transition"><p className="text-xs text-gray-500">👥 Residents</p><p className="text-2xl font-bold mt-2">1,248</p><p className="text-[10px] text-blue-500 mt-1">Click to view →</p></button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border p-5">
                  <div className="flex justify-between items-center"><h3 className="text-sm font-bold">Recent Reports</h3><button onClick={() => setPage('blotter')} className="text-xs text-blue-600 hover:underline">View All →</button></div>
                  <div className="mt-4 space-y-2">
                    <button onClick={() => alert('Report 1')} className="w-full text-left text-xs p-3 bg-gray-50 rounded-lg hover:bg-gray-100">🔴 Blotter #001 - Click me!</button>
                    <button onClick={() => alert('Report 2')} className="w-full text-left text-xs p-3 bg-gray-50 rounded-lg hover:bg-gray-100">🟡 Certificate Request - Click me!</button>
                  </div>
                </div>
                <div className="bg-white rounded-xl border p-5">
                  <h3 className="text-sm font-bold">Quick Actions - Lahat Napipindot!</h3>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button onClick={() => setPage('residents')} className="text-xs bg-[#1e3a5f] text-white py-2.5 rounded-lg">Add Resident</button>
                    <button onClick={() => setPage('certificates')} className="text-xs bg-[#22c55e] text-white py-2.5 rounded-lg">Issue Cert</button>
                    <button onClick={() => setPage('blotter')} className="text-xs bg-orange-500 text-white py-2.5 rounded-lg">New Blotter</button>
                    <button onClick={() => setPage('announcements')} className="text-xs bg-blue-500 text-white py-2.5 rounded-lg">Announce</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {page!== 'dashboard' && (
            <div className="bg-white rounded-xl border p-10 text-center">
              <p className="text-4xl mb-3">{currentMenu.find(m=>m.id===page)?.icon}</p>
              <p className="font-bold">{page.toUpperCase()} PAGE</p>
              <p className="text-xs text-gray-500 mt-1">Role: {role.toUpperCase()} - This button works! Napipindot!</p>
              <div className="flex gap-2 justify-center mt-6">
                <button onClick={() => setPage('dashboard')} className="text-xs bg-gray-100 px-4 py-2 rounded-full">← Back to Dashboard</button>
                <button onClick={() => alert(page + ' action!')} className="text-xs bg-[#1e3a5f] text-white px-4 py-2 rounded-full">Action for {page} →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default App
