import asyncio
import random
import time
import uuid
from collections import deque
from datetime import datetime, date
from typing import List, Optional, Dict, Any

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import SessionLocal, get_db
from .. import models, schemas

router = APIRouter()

# ---------------------------------------------------------------------------
# In-Memory Event Ring Buffer & Connection Manager
# ---------------------------------------------------------------------------
MAX_EVENT_HISTORY = 100
live_events_buffer: deque = deque(maxlen=MAX_EVENT_HISTORY)
is_simulator_active: bool = True
simulator_speed_seconds: float = 3.2

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        dead_connections = []
        for connection in list(self.active_connections):
            try:
                await connection.send_json(message)
            except Exception:
                dead_connections.append(connection)
        for dead in dead_connections:
            self.disconnect(dead)

manager = ConnectionManager()

# ---------------------------------------------------------------------------
# Telemetry Event Generators & Plazas
# ---------------------------------------------------------------------------
TOLL_PLAZAS = [
    {"plaza": "Panthangi Toll Plaza (NH-65)", "state": "Telangana", "city": "Secunderabad/Hyderabad"},
    {"plaza": "Medchal Toll Plaza (NH-44)", "state": "Telangana", "city": "Secunderabad"},
    {"plaza": "Kaza Toll Plaza (NH-16)", "state": "Andhra Pradesh", "city": "Vijayawada"},
    {"plaza": "Pottipadu Toll Plaza (NH-16)", "state": "Andhra Pradesh", "city": "Vijayawada/Krishna"},
    {"plaza": "Uruli Toll Plaza (NH-65)", "state": "Maharashtra", "city": "Pune"},
    {"plaza": "Khed Toll Plaza (NH-60)", "state": "Maharashtra", "city": "Pune"},
    {"plaza": "Navayuga Devanahalli (NH-44)", "state": "Karnataka", "city": "Bangalore Central"},
    {"plaza": "Electronic City Tollway (NH-44)", "state": "Karnataka", "city": "Bangalore South"},
    {"plaza": "Dafi Toll Plaza (NH-19)", "state": "Uttar Pradesh", "city": "Varanasi"},
    {"plaza": "Babatpur NH-56 Corridor", "state": "Uttar Pradesh", "city": "Varanasi Airport"}
]

VEHICLE_SERIES = ["TS08-UA-", "TS09-EB-", "AP16-TJ-", "MH12-RN-", "KA03-MG-", "UP65-BT-", "DL01-AC-"]
MATERIAL_LOADS = ["Ready-Mix Concrete Grade M30", "Reinforcement Steel TMT 500D", "Crushed Stone Aggregate 20mm", "HDPE Potable Water Pipes 160mm", "Solar Photovoltaic Inverter Kits", "Fly-Ash Structural Bricks"]

def get_current_overview(db: Session) -> dict:
    total_sanctioned = db.query(func.sum(models.Work.sanctioned_amount)).scalar() or 0
    total_expenditure = db.query(func.sum(models.Work.actual_expenditure)).scalar() or 0
    total_allocation = total_sanctioned * 1.1
    utilization_rate = (total_expenditure / total_allocation * 100) if total_allocation > 0 else 0
    
    active_works = db.query(models.Work).filter(models.Work.status.in_(["IN_PROGRESS", "ONGOING"])).count()
    completed_works = db.query(models.Work).filter(models.Work.status == "COMPLETED").count()
    delayed_works = db.query(models.Work).filter(models.Work.status == "DELAYED").count()
    high_risk_works = db.query(models.RiskProfile).filter(models.RiskProfile.risk_level.in_(["HIGH", "CRITICAL"])).count()
    
    return {
        "total_allocation": round(total_allocation, 2),
        "total_sanctioned": round(total_sanctioned, 2),
        "total_expenditure": round(total_expenditure, 2),
        "utilization_rate": round(utilization_rate, 2),
        "active_works": active_works,
        "completed_works": completed_works,
        "delayed_works": delayed_works,
        "high_risk_works": high_risk_works,
        "timestamp": datetime.now().isoformat()
    }

