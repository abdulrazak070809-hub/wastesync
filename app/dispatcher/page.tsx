'use client';

import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'directory' | 'dispatch' | 'register'>('directory');

  const [customers, setCustomers] = useState<CustomerNode[]>([
    {
      id: '1',
      code: '#OUT-1092',
      full_name: 'Metroplex Medical Center',
      phone: '+1 (555) 382-9100',
      address: '742 Evergreen Terrace, Sector 4',
      status: 'ACTIVE',
      fill_level: 18,
      last_serviced: 'Today, 08:30',
    },
    {
      id: '2',
      code: '#OUT-1048',
      full_name: 'CyberTech Innovation Hub',
      phone: '+1 (555) 891-2340',
      address: '100 Technology Blvd, Suite 200',
      status: 'ACTIVE',
      fill_level: 42,
      last_serviced: 'Yesterday, 18:00',
    },
    {
      id: '3',
      code: '#OUT-0931',
      full_name: 'Harbor Freight Logistics',
      phone: '+1 (555) 412-8821',
      address: '12 Marina Way, Pier 9',
      status: 'OVERDUE',
      fill_level: 96,
      last_serviced: '3 days ago',
    },
    {
      id: '4',
      code: '#OUT-0814',
      full_name: 'Bayview Residential Tower A',
      phone: '+1 (555) 723-1149',
      address: '500 Grand Ave, Floor G',
      status: 'ACTIVE',
      fill_level: 45,
      last_serviced: 'Yesterday, 14:15',
    },
    {
      id: '5',
      code: '#OUT-0772',
      full_name: 'Solstice Commercial Eatery',
      phone: '+1 (555) 209-5501',
      address: '88 Culinary Court',
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
    alert(`Route successfully assigned to ${dispatchForm.vehicleId} for node ${dispatchForm.customerId}!`);
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
      phone: newCustomerForm.phone || '+1 (555) 000-0000',
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

  return (
    <div className="min-h-screen bg-[#0b1326] font-['Geist'] text-[#dae2fd] antialiased">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#060e20] z-50 flex flex-col pt-16 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.65)]">
        <div className="px-4 py-2">
          <div className="font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase text-[#86948a] px-2 mb-1">
            Operations Feed
          </div>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <Link
            href="/dispatcher"
            className="flex items-center px-4 py-2.5 rounded-lg transition-colors bg-[#10b981] text-[#00422b] font-semibold text-[15px]"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">hub</span>
            <span>Command Console</span>
          </Link>
          <a
            href="#"
            className="flex items-center px-4 py-2.5 rounded-lg text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">alt_route</span>
            <span>Route Optimizer</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2.5 rounded-lg text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">local_shipping</span>
            <span>Fleet Telematics</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2.5 rounded-lg text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">sensors</span>
            <span>Sensor Matrix</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2.5 rounded-lg text-[#bbcabf] text-[14px] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">warning</span>
            <span>Hazard Alerts</span>
          </a>
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
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-lg text-[14px] text-[#bbcabf] hover:bg-[#222a3d] hover:text-[#dae2fd] transition-colors"
            >
              Portal Login
            </Link>
          </nav>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2">
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

        <main className="relative pt-16 bg-[#0b1326] min-h-screen">
          <div className="p-6 space-y-6 max-w-[1720px] mx-auto w-full">
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
                  <div className="w-10 h-10 rounded-xl bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3] shadow-[0_0_18px_rgba(78,222,163,0.18)]">
                    <span className="material-symbols-outlined text-[24px]">verified_user</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-[24px] font-bold tracking-tight text-[#dae2fd]">
                        Dispatcher Command Center
                      </h1>
                      <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#4edea3] font-['JetBrains_Mono'] text-[10px] uppercase">
                        Active Node 04-A
                      </span>
                    </div>
                    <p className="text-[14px] text-[#bbcabf]">
                      Centralized customer registry, automated fleet dispatch, and municipal outlet provisioning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#222a3d] text-[#bbcabf] font-['JetBrains_Mono'] text-[11px] shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">lock</span>
                  <span>
                    Session: <strong className="text-[#dae2fd] font-semibold">Secure HTTPS</strong>
                  </span>
                  <span className="text-[#86948a]">/</span>
                  <span className="text-[#adc6ff]">#8841-DX</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex p-1 rounded-xl bg-[#060e20] border border-[#222a3d]/80 shadow-md">
                <button
                  onClick={() => setActiveTab('directory')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-semibold transition-all ${
                    activeTab === 'directory'
                      ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_14px_rgba(78,222,163,0.25)]'
                      : 'text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">contacts</span>
                  <span>Customer Directory</span>
                  <span className="px-2 py-0.2 rounded-full bg-black/10 font-['JetBrains_Mono'] text-[10px]">
                    {customers.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('dispatch')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-semibold transition-all ${
                    activeTab === 'dispatch'
                      ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_14px_rgba(78,222,163,0.25)]'
                      : 'text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">alt_route</span>
                  <span>Assign Route</span>
                  <span className="px-2 py-0.2 rounded-full bg-[#e29100]/30 text-[#ffb95f] font-['JetBrains_Mono'] text-[10px]">
                    3 Pending
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-semibold transition-all ${
                    activeTab === 'register'
                      ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_14px_rgba(78,222,163,0.25)]'
                      : 'text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Register Outlet</span>
                </button>
              </div>

              <div className="hidden xl:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#222a3d] text-[#dae2fd]">
                  <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase">Network Load:</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] font-bold">142 Active / 4 Overdue</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#222a3d] text-[#dae2fd]">
                  <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">local_shipping</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase">Available Fleets:</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#adc6ff] font-bold">8 TRK Standby</span>
                </div>
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
                      className="w-full h-10 pl-9 pr-14 rounded-lg bg-[#060e20] border border-[#222a3d] font-['Geist'] text-[14px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff]/40 transition-all"
                      placeholder="Search name, phone, address, node ID..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#222a3d] border border-[#3c4a42] font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] pointer-events-none">
                      ⌘K
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 justify-between md:justify-end">
                    <div className="flex items-center gap-2">
                      <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">Filter:</span>
                      <div className="relative">
                        <select
                          className="h-10 pl-3 pr-8 rounded-lg bg-[#060e20] border border-[#222a3d] font-['JetBrains_Mono'] text-[11px] text-[#dae2fd] focus:outline-none focus:border-[#adc6ff] transition-all appearance-none cursor-pointer"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="all">All Statuses ({customers.length})</option>
                          <option value="active">● ACTIVE</option>
                          <option value="overdue">● OVERDUE</option>
                          <option value="suspended">● SUSPENDED</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-[#86948a] pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] bg-[#060e20] px-3 py-2 rounded-lg border border-[#222a3d]/60">
                      Showing <span className="text-[#dae2fd] font-bold">{filteredCustomers.length}</span> of{' '}
                      <span className="text-[#4edea3] font-bold">{customers.length}</span> customer nodes
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredCustomers.map((customer) => {
                    const isEditing = editingId === customer.id;

                    if (isEditing) {
                      return (
                        <div
                          key={customer.id}
                          className="p-6 rounded-xl bg-[#131b2e] border-2 border-[#4edea3]/50 shadow-[0_0_24px_rgba(78,222,163,0.12)] relative overflow-hidden transition-all"
                        >
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4edea3] via-[#adc6ff] to-[#4edea3]"></div>
                          <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#222a3d]">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">edit_note</span>
                              <span className="font-['JetBrains_Mono'] text-[11px] text-[#4edea3] font-bold uppercase tracking-wider">
                                EDITING NODE {customer.code}: {customer.full_name}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/20 text-[#4edea3] font-['JetBrains_Mono'] text-[10px]">
                              Session Lock Active
                            </span>
                          </div>

                          <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(customer.id); }} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="space-y-1">
                                <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                                  Customer Node Title
                                </label>
                                <input
                                  className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[#dae2fd] text-[14px] focus:outline-none focus:border-[#4edea3] transition-all"
                                  type="text"
                                  value={editForm.full_name || ''}
                                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                                  Direct Phone Line
                                </label>
                                <input
                                  className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[#dae2fd] text-[14px] focus:outline-none focus:border-[#4edea3] transition-all"
                                  type="text"
                                  value={editForm.phone || ''}
                                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                                  Civic Street Address
                                </label>
                                <input
                                  className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[#dae2fd] text-[14px] focus:outline-none focus:border-[#4edea3] transition-all"
                                  type="text"
                                  value={editForm.address || ''}
                                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                                  Provision Status
                                </label>
                                <select
                                  className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[#dae2fd] text-[14px] focus:outline-none focus:border-[#4edea3] transition-all"
                                  value={editForm.status || 'ACTIVE'}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, status: e.target.value as CustomerNode['status'] })
                                  }
                                >
                                  <option value="ACTIVE">ACTIVE (Continuous Sync)</option>
                                  <option value="OVERDUE">OVERDUE (Capacity Breach)</option>
                                  <option value="SUSPENDED">SUSPENDED (Off-Grid Lock)</option>
                                </select>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[#222a3d]/60">
                              <span className="text-[#86948a] font-['JetBrains_Mono'] text-[10px]">
                                Changes sync instantly across dispatch routing nodes.
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={handleCancelEdit}
                                  className="px-4 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-[12px] border border-[#86948a]/30 transition-all"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="px-5 py-2 rounded-lg bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] text-[12px] font-semibold transition-all shadow-[0_0_14px_rgba(78,222,163,0.3)] flex items-center gap-1.5"
                                >
                                  <span className="material-symbols-outlined text-[16px]">check</span>
                                  <span>Save Changes</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={customer.id}
                        className={`p-4 rounded-xl bg-[#131b2e]/90 backdrop-blur-md border transition-all shadow-sm ${
                          customer.status === 'OVERDUE'
                            ? 'border-[#ffb95f]/40 hover:border-[#ffb95f]'
                            : customer.status === 'SUSPENDED'
                            ? 'border-[#ffb4ab]/30 hover:border-[#ffb4ab]/60'
                            : 'border-[#222a3d] hover:border-[#31394d]'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-1.5 min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="text-[15px] font-semibold text-[#dae2fd]">{customer.full_name}</span>
                              <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#222a3d] text-[#adc6ff] border border-[#2d3449]">
                                {customer.code}
                              </span>

                              {customer.status === 'ACTIVE' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-['JetBrains_Mono'] text-[10px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
                                  ACTIVE
                                </span>
                              )}

                              {customer.status === 'OVERDUE' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffb95f]/10 border border-[#ffb95f]/30 text-[#ffb95f] font-['JetBrains_Mono'] text-[10px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-ping"></span>
                                  OVERDUE
                                </span>
                              )}

                              {customer.status === 'SUSPENDED' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffb4ab]/10 border border-[#ffb4ab]/40 text-[#ffb4ab] font-['JetBrains_Mono'] text-[10px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
                                  SUSPENDED
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#bbcabf] text-[12px]">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[15px] text-[#86948a]">call</span>
                                {customer.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[15px] text-[#86948a]">location_on</span>
                                {customer.address}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 justify-between lg:justify-end">
                            <div className="flex items-center gap-3 bg-[#060e20]/80 px-3 py-1.5 rounded-lg border border-[#222a3d]">
                              <div className="text-right">
                                <div className="font-['JetBrains_Mono'] text-[10px] text-[#86948a]">FILL LEVEL</div>
                                <div className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#4edea3]">
                                  {customer.fill_level}%
                                </div>
                              </div>
                              <div className="w-12 h-1.5 bg-[#171f33] rounded-full overflow-hidden">
                                <div className="h-full bg-[#4edea3]" style={{ width: `${customer.fill_level}%` }}></div>
                              </div>
                              <div className="border-l border-[#222a3d] pl-3 text-right">
                                <div className="font-['JetBrains_Mono'] text-[10px] text-[#86948a]">SERVICED</div>
                                <div className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf]">{customer.last_serviced}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {customer.status === 'OVERDUE' && (
                                <button
                                  onClick={() => setActiveTab('dispatch')}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ffb95f] hover:bg-[#ffddb8] text-[#472a00] text-[12px] font-semibold transition-all shadow-[0_0_10px_rgba(255,185,95,0.25)]"
                                >
                                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                                  <span>Force Route</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleStartEdit(customer)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#222a3d]/60 hover:bg-[#e29100]/30 border border-[#ffb95f]/40 text-[#ffb95f] text-[12px] transition-all"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => handleDeleteCustomer(customer.id, customer.full_name)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#222a3d]/60 hover:bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffb4ab] text-[12px] transition-all"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <aside className="2xl:col-span-4 space-y-4">
                <div
                  className={`p-6 rounded-xl bg-[#131b2e]/80 backdrop-blur-xl border border-[#222a3d] shadow-lg relative overflow-hidden transition-all ${
                    activeTab === 'dispatch' ? 'ring-2 ring-[#0566d9]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#222a3d]/80">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-[#0566d9]/20 text-[#adc6ff]">
                        <span className="material-symbols-outlined text-[18px]">alt_route</span>
                      </span>
                      <div>
                        <h3 className="text-[15px] font-bold text-[#dae2fd]">Assign Route Module</h3>
                        <p className="font-['JetBrains_Mono'] text-[10px] text-[#86948a]">RAPID DISPATCH ACTION</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#e29100]/20 text-[#ffb95f] font-['JetBrains_Mono'] text-[10px]">
                      3 Queued
                    </span>
                  </div>

                  <form onSubmit={handleDispatchRoute} className="space-y-3">
                    <div className="space-y-1">
                      <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                        Target Customer Node
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[12px] text-[#dae2fd] focus:outline-none focus:border-[#adc6ff] transition-all"
                        value={dispatchForm.customerId}
                        onChange={(e) => setDispatchForm({ ...dispatchForm, customerId: e.target.value })}
                      >
                        {customers.map((c) => (
                          <option key={c.id} value={c.code}>
                            {c.code} - {c.full_name} ({c.fill_level}% Fill)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                          Assign Vehicle
                        </label>
                        <select
                          className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[12px] text-[#dae2fd] focus:outline-none focus:border-[#adc6ff] transition-all"
                          value={dispatchForm.vehicleId}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, vehicleId: e.target.value })}
                        >
                          <option value="TRK-04">TRK-04 (Hauler 18T)</option>
                          <option value="TRK-02">TRK-02 (Rapid 8T)</option>
                          <option value="TRK-09">TRK-09 (Compact 5T)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                          Estimated ETA
                        </label>
                        <input
                          className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] font-['JetBrains_Mono'] text-[10px] text-[#adc6ff] focus:outline-none"
                          readOnly
                          type="text"
                          value={dispatchForm.eta}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                        Dispatch Directives & Safety Notes
                      </label>
                      <textarea
                        className="w-full p-2.5 rounded-lg bg-[#060e20] border border-[#222a3d] text-[12px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:border-[#adc6ff] transition-all"
                        placeholder="Gate code #4410, dock entrance B via West perimeter..."
                        rows={2}
                        value={dispatchForm.notes}
                        onChange={(e) => setDispatchForm({ ...dispatchForm, notes: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#0566d9] hover:bg-[#0566d9]/90 text-[#e6ecff] text-[15px] font-semibold transition-all shadow-[0_0_16px_rgba(5,102,217,0.3)] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Confirm Route Assignment</span>
                    </button>
                  </form>
                </div>

                <div
                  className={`p-6 rounded-xl bg-[#131b2e]/80 backdrop-blur-xl border border-[#222a3d] shadow-lg transition-all ${
                    activeTab === 'register' ? 'ring-2 ring-[#4edea3]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#222a3d]/80">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-[#4edea3]/20 text-[#4edea3]">
                        <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
                      </span>
                      <div>
                        <h3 className="text-[15px] font-bold text-[#dae2fd]">Register Outlet</h3>
                        <p className="font-['JetBrains_Mono'] text-[10px] text-[#86948a]">NEW NODE ONBOARDING</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleAddCustomer} className="space-y-3">
                    <div className="space-y-1">
                      <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                        Commercial Full Name
                      </label>
                      <input
                        className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[12px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:border-[#4edea3] transition-all"
                        placeholder="e.g. Apex Industrial Center"
                        type="text"
                        value={newCustomerForm.full_name}
                        onChange={(e) => setNewCustomerForm({ ...newCustomerForm, full_name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                          Contact Phone
                        </label>
                        <input
                          className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[12px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:border-[#4edea3] transition-all"
                          placeholder="+1 (555) 000-0000"
                          type="text"
                          value={newCustomerForm.phone}
                          onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                          Plan Status
                        </label>
                        <select
                          className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[12px] text-[#dae2fd] focus:outline-none focus:border-[#4edea3] transition-all"
                          value={newCustomerForm.status}
                          onChange={(e) =>
                            setNewCustomerForm({
                              ...newCustomerForm,
                              status: e.target.value as 'ACTIVE' | 'OVERDUE' | 'SUSPENDED',
                            })
                          }
                        >
                          <option value="ACTIVE">ACTIVE - Commercial</option>
                          <option value="SUSPENDED">SUSPENDED - Off-Grid</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-['JetBrains_Mono'] text-[10px] uppercase text-[#86948a]">
                        Street Address & Coordinates
                      </label>
                      <input
                        className="w-full h-10 px-3 rounded-lg bg-[#060e20] border border-[#222a3d] text-[12px] text-[#dae2fd] placeholder:text-[#86948a] focus:outline-none focus:border-[#4edea3] transition-all"
                        placeholder="Street line, sector & postal grid..."
                        type="text"
                        value={newCustomerForm.address}
                        onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] text-[15px] font-semibold transition-all shadow-[0_0_16px_rgba(78,222,163,0.25)] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_task</span>
                      <span>Save Customer Location</span>
                    </button>
                  </form>
                </div>

                <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
                      <span>Live Node GIS Spatial Radar</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3]">Sector 04 Active</span>
                  </div>
                  <div className="w-full h-44 rounded-lg bg-cover bg-center relative overflow-hidden border border-[#222a3d] bg-[#060e20]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent"></div>
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#060e20]/90 border border-[#4edea3] text-[#4edea3] font-['JetBrains_Mono'] text-[10px] shadow-lg">
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      <span>TRK-04 EN ROUTE</span>
                    </div>
                    <div className="absolute bottom-2 left-2 text-[#dae2fd] font-['JetBrains_Mono'] text-[10px] bg-[#060e20]/80 px-2 py-0.5 rounded border border-[#222a3d]">
                      37.7749° N, 122.4194° W
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}