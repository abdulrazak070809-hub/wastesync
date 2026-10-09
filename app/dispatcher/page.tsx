<!DOCTYPE html>

<html class="dark" lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=JetBrains+Mono:wght@100..900&display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-tertiary":"#472a00","on-tertiary-fixed":"#2a1700","background":"#0b1326","error":"#ffb4ab","on-surface":"#dae2fd","on-error":"#690005","surface":"#0b1326","secondary-fixed-dim":"#adc6ff","surface-bright":"#31394d","inverse-primary":"#006c49","on-primary-fixed":"#002113","on-primary":"#003824","outline-variant":"#3c4a42","tertiary-container":"#e29100","primary-fixed-dim":"#4edea3","surface-dim":"#0b1326","secondary":"#adc6ff","on-primary-fixed-variant":"#005236","on-tertiary-fixed-variant":"#653e00","outline":"#86948a","on-surface-variant":"#bbcabf","inverse-on-surface":"#283044","on-tertiary-container":"#523200","primary-fixed":"#6ffbbe","inverse-surface":"#dae2fd","on-secondary-container":"#e6ecff","tertiary-fixed-dim":"#ffb95f","surface-container-highest":"#2d3449","secondary-container":"#0566d9","surface-tint":"#4edea3","on-primary-container":"#00422b","primary":"#4edea3","surface-container-high":"#222a3d","on-secondary-fixed":"#001a42","surface-container-lowest":"#060e20","on-secondary-fixed-variant":"#004395","secondary-fixed":"#d8e2ff","on-background":"#dae2fd","on-error-container":"#ffdad6","tertiary":"#ffb95f","error-container":"#93000a","primary-container":"#10b981","tertiary-fixed":"#ffddb8","on-secondary":"#002e6a","surface-container":"#171f33","surface-variant":"#2d3449","surface-container-low":"#131b2e"},borderRadius:{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},spacing:{"space-sm":"0.5rem","space-xs":"0.25rem","margin":"1rem","space-lg":"1.5rem","gutter-desktop":"1.5rem","gutter":"1rem","space-xl":"2rem","space-md":"1rem","margin-desktop":"2rem"},fontFamily:{"label-sm":["JetBrains Mono"],"label-lg":["JetBrains Mono"],"label-md":["JetBrains Mono"],"headline-lg-mobile":["Geist"],"headline-xl-mobile":["Geist"],"body-md":["Geist"],"headline-md":["Geist"],"headline-sm":["Geist"],"body-lg":["Geist"],"body-sm":["Geist"],"headline-xl":["Geist"],"headline-lg":["Geist"]},fontSize:{"label-sm":["10px",{lineHeight:"14px",letterSpacing:"0.06em",fontWeight:"400"}],"label-lg":["13px",{lineHeight:"18px",letterSpacing:"0.02em",fontWeight:"500"}],"label-md":["11px",{lineHeight:"16px",letterSpacing:"0.04em",fontWeight:"500"}],"headline-lg-mobile":["20px",{lineHeight:"28px",fontWeight:"600"}],"headline-xl-mobile":["24px",{lineHeight:"32px",fontWeight:"600"}],"body-md":["14px",{lineHeight:"20px",fontWeight:"400"}],"headline-md":["18px",{lineHeight:"26px",fontWeight:"600"}],"headline-sm":["15px",{lineHeight:"22px",fontWeight:"600"}],"body-lg":["16px",{lineHeight:"24px",fontWeight:"400"}],"body-sm":["12px",{lineHeight:"18px",fontWeight:"400"}],"headline-xl":["32px",{lineHeight:"40px",fontWeight:"600"}],"headline-lg":["24px",{lineHeight:"32px",fontWeight:"600"}]}}}};</script></head><body class="bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"><aside class="fixed left-0 top-0 bottom-0 w-64 bg-surface-container-lowest z-50 flex flex-col pt-16 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.65)]"><div class="px-space-md py-space-sm"><div class="font-label-sm text-label-sm uppercase tracking-wider text-outline px-space-sm mb-space-xs">Operations Feed</div></div><nav class="flex-1 px-space-sm space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-headline-sm"><a aria-current="page" class="flex items-center px-space-md py-2.5 rounded-lg transition-colors bg-primary-container text-on-primary-container font-headline-sm" data-path="dispatcher-command-center" href="#"><span class="material-symbols-outlined mr-3 text-[20px]">hub</span><span>Command Console</span></a><a class="flex items-center px-space-md py-2.5 rounded-lg text-on-surface-variant font-body-md text-body-md hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="route-optimization" href="#"><span class="material-symbols-outlined mr-3 text-[20px]">alt_route</span><span>Route Optimizer</span></a><a class="flex items-center px-space-md py-2.5 rounded-lg text-on-surface-variant font-body-md text-body-md hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="fleet-telematics" href="#"><span class="material-symbols-outlined mr-3 text-[20px]">local_shipping</span><span>Fleet Telematics</span></a><a class="flex items-center px-space-md py-2.5 rounded-lg text-on-surface-variant font-body-md text-body-md hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="sensor-matrix" href="#"><span class="material-symbols-outlined mr-3 text-[20px]">sensors</span><span>Sensor Matrix</span></a><a class="flex items-center px-space-md py-2.5 rounded-lg text-on-surface-variant font-body-md text-body-md hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="incident-dispatch" href="#"><span class="material-symbols-outlined mr-3 text-[20px]">warning</span><span>Hazard Alerts</span></a></nav><div class="p-space-md bg-surface-container-low/60 m-space-sm rounded-lg"><div class="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant mb-1"><span>Depot Fleet Load</span><span class="text-primary font-bold">84%</span></div><div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-primary-container rounded-full" style="width: 84%"></div></div></div></aside><div class="pl-64"><header class="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest/85 backdrop-blur-xl z-40 flex items-center justify-between px-gutter-desktop shadow-[0_12px_32px_-4px_rgba(15,23,42,0.65)]"><div class="flex items-center gap-space-md flex-shrink-0"><img alt="WasteSync Brand Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Ud_l6GzoCAtGIfmTe60xkWFBTt10sz3RTHPiz3kNy4SVDn-33Bh1AIinY0lfnoqcSC7aaB3rx7VdQx6KFD3Pruzn3qkzvBdmIx8Xi8rQIcyEIPPdhvgOmmno_CWzP2H4a4dFEg7mvWuSCnZ3T7g3KnM0TZvMnWGGO8HNTHBIMBtrsxjwBE_p_9jLYiTafKcwDBRsMsXFKRnwoqiZaoTBQg2DIAEnHilPRdUKG3kZZsn2lXLmY3ep-yHA"/><span class="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">WasteSync</span><div class="flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary/10"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span></span><span class="font-label-sm text-label-sm text-primary uppercase">REALTIME LIVE</span></div></div><div class="hidden xl:flex items-center flex-1 max-w-sm mx-space-lg"><div class="relative w-full"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">search</span><input class="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary transition-all" placeholder="Search fleet, truck ID, or outlet node..." type="text"/></div></div><nav class="hidden lg:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-headline-sm"><a class="px-space-md py-1.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="public-telemetry" href="#">Public Telemetry</a><a aria-current="page" class="px-space-md py-1.5 rounded-lg transition-colors bg-primary-container text-on-primary-container font-headline-sm" data-path="dispatcher-command-center" href="#">Dispatcher Command Center</a><a class="px-space-md py-1.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="portal-login" href="#">Portal Login</a></nav><div class="flex items-center gap-space-md flex-shrink-0"><div class="hidden md:flex items-center gap-space-xs"><span class="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">Network: 99.8% Online</span><span class="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary">GPS Sync: Active</span></div><div class="flex items-center gap-space-sm pl-space-sm"><div class="text-right hidden sm:block"><div class="font-headline-sm text-headline-sm text-on-surface leading-tight">Marcus Vance</div><div class="font-label-sm text-label-sm text-on-surface-variant">Dispatch Lead</div></div><div class="relative"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALcWt7c-t1w94eWs-QRQZxeMcPZe4kX-wds_-gXVO3GYrFkptXEaKDDo3D3eJQwkk0eI_ucin-uqkSWPWA7uGtwBiAiiURLbisUGerQiXs_nd9yL2BglsD5cUZiGdOLtfs2XL4dPw9wMRjiIwnIYXv6jNCbGxG1tV6licn6qJ9IrlwMLlbiAgizcGVTfAZYmATZUdu4matXHD24dhR44BHasGWU-byASfrGSaFzdgtVwEsBcf_eOLe"/><span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-primary"></span></div></div></div></header><main class="relative pt-16 bg-surface min-h-screen"><div class="flex flex-col w-full">
<!-- Dispatcher Command Central Stage -->
<div class="p-gutter-desktop space-y-space-lg max-w-[1720px] mx-auto w-full">
<!-- Top Bar Sub-Header -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b border-surface-container-high/60">
<div class="space-y-space-xs">
<a class="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors group mb-1" href="#">
<span class="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
<span>Back to Dashboard</span>
</a>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_18px_rgba(78,222,163,0.18)]">
<span class="material-symbols-outlined text-[24px]">verified_user</span>
</div>
<div>
<div class="flex items-center gap-3">
<h1 class="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface">Dispatcher Command Center</h1>
<span class="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase">Active Node 04-A</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">Centralized customer registry, automated fleet dispatch, and municipal outlet provisioning.</p>
</div>
</div>
</div>
<div class="flex flex-wrap items-center gap-space-md">
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface-variant font-label-md text-label-md shadow-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">lock</span>
<span>Session: <strong class="text-on-surface font-semibold">Secure HTTPS</strong></span>
<span class="text-outline">/</span>
<span class="text-secondary font-label-sm">#8841-DX</span>
</div>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-error-container/30 border border-error/40 text-error font-body-sm text-body-sm transition-all hover:shadow-[0_0_12px_rgba(255,180,171,0.2)]" type="button">
<span class="material-symbols-outlined text-[16px]">logout</span>
<span>Sign Out</span>
</button>
</div>
</div>
<!-- Segmented Tab Navigation -->
<div class="flex flex-wrap items-center justify-between gap-space-md">
<div class="inline-flex p-1 rounded-xl bg-surface-container-lowest border border-surface-container-high/80 shadow-md">
<button class="tab-trigger flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_14px_rgba(78,222,163,0.25)]" id="tab-btn-directory">
<span class="material-symbols-outlined text-[18px]">contacts</span>
<span>Customer Directory</span>
<span class="px-2 py-0.2 rounded-full bg-on-primary/20 text-on-primary font-label-sm text-label-sm">148</span>
</button>
<button class="tab-trigger flex items-center gap-2 px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40 font-body-md text-body-md transition-all" id="tab-btn-dispatch">
<span class="material-symbols-outlined text-[18px]">alt_route</span>
<span>Assign Route</span>
<span class="px-2 py-0.2 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm">3 Pending</span>
</button>
<button class="tab-trigger flex items-center gap-1.5 px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40 font-body-md text-body-md transition-all" id="tab-btn-register">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
<span>Register Outlet</span>
</button>
</div>
<!-- Quick Metrics Ribbon -->
<div class="hidden xl:flex items-center gap-3">
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Network Load:</span>
<span class="font-label-sm text-label-sm text-primary font-bold">142 Active / 4 Overdue</span>
</div>
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface">
<span class="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Available Fleets:</span>
<span class="font-label-sm text-label-sm text-secondary font-bold">8 TRK Standby</span>
</div>
</div>
</div>
<!-- Main Workspace Grid: Directory + Side Staging Drawers -->
<div class="grid grid-cols-1 2xl:grid-cols-12 gap-space-lg items-start">
<!-- Primary Tab 1 View: Directory & Live Node Editor (Span 8 in 2xl) -->
<section class="2xl:col-span-8 space-y-space-md">
<!-- Directory Controls Bar -->
<div class="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high shadow-md flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div class="relative flex-1 max-w-lg">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">search</span>
<input class="w-full h-10 pl-9 pr-14 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/40 transition-all" placeholder="Search name, phone, address, node ID..." type="text"/>
<span class="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant font-label-sm text-label-sm text-on-surface-variant pointer-events-none">⌘K</span>
</div>
<div class="flex flex-wrap items-center gap-space-sm justify-between md:justify-end">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm uppercase text-outline">Filter:</span>
<div class="relative">
<select class="h-10 pl-3 pr-8 rounded-lg bg-surface-container-lowest border border-surface-container-high font-label-md text-label-md text-on-surface focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer">
<option value="all">All Statuses (148)</option>
<option value="active">● ACTIVE (138)</option>
<option value="overdue">● OVERDUE (6)</option>
<option value="suspended">● SUSPENDED (4)</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
</div>
</div>
<div class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container-high/60">
              Showing <span class="text-on-surface font-bold">5</span> of <span class="text-primary font-bold">148</span> customer nodes
            </div>
