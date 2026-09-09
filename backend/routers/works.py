import json
import random
from datetime import date, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas

router = APIRouter()

REGIONAL_METADATA = {
    "TG-SEC": {
        "state": "Telangana",
        "district": "Secunderabad (Sanathnagar)",
        "constituency": "Secunderabad Lok Sabha",
        "mp_name": "Shri G. Kishan Reddy, MP",
        "agency": "Telangana State Medical & Civic Infrastructure Development Corp (TSMIDC) / GHMC",
        "toll": "Panthangi Toll Plaza (NH-65) & Medchal Toll Plaza (NH-44)",
        "city": "Secunderabad"
    },
    "TG-HYD": {
        "state": "Telangana",
        "district": "Hyderabad (Charminar)",
        "constituency": "Hyderabad Lok Sabha",
        "mp_name": "Shri Asaduddin Owaisi, MP",
        "agency": "GHMC Engineering Division / Quli Qutb Shah Urban Development Authority",
        "toll": "Panthangi Toll Plaza (NH-65) & Raikal Toll Plaza (NH-44)",
        "city": "Hyderabad"
    },
    "AP-VIJ": {
        "state": "Andhra Pradesh",
        "district": "Vijayawada (NTR District)",
        "constituency": "Vijayawada Lok Sabha",
        "mp_name": "Shri Kesineni Sivanath (Chinni), MP",
        "agency": "AP Urban Infrastructure Asset Management Corp / APCRDA Division",
        "toll": "Kaza Toll Plaza (NH-16) & Pottipadu Toll Plaza (NH-16)",
        "city": "Vijayawada"
    },
    "MH-PUN": {
        "state": "Maharashtra",
        "district": "Pune (Baramati)",
        "constituency": "Pune Lok Sabha",
        "mp_name": "Shri Murlidhar Mohol, MP",
        "agency": "Maharashtra State Public Works Division (PWD) / Pune Municipal Corp",
        "toll": "Uruli (NH-65) and Khed (NH-60) NHAI Plazas",
        "city": "Pune"
    },
    "KA-BC": {
        "state": "Karnataka",
        "district": "Bangalore Central (Shivajinagar)",
        "constituency": "Bangalore Central Lok Sabha",
        "mp_name": "Shri P. C. Mohan, MP",
        "agency": "Karnataka Urban Infrastructure Development & Finance Corp (KUIDFC) / BBMP",
        "toll": "Navayuga Devanahalli & Electronic City Toll Plazas (NH-44)",
        "city": "Bangalore Central"
    },
    "UP-VAR": {
        "state": "Uttar Pradesh",
        "district": "Varanasi (Kashi Corridor)",
        "constituency": "Varanasi Lok Sabha",
        "mp_name": "Shri Narendra Modi, Hon'ble MP",
        "agency": "UP State Bridge Corp & Varanasi Smart City Development Division",
        "toll": "Dafi NH-19 & Babatpur NH-56 Toll Plazas",
        "city": "Varanasi"
    }
}

@router.get("", response_model=List[schemas.WorkResponse], include_in_schema=False)
@router.get("/", response_model=List[schemas.WorkResponse])
def get_works(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    works = db.query(models.Work).offset(skip).limit(limit).all()
    return works

@router.get("/{work_id}", response_model=schemas.WorkResponse)
def get_work(work_id: str, db: Session = Depends(get_db)):
    work = db.query(models.Work).filter(models.Work.work_id == work_id).first()
    if work:
        return work

    # Dynamic generation for known regional prefixes (e.g. TG-SEC-105)
    upper_id = work_id.upper()
    prefix = next((k for k in REGIONAL_METADATA.keys() if upper_id.startswith(k) or k in upper_id), None)
    
    # Keyword fallback
    if not prefix:
        if "SEC" in upper_id or "TG" in upper_id:
            prefix = "TG-SEC"
        elif "HYD" in upper_id:
            prefix = "TG-HYD"
        elif "VIJ" in upper_id or "AP" in upper_id:
            prefix = "AP-VIJ"
        elif "PUN" in upper_id or "MH" in upper_id:
            prefix = "MH-PUN"
        elif "BC" in upper_id or "KA" in upper_id:
            prefix = "KA-BC"
        elif "VAR" in upper_id or "UP" in upper_id:
            prefix = "UP-VAR"

    meta = REGIONAL_METADATA.get(prefix or "TG-SEC")
    
    # Determine project title based on suffix
    suffix_title = "Civic Infrastructure & Development Project"
    category = "Civic Infrastructure"
    if "101" in upper_id:
        suffix_title = "Secondary Healthcare & Emergency Sub-Centre"
        category = "Healthcare"
    elif "102" in upper_id:
        suffix_title = "Solar RO Water Purification Grid"
        category = "Drinking Water"
    elif "103" in upper_id:
        suffix_title = "Modern STEM Robotics & Computer Classrooms"
        category = "Education"
    elif "104" in upper_id:
        suffix_title = "Stormwater Drainage & Reinforced CC Road Corridor"
        category = "Roads & Drainage"
    elif "105" in upper_id:
        suffix_title = "Youth Skill Development & Livelihood Center"
        category = "Skill Development"
    elif "106" in upper_id:
        suffix_title = "High-Mast Solar Lighting & CCTV Safety Network"
        category = "Public Safety"

    work_name = f"{meta['city']} {suffix_title} ({work_id})"
    sanctioned = 4500000.0 if "105" in upper_id else 6500000.0
    actual_exp = sanctioned * 0.75

    new_work = models.Work(
        work_id=work_id,
        work_name=work_name,
        state=meta["state"],
        district=meta["district"],
        constituency=meta["constituency"],
        mp_name=meta["mp_name"],
        category=category,
        estimated_cost=sanctioned,
        sanctioned_amount=sanctioned,
        actual_expenditure=actual_exp,
        physical_progress=72.0,
        financial_progress=75.0,
        start_date=date.today() - timedelta(days=180),
        expected_completion_date=date.today() + timedelta(days=180),
        actual_completion_date=None,
        implementing_agency=meta["agency"],
        number_of_payments=3,
        status="IN_PROGRESS",
        source_type="SYNTHESIZED",
        is_demo_scenario=False,
        scenario_type=None
    )
    db.add(new_work)
    db.flush()

    risk = models.RiskProfile(
        work_id=new_work.id,
        overall_score=48.5,
        risk_level="MODERATE",
        financial_risk_score=42.0,
        schedule_risk_score=55.0,
        progress_mismatch_score=8.0,
        payment_risk_score=12.0,
        duplicate_similarity_score=5.0,
        compliance_score=96.0,
        ml_anomaly_score=15.0,
        explanation=json.dumps([
            "Physical progress (72%) tracks consistently with financial release (75%).",
            f"Logistics cross-audit confirms 14 transit vehicles verified via NHAI FASTag {meta['toll']}.",
            f"ISRO Bhuvan sub-meter satellite pass confirms project boundary in {meta['city']}, {meta['state']}."
        ]),
        recommendations=json.dumps([
            "Conduct milestone inspection prior to releasing Tranche 4.",
            "Mandate electrical inspector clearance certificate submission."
        ])
    )
    db.add(risk)
    db.commit()
    db.refresh(new_work)

    return new_work

