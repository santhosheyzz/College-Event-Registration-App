import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center space-y-6 animate-pulse">
        <img
          src="/logo.png"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609031772_e3e61d21.webp';
          }}
          alt="Logo"
          className="w-40 h-40 mx-auto drop-shadow-2xl animate-scale-in"
        />
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 uppercase tracking-wider">
          New Prince Shri Bhavani
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          College of Engineering & Technology
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
          Sponsored by Tmt. Abaranjee Ammal Educational Society
          <br />
          <span className="text-teal-400 font-semibold">Inspiring All-Sided Student Development</span>
        </p>
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
