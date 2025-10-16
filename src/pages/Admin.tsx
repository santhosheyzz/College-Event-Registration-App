import React, { useEffect, useMemo, useState } from 'react';
import { isAdminLoggedIn, readRegistrations } from '@/lib/storage';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [registrations, setRegistrations] = useState(readRegistrations());

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin-login');
      return;
    }
    setReady(true);
  }, [navigate]);

  const downloadCSV = () => {
    const headers = ['ID','Name','Email','Department','Event','Type','Date','Time','Venue'];
    const rows = registrations.map(r => [r.id, r.name, r.email, r.department, r.eventTitle, r.eventType, r.eventDate, r.eventTime, r.venue]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
  };

  const totals = useMemo(() => {
    return registrations.reduce((acc: Record<string, number>, r) => {
      acc[r.eventType] = (acc[r.eventType] || 0) + 1;
      return acc;
    }, {});
  }, [registrations]);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black uppercase">Admin Dashboard</h1>
          <button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-bold">Download CSV</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-teal-600 to-blue-600 p-6 rounded-xl">
            <div className="text-4xl font-black">{registrations.length}</div>
            <div className="text-white/80">Total Registrations</div>
          </div>
          {Object.entries(totals).map(([type, count]) => (
            <div key={type} className="bg-gradient-to-br from-pink-600 to-purple-600 p-6 rounded-xl">
              <div className="text-4xl font-black">{count}</div>
              <div className="text-white/80 capitalize">{type}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Venue</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id} className="border-b border-gray-800">
                  <td className="py-3 px-4">{reg.name}</td>
                  <td className="py-3 px-4 text-gray-300">{reg.email}</td>
                  <td className="py-3 px-4 text-gray-300">{reg.department}</td>
                  <td className="py-3 px-4 font-bold">{reg.eventTitle}</td>
                  <td className="py-3 px-4 capitalize">{reg.eventType}</td>
                  <td className="py-3 px-4">{reg.eventDate}</td>
                  <td className="py-3 px-4">{reg.eventTime}</td>
                  <td className="py-3 px-4">{reg.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


