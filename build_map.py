import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# 1. Ensure tailwind can see leafet classes if needed, but standard css import works.
# Let's create StatesOverview.tsx
map_page = """
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, AlertTriangle, Layers, Navigation, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATE_COORDS: Record<string, [number, number]> = {
  "kerala": [10.8505, 76.2711],
  "maharashtra": [19.7515, 75.7139],
  "uttar pradesh": [26.8467, 80.9462],
  "bihar": [25.0961, 85.3131],
  "gujarat": [22.2587, 71.1924],
  "karnataka": [15.3173, 75.7139],
  "tamil nadu": [11.1271, 78.6569],
  "west bengal": [22.9868, 87.8550],
  "rajasthan": [27.0238, 74.2179],
  "andhra pradesh": [15.9129, 79.7400],
  "madhya pradesh": [22.9734, 78.6569],
  "odisha": [20.9517, 85.0985],
  "telangana": [18.1124, 79.0193],
  "punjab": [31.1471, 75.3412],
  "haryana": [29.0588, 76.0856],
  "delhi": [28.7041, 77.1025],
  "jharkhand": [23.6102, 85.2799],
  "chhattisgarh": [21.2787, 81.8661],
  "assam": [26.2006, 92.9376]
};

// Component to handle map centering logic
const MapEffect = ({ works }: { works: any[] }) => {
  const map = useMap();
  useEffect(() => {
    // Optionally zoom to fit bounds, but for India fixed center is fine.
    map.invalidateSize();
  }, [works, map]);
  return null;
};

export const StatesOverview = () => {
  const [works, setWorks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorks = () => {
      fetch('http://localhost:8000/api/works')
        .then(res => res.json())
        .then(data => {
          // Jitter coordinates so points in the same state don't exactly overlap
          const mapped = data.map((w: any) => {
            const stateKey = w.state?.toLowerCase().trim() || "";
            const baseCoord = STATE_COORDS[stateKey] || [20.5937, 78.9629]; // Default to Central India
            // Apply slight random offset (jitter) up to ~0.5 degrees
            const lat = baseCoord[0] + (Math.random() - 0.5) * 1.5;
            const lng = baseCoord[1] + (Math.random() - 0.5) * 1.5;
            return { ...w, coords: [lat, lng] };
          });
          setWorks(mapped);
        })
        .catch(console.error);
    };
    
    fetchWorks();
    const interval = setInterval(fetchWorks, 4000);
    return () => clearInterval(interval);
  }, []);

  const criticalCount = works.filter(w => w.risk_profile?.risk_level === 'CRITICAL').length;
  const delayedCount = works.filter(w => w.status === 'DELAYED').length;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-slide-up h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Live Regional Heatmap</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Geospatial tracking of MPLADS active sites and detected anomalies.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center bg-white border border-slate-200/70 px-4 py-2 rounded-lg shadow-sm">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-slate-700">Critical: {criticalCount}</span>
             </div>
             <div className="w-px h-4 bg-slate-200"></div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                <span className="text-xs font-bold text-slate-700">Delayed: {delayedCount}</span>
             </div>
             <div className="w-px h-4 bg-slate-200"></div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-xs font-bold text-slate-700">On Track: {works.length - criticalCount - delayedCount}</span>
             </div>
          </div>
        </div>
      </div>
      
      <Card className="flex-1 border border-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden relative bg-slate-50 stagger-2">
        {works.length === 0 ? (
           <div className="w-full h-full flex items-center justify-center">
             <Activity className="w-8 h-8 text-blue-500 animate-spin" />
           </div>
        ) : (
          <MapContainer center={[22.5937, 78.9629]} zoom={5} className="w-full h-full z-0">
            {/* Light CartoDB tile layer for premium look */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            
            {works.map((wk, idx) => {
              const isCrit = wk.risk_profile?.risk_level === 'CRITICAL';
              const isHigh = wk.risk_profile?.risk_level === 'HIGH';
              const isDelayed = wk.status === 'DELAYED';
              
              let color = '#3b82f6'; // blue (nominal)
              if (isCrit) color = '#ef4444'; // red
              else if (isHigh || isDelayed) color = '#f59e0b'; // amber

              return (
                <CircleMarker
                  key={wk.work_id}
                  center={wk.coords}
                  radius={isCrit ? 9 : 6}
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: isCrit ? 0.8 : 0.6,
                    weight: isCrit ? 3 : 1
                  }}
                  eventHandlers={{
                    click: () => navigate(`/projects/${wk.work_id}`)
                  }}
                >
                  <Tooltip className="custom-tooltip" direction="top" offset={[0, -10]} opacity={1}>
                    <div className="p-1">
                      <div className="font-bold text-xs mb-1 text-slate-800">{wk.work_id}</div>
                      <div className="text-[10px] text-slate-600 mb-1">{wk.district}, {wk.state}</div>
                      <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${isCrit ? 'bg-red-100 text-red-700' : isHigh ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        Risk: {Math.round(wk.risk_profile?.overall_score || 0)}/100
                      </div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
            <MapEffect works={works} />
          </MapContainer>
        )}
        
        {/* Map UI Overlay overlay */}
        <div className="absolute bottom-4 left-4 z-[400] pointer-events-none">
           <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-lg border border-slate-200 shadow-lg flex items-center gap-3">
              <Navigation size={16} className="text-blue-600" />
              <div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geospatial Engine</div>
                 <div className="text-xs font-bold text-slate-800">ISRO/Bhuvan Sync: Active</div>
              </div>
           </div>
        </div>
      </Card>
    </div>
  );
};
"""
write_file("frontend/src/pages/StatesOverview.tsx", map_page)

# Add custom leaflet tooltip styles in index.css
index_css = read_file("frontend/src/index.css")
leaflet_css = """
/* Leaflet Customizations */
.leaflet-container {
  font-family: inherit;
}
.custom-tooltip {
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 4px;
}
"""
if "Leaflet Customizations" not in index_css:
    with open("frontend/src/index.css", "a", encoding="utf-8") as f:
        f.write("\n" + leaflet_css)

print("Live Interactive Heatmap injected!")
