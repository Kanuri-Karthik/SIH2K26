import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Landmark, 
  Database, 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  Globe, 
  FileText, 
  Radio, 
  Send, 
  Download, 
  CheckCircle2, 
  X, 
  Printer, 
  ArrowUpRight,
  TrendingUp,
  Building,
  Truck,
  Satellite,
  Zap,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { useRealtime } from '../../context/RealtimeContext';
import { Link } from 'react-router-dom';

interface StateRow {
  state: string;
  constituencies: number;
  outlay: string;
  disbursed: string;
  utilization: number;
  works: number;
  status: 'Exemplary' | 'On Track' | 'Advisory Issued' | 'Review Triggered';
}

const INITIAL_STATES: StateRow[] = [
  { state: 'Gujarat', constituencies: 26, outlay: '₹1,420 Cr', disbursed: '₹1,195 Cr', utilization: 84.2, works: 920, status: 'Exemplary' },
  { state: 'Tamil Nadu', constituencies: 39, outlay: '₹1,890 Cr', disbursed: '₹1,542 Cr', utilization: 81.6, works: 1240, status: 'Exemplary' },
  { state: 'Maharashtra', constituencies: 48, outlay: '₹2,180 Cr', disbursed: '₹1,724 Cr', utilization: 79.1, works: 1480, status: 'On Track' },
  { state: 'Uttar Pradesh', constituencies: 80, outlay: '₹3,450 Cr', disbursed: '₹2,498 Cr', utilization: 72.4, works: 2340, status: 'On Track' },
  { state: 'Karnataka', constituencies: 28, outlay: '₹1,320 Cr', disbursed: '₹950 Cr', utilization: 72.0, works: 890, status: 'On Track' },
  { state: 'West Bengal', constituencies: 42, outlay: '₹1,950 Cr', disbursed: '₹1,111 Cr', utilization: 57.0, works: 1120, status: 'Advisory Issued' },
  { state: 'Bihar', constituencies: 40, outlay: '₹1,840 Cr', disbursed: '₹892 Cr', utilization: 48.5, works: 910, status: 'Advisory Issued' },
  { state: 'Nagaland', constituencies: 1, outlay: '₹45 Cr', disbursed: '₹18.5 Cr', utilization: 41.2, works: 38, status: 'Review Triggered' }
];

const TREND_DATA = [
  { month: 'Apr', expenditure: 1820, risk: 18 },
  { month: 'May', expenditure: 2140, risk: 24 },
  { month: 'Jun', expenditure: 2490, risk: 31 },
  { month: 'Jul', expenditure: 2810, risk: 28 },
  { month: 'Aug', expenditure: 3450, risk: 36 },
  { month: 'Sep', expenditure: 4120, risk: 48 },
];

