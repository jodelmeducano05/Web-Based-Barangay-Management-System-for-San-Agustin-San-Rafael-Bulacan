import React, { useState } from 'react'

function App() {
  const [page, setPage] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="bg-white w-[400px] p-8 rounded-xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-4 text-xl">⚙️</div>
          <h1 className="font-bold text-lg">Barangay Management System</h1>
          <p className="text-xs text-gray-500 mt-1 mb-6">Sign in to access your admin panel</p>
          <div className="text-left space-y-4">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-[#1e293b] text-white text-xs">Resident</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs">Captain</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs">Secretary</button>
            </div>
            <div><label className="text-xs font-medium">Username</label><input className="w-full mt-1 border rounded-lg px-3 py-2 text-sm" placeholder="Enter your username" /></div>
            <div><label className="text-xs font-medium">Password</label><input type="password" className="w-full mt-1 border rounded-lg px-3 py-2 text-sm" placeholder="Enter your password" /></div>
            <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#1e293b] text-white py-2.5 rounded-lg text-sm font-medium mt-2">Sign In →</button>
          </div>
        </div>
      </div>
    )
  }

  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'residents', label: 'Residents', icon: '👥' },
    { id: 'certificates', label: 'Certificates', icon: '📄' },
    { id: 'blotter', label: 'Blotter', icon: '📝' },
    { id: 'officials', label: 'Officials', icon: '👔' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
  ]

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="w-[240px] bg-[#1e3a5f] text-white flex flex-col">
        <div className="p-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">⚙️</div>
          <div><p className="text-[12px] font-bold leading-tight">Barangay<br/>Management System</p><p className="text-[10px] text-white/60">San Rafael, Bulacan</p></div>
        </div>
        <div className="p-3 space-y-1 flex-1">
          {menu.map(m => (
            <button key={m.id} onClick={() => setPage(m.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium ${page===m.id? 'bg-[#22c55e] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}><span>{m.icon}</span> {m.label}</button>
          ))}
        </div>
        <div className="p-4 border-t border-white/10"><button onClick={() => setIsLoggedIn(false)} className="text-[12px] text-white/60">← Sign out</button></div>
      </div>
      <div className="flex-1">
        <div className="h-[64px] bg-white border-b flex items-center justify-between px-8"><h1 className="font-semibold capitalize">{page === 'dashboard'? 'Good Morning, jodel educano' : page}</h1><div className="flex items-center gap-3"><button className="text-xs border rounded-lg px-3 py-1.5">Print Daily Report</button><button className="text-xs bg-[#1e3a5f] text-white rounded-lg px-4 py-1.5">+ New Record</button></div></div>
        <div className="p-8">
          {page === 'dashboard' && (
            <div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border p-5"><p className="text-xs text-gray-500">Certificates Issued</p><p className="text-2xl font-bold mt-2">0</p></div>
                <div className="bg-white rounded-xl border p-5"><p className="text-xs text-gray-500">Pending Blotters</p><p className="text-2xl font-bold mt-2">0</p></div>
                <div className="bg-white rounded-xl border p-5"><p className="text-xs text-gray-500">Active Blotters</p><p className="text-2xl font-bold mt-2">0</p></div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-xl border p-5"><div className="flex justify-between"><h3 className="text-sm font-semibold">Recent Critical Reports</h3><span className="text-xs text-blue-600">View All →</span></div><div className="mt-8 text-center text-xs text-gray-400 py-10">No critical reports</div></div>
                <div className="bg-white rounded-xl border p-5"><h3 className="text-sm font-semibold">System Activity</h3><div className="mt-4 space-y-3 text-xs"><p>• Assessment Year - 2024 Created</p><p>• New Resident - Juan Dela Cruz Added</p><p>• Certificate Issued - Brgy. Clearance</p></div></div>
              </div>
            </div>
          )}
          {page!== 'dashboard' && <div className="bg-white rounded-xl border p-20 text-center text-xs text-gray-400">No {page} data</div>}
        </div>
      </div>
    </div>
  )
}
export default App