</div>
</div>
<!-- Node Registry Rows List -->
<div class="space-y-3">
<!-- Node Row 1: Metroplex Medical Center -->
<div class="p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md border border-surface-container-high hover:border-surface-bright transition-all shadow-sm">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="space-y-1.5 min-w-0">
<div class="flex flex-wrap items-center gap-2.5">
<span class="font-headline-sm text-headline-sm font-semibold text-on-surface">Metroplex Medical Center</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary border border-surface-container-highest">#OUT-1092</span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-label-sm text-label-sm">
<span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    ACTIVE
                  </span>
</div>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-body-sm text-body-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">call</span> +1 (555) 382-9100</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">location_on</span> 742 Evergreen Terrace, Sector 4</span>
</div>
</div>
<!-- Telemetry indicators & Actions -->
<div class="flex flex-wrap items-center gap-4 justify-between lg:justify-end">
<div class="flex items-center gap-3 bg-surface-container-lowest/80 px-3 py-1.5 rounded-lg border border-surface-container-high">
<div class="text-right">
<div class="font-label-sm text-label-sm text-outline">FILL LEVEL</div>
<div class="font-label-md text-label-md font-bold text-primary">18%</div>
</div>
<div class="w-12 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary" style="width: 18%"></div>
</div>
<div class="border-l border-surface-container-high pl-3 text-right">
<div class="font-label-sm text-label-sm text-outline">SERVICED</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">Today, 08:30</div>
</div>
</div>
<div class="flex items-center gap-1.5">
<button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-tertiary-container/30 border border-tertiary/40 text-tertiary font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">edit</span>
<span>Edit</span>
</button>
<button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-error-container/30 border border-error/40 text-error font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">delete</span>
<span>Delete</span>
</button>
</div>
</div>
</div>
</div>
<!-- Node Row 2: EXPANDED INLINE EDITING NODE DEMONSTRATION -->
<div class="p-space-lg rounded-xl bg-surface-container-low border-2 border-primary/50 shadow-[0_0_24px_rgba(78,222,163,0.12)] relative overflow-hidden transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
<div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">edit_note</span>
<span class="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">EDITING NODE #OUT-1048: CyberTech Plaza</span>
</div>
<span class="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-label-sm text-label-sm">Session Lock Active</span>
</div>
<!-- Inline Form Grid -->
<form class="space-y-space-md" onsubmit="event.preventDefault();">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Customer Node Title</label>
<input class="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all" type="text" value="CyberTech Innovation Hub"/>
</div>
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Direct Phone Line</label>
<input class="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all" type="text" value="+1 (555) 891-2340"/>
</div>
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Civic Street Address</label>
<input class="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all" type="text" value="100 Technology Blvd, Suite 200"/>
</div>
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Provision Status</label>
<div class="relative">
<select class="w-full h-10 pl-3 pr-8 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
<option selected="" value="ACTIVE">ACTIVE (Continuous Sync)</option>
<option value="OVERDUE">OVERDUE (Capacity Breach)</option>
<option value="SUSPENDED">SUSPENDED (Off-Grid Lock)</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
</div>
</div>
</div>
<!-- Inline Action Row -->
<div class="flex items-center justify-between pt-2 border-t border-surface-container-high/60">
<div class="flex items-center gap-2 text-outline-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px] text-outline">info</span>
<span>Changes sync instantly across dispatch routing nodes TRK-01 to TRK-12.</span>
</div>
<div class="flex items-center gap-2">
<button class="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm border border-outline/30 transition-all" type="button">Cancel</button>
<button class="px-5 py-2 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary font-body-sm text-body-sm font-semibold transition-all shadow-[0_0_14px_rgba(78,222,163,0.3)] flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[16px]">check</span>
<span>Save Changes</span>
</button>
</div>
</div>
</form>
</div>
<!-- Node Row 3: Harbor Freight Logistics (OVERDUE) -->
<div class="p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md border border-tertiary/40 hover:border-tertiary transition-all shadow-sm">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="space-y-1.5 min-w-0">
<div class="flex flex-wrap items-center gap-2.5">
<span class="font-headline-sm text-headline-sm font-semibold text-on-surface">Harbor Freight Logistics</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary border border-surface-container-highest">#OUT-0931</span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary/10 border border-tertiary/30 text-tertiary font-label-sm text-label-sm">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
                    OVERDUE
                  </span>
