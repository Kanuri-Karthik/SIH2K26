import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# 1. UI Components (Cards, Buttons, Badges)
write_file("frontend/src/components/ui/card.tsx", """
import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
""")

write_file("frontend/src/components/ui/badge.tsx", """
import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "warning" | "success";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    warning: "border-transparent bg-amber-500 text-white hover:bg-amber-500/80",
    success: "border-transparent bg-green-600 text-white hover:bg-green-600/80",
    outline: "text-foreground",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
  )
}
export { Badge }
""")

write_file("frontend/src/components/ui/button.tsx", """
import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return (
    <button ref={ref} className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />
  )
})
Button.displayName = "Button"
export { Button }
""")

# 2. Main Layout
write_file("frontend/src/components/Layout.tsx", """
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, FileText, Settings, ShieldAlert, BarChart3, Users, Map, LogOut, Bell, Search, Database } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { name: 'National Monitor', icon: LayoutDashboard, path: '/' },
    { name: 'States Overview', icon: Map, path: '/states' },
    { name: 'Project Explorer', icon: Database, path: '/projects' },
    { name: 'Alert Center', icon: AlertTriangle, path: '/alerts' },
    { name: 'Risk Intelligence', icon: ShieldAlert, path: '/risk' },
    { name: 'Reports', icon: FileText, path: '/reports' }
  ];

  return (
    <div className="w-64 bg-slate-950 text-slate-300 flex flex-col min-h-screen transition-all duration-300">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldAlert className="text-amber-500" />
          JAN-DRISHTI
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">MPLADS Sentinel</p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menu.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link key={item.name} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <item.icon size={20} className={isActive ? 'text-indigo-200' : 'text-slate-400'} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-slate-800">
        <button className="flex items-center gap-3 text-sm font-medium hover:text-white transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

const Topbar = () => (
  <header className="h-16 bg-white border-b flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm transition-all">
    <div className="flex items-center gap-4 flex-1">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Search projects, MPs, districts..." className="w-full bg-slate-50 border-none rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Data Refresh: Just now
      </div>
      <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="flex items-center gap-3 border-l pl-6">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
          AK
        </div>
        <div className="text-sm">
          <p className="font-semibold text-slate-700">Auth. Officer</p>
          <p className="text-xs text-slate-500">Ministry Level</p>
        </div>
      </div>
    </div>
  </header>
);

export const Layout = () => (
  <div className="flex min-h-screen bg-slate-50">
    <Sidebar />
    <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
      <Topbar />
      <div className="p-8 animate-in fade-in duration-500 flex-1">
        <Outlet />
      </div>
    </main>
  </div>
);
""")

