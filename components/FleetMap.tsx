'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface TruckLocation {
  id: string;
  plate_number: string;
  driver_name: string;
  coordinates: [number, number]; // [lng, lat]
}

interface CustomerLocation {
  id: string;
  full_name: string;
  address: string;
  status: string;
  coordinates: [number, number];
}

interface FleetMapProps {
  trucks: TruckLocation[];
  customers: CustomerLocation[];
}

export default function FleetMap({ trucks, customers }: FleetMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    // Initialize Mapbox centered over Lagos, Nigeria
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [3.3792, 6.5244], // [lng, lat]
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add Customer Markers
      customers.forEach((customer) => {
        const el = document.createElement('div');
        el.className = 'w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer';
        el.style.backgroundColor = customer.status === 'ACTIVE' ? '#10B981' : '#F43F5E';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="color: #000; font-family: sans-serif;">
            <strong>${customer.full_name}</strong><br/>
            <span style="font-size: 12px; color: #555;">${customer.address}</span><br/>
            <span style="font-size: 11px; font-weight: bold; color: ${customer.status === 'ACTIVE' ? '#059669' : '#DC2626'};">${customer.status}</span>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat(customer.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Add Truck Markers
      trucks.forEach((truck) => {
        const el = document.createElement('div');
        el.className = 'w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center border-2 border-white shadow-xl cursor-pointer text-white font-bold text-xs';
        el.innerText = '🚛';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="color: #000; font-family: sans-serif;">
            <strong>Truck: ${truck.plate_number}</strong><br/>
            <span style="font-size: 12px; color: #555;">Driver: ${truck.driver_name}</span>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat(truck.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => map.current?.remove();
  }, [trucks, customers]);

  return (
    <div className="w-full h-[450px] rounded-lg overflow-hidden border border-slate-800 shadow-inner">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}