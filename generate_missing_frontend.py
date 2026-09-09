import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# 1. Alert Center
write_file("frontend/src/pages/AlertCenter.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AlertCenter = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/alerts')
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Alert Center</h2>
          <p className="text-slate-500 mt-1">Review and action AI-generated risk alerts.</p>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Alert ID</th>
                  <th className="px-6 py-4 font-semibold">Detected</th>
                  <th className="px-6 py-4 font-semibold">Severity</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {alerts.map((alert, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{alert.alert_id}</td>
                    <td className="px-6 py-4">{new Date(alert.detected_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                       <Badge variant={alert.severity === 'CRITICAL' ? 'destructive' : 'warning'}>
                         {alert.severity}
                       </Badge>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                       {alert.severity === 'CRITICAL' ? <ShieldAlert size={16} className="text-red-500"/> : <AlertTriangle size={16} className="text-amber-500"/>}
                       {alert.type}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{alert.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {alert.work && (
                        <button 
                          onClick={() => navigate(`/projects/${alert.work.work_id}`)}
                          className="text-indigo-600 hover:text-indigo-900 font-medium bg-indigo-50 px-3 py-1 rounded-md transition"
                        >
                          Review Evidence
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {alerts.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-slate-500">No alerts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
""")

# 2. States Overview
write_file("frontend/src/pages/StatesOverview.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Map, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StatesOverview = () => {
  const [works, setWorks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/works')
      .then(res => res.json())
      .then(data => setWorks(data))
      .catch(console.error);
  }, []);

  // Aggregate by state
  const stateData = works.reduce((acc, work) => {
    if (!acc[work.state]) {
      acc[work.state] = { name: work.state, projects: 0, expenditure: 0, highRisk: 0, delayed: 0 };
    }
    acc[work.state].projects += 1;
    acc[work.state].expenditure += work.actual_expenditure;
    if (work.status === 'DELAYED') acc[work.state].delayed += 1;
    if (work.risk_profile && ['HIGH', 'CRITICAL'].includes(work.risk_profile.risk_level)) {
      acc[work.state].highRisk += 1;
    }
    return acc;
  }, {});

  const states = Object.values(stateData).sort((a: any, b: any) => b.highRisk - a.highRisk);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">States Overview</h2>
        <p className="text-slate-500 mt-1">Geographical distribution of MPLADS works and risks.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {states.map((st: any, idx: number) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-slate-50 border-b pb-4">
              <CardTitle className="flex justify-between items-center text-lg">
                <span className="flex items-center gap-2"><Map size={18} className="text-indigo-600"/> {st.name}</span>
                {st.highRisk > 0 && <span className="flex items-center gap-1 text-red-600 text-sm"><AlertTriangle size={14}/> {st.highRisk}</span>}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Projects</span>
                <span className="font-semibold">{st.projects}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Expenditure</span>
                <span className="font-semibold">₹{(st.expenditure/10000000).toFixed(2)} Cr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Delayed</span>
                <span className="font-semibold text-amber-600">{st.delayed}</span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <button 
                  onClick={() => navigate(`/projects?state=${st.name}`)}
                  className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View State Projects →
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
""")

# 3. Risk Intelligence
write_file("frontend/src/pages/RiskIntelligence.tsx", """
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BrainCircuit, Target, ShieldAlert } from 'lucide-react';

export const RiskIntelligence = () => {
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/works')
      .then(res => res.json())
      .then(data => setWorks(data))
      .catch(console.error);
  }, []);

  const totalWorks = works.length;
  const criticalCount = works.filter(w => w.risk_profile?.risk_level === 'CRITICAL').length;
  const mlAnomalies = works.filter(w => w.risk_profile?.ml_anomaly_score > 70).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Risk Intelligence Center</h2>
        <p className="text-slate-500 mt-1">Deep insights powered by Isolation Forest ML models and deterministic rule engines.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-indigo-950 text-white border-indigo-900">
          <CardContent className="p-6">
            <BrainCircuit size={32} className="text-indigo-400 mb-4" />
            <div className="text-3xl font-bold">{mlAnomalies}</div>
            <p className="text-indigo-200 mt-1">Statistical Anomalies Detected</p>
          </CardContent>
        </Card>
        <Card className="bg-red-950 text-white border-red-900">
          <CardContent className="p-6">
            <ShieldAlert size={32} className="text-red-400 mb-4" />
            <div className="text-3xl font-bold">{criticalCount}</div>
            <p className="text-red-200 mt-1">Critical Risk Profiles</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 text-white border-slate-800">
          <CardContent className="p-6">
            <Target size={32} className="text-emerald-400 mb-4" />
            <div className="text-3xl font-bold">{totalWorks}</div>
            <p className="text-slate-300 mt-1">Total Works Monitored</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Methodology & Transparency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>Isolation Forest (Unsupervised Learning):</strong> The system uses an Isolation Forest algorithm to identify works that deviate significantly from the norm in multidimensional space. Features analyzed include sanctioned amounts, actual expenditures, physical progress, and financial progress.
          </p>
          <p>
            <strong>Rule-Based Heuristics:</strong> In addition to ML, the risk engine enforces deterministic rules such as <em>Financial Progress {">"} Physical Progress by 10+ percentage points</em>, and hard schedule deadlines.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 flex gap-3">
             <AlertTriangle className="flex-shrink-0" />
             <p className="text-sm font-medium">AI-generated risk indicators are decision-support signals and should be independently verified by authorized personnel. The system does not automatically accuse any entity of fraud.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
""")

# 4. Reports
write_file("frontend/src/pages/Reports.tsx", """
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Download, Printer } from 'lucide-react';

export const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Reports & Exports</h2>
        <p className="text-slate-500 mt-1">Generate official audit reports and data extracts.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="text-indigo-600"/> National Risk Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">A comprehensive PDF report containing all high-risk projects, state-wise aggregates, and anomaly detection summaries for the current financial year.</p>
            <div className="flex gap-3">
              <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition">
                <Printer size={16} /> Print Report
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Download className="text-green-600"/> Raw Data Extract</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">Export the full normalized dataset including calculated AI risk scores, financial progress metrics, and delay tracking in CSV format for offline analysis.</p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800 transition">
                <Download size={16} /> Download CSV
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
""")

# 5. Update App.tsx to include the routes
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
          <Route path="projects/demo/:id" element={<ProjectRiskProfile />} />
          <Route path="alerts" element={<AlertCenter />} />
          <Route path="risk" element={<RiskIntelligence />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<div className="p-12 text-center text-slate-500 text-lg">Screen pending implementation</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
""")

print("Missing modules generated successfully!")