</div>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-body-sm text-body-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">call</span> +1 (555) 412-8821</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">location_on</span> 12 Marina Way, Pier 9</span>
</div>
</div>
<!-- Critical Telemetry Level & Rapid Force Route -->
<div class="flex flex-wrap items-center gap-4 justify-between lg:justify-end">
<div class="flex items-center gap-3 bg-error-container/20 px-3 py-1.5 rounded-lg border border-error/40">
<div class="text-right">
<div class="font-label-sm text-label-sm text-error font-bold">OVERFLOW WARNING</div>
<div class="font-label-md text-label-md font-bold text-error">96% Fill</div>
</div>
<div class="w-12 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-error" style="width: 96%"></div>
</div>
<div class="border-l border-error/30 pl-3 text-right">
<div class="font-label-sm text-label-sm text-outline">SERVICED</div>
<div class="font-label-sm text-label-sm text-error">3 days ago</div>
</div>
</div>
<div class="flex items-center gap-1.5">
<button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-tertiary hover:bg-tertiary-fixed text-on-tertiary font-body-sm text-body-sm font-semibold transition-all shadow-[0_0_10px_rgba(255,185,95,0.25)]" type="button">
<span class="material-symbols-outlined text-[16px]">bolt</span>
<span>Force Route</span>
</button>
<button class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-tertiary-container/30 border border-tertiary/40 text-tertiary font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">edit</span>
</button>
<button class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-error-container/30 border border-error/40 text-error font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
</div>
</div>
</div>
<!-- Node Row 4: Bayview Residential Tower A -->
<div class="p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md border border-surface-container-high hover:border-surface-bright transition-all shadow-sm">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="space-y-1.5 min-w-0">
<div class="flex flex-wrap items-center gap-2.5">
<span class="font-headline-sm text-headline-sm font-semibold text-on-surface">Bayview Residential Tower A</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary border border-surface-container-highest">#OUT-0814</span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-label-sm text-label-sm">
<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    ACTIVE
                  </span>
