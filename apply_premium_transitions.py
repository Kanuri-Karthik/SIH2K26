import os

def append_to_file(path, content):
    with open(path, "a", encoding="utf-8") as f:
        f.write("\n" + content + "\n")

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

# 1. Add ultra-smooth Stripe/Linear style keyframes to index.css
css_transitions = """
/* Premium UI Transitions */
@keyframes slideUpFade {
  0% { opacity: 0; transform: translateY(12px); filter: blur(2px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}

@keyframes slideRightFade {
  0% { opacity: 0; transform: translateX(-12px); }
  100% { opacity: 1; transform: translateX(0); }
}

.animate-slide-up {
  animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.stagger-1 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards; opacity: 0; }
.stagger-2 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.10s forwards; opacity: 0; }
.stagger-3 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; opacity: 0; }
.stagger-4 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.20s forwards; opacity: 0; }

.hover-lift {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04);
}

.btn-press {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s ease-out;
}
.btn-press:active {
  transform: scale(0.96);
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
"""

index_css = read_file("frontend/src/index.css")
if "Premium UI Transitions" not in index_css:
    append_to_file("frontend/src/index.css", css_transitions)

# 2. Update Layout.tsx (Sidebar & Topbar interactions)
layout = read_file("frontend/src/components/Layout.tsx")
layout = layout.replace('hover:bg-slate-50 hover:text-slate-900 font-medium', 'hover:bg-slate-50 hover:text-slate-900 font-medium btn-press')
layout = layout.replace('hover:bg-blue-800 transition-colors', 'hover:bg-blue-800 transition-colors btn-press')
layout = layout.replace('animate-in fade-in duration-300', 'animate-slide-up')
layout = layout.replace('animate-in fade-in duration-500', 'animate-slide-up')
# Enhance AI Copilot spring animation
layout = layout.replace('transition-all duration-300 origin-bottom-right', 'transition-all duration-500 origin-bottom-right ease-[cubic-bezier(0.16,1,0.3,1)]')
layout = layout.replace('hover:shadow-xl hover:-translate-y-1 transition-all', 'hover-lift btn-press')
write_file("frontend/src/components/Layout.tsx", layout)

# 3. Update NationalDashboard.tsx (Staggered cards, lifts)
dash = read_file("frontend/src/pages/NationalDashboard.tsx")
dash = dash.replace('animate-in fade-in duration-500', 'animate-slide-up')
# Add staggers to cards
dash = dash.replace('<Card className="border border-slate-200 shadow-sm rounded-2xl">', '<Card className="border border-slate-200/70 shadow-sm rounded-2xl hover-lift stagger-1">', 1)
dash = dash.replace('<Card className="border border-slate-200 shadow-sm rounded-2xl">', '<Card className="border border-slate-200/70 shadow-sm rounded-2xl hover-lift stagger-2">', 1)
dash = dash.replace('<Card className="border border-amber-200 bg-amber-50 shadow-sm rounded-2xl">', '<Card className="border border-amber-200 bg-amber-50 shadow-sm rounded-2xl hover-lift stagger-3">', 1)
dash = dash.replace('<Card className="border border-red-200 bg-red-50 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-all"', '<Card className="border border-red-200 bg-red-50 shadow-sm rounded-2xl cursor-pointer hover-lift stagger-4"')
# Big charts
dash = dash.replace('<Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-2xl">', '<Card className="lg:col-span-2 border border-slate-200/70 shadow-sm rounded-2xl stagger-3">')
dash = dash.replace('<Card className="border border-slate-200 shadow-sm rounded-2xl flex flex-col">', '<Card className="border border-slate-200/70 shadow-sm rounded-2xl flex flex-col hover-lift stagger-4">')
dash = dash.replace('hover:bg-blue-800 transition-all shadow-sm', 'hover-lift btn-press shadow-sm')
write_file("frontend/src/pages/NationalDashboard.tsx", dash)

# 4. Update ProjectRiskProfile.tsx (Staggered panels)
risk = read_file("frontend/src/pages/ProjectRiskProfile.tsx")
risk = risk.replace('animate-in fade-in duration-500', 'animate-slide-up')
risk = risk.replace('<div className="lg:col-span-1 space-y-8">', '<div className="lg:col-span-1 space-y-8 stagger-1">')
risk = risk.replace('<div className="lg:col-span-2 space-y-8">', '<div className="lg:col-span-2 space-y-8 stagger-2">')
risk = risk.replace('hover:bg-slate-50 transition-colors shadow-sm', 'hover:bg-slate-50 hover-lift btn-press shadow-sm')
write_file("frontend/src/pages/ProjectRiskProfile.tsx", risk)

# 5. Update ProjectExplorer.tsx (Row hover transitions & staggers)
exp = read_file("frontend/src/pages/ProjectExplorer.tsx")
exp = exp.replace('animate-in fade-in duration-500', 'animate-slide-up')
exp = exp.replace('<Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">', '<Card className="border border-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl bg-white overflow-hidden stagger-2">')
exp = exp.replace('hover:bg-blue-50/50 transition-colors group cursor-pointer', 'hover:bg-blue-50/50 transition-all duration-300 ease-out group cursor-pointer')
exp = exp.replace('hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all', 'hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300 btn-press')
exp = exp.replace('hover:bg-slate-50 transition-colors shadow-sm', 'hover:bg-slate-50 btn-press shadow-sm')
write_file("frontend/src/pages/ProjectExplorer.tsx", exp)

# 6. Update AlertCenter.tsx (Row hover transitions & staggers)
alert = read_file("frontend/src/pages/AlertCenter.tsx")
alert = alert.replace('animate-in fade-in duration-500', 'animate-slide-up')
alert = alert.replace('<Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">', '<Card className="border border-slate-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl bg-white overflow-hidden stagger-2">')
alert = alert.replace('hover:bg-slate-50 transition-colors group', 'hover:bg-slate-50 transition-colors duration-300 group')
alert = alert.replace('hover:border-blue-300 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all', 'hover:border-blue-300 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all duration-300 btn-press')
alert = alert.replace('hover:bg-slate-50 transition-colors shadow-sm', 'hover:bg-slate-50 btn-press shadow-sm')
write_file("frontend/src/pages/AlertCenter.tsx", alert)

# 7. Update GraphIntelligence.tsx (Smooth fade in)
graph = read_file("frontend/src/pages/GraphIntelligence.tsx")
graph = graph.replace('animate-in fade-in duration-500', 'animate-slide-up')
graph = graph.replace('<Card className="flex-1 border border-slate-200 shadow-sm rounded-2xl overflow-hidden relative bg-white flex">', '<Card className="flex-1 border border-slate-200/70 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden relative bg-white flex stagger-2">')
graph = graph.replace('hover:bg-slate-50', 'hover:bg-slate-50 btn-press')
write_file("frontend/src/pages/GraphIntelligence.tsx", graph)

print("Premium animations and transitions applied globally!")
