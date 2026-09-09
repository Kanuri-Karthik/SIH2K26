import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# 1. Layout.tsx - Ultra Clean White Enterprise Layout
write_file("frontend/src/components/Layout.tsx", """
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, FileText, ShieldAlert, Database, Map, LogOut, Bell, Search, Command, Network, Bot, X, Send, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { name: 'National Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Regional Overview', icon: Map, path: '/states' },
    { name: 'Project Explorer', icon: Database, path: '/projects' },
    { name: 'Alert Center', icon: AlertTriangle, path: '/alerts' },
    { name: 'Risk Intelligence', icon: ShieldAlert, path: '/risk' },
    { name: 'Network Graph', icon: Network, path: '/graph' },
    { name: 'Audit Reports', icon: FileText, path: '/reports' }
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col min-h-screen z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center">
          <ShieldAlert size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">JAN-DRISHTI</h1>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1">Government of India</p>
        </div>
      </div>
      
      <div className="px-6 mb-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Core Modules</div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menu.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'} />
                <span className="text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-blue-700" />}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm border border-blue-200">
            AO
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-tight">Authorized User</p>
            <p className="text-xs text-slate-500 font-medium">MoSPI Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topbar = () => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
    <div className="flex items-center gap-4 flex-1">
      <div className="relative w-[480px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search projects, IDs, or states..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-12 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" 
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-500">
            <Command size={12} /> K
          </kbd>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <button className="relative text-slate-500 hover:text-slate-800 transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="h-6 w-px bg-slate-200"></div>
      <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  </header>
);

const AICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-4 bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot size={24} />
      </button>

      <div className={`fixed bottom-8 right-8 w-[400px] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <div className="bg-blue-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Bot size={20} />
            <h3 className="font-bold text-sm tracking-wide">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 h-80 overflow-y-auto bg-slate-50 space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center"><Bot size={16} className="text-blue-700"/></div>
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-slate-200 text-slate-800 text-sm shadow-sm leading-relaxed">
              Hello. I am the JAN-DRISHTI AI assistant. I can help you analyze project anomalies, retrieve specific financial records, or explain risk scores.
            </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
            <input type="text" placeholder="Ask a question..." className="flex-1 bg-transparent px-2 text-sm outline-none text-slate-800" />
            <button className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"><Send size={16}/></button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Layout = () => (
  <div className="flex h-screen bg-[#F8FAFC] overflow-hidden selection:bg-blue-100 selection:text-blue-900">
    <Sidebar />
    <main className="flex-1 flex flex-col h-screen relative">
      <Topbar />
      <div className="flex-1 overflow-y-auto p-10">
        <Outlet />
      </div>
      <AICopilot />
    </main>
  </div>
);
""")

