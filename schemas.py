from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    is_done: bool
    created_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        orm_mode = True
