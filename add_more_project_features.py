import os

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

risk = read_file("frontend/src/pages/ProjectRiskProfile.tsx")

# Make sure all necessary icons are imported
if "Camera," not in risk:
    risk = risk.replace("Trophy, Contact } from 'lucide-react';", "Trophy, Contact, Camera, Crosshair, MessageSquareWarning, ThumbsDown, Megaphone, Activity } from 'lucide-react';")

# The advanced features block
advanced_module = """
      {/* Advanced Threat Vectors & Social Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 stagger-5">
        
        {/* Drone/Computer Vision Intelligence */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white hover-lift overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-100 pb-4 pt-5 px-6 bg-slate-950 text-white">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Camera className="text-blue-400" size={18} /> Drone Computer Vision Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner mb-4">
              {/* Fallback pattern if image fails */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              {/* Construction site background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888081622-1d57571dbdb8?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60 grayscale-[30%] mix-blend-luminosity"></div>
              
              {/* HUD Elements */}
              <div className="absolute top-3 left-3 flex items-center gap-2 text-white font-mono text-[10px]">
                <Crosshair size={12} className="text-blue-400 animate-[spin_4s_linear_infinite]" /> UAV-77A TRACKING
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                <span className="text-red-500 font-mono text-[10px] font-bold">LIVE REC</span>
              </div>

              {/* Bounding Boxes */}
              <div className="absolute top-[30%] left-[20%] w-[120px] h-[90px] border-2 border-red-500 bg-red-500/10 transition-all duration-1000 flex flex-col justify-end">
                 <div className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider backdrop-blur-sm w-fit">
                   Idle Machinery [98%]
                 </div>
              </div>
              
              <div className="absolute bottom-[20%] right-[30%] w-[40px] h-[60px] border-2 border-amber-500 bg-amber-500/10 transition-all duration-1000 flex flex-col justify-end">
                 <div className="bg-amber-500 text-slate-900 text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider backdrop-blur-sm w-fit">
                   Worker [42%]
                 </div>
              </div>

              {/* Scanning Laser */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Labor Force Detected</p>
                  <p className="text-sm font-black text-red-600">3 Personnel</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Expected: 45+ for 80% progress</p>
               </div>
               <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Structural Integrity</p>
                  <p className="text-sm font-black text-amber-600">Sub-standard</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Material density anomaly detected</p>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Public Sentiment & Grievance Intelligence */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white hover-lift flex flex-col">
          <CardHeader className="border-b border-slate-100 pb-4 pt-5 px-6 bg-slate-50/50">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Megaphone className="text-blue-600" size={18} /> Citizen Sentinel & Grievance NLP
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
               <div className="relative w-16 h-16 rounded-full border-4 border-red-100 flex items-center justify-center">
                  <span className="text-xl font-black text-red-600">92</span>
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-red-500" strokeDasharray="92, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-slate-900">Highly Negative Sentiment</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Aggregated from CPGRAMS, Twitter(X), and local news portals.</p>
               </div>
            </div>

            <div className="space-y-3">
               <div className="p-3 bg-white border border-red-200 rounded-xl shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                  <div className="flex items-start justify-between mb-1.5">
                     <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                       <MessageSquareWarning size={10}/> CPGRAMS Portal
                     </span>
                     <span className="text-[9px] text-slate-400 font-bold">2 days ago</span>
                  </div>
                  <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                    "The foundation laid last month has already cracked after mild rain. No contractor has visited the site in 3 weeks."
                  </p>
               </div>

               <div className="p-3 bg-white border border-amber-200 rounded-xl shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                  <div className="flex items-start justify-between mb-1.5">
                     <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                       <Megaphone size={10}/> X (Twitter) NLP Extract
                     </span>
                     <span className="text-[9px] text-slate-400 font-bold">4 days ago</span>
                  </div>
                  <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                    "Total scam going on with the new community center allocation. Materials being diverted at night."
                  </p>
               </div>
            </div>

            <div className="mt-auto pt-5">
               <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors btn-press flex justify-center items-center gap-2">
                 <ThumbsDown size={14} className="text-red-500"/> Generate Whistleblower Report
               </button>
            </div>
          </CardContent>
        </Card>

      </div>
"""

# Insert the new grid before the final closing </div> of the component.
idx = risk.rfind("</div>\n  );\n};")
if idx != -1:
    risk = risk[:idx] + advanced_module + risk[idx:]

write_file("frontend/src/pages/ProjectRiskProfile.tsx", risk)
print("Drone CV & Grievance NLP Module Injected!")