export const MoSPIDashboard: React.FC = () => {
  const { currentProfile } = useRole();
  const { overviewStats, liveEvents, triggerLiveTick, setIsDrawerOpen, isConnected } = useRealtime();
  const [states, setStates] = useState<StateRow[]>(INITIAL_STATES);
  const [broadcastModal, setBroadcastModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isTriggering, setIsTriggering] = useState(false);

  const handleSimulate = async () => {
    setIsTriggering(true);
    try {
      await triggerLiveTick();
      setSuccessToast("Simulated live telemetry event successfully transmitted to PFMS & FASTag nodes.");
      setTimeout(() => setSuccessToast(null), 4000);
    } finally {
      setIsTriggering(false);
    }
  };

  const handleIssueAdvisory = (stateName: string) => {
    setSuccessToast(`Union Ministerial Directive issued to Chief Secretary & Planning Department, Government of ${stateName}.`);
    setTimeout(() => setSuccessToast(null), 4500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-slide-up pb-12">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-8 z-50 bg-[#0B3C68] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{successToast}</span>
        </div>
      )}

      {/* MoSPI Union Executive Command Header */}
      <div className="bg-gradient-to-r from-[#072440] via-[#0B3C68] to-[#12558F] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <img src="/gov/emblem_india.svg" alt="Emblem" className="h-44 object-contain filter invert" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black tracking-wider uppercase">
                Union Ministry Executive Command
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-slate-200 text-[10px] font-bold">
                18th Lok Sabha Macro Cycle (2024–2029)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                PFMS Central Treasury Gateway Connected
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय | National Executive Oversight Hub
            </h1>
            <p className="text-sm text-blue-100 max-w-3xl font-medium leading-relaxed">
              Presided by <strong className="text-white font-bold">{currentProfile.name}</strong>, Secretary & Chief Statistician of India. Pan-India macro governance across all 543 Parliamentary Constituencies, inter-state benchmark analytics, central PFMS fund releases, and Union Cabinet advisory directives.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setBroadcastModal(true)}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md btn-press cursor-pointer"
            >
              <Radio size={16} /> Broadcast Gazette Circular
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all btn-press cursor-pointer"
            >
              <FileText size={15} /> Cabinet Summary
            </button>
          </div>
        </div>
      </div>

      {/* National Macro Outlay KPI Cards with Realtime Pulse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Union Outlay</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live Synced"></span>
              </div>
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3C68] flex items-center justify-center font-bold">
                <Database size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{overviewStats ? (overviewStats.total_sanctioned / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 1 }) : '23,450.00'} <span className="text-base font-bold text-slate-500">Cr</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">543 Lok Sabha + 245 Rajya Sabha Seats</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">PFMS Disbursal Rate</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Activity size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {overviewStats ? overviewStats.utilization_rate : 71.8}% 
              <span className="text-sm font-semibold text-emerald-600 ml-1.5">
                (₹{overviewStats ? (overviewStats.total_expenditure / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 1 }) : '16,842'} Cr)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${overviewStats ? Math.min(overviewStats.utilization_rate, 100) : 71.8}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Monitored Works</span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Globe size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {overviewStats ? overviewStats.active_works + overviewStats.completed_works + overviewStats.delayed_works : 14280} 
              <span className="text-sm font-semibold text-slate-500 ml-1">Projects</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              {overviewStats ? `${overviewStats.active_works} in active progress • ${overviewStats.completed_works} completed` : 'Across 36 States & Union Territories'}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-amber-200 bg-amber-50/60 shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">High Risk Pan-India</span>
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <AlertTriangle size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-amber-950 tracking-tight">
              {overviewStats ? overviewStats.high_risk_works : 48} 
              <span className="text-sm font-semibold text-amber-800 ml-1">Flagged Works</span>
            </div>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">Clause 14B Show-Cause Trigger Candidates</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time Pan-India Surveillance Ticker */}
      <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Radio size={16} className="animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white tracking-wide">
                  REAL-TIME TELEMETRY STREAM
                </h3>
                <span className="px-2 py-0.2 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  LIVE 24/7 RADAR
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Continuous audit packets incoming from NHAI FASTag Plazas, ISRO Cartosat-3 satellites & PFMS Central Core.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSimulate}
              disabled={isTriggering}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md disabled:opacity-50"
              title="Trigger an immediate simulation packet"
            >
              <Zap size={13} className={isTriggering ? 'animate-spin' : 'fill-slate-950'} />
              <span>{isTriggering ? 'Simulating...' : '⚡ Force Live Event'}</span>
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <span>Full Radar Feed ({liveEvents.length})</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* 3 Most Recent Live Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {liveEvents.slice(0, 3).map((evt, idx) => (
            <div 
              key={evt.id || idx}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {evt.type === 'FASTAG_TRANSIT' ? <Truck size={13} className="text-amber-400" /> :
                     evt.type === 'SATELLITE_PASS' ? <Satellite size={13} className="text-cyan-400" /> :
                     evt.type === 'PROGRESS_UPDATE' ? <TrendingUp size={13} className="text-emerald-400" /> :
                     evt.type === 'DISBURSEMENT' ? <Activity size={13} className="text-blue-400" /> :
                     <AlertTriangle size={13} className="text-red-400" />}
                    <span className="text-[10px] font-black uppercase text-slate-300">
                      {evt.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">
                    {new Date(evt.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <div className="text-xs font-bold text-white leading-tight line-clamp-1">
                  {evt.title}
                </div>
                <p className="text-[10.5px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {evt.work_id && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9.5px]">
                  <span className="text-slate-500">{evt.district || 'MPLADS Node'}</span>
                  <Link 
                    to={`/projects/${encodeURIComponent(evt.work_id)}`}
                    className="text-blue-400 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>{evt.work_id}</span>
                    <ExternalLink size={9} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature 1: Pan-India State Expenditure Efficiency League */}
      <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-700" />
              <CardTitle className="text-base font-black text-slate-900">
                Pan-India State Expenditure Efficiency & Utilization League
              </CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Real-time monitoring of fund absorption and completion rates per State Planning Department.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            Source: PFMS Live Treasury
          </span>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-5">State / UT</th>
                  <th className="py-3.5 px-4">Constituencies</th>
                  <th className="py-3.5 px-4">Total Outlay</th>
                  <th className="py-3.5 px-4">Disbursed (PFMS)</th>
                  <th className="py-3.5 px-4">Fund Utilization</th>
                  <th className="py-3.5 px-4">Active Works</th>
                  <th className="py-3.5 px-5 text-right">Ministerial Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {states.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-black text-slate-900 text-xs">{st.state}</div>
                      <span className={`inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        st.status === 'Exemplary' ? 'bg-emerald-100 text-emerald-800' :
                        st.status === 'On Track' ? 'bg-blue-100 text-blue-800' :
                        st.status === 'Advisory Issued' ? 'bg-amber-100 text-amber-900' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {st.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-700">{st.constituencies} LS Seats</td>

                    <td className="py-4 px-4 font-bold text-slate-900">{st.outlay}</td>

                    <td className="py-4 px-4 font-semibold text-slate-700">{st.disbursed}</td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              st.utilization >= 75 ? 'bg-emerald-600' : 
                              st.utilization >= 60 ? 'bg-blue-600' : 
                              st.utilization >= 45 ? 'bg-amber-500' : 'bg-red-600'
                            }`} 
                            style={{ width: `${st.utilization}%` }}
                          ></div>
                        </div>
                        <span className="font-black text-slate-900">{st.utilization}%</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-semibold text-slate-800">{st.works} Works</td>

                    <td className="py-4 px-5 text-right">
                      {st.utilization < 60 ? (
                        <button 
                          onClick={() => handleIssueAdvisory(st.state)}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-2xs btn-press cursor-pointer flex items-center gap-1 ml-auto"
                        >
                          <Send size={12} /> Issue Advisory
                        </button>
                      ) : (
                        <span className="text-slate-400 font-semibold text-xs">Compliant</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Feature 2 & 3: National Expenditure Trend + Union Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-2xl bg-white">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-black text-slate-900">
                FY 2026-27 National Expenditure Trajectory
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Month-on-month PFMS release velocity across all Parliamentary constituencies.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              +14.2% YoY Surge
            </span>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="mospiExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B3C68" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0B3C68" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dx={-8} />
                <RechartsTooltip contentStyle={{ borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                <Area type="monotone" dataKey="expenditure" stroke="#0B3C68" strokeWidth={3} fillOpacity={1} fill="url(#mospiExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Union Ministerial Bulletins */}
        <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-black text-slate-900">
              Active Gazette Directives
            </CardTitle>
            <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">MoSPI/2026</span>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-3.5 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-900 block">Notification #2026/G-88</span>
              <p className="text-slate-600 mt-1">Mandatory ISRO Bhuvan geo-tagging & FASTag transit verification for all works &gt; ₹25 Lakhs w.e.f 1 Oct 2026.</p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-900 block">PFMS Circular #PFMS-441</span>
              <p className="text-slate-600 mt-1">Direct single-node escrow account integration for all 750 District Collectorates.</p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-900 block">Cabinet Briefing Memo</span>
              <p className="text-slate-600 mt-1">Special priority allocation of ₹1,200 Cr for Aspirational Districts under Viksit Bharat 2047 initiative.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gazette Circular Broadcast Modal */}
      {broadcastModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#0B3C68] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black tracking-tight">Broadcast Gazette Notification via NIC Network</h3>
              </div>
              <button onClick={() => setBroadcastModal(false)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">Directive Title:</label>
                <input 
                  type="text" 
                  defaultValue="MoSPI Directive on Accelerated Physical Verification of Delayed Works" 
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">Target Recipients:</label>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-slate-700">
                  All 750+ District Collectors / District Magistrates & 36 State Chief Secretaries
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">Statutory Memo Body:</label>
                <textarea 
                  rows={4}
                  defaultValue="In accordance with the revised MPLADS Guidelines 2023, all District Authorities are instructed to submit physical milestone reports and audited Form GFR 12-C Utilization Certificates for Financial Year 2026-27 prior to the Q4 statutory deadline."
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => setBroadcastModal(false)}
                  className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setBroadcastModal(false);
                    setSuccessToast(`Gazette Directive broadcasted to all 750+ District Collectorates via NIC National Gateway.`);
                    setTimeout(() => setSuccessToast(null), 4500);
                  }}
                  className="bg-[#0B3C68] hover:bg-blue-900 text-white font-bold px-5 py-2 rounded-lg text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Send size={14} /> Transmit Pan-India Directive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
