import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  PlusCircle, 
  Send, 
  Download, 
  Printer, 
  HeartHandshake, 
  Sparkles, 
  Droplet, 
  GraduationCap, 
  Activity, 
  Compass, 
  X, 
  Check,
  Globe,
  Landmark,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Filter,
  Search,
  ExternalLink,
  Award
} from 'lucide-react';
import { useRole, type ConstituencyRegion } from '../../context/RoleContext';

interface MPWork {
  id: string;
  code: string;
  title: string;
  segment: string;
  sector: string;
  sanctioned: string;
  numericCostLakhs: number;
  progress: number;
  stage: string;
  status: 'COMPLETED' | 'ONGOING' | 'RECOMMENDED_PENDING_DC';
  beneficiaries: string;
}

interface CitizenPetition {
  id: string;
  organization: string;
  segment: string;
  demand: string;
  estimatedLakhs: number;
  sector: string;
}

const REGION_WORKS: Record<string, MPWork[]> = {
  'TG-HYD': [
    {
      id: 'hyd-1',
      code: 'TG-HYD-201',
      title: 'Heritage Facade Restoration & Pedestrian Smart Walkway at Charminar & Laad Bazaar',
      segment: 'Charminar',
      sector: 'Civic Infra',
      sanctioned: '₹85.00 Lakhs',
      numericCostLakhs: 85.0,
      progress: 75,
      stage: 'Cobblestone laying complete, solar heritage lampposts and CCTV bollards energized',
      status: 'ONGOING',
      beneficiaries: '120,000 Tourists & Local Residents/wk'
    },
    {
      id: 'hyd-2',
      code: 'TG-HYD-202',
      title: 'Multi-Specialty Nephrology Hemodialysis Unit at Osmania General Hospital',
      segment: 'Malakpet',
      sector: 'Healthcare',
      sanctioned: '₹95.00 Lakhs',
      numericCostLakhs: 95.0,
      progress: 85,
      stage: 'Medical gas pipeline network and 12 dialysis machines commissioned',
      status: 'ONGOING',
      beneficiaries: '48,000 Patients/yr'
    },
    {
      id: 'hyd-3',
      code: 'TG-HYD-203',
      title: 'High-Capacity Stormwater Drainage & CC Road Network around Mir Alam Tank',
      segment: 'Bahadurpura',
      sector: 'Civic Infra',
      sanctioned: '₹75.00 Lakhs',
      numericCostLakhs: 75.0,
      progress: 45,
      stage: 'Box culvert excavation and desilting conduits in progress',
      status: 'ONGOING',
      beneficiaries: '35,000 Residents'
    },
    {
      id: 'hyd-4',
      code: 'TG-HYD-204',
      title: '25 Modern STEM Robotics & Computer Laboratories in Government High Schools',
      segment: 'Chandrayangutta',
      sector: 'Education',
      sanctioned: '₹55.00 Lakhs',
      numericCostLakhs: 55.0,
      progress: 100,
      stage: 'Commissioned & handed over to District Educational Officer (DEO) Hyderabad',
      status: 'COMPLETED',
      beneficiaries: '5,200 Students'
    },
    {
      id: 'hyd-5',
      code: 'TG-HYD-205',
      title: 'Old City Zardozi & Handloom Artisan Cluster Skill Upgradation Center',
      segment: 'Yakutpura',
      sector: 'Skill Development',
      sanctioned: '₹45.00 Lakhs',
      numericCostLakhs: 45.0,
      progress: 30,
      stage: 'Administrative sanction issued by Collector Hyderabad; computerized jacquard machines procured',
      status: 'ONGOING',
      beneficiaries: '3,100 Artisans'
    },
    {
      id: 'hyd-6',
      code: 'TG-HYD-206',
      title: '12 High-Yield 1,000 LPH Solar RO Pure Drinking Water Dispensing Plants',
      segment: 'Karwan',
      sector: 'Drinking Water',
      sanctioned: '₹38.00 Lakhs',
      numericCostLakhs: 38.0,
      progress: 90,
      stage: 'RO purification membrane and solar inverter installed; water purity certified',
      status: 'ONGOING',
      beneficiaries: '26,000 Slum Residents'
    }
  ],
  'TG-SEC': [
    {
      id: 'sec-1',
      code: 'TG-SEC-301',
      title: 'Cardiac Critical Care Unit Upgradation at Gandhi Hospital, Secunderabad',
      segment: 'Secunderabad',
      sector: 'Healthcare',
      sanctioned: '₹90.00 Lakhs',
      numericCostLakhs: 90.0,
      progress: 80,
      stage: 'Echocardiography consoles and ICU beds installed',
      status: 'ONGOING',
      beneficiaries: '50,000 Patients/yr'
    },
    {
      id: 'sec-2',
      code: 'TG-SEC-302',
      title: 'Solar Micro-Grid & High-Efficiency LED Illumination, Jubilee Hills',
      segment: 'Jubilee Hills',
      sector: 'Clean Energy',
      sanctioned: '₹48.00 Lakhs',
      numericCostLakhs: 48.0,
      progress: 100,
      stage: 'Grid synchronization completed; energy savings logged',
      status: 'COMPLETED',
      beneficiaries: '65,000 Citizens'
    },
    {
      id: 'sec-3',
      code: 'TG-SEC-303',
      title: 'Modern Youth Skill Development & Digital Coding Incubator',
      segment: 'Musheerabad',
      sector: 'Skill Development',
      sanctioned: '₹52.00 Lakhs',
      numericCostLakhs: 52.0,
      progress: 55,
      stage: 'Optical fiber backbone & modular computer lab setup underway',
      status: 'ONGOING',
      beneficiaries: '2,400 Students'
    }
  ],
  'AP-VIJ': [
    {
      id: 'vij-1',
      code: 'AP-VIJ-101',
      title: 'Multi-Specialty Dialysis & Emergency Trauma Unit at GGH Vijayawada',
      segment: 'Vijayawada Central',
      sector: 'Healthcare',
      sanctioned: '₹85.00 Lakhs',
      numericCostLakhs: 85.0,
      progress: 80,
      stage: 'Lead-lined partition installed, hemodialysis machines commissioned',
      status: 'ONGOING',
      beneficiaries: '45,000 Patients/yr'
    },
    {
      id: 'vij-2',
      code: 'AP-VIJ-102',
      title: 'Solar-Powered High-Efficiency Lift Irrigation & Canal Dredging',
      segment: 'Mylavaram',
      sector: 'Drinking Water & Agri',
      sanctioned: '₹65.00 Lakhs',
      numericCostLakhs: 65.0,
      progress: 60,
      stage: '50 HP solar submersible pump and intake manifold installed',
      status: 'ONGOING',
      beneficiaries: '12,000 Farming Families'
    },
    {
      id: 'vij-3',
      code: 'AP-VIJ-103',
      title: '20 Modern Digital Smart Classrooms & Robotics Labs in ZP High Schools',
      segment: 'Nandigama',
      sector: 'Education',
      sanctioned: '₹48.00 Lakhs',
      numericCostLakhs: 48.0,
      progress: 100,
      stage: 'Fully commissioned & handed over to District Education Officer (DEO)',
      status: 'COMPLETED',
      beneficiaries: '3,800 Students'
    },
    {
      id: 'vij-4',
      code: 'AP-VIJ-104',
      title: 'Underground Stormwater Drainage & CC Road Network, Bhavanipuram',
      segment: 'Vijayawada West',
      sector: 'Civic Infra',
      sanctioned: '₹72.00 Lakhs',
      numericCostLakhs: 72.0,
      progress: 35,
      stage: 'Box culvert excavation and precast pipeline laying in progress',
      status: 'ONGOING',
      beneficiaries: '28,000 Residents'
    },
    {
      id: 'vij-5',
      code: 'AP-VIJ-105',
      title: 'Community Skill Development & Handloom Weaver Support Center',
      segment: 'Jaggayyapeta',
      sector: 'Skill Development',
      sanctioned: '₹40.00 Lakhs',
      numericCostLakhs: 40.0,
      progress: 15,
      stage: 'Administrative sanction accorded by Collector NTR; tender awarded',
      status: 'ONGOING',
      beneficiaries: '2,500 Artisans'
    },
    {
      id: 'vij-6',
      code: 'AP-VIJ-106',
      title: 'High-Mast Solar Lighting & CCTV Security Surveillance near PNBS Hub',
      segment: 'Vijayawada East',
      sector: 'Civic Infra',
      sanctioned: '₹35.00 Lakhs',
      numericCostLakhs: 35.0,
      progress: 90,
      stage: '14 High-mast towers energized; APCPDCL safety inspection cleared',
      status: 'ONGOING',
      beneficiaries: '85,000 Daily Commuters'
    }
  ],
  'KA-BC': [
    {
      id: 'ka-1',
      code: 'KA-BC-104',
      title: 'High-Capacity Borewell & 1,000 LPH RO Water Purification Plant',
      segment: 'Shivajinagar',
      sector: 'Drinking Water',
      sanctioned: '₹28.50 Lakhs',
      numericCostLakhs: 28.5,
      progress: 100,
      stage: 'Commissioned & Handed over to BBMP Ward Engineers',
      status: 'COMPLETED',
      beneficiaries: '18,500 Residents'
    },
    {
      id: 'ka-2',
      code: 'KA-BC-109',
      title: 'Digital Smart Classrooms in 4 Government PU Colleges',
      segment: 'Gandhinagar',
      sector: 'Education',
      sanctioned: '₹65.00 Lakhs',
      numericCostLakhs: 65.0,
      progress: 85,
      stage: 'Interactive Flat Panels installed, Wi-Fi cabling in progress',
      status: 'ONGOING',
      beneficiaries: '3,200 Students'
    },
    {
      id: 'ka-3',
      code: 'KA-BC-112',
      title: 'Covered Pedestrian Skywalk & Footpaths near Bowring Hospital',
      segment: 'Shivajinagar',
      sector: 'Civic Infra',
      sanctioned: '₹42.00 Lakhs',
      numericCostLakhs: 42.0,
      progress: 40,
      stage: 'Steel truss fabrication & column casting completed',
      status: 'ONGOING',
      beneficiaries: '45,000 Daily Commuters'
    },
    {
      id: 'ka-4',
      code: 'KA-BC-118',
      title: 'Modern 20-Bed Maternity Ward & Neonatal Unit, Ulsoor General Hospital',
      segment: 'Shantinagar',
      sector: 'Healthcare',
      sanctioned: '₹75.00 Lakhs',
      numericCostLakhs: 75.0,
      progress: 70,
      stage: 'Interior partition, medical gas pipeline laying',
      status: 'ONGOING',
      beneficiaries: '28,000 Families'
    },
    {
      id: 'ka-5',
      code: 'KA-BC-115',
      title: 'Community Skill Development & Digital Training Hub for Youth',
      segment: 'Sarvagnanagar',
      sector: 'Skill Development',
      sanctioned: '₹55.00 Lakhs',
      numericCostLakhs: 55.0,
      progress: 15,
      stage: 'Technical sanction issued by DC, site foundation excavation begun',
      status: 'ONGOING',
      beneficiaries: '1,400 Youths/yr'
    }
  ],
  'MH-PUN': [
    {
      id: 'mh-1',
      code: 'MH-PUN-0901',
      title: 'Multi-Specialty Primary Health Sub-Centre, Baramati',
      segment: 'Baramati',
      sector: 'Healthcare',
      sanctioned: '₹85.00 Lakhs',
      numericCostLakhs: 85.0,
      progress: 75,
      stage: 'Roof slab casting & electrical conduit laying completed',
      status: 'ONGOING',
      beneficiaries: '35,000 Residents'
    },
    {
      id: 'mh-2',
      code: 'MH-PUN-0842',
      title: 'Solar Micro-Grid & High-Mast Illumination, Khed',
      segment: 'Khed',
      sector: 'Clean Energy',
      sanctioned: '₹32.00 Lakhs',
      numericCostLakhs: 32.0,
      progress: 100,
      stage: 'Inverter grid synchronization & battery bank commissioned',
      status: 'COMPLETED',
      beneficiaries: '14,000 Villagers'
    },
    {
      id: 'mh-3',
      code: 'MH-PUN-0788',
      title: 'Science & Robotics Laboratory, Zilla Parishad School',
      segment: 'Shirur',
      sector: 'Education',
      sanctioned: '₹45.00 Lakhs',
      numericCostLakhs: 45.0,
      progress: 52,
      stage: 'Civil work & modular laboratory workstations fitting',
      status: 'ONGOING',
      beneficiaries: '2,600 Students'
    },
    {
      id: 'mh-4',
      code: 'MH-PUN-0914',
      title: 'All-Weather Concrete Link Road & Box Culvert, Haveli',
      segment: 'Haveli',
      sector: 'Civic Infra',
      sanctioned: '₹62.00 Lakhs',
      numericCostLakhs: 62.0,
      progress: 30,
      stage: 'Sub-base compaction & aggregate laying',
      status: 'ONGOING',
      beneficiaries: '22,000 Commuters'
    }
  ],
  'UP-VAR': [
    {
      id: 'up-1',
      code: 'UP-VAR-0301',
      title: 'Kashi Integrated Heritage Pilgrimage Corridor & Solar Walkways',
      segment: 'Varanasi Cantt',
      sector: 'Civic Infra',
      sanctioned: '₹95.00 Lakhs',
      numericCostLakhs: 95.0,
      progress: 90,
      stage: 'Red sandstone pavement completed, smart illumination live',
      status: 'ONGOING',
      beneficiaries: '120,000 Pilgrims/wk'
    },
    {
      id: 'up-2',
      code: 'UP-VAR-0314',
      title: 'Ganga Ghat Automated Water Quality Monitoring & Solid Skimmer Hub',
      segment: 'Varanasi South',
      sector: 'Clean Water & Ecology',
      sanctioned: '₹70.00 Lakhs',
      numericCostLakhs: 70.0,
      progress: 65,
      stage: 'Solar pontoon skimmer deployment & CPCB telemetry sync',
      status: 'ONGOING',
      beneficiaries: '50,000 Citizens'
    },
    {
      id: 'up-3',
      code: 'UP-VAR-0322',
      title: 'Rural Cold Storage & Agri-Logistics Terminal, Sevapuri',
      segment: 'Sevapuri',
      sector: 'Agri Logistics',
      sanctioned: '₹80.00 Lakhs',
      numericCostLakhs: 80.0,
      progress: 85,
      stage: 'Chilling compressor units installed, testing underway',
      status: 'ONGOING',
      beneficiaries: '8,000 Farmers'
    },
    {
      id: 'up-4',
      code: 'UP-VAR-0330',
      title: 'Smart Handloom Weaver Modernization & Design Center',
      segment: 'Varanasi North',
      sector: 'Skill Development',
      sanctioned: '₹55.00 Lakhs',
      numericCostLakhs: 55.0,
      progress: 30,
      stage: 'Foundation civil works and computerized jacquard procurement',
      status: 'ONGOING',
      beneficiaries: '4,200 Artisans'
    }
  ],
  'DL-ND': [
    {
      id: 'dl-1',
      code: 'DL-ND-0201',
      title: 'Automated Solar Green Corridor & Rainwater Harvesting System',
      segment: 'New Delhi',
      sector: 'Civic Infra',
      sanctioned: '₹65.00 Lakhs',
      numericCostLakhs: 65.0,
      progress: 85,
      stage: 'Percolation pits tested, solar bollards installed',
      status: 'ONGOING',
      beneficiaries: '35,000 Residents'
    },
    {
      id: 'dl-2',
      code: 'DL-ND-0210',
      title: 'Multi-Specialty Mobile Healthcare & Diagnostic Vans',
      segment: 'Kasturba Nagar',
      sector: 'Healthcare',
      sanctioned: '₹75.00 Lakhs',
      numericCostLakhs: 75.0,
      progress: 70,
      stage: 'Medical van chassis fitted with portable ECG & ultrasound units',
      status: 'ONGOING',
      beneficiaries: '22,000 Patients'
    },
    {
      id: 'dl-3',
      code: 'DL-ND-0218',
      title: 'Modern Skill & Digital Coding Literacy Hub for Urban Youth',
      segment: 'RK Puram',
      sector: 'Skill Development',
      sanctioned: '₹50.00 Lakhs',
      numericCostLakhs: 50.0,
      progress: 40,
      stage: 'Computer lab workstation installation & optical fiber connection',
      status: 'ONGOING',
      beneficiaries: '3,500 Youths'
    },
    {
      id: 'dl-4',
      code: 'DL-ND-0225',
      title: 'Secondary Waste Segregation & Mechanized Solid Waste Compactor',
      segment: 'Malviya Nagar',
      sector: 'Civic Infra',
      sanctioned: '₹45.00 Lakhs',
      numericCostLakhs: 45.0,
      progress: 100,
      stage: 'Commissioned & handed over to MCD sanitation division',
      status: 'COMPLETED',
      beneficiaries: '40,000 Citizens'
    }
  ]
};

const REGION_PETITIONS: Record<string, CitizenPetition[]> = {
  'TG-HYD': [
    {
      id: 'p-hyd-1',
      organization: 'Old City Handloom & Zardozi Artisans Welfare Guild',
      segment: 'Yakutpura',
      demand: 'Requesting solar battery inverters for 150 artisan workshops to prevent work stoppage during summer heat.',
      estimatedLakhs: 32.0,
      sector: 'Skill Development'
    },
    {
      id: 'p-hyd-2',
      organization: 'Mir Alam Basin & Falaknuma Residents Action Forum',
      segment: 'Bahadurpura',
      demand: 'Urgent desilting of secondary monsoon channels and construction of reinforced retaining walls around tank.',
      estimatedLakhs: 45.0,
      sector: 'Civic Infra'
    },
    {
      id: 'p-hyd-3',
      organization: 'Charminar Heritage Traders & Tourism Association',
      segment: 'Charminar',
      demand: 'Requesting modern tourist public amenities, clean drinking water kiosks, and emergency medical booth at Laad Bazaar.',
      estimatedLakhs: 25.0,
      sector: 'Civic Infra'
    }
  ],
  'TG-SEC': [
    {
      id: 'p-sec-1',
      organization: 'Musheerabad Senior Citizens & Pensioners Welfare Trust',
      segment: 'Musheerabad',
      demand: 'Requesting automated battery shuttle service and illuminated walking tracks in public community parks.',
      estimatedLakhs: 22.0,
      sector: 'Civic Infra'
    },
    {
      id: 'p-sec-2',
      organization: 'Amberpet Government Degree College Students Union',
      segment: 'Amberpet',
      demand: 'Requesting digital e-library setup with 60 high-speed terminals and access to national scientific repositories.',
      estimatedLakhs: 30.0,
      sector: 'Education'
    }
  ],
  'AP-VIJ': [
    {
      id: 'p-vij-1',
      organization: 'Krishna Riverfront Fishermen Welfare Association',
      segment: 'Vijayawada Central',
      demand: 'Requesting modern solar-powered cold holding chambers and night floodlights at Bhavani Island Ghat.',
      estimatedLakhs: 24.0,
      sector: 'Agri & Livelihood'
    },
    {
      id: 'p-vij-2',
      organization: 'Mylavaram Mango & Chili Farmers Cooperative',
      segment: 'Mylavaram',
      demand: 'Requesting 3 high-capacity solar drip irrigation borewell units and covered produce grading shed.',
      estimatedLakhs: 38.0,
      sector: 'Drinking Water & Agri'
    },
    {
      id: 'p-vij-3',
      organization: 'Bhavanipuram Industrial & Auto-Nagar Workers Union',
      segment: 'Vijayawada West',
      demand: 'Requesting concrete drainage desilting, storm line widening, and heavy-load pavement on Road No. 4.',
      estimatedLakhs: 28.0,
      sector: 'Civic Infra'
    }
  ],
  'KA-BC': [
    {
      id: 'p-ka-1',
      organization: 'Frazer Town Resident Welfare Association',
      segment: 'Shivajinagar',
      demand: 'Requesting installation of 30 CCTV security surveillance poles and solar streetlights near Coles Park.',
      estimatedLakhs: 22.0,
      sector: 'Civic Infra'
    },
    {
      id: 'p-ka-2',
      organization: 'Gandhinagar Merchants Association',
      segment: 'Gandhinagar',
      demand: 'Requesting underground stormwater drain desilting and modern concrete pavement on 5th Cross Road.',
      estimatedLakhs: 35.0,
      sector: 'Civic Infra'
    },
    {
      id: 'p-ka-3',
      organization: 'Ulsoor Lake Environmental Protection Trust',
      segment: 'Shantinagar',
      demand: 'Requesting continuous biological aeration fountains and bio-retention swales along lake periphery.',
      estimatedLakhs: 40.0,
      sector: 'Clean Water'
    }
  ],
  'MH-PUN': [
    {
      id: 'p-mh-1',
      organization: 'Baramati Grape & Pomegranate Farmers Federation',
      segment: 'Baramati',
      demand: 'Requesting solar-powered pack-house cold chain facility for rural export produce.',
      estimatedLakhs: 45.0,
      sector: 'Agri Logistics'
    },
    {
      id: 'p-mh-2',
      organization: 'Khed Taluka Youth Sports & Training Council',
      segment: 'Khed',
      demand: 'Requesting synthetic running track and open-air gymnasium at ZP Senior School Ground.',
      estimatedLakhs: 30.0,
      sector: 'Sports & Skill'
    }
  ],
  'UP-VAR': [
    {
      id: 'p-up-1',
      organization: 'Kashi Handloom Weavers & Artisans Mahasabha',
      segment: 'Varanasi North',
      demand: 'Requesting solar battery inverters for 200 powerlooms to prevent work stoppage during peak heat.',
      estimatedLakhs: 42.0,
      sector: 'Skill Development'
    },
    {
      id: 'p-up-2',
      organization: 'Assi Ghat Pilgrims Amenities Committee',
      segment: 'Varanasi South',
      demand: 'Requesting automated battery shuttle stations and RO chilled water distribution booths.',
      estimatedLakhs: 26.0,
      sector: 'Civic Infra'
    }
  ],
  'DL-ND': [
    {
      id: 'p-dl-1',
      organization: 'Lodhi Colony Senior Citizens & Residents Forum',
      segment: 'New Delhi',
      demand: 'Requesting motorized wheelchair accessible footpaths and panic button security poles in public parks.',
      estimatedLakhs: 20.0,
      sector: 'Civic Infra'
    },
    {
      id: 'p-dl-2',
      organization: 'RK Puram Government Quarters Welfare Board',
      segment: 'RK Puram',
      demand: 'Requesting solar rooftop installations on community centers and underground rainwater recharge pits.',
      estimatedLakhs: 32.0,
      sector: 'Clean Energy'
    }
  ]
};

interface NationalStateMetric {
  state: string;
  constituencies: number;
  totalOutlayCr: number;
  releasedCr: number;
  utilizationRate: number;
  activeWorks: number;
  completedWorks: number;
  rating: 'Exemplary' | 'On Track' | 'Advisory Issued';
}

const NATIONAL_STATES_LEAGUE: NationalStateMetric[] = [
  { state: 'Andhra Pradesh', constituencies: 25, totalOutlayCr: 1250.0, releasedCr: 1040.0, utilizationRate: 83.2, activeWorks: 940, completedWorks: 680, rating: 'Exemplary' },
  { state: 'Gujarat', constituencies: 26, totalOutlayCr: 1300.0, releasedCr: 1092.0, utilizationRate: 84.0, activeWorks: 920, completedWorks: 710, rating: 'Exemplary' },
  { state: 'Tamil Nadu', constituencies: 39, totalOutlayCr: 1950.0, releasedCr: 1599.0, utilizationRate: 82.0, activeWorks: 1240, completedWorks: 890, rating: 'Exemplary' },
  { state: 'Karnataka', constituencies: 28, totalOutlayCr: 1400.0, releasedCr: 1120.0, utilizationRate: 80.0, activeWorks: 890, completedWorks: 640, rating: 'On Track' },
  { state: 'Maharashtra', constituencies: 48, totalOutlayCr: 2400.0, releasedCr: 1896.0, utilizationRate: 79.0, activeWorks: 1480, completedWorks: 1020, rating: 'On Track' },
  { state: 'Uttar Pradesh', constituencies: 80, totalOutlayCr: 4000.0, releasedCr: 2880.0, utilizationRate: 72.0, activeWorks: 2340, completedWorks: 1450, rating: 'On Track' },
  { state: 'Madhya Pradesh', constituencies: 29, totalOutlayCr: 1450.0, releasedCr: 1058.0, utilizationRate: 73.0, activeWorks: 910, completedWorks: 590, rating: 'On Track' },
  { state: 'Rajasthan', constituencies: 25, totalOutlayCr: 1250.0, releasedCr: 900.0, utilizationRate: 72.0, activeWorks: 820, completedWorks: 510, rating: 'On Track' },
  { state: 'West Bengal', constituencies: 42, totalOutlayCr: 2100.0, releasedCr: 1218.0, utilizationRate: 58.0, activeWorks: 1120, completedWorks: 540, rating: 'Advisory Issued' },
  { state: 'Bihar', constituencies: 40, totalOutlayCr: 2000.0, releasedCr: 1040.0, utilizationRate: 52.0, activeWorks: 980, completedWorks: 410, rating: 'Advisory Issued' },
  { state: 'Kerala', constituencies: 20, totalOutlayCr: 1000.0, releasedCr: 810.0, utilizationRate: 81.0, activeWorks: 620, completedWorks: 450, rating: 'Exemplary' },
  { state: 'Punjab', constituencies: 13, totalOutlayCr: 650.0, releasedCr: 487.0, utilizationRate: 75.0, activeWorks: 410, completedWorks: 270, rating: 'On Track' },
];

export const getOrGenerateRegionWorks = (region: ConstituencyRegion): MPWork[] => {
  if (REGION_WORKS[region.id]) {
    return REGION_WORKS[region.id];
  }
  const segs = region.segments && region.segments.length > 0 
    ? region.segments 
    : ['Central', 'North', 'South', 'Rural'];

  return [
    {
      id: `${region.code.toLowerCase()}-1`,
      code: `${region.code}-101`,
      title: `Multi-Specialty Primary Healthcare Sub-Centre & Diagnostic Unit, ${segs[0]}`,
      segment: segs[0],
      sector: 'Healthcare',
      sanctioned: '₹85.00 Lakhs',
      numericCostLakhs: 85.0,
      progress: 78,
      stage: 'Lead-lined diagnostic partitions & medical pipeline fitting underway',
      status: 'ONGOING',
      beneficiaries: '36,000 Patients/yr'
    },
    {
      id: `${region.code.toLowerCase()}-2`,
      code: `${region.code}-102`,
      title: `High-Capacity Solar RO Pure Drinking Water Grid, ${segs[1 % segs.length]}`,
      segment: segs[1 % segs.length],
      sector: 'Drinking Water',
      sanctioned: '₹42.00 Lakhs',
      numericCostLakhs: 42.0,
      progress: 100,
      stage: 'Commissioned & handed over to District Local Body Authority',
      status: 'COMPLETED',
      beneficiaries: '14,500 Residents'
    },
    {
      id: `${region.code.toLowerCase()}-3`,
      code: `${region.code}-103`,
      title: `18 Modern STEM Robotics & Computer Labs in Government Schools, ${segs[2 % segs.length]}`,
      segment: segs[2 % segs.length],
      sector: 'Education',
      sanctioned: '₹52.00 Lakhs',
      numericCostLakhs: 52.0,
      progress: 60,
      stage: 'Interactive flat panels mounted; high-speed broadband linked',
      status: 'ONGOING',
      beneficiaries: '3,900 Students'
    },
    {
      id: `${region.code.toLowerCase()}-4`,
      code: `${region.code}-104`,
      title: `Underground Stormwater Drainage & Concrete Corridor, ${segs[3 % segs.length]}`,
      segment: segs[3 % segs.length],
      sector: 'Civic Infra',
      sanctioned: '₹68.00 Lakhs',
      numericCostLakhs: 68.0,
      progress: 35,
      stage: 'Box culvert excavation & precast drainage conduit laying in progress',
      status: 'ONGOING',
      beneficiaries: '25,000 Commuters'
    },
    {
      id: `${region.code.toLowerCase()}-5`,
      code: `${region.code}-105`,
      title: `Youth Skill Development & Vocational Training Center, ${segs[4 % segs.length]}`,
      segment: segs[4 % segs.length],
      sector: 'Skill Development',
      sanctioned: '₹45.00 Lakhs',
      numericCostLakhs: 45.0,
      progress: 20,
      stage: `Administrative sanction issued by Collector ${region.name}; tender awarded`,
      status: 'ONGOING',
      beneficiaries: '2,600 Youths/yr'
    },
    {
      id: `${region.code.toLowerCase()}-6`,
      code: `${region.code}-106`,
      title: `High-Mast Solar Lighting & CCTV Safety Poles, ${segs[5 % segs.length]}`,
      segment: segs[5 % segs.length],
      sector: 'Clean Energy',
      sanctioned: '₹34.00 Lakhs',
      numericCostLakhs: 34.0,
      progress: 90,
      stage: 'High-mast towers energized; safety inspection cleared with DM',
      status: 'ONGOING',
      beneficiaries: '42,000 Daily Commuters'
    }
  ];
};

export const getOrGenerateRegionPetitions = (region: ConstituencyRegion): CitizenPetition[] => {
  if (REGION_PETITIONS[region.id]) {
    return REGION_PETITIONS[region.id];
  }
  const segs = region.segments && region.segments.length > 0 
    ? region.segments 
    : ['Central', 'North', 'South'];

  return [
    {
      id: `p-${region.code.toLowerCase()}-1`,
      organization: `${region.name} Chamber of Small Commerce & Artisan Guild`,
      segment: segs[0],
      demand: `Requesting modern solar backup inverters and digital training facility at ${segs[0]}.`,
      estimatedLakhs: 28.0,
      sector: 'Skill Development'
    },
    {
      id: `p-${region.code.toLowerCase()}-2`,
      organization: `${segs[1 % segs.length]} Resident Welfare & Environment Council`,
      segment: segs[1 % segs.length],
      demand: `Requesting underground stormwater drain widening and rainwater harvesting pits before monsoon season.`,
      estimatedLakhs: 36.0,
      sector: 'Civic Infra'
    },
    {
      id: `p-${region.code.toLowerCase()}-3`,
      organization: `${region.name} Farmers & Livelihood Cooperative Society`,
      segment: segs[2 % segs.length],
      demand: `Requesting 2 solar-powered produce grading sheds and high-yield cold storage units.`,
      estimatedLakhs: 40.0,
      sector: 'Agri & Livelihood'
    }
  ];
};

export const MPDashboard: React.FC = () => {
  const { currentProfile, activeRegion } = useRole();
  const navigate = useNavigate();

  // Mode: Toggle between Constituency Development Hub and Pan-India National Scheme Oversight
  const [viewScope, setViewScope] = useState<'CONSTITUENCY' | 'NATIONAL'>('CONSTITUENCY');

  // Works state per active region
  const [works, setWorks] = useState<MPWork[]>(() => getOrGenerateRegionWorks(activeRegion));
  const [recommendModal, setRecommendModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSegment, setNewSegment] = useState(activeRegion.segments[0] || 'Central');
  const [newSector, setNewSector] = useState('Healthcare');
  const [newCostLakhs, setNewCostLakhs] = useState('35');

  // Search filter for national table
  const [nationalSearch, setNationalSearch] = useState('');

  // Update works when activeRegion changes
  useEffect(() => {
    setWorks(getOrGenerateRegionWorks(activeRegion));
    setNewSegment(activeRegion.segments[0] || 'Central');
  }, [activeRegion.id]);

  // Compute live entitlement numbers
  const totalEntitlementCr = 5.0; // ₹5.00 Cr statutory annual pool
  const currentSanctionedLakhs = works.reduce((sum, w) => sum + w.numericCostLakhs, 0);
  const currentSanctionedCr = currentSanctionedLakhs / 100;
  const availablePoolCr = Math.max(0, totalEntitlementCr - currentSanctionedCr);

  const activePetitions = getOrGenerateRegionPetitions(activeRegion);

  const handleSubmitRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = parseFloat(newCostLakhs);
    if (!newTitle.trim() || isNaN(cost) || cost <= 0) return;

    const newWork: MPWork = {
      id: String(Date.now()),
      code: `${activeRegion.code}-${Math.floor(120 + Math.random() * 80)}`,
      title: newTitle.trim(),
      segment: newSegment,
      sector: newSector,
      sanctioned: `₹${cost.toFixed(2)} Lakhs`,
      numericCostLakhs: cost,
      progress: 5,
      stage: `Statutory Recommendation Letter Dispatched to ${activeRegion.dm.title} (${activeRegion.dm.name})`,
      status: 'RECOMMENDED_PENDING_DC',
      beneficiaries: 'Under Field Survey'
    };

    setWorks([newWork, ...works]);
    setRecommendModal(false);
    setNewTitle('');
    setSuccessToast(`Public work recommendation for "${newWork.title}" (₹${cost} Lakhs) submitted to ${activeRegion.dm.name}, ${activeRegion.dm.title}.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const filteredNationalStates = NATIONAL_STATES_LEAGUE.filter(s => 
    !nationalSearch || s.state.toLowerCase().includes(nationalSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-slide-up pb-12">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-950 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-400 flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{successToast}</span>
        </div>
      )}

      {/* DUAL ACCESS CONTROLLER: CONSTITUENCY VS PAN-INDIA NATIONAL DATA */}
      <div className="bg-white border-2 border-emerald-700/30 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <Landmark size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase tracking-wider">
                18th Lok Sabha Access Prerogative
              </span>
              <span className="text-xs font-bold text-slate-600">
                Sovereign Dual Privilege
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold mt-0.5">
              As an elected Member of Parliament, you command statutory oversight over your <strong className="text-emerald-900">{activeRegion.name} Constituency</strong> and constitutional clearance to inspect the <strong className="text-emerald-900">Entire Country's Pan-India Data (All 543 Seats)</strong>.
            </p>
          </div>
        </div>

        {/* View Mode Toggle Button Group */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-300 shrink-0 shadow-inner">
          <button
            onClick={() => setViewScope('CONSTITUENCY')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
              viewScope === 'CONSTITUENCY'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
            }`}
          >
            <Building2 size={15} />
            <span>My Constituency: {activeRegion.name}</span>
          </button>
          
          <button
            onClick={() => setViewScope('NATIONAL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
              viewScope === 'NATIONAL'
                ? 'bg-[#0B3C68] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
            }`}
          >
            <Globe size={15} />
            <span>Pan-India National Oversight (All 543 Seats)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW MODE 1: MY CONSTITUENCY DEVELOPMENT HUB
          ========================================================================= */}
      {viewScope === 'CONSTITUENCY' && (
        <>
          {/* MP Parliamentary Command Header */}
          <div className="bg-gradient-to-r from-[#064E3B] via-[#065F46] to-[#047857] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-8">
              <img src="/gov/emblem_india.svg" alt="Emblem" className="h-44 object-contain filter invert" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/90 shadow-2xl bg-emerald-950/80">
                    <img 
                      src={currentProfile.avatar} 
                      alt={currentProfile.name} 
                      className="w-full h-full object-cover object-top filter contrast-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-md border border-amber-300">
                    LOK SABHA
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black tracking-wider uppercase">
                      18th Lok Sabha | Member of Parliament
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/10 text-emerald-100 text-[10px] font-bold">
                      {activeRegion.name} Constituency ({activeRegion.state})
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                      District Authority Link: {activeRegion.dm.title} ({activeRegion.dm.name})
                    </span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    संसदीय क्षेत्र: {activeRegion.name} | Parliamentary Constituency Development Hub
                  </h1>
                  <p className="text-sm text-emerald-100 max-w-3xl font-medium leading-relaxed">
                    Represented by <strong className="text-white font-bold">{currentProfile.name}</strong>, Hon'ble Member of Parliament (Lok Sabha). Recommending high-impact civic infrastructure, healthcare, drinking water, and education works across all {activeRegion.segments.length} Assembly segments ({activeRegion.segments.slice(0, 4).join(', ')}, etc.) with transparent citizen accountability.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => setRecommendModal(true)}
                  className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md btn-press cursor-pointer"
                >
                  <PlusCircle size={16} /> Recommend New Work
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all btn-press cursor-pointer"
                >
                  <Printer size={15} /> Constituency Report
                </button>
              </div>
            </div>
          </div>

          {/* MP Entitlement Pool KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Annual Entitlement</span>
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <Sparkles size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">₹{totalEntitlementCr.toFixed(2)} <span className="text-base font-bold text-slate-500">Cr</span></div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Statutory FY 2026-27 Lok Sabha Pool</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sanctioned Outlay</span>
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                    <CheckCircle2 size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">₹{currentSanctionedCr.toFixed(2)} <span className="text-base font-bold text-slate-500">Cr</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (currentSanctionedCr / totalEntitlementCr) * 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-emerald-200 bg-emerald-50/50 shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Available Balance</span>
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <PlusCircle size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-emerald-950 tracking-tight">₹{availablePoolCr.toFixed(2)} <span className="text-base font-bold text-emerald-800">Cr</span></div>
                <p className="text-[11px] text-emerald-700 mt-1 font-medium">Available for new recommendations</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Citizen Beneficiaries</span>
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Users size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">~{(works.length * 0.75).toFixed(1)} <span className="text-base font-bold text-slate-500">Lakh</span></div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Direct impact across {activeRegion.segments.length} Assembly segments</p>
              </CardContent>
            </Card>
          </div>

          {/* Feature 1: My Recommended Works - Stage & Milestone Tracker */}
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                  <CardTitle className="text-base font-black text-slate-900">
                    My Recommended Public Works Pipeline ({activeRegion.name} Parliamentary Constituency)
                  </CardTitle>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Real-time progress tracking from MP recommendation letter to {activeRegion.dm.title} technical sanction, construction, and citizen handover.
                </p>
              </div>
              <button 
                onClick={() => setRecommendModal(true)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <PlusCircle size={14} /> New Recommendation
              </button>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-5">Work ID & Description</th>
                      <th className="py-3.5 px-4">Assembly Segment</th>
                      <th className="py-3.5 px-4">Sector</th>
                      <th className="py-3.5 px-4">Sanctioned Outlay</th>
                      <th className="py-3.5 px-4">Milestone Progress</th>
                      <th className="py-3.5 px-4">Citizen Impact</th>
                      <th className="py-3.5 px-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {works.map((w) => (
                      <tr key={w.id} className="hover:bg-emerald-50/20 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-mono font-bold text-emerald-900 text-xs">{w.code}</div>
                          <div className="font-black text-slate-900 text-xs mt-0.5">{w.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{w.stage}</div>
                        </td>

                        <td className="py-4 px-4 font-bold text-slate-800">{w.segment}</td>

                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-semibold text-[11px]">
                            {w.sector}
                          </span>
                        </td>

                        <td className="py-4 px-4 font-black text-slate-900">{w.sanctioned}</td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  w.progress === 100 ? 'bg-emerald-600' : 
                                  w.progress >= 50 ? 'bg-blue-600' : 'bg-amber-500'
                                }`} 
                                style={{ width: `${w.progress}%` }}
                              ></div>
                            </div>
                            <span className="font-black text-slate-900">{w.progress}%</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 font-semibold text-emerald-800">{w.beneficiaries}</td>

                        <td className="py-4 px-5 text-right">
                          {w.status === 'COMPLETED' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                              <CheckCircle2 size={13} className="text-emerald-700" /> Commissioned
                            </span>
                          ) : w.status === 'RECOMMENDED_PENDING_DC' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[11px]">
                              <Clock size={13} className="text-amber-700" /> Sent to Collector
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-bold text-[11px]">
                              <Activity size={13} className="text-blue-700" /> In Progress
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2: Sectoral Allocation & Electorate Impact Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-700" />
                  <CardTitle className="text-base font-black text-slate-900">
                    Sectoral Allocation Breakdown ({activeRegion.name})
                  </CardTitle>
                </div>
                <span className="text-xs font-bold text-slate-500">{activeRegion.code} Priority Matrix</span>
              </CardHeader>
              <CardContent className="p-5 flex-1 space-y-4">
                {[
                  { sector: 'Healthcare, Emergency & Dialysis Units', amount: '₹1.15 Cr', pct: 33.8, color: 'bg-emerald-600', icon: Activity },
                  { sector: 'Education, Smart Labs & High Schools', amount: '₹0.95 Cr', pct: 27.9, color: 'bg-blue-600', icon: GraduationCap },
                  { sector: 'Drinking Water, RO Plants & Lift Irrigation', amount: '₹0.80 Cr', pct: 23.5, color: 'bg-cyan-600', icon: Droplet },
                  { sector: 'Civic Roads, Storm Drainage & High-Mast Lighting', amount: '₹0.50 Cr', pct: 14.8, color: 'bg-amber-600', icon: Building2 },
                ].map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 flex items-center gap-2">
                        <sec.icon size={15} className="text-slate-500" />
                        {sec.sector}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-600">{sec.amount}</span>
                        <span className="font-black text-slate-900 w-10 text-right">{sec.pct}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${sec.color} h-full rounded-full`} style={{ width: `${sec.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Feature 3: Citizen Grievances & RWA Petitions */}
            <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-700" />
                  <CardTitle className="text-base font-black text-slate-900">
                    Citizen Petitions Forwarded for MP Recommendation
                  </CardTitle>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {activePetitions.length} Verified Petitions
                </span>
              </CardHeader>
              <CardContent className="p-5 flex-1 space-y-3.5 text-xs">
                {activePetitions.map((pet) => (
                  <div key={pet.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{pet.organization}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {pet.segment}
                      </span>
                    </div>
                    <p className="text-slate-600">{pet.demand}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-700">Estimated: ₹{pet.estimatedLakhs.toFixed(2)} Lakhs</span>
                      <button 
                        onClick={() => {
                          setNewTitle(pet.demand.replace('Requesting ', ''));
                          setNewSegment(pet.segment);
                          setNewSector(pet.sector.includes('Water') ? 'Drinking Water' : pet.sector.includes('Health') ? 'Healthcare' : 'Civic Infra');
                          setNewCostLakhs(String(pet.estimatedLakhs));
                          setRecommendModal(true);
                        }}
                        className="text-blue-700 hover:text-blue-900 font-bold text-[11px] cursor-pointer flex items-center gap-1"
                      >
                        Adopt as Recommendation <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* =========================================================================
          VIEW MODE 2: PAN-INDIA NATIONAL SCHEME OVERSIGHT (ENTIRE COUNTRY DATA)
          ========================================================================= */}
      {viewScope === 'NATIONAL' && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Sovereign National Oversight Header */}
          <div className="bg-gradient-to-r from-[#0B3C68] via-[#0F4C81] to-[#1E6091] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-8">
              <img src="/gov/emblem_india.svg" alt="Emblem" className="h-44 object-contain filter invert" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-xs">
                    Constitutional Prerogative: Entire Country Data Clearance
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/10 text-blue-100 text-[10px] font-bold">
                    All 543 Parliamentary Constituencies (28 States & 8 UTs)
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    Central PFMS Treasury Live Sync
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  अखिल भारतीय सांसद समीक्षा | Pan-India Parliamentary Scheme Oversight
                </h1>
                <p className="text-sm text-blue-100 max-w-3xl font-medium leading-relaxed">
                  As an Hon'ble Member of Parliament (18th Lok Sabha), your legislative mandate affords statutory access to the nationwide MPLADS master registry, inter-state fund absorption performance, and central audit telemetry across all 543 Parliamentary Constituencies.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => navigate('/projects?scope=national')}
                  className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md btn-press cursor-pointer"
                >
                  <Globe size={16} /> All-India Projects Registry
                </button>
                <button 
                  onClick={() => navigate('/states')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all btn-press cursor-pointer"
                >
                  <MapPin size={15} /> 28-State Bhuvan Matrix
                </button>
              </div>
            </div>
          </div>

          {/* National Macro Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Union Scheme Outlay</span>
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3C68] flex items-center justify-center font-bold">
                    <Landmark size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">₹23,450.00 <span className="text-base font-bold text-slate-500">Cr</span></div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">543 Lok Sabha + 245 Rajya Sabha Seats</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Registered Works</span>
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <Building2 size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">14,248 <span className="text-base font-bold text-slate-500">Projects</span></div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Active civic & health assets under execution</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">National Disbursal Rate</span>
                  <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
                    <TrendingUp size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-purple-950 tracking-tight">84.6% <span className="text-sm font-bold text-slate-500">(₹19,838 Cr)</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '84.6%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Form GFR 12-C UCs</span>
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <CheckCircle2 size={16} />
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">9,480 <span className="text-base font-bold text-slate-500">Certified</span></div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Verified by District Planning Authorities</p>
              </CardContent>
            </Card>
          </div>

          {/* Pan-India State Performance & Efficiency Matrix */}
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0B3C68]" />
                  <CardTitle className="text-base font-black text-slate-900">
                    All-India State Performance & Fund Absorption League (Pan-India Master Registry)
                  </CardTitle>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Constitutional cross-state comparison of fund sanction velocity, physical project completion, and administrative compliance.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-56">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Filter State..."
                    value={nationalSearch}
                    onChange={(e) => setNationalSearch(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>
                <button
                  onClick={() => navigate('/projects?scope=national')}
                  className="bg-[#0B3C68] hover:bg-blue-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Open Full Project Explorer</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-5">State / Union Territory</th>
                      <th className="py-3.5 px-4">LS Constituencies</th>
                      <th className="py-3.5 px-4">Scheme Allocation</th>
                      <th className="py-3.5 px-4">PFMS Disbursed</th>
                      <th className="py-3.5 px-4">Utilization Velocity</th>
                      <th className="py-3.5 px-4">Completed / Active Works</th>
                      <th className="py-3.5 px-5 text-right">Ministry Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {filteredNationalStates.map((s, idx) => (
                      <tr 
                        key={idx} 
                        className={`hover:bg-blue-50/20 transition-colors ${
                          s.state === activeRegion.state ? 'bg-emerald-50/30 font-semibold' : ''
                        }`}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 text-xs">{s.state}</span>
                            {s.state === activeRegion.state && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                                Your Home State
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-bold text-slate-700">
                          {s.constituencies} Seats
                        </td>

                        <td className="py-4 px-4 font-black text-slate-900">
                          ₹{s.totalOutlayCr.toFixed(0)} Cr
                        </td>

                        <td className="py-4 px-4 font-bold text-slate-800">
                          ₹{s.releasedCr.toFixed(0)} Cr
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  s.utilizationRate >= 80 ? 'bg-emerald-600' :
                                  s.utilizationRate >= 70 ? 'bg-blue-600' : 'bg-amber-500'
                                }`} 
                                style={{ width: `${s.utilizationRate}%` }}
                              ></div>
                            </div>
                            <span className="font-black text-slate-900">{s.utilizationRate}%</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-700 font-semibold">
                          <span className="text-emerald-700 font-bold">{s.completedWorks}</span> / {s.activeWorks}
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                            s.rating === 'Exemplary' 
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                              : s.rating === 'On Track'
                              ? 'bg-blue-100 text-blue-900 border border-blue-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            {s.rating === 'Exemplary' && <Award size={12} className="text-emerald-700" />}
                            {s.rating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Parliamentary Quick Jump Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div 
              onClick={() => navigate('/projects?scope=national')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-2 hover:border-blue-400"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B3C68] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Globe size={20} />
              </div>
              <h3 className="font-black text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                All-India Projects Explorer (14.2k Works) →
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Search, filter, and inspect physical & financial progress across every Parliamentary constituency in India.
              </p>
            </div>

            <div 
              onClick={() => navigate('/states')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-2 hover:border-emerald-400"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <MapPin size={20} />
              </div>
              <h3 className="font-black text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                28-State Bhuvan Satellite Geo-Tag Matrix →
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                View high-resolution ISRO Bhuvan satellite geo-coordinates and real-time ground photos of completed assets.
              </p>
            </div>

            <div 
              onClick={() => navigate('/alerts')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-2 hover:border-purple-400"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-black text-slate-900 text-sm group-hover:text-purple-700 transition-colors">
                Central Vigilance & Anomaly Radar →
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Audit AI-detected contractor syndicates, weighbridge discrepancies, and CVC high-risk procurement alerts nationwide.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommend New Public Work Modal */}
      {recommendModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#064E3B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-black tracking-tight">
                  PARLIAMENT OF INDIA | STATUTORY WORK RECOMMENDATION ({activeRegion.name})
                </h3>
              </div>
              <button onClick={() => setRecommendModal(false)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitRecommendation} className="p-6 space-y-4 text-xs">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-950 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase block text-emerald-800">Remaining Entitlement Pool:</span>
                  <span className="text-base font-black text-emerald-950">₹{availablePoolCr.toFixed(2)} Crore</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800">FY 2026-27 Allocation</span>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">Name of Proposed Public Work:</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Multi-Specialty Mobile Healthcare Vans or Modern Smart Classrooms"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800">Assembly Segment ({activeRegion.name}):</label>
                  <select 
                    value={newSegment}
                    onChange={(e) => setNewSegment(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-medium text-slate-900 focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    {activeRegion.segments.map((seg) => (
                      <option key={seg} value={seg}>{seg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800">Sector / Category:</label>
                  <select 
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 font-medium text-slate-900 focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="Healthcare">Healthcare & Hospitals</option>
                    <option value="Drinking Water">Drinking Water & RO Plants</option>
                    <option value="Education">Education & Smart Schools</option>
                    <option value="Civic Infra">Civic Roads & Drainage</option>
                    <option value="Skill Development">Skill Development Hubs</option>
                    <option value="Sports">Sports & Community Halls</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">Estimated Outlay (in ₹ Lakhs):</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input 
                    type="number" 
                    min="1"
                    max="500"
                    step="0.5"
                    required
                    value={newCostLakhs}
                    onChange={(e) => setNewCostLakhs(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg pl-8 pr-16 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">Lakhs</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
                <strong>Statutory Transmittal:</strong> Upon submission, an official recommendation letter signed by <strong>{currentProfile.name}</strong> will be transmitted electronically to <strong>{activeRegion.dm.name}</strong>, {activeRegion.dm.title} ({activeRegion.dm.district}) for technical estimation, administrative sanction, and field execution under MPLADS Revised Guidelines 2023.
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setRecommendModal(false)}
                  className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#064E3B] hover:bg-emerald-800 text-white font-bold px-5 py-2 rounded-lg text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Send size={14} /> Submit Statutory Recommendation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
