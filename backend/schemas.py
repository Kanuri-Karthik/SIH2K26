from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class WorkBase(BaseModel):
    work_id: str
    work_name: str
    state: str
    district: str
    constituency: str
    mp_name: str
    category: str
    estimated_cost: float
    sanctioned_amount: float
    actual_expenditure: float
    physical_progress: float
    financial_progress: float
    start_date: Optional[date]
    expected_completion_date: Optional[date]
    actual_completion_date: Optional[date]
    implementing_agency: str
    number_of_payments: int
    status: str
    source_type: str
    is_demo_scenario: bool
    scenario_type: Optional[str]

class RiskProfileBase(BaseModel):
    overall_score: float
    risk_level: str
    financial_risk_score: float
    schedule_risk_score: float
    progress_mismatch_score: float
    payment_risk_score: float
    duplicate_similarity_score: float
    compliance_score: float
    ml_anomaly_score: float
    explanation: str
    recommendations: str

class RiskProfileResponse(RiskProfileBase):
    id: int
    updated_at: datetime
    
    class Config:
        orm_mode = True

class WorkResponse(WorkBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    risk_profile: Optional[RiskProfileResponse] = None
    
    class Config:
        orm_mode = True

class AlertBase(BaseModel):
    alert_id: str
    severity: str
    type: str
    status: str

class AlertResponse(AlertBase):
    id: int
    work_id: int
    detected_date: datetime
    work: Optional[WorkResponse] = None
    
    class Config:
        orm_mode = True

class DashboardOverview(BaseModel):
    total_allocation: float
    total_sanctioned: float
    total_expenditure: float
    utilization_rate: float
    active_works: int
    completed_works: int
    delayed_works: int
    high_risk_works: int
