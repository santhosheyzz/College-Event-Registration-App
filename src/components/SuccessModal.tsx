import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
  eventTitle: string;
  onClose: () => void;
}

export default function SuccessModal({ eventTitle, onClose }: SuccessModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    // try to play success sound from public/success.mp3, fallback to a short beep
    const playSound = async () => {
      try {
        const audio = new Audio('/success.mp3');
        audio.volume = 0.6;
        await audio.play();
      } catch {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = 880; // A5
          o.connect(g);
          g.connect(ctx.destination);
          g.gain.setValueAtTime(0.0001, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
          o.start();
          o.stop(ctx.currentTime + 0.3);
        } catch {}
      }
    };
    playSound();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl p-8 max-w-md w-full text-center transform transition-all duration-500 ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-3xl font-black text-white uppercase mb-2">Success!</h2>
        <p className="text-white text-lg mb-6">
          You're registered for <span className="font-bold">{eventTitle}</span>
        </p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
          <p className="text-white text-sm">
            Your ticket has been generated and added to "My Tickets". 
            Check your email for confirmation details.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white text-green-600 py-3 rounded-lg font-black uppercase hover:bg-gray-100 transition"
        >
          View My Tickets
        </button>
      </div>
    </div>
  );
}
