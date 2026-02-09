# To-do-List

# To‑Do App (Full Stack)

A full-stack To‑Do application built with:

- **Frontend**: React + Webpack + Babel, tested with Jest & Playwright  
- **Backend**: FastAPI + SQLAlchemy + Pydantic, tested with pytest  
- **Database**: PostgreSQL  
- **Container orchestration**: Docker & Docker Compose  

---



## Prerequisites

- Docker  
- Docker Compose  
- Node.js + Yarn (for local frontend dev / tests)  
- Python + pip (for local backend dev / tests)

---

## Build & Run (Docker Compose)

1. **Run the full stack**

   ```bash
   docker-compose up --build
   
This builds and starts:

PostgreSQL (service db) on host port 5432

Backend (FastAPI) on host port 8000

Frontend (served via NGINX) on host port 3000

Access the app

Frontend UI: http://localhost:3000

Backend API: http://localhost:8000/api/tasks

DB: accessible at localhost:5432 (for direct connection tools)

Stop and clean up

bash

docker-compose down -v
Use -v to remove volumes (clears your DB data).

 Running Tests
Backend (pytest + coverage)
From your project root:

bash

docker-compose run --rm backend pytest --cov=app tests/
This command runs pytest inside a new container for the backend service

The --cov=app flag generates coverage for your app module

The tests/ argument points to your backend tests

You can also run tests locally (outside Docker):

bash

cd backend
pip install -r requirements.txt
pytest --cov=app tests/
Frontend (Jest + React Testing Library)
From the frontend directory:

bash

yarn test
This runs your unit tests in _tests_ and tests folders (like App.test.js, TaskCard.test.js)

The results may be output to test-results/.last-run (or into the test-results folder) depending on your Jest config

Frontend End-to-End (Playwright)
Still in frontend:

bash

yarn test:e2e
Runs tests in tests/e2e/ (e.g. todo.spec.js)

These tests simulate full app flows (e.g. create a task, mark done)

Important: Make sure frontend + backend are running (via Docker or locally) so E2E tests can talk to them

Local Development (Optional)
You can run frontend and backend separately (outside Docker) for quicker development.

Backend Local
bash

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
This runs backend on localhost:8000.

Frontend Local
bash

cd frontend
yarn install
yarn start
This spins up the React dev server (Webpack) — typically on http://localhost:8080 (confirm port in config).
You may need to configure proxy or allow CORS in backend so that API calls from dev server succeed.

 Database Configuration
These settings are used via environment variables in your Docker setup:

POSTGRES_USER=postgres

POSTGRES_PASSWORD=postgres

POSTGRES_DB=todo

POSTGRES_HOST=db

POSTGRES_PORT=5432

These are defined in your docker-compose.yml for the backend service and the db service.

Notes & Tips
The backend uses Base.metadata.create_all(...) to automatically create any missing tables at startup, so no DB migrations are required out of the box.

The wait-for-it.sh script ensures that the backend waits for the PostgreSQL service to be reachable before starting.

NGINX is configured (via nginx.conf) to serve the frontend build and proxy /api/ requests to the backend.

If you run tests via docker-compose run, you’ll get a fresh environment (which is good for isolation).

By contrast, docker-compose exec backend pytest assumes the backend container is already running.

Cleanup Commands
To stop and remove the services + volumes:

bash

docker-compose down -v
To remove orphan containers and rebuild everything:

bash

docker-compose down --remove-orphans
docker-compose up --build
