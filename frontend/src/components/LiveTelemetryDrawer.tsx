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
        return <Truck size={16} className="text-amber-400" />;
      case 'SATELLITE_PASS':
        return <Satellite size={16} className="text-cyan-400" />;
      case 'PROGRESS_UPDATE':
        return <TrendingUp size={16} className="text-emerald-400" />;
      case 'DISBURSEMENT':
        return <IndianRupee size={16} className="text-blue-400" />;
      case 'ALERT_TRIGGER':
        return <AlertTriangle size={16} className="text-red-400" />;
      default:
        return <Activity size={16} className="text-slate-400" />;
    }
  };

  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">CRITICAL</span>;
      case 'WARNING':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">WARNING</span>;
      case 'SUCCESS':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">VERIFIED</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40">TELEMETRY</span>;
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
    <div className="fixed inset-0 z-[9999] flex justify-end bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={handleClose}></div>
      
      <div className="relative w-full max-w-2xl bg-slate-950 text-slate-100 h-full shadow-2xl border-l border-slate-800 flex flex-col z-10 animate-in slide-in-from-right duration-250">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-900 to-[#072440]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <Radio size={18} className="animate-pulse" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black tracking-tight text-white">
                    JAN-DRISHTI REAL-TIME RADAR
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {connectionMode === 'websocket' ? 'WEBSOCKET ONLINE' : connectionMode === 'polling' ? 'FALLBACK STREAMING' : 'DISCONNECTED'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Live multi-source telemetry: NHAI FASTag, ISRO Bhuvan satellites & PFMS Central Treasury.
                </p>
              </div>
            </div>

            <button 
              onClick={handleClose}
              className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Stats Ribbon */}
          {overviewStats && (
            <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Outlay</div>
                <div className="text-xs font-black text-white mt-0.5">₹{(overviewStats.total_sanctioned / 10000000).toFixed(0)} Cr</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Disbursed</div>
                <div className="text-xs font-black text-emerald-400 mt-0.5">₹{(overviewStats.total_expenditure / 10000000).toFixed(1)} Cr</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Absorption</div>
                <div className="text-xs font-black text-blue-400 mt-0.5">{overviewStats.utilization_rate}%</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Active Works</div>
                <div className="text-xs font-black text-amber-400 mt-0.5">{overviewStats.active_works}</div>
              </div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <button
                onClick={handleManualTrigger}
                disabled={isTriggering}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                title="Force generate an immediate live telemetry event"
              >
                <Zap size={14} className={isTriggering ? 'animate-spin' : 'fill-slate-950'} />
                <span>{isTriggering ? 'Simulating...' : '⚡ Force Live Event'}</span>
              </button>

              <button
                onClick={togglePause}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  isPaused 
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 hover:bg-emerald-900' 
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
                title={isPaused ? 'Resume live simulation stream' : 'Pause live simulation stream'}
              >
                {isPaused ? <Play size={13} className="fill-emerald-400" /> : <Pause size={13} />}
                <span>{isPaused ? 'Resume Stream' : 'Pause Stream'}</span>
              </button>
            </div>

            {unreadAlertsCount > 0 && (
              <button
                onClick={clearUnreadAlerts}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Clear alerts ({unreadAlertsCount})
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-3 scrollbar-thin text-[11px]">
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
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === tab.id 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stream Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin">
          {filteredEvents.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <Activity className="w-8 h-8 mx-auto text-slate-600 mb-2 animate-pulse" />
              <p className="text-xs font-bold">Awaiting incoming telemetry packets...</p>
              <p className="text-[10px] text-slate-600 mt-1">Click "⚡ Force Live Event" above to trigger an immediate audit packet.</p>
            </div>
          ) : (
            filteredEvents.map((evt, idx) => (
              <div 
                key={evt.id || idx}
                className={`p-3.5 rounded-xl border transition-all animate-in slide-in-from-top-2 duration-200 ${
                  idx === 0 ? 'bg-slate-900/90 border-blue-500/50 shadow-md ring-1 ring-blue-500/20' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/80">
                      {getEventIcon(evt.type)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white">{evt.title}</span>
                        {getSeverityBadge(evt.severity)}
                      </div>

                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {evt.description}
                      </p>

                      {/* Work & Location Tags */}
                      {(evt.work_id || evt.state || evt.district) && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap text-[10px]">
                          {evt.work_id && (
                            <Link 
                              to={`/projects/${encodeURIComponent(evt.work_id)}`}
                              onClick={handleClose}
                              className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/80 text-blue-300 font-mono font-bold hover:bg-blue-900 transition-colors flex items-center gap-1"
                            >
                              <span>{evt.work_id}</span>
                              <ExternalLink size={10} />
                            </Link>
                          )}
                          {evt.district && (
                            <span className="text-slate-400 font-medium">
                              📍 {evt.district}, {evt.state}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 text-right">
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock size={10} /> {formatEventTime(evt.timestamp)}
                    </span>
                    {idx === 0 && (
                      <span className="mt-1 px-1.5 py-0.2 rounded text-[8px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        NEWEST
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Continuous Telemetry Stream Active (3.5s interval)</span>
          </div>
          <button 
            onClick={handleClose}
            className="text-xs font-bold text-slate-300 hover:text-white underline cursor-pointer"
          >
            Close Feed
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
