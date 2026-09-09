import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Building2, 
  ShieldAlert, 
  Landmark, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  ArrowRight,
  MapPin,
  RefreshCw,
  Globe,
  Lock,
  ChevronDown,
  X
} from 'lucide-react';
import { useRole, CONSTITUENCY_REGIONS, type ConstituencyRegion } from '../context/RoleContext';

const INITIAL_WORKS = [
  // Telangana (Hyderabad - TG-HYD - Hon'ble MP Shri Asaduddin Owaisi)
  {
    work_id: 'TG-HYD-201',
    district: 'Hyderabad (Charminar & Laad Bazaar Heritage Walkway)',
    state: 'Telangana',
    financial_progress: 75.0,
    physical_progress: 75.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 8500000
  },
  {
    work_id: 'TG-HYD-202',
    district: 'Hyderabad (Osmania General Hospital Dialysis Unit)',
    state: 'Telangana',
    financial_progress: 85.0,
    physical_progress: 85.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 9500000
  },
  {
    work_id: 'TG-HYD-203',
    district: 'Hyderabad (Mir Alam Tank Stormwater Drainage & CC Road)',
    state: 'Telangana',
    financial_progress: 45.0,
    physical_progress: 42.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 7500000
  },
  {
    work_id: 'TG-HYD-204',
    district: 'Hyderabad (Chandrayangutta 25 STEM & Robotics Labs)',
    state: 'Telangana',
    financial_progress: 100.0,
    physical_progress: 100.0,
    status: 'COMPLETED',
    sanctioned_amount: 5500000
  },
  {
    work_id: 'TG-HYD-205',
    district: 'Hyderabad (Yakutpura Old City Zardozi & Handloom Hub)',
    state: 'Telangana',
    financial_progress: 30.0,
    physical_progress: 28.0,
    status: 'DELAYED',
    sanctioned_amount: 4500000
  },
  {
    work_id: 'TG-HYD-206',
    district: 'Hyderabad (Karwan & Goshamahal 12 Solar RO Water Plants)',
    state: 'Telangana',
    financial_progress: 90.0,
    physical_progress: 90.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 3800000
  },

  // Telangana (Secunderabad - TG-SEC - Hon'ble MP Shri G. Kishan Reddy)
  {
    work_id: 'TG-SEC-301',
    district: 'Secunderabad (Gandhi Hospital Cardiac Critical Care Unit)',
    state: 'Telangana',
    financial_progress: 80.0,
    physical_progress: 80.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 9000000
  },
  {
    work_id: 'TG-SEC-302',
    district: 'Secunderabad (Jubilee Hills Solar Micro-Grid & Illumination)',
    state: 'Telangana',
    financial_progress: 100.0,
    physical_progress: 100.0,
    status: 'COMPLETED',
    sanctioned_amount: 4800000
  },
  {
    work_id: 'TG-SEC-303',
    district: 'Secunderabad (Musheerabad Digital Coding Incubator)',
    state: 'Telangana',
    financial_progress: 55.0,
    physical_progress: 50.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 5200000
  },

  // Andhra Pradesh (Vijayawada - AP-VIJ - Hon'ble MP Shri Kesineni Sivanath Chinni)
  {
    work_id: 'AP-VIJ-101',
    district: 'Vijayawada (GGH Trauma & Dialysis Unit)',
    state: 'Andhra Pradesh',
    financial_progress: 80.0,
    physical_progress: 80.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 8500000
  },
  {
    work_id: 'AP-VIJ-102',
    district: 'Vijayawada (Mylavaram Solar Lift Irrigation)',
    state: 'Andhra Pradesh',
    financial_progress: 60.0,
    physical_progress: 60.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 6500000
  },
  {
    work_id: 'AP-VIJ-103',
    district: 'Vijayawada (Nandigama ZP Smart Classrooms)',
    state: 'Andhra Pradesh',
    financial_progress: 100.0,
    physical_progress: 100.0,
    status: 'COMPLETED',
    sanctioned_amount: 4800000
  },
  {
    work_id: 'AP-VIJ-104',
    district: 'Vijayawada (Bhavanipuram Storm Drainage & CC Road)',
    state: 'Andhra Pradesh',
    financial_progress: 35.0,
    physical_progress: 32.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 7200000
  },
  {
    work_id: 'AP-VIJ-105',
    district: 'Vijayawada (Jaggayyapeta Handloom Skill Center)',
    state: 'Andhra Pradesh',
    financial_progress: 15.0,
    physical_progress: 15.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 4000000
  },
  {
    work_id: 'AP-VIJ-106',
    district: 'Vijayawada (PNBS High-Mast Lighting & CCTV)',
    state: 'Andhra Pradesh',
    financial_progress: 90.0,
    physical_progress: 90.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 3500000
  },

  // Karnataka (Bangalore Central - KA-BC)
  {
    work_id: 'KA-BC-104',
    district: 'Bangalore Central (Shivajinagar)',
    state: 'Karnataka',
    financial_progress: 100.0,
    physical_progress: 100.0,
    status: 'COMPLETED',
    sanctioned_amount: 2850000
  },
  {
    work_id: 'KA-BC-109',
    district: 'Bangalore Central (Gandhinagar)',
    state: 'Karnataka',
    financial_progress: 85.0,
    physical_progress: 85.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 6500000
  },
  {
    work_id: 'KA-BC-112',
    district: 'Bangalore Central (Shivajinagar Skywalk)',
    state: 'Karnataka',
    financial_progress: 40.0,
    physical_progress: 38.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 4200000
  },
  {
    work_id: 'KA-BC-118',
    district: 'Bangalore Central (Shantinagar Maternity Ward)',
    state: 'Karnataka',
    financial_progress: 70.0,
    physical_progress: 70.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 7500000
  },
  {
    work_id: 'KA-BC-115',
    district: 'Bangalore Central (Sarvagnanagar Skill Hub)',
    state: 'Karnataka',
    financial_progress: 15.0,
    physical_progress: 15.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 5500000
  },

  // Maharashtra (Pune - MH-PUN)
  {
    work_id: 'MH-PUN-0901',
    district: 'Pune (Baramati Taluka)',
    state: 'Maharashtra',
    financial_progress: 75.0,
    physical_progress: 72.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 8500000
  },
  {
    work_id: 'MH-PUN-0842',
    district: 'Pune (Khed Taluka)',
    state: 'Maharashtra',
    financial_progress: 100.0,
    physical_progress: 100.0,
    status: 'COMPLETED',
    sanctioned_amount: 3200000
  },
  {
    work_id: 'MH-PUN-0788',
    district: 'Pune (Shirur Taluka)',
    state: 'Maharashtra',
    financial_progress: 48.0,
    physical_progress: 52.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 4500000
  },
  {
    work_id: 'MH-PUN-0914',
    district: 'Pune (Haveli Taluka)',
    state: 'Maharashtra',
    financial_progress: 30.0,
    physical_progress: 28.0,
    status: 'DELAYED',
    sanctioned_amount: 6200000
  },
  {
    work_id: 'MH-PUN-0612',
    district: 'Pune (Junnar Taluka)',
    state: 'Maharashtra',
    financial_progress: 60.0,
    physical_progress: 42.0,
    status: 'DELAYED',
    sanctioned_amount: 3000000
  },

  // Uttar Pradesh (Varanasi - UP-VAR)
  {
    work_id: 'UP-VAR-0301',
    district: 'Varanasi (Kashi Heritage Corridor)',
    state: 'Uttar Pradesh',
    financial_progress: 90.0,
    physical_progress: 90.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 9500000
  },
  {
    work_id: 'UP-VAR-0314',
    district: 'Varanasi (Ganga Ghat Skimmer Hub)',
    state: 'Uttar Pradesh',
    financial_progress: 65.0,
    physical_progress: 65.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 7000000
  },
  {
    work_id: 'UP-VAR-0322',
    district: 'Varanasi (Sevapuri Agri Cold Terminal)',
    state: 'Uttar Pradesh',
    financial_progress: 85.0,
    physical_progress: 85.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 8000000
  },
  {
    work_id: 'UP-VAR-0330',
    district: 'Varanasi (Smart Handloom Weaver Hub)',
    state: 'Uttar Pradesh',
    financial_progress: 30.0,
    physical_progress: 28.0,
    status: 'DELAYED',
    sanctioned_amount: 5500000
  },

  // New Delhi (DL-ND)
  {
    work_id: 'DL-ND-0201',
    district: 'New Delhi (Solar Green Corridor)',
    state: 'NCT of Delhi',
    financial_progress: 85.0,
    physical_progress: 85.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 6500000
  },
  {
    work_id: 'DL-ND-0210',
    district: 'New Delhi (Kasturba Nagar Mobile Health Vans)',
    state: 'NCT of Delhi',
    financial_progress: 70.0,
    physical_progress: 70.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 7500000
  },
  {
    work_id: 'DL-ND-0218',
    district: 'New Delhi (RK Puram Digital Coding Hub)',
    state: 'NCT of Delhi',
    financial_progress: 40.0,
    physical_progress: 40.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 5000000
  },
  {
    work_id: 'DL-ND-0225',
    district: 'New Delhi (Malviya Nagar Waste Compactor)',
    state: 'NCT of Delhi',
    financial_progress: 100.0,
    physical_progress: 100.0,
    status: 'COMPLETED',
    sanctioned_amount: 4500000
  },

  // Other National Projects across India
  {
    work_id: 'GJ-AHM-0504',
    district: 'Ahmedabad (Sabarmati Green Walk)',
    state: 'Gujarat',
    financial_progress: 95.0,
    physical_progress: 95.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 8200000
  },
  {
    work_id: 'TN-CHE-0412',
    district: 'Chennai South (Adyar Desalination Feeder)',
    state: 'Tamil Nadu',
    financial_progress: 88.0,
    physical_progress: 85.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 9200000
  },
  {
    work_id: 'WB-KOL-0219',
    district: 'Kolkata North (Heritage Tram Shelter & Solar Pavement)',
    state: 'West Bengal',
    financial_progress: 54.0,
    physical_progress: 45.0,
    status: 'DELAYED',
    sanctioned_amount: 6800000
  },
  {
    work_id: 'BR-PAT-0331',
    district: 'Patna Sahib (Rural Road Connectivity Link)',
    state: 'Bihar',
    financial_progress: 48.0,
    physical_progress: 42.0,
    status: 'DELAYED',
    sanctioned_amount: 5400000
  },
  {
    work_id: 'RJ-JAI-0711',
    district: 'Jaipur Rural (Rainwater Harvesting & Check Dam)',
    state: 'Rajasthan',
    financial_progress: 72.0,
    physical_progress: 70.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 7800000
  },
  {
    work_id: 'KL-TVM-0182',
    district: 'Thiruvananthapuram (Coastal Solar Lighting & Cold Chain)',
    state: 'Kerala',
    financial_progress: 92.0,
    physical_progress: 90.0,
    status: 'IN_PROGRESS',
    sanctioned_amount: 6100000
  }
];

// Helper to guarantee every single constituency from CONSTITUENCY_REGIONS has complete works represented
const buildAllNationwideWorks = () => {
  const existingWorkCodes = new Set(INITIAL_WORKS.map(w => w.work_id));
  const generated: any[] = [];

  Object.values(CONSTITUENCY_REGIONS).forEach(region => {
    const segs = region.segments && region.segments.length > 0 
      ? region.segments 
      : ['Central', 'North', 'South', 'Rural'];

    const regionalTemplates = [
      {
        id: `${region.code}-101`,
        suffix: `(${segs[0]} Multi-Specialty Secondary Healthcare Sub-Centre)`,
        sanctioned: 8500000,
        fin: 78.0,
        phy: 75.0,
        status: 'IN_PROGRESS'
      },
      {
        id: `${region.code}-102`,
        suffix: `(${segs[1 % segs.length]} High-Capacity Solar RO Drinking Water Grid)`,
        sanctioned: 4200000,
        fin: 100.0,
        phy: 100.0,
        status: 'COMPLETED'
      },
      {
        id: `${region.code}-103`,
        suffix: `(${segs[2 % segs.length]} 18 Modern STEM Robotics & Computer Classrooms)`,
        sanctioned: 5200000,
        fin: 60.0,
        phy: 58.0,
        status: 'IN_PROGRESS'
      },
      {
        id: `${region.code}-104`,
        suffix: `(${segs[3 % segs.length]} Stormwater Drainage & Reinforced CC Road Corridor)`,
        sanctioned: 6800000,
        fin: 35.0,
        phy: 32.0,
        status: 'DELAYED'
      },
      {
        id: `${region.code}-105`,
        suffix: `(${segs[4 % segs.length]} Youth Skill Development & Livelihood Center)`,
        sanctioned: 4500000,
        fin: 20.0,
        phy: 18.0,
        status: 'IN_PROGRESS'
      },
      {
        id: `${region.code}-106`,
        suffix: `(${segs[5 % segs.length]} High-Mast Solar Lighting & CCTV Safety Poles)`,
        sanctioned: 3400000,
        fin: 90.0,
        phy: 90.0,
        status: 'IN_PROGRESS'
      }
    ];

    regionalTemplates.forEach(t => {
      if (!existingWorkCodes.has(t.id)) {
        generated.push({
          work_id: t.id,
          district: `${region.name} ${t.suffix}`,
          state: region.state,
          financial_progress: t.fin,
          physical_progress: t.phy,
          status: t.status,
          sanctioned_amount: t.sanctioned
        });
      }
    });
  });

  return [...INITIAL_WORKS, ...generated];
};

export const ProjectExplorer: React.FC = () => {
  const { currentRole, currentProfile, activeRegion, switchRegion, allRegions } = useRole();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [works, setWorks] = useState<any[]>(() => buildAllNationwideWorks());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DELAYED' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('ALL');
  const [showConstituencyPicker, setShowConstituencyPicker] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');
  
  // Initialize scope: MP defaults to JURISDICTION (their own regional constituency works!)
  const [filterScope, setFilterScope] = useState<'JURISDICTION' | 'ALL'>(() => {
    const scopeParam = searchParams.get('scope');
    if (scopeParam === 'national' || scopeParam === 'all') return 'ALL';
    if (scopeParam === 'constituency' || scopeParam === 'region') return 'JURISDICTION';
    if (currentRole === 'district_magistrate') return 'JURISDICTION';
    if (currentRole === 'member_parliament') return 'JURISDICTION'; // MP defaults to their constituency!
    return 'ALL';
  });

  // Keep filterScope synced with URL query if user clicks navigation links
  useEffect(() => {
    const scopeParam = searchParams.get('scope');
    if (scopeParam === 'national' || scopeParam === 'all') {
      setFilterScope('ALL');
    } else if (scopeParam === 'constituency' || scopeParam === 'region') {
      setFilterScope('JURISDICTION');
    }
  }, [searchParams]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/works/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setWorks(prev => {
            const existingIds = new Set(data.map((d: any) => d.work_id));
            const filteredPrev = prev.filter(p => !existingIds.has(p.work_id));
            return [...filteredPrev, ...data];
          });
        }
      })
      .catch(err => {
        console.warn("Could not load /api/works/, using initial works:", err);
      });
  }, []);

  const searchLower = searchTerm.toLowerCase().trim();

  // Region codes matching search term across MP names, DM names, segments, constituency names, and states
  const matchingRegionCodes = searchLower
    ? Object.values(CONSTITUENCY_REGIONS)
        .filter(r => 
          r.name.toLowerCase().includes(searchLower) ||
          r.mp.name.toLowerCase().includes(searchLower) ||
          (r.mp.nameHi && r.mp.nameHi.includes(searchLower)) ||
          r.dm.name.toLowerCase().includes(searchLower) ||
          (r.dm.nameHi && r.dm.nameHi.includes(searchLower)) ||
          r.dm.district.toLowerCase().includes(searchLower) ||
          r.state.toLowerCase().includes(searchLower) ||
          r.segments.some(seg => seg.toLowerCase().includes(searchLower))
        )
        .map(r => r.code)
    : [];

  const availableStates = ['ALL', ...Array.from(new Set(works.map(w => w.state).filter(Boolean))).sort()];

  // Filter works based on role context and user input
  const filteredWorks = works.filter(w => {
    // Search matching: Work ID, District, State, or MP/DM/Constituency match!
    const matchesSearch = !searchLower || 
      w.work_id?.toLowerCase().includes(searchLower) ||
      w.district?.toLowerCase().includes(searchLower) ||
      w.state?.toLowerCase().includes(searchLower) ||
      matchingRegionCodes.some(code => w.work_id?.startsWith(code));

    // Status matching
    const matchesStatus = statusFilter === 'ALL' || 
      (statusFilter === 'DELAYED' && (w.status === 'DELAYED' || w.status === 'STALLED')) ||
      (statusFilter === 'IN_PROGRESS' && (w.status === 'IN_PROGRESS' || w.status === 'ONGOING')) ||
      (statusFilter === 'COMPLETED' && w.status === 'COMPLETED');

    // State filter (applied when viewing Entire Country / other states)
    const matchesState = selectedStateFilter === 'ALL' || 
      w.state?.toLowerCase() === selectedStateFilter.toLowerCase();

    // STATUTORY ACCESS CONTROL RULE:
    // 1. DISTRICT MAGISTRATE: Strictly restricted to their assigned region ONLY.
    if (currentRole === 'district_magistrate') {
      const isRegional = 
        w.work_id?.startsWith(activeRegion.code) || 
        w.district?.toLowerCase().includes(activeRegion.name.toLowerCase());
      return matchesSearch && matchesStatus && isRegional;
    }

    // 2. MEMBER OF PARLIAMENT:
    // By default: focused on their own Parliamentary Constituency (e.g. Secunderabad, Telangana)
    // When checking other states: select ALL STATES filter!
    if (currentRole === 'member_parliament') {
      if (filterScope === 'JURISDICTION') {
        const isConstituency = 
          w.work_id?.startsWith(activeRegion.code) || 
          w.district?.toLowerCase().includes(activeRegion.name.toLowerCase());
        return matchesSearch && matchesStatus && isConstituency;
      }
      // When filterScope === 'ALL', MP sees ENTIRE COUNTRY DATA or specific selected state!
      return matchesSearch && matchesStatus && matchesState;
    }

    // 3. VIGILANCE AUDITOR: Focus on High-Risk works if filtered, else all-India
    if (currentRole === 'vigilance_auditor') {
      if (filterScope === 'JURISDICTION') {
        const isHighRisk = (w.risk_profile?.overall_score && w.risk_profile?.overall_score > 50) || 
          w.status === 'DELAYED' || 
          w.financial_progress > 95 || 
          w.status === 'STALLED';
        return matchesSearch && matchesStatus && isHighRisk;
      }
      return matchesSearch && matchesStatus && matchesState;
    }

    // 4. MoSPI Admin: Global Oversight
    if (filterScope === 'JURISDICTION') {
      const isRegion = w.work_id?.startsWith(activeRegion.code) || w.district?.toLowerCase().includes(activeRegion.name.toLowerCase());
      return matchesSearch && matchesStatus && isRegion;
    }

    return matchesSearch && matchesStatus && matchesState;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-slide-up pb-12">
      {/* Officer Scope & Clearance Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
        currentRole === 'district_magistrate' ? 'bg-amber-50/80 border-amber-300 text-amber-950' :
        currentRole === 'vigilance_auditor' ? 'bg-purple-50/70 border-purple-200 text-purple-950' :
        currentRole === 'member_parliament' ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' :
        'bg-blue-50/70 border-blue-200 text-blue-950'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-xs shrink-0 ${
            currentRole === 'district_magistrate' ? 'bg-amber-700' :
            currentRole === 'vigilance_auditor' ? 'bg-purple-800' :
            currentRole === 'member_parliament' ? 'bg-emerald-800' :
            'bg-[#0B3C68]'
          }`}>
            {currentRole === 'district_magistrate' ? <Building2 size={22} /> :
             currentRole === 'vigilance_auditor' ? <ShieldAlert size={22} /> :
             currentRole === 'member_parliament' ? <Landmark size={22} /> :
             <Globe size={22} />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 border border-current/20 shadow-2xs">
                {currentProfile.sealBadge} Clearance Scope
              </span>
              <span className="text-xs font-bold text-slate-700">
                {currentRole === 'district_magistrate' 
                  ? `Strict Regional Authority: ${activeRegion.name} District (${activeRegion.state})`
                  : currentRole === 'member_parliament'
                  ? `Sovereign Prerogative: Entire Country (543 Constituencies) + ${activeRegion.name} Hub`
                  : currentProfile.jurisdiction}
              </span>
            </div>
            <h2 className="text-lg font-black tracking-tight mt-0.5">
              {currentRole === 'district_magistrate' ? `${activeRegion.name} District MPLADS Projects Registry (Strict Local Scope)` :
               currentRole === 'vigilance_auditor' ? 'Central Anti-Corruption & High-Risk Procurement Grid' :
               currentRole === 'member_parliament' ? (
                 filterScope === 'ALL' 
                   ? 'Pan-India Macro Works Registry (Entire Country - 543 Constituencies)' 
                   : `${activeRegion.name} Parliamentary Constituency Public Works Pipeline`
               ) :
               'Pan-India Macro Works Registry (543 Parliamentary Constituencies)'}
            </h2>
          </div>
        </div>

        {/* Scope Controller / Lock Badge */}
        <div className="flex items-center gap-2 shrink-0">
          {currentRole === 'district_magistrate' ? (
            <div className="bg-amber-100/90 border border-amber-400 text-amber-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-2xs">
              <Lock size={14} className="text-amber-800" />
              <span>Locked to {activeRegion.name} District</span>
            </div>
          ) : currentRole === 'member_parliament' ? (
            <div className="flex items-center bg-white p-1 rounded-xl border-2 border-emerald-300 shadow-2xs">
              <button
                onClick={() => {
                  setFilterScope('JURISDICTION');
                  setSelectedStateFilter('ALL');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterScope === 'JURISDICTION'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Default view: Only projects in your parliamentary constituency"
              >
                <Building2 size={13} />
                <span>My Constituency: {activeRegion.name} ({activeRegion.state})</span>
              </button>
              <button
                onClick={() => setFilterScope('ALL')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterScope === 'ALL'
                    ? 'bg-[#0B3C68] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Select to check projects from other states across India"
              >
                <Globe size={13} />
                <span>All States / Entire Country</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setFilterScope(filterScope === 'JURISDICTION' ? 'ALL' : 'JURISDICTION')}
              className="bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow-2xs btn-press cursor-pointer flex items-center gap-1.5"
            >
              <Filter size={14} />
              <span>Scope: {filterScope === 'JURISDICTION' ? `${activeRegion.name} Only` : 'All-India Database'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Search, State Filter, MP / Constituency Filter & Status Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Status Filters & State Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 overflow-x-auto">
            {(['ALL', 'IN_PROGRESS', 'DELAYED', 'COMPLETED'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer shrink-0 ${
                  statusFilter === tab 
                    ? 'bg-slate-900 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {tab === 'ALL' ? `All Works (${filteredWorks.length})` : 
                 tab === 'IN_PROGRESS' ? 'Active / Ongoing' : 
                 tab === 'DELAYED' ? 'Delayed / Stalled' : 'Completed'}
              </button>
            ))}
          </div>

          {/* State Filter when in All States mode */}
          {filterScope === 'ALL' && (
            <div className="flex items-center gap-1.5 bg-blue-50/80 border border-blue-200 px-3 py-1.5 rounded-xl">
              <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider flex items-center gap-1 shrink-0">
                <Filter size={12} /> State:
              </span>
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
              >
                <option value="ALL">All States ({availableStates.length - 1} States & UTs)</option>
                {availableStates.filter(s => s !== 'ALL').map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              {selectedStateFilter !== 'ALL' && (
                <button
                  onClick={() => setSelectedStateFilter('ALL')}
                  className="text-[10px] font-bold text-blue-700 hover:text-blue-900 underline ml-1 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Controls: MP/Area Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Quick MP & Constituency Filter Modal Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowConstituencyPicker(!showConstituencyPicker)}
              className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-black border transition-all flex items-center justify-between sm:justify-start gap-2 cursor-pointer shadow-2xs ${
                filterScope === 'JURISDICTION'
                  ? 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100/70'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
              title="Filter works by MP or Parliamentary Constituency across the whole country"
            >
              <div className="flex items-center gap-1.5 truncate">
                <MapPin size={14} className={filterScope === 'JURISDICTION' ? 'text-amber-700 shrink-0' : 'text-slate-500 shrink-0'} />
                <span className="truncate">
                  {filterScope === 'JURISDICTION' 
                    ? `Area: ${activeRegion.name} (${activeRegion.mp.name.split(',')[0]})` 
                    : `Filter MP / Area (All 25+ Seats)`}
                </span>
              </div>
              <ChevronDown size={13} className="text-slate-400 shrink-0 ml-1" />
            </button>

            {showConstituencyPicker && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowConstituencyPicker(false)} />
                <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl border-2 border-slate-300 shadow-2xl p-3 z-50 animate-in fade-in max-h-[440px] flex flex-col">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">ALL-INDIA FILTER</span>
                      <span className="text-xs font-black text-slate-900">Select MP or Parliamentary Seat:</span>
                    </div>
                    <button 
                      onClick={() => setShowConstituencyPicker(false)} 
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="relative mt-2.5 mb-2">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                    <input
                      type="text"
                      placeholder="Search MP (e.g. Owaisi, Tharoor, Modi), Seat..."
                      value={pickerSearch}
                      onChange={(e) => setPickerSearch(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#0B3C68] focus:ring-1 focus:ring-blue-100"
                      autoFocus
                    />
                  </div>

                  <div className="overflow-y-auto space-y-1 py-1 flex-1 max-h-[300px] scrollbar-thin">
                    {/* All-India Reset Option for MPs */}
                    {currentRole !== 'district_magistrate' && (
                      <button
                        onClick={() => {
                          setFilterScope('ALL');
                          setShowConstituencyPicker(false);
                          setPickerSearch('');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center gap-2.5 cursor-pointer mb-1 ${
                          filterScope === 'ALL'
                            ? 'bg-[#0B3C68] text-white font-bold shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Globe size={15} className={filterScope === 'ALL' ? 'text-amber-300' : 'text-slate-500'} />
                        <div>
                          <div className="font-bold">Entire Country (All 543 Constituencies)</div>
                          <div className={`text-[10px] ${filterScope === 'ALL' ? 'text-blue-200' : 'text-slate-400'}`}>
                            National legislative oversight view
                          </div>
                        </div>
                      </button>
                    )}

                    {allRegions
                      .filter(r => 
                        !pickerSearch || 
                        r.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
                        r.mp.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
                        (r.mp.nameHi && r.mp.nameHi.includes(pickerSearch)) ||
                        r.dm.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
                        r.state.toLowerCase().includes(pickerSearch.toLowerCase()) ||
                        r.segments.some(s => s.toLowerCase().includes(pickerSearch.toLowerCase()))
                      )
                      .map(r => {
                        const isSelected = activeRegion.id === r.id && filterScope === 'JURISDICTION';
                        return (
                          <button
                            key={r.id}
                            onClick={() => {
                              switchRegion(r.id);
                              setFilterScope('JURISDICTION');
                              setShowConstituencyPicker(false);
                              setPickerSearch('');
                            }}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-100/90 border-2 border-amber-500 text-amber-950 font-bold shadow-2xs'
                                : 'hover:bg-slate-50 border-2 border-transparent text-slate-700'
                            }`}
                          >
                            <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 font-black shrink-0 mt-0.5 text-amber-900">
                              {r.code}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 truncate">
                                  {r.name} <span className="text-[10px] text-slate-400 font-normal">({r.state})</span>
                                </span>
                                {isSelected && <span className="text-[10px] text-amber-800 font-black">ACTIVE</span>}
                              </div>
                              <div className="text-[11px] text-emerald-800 font-bold truncate mt-0.5">
                                MP: {r.mp.name}
                              </div>
                              <div className="text-[9.5px] text-slate-500 truncate">
                                DM: {r.dm.name}
                              </div>
                            </div>
                          </button>
                        );
                      })
                    }
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input 
              type="text" 
              placeholder="Search MP Name (Owaisi, Modi), Seat, ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs font-medium border border-slate-200 rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-slate-50 focus:bg-white shadow-2xs transition-colors" 
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Scope Banners */}
      {filterScope === 'JURISDICTION' && (
        <div className="bg-emerald-50/90 border-2 border-emerald-300 text-emerald-950 px-4 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold shadow-2xs">
              <Building2 size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-black uppercase tracking-wider bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">
                  {currentRole === 'member_parliament' ? 'My Constituency View' : 'Local Jurisdiction'}
                </span>
                <span className="text-xs font-black text-slate-900">
                  {activeRegion.name} Parliamentary Constituency, {activeRegion.state} ({filteredWorks.length} Public Works)
                </span>
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Hon'ble MP: <strong className="text-emerald-900">{activeRegion.mp.name}</strong> • District Collector / DM: <strong className="text-slate-800">{activeRegion.dm.name}</strong>
              </div>
            </div>
          </div>
          {currentRole !== 'district_magistrate' && (
            <button
              onClick={() => setFilterScope('ALL')}
              className="text-xs font-bold text-white bg-[#0B3C68] hover:bg-blue-900 px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
              title="Click to check projects in other states across India"
            >
              <Globe size={13} />
              <span>Select All States Filter</span>
            </button>
          )}
        </div>
      )}

      {filterScope === 'ALL' && (
        <div className="bg-blue-50/90 border-2 border-blue-200 text-blue-950 px-4 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B3C68] text-white flex items-center justify-center shrink-0 font-bold shadow-2xs">
              <Globe size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-black uppercase tracking-wider bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded">
                  All States Filter Active
                </span>
                <span className="text-xs font-black text-slate-900">
                  {selectedStateFilter === 'ALL' 
                    ? `Pan-India Database (543 Constituencies • ${filteredWorks.length} Public Works)` 
                    : `Filtered to State: ${selectedStateFilter} (${filteredWorks.length} Public Works)`}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Viewing inter-state projects across India. You can select specific states above or switch back to your constituency.
              </div>
            </div>
          </div>
          {currentRole === 'member_parliament' && (
            <button
              onClick={() => {
                setFilterScope('JURISDICTION');
                setSelectedStateFilter('ALL');
              }}
              className="text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Building2 size={13} />
              <span>Back to My Region ({activeRegion.name})</span>
            </button>
          )}
        </div>
      )}
      
      {/* Table Card */}
      <Card className="border border-slate-200 shadow-xs rounded-2xl bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Work ID & Code</th>
                  <th className="px-6 py-4">Location & Administrative Unit</th>
                  <th className="px-6 py-4">Sanctioned Outlay</th>
                  <th className="px-6 py-4">Physical Milestone</th>
                  <th className="px-6 py-4">Current Status</th>
                  <th className="px-6 py-4 text-right">Statutory Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <RefreshCw className="w-6 h-6 text-slate-400 animate-spin mx-auto mb-2 text-blue-700" />
                      <span className="text-xs text-slate-500 font-medium">Loading telemetry records...</span>
                    </td>
                  </tr>
                ) : filteredWorks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500 font-medium">
                      No works matching the selected filter criteria in this jurisdiction ({activeRegion.name}).
                    </td>
                  </tr>
                ) : (
                  filteredWorks.map((work, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-blue-50/40 transition-colors group cursor-pointer ${
                        work.work_id?.startsWith(activeRegion.code) ? 'bg-emerald-50/15' : ''
                      }`}
                      onClick={() => navigate(`/projects/${work.work_id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-mono font-black text-slate-900 text-xs">
                          {work.work_id}
                        </div>
                        {work.work_id?.startsWith(activeRegion.code) && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase">
                            {activeRegion.name}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{work.district}</div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                          {work.state}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-black text-slate-900 text-xs">
                          ₹{((work.sanctioned_amount || 5000000) / 100000).toFixed(2)} Lakhs
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500">
                          Disbursed: {Math.round(work.financial_progress)}%
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                work.physical_progress >= 75 ? 'bg-emerald-600' : 
                                work.physical_progress >= 50 ? 'bg-blue-600' : 'bg-amber-500'
                              }`} 
                              style={{ width: `${Math.min(100, work.physical_progress)}%` }}
                            ></div>
                          </div>
                          <span className="font-black text-slate-900">{Math.round(work.physical_progress)}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          work.status === 'DELAYED' || work.status === 'STALLED' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                          work.status === 'COMPLETED' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            work.status === 'DELAYED' || work.status === 'STALLED' ? 'bg-amber-600' :
                            work.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-blue-600'
                          }`}></span>
                          {work.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-700 font-bold bg-white border border-slate-200 shadow-2xs hover:border-blue-300 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs transition-all btn-press flex items-center gap-1 ml-auto cursor-pointer">
                          <span>Inspect Dossier</span>
                          <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
