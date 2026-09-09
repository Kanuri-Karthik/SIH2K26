# MPLADS SENTINEL (JAN-DRISHTI)

**AI-Powered Monitoring & Risk Intelligence Platform**

From fragmented project data to actionable risk intelligence. MPLADS Sentinel is a professional, government-grade platform designed to detect anomalies, fraud, and inefficiencies in MPLAD Scheme implementation.

## Features
- **National Monitor**: Real-time KPI tracking and anomaly trends.
- **Project Explorer**: Deep search and filtering across thousands of works.
- **Risk Profile**: Explainable AI scores (0-100) detailing exactly *why* a project is risky.
- **Jury Demo Mode**: Built-in interactive demonstrations for SIH judging, complete with curated high-risk scenarios.
- **Hybrid AI/ML Engine**: Uses `IsolationForest` (scikit-learn) combined with strict deterministic rules to find cost overruns, delays, and progress mismatches without hallucinating fraud.

## Architecture
- **Frontend**: React (TypeScript), Vite, Tailwind CSS, shadcn/ui inspired components, Recharts.
- **Backend**: Python, FastAPI, SQLAlchemy, Pydantic.
- **Database**: SQLite (SQLAlchemy ORM used for seamless Postgres transition).
- **Machine Learning**: `scikit-learn`, `pandas`.

## Running the Application Locally

### 1. Setup Backend
```bash
# Navigate to project directory
cd mplads-sentinel

# Create virtual env & install deps
python -m venv venv
.\\venv\\Scripts\\activate  # (Windows)
pip install fastapi uvicorn sqlalchemy pandas scikit-learn pydantic numpy python-multipart

# Generate synthetic dataset and run ML pipeline
python data_pipeline/generate_demo_data.py

# Start FastAPI server (Runs on port 8000)
uvicorn backend.main:app --reload --port 8000
```

### 2. Setup Frontend
```bash
# Open a new terminal
cd mplads-sentinel/frontend

# Install dependencies
npm install

# Start Vite dev server (Runs on port 5173)
npm run dev
```

## The "Killer Demo"
Navigate to the frontend at `http://localhost:5173/`.
Click the **"Launch Jury Demo"** button on the top right of the National Dashboard. This will guide the jury through a specifically curated edge case demonstrating how the system analyzes financial vs. physical progress mismatch using Explainable AI.
