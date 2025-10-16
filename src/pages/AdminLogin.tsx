import React, { useState } from 'react';
import { setAdminLoggedIn } from '@/lib/storage';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setAdminLoggedIn(true);
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl">
        <h1 className="text-3xl font-black text-white uppercase mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full py-3 rounded-lg font-black uppercase bg-gradient-to-r from-teal-500 to-green-500 text-white">Login</button>
        </form>
      </div>
    </div>
  );
}


