import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  FileText, 
  ShieldAlert, 
  Database, 
  Map, 
  LogOut, 
  Bell, 
  Search, 
  Command, 
  Network, 
  Bot, 
  X, 
  Send, 
  ChevronRight, 
  ChevronDown,
  Check,
  Landmark,
  ShieldCheck, 
  Mic, 
  Satellite, 
  Globe,
  MapPin,
  Radio,
  Zap
} from 'lucide-react';
import { useRole, OFFICER_PROFILES, OFFICER_ROLES, getBaseOfficerProfiles, type OfficerRole } from '../context/RoleContext';
import { useRealtime } from '../context/RealtimeContext';
import { LiveTelemetryDrawer } from './LiveTelemetryDrawer';
import { LiveTickerPill } from './LiveTickerPill';
import { JanDrishtiLogo } from './JanDrishtiLogo';

const Sidebar = () => {
  const location = useLocation();
  const { currentRole, currentProfile, activeRegion, menuItems } = useRole();

  return (
    <div className="w-68 bg-white border-r border-slate-200 flex flex-col min-h-screen z-20 shrink-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <JanDrishtiLogo size={40} variant="badge" theme="light" />
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-black text-slate-900 tracking-tight leading-none">JAN-DRISHTI</h1>
            <span className="px-1.5 py-0.2 rounded text-[8px] font-black bg-amber-500 text-slate-950">
              GOV.IN
            </span>
          </div>
          <p className="text-[9px] text-amber-800 font-bold tracking-wide mt-0.5">जन-दृष्टि • MoSPI</p>
          <p className="text-[8px] text-slate-400 font-medium uppercase tracking-wider truncate max-w-[130px]">MPLADS AI Sentinel</p>
        </div>
      </div>
      
      {/* Scope / Jurisdiction Badge */}
      <div className="px-5 pt-4 pb-2">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
              Active Jurisdiction
            </span>
            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 font-black border border-slate-200">
              {activeRegion.code}
            </span>
          </div>
          <p className="text-xs font-black text-slate-900 mt-1 leading-tight truncate">
            {currentProfile.jurisdiction}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`px-1.5 py-0.2 rounded text-[8px] font-black border ${currentProfile.badgeBg} ${currentProfile.badgeColor}`}>
              {currentProfile.sealBadge}
            </span>
            <span className="text-[9px] text-emerald-700 font-bold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
            </span>
          </div>

          <div className="mt-2 pt-1.5 border-t border-slate-200 text-[9.5px]">
            {currentRole === 'member_parliament' ? (
              <span className="text-emerald-900 font-bold flex items-center gap-1 leading-tight">
                <Globe size={11} className="text-emerald-700 shrink-0" />
                <span>Entire Country Data Access + {activeRegion.name}</span>
              </span>
            ) : currentRole === 'district_magistrate' ? (
              <span className="text-amber-900 font-bold flex items-center gap-1 leading-tight">
                <MapPin size={11} className="text-amber-700 shrink-0" />
                <span>Strict Regional Scope: {activeRegion.name} Only</span>
              </span>
            ) : (
              <span className="text-blue-900 font-bold flex items-center gap-1 leading-tight">
                <ShieldCheck size={11} className="text-blue-700 shrink-0" />
                <span>Pan-India National Oversight</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 mb-2 mt-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clearance Modules</div>
      </div>

      {/* Dynamic Nav Menu */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#0B3C68] text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold btn-press'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <item.icon size={17} className={isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-600'} />
                <div className="truncate">
                  <span className="text-xs block leading-tight truncate">{item.name}</span>
                  {item.nameHi && (
                    <span className={`text-[9px] block leading-none truncate ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                      {item.nameHi}
                    </span>
                  )}
                </div>
              </div>
              {item.badge ? (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              ) : (
                isActive && <ChevronRight size={14} className="text-white shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* Profile Card */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <img 
            src={currentProfile.avatar} 
            alt={currentProfile.name} 
            className="w-9 h-9 rounded-full object-cover border border-slate-300 shrink-0 bg-white" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-slate-900 leading-tight truncate">{currentProfile.name}</p>
            <p className="text-[10px] text-slate-500 font-medium truncate">{currentProfile.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const Topbar = () => {
  const navigate = useNavigate();
  const { 
    currentRole, 
    currentProfile, 
    activeRegionId,
    activeRegion,
    allRegions,
    switchRole, 
    switchRegion 
  } = useRole();
  const { connectionMode, unreadAlertsCount, setIsDrawerOpen } = useRealtime();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  
  const [regionSearch, setRegionSearch] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('ALL');

  const stateList = ['ALL', ...Array.from(new Set(allRegions.map(r => r.state)))];

  const filteredRegions = allRegions.filter(region => {
    const term = regionSearch.trim().toLowerCase();
    const matchesSearch = !term || 
      region.name.toLowerCase().includes(term) ||
      region.mp.name.toLowerCase().includes(term) ||
      region.state.toLowerCase().includes(term) ||
      region.code.toLowerCase().includes(term) ||
      region.dm.name.toLowerCase().includes(term) ||
      region.segments.some(s => s.toLowerCase().includes(term));

    const matchesState = selectedStateFilter === 'ALL' || region.state === selectedStateFilter;
    return matchesSearch && matchesState;
  });

  const handleLogout = () => {
    localStorage.removeItem('jan_drishti_auth');
    localStorage.removeItem('jan_drishti_user');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-48 sm:w-64 lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search works, IDs..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-10 py-1.5 text-xs focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" 
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
              <Command size={10} /> K
            </kbd>
          </div>
        </div>

        {/* Sovereign Verification Pill */}
        <div className="hidden 2xl:flex items-center gap-2 px-2.5 py-1 bg-amber-50/80 border border-amber-200/80 rounded-lg shrink-0">
          <div className="w-4 h-5 flex items-center justify-center shrink-0">
            <img src="/gov/emblem_india.svg" alt="Emblem" className="w-full h-full object-contain" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-black text-amber-900 block leading-none">भारत सरकार | MoSPI</span>
            <span className="text-[8.5px] text-amber-700 font-semibold leading-tight">Official Vigilance Portal</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">

        {/* Parliamentary Constituency & MP Region Filter */}
        <div className="relative shrink-0">
          <button 
            onClick={() => setShowRegionDropdown(!showRegionDropdown)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl border-2 border-slate-200 bg-amber-50/70 hover:bg-white hover:border-amber-500 transition-all text-left shadow-2xs hover:shadow-xs cursor-pointer group shrink-0"
            title="Select Parliamentary Constituency & Serving MP"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-400/90 shadow-xs bg-slate-900 shrink-0">
              <img 
                src={activeRegion.mp.avatar} 
                alt={activeRegion.mp.name} 
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
                }}
              />
              <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[7px] text-amber-300 font-mono font-black text-center py-0.2">
                MP
              </span>
            </div>
            <div>
              <span className="text-[8.5px] font-bold text-amber-900 uppercase tracking-wider block leading-none">
                Constituency / MP
              </span>
              <div className="flex items-center gap-1 font-black text-xs text-slate-900 mt-0.5">
                <span className="truncate max-w-[110px] sm:max-w-[140px]">{activeRegion.name} ({activeRegion.code})</span>
                <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-800 shrink-0" />
              </div>
            </div>
          </button>

          {showRegionDropdown && createPortal(
            <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-950/45 backdrop-blur-xs animate-in fade-in duration-150">
              <div className="fixed inset-0" onClick={() => setShowRegionDropdown(false)}></div>
              <div className="relative w-full max-w-xl bg-white rounded-2xl border-2 border-slate-300 shadow-2xl p-4 z-10 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        PARLIAMENTARY CONSTITUENCY & MP SELECTOR
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {filteredRegions.length} of {allRegions.length} Seats
                      </span>
                    </div>
                    <span className="text-sm font-black text-slate-900 block mt-1">
                      Search Any MP Name, Constituency, or State:
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowRegionDropdown(false)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                    title="Close selector"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Search Bar inside Dropdown */}
                <div className="mt-3 mb-2.5 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Type MP Name (e.g. Owaisi, Sivanath, Modi, Tharoor), City, or State..."
                    value={regionSearch}
                    onChange={(e) => setRegionSearch(e.target.value)}
                    className="w-full text-xs pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white font-medium text-slate-900 shadow-2xs"
                  />
                  {regionSearch && (
                    <button 
                      onClick={() => setRegionSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* State Quick-Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin mb-2 text-[10px]">
                  {stateList.map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStateFilter(st)}
                      className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedStateFilter === st 
                          ? 'bg-amber-600 text-white shadow-2xs' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {st === 'ALL' ? 'All States (Pan-India)' : st}
                    </button>
                  ))}
                </div>

                {/* Constituency Results List */}
                <div className="py-1 space-y-2 overflow-y-auto flex-1 max-h-[380px] scrollbar-thin pr-1">
                  {filteredRegions.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-500 font-medium">
                      No constituency or MP found matching "<span className="font-bold text-slate-700">{regionSearch}</span>".
                    </div>
                  ) : (
                    filteredRegions.map((region) => {
                      const isSelected = activeRegionId === region.id;
                      return (
                        <button
                          key={region.id}
                          onClick={() => {
                            switchRegion(region.id);
                            setShowRegionDropdown(false);
                            setRegionSearch('');
                          }}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected ? 'bg-amber-50/90 border-2 border-amber-500 shadow-xs' : 'hover:bg-slate-50 border-2 border-transparent bg-slate-50/40'
                          }`}
                        >
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-xs bg-slate-150">
                            <img 
                              src={region.mp.avatar} 
                              alt={region.mp.name} 
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
                              }}
                            />
                            <span className="absolute bottom-0 inset-x-0 bg-slate-900/85 text-white text-[8px] font-mono font-bold text-center leading-tight py-0.2">
                              {region.code}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-900 truncate">
                                {region.name} <span className="text-[10px] font-semibold text-slate-500">({region.state})</span>
                              </span>
                              {isSelected && <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">ACTIVE</span>}
                            </div>
                            <div className="text-[11.5px] text-emerald-800 font-bold truncate mt-0.5">
                              MP: {region.mp.name}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium truncate mt-0.5">
                              <img 
                                src={region.dm.avatar} 
                                alt={region.dm.name} 
                                className="w-3.5 h-3.5 rounded-full object-cover border border-slate-300 shrink-0" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
                                }}
                              />
                              <span className="truncate">Collector / DM: {region.dm.name} ({region.dm.district.split(',')[0]})</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5 text-[9.5px] text-slate-400 font-mono">
                              <span>{region.totalWorks} Works</span>
                              <span>•</span>
                              <span>₹{region.activeSanctionCr} Cr Sanctioned</span>
                              <span>•</span>
                              <span>{region.segments.length} Assembly Segments</span>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
                  <span><strong>Statutory Rule:</strong> DMs are locked to their district; MPs access entire country.</span>
                  <button 
                    onClick={() => setShowRegionDropdown(false)}
                    className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
        </div>
        
        {/* Clearance Level Switcher Dropdown (Live Role Toggling) */}
        <div className="relative shrink-0">
          <button 
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-white hover:border-[#0B3C68] transition-all text-left shadow-2xs hover:shadow-xs cursor-pointer group shrink-0"
            title="Click to Switch Officer Clearance Tier"
          >
            <div className={`w-6 h-6 rounded-lg ${currentProfile.badgeBg} ${currentProfile.badgeColor} flex items-center justify-center font-black text-[10px] shrink-0`}>
              <Landmark size={12} />
            </div>
            <div>
              <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
                Officer Tier
              </span>
              <div className="flex items-center gap-1 font-black text-xs text-slate-900 mt-0.5">
                <span>{currentProfile.sealBadge}</span>
                <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-800 shrink-0" />
              </div>
            </div>
          </button>

          {showRoleDropdown && createPortal(
            <div className="fixed inset-0 z-[9999] flex items-start justify-center sm:justify-end pt-14 sm:pt-20 px-4 sm:pr-8 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
              <div className="fixed inset-0" onClick={() => setShowRoleDropdown(false)}></div>
              <div className="relative w-full max-w-sm bg-white rounded-2xl border-2 border-slate-300 shadow-2xl p-3 z-10 animate-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      GOVERNMENT OFFICER CLEARANCE
                    </span>
                    <span className="text-xs font-black text-slate-900">
                      Switch Officer Role to Preview:
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowRoleDropdown(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="py-1 space-y-1 mt-1 max-h-[360px] overflow-y-auto">
                  {OFFICER_ROLES.map((roleKey) => {
                    const dynamicProfiles = getBaseOfficerProfiles(activeRegion);
                    const p = dynamicProfiles[roleKey];
                    const isSelected = currentRole === roleKey;
                    return (
                      <button
                        key={roleKey}
                        onClick={() => {
                          switchRole(roleKey);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected ? 'bg-blue-50 border-2 border-[#0B3C68]' : 'hover:bg-slate-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="relative shrink-0 mt-0.5">
                          <img 
                            src={p.avatar} 
                            alt={p.name} 
                            className="w-9 h-9 rounded-full object-cover border border-slate-300 bg-white shrink-0" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
                            }}
                          />
                          <span className={`absolute -bottom-1 -right-1 px-1 py-0.2 rounded text-[7px] font-black shrink-0 ${p.badgeBg} ${p.badgeColor} border`}>
                            {p.sealBadge.split(' ')[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-900 truncate">{p.name.split(',')[0]}</span>
                            {isSelected && <Check size={14} className="text-[#0B3C68] shrink-0 font-bold" />}
                          </div>
                          <span className="text-[10px] text-slate-600 font-bold block truncate">{p.title}</span>
                          <span className="text-[9.5px] text-slate-500 font-medium block truncate">{p.jurisdiction}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>,
            document.body
          )}
        </div>

        {/* Real-time Telemetry Live Radar Badge */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-950 transition-all shadow-2xs hover:shadow-xs cursor-pointer group shrink-0"
          title="Open Jan-Drishti Real-Time Vigilance Radar & Telemetry Stream"
        >
          <div className="relative flex items-center justify-center">
            <Radio size={14} className="text-emerald-700 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black tracking-tight leading-none text-emerald-950">LIVE RADAR</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-[8px] font-bold text-emerald-700 block leading-tight">
              {connectionMode === 'websocket' ? 'WebSocket Active' : connectionMode === 'polling' ? 'Stream Polling' : 'Connecting...'}
            </span>
          </div>
          {unreadAlertsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-red-600 text-white animate-bounce">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Real-time Alert Center Bell */}
        <Link 
          to="/alerts"
          className="relative p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-400 text-slate-600 transition-all shadow-2xs shrink-0 cursor-pointer"
          title="Alert Center & Anomaly Triage Queue"
        >
          <Bell size={16} />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
              {unreadAlertsCount > 9 ? '9+' : unreadAlertsCount}
            </span>
          )}
        </Link>

        {/* Public Portal Link */}
        <Link 
          to="/landing" 
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0B3C68] hover:bg-slate-50 text-xs font-bold transition-all shadow-xs shrink-0"
          title="Return to Public Landing Page"
        >
          <Globe size={13} className="text-blue-600 shrink-0" />
          <span>Public Portal</span>
        </Link>

        {/* Active Officer Identity */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl shadow-xs shrink-0">
          <div className="relative shrink-0">
            <img 
              src={currentProfile.avatar} 
              alt={currentProfile.name} 
              className="w-7 h-7 rounded-full border border-slate-300 object-cover bg-white shrink-0" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
              }}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white"></div>
          </div>
          <div className="text-left hidden lg:block">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[110px]">{currentProfile.name}</span>
              <span className={`text-[8px] font-black px-1.5 py-0.2 rounded shrink-0 ${currentProfile.badgeBg} ${currentProfile.badgeColor}`}>
                {currentProfile.sealBadge}
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500 font-medium truncate block max-w-[120px]">{currentProfile.jurisdiction}</span>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 shrink-0"></div>

        {/* Logout Button: Always fully displayed with shrink-0 and whitespace-nowrap */}
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-600 hover:text-white text-red-700 text-xs font-bold transition-all shadow-2xs btn-press cursor-pointer shrink-0 whitespace-nowrap"
          title="Sign Out from Portal"
        >
          <LogOut size={14} className="shrink-0" />
          <span className="whitespace-nowrap font-bold">Logout</span>
        </button>
      </div>
    </header>
  );
};




const AICopilot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState([
    { role: 'assistant', text: 'Hello. I am the JAN-DRISHTI AI assistant. I can analyze anomalies, retrieve records, or you can use Voice Command to speak to me.' }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e: React.FormEvent | null, forcedQuery: string = "") => {
    if (e) e.preventDefault();
    const userMsg = forcedQuery || query;
    if (!userMsg.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection to AI Core lost.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setQuery(transcript);
        handleSend(null, transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      
      recognition.start();
    } else {
      alert("Voice recognition is not supported in this browser.");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-4 bg-blue-700 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(29,78,216,0.3)] btn-press z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot size={24} />
      </button>

      <div className={`fixed bottom-8 right-8 w-[400px] bg-white border border-slate-200/70 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <div className="bg-blue-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Bot size={20} />
            <h3 className="font-bold text-sm tracking-wide">AI Assistant <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-blue-500/50 uppercase tracking-widest font-bold">Voice Enabled</span></h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition-colors btn-press">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 h-80 overflow-y-auto bg-slate-50 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''} animate-slide-up`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center border border-blue-200">
                  <Bot size={16} className="text-blue-700"/>
                </div>
              )}
              <div className={`p-3.5 rounded-2xl shadow-sm leading-relaxed text-sm ${m.role === 'user' ? 'bg-blue-700 text-white rounded-tr-sm' : 'bg-white border border-slate-200/70 text-slate-800 rounded-tl-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 animate-slide-up">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center"><Bot size={16} className="text-blue-700"/></div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm flex items-center gap-1.5 h-12">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={(e) => handleSend(e, "")} className="p-4 bg-white border-t border-slate-100">
          <div className={`flex items-center gap-2 bg-slate-50 p-2 rounded-xl border transition-colors ${isListening ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus-within:border-blue-400 focus-within:bg-white'}`}>
            <button type="button" onClick={startListening} className={`p-2 rounded-lg transition-colors btn-press ${isListening ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}>
              <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
            </button>
            <input 
              type="text" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask or use voice..."} 
              className="flex-1 bg-transparent px-2 text-sm outline-none text-slate-800" 
            />
            <button type="submit" disabled={isLoading || !query.trim()} className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 btn-press"><Send size={16}/></button>
          </div>
        </form>
      </div>
    </>
  );
};
export const Layout = () => {
  const { setIsDrawerOpen } = useRealtime();

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Sovereign Tiranga Ribbon */}
      <div className="h-1 w-full flex shrink-0 z-30 shadow-xs">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#000080]"></div>
        </div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full relative overflow-hidden">
          <Topbar />
          <div className="flex-1 overflow-y-auto p-10">
            <Outlet />
          </div>
          <AICopilot />
          <LiveTickerPill onOpenDrawer={() => setIsDrawerOpen(true)} />
          <LiveTelemetryDrawer />
        </main>
      </div>
    </div>
  );
};
