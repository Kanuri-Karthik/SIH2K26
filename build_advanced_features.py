import os

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# CREATE RiskIntelligence.tsx (AI Forensics Command Center)
risk_intel_content = """
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ScanLine, FileWarning, Fingerprint, Search, ShieldAlert, Cpu, AlertTriangle, ArrowRight, FileDigit } from 'lucide-react';

export const RiskIntelligence = () => {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-slide-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <Fingerprint className="text-blue-600" size={32} /> AI Forensics & Fraud Detection
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Deep-packet invoice inspection, OCR forgery detection, and Shell Company routing.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Forensic Engine Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Module 1: AI Invoice Forgery Detection */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white hover-lift stagger-1 overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-100 pb-4 pt-5 px-6 bg-slate-950 text-white">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ScanLine className="text-blue-400" size={18} /> Deep-Scan Invoice Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col md:flex-row relative bg-slate-50">
            {/* The Document View */}
            <div className="w-full md:w-1/2 p-8 border-r border-slate-200 relative">
              <div className="w-full aspect-[1/1.4] bg-white border border-slate-200 shadow-md p-6 relative overflow-hidden">
                <div className="w-1/3 h-4 bg-slate-200 mb-6"></div>
                <div className="space-y-3 mb-8">
                  <div className="w-full h-2 bg-slate-100"></div>
                  <div className="w-full h-2 bg-slate-100"></div>
                  <div className="w-4/5 h-2 bg-slate-100"></div>
                </div>
                
                {/* The forged section */}
                <div className="border-2 border-dashed border-red-500 bg-red-50/50 p-3 relative group">
                  <div className="w-1/2 h-3 bg-slate-300 mb-2"></div>
                  <div className="w-full h-6 bg-slate-800"></div>
                  <div className="absolute -right-2 -top-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping"></div>
                  <div className="absolute -right-2 -top-2 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center z-10 text-[8px] text-white font-bold">!</div>
                </div>
                
                <div className="space-y-3 mt-8">
                  <div className="w-full h-2 bg-slate-100"></div>
                  <div className="w-3/4 h-2 bg-slate-100"></div>
                </div>

                {/* Scanner Line Animation */}
                {scanning && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                )}
              </div>
            </div>

            {/* Analysis Output */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-white">
              {scanning ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4 text-slate-400">
                  <Cpu size={32} className="animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-widest">Running OCR Forensics...</p>
                </div>
              ) : (
                <div className="space-y-6 animate-slide-up">
                  <div className="flex items-center gap-3 text-red-600">
                    <FileWarning size={24} />
                    <h3 className="font-black tracking-tight text-lg">Forgery Detected</h3>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    Our AI Optical Character Recognition (OCR) engine has identified anomalies in submitted Bill #INV-992A indicating manual tampering after digital generation.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                      <div className="mt-0.5"><AlertTriangle size={14} className="text-red-500" /></div>
                      <div>
                        <p className="text-xs font-bold text-red-900 uppercase tracking-wide">Font Kerning Mismatch</p>
                        <p className="text-[11px] text-red-700 mt-0.5">The total amount "₹45,00,000" uses a different pixel density than the rest of the document.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <div className="mt-0.5"><Search size={14} className="text-amber-500" /></div>
                      <div>
                        <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">EXIF Metadata Stripped</p>
                        <p className="text-[11px] text-amber-700 mt-0.5">Creation date altered. Original document created 3 months prior to project sanction.</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors btn-press">
                    Flag for Vigilance Review
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Module 2: Shell Company & Benami Tracker */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white hover-lift stagger-2 overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-100 pb-4 pt-5 px-6 bg-slate-50/50">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="text-blue-600" size={18} /> Financial Routing (Shell Company Detection)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-center">
             <div className="text-sm text-slate-500 font-medium mb-8">
               AI has traced the financial payout of <span className="font-bold text-slate-800">₹2.5 Cr</span> allocated to "Apex Builders" across multiple banking nodes, detecting circular routing.
             </div>

             {/* Network Flow UI */}
             <div className="relative flex flex-col items-center space-y-6">
                
                {/* Node 1 */}
                <div className="w-full max-w-sm bg-white border border-blue-200 shadow-sm p-3 rounded-xl flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">G</div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">MoSPI Treasury</p>
                      <p className="text-[10px] text-slate-500">Source Node</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">₹2.5 Cr</span>
                </div>

                {/* Arrow down */}
                <div className="h-6 w-0.5 bg-blue-200"></div>

                {/* Node 2 */}
                <div className="w-full max-w-sm bg-white border border-slate-200 shadow-sm p-3 rounded-xl flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">A</div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Apex Builders (L1 Bidder)</p>
                      <p className="text-[10px] text-slate-500">Authorized Agency</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">₹2.5 Cr</span>
                </div>

                {/* Split routing */}
                <div className="w-full max-w-sm relative h-10">
                  <div className="absolute left-1/2 top-0 w-0.5 h-6 bg-red-200 -translate-x-1/2"></div>
                  <div className="absolute left-12 right-12 top-6 h-0.5 bg-red-200"></div>
                  <div className="absolute left-12 top-6 w-0.5 h-4 bg-red-200"></div>
                  <div className="absolute right-12 top-6 w-0.5 h-4 bg-red-200"></div>
                </div>

                {/* End Nodes */}
                <div className="w-full flex justify-between gap-4">
                  <div className="w-1/2 bg-red-50 border border-red-200 shadow-sm p-3 rounded-xl relative z-10 ring-1 ring-red-500/30">
                    <div className="flex items-start gap-2 mb-2">
                      <FileDigit size={14} className="text-red-500" />
                      <div>
                        <p className="text-[10px] font-bold text-red-900 leading-tight">Global Infra Pvt Ltd</p>
                        <p className="text-[9px] text-red-600 uppercase tracking-widest mt-0.5">Shell Subcontractor</p>
                      </div>
                    </div>
                    <p className="text-xs font-black text-red-700">₹1.8 Cr (72%)</p>
                  </div>

                  <div className="w-1/2 bg-red-50 border border-red-200 shadow-sm p-3 rounded-xl relative z-10 ring-1 ring-red-500/30">
                    <div className="flex items-start gap-2 mb-2">
                      <FileDigit size={14} className="text-red-500" />
                      <div>
                        <p className="text-[10px] font-bold text-red-900 leading-tight">Nexus Consulting</p>
                        <p className="text-[9px] text-red-600 uppercase tracking-widest mt-0.5">Unregistered Entity</p>
                      </div>
                    </div>
                    <p className="text-xs font-black text-red-700">₹0.7 Cr (28%)</p>
                  </div>
                </div>

             </div>
             
             <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  <AlertTriangle size={12}/> High Probability of Fund Diversion Detected
                </span>
             </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
"""
write_file("frontend/src/pages/RiskIntelligence.tsx", risk_intel_content)

print("Advanced AI Forensics page created!")
