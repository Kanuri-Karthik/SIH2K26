import sys
import os
import random
import uuid
import json
from datetime import datetime, timedelta, date
import pandas as pd
from sklearn.ensemble import IsolationForest

# Add parent directory to path so we can import backend models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import SessionLocal, engine, Base
from backend.models import Work, RiskProfile, Alert

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

STATES = ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat"]
DISTRICTS = {
    "Maharashtra": ["Pune", "Mumbai", "Nagpur", "Thane", "Nashik"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"]
}
CATEGORIES = ["Education", "Health", "Roads", "Water Supply", "Sanitation", "Electricity"]
AGENCIES = ["State PWD", "Municipal Corporation", "Zilla Parishad", "Rural Water Supply Dept", "Health Dept"]

def generate_random_date(start_year, end_year):
    start = date(start_year, 1, 1)
    end = date(end_year, 12, 31)
    return start + timedelta(days=random.randint(0, (end - start).days))

def calculate_risk(work_data):
    # Rule-based calculation for various risks
    
    # Financial Risk: High expenditure vs sanctioned
    fin_risk = 0
    if work_data['actual_expenditure'] > work_data['sanctioned_amount']:
        fin_risk = 80 + min(20, (work_data['actual_expenditure'] / work_data['sanctioned_amount'] - 1) * 100)
    elif work_data['actual_expenditure'] > work_data['estimated_cost']:
        fin_risk = 60 + min(20, (work_data['actual_expenditure'] / work_data['estimated_cost'] - 1) * 100)
    
    # Progress Mismatch Risk
    prog_gap = work_data['financial_progress'] - work_data['physical_progress']
    prog_risk = max(0, min(100, prog_gap * 2)) if prog_gap > 10 else 0
    
    # Schedule Risk
    sch_risk = 0
    today = date.today()
    if work_data['expected_completion_date'] and work_data['expected_completion_date'] < today:
        delay_days = (today - work_data['expected_completion_date']).days
        sch_risk = min(100, delay_days)
    
    return {
        "fin_risk": fin_risk,
        "prog_risk": prog_risk,
        "sch_risk": sch_risk
    }

def main():
    db = SessionLocal()
    
    # Clear existing data for fresh generation
    db.query(Alert).delete()
    db.query(RiskProfile).delete()
    db.query(Work).delete()
    
    works = []
    
    # 1. GENERATE NORMAL DATA (950 records)
    print("Generating normal records...")
    for i in range(950):
        state = random.choice(STATES)
        district = random.choice(DISTRICTS[state])
        est_cost = random.uniform(500000, 5000000)
        
        start_dt = generate_random_date(2023, 2024)
        exp_completion = start_dt + timedelta(days=random.randint(180, 365))
        
        # Normal progress
        physical = random.uniform(20, 100)
        financial = physical + random.uniform(-5, 10) # slightly ahead or behind
        
        sanctioned = est_cost * random.uniform(0.9, 1.0)
        expenditure = sanctioned * (financial / 100)
        
        status = "COMPLETED" if physical >= 99 else "ONGOING"
        
        work = {
            "work_id": f"MPLADS-{uuid.uuid4().hex[:8].upper()}",
            "work_name": f"Construction of {random.choice(CATEGORIES)} facility in {district}",
            "state": state,
            "district": district,
            "constituency": f"{district} Central",
            "mp_name": f"Hon. MP {uuid.uuid4().hex[:4].upper()}",
            "category": random.choice(CATEGORIES),
            "estimated_cost": est_cost,
            "sanctioned_amount": sanctioned,
            "actual_expenditure": expenditure,
            "physical_progress": min(100, physical),
            "financial_progress": min(100, financial),
            "start_date": start_dt,
            "expected_completion_date": exp_completion,
            "actual_completion_date": exp_completion if status == "COMPLETED" else None,
            "implementing_agency": random.choice(AGENCIES),
            "number_of_payments": random.randint(1, 5),
            "status": status,
            "source_type": "DEMO",
            "is_demo_scenario": False,
            "scenario_type": None
        }
        works.append(work)

    # 2. GENERATE CURATED JURY CASES
    print("Generating curated jury cases...")
    
    jury_cases = [
        {
            "scenario": "CASE 01: High Cost Overrun",
            "modifications": {
                "estimated_cost": 2000000,
                "sanctioned_amount": 2000000,
                "actual_expenditure": 3500000,
                "physical_progress": 100,
                "financial_progress": 175,
                "status": "COMPLETED"
            }
        },
        {
            "scenario": "CASE 02: Financial vs Physical Progress Mismatch",
            "modifications": {
                "estimated_cost": 4000000,
                "sanctioned_amount": 4000000,
                "actual_expenditure": 3520000,
                "physical_progress": 43, # Very low
                "financial_progress": 88, # Very high
                "status": "ONGOING"
            }
        },
        {
            "scenario": "CASE 03: Delayed Project",
            "modifications": {
                "start_date": date(2022, 1, 1),
                "expected_completion_date": date(2022, 12, 31),
                "physical_progress": 30,
                "financial_progress": 35,
                "status": "DELAYED"
            }
        },
        {
            "scenario": "CASE 04: Potential Duplicate",
            "modifications": {
                "work_name": "EXACT SAME NAME AS ANOTHER PROJECT (Verification needed)",
                "number_of_payments": 12
            }
        },
        {
            "scenario": "CASE 07: Combined High-Risk Project",
            "modifications": {
                "estimated_cost": 5000000,
                "sanctioned_amount": 5000000,
                "actual_expenditure": 6000000,
                "physical_progress": 30,
                "financial_progress": 120,
                "expected_completion_date": date.today() - timedelta(days=200),
                "status": "STALLED",
                "number_of_payments": 18
            }
        }
    ]
    
    for case in jury_cases:
        base_work = works[0].copy() # take a template
        base_work["work_id"] = f"MPLADS-JURY-{uuid.uuid4().hex[:4].upper()}"
        base_work["is_demo_scenario"] = True
        base_work["scenario_type"] = case["scenario"]
        
        for k, v in case["modifications"].items():
            base_work[k] = v
            
        works.append(base_work)
        
    df = pd.DataFrame(works)
    
    # 3. RUN ISOLATION FOREST FOR ANOMALY DETECTION
    print("Running Isolation Forest...")
    features = ['estimated_cost', 'actual_expenditure', 'physical_progress', 'financial_progress', 'number_of_payments']
    X = df[features].fillna(0)
    
    model = IsolationForest(contamination=0.05, random_state=42)
    model.fit(X)
    
    # Decision function returns raw scores, smaller/more negative = more anomalous
    scores = model.decision_function(X)
    
    # Normalize to 0-100 where 100 is highly anomalous
    scores_norm = (scores.max() - scores) / (scores.max() - scores.min()) * 100
    df['ml_anomaly_score'] = scores_norm
    
    # 4. INSERT INTO DATABASE
    print("Saving to database...")
    for idx, row in df.iterrows():
        # Insert Work
        work_dict = row.to_dict()
        ml_score = work_dict.pop('ml_anomaly_score')
        
        db_work = Work(**work_dict)
        db.add(db_work)
        db.flush() # get ID
        
        # Calculate rule risks
        rules = calculate_risk(work_dict)
        
        # Composite score
        overall = (
            rules['fin_risk'] * 0.3 + 
            rules['sch_risk'] * 0.2 + 
            rules['prog_risk'] * 0.2 + 
            (ml_score * 0.3)
        )
        
        risk_level = "LOW"
        if overall > 75: risk_level = "CRITICAL"
        elif overall > 50: risk_level = "HIGH"
        elif overall > 25: risk_level = "MODERATE"
        
        # Explainable AI logic
        explanation = []
        recommendations = []
        
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
            db_alert = Alert(
                alert_id=f"ALT-{uuid.uuid4().hex[:6].upper()}",
                work_id=db_work.id,
                severity=risk_level,
                type="Anomaly Detected",
                status="NEW"
            )
            db.add(db_alert)
            
    db.commit()
    print(f"Successfully generated and inserted {len(df)} records.")

if __name__ == "__main__":
    main()
