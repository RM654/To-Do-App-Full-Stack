from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_recent_tasks(db: Session, limit: int = 5):
    return (
        db.query(models.Task)
        .filter(models.Task.is_done == False)
        .order_by(models.Task.created_at.desc())
        .limit(limit)
        .all()
    )

def create_task(db: Session, task_in: schemas.TaskCreate):
    task = models.Task(title=task_in.title, description=task_in.description)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def mark_task_done(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        return None
    task.is_done = True
    task.completed_at = datetime.utcnow()
    db.commit()
    db.refresh(task)
    return task
