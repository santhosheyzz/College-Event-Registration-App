import React from 'react';

interface Registration {
  id: string;
  eventTitle: string;
  name: string;
  email: string;
  department: string;
  eventType: string;
}

interface AdminDashboardProps {
  registrations: Registration[];
  onClose: () => void;
}

export default function AdminDashboard({ registrations, onClose }: AdminDashboardProps) {
  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Department', 'Event', 'Type'];
    const rows = registrations.map(r => [r.name, r.email, r.department, r.eventTitle, r.eventType]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
  };

  const deptStats = registrations.reduce((acc, r) => {
    acc[r.department] = (acc[r.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeStats = registrations.reduce((acc, r) => {
    acc[r.eventType] = (acc[r.eventType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm overflow-y-auto z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-black text-white uppercase">Admin Dashboard</h1>
          <button onClick={onClose} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-teal-600 to-blue-600 p-6 rounded-xl">
            <div className="text-4xl font-black text-white">{registrations.length}</div>
            <div className="text-white/80">Total Registrations</div>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-6 rounded-xl">
            <div className="text-4xl font-black text-white">{Object.keys(deptStats).length}</div>
            <div className="text-white/80">Departments Active</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-xl">
            <div className="text-4xl font-black text-white">{Object.keys(typeStats).length}</div>
            <div className="text-white/80">Event Types</div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black text-white">Registrations</h2>
            <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">
              📥 Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-400 font-bold">Name</th>
                  <th className="py-3 px-4 text-gray-400 font-bold">Email</th>
                  <th className="py-3 px-4 text-gray-400 font-bold">Department</th>
                  <th className="py-3 px-4 text-gray-400 font-bold">Event</th>
                  <th className="py-3 px-4 text-gray-400 font-bold">Type</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="py-3 px-4 text-white">{reg.name}</td>
                    <td className="py-3 px-4 text-gray-300">{reg.email}</td>
                    <td className="py-3 px-4 text-gray-300">{reg.department}</td>
                    <td className="py-3 px-4 text-white font-bold">{reg.eventTitle}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        reg.eventType === 'technical' ? 'bg-teal-600' :
                        reg.eventType === 'cultural' ? 'bg-pink-600' : 'bg-green-600'
                      } text-white`}>
                        {reg.eventType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-black text-white mb-4">Department Participation</h3>
            {Object.entries(deptStats).map(([dept, count]) => (
              <div key={dept} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{dept}</span>
                  <span className="text-white font-bold">{count}</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${(count / registrations.length) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-black text-white mb-4">Event Type Distribution</h3>
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 capitalize">{type}</span>
                  <span className="text-white font-bold">{count}</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2">
                  <div className={`h-2 rounded-full ${
                    type === 'technical' ? 'bg-teal-500' :
                    type === 'cultural' ? 'bg-pink-500' : 'bg-green-500'
                  }`} style={{ width: `${(count / registrations.length) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
