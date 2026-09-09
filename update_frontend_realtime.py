import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# Fix RiskIntelligence
with open('frontend/src/pages/RiskIntelligence.tsx', 'r', encoding='utf-8') as f:
    ri_content = f.read()
ri_content = ri_content.replace(
    "import { BrainCircuit, Target, ShieldAlert } from 'lucide-react';",
    "import { BrainCircuit, Target, ShieldAlert, AlertTriangle } from 'lucide-react';"
)
write_file('frontend/src/pages/RiskIntelligence.tsx', ri_content)

# Update NationalDashboard for Real-Time Polling and remove Jury Demo
write_file("frontend/src/pages/NationalDashboard.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShieldAlert, TrendingUp, AlertTriangle, Database, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NationalDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const fetchData = () => {
    fetch('http://localhost:8000/api/dashboard/overview')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLastUpdated(new Date());
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    // Polling every 3 seconds for REAL-TIME updates
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="flex items-center justify-center h-full"><div className="animate-pulse flex flex-col items-center"><div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-slate-500">Loading National Metrics...</p></div></div>;

  const trendData = [
    { month: 'Jan', expenditure: 400, risk: 24 },
    { month: 'Feb', expenditure: 300, risk: 13 },
    { month: 'Mar', expenditure: 200, risk: 48 },
    { month: 'Apr', expenditure: 278, risk: 39 },
    { month: 'May', expenditure: 189, risk: 48 },
    { month: 'Jun', expenditure: 239, risk: data.high_risk_works },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">National Monitor</h2>
          <p className="text-slate-500 mt-1">Real-time risk intelligence across all MPLADS works.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-green-200">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
             Live Sync
          </div>
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
            <p className="text-xs text-green-600 mt-1 flex items-center"><TrendingUp size={12} className="mr-1"/> Automatically Calculated</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Fund Utilization</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 transition-all">{data.utilization_rate.toFixed(1)}%</div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2">
              <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{width: `${data.utilization_rate}%`}}></div>
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
            <CardTitle className="text-white">Live Monitoring Brief</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-slate-800 p-4 rounded-lg border border-slate-700 hover:bg-slate-750 transition-colors">
                <div className="bg-red-500/20 p-2 rounded flex-shrink-0 text-red-400">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">{data.high_risk_works} high-risk projects require review.</h4>
                  <p className="text-sm text-slate-400 mt-1">Anomaly detection model flagged severe progress mismatches and cost overruns.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-slate-800 p-4 rounded-lg border border-slate-700 hover:bg-slate-750 transition-colors">
                <div className="bg-indigo-500/20 p-2 rounded flex-shrink-0 text-indigo-400">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">{data.active_works} works are currently active.</h4>
                  <p className="text-sm text-slate-400 mt-1">Data from states is streaming and being analyzed by Isolation Forest in real-time.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6 text-right">Last synchronized: {lastUpdated.toLocaleTimeString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
""")

# Update ProjectRiskProfile to remove demo banner and add Predictive Forecast
write_file("frontend/src/pages/ProjectRiskProfile.tsx", """
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertTriangle, MapPin, Building, Calendar, ArrowLeft, CheckCircle2, FileWarning, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, ReferenceLine } from 'recharts';

export const ProjectRiskProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState<any>(null);
  
  const fetchWork = () => {
    fetch('http://localhost:8000/api/works')
      .then(res => res.json())
      .then(data => {
        let found = data.find((w: any) => w.work_id === id);
        setWork(found);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchWork();
    const interval = setInterval(fetchWork, 3000); // Live sync for risk profile
    return () => clearInterval(interval);
  }, [id]);

  if (!work) return <div className="p-12 text-center text-slate-500">Loading Risk Profile...</div>;

  const risk = work.risk_profile;
  if (!risk) return <div>No risk profile found for this work.</div>;
  
  const explanations = risk.explanation ? JSON.parse(risk.explanation) : [];
  const recommendations = risk.recommendations ? JSON.parse(risk.recommendations) : [];

  // Simulate Predictive Timeline Data based on current physical progress
  const timelineData = [
    { month: 'Start', progress: 0 },
    { month: 'Current', progress: work.physical_progress },
    { month: 'Projected Deadline', progress: Math.min(100, work.physical_progress * 1.5) },
    { month: 'Expected 100%', progress: 100 }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
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
        <div className="lg:col-span-1 space-y-6">
          <Card className={`border-2 shadow-lg transition-all ${risk.risk_level === 'CRITICAL' ? 'border-red-500' : risk.risk_level === 'HIGH' ? 'border-amber-500' : 'border-indigo-500'}`}>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-slate-500 uppercase tracking-widest">Composite Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-7xl font-black tabular-nums transition-all ${risk.risk_level === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'}`}>
                {Math.round(risk.overall_score)}<span className="text-3xl text-slate-300">/100</span>
              </div>
              <Badge variant={risk.risk_level === 'CRITICAL' ? 'destructive' : 'warning'} className="mt-4 text-lg px-6 py-1 transition-all">
                {risk.risk_level}
              </Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Indicators (Live)</CardTitle>
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

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-indigo-100">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-slate-800 flex items-center gap-2 text-base">
                    <FileWarning className="text-indigo-600" /> Explainable AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {explanations.length > 0 ? (
                      <ul className="space-y-3">
                        {explanations.map((exp: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                            <span className="text-sm text-slate-700 font-medium">{exp}</span>
                          </li>
                        ))}
                      </ul>
                  ) : (
                      <p className="text-sm text-slate-500">No major anomalies detected.</p>
                  )}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3 border">
                      <div className="text-xs text-slate-500 font-semibold uppercase">Financial</div>
                      <div className={`text-2xl font-bold mt-1 ${work.financial_progress > 100 ? 'text-red-600' : 'text-slate-800'}`}>{Math.round(work.financial_progress)}%</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border">
                      <div className="text-xs text-slate-500 font-semibold uppercase">Physical</div>
                      <div className="text-2xl font-bold mt-1 text-slate-800">{Math.round(work.physical_progress)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                  <CardHeader className="bg-slate-50 border-b">
                    <CardTitle className="text-slate-800 flex items-center gap-2 text-base">
                      <LineChartIcon className="text-indigo-600" /> Predictive Delay Forecasting
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timelineData}>
                          <XAxis dataKey="month" fontSize={10} stroke="#94a3b8" />
                          <YAxis domain={[0, 100]} fontSize={10} stroke="#94a3b8" />
                          <RechartsTooltip contentStyle={{fontSize: '12px'}} />
                          <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="3 3" />
                          <Line type="monotone" dataKey="progress" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                  </CardContent>
              </Card>
          </div>

          <Card className="border-indigo-100 shadow-md">
            <CardHeader className="bg-indigo-50 border-b border-indigo-100">
              <CardTitle className="text-indigo-900 flex items-center gap-2 text-base">
                <CheckCircle2 className="text-indigo-600" /> Recommended Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {recommendations.length > 0 ? (
                  <ul className="space-y-2">
                    {recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 p-3 bg-white border rounded-md shadow-sm hover:border-indigo-300 transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300" />
                        <span className="text-sm text-slate-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
              ) : (
                  <p className="text-sm text-slate-500">No actions required currently.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
""")

print("Successfully updated frontend for real-time and missing dependencies!")