# 2. NationalDashboard.tsx - Clean, White, Enterprise Look
write_file("frontend/src/pages/NationalDashboard.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, TrendingUp, AlertTriangle, Database, Activity, RefreshCw } from 'lucide-react';

export const NationalDashboard = () => {
  const [data, setData] = useState<any>(null);
  
  const fetchData = () => {
    fetch('http://localhost:8000/api/dashboard/overview')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  };

  useEffect(() => {
    fetchData(); 
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="flex items-center justify-center h-full"><RefreshCw className="w-8 h-8 text-slate-400 animate-spin" /></div>;

  const trendData = [
    { month: 'Jan', expenditure: 400, risk: 24 },
    { month: 'Feb', expenditure: 300, risk: 13 },
    { month: 'Mar', expenditure: 200, risk: 48 },
    { month: 'Apr', expenditure: 278, risk: 39 },
    { month: 'May', expenditure: 189, risk: 48 },
    { month: 'Jun', expenditure: 239, risk: data.high_risk_works },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">National Overview</h2>
          <p className="text-slate-500 mt-1.5 font-medium text-sm">Comprehensive monitoring of MPLADS implementation and risk factors.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-200">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             Live Connection
          </div>
          <button className="bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-all shadow-sm">
            Export Analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center"><Database className="h-5 w-5 text-slate-700" /></div>
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Total Sanctioned</p>
            <div className="text-3xl font-black text-slate-900 tracking-tight">₹{(data.total_sanctioned / 10000000).toFixed(2)}<span className="text-xl text-slate-500 font-semibold ml-1">Cr</span></div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Activity className="h-5 w-5 text-blue-700" /></div>
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Fund Utilization</p>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-black text-slate-900 tracking-tight">{data.utilization_rate.toFixed(1)}%</div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{width: `${data.utilization_rate}%`}}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-amber-200 bg-amber-50 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-amber-700" /></div>
            </div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Delayed Works</p>
            <div className="text-3xl font-black text-amber-950 tracking-tight">{data.delayed_works}</div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 bg-red-50 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-all" onClick={() => window.location.href='/projects'}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><ShieldAlert className="h-5 w-5 text-red-700" /></div>
            </div>
            <p className="text-sm font-semibold text-red-800 mb-1">High Risk Works</p>
            <div className="text-3xl font-black text-red-950 tracking-tight">{data.high_risk_works}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="border-b border-slate-100 pb-5">
            <CardTitle className="text-lg font-bold text-slate-900">Expenditure vs Risk Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <RechartsTooltip contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="expenditure" stroke="#1d4ed8" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" activeDot={{r: 6, fill: '#1d4ed8', stroke: '#fff', strokeWidth: 2}} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200 shadow-sm rounded-2xl flex flex-col">
          <CardHeader className="border-b border-slate-100 pb-5 bg-slate-50/50 rounded-t-2xl">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
               Recent System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-red-100 p-2.5 rounded-full flex-shrink-0 text-red-600">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Critical Anomalies</h4>
                  <p className="text-sm text-slate-500 mt-1">{data.high_risk_works} projects require immediate attention due to ML flags.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-2.5 rounded-full flex-shrink-0 text-blue-700">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Telemetry Sync</h4>
                  <p className="text-sm text-slate-500 mt-1">Live data streams from {data.active_works} projects successfully parsed.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
""")

# 3. GraphIntelligence.tsx - Light, Crisp, Professional
write_file("frontend/src/pages/GraphIntelligence.tsx", """
import React, { useEffect, useState, useMemo } from 'react';
import { Card } from '../components/ui/card';
import { Network, Filter, AlertTriangle, Database } from 'lucide-react';

export const GraphIntelligence = () => {
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    const fetchWorks = () => {
      fetch('http://localhost:8000/api/works')
        .then(res => res.json())
        .then(data => {
          const risky = data.filter((w: any) => w.risk_profile?.risk_level === 'CRITICAL' || w.risk_profile?.risk_level === 'HIGH');
          setWorks(risky.sort((a: any, b: any) => b.risk_profile.overall_score - a.risk_profile.overall_score).slice(0, 20));
        })
        .catch(console.error);
    };
    fetchWorks();
    const interval = setInterval(fetchWorks, 3000);
    return () => clearInterval(interval);
  }, []);

  const { agencies, mappedWorks } = useMemo(() => {
    const uniqueAgencies = Array.from(new Set(works.map(w => w.implementing_agency)));
    const agNodes = uniqueAgencies.map((name, i) => {
      const angle = (i / uniqueAgencies.length) * 2 * Math.PI;
      return { name, x: 500 + 180 * Math.cos(angle), y: 400 + 180 * Math.sin(angle), angle };
    });

    const wkNodes = works.map((w, i) => {
      const ag = agNodes.find(a => a.name === w.implementing_agency);
      const agAngle = ag ? ag.angle : 0;
      const spread = ((i % 5) - 2) * 0.15;
      const finalAngle = agAngle + spread;
      const radius = 350 + ((i % 3) * 20);
      return { ...w, agX: ag?.x || 500, agY: ag?.y || 400, x: 500 + radius * Math.cos(finalAngle), y: 400 + radius * Math.sin(finalAngle) };
    });
    return { agencies: agNodes, mappedWorks: wkNodes };
  }, [works]);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Network Intelligence</h2>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Visualizing implementing agencies and their associated high-risk projects.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50">
          <Filter size={16} /> Filters
        </button>
      </div>
      
      <Card className="flex-1 border border-slate-200 shadow-sm rounded-2xl overflow-hidden relative bg-white flex">
        <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
          <pattern id="lightgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          </pattern>
          <rect width="1000" height="800" fill="url(#lightgrid)" />

          {/* Lines */}
          {agencies.map((ag, idx) => (
            <line key={`c-${idx}`} x1="500" y1="400" x2={ag.x} y2={ag.y} stroke="#cbd5e1" strokeWidth="2" />
          ))}
          {mappedWorks.map((wk, idx) => (
            <g key={`w-${idx}`}>
              <line x1={wk.agX} y1={wk.agY} x2={wk.x} y2={wk.y} stroke={wk.risk_profile.risk_level === 'CRITICAL' ? '#fca5a5' : '#fde68a'} strokeWidth="2" />
              <circle r="3" fill={wk.risk_profile.risk_level === 'CRITICAL' ? '#ef4444' : '#f59e0b'}>
                 <animateMotion path={`M ${wk.agX} ${wk.agY} L ${wk.x} ${wk.y}`} dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* MoSPI Core */}
          <g transform="translate(500, 400)">
            <circle r="40" fill="#1e3a8a" stroke="#dbeafe" strokeWidth="6" className="shadow-lg" />
            <text y="5" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">MoSPI</text>
          </g>

          {/* Agencies */}
          {agencies.map((ag, idx) => (
            <g key={`ag-${idx}`} transform={`translate(${ag.x}, ${ag.y})`}>
              <circle r="30" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
              <text y="-40" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold" className="drop-shadow-sm">{ag.name.substring(0,18)}</text>
              <Database x="-12" y="-12" width="24" height="24" stroke="#64748b" />
            </g>
          ))}

          {/* Works */}
          {mappedWorks.map((wk, idx) => {
            const isCrit = wk.risk_profile.risk_level === 'CRITICAL';
            return (
              <g key={`wk-${idx}`} transform={`translate(${wk.x}, ${wk.y})`} className="cursor-pointer hover:scale-110 transition-transform">
                <circle r="18" fill="#ffffff" stroke={isCrit ? '#ef4444' : '#f59e0b'} strokeWidth="3" />
                <AlertTriangle x="-9" y="-9" width="18" height="18" stroke={isCrit ? '#ef4444' : '#f59e0b'} />
                <text y="30" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">{wk.work_id}</text>
              </g>
            );
          })}
        </svg>
      </Card>
    </div>
  );
};
""")

# 4. ProjectRiskProfile.tsx - Clean, White Enterprise Card Layout
write_file("frontend/src/pages/ProjectRiskProfile.tsx", """
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Building, Calendar, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';

export const ProjectRiskProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState<any>(null);
  
  useEffect(() => {
    fetch('http://localhost:8000/api/works')
      .then(res => res.json())
      .then(data => setWork(data.find((w: any) => w.work_id === id)))
  }, [id]);

  if (!work) return <div className="p-12 text-center text-slate-500 font-medium">Loading Risk Profile...</div>;
  const risk = work.risk_profile;
  const explanations = risk?.explanation ? JSON.parse(risk.explanation) : [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-start gap-4">
        <button onClick={() => navigate(-1)} className="mt-1 p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold text-slate-500 tracking-widest">{work.work_id}</span>
            <Badge variant="outline" className="text-xs uppercase font-bold text-slate-700 bg-white border-slate-300 px-2 py-0.5">{work.status}</Badge>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{work.work_name}</h2>
          <div className="flex items-center gap-6 mt-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><MapPin size={16} className="text-blue-600"/> {work.district}, {work.state}</span>
            <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><Building size={16} className="text-blue-600"/> {work.implementing_agency}</span>
            <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><Calendar size={16} className="text-blue-600"/> {work.start_date || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-1 space-y-8">
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden text-center">
            <div className={`h-2 w-full ${risk?.risk_level === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
            <CardContent className="p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Risk Score</h3>
              <div className="text-7xl font-black text-slate-900 tracking-tighter">
                {Math.round(risk?.overall_score || 0)}<span className="text-3xl text-slate-300 ml-1">/100</span>
              </div>
              <div className={`mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-widest ${risk?.risk_level === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                <AlertCircle size={16} /> {risk?.risk_level}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white">
            <CardHeader className="border-b border-slate-100 pb-5 pt-6 px-6 bg-slate-50/50 rounded-t-2xl">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="text-blue-600" size={20} /> AI Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {explanations.length > 0 ? (
                  <div className="space-y-3">
                    {explanations.map((exp: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                        <span className="text-base text-slate-700 font-medium leading-relaxed">{exp}</span>
                      </div>
                    ))}
                  </div>
              ) : (
                  <div className="text-base text-slate-500 font-medium">No major anomalies detected.</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white">
            <CardHeader className="border-b border-slate-100 pb-5 pt-6 px-6 bg-slate-50/50 rounded-t-2xl">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" size={20} /> Cryptographic Audit Ledger
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Event Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tx Hash</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">2023-11-12 09:42</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">Fund Disbursement</td>
                      <td className="px-6 py-4"><span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 text-slate-600">0x8f2a...9c41</span></td>
                      <td className="px-6 py-4 text-right"><span className="text-[11px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">Verified</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">2023-10-05 14:12</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">Project Sanction</td>
                      <td className="px-6 py-4"><span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 text-slate-600">0x3b11...fa22</span></td>
                      <td className="px-6 py-4 text-right"><span className="text-[11px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">Verified</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
""")

# 5. ProjectExplorer.tsx - Crisp, Bright, Wide Data Grid
write_file("frontend/src/pages/ProjectExplorer.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

export const ProjectExplorer = () => {
  const [works, setWorks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/works').then(res => res.json()).then(setWorks);
  }, []);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Project Data Grid</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Explore and filter the comprehensive registry of MPLADS works.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search specific projects..." className="w-full text-sm font-medium border border-slate-200 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
          </div>
          <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>
      
      <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Work ID</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fin. Progress</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Phy. Progress</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {works.slice(0, 50).map((work, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors group cursor-pointer" onClick={() => navigate(`/projects/${work.work_id}`)}>
                    <td className="px-8 py-5 font-black text-slate-900 tracking-tight">{work.work_id}</td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900">{work.district}</div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{work.state}</div>
                    </td>
                    <td className="px-8 py-5">
                       <span className={`font-black text-lg ${work.financial_progress > 100 ? 'text-red-600' : 'text-slate-800'}`}>{Math.round(work.financial_progress)}%</span>
                    </td>
                    <td className="px-8 py-5 font-black text-lg text-slate-800">{Math.round(work.physical_progress)}%</td>
                    <td className="px-8 py-5 flex items-center h-full pt-7">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${work.status === 'DELAYED' || work.status === 'STALLED' ? 'bg-amber-500' : work.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                        <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">{work.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-blue-700 font-bold bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
""")

print("Successfully redesigned the entire UI into a bright, clean, premium SaaS enterprise layout!")
