---
name: WasteSync
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for mission-critical municipal logistics, routing engines, and real-time fleet telematics. The visual atmosphere balances high-density data telemetry with operational calm. Inspired by enterprise GIS environments and modern infrastructure observability tools, the aesthetic combines deep midnight slate surfaces with tactical, luminous telemetry accents.

Key characteristics:
- **Style Archetype:** Modern Technical Glassmorphism and Tactical Telematics. Semi-translucent panels (`backdrop-filter: blur(12px)`) float over dynamic vector mapping layers, bound by razor-sharp 1px structural outlines.
- **Tone & Mood:** Authoritative, high-precision, low cognitive friction, and resilient during sustained 24/7 monitoring.
- **Visual Discipline:** Spatial clarity triumphs over decorative flourish. Color carries strict informational semantics: Emerald indicates active and optimized throughput; Electric Blue monitors kinetic telematics; Amber signals operational friction; Crimson surfaces immediate routing hazards.

## Colors

The system uses a dark mode visual hierarchy anchored in cold slate tones, engineered specifically for high screen-time NOC (Network Operations Center) and dispatch monitoring.

### Surface Architecture
- **Surface 0 (Base / Canvas):** `#0F172A` (Rich slate navy; underlying viewport base and GIS underlay framework).
- **Surface 1 (Structural Panels & Sidebars):** `#1E293B` (Used for floating overlays, fixed telematics trays, and top toolbars at 80%–90% opacity with backdrop blur).
- **Surface 2 (Interactive Modules & Card Backings):** `#334155` (Elevated components, table headers, hover tokens, and input track states).

### Semantic Accents & Status
- **Primary / Active Route (`#10B981`):** High-efficiency Emerald Green. Designates optimal routing paths, confirmed pickups, live vehicle states, and primary execution targets.
- **Secondary / Fleet & Telematics (`#3B82F6`):** Electric Blue. Assigned to vehicle metrics, speed/fuel telemetry readouts, geo-fence coordinates, and navigational polyline overlays.
- **Tertiary / Pending & Yield (`#F59E0B`):** Amber. Denotes bin fill thresholds exceeding 80%, maintenance windows, driver idle cautions, and schedule recalculations.
- **Alert / Hazard (`#EF4444`):** Crimson. Immediate routing blockages, fleet breakdowns, hazardous contamination events, and system errors.
- **Structural Border & Hairlines:** `#334155` at `1px` stroke. Provides crisp edge definition across all floating glass planes.

## Typography

The typographic hierarchy is split intentionally between high-performance operational copy (`Geist`) and technical coordinates, timestamps, and fleet serials (`JetBrains Mono`).

- **Display & Structural UI (Geist):** Clean, geometric sans-serif tuned for screen legibility at tight scale. High x-height ensures immediate cognitive parsing of route numbers, driver logs, and operational modals.
- **Telemetry & Metadata (JetBrains Mono):** Applied to telemetry readouts, geo-coordinates (`lat/lng`), metric tags, vehicle VINs, battery/fuel levels, and table sort metrics. All numeric data across analytical cards must use monospaced figures to prevent layout jitter during real-time web-socket updates.

## Layout & Spacing

The layout is built around a full-bleed spatial map canvas with floating, dockable telemetry overlays and dense split-screen analytical dashboards.

- **Grid Strategy:** A fluid 12-column layout sits atop the interactive GIS view. Desktop displays utilize `1.5rem` (`24px`) gutters with outer boundary margins of `2rem` (`32px`). Mobile displays collapse into a unified single-column vertical stack with `1rem` edge gutters.
- **Density Control:** The spacing rhythm strictly prioritizes informational density. Primary padding across modular cards and GIS control boxes uses `space-md` (`1rem`) internally, while dense multi-sensor data rows compress down to `space-sm` (`0.5rem`).
- **Responsive Handling:**
  - **Desktop (>= 1280px):** Permanent left-docked routing panel (380px fixed), map underlay across 100vw, floating bottom telematics telemetry bar, top-right context widget.
  - **Tablet (768px - 1279px):** Split-view accordion with 50% bottom-sheet slide drawer over the GIS engine.
  - **Mobile (< 768px):** Primary viewport anchors on map interactions, routing checklists present via expandable swipeable sheets (`margin: 1rem`).

## Elevation & Depth

Visual depth is achieved through glassmorphic surface physics rather than high-contrast drop shadows. This maintains context with GIS mapping layers beneath while guaranteeing readable UI boundaries.

