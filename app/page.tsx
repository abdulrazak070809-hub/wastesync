'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { exportToCSV } from '@/lib/export';
import { Truck, Users, CheckCircle, AlertTriangle, RefreshCw, Navigation, Download, Smartphone, Lock, Unlock } from 'lucide-react';
import Modal from '@/components/Modal';

// Disable SSR for Mapbox GL component to prevent Vercel build/runtime crashes
const FleetMap = dynamic(() => import('@/components/FleetMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] bg-slate-900 flex items-center justify-center rounded-lg border border-slate-700/50">
      <p className="text-sm text-slate-400 animate-pulse">Loading Mapbox Telemetry...</p>
    </div>
  ),
});

export default function DispatcherDashboard() {
  const [stats, setStats] = useState({
    totalTrucks: 0,
    activeCustomers: 0,
    completedPickups: 0,
    missedPickups: 0,
  });
  const [trucks, setTrucks] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Visibility States
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  // Admin Auth Gate State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passcodeModalOpen, setPasscodeModalOpen] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [pendingAction, setPendingAction] = useState<'customer' | 'dispatch' | null>(null);

  // Proximity Query States
  const [selectedCustomerForProximity, setSelectedCustomerForProximity] = useState('');
  const [nearestTrucks, setNearestTrucks] = useState<any[]>([]);
  const [calculatingProximity, setCalculatingProximity] = useState(false);

  // Form States
  const [customerForm, setCustomerForm] = useState({
    full_name: '',
    phone_number: '',
    address: '',
    subscription_status: 'ACTIVE',
  });

  const [dispatchForm, setDispatchForm] = useState({
    customer_id: '',
    truck_id: '',
    notes: 'Scheduled for dispatch pickup',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDashboardData();

    // Check if admin is unlocked in current browser session
    const unlocked = sessionStorage.getItem('wastesync_admin_unlocked');
    if (unlocked === 'true') {
      setIsAdminUnlocked(true);
    }

    // Subscribe to live Postgres database changes
    const channel = supabase
      .channel('wastesync-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trucks' }, () => fetchDashboardData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'customers' }, () => fetchDashboardData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pickup_logs' }, () => fetchDashboardData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const { count: truckCount } = await supabase.from('trucks').select('*', { count: 'exact', head: true });
      const { count: customerCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });
      const { count: completedCount } = await supabase.from('pickup_logs').select('*', { count: 'exact', head: true }).eq('status', 'COLLECTED');
      const { count: missedCount } = await supabase.from('pickup_logs').select('*', { count: 'exact', head: true }).eq('status', 'MISSED');

      setStats({
        totalTrucks: truckCount || 0,
        activeCustomers: customerCount || 0,
        completedPickups: completedCount || 0,
        missedPickups: missedCount || 0,
      });

      const { data: truckData } = await supabase.from('trucks').select('*');
      const { data: customerData } = await supabase.from('customers').select('*');

      const formattedTrucks = (truckData || []).map((t, idx) => ({
        id: t.id,
        plate_number: t.plate_number,
        driver_name: t.driver_name,
        coordinates: [3.3792 + idx * 0.02, 6.5244 + idx * 0.01] as [number, number],
      }));

      const formattedCustomers = (customerData || []).map((c, idx) => ({
        id: c.id,
        full_name: c.full_name,
        address: c.address,
        status: c.subscription_status,
        coordinates: [3.3551 + idx * 0.03, 6.5912 - idx * 0.02] as [number, number],
      }));

      setTrucks(formattedTrucks);
      setCustomers(formattedCustomers);
    } catch (err) {
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  }

  // Admin Auth Verification
  function handleAdminUnlock(e: React.FormEvent) {
    e.preventDefault();
    const correctPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'admin123';

    if (passcodeInput === correctPasscode) {
      setIsAdminUnlocked(true);
      sessionStorage.setItem('wastesync_admin_unlocked', 'true');
      setPasscodeModalOpen(false);
      setPasscodeInput('');

      if (pendingAction === 'customer') setIsCustomerModalOpen(true);
      if (pendingAction === 'dispatch') setIsDispatchModalOpen(true);
      setPendingAction(null);
    } else {
      alert('Incorrect Admin Passcode!');
    }
  }

  function triggerProtectedAction(action: 'customer' | 'dispatch') {
    if (isAdminUnlocked) {
      if (action === 'customer') setIsCustomerModalOpen(true);
      if (action === 'dispatch') setIsDispatchModalOpen(true);
    } else {
      setPendingAction(action);
      setPasscodeModalOpen(true);
    }
  }

  // Execute PostGIS RPC Distance Function
  async function findNearestTrucks(customerId: string) {
    if (!customerId) return;
    setSelectedCustomerForProximity(customerId);
    setCalculatingProximity(true);

    try {
      const { data, error } = await supabase.rpc('get_nearest_trucks', {
        cust_lat: 6.5912,
        cust_lng: 3.3551,
        limit_count: 3,
      });

      if (error) throw error;
      setNearestTrucks(data || []);
    } catch (err: any) {
      console.error('PostGIS Query Error:', err.message);
    } finally {
      setCalculatingProximity(false);
    }
  }

  // Export Audit CSV Report
  async function handleExportReport() {
    try {
      const { data } = await supabase
        .from('pickup_logs')
        .select('id, status, notes, created_at, customers(full_name, address), trucks(plate_number, driver_name)');

      if (!data || data.length === 0) {
        alert('No pickup records found to export.');
        return;
      }

      const formattedData = data.map((log: any) => ({
        Pickup_ID: log.id,
        Customer: log.customers?.full_name || 'N/A',
        Address: log.customers?.address || 'N/A',
        Truck_Plate: log.trucks?.plate_number || 'N/A',
        Driver: log.trucks?.driver_name || 'N/A',
        Status: log.status,
        Notes: log.notes || '',
        Timestamp: log.created_at,
      }));

      exportToCSV(formattedData, `wastesync-audit-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch (err: any) {
      alert('Failed to export CSV: ' + err.message);
    }
  }

  // Handle Add New Customer
  async function handleAddCustomer(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data: orgs } = await supabase.from('organizations').select('id').limit(1);
      const orgId = orgs?.[0]?.id || 'a1b2c3d4-0000-0000-0000-000000000001';

      const { error } = await supabase.from('customers').insert([
        {
          organization_id: orgId,
          full_name: customerForm.full_name,
          phone_number: customerForm.phone_number,
          address: customerForm.address,
          subscription_status: customerForm.subscription_status,
        },
      ]);

      if (error) throw error;

      setIsCustomerModalOpen(false);
      setCustomerForm({ full_name: '', phone_number: '', address: '', subscription_status: 'ACTIVE' });
      fetchDashboardData();
    } catch (err: any) {
      alert('Error creating customer: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Handle Dispatch Route / Pickup Log
  async function handleDispatchRoute(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('pickup_logs').insert([
        {
          customer_id: dispatchForm.customer_id,
          truck_id: dispatchForm.truck_id,
          status: 'PENDING',
          notes: dispatchForm.notes,
        },
      ]);

      if (error) throw error;

      setIsDispatchModalOpen(false);
      setDispatchForm({ customer_id: '', truck_id: '', notes: 'Scheduled for dispatch pickup' });
      fetchDashboardData();
    } catch (err: any) {
      alert('Error dispatching route: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-emerald-400">WasteSync</h1>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              REALTIME LIVE
            </span>
          </div>
          <p className="text-slate-400 text-sm">Real-Time Waste Fleet & Route Telemetry</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition duration-200 self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Live Data
        </button>
      </header>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm font-medium">Active Fleet</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalTrucks}</p>
          <span className="text-xs text-slate-500">Registered Vehicles</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm font-medium">Serviced Customers</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{stats.activeCustomers}</p>
          <span className="text-xs text-slate-500">Active Households / Outlets</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm font-medium">Pickups Completed</span>
            <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{stats.completedPickups}</p>
          <span className="text-xs text-slate-500">Verified Pickups</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm font-medium">Missed / Blocked</span>
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{stats.missedPickups}</p>
          <span className="text-xs text-slate-500">Requires Dispatch Action</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mapbox Route Panel */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/80 rounded-xl p-6 min-h-[400px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Live Fleet GIS Tracking</h2>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
              PostGIS Connected
            </span>
          </div>

          <FleetMap trucks={trucks} customers={customers} />
        </div>

        {/* Dispatch Quick Actions & Tools */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-200">Dispatcher Quick Actions</h2>
              {isAdminUnlocked ? (
                <span className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  <Unlock className="w-3 h-3" /> Unlocked
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded border border-slate-600">
                  <Lock className="w-3 h-3" /> Protected
                </span>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => triggerProtectedAction('customer')}
                className="w-full text-left bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 p-3.5 rounded-lg transition text-sm font-medium flex items-center justify-between"
              >
                <span>+ Register New Customer Location</span>
                <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded">
                  {isAdminUnlocked ? 'Action' : 'Locked 🔒'}
                </span>
              </button>

              <button
                onClick={() => triggerProtectedAction('dispatch')}
                className="w-full text-left bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 p-3.5 rounded-lg transition text-sm font-medium flex items-center justify-between"
              >
                <span>+ Assign Route to Collection Truck</span>
                <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded">
                  {isAdminUnlocked ? 'Action' : 'Locked 🔒'}
                </span>
              </button>

              <button
                onClick={handleExportReport}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 text-slate-200 border border-slate-600/50 p-3.5 rounded-lg transition text-sm font-medium flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-slate-400" /> Export Audit Report (CSV)
                </span>
                <span className="text-xs bg-slate-500/20 px-2 py-0.5 rounded">CSV</span>
              </button>

              <Link
                href="/driver"
                target="_blank"
                className="w-full text-left bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 p-3.5 rounded-lg transition text-sm font-medium flex items-center justify-between block"
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amber-400" /> Open Driver Mobile Manifest ↗
                </span>
                <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded">Mobile</span>
              </Link>
            </div>
          </div>

          {/* PostGIS Proximity Finder Card */}
          <div className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-400" />
              PostGIS Spatial Proximity
            </h2>
            <p className="text-xs text-slate-400 mb-4">Calculate nearest available trucks using PostgreSQL GIS indexing.</p>

            <select
              value={selectedCustomerForProximity}
              onChange={(e) => findNearestTrucks(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 mb-4"
            >
              <option value="">-- Select Customer Target --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name} ({c.address})
                </option>
              ))}
            </select>

            {calculatingProximity ? (
              <p className="text-xs text-emerald-400 animate-pulse">Running PostGIS ST_Distance calculation...</p>
            ) : nearestTrucks.length > 0 ? (
              <div className="space-y-2">
                {nearestTrucks.map((truck, idx) => (
                  <div key={truck.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-200">{idx + 1}. Truck {truck.plate_number}</p>
                      <p className="text-slate-400">Driver: {truck.driver_name}</p>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-1 rounded">
                      {(truck.distance_meters / 1000).toFixed(2)} km
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* MODAL 0: Admin Passcode Prompt */}
      <Modal
        isOpen={passcodeModalOpen}
        onClose={() => setPasscodeModalOpen(false)}
        title="Dispatcher Passcode Required"
      >
        <form onSubmit={handleAdminUnlock} className="space-y-4">
          <p className="text-xs text-slate-400">
            This action requires administrative access. Enter your dispatcher passcode to proceed.
          </p>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Passcode</label>
            <input
              type="password"
              required
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setPasscodeModalOpen(false)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition"
            >
              Unlock & Proceed
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 1: Register New Customer */}
      <Modal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        title="Register New Customer Location"
      >
        <form onSubmit={handleAddCustomer} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={customerForm.full_name}
              onChange={(e) => setCustomerForm({ ...customerForm, full_name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Babajide Sanwo-Olu"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              required
              value={customerForm.phone_number}
              onChange={(e) => setCustomerForm({ ...customerForm, phone_number: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="+2348011112222"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address</label>
            <input
              type="text"
              required
              value={customerForm.address}
              onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="10 Marina Road, Lagos"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subscription Status</label>
            <select
              value={customerForm.subscription_status}
              onChange={(e) => setCustomerForm({ ...customerForm, subscription_status: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="OVERDUE">OVERDUE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCustomerModalOpen(false)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200