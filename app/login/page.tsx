'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DispatcherLoginPortal() {
  const router = useRouter();
  const [operatorId, setOperatorId] = useState('');
  const [securityPassword, setSecurityPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDispatcherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save session locally
    localStorage.setItem('wastesync_session', 'authenticated_operator_04');

    setTimeout(() => {
      setIsLoading(false);
      router.push('/dispatcher');
    }, 800);
  };

  return (
    <main className="min-h-screen w-full bg-[#0b1326] font-['Geist'] text-[#dae2fd] antialiased flex items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="w-full max-w-[440px] z-10 rounded-xl bg-[#171f33]/85 backdrop-blur-xl shadow-2xl p-8 border border-[#222a3d] space-y-6">
        <div className="text-center">
          <h1 className="text-[20px] font-bold text-[#dae2fd]">WasteSync Portal</h1>
          <p className="text-[12px] text-[#bbcabf] mt-1">Municipal Dispatch & Telematics Portal</p>
        </div>

        <form onSubmit={handleDispatcherLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] text-[#bbcabf] font-mono mb-1">Operator ID</label>
            <input
              type="text"
              required
              className="w-full bg-[#060e20] text-[#dae2fd] text-[14px] rounded-lg px-3 py-2.5 border border-[#222a3d] focus:outline-none focus:border-[#4edea3]"
              placeholder="e.g. OPR-9921"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#bbcabf] font-mono mb-1">Security Passkey</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full bg-[#060e20] text-[#dae2fd] text-[14px] rounded-lg px-3 py-2.5 border border-[#222a3d] focus:outline-none focus:border-[#adc6ff]"
              placeholder="••••••••••••"
              value={securityPassword}
              onChange={(e) => setSecurityPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-[#10b981] hover:bg-[#006c49] text-[#00422b] font-bold text-[15px] transition-all"
          >
            {isLoading ? 'Verifying Session...' : 'Sign In to Dispatch Center'}
          </button>
        </form>
      </div>
    </main>
  );
}