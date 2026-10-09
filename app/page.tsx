'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet Map with ssr: false
const FleetMap = dynamic(() => import('@/components/FleetMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] bg-[#060e20] flex items-center justify-center text-[#bbcabf] font-mono text-[12px]">
      Loading GIS Map...
    </div>
  ),
});

export default function PublicTelemetryDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTargetNode, setSelectedTargetNode] = useState('Apex Commercial Plaza • Out-104');
  const [pingingDriver, setPingingDriver] = useState<string | null>(null);

  const [trucks] = useState([
    { id: 'TRK-04', lat: 37.7749, lng: -122.4194, status: 'Active', capacity: 92 },
    { id: 'TRK-09', lat: 37.7833, lng: -122.4167, status: 'Active', capacity: 45 },
    { id: 'TRK-01', lat: 37.765, lng: -122.42, status: 'En Route', capacity: 64 },
    { id: 'TRK-07', lat: 37.75, lng: -122.41, status: 'Idle', capacity: 10 },
  ]);

  const [customers] = useState([
    { id: 'Out-104', name: 'Apex Commercial Plaza', lat: 37.772, lng: -122.415, fillLevel: 91 },
    { id: 'Out-089', name: 'Metro Medical Center', lat: 37.78, lng: -122.425, fillLevel: 18 },
    { id: 'Out-112', name: 'Harbor Freight Logistics', lat: 37.768, lng: -122.405, fillLevel: 96 },
  ]);

  const handleInterceptPing = (driverName: string) => {
    setPingingDriver(driverName);
    setTimeout(() => {
      alert(`Intercept directive dispatched to ${driverName}!`);
      setPingingDriver(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] font-sans text-[#dae2fd] antialiased">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#060e20]/85 backdrop-blur-xl shadow-lg border-b border-[#222a3d]">
        <div className="h-16 w-full px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="font-bold text-[18px] tracking-tight text-[#dae2fd]">WasteSync</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4edea3]/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
              </span>
              <span className="font-mono text-[10px] text-[#4edea3] uppercase">REALTIME LIVE</span>
            </div>
          </div>

          <div className="hidden xl:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bbcabf] text-[18px] pointer-events-none">
                search
              </span>
              <input
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#131b2e] text-[12px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:ring-1 focus:ring-[#adc6ff]"
                placeholder="Search fleet, truck ID, or outlet node..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-lg bg-[#10b981] text-[#00422b] font-semibold text-[15px]"
            >
              Public Telemetry
            </Link>
            <Link
              href="/dispatcher"
              className="px-4 py-1.5 rounded-lg text-[14px] text-[#bbcabf] hover:bg-[#222a3d] hover:text-[#dae2fd]"
            >
              Dispatcher Command Center
            </Link>
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-lg text-[14px] text-[#bbcabf] hover:bg-[#222a3d] hover:text-[#dae2fd]"
            >
              Portal Login
            </Link>
          </nav>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2">
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#222a3d] text-[#bbcabf]">
                Network: 99.8% Online
              </span>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[15px] font-semibold text-[#dae2fd]">Marcus Vance</div>
              <div className="font-mono text-[10px] text-[#bbcabf]">Dispatch Lead</div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 px-6 pb-12">
        <div className="flex flex-col gap-6 max-w-[1720px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-[24px] text-[#dae2fd] font-semibold">
                Autonomous Fleet & Outlet Telemetry
              </h1>
              <p className="text-[14px] text-[#bbcabf]">
                Live PostGIS tracking across metropolitan zones
              </p>
            </div>
            <Link
              href="/dispatcher"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#4edea3] text-[#003824] font-semibold text-[15px] hover:bg-[#6ffbbe]"
            >
              <span>Open Dispatcher Admin Center</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-8 w-full h-[620px] rounded-xl overflow-hidden bg-[#060e20] border border-[#222a3d] shadow-2xl relative">
              <FleetMap trucks={trucks} customers={customers} />
            </div>

            <div className="xl:col-span-4 w-full flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-[#222a3d] shadow-xl flex flex-col gap-4">
                <h2 className="text-[15px] font-semibold text-[#dae2fd]">PostGIS Proximity Engine</h2>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[#bbcabf] uppercase">
                    Target Node For Pickup
                  </label>
                  <select
                    className="w-full h-10 px-3 rounded-lg bg-[#171f33] border border-[#2d3449] text-[12px] text-[#dae2fd]"
                    value={selectedTargetNode}
                    onChange={(e) => setSelectedTargetNode(e.target.value)}
                  >
                    <option value="Apex Commercial Plaza • Out-104">Apex Commercial Plaza • Out-104 (91% Fill)</option>
                    <option value="Metro Medical Center • Out-089">Metro Medical Center • Out-089 (18% Fill)</option>
                    <option value="Harbor Freight Logistics • Out-112">Harbor Freight Logistics • Out-112 (96% Fill)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="p-3 rounded-lg bg-[#171f33] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#dae2fd]">Marcus Cole (TRK-04)</span>
                      <span className="font-mono text-[10px] text-[#4edea3]">1.82 km away</span>
                    </div>
                    <button
                      onClick={() => handleInterceptPing('Marcus Cole')}
                      disabled={pingingDriver === 'Marcus Cole'}
                      className="w-full py-2 px-3 rounded-lg bg-[#4edea3] text-[#003824] font-semibold text-[13px]"
                    >
                      {pingingDriver === 'Marcus Cole' ? 'Dispatching...' : 'Dispatch Intercept Ping'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}