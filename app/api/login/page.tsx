'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, KeyRound, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Save auth session token
        sessionStorage.setItem('wastesync_admin_authenticated', 'true');
        router.push('/dispatcher');
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mb-3 border border-emerald-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">WasteSync Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Authorized Dispatcher & Fleet Management Access</p>
        </div>

        {error && (
          <div className="mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                placeholder="e.g. admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dispatcher Center'}
          </button>
        </form>
      </div>
    </div>
  );
}