'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CustomerNode {
  id: string;
  code: string;
  full_name: string;
  phone: string;
  address: string;
  status: 'ACTIVE' | 'OVERDUE' | 'SUSPENDED';
  fill_level: number;
  last_serviced: string;
}

export default function DispatcherCommandCenter() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Active View State for Sidebar
  const [activeView, setActiveView] = useState<'console' | 'optimizer' | 'telematics' | 'sensors' | 'hazards'>('console');
  
  // Tab Navigation for Command Console View
  const [activeTab, setActiveTab] = useState<'directory' | 'dispatch' | 'register'>('directory');

  // Route Protection Check
  useEffect(() => {
    const session = localStorage.getItem('wastesync_session');
    if (!session) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Nigerian Regional Data Nodes
  const [customers, setCustomers] = useState<CustomerNode[]>([
    {
      id: '1',
      code: '#OUT-1092',
      full_name: 'Central District Medical Center',
      phone: '+234 803 123 4567',
      address: '742 Independence Avenue, Phase 1, Abuja',
      status: 'ACTIVE',
      fill_level: 18,
      last_serviced: 'Today, 08:30',
    },
    {
      id: '2',
      code: '#OUT-1048',
      full_name: 'Maitama Tech Innovation Hub',
      phone: '+234 812 987 6543',
      address: '100 Aguiyi Ironsi St, Maitama, Abuja',
      status: 'ACTIVE',
      fill_level: 42,
      last_serviced: 'Yesterday, 18:00',
    },
    {
      id: '3',
      code: '#OUT-0931',
      full_name: 'Wuse Market Logistics Terminal',
      phone: '+234 705 444 8821',
      address: 'Block B, Wuse Zone 5, Abuja',
      status: 'OVERDUE',
      fill_level: 96,
      last_serviced: '3 days ago',
    },
    {
      id: '4',
      code: '#OUT-0814',
      full_name: 'Asokoro Residential Towers',
      phone: '+234 809 723 1149',
      address: '500 Yakubu Gowon Way, Asokoro',
      status: 'ACTIVE',
      fill_level: 45,
      last_serviced: 'Yesterday, 14:15',
    },
    {
      id: '5',
      code: '#OUT-0772',
      full_name: 'Jabi Lake Commercial Plaza',
      phone: '+234 901 209 5501',
      address: '88 Alex Ekwueme Way, Jabi, Abuja',
      status: 'SUSPENDED',
      fill_level: 80,
      last_serviced: '14 days ago',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CustomerNode>>({});

  const [dispatchForm, setDispatchForm] = useState({
    customerId: '#OUT-0931',
    vehicleId: 'TRK-04',
    eta: '18 Mins (Express)',
    notes: '',
  });

  const [newCustomerForm, setNewCustomerForm] = useState({
    full_name: '',
    phone: '',
    status: 'ACTIVE' as 'ACTIVE' | 'OVERDUE' | 'SUSPENDED',
    address: '',
  });

  const handleLogout = async () => {
    localStorage.removeItem('wastesync_session');
    try {
      await fetch('/api/login', { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    router.push('/login');
  };

  const handleStartEdit = (customer: CustomerNode) => {
    setEditingId(customer.id);
    setEditForm(customer);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = (id: string) => {
    setCustomers((prev) =>
      prev.map((item) => (item.id === id ? ({ ...item, ...editForm } as CustomerNode) : item))
    );
    setEditingId(null);
    setEditForm({});
  };

  const handleDeleteCustomer = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete node: ${name}?`)) {
      setCustomers((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleDispatchRoute = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Route assigned to ${dispatchForm.vehicleId} for node ${dispatchForm.customerId}!`);
    setDispatchForm({ customerId: '#OUT-0931', vehicleId: 'TRK-04', eta: '18 Mins (Express)', notes: '' });
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerForm.full_name || !newCustomerForm.address) {
      alert('Please fill out all required fields.');
      return;
    }
    const newNode: CustomerNode = {
      id: Date.now().toString(),
      code: `#OUT-${Math.floor(1000 + Math.random() * 9000)}`,
      full_name: newCustomerForm.full_name,
      phone: newCustomerForm.phone || '+234 800 000 0000',
      address: newCustomerForm.address,
      status: newCustomerForm.status,
      fill_level: 0,
      last_serviced: 'Just now',
    };
    setCustomers((prev) => [newNode, ...prev]);
    setNewCustomerForm({ full_name: '', phone: '', status: 'ACTIVE', address: '' });
    alert('Customer node successfully registered!');
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || customer.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-[#bbcabf] font-mono text-[12px]">
        Verifying Security Session Token...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1326] font-['Geist'] text-[#dae2fd] antialiased">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#060e20] z-50 flex flex-col pt-16 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.65)]">
        <div className="px-4 py-2">
          <div className="font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase text-[#86948a] px-2 mb-1">
            Operations Feed
          </div>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <button
            onClick={() => setActiveView('console')}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors text-left ${
              activeView === 'console'
                ? 'bg-[#10b981] text-[#00422b] font-semibold text-[15px]'
                : 'text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">hub</span>
            <span>Command Console</span>
          </button>

          <button
            onClick={() => setActiveView('optimizer')}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors text-left ${
              activeView === 'optimizer'
                ? 'bg-[#10b981] text-[#00422b] font-semibold text-[15px]'
                : 'text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">alt_route</span>
            <span>Route Optimizer</span>
          </button>

          <button
            onClick={() => setActiveView('telematics')}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors text-left ${
              activeView === 'telematics'
                ? 'bg-[#10b981] text-[#00422b] font-semibold text-[15px]'
                : 'text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">local_shipping</span>
            <span>Fleet Telematics</span>
          </button>

          <button
            onClick={() => setActiveView('sensors')}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors text-left ${
              activeView === 'sensors'
                ? 'bg-[#10b981] text-[#00422b] font-semibold text-[15px]'
                : 'text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">sensors</span>
            <span>Sensor Matrix</span>
          </button>

          <button
            onClick={() => setActiveView('hazards')}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors text-left ${
              activeView === 'hazards'
                ? 'bg-[#10b981] text-[#00422b] font-semibold text-[15px]'
                : 'text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">warning</span>
            <span>Hazard Alerts</span>
          </button>
        </nav>

        <div className="p-4 bg-[#131b2e]/60 m-2 rounded-lg">
          <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] mb-1">
            <span>Depot Fleet Load</span>
            <span className="text-[#4edea3] font-bold">84%</span>
          </div>
          <div className="w-full h-1.5 bg-[#171f33] rounded-full overflow-hidden">
            <div className="h-full bg-[#10b981] rounded-full" style={{ width: '84%' }}></div>
          </div>
        </div>
      </aside>

      <div className="pl-64">
        {/* Header Bar */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#060e20]/85 backdrop-blur-xl z-40 flex items-center justify-between px-6 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.65)]">
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

          <div className="hidden xl:flex items-center flex-1 max-w-sm mx-6">
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

          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-lg text-[14px] text-[#bbcabf] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
            >
              Public Telemetry
            </Link>
            <Link
              href="/dispatcher"
              className="px-4 py-1.5 rounded-lg transition-colors bg-[#10b981] text-[#00422b] font-semibold text-[15px]"
            >
              Dispatcher Command Center
            </Link>
          </nav>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-[15px] font-semibold text-[#dae2fd] leading-tight">Marcus Vance</div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">Dispatch Lead</div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#131b2e] hover:bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffb4ab] text-[12px] transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Main Workspace Content */}
        <main className="relative pt-16 bg-[#0b1326] min-h-screen">
          <div className="p-6 space-y-6 max-w-[1720px] mx-auto w-full">
            {/* VIEW 1: COMMAND CONSOLE */}
            {activeView === 'console' && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#222a3d]/60">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] text-[#4edea3] hover:text-[#6ffbbe] transition-colors group mb-1"
                    >
                      <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">
                        arrow_back
                      </span>
                      <span>Back to Dashboard</span>
                    </Link>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                        <span className="material-symbols-outlined text-[24px]">verified_user</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h1 className="text-[24px] font-bold tracking-tight text-[#dae2fd]">
                            Dispatcher Command Center
                          </h1>
                          <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#4edea3] font-['JetBrains_Mono'] text-[10px] uppercase">
                            Active Node 04-A (Abuja)
                          </span>
                        </div>
                        <p className="text-[14px] text-[#bbcabf]">
                          Centralized customer registry, automated fleet dispatch, and municipal outlet provisioning.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex p-1 rounded-xl bg-[#060e20] border border-[#222a3d]/80 shadow-md">
                    <button
                      onClick={() => setActiveTab('directory')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-semibold transition-all ${
                        activeTab === 'directory'
                          ? 'bg-[#4edea3] text-[#003824]'
                          : 'text-[#bbcabf] hover:text-[#dae2fd]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">contacts</span>
                      <span>Customer Directory</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('dispatch')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-semibold transition-all ${
                        activeTab === 'dispatch'
                          ? 'bg-[#4edea3] text-[#003824]'
                          : 'text-[#bbcabf] hover:text-[#dae2fd]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">alt_route</span>
                      <span>Assign Route</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('register')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-semibold transition-all ${
                        activeTab === 'register'
                          ? 'bg-[#4edea3] text-[#003824]'
                          : 'text-[#bbcabf] hover:text-[#dae2fd]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">add_circle</span>
                      <span>Register Outlet</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6 items-start">
                  <section className="2xl:col-span-8 space-y-4">
                    <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="relative flex-1 max-w-lg">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#86948a] text-[18px] pointer-events-none">
                          search
                        </span>
                        <input
                          className="w-full h-10 pl-9 pr-14 rounded-lg bg-[#060e20] border border-[#222a3d] font-['Geist'] text-[14px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:border-[#adc6ff]"
                          placeholder="Search name, phone, address, node ID..."
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {filteredCustomers.map((customer) => (
                        <div key={customer.id} className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d]">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[15px] font-semibold text-[#dae2fd]">{customer.full_name}</span>
                                <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#222a3d] text-[#adc6ff]">
                                  {customer.code}
                                </span>
                              </div>
                              <p className="text-[12px] text-[#bbcabf] mt-1">{customer.address}</p>
                              <p className="text-[12px] text-[#86948a]">{customer.phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3]">
                                Fill Level: {customer.fill_level}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* VIEW 2: ROUTE OPTIMIZER */}
            {activeView === 'optimizer' && (
              <div className="p-6 rounded-xl bg-[#131b2e] border border-[#222a3d] space-y-4">
                <div className="flex items-center gap-3 border-b border-[#222a3d] pb-3">
                  <span className="material-symbols-outlined text-[#4edea3] text-[28px]">alt_route</span>
                  <div>
                    <h2 className="text-[20px] font-bold text-[#dae2fd]">PostGIS Route Optimizer</h2>
                    <p className="text-[13px] text-[#bbcabf]">Autonomous shortest-path algorithmic calculation</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-[#060e20] border border-[#222a3d]">
                    <div className="text-[12px] text-[#bbcabf]">ACTIVE SECTOR</div>
                    <div className="text-[16px] font-bold text-[#4edea3]">Abuja Municipal Phase 1</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#060e20] border border-[#222a3d]">
                    <div className="text-[12px] text-[#bbcabf]">FUEL SAVINGS INDEX</div>
                    <div className="text-[16px] font-bold text-[#adc6ff]">18.4% Optimization Rate</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#060e20] border border-[#222a3d]">
                    <div className="text-[12px] text-[#bbcabf]">TRAFFIC RE-ROUTING</div>
                    <div className="text-[16px] font-bold text-[#ffb95f]">Active Auto-Avoidance</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: FLEET TELEMATICS */}
            {activeView === 'telematics' && (
              <div className="p-6 rounded-xl bg-[#131b2e] border border-[#222a3d] space-y-4">
                <div className="flex items-center gap-3 border-b border-[#222a3d] pb-3">
                  <span className="material-symbols-outlined text-[#adc6ff] text-[28px]">local_shipping</span>
                  <div>
                    <h2 className="text-[20px] font-bold text-[#dae2fd]">Fleet Telematics Array</h2>
                    <p className="text-[13px] text-[#bbcabf]">Real-time vehicle diagnostics & fuel telemetry</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[#060e20] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#dae2fd]">TRK-04 (18T Heavy Compactor)</div>
                      <div className="text-[12px] text-[#bbcabf]">Driver: Marcus Cole • Fuel 82% • Battery 99%</div>
                    </div>
                    <span className="px-2 py-1 bg-[#4edea3]/20 text-[#4edea3] rounded font-mono text-[10px]">
                      EN ROUTE - WUSE 2
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: SENSOR MATRIX */}
            {activeView === 'sensors' && (
              <div className="p-6 rounded-xl bg-[#131b2e] border border-[#222a3d] space-y-4">
                <div className="flex items-center gap-3 border-b border-[#222a3d] pb-3">
                  <span className="material-symbols-outlined text-[#4edea3] text-[28px]">sensors</span>
                  <div>
                    <h2 className="text-[20px] font-bold text-[#dae2fd]">IoT Ultrasonic Sensor Matrix</h2>
                    <p className="text-[13px] text-[#bbcabf]">Municipal bin telemetry & compaction metrics</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-[#060e20] rounded-lg">
                    <div className="text-[10px] text-[#86948a]">TOTAL ACTIVE SENSORS</div>
                    <div className="text-[20px] font-bold text-[#4edea3]">148 Bins</div>
                  </div>
                  <div className="p-3 bg-[#060e20] rounded-lg">
                    <div className="text-[10px] text-[#86948a]">CRITICAL CAPACITY (&gt;90%)</div>
                    <div className="text-[20px] font-bold text-[#ffb95f]">3 Bins</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 5: HAZARD ALERTS */}
            {activeView === 'hazards' && (
              <div className="p-6 rounded-xl bg-[#131b2e] border border-[#222a3d] space-y-4">
                <div className="flex items-center gap-3 border-b border-[#222a3d] pb-3">
                  <span className="material-symbols-outlined text-[#ffb4ab] text-[28px]">warning</span>
                  <div>
                    <h2 className="text-[20px] font-bold text-[#dae2fd]">Hazard & Obstacle Alerts</h2>
                    <p className="text-[13px] text-[#bbcabf]">Road closures, gate code locks & spill reports</p>
                  </div>
                </div>
                <div className="p-3 bg-[#93000a]/20 border border-[#ffb4ab]/40 rounded-lg text-[#ffb4ab] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">block</span>
                    <span>Wuse Zone 5 Outlet Gate Lock #4410 Unresponsive</span>
                  </div>
                  <button className="px-3 py-1 bg-[#ffb4ab] text-[#690005] font-semibold text-[12px] rounded">
                    Triage Dispatch
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}