import React from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, ArrowDownToLine, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import type { ConstituencyRegion } from '../context/RoleContext';
import { generateOfficialHTML, downloadOfficialDocument } from '../utils/governmentForms';

interface GovernmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  region: ConstituencyRegion;
}

export const GovernmentFormModal: React.FC<GovernmentFormModalProps> = ({
  isOpen,
  onClose,
  reportTitle,
  region
}) => {
  if (!isOpen) return null;

  const htmlContent = generateOfficialHTML(reportTitle, region);

  const handleDownload = () => {
    downloadOfficialDocument(reportTitle, region);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 400);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border-2 border-slate-300 flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-150 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#072440] via-[#0B3C68] to-[#12558F] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-tight uppercase text-white truncate max-w-md">
                  {reportTitle}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8.5px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                  NIC-DSC VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-blue-200">
                Official Statutory Document • Government of India (GFR 2017 / GIGW 3.0 Standard)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer"
              title="Download signed official form"
            >
              <ArrowDownToLine size={14} />
              <span>Download Signed Copy</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Document Preview Frame */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/80 flex justify-center">
          <div className="w-full max-w-[800px] bg-white shadow-lg rounded-sm overflow-hidden border border-slate-300">
            <iframe
              srcDoc={htmlContent}
              title={reportTitle}
              className="w-full h-[680px] border-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Authenticated with National Informatics Centre (NIC) e-Hastakshar Digital Token</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
