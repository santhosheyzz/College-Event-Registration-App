import React from 'react';

interface Registration {
  id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  name: string;
  email: string;
  department: string;
  eventType: 'technical' | 'cultural' | 'sports';
  qrImageUrl?: string;
}

interface TicketCardProps {
  registration: Registration;
}

const typeColors = {
  technical: 'from-indigo-900 to-teal-600',
  cultural: 'from-pink-600 to-orange-500',
  sports: 'from-green-600 to-gray-800'
};

export default function TicketCard({ registration }: TicketCardProps) {
  return (
    <div className={`bg-gradient-to-br ${typeColors[registration.eventType]} rounded-xl overflow-hidden shadow-2xl`}>
      <div className="p-6 bg-black/40 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-black text-white uppercase">{registration.eventTitle}</h3>
            <p className="text-gray-300 text-sm mt-1">{registration.name}</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            {registration.qrImageUrl ? (
              <img src={registration.qrImageUrl} alt="QR" className="w-24 h-24 object-contain" />
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs text-center">
                QR Code<br/>{registration.id.slice(0, 8)}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
          <div>📅 {new Date(registration.eventDate).toLocaleDateString()}</div>
          <div>⏰ {registration.eventTime}</div>
          <div className="col-span-2">📍 {registration.venue}</div>
          <div className="col-span-2">🎓 {registration.department}</div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-sm font-bold transition">
            📅 Add to Calendar
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-bold transition">
            💬 Share
          </button>
        </div>
      </div>
    </div>
  );
}
