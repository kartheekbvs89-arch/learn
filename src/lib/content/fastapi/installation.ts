import { Lesson } from '../../types';

export const fastapiL1: Lesson = {
  slug: 'installation',
  title: 'Installation, Project Structure, First API',
  subtitle: 'Set up FastAPI like a senior engineer — uvicorn, project layout, first endpoints',
  duration: 65,
  difficulty: 'Beginner',
  phase: 'Foundation',
  xp: 100,
  moduleSlug: 'fastapi',

  objectives: [
    'Install FastAPI + uvicorn and run a dev server with auto-reload',
    'Structure a FastAPI project with proper separation of concerns',
    'Create GET, POST, PUT, DELETE endpoints with type hints',
    'Access auto-generated Swagger UI at /docs and ReDoc at /redoc',
    'Understand the request lifecycle: ASGI server → middleware → router → handler',
  ],
  realWorldContext: 'At companies like Uber, Netflix, and Microsoft, FastAPI is used for microservices, ML model serving, and internal tools. The project structure you learn here is the same pattern used in production: separate routers for each domain, shared dependencies, and configuration via environment variables. This is day-one knowledge for any backend Python engineer.',
  prerequisites: [
    'Completed Python Module (or equivalent Python knowledge)',
    'Understand HTTP methods (GET, POST, PUT, DELETE)',
    'Basic understanding of JSON',
    'Python 3.12+ installed with pyenv',
  ],

  conceptDiagram: `┌──────────────────────────────────────────────────────────┐
│                    CLIENT (browser, mobile, CLI)          │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTP request
                         ▼
┌──────────────────────────────────────────────────────────┐
│  ASGI SERVER (Uvicorn)                                    │
│  • Receives HTTP request                                  │
│  • Converts to ASGI event                                │
│  • Calls FastAPI app                                     │
└────────────────────────┬─────────────────────────────────┘
                         │ ASGI call
                         ▼
┌──────────────────────────────────────────────────────────┐
│  MIDDLEWARE STACK                                         │
│  • CORS (allow cross-origin)                              │
│  • GZip (compress responses)                              │
│  • Custom middleware (logging, timing, request-id)        │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│  ROUTER                                                   │
│  • Matches URL path (/api/v1/users)                      │
│  • Identifies HTTP method (GET, POST, etc.)              │
│  • Resolves dependencies (Depends)                       │
│  • Validates input with Pydantic                         │
└────────────────────────┬─────────────────────────────────┘
                         │ validated data
                         ▼
┌──────────────────────────────────────────────────────────┐
│  ROUTE HANDLER (your code)                                │
│  • Business logic                                         │
│  • Database operations                                    │
│  • Returns dict/Pydantic model                           │
└────────────────────────┬─────────────────────────────────┘
                         │ response data
                         ▼
┌──────────────────────────────────────────────────────────┐
│  RESPONSE                                                 │
│  • Serialize to JSON                                      │
│  • Apply response_model (filter fields)                  │
│  • Set status code                                        │
│  • Return to client                                       │
└──────────────────────────────────────────────────────────┘`,
  conceptExplanation: [
    'FastAPI is built on top of Starlette (ASGI framework) and Pydantic (data validation). It uses Python type hints to drive everything: input validation, automatic documentation (Swagger/ReDoc), and response serialization. You write type hints once, and FastAPI generates interactive docs, validates requests, and serializes responses automatically.',
    'The ASGI server (Uvicorn) handles the HTTP protocol and calls your FastAPI app. In development, you run uvicorn directly with --reload. In production, you use Gunicorn with Uvicorn workers (gunicorn -k uvicorn.workers.UvicornWorker -w 4) for multi-process concurrency. Each worker is a separate Python process running your app.',
    'The project structure separates concerns: api/ contains route handlers (one file per domain), core/ contains config and security, db/ contains database setup, models/ contains SQLAlchemy ORM models, schemas/ contains Pydantic models for validation, and services/ contains business logic. This separation makes the codebase testable, maintainable, and scalable to large teams.',
  ],
  whyItMatters: 'In production, your API runs in a Docker container behind Nginx. The project structure determines how easy it is to test, debug, and extend. A poorly structured FastAPI app (everything in main.py) becomes unmaintainable after 20 endpoints. The structure taught here scales to 200+ endpoints and 10+ developers. The auto-generated docs (/docs) mean frontend developers never need to ask "what does this endpoint return?" — they can see it and test it directly.',

  codeExamples: [
    {
      filename: 'main.py',
      language: 'python',
      approach: 'minimal',
      code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id}

# Run: uvicorn main:app --reload
# Visit: http://localhost:8000/docs`,
      explanation: 'The absolute minimum. Two endpoints, type hints on path parameter (item_id: int means /items/abc returns 422). The --reload flag auto-restarts when code changes. /docs gives you interactive Swagger UI.',
    },
    {
      filename: 'main.py',
      language: 'python',
      approach: 'real-world',
      code: `from fastapi import FastAPI, status
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

# Lifespan events (startup/shutdown)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # STARTUP: connect DB, load models, etc.
    print("Starting up...")
    yield
    # SHUTDOWN: close connections, cleanup
    print("Shutting down...")

app = FastAPI(
    title="Blog API",
    description="A production blog API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["root"])
async def root():
    return {"name": "Blog API", "version": "1.0.0"}

@app.get("/health", tags=["health"])
async def health():
    return {"status": "healthy"}`,
      explanation: 'Real-world setup: lifespan events for startup/shutdown, CORS middleware for web frontend, health check endpoint, tags for Swagger grouping. This is what you write on day one of a real project.',
    },
    {
      filename: 'main.py',
      language: 'python',
      approach: 'production',
      code: `"""Blog API — production main application."""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
import logging
import uuid

from blog.core.config import settings
from blog.core.logging import setup_logging
from blog.api.v1 import api_router

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # STARTUP
    setup_logging()
    logger.info("Starting %s v%s...", settings.APP_NAME, settings.VERSION)

    # Initialize database, Redis, ML models, etc.
    # from blog.db.base import engine, Base
    # async with engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.create_all)

    yield

    # SHUTDOWN
    logger.info("Shutting down...")
    # await engine.dispose()

app = FastAPI(
    title=settings.APP_NAME,
    description="Production blog API with auth, posts, comments",
    version=settings.VERSION,
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
    lifespan=lifespan,
)

# Middleware (order matters — last added is outermost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Request ID middleware
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response

# Include API routes
app.include_router(api_router, prefix="/api/v1")

# Root and health
@app.get("/", tags=["root"])
async def root():
    return {"name": settings.APP_NAME, "version": settings.VERSION}

@app.get("/health", tags=["health"])
async def health():
    return {"status": "healthy", "env": settings.ENVIRONMENT}`,
      explanation: 'Production setup: config from settings (pydantic-settings), structured logging, request ID middleware, GZip compression, docs disabled in production, API routes under /api/v1 prefix. This is what deployed production FastAPI apps look like.',
    },
  ],

  configFiles: [
    {
      filename: 'pyproject.toml',
      language: 'toml',
      content: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "blog-api"
version = "1.0.0"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.110",
    "uvicorn[standard]>=0.27",
    "pydantic>=2.6",
    "pydantic-settings>=2.1",
]

[project.optional-dependencies]
dev = ["pytest>=8.0", "httpx>=0.27", "ruff>=0.5"]

[tool.hatch.build.targets.wheel]
packages = ["src/blog"]`,
      comment: 'Copy this exactly. FastAPI + uvicorn + pydantic are the core deps. httpx for testing.',
    },
    {
      filename: '.env.example',
      language: 'bash',
      content: `# Copy to .env
APP_NAME=Blog API
ENVIRONMENT=development
SECRET_KEY=change-me-in-production
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/blog
CORS_ORIGINS=["http://localhost:3000"]`,
      comment: 'Commit .env.example, NEVER commit .env with real secrets.',
    },
  ],

  lab: {
    title: 'Build Your First FastAPI Application',
    steps: [
      {
        step: 1,
        title: 'Create project structure',
        instruction: 'Create the project directory and virtual environment',
        command: 'mkdir blog-api && cd blog-api && uv venv && source .venv/bin/activate',
        expectedOutput: 'Creating virtualenv at: .venv',
        verification: 'Run `which python` — should show .venv/bin/python',
      },
      {
        step: 2,
        title: 'Install FastAPI and uvicorn',
        instruction: 'Install the core dependencies',
        command: 'uv pip install fastapi uvicorn[standard]',
        expectedOutput: 'Installed fastapi-0.110.0 uvicorn-0.27.0',
        verification: 'Run `python -c "import fastapi; print(fastapi.__version__)"` — should print version',
      },
      {
        step: 3,
        title: 'Create main.py',
        instruction: 'Create your first FastAPI app with two endpoints',
        command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI\n\napp = FastAPI(title="My First API")\n\n@app.get("/")\nasync def root():\n    return {"message": "Hello, World!"}\n\n@app.get("/health")\nasync def health():\n    return {"status": "healthy"}\nEOF',
        expectedOutput: '(creates main.py)',
        verification: 'Run `cat main.py` — should show the code',
      },
      {
        step: 4,
        title: 'Run the development server',
        instruction: 'Start uvicorn with auto-reload',
        command: 'uvicorn main:app --reload',
        expectedOutput: 'INFO:     Uvicorn running on http://127.0.0.1:8000\nINFO:     Application startup complete.',
        verification: 'Open http://localhost:8000/docs in browser — should see Swagger UI',
        hint: 'If port 8000 is in use, use --port 8001',
      },
      {
        step: 5,
        title: 'Test your endpoints',
        instruction: 'In another terminal, test the API with curl',
        command: 'curl http://localhost:8000/',
        expectedOutput: '{"message":"Hello, World!"}',
        verification: 'Also try: curl http://localhost:8000/health and open /docs',
        hint: 'The /docs endpoint is interactive — you can test endpoints directly from the browser',
      },
    ],
  },

  commonErrors: [
    {
      error: 'uvicorn: command not found',
      fix: 'Make sure your venv is activated: `source .venv/bin/activate`. Or use `python -m uvicorn main:app --reload`',
      rootCause: 'uvicorn is installed in the venv but the venv is not activated.',
    },
    {
      error: 'ImportError: No module named main',
      fix: 'Run uvicorn from the directory containing main.py. Or use the full module path: `uvicorn src.blog.main:app`',
      rootCause: 'uvicorn cannot find main.py — you are in the wrong directory.',
    },
    {
      error: 'Port 8000 already in use',
      fix: 'Use a different port: `uvicorn main:app --reload --port 8001`. Or kill the process: `lsof -ti:8000 | xargs kill`',
      rootCause: 'Another process (probably another uvicorn instance) is using port 8000.',
    },
    {
      error: 'Changes not reflecting after editing code',
      fix: 'Make sure the --reload flag is set. Check the terminal for errors — the server may have crashed.',
      rootCause: 'Without --reload, uvicorn does not watch for file changes. Or the code has a syntax error preventing reload.',
    },
    {
      error: 'CORS error from frontend',
      fix: 'Add CORSMiddleware: `app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])`',
      rootCause: 'Browser blocks cross-origin requests by default. CORS middleware tells the browser which origins are allowed.',
    },
  ],

  quiz: [
    {
      question: 'What does `uvicorn main:app --reload` do?',
      options: [
        'Builds the production binary',
        'Starts the ASGI server, serves the FastAPI app, auto-restarts on code changes',
        'Runs tests',
        'Installs dependencies',
      ],
      correctIndex: 1,
      explanation: 'uvicorn is the ASGI server. main:app means "the app object in main.py". --reload watches for file changes and auto-restarts. NEVER use --reload in production.',
    },
    {
      question: 'Where are auto-generated API docs?',
      options: [
        '/api-docs',
        '/docs (Swagger UI) and /redoc (ReDoc)',
        '/documentation',
        '/swagger',
      ],
      correctIndex: 1,
      explanation: 'FastAPI auto-generates OpenAPI spec. Swagger UI at /docs is interactive (you can test endpoints). ReDoc at /redoc is readable. Disable both in production with docs_url=None.',
    },
    {
      question: 'How does FastAPI know to validate path parameter as integer?',
      options: [
        'It guesses from the URL',
        'From the type hint: `async def get_item(item_id: int)`',
        'You must call validate() manually',
        'It validates everything as string',
      ],
      correctIndex: 1,
      explanation: 'FastAPI reads Python type hints. `item_id: int` means /items/abc returns 422 (validation error). /items/42 works. This is the core of FastAPI — type hints drive everything.',
    },
    {
      question: 'What is the production way to run FastAPI?',
      options: [
        'uvicorn main:app (single process)',
        'gunicorn -k uvicorn.workers.UvicornWorker -w 4 main:app (multi-process)',
        'python main.py',
        'flask run',
      ],
      correctIndex: 1,
      explanation: 'Production: Gunicorn manages multiple Uvicorn worker processes (one per CPU core). This gives process-level concurrency and graceful reloading. uvicorn alone is for development.',
    },
    {
      question: 'Why use APIRouter to organize routes?',
      options: [
        'Required by FastAPI',
        'Split routes into files per domain (users.py, posts.py), combine with include_router()',
        'Faster routing',
        'For authentication only',
      ],
      correctIndex: 1,
      explanation: 'APIRouter lets you split routes into modules. Each router handles a domain. Combine with app.include_router(router, prefix="/users", tags=["users"]). Tags group them in Swagger docs.',
    },
  ],

  resources: [
    { title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', type: 'docs' },
    { title: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', type: 'article' },
    { title: 'FastAPI Best Practices (GitHub)', url: 'https://github.com/zhanymkanov/fastapi-best-practices', type: 'article', isHiddenGem: true },
    { title: 'Uvicorn Documentation', url: 'https://www.uvicorn.org/', type: 'docs' },
  ],
  whatToReadNext: 'Read the FastAPI "Bigger Applications" guide — it shows how to split routes into multiple files with APIRouter, which is essential for any real project.',
};
