import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WasteSync | Real-Time Waste Logistics & Telemetry',
  description: 'GIS-powered fleet tracking and route management platform for waste collection logistics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-900 text-slate-100">{children}</body>
    </html>
  );
}