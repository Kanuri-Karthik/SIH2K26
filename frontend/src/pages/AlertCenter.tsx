import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { AlertTriangle, ShieldAlert, CheckCircle2, Search, Filter, RefreshCw, ArrowUpRight, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

export const AlertCenter = () => {
  const { currentRole, currentProfile, activeRegion } = useRole();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const isDM = currentRole === 'district_magistrate';
  const isMP = currentRole === 'member_parliament';

  const fetchAlerts = () => {
    fetch('http://localhost:8000/api/alerts')
      .then(res => res.json())
      .then(data => {
        // Sort alerts: newest first, critical first
        const sorted = data.sort((a: any, b: any) => {
          if (a.severity === 'CRITICAL' && b.severity !== 'CRITICAL') return -1;
          if (a.severity !== 'CRITICAL' && b.severity === 'CRITICAL') return 1;
          return new Date(b.detected_date).getTime() - new Date(a.detected_date).getTime();
        });
        setAlerts(sorted.slice(0, 100)); // limit to 100 on frontend for performance
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching alerts:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter(a => {
    const matchesSearch = !searchTerm || 
      a.alert_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.work?.district?.toLowerCase().includes(searchTerm.toLowerCase());

    if (isDM) {
      // DM strictly sees local district alerts or alerts tagged to their region
      if (a.work) {
        return matchesSearch && (
          a.work.work_id?.startsWith(activeRegion.code) || 
          a.work.district?.toLowerCase().includes(activeRegion.name.toLowerCase())
        );
      }
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-slide-up pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${currentProfile.badgeBg} ${currentProfile.badgeColor}`}>
              {currentProfile.sealBadge}
            </span>
            {isDM ? (
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                <Lock size={12} /> Strict Regional Scope: {activeRegion.name} District
              </span>
            ) : isMP ? (
              <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <Globe size={12} /> Pan-India Macro Oversight + {activeRegion.name}
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-500">Pan-India Alert Queue</span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {isDM ? `${activeRegion.name} District Triage & Show-Cause Alerts` : 'Alert Center & Anomaly Triage Queue'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {isDM 
              ? `Real-time physical inspection discrepancies and Clause 14B show-cause triggers for ${activeRegion.name} District.`
              : 'Real-time triage queue for AI-detected anomalies, procurement bid rigging, and critical execution risks.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-200">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             Live Queue Active
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs font-medium border border-slate-200 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" 
            />
          </div>
        </div>
      </div>
      
      <Card className="border border-slate-200 shadow-xs rounded-2xl bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Alert ID</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Trigger Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {isLoading && filteredAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-3" />
                      Loading live alerts...
                    </td>
                  </tr>
                ) : filteredAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                      <div className="flex flex-col items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                        <span>No active alerts found for {isDM ? `${activeRegion.name} District` : 'selected filters'}. System nominal.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAlerts.map((alert) => {
                    const isCritical = alert.severity === 'CRITICAL';
                    return (
                      <tr key={alert.alert_id} className="hover:bg-slate-50 transition-colors duration-200 group">
                        <td className="px-6 py-4 font-mono font-bold text-slate-700">{alert.alert_id}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{alert.detected_date || 'Just now'}</td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isCritical ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            {isCritical ? <ShieldAlert size={12}/> : <AlertTriangle size={12}/>}
                            {alert.severity}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">
                          {alert.type}
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">{alert.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => alert.work ? navigate(`/projects/${alert.work.work_id}`) : null}
                            className="inline-flex items-center gap-1 text-blue-700 font-bold bg-white border border-slate-200 shadow-2xs hover:border-blue-300 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all btn-press cursor-pointer"
                            disabled={!alert.work}
                          >
                            <span>Investigate</span>
                            <ArrowUpRight size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
