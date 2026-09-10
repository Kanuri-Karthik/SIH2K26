import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface LiveTelemetryEvent {
  id: string;
  type: 'FASTAG_TRANSIT' | 'PROGRESS_UPDATE' | 'DISBURSEMENT' | 'SATELLITE_PASS' | 'ALERT_TRIGGER';
  timestamp: string;
  title: string;
  description: string;
  work_id?: string;
  work_name?: string;
  state?: string;
  district?: string;
  severity?: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';
  metadata?: Record<string, any>;
}

export interface DashboardOverviewStats {
  total_allocation: number;
  total_sanctioned: number;
  total_expenditure: number;
  utilization_rate: number;
  active_works: number;
  completed_works: number;
  delayed_works: number;
  high_risk_works: number;
  timestamp?: string;
}

export interface UpdatedWorkSummary {
  work_id: string;
  physical_progress: number;
  financial_progress: number;
  actual_expenditure: number;
  status: string;
}

interface RealtimeContextType {
  isConnected: boolean;
  connectionMode: 'websocket' | 'polling' | 'disconnected';
  liveEvents: LiveTelemetryEvent[];
  overviewStats: DashboardOverviewStats | null;
  recentlyUpdatedWorkIds: Set<string>;
  latestUpdatedWorks: Map<string, UpdatedWorkSummary>;
  unreadAlertsCount: number;
  isPaused: boolean;
  lastEventTime: string | null;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  triggerLiveTick: () => Promise<void>;
  togglePause: () => Promise<void>;
  clearUnreadAlerts: () => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

const WS_URL = 'ws://localhost:8000/api/live/ws';
const API_BASE = 'http://localhost:8000/api/live';

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionMode, setConnectionMode] = useState<'websocket' | 'polling' | 'disconnected'>('disconnected');
  const [liveEvents, setLiveEvents] = useState<LiveTelemetryEvent[]>([]);
  const [overviewStats, setOverviewStats] = useState<DashboardOverviewStats | null>(null);
  const [recentlyUpdatedWorkIds, setRecentlyUpdatedWorkIds] = useState<Set<string>>(new Set());
  const [latestUpdatedWorks, setLatestUpdatedWorks] = useState<Map<string, UpdatedWorkSummary>>(new Map());
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [lastEventTime, setLastEventTime] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollingIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recentWorkClearTimeouts = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Handle incoming live tick
  const handleLiveTick = useCallback((data: { event: LiveTelemetryEvent; overview?: DashboardOverviewStats; updated_works?: UpdatedWorkSummary[] }) => {
    if (!data || !data.event) return;

    setLiveEvents((prev) => {
      // Prepend and keep max 60 events
      const updated = [data.event, ...prev.filter((e) => e.id !== data.event.id)];
      return updated.slice(0, 60);
    });

    setLastEventTime(data.event.timestamp || new Date().toISOString());

    if (data.overview) {
      setOverviewStats(data.overview);
    }

    if (data.event.type === 'ALERT_TRIGGER') {
      setUnreadAlertsCount((c) => c + 1);
    }

    if (data.updated_works && data.updated_works.length > 0) {
      setLatestUpdatedWorks((prev) => {
        const next = new Map(prev);
        data.updated_works?.forEach((w) => next.set(w.work_id, w));
        return next;
      });

      setRecentlyUpdatedWorkIds((prev) => {
        const next = new Set(prev);
        data.updated_works?.forEach((w) => {
          next.add(w.work_id);

          // Clear existing timeout if any
          if (recentWorkClearTimeouts.current.has(w.work_id)) {
            clearTimeout(recentWorkClearTimeouts.current.get(w.work_id)!);
          }

          // Auto-remove highlight after 7 seconds
          const timeout = setTimeout(() => {
            setRecentlyUpdatedWorkIds((current) => {
              const cleaned = new Set(current);
              cleaned.delete(w.work_id);
              return cleaned;
            });
            recentWorkClearTimeouts.current.delete(w.work_id);
          }, 7000);

          recentWorkClearTimeouts.current.set(w.work_id, timeout);
        });
        return next;
      });
    }
  }, []);

  // Polling fallback mechanism
  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current) return;
    setConnectionMode('polling');

    const poll = async () => {
      try {
        const [statusRes, eventsRes] = await Promise.all([
          fetch(`${API_BASE}/status`),
          fetch(`${API_BASE}/events?limit=25`)
        ]);

        if (statusRes.ok) {
          const statusData = await statusRes.json();
          if (statusData.overview) {
            setOverviewStats(statusData.overview);
          }
          setIsPaused(!statusData.simulator_active);
          setIsConnected(true);
        }

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (Array.isArray(eventsData) && eventsData.length > 0) {
            setLiveEvents(eventsData);
            setLastEventTime(eventsData[0].timestamp);
          }
        }
      } catch (err) {
        setIsConnected(false);
        setConnectionMode('disconnected');
      }
    };

    poll();
    pollingIntervalRef.current = setInterval(poll, 3500);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, []);

  // Primary WebSocket setup with automatic reconnect
  useEffect(() => {
    let isSubscribed = true;

    const connectWebSocket = () => {
      try {
        const socket = new WebSocket(WS_URL);
        wsRef.current = socket;

        socket.onopen = () => {
          if (!isSubscribed) return;
          setIsConnected(true);
          setConnectionMode('websocket');
          stopPolling();
          // Heartbeat ping every 25s
          const pingInterval = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ action: 'ping' }));
            }
          }, 25000);

          socket.onclose = () => {
            clearInterval(pingInterval);
            if (!isSubscribed) return;
            setIsConnected(false);
            setConnectionMode('disconnected');
            // Try polling while attempting WS reconnect
            startPolling();
            reconnectTimeoutRef.current = setTimeout(connectWebSocket, 4000);
          };
        };

        socket.onmessage = (event) => {
          try {
            const parsed = JSON.parse(event.data);
            if (parsed.type === 'INITIAL_STATE') {
              if (parsed.data.overview) setOverviewStats(parsed.data.overview);
              if (parsed.data.events) setLiveEvents(parsed.data.events);
              if (parsed.data.events?.[0]) setLastEventTime(parsed.data.events[0].timestamp);
              setIsPaused(!parsed.data.simulator_active);
            } else if (parsed.type === 'LIVE_TICK') {
              handleLiveTick(parsed.data);
            } else if (parsed.type === 'SIMULATOR_STATE') {
              setIsPaused(!parsed.active);
            }
          } catch (e) {
            console.error('Error parsing WS frame', e);
          }
        };

        socket.onerror = () => {
          socket.close();
        };
      } catch (err) {
        startPolling();
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    return () => {
      isSubscribed = false;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      stopPolling();
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [handleLiveTick, startPolling, stopPolling]);

  // Trigger manual simulation tick for demonstrations
  const triggerLiveTick = async () => {
    try {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ action: 'trigger_tick' }));
      } else {
        await fetch(`${API_BASE}/simulate-tick`, { method: 'POST' });
      }
    } catch (e) {
      console.error('Error triggering tick:', e);
    }
  };

  // Toggle pause / play of background simulator
  const togglePause = async () => {
    try {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ action: 'toggle_simulation' }));
      } else {
        await fetch(`${API_BASE}/toggle`, { method: 'POST' });
        setIsPaused((p) => !p);
      }
    } catch (e) {
      console.error('Error toggling pause:', e);
    }
  };

  const clearUnreadAlerts = () => {
    setUnreadAlertsCount(0);
  };

  return (
    <RealtimeContext.Provider
      value={{
        isConnected,
        connectionMode,
        liveEvents,
        overviewStats,
        recentlyUpdatedWorkIds,
        latestUpdatedWorks,
        unreadAlertsCount,
        isPaused,
        lastEventTime,
        isDrawerOpen,
        setIsDrawerOpen,
        triggerLiveTick,
        togglePause,
        clearUnreadAlerts
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = (): RealtimeContextType => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};