# 3. National Dashboard
write_file("frontend/src/pages/NationalDashboard.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShieldAlert, TrendingUp, AlertTriangle, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NationalDashboard = () => {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard/overview')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  if (!data) return <div className="flex items-center justify-center h-full"><div className="animate-pulse flex flex-col items-center"><div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-slate-500">Loading National Metrics...</p></div></div>;

  const trendData = [
    { month: 'Jan', expenditure: 400, risk: 24 },
    { month: 'Feb', expenditure: 300, risk: 13 },
    { month: 'Mar', expenditure: 200, risk: 48 },
    { month: 'Apr', expenditure: 278, risk: 39 },
    { month: 'May', expenditure: 189, risk: 48 },
    { month: 'Jun', expenditure: 239, risk: 38 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">National Monitor</h2>
          <p className="text-slate-500 mt-1">Real-time risk intelligence across all MPLADS works.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/projects/demo/CASE 07: Combined High-Risk Project" className="bg-amber-100 text-amber-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-200 transition flex items-center gap-2">
            <AlertTriangle size={16} /> Launch Jury Demo
          </Link>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Sanctioned</CardTitle>
            <Database className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">₹{(data.total_sanctioned / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-green-600 mt-1 flex items-center"><TrendingUp size={12} className="mr-1"/> +4.2% from last FY</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Fund Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{data.utilization_rate.toFixed(1)}%</div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{width: `${data.utilization_rate}%`}}></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/30 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Delayed Works</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{data.delayed_works}</div>
            <p className="text-xs text-amber-700 mt-1">Requires schedule review</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href='/projects'}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-800">High Risk Works</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-600 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{data.high_risk_works}</div>
            <p className="text-xs text-red-600 mt-1 font-medium">Click to investigate anomalies</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expenditure vs Risk Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="expenditure" stroke="#4f46e5" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-white">Today's Monitoring Brief</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-slate-800 p-4 rounded-lg border border-slate-700 hover:bg-slate-750 transition-colors">
                <div className="bg-red-500/20 p-2 rounded flex-shrink-0 text-red-400">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">{data.high_risk_works} high-risk projects require review.</h4>
                  <p className="text-sm text-slate-400 mt-1">Anomaly detection model flagged severe progress mismatches and cost overruns across multiple districts.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-slate-800 p-4 rounded-lg border border-slate-700 hover:bg-slate-750 transition-colors">
                <div className="bg-amber-500/20 p-2 rounded flex-shrink-0 text-amber-400">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">4 potential duplicate works require verification.</h4>
                  <p className="text-sm text-slate-400 mt-1">Similarity analysis found high textual/geographical overlap in Uttar Pradesh and Maharashtra.</p>
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

# 4. Project Risk Profile (The Killer Demo)
write_file("frontend/src/pages/ProjectRiskProfile.tsx", """
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertTriangle, MapPin, Building, Calendar, ArrowLeft, CheckCircle2, FileText, FileWarning } from 'lucide-react';

export const ProjectRiskProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState<any>(null);
  
  useEffect(() => {
    // In demo, we might fetch all and filter if ID is a scenario string
    fetch('http://localhost:8000/api/works')
      .then(res => res.json())
      .then(data => {
        let found = null;
        if (id && id.startsWith("CASE")) {
            found = data.find((w: any) => w.scenario_type === id);
        } else {
            found = data.find((w: any) => w.work_id === id);
        }
        setWork(found);
      })
      .catch(console.error);
  }, [id]);

  if (!work) return <div className="p-12 text-center text-slate-500">Loading Risk Profile...</div>;

  const risk = work.risk_profile;
  if (!risk) return <div>No risk profile found for this work.</div>;
  
  const explanations = risk.explanation ? JSON.parse(risk.explanation) : [];
  const recommendations = risk.recommendations ? JSON.parse(risk.recommendations) : [];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {work.is_demo_scenario && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md flex items-center gap-3">
          <AlertTriangle className="text-blue-500" />
          <span className="font-semibold">PROTOTYPE DEMONSTRATION MODE:</span> 
          <span>Synthetic work-level record used to demonstrate anomaly detection ({work.scenario_type}).</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white border rounded-md hover:bg-slate-50 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{work.work_name}</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={14}/> {work.district}, {work.state}</span>
            <span className="flex items-center gap-1"><Building size={14}/> {work.implementing_agency}</span>
            <span className="flex items-center gap-1"><Calendar size={14}/> {work.start_date || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Risk Score */}
        <div className="lg:col-span-1 space-y-6">
          <Card className={`border-2 shadow-lg ${risk.risk_level === 'CRITICAL' ? 'border-red-500' : risk.risk_level === 'HIGH' ? 'border-amber-500' : 'border-indigo-500'}`}>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-slate-500 uppercase tracking-widest">Composite Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-7xl font-black tabular-nums transition-all ${risk.risk_level === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'}`}>
                {Math.round(risk.overall_score)}<span className="text-3xl text-slate-300">/100</span>
              </div>
              <Badge variant={risk.risk_level === 'CRITICAL' ? 'destructive' : 'warning'} className="mt-4 text-lg px-6 py-1">
                {risk.risk_level}
              </Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500">Estimated Cost</span>
                <span className="font-semibold">₹{(work.estimated_cost/100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500">Sanctioned</span>
                <span className="font-semibold text-green-700">₹{(work.sanctioned_amount/100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-slate-500">Actual Expenditure</span>
                <span className={`font-semibold ${work.actual_expenditure > work.sanctioned_amount ? 'text-red-600' : ''}`}>
                  ₹{(work.actual_expenditure/100000).toFixed(2)} Lakhs
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Evidence and Actions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <FileWarning className="text-indigo-600" />
                Why is this risky?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {explanations.map((exp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-700 font-medium">{exp}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="text-sm text-red-600 font-semibold uppercase">Financial Progress</div>
                  <div className="text-3xl font-bold text-red-800 mt-1">{Math.round(work.financial_progress)}%</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <div className="text-sm text-amber-600 font-semibold uppercase">Physical Progress</div>
                  <div className="text-3xl font-bold text-amber-800 mt-1">{Math.round(work.physical_progress)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 shadow-md">
            <CardHeader className="bg-indigo-50 border-b border-indigo-100">
              <CardTitle className="text-indigo-900 flex items-center gap-2">
                <CheckCircle2 className="text-indigo-600" />
                Recommended Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-white border rounded-md shadow-sm hover:border-indigo-300 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" />
                    <span className="text-slate-700">{rec}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-end">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 shadow-sm transition">
                  Create Formal Alert
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
""")

# 5. Project Explorer
write_file("frontend/src/pages/ProjectExplorer.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const ProjectExplorer = () => {
  const [works, setWorks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/works')
      .then(res => res.json())
      .then(data => setWorks(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Project Explorer</h2>
        <p className="text-slate-500 mt-1">Search, filter, and analyze all MPLADS works.</p>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Work ID</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Fin. Progress</th>
                  <th className="px-6 py-4 font-semibold">Phy. Progress</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {works.slice(0, 50).map((work, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-indigo-600">{work.work_id}</td>
                    <td className="px-6 py-4">{work.district}, {work.state}</td>
                    <td className="px-6 py-4">
                       <span className={work.financial_progress > 100 ? 'text-red-600 font-bold' : ''}>{Math.round(work.financial_progress)}%</span>
                    </td>
                    <td className="px-6 py-4">{Math.round(work.physical_progress)}%</td>
                    <td className="px-6 py-4">
                      <Badge variant={work.status === 'DELAYED' || work.status === 'STALLED' ? 'destructive' : work.status === 'COMPLETED' ? 'success' : 'secondary'}>
                        {work.status}
                      </Badge>
                      {work.is_demo_scenario && <Badge variant="warning" className="ml-2 text-[10px]">DEMO</Badge>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/projects/${work.work_id}`)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium bg-indigo-50 px-3 py-1 rounded-md transition"
                      >
                        Analyze Risk
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

# 6. App & Routes
write_file("frontend/src/App.tsx", """
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NationalDashboard } from './pages/NationalDashboard';
import { ProjectExplorer } from './pages/ProjectExplorer';
import { ProjectRiskProfile } from './pages/ProjectRiskProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NationalDashboard />} />
          <Route path="projects" element={<ProjectExplorer />} />
          <Route path="projects/:id" element={<ProjectRiskProfile />} />
          <Route path="projects/demo/:id" element={<ProjectRiskProfile />} />
          <Route path="*" element={<div className="p-12 text-center text-slate-500 text-lg">Screen pending implementation</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
""")

write_file("frontend/src/main.tsx", """
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""")

print("Frontend files generated successfully!")