def execute_simulation_step() -> Optional[dict]:
    db = SessionLocal()
    try:
        ongoing_works = db.query(models.Work).filter(models.Work.status.in_(["IN_PROGRESS", "ONGOING", "DELAYED"])).all()
        if not ongoing_works or len(ongoing_works) < 5:
            # If few active works, re-activate a completed work or grab any work to keep stream alive
            additional = db.query(models.Work).order_by(func.random()).limit(10).all()
            for w in additional:
                if w not in ongoing_works:
                    if w.physical_progress >= 98:
                        w.physical_progress = round(random.uniform(40.0, 75.0), 1)
                        w.status = "IN_PROGRESS"
                    ongoing_works.append(w)
            db.commit()
            
        if not ongoing_works:
            return None
        
        sample_work = random.choice(ongoing_works)
        event_kind = random.choices(
            ["PROGRESS", "FASTAG", "DISBURSEMENT", "SATELLITE", "ALERT"],
            weights=[35, 30, 15, 12, 8]
        )[0]
        
        event_payload = {}
        updated_works_list = []
        
        if event_kind == "PROGRESS":
            increment = round(random.uniform(0.3, 1.8), 2)
            sample_work.physical_progress = min(100.0, round(sample_work.physical_progress + increment, 2))
            
            if sample_work.physical_progress >= 99.5:
                sample_work.status = "COMPLETED"
                sample_work.actual_completion_date = date.today()
                title = f"Work Completed: {sample_work.work_id}"
                desc = f"{sample_work.work_name[:65]} reached 100% completion in {sample_work.district}, {sample_work.state}."
                severity = "SUCCESS"
            else:
                title = f"Physical Progress Update (+{increment}%)"
                desc = f"{sample_work.work_id} ({sample_work.work_name[:50]}) advanced to {sample_work.physical_progress}% in {sample_work.district}."
                severity = "INFO"
                
            event_payload = {
                "id": str(uuid.uuid4())[:8],
                "type": "PROGRESS_UPDATE",
                "timestamp": datetime.now().isoformat(),
                "title": title,
                "description": desc,
                "work_id": sample_work.work_id,
                "work_name": sample_work.work_name,
                "state": sample_work.state,
                "district": sample_work.district,
                "severity": severity,
                "metadata": {
                    "progress": sample_work.physical_progress,
                    "increment": increment,
                    "status": sample_work.status
                }
            }
            updated_works_list.append({
                "work_id": sample_work.work_id,
                "physical_progress": sample_work.physical_progress,
                "financial_progress": sample_work.financial_progress,
                "actual_expenditure": sample_work.actual_expenditure,
                "status": sample_work.status
            })
            
        elif event_kind == "FASTAG":
            toll = random.choice(TOLL_PLAZAS)
            vehicle = random.choice(VEHICLE_SERIES) + str(random.randint(1000, 9999))
            material = random.choice(MATERIAL_LOADS)
            axles = random.choice([2, 3, 4])
            weight_tons = round(random.uniform(14.0, 32.5), 1)
            
            event_payload = {
                "id": str(uuid.uuid4())[:8],
                "type": "FASTAG_TRANSIT",
                "timestamp": datetime.now().isoformat(),
                "title": f"FASTag Material Transit: {toll['plaza']}",
                "description": f"Heavy Vehicle {vehicle} carrying {material} ({weight_tons} Tons) cleared {toll['plaza']} for {sample_work.work_id}.",
                "work_id": sample_work.work_id,
                "work_name": sample_work.work_name,
                "state": toll["state"],
                "district": toll["city"],
                "severity": "INFO",
                "metadata": {
                    "vehicle_no": vehicle,
                    "toll_plaza": toll["plaza"],
                    "material": material,
                    "weight_tons": weight_tons,
                    "axles": axles
                }
            }
            
        elif event_kind == "DISBURSEMENT":
            disb_amount = round(random.uniform(50000, 350000), 2)
            sample_work.actual_expenditure = round(sample_work.actual_expenditure + disb_amount, 2)
            if sample_work.sanctioned_amount > 0:
                sample_work.financial_progress = round(min(200.0, (sample_work.actual_expenditure / sample_work.sanctioned_amount) * 100), 2)
                
            pfms_ref = f"PFMS-2026-{random.randint(100000, 999999)}"
            event_payload = {
                "id": str(uuid.uuid4())[:8],
                "type": "DISBURSEMENT",
                "timestamp": datetime.now().isoformat(),
                "title": f"PFMS Treasury Tranche: ₹{(disb_amount/100000):.2f} Lakh",
                "description": f"State Planning Cell disbursed ₹{(disb_amount/100000):.2f} Lakh (Ref: {pfms_ref}) for {sample_work.work_id}. Total: ₹{(sample_work.actual_expenditure/100000):.2f} Lakh.",
                "work_id": sample_work.work_id,
                "work_name": sample_work.work_name,
                "state": sample_work.state,
                "district": sample_work.district,
                "severity": "SUCCESS",
                "metadata": {
                    "amount": disb_amount,
                    "pfms_ref": pfms_ref,
                    "total_expenditure": sample_work.actual_expenditure,
                    "financial_progress": sample_work.financial_progress
                }
            }
            updated_works_list.append({
                "work_id": sample_work.work_id,
                "physical_progress": sample_work.physical_progress,
                "financial_progress": sample_work.financial_progress,
                "actual_expenditure": sample_work.actual_expenditure,
                "status": sample_work.status
            })
            
        elif event_kind == "SATELLITE":
            conf = round(random.uniform(88.5, 99.2), 1)
            event_payload = {
                "id": str(uuid.uuid4())[:8],
                "type": "SATELLITE_PASS",
                "timestamp": datetime.now().isoformat(),
                "title": "ISRO Bhuvan Sub-Meter Pass Verified",
                "description": f"Cartosat-3 high-resolution multispectral scan validated project footprint for {sample_work.work_id} in {sample_work.district} (Confidence: {conf}%).",
                "work_id": sample_work.work_id,
                "work_name": sample_work.work_name,
                "state": sample_work.state,
                "district": sample_work.district,
                "severity": "INFO",
                "metadata": {
                    "satellite": "ISRO Cartosat-3 / Bhuvan 2.0",
                    "resolution": "0.28m Multi-Spectral",
                    "confidence": conf,
                    "cloud_cover": "2.4%"
                }
            }
            
        else: # ALERT
            alert_id = f"ALT-LIVE-{random.randint(1000, 9999)}"
            severity = "CRITICAL" if random.random() < 0.3 else "WARNING"
            alert_types = [
                "Physical Progress Deficit vs Milestone Schedule",
                "Unusual Expenditure Surge without FASTag Inward Gate Matched",
                "Clause 14B Ground Deviation Flagged by Drone Lidar",
                "Potential Cross-Constituency Contractor Concentration Alert"
            ]
            chosen_type = random.choice(alert_types)
            
            if sample_work.risk_profile:
                sample_work.risk_profile.overall_score = min(100.0, sample_work.risk_profile.overall_score + 2.5)
                
            event_payload = {
                "id": alert_id,
                "type": "ALERT_TRIGGER",
                "timestamp": datetime.now().isoformat(),
                "title": f"{severity}: {chosen_type}",
                "description": f"Automated Forensics detected statutory anomaly on {sample_work.work_id} ({sample_work.work_name[:45]}) in {sample_work.state}.",
                "work_id": sample_work.work_id,
                "work_name": sample_work.work_name,
                "state": sample_work.state,
                "district": sample_work.district,
                "severity": severity,
                "metadata": {
                    "alert_id": alert_id,
                    "alert_type": chosen_type,
                    "severity": severity
                }
            }
            
        db.commit()
        overview = get_current_overview(db)
        live_events_buffer.appendleft(event_payload)
        
        return {
            "event": event_payload,
            "overview": overview,
            "updated_works": updated_works_list
        }
    except Exception as e:
        db.rollback()
        print("Simulation step error:", e)
        return None
    finally:
        db.close()

# ---------------------------------------------------------------------------
# Background Async Loop for FastAPI Lifespan
# ---------------------------------------------------------------------------
async def live_simulator_loop():
    print("[Live Engine] Realtime simulator loop started.")
    while True:
        try:
            if is_simulator_active:
                result = execute_simulation_step()
                if result:
                    await manager.broadcast({
                        "type": "LIVE_TICK",
                        "data": result
                    })
            await asyncio.sleep(simulator_speed_seconds)
        except asyncio.CancelledError:
            print("[Live Engine] Realtime simulator cancelled.")
            break
        except Exception as ex:
            print("[Live Engine] Error in background loop:", ex)
            await asyncio.sleep(3.0)

# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global is_simulator_active
    await manager.connect(websocket)
    db = SessionLocal()
    try:
        overview = get_current_overview(db)
        await websocket.send_json({
            "type": "INITIAL_STATE",
            "data": {
                "overview": overview,
                "events": list(live_events_buffer)[:30],
                "simulator_active": is_simulator_active,
                "server_time": datetime.now().isoformat()
            }
        })
        
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            if action == "ping":
                await websocket.send_json({"type": "PONG", "timestamp": datetime.now().isoformat()})
            elif action == "trigger_tick":
                tick_result = execute_simulation_step()
                if tick_result:
                    await manager.broadcast({"type": "LIVE_TICK", "data": tick_result})
            elif action == "toggle_simulation":
                is_simulator_active = not is_simulator_active
                await manager.broadcast({"type": "SIMULATOR_STATE", "active": is_simulator_active})
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception:
        manager.disconnect(websocket)
    finally:
        db.close()

@router.get("/status")
def get_live_status(db: Session = Depends(get_db)):
    overview = get_current_overview(db)
    return {
        "status": "online",
        "active_websocket_clients": len(manager.active_connections),
        "simulator_active": is_simulator_active,
        "events_count": len(live_events_buffer),
        "latest_event": live_events_buffer[0] if live_events_buffer else None,
        "overview": overview,
        "server_time": datetime.now().isoformat()
    }

@router.get("/events")
def get_recent_events(limit: int = 30):
    return list(live_events_buffer)[:limit]

@router.post("/simulate-tick")
async def trigger_simulate_tick():
    result = execute_simulation_step()
    if result:
        await manager.broadcast({"type": "LIVE_TICK", "data": result})
        return {"status": "success", "event": result["event"]}
    return {"status": "no_works_available"}

@router.post("/toggle")
async def toggle_simulator():
    global is_simulator_active
    is_simulator_active = not is_simulator_active
    await manager.broadcast({"type": "SIMULATOR_STATE", "active": is_simulator_active})
    return {"status": "success", "simulator_active": is_simulator_active}
