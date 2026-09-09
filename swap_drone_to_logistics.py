import os
import re

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

risk = read_file("frontend/src/pages/ProjectRiskProfile.tsx")

# 1. Add new icons if not present
if "Truck," not in risk:
    risk = risk.replace("Megaphone, Activity } from 'lucide-react';", "Megaphone, Activity, Truck, Radar } from 'lucide-react';")

# 2. Remove the LiveDroneFeed component definition at the top
drone_component_pattern = r'const LiveDroneFeed = \(\) => \{.*?\n\};\n'
risk = re.sub(drone_component_pattern, '', risk, flags=re.DOTALL)

# 3. Define the new Logistics Forensics block
logistics_block = """
        {/* Supply Chain & Logistics Forensics */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white hover-lift overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-100 pb-4 pt-5 px-6 bg-slate-950 text-white">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Truck className="text-blue-400" size={18} /> Logistics & Supply Chain Forensics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col">
            
            <p className="text-xs text-slate-500 font-medium mb-4">
              AI cross-referencing contractor e-Way bills against National Highway Tolls (FASTag) and VAHAN registry.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
               <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><FileText size={12}/> Contractor Claim</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1.5"><Radar size={12}/> FASTag / Toll Truth</span>
               </div>
               
               <div className="flex items-center gap-2 py-1">
                  <div className="w-[40%]">
                     <p className="text-3xl font-black text-slate-900 leading-none">45</p>
                     <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Truck Trips Billed</p>
                  </div>
                  
                  <div className="w-[20%] flex flex-col items-center justify-center relative">
                     <div className="w-full h-px bg-slate-200 absolute top-1/2 -translate-y-1/2 z-0"></div>
                     <div className="w-10 h-10 bg-white border-2 border-red-100 rounded-full flex flex-col items-center justify-center shadow-sm relative z-10">
                       <span className="text-xs font-black text-red-600">26%</span>
                     </div>
                  </div>
                  
                  <div className="w-[40%] text-right">
                     <p className="text-3xl font-black text-red-600 leading-none">12</p>
                     <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1">Detected at Tolls</p>
                  </div>
               </div>
               
               {/* Visual disparity bar */}
               <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-4 flex">
                  <div className="h-full bg-red-500" style={{ width: '26%' }}></div>
               </div>
               <div className="flex justify-between mt-1.5">
                 <span className="text-[8px] font-bold text-red-600">Verified Delivery (26%)</span>
                 <span className="text-[8px] font-bold text-slate-400">Phantom Logistics (74%)</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
               <div className="bg-red-50/50 p-3 rounded-lg border border-red-100 shadow-sm">
                  <p className="text-[9px] font-bold text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1.5"><AlertTriangle size={10}/> Ghost Logistics</p>
                  <p className="text-[10px] text-red-900 font-medium leading-tight mt-1">33 trucks billed for cement delivery were not detected at any NHAI toll plaza within a 50km radius.</p>
               </div>
               <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 shadow-sm">
                  <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-1.5"><ShieldAlert size={10}/> VAHAN Registry Mismatch</p>
                  <p className="text-[10px] text-amber-900 font-medium leading-tight mt-1">4 submitted vehicle license plates belong to registered two-wheelers, not heavy transport vehicles.</p>
               </div>
            </div>
          </CardContent>
        </Card>
"""

# 4. Replace the old Drone block with the Logistics block
# The old drone block starts with: {/* Drone/Computer Vision Intelligence */}
drone_block_pattern = r'\{\/\* Drone\/Computer Vision Intelligence \*\/\}.*?(?=\{\/\* Public Sentiment \& Grievance Intelligence \*\/\})'

risk = re.sub(drone_block_pattern, logistics_block.strip() + '\n\n        ', risk, flags=re.DOTALL)

write_file("frontend/src/pages/ProjectRiskProfile.tsx", risk)
print("Logistics Forensics swapped in successfully!")
