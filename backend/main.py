from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import dashboard, works, alerts, chat, gnn

# Create DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MPLADS SENTINEL API",
    description="AI-Powered Monitoring & Risk Intelligence Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(works.router, prefix="/api/works", tags=["Works"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(gnn.router, prefix="/api/gnn", tags=["GNN Intelligence"])

@app.get("/")
def read_root():
    return {"status": "online", "message": "MPLADS Sentinel API is running"}
