from sqlalchemy import Column, Integer, String, Boolean, Text, TIMESTAMP
from sqlalchemy.sql import func
from .database import Base

class Task(Base):
    __tablename__ = "task"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    is_done = Column(Boolean, default=False, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
    completed_at = Column(TIMESTAMP(timezone=True), nullable=True)
