import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WasteSync | Real-Time Waste Logistics & Telemetry',
  description: 'GIS-powered fleet tracking and route management platform for waste collection',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=JetBrains+Mono:wght@100..900&display=swap"
        />
      </head>
      <body className="antialiased bg-slate-900 text-slate-100">{children}</body>
    </html>
  );
}