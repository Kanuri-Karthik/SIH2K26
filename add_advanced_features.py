import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# 1. Update App.tsx to include the new Graph route
write_file("frontend/src/App.tsx", """
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NationalDashboard } from './pages/NationalDashboard';
import { ProjectExplorer } from './pages/ProjectExplorer';
import { ProjectRiskProfile } from './pages/ProjectRiskProfile';
import { AlertCenter } from './pages/AlertCenter';
import { StatesOverview } from './pages/StatesOverview';
import { RiskIntelligence } from './pages/RiskIntelligence';
import { GraphIntelligence } from './pages/GraphIntelligence';
import { Reports } from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NationalDashboard />} />
          <Route path="states" element={<StatesOverview />} />
          <Route path="projects" element={<ProjectExplorer />} />
          <Route path="projects/:id" element={<ProjectRiskProfile />} />
          <Route path="alerts" element={<AlertCenter />} />
          <Route path="risk" element={<RiskIntelligence />} />
          <Route path="graph" element={<GraphIntelligence />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<div className="p-12 text-center text-slate-500 text-lg">Screen pending implementation</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
""")

# 2. Update Layout.tsx with AI Copilot
write_file("frontend/src/components/Layout.tsx", """
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, FileText, ShieldAlert, Database, Map, LogOut, Bell, Search, Command, Network, Bot, X, Send } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { name: 'National Monitor', icon: LayoutDashboard, path: '/' },
    { name: 'States Overview', icon: Map, path: '/states' },
    { name: 'Project Explorer', icon: Database, path: '/projects' },
    { name: 'Alert Center', icon: AlertTriangle, path: '/alerts' },
    { name: 'Risk Intelligence', icon: ShieldAlert, path: '/risk' },
    { name: 'Graph Analysis', icon: Network, path: '/graph' },
    { name: 'Reports', icon: FileText, path: '/reports' }
  ];

  return (
    <div className="w-64 bg-slate-950 text-slate-300 flex flex-col min-h-screen border-r border-slate-900 z-20 shadow-2xl">
      <div className="p-6 pb-2">
        <h1 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
          <div className="bg-blue-600 p-1.5 rounded-md shadow-lg shadow-blue-900/50">
            <ShieldAlert size={20} className="text-white" />
          </div>
          JAN-DRISHTI
        </h1>
        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-bold ml-10">Defense-Grade MPLADS</p>
      </div>
      
      <div className="px-6 py-4">
        <div className="h-px w-full bg-slate-800/50"></div>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group ${
                isActive ? 'bg-blue-900/40 text-blue-400 relative border border-blue-800/50' : 'hover:bg-slate-900 hover:text-white border border-transparent'
              }`}
            >
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>}
              <item.icon size={18} className={`${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`} />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mx-3 mb-4 bg-slate-900/80 rounded-lg border border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center text-blue-500 font-bold text-xs border border-blue-900 shadow-inner">
            AO
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight">Auth. Officer</p>
            <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Level 4 Clearance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topbar = () => (
  <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0 shadow-sm">
    <div className="flex items-center gap-4 flex-1">
      <div className="relative w-[400px] group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
        <input 
          type="text" 
          placeholder="Global Search (Projects, MPs, Agencies)..." 
          className="w-full bg-slate-100/50 border border-slate-200 rounded-md pl-9 pr-12 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700" 
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500 shadow-sm">
            <Command size={10} /> K
          </kbd>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-5">
      <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
      <div className="h-6 w-px bg-slate-200"></div>
      <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
        <LogOut size={16} />
        <span>Secure Exit</span>
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
        className={`fixed bottom-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-105 transition-all z-50 flex items-center justify-center border-2 border-slate-700 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot size={24} className="text-blue-400" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
      </button>

      <div className={`fixed bottom-6 right-6 w-96 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-950 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-blue-400" />
            <h3 className="font-bold text-white text-sm">JAN-DRISHTI AI Analyst</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div className="p-4 h-64 overflow-y-auto bg-slate-50 space-y-4 text-sm">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center"><Bot size={16} className="text-blue-700"/></div>
            <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 text-slate-700 shadow-sm">
              System active. I am monitoring 543 MPs and over 1,000 projects in real-time. How can I assist your investigation?
            </div>
          </div>
          <div className="flex gap-3 justify-end">
             <div className="bg-blue-600 p-3 rounded-lg rounded-tr-none text-white shadow-sm">
              Show me a breakdown of highest risk projects in Kerala.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center"><Bot size={16} className="text-blue-700"/></div>
            <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 text-slate-700 shadow-sm">
              <span className="inline-block w-2 h-2 bg-slate-300 rounded-full animate-bounce mr-1"></span>
              <span className="inline-block w-2 h-2 bg-slate-300 rounded-full animate-bounce mr-1" style={{animationDelay: '150ms'}}></span>
              <span className="inline-block w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
            <input type="text" placeholder="Ask AI to query the database..." className="flex-1 bg-transparent px-2 text-sm outline-none" />
            <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"><Send size={14}/></button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Layout = () => (
  <div className="flex h-screen bg-[#F1F5F9] overflow-hidden selection:bg-blue-200">
    <Sidebar />
    <main className="flex-1 flex flex-col h-screen relative">
      <Topbar />
      <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-300">
        <Outlet />
      </div>
      <AICopilot />
    </main>
  </div>
);
""")

