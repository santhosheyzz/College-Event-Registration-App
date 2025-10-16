import React, { useEffect, useMemo, useState } from 'react';
import { events as initialEvents, Event, departments } from '@/data/events';
import { StoredRegistration, readRegistrations, writeRegistrations } from '@/lib/storage';

export default function RegisterPage() {
  const [events] = useState<Event[]>(initialEvents);
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const selectedEvent = useMemo(() => events.find(e => e.id === selectedEventId) || null, [events, selectedEventId]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ev = params.get('eventId');
    if (ev && events.some(e => e.id === ev)) {
      setSelectedEventId(ev);
    }
  }, [events]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    if (!name.trim() || !email.trim() || !department) {
      setMessage('Please fill all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Invalid email.');
      return;
    }

    const all = readRegistrations();
    const newReg: StoredRegistration = {
      id: `REG-${Date.now()}`,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      eventTime: selectedEvent.time,
      venue: selectedEvent.venue,
      name,
      email,
      department,
      eventType: selectedEvent.type
    };
    const qrData = `EVENT:${selectedEvent.title}|ID:${newReg.id}|NAME:${name}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    writeRegistrations([...all, { ...newReg, qrData, qrImageUrl }]);
    setMessage('Registered successfully. Check My Tickets.');
    setName('');
    setEmail('');
    setDepartment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-white uppercase mb-6">Participant Registration</h1>

        <form onSubmit={onSubmit} className="space-y-4 bg-gray-900 p-6 rounded-xl">
          <div>
            <label className="block text-gray-400 mb-2">Event</label>
            <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
              {events.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Full Name</label>
              <input value={name} onChange={(ev) => setName(ev.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">College Email</label>
              <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {message && <div className="text-teal-400 text-sm">{message}</div>}

          <button type="submit" className="w-full py-4 rounded-lg font-black text-lg uppercase tracking-wide bg-gradient-to-r from-teal-500 to-green-500 text-white hover:shadow-lg hover:shadow-teal-500/50">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}


