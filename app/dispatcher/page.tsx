'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  ShieldCheck,
  LogOut,
  ArrowLeft,
  PlusCircle,
  Send,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Users,
  Filter,
} from 'lucide-react';

export default function DispatcherAdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'directory' | 'dispatch' | 'register'>('directory');

  const [trucks, setTrucks] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone_number: '',
    address: '',
    subscription_status: 'ACTIVE',
  });
  const [savingEdit, setSavingEdit] = useState(false);

  // Registration & Dispatch Forms
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

  useEffect(() => {
    const auth = sessionStorage.getItem('wastesync_admin_authenticated');
    if (auth !== 'true') {
      router.push('/login');
    } else {
      setAuthorized(true);
      fetchDropdownData();
    }
  }, [router]);

  async function fetchDropdownData() {
    const { data: truckData } = await supabase.from('trucks').select('*');
    const { data: customerData } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    setTrucks(truckData || []);
    setCustomers(customerData || []);
  }

  function handleLogout() {
    sessionStorage.removeItem('wastesync_admin_authenticated');
    router.push('/login');
  }

  // Filtered Customer List
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone_number?.includes(searchQuery) ||
        c.address?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || c.subscription_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

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
      alert(`Customer "${customerForm.full_name}" registered successfully!`);
      setCustomerForm({ full_name: '', phone_number: '', address: '', subscription_status: 'ACTIVE' });
      fetchDropdownData();
      setActiveTab('directory');
    } catch (err: any) {
      alert('Error saving customer: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleStartEdit(customer: any) {
    setEditingId(customer.id);
    setEditForm({
      full_name: customer.full_name,
      phone_number: customer.phone_number,
      address: customer.address,
      subscription_status: customer.subscription_status,
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(customerId: string) {
    setSavingEdit(true);
    try {
      const { error } = await supabase
        .from('customers')
        .update({
          full_name: editForm.full_name,
          phone_number: editForm.phone_number,
          address: editForm.address,
          subscription_status: editForm.subscription_status,
        })
        .eq('id', customerId);

      if (error) throw error;

      alert('Customer details updated successfully!');
      setEditingId(null);
      fetchDropdownData();
    } catch (err: any) {
      alert('Error updating customer: ' + err.message);
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDeleteCustomer(customerId: string, customerName: string) {
    if (!confirm(`Are you sure you want to remove ${customerName}?`)) return;

    setDeletingId(customerId);
    try {
      const { error } = await supabase.from('customers').delete().eq('id', customerId);
      if (error) throw error;

      alert(`Removed customer "${customerName}"`);
      fetchDropdownData();
    } catch (err: any) {
      alert('Error deleting customer: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  }

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
      alert('Route assigned to collection truck driver successfully!');
      setDispatchForm({ customer_id: '', truck_id: '', notes: 'Scheduled for dispatch pickup' });
    } catch (err: any) {
      alert('Error assigning route: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <Link href="/" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Telemetry Map Dashboard
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Dispatcher Command Center
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition ${
              activeTab === 'directory'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> Customer Directory ({customers.length})
          </button>

          <button
            onClick={() => setActiveTab('dispatch')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition ${
              activeTab === 'dispatch'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-4 h-4" /> Dispatch Route
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition ${
              activeTab === 'register'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" /> Register New Outlet
          </button>
        </div>

        {/* Tab 1: Customer Directory with Search & Filters */}
        {activeTab === 'directory' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-700/80">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name, phone, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="OVERDUE">OVERDUE</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
              </div>
            </div>

            {filteredCustomers.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-8">
                No matching customer outlets found.
              </p>
            ) : (
              <div className="divide-y divide-slate-700/60 max-h-[480px] overflow-y-auto pr-2">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="py-3.5">
                    {editingId === customer.id ? (
                      <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-amber-500/30">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={editForm.full_name}
                              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              value={editForm.phone_number}
                              onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Street Address
                            </label>
                            <input
                              type="text"
                              value={editForm.address}
                              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Status
                            </label>
                            <select
                              value={editForm.subscription_status}
                              onChange={(e) =>
                                setEditForm({ ...editForm, subscription_status: e.target.value })
                              }
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="OVERDUE">OVERDUE</option>
                              <option value="SUSPENDED">SUSPENDED</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1 rounded text-xs transition"
                          >
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(customer.id)}
                            disabled={savingEdit}
                            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded text-xs transition disabled:opacity-50"
                          >
                            <Check className="w-3.5 h-3.5" /> {savingEdit ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-200 text-sm">{customer.full_name}</p>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                                customer.subscription_status === 'ACTIVE'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}
                            >
                              {customer.subscription_status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {customer.address} • {customer.phone_number}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEdit(customer)}
                            className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>

                          <button
                            onClick={() => handleDeleteCustomer(customer.id, customer.full_name)}
                            disabled={deletingId === customer.id}
                            className="flex items-center gap-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            {deletingId === customer.id ? 'Removing...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Dispatch Route */}
        {activeTab === 'dispatch' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5" /> Assign Collection Route
            </h2>

            <form onSubmit={handleDispatchRoute} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Customer</label>
                <select
                  required
                  value={dispatchForm.customer_id}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, customer_id: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Choose Customer Target --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name} ({c.address})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assign Truck</label>
                <select
                  required
                  value={dispatchForm.truck_id}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, truck_id: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Choose Fleet Truck --</option>
                  {trucks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.plate_number} - Driver: {t.driver_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dispatch Notes</label>
                <input
                  type="text"
                  value={dispatchForm.notes}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Empty 3 commercial bins"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50"
              >
                {submitting ? 'Dispatching Route...' : 'Confirm Route Assignment'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Register Outlet */}
        {activeTab === 'register' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5" /> Register New Household / Outlet
            </h2>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerForm.full_name}
                  onChange={(e) => setCustomerForm({ ...customerForm, full_name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Babajide Micheal"
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
                  placeholder="08032471058"
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
                  placeholder="12 Marina Road, Lagos"
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

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50"
              >
                {submitting ? 'Saving Location...' : 'Save Customer Location'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}