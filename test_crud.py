from app import crud, models, schemas
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base

# In-memory test DB
engine = create_engine("sqlite:///:memory:")
TestingSessionLocal = sessionmaker(bind=engine)

def test_create_task():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    task_in = schemas.TaskCreate(title="Test", description="desc")
    task = crud.create_task(db, task_in)
    assert task.title == "Test"
    assert task.is_done == False
