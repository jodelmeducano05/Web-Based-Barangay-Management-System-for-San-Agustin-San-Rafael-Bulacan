import React, { useState } from 'react'

function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-green-700">Brgy. San Agustin</h2>
        <div className="space-y-2">
          <button onClick={() => setPage('dashboard')} className={`w-full text-left p-3 rounded ${page === 'dashboard' ? 'bg-green-600 text-white' : 'hover:bg-gray-100'}`}>🏠 Dashboard</button>
          <button onClick={() => setPage('blotter')} className={`w-full text-left p-3 rounded ${page === 'blotter' ? 'bg-green-600 text-white' : 'hover:bg-gray-100'}`}>📝 Blotter</button>
          <button onClick={() => setPage('certificate')} className={`w-full text-left p-3 rounded ${page === 'certificate' ? 'bg-green-600 text-white' : 'hover:bg-gray-100'}`}>📄 Certificate</button>
          <button onClick={() => setPage('residents')} className={`w-full text-left p-3 rounded ${page === 'residents' ? 'bg-green-600 text-white' : 'hover:bg-gray-100'}`}>👥 Residents</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        {page === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg border shadow">Total Residents: <b>1,250</b></div>
              <div className="bg-white p-6 rounded-lg border shadow">Blotter Cases: <b>12</b></div>
              <div className="bg-white p-6 rounded-lg border shadow">Certificates: <b>45</b></div>
            </div>
            <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded">
              ✅ GREEN na! Hiwalay na: index.css (Tailwind) at custom.css (kulay)
            </div>
          </div>
        )}

        {page === 'blotter' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Blotter Records</h1>
            <div className="bg-white p-6 rounded border">Dito yung Blotter Table mo</div>
          </div>
        )}

        {page === 'certificate' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Barangay Certificate</h1>
            <div className="bg-white p-6 rounded border">Dito yung Certificate Form mo</div>
          </div>
        )}

        {page === 'residents' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Residents List</h1>
            <div className="bg-white p-6 rounded border">Dito yung Residents Table mo</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
