import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GovtHeader } from '../components/GovtHeader';
import { JanDrishtiLogo } from '../components/JanDrishtiLogo';
import { 
  ShieldAlert, 
  Cpu, 
  Network, 
  Radar, 
  FileCheck2, 
  Truck, 
  Bot, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Layers, 
  Activity, 
  Lock, 
  ExternalLink, 
  Satellite, 
  ScanLine, 
  BarChart3, 
  ChevronRight, 
  ChevronLeft,
  Globe, 
  Building, 
  Users, 
  ShieldCheck,
  Zap,
  Terminal,
  Database,
  FileText,
  AlertTriangle,
  Scale,
  Fingerprint,
  Radio,
  Play,
  Pause,
  Maximize2,
  BellRing,
  Award,
  Landmark,
  Compass
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const tickerNotices = [
    "राजपत्र अधिसूचना // MoSPI Circular 2026/GNN-04: Mandatory Heterogeneous GATv2 multi-hop relationship audit active across 543 Parliamentary Constituencies.",
    "PFMS Central Treasury Gateway: Synchronized 14,200 active works with 0-latency ledger tracking.",
    "NHAI FASTag Logistics Link: Highway toll plaza KM-128 automated telemetry active for structural material audits.",
    "ISRO Bhuvan Spatial Grid: Cartosat-3 0.5m sub-meter optical temporal validation online for ongoing rural infrastructure.",
    "CVC Vigilance Interconnect: Automated charge-sheet package generator enabled under Prevention of Corruption Act (POCA)."
  ];

  const slides = [
    {
      id: 'gnn',
      badge: 'TOPOLOGICAL GRAPH ATTENTION (GATv2)',
      badgeColor: 'bg-blue-100 text-[#0B3C68] border-blue-300',
      title: 'Topological Procurement Cartel Radar',
      subtitle: 'Detecting Multi-Hop Bid-Rigging & Circular Siphoning',
      desc: 'Traditional tabular models evaluate tenders in isolation. Our 2-layer Heterogeneous Graph Attention Network aggregates multi-hop relationship features across Parliamentarians, Implementing Agencies, and Shell Subcontractors to expose circular money dissipation with 96.4% confidence.',
      metrics: [
        { label: 'Cartel Detection Accuracy', value: '96.4%' },
        { label: 'Latent Embedding Space', value: '32-Dimensional' },
        { label: 'Softmax Attention Peak', value: 'α = 0.982' }
      ],
      route: '/graph',
      renderVisual: () => (
        <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-mono font-bold text-[#0B3C68] uppercase tracking-wider flex items-center gap-1.5">
              <Network size={14} className="text-[#0B3C68]" /> NEURAL_FLOW // RING_GNN_CR_01
            </span>
            <span className="text-[10px] font-mono text-red-700 font-bold bg-red-100 px-2.5 py-0.5 rounded border border-red-300">
              CIRCULAR SIPHONING IDENTIFIED
            </span>
          </div>

          <div className="py-4 flex items-center justify-between gap-2 relative">
            <div className="p-3 bg-white border-2 border-blue-400 rounded-xl text-center z-10 w-28 shadow-sm">
              <span className="text-[9px] font-bold uppercase text-blue-700 block">Authority</span>
              <span className="text-xs font-black text-slate-900">Hon'ble MP #41</span>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <span className="text-[9px] font-mono text-slate-500 font-bold">α=0.74</span>
              <div className="w-full h-0.5 bg-blue-300 relative">
                <div className="w-2 h-2 rounded-full bg-blue-600 absolute top-1/2 -translate-y-1/2 right-0 animate-ping"></div>
              </div>
            </div>

            <div className="p-3 bg-white border-2 border-slate-300 rounded-xl text-center z-10 w-28 shadow-sm">
              <span className="text-[9px] font-bold uppercase text-slate-500 block">Asset</span>
              <span className="text-xs font-black text-slate-900">Project #901</span>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <span className="text-[9px] font-mono text-red-600 font-bold">α=0.98</span>
              <div className="w-full h-0.5 bg-red-400 relative">
                <div className="w-2 h-2 rounded-full bg-red-600 absolute top-1/2 -translate-y-1/2 right-0 animate-ping"></div>
              </div>
            </div>

            <div className="p-3 bg-red-50 border-2 border-red-400 rounded-xl text-center z-10 w-28 shadow-sm">
              <span className="text-[9px] font-bold uppercase text-red-700 block">Subcontractor</span>
              <span className="text-xs font-black text-red-900">Shell SH-01</span>
            </div>
          </div>

          <div className="bg-white border border-blue-200 rounded-xl p-2.5 text-xs text-slate-700 flex items-center justify-between shadow-2xs">
            <span className="font-medium">Topological Graph Attention: 4 shell nodes sharing identical PAN & GSTIN hash.</span>
            <span className="font-black text-red-700 font-mono text-xs">CONFIDENCE: 96.4%</span>
          </div>
        </div>
      )
    },
    {
      id: 'fastag',
      badge: 'HIGHWAY TELEMETRY & LOGISTICS',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      title: 'NHAI FASTag Freight Cross-Auditing',
      subtitle: 'Correlating Toll Gate Transits with Billed Material Invoices',
      desc: 'Correlates physical highway freight transit events with billed material volumes. When an invoice claims 50 metric tons of steel or cement delivered, but the vehicle FASTag never recorded passage through the mandatory corridor toll plazas, phantom delivery is flagged automatically.',
      metrics: [
        { label: 'Toll Event Verification', value: '100% Real-Time' },
        { label: 'Phantom Transit Detection', value: 'Zero Toll Log' },
        { label: 'Material Audit Match', value: '33 Invoices Flagged' }
      ],
      route: '/projects',
      renderVisual: () => (
        <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Truck size={14} className="text-emerald-700" /> NHAI_CORRIDOR // VEHICLE_KA01_EF9921
            </span>
            <span className="text-[10px] font-mono text-red-700 font-bold bg-red-100 px-2.5 py-0.5 rounded border border-red-300">
              PHANTOM INVOICE SUSPECTED
            </span>
          </div>

          <div className="my-2 p-3 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">e-Way Bill Claimed Route:</span>
              <span className="text-slate-900 font-bold">Bangalore Quarry → Dharwad Site (420 km)</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Toll 1 (Tumkur): VERIFIED</span>
                <span className="text-red-600 font-bold">Toll 2 (Chitradurga): MISSING</span>
                <span className="text-red-600 font-bold">Toll 3 (Hubli): MISSING</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="w-1/3 bg-emerald-500"></div>
                <div className="w-2/3 bg-red-300 border-l-2 border-white"></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-700 pt-1">
              <span>Billed Claim: 40 Metric Tons Cement</span>
              <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                NO TOLL LOGGED AFTER KM-72
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900 flex items-center justify-between">
            <span>Physical Delivery Incongruity: Vehicle logged stationary in depot 350 km away.</span>
            <span className="font-black text-emerald-800 font-mono text-xs">AUDIT: MISMATCH</span>
          </div>
        </div>
      )
    },
    {
      id: 'isro',
      badge: 'SPACE-BORNE GEO-INTELLIGENCE',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      title: 'ISRO Bhuvan Ground-Truth Telemetry',
      subtitle: 'Sub-Meter Optical Verification vs Claimed Progress',
      desc: 'Connects to National Remote Sensing Centre (NRSC) Bhuvan satellite pipelines. Cross-checks geotagged project milestones against actual surface elevation models and multi-spectral imagery to prevent funds siphoning on phantom or stalled physical sites.',
      metrics: [
        { label: 'Spatial Ground Resolution', value: '0.5m Cartosat-3' },
        { label: 'Temporal Re-visit Interval', value: '5-Day Cycle' },
        { label: 'NDVI & Spectral Index', value: 'Automated NDVI' }
      ],
      route: '/states',
      renderVisual: () => (
        <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <Satellite size={14} className="text-amber-700" /> ISRO_BHUVAN // GEO_18.9220N_72.8347E
            </span>
            <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
              PROGRESS DIVERGENCE: 42%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="p-3 bg-white border border-slate-300 rounded-xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Sanction Date</span>
                <span className="text-[10px] font-mono text-slate-700 font-bold">T0: 12-JAN-2025</span>
              </div>
              <div className="h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-dashed border-slate-300 text-slate-500 text-xs font-medium">
                Bare Plot (0% Built)
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-300 rounded-xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-amber-800 uppercase">Current Optical Scan</span>
                <span className="text-[10px] font-mono text-amber-900 font-bold">T1: 08-SEP-2026</span>
              </div>
              <div className="h-16 bg-white rounded-lg flex items-center justify-center border border-amber-400 text-amber-900 text-xs font-bold shadow-2xs">
                Excavation Only (18% vs Claimed 60%)
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-center justify-between">
            <span>Spectral Analysis: Foundation canopy absent; excavation incomplete.</span>
            <span className="font-black text-amber-800 font-mono text-xs">STATUS: STALLED</span>
          </div>
        </div>
      )
    },
    {
      id: 'ocr',
      badge: 'DEEP FORENSIC DOCUMENT OCR',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      title: 'Deep Forensic Document & Invoice OCR',
      subtitle: 'Micro-Density Font Kerning & EXIF Manipulation Detection',
      desc: 'Advanced Optical Character Recognition (OCR) scrutinizes contractor invoices, e-Way bills, and completion certificates. Identifies micro-density font kerning anomalies (indicating altered numbers) and stripped digital image creation timestamps.',
      metrics: [
        { label: 'Pixel Density Forensic', value: 'Kerning Mismatch' },
        { label: 'Metadata EXIF Audit', value: 'Pre-Sanction' },
        { label: 'Tamper Detection', value: 'Deep-Scan' }
      ],
      route: '/risk',
      renderVisual: () => (
        <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-mono font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
              <ScanLine size={14} className="text-purple-700" /> OCR_FORENSICS // INVOICE_INV_992A
            </span>
            <span className="text-[10px] font-mono text-red-700 font-bold bg-red-100 px-2.5 py-0.5 rounded border border-red-300">
              TAMPERING DETECTED
            </span>
          </div>

          <div className="my-2 p-3 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-xs text-slate-600 font-mono">Total Amount Claimed</span>
              <span className="text-xs font-mono font-black text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-300">
                ₹45,00,000 [ALTERED]
              </span>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <p className="flex items-center gap-1.5">
                <span className="text-red-600 font-black">!</span>
                <span>Font Kerning Mismatch: Digits \'4\' and \'5\' exhibit distinct pixel rasterization.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-amber-700 font-black">!</span>
                <span>EXIF Creation Timestamp altered 3 months prior to project sanction date.</span>
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-2.5 text-xs text-purple-900 flex items-center justify-between">
            <span>Evidence ready for Central Vigilance Commission (CVC) submission.</span>
            <span className="font-black text-purple-800 font-mono text-xs">CONFIDENCE: 98%</span>
          </div>
        </div>
      )
    },
    {
      id: 'voice',
      badge: 'CONVERSATIONAL INTELLIGENCE',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      title: 'Voice-Enabled AI Vigilance Copilot',
      subtitle: 'Hands-Free Natural Language Database Oversight',
      desc: 'Hands-free speech recognition allowing vigilance officers and district magistrates to query complex scheme databases, retrieve delayed works, and execute multi-parameter risk queries using conversational voice commands.',
      metrics: [
        { label: 'Voice Command Engine', value: 'Web Speech API' },
        { label: 'Query Translation', value: 'Natural Language to SQL' },
        { label: 'Response Latency', value: '< 1.2s Synthesis' }
      ],
      route: '/',
      renderVisual: () => (
        <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-mono font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
              <Bot size={14} className="text-indigo-700" /> JAN_DRISHTI_COPILOT // AUDIO_SYNTH
            </span>
            <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span> LISTENING
            </span>
          </div>

          <div className="my-2 space-y-2">
            <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Auditor Voice Input</span>
              <p className="text-xs text-slate-900 font-semibold italic">"Show all stalled community center works with critical financial mismatch in Maharashtra."</p>
            </div>

            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl shadow-2xs">
              <span className="text-[9px] font-bold text-[#0B3C68] uppercase tracking-wider block mb-0.5">AI Copilot Synthesis</span>
              <p className="text-xs text-blue-900 font-medium leading-relaxed">
                Found 8 critical projects in Maharashtra. 6 show severe progress divergence (&gt;30%). Filtered in Project Explorer.
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 text-xs text-indigo-900 flex items-center justify-between">
            <span>Natural language query executed with 0 syntax errors.</span>
            <span className="font-black text-indigo-800 font-mono text-xs">QUERY EXEC: 0.84s</span>
          </div>
        </div>
      )
    },
    {
      id: 'compliance',
      badge: 'STATUTORY AUDIT & LEGAL WORKFLOW',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      title: 'Statutory Compliance & Legal Forensics',
      subtitle: 'Automated Charge-Sheet Generation for CVC & Lokpal',
      desc: 'Eliminates procedural delays by compiling multi-layered evidence chains into formalized vigilance dossiers ready for the Central Vigilance Commission (CVC), Lokpal, and state Anti-Corruption Bureaus under the Prevention of Corruption Act.',
      metrics: [
        { label: 'Statutory Standard', value: 'POCA 1988 & IPC 420' },
        { label: 'Dossier Generation', value: 'Automated 1-Click' },
        { label: 'Chain of Custody', value: 'Cryptographic Hash' }
      ],
      route: '/reports',
      renderVisual: () => (
        <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Scale size={14} className="text-emerald-700" /> LEGAL_DOSSIER // CVC_CASE_2026_094
            </span>
            <span className="text-[10px] font-mono text-blue-800 font-bold bg-blue-100 px-2.5 py-0.5 rounded border border-blue-300">
              PROSECUTION READY
            </span>
          </div>

          <div className="my-2 p-3 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Evidentiary Chain of Custody:</span>
              <span className="text-emerald-700 font-mono text-[11px]">HASH: 9e4a8b...1f0c</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200 flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={13} className="text-emerald-600" /> GNN Collusion Ring
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200 flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={13} className="text-emerald-600" /> FASTag Phantom Route
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200 flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={13} className="text-emerald-600" /> Bhuvan Mismatch
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200 flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={13} className="text-emerald-600" /> OCR Font Kerning
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900 flex items-center justify-between">
            <span>Formalized audit report generated under CAG & CVC standard guidelines.</span>
            <span className="font-black text-emerald-800 font-mono text-xs">CVC FORWARD: READY</span>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const active = slides[currentSlide];

  const handleLaunchApp = () => {
    const isAuth = localStorage.getItem('jan_drishti_auth') === 'true';
    if (isAuth) navigate('/');
    else navigate('/login');
  };

  const handleLaunchSlideModule = (route: string) => {
    const isAuth = localStorage.getItem('jan_drishti_auth') === 'true';
    if (isAuth) navigate(route);
    else navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#0B3C68] selection:text-white font-sans antialiased relative overflow-x-hidden pb-16">
      
      {/* 0. OFFICIAL GOVERNMENT OF INDIA SOVEREIGN BANNER */}
      <GovtHeader variant="light" showOfficials={true} />

      {/* 1. SOVEREIGN GOVERNMENT NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#0B3C68] text-white shadow-md px-4 sm:px-6 lg:px-8 py-3 border-b-2 border-amber-500">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => navigate('/')}>
            <JanDrishtiLogo size={42} variant="badge" theme="dark" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">JAN-DRISHTI</span>
                <span className="text-xs font-bold text-amber-400 font-serif">जन-दृष्टि</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black tracking-wider bg-amber-500 text-slate-950">
                  GOV.IN
                </span>
              </div>
              <p className="text-[10px] text-slate-200 uppercase tracking-wider font-semibold">
                Ministry of Statistics & Programme Implementation
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10 text-xs font-semibold">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => { setCurrentSlide(idx); setIsAutoPlay(false); }}
                className={`px-3 py-1.5 rounded-lg transition-all text-[11px] ${
                  currentSlide === idx 
                    ? 'bg-white text-[#0B3C68] font-black shadow-sm' 
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {idx + 1}. {s.id.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-slate-100 hover:text-white px-3.5 py-2 rounded-lg transition-colors border border-white/20 hover:border-white/40 hover:bg-white/10"
            >
              Officer Clearance
            </button>
            <button
              onClick={handleLaunchApp}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg shadow-sm transition-all btn-press flex items-center gap-1.5"
            >
              <span>Command Center</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </nav>

      {/* 2. OFFICIAL GAZETTE & AUDIT TELEMETRY NOTICE TICKER */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 lg:px-8 py-2 text-xs">
        <div className="max-w-[1720px] mx-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-600 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shrink-0 shadow-xs">
            <BellRing size={12} className="animate-pulse" />
            <span>राजपत्र अधिसूचना // AUDIT TICKER</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1 text-slate-800 font-semibold">
            <div className="inline-block animate-marquee">
              {tickerNotices.join("   •••   ")}
            </div>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION (AUTHORITATIVE GOVERNMENT DIRECTIVE & COMMAND COCKPIT) */}
      <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 relative max-w-[1720px] mx-auto">
        
        {/* Upper Directive Pill */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0B3C68] text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>संसद सदस्य स्थानीय क्षेत्र विकास योजना (MPLADS) • NATIONAL SURVEILLANCE &amp; FRAUD PREVENTION CORE</span>
          </div>
        </div>

        {/* Symmetrical Sovereign Header: Government of India State Emblem - Title/Subtitle - Government of India State Emblem */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-12 max-w-7xl mx-auto my-4">
          
          {/* Left: Government of India State Emblem (Three Lions / Tigers with Satyameva Jayate) */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 p-5 bg-gradient-to-b from-white to-amber-50/40 rounded-2xl border-2 border-amber-300/80 shadow-md hover:border-amber-400 transition-all">
            <div className="w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center p-1">
              <img 
                src="/gov/emblem_india.svg" 
                alt="Government of India State Emblem" 
                className="w-full h-full object-contain filter drop-shadow-md"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg';
                  }
                }}
              />
            </div>
            <span className="text-xs font-black text-amber-900 tracking-wider mt-2.5 font-serif">
              सत्यमेव जयते
            </span>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mt-0.5">
              Government of India
            </span>
          </div>

          {/* Center: Title, Subtitle, Hindi Directive, and Infrastructure Directive */}
          <div className="text-center flex-1 max-w-3xl px-2">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Intelligent Monitoring &amp; Risk Analytics for{" "}
              <span className="text-[#0B3C68] underline decoration-amber-500 decoration-4 underline-offset-8">
                MPLADS Implementation
              </span>
            </h1>

            <p className="text-base sm:text-xl font-bold text-amber-900 mt-4 leading-relaxed">
              AI-powered detection of anomalies, irregularities, inefficiencies and potential fraud in public development works.
            </p>

            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-2 font-serif">
              एमपीलैड्स (MPLADS) कार्यान्वयन हेतु समग्र निगरानी, विसंगति पहचान एवं जोखिम विश्लेषण प्रणाली
            </p>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium mt-3 leading-relaxed">
              The Ministry of Statistics &amp; Programme Implementation (MoSPI) sovereign infrastructure integrating 
              <strong> Graph Neural Networks (GATv2)</strong>, <strong>NHAI FASTag freight telemetry</strong>, and 
              <strong> ISRO Bhuvan satellite ground-truth</strong> to eliminate multi-hop procurement cartels, phantom invoicing, and uncompleted physical works.
            </p>
          </div>

          {/* Right: Government of India State Emblem (Matching Sovereign Flank) */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 p-5 bg-gradient-to-b from-white to-amber-50/40 rounded-2xl border-2 border-amber-300/80 shadow-md hover:border-amber-400 transition-all">
            <div className="w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center p-1">
              <img 
                src="/gov/emblem_india.svg" 
                alt="State Emblem of India - Bharat Sarkar" 
                className="w-full h-full object-contain filter drop-shadow-md"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg';
                  }
                }}
              />
            </div>
            <span className="text-xs font-black text-amber-900 tracking-wider mt-2.5 font-serif">
              सत्यमेव जयते
            </span>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mt-0.5">
              भारत सरकार
            </span>
          </div>

        </div>

        {/* 4 Sovereign Metric Showcase Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto text-left">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monitored Outlay</div>
            <div className="text-2xl font-black text-[#0B3C68] mt-1">₹23,450+ Cr</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">543 Lok Sabha Constituencies</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Public Works</div>
            <div className="text-2xl font-black text-slate-900 mt-1">14,200+</div>
            <div className="text-[10px] text-blue-700 font-semibold mt-0.5">Real-time GPS &amp; Stage Sync</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cartel Collusion Accuracy</div>
            <div className="text-2xl font-black text-amber-700 mt-1">96.4%</div>
            <div className="text-[10px] text-amber-800 font-semibold mt-0.5">Heterogeneous GATv2 Neural Net</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sovereign Compliance</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">100% GIGW</div>
            <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">NIC Cloud &amp; CVC Ready</div>
          </div>
        </div>

      </section>

      {/* 4. FLOATING CAPABILITY CONSOLE (MOVING SLIDES DECK) */}
      <section className="px-4 sm:px-8 max-w-6xl mx-auto my-6">
        
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden">
          
          {/* Console Header */}
          <div className="bg-[#0B3C68] text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#0B3C68]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <span className="font-mono text-xs font-bold text-amber-300 tracking-wider">
                JAN-DRISHTI // EXECUTIVE_CAPABILITY_DECK
              </span>
              <span className="text-[10px] font-mono text-slate-300 font-semibold">
                [SLIDE {currentSlide + 1} OF {slides.length}]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono font-bold flex items-center gap-1 transition-colors"
                title={isAutoPlay ? "Pause Auto-Advance" : "Resume Auto-Advance"}
              >
                {isAutoPlay ? <Pause size={12} /> : <Play size={12} />}
                <span>{isAutoPlay ? 'AUTO' : 'PAUSED'}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
                  setIsAutoPlay(false);
                }}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Previous Slide"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => {
                  setCurrentSlide(prev => (prev + 1) % slides.length);
                  setIsAutoPlay(false);
                }}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Next Slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Slide Progress */}
          <div className="h-1 bg-slate-200 w-full flex">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => { setCurrentSlide(idx); setIsAutoPlay(false); }}
                className={`flex-1 h-full cursor-pointer transition-all duration-300 ${
                  currentSlide === idx ? 'bg-amber-500' : 'bg-slate-200 hover:bg-slate-300'
                }`}
              ></div>
            ))}
          </div>

          {/* Slide Content */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${active.badgeColor}`}>
                  {active.badge}
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold">
                  MOD-0{currentSlide + 1}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {active.title}
                </h3>
                <p className="text-sm font-bold text-[#0B3C68] mt-1">
                  {active.subtitle}
                </p>
              </div>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {active.desc}
              </p>

              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {active.metrics.map((m, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 block truncate">
                      {m.label}
                    </span>
                    <span className="text-xs font-black text-slate-900 block mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleLaunchSlideModule(active.route)}
                  className="px-5 py-2.5 bg-[#0B3C68] hover:bg-[#072848] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all btn-press flex items-center gap-2"
                >
                  <span>Launch Forensic Module</span>
                  <ExternalLink size={14} />
                </button>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pl-2">
                  <span>Slide {currentSlide + 1} of {slides.length}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 h-[340px] sm:h-[360px]">
              {active.renderVisual()}
            </div>
          </div>

          {/* Quick Selector Bar */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Select Inspection Capability:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => { setCurrentSlide(idx); setIsAutoPlay(false); }}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    currentSlide === idx 
                      ? 'bg-[#0B3C68] text-white shadow-xs' 
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}. {s.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* 5. QUICK SOVEREIGN GOVERNMENT SERVICES & INTEGRATIONS */}
      <section className="px-4 sm:px-8 max-w-6xl mx-auto my-12 text-left">
        <div className="border-b-2 border-[#0B3C68] pb-3 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Integrated National Portals & Sovereign Data Feeds
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Direct API gateways to central government fiscal and spatial registries
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300">
            ALL 5 SYSTEMS ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0B3C68] flex items-center justify-center font-black text-xs mb-3">
              PFMS
            </div>
            <h4 className="text-xs font-black text-slate-900">PFMS Treasury</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
              Real-time expenditure tracking direct from Consolidated Fund of India.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs mb-3">
              GeM
            </div>
            <h4 className="text-xs font-black text-slate-900">GeM Marketplace</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
              Standard price index benchmarking to detect procurement inflation.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs mb-3">
              ISRO
            </div>
            <h4 className="text-xs font-black text-slate-900">Bhuvan Spatial</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
              High-resolution satellite confirmation of physical asset completion.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-black text-xs mb-3">
              CVC
            </div>
            <h4 className="text-xs font-black text-slate-900">CVC Vigilance</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
              Direct evidentiary forwarding for prosecution under POCA 1988.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-black text-xs mb-3">
              NIC
            </div>
            <h4 className="text-xs font-black text-slate-900">NIC MeghRaj</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
              Hosted on sovereign national government cloud infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* 6. OFFICIAL GOVERNMENT OF INDIA FOOTER */}
      <footer className="bg-[#0B3C68] text-white mt-16 pt-10 pb-8 border-t-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/15 text-xs">
            
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-10 flex items-center justify-center">
                  <img src="/gov/emblem_india.svg" alt="Emblem" className="w-full h-full object-contain filter invert" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">भारत सरकार</h4>
                  <p className="text-[10px] text-slate-300 uppercase font-semibold">Government of India</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय<br />
                Ministry of Statistics and Programme Implementation (MoSPI)<br />
                Sardar Patel Bhawan, Sansad Marg, New Delhi - 110001
              </p>
            </div>

            <div>
              <h5 className="font-black text-amber-400 text-xs uppercase tracking-wider mb-3">
                National Portals
              </h5>
              <ul className="space-y-1.5 text-slate-300">
                <li><a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">National Portal of India (india.gov.in)</a></li>
                <li><a href="https://www.pmindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Prime Minister's Office (pmindia.gov.in)</a></li>
                <li><a href="https://www.digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Digital India Programme</a></li>
                <li><a href="https://data.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Open Government Data (OGD)</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-amber-400 text-xs uppercase tracking-wider mb-3">
                Vigilance & Accountability
              </h5>
              <ul className="space-y-1.5 text-slate-300">
                <li><a href="https://www.cvc.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Central Vigilance Commission (CVC)</a></li>
                <li><a href="https://rtionline.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Right to Information (RTI Online)</a></li>
                <li><a href="https://cag.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Comptroller & Auditor General of India</a></li>
                <li><a href="https://bhuvan.nrsc.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">ISRO Bhuvan Geo-Portal</a></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h5 className="font-black text-amber-400 text-xs uppercase tracking-wider mb-3">
                Standards & Compliance
              </h5>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1 text-[11px] text-slate-300">
                <p className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <CheckCircle2 size={12} /> GIGW 3.0 Standard Compliant
                </p>
                <p className="text-[10px] text-slate-400">
                  Designed strictly adhering to Guidelines for Indian Government Websites.
                </p>
                <p className="text-[10px] text-slate-400">
                  Hosted on NIC National Cloud Data Centre.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-300">
            <div>
              © 2026 Ministry of Statistics & Programme Implementation, Government of India. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>NIC Sovereign Infrastructure</span>
              <span>•</span>
              <span>Content Managed by MoSPI CVC Cell</span>
              <span>•</span>
              <span className="font-mono text-amber-400 font-bold">VERSION 2.4.0-GOV</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
