'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, LogOut, ArrowLeft, PlusCircle, Send } from 'lucide-react';

export default function DispatcherAdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Forms
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
    // Verify session
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
    const { data: customerData } = await supabase.from('customers').select('*');
    setTrucks(truckData || []);
    setCustomers(customerData || []);
  }

  function handleLogout() {
    sessionStorage.removeItem('wastesync_admin_authenticated');
    router.push('/login');
  }

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
      alert('Customer location registered successfully!');
      setCustomerForm({ full_name: '', phone_number: '', address: '', subscription_status: 'ACTIVE' });
      fetchDropdownData();
    } catch (err: any) {
      alert('Error saving customer: ' + err.message);
    } finally {
      setSubmitting(false);
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
      alert('Route assigned to truck driver successfully!');
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <Link href="/" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Telemetry Dashboard
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Dispatcher Command Portal
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Action Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Panel 1: Customer Registration */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5" /> Register New Customer
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
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg text-sm transition disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Location'}
              </button>
            </form>
          </div>

          {/* Panel 2: Route Assignment */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5" /> Assign Route to Truck
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
                  <option value="">-- Choose Customer --</option>
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
                  <option value="">-- Choose Truck --</option>
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
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition disabled:opacity-50"
              >
                {submitting ? 'Dispatching...' : 'Confirm Route Assignment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}