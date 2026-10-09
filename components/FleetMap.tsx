'use client';

import React, { useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const defaultCenter = {
  lat: 6.5244,
  lng: 3.3792,
};

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#475569' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0f172a' }],
  },
];

interface FleetMapProps {
  trucks: any[];
  customers: any[];
}

export default function FleetMap({ trucks, customers }: FleetMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const containerStyle: React.CSSProperties = useMemo(
    () => ({
      width: '100%',
      height: '100%',
      minHeight: '380px',
      borderRadius: '0.75rem',
    }),
    []
  );

  const options = useMemo(
    () => ({
      styles: darkMapStyle,
      disableDefaultUI: false,
      zoomControl: true,
    }),
    []
  );

  if (loadError) {
    return (
      <div className="w-full h-full min-h-[350px] bg-slate-900 border border-slate-800 rounded-lg flex flex-col items-center justify-center p-4">
        <p className="text-xs text-rose-400 font-semibold mb-1">Failed to load Google Maps</p>
        <p className="text-[11px] text-slate-500 text-center">
          Verify NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set in Vercel.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full min-h-[350px] bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center">
        <p className="text-xs text-slate-400 animate-pulse">Loading Google Maps Telemetry...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={11}
      options={options}
    >
      {trucks.map((truck) => (
        <Marker
          key={`truck-${truck.id}`}
          position={{ lat: truck.coordinates[1], lng: truck.coordinates[0] }}
          onClick={() => setSelectedMarker({ ...truck, type: 'truck' })}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }}
        />
      ))}

      {customers.map((customer) => (
        <Marker
          key={`customer-${customer.id}`}
          position={{ lat: customer.coordinates[1], lng: customer.coordinates[0] }}
          onClick={() => setSelectedMarker({ ...customer, type: 'customer' })}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
          }}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.coordinates[1],
            lng: selectedMarker.coordinates[0],
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2 text-slate-900 max-w-[200px]">
            {selectedMarker.type === 'truck' ? (
              <div>
                <p className="font-bold text-xs text-blue-700">🚛 Collection Truck</p>
                <p className="text-xs font-semibold mt-1">Plate: {selectedMarker.plate_number}</p>
                <p className="text-[11px] text-slate-600">Driver: {selectedMarker.driver_name}</p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-xs text-emerald-700">🏠 Customer Outlet</p>
                <p className="text-xs font-semibold mt-1">{selectedMarker.full_name}</p>
                <p className="text-[11px] text-slate-600 truncate">{selectedMarker.address}</p>
                <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                  {selectedMarker.status}
                </span>
              </div>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}