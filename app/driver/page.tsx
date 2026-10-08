'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, XCircle, Navigation, MapPin } from 'lucide-react';

export default function DriverMobileView() {
  const [pickups, setPickups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriverPickups();
  }, []);

  async function fetchDriverPickups() {
    setLoading(true);
    const { data } = await supabase
      .from('pickup_logs')
      .select('*, customers(full_name, address, phone_number), trucks(plate_number, driver_name)')
      .order('created_at', { ascending: false });

    setPickups(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: 'COLLECTED' | 'MISSED') {
    await supabase.from('pickup_logs').update({ status }).eq('id', id);
    fetchDriverPickups();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto">
      <header className="pb-4 mb-4 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-emerald-400">WasteSync Mobile</h1>
          <p className="text-xs text-slate-400">Driver Route Manifest</p>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-mono">
          Live Sync
        </span>
      </header>

      {loading ? (
        <p className="text-sm text-slate-400 animate-pulse text-center py-8">Loading route stops...</p>
      ) : pickups.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">No assigned routes for today.</p>
      ) : (
        <div className="space-y-4">
          {pickups.map((p, idx) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  Stop #{idx + 1}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    p.status === 'COLLECTED'
                      ? 'bg-green-500/20 text-green-400'
                      : p.status === 'MISSED'
                      ? 'bg-rose-500/20 text-rose-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h2 className="font-bold text-slate-100">{p.customers?.full_name || 'Customer'}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 my-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {p.customers?.address || 'Lagos, Nigeria'}
              </p>

              {p.notes && <p className="text-xs text-slate-500 italic mb-3">"{p.notes}"</p>}

              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => updateStatus(p.id, 'COLLECTED')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 transition"
                >
                  <CheckCircle className="w-4 h-4" /> Collect
                </button>
                <button
                  onClick={() => updateStatus(p.id, 'MISSED')}
                  className="flex-1 bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/30 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 transition"
                >
                  <XCircle className="w-4 h-4" /> Missed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}