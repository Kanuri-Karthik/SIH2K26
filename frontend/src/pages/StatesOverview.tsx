import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, AlertTriangle, Layers, Navigation, Activity, Lock, Globe, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

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

const REGION_COORDS: Record<string, [number, number]> = {
  'AP-VIJ': [16.5062, 80.6480],
  'KA-BC': [12.9716, 77.5946],
  'MH-PUN': [18.5204, 73.8567],
  'UP-VAR': [25.3176, 82.9739],
  'DL-ND': [28.6139, 77.2090]
};

export const StatesOverview = () => {
  const { currentRole, currentProfile, activeRegion } = useRole();
  const [works, setWorks] = useState<any[]>([]);
  const navigate = useNavigate();

  const isDM = currentRole === 'district_magistrate';
  const isMP = currentRole === 'member_parliament';

  const defaultCenter: [number, number] = isDM && REGION_COORDS[activeRegion.id] 
    ? REGION_COORDS[activeRegion.id] 
    : [22.5937, 78.9629];
  const defaultZoom = isDM ? 9 : 5;

  useEffect(() => {
    const fetchWorks = () => {
      fetch('http://localhost:8000/api/works')
        .then(res => res.json())
        .then(data => {
          // Jitter coordinates so points in the same state don't exactly overlap
          const mapped = data.map((w: any) => {
            const stateKey = w.state?.toLowerCase().trim() || "";
            const baseCoord = STATE_COORDS[stateKey] || [20.5937, 78.9629];
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

  // For DM, restrict to activeRegion works if applicable
  const displayWorks = isDM 
    ? works.filter(w => 
        w.work_id?.startsWith(activeRegion.code) || 
        w.district?.toLowerCase().includes(activeRegion.name.toLowerCase()) || 
        w.state?.toLowerCase() === activeRegion.state.toLowerCase()
      )
    : works;

  const criticalCount = displayWorks.filter(w => w.risk_profile?.risk_level === 'CRITICAL').length;
  const delayedCount = displayWorks.filter(w => w.status === 'DELAYED').length;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-slide-up h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${currentProfile.badgeBg} ${currentProfile.badgeColor}`}>
              {currentProfile.sealBadge}
            </span>
            {isDM ? (
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                <Lock size={12} /> Strict Regional Scope: {activeRegion.name} District ({activeRegion.state})
              </span>
            ) : isMP ? (
              <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <Globe size={12} /> Sovereign Pan-India Oversight + {activeRegion.name}
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-500">Pan-India 543 Constituencies</span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {isDM 
              ? `${activeRegion.name} District ISRO Bhuvan Satellite Ground Verification Grid` 
              : `Live Regional Heatmap & ISRO Bhuvan Satellite Telemetry`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {isDM
              ? `Ground-truth verification station for ${activeRegion.dm.district}. Geo-coordinate validation for Rule 238 GFR disbursals.`
              : 'Geospatial tracking of MPLADS active sites and detected anomalies across all Parliamentary constituencies.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center bg-white border border-slate-200/70 px-4 py-2 rounded-xl shadow-xs">
             <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-slate-700">Critical: {criticalCount}</span>
             </div>
             <div className="w-px h-4 bg-slate-200"></div>
             <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                <span className="text-xs font-bold text-slate-700">Delayed: {delayedCount}</span>
             </div>
             <div className="w-px h-4 bg-slate-200"></div>
             <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                <span className="text-xs font-bold text-slate-700">On Track: {displayWorks.length - criticalCount - delayedCount}</span>
             </div>
          </div>
        </div>
      </div>
      
      <Card className="flex-1 border border-slate-200 shadow-sm rounded-2xl overflow-hidden relative bg-slate-50">
        {displayWorks.length === 0 && works.length === 0 ? (
           <div className="w-full h-full flex items-center justify-center">
             <Activity className="w-8 h-8 text-blue-500 animate-spin" />
           </div>
        ) : (
          <MapContainer 
            key={`${activeRegion.id}-${isDM}`} 
            center={defaultCenter} 
            zoom={defaultZoom} 
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {displayWorks.map((wk) => {
              const isCrit = wk.risk_profile?.risk_level === 'CRITICAL';
              const isHigh = wk.risk_profile?.risk_level === 'HIGH';
              const isDelayed = wk.status === 'DELAYED';
              
              let color = '#3b82f6';
              if (isCrit) color = '#ef4444';
              else if (isHigh || isDelayed) color = '#f59e0b';

              return (
                <CircleMarker
                  key={wk.work_id}
                  center={wk.coords || [20.5937, 78.9629]}
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
          </MapContainer>
        )}
        
        {/* Map UI Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] pointer-events-none">
           <div className="bg-white/95 backdrop-blur px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-lg flex items-center gap-3">
              <Navigation size={18} className="text-blue-600" />
              <div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geospatial Engine</div>
                 <div className="text-xs font-bold text-slate-800">
                   {isDM ? `ISRO Bhuvan Ground Telemetry: ${activeRegion.name}` : 'ISRO / Bhuvan Pan-India Sync: Active'}
                 </div>
              </div>
           </div>
        </div>
      </Card>
    </div>
  );
};
