'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet Map to bypass SSR issues
const FleetMap = dynamic(() => import('@/components/FleetMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] bg-[#060e20] flex items-center justify-center text-[#bbcabf] font-['JetBrains_Mono'] text-[12px]">
      <span className="material-symbols-outlined animate-spin mr-2">sync</span>
      Initializing PostGIS Vector GIS Map Engine...
    </div>
  ),
});

export default function PublicTelemetryDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTargetNode, setSelectedTargetNode] = useState('Apex Commercial Plaza • Out-104');
  const [pingingDriver, setPingingDriver] = useState<string | null>(null);

  // Mock fleet data to pass down to FleetMap if needed
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
      alert(`Intercept directive dispatched to ${driverName} via PostGIS telemetry stream!`);
      setPingingDriver(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] font-['Geist'] text-[#dae2fd] antialiased">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#060e20]/85 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(15,23,42,0.65)]">
        <div className="h-16 w-full px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="font-bold text-[18px] tracking-tight text-[#dae2fd]">WasteSync</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4edea3]/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] uppercase">REALTIME LIVE</span>
            </div>
          </div>

          <div className="hidden xl:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bbcabf] text-[18px] pointer-events-none">
                search
              </span>
              <input
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#131b2e] font-['Geist'] text-[12px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:ring-1 focus:ring-[#adc6ff] transition-all"
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
              className="px-4 py-1.5 rounded-lg transition-colors bg-[#10b981] text-[#00422b] font-semibold text-[15px]"
            >
              Public Telemetry
            </Link>
            <Link
              href="/dispatcher"
              className="px-4 py-1.5 rounded-lg text-[14px] text-[#bbcabf] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
            >
              Dispatcher Command Center
            </Link>
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-lg text-[14px] text-[#bbcabf] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
            >
              Portal Login
            </Link>
          </nav>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-[10px] px-2.5 py-1 rounded-full bg-[#222a3d] text-[#bbcabf]">
                Network: 99.8% Online
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] px-2.5 py-1 rounded-full bg-[#0566d9]/20 text-[#adc6ff]">
                GPS Sync: Active
              </span>
            </div>
            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-[15px] font-semibold text-[#dae2fd] leading-tight">Marcus Vance</div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">Dispatch Lead</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="w-full pt-16 bg-[#0b1326] min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col w-full">
          <div className="w-full px-6 py-6 flex flex-col gap-6">
            {/* Top Header Status Bar */}
            <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse shadow-[0_0_8px_rgba(78,222,163,0.6)]"></span>
                  <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#4edea3] font-bold">
                    GIS Live Stream • Buffer 2400ms
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#bbcabf] font-['JetBrains_Mono'] text-[10px]">
                    PostGIS v3.4 Engine
                  </span>
                </div>
                <h1 className="text-[24px] text-[#dae2fd] font-semibold tracking-tight">
                  Autonomous Fleet & Outlet Telemetry
                </h1>
                <p className="text-[14px] text-[#bbcabf]">
                  Live PostGIS tracking across metropolitan zones with telemetry sync frequency:{' '}
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#adc6ff]">2.4s</span>
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131b2e]">
                  <span className="material-symbols-outlined text-[#adc6ff] text-[18px]">satellite_alt</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">
                    Constellation Lock: <span className="text-[#dae2fd] font-semibold">14 Birds</span>
                  </span>
                </div>
                <Link
                  href="/dispatcher"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#4edea3] text-[#003824] font-semibold text-[15px] hover:bg-[#6ffbbe] shadow-[0_0_16px_rgba(78,222,163,0.35)] transition-all group"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                    lock
                  </span>
                  <span>Open Dispatcher Admin Center</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* 4-Column Metrics Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1 */}
              <div className="p-4 rounded-xl bg-[#222a3d] backdrop-blur-xl shadow-lg relative overflow-hidden group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider">
                    Active Fleet
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#adc6ff]/15 flex items-center justify-center text-[#adc6ff]">
                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[24px] font-bold text-[#dae2fd]">{trucks.length}</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#adc6ff]">Units Deployed</span>
                </div>
                <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] text-[#adc6ff] bg-[#adc6ff]/10 px-2 py-1 rounded w-fit">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>+2 reserve route • 100% EV/Hybrid</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-4 rounded-xl bg-[#222a3d] backdrop-blur-xl shadow-lg relative overflow-hidden group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider">
                    Serviced Outlets
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#4edea3]/15 flex items-center justify-center text-[#4edea3]">
                    <span className="material-symbols-outlined text-[20px]">domain</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[24px] font-bold text-[#dae2fd]">148</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#bbcabf]">/ 152 Today</span>
                </div>
                <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-2 py-1 rounded w-fit">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>98.6% compliance rate today</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-4 rounded-xl bg-[#222a3d] backdrop-blur-xl shadow-lg relative overflow-hidden group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider">
                    Pickups Completed
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#4edea3]/15 flex items-center justify-center text-[#4edea3]">
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[24px] font-bold text-[#dae2fd]">94</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] font-medium">
                    +18 vs yesterday
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] bg-[#171f33] px-2 py-1 rounded w-fit">
                  <span className="material-symbols-outlined text-[14px] text-[#4edea3]">trending_up</span>
                  <span>Target: 110 by 18:00 (Ahead)</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="p-4 rounded-xl bg-[#222a3d] backdrop-blur-xl shadow-lg relative overflow-hidden group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider">
                    Missed / Blocked
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#ffb4ab]/15 flex items-center justify-center text-[#ffb4ab]">
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[24px] font-bold text-[#ffb4ab]">3</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb4ab]/80">Pending Triage</span>
                </div>
                <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] bg-[#ffb4ab]/10 px-2 py-1 rounded w-fit">
                  <span className="material-symbols-outlined text-[14px]">report_problem</span>
                  <span>2 gate locks, 1 road closure</span>
                </div>
              </div>
            </div>

            {/* Split Workspace: 65% Interactive GIS Map | 35% Control Operations */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
              {/* GIS MAP CONTAINER (8 of 12 Cols) */}
              <div className="xl:col-span-8 w-full flex flex-col gap-2">
                <div className="relative w-full h-[620px] rounded-xl overflow-hidden bg-[#060e20] shadow-2xl flex flex-col justify-between border border-[#222a3d]">
                  <FleetMap trucks={trucks} customers={customers} />
                </div>

                {/* Regional Sub-Ribbon */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="p-2 rounded-lg bg-[#131b2e] flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">Metro Sector Alpha</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] font-bold">100% Svc</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#131b2e] flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">Bay Commercial Zone</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#adc6ff] font-bold">94% Svc</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#131b2e] flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">Harbor Light Industrial</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb95f] font-bold">88% Svc</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#131b2e] flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">Westside Residential</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] font-bold">99% Svc</span>
                  </div>
                </div>
              </div>

              {/* CONTROL PANEL CONTAINER (4 of 12 Cols) */}
              <div className="xl:col-span-4 w-full flex flex-col gap-4">
                {/* Operations Quick Actions */}
                <div className="p-4 rounded-xl bg-[#222a3d] backdrop-blur-xl shadow-xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[20px]">bolt</span>
                      <span className="text-[15px] font-semibold text-[#dae2fd]">Dispatcher Operations</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3]">
                      Priority Gate
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/dispatcher"
                      className="w-full p-3 rounded-lg bg-[#171f33] hover:bg-[#2d3449] flex items-center gap-3 transition-all group shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#10b981] text-[#00422b] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-[#dae2fd] flex items-center gap-1.5">
                          <span>Dispatcher Admin Center</span>
                          <span className="material-symbols-outlined text-[#86948a] text-[16px]">lock</span>
                        </div>
                        <div className="text-[12px] text-[#bbcabf] truncate">
                          Full route override, driver reassignments & alerts
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#bbcabf] group-hover:text-[#4edea3] transition-colors text-[20px]">
                        chevron_right
                      </span>
                    </Link>

                    <button className="w-full p-3 rounded-lg bg-[#131b2e] hover:bg-[#171f33] flex items-center gap-3 transition-all group shadow-sm text-left">
                      <div className="w-10 h-10 rounded-lg bg-[#adc6ff]/15 text-[#adc6ff] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">table_chart</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-[#dae2fd]">Export CSV Audit Report</div>
                        <div className="text-[12px] text-[#bbcabf] truncate">
                          Automated route logs, tonnage & compliance specs
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#bbcabf] group-hover:text-[#adc6ff] transition-colors text-[20px]">
                        download
                      </span>
                    </button>
                  </div>
                </div>

                {/* PostGIS Proximity Engine Widget */}
                <div className="p-4 rounded-xl bg-[#222a3d] backdrop-blur-xl shadow-xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#adc6ff] text-[22px]">radar</span>
                      <div>
                        <h2 className="text-[15px] font-semibold text-[#dae2fd]">PostGIS Proximity Engine</h2>
                        <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">Spatial Index R-Tree Search</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#adc6ff]/15 text-[#adc6ff] font-['JetBrains_Mono'] text-[10px]">
                      ST_DWithin 5km
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider">
                      Target Node For Immediate Pickup
                    </label>
                    <select
                      className="w-full h-11 px-3 rounded-lg bg-[#171f33] border border-[#2d3449] text-[12px] text-[#dae2fd] focus:outline-none focus:border-[#adc6ff] transition-all cursor-pointer"
                      value={selectedTargetNode}
                      onChange={(e) => setSelectedTargetNode(e.target.value)}
                    >
                      <option value="Apex Commercial Plaza • Out-104">Apex Commercial Plaza • Out-104 (91% Fill)</option>
                      <option value="Metro Medical Center • Out-089">Metro Medical Center • Out-089 (18% Fill)</option>
                      <option value="Harbor Freight Logistics • Out-112">Harbor Freight Logistics • Out-112 (96% Fill)</option>
                    </select>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#060e20] flex items-center gap-3">
                    <div className="w-1.5 h-7 rounded-full bg-[#4edea3] animate-pulse"></div>
                    <div className="flex-1">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#dae2fd] flex items-center justify-between">
                        <span>R-Tree Spatial Query Solved</span>
                        <span className="text-[#4edea3] font-bold">14ms</span>
                      </div>
                      <div className="w-full bg-[#171f33] h-1 rounded-full overflow-hidden mt-1">
                        <div className="bg-[#4edea3] h-full w-[92%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Candidate Trucks List */}
                  <div className="flex flex-col gap-3">
                    <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider flex items-center justify-between">
                      <span>Candidate Intercept Units</span>
                      <span className="text-[#adc6ff]">Sorted by Geo-Distance</span>
                    </div>

                    {/* Candidate 1 */}
                    <div className="p-3 rounded-lg bg-[#171f33] hover:bg-[#2d3449] transition-all flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#4edea3]/20 text-[#4edea3] font-['JetBrains_Mono'] text-[10px] flex items-center justify-center font-bold">
                            1
                          </span>
                          <div>
                            <div className="text-[14px] font-semibold text-[#dae2fd]">Marcus Cole</div>
                            <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">
                              Unit: <span className="text-[#adc6ff] font-bold">TRK-04</span> • 28-ton Compactor
                            </div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] font-['JetBrains_Mono'] text-[10px] font-bold">
                          1.82 km
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-1 px-2 rounded bg-[#060e20] font-['JetBrains_Mono'] text-[10px]">
                        <div>
                          <span className="text-[#bbcabf] block">EST ARRIVAL</span>
                          <span className="text-[#4edea3] font-bold">4 mins</span>
                        </div>
                        <div>
                          <span className="text-[#bbcabf] block">PAYLOAD</span>
                          <span className="text-[#dae2fd] font-bold">64% loaded</span>
                        </div>
                        <div>
                          <span className="text-[#bbcabf] block">STATUS</span>
                          <span className="text-[#adc6ff] font-bold">In Transit</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleInterceptPing('Marcus Cole (TRK-04)')}
                        disabled={pingingDriver === 'Marcus Cole (TRK-04)'}
                        className="w-full mt-1 py-2 px-3 rounded-lg bg-[#4edea3] text-[#003824] font-semibold text-[13px] hover:bg-[#6ffbbe] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {pingingDriver === 'Marcus Cole (TRK-04)' ? 'sync' : 'near_me'}
                        </span>
                        <span>
                          {pingingDriver === 'Marcus Cole (TRK-04)' ? 'Dispatching...' : 'Dispatch Intercept Ping'}
                        </span>
                      </button>
                    </div>

                    {/* Candidate 2 */}
                    <div className="p-3 rounded-lg bg-[#131b2e] hover:bg-[#171f33] transition-all flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#adc6ff]/20 text-[#adc6ff] font-['JetBrains_Mono'] text-[10px] flex items-center justify-center font-bold">
                            2
                          </span>
                          <div>
                            <div className="text-[14px] font-semibold text-[#dae2fd]">Elena Rostova</div>
                            <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">
                              Unit: <span className="text-[#adc6ff] font-bold">TRK-09</span> • Side-Loader EV
                            </div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#adc6ff]/15 text-[#adc6ff] font-['JetBrains_Mono'] text-[10px] font-bold">
                          3.15 km
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-1 px-2 rounded bg-[#060e20] font-['JetBrains_Mono'] text-[10px]">
                        <div>
                          <span className="text-[#bbcabf] block">EST ARRIVAL</span>
                          <span className="text-[#adc6ff] font-bold">8 mins</span>
                        </div>
                        <div>
                          <span className="text-[#bbcabf] block">PAYLOAD</span>
                          <span className="text-[#dae2fd] font-bold">42% loaded</span>
                        </div>
                        <div>
                          <span className="text-[#bbcabf] block">STATUS</span>
                          <span className="text-[#4edea3] font-bold">Available</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleInterceptPing('Elena Rostova (TRK-09)')}
                        disabled={pingingDriver === 'Elena Rostova (TRK-09)'}
                        className="w-full mt-1 py-2 px-3 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {pingingDriver === 'Elena Rostova (TRK-09)' ? 'sync' : 'near_me'}
                        </span>
                        <span>
                          {pingingDriver === 'Elena Rostova (TRK-09)' ? 'Dispatching...' : 'Dispatch Intercept Ping'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#060e20] py-6 mt-6 border-t border-[#222a3d]">
        <div className="w-full px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#bbcabf]">
          <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px]">
            <span className="material-symbols-outlined text-[16px] text-[#4edea3]">sync</span>
            <span>WasteSync Telematics Engine • Municipal Grid Architecture</span>
          </div>
          <div className="font-['JetBrains_Mono'] text-[10px]">
            © 2026 WasteSync Operations. All telemetry signals encrypted.
          </div>
        </div>
      </footer>
    </div>
  );
}