import os
import re

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# 1. CREATE Login.tsx
login_content = """
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, LogIn, ArrowRight, Activity } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('jan_drishti_auth', 'true');
      navigate('/');
    }, 1200);
  };

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      localStorage.setItem('jan_drishti_auth', 'true');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-950/90 pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
            <ShieldAlert size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight leading-none">JAN-DRISHTI</h1>
            <p className="text-[11px] text-blue-400 font-bold uppercase tracking-widest mt-1">Government of India</p>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Securing the future of public infrastructure.</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Advanced AI-powered monitoring and risk intelligence platform for the MPLAD Scheme. Authenticate to access the national command center.
          </p>
        </div>
        
        <div className="relative z-10 text-slate-500 text-sm font-medium">
          &copy; 2026 Ministry of Statistics and Programme Implementation.
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-slate-50 relative">
        <div className="max-w-md w-full mx-auto animate-slide-up">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h2>
            <p className="text-slate-500 font-medium">Enter your credentials to access the secure portal.</p>
          </div>

          <button 
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl shadow-sm hover:bg-slate-50 hover:shadow-md transition-all duration-300 btn-press disabled:opacity-50"
          >
            {isGoogleLoading ? <Activity className="w-5 h-5 animate-spin text-slate-400" /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Or continue with email</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Government Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="official@mospi.gov.in" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                Password
                <a href="#" className="text-blue-600 hover:text-blue-700 text-xs font-bold">Forgot password?</a>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white font-bold px-4 py-3 rounded-xl shadow-[0_4px_14px_0_rgb(29,78,216,0.39)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.23)] hover:bg-blue-800 transition-all duration-300 btn-press disabled:opacity-50 mt-4"
            >
              {isLoading ? <Activity className="w-5 h-5 animate-spin" /> : <LogIn size={18} />}
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Don't have an authorized account?{' '}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
              Request Access <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
"""
write_file("frontend/src/pages/Login.tsx", login_content)

# 2. CREATE Signup.tsx
signup_content = """
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, User, UserPlus, ArrowRight, Activity, Briefcase } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('jan_drishti_auth', 'true');
      navigate('/');
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      localStorage.setItem('jan_drishti_auth', 'true');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-950/90 pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
            <ShieldAlert size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight leading-none">JAN-DRISHTI</h1>
            <p className="text-[11px] text-blue-400 font-bold uppercase tracking-widest mt-1">Government of India</p>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldAlert size={14} /> Level 4 Clearance Required
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Join the intelligence network.</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Request an authorized account to monitor, verify, and enforce transparency across all MPLADS operations nationwide.
          </p>
        </div>
        
        <div className="relative z-10 text-slate-500 text-sm font-medium">
          &copy; 2026 Ministry of Statistics and Programme Implementation.
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-slate-50 relative">
        <div className="max-w-md w-full mx-auto animate-slide-up">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium">Register for secure access to the national dashboard.</p>
          </div>

          <button 
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl shadow-sm hover:bg-slate-50 hover:shadow-md transition-all duration-300 btn-press disabled:opacity-50"
          >
            {isGoogleLoading ? <Activity className="w-5 h-5 animate-spin text-slate-400" /> : <GoogleIcon />}
            Sign up with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Or register with email</span></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Official Name" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Government Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="official@mospi.gov.in" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Department / Designation</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 appearance-none">
                  <option>District Magistrate</option>
                  <option>MoSPI Auditor</option>
                  <option>State Nodal Officer</option>
                  <option>Vigilance Officer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white font-bold px-4 py-3 rounded-xl shadow-[0_4px_14px_0_rgb(29,78,216,0.39)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.23)] hover:bg-blue-800 transition-all duration-300 btn-press disabled:opacity-50 mt-6"
            >
              {isLoading ? <Activity className="w-5 h-5 animate-spin" /> : <UserPlus size={18} />}
              {isLoading ? 'Creating Account...' : 'Request Access'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
              Sign In <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
"""
write_file("frontend/src/pages/Signup.tsx", signup_content)

# 3. UPDATE App.tsx to include Auth Guard and Routes
app_content = read_file("frontend/src/App.tsx")
if "import { Login }" not in app_content:
    new_app_content = """
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('jan_drishti_auth') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
    </BrowserRouter>
  );
}

export default App;
"""
    write_file("frontend/src/App.tsx", new_app_content.strip())

# 4. UPDATE Layout.tsx for Logout logic
layout_content = read_file("frontend/src/components/Layout.tsx")

# Need to inject useNavigate into Topbar if it's not there, or attach it to the logout button.
# Let's replace the Topbar component:
old_topbar_start = "const Topbar = () => ("
old_topbar_regex = r"const Topbar = \(\) => \((.*?)\);"

new_topbar = """
const Topbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('jan_drishti_auth');
    navigate('/login');
  };

  return (
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
        <button className="relative text-slate-500 hover:text-slate-800 transition-colors btn-press">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors btn-press group">
          <LogOut size={18} className="group-hover:text-red-500 transition-colors" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
"""
layout_content = re.sub(r'const Topbar = \(\) => \(.*?\);', new_topbar, layout_content, flags=re.DOTALL)
write_file("frontend/src/components/Layout.tsx", layout_content)

print("Authentication Pages (Login/Signup) created and guarded routes configured!")
