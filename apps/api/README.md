Nexora AI
BACKEND
==============================

Production-oriented Python backend for an AI-powered SaaS platform.

The backend provides REST and GraphQL APIs, structured data validation,
async application services, database access, and AI/LLM integrations.


TECH STACK
==========

- Python 3.12+
- FastAPI
- Strawberry GraphQL
- SQLAlchemy
- PostgreSQL
- Pydantic
- AsyncIO
- Pytest
- Docker
- GitHub Actions
- Microsoft Azure


PROJECT STRUCTURE
=================

backend/
|
+-- app/
|   |
|   +-- api/
|   |   +-- routes/
|   |
|   +-- graphql/
|   |   +-- schema.py
|   |   +-- context.py
|   |
|   +-- services/
|   |
|   +-- models/
|   |   +-- common.py
|   |
|   +-- schemas/
|   |
|   +-- ai/
|   |
|   +-- core/
|       +-- config.py
|   |
|   +-- main.py
|
+-- tests/
|
+-- requirements.txt
+-- README.txt


ARCHITECTURE
============

The backend follows a layered architecture:

API
 |
 +-- REST endpoints
 |
 +-- GraphQL
       |
       v
Application Services
       |
       +-- Business Logic
       +-- AI Services
       +-- Data Access
       |
       v
Database / External Services


REST API
========

Health Check
------------

GET /api/health

Response:

{
    "status": "ok"
}


Root Endpoint
-------------

GET /

Response:

{
    "name": "Nexora AI",
    "status": "running"
}


GRAPHQL API
===========

Endpoint:

/graphql

Example query:

query {
    health
}

Expected response:

{
    "data": {
        "health": "ok"
    }
}


CONFIGURATION
=============

Configuration is managed through environment variables.

Example:

APP_ENV=development

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_native

LLM_API_KEY=


LOCAL DEVELOPMENT
=================

Create a virtual environment:

python3 -m venv .venv

Activate the environment:

source .venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Start the development server:

uvicorn app.main:app --reload


The backend will run at:

http://localhost:8000

FastAPI documentation:

http://localhost:8000/docs

GraphQL:

http://localhost:8000/graphql


DATABASE
========

PostgreSQL is used as the primary relational database.

SQLAlchemy provides the database abstraction layer.

The application is designed around async database access so that
database operations do not block the application event loop.


DATA VALIDATION
===============

Pydantic is used for structured request and response validation.

Example:

UserCreate
- email
- name

UserResponse
- id
- email
- name

Validation is performed at the API boundary before data reaches
application services.


ASYNC ARCHITECTURE
==================

The backend uses Python async/await for I/O-bound operations.

Async operations will be used for:

- Database queries
- External API calls
- LLM requests
- File and storage operations
- Background application workflows


AI INTEGRATION
==============

The AI layer is separated from the API and business logic.

AI functionality will support:

- LLM API integrations
- Prompt orchestration
- Structured AI responses
- AI-powered application workflows
- Input/output validation
- Error handling
- Observability
- Cost and latency considerations

AI services will be implemented behind application-level service
interfaces to keep the rest of the application independent from
specific LLM providers.


TESTING
=======

Backend tests use Pytest.

Run tests:

pytest

Tests will cover:

- REST endpoints
- GraphQL queries
- Application services
- Data validation
- Database operations
- AI service integrations


CODE QUALITY
============

The backend follows these principles:

- Strong typing
- Small, focused modules
- Separation of concerns
- Explicit dependency management
- Structured validation
- Testable services
- Consistent error handling
- Production-oriented logging
- Secure environment configuration


CI/CD
=====

GitHub Actions will be used for continuous integration.

The CI pipeline will validate:

- Python dependencies
- Tests
- Type checking
- Linting
- Application builds

Deployment pipelines will later support Azure environments.


AZURE
=====

The backend is designed for cloud deployment on Microsoft Azure.

Potential Azure services include:

- Azure Container Apps
- Azure Database for PostgreSQL
- Azure Storage
- Azure Key Vault
- Azure Monitor
- Azure networking


ROADMAP
=======

[ ] FastAPI application foundation
[ ] REST API structure
[ ] GraphQL schema
[ ] GraphQL context and dependency injection
[ ] PostgreSQL integration
[ ] Async SQLAlchemy
[ ] Database migrations
[ ] Authentication
[ ] User management
[ ] Role-based permissions
[ ] AI service layer
[ ] LLM integration
[ ] Background jobs
[ ] Application logging
[ ] Automated testing
[ ] CI/CD
[ ] Azure deployment
[ ] Monitoring and observability


STATUS
======

Early development.

The backend is being developed incrementally with a focus on
maintainability, scalability, security, testing, and production
deployment.

## Backend Development

```bash
cd apps/api
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
```

API: `http://localhost:8000`
Docs: `http://localhost:8000/docs`

### Verify

```bash
python -m uvicorn --version
python -m ruff check . --fix
python -m mypy app
python -m pytest -v
```

### Full Check

```bash
python -m ruff check . --fix
python -m ruff check .
python -m mypy app
python -m pytest -v
```
