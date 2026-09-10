import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Truck, 
  Satellite, 
  TrendingUp, 
  IndianRupee, 
  AlertTriangle, 
  X, 
  ChevronRight 
} from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';

interface LiveTickerPillProps {
  onOpenDrawer: () => void;
}

export const LiveTickerPill: React.FC<LiveTickerPillProps> = ({ onOpenDrawer }) => {
  const { liveEvents, isConnected } = useRealtime();
  const [currentEvent, setCurrentEvent] = useState(liveEvents[0] || null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedId, setDismissedId] = useState<string | null>(null);

  useEffect(() => {
    if (liveEvents.length > 0) {
      const latest = liveEvents[0];
      if (latest.id !== dismissedId) {
        setCurrentEvent(latest);
        setIsVisible(true);
      }
    }
  }, [liveEvents, dismissedId]);

  if (!isVisible || !currentEvent) return null;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'FASTAG_TRANSIT':
        return <Truck size={14} className="text-amber-400 shrink-0" />;
      case 'SATELLITE_PASS':
        return <Satellite size={14} className="text-cyan-400 shrink-0" />;
      case 'PROGRESS_UPDATE':
        return <TrendingUp size={14} className="text-emerald-400 shrink-0" />;
      case 'DISBURSEMENT':
        return <IndianRupee size={14} className="text-blue-400 shrink-0" />;
      case 'ALERT_TRIGGER':
        return <AlertTriangle size={14} className="text-red-400 shrink-0" />;
      default:
        return <Radio size={14} className="text-emerald-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-md bg-slate-950/95 text-white border border-slate-700/80 shadow-2xl rounded-2xl p-2.5 sm:p-3 backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2.5">
        <div className="relative w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
          {getEventIcon(currentEvent.type)}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        <button 
          onClick={onOpenDrawer}
          className="flex-1 min-w-0 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE TELEMETRY
            </span>
            <span className="text-[9px] text-slate-400 font-mono">Just now</span>
          </div>
          <p className="text-xs font-bold text-white truncate group-hover:text-blue-300 transition-colors">
            {currentEvent.title}
          </p>
          <p className="text-[10px] text-slate-300 truncate max-w-xs">
            {currentEvent.description}
          </p>
        </button>

        <div className="flex items-center gap-1 shrink-0 ml-1">
          <button
            onClick={onOpenDrawer}
            className="p-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-0.5 px-2 py-1"
            title="Open Live Radar Feed"
          >
            <span>Feed</span>
            <ChevronRight size={12} />
          </button>

          <button
            onClick={() => {
              setDismissedId(currentEvent.id);
              setIsVisible(false);
            }}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Dismiss notification"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
