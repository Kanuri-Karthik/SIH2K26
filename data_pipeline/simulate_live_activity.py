import time
import random
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.database import SessionLocal
from backend.models import Work, RiskProfile, Alert
from datetime import date

def main():
    print("Starting Live Activity Simulator...")
    db = SessionLocal()
    
    while True:
        try:
            # Pick a few random ONGOING works
            ongoing_works = db.query(Work).filter(Work.status == "ONGOING").all()
            if not ongoing_works:
                time.sleep(5)
                continue
                
            sample = random.sample(ongoing_works, min(5, len(ongoing_works)))
            
            for work in sample:
                # Simulate real-time progress update
                if random.random() < 0.5:
                    work.physical_progress = min(100, work.physical_progress + random.uniform(0.1, 2.0))
                
                # Simulate expenditure update
                if random.random() < 0.3:
                    work.actual_expenditure += random.uniform(10000, 50000)
                    work.financial_progress = min(200, (work.actual_expenditure / work.sanctioned_amount) * 100)
                
                if work.physical_progress >= 99:
                    work.status = "COMPLETED"
                    work.actual_completion_date = date.today()
                    
                # Recalculate risk profile
                if work.risk_profile:
                    rp = work.risk_profile
                    # simple recalculation logic
                    prog_gap = work.financial_progress - work.physical_progress
                    rp.progress_mismatch_score = max(0, min(100, prog_gap * 2)) if prog_gap > 10 else 0
                    
                    rp.financial_risk_score = 0
                    if work.actual_expenditure > work.sanctioned_amount:
                        rp.financial_risk_score = 80 + min(20, (work.actual_expenditure / work.sanctioned_amount - 1) * 100)
                        
                    rp.overall_score = (rp.financial_risk_score * 0.3 + rp.schedule_risk_score * 0.2 + rp.progress_mismatch_score * 0.2 + (rp.ml_anomaly_score * 0.3))
                    
                    if rp.overall_score > 75: rp.risk_level = "CRITICAL"
                    elif rp.overall_score > 50: rp.risk_level = "HIGH"
                    elif rp.overall_score > 25: rp.risk_level = "MODERATE"
                    else: rp.risk_level = "LOW"
                    
            db.commit()
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Simulated live updates for {len(sample)} works.", flush=True)
            
        except Exception as e:
            db.rollback()
            print("Error simulating activity:", e, flush=True)
            
        time.sleep(4)

if __name__ == "__main__":
    from datetime import datetime
    main()
