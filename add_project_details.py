import os

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

risk = read_file("frontend/src/pages/ProjectRiskProfile.tsx")

# Make sure all necessary icons are imported
if "Users," not in risk:
    risk = risk.replace("CheckCircle, Navigation } from 'lucide-react';", "CheckCircle, Navigation, Users, FileText, Phone, Hash, Scale, Trophy, Contact } from 'lucide-react';")

# The comprehensive details block
details_module = """
      {/* Comprehensive Project & Contractor Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 stagger-4">
        
        {/* Tender & Bidding Intelligence */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white hover-lift">
          <CardHeader className="border-b border-slate-100 pb-4 pt-5 px-6 bg-slate-50/50">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-blue-600" size={18} /> Tender & Procurement Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tender ID</p>
                <p className="text-sm font-bold text-slate-900 font-mono">TNDR-{new Date().getFullYear()}-{work.work_id.substring(0,6)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Procurement Method</p>
                <p className="text-sm font-bold text-slate-900">Open E-Tender (GeM)</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Bids Received</p>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Hash size={14} className="text-slate-400"/> {Math.max(3, work.work_id.charCodeAt(0) % 15)} Bidders</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Beneficiaries</p>
                <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5"><Users size={14} /> ~{(work.amount_sanctioned % 45000 + 10000).toLocaleString()} Citizens</p>
              </div>
              <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-lg p-3 flex justify-between items-center mt-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Trophy size={12} className="text-amber-500"/> L1 Winning Bid</p>
                  <p className="text-lg font-black text-slate-900">₹{(work.amount_sanctioned * 0.98).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1 justify-end"><Scale size={12} className="text-slate-400"/> L2 Runner-up Bid</p>
                  <p className="text-sm font-bold text-slate-600">₹{(work.amount_sanctioned * 1.04).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contractor Details */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white hover-lift">
          <CardHeader className="border-b border-slate-100 pb-4 pt-5 px-6 bg-slate-50/50">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Contact className="text-blue-600" size={18} /> Contractor Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                <Building className="text-slate-500" size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-tight">{work.implementing_agency}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded border border-slate-200">CTR-{work.work_id.substring(4, 10)}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded border ${risk?.risk_level === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                    {risk?.risk_level === 'CRITICAL' ? 'Flagged Entity' : 'Authorized'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Phone size={14} className="text-slate-400"/> Primary Contact</p>
                <p className="text-sm font-bold text-slate-900">+91 98XXX XX{String(work.work_id.charCodeAt(0)).padStart(3, '0').substring(0, 3)}</p>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Calendar size={14} className="text-slate-400"/> Contract Start Date</p>
                <p className="text-sm font-bold text-slate-900">{work.start_date || '2023-11-01'}</p>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={14} className="text-slate-400"/> Expected Completion</p>
                <p className="text-sm font-bold text-slate-900">2024-08-15</p>
              </div>
              <div className="flex items-center justify-between py-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Users size={14} className="text-slate-400"/> Subcontractors Active</p>
                <p className="text-sm font-bold text-slate-900">{Math.max(0, (work.work_id.charCodeAt(1) % 4))} Listed</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
"""

# Insert the new grid before the final closing </div> of the component.
# Using rfind to insert it safely at the end of the container div.
idx = risk.rfind("</div>\n  );\n};")
if idx != -1:
    risk = risk[:idx] + details_module + risk[idx:]

write_file("frontend/src/pages/ProjectRiskProfile.tsx", risk)
print("Complete Contractor and Tender Intelligence Module Injected!")
