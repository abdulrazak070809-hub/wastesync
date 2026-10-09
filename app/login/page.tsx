'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DispatcherLoginPortal() {
  const router = useRouter();
  const [operatorId, setOperatorId] = useState('');
  const [securityPassword, setSecurityPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSession, setKeepSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDispatcherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: operatorId, password: securityPassword, keepSession }),
      });

      if (res.ok) {
        router.push('/dispatcher');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.message || 'Invalid credentials. Verification failed.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Network error connecting to PostGIS gateway.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0b1326] font-['Geist'] text-[#dae2fd] antialiased flex items-center justify-center p-4 md:p-8 relative overflow-hidden select-none">
      {/* Dynamic Atmospheric GIS Vector Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#4edea3]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-20 w-[30rem] h-[30rem] bg-[#0566d9]/20 rounded-full blur-3xl"></div>

        {/* Vector Circuit Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 text-[#3c4a42]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="telematics-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="1 3"
              />
              <circle cx="24" cy="24" r="0.75" fill="currentColor" className="text-[#4edea3] opacity-60" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#telematics-grid)" />
          <path
            d="M 120 180 Q 320 280 540 160 T 960 380"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
            className="text-[#adc6ff] opacity-30"
          />
        </svg>
      </div>

      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* Operational Telemetry Header Bar */}
        <div className="w-full flex items-center justify-between mb-4 z-10 px-2 font-['JetBrains_Mono'] text-[10px]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="text-[#4edea3] tracking-wider uppercase">NODE CLUSTER 04 // CONNECTED</span>
          </div>
          <div className="flex items-center gap-2 text-[#bbcabf]">
            <span className="material-symbols-outlined text-[14px] text-[#adc6ff]">satellite_alt</span>
            <span>LAT 38.8951° N</span>
          </div>
        </div>

        {/* Dispatcher Login Card */}
        <div className="relative w-full z-10 rounded-xl bg-[#171f33]/85 backdrop-blur-xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 border border-[#222a3d]">
          {/* Emblem & Branding Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3 flex items-center justify-center">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#4edea3]/30 to-[#0566d9]/30 rounded-xl blur-md opacity-60"></div>
              <div className="relative w-14 h-14 rounded-xl bg-[#060e20] flex items-center justify-center shadow-inner border border-[#222a3d]">
                <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 50C22 34.536 34.536 22 50 22C61.42 22 71.26 28.82 75.64 38.64"
                    stroke="#4edea3"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M68 40L78 40L82 30"
                    stroke="#4edea3"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M78 50C78 65.464 65.464 78 50 78C38.58 78 28.74 71.18 24.36 61.36"
                    stroke="#0566d9"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32 60L22 60L18 70"
                    stroke="#0566d9"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="50" cy="50" r="8" fill="#4edea3" />
                  <circle cx="50" cy="50" r="3.5" fill="#0b1326" />
                </svg>
              </div>
            </div>

            <h1 className="text-[20px] text-[#dae2fd] tracking-tight font-semibold">WasteSync Portal</h1>
            <p className="text-[12px] text-[#bbcabf] mt-0.5">Municipal Logistics Engine & Fleet Telematics</p>

            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#222a3d] text-[#dae2fd]">
              <span className="material-symbols-outlined text-[12px] text-[#4edea3]">lock</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider">
                AES-256 GCM SECURED GATEWAY
              </span>
            </div>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffb4ab] font-['JetBrains_Mono'] text-[11px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleDispatcherLogin} className="flex flex-col gap-4">
            {/* Operator ID */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline font-['JetBrains_Mono'] text-[11px]">
                <label htmlFor="operatorId" className="text-[#bbcabf] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#4edea3]">badge</span>
                  Operator ID / Username
                </label>
                <span className="text-[#86948a] text-[10px]">OPR-ID / SSO</span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86948a] group-focus-within:text-[#4edea3] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">person_pin</span>
                </div>
                <input
                  id="operatorId"
                  type="text"
                  required
                  className="w-full bg-[#060e20] text-[#dae2fd] text-[14px] rounded-lg pl-10 pr-3.5 py-2.5 placeholder:text-[#86948a]/70 focus:outline-none focus:ring-1 focus:ring-[#4edea3] transition-all"
                  placeholder="e.g. dispatcher@wastesync.io or OPR-9921"
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                />
              </div>
            </div>

            {/* Security Passkey */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline font-['JetBrains_Mono'] text-[11px]">
                <label htmlFor="securityPassword" className="text-[#bbcabf] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#adc6ff]">key</span>
                  Security Passkey
                </label>
                <a href="#" className="text-[#adc6ff] hover:text-[#d8e2ff] transition-colors text-[10px]">
                  Forgot passkey?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86948a] group-focus-within:text-[#adc6ff] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">shield_lock</span>
                </div>
                <input
                  id="securityPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-[#060e20] text-[#dae2fd] text-[14px] rounded-lg pl-10 pr-11 py-2.5 placeholder:text-[#86948a]/70 focus:outline-none focus:ring-1 focus:ring-[#adc6ff] transition-all"
                  placeholder="••••••••••••••••"
                  value={securityPassword}
                  onChange={(e) => setSecurityPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#86948a] hover:text-[#dae2fd] transition-colors"
                  title="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Session Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-[#060e20] text-[#4edea3] accent-[#4edea3] cursor-pointer"
                  checked={keepSession}
                  onChange={(e) => setKeepSession(e.target.checked)}
                />
                <span className="text-[12px] text-[#bbcabf]">Hold session for 12h dispatch shift</span>
              </label>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                STANAG-V4
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-[#10b981] hover:bg-[#006c49] text-[#00422b] font-semibold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#10b981]/20 transition-all cursor-pointer disabled:opacity-75 disabled:cursor-wait"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isLoading ? 'progress_activity' : 'security'}
              </span>
              <span>{isLoading ? 'Verifying Geo-Credentials...' : 'Sign In to Dispatch Center'}</span>
              {!isLoading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </button>
          </form>

          {/* Card Footer */}
          <div className="pt-3 flex flex-col gap-3 border-t border-[#222a3d]">
            <p className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] leading-tight text-center">
              Protected under Enterprise Zero-Trust Protocol. Unauthorized access attempts are cryptographically stamped and streamed to PostGIS audit telemetry.
            </p>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#060e20] text-[#dae2fd]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">
                  Gateway: <strong className="text-[#dae2fd] font-semibold">US-East-1 GeoMesh</strong>
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3]">99.98% Latency 14ms</span>
            </div>
          </div>
        </div>

        {/* System Strip */}
        <div className="w-full flex items-center justify-between mt-4 px-3 font-['JetBrains_Mono'] text-[10px] text-[#86948a] z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[12px]">tune</span>
            <span>DSP-KERNEL v4.19.2</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hover:text-[#dae2fd] cursor-pointer transition-colors">Emergency Protocol</span>
            <span>•</span>
            <span className="hover:text-[#dae2fd] cursor-pointer transition-colors">NOC Desk</span>
          </div>
        </div>
      </div>
    </main>
  );
}