- **Glass Surface Foundation:** Surface 1 panels leverage `rgba(30, 41, 59, 0.78)` paired with `backdrop-filter: blur(12px) -webkit-backdrop-filter: blur(12px)`.
- **Structural Outlines:** Every card, floating pill, and control dock features a mandatory `1px solid rgba(51, 65, 85, 0.65)` border, rising to `rgba(51, 65, 85, 1.0)` on active hover.
- **Ambient Lighting:** Floating modules employ deep, tinted ambient shadows: `box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.65), 0 4px 12px -2px rgba(15, 23, 42, 0.45)`.
- **Focused Telemetry Elevation:** Active routes and critical status markers receive a soft 4px ambient radial glow using their semantic color at 20% opacity (e.g., `0 0 16px rgba(16, 185, 129, 0.2)`).

## Shapes

The design uses balanced geometry with tailored curvatures based on element function:

- **Panels, Modals & Base Cards:** Use `rounded-xl` (`1.5rem` / `24px`) to create smooth, high-end hardware dashboard surfaces that contrast against the rigid rectangular nature of enterprise tools.
- **Interactive Controls (Inputs, Dropdowns, Segment Toggles):** Utilize base roundedness (`0.5rem` / `8px`) for tight spatial alignment and clear interactive affordance.
- **Badges, Telemetry Indicators & Filters:** Form full circular pills (`border-radius: 9999px`) to immediately isolate discrete operational tags (e.g., driver status, bin capacity metrics) from underlying rectangular map tiles.

## Components

### Buttons
- **Primary Action (Dispatch / Optimize Route):** Emerald Green (`#10B981`) background, solid slate text (`#0F172A`, weight: 600), rounded to `0.5rem`. Hover triggers `#059669` with a subtle `0 0 12px rgba(16, 185, 129, 0.35)` glow.
- **Secondary Telematics Button:** Surface 2 (`#334155`) with a 1px border (`#475569`), white text (`#F8FAFC`). Hover shifts to `#475569`.
- **Destructive / Abort Action:** Transparent fill with `1px solid #EF4444`, Crimson text (`#EF4444`). Hover transitions to `rgba(239, 68, 68, 0.15)`.

### Chips & Status Badges
- **Pill Construction:** Full pill-shaped radius (`9999px`), padding `4px 10px`, typography set to `label-sm` (`JetBrains Mono`).
- **Active / On-Route:** Background `rgba(16, 185, 129, 0.12)`, text `#10B981`, border `1px solid rgba(16, 185, 129, 0.3)`. Left icon features a 6px pulsing green beacon.
- **Telematics Metric Pill:** Background `rgba(59, 130, 246, 0.12)`, text `#3B82F6`, border `1px solid rgba(59, 130, 246, 0.3)`.
- **Caution / Warning:** Background `rgba(245, 158, 11, 0.12)`, text `#F59E0B`, border `1px solid rgba(245, 158, 11, 0.3)`.
- **Alert / Overdue:** Background `rgba(239, 68, 68, 0.12)`, text `#EF4444`, border `1px solid rgba(239, 68, 68, 0.3)`.

### Cards & Glass Panels
- **HUD Telemetry Container:** Background `rgba(30, 41, 59, 0.85)`, backdrop blur `12px`, border `1px solid #334155`, corner radius `1.5rem` (`rounded-xl`), inner padding `1.25rem`.
- **Interactive Metric Widget:** Contains a monospaced delta label, big stat counter in `Geist` bold, and an embedded micro sparkline chart colored with the corresponding telemetry accent.

### Input Fields & Controls
- **Search & Filter Bars:** Height `40px`, background `rgba(15, 23, 42, 0.6)`, border `1px solid #334155`, text `#F8FAFC`, placeholder `#64748B`. Font `body-md`. Focus state uses `1px solid #3B82F6` accompanied by an electric ring `0 0 0 2px rgba(59, 130, 246, 0.2)`.
- **Checkboxes & Radios:** Size `18px`, radius `4px` (or round for radios), background `Surface 0`, border `1px solid #475569`. Checked state transitions directly to Emerald Green (`#10B981`) with a sharp white glyph.

### Lists & Dispatch Logs
- **Row Styling:** Tabular lines set in `Surface 1` with bottom borders in `rgba(51, 65, 85, 0.4)`. Alternating hover states trigger `rgba(51, 65, 85, 0.35)`.
- **Data Alignment:** Route IDs, timestamps, speed units, and volume percentages align to the right using `JetBrains Mono`; route names, depot titles, and driver profiles align left using `Geist`.

### Specialized Telematics Components
- **Live Vehicle Marker (Map Element):** 28px circular token with Surface 0 background, 2px border in `#3B82F6`, containing a vehicle-type vector glyph with an active heading directional needle.
- **Telemetry Gauge:** Compact horizontal progress bar, 4px track height, background `#1E293B`, filled with `#10B981` (normal fill) or `#EF4444` (capacity overload > 95%).