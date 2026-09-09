import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  FileCheck, 
  FileText, 
  ShieldAlert, 
  Send, 
  Printer, 
  ExternalLink, 
  Compass, 
  Check, 
  X, 
  Eye, 
  Satellite, 
  Download,
  AlertCircle,
  Lock,
  BadgeAlert
} from 'lucide-react';
import { useRole, type ConstituencyRegion } from '../../context/RoleContext';

interface MilestoneItem {
  id: string;
  code: string;
  title: string;
  taluka: string;
  contractor: string;
  estimate: string;
  tranche: string;
  stage: string;
  progress: number;
  geoCoords: string;
  fastagStatus: string;
  status: 'PENDING_DM' | 'APPROVED' | 'INSPECTION_ORDERED';
}

const REGION_MILESTONES: Record<string, MilestoneItem[]> = {
  'TG-HYD': [
    {
      id: 'hyd-m1',
      code: 'TG-HYD-201',
      title: 'Heritage Facade Restoration & Pedestrian Smart Walkway, Charminar & Laad Bazaar',
      taluka: 'Charminar Sub-Division',
      contractor: 'M/s Deccan Heritage Infra Projects Ltd',
      estimate: '₹85.00 Lakhs',
      tranche: '₹21.25 Lakhs (Tranche 3)',
      stage: 'Cobblestone pavement & heritage lighting poles erection',
      progress: 75,
      geoCoords: '17.3616° N, 78.4747° E',
      fastagStatus: 'Verified (24 Trucks Logged via Bahadurpura NH Checkpost)',
      status: 'PENDING_DM'
    },
    {
      id: 'hyd-m2',
      code: 'TG-HYD-202',
      title: 'Multi-Specialty Nephrology Hemodialysis Unit, Osmania General Hospital',
      taluka: 'Malakpet Sub-Division',
      contractor: 'Hyderabad Medical Systems & Infra Corp',
      estimate: '₹95.00 Lakhs',
      tranche: '₹28.50 Lakhs (Tranche 4)',
      stage: 'Medical gas pipeline network and 12 dialysis machines commissioned',
      progress: 85,
      geoCoords: '17.3776° N, 78.4795° E',
      fastagStatus: 'Verified via GeM Electronic Delivery Receipt',
      status: 'PENDING_DM'
    },
    {
      id: 'hyd-m3',
      code: 'TG-HYD-203',
      title: 'High-Capacity Stormwater Drainage & CC Road Network, Mir Alam Tank',
      taluka: 'Bahadurpura Mandal',
      contractor: 'Telangana Urban Water Infra LLP',
      estimate: '₹75.00 Lakhs',
      tranche: '₹22.50 Lakhs (Tranche 2)',
      stage: 'Box culvert excavation & precast drainage conduit laying',
      progress: 45,
      geoCoords: '17.3482° N, 78.4485° E',
      fastagStatus: 'Discrepancy Flagged: 22 Tonnes Cement Deficit at Kanchanbagh Weighbridge',
      status: 'PENDING_DM'
    },
    {
      id: 'hyd-m4',
      code: 'TG-HYD-204',
      title: '25 STEM Robotics & Computer Laboratories in Government High Schools',
      taluka: 'Chandrayangutta',
      contractor: 'Vidyapeeth Educational Infra Ltd',
      estimate: '₹55.00 Lakhs',
      tranche: '₹13.75 Lakhs (Final 100% Release)',
      stage: 'Interactive flat panels mounted & tested; DEO handover certificate attached',
      progress: 100,
      geoCoords: '17.3245° N, 78.4712° E',
      fastagStatus: 'Verified (DEO Inspection Certificate Attached)',
      status: 'PENDING_DM'
    }
  ],
  'TG-SEC': [
    {
      id: 'sec-m1',
      code: 'TG-SEC-301',
      title: 'Cardiac Critical Care Unit Upgradation at Gandhi Hospital, Secunderabad',
      taluka: 'Secunderabad Division',
      contractor: 'Deccan MediTech Systems Ltd',
      estimate: '₹90.00 Lakhs',
      tranche: '₹22.50 Lakhs (Tranche 3)',
      stage: 'Echocardiography consoles and ICU beds installed',
      progress: 80,
      geoCoords: '17.4241° N, 78.5042° E',
      fastagStatus: 'Verified (GeM Delivery Verification Passed)',
      status: 'PENDING_DM'
    },
    {
      id: 'sec-m2',
      code: 'TG-SEC-302',
      title: 'Solar Micro-Grid & High-Efficiency LED Illumination, Jubilee Hills',
      taluka: 'Khairatabad Zone',
      contractor: 'SunTech Clean Energy Solutions',
      estimate: '₹48.00 Lakhs',
      tranche: '₹12.00 Lakhs (Final Release)',
      stage: 'Grid synchronization complete; TSSPDCL safety clearance passed',
      progress: 100,
      geoCoords: '17.4325° N, 78.4073° E',
      fastagStatus: 'Verified (TSSPDCL Electrical Safety Certificate Attached)',
      status: 'PENDING_DM'
    }
  ],
  'AP-VIJ': [
    {
      id: 'vij-m1',
      code: 'AP-VIJ-101',
      title: 'Multi-Specialty Dialysis & Emergency Trauma Unit, GGH Vijayawada',
      taluka: 'Vijayawada Central',
      contractor: 'M/s Krishna Valley Healthcare Infra Pvt Ltd',
      estimate: '₹85.00 Lakhs',
      tranche: '₹21.25 Lakhs (Tranche 3)',
      stage: 'Dialysis RO piping & medical gas pipeline wall fitting',
      progress: 80,
      geoCoords: '16.5062° N, 80.6480° E',
      fastagStatus: 'Verified (18 Material Trucks Logged via Kaza Toll Plaza)',
      status: 'PENDING_DM'
    },
    {
      id: 'vij-m2',
      code: 'AP-VIJ-102',
      title: 'Solar-Powered High-Efficiency Lift Irrigation & Canal Dredging',
      taluka: 'Mylavaram Mandal',
      contractor: 'Andhra Agro Tech Infra Ltd',
      estimate: '₹65.00 Lakhs',
      tranche: '₹19.50 Lakhs (Tranche 2)',
      stage: 'Pump well excavation & 50 HP solar inverter housing',
      progress: 60,
      geoCoords: '16.7645° N, 80.6432° E',
      fastagStatus: 'Verified (Telemetry Logged via AP Water Resources Board)',
      status: 'PENDING_DM'
    },
    {
      id: 'vij-m3',
      code: 'AP-VIJ-104',
      title: 'Underground Stormwater Drainage & CC Road Network, Bhavanipuram',
      taluka: 'Vijayawada West',
      contractor: 'Amaravati Civic Infra Corp',
      estimate: '₹72.00 Lakhs',
      tranche: '₹21.60 Lakhs (Tranche 1)',
      stage: 'Sub-base compaction & storm drainage pipeline alignment',
      progress: 35,
      geoCoords: '16.5186° N, 80.6120° E',
      fastagStatus: 'Discrepancy Flagged: 24 Tonnes Gravel Deficit at Kanaka Durga Weighbridge',
      status: 'PENDING_DM'
    },
    {
      id: 'vij-m4',
      code: 'AP-VIJ-106',
      title: 'High-Mast Solar Lighting & CCTV Security Grid near PNBS Hub',
      taluka: 'Vijayawada East',
      contractor: 'Prakasam Clean Energy LLP',
      estimate: '₹35.00 Lakhs',
      tranche: '₹8.75 Lakhs (Final 100% Release)',
      stage: 'Mast erection complete; electrical grid synchronization',
      progress: 100,
      geoCoords: '16.5085° N, 80.6276° E',
      fastagStatus: 'Verified (APCPDCL Electrical Safety Certificate Attached)',
      status: 'PENDING_DM'
    }
  ],
  'KA-BC': [
    {
      id: 'ka-m1',
      code: 'KA-BC-104',
      title: 'High-Capacity Borewell & 1,000 LPH RO Water Purification Plant',
      taluka: 'Shivajinagar',
      contractor: 'Bangalore Water Infra Ltd',
      estimate: '₹28.50 Lakhs',
      tranche: '₹7.12 Lakhs (Final Release)',
      stage: 'RO membrane commissioned; BBMP test certificate attached',
      progress: 100,
      geoCoords: '12.9856° N, 77.6057° E',
      fastagStatus: 'Verified (Navayuga Devanahalli Toll Plaza Logged)',
      status: 'PENDING_DM'
    },
    {
      id: 'ka-m2',
      code: 'KA-BC-109',
      title: 'Digital Smart Classrooms in 4 Government PU Colleges',
      taluka: 'Gandhinagar',
      contractor: 'Karnataka Educational Infra Ltd',
      estimate: '₹65.00 Lakhs',
      tranche: '₹16.25 Lakhs (Tranche 3)',
      stage: 'Interactive flat panels mounted, Wi-Fi cabling in progress',
      progress: 85,
      geoCoords: '12.9774° N, 77.5786° E',
      fastagStatus: 'Material Delivery Verified via GeM Portal',
      status: 'PENDING_DM'
    },
    {
      id: 'ka-m3',
      code: 'KA-BC-112',
      title: 'Covered Pedestrian Skywalk & Footpaths near Bowring Hospital',
      taluka: 'Shivajinagar',
      contractor: 'Deccan Roadways Corp',
      estimate: '₹42.00 Lakhs',
      tranche: '₹12.60 Lakhs (Tranche 2)',
      stage: 'Steel truss fabrication & column casting completed',
      progress: 40,
      geoCoords: '12.9829° N, 77.6033° E',
      fastagStatus: 'Discrepancy Flagged: 18 Tonnes Steel Deficit at Weighbridge',
      status: 'PENDING_DM'
    },
    {
      id: 'ka-m4',
      code: 'KA-BC-118',
      title: 'Modern 20-Bed Maternity Ward, Ulsoor General Hospital',
      taluka: 'Shantinagar',
      contractor: 'Shantinagar Health Infra LLP',
      estimate: '₹75.00 Lakhs',
      tranche: '₹22.50 Lakhs (Tranche 2)',
      stage: 'Interior partition, medical gas pipeline laying',
      progress: 70,
      geoCoords: '12.9784° N, 77.6253° E',
      fastagStatus: 'Verified via Attibele Toll Plaza',
      status: 'PENDING_DM'
    }
  ],
  'MH-PUN': [
    {
      id: 'mh-m1',
      code: 'MH-PUN-0901',
      title: 'Multi-Specialty Primary Health Sub-Centre, Baramati',
      taluka: 'Baramati Taluka',
      contractor: 'M/s Shri Ganesh Infra Projects Ltd',
      estimate: '₹85.00 Lakhs',
      tranche: '₹21.25 Lakhs (Tranche 3)',
      stage: 'Roof Slab Casting & Electrical Conduit Laying',
      progress: 75,
      geoCoords: '18.1526° N, 74.5772° E',
      fastagStatus: 'Verified (14 Cement Trucks Logged via Uruli Toll)',
      status: 'PENDING_DM'
    },
    {
      id: 'mh-m2',
      code: 'MH-PUN-0842',
      title: 'Solar Micro-Grid & High-Mast Illumination, Khed',
      taluka: 'Khed Taluka',
      contractor: 'SunTech Clean Energy Solutions',
      estimate: '₹32.00 Lakhs',
      tranche: '₹8.00 Lakhs (Final 100% Release)',
      stage: 'Inverter Grid Synchronization & Battery Commissioning',
      progress: 100,
      geoCoords: '18.8471° N, 73.9145° E',
      fastagStatus: 'Verified (Electrical Inspector Certificate Attached)',
      status: 'PENDING_DM'
    },
    {
      id: 'mh-m3',
      code: 'MH-PUN-0788',
      title: 'Science & Robotics Laboratory, Zilla Parishad School',
      taluka: 'Shirur Taluka',
      contractor: 'Vidyapeeth Educational Infra LLP',
      estimate: '₹45.00 Lakhs',
      tranche: '₹15.00 Lakhs (Tranche 2)',
      stage: 'Civil Work & Modular Workstation Fitting',
      progress: 52,
      geoCoords: '18.8267° N, 74.3789° E',
      fastagStatus: 'Material Delivery Verified via GeM Portal',
      status: 'PENDING_DM'
    },
    {
      id: 'mh-m4',
      code: 'MH-PUN-0914',
      title: 'All-Weather Concrete Link Road & Culvert, Haveli',
      taluka: 'Haveli Taluka',
      contractor: 'Deccan Roadways Corp',
      estimate: '₹62.00 Lakhs',
      tranche: '₹18.60 Lakhs (Tranche 1)',
      stage: 'Sub-base Compaction & Aggregate Laying',
      progress: 30,
      geoCoords: '18.5204° N, 73.8567° E',
      fastagStatus: 'Discrepancy Flagged: 32 Tonnes Deficit at Weighbridge',
      status: 'PENDING_DM'
    }
  ],
  'UP-VAR': [
    {
      id: 'up-m1',
      code: 'UP-VAR-0301',
      title: 'Kashi Integrated Heritage Pilgrimage Corridor & Solar Walkways',
      taluka: 'Varanasi Cantt',
      contractor: 'M/s Ganga Heritage Infra Ltd',
      estimate: '₹95.00 Lakhs',
      tranche: '₹23.75 Lakhs (Tranche 4)',
      stage: 'Sandstone cladding & solar walkway bollards testing',
      progress: 90,
      geoCoords: '25.3176° N, 82.9739° E',
      fastagStatus: 'Verified (22 Sandstone Trucks Logged via Dafi Toll Plaza)',
      status: 'PENDING_DM'
    },
    {
      id: 'up-m2',
      code: 'UP-VAR-0314',
      title: 'Ganga Ghat Automated Water Quality Skimmer & Solar Pump Hub',
      taluka: 'Varanasi South',
      contractor: 'Varanasi Clean Waters LLP',
      estimate: '₹70.00 Lakhs',
      tranche: '₹17.50 Lakhs (Tranche 2)',
      stage: 'Pontoon mounting and water telemetry sensor linkage',
      progress: 65,
      geoCoords: '25.2952° N, 83.0075° E',
      fastagStatus: 'Verified (CPCB Telemetry Sync Active)',
      status: 'PENDING_DM'
    },
    {
      id: 'up-m3',
      code: 'UP-VAR-0322',
      title: 'Rural Cold Storage & Agri-Logistics Terminal, Sevapuri',
      taluka: 'Sevapuri Taluka',
      contractor: 'Purvanchal Agro Infra Ltd',
      estimate: '₹80.00 Lakhs',
      tranche: '₹20.00 Lakhs (Tranche 3)',
      stage: 'Cold storage insulation panels & compressor testing',
      progress: 85,
      geoCoords: '25.3340° N, 82.8020° E',
      fastagStatus: 'Verified via Babatpur Toll Plaza',
      status: 'PENDING_DM'
    },
    {
      id: 'up-m4',
      code: 'UP-VAR-0330',
      title: 'Smart Handloom Weaver Modernization & Loom Power Hub',
      taluka: 'Varanasi North',
      contractor: 'Kashi Textiles Infra',
      estimate: '₹55.00 Lakhs',
      tranche: '₹16.50 Lakhs (Tranche 1)',
      stage: 'Roof truss erection and electrical substation cabling',
      progress: 30,
      geoCoords: '25.3501° N, 83.0112° E',
      fastagStatus: 'Discrepancy Flagged: 16 Tonnes Cement Deficit at Weighbridge',
      status: 'PENDING_DM'
    }
  ],
  'DL-ND': [
    {
      id: 'dl-m1',
      code: 'DL-ND-0201',
      title: 'Automated Solar Green Corridor & Rainwater Harvesting System',
      taluka: 'New Delhi Zone',
      contractor: 'Delhi Green Infra Corp',
      estimate: '₹65.00 Lakhs',
      tranche: '₹16.25 Lakhs (Tranche 3)',
      stage: 'Percolation pits tested, solar bollards installed',
      progress: 85,
      geoCoords: '28.5880° N, 77.2280° E',
      fastagStatus: 'Verified (MCD Technical Inspection Passed)',
      status: 'PENDING_DM'
    },
    {
      id: 'dl-m2',
      code: 'DL-ND-0210',
      title: 'Multi-Specialty Mobile Healthcare & Diagnostic Vans',
      taluka: 'Kasturba Nagar',
      contractor: 'Capital Health Mobility Ltd',
      estimate: '₹75.00 Lakhs',
      tranche: '₹22.50 Lakhs (Tranche 2)',
      stage: 'Medical van chassis fitted with portable diagnostic units',
      progress: 70,
      geoCoords: '28.5720° N, 77.2340° E',
      fastagStatus: 'Verified via GeM Electronic Receipt',
      status: 'PENDING_DM'
    },
    {
      id: 'dl-m3',
      code: 'DL-ND-0218',
      title: 'Modern Skill & Digital Coding Literacy Hub for Youth',
      taluka: 'RK Puram',
      contractor: 'Digital Bharat Infra LLP',
      estimate: '₹50.00 Lakhs',
      tranche: '₹15.00 Lakhs (Tranche 1)',
      stage: 'Lab workstation installation & optical fiber cabling',
      progress: 40,
      geoCoords: '28.5630° N, 77.1780° E',
      fastagStatus: 'Discrepancy Flagged: 12 Desktop Terminals Missing Serial Verification',
      status: 'PENDING_DM'
    },
    {
      id: 'dl-m4',
      code: 'DL-ND-0225',
      title: 'Secondary Waste Segregation & Mechanized Compactor',
      taluka: 'Malviya Nagar',
      contractor: 'EcoClean Waste Systems',
      estimate: '₹45.00 Lakhs',
      tranche: '₹11.25 Lakhs (Final 100% Release)',
      stage: 'Commissioned & handed over to MCD sanitation division',
      progress: 100,
      geoCoords: '28.5280° N, 77.2080° E',
      fastagStatus: 'Verified (MCD Sanitation Certificate Attached)',
      status: 'PENDING_DM'
    }
  ]
};

export const getOrGenerateDMMilestones = (region: ConstituencyRegion): MilestoneItem[] => {
  if (REGION_MILESTONES[region.id]) {
    return REGION_MILESTONES[region.id];
  }
  const segs = region.segments && region.segments.length > 0
    ? region.segments
    : ['Central Sub-Division', 'North Taluka', 'South Sub-Division', 'East Taluka'];

  return [
    {
      id: `${region.code.toLowerCase()}-m1`,
      code: `${region.code}-101`,
      title: `Multi-Specialty Primary Healthcare Sub-Centre & Diagnostic Unit, ${segs[0]}`,
      taluka: `${segs[0]} Sub-Division`,
      contractor: `M/s ${region.name} Regional Healthcare Infra Corp`,
      estimate: '₹85.00 Lakhs',
      tranche: '₹21.25 Lakhs (Tranche 3)',
      stage: 'Lead-lined partition installed; medical pipeline fitting complete',
      progress: 78,
      geoCoords: '20.5937° N, 78.9629° E',
      fastagStatus: `Verified (Material Transport Logged via ${region.name} NH Checkpost)`,
      status: 'PENDING_DM'
    },
    {
      id: `${region.code.toLowerCase()}-m2`,
      code: `${region.code}-102`,
      title: `High-Capacity Solar RO Pure Drinking Water Grid, ${segs[1 % segs.length]}`,
      taluka: `${segs[1 % segs.length]} Mandal`,
      contractor: `Apex Clean Water Infra LLP`,
      estimate: '₹42.00 Lakhs',
      tranche: '₹10.50 Lakhs (Final 100% Release)',
      stage: 'Water quality certification and local panchayat handover complete',
      progress: 100,
      geoCoords: '20.6120° N, 78.9810° E',
      fastagStatus: 'Verified (District Quality Control Board Passed)',
      status: 'PENDING_DM'
    },
    {
      id: `${region.code.toLowerCase()}-m3`,
      code: `${region.code}-104`,
      title: `Underground Stormwater Drainage & CC Road Corridor, ${segs[2 % segs.length]}`,
      taluka: `${segs[2 % segs.length]} Division`,
      contractor: `${region.state} Infrastructure & Roadways Ltd`,
      estimate: '₹68.00 Lakhs',
      tranche: '₹20.40 Lakhs (Tranche 1)',
      stage: 'Sub-base compaction and precast drainage culverts laying',
      progress: 35,
      geoCoords: '20.5750° N, 78.9410° E',
      fastagStatus: 'Discrepancy Flagged: 18 Tonnes Gravel Deficit at District Weighbridge',
      status: 'PENDING_DM'
    },
    {
      id: `${region.code.toLowerCase()}-m4`,
      code: `${region.code}-103`,
      title: `18 Modern STEM Robotics & Computer Labs in Government Schools, ${segs[3 % segs.length]}`,
      taluka: `${segs[3 % segs.length]} Sub-Division`,
      contractor: 'Vidyapeeth Educational Infra Ltd',
      estimate: '₹52.00 Lakhs',
      tranche: '₹13.00 Lakhs (Tranche 2)',
      stage: 'Interactive flat panels mounted; Wi-Fi cabling verification in progress',
      progress: 60,
      geoCoords: '20.6010° N, 78.9550° E',
      fastagStatus: 'Material Delivery Verified via GeM Portal',
      status: 'PENDING_DM'
    }
  ];
};

export const DMDashboard: React.FC = () => {
  const { currentProfile, activeRegion } = useRole();
  const [milestones, setMilestones] = useState<MilestoneItem[]>(() => getOrGenerateDMMilestones(activeRegion));
  const [selectedGeo, setSelectedGeo] = useState<MilestoneItem | null>(null);
  const [showCauseModal, setShowCauseModal] = useState<any | null>(null);
  const [ucModalWork, setUcModalWork] = useState<MilestoneItem | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Sync milestones when activeRegion changes
  useEffect(() => {
    setMilestones(getOrGenerateDMMilestones(activeRegion));
  }, [activeRegion.id]);

  const handleApproveMilestone = (id: string) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, status: 'APPROVED' } : m));
    const approved = milestones.find(m => m.id === id);
    setSuccessToast(`Tranche release of ${approved?.tranche} for ${approved?.code} approved and forwarded to District Treasury PFMS (${activeRegion.name}).`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleOrderInspection = (id: string) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, status: 'INSPECTION_ORDERED' } : m));
    const work = milestones.find(m => m.id === id);
    setSuccessToast(`Surprise field inspection order issued to Sub-Divisional Magistrate (SDM) in ${activeRegion.name} for ${work?.code}.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-slide-up pb-12">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{successToast}</span>
        </div>
      )}

      {/* STATUTORY REGIONAL SCOPE LOCK BANNER */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <Lock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-black text-[10px] uppercase tracking-wider">
                Strict Regional Clearance Lock
              </span>
              <span className="text-xs font-bold text-amber-900">
                Rule 238 GFR District Implementation Scope
              </span>
            </div>
            <p className="text-xs text-amber-950 font-medium mt-0.5">
              Statutory Restriction: As District Collector & Magistrate, your clearance is strictly confined to <strong>{activeRegion.name} District ({activeRegion.state})</strong>. Cross-district data queries and all-India national master ledgers are reserved for Lok Sabha MPs and MoSPI Union Directors.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-amber-900 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>District Jurisdiction: {activeRegion.code}</span>
        </div>
      </div>

      {/* Official DM Command Header */}
      <div className="bg-gradient-to-r from-[#0B3C68] via-[#0D4B82] to-[#125B9A] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <img src="/gov/emblem_india.svg" alt="Emblem" className="h-44 object-contain filter invert" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black tracking-wider uppercase">
                District Planning Authority | {activeRegion.name} District
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-slate-200 text-[10px] font-bold">
                Financial Year 2026-27 | Quarter 3
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                District Treasury Live Sync ({activeRegion.state})
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              जिल्हाधिकारी कार्यालय / District Collectorate, {activeRegion.name} | District Operations Hub
            </h1>
            <p className="text-sm text-blue-100 max-w-3xl font-medium leading-relaxed">
              Presided by <strong className="text-white font-bold">{currentProfile.name}</strong>, {activeRegion.dm.title}. Statutory authority for administrative approval, physical milestone clearances, contractor show-cause notices, and Form GFR 12-C certification across all {activeRegion.segments.length} administrative segments of {activeRegion.name} ({activeRegion.segments.slice(0, 4).join(', ')}, etc.).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => {
                const completed = milestones.find(m => m.progress === 100) || milestones[0];
                setUcModalWork(completed);
              }}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md btn-press cursor-pointer"
            >
              <FileCheck size={16} /> Sign GFR 12-C UC
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all btn-press cursor-pointer"
            >
              <Printer size={15} /> Print Summary
            </button>
          </div>
        </div>
      </div>

      {/* District KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">District Sanction Pool</span>
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3C68] flex items-center justify-center font-bold">
                <Building2 size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">₹{activeRegion.activeSanctionCr.toFixed(2)} <span className="text-base font-bold text-slate-500">Cr</span></div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">{activeRegion.totalWorks} Sanctioned Works across {activeRegion.segments.length} Mandals/Talukas</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fund Utilization</span>
              <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <FileCheck size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">68.4% <span className="text-sm font-semibold text-emerald-600">(₹{(activeRegion.activeSanctionCr * 0.684).toFixed(2)} Cr)</span></div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '68.4%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-amber-200 bg-amber-50/50 shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Milestones Awaiting DM</span>
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Clock size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-amber-950 tracking-tight">
              {milestones.filter(m => m.status === 'PENDING_DM').length} <span className="text-sm font-semibold text-amber-800">Pending Sign-off</span>
            </div>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">Requires DM physical verification check</p>
          </CardContent>
        </Card>

        <Card className="border border-red-200 bg-red-50/50 shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider">Contractor Show-Cause</span>
              <span className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <AlertTriangle size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-red-950 tracking-tight">2 <span className="text-sm font-semibold text-red-800">Active Notices</span></div>
            <p className="text-[11px] text-red-700 mt-1 font-medium">Clause 14B Penalties under adjudication</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature 1: Urgent Milestone Verification Desk */}
      <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <CardTitle className="text-base font-black text-slate-900">
                Action Station: Physical Milestone Sanction & Disbursal Queue ({activeRegion.name})
              </CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Review geo-tagged ISRO Bhuvan satellite verification and approve PFMS tranche releases under Rule 238 GFR.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            {activeRegion.name} Collectorate Cell
          </span>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-5">Work ID & Details</th>
                  <th className="py-3.5 px-4">Taluka / Mandal & Contractor</th>
                  <th className="py-3.5 px-4">Financial Progress</th>
                  <th className="py-3.5 px-4">Physical Milestone</th>
                  <th className="py-3.5 px-4">Geo / FASTag Telemetry</th>
                  <th className="py-3.5 px-5 text-right">DM Statutory Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {milestones.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-mono font-bold text-blue-900 text-xs">{m.code}</div>
                      <div className="font-black text-slate-900 text-xs mt-0.5 leading-snug">{m.title}</div>
                      <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Est: {m.estimate}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800">{m.taluka}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[170px] mt-0.5">{m.contractor}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${m.progress >= 75 ? 'bg-emerald-600' : 'bg-blue-600'}`} 
                            style={{ width: `${m.progress}%` }}
                          ></div>
                        </div>
                        <span className="font-black text-slate-900">{m.progress}%</span>
                      </div>
                      <div className="text-[10px] text-amber-800 font-bold mt-1">Pending: {m.tranche}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="text-slate-800 font-semibold leading-tight max-w-[200px]">{m.stage}</div>
                    </td>

                    <td className="py-4 px-4">
                      <button 
                        onClick={() => setSelectedGeo(m)}
                        className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold text-[11px] cursor-pointer"
                      >
                        <Satellite size={13} />
                        <span>{m.geoCoords}</span>
                      </button>
                      <div className={`text-[10px] font-medium mt-1 ${m.fastagStatus.includes('Discrepancy') ? 'text-red-700 font-bold flex items-center gap-1' : 'text-slate-500'}`}>
                        {m.fastagStatus.includes('Discrepancy') && <AlertCircle size={11} className="shrink-0" />}
                        <span>{m.fastagStatus}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-right">
                      {m.status === 'APPROVED' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs">
                          <Check size={14} className="text-emerald-700" /> Tranche Released
                        </span>
                      ) : m.status === 'INSPECTION_ORDERED' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-900 font-bold text-xs">
                          <Clock size={14} className="text-purple-700" /> SDM Field Inspection
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleApproveMilestone(m.id)}
                            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                            title="Approve PFMS Tranche Disbursal"
                          >
                            <Check size={12} /> Approve
                          </button>
                          
                          <button
                            onClick={() => handleOrderInspection(m.id)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer border border-slate-300"
                            title="Order SDM Ground Verification"
                          >
                            <Eye size={12} />
                          </button>

                          {m.fastagStatus.includes('Discrepancy') && (
                            <button
                              onClick={() => setShowCauseModal({
                                work: m,
                                contractor: m.contractor,
                                cause: 'Weighbridge material weight discrepancy detected against GeM e-Way dispatch bill.',
                                penalty: 'Clause 14B Liquidated Damages (₹4.20 Lakhs)'
                              })}
                              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-2 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer"
                              title="Issue Clause 14B Show-Cause Notice"
                            >
                              <ShieldAlert size={12} />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Feature 2: Administrative Mandals & Contractors Supervision Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Taluka Block Summary */}
        <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0B3C68]" />
              <CardTitle className="text-base font-black text-slate-900">
                Administrative Mandals & Segments Performance ({activeRegion.name})
              </CardTitle>
            </div>
            <span className="text-xs font-bold text-slate-500">{activeRegion.segments.length} Administrative Blocks</span>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-3.5">
            {activeRegion.segments.slice(0, 5).map((seg, idx) => {
              const pcts = [78.4, 72.1, 64.8, 59.3, 84.6];
              const costs = ['₹4.80 Cr', '₹3.90 Cr', '₹5.20 Cr', '₹3.10 Cr', '₹4.40 Cr'];
              const pct = pcts[idx % pcts.length];
              const cost = costs[idx % costs.length];
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{seg}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-semibold">{cost}</span>
                      <span className="font-black text-slate-900 w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${pct >= 75 ? 'bg-emerald-600' : pct >= 60 ? 'bg-blue-600' : 'bg-amber-500'}`} 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Contractor Compliance & Blacklist Triage */}
        <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <CardTitle className="text-base font-black text-slate-900">
                Contractor Show-Cause & Clause 14B Penalties
              </CardTitle>
            </div>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              2 Active Show-Causes
            </span>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-3.5 text-xs">
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-950">
                  {activeRegion.id === 'AP-VIJ' ? 'Amaravati Civic Infra Corp' : 'Deccan Roadways Corp'}
                </span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                  Notice #DM-{activeRegion.code}-2026-08
                </span>
              </div>
              <p className="text-slate-700">
                Material deficit of aggregate gravel flagged at weighbridge. Show-cause notice served under Clause 14B of standard contract with 7 days to furnish weighbridge calibration logs.
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900">Pending Penalty: ₹3.85 Lakhs</span>
                <button 
                  onClick={() => setShowCauseModal({
                    work: milestones[2] || milestones[0],
                    contractor: activeRegion.id === 'AP-VIJ' ? 'Amaravati Civic Infra Corp' : 'Deccan Roadways Corp',
                    cause: 'Aggregate gravel deficit against GeM invoice delivery bill.',
                    penalty: 'Clause 14B Liquidated Damages (₹3.85 Lakhs)'
                  })}
                  className="text-red-700 hover:text-red-900 font-bold cursor-pointer underline"
                >
                  Review Notice Dossier →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950">
                  {activeRegion.id === 'AP-VIJ' ? 'Andhra Agro Tech Infra Ltd' : 'SunTech Clean Energy'}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                  Advisory #DM-{activeRegion.code}-2026-11
                </span>
              </div>
              <p className="text-slate-700">
                Delay of 18 days in submitting high-resolution ISRO Bhuvan geo-tagged photographic evidence for milestone tranche clearance.
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900">Cure Period: 48 Hours Remaining</span>
                <span className="text-amber-800 font-bold">Executive Engineer Inspection Ordered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ISRO Bhuvan Geo-Tagged Modal */}
      {selectedGeo && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#0B3C68] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Satellite className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-black tracking-tight">
                  ISRO BHUVAN SATELLITE TELEMETRY | {selectedGeo.code}
                </h3>
              </div>
              <button onClick={() => setSelectedGeo(null)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative border border-slate-700 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80" 
                  alt="Satellite Geo Imagery" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white px-2.5 py-1 rounded-md text-[10px] font-mono border border-white/20">
                  LAT: {selectedGeo.geoCoords.split(',')[0]} | LONG: {selectedGeo.geoCoords.split(',')[1]}
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-md text-[10px] font-bold">
                  ✓ Geo-Tagged within 2.5m Accuracy
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="font-bold text-slate-800 text-sm">{selectedGeo.title}</div>
                <p className="text-slate-600">{selectedGeo.stage}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Assigned Contractor:</span>
                  <span className="font-bold text-slate-900">{selectedGeo.contractor}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Administrative Taluka:</span>
                  <span className="font-bold text-slate-900">{selectedGeo.taluka}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedGeo(null)}
                  className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    handleApproveMilestone(selectedGeo.id);
                    setSelectedGeo(null);
                  }}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Check size={14} /> Approve Verified Tranche
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form GFR 12-C Statutory Utilization Certificate Modal */}
      {ucModalWork && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#0B3C68] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-black tracking-tight">
                  FORM GFR 12-C [RULE 239] | STATUTORY UTILIZATION CERTIFICATE
                </h3>
              </div>
              <button onClick={() => setUcModalWork(null)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="text-center pb-3 border-b border-slate-200 space-y-1">
                <div className="font-black text-slate-900 text-sm tracking-wide">
                  GOVERNMENT OF {activeRegion.state.toUpperCase()}
                </div>
                <div className="font-bold text-slate-700">
                  OFFICE OF THE DISTRICT MAGISTRATE & COLLECTOR, {activeRegion.name.toUpperCase()}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Certificate Ref: GFR12C/{activeRegion.code}/2026/Q3-094
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-justify">
                Certified that out of <strong>{ucModalWork.estimate}</strong> of grants-in-aid sanctioned during the financial year 2026-27 in favour of <strong>{ucModalWork.contractor}</strong> under MoSPI letter number sanctioning the public work <strong>"{ucModalWork.title}" ({ucModalWork.code})</strong>, a sum of <strong>{ucModalWork.estimate}</strong> has been utilized for the purpose of which it was sanctioned.
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                <div className="font-bold text-slate-900">District Magistrate Statutory Attestation:</div>
                <div className="text-slate-600">
                  1. Certified that the physical assets have been verified via ISRO Bhuvan geo-tag coordinates ({ucModalWork.geoCoords}).<br />
                  2. Certified that the inventory and weighbridge bills have been checked against GeM dispatch records.<br />
                  3. Handover deed executed with the Executive Engineer, {activeRegion.name} Municipal / Rural Division.
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="text-[10px] font-mono text-slate-500">
                  Digital Signatory: {activeRegion.dm.name}<br />
                  Designation: {activeRegion.dm.title}, {activeRegion.dm.district}
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setUcModalWork(null)}
                    className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setSuccessToast(`Form GFR 12-C digitally signed with NIC e-Token for ${ucModalWork.code} and transmitted to MoSPI PFMS.`);
                      setUcModalWork(null);
                      setTimeout(() => setSuccessToast(null), 4000);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-lg text-xs shadow-md flex items-center gap-1.5"
                  >
                    <FileCheck size={14} /> Digitally Sign with NIC Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show-Cause Notice Review Modal */}
      {showCauseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-red-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-black tracking-tight">
                  CONTRACTOR CLAUSE 14B SHOW-CAUSE NOTICE
                </h3>
              </div>
              <button onClick={() => setShowCauseModal(null)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-red-50 p-3.5 rounded-xl border border-red-200 space-y-1">
                <div className="font-bold text-red-950 text-sm">Contractor: {showCauseModal.contractor}</div>
                <div className="text-slate-600">Work ID: <strong className="font-mono text-slate-900">{showCauseModal.work.code}</strong> - {showCauseModal.work.title}</div>
                <div className="text-red-800 font-semibold mt-1">Ground: {showCauseModal.cause}</div>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Take notice that under Clause 14B of the GCC (General Conditions of Contract), you are hereby required to appear before the <strong>District Collector & District Magistrate, {activeRegion.name}</strong> within 7 working days, failing which liquidated damages will be encashed directly from your Performance Security Bank Guarantee.
              </p>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600">
                <strong>Enforcement Action:</strong> {showCauseModal.penalty} and recommendation to CVO for GeM debarment.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => setShowCauseModal(null)}
                  className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Dismiss
                </button>
                <button 
                  onClick={() => {
                    setSuccessToast(`Statutory Show-Cause Notice dispatched to ${showCauseModal.contractor}. Notice published on District Portal.`);
                    setShowCauseModal(null);
                    setTimeout(() => setSuccessToast(null), 4000);
                  }}
                  className="bg-red-800 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Send size={14} /> Dispatch Official Show-Cause
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
