from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine, Base

# Initialize FastAPI app
app = FastAPI()

# Enable CORS so the frontend (on a different port or domain) can call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/tasks", response_model=list[schemas.Task])
def list_tasks(db: Session = Depends(get_db)):
    return crud.get_recent_tasks(db)

@app.post("/api/tasks", response_model=schemas.Task)
def create_task(task_in: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task_in)

@app.post("/api/tasks/{task_id}/done", response_model=schemas.Task)
def mark_done(task_id: int, db: Session = Depends(get_db)):
    task = crud.mark_task_done(db, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
