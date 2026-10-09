'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const defaultCenter = {
  lat: 9.0765,
  lng: 7.3986,
};

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#cbd5e1' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1e293b' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#475569' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
];

export interface TruckItem {
  id: string;
  lat: number;
  lng: number;
  status: string;
  capacity: number;
}

export interface CustomerItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  fillLevel: number;
}

export interface FleetMapProps {
  trucks?: TruckItem[];
  customers?: CustomerItem[];
}

export default function FleetMap({ trucks = [], customers = [] }: FleetMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const containerStyle: React.CSSProperties = useMemo(
    () => ({
      width: '100%',
      height: '100%',
      minHeight: '420px',
      borderRadius: '0.75rem',
    }),
    []
  );

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[420px] bg-[#060e20] rounded-xl flex items-center justify-center text-[#bbcabf] font-mono text-[12px]">
        Mounting Spatial Radar Engine...
      </div>
    );
  }

  if (loadError || !apiKey || !isLoaded) {
    return (
      <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden bg-[#060e20] border border-[#222a3d] p-6 flex flex-col justify-between">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="radar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#radar-grid)" />
            <circle cx="50%" cy="50%" r="180" fill="none" stroke="#4edea3" strokeWidth="1" opacity="0.3" />
            <circle cx="50%" cy="50%" r="120" fill="none" stroke="#adc6ff" strokeWidth="1" opacity="0.2" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#4edea3] font-bold uppercase">
              ABUJA MUNICIPAL POSTGIS RADAR
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#bbcabf] bg-[#171f33] px-2 py-1 rounded border border-[#222a3d]">
            9.0765° N, 7.3986° E
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
          {trucks.slice(0, 3).map((truck, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#171f33]/90 backdrop-blur-md border border-[#222a3d] flex items-center gap-3 shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#0566d9]/20 text-[#adc6ff] flex items-center justify-center font-bold font-mono text-[11px]">
                {truck.id || `T${idx + 1}`}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#dae2fd]">{truck.id || 'Fleet Unit'}</div>
                <div className="font-mono text-[10px] text-[#4edea3]">
                  {truck.capacity ? `${truck.capacity}% Loaded` : 'Active Route'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 font-mono text-[10px] text-[#86948a] flex items-center justify-between bg-[#060e20]/80 p-2 rounded border border-[#222a3d]">
          <span>SECTOR: ABUJA CENTRAL (PostGIS Spatial Ref)</span>
          <span className="text-[#adc6ff]">99.8% GPS LOCK</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {trucks.map((truck, idx) => (
          <Marker
            key={`truck-${idx}`}
            position={{ lat: truck.lat || 9.0765, lng: truck.lng || 7.3986 }}
            onClick={() => setSelectedMarker({ ...truck, type: 'truck' })}
          />
        ))}

        {customers.map((cust, idx) => (
          <Marker
            key={`customer-${idx}`}
            position={{ lat: cust.lat || 9.082, lng: cust.lng || 7.4913 }}
            onClick={() => setSelectedMarker({ ...cust, type: 'customer' })}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.lat || 9.0765,
              lng: selectedMarker.lng || 7.3986,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 text-slate-900 font-sans">
              <h4 className="font-bold text-sm">
                {selectedMarker.name || selectedMarker.id || 'Abuja Node'}
              </h4>
              <p className="text-xs text-slate-600">
                {selectedMarker.type === 'truck'
                  ? `Capacity: ${selectedMarker.capacity || 0}%`
                  : `Fill Level: ${selectedMarker.fillLevel || 0}%`}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}