import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  FileText, 
  Download, 
  Printer, 
  FileCheck2, 
  Scale, 
  Building2, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2,
  Lock,
  ArrowDownToLine,
  Globe
} from 'lucide-react';
import { useRole } from '../context/RoleContext';

export const Reports: React.FC = () => {
  const { currentRole, currentProfile, activeRegion } = useRole();
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const triggerDownload = (reportName: string) => {
    setDownloadToast(`Generating and downloading signed copy of "${reportName}"...`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const getRoleReports = () => {
    switch (currentRole) {
      case 'district_magistrate':
        return [
          {
            title: `Form GFR 12-C [Rule 239] - District Utilization Certificate (${activeRegion.name})`,
            desc: `Statutory utilization certificate for ${activeRegion.name} District signed by District Magistrate (${activeRegion.dm.name}) with NIC digital token. Required for Ministry release of next financial tranche.`,
            tag: 'GFR 12-C Statutory',
            color: 'text-amber-800 bg-amber-50 border-amber-200'
          },
          {
            title: `District Physical Milestone Verification & Completion Audit (${activeRegion.name})`,
            desc: `Detailed field inspection logs, ISRO Bhuvan geo-tagging coordinates, and Executive Engineer completion approvals across all ${activeRegion.segments.length} administrative blocks of ${activeRegion.name} (${activeRegion.segments.slice(0, 3).join(', ')}, etc.).`,
            tag: 'Inspection Log',
            color: 'text-blue-800 bg-blue-50 border-blue-200'
          },
          {
            title: `Contractor Clause 14B Liquidated Damages & Show-Cause Ledger (${activeRegion.name})`,
            desc: `Summary of default notices issued to contractors in ${activeRegion.name} for milestone delays, aggregate deficit weighbridge penalties, and debarment recommendations.`,
            tag: 'Penalty Ledger',
            color: 'text-red-800 bg-red-50 border-red-200'
          },
          {
            title: `${activeRegion.name} District Block-wise Expenditure & Sanction Register`,
            desc: `Consolidated financial breakdown covering ${activeRegion.segments.join(', ')} administrative blocks under ${activeRegion.dm.district}.`,
            tag: 'Planning Cell',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200'
          }
        ];

      case 'vigilance_auditor':
        return [
          {
            title: 'CVC Statutory Prosecution Dossier [Section 13(1)(d) POCA 1988]',
            desc: 'Forensic charge-sheet compiled for the Central Vigilance Commission and Special CBI Anti-Corruption Courts, including SHA-256 evidence hashes.',
            tag: 'CVC Prosecution',
            color: 'text-purple-800 bg-purple-50 border-purple-200'
          },
          {
            title: 'GNN Topological Collusion & Bid-Rigging Network Brief',
            desc: 'Graph Neural Network co-bidding analysis, shared IP telemetry on GeM, and common Director PAN clusters for identified regional syndicates.',
            tag: 'AI Forensics',
            color: 'text-red-800 bg-red-50 border-red-200'
          },
          {
            title: 'Micro-Density OCR Kerning & Tampered Invoice Audit Log',
            desc: 'Detailed typography disparity measurements on cement vouchers, forged rubber stamp detections, and e-Way bill timing anomalies.',
            tag: 'Document Forensics',
            color: 'text-amber-800 bg-amber-50 border-amber-200'
          },
          {
            title: 'Shell Contractor Infiltration & Escrow Quarantine Register',
            desc: 'List of entities disqualified under Rule 175 GFR with frozen PFMS accounts and ROC/MCA-21 cross-verification files.',
            tag: 'Quarantine List',
            color: 'text-slate-800 bg-slate-50 border-slate-200'
          }
        ];

      case 'member_parliament':
        return [
          {
            title: `Parliamentary Constituency Annual Entitlement Ledger (${activeRegion.name})`,
            desc: `Official accounting of the ₹5.00 Crore statutory entitlement for ${activeRegion.name} (${activeRegion.state}) represented by ${activeRegion.mp.name}: ₹${(activeRegion.totalWorks * 0.08).toFixed(2)} Cr sanctioned, remaining pool available for new public works.`,
            tag: 'Sansad Ledger',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200'
          },
          {
            title: `Constituency Citizen Impact & Social Sector Scorecard (${activeRegion.name})`,
            desc: `Public accountability report detailing healthcare beds, drinking water RO plants, smart high school labs, and community centers delivered to voters in ${activeRegion.name}.`,
            tag: 'Citizen Impact',
            color: 'text-blue-800 bg-blue-50 border-blue-200'
          },
          {
            title: `Pan-India Macro Scheme Audit & Inter-State Efficiency Ledger (All 543 Seats)`,
            desc: `Constitutional legislative oversight report evaluating ₹23,450 Cr outlay across all 543 Lok Sabha constituencies, 28 States, and central PFMS treasury sync.`,
            tag: 'Pan-India 543',
            color: 'text-purple-800 bg-purple-50 border-purple-200'
          },
          {
            title: `Resident Welfare Associations (RWA) & Citizen Petition Register (${activeRegion.name})`,
            desc: `Summary of verified citizen requests forwarded to ${activeRegion.dm.name} (${activeRegion.dm.title}) for technical estimation and administrative sanction under MPLADS Guidelines 2023.`,
            tag: 'Citizen Petitions',
            color: 'text-slate-800 bg-slate-50 border-slate-200'
          }
        ];

      case 'mospi_admin':
      default:
        return [
          {
            title: 'Union Cabinet Macro Outlay & PFMS Reconciliation Gazette',
            desc: 'National consolidation of ₹23,450 Cr allocations across 543 Lok Sabha and 245 Rajya Sabha seats with central treasury ledger match.',
            tag: 'Union Gazette',
            color: 'text-blue-800 bg-blue-50 border-blue-200'
          },
          {
            title: 'Inter-State MPLADS Fund Absorption & Efficiency Benchmark',
            desc: 'Comparative league table ranking all 36 States & UTs on fund utilization velocity, physical project completion, and audit compliance.',
            tag: 'Benchmark League',
            color: 'text-emerald-800 bg-emerald-50 border-emerald-200'
          },
          {
            title: 'Pan-India High Risk Works & Ministerial Anomaly Exception Report',
            desc: 'Summary of the 48 anomalous projects flagged by the ML pipeline requiring intervention by State Planning Secretaries.',
            tag: 'Exception Report',
            color: 'text-red-800 bg-red-50 border-red-200'
          },
          {
            title: 'Raw All-India Normalized Telemetry Extract (CSV/JSON)',
            desc: 'Complete normalized database including ML risk weights, financial milestones, and contractor IDs for statistical analysis.',
            tag: 'Data Extract',
            color: 'text-slate-800 bg-slate-50 border-slate-200'
          }
        ];
    }
  };

  const reportsList = getRoleReports();

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-slide-up pb-12">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{downloadToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${currentProfile.badgeBg} ${currentProfile.badgeColor}`}>
              {currentProfile.sealBadge}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {currentRole === 'district_magistrate' 
                ? `${activeRegion.name} District (${activeRegion.state})`
                : currentRole === 'member_parliament'
                ? `Constituency: ${activeRegion.name} | Sovereign Countrywide Prerogative`
                : currentProfile.jurisdiction}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Official Statutory Reports & Audit Gazette
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Authenticated official documentation under Government of India (GIGW 3.0) standards.
          </p>
        </div>

        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs btn-press self-start sm:self-auto cursor-pointer"
        >
          <Printer size={15} /> Print All Gazettes
        </button>
      </div>
      
      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsList.map((rep, idx) => (
          <Card key={idx} className="border border-slate-200 shadow-xs rounded-2xl bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${rep.color}`}>
                  {rep.tag}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">NIC-DSC VERIFIED</span>
              </div>
              <CardTitle className="text-base font-black text-slate-900 leading-snug">
                {rep.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {rep.desc}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Format: PDF / A-1a</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => triggerDownload(rep.title)}
                    className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all btn-press cursor-pointer shadow-2xs"
                  >
                    <ArrowDownToLine size={13} />
                    <span>Download Signed Copy</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
