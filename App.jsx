import React, { useState } from 'react'

function App() {
  const [page, setPage] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('resident')

  const roles = [
    { id: 'resident', label: 'Resident', color: 'bg-[#1e293b]' },
    { id: 'captain', label: 'Captain', color: 'bg-[#1e293b]' },
    { id: 'secretary', label: 'Secretary', color: 'bg-[#1e293b]' },
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="bg-white w-[420px] p-8 rounded-xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-4 text-xl">⚙️</div>
          <h1 className="font-bold text-lg">Barangay Management System</h1>
          <p className="text-xs text-gray-500 mt-1 mb-6">Pumili ng role at mag Sign in</p>

          <div className="text-left space-y-4">
            <div>
              <label className="text-xs font-medium mb-2 block">Select Role (TATLO YAN!)</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)} className={`py-2 rounded-full text-xs font-medium border transition ${role===r.id? 'bg-[#1e293b] text-white border-[#1e293b]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div><label className="text-xs font-medium">Username</label><input className="w-full mt-1 border rounded-lg px-3 py-2 text-sm" placeholder={role + " username"} /></div>
            <div><label className="text-xs font-medium">Password</label><input type="password" className="w-full mt-1 border rounded-lg px-3 py-2 text-sm" placeholder="Enter password" /></div>

            <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#1e293b] text-white py-2.5 rounded-lg text-sm font-medium mt-2">
              Sign In as {role.toUpperCase()} →
            </button>

            <div className="text-[10px] text-center bg-yellow-50 border border-yellow-200 rounded p-2 text-yellow-800">
              Naka-select: <b>{role.toUpperCase()}</b> - Lahat ng 3 gumagana!
            </div>
          </div>
        </div>
      </div>
    )
  }

  // IBA-IBA MENU PER ROLE
  const menuByRole = {
    resident: [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
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
      { id: 'announcements', label: 'Announcements', icon: '📢' },
    ]
  }

  const currentMenu = menuByRole[role]

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="w-[240px] bg-[#1e3a5f] text-white flex flex-col">
        <div className="p-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">⚙️</div>
          <div><p className="text-[12px] font-bold leading-tight">Barangay<br/>Management</p><p className="text-[10px] bg-[#22c55e] px-2 py-0.5 rounded-full mt-1 inline-block">{role.toUpperCase()}</p></div>
        </div>
        <div className="p-3 space-y-1 flex-1">
          {currentMenu.map(m => (
            <button key={m.id} onClick={() => setPage(m.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium ${page===m.id? 'bg-[#22c55e] text-white' : 'text-white/70 hover:bg-white/10'}`}><span>{m.icon}</span> {m.label}</button>
          ))}
        </div>
        <div className="p-4 border-t border-white/10"><button onClick={() => {setIsLoggedIn(false); setPage('dashboard')}} className="text-[12px] text-white/60">← Sign out</button></div>
      </div>

      <div className="flex-1">
        <div className="h-[64px] bg-white border-b flex items-center justify-between px-8">
          <h1 className="font-semibold">Good Morning, jodel educano - <span className="text-[#22c55e] uppercase">{role}</span></h1>
          <span className="text-xs border px-3 py-1 rounded-full">{role} access</span>
        </div>

        <div className="p-8">
          {page === 'dashboard' && (
            <div>
              <div className="bg-white border rounded-xl p-4 mb-6"><p className="text-sm">Welcome <b>{role.toUpperCase()}</b>! {role==='resident' && 'Pwede ka mag-request ng certificate.'} {role==='captain' && 'Full access ka sa lahat.'} {role==='secretary' && 'Access mo: Residents at Certificates.'}</p></div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border p-5"><p className="text-xs text-gray-500">Certificates</p><p className="text-2xl font-bold mt-2">{role==='resident'?'1':'0'}</p></div>
                <div className="bg-white rounded-xl border p-5"><p className="text-xs text-gray-500">Role</p><p className="text-sm font-bold mt-2 uppercase">{role}</p></div>
                <div className="bg-white rounded-xl border p-5"><p className="text-xs text-gray-500">Access</p><p className="text-sm font-bold mt-2">{currentMenu.length} menus</p></div>
              </div>
            </div>
          )}
          {page!== 'dashboard' && <div className="bg-white rounded-xl border p-20 text-center text-xs text-gray-400">No {page} data for {role}</div>}
        </div>
      </div>
    </div>
  )
}
export default App