</div>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-body-sm text-body-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">call</span> +1 (555) 723-1149</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">location_on</span> 500 Grand Ave, Floor G</span>
</div>
</div>
<div class="flex flex-wrap items-center gap-4 justify-between lg:justify-end">
<div class="flex items-center gap-3 bg-surface-container-lowest/80 px-3 py-1.5 rounded-lg border border-surface-container-high">
<div class="text-right">
<div class="font-label-sm text-label-sm text-outline">FILL LEVEL</div>
<div class="font-label-md text-label-md font-bold text-secondary">45%</div>
</div>
<div class="w-12 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary" style="width: 45%"></div>
</div>
<div class="border-l border-surface-container-high pl-3 text-right">
<div class="font-label-sm text-label-sm text-outline">SERVICED</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">Yesterday, 14:15</div>
</div>
</div>
<div class="flex items-center gap-1.5">
<button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-tertiary-container/30 border border-tertiary/40 text-tertiary font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">edit</span>
<span>Edit</span>
</button>
<button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-error-container/30 border border-error/40 text-error font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">delete</span>
<span>Delete</span>
</button>
</div>
</div>
</div>
</div>
<!-- Node Row 5: Solstice Commercial Eatery (SUSPENDED) -->
<div class="p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md border border-error/30 hover:border-error/60 transition-all shadow-sm">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="space-y-1.5 min-w-0">
<div class="flex flex-wrap items-center gap-2.5">
<span class="font-headline-sm text-headline-sm font-semibold text-on-surface">Solstice Commercial Eatery</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary border border-surface-container-highest">#OUT-0772</span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error/10 border border-error/40 text-error font-label-sm text-label-sm">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>
                    SUSPENDED
                  </span>
