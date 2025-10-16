import React, { useState } from 'react';
import { Event, departments } from '../data/events';

interface RegistrationModalProps {
  event: Event | null;
  onClose: () => void;
  onRegister: (data: { name: string; email: string; department: string; eventId: string; paymentMethod?: 'cash' | 'upi' }) => void;
  onJoinWaitlist?: (data: { name: string; email: string; eventId: string }) => void;
}

export default function RegistrationModal({ event, onClose, onRegister }: RegistrationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; department?: string }>({});
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi'>('cash');
  const [upiConfirmed, setUpiConfirmed] = useState(false);

  if (!event) return null;

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; department?: string } = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    } else if (!email.toLowerCase().includes('college') && !email.toLowerCase().includes('edu')) {
      newErrors.email = 'Please use your college email';
    }
    if (!department) newErrors.department = 'Department is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (event.seatsLeft <= 0) {
      // waitlist path
      if (typeof (onRegister as any).name === 'string') {}
      (onJoinWaitlist as any)?.({ name, email, eventId: event.id });
      return;
    }

    if (paymentMethod === 'upi' && !upiConfirmed) {
      // require confirmation before proceed
      setErrors({ ...errors });
      return;
    }

    onRegister({ name, email, department, eventId: event.id, paymentMethod });
  };

  const isValid = name && email && department && Object.keys(errors).length === 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/60 text-white w-10 h-10 rounded-full hover:bg-red-600 transition">✕</button>
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-black text-white uppercase">{event.title}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-400">📅 {new Date(event.date).toLocaleDateString()}</div>
            <div className="text-gray-400">⏰ {event.time}</div>
            <div className="text-gray-400">📍 {event.venue}</div>
            <div className="text-gray-400">💺 {event.seatsLeft} seats left</div>
          </div>
          <p className="text-gray-300">{event.description}</p>

          {event.status === 'open' && event.seatsLeft > 0 && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="College Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <p className="text-gray-300 text-sm font-bold">Payment</p>
                <div className="flex gap-3 text-sm">
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="radio" name="pay" checked={paymentMethod==='cash'} onChange={() => setPaymentMethod('cash')} />
                    Pay later / Cash at venue
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="radio" name="pay" checked={paymentMethod==='upi'} onChange={() => setPaymentMethod('upi')} />
                    Mock UPI
                  </label>
                </div>
                {paymentMethod === 'upi' && (
                  <div className="bg-black/30 border border-gray-700 rounded-lg p-3 space-y-2">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`UPI:${event.title}|AMOUNT:0`)}`}
                      alt="UPI"
                      className="w-32 h-32"
                    />
                    <label className="flex items-center gap-2 text-gray-300 text-sm">
                      <input type="checkbox" checked={upiConfirmed} onChange={(e) => setUpiConfirmed(e.target.checked)} />
                      I have completed the mock UPI payment.
                    </label>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-black text-lg uppercase tracking-wide transition-all ${
                  isValid
                    ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white hover:shadow-lg hover:shadow-teal-500/50'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {paymentMethod === 'upi' ? (upiConfirmed ? 'Confirm & Register' : 'Confirm Payment') : 'Register Now 🎸'}
              </button>
            </form>
          )}

          {event.status === 'closed' && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
              <p className="text-red-400 font-bold">Registration Closed</p>
            </div>
          )}

          {event.status === 'upcoming' && (
            <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 text-center">
              <p className="text-yellow-400 font-bold">Registration Opens Soon</p>
            </div>
          )}

          {event.seatsLeft <= 0 && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="College Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-black text-lg uppercase tracking-wide transition-all ${
                  name && email && Object.keys(errors).length === 0
                    ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white hover:shadow-lg hover:shadow-teal-500/50'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
