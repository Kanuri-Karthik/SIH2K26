import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  X, 
  Zap, 
  Play, 
  Pause, 
  Truck, 
  Satellite, 
  TrendingUp, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  RefreshCw,
  Clock,
  ShieldAlert,
  Database,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useRealtime, type LiveTelemetryEvent } from '../context/RealtimeContext';

interface LiveTelemetryDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const LiveTelemetryDrawer: React.FC<LiveTelemetryDrawerProps> = ({ 
  isOpen: propIsOpen, 
  onClose: propOnClose 
}) => {
  const { 
    isConnected, 
    connectionMode, 
    liveEvents, 
    overviewStats, 
    unreadAlertsCount,
    isPaused, 
    isDrawerOpen,
    setIsDrawerOpen,
    triggerLiveTick, 
    togglePause, 
    clearUnreadAlerts 
  } = useRealtime();

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [isTriggering, setIsTriggering] = useState(false);

  const showDrawer = propIsOpen !== undefined ? propIsOpen : isDrawerOpen;
  const handleClose = propOnClose || (() => setIsDrawerOpen(false));

  if (!showDrawer) return null;

  const handleManualTrigger = async () => {
    setIsTriggering(true);
    try {
      await triggerLiveTick();
    } finally {
      setIsTriggering(false);
    }
  };

  const filteredEvents = liveEvents.filter(event => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'FASTAG') return event.type === 'FASTAG_TRANSIT';
    if (activeFilter === 'SATELLITE') return event.type === 'SATELLITE_PASS';
    if (activeFilter === 'PROGRESS') return event.type === 'PROGRESS_UPDATE';
    if (activeFilter === 'DISBURSEMENT') return event.type === 'DISBURSEMENT';
    if (activeFilter === 'ALERT') return event.type === 'ALERT_TRIGGER';
    return true;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'FASTAG_TRANSIT':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
            <Truck size={16} />
          </div>
        );
      case 'SATELLITE_PASS':
        return (
          <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center shrink-0">
            <Satellite size={16} />
          </div>
        );
      case 'PROGRESS_UPDATE':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
            <TrendingUp size={16} />
          </div>
        );
      case 'DISBURSEMENT':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-[#0B3C68] flex items-center justify-center shrink-0">
            <IndianRupee size={16} />
          </div>
        );
      case 'ALERT_TRIGGER':
        return (
          <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-center shrink-0">
            <AlertTriangle size={16} />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
            <Activity size={16} />
          </div>
        );
    }
  };

  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[9px] font-black bg-red-100 text-red-800 border border-red-300 animate-pulse">CRITICAL</span>;
      case 'WARNING':
        return <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-100 text-amber-900 border border-amber-300">WARNING</span>;
      case 'SUCCESS':
        return <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">VERIFIED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[9px] font-black bg-blue-100 text-blue-800 border border-blue-300">TELEMETRY</span>;
    }
  };

  const formatEventTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end bg-slate-950/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={handleClose}></div>
      
      {/* Drawer Container styled like the Sovereign Government Landing Page */}
      <div className="relative w-full max-w-2xl bg-[#F8FAFC] text-slate-900 h-full shadow-2xl border-l-2 border-slate-300 flex flex-col z-10 animate-in slide-in-from-right duration-250">
        
        {/* Sovereign Header: Deep Navy + Gold border */}
        <div className="p-5 bg-gradient-to-r from-[#072440] via-[#0B3C68] to-[#12558F] text-white border-b-2 border-amber-500 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <Radio size={20} className="animate-pulse" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black tracking-tight text-white">
                    JAN-DRISHTI REAL-TIME RADAR
                  </h2>
                  <span className="px-1.5 py-0.2 rounded text-[8.5px] font-black bg-amber-500 text-slate-950">
                    GOV.IN
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-blue-100 font-medium">
                    National Telemetry Engine • NHAI FASTag, ISRO Bhuvan & PFMS Gateway
                  </span>
                  <span className="px-2 py-0.2 rounded-full text-[8.5px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {connectionMode === 'websocket' ? 'WEBSOCKET ONLINE' : connectionMode === 'polling' ? 'STREAM POLLING' : 'DISCONNECTED'}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
              title="Close radar drawer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Stats Ribbon (Sovereign Landing Page Style) */}
          {overviewStats && (
            <div className="grid grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-white/15 text-center">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
                <div className="text-[9.5px] text-blue-200 uppercase font-bold tracking-wider">Total Outlay</div>
                <div className="text-xs font-black text-white mt-0.5">₹{(overviewStats.total_sanctioned / 10000000).toFixed(0)} Cr</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
                <div className="text-[9.5px] text-blue-200 uppercase font-bold tracking-wider">Disbursed</div>
                <div className="text-xs font-black text-emerald-300 mt-0.5">₹{(overviewStats.total_expenditure / 10000000).toFixed(1)} Cr</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
                <div className="text-[9.5px] text-blue-200 uppercase font-bold tracking-wider">Absorption</div>
                <div className="text-xs font-black text-amber-300 mt-0.5">{overviewStats.utilization_rate}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
                <div className="text-[9.5px] text-blue-200 uppercase font-bold tracking-wider">Active Works</div>
                <div className="text-xs font-black text-white mt-0.5">{overviewStats.active_works}</div>
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="bg-white border-b border-slate-200 p-3.5 px-5 flex items-center justify-between shadow-2xs shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleManualTrigger}
              disabled={isTriggering}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
              title="Force generate an immediate live telemetry event"
            >
              <Zap size={14} className={isTriggering ? 'animate-spin' : 'fill-slate-950'} />
              <span>{isTriggering ? 'Simulating...' : '⚡ Force Live Event'}</span>
            </button>

            <button
              onClick={togglePause}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                isPaused 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100' 
                  : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
              title={isPaused ? 'Resume live simulation stream' : 'Pause live simulation stream'}
            >
              {isPaused ? <Play size={13} className="fill-emerald-700 text-emerald-700" /> : <Pause size={13} />}
              <span>{isPaused ? 'Resume Stream' : 'Pause Stream'}</span>
            </button>
          </div>

          {unreadAlertsCount > 0 && (
            <button
              onClick={clearUnreadAlerts}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
            >
              Mark alerts read ({unreadAlertsCount})
            </button>
          )}
        </div>

        {/* Filter Pills (Landing Page Tabs Style) */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-thin text-xs shrink-0">
          {[
            { id: 'ALL', label: 'All Telemetry' },
            { id: 'FASTAG', label: '🚛 FASTag Plazas' },
            { id: 'SATELLITE', label: '🛰️ ISRO Satellites' },
            { id: 'PROGRESS', label: '📊 Milestones' },
            { id: 'DISBURSEMENT', label: '💸 PFMS Releases' },
            { id: 'ALERT', label: '⚠️ Anomalies' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer text-xs ${
                activeFilter === tab.id 
                  ? 'bg-[#0B3C68] text-white shadow-xs' 
                  : 'bg-white hover:bg-slate-200/80 text-slate-600 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Stream Body (Clean Landing Page Card Style) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 scrollbar-thin">
          {filteredEvents.length === 0 ? (
            <div className="py-24 text-center text-slate-400">
              <Activity className="w-9 h-9 mx-auto text-slate-400 mb-2.5 animate-pulse" />
              <p className="text-xs font-bold text-slate-700">Awaiting incoming telemetry packets...</p>
              <p className="text-[11px] text-slate-500 mt-1">Click "⚡ Force Live Event" above to trigger an immediate audit packet.</p>
            </div>
          ) : (
            filteredEvents.map((evt, idx) => (
              <div 
                key={evt.id || idx}
                className={`p-4 rounded-2xl border transition-all animate-in slide-in-from-top-2 duration-200 ${
                  idx === 0 
                    ? 'bg-white border-2 border-blue-500 shadow-md ring-2 ring-blue-100' 
                    : 'bg-white border-2 border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3.5">
                  <div className="flex items-start gap-3 min-w-0">
                    {getEventIcon(evt.type)}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-900">{evt.title}</span>
                        {getSeverityBadge(evt.severity)}
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                        {evt.description}
                      </p>

                      {/* Work & Location Tags */}
                      {(evt.work_id || evt.state || evt.district) && (
                        <div className="flex items-center gap-2 mt-2.5 flex-wrap text-[10.5px]">
                          {evt.work_id && (
                            <Link 
                              to={`/projects/${encodeURIComponent(evt.work_id)}`}
                              onClick={handleClose}
                              className="px-2.5 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0B3C68] font-mono font-bold hover:bg-blue-100 transition-colors flex items-center gap-1 shadow-2xs"
                            >
                              <span>{evt.work_id}</span>
                              <ExternalLink size={10} />
                            </Link>
                          )}
                          {evt.district && (
                            <span className="text-slate-500 font-semibold flex items-center gap-1">
                              📍 {evt.district}, {evt.state}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 text-right">
                    <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={11} /> {formatEventTime(evt.timestamp)}
                    </span>
                    {idx === 0 && (
                      <span className="mt-1 px-1.5 py-0.2 rounded text-[8px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        NEWEST
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sovereign Footer */}
        <div className="p-3.5 px-5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Continuous Telemetry Stream Active (3.5s interval)</span>
          </div>
          <button 
            onClick={handleClose}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
          >
            Close Feed
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
