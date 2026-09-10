import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import { RealtimeProvider } from './context/RealtimeContext';
import { Layout } from './components/Layout';
import { NationalDashboard } from './pages/NationalDashboard';
import { ProjectExplorer } from './pages/ProjectExplorer';
import { ProjectRiskProfile } from './pages/ProjectRiskProfile';
import { AlertCenter } from './pages/AlertCenter';
import { StatesOverview } from './pages/StatesOverview';
import { RiskIntelligence } from './pages/RiskIntelligence';
import { GraphIntelligence } from './pages/GraphIntelligence';
import { Reports } from './pages/Reports';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { LandingPage } from './pages/LandingPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('jan_drishti_auth') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/landing" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <RealtimeProvider>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
        </RealtimeProvider>
      </RoleProvider>
    </BrowserRouter>
  );
}

export default App;
