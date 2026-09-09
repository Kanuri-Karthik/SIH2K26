from sqlalchemy import Column, Integer, String, Float, Date, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Work(Base):
    __tablename__ = "works"

    id = Column(Integer, primary_key=True, index=True)
    work_id = Column(String, unique=True, index=True)
    work_name = Column(String)
    state = Column(String, index=True)
    district = Column(String, index=True)
    constituency = Column(String, index=True)
    mp_name = Column(String, index=True)
    category = Column(String)
    
    estimated_cost = Column(Float)
    sanctioned_amount = Column(Float)
    actual_expenditure = Column(Float)
    
    physical_progress = Column(Float)  # 0 to 100
    financial_progress = Column(Float) # 0 to 100
    
    start_date = Column(Date, nullable=True)
    expected_completion_date = Column(Date, nullable=True)
    actual_completion_date = Column(Date, nullable=True)
    
    implementing_agency = Column(String)
    number_of_payments = Column(Integer, default=1)
    status = Column(String) # ONGOING, COMPLETED, DELAYED, STALLED
    
    source_type = Column(String) # REAL, DEMO
    is_demo_scenario = Column(Boolean, default=False)
    scenario_type = Column(String, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    risk_profile = relationship("RiskProfile", back_populates="work", uselist=False)
    alerts = relationship("Alert", back_populates="work")

class RiskProfile(Base):
    __tablename__ = "risk_profiles"

    id = Column(Integer, primary_key=True, index=True)
    work_id = Column(Integer, ForeignKey("works.id"))
    
    overall_score = Column(Float)
    risk_level = Column(String) # LOW, MODERATE, HIGH, CRITICAL
    
    financial_risk_score = Column(Float)
    schedule_risk_score = Column(Float)
    progress_mismatch_score = Column(Float)
    payment_risk_score = Column(Float)
    duplicate_similarity_score = Column(Float)
    compliance_score = Column(Float)
    
    ml_anomaly_score = Column(Float) # Output from Isolation Forest
    
    explanation = Column(String) # JSON string of contributing indicators
    recommendations = Column(String) # JSON string of recommended actions
    
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    work = relationship("Work", back_populates="risk_profile")

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    alert_id = Column(String, unique=True, index=True)
    work_id = Column(Integer, ForeignKey("works.id"))
    
    severity = Column(String) # HIGH, CRITICAL
    type = Column(String)
    detected_date = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String) # NEW, UNDER REVIEW, VERIFIED, FALSE POSITIVE, ACTION TAKEN, CLOSED
    
    work = relationship("Work", back_populates="alerts")