</div>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-body-sm text-body-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">call</span> +1 (555) 209-5501</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-outline">location_on</span> 88 Culinary Court</span>
</div>
</div>
<div class="flex flex-wrap items-center gap-4 justify-between lg:justify-end">
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-error/30 text-error font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px]">lock_clock</span>
<span>Payment pending - bin lock enabled (14d overdue)</span>
</div>
<div class="flex items-center gap-1.5">
<button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-tertiary-container/30 border border-tertiary/40 text-tertiary font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">edit</span>
<span>Edit</span>
</button>
<button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-error-container/30 border border-error/40 text-error font-body-sm text-body-sm transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">delete</span>
<span>Delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
<!-- Node Registry Pagination / Monospace Status Bar -->
<div class="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high font-label-sm text-label-sm text-on-surface-variant">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<span>TELEMETRY_ENGINE: 5/148 BUFFERED - LAST POLL 14:32:08 UTC</span>
</div>
<div class="flex items-center gap-2">
<button class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors">Prev</button>
<span class="px-2 text-primary font-bold">Page 1 of 30</span>
<button class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors">Next</button>
</div>
</div>
</section>
<!-- Sub-Sections & Workflow Preview Drawers: Tab 2 & Tab 3 side-docked panels (Span 4 in 2xl) -->
<aside class="2xl:col-span-4 space-y-space-md">
<!-- Tab 2 Preview: Quick Assign Route Panel -->
<div class="p-space-lg rounded-xl bg-surface-container-low/80 backdrop-blur-xl border border-surface-container-high shadow-lg relative overflow-hidden">
<div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high/80">
<div class="flex items-center gap-2">
<span class="p-1 rounded bg-secondary-container/20 text-secondary">
<span class="material-symbols-outlined text-[18px]">alt_route</span>
</span>
<div>
<h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Assign Route Module</h3>
<p class="font-label-sm text-label-sm text-outline">TAB 2 RAPID DISPATCH ACTION</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm">3 Queued</span>
</div>
<form class="space-y-space-sm" onsubmit="event.preventDefault();">
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Target Customer Node</label>
<div class="relative">
<select class="w-full h-10 pl-3 pr-8 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer">
<option>#OUT-0931 - Harbor Freight Logistics (96% Fill)</option>
<option>#OUT-1092 - Metroplex Medical Center</option>
<option>#OUT-0814 - Bayview Residential Tower A</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
</div>
</div>
<div class="grid grid-cols-2 gap-space-sm">
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Assign Vehicle</label>
<div class="relative">
<select class="w-full h-10 pl-3 pr-8 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer">
<option>TRK-04 (Hauler 18T)</option>
<option>TRK-02 (Rapid 8T)</option>
<option>TRK-09 (Compact 5T)</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
</div>
</div>
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Estimated ETA</label>
<input class="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container-high font-label-sm text-label-sm text-secondary focus:outline-none" readonly="" type="text" value="18 Mins (Express)"/>
</div>
</div>
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Dispatch Directives & Safety Notes</label>
<textarea class="w-full p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-all" placeholder="Gate code #4410, dock entrance B via West perimeter..." rows="2"></textarea>
</div>
<button class="w-full mt-2 py-2.5 px-4 rounded-lg bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_16px_rgba(5,102,217,0.3)] flex items-center justify-center gap-2" type="button">
<span class="material-symbols-outlined text-[18px]">send</span>
<span>Confirm Route Assignment</span>
</button>
</form>
</div>
<!-- Tab 3 Preview: Quick Register Outlet Card -->
<div class="p-space-lg rounded-xl bg-surface-container-low/80 backdrop-blur-xl border border-surface-container-high shadow-lg">
<div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high/80">
<div class="flex items-center gap-2">
<span class="p-1 rounded bg-primary/20 text-primary">
<span class="material-symbols-outlined text-[18px]">add_location_alt</span>
</span>
<div>
<h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Register Outlet</h3>
<p class="font-label-sm text-label-sm text-outline">TAB 3 NEW NODE ONBOARDING</p>
</div>
</div>
<span class="font-label-sm text-label-sm text-outline">#AUTO-NEXT</span>
</div>
<form class="space-y-space-sm" onsubmit="event.preventDefault();">
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Commercial Full Name</label>
<input class="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all" placeholder="e.g. Apex Industrial Center" type="text"/>
</div>
<div class="grid grid-cols-2 gap-space-sm">
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Contact Phone</label>
<input class="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all" placeholder="+1 (555) 000-0000" type="text"/>
</div>
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Plan Status</label>
<div class="relative">
<select class="w-full h-10 pl-3 pr-8 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
<option>ACTIVE - Commercial</option>
<option>PROVISIONAL - Trial</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
</div>
</div>
</div>
<div class="space-y-1">
<label class="block font-label-sm text-label-sm uppercase text-outline">Street Address & Coordinates</label>
<input class="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container-high font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all" placeholder="Street line, sector & postal grid..." type="text"/>
</div>
<button class="w-full mt-2 py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_16px_rgba(78,222,163,0.25)] flex items-center justify-center gap-2" type="button">
<span class="material-symbols-outlined text-[18px]">add_task</span>
<span>Save Customer Location</span>
</button>
</form>
</div>
<!-- Live Dispatch Telemetry Mini Map / GPS Anchor -->
<div class="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high overflow-hidden space-y-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5 font-label-sm text-label-sm text-outline uppercase">
<span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
<span>Live Node GIS Spatial Radar</span>
</div>
<span class="font-label-sm text-label-sm text-primary">Sector 04 Active</span>
</div>
<div class="w-full h-44 rounded-lg bg-cover bg-center relative overflow-hidden border border-surface-container-high" data-location="San Francisco Logistics Hub" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDy0krnDcL8cYjRwezn6hpbKv2nYM1QS1LlVOBy4WnsW2ILSbuSMVygb430mD138p0JsH7pN5ZwQtwYJ0SLngcsYwvVqdQaNhzd476xny5EULHhQE8LjMYIOd4Xn4mdOaJG4eHVIwDRYAjtZHFAE7NKqFso05NS2H9HcfkaaSlzfZdFX2QyBxyi1Dxaaf1l1t_wn505FgTvQPqKJaBplES8uX2avdnbemUjM6HzMr5BdjsQpTQeOw6B')">
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
<!-- Tactical vehicle marker overlay -->
<div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-container-lowest/90 border border-primary text-primary font-label-sm text-label-sm shadow-lg">
<span class="material-symbols-outlined text-[14px]">local_shipping</span>
<span>TRK-04 EN ROUTE</span>
</div>
<div class="absolute bottom-2 left-2 text-on-surface font-label-sm text-label-sm bg-surface-container-lowest/80 px-2 py-0.5 rounded border border-surface-container-high">
              37.7749° N, 122.4194° W
            </div>
</div>
</div>
</aside>
</div>
</div>
</div></main></div></body></html>