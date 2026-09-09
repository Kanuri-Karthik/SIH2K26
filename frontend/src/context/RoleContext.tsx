import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Database, 
  AlertTriangle, 
  ShieldAlert, 
  Network, 
  FileText, 
  Landmark, 
  CheckCircle2, 
  Users, 
  Compass, 
  Building2,
  FileCheck2,
  Scale, 
  Sparkles,
  Globe
} from 'lucide-react';

export type OfficerRole = 'district_magistrate' | 'vigilance_auditor' | 'mospi_admin' | 'member_parliament';
export const OFFICER_ROLES: OfficerRole[] = ['district_magistrate', 'vigilance_auditor', 'mospi_admin', 'member_parliament'];

export interface ConstituencyRegion {
  id: string;
  name: string;
  state: string;
  code: string;
  totalWorks: number;
  activeSanctionCr: number;
  mp: {
    name: string;
    nameHi: string;
    title: string;
    avatar: string;
    email: string;
  };
  dm: {
    name: string;
    nameHi: string;
    title: string;
    district: string;
    avatar: string;
    email: string;
  };
  segments: string[];
}

export const CONSTITUENCY_REGIONS: Record<string, ConstituencyRegion> = {
  'TG-HYD': {
    id: 'TG-HYD',
    name: 'Hyderabad',
    state: 'Telangana',
    code: 'TG-HYD',
    totalWorks: 36,
    activeSanctionCr: 34.50,
    mp: {
      name: 'Shri Asaduddin Owaisi, MP',
      nameHi: 'श्री असदुद्दीन ओवैसी, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Hyderabad',
      avatar: '/gov/officers/mp_asaduddin_owaisi.jpg',
      email: 'a.owaisi@sansad.nic.in'
    },
    dm: {
      name: 'Shri Anudeep Durishetty, IAS',
      nameHi: 'श्री अनुदीप दुरीशेट्टी, भा.प्र.से.',
      title: 'District Collector & District Magistrate',
      district: 'Hyderabad District Collectorate, Telangana',
      avatar: '/gov/officers/dm_anudeep_ias.jpg',
      email: 'collector-hyd@telangana.gov.in'
    },
    segments: ['Charminar', 'Chandrayangutta', 'Malakpet', 'Karwan', 'Bahadurpura', 'Yakutpura', 'Goshamahal']
  },
  'TG-SEC': {
    id: 'TG-SEC',
    name: 'Secunderabad',
    state: 'Telangana',
    code: 'TG-SEC',
    totalWorks: 40,
    activeSanctionCr: 36.80,
    mp: {
      name: 'Shri G. Kishan Reddy, MP',
      nameHi: 'श्री जी. किशन रेड्डी, सांसद',
      title: 'Hon\'ble Union Cabinet Minister & MP - Secunderabad',
      avatar: '/gov/officers/mp_kishan_reddy.jpg',
      email: 'kishan.reddy@sansad.nic.in'
    },
    dm: {
      name: 'Dr. M. Haritha, IAS',
      nameHi: 'डॉ. एम. हरिता, भा.प्र.से.',
      title: 'District Collector & Magistrate',
      district: 'Secunderabad Division Collectorate, Telangana',
      avatar: '/gov/officers/dm_haritha_ias.jpg',
      email: 'collector-secunderabad@telangana.gov.in'
    },
    segments: ['Musheerabad', 'Amberpet', 'Khairatabad', 'Jubilee Hills', 'Sanathnagar', 'Nampally', 'Secunderabad']
  },
  'AP-VIJ': {
    id: 'AP-VIJ',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    code: 'AP-VIJ',
    totalWorks: 38,
    activeSanctionCr: 32.40,
    mp: {
      name: 'Shri Kesineni Sivanath (Chinni), MP',
      nameHi: 'श्री केसिनेनी शिवनाथ (चिन्नी), सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Vijayawada',
      avatar: '/gov/officers/mp_kesineni_sivanath.jpg',
      email: 'kesineni.sivanath@sansad.nic.in'
    },
    dm: {
      name: 'Smt. G. Srijana, IAS',
      nameHi: 'श्रीमती जी. सृजना, भा.प्र.से.',
      title: 'District Collector & District Magistrate',
      district: 'NTR District (Vijayawada), Andhra Pradesh',
      avatar: '/gov/officers/dm_srijana_ias.jpg',
      email: 'collector-ntr@ap.gov.in'
    },
    segments: ['Vijayawada West', 'Vijayawada Central', 'Vijayawada East', 'Mylavaram', 'Nandigama', 'Jaggayyapeta', 'Tiruvuru']
  },
  'AP-VIZ': {
    id: 'AP-VIZ',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    code: 'AP-VIZ',
    totalWorks: 44,
    activeSanctionCr: 37.20,
    mp: {
      name: 'Shri M. Sribharat, MP',
      nameHi: 'श्री एम. श्रीभारत, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Visakhapatnam',
      avatar: '/gov/officers/mp_sribharat.jpg',
      email: 'm.sribharat@sansad.nic.in'
    },
    dm: {
      name: 'Shri M. N. Harendhira Prasad, IAS',
      nameHi: 'श्री एम. एन. हरेंधीरा प्रसाद, भा.प्र.से.',
      title: 'District Collector & District Magistrate',
      district: 'Visakhapatnam District Collectorate, Andhra Pradesh',
      avatar: '/gov/officers/dm_srijana_ias.jpg',
      email: 'collector-vizag@ap.gov.in'
    },
    segments: ['Bheemili', 'Visakhapatnam East', 'Visakhapatnam South', 'Visakhapatnam North', 'Visakhapatnam West', 'Gajuwaka', 'Pendurthi']
  },
  'AP-GUN': {
    id: 'AP-GUN',
    name: 'Guntur',
    state: 'Andhra Pradesh',
    code: 'AP-GUN',
    totalWorks: 35,
    activeSanctionCr: 30.80,
    mp: {
      name: 'Dr. Chandra Sekhar Pemmasani, MP',
      nameHi: 'डॉ. चन्द्र शेखर पेम्मासानी, सांसद',
      title: 'Hon\'ble Union MoS for Rural Development & MP - Guntur',
      avatar: '/gov/officers/mp_cs_pemmasani.jpg',
      email: 'cs.pemmasani@sansad.nic.in'
    },
    dm: {
      name: 'Smt. S. Nagalakshmi, IAS',
      nameHi: 'श्रीमती एस. नागलक्ष्मी, भा.प्र.से.',
      title: 'District Collector & Magistrate',
      district: 'Guntur District Collectorate, Andhra Pradesh',
      avatar: '/gov/officers/dm_nagalakshmi_ias.jpg',
      email: 'collector-guntur@ap.gov.in'
    },
    segments: ['Tadikonda', 'Mangalagiri', 'Ponnur', 'Tenali', 'Prathipadu', 'Guntur West', 'Guntur East']
  },
  'KA-BC': {
    id: 'KA-BC',
    name: 'Bangalore Central',
    state: 'Karnataka',
    code: 'KA-BC',
    totalWorks: 42,
    activeSanctionCr: 35.80,
    mp: {
      name: 'Shri P. C. Mohan, MP',
      nameHi: 'श्री पी. सी. मोहन, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Bangalore Central',
      avatar: '/gov/officers/mp_pc_mohan.jpg',
      email: 'pc.mohan.mp@sansad.nic.in'
    },
    dm: {
      name: 'Dr. K. Dayananda, IAS',
      nameHi: 'डॉ. के. दयानंद, भा.प्र.से.',
      title: 'Deputy Commissioner & District Magistrate',
      district: 'Bengaluru Urban District, Karnataka',
      avatar: '/gov/officers/dm_dayananda_ias.jpg',
      email: 'dc.bengaluruurban@karnataka.gov.in'
    },
    segments: ['Shivajinagar', 'Gandhinagar', 'Shantinagar', 'Sarvagnanagar', 'Rajajinagar', 'Chamrajpet', 'CV Raman Nagar']
  },
  'KA-BS': {
    id: 'KA-BS',
    name: 'Bangalore South',
    state: 'Karnataka',
    code: 'KA-BS',
    totalWorks: 45,
    activeSanctionCr: 38.00,
    mp: {
      name: 'Shri Tejasvi Surya, MP',
      nameHi: 'श्री तेजस्वी सूर्या, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Bangalore South',
      avatar: '/gov/officers/mp_tejasvi_surya.jpg',
      email: 'tejasvi.surya@sansad.nic.in'
    },
    dm: {
      name: 'Dr. K. Dayananda, IAS',
      nameHi: 'डॉ. के. दयानंद, भा.प्र.से.',
      title: 'Deputy Commissioner & District Magistrate',
      district: 'Bengaluru Urban District, Karnataka',
      avatar: '/gov/officers/dm_dayananda_ias.jpg',
      email: 'dc.bengaluruurban@karnataka.gov.in'
    },
    segments: ['Govindraj Nagar', 'Vijay Nagar', 'Chickpet', 'Basavanagudi', 'Padmanaba Nagar', 'BTM Layout', 'Jayanagar', 'Bommanahalli']
  },
  'MH-PUN': {
    id: 'MH-PUN',
    name: 'Pune',
    state: 'Maharashtra',
    code: 'MH-PUN',
    totalWorks: 48,
    activeSanctionCr: 38.50,
    mp: {
      name: 'Shri Murlidhar Mohol, MP',
      nameHi: 'श्री मुरलीधर मोहोळ, सांसद',
      title: 'Hon\'ble Union MoS for Civil Aviation & MP - Pune',
      avatar: '/gov/officers/mp_murlidhar_mohol.jpg',
      email: 'murlidhar.mohol@sansad.nic.in'
    },
    dm: {
      name: 'Dr. Suhas Diwase, IAS',
      nameHi: 'डॉ. सुहास दिवसे, भा.प्र.से.',
      title: 'District Magistrate & Collector',
      district: 'Pune District Planning Cell, Maharashtra',
      avatar: '/gov/officers/dm_diwase_ias.jpg',
      email: 'collector.pune@maharashtra.gov.in'
    },
    segments: ['Vadgaon Sheri', 'Shivajinagar', 'Kothrud', 'Parvati', 'Pune Cantonment', 'Kasba Peth']
  },
  'MH-MUMS': {
    id: 'MH-MUMS',
    name: 'Mumbai South',
    state: 'Maharashtra',
    code: 'MH-MUMS',
    totalWorks: 39,
    activeSanctionCr: 33.20,
    mp: {
      name: 'Shri Arvind Sawant, MP',
      nameHi: 'श्री अरविंद सावंत, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Mumbai South',
      avatar: '/gov/officers/mp_arvind_sawant.jpg',
      email: 'arvind.sawant@sansad.nic.in'
    },
    dm: {
      name: 'Shri Sanjay Yadav, IAS',
      nameHi: 'श्री संजय यादव, भा.प्र.से.',
      title: 'District Collector & Magistrate',
      district: 'Mumbai City District Collectorate, Maharashtra',
      avatar: '/gov/officers/dm_diwase_ias.jpg',
      email: 'collector-mumbaicity@maharashtra.gov.in'
    },
    segments: ['Worli', 'Shivadi', 'Byculla', 'Malabar Hill', 'Mumbadevi', 'Colaba']
  },
  'MH-NAG': {
    id: 'MH-NAG',
    name: 'Nagpur',
    state: 'Maharashtra',
    code: 'MH-NAG',
    totalWorks: 52,
    activeSanctionCr: 41.50,
    mp: {
      name: 'Shri Nitin Gadkari, MP',
      nameHi: 'श्री नितिन गडकरी, सांसद',
      title: 'Hon\'ble Union Cabinet Minister for Road Transport & Highways & MP - Nagpur',
      avatar: '/gov/officers/mp_nitin_gadkari.jpg',
      email: 'nitin.gadkari@sansad.nic.in'
    },
    dm: {
      name: 'Dr. Vipin Itankar, IAS',
      nameHi: 'डॉ. विपिन इटनकर, भा.प्र.से.',
      title: 'District Magistrate & Collector',
      district: 'Nagpur District Collectorate, Maharashtra',
      avatar: '/gov/officers/dm_diwase_ias.jpg',
      email: 'collector-nagpur@maharashtra.gov.in'
    },
    segments: ['Nagpur South West', 'Nagpur South', 'Nagpur East', 'Nagpur Central', 'Nagpur West', 'Nagpur North']
  },
  'UP-VAR': {
    id: 'UP-VAR',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    code: 'UP-VAR',
    totalWorks: 54,
    activeSanctionCr: 44.20,
    mp: {
      name: 'Shri Narendra Modi, Hon\'ble MP',
      nameHi: 'श्री नरेन्द्र मोदी, माननीय सांसद',
      title: 'Hon\'ble Prime Minister of India & MP - Varanasi',
      avatar: '/gov/pm_modi.jpg',
      email: 'mp.varanasi@sansad.nic.in'
    },
    dm: {
      name: 'Shri S. Rajalingam, IAS',
      nameHi: 'श्री एस. राजलिंगम, भा.प्र.से.',
      title: 'District Magistrate & Collector',
      district: 'Varanasi Collectorate, Uttar Pradesh',
      avatar: '/gov/officers/dm_rajalingam_ias.jpg',
      email: 'dm-var@nic.in'
    },
    segments: ['Varanasi Cantt', 'Varanasi North', 'Varanasi South', 'Sevapuri', 'Rohaniya', 'Pindra']
  },
  'UP-LKO': {
    id: 'UP-LKO',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    code: 'UP-LKO',
    totalWorks: 49,
    activeSanctionCr: 39.80,
    mp: {
      name: 'Shri Rajnath Singh, MP',
      nameHi: 'श्री राजनाथ सिंह, सांसद',
      title: 'Hon\'ble Union Defence Minister & MP - Lucknow',
      avatar: '/gov/officers/mp_rajnath_singh.jpg',
      email: 'rajnath.singh@sansad.nic.in'
    },
    dm: {
      name: 'Shri Suryapal Gangwar, IAS',
      nameHi: 'श्री सूर्यपाल गंगवार, भा.प्र.से.',
      title: 'District Magistrate & Collector',
      district: 'Lucknow Collectorate, Uttar Pradesh',
      avatar: '/gov/officers/dm_rajalingam_ias.jpg',
      email: 'dm-lko@nic.in'
    },
    segments: ['Lucknow West', 'Lucknow North', 'Lucknow East', 'Lucknow Central', 'Lucknow Cantt']
  },
  'DL-ND': {
    id: 'DL-ND',
    name: 'New Delhi',
    state: 'NCT of Delhi',
    code: 'DL-ND',
    totalWorks: 29,
    activeSanctionCr: 28.60,
    mp: {
      name: 'Smt. Bansuri Swaraj, MP',
      nameHi: 'श्रीमती बांसुरी स्वराज, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - New Delhi',
      avatar: '/gov/officers/mp_bansuri_swaraj.jpg',
      email: 'bansuri.swaraj@sansad.nic.in'
    },
    dm: {
      name: 'Smt. Mekala Chaitanya Prasad, IAS',
      nameHi: 'श्रीमती मेकला चैतन्य प्रसाद, भा.प्र.से.',
      title: 'District Magistrate',
      district: 'New Delhi Revenue District, Delhi',
      avatar: '/gov/officers/dm_srijana_ias.jpg',
      email: 'dm-newdelhi@nic.in'
    },
    segments: ['New Delhi', 'Kasturba Nagar', 'Malviya Nagar', 'RK Puram', 'Greater Kailash', 'Delhi Cantt']
  },
  'TN-CC': {
    id: 'TN-CC',
    name: 'Chennai Central',
    state: 'Tamil Nadu',
    code: 'TN-CC',
    totalWorks: 41,
    activeSanctionCr: 35.10,
    mp: {
      name: 'Shri Dayanidhi Maran, MP',
      nameHi: 'श्री दयानिधि मारन, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Chennai Central',
      avatar: '/gov/officers/mp_dayanidhi_maran.jpg',
      email: 'dayanidhi.maran@sansad.nic.in'
    },
    dm: {
      name: 'Smt. Rashmi Siddharth Zagade, IAS',
      nameHi: 'श्रीमती रश्मि सिद्धार्थ झागड़े, भा.प्र.से.',
      title: 'District Collector & District Magistrate',
      district: 'Chennai District Collectorate, Tamil Nadu',
      avatar: '/gov/officers/dm_zagade_ias.jpg',
      email: 'collr-chn@nic.in'
    },
    segments: ['Villivakkam', 'Egmore', 'Harbour', 'Chepauk-Thiruvallikeni', 'Thousand Lights', 'Anna Nagar']
  },
  'KL-TVM': {
    id: 'KL-TVM',
    name: 'Thiruvananthapuram',
    state: 'Kerala',
    code: 'KL-TVM',
    totalWorks: 37,
    activeSanctionCr: 31.90,
    mp: {
      name: 'Dr. Shashi Tharoor, MP',
      nameHi: 'डॉ. शशि थरूर, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Thiruvananthapuram',
      avatar: '/gov/officers/mp_shashi_tharoor.jpg',
      email: 'shashi.tharoor@sansad.nic.in'
    },
    dm: {
      name: 'Shri Geromic George, IAS',
      nameHi: 'श्री जेरोमिक जॉर्ज, भा.प्र.से.',
      title: 'District Collector & District Magistrate',
      district: 'Thiruvananthapuram Collectorate, Kerala',
      avatar: '/gov/officers/dm_singh_ias.jpg',
      email: 'dctvm.ker@nic.in'
    },
    segments: ['Kazhakoottam', 'Vattiyoorkavu', 'Thiruvananthapuram', 'Nemom', 'Parassala', 'Kovalam', 'Neyyattinkara']
  },
  'GJ-GAN': {
    id: 'GJ-GAN',
    name: 'Gandhinagar',
    state: 'Gujarat',
    code: 'GJ-GAN',
    totalWorks: 55,
    activeSanctionCr: 43.60,
    mp: {
      name: 'Shri Amit Shah, Hon\'ble MP',
      nameHi: 'श्री अमित शाह, माननीय सांसद',
      title: 'Hon\'ble Union Minister for Home Affairs and Cooperation & MP - Gandhinagar',
      avatar: '/gov/officers/mp_amit_shah.jpg',
      email: 'amit.shah@sansad.nic.in'
    },
    dm: {
      name: 'Shri Mehul Dave, IAS',
      nameHi: 'श्री मेहुल दवे, भा.प्र.से.',
      title: 'District Collector & District Magistrate',
      district: 'Gandhinagar Collectorate, Gujarat',
      avatar: '/gov/officers/dm_anudeep_ias.jpg',
      email: 'collector-gnr@gujarat.gov.in'
    },
    segments: ['Ghatlodia', 'Vejalpur', 'Naranpura', 'Sabarmati', 'Kalol', 'Sanand', 'Gandhinagar North']
  },
  'WB-KOLS': {
    id: 'WB-KOLS',
    name: 'Kolkata South',
    state: 'West Bengal',
    code: 'WB-KOLS',
    totalWorks: 43,
    activeSanctionCr: 36.40,
    mp: {
      name: 'Smt. Mala Roy, MP',
      nameHi: 'श्रीमती माला रॉय, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Kolkata South',
      avatar: '/gov/officers/mp_mala_roy.jpg',
      email: 'mala.roy@sansad.nic.in'
    },
    dm: {
      name: 'Smt. P. Ulaganathan, IAS',
      nameHi: 'श्रीमती पी. उलगनाथन, भा.प्र.से.',
      title: 'District Magistrate & Collector',
      district: 'Kolkata District Collectorate, West Bengal',
      avatar: '/gov/officers/dm_nagalakshmi_ias.jpg',
      email: 'dm-kol@wb.gov.in'
    },
    segments: ['Kasba', 'Behala Purba', 'Behala Paschim', 'Kolkata Port', 'Bhabanipur', 'Rashbehari', 'Ballygunge']
  },
  'BR-PAT': {
    id: 'BR-PAT',
    name: 'Patna Sahib',
    state: 'Bihar',
    code: 'BR-PAT',
    totalWorks: 36,
    activeSanctionCr: 32.10,
    mp: {
      name: 'Shri Ravi Shankar Prasad, MP',
      nameHi: 'श्री रवि शंकर प्रसाद, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Patna Sahib',
      avatar: '/gov/officers/mp_ravi_shankar_prasad.jpg',
      email: 'rs.prasad@sansad.nic.in'
    },
    dm: {
      name: 'Dr. Chandrashekhar Singh, IAS',
      nameHi: 'डॉ. चन्द्रशेखर सिंह, भा.प्र.से.',
      title: 'District Magistrate & Collector',
      district: 'Patna Collectorate, Bihar',
      avatar: '/gov/officers/dm_singh_ias.jpg',
      email: 'dm-patna.bih@nic.in'
    },
    segments: ['Bakhtiarpur', 'Digha', 'Bankipur', 'Kumhrar', 'Patna Sahib', 'Fatuha']
  },
  'RJ-JAI': {
    id: 'RJ-JAI',
    name: 'Jaipur',
    state: 'Rajasthan',
    code: 'RJ-JAI',
    totalWorks: 40,
    activeSanctionCr: 34.00,
    mp: {
      name: 'Smt. Manju Sharma, MP',
      nameHi: 'श्रीमती मंजू शर्मा, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Jaipur',
      avatar: '/gov/officers/mp_manju_sharma.jpg',
      email: 'manju.sharma@sansad.nic.in'
    },
    dm: {
      name: 'Shri Prakash Rajpurohit, IAS',
      nameHi: 'श्री प्रकाश राजपुरोहित, भा.प्र.से.',
      title: 'District Collector & Magistrate',
      district: 'Jaipur Collectorate, Rajasthan',
      avatar: '/gov/officers/dm_diwase_ias.jpg',
      email: 'collector-jai@rajasthan.gov.in'
    },
    segments: ['Hawa Mahal', 'Vidhyadhar Nagar', 'Civil Lines', 'Kishanpole', 'Adarsh Nagar', 'Malviya Nagar', 'Sanganer']
  },
  'RJ-KOT': {
    id: 'RJ-KOT',
    name: 'Kota',
    state: 'Rajasthan',
    code: 'RJ-KOT',
    totalWorks: 48,
    activeSanctionCr: 40.20,
    mp: {
      name: 'Shri Om Birla, Hon\'ble Speaker & MP',
      nameHi: 'श्री ओम बिरला, माननीय अध्यक्ष एवं सांसद',
      title: 'Hon\'ble Speaker of Lok Sabha & MP - Kota',
      avatar: '/gov/officers/mp_om_birla.jpg',
      email: 'speakerloksabha@sansad.nic.in'
    },
    dm: {
      name: 'Dr. Ravindra Goswami, IAS',
      nameHi: 'डॉ. रवींद्र गोस्वामी, भा.प्र.से.',
      title: 'District Collector & Magistrate',
      district: 'Kota Collectorate, Rajasthan',
      avatar: '/gov/officers/dm_diwase_ias.jpg',
      email: 'collector-kota@rajasthan.gov.in'
    },
    segments: ['Keshoraipatan', 'Bundi', 'Pipalda', 'Sangod', 'Kota North', 'Kota South', 'Ladpura', 'Ramganj Mandi']
  },
  'OD-BBI': {
    id: 'OD-BBI',
    name: 'Bhubaneswar',
    state: 'Odisha',
    code: 'OD-BBI',
    totalWorks: 37,
    activeSanctionCr: 32.80,
    mp: {
      name: 'Smt. Aparajita Sarangi, MP',
      nameHi: 'श्रीमती अपराजिता सारंगी, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Bhubaneswar',
      avatar: '/gov/officers/mp_aparajita_sarangi.jpg',
      email: 'aparajita.sarangi@sansad.nic.in'
    },
    dm: {
      name: 'Shri Chanchal Rana, IAS',
      nameHi: 'श्री चंचल राणा, भा.प्र.से.',
      title: 'District Collector & Magistrate',
      district: 'Khurda (Bhubaneswar) District, Odisha',
      avatar: '/gov/officers/dm_haritha_ias.jpg',
      email: 'dm-khurda@nic.in'
    },
    segments: ['Jayadev', 'Bhubaneswar Central', 'Bhubaneswar North', 'Ekamra-Bhubaneswar', 'Jatni', 'Begunia', 'Khurda']
  },
  'AS-GUW': {
    id: 'AS-GUW',
    name: 'Guwahati',
    state: 'Assam',
    code: 'AS-GUW',
    totalWorks: 35,
    activeSanctionCr: 30.50,
    mp: {
      name: 'Smt. Bijuli Kalita Medhi, MP',
      nameHi: 'श्रीमती बिजली कलिता मेधी, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Guwahati',
      avatar: '/gov/officers/mp_bijuli_medhi.jpg',
      email: 'bijuli.medhi@sansad.nic.in'
    },
    dm: {
      name: 'Shri Sumit Sattawan, IAS',
      nameHi: 'श्री सुमित सत्तवान, भा.प्र.से.',
      title: 'District Commissioner & DM',
      district: 'Kamrup Metropolitan (Guwahati), Assam',
      avatar: '/gov/officers/dm_srijana_ias.jpg',
      email: 'dc-kamrupmetro@assam.gov.in'
    },
    segments: ['Dudhnai', 'Boko', 'Chaygaon', 'Palasbari', 'Jalukbari', 'Dispur', 'Gauhati East', 'Gauhati West']
  },
  'PB-ASR': {
    id: 'PB-ASR',
    name: 'Amritsar',
    state: 'Punjab',
    code: 'PB-ASR',
    totalWorks: 38,
    activeSanctionCr: 33.40,
    mp: {
      name: 'Shri Gurjeet Singh Aujla, MP',
      nameHi: 'श्री गुरजीत सिंह औजला, सांसद',
      title: 'Hon\'ble Member of Parliament (Lok Sabha) - Amritsar',
      avatar: '/gov/officers/mp_gurjeet_aujla.jpg',
      email: 'gs.aujla@sansad.nic.in'
    },
    dm: {
      name: 'Shri Ghanshyam Thori, IAS',
      nameHi: 'श्री घनश्याम थोरी, भा.प्र.से.',
      title: 'Deputy Commissioner & DM',
      district: 'Amritsar District Administration, Punjab',
      avatar: '/gov/officers/dm_thori_ias.jpg',
      email: 'dc.amritsar@punjab.gov.in'
    },
    segments: ['Ajnala', 'Raja Sansi', 'Majitha', 'Amritsar North', 'Amritsar West', 'Amritsar Central', 'Amritsar East', 'Amritsar South', 'Attari']
  }
};

export interface OfficerProfile {
  id: OfficerRole;
  name: string;
  nameHi: string;
  title: string;
  jurisdiction: string;
  department: string;
  sealBadge: string;
  badgeColor: string;
  badgeBg: string;
  avatar: string;
  email: string;
  scopeSummary: string;
}

export interface NavMenuItem {
  name: string;
  nameHi?: string;
  icon: any;
  path: string;
  badge?: string;
}

export const getBaseOfficerProfiles = (region: ConstituencyRegion): Record<OfficerRole, OfficerProfile> => ({
  district_magistrate: {
    id: 'district_magistrate',
    name: region.dm.name,
    nameHi: region.dm.nameHi,
    title: region.dm.title,
    jurisdiction: region.dm.district,
    department: `District Collectorate / Planning Cell (${region.name})`,
    sealBadge: 'DM (IAS)',
    badgeColor: 'text-amber-900 border-amber-300',
    badgeBg: 'bg-amber-100',
    avatar: region.dm.avatar,
    email: region.dm.email,
    scopeSummary: `Strict regional clearance for ${region.name} (${region.state}). Project approvals, milestone inspections, Clause 14B show-causes, and GFR 12-C UCs.`
  },
  vigilance_auditor: {
    id: 'vigilance_auditor',
    name: 'Smt. Sunita Rao, IRS',
    nameHi: 'श्रीमती सुनीता राव, भा.रा.से.',
    title: 'Chief Vigilance Officer & Auditor',
    jurisdiction: 'National Anti-Corruption / CVC Cell',
    department: 'Central Vigilance Directorate (MoSPI / CVC)',
    sealBadge: 'CVO (IRS)',
    badgeColor: 'text-purple-900 border-purple-300',
    badgeBg: 'bg-purple-100',
    avatar: '/gov/minister_rao.jpg',
    email: 'cvo.vigilance@mospi.gov.in',
    scopeSummary: 'Topological GNN collusion radar, micro-density OCR invoice tampering, and statutory CVC prosecution files.'
  },
  mospi_admin: {
    id: 'mospi_admin',
    name: 'Dr. Saurabh Garg, IAS',
    nameHi: 'डॉ. सौरभ गर्ग, भा.प्र.से.',
    title: 'Secretary & Chief Statistician of India',
    jurisdiction: 'National Pan-India (543 Constituencies)',
    department: 'Ministry of Statistics & Programme Implementation',
    sealBadge: 'MoSPI (SEC)',
    badgeColor: 'text-blue-900 border-blue-300',
    badgeBg: 'bg-blue-100',
    avatar: '/gov/sec_garg.jpg',
    email: 'secretary.mospi@gov.in',
    scopeSummary: 'Macro national fund management (₹23,450 Cr), PFMS central treasury sync, and inter-state policy directives.'
  },
  member_parliament: {
    id: 'member_parliament',
    name: region.mp.name,
    nameHi: region.mp.nameHi,
    title: region.mp.title,
    jurisdiction: `${region.name} Parliamentary Constituency, ${region.state}`,
    department: 'Parliament of India / 18th Lok Sabha',
    sealBadge: 'MP (LOK SABHA)',
    badgeColor: 'text-emerald-900 border-emerald-300',
    badgeBg: 'bg-emerald-100',
    avatar: region.mp.avatar,
    email: region.mp.email,
    scopeSummary: `Full legislative access to Entire Country data (Pan-India 543 constituencies) + ${region.name} entitlement pool (₹5 Cr/yr) and local public works.`
  }
});

export const OFFICER_PROFILES: Record<OfficerRole, OfficerProfile> = getBaseOfficerProfiles(CONSTITUENCY_REGIONS['AP-VIJ']);

export const getRoleNavigationMenu = (role: OfficerRole, region: ConstituencyRegion): NavMenuItem[] => {
  switch (role) {
    case 'district_magistrate':
      return [
        { name: 'District Operations Hub', nameHi: 'जिला संचालन केंद्र', icon: LayoutDashboard, path: '/' },
        { name: 'District Works Explorer', nameHi: 'जिला परियोजनाएं', icon: Database, path: '/projects', badge: `${region.name} (${region.totalWorks})` },
        { name: 'Milestone Ground Verifications', nameHi: 'भौतिक सत्यापन', icon: Map, path: '/states', badge: 'ISRO Bhuvan' },
        { name: 'Local Alerts & Show-Cause', nameHi: 'जिला चेतावनी एवं नोटिस', icon: AlertTriangle, path: '/alerts', badge: 'Regional' },
        { name: 'Utilization & Completion Certificates', nameHi: 'उपयोग प्रमाण पत्र', icon: FileCheck2, path: '/reports' }
      ];

    case 'member_parliament':
      return [
        { name: 'Constituency & National Hub', nameHi: 'संसदीय एवं राष्ट्रीय केंद्र', icon: LayoutDashboard, path: '/', badge: `${region.name} MP` },
        { name: 'My Recommended Works', nameHi: 'अनुशंसित कार्य', icon: Database, path: '/projects?scope=constituency', badge: `${region.name} (${region.totalWorks})` },
        { name: 'Pan-India National Works', nameHi: 'अखिल भारतीय परियोजनाएं', icon: Globe, path: '/projects?scope=national', badge: 'All 543' },
        { name: 'All-India State Matrix', nameHi: 'राज्य एवं क्षेत्रीय समीक्षा', icon: Map, path: '/states', badge: '28 States' },
        { name: 'Citizen Impact Reports', nameHi: 'जनहित रिपोर्ट', icon: FileText, path: '/reports' }
      ];

    case 'vigilance_auditor':
      return [
        { name: 'Vigilance Command Hub', nameHi: 'सतर्कता नियंत्रण कक्ष', icon: ShieldAlert, path: '/' },
        { name: 'GNN Collusion Radar', nameHi: 'जीएनएन कार्टेल रडार', icon: Network, path: '/graph', badge: '4 Rings' },
        { name: 'Forensic Risk Telemetry', nameHi: 'फोरेंसिक जोखिम विश्लेषण', icon: Database, path: '/risk' },
        { name: 'National Anomaly Alerts', nameHi: 'राष्ट्रीय विसंगति अलर्ट', icon: AlertTriangle, path: '/alerts', badge: 'High Priority' },
        { name: 'CVC Statutory Dossiers', nameHi: 'सीवीसी कानूनी डोजियर', icon: Scale, path: '/reports', badge: 'POCA 1988' }
      ];

    case 'mospi_admin':
    default:
      return [
        { name: 'National Executive Dashboard', nameHi: 'राष्ट्रीय कार्यकारी डैशबोर्ड', icon: LayoutDashboard, path: '/' },
        { name: 'State & Regional Matrix', nameHi: 'राज्य एवं क्षेत्रीय समीक्षा', icon: Map, path: '/states', badge: '28 States' },
        { name: 'National Project Explorer', nameHi: 'अखिल भारतीय परियोजनाएं', icon: Database, path: '/projects', badge: '14.2k Works' },
        { name: 'National Integrity Alerts', nameHi: 'राष्ट्रीय सतर्कता चेतावनी', icon: AlertTriangle, path: '/alerts' },
        { name: 'Risk Intelligence Matrix', nameHi: 'जोखिम विश्लेषण', icon: ShieldAlert, path: '/risk' },
        { name: 'GNN Network Topology', nameHi: 'नेटवर्क ग्राफ टोपोलॉजी', icon: Network, path: '/graph' },
        { name: 'Audit Reports & Gazette', nameHi: 'लेखा परीक्षा रिपोर्ट', icon: FileText, path: '/reports' }
      ];
  }
};

interface RoleContextType {
  currentRole: OfficerRole;
  currentProfile: OfficerProfile;
  menuItems: NavMenuItem[];
  activeRegionId: string;
  activeRegion: ConstituencyRegion;
  allRegions: ConstituencyRegion[];
  switchRole: (role: OfficerRole) => void;
  switchRegion: (regionId: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRegionId, setActiveRegionId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('jan_drishti_region');
      if (stored && stored in CONSTITUENCY_REGIONS) {
        return stored;
      }
    } catch (e) {
      console.error(e);
    }
    return 'AP-VIJ'; // Default to Vijayawada as requested!
  });

  const activeRegion = CONSTITUENCY_REGIONS[activeRegionId] || CONSTITUENCY_REGIONS['AP-VIJ'];
  const allRegions = Object.values(CONSTITUENCY_REGIONS);

  const [currentRole, setCurrentRole] = useState<OfficerRole>(() => {
    try {
      const stored = localStorage.getItem('jan_drishti_role');
      if (stored && OFFICER_ROLES.includes(stored as OfficerRole)) {
        return stored as OfficerRole;
      }
      const user = localStorage.getItem('jan_drishti_user');
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed.officerRole && OFFICER_ROLES.includes(parsed.officerRole)) {
          return parsed.officerRole;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return 'member_parliament'; // Default to Member of Parliament for rich national & constituency showcase!
  });

  const profiles = getBaseOfficerProfiles(activeRegion);
  const currentProfile = profiles[currentRole];
  const menuItems = getRoleNavigationMenu(currentRole, activeRegion);

  const switchRole = (newRole: OfficerRole) => {
    if (OFFICER_ROLES.includes(newRole)) {
      setCurrentRole(newRole);
      localStorage.setItem('jan_drishti_role', newRole);
      
      const p = getBaseOfficerProfiles(activeRegion)[newRole];
      const updatedUser = {
        name: p.name,
        email: p.email,
        avatar: p.avatar,
        role: p.title,
        officerRole: newRole,
        designation: p.department,
        regionId: activeRegion.id,
        provider: 'gov_ssoweb'
      };
      localStorage.setItem('jan_drishti_user', JSON.stringify(updatedUser));
      localStorage.setItem('jan_drishti_auth', 'true');
    }
  };

  const switchRegion = (regionId: string) => {
    if (regionId in CONSTITUENCY_REGIONS) {
      setActiveRegionId(regionId);
      localStorage.setItem('jan_drishti_region', regionId);
      
      const newRegion = CONSTITUENCY_REGIONS[regionId];
      const p = getBaseOfficerProfiles(newRegion)[currentRole];
      const updatedUser = {
        name: p.name,
        email: p.email,
        avatar: p.avatar,
        role: p.title,
        officerRole: currentRole,
        designation: p.department,
        regionId: newRegion.id,
        provider: 'gov_ssoweb'
      };
      localStorage.setItem('jan_drishti_user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    localStorage.setItem('jan_drishti_role', currentRole);
    localStorage.setItem('jan_drishti_region', activeRegionId);
  }, [currentRole, activeRegionId]);

  return (
    <RoleContext.Provider value={{ 
      currentRole, 
      currentProfile, 
      menuItems, 
      activeRegionId,
      activeRegion,
      allRegions,
      switchRole, 
      switchRegion 
    }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
