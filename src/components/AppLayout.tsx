import React, { useState, useEffect } from 'react';
import { events as initialEvents, Event } from '../data/events';
import EventCard from './EventCard';
import RegistrationModal from './RegistrationModal';
import SuccessModal from './SuccessModal';
import TicketCard from './TicketCard';
import AdminDashboard from './AdminDashboard';
import SplashScreen from './SplashScreen';
import { addToWaitlist, readWaitlistForEvent } from '@/lib/storage';
import { useToast } from '@/components/ui/use-toast';

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
}

export default function AppLayout() {
  const { toast } = useToast();
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'events' | 'tickets' | 'admin'>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [eventList, setEventList] = useState<Event[]>(initialEvents);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successEvent, setSuccessEvent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'technical' | 'cultural' | 'sports'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed' | 'upcoming'>('all');

  const handleRegister = (data: { name: string; email: string; department: string; eventId: string; paymentMethod?: 'cash' | 'upi' }) => {
    const event = eventList.find(e => e.id === data.eventId);
    if (!event) return;

    const newRegistration: Registration = {
      id: `REG-${Date.now()}`,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      venue: event.venue,
      name: data.name,
      email: data.email,
      department: data.department,
      eventType: event.type
    };

    const qrData = `EVENT:${event.title}|ID:${newRegistration.id}|NAME:${data.name}`;
    const encoded = encodeURIComponent(qrData);
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;
    const regWithQr: any = { ...newRegistration, qrData, qrImageUrl, paymentMethod: data.paymentMethod || 'cash' };

    setRegistrations([...registrations, regWithQr]);
    // decrement seats for the registered event (but never below 0)
    setEventList(prev => prev.map(e => e.id === data.eventId ? { ...e, seatsLeft: Math.max(0, e.seatsLeft - 1) } : e));
    setSuccessEvent(event.title);
    setSelectedEvent(null);
    setShowSuccess(true);
  };

  const handleJoinWaitlist = (data: { name: string; email: string; eventId: string }) => {
    addToWaitlist({ eventId: data.eventId, name: data.name, email: data.email });
    setSelectedEvent(null);
    toast({ title: 'Added to waitlist', description: 'We’ll notify you if seats open.' });
  };

  const filteredEvents = eventList.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Load registrations from localStorage on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('registrations');
      if (saved) {
        const parsed: Registration[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRegistrations(parsed);
        }
      }
    } catch {}
  }, []);

  // Persist registrations whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('registrations', JSON.stringify(registrations));
    } catch {}
  }, [registrations]);

  // Notify when waitlisted events have seats available
  useEffect(() => {
    eventList.forEach(ev => {
      if (ev.seatsLeft > 0 && readWaitlistForEvent(ev.id).length > 0) {
        toast({ title: `${ev.title}`, description: 'Seats available! If you’re on the waitlist, register now.' });
      }
    });
  }, [eventList, toast]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609031772_e3e61d21.webp" alt="Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-500 uppercase">
                  NPSBCET Events
                </h1>
                <p className="text-xs text-gray-400 hidden md:block">Unleash Your Fest Spirit</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'events' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`px-4 py-2 rounded-lg font-bold transition relative ${activeTab === 'tickets' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                My Tickets
                {registrations.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {registrations.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'admin' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeTab === 'events' && (
        <div className="relative h-96 overflow-hidden">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609038706_3a8ad1f4.webp"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider">
                Register. Rock. Repeat.
              </h2>
              <p className="text-xl text-gray-300">Join the most electrifying college events of the year</p>
              <button
                onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-4 rounded-lg font-black uppercase hover:shadow-lg hover:shadow-teal-500/50 transition"
              >
                Explore Events 🎸
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'events' && (
          <div id="events-section">
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <input
                type="text"
                placeholder="🔍 Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="technical">Technical</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">No events found matching your filters</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tickets' && (
          <div>
            <h2 className="text-3xl font-black text-white uppercase mb-6">My Tickets</h2>
            {registrations.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎫</div>
                <p className="text-gray-400 text-xl mb-4">No tickets yet</p>
                <button
                  onClick={() => setActiveTab('events')}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700"
                >
                  Browse Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registrations.map((reg) => (
                  <TicketCard key={reg.id} registration={reg} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <AdminDashboard registrations={registrations} onClose={() => setActiveTab('events')} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-black text-lg mb-4">About</h3>
              <p className="text-gray-400 text-sm">New Prince Shri Bhavani College of Engineering & Technology - Inspiring excellence in education.</p>
            </div>
            <div>
              <h3 className="text-white font-black text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400">About College</a></li>
                <li><a href="#" className="hover:text-teal-400">Departments</a></li>
                <li><a href="#" className="hover:text-teal-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-black text-lg mb-4">Events</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400">Technical</a></li>
                <li><a href="#" className="hover:text-teal-400">Cultural</a></li>
                <li><a href="#" className="hover:text-teal-400">Sports</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-black text-lg mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400">Facebook</a></li>
                <li><a href="#" className="hover:text-teal-400">Instagram</a></li>
                <li><a href="#" className="hover:text-teal-400">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 NPSBCET. Sponsored by Tmt. Abaranjee Ammal Educational Society</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegister}
          onJoinWaitlist={handleJoinWaitlist}
        />
      )}

      {showSuccess && (
        <SuccessModal
          eventTitle={successEvent}
          onClose={() => {
            setShowSuccess(false);
            setActiveTab('tickets');
          }}
        />
      )}
    </div>
  );
}
