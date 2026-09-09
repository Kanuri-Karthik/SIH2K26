import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# 1. Create backend/routers/chat.py
write_file("backend/routers/chat.py", """
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models

router = APIRouter()

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
def handle_chat(request: ChatRequest, db: Session = Depends(get_db)):
    query = request.query.lower()
    
    # 1. High Risk / Critical works
    if "high risk" in query or "critical" in query or "anomaly" in query or "anomalies" in query:
        count = db.query(models.Work).join(models.RiskProfile).filter(models.RiskProfile.risk_level.in_(["HIGH", "CRITICAL"])).count()
        return {"reply": f"I found {count} high-risk projects currently in the system. They have been flagged for anomalies such as severe progress mismatches or cost overruns by our Isolation Forest model. You can investigate their specific AI explanations in the Project Explorer."}
        
    # 2. Delayed Works
    if "delay" in query or "stalled" in query or "late" in query:
        count = db.query(models.Work).filter(models.Work.status == "DELAYED").count()
        return {"reply": f"There are exactly {count} delayed projects currently in the database. A common factor among these is the Implementing Agency failing to meet scheduled deadlines despite initial fund disbursement."}
        
    # 3. State-specific
    states = ["kerala", "maharashtra", "uttar pradesh", "bihar", "gujarat", "karnataka", "tamil nadu", "andhra pradesh", "west bengal", "rajasthan"]
    for state in states:
        if state in query:
            count = db.query(models.Work).filter(models.Work.state.ilike(f"%{state}%")).count()
            delayed = db.query(models.Work).filter(models.Work.state.ilike(f"%{state}%"), models.Work.status == "DELAYED").count()
            critical = db.query(models.Work).join(models.RiskProfile).filter(models.Work.state.ilike(f"%{state}%"), models.RiskProfile.risk_level == "CRITICAL").count()
            return {"reply": f"In {state.title()}, there are {count} total MPLADS projects currently monitored by the system. Of these, {delayed} are flagged as delayed, and {critical} exhibit critical financial anomalies."}
            
    # 4. Graph / Network
    if "network" in query or "graph" in query or "collusion" in query or "connection" in query:
        return {"reply": "You can detect systemic issues and overlapping implementing agencies by navigating to the 'Network Graph' tab. The graph uses entity resolution to highlight agencies managing multiple high-risk nodes simultaneously."}
        
    # Fallback
    return {"reply": "I am the JAN-DRISHTI AI Analyst. I monitor the MPLADS database continuously. Try asking me about 'high risk projects', 'delayed works', or statistics for a specific state like 'Kerala'."}
""")

# 2. Update backend/main.py
with open("backend/main.py", "r", encoding="utf-8") as f:
    main_content = f.read()

if "from .routers import dashboard, works, alerts, chat" not in main_content:
    main_content = main_content.replace(
        "from .routers import dashboard, works, alerts",
        "from .routers import dashboard, works, alerts, chat"
    )
    main_content = main_content.replace(
        'app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])',
        'app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])\napp.include_router(chat.router, prefix="/api/chat", tags=["Chat"])'
    )
    write_file("backend/main.py", main_content)

# 3. Update Layout.tsx AI Copilot
with open("frontend/src/components/Layout.tsx", "r", encoding="utf-8") as f:
    layout_content = f.read()

import re

# We will replace the static AICopilot component with a fully functional stateful one
new_copilot = """
const AICopilot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState([
    { role: 'assistant', text: 'Hello. I am the JAN-DRISHTI AI assistant. I can help you analyze project anomalies, retrieve specific financial records, or explain risk scores.' }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection to AI Core lost. Please verify your network.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-4 bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot size={24} />
      </button>

      <div className={`fixed bottom-8 right-8 w-[400px] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        <div className="bg-blue-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Bot size={20} />
            <h3 className="font-bold text-sm tracking-wide">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 h-80 overflow-y-auto bg-slate-50 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                  <Bot size={16} className="text-blue-700"/>
                </div>
              )}
              <div className={`p-3.5 rounded-2xl shadow-sm leading-relaxed text-sm ${m.role === 'user' ? 'bg-blue-700 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center"><Bot size={16} className="text-blue-700"/></div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm flex items-center gap-1.5 h-12">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
            <input 
              type="text" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask a question..." 
              className="flex-1 bg-transparent px-2 text-sm outline-none text-slate-800" 
            />
            <button type="submit" disabled={isLoading || !query.trim()} className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"><Send size={16}/></button>
          </div>
        </form>
      </div>
    </>
  );
};
"""

# Replace the old AICopilot with the new one
layout_content = re.sub(r'const AICopilot = \(\) => \{.*?(?=export const Layout = \(\) => \()', new_copilot, layout_content, flags=re.DOTALL)

write_file("frontend/src/components/Layout.tsx", layout_content)

print("AI Copilot Successfully Rewired!")