# 3. Create the highly advanced GraphIntelligence.tsx
write_file("frontend/src/pages/GraphIntelligence.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Network, Search, Filter, AlertTriangle, Layers, Maximize } from 'lucide-react';

export const GraphIntelligence = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
             <Network className="text-blue-600" /> Graph Intelligence
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Palantir-style entity resolution. Discover hidden networks of delayed projects and linked vendors.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-slate-800">
            <Search size={16} /> Run Network Query
          </button>
        </div>
      </div>
      
      <Card className="flex-1 border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col relative bg-slate-950">
        
        {/* Mock Controls Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
           <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-2 rounded-lg text-white space-y-2">
             <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">Layer Toggles</div>
             <button className="w-full flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md font-medium"><Layers size={14}/> Show Sub-Contractors</button>
             <button className="w-full flex items-center gap-2 text-sm bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-md font-medium"><AlertTriangle size={14}/> Highlight Anomalies</button>
           </div>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
           <button className="p-2 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-lg text-slate-400 hover:text-white"><Maximize size={18}/></button>
        </div>

        {/* Abstract Node Graph (CSS/SVG Mock) */}
        <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
           {/* Grid background */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
           
           {/* Graph Lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="30%" y1="40%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="5,5">
                 <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="inducible" />
              </line>
              <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />
              <line x1="40%" y1="70%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.8" />
              <line x1="60%" y1="80%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.5" />
           </svg>

           {/* Nodes */}
           <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(71,85,105,0.5)] group-hover:scale-110 transition-transform">
                 <Database className="text-slate-400" size={20} />
              </div>
              <div className="mt-2 bg-slate-800/80 px-2 py-1 rounded text-xs font-bold text-slate-300 border border-slate-700">Project MPLADS-9A2B</div>
           </div>

           <div className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(71,85,105,0.5)] group-hover:scale-110 transition-transform">
                 <Database className="text-slate-400" size={20} />
              </div>
              <div className="mt-2 bg-slate-800/80 px-2 py-1 rounded text-xs font-bold text-slate-300 border border-slate-700">Project MPLADS-3F4C</div>
           </div>

           <div className="absolute top-[70%] left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 bg-red-900/50 border-2 border-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)] group-hover:scale-110 transition-transform z-10">
                 <AlertTriangle className="text-red-400" size={28} />
                 <div className="absolute inset-0 border border-red-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="mt-2 bg-red-950/80 px-2 py-1 rounded text-xs font-bold text-red-300 border border-red-800">Critical Anomaly</div>
           </div>

           {/* Central Node */}
           <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-20 h-20 bg-blue-900/50 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform">
                 <Network className="text-blue-400" size={32} />
              </div>
              <div className="mt-3 bg-blue-950/80 px-3 py-1.5 rounded-md text-sm font-bold text-blue-300 border border-blue-800 shadow-lg">Agency: State PWD</div>
           </div>

        </div>
      </Card>
    </div>
  );
};
""")

# 4. Update ProjectRiskProfile.tsx to include Blockchain Audit Trail
with open("frontend/src/pages/ProjectRiskProfile.tsx", "r", encoding="utf-8") as f:
    content = f.read()

blockchain_ui = """
          <Card className="border-slate-200 shadow-sm rounded-xl mt-6 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" size={18} /> Blockchain-Verified Audit Ledger
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Timestamp</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Event Type</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Tx Hash</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-900">2023-11-12 09:42:10</td>
                      <td className="px-6 py-3 text-slate-600">Fund Disbursement (Installment 1)</td>
                      <td className="px-6 py-3"><span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 text-slate-500">0x8f2a...9c41</span></td>
                      <td className="px-6 py-3 text-right"><span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">Immutable</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-900">2023-10-05 14:12:05</td>
                      <td className="px-6 py-3 text-slate-600">Project Sanction Approved</td>
                      <td className="px-6 py-3"><span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 text-slate-500">0x3b11...fa22</span></td>
                      <td className="px-6 py-3 text-right"><span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">Immutable</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-900">2023-09-28 11:30:00</td>
                      <td className="px-6 py-3 text-slate-600">Initial Project Proposal Logged</td>
                      <td className="px-6 py-3"><span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 text-slate-500">0x1a99...e8bb</span></td>
                      <td className="px-6 py-3 text-right"><span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">Immutable</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
"""

# Insert blockchain UI right before the closing divs of the right column
insertion_point = "        </div>\n      </div>\n    </div>\n  );\n};"
if insertion_point in content:
    content = content.replace(insertion_point, blockchain_ui + "\n" + insertion_point)
    write_file("frontend/src/pages/ProjectRiskProfile.tsx", content)

print("Advanced features successfully added!")
