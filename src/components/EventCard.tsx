import React from 'react';
import { Event } from '../data/events';
import { useCountdown } from '@/hooks/useCountdown';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const typeColors = {
  technical: 'from-indigo-900 to-teal-600',
  cultural: 'from-pink-600 to-orange-500',
  sports: 'from-green-600 to-gray-800'
};

const statusBadge = {
  open: { text: '🟢 Open', color: 'bg-green-500' },
  closed: { text: '🔴 Closed', color: 'bg-red-500' },
  upcoming: { text: '🕒 Upcoming', color: 'bg-yellow-500' }
};

export default function EventCard({ event, onClick }: EventCardProps) {
  const isLowSeats = event.seatsLeft < 10 && event.status === 'open';
  const { days, hours, minutes, seconds, expired } = useCountdown(event.date, event.time);
  const shareEvent = () => {
    const url = `${window.location.origin}/register?eventId=${event.id}`;
    const text = `Join ${event.title} at ${event.venue} on ${new Date(event.date).toLocaleDateString()} ${event.time}. Register: ${url}`;
    const nav: any = navigator;
    if (nav.share) {
      nav.share({ title: event.title, text, url }).catch(() => {});
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(wa, '_blank');
    }
  };
  
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${typeColors[event.type]} cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-${event.type === 'technical' ? 'teal' : event.type === 'cultural' ? 'pink' : 'green'}-500/50`}
    >
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover opacity-80" />
      
      <div className="absolute top-3 right-3 flex gap-2">
        <span className={`${statusBadge[event.status].color} text-white text-xs px-3 py-1 rounded-full font-bold`}>
          {statusBadge[event.status].text}
        </span>
      </div>

      {isLowSeats && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
          Only {event.seatsLeft} left!
        </div>
      )}

      <div className="p-5 bg-black/60 backdrop-blur-sm">
        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">{event.title}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">
            <div>📅 {new Date(event.date).toLocaleDateString()}</div>
            <div>⏰ {event.time}</div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">{event.seatsLeft}/{event.totalSeats}</div>
            <div className="text-gray-400 text-xs">Seats Available</div>
          </div>
        </div>

        <div className="mt-3">
          {expired ? (
            <div className="text-red-400 text-sm font-bold">Event started/expired</div>
          ) : (
            <div className="text-teal-300 text-sm font-bold">
              Starts in: {days}d {hours}h {minutes}m {seconds}s
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={shareEvent}
            className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md font-bold"
          >
            Share
          </button>
          <a
            href="https://chat.whatsapp.com/EXAMPLE_GROUP_LINK"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-teal-300 underline"
          >
            Join WhatsApp Group
          </a>
        </div>
      </div>
    </div>
  );
}
