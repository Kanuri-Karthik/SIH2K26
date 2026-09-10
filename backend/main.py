import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import dashboard, works, alerts, chat, gnn, live

# Create DB Tables
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Launch autonomous background live activity loop
    simulator_task = asyncio.create_task(live.live_simulator_loop())
    yield
    # Shutdown: Cleanly cancel background task
    simulator_task.cancel()
    try:
        await simulator_task
    except asyncio.CancelledError:
        pass

app = FastAPI(
    title="MPLADS SENTINEL API",
    description="AI-Powered Monitoring & Risk Intelligence Platform (Jan-Drishti)",
    version="1.0.0",
    lifespan=lifespan
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
app.include_router(live.router, prefix="/api/live", tags=["Live Realtime Engine"])

# Direct WebSocket alias for client flexibility
app.add_api_websocket_route("/ws/live", live.websocket_endpoint)

@app.get("/")
def read_root():
    return {
        "status": "online", 
        "message": "Jan-Drishti (MPLADS Sentinel) Real-Time API is running",
        "realtime": "enabled"
    }
