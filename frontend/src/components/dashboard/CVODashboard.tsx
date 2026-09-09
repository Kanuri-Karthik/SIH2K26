import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  ShieldAlert, 
  Network, 
  Scale, 
  AlertTriangle, 
  FileText, 
  Lock, 
  Eye, 
  CheckCircle2, 
  X, 
  Download, 
  Send, 
  Search, 
  Filter, 
  ExternalLink,
  Fingerprint,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';

interface SyndicateData {
  id: string;
  code: string;
  name: string;
  state: string;
  value: string;
  entities: string[];
  overlapScore: number;
  ipMatch: string;
  sharedPan: string;
  status: 'ACTIVE_WATCH' | 'QUARANTINED' | 'CBI_REFERRED';
}

const INITIAL_SYNDICATES: SyndicateData[] = [
  {
    id: '1',
    code: 'SYN-GNN-04',
    name: 'Western Ghats Road & Civil Nexus',
    state: 'Maharashtra (Pune - Nashik Corridor)',
    value: '₹18.40 Cr',
    entities: ['M/s Omkar Infra Ltd', 'Vardhan Builders', 'Shri Samarth Enterprises'],
    overlapScore: 94.2,
    ipMatch: '103.24.118.42 (Identical GeM submission IP)',
    sharedPan: 'Common Director PAN: ABCDE1234F (MCA-21 Match)',
    status: 'ACTIVE_WATCH'
  },
  {
    id: '2',
    code: 'SYN-GNN-02',
    name: 'Eastern Ghats Bridge & Culvert Cartel',
    state: 'Odisha - Andhra Border',
    value: '₹24.50 Cr',
    entities: ['Kalinga Structures Pvt Ltd', 'Konark Heavy Engg Corp'],
    overlapScore: 91.8,
    ipMatch: 'Alternating winning bids with exactly 1.8% margin',
    sharedPan: 'Cross-shareholding identified via ROC filing',
    status: 'ACTIVE_WATCH'
  },
  {
    id: '3',
    code: 'SYN-GNN-07',
    name: 'Solar Pump & Micro-Grid Supply Ring',
    state: 'Rajasthan (Barmer - Jodhpur)',
    value: '₹11.20 Cr',
    entities: ['Marwar Renewable Systems', 'Thar Solar Utilities LLP'],
    overlapScore: 88.5,
    ipMatch: 'Same registered address on GSTIN portal',
    sharedPan: 'Common Authorized Signatory on Bank ECS mandate',
    status: 'ACTIVE_WATCH'
  }
];

export const CVODashboard: React.FC = () => {
  const { currentProfile } = useRole();
  const [syndicates, setSyndicates] = useState<SyndicateData[]>(INITIAL_SYNDICATES);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [dossierModal, setDossierModal] = useState<any | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleQuarantine = (id: string) => {
    setSyndicates(prev => prev.map(s => s.id === id ? { ...s, status: 'QUARANTINED' } : s));
    const s = syndicates.find(x => x.id === id);
    setSuccessToast(`Syndicate ${s?.code} (${s?.name}) tenders frozen under Section 13(1)(d) POCA.`);
    setTimeout(() => setSuccessToast(null), 4500);
  };

  const handleReferCBI = (id: string) => {
    setSyndicates(prev => prev.map(s => s.id === id ? { ...s, status: 'CBI_REFERRED' } : s));
    const s = syndicates.find(x => x.id === id);
    setSuccessToast(`Statutory prosecution dossier for ${s?.code} transmitted to Central Bureau of Investigation (CBI) Anti-Corruption Branch.`);
    setTimeout(() => setSuccessToast(null), 4500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-slide-up pb-12">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-8 z-50 bg-purple-950 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-purple-500 flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{successToast}</span>
        </div>
      )}

      {/* CVO Command Header */}
      <div className="bg-gradient-to-r from-[#2A0845] via-[#4C1D95] to-[#581C87] text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-purple-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <img src="/gov/emblem_india.svg" alt="Emblem" className="h-44 object-contain filter invert" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                DEFCON 2: Elevated Collusion Alert
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-purple-200 text-[10px] font-bold">
                Prevention of Corruption Act (POCA 1988) Registry
              </span>
              <span className="px-2.5 py-1 rounded bg-purple-400/20 text-purple-200 border border-purple-400/30 text-[10px] font-bold">
                Graph Neural Network v4.2 Running
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              केंद्रीय सतर्कता आयोग (CVC) | Vigilance & Forensic Anti-Corruption Hub
            </h1>
            <p className="text-sm text-purple-100 max-w-3xl font-medium leading-relaxed">
              Presided by <strong className="text-white font-bold">{currentProfile.name}</strong>, Chief Vigilance Officer & Forensic Auditor. Pan-India statutory oversight on cartelization, topological GNN bid-rigging detection, micro-density OCR invoice tampering, and prosecution dossiers under Section 13(1)(d) POCA.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setDossierModal(syndicates[0])}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md btn-press cursor-pointer"
            >
              <Scale size={16} /> Compile CVC Charge-Sheet
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all btn-press cursor-pointer"
            >
              <Download size={15} /> Export Audit Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Forensic KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border border-red-200 bg-red-50/60 shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider">Threat Index</span>
              <span className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <ShieldAlert size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-red-950 tracking-tight">78.4 <span className="text-sm font-semibold text-red-800">/ 100 (HIGH)</span></div>
            <p className="text-[11px] text-red-700 mt-1 font-medium">Elevated risk across 4 regional clusters</p>
          </CardContent>
        </Card>

        <Card className="border border-purple-200 bg-purple-50/60 shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">GNN Collusion Rings</span>
              <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Network size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-purple-950 tracking-tight">4 <span className="text-sm font-semibold text-purple-800">Active Syndicates</span></div>
            <p className="text-[11px] text-purple-700 mt-1 font-medium">18 linked public tenders under watch</p>
          </CardContent>
        </Card>

        <Card className="border border-amber-200 bg-amber-50/60 shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Micro-Density OCR Flags</span>
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Fingerprint size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-amber-950 tracking-tight">9 <span className="text-sm font-semibold text-amber-800">Altered Invoices</span></div>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">₹14.20 Cr vouchers under scrutiny</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quarantined Public Funds</span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Lock size={16} />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">₹184.60 <span className="text-base font-bold text-slate-500">Cr</span></div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Frozen in PFMS escrow pending CAG audit</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature 1: GNN Topological Collusion Radar */}
      <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-700" />
              <CardTitle className="text-base font-black text-slate-900">
                GNN Cartel & Bid-Rigging Radar (Graph Convolutional Detection)
              </CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Multi-hop graph neural network identifying co-bidding collusion, revolving subcontractors, shared IP subnets, and PAN director linkages.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
            Model: GraphSAGE-v4 (98.2% Accuracy)
          </span>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-5">Syndicate ID & Name</th>
                  <th className="py-3.5 px-4">Jurisdiction & Value</th>
                  <th className="py-3.5 px-4">Colluding Entities</th>
                  <th className="py-3.5 px-4">Forensic Graph Evidence</th>
                  <th className="py-3.5 px-5 text-right">Statutory Vigilance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {syndicates.map((s) => (
                  <tr key={s.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-mono font-bold text-purple-900 text-xs">{s.code}</div>
                      <div className="font-black text-slate-900 text-xs mt-0.5">{s.name}</div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-800 font-black rounded text-[10px]">
                          Similarity: {s.overlapScore}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800">{s.state}</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5">Tender Pool: {s.value}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {s.entities.map((ent, i) => (
                          <div key={i} className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0"></span>
                            <span>{ent}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1 text-[11px]">
                        <div className="text-slate-800 font-medium">
                          <strong className="text-purple-900">GeM IP:</strong> {s.ipMatch}
                        </div>
                        <div className="text-slate-800 font-medium">
                          <strong className="text-purple-900">MCA-21:</strong> {s.sharedPan}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-right">
                      {s.status === 'QUARANTINED' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-black text-[11px] border border-amber-300">
                          <Lock size={13} /> Escrow Quarantined
                        </span>
                      ) : s.status === 'CBI_REFERRED' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 text-red-900 font-black text-[11px] border border-red-300">
                          <Scale size={13} /> CBI Prosecution Active
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleQuarantine(s.id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-xs btn-press cursor-pointer flex items-center gap-1"
                          >
                            <Lock size={12} /> Freeze Escrow
                          </button>
                          <button 
                            onClick={() => handleReferCBI(s.id)}
                            className="bg-purple-900 hover:bg-purple-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-xs btn-press cursor-pointer flex items-center gap-1"
                          >
                            <Scale size={12} /> Refer to CBI
                          </button>
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

      {/* Feature 2: Micro-Density OCR & Digital Invoice Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-amber-700" />
              <CardTitle className="text-base font-black text-slate-900">
                Micro-Density OCR & Invoice Tampering Watchlist
              </CardTitle>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
              Font Kerning Analysis
            </span>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-3">
            {[
              {
                inv: 'INV-2024-992A',
                item: 'Ready-Mix Concrete Batch Vouchers (₹48,50,000)',
                issue: 'Font Kerning Anomaly: 12.4% Helvetica variant mismatch in amount field',
                sub: 'Duplicate GST invoice number simultaneously claimed in Nashik and Pune',
                badge: 'Tampering Detected',
                severity: 'CRITICAL'
              },
              {
                inv: 'INV-2024-811F',
                item: 'High-Mast Octagonal Steel Columns (₹28,20,000)',
                issue: 'e-Way Bill Transit Anomaly: FASTag timestamp 4 hours prior to voucher date',
                sub: 'Vehicle did not cross designated National Highway toll barrier',
                badge: 'Ghost Delivery',
                severity: 'HIGH'
              },
              {
                inv: 'INV-2024-740K',
                item: 'Robotics Equipment & Interactive Panels (₹35,00,000)',
                issue: 'Cloned Digital Seal: Pixel-density match with blacklisted vendor stamp in 2024',
                sub: 'Original OEM confirmed serial numbers were never exported to India',
                badge: 'Counterfeit Certificate',
                severity: 'CRITICAL'
              }
            ].map((invItem, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-start justify-between gap-3">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{invItem.inv}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.2 bg-red-100 text-red-800 rounded">
                      {invItem.badge}
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">{invItem.item}</div>
                  <div className="text-red-700 font-semibold text-[11px]">{invItem.issue}</div>
                  <div className="text-slate-500 text-[10px]">{invItem.sub}</div>
                </div>
                <button 
                  onClick={() => setSelectedInvoice(invItem)}
                  className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Eye size={13} /> Inspect
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CVC Statutory Prosecution Matrix */}
        <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-700" />
              <CardTitle className="text-base font-black text-slate-900">
                Statutory Prosecution Registry (POCA / CVC)
              </CardTitle>
            </div>
            <span className="text-xs font-bold text-slate-500">Live Registry</span>
          </CardHeader>
          <CardContent className="p-5 flex-1 space-y-4">
            <div className="space-y-3">
              {[
                { section: 'Section 13(1)(d) POCA 1988', desc: 'Criminal misconduct by public servant obtaining pecuniary advantage without public interest', count: '14 Cases Registered' },
                { section: 'Section 120-B Indian Penal Code', desc: 'Criminal conspiracy among cartels for deliberate rigging of public tenders', count: '4 Active Syndicates' },
                { section: 'Rule 175 GFR (Code of Integrity)', desc: 'Breach of transparency & fraudulent collusion in public procurement', count: '9 Vendors Flagged' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-purple-100 bg-purple-50/30">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-purple-950 text-xs">{item.section}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
                      {item.count}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Lock size={13} /> SHA-256 Chain of Custody
                </span>
                <span className="text-slate-400 font-mono text-[10px]">NIC Cryptographic Timestamp</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono truncate">
                Hash: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </p>
              <div className="text-[10px] text-emerald-400 font-bold">
                ✓ Legally admissible in Special CBI Courts under Section 65B of Indian Evidence Act
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Micro-Density Inspection Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black tracking-tight">Micro-Density Forensic OCR Comparison</h3>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">{selectedInvoice.item}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">Invoice: {selectedInvoice.inv}</p>
              </div>

              {/* Visual Diff Box */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border-2 border-slate-200 p-3 rounded-xl bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Authentic Typography Baseline</span>
                  <div className="h-20 bg-white border border-slate-200 rounded flex items-center justify-center font-mono text-xs text-slate-700 font-bold">
                    ₹ 18,50,000/-<br/>[Uniform 1.2px Kerning]
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Gaussian Blur: Normal</span>
                </div>

                <div className="border-2 border-red-300 p-3 rounded-xl bg-red-50/50">
                  <span className="text-[10px] font-bold text-red-700 uppercase block mb-1">Scanned Voucher (Tampered)</span>
                  <div className="h-20 bg-white border border-red-300 rounded flex items-center justify-center font-mono text-xs text-red-700 font-black">
                    ₹ 48,50,000/-<br/>[Digit '4' Pixel Gap: 3.4px]
                  </div>
                  <span className="text-[10px] text-red-700 font-bold mt-1 block">Artifact: Font Patch Cloned</span>
                </div>
              </div>

              <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-red-950 space-y-1">
                <div className="font-bold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle size={15} /> Forensic Finding:
                </div>
                <div className="text-[11px] text-red-800">
                  {selectedInvoice.issue}. {selectedInvoice.sub}.
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setSelectedInvoice(null);
                    setSuccessToast(`Invoice ${selectedInvoice.inv} flagged for immediate forensic audit & payment stop.`);
                    setTimeout(() => setSuccessToast(null), 4000);
                  }}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Issue Payment Stop Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CVC Charge-Sheet Modal */}
      {dossierModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-300 shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="bg-[#2A0845] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black tracking-tight">
                  CENTRAL VIGILANCE COMMISSION | STATUTORY PROSECUTION DOSSIER
                </h3>
              </div>
              <button onClick={() => setDossierModal(null)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs font-serif leading-relaxed text-slate-800 bg-amber-50/20">
              <div className="text-center pb-3 border-b border-slate-200 font-sans">
                <div className="w-8 h-10 mx-auto mb-1">
                  <img src="/gov/emblem_india.svg" alt="Emblem" className="w-full h-full object-contain" />
                </div>
                <h4 className="font-black text-sm tracking-wider uppercase">Directorate of Vigilance & Anti-Corruption</h4>
                <p className="text-[11px] text-slate-600">Satarkta Bhavan, GPO Complex, INA, New Delhi - 110023</p>
                <p className="text-[10px] font-mono text-purple-900 font-bold mt-1">
                  CVC Ref: CVC/VIG/MPLADS/2026/CH-4401 | Under Section 13(1)(d) POCA 1988
                </p>
              </div>

              <div className="space-y-2 font-sans text-xs">
                <div><strong>SYNDICATE CODE:</strong> {dossierModal.code} ({dossierModal.name})</div>
                <div><strong>JURISDICTION:</strong> {dossierModal.state}</div>
                <div><strong>VALUE OF RIGGED PUBLIC TENDERS:</strong> <span className="text-red-700 font-bold">{dossierModal.value}</span></div>
                <div><strong>ENTITIES INVOLVED:</strong> {dossierModal.entities.join(', ')}</div>
              </div>

              <div className="border-t border-b border-slate-200 py-3 space-y-2 text-xs font-sans">
                <p>
                  <strong>FORENSIC FINDINGS:</strong> Analysis by Graph Neural Network (GraphSAGE-v4) reveals criminal collusion with an overlap coefficient of <strong>{dossierModal.overlapScore}%</strong>.
                </p>
                <div className="bg-purple-50 p-2.5 rounded border border-purple-200 text-purple-950 font-mono text-[11px] space-y-1">
                  <div>1. {dossierModal.ipMatch}</div>
                  <div>2. {dossierModal.sharedPan}</div>
                </div>
                <p>
                  The Directorate hereby recommends initiation of criminal proceedings under Prevention of Corruption Act 1988 read with Section 120-B IPC and referral to Special Investigation Branch, Central Bureau of Investigation.
                </p>
              </div>

              <div className="pt-2 flex justify-between items-end font-sans">
                <div className="text-[10px] text-slate-500">
                  Seal of the Chief Vigilance Officer<br/>
                  Government of India
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">Smt. Sunita Rao, IRS</div>
                  <div className="text-[10px] text-slate-600">Chief Vigilance Officer & Forensic Auditor</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5 font-sans">
              <button 
                onClick={() => setDossierModal(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setDossierModal(null);
                  setSuccessToast(`Official CVC Charge-Sheet for ${dossierModal.code} generated and transmitted to CBI Anti-Corruption Branch.`);
                  setTimeout(() => setSuccessToast(null), 4500);
                }}
                className="bg-[#2A0845] hover:bg-purple-900 text-white font-bold px-5 py-2 rounded-lg text-xs shadow-sm flex items-center gap-1.5"
              >
                <Send size={13} /> Transmit Statutory Dossier to CBI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
