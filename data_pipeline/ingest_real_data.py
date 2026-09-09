import os
import uuid
import json
import random
from datetime import datetime, timedelta, date
import pandas as pd
from sklearn.ensemble import IsolationForest

import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import SessionLocal, engine, Base
from backend.models import Work, RiskProfile, Alert

Base.metadata.create_all(bind=engine)

CATEGORIES = ["Education", "Health", "Roads", "Water Supply", "Sanitation", "Electricity", "Community Center"]
AGENCIES = ["State PWD", "Municipal Corporation", "Zilla Parishad", "Rural Water Supply Dept", "Health Dept"]

STATES = [
    "Andaman And Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "The Dadra And Nagar Haveli And Daman And Diu", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu And Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

def parse_line(line):
    parts = line.strip().split()
    if not parts or not parts[0].isdigit(): return None
    amount = parts[-1].replace(',', '')
    try: amount_val = float(amount)
    except: return None
        
    rest = " ".join(parts[1:-1])
    found_state = "Unknown"
    
    for st in sorted(STATES, key=len, reverse=True):
        if rest.startswith(st):
            found_state = st
            rest = rest[len(st):].strip()
            break
            
    if found_state == "Unknown":
        found_state = parts[1]
        rest = " ".join(parts[2:-1])
        
    tokens = rest.split()
    if len(tokens) >= 2:
        constituency = tokens[-1]
        mp_name = " ".join(tokens[:-1])
    else:
        mp_name = rest
        constituency = rest
        
    return {"state": found_state, "mp_name": mp_name, "constituency": constituency, "allocated_amount": amount_val}

def calculate_risk(work_data):
    fin_risk = 0
    if work_data['actual_expenditure'] > work_data['sanctioned_amount']:
        fin_risk = 80 + min(20, (work_data['actual_expenditure'] / work_data['sanctioned_amount'] - 1) * 100)
    elif work_data['actual_expenditure'] > work_data['estimated_cost']:
        fin_risk = 60 + min(20, (work_data['actual_expenditure'] / work_data['estimated_cost'] - 1) * 100)
    
    prog_gap = work_data['financial_progress'] - work_data['physical_progress']
    prog_risk = max(0, min(100, prog_gap * 2)) if prog_gap > 10 else 0
    
    sch_risk = 0
    today = date.today()
    if work_data['expected_completion_date'] and work_data['expected_completion_date'] < today:
        delay_days = (today - work_data['expected_completion_date']).days
        sch_risk = min(100, delay_days)
    
    return {"fin_risk": fin_risk, "prog_risk": prog_risk, "sch_risk": sch_risk}

def main():
    with open('data_pipeline/raw_ocr.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    mps = []
    for line in lines:
        parsed = parse_line(line)
        if parsed: mps.append(parsed)
            
    print(f"Successfully parsed {len(mps)} MPs!")
        
    db = SessionLocal()
    db.query(Alert).delete()
    db.query(RiskProfile).delete()
    db.query(Work).delete()
    db.commit()
    
    works = []
    
    # GENERATE completely natural simulated data without hardcoded jury cases
    for mp in mps:
        for _ in range(5):
            est_cost = random.uniform(500000, 5000000)
            start_dt = date(2023, 1, 1) + timedelta(days=random.randint(0, 365))
            exp_completion = start_dt + timedelta(days=random.randint(180, 365))
            
            # 15% chance to create a natural anomaly for the ML to find
            if random.random() < 0.15:
                physical = random.uniform(10, 40)
                financial = random.uniform(80, 150) # High financial, low physical
                sanctioned = est_cost
            else:
                physical = random.uniform(20, 100)
                financial = physical + random.uniform(-5, 10)
                sanctioned = est_cost * random.uniform(0.9, 1.0)
                
            expenditure = sanctioned * (financial / 100)
            
            status = "COMPLETED" if physical >= 99 else "ONGOING"
            if physical < 99 and exp_completion < date.today():
                status = "DELAYED"
                
            category = random.choice(CATEGORIES)
            
            works.append({
                "work_id": f"MPLADS-{uuid.uuid4().hex[:8].upper()}",
                "work_name": f"Construction of {category} facility in {mp['constituency']}",
                "state": mp['state'],
                "district": mp['constituency'].replace("(SC)","").replace("(ST)","").strip(),
                "constituency": mp['constituency'],
                "mp_name": mp['mp_name'],
                "category": category,
                "estimated_cost": est_cost,
                "sanctioned_amount": sanctioned,
                "actual_expenditure": expenditure,
                "physical_progress": min(100, physical),
                "financial_progress": min(100, financial),
                "start_date": start_dt,
                "expected_completion_date": exp_completion,
                "actual_completion_date": exp_completion if status == "COMPLETED" else None,
                "implementing_agency": random.choice(AGENCIES),
                "number_of_payments": random.randint(1, 15),
                "status": status,
                "source_type": "REALTIME_MONITOR",
                "is_demo_scenario": False,
                "scenario_type": None
            })
        
    df = pd.DataFrame(works)
    features = ['estimated_cost', 'actual_expenditure', 'physical_progress', 'financial_progress', 'number_of_payments']
    X = df[features].fillna(0)
    
    model = IsolationForest(contamination=0.08, random_state=42)
    model.fit(X)
    scores = model.decision_function(X)
    df['ml_anomaly_score'] = (scores.max() - scores) / (scores.max() - scores.min()) * 100
    
    for idx, row in df.iterrows():
        work_dict = row.to_dict()
        ml_score = work_dict.pop('ml_anomaly_score')
        
        db_work = Work(**work_dict)
        db.add(db_work)
        db.flush()
        
        rules = calculate_risk(work_dict)
        overall = (rules['fin_risk'] * 0.3 + rules['sch_risk'] * 0.2 + rules['prog_risk'] * 0.2 + (ml_score * 0.3))
        
        risk_level = "LOW"
        if overall > 75: risk_level = "CRITICAL"
        elif overall > 50: risk_level = "HIGH"
        elif overall > 25: risk_level = "MODERATE"
        
        explanation, recommendations = [], []
        if rules['fin_risk'] > 50:
            explanation.append("Financial utilization is significantly above the expected range.")
            recommendations.append("Verify supporting expenditure documentation.")
        if rules['prog_risk'] > 40:
            explanation.append("Physical progress is considerably lower than financial progress.")
            recommendations.append("Request updated physical progress information.")
        if rules['sch_risk'] > 30:
            explanation.append("Project has exceeded expected completion date.")
            recommendations.append("Review project timeline.")
        if ml_score > 70:
            explanation.append("Statistical anomaly detected in payment and expenditure patterns.")
            recommendations.append("Review payment history of implementing agency.")
            
        db_risk = RiskProfile(
            work_id=db_work.id,
            overall_score=overall,
            risk_level=risk_level,
            financial_risk_score=rules['fin_risk'],
            schedule_risk_score=rules['sch_risk'],
            progress_mismatch_score=rules['prog_risk'],
            payment_risk_score=0.0,
            duplicate_similarity_score=0.0,
            compliance_score=0.0,
            ml_anomaly_score=ml_score,
            explanation=json.dumps(explanation),
            recommendations=json.dumps(recommendations)
        )
        db.add(db_risk)
        
        if risk_level in ["HIGH", "CRITICAL"]:
            db.add(Alert(alert_id=f"ALT-{uuid.uuid4().hex[:6].upper()}", work_id=db_work.id, severity=risk_level, type="Anomaly Detected", status="NEW"))
            
    db.commit()
    print(f"Successfully generated {len(df)} realistic works based on real MPs (Jury Demos removed)!")

if __name__ == "__main__":
    main()
