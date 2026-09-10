from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/overview", response_model=schemas.DashboardOverview)
def get_dashboard_overview(db: Session = Depends(get_db)):
    total_sanctioned = db.query(func.sum(models.Work.sanctioned_amount)).scalar() or 0
    total_expenditure = db.query(func.sum(models.Work.actual_expenditure)).scalar() or 0
    
    # Assume allocation is roughly total_sanctioned + 10% for dummy data
    total_allocation = total_sanctioned * 1.1 
    
    utilization_rate = (total_expenditure / total_allocation * 100) if total_allocation > 0 else 0
    
    active_works = db.query(models.Work).filter(models.Work.status.in_(["IN_PROGRESS", "ONGOING"])).count()
    completed_works = db.query(models.Work).filter(models.Work.status == "COMPLETED").count()
    delayed_works = db.query(models.Work).filter(models.Work.status == "DELAYED").count()
    
    high_risk_works = db.query(models.RiskProfile).filter(models.RiskProfile.risk_level.in_(["HIGH", "CRITICAL"])).count()
    
    return {
        "total_allocation": total_allocation,
        "total_sanctioned": total_sanctioned,
        "total_expenditure": total_expenditure,
        "utilization_rate": utilization_rate,
        "active_works": active_works,
        "completed_works": completed_works,
        "delayed_works": delayed_works,
        "high_risk_works": high_risk_works
    }

@router.get("/states")
def get_states(db: Session = Depends(get_db)):
    states = db.query(models.Work.state).distinct().all()
    return [{"state": state[0]} for state in states if state[0]]
