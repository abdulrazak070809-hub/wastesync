export async function getOptimizedRoute(
  startCoord: [number, number],
  waypointCoords: [number, number][]
) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token || waypointCoords.length === 0) return null;

  // Format coordinates string: start;waypoint1;waypoint2...
  const allCoords = [startCoord, ...waypointCoords]
    .map((c) => `${c[0]},${c[1]}`)
    .join(';');

  const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${allCoords}?geometries=geojson&source=first&access_token=${token}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.trips && data.trips.length > 0) {
      return {
        geometry: data.trips[0].geometry, // GeoJSON LineString for map rendering
        distanceKm: (data.trips[0].distance / 1000).toFixed(2),
        durationMin: Math.round(data.trips[0].duration / 60),
        waypointOrder: data.waypoints.map((w: any) => w.waypoint_index),
      };
    }
  } catch (err) {
    console.error('Mapbox Route Optimization Error:', err);
  }
  return null;
}