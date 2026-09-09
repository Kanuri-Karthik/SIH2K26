import os
import re

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

risk = read_file("frontend/src/pages/ProjectRiskProfile.tsx")

# Define the LiveDroneFeed component
live_drone_feed_component = """
const LiveDroneFeed = () => {
  const [box1, setBox1] = React.useState({ top: 30, left: 20, w: 120, h: 90, conf: 98 });
  const [box2, setBox2] = React.useState({ top: 60, left: 70, w: 40, h: 60, conf: 42 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBox1(prev => ({
        top: Math.max(10, Math.min(60, prev.top + (Math.random() * 4 - 2))),
        left: Math.max(10, Math.min(60, prev.left + (Math.random() * 4 - 2))),
        w: 120 + (Math.random() * 10 - 5),
        h: 90 + (Math.random() * 10 - 5),
        conf: Math.floor(Math.random() * 5) + 94
      }));
      setBox2(prev => ({
        top: Math.max(50, Math.min(80, prev.top + (Math.random() * 6 - 3))),
        left: Math.max(40, Math.min(80, prev.left + (Math.random() * 6 - 3))),
        w: 40 + (Math.random() * 6 - 3),
        h: 60 + (Math.random() * 6 - 3),
        conf: Math.floor(Math.random() * 12) + 38
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner mb-4 group cursor-crosshair">
      {/* Dynamic background pan simulation */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888081622-1d57571dbdb8?auto=format&fit=crop&w=800&q=80')] bg-[length:110%_110%] bg-center opacity-60 grayscale-[30%] mix-blend-luminosity animate-[pulse_4s_ease-in-out_infinite] transition-transform duration-[10000ms] ease-linear group-hover:scale-110"></div>
      
      {/* HUD Elements */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-white font-mono text-[10px] z-10">
        <Crosshair size={12} className="text-blue-400 animate-[spin_4s_linear_infinite]" /> UAV-77A TRACKING
      </div>
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        <span className="text-red-500 font-mono text-[10px] font-bold">LIVE REC</span>
      </div>

      {/* Live Bounding Box 1 */}
      <div 
        className="absolute border-2 border-red-500 bg-red-500/10 transition-all duration-[800ms] ease-linear flex flex-col justify-end z-10 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        style={{ top: `${box1.top}%`, left: `${box1.left}%`, width: `${box1.w}px`, height: `${box1.h}px` }}
      >
         <div className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider backdrop-blur-sm w-max whitespace-nowrap shadow-sm">
           Idle Machinery [{box1.conf}%]
         </div>
      </div>
      
      {/* Live Bounding Box 2 */}
      <div 
        className="absolute border-2 border-amber-500 bg-amber-500/10 transition-all duration-[800ms] ease-linear flex flex-col justify-end z-10 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
        style={{ top: `${box2.top}%`, left: `${box2.left}%`, width: `${box2.w}px`, height: `${box2.h}px` }}
      >
         <div className="bg-amber-500 text-slate-900 text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider backdrop-blur-sm w-max whitespace-nowrap shadow-sm">
           Worker [{box2.conf}%]
         </div>
      </div>

      {/* Scanning Laser */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[scan_3s_ease-in-out_infinite] z-20 pointer-events-none"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};
"""

# 1. Inject the component at the top, right after imports
if "const LiveDroneFeed" not in risk:
    import_end_idx = risk.find("export const ProjectRiskProfile")
    risk = risk[:import_end_idx] + live_drone_feed_component + "\n" + risk[import_end_idx:]

# 2. Replace the static HTML block with <LiveDroneFeed />
static_block_pattern = r'<div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner mb-4">.*?</div>\n\s*<div className="grid grid-cols-2 gap-4">'
replacement = '<LiveDroneFeed />\n\n            <div className="grid grid-cols-2 gap-4">'

risk = re.sub(static_block_pattern, replacement, risk, flags=re.DOTALL)

write_file("frontend/src/pages/ProjectRiskProfile.tsx", risk)
print("Drone CV Feed upgraded to Live React State!")
