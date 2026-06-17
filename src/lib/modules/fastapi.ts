import { Module } from '../types';

export const fastapiModule: Module = {
  id: 'fastapi',
  title: 'FastAPI — Production-Grade APIs',
  icon: '⚡',
  color: '#009688',
  gradient: 'linear-gradient(135deg, #009688 0%, #FFC107 100%)',
  description: 'Master FastAPI the way production engineers build it. 15 deep lessons across 4 phases — every concept drilled with multiple examples, real configurations, project setups, and trade-offs. Build APIs like z.ai by the end.',
  level: 'All Levels',
  learningPath: {
    title: 'FastAPI Engineer Path — Zero to Production',
    description: 'This is not a tutorial. This is a structured path that takes you from never-built-an-API to deploying production FastAPI applications. Every concept is taught 3+ ways with real configurations and trade-offs. Skip nothing.',
    phases: [
      {
        name: 'Foundation',
        description: 'Master EVERY fundamental — routes, path/query params, Pydantic, request/response',
        outcomes: [
          'Install FastAPI + uvicorn, set up project structure like a senior engineer',
          'Know every route type (GET/POST/PUT/DELETE/PATCH) and when to use each',
          'Master Pydantic v2 models — validation, custom validators, nested models',
          'Handle path params, query params, request bodies, headers, cookies',
          'Use response_model to filter output (security feature)',
          'Auto-generate OpenAPI/Swagger docs',
        ],
      },
      {
        name: 'Intermediate',
        description: 'Dependencies, middleware, file uploads, background tasks',
        outcomes: [
          'Master dependency injection (Depends, yield dependencies, class-based)',
          'Add middleware (CORS, GZip, timing, rate limiting)',
          'Handle file uploads (single, multiple, large files)',
          'Run background tasks after response',
          'Implement error handling with custom exception handlers',
          'Use lifespan events for startup/shutdown',
        ],
      },
      {
        name: 'Advanced',
        description: 'Database, auth, websockets, testing, performance',
        outcomes: [
          'Integrate PostgreSQL with async SQLAlchemy 2.0',
          'Implement JWT authentication with OAuth2 password flow',
          'Build WebSocket endpoints for real-time communication',
          'Write comprehensive tests with TestClient and fixtures',
          'Optimize performance (connection pooling, caching, async)',
          'Handle concurrency with asyncio.gather and background workers',
        ],
      },
      {
        name: 'Real-World',
        description: 'Production deployment, monitoring, security, scaling',
        outcomes: [
          'Deploy with Docker + Gunicorn + Uvicorn workers',
          'Set up Nginx reverse proxy with TLS',
          'Add Prometheus metrics and structured logging',
          'Implement rate limiting and security headers',
          'Run Alembic database migrations',
          'Set up CI/CD with GitHub Actions',
        ],
      },
    ],
  },
  capstoneProject: {
    title: 'Production Blog API with Auth, Comments, and Caching',
    description: 'Build a complete, production-ready blog API: users, posts, comments, JWT auth, Redis caching, full test suite, Docker deployment, CI/CD pipeline.',
    architecture: `┌──────────────────────────────────────────────────────────────┐
│                    Client (Web/Mobile/CLI)                    │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  Nginx Reverse Proxy                                         │
│  • TLS termination (Let's Encrypt)                           │
│  • Rate limiting (100 req/min per IP)                        │
│  • Gzip compression                                          │
│  • Static file serving                                       │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP (internal)
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  FastAPI Application (Gunicorn + 4 Uvicorn workers)         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Middleware  │ │ Dependencies│ │ Routers     │           │
│  │ • CORS      │ │ • get_db    │ │ • /auth     │           │
│  │ • Timing    │ │ • get_user  │ │ • /users    │           │
│  │ • RateLimit │ │ • verify_jwt│ │ • /posts    │           │
│  │ • RequestID │ │ • get_cache │ │ • /comments │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└──────┬───────────────────────────┬──────────────┬──────────┘
       │                           │              │
       ▼                           ▼              ▼
┌──────────────┐         ┌──────────────┐ ┌──────────────┐
│ PostgreSQL   │         │ Redis Cache  │ │ Celery Worker│
│ (async pg)   │         │ • Posts      │ │ • Email      │
│ • users      │         │ • Sessions   │ │ • Thumbnails │
│ • posts      │         │ • Rate limits│ │ • Notifications│
│ • comments   │         └──────────────┘ └──────────────┘
│ • tags       │                                  │
└──────────────┘                                  ▼
       ▲                                  ┌──────────────┐
       │ Alembic migrations               │ SMTP / SES   │
       └──────────────────────────────────┴──────────────┘

Files:
blog-api/
├── pyproject.toml
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── alembic.ini
├── alembic/versions/
├── src/blog/
│   ├── main.py              # FastAPI app
│   ├── config.py            # pydantic-settings
│   ├── database.py          # async engine + session
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── api/
│   │   ├── deps.py          # shared dependencies
│   │   └── v1/
│   │       ├── auth.py
│   │       ├── users.py
│   │       ├── posts.py
│   │       └── comments.py
│   ├── core/
│   │   ├── security.py      # JWT, password hashing
│   │   └── middleware.py
│   ├── services/            # business logic
│   └── tests/
└── .github/workflows/ci.yml`,
    features: [
      'User registration + login (JWT access + refresh tokens)',
      'CRUD for posts (authenticated, author-only edit/delete)',
      'Comments on posts (nested, with replies)',
      'Tags with many-to-many relationship',
      'Redis caching for popular posts',
      'Rate limiting (per-user and per-IP)',
      'Background email notifications',
      'Image upload for post thumbnails',
      'Full-text search on posts',
      'Pagination + filtering + sorting',
      'OpenAPI/Swagger docs at /docs',
      'Health check endpoint',
      'Prometheus metrics at /metrics',
      'Structured JSON logging',
    ],
    techStack: [
      'Python 3.12+',
      'FastAPI 0.110+',
      'Uvicorn (ASGI server) + Gunicorn (process manager)',
      'SQLAlchemy 2.0 async + asyncpg',
      'PostgreSQL 16',
      'Redis (caching + rate limiting)',
      'Alembic (migrations)',
      'Pydantic v2 + pydantic-settings',
      'python-jose (JWT) + passlib[bcrypt]',
      'pytest + httpx (testing)',
      'Docker + Docker Compose',
      'Nginx (reverse proxy)',
      'Prometheus + Grafana (monitoring)',
      'GitHub Actions (CI/CD)',
    ],
    estTime: '20-30 hours',
    difficulty: 'Advanced',
  },
  lessons: [
    // ============================================================
    // PHASE 1: FOUNDATION — Master every fundamental
    // ============================================================
    {
      id: 'fa-01',
      title: 'Installation, Project Structure & First API',
      subtitle: 'Set up FastAPI like a senior engineer — uvicorn, project layout, first endpoints',
      duration: 65,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'FastAPI is a modern, fast (high-performance) web framework for building APIs with Python. Created by Sebastián Ramírez in 2018. Key features: async support, automatic OpenAPI/Swagger docs, type validation via Pydantic v2, and incredible speed (on par with Node.js and Go).',
        'Why FastAPI over Flask/Django? 1) Async-native (built on Starlette + ASGI), 2) Type hints drive validation AND docs (no separate schema files), 3) Automatic interactive docs at /docs (Swagger UI) and /redoc, 4) Fast — one of the fastest Python frameworks, 5) Modern Python (3.8+ type hints, async/await).',
        'Senior engineers structure FastAPI projects properly from day one: separate concerns (api/ for routes, core/ for config/security, db/ for database, models/ for ORM, schemas/ for Pydantic, services/ for business logic). This separation makes testing easy and scales to large teams.',
        'Install: `pip install fastapi uvicorn[standard]`. Run dev server: `uvicorn main:app --reload`. For production: `gunicorn -k uvicorn.workers.UvicornWorker -w 4 main:app` (4 worker processes). The --reload flag auto-restarts on code changes — NEVER use in production.',
      ],
      setup: {
        title: 'Set Up FastAPI Like a Senior Engineer',
        os: 'all',
        steps: [
          {
            description: 'Create project with proper structure',
            command: 'mkdir blog-api && cd blog-api\npyenv local 3.12.0\nuv venv\nsource .venv/bin/activate\n\nmkdir -p src/blog/{api/v1,core,db,models,schemas,services,tests}\ntouch src/blog/__init__.py\ntouch src/blog/api/__init__.py\ntouch src/blog/api/v1/__init__.py\ntouch src/blog/{core,db,models,schemas,services,tests}/__init__.py',
          },
          {
            description: 'Create pyproject.toml with all dependencies',
            command: 'cat > pyproject.toml << \'EOF\'\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "blog-api"\nversion = "0.1.0"\nrequires-python = ">=3.12"\ndependencies = [\n    "fastapi>=0.110",\n    "uvicorn[standard]>=0.27",\n    "pydantic>=2.6",\n    "pydantic-settings>=2.1",\n    "sqlalchemy[asyncio]>=2.0",\n    "asyncpg>=0.29",\n    "alembic>=1.13",\n    "python-jose[cryptography]>=3.3",\n    "passlib[bcrypt]>=1.7",\n    "python-multipart>=0.0.9",\n    "redis>=5.0",\n    "httpx>=0.27",\n]\n\n[project.optional-dependencies]\ndev = [\n    "pytest>=8.0",\n    "pytest-asyncio>=0.23",\n    "pytest-cov>=5.0",\n    "httpx>=0.27",\n    "ruff>=0.5",\n    "mypy>=1.10",\n    "ipython>=8.20",\n]\n\n[tool.hatch.build.targets.wheel]\npackages = ["src/blog"]\n\n[tool.ruff]\nline-length = 100\ntarget-version = "py312"\n\n[tool.pytest.ini_options]\ntestpaths = ["src/blog/tests"]\nasyncio_mode = "auto"\nEOF\n\nuv pip install -e ".[dev]"',
          },
          {
            description: 'Create your first FastAPI app',
            command: 'cat > src/blog/main.py << \'EOF\'\nfrom fastapi import FastAPI\n\napp = FastAPI(\n    title="Blog API",\n    description="A production blog API with auth, posts, comments",\n    version="1.0.0",\n    docs_url="/docs",       # Swagger UI\n    redoc_url="/redoc",     # ReDoc\n    openapi_url="/openapi.json",\n)\n\n@app.get("/")\nasync def root():\n    return {"message": "Welcome to Blog API"}\n\n@app.get("/health")\nasync def health():\n    return {"status": "healthy"}\nEOF\n\n# Run the dev server\nuvicorn blog.main:app --reload --port 8000\n# Visit: http://localhost:8000/docs',
            expectedOutput: 'INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)\nINFO:     Application startup complete.',
          },
          {
            description: 'Verify it works',
            command: '# In another terminal\ncurl http://localhost:8000/\n# {"message":"Welcome to Blog API"}\n\ncurl http://localhost:8000/health\n# {"status":"healthy"}\n\n# Open in browser:\n# http://localhost:8000/docs      ← Swagger UI (interactive!)\n# http://localhost:8000/redoc     ← ReDoc (readable docs)\n# http://localhost:8000/openapi.json  ← raw OpenAPI spec',
          },
        ],
        verification: 'Visit http://localhost:8000/docs — you should see interactive Swagger UI with your 2 endpoints. Try them directly from the browser!',
        troubleshooting: [
          {
            problem: 'uvicorn: command not found',
            solution: 'Make sure your venv is activated: `source .venv/bin/activate`. Or use `python -m uvicorn blog.main:app --reload`.',
          },
          {
            problem: 'ImportError: No module named blog.main',
            solution: 'Run from project root (where pyproject.toml is). Make sure you did `pip install -e .` so the package is installed.',
          },
          {
            problem: 'Port 8000 already in use',
            solution: 'Use a different port: `uvicorn blog.main:app --reload --port 8001`. Or kill the process: `lsof -ti:8000 | xargs kill`.',
          },
          {
            problem: 'Changes not reflecting',
            solution: 'Make sure --reload flag is set. Check the terminal for errors. The server auto-restarts on file save.',
          },
        ],
      },
      visualization: {
        title: 'How FastAPI Works (Request Lifecycle)',
        type: 'flow',
        diagram: `Client Request (HTTP)
       │
       ▼
┌──────────────────────────────────┐
│  ASGI Server (Uvicorn)          │
│  • Receives HTTP request        │
│  • Calls ASGI app               │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  Middleware Stack (LIFO)        │
│  • CORS                          │
│  • GZip                          │
│  • Timing                        │
│  • Custom (auth, rate limit)     │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  FastAPI Router                  │
│  • Matches URL path              │
│  • Identifies HTTP method        │
│  • Finds route handler           │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  Dependency Resolution           │
│  • Resolves Depends()            │
│  • Validates path/query params   │
│  • Parses + validates body       │
│  (Pydantic)                      │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  Route Handler (your code)       │
│  • Business logic                │
│  • Database operations           │
│  • Returns data                  │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  Response                        │
│  • Serialize with response_model │
│  • Filter fields (security!)     │
│  • Set status code               │
│  • JSON encode                   │
└──────────────┬───────────────────┘
               │
               ▼
         Client Response`,
        legend: [
          'ASGI server (Uvicorn) handles HTTP, calls FastAPI app',
          'Middleware runs before AND after (wraps request)',
          'Pydantic validates input — 422 on validation error',
          'response_model filters output — only declared fields returned',
          'All of this generates OpenAPI spec automatically',
        ],
      },
      codeExamples: [
        {
          filename: 'main.py',
          language: 'python',
          code: '"""Blog API — main application."""\nfrom fastapi import FastAPI\nfrom contextlib import asynccontextmanager\nfrom blog.core.config import settings\nfrom blog.core.logging import setup_logging\nfrom blog.api.v1 import api_router\nimport logging\n\n# Lifespan events (replaces @app.on_event)\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # STARTUP — runs once when app starts\n    setup_logging()\n    logger = logging.getLogger("blog")\n    logger.info("Starting Blog API...")\n\n    # Initialize DB connection, ML models, etc.\n    # await init_db()\n    # app.state.model = load_ml_model()\n\n    yield  # App runs here\n\n    # SHUTDOWN — runs once when app stops\n    logger.info("Shutting down Blog API...")\n    # await close_db()\n    # app.state.model.cleanup()\n\n# Create FastAPI app\napp = FastAPI(\n    title=settings.APP_NAME,\n    description="A production blog API",\n    version=settings.VERSION,\n    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,\n    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,\n    openapi_url="/openapi.json" if settings.ENVIRONMENT != "production" else None,\n    lifespan=lifespan,\n)\n\n# Add middleware\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom fastapi.middleware.gzip import GZipMiddleware\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=settings.CORS_ORIGINS,\n    allow_credentials=True,\n    allow_methods=["*"],\n    allow_headers=["*"],\n)\n\napp.add_middleware(GZipMiddleware, minimum_size=1000)\n\n# Include routers (all v1 routes under /api/v1)\napp.include_router(api_router, prefix="/api/v1")\n\n# Root and health endpoints\n@app.get("/")\nasync def root():\n    return {"name": settings.APP_NAME, "version": settings.VERSION}\n\n@app.get("/health")\nasync def health():\n    return {"status": "healthy", "environment": settings.ENVIRONMENT}\n\n@app.get("/metrics")\nasync def metrics():\n    """Prometheus metrics endpoint."""\n    # In production, use prometheus-fastapi-instrumentator\n    return {"requests_total": 1000, "avg_response_ms": 45}',
          explanation: 'Production FastAPI setup: lifespan events (startup/shutdown), middleware (CORS, GZip), router organization (v1 prefix), health check, config from settings. Disable docs in production for security.'
        },
        {
          filename: 'config.py',
          language: 'python',
          code: '"""Application configuration — loaded from environment variables."""\nfrom pydantic_settings import BaseSettings, SettingsConfigDict\nfrom pydantic import Field, SecretStr\nfrom typing import Optional\n\n\nclass Settings(BaseSettings):\n    """Settings loaded from .env file or environment variables."""\n\n    # App\n    APP_NAME: str = "Blog API"\n    VERSION: str = "1.0.0"\n    ENVIRONMENT: str = Field("development", pattern="^(development|staging|production)$")\n    DEBUG: bool = False\n\n    # Database\n    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost:5432/blog"\n    DB_POOL_SIZE: int = 20\n    DB_MAX_OVERFLOW: int = 10\n    DB_POOL_TIMEOUT: int = 30\n    DB_POOL_RECYCLE: int = 3600  # recycle connections after 1 hour\n\n    # Redis\n    REDIS_URL: str = "redis://localhost:6379/0"\n\n    # Security\n    SECRET_KEY: SecretStr  # required — fails if not set!\n    JWT_ALGORITHM: str = "HS256"\n    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30\n    REFRESH_TOKEN_EXPIRE_DAYS: int = 7\n\n    # CORS\n    CORS_ORIGINS: list[str] = ["http://localhost:3000"]\n\n    # Rate limiting\n    RATE_LIMIT_PER_MINUTE: int = 100\n\n    # External services\n    SMTP_HOST: Optional[str] = None\n    SMTP_PORT: int = 587\n    SMTP_USER: Optional[str] = None\n    SMTP_PASSWORD: Optional[SecretStr] = None\n\n    model_config = SettingsConfigDict(\n        env_file=".env",\n        env_file_encoding="utf-8",\n        case_sensitive=True,\n        extra="ignore",\n    )\n\n\n# Singleton — import this everywhere\nsettings = Settings()\n\n# .env file example:\n# APP_NAME=Blog API\n# ENVIRONMENT=development\n# DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/blog\n# SECRET_KEY=your-super-secret-key-change-in-production\n# CORS_ORIGINS=["http://localhost:3000","http://localhost:8080"]',
          explanation: 'pydantic-settings loads from env vars + .env file. SecretStr for secrets (never logged). Required fields (no default) fail fast if missing. pattern validates values. Singleton pattern — import settings everywhere.'
        },
        {
          filename: 'router_structure.py',
          language: 'python',
          code: '"""API router organization — separate routes into modules."""\nfrom fastapi import APIRouter\n\n# api/v1/__init__.py — combines all v1 routers\napi_router = APIRouter()\n\nfrom .auth import router as auth_router\nfrom .users import router as users_router\nfrom .posts import router as posts_router\nfrom .comments import router as comments_router\n\napi_router.include_router(auth_router, prefix="/auth", tags=["auth"])\napi_router.include_router(users_router, prefix="/users", tags=["users"])\napi_router.include_router(posts_router, prefix="/posts", tags=["posts"])\napi_router.include_router(comments_router, prefix="/comments", tags=["comments"])\n\n# Result: /api/v1/auth/login, /api/v1/users/me, /api/v1/posts, etc.\n\n# api/v1/posts.py — example router\nfrom fastapi import APIRouter, Depends, HTTPException, status\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom typing import Optional\n\nfrom blog.api.deps import get_db, get_current_user\nfrom blog.schemas.post import PostCreate, PostUpdate, PostResponse\nfrom blog.services.post_service import PostService\nfrom blog.models.user import User\n\nrouter = APIRouter()\n\n@router.get("/", response_model=list[PostResponse])\nasync def list_posts(\n    skip: int = 0,\n    limit: int = 20,\n    tag: Optional[str] = None,\n    db: AsyncSession = Depends(get_db),\n):\n    """List published posts with optional tag filter."""\n    service = PostService(db)\n    return await service.list_posts(skip=skip, limit=limit, tag=tag)\n\n@router.get("/{post_id}", response_model=PostResponse)\nasync def get_post(\n    post_id: int,\n    db: AsyncSession = Depends(get_db),\n):\n    """Get a single post by ID."""\n    service = PostService(db)\n    post = await service.get_post(post_id)\n    if not post:\n        raise HTTPException(\n            status_code=status.HTTP_404_NOT_FOUND,\n            detail="Post not found",\n        )\n    return post\n\n@router.post("/", response_model=PostResponse, status_code=201)\nasync def create_post(\n    post: PostCreate,\n    db: AsyncSession = Depends(get_db),\n    current_user: User = Depends(get_current_user),\n):\n    """Create a new post (authenticated)."""\n    service = PostService(db)\n    return await service.create_post(post, author_id=current_user.id)\n\n@router.put("/{post_id}", response_model=PostResponse)\nasync def update_post(\n    post_id: int,\n    post_update: PostUpdate,\n    db: AsyncSession = Depends(get_db),\n    current_user: User = Depends(get_current_user),\n):\n    """Update a post (author only)."""\n    service = PostService(db)\n    post = await service.get_post(post_id)\n    if not post:\n        raise HTTPException(404, "Post not found")\n    if post.author_id != current_user.id:\n        raise HTTPException(403, "Not authorized to edit this post")\n    return await service.update_post(post_id, post_update)\n\n@router.delete("/{post_id}", status_code=204)\nasync def delete_post(\n    post_id: int,\n    db: AsyncSession = Depends(get_db),\n    current_user: User = Depends(get_current_user),\n):\n    """Delete a post (author only)."""\n    service = PostService(db)\n    post = await service.get_post(post_id)\n    if not post:\n        raise HTTPException(404, "Post not found")\n    if post.author_id != current_user.id:\n        raise HTTPException(403, "Not authorized")\n    await service.delete_post(post_id)',
          explanation: 'Organize routes into routers (one per domain). Combine in api/v1/__init__.py. Each router handles CRUD. Use dependencies (get_db, get_current_user) for shared logic. Tags group endpoints in Swagger docs.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a FastAPI app with: a GET / that returns {"hello": "world"}, a GET /health that returns {"status": "ok"}, and a GET /items/{item_id} that returns the item_id as an integer. Run it and verify /docs shows all 3 endpoints.',
          starterCode: 'from fastapi import FastAPI\n\napp = FastAPI(title="My API")\n\n# your endpoints\n',
          hint: 'Use @app.get() decorators. For path params, use {item_id} in URL and item_id: int as parameter.',
          solution: 'from fastapi import FastAPI\n\napp = FastAPI(title="My API")\n\n@app.get("/")\nasync def root():\n    return {"hello": "world"}\n\n@app.get("/health")\nasync def health():\n    return {"status": "ok"}\n\n@app.get("/items/{item_id}")\nasync def get_item(item_id: int):\n    return {"item_id": item_id}\n\n# Run: uvicorn main:app --reload\n# Visit: http://localhost:8000/docs',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does uvicorn --reload do?',
          options: [
            'Reloads the database',
            'Auto-restarts server when code changes (development only!)',
            'Reloads environment variables',
            'Required for production',
          ],
          correctIndex: 1,
          explanation: '--reload watches for file changes and auto-restarts. Great for development. NEVER use in production — it adds overhead and is not needed (deploy with gunicorn instead).'
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
          explanation: 'FastAPI auto-generates Swagger UI at /docs and ReDoc at /redoc. Both are interactive — you can test endpoints directly from the browser. Disable in production with docs_url=None.'
        },
        {
          question: 'Why use APIRouter to organize routes?',
          options: [
            'Required by FastAPI',
            'Separate routes into modules (per domain), combine with include_router()',
            'Faster routing',
            'For authentication only',
          ],
          correctIndex: 1,
          explanation: 'APIRouter lets you split routes into files (auth.py, users.py, posts.py). Combine in one place with app.include_router(). Tags group them in Swagger docs.'
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
          explanation: 'Production: Gunicorn manages multiple Uvicorn worker processes (one per CPU core). This gives you process-level concurrency. Use uvicorn directly only for development.'
        },
      ],
      keyTakeaways: [
        'Install: pip install fastapi uvicorn[standard] — run with uvicorn main:app --reload',
        'Project structure: api/ (routes), core/ (config/security), db/, models/, schemas/, services/',
        'Use lifespan events (not @app.on_event) for startup/shutdown logic',
        'Organize routes into APIRouters, combine with app.include_router()',
        'Auto-docs at /docs (Swagger) and /redoc — disable in production',
        'Production: gunicorn -k uvicorn.workers.UvicornWorker -w 4 main:app',
        'Use pydantic-settings for config — loads from .env, validates types',
        'Add middleware: CORS (for web frontends), GZip (compression)',
      ],
      resources: [
        { title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', type: 'docs' },
        { title: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', type: 'article' },
        { title: 'FastAPI Best Practices (GitHub)', url: 'https://github.com/zhanymkanov/fastapi-best-practices', type: 'article', isHiddenGem: true },
        { title: 'Uvicorn Documentation', url: 'https://www.uvicorn.org/', type: 'docs' },
      ],
      miniProject: {
        title: 'Set Up Your FastAPI Project',
        description: 'Create a properly structured FastAPI project with config, lifespan, health check, and CORS.',
        requirements: [
          'Project structure with src/blog/ layout',
          'pyproject.toml with all dependencies',
          'config.py using pydantic-settings',
          'main.py with lifespan events',
          'CORS middleware configured',
          'GET / and GET /health endpoints',
          'Verify /docs shows endpoints',
        ],
        estTime: '45-60 minutes',
        solutionCode: '# See setup steps in this lesson.\n# Key verification:\n# 1. uvicorn blog.main:app --reload works\n# 2. http://localhost:8000/ returns welcome\n# 3. http://localhost:8000/health returns status\n# 4. http://localhost:8000/docs shows Swagger UI\n# 5. .env file is loaded (set APP_NAME=test, verify in /)',
        solutionLanguage: 'python'
      }
    },

    {
      id: 'fa-02',
      title: 'Path Parameters, Query Parameters & Type Validation',
      subtitle: 'Master every parameter type — path, query, headers, cookies with validation',
      duration: 70,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'FastAPI uses Python type hints to do everything: validate inputs, generate docs, serialize outputs. Path parameters come from the URL path {x}. Query parameters come from function arguments with defaults. The framework infers which is which from your function signature.',
        'Path parameters: defined in URL with {param_name}, function arg with same name. Add validation with Path() — ge (greater than or equal), le, gt, lt, min_length, max_length, regex. Type hints drive validation: int means /items/abc returns 422.',
        'Query parameters: function args with default values (or Query() for validation). Optional with `param: str | None = None`. Common: pagination (skip, limit), filtering (tag, status), sorting (sort_by, order).',
        'Headers and cookies: use Header() and Cookie() dependencies. Header names are auto-converted (X-API-Key → x_api_key). Cookies work the same way. Use for auth tokens, API keys, tracking.',
      ],
      visualization: {
        title: 'Parameter Types in FastAPI',
        type: 'tree',
        diagram: `FastAPI Parameters
│
├── PATH PARAMETERS
│   ├── URL: /items/{item_id}
│   ├── Def: async def get(item_id: int)
│   ├── Validation: Path(ge=1, le=1000)
│   ├── Required (no default)
│   └── Example: /items/42 → item_id=42
│
├── QUERY PARAMETERS
│   ├── URL: /items?skip=0&limit=20
│   ├── Def: async def list(skip: int = 0, limit: int = 20)
│   ├── Validation: Query(ge=0, le=100)
│   ├── Optional: tag: str | None = None
│   └── Example: /items?skip=10&limit=5
│
├── REQUEST BODY (Pydantic)
│   ├── POST/PUT/PATCH body
│   ├── Def: async def create(item: ItemCreate)
│   ├── Validation: Pydantic model
│   └── Example: {"name": "x", "price": 9.99}
│
├── HEADERS
│   ├── Def: async def get(x_api_key: str = Header())
│   ├── Auto-converts: X-API-Key → x_api_key
│   ├── Optional: user_agent: str | None = Header(None)
│   └── Example: X-API-Key: abc123
│
├── COOKIES
│   ├── Def: async def get(session: str = Cookie())
│   ├── Optional: session: str | None = Cookie(None)
│   └── Example: Cookie: session=xyz789
│
└── FORM DATA
    ├── Def: async def login(username: str = Form(), password: str = Form())
    ├── Use for HTML forms (not JSON)
    └── Example: username=alice&password=secret`,
        legend: [
          'Type hints drive validation AND documentation',
          'Path params: required, from URL {x}',
          'Query params: optional (with defaults), from URL ?key=value',
          'Use Path() and Query() for validation constraints',
          'Headers/Cookies use Header()/Cookie() dependencies',
        ],
      },
      progressiveExample: {
        title: 'Building a Posts Endpoint — From Basic to Production',
        description: 'See how a simple endpoint evolves with validation, filtering, and documentation',
        stages: [
          {
            name: 'Tiny',
            description: 'Basic GET endpoint with no validation',
            code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/posts")\nasync def list_posts():\n    return [{"id": 1, "title": "Hello"}]\n\n# Problems:\n# - No pagination (returns everything)\n# - No filtering\n# - No type safety\n# - No documentation',
            language: 'python',
            explanation: 'Bare minimum works, but real APIs need pagination, filtering, validation, and docs.',
          },
          {
            name: 'Small',
            description: 'Add pagination and filtering with type hints',
            code: 'from fastapi import FastAPI, Query\nfrom typing import Optional\n\napp = FastAPI()\n\n@app.get("/posts")\nasync def list_posts(\n    skip: int = 0,           # query param, default 0\n    limit: int = 20,         # query param, default 20\n    tag: Optional[str] = None,  # optional filter\n):\n    return {\n        "skip": skip,\n        "limit": limit,\n        "tag": tag,\n        "posts": [...],\n    }\n\n# Now: /posts?skip=10&limit=5&tag=python works\n# But: /posts?skip=-5 or /posts?limit=99999 also works (bad!)',
            language: 'python',
            explanation: 'Type hints make them query params with defaults. But no validation — user can request limit=99999.',
          },
          {
            name: 'Real-World',
            description: 'Add validation, response model, sorting, documentation',
            code: 'from fastapi import FastAPI, Query, status\nfrom pydantic import BaseModel, Field\nfrom typing import Optional, Literal\nfrom datetime import datetime\n\napp = FastAPI()\n\nclass PostResponse(BaseModel):\n    """Response model — controls what fields are returned."""\n    id: int\n    title: str\n    content: str\n    author: str\n    tags: list[str] = []\n    created_at: datetime\n    published: bool\n\n    model_config = {"from_attributes": True}  # allow from ORM objects\n\nclass PostListResponse(BaseModel):\n    """Paginated response with metadata."""\n    posts: list[PostResponse]\n    total: int\n    skip: int\n    limit: int\n    has_next: bool\n\n@app.get(\n    "/posts",\n    response_model=PostListResponse,\n    summary="List posts",\n    description="List published posts with pagination, filtering, and sorting.",\n    response_description="Paginated list of posts",\n)\nasync def list_posts(\n    skip: int = Query(\n        0, ge=0, le=10000,\n        description="Number of posts to skip (for pagination)",\n        example=0,\n    ),\n    limit: int = Query(\n        20, ge=1, le=100,\n        description="Maximum number of posts to return (1-100)",\n        example=20,\n    ),\n    tag: Optional[str] = Query(\n        None,\n        min_length=1, max_length=50,\n        description="Filter by tag name",\n        example="python",\n    ),\n    sort_by: Literal["created_at", "title", "author"] = Query(\n        "created_at",\n        description="Field to sort by",\n    ),\n    order: Literal["asc", "desc"] = Query(\n        "desc",\n        description="Sort order",\n    ),\n    search: Optional[str] = Query(\n        None, min_length=2, max_length=100,\n        description="Search in title and content",\n    ),\n):\n    """List published posts.\n\n    - **skip**: pagination offset (default 0)\n    - **limit**: page size (1-100, default 20)\n    - **tag**: filter by tag\n    - **sort_by**: field to sort by\n    - **order**: sort direction\n    - **search**: full-text search\n\n    Returns paginated results with metadata.\n    """\n    # In real app, query database with these params\n    posts = await fetch_posts(\n        skip=skip, limit=limit, tag=tag,\n        sort_by=sort_by, order=order, search=search,\n    )\n    total = await count_posts(tag=tag, search=search)\n\n    return PostListResponse(\n        posts=posts,\n        total=total,\n        skip=skip,\n        limit=limit,\n        has_next=(skip + limit) < total,\n    )\n\n# Now /docs shows:\n# - Full parameter documentation\n# - Validation rules (1 ≤ limit ≤ 100)\n# - Example values\n# - Response schema\n# - Try-it-out functionality',
            language: 'python',
            explanation: 'Production endpoint: Query() with validation (ge, le, min_length), Literal for enum values, response_model for output control, docstrings for Swagger descriptions. This is what senior engineers write.',
          },
        ],
      },
      codeExamples: [
        {
          filename: 'path_params.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Path, HTTPException\nfrom typing import Annotated\n\napp = FastAPI()\n\n# === BASIC PATH PARAMETER ===\n@app.get("/items/{item_id}")\nasync def get_item(item_id: int):  # type hint = validation!\n    return {"item_id": item_id}\n\n# /items/42     → {"item_id": 42}\n# /items/abc    → 422 error (not an integer)\n# /items/3.14   → 422 error\n\n# === PATH PARAMETER WITH VALIDATION ===\n@app.get("/users/{user_id}")\nasync def get_user(\n    user_id: Annotated[int, Path(\n        ge=1,           # greater than or equal to 1\n        le=1000000,     # less than or equal to 1M\n        description="The ID of the user to retrieve",\n        example=42,\n    )]\n):\n    return {"user_id": user_id}\n\n# /users/0      → 422 (must be ≥ 1)\n# /users/-5     → 422 (must be ≥ 1)\n# /users/42     → OK\n# /users/9999999 → 422 (must be ≤ 1M)\n\n# === STRING PATH PARAMETER WITH VALIDATION ===\n@app.get("/products/{sku}")\nasync def get_product(\n    sku: Annotated[str, Path(\n        min_length=3,\n        max_length=20,\n        pattern=r"^[A-Z]{2}-\\d{4,6}$",  # regex: AB-1234 to AB-123456\n        description="Product SKU (format: AB-1234)",\n        example="AB-1234",\n    )]\n):\n    return {"sku": sku}\n\n# /products/AB-1234    → OK\n# /products/ab-1234    → 422 (lowercase)\n# /products/ABC-123    → 422 (3 letters)\n# /products/AB-123     → 422 (only 3 digits)\n\n# === MULTIPLE PATH PARAMETERS ===\n@app.get("/users/{user_id}/posts/{post_id}")\nasync def get_user_post(\n    user_id: int,\n    post_id: int,\n):\n    return {"user_id": user_id, "post_id": post_id}\n\n# /users/42/posts/100 → {"user_id": 42, "post_id": 100}\n\n# === ENUM PATH PARAMETERS ===\nfrom enum import Enum\n\nclass ModelName(str, Enum):\n    alexnet = "alexnet"\n    resnet = "resnet"\n    lenet = "lenet"\n\n@app.get("/models/{model_name}")\nasync def get_model(model_name: ModelName):\n    return {"model": model_name, "message": model_name.value}\n\n# /models/alexnet → OK\n# /models/unknown → 422 (not a valid enum value)\n# Docs show dropdown of valid values!\n\n# === PATH PARAMETER ORDER MATTERS ===\n# /users/me must come BEFORE /users/{user_id}\n# Otherwise "me" would match {user_id} and fail int validation\n\n@app.get("/users/me")  # this is checked first\nasync def get_current_user():\n    return {"user": "current user"}\n\n@app.get("/users/{user_id}")  # this is checked second\nasync def get_user(user_id: int):\n    return {"user_id": user_id}\n\n# /users/me     → {"user": "current user"}\n# /users/42     → {"user_id": 42}\n# If order reversed: /users/me → 422 (me is not int)',
          explanation: 'Path params use type hints for validation. Path() adds constraints (ge, le, min_length, pattern). Order matters — fixed paths before dynamic ones. Enums show as dropdowns in docs.'
        },
        {
          filename: 'query_params.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Query\nfrom typing import Annotated, Optional\nfrom enum import Enum\n\napp = FastAPI()\n\n# === BASIC QUERY PARAMETERS ===\n@app.get("/items")\nasync def list_items(\n    skip: int = 0,           # query param with default\n    limit: int = 10,         # query param with default\n    q: Optional[str] = None, # optional query param\n):\n    return {"skip": skip, "limit": limit, "q": q}\n\n# /items               → skip=0, limit=10, q=None\n# /items?skip=5        → skip=5, limit=10, q=None\n# /items?skip=5&limit=20 → skip=5, limit=20\n# /items?q=hello       → q="hello"\n\n# === QUERY PARAMETER WITH VALIDATION ===\n@app.get("/search")\nasync def search(\n    q: Annotated[str, Query(\n        min_length=2,\n        max_length=100,\n        description="Search query (2-100 characters)",\n        example="python fastapi",\n    )],\n    category: Annotated[Optional[str], Query(\n        pattern=r"^(books|movies|music)$",\n        description="Category to search in",\n    )] = None,\n    page: Annotated[int, Query(ge=1, le=1000)] = 1,\n    size: Annotated[int, Query(ge=1, le=100)] = 20,\n):\n    return {"q": q, "category": category, "page": page, "size": size}\n\n# /search?q=py         → 422 (min_length=2)\n# /search?q=python     → OK\n# /search?q=python&category=books → OK\n# /search?q=python&category=invalid → 422 (pattern mismatch)\n\n# === BOOLEAN QUERY PARAMETERS ===\n@app.get("/users")\nasync def list_users(\n    active: bool = True,  # accepts: true, false, 1, 0, yes, no, on, off\n    verified: Optional[bool] = None,\n):\n    return {"active": active, "verified": verified}\n\n# /users              → active=True\n# /users?active=false → active=False\n# /users?active=0     → active=False\n# /users?active=yes   → active=True\n\n# === LIST QUERY PARAMETERS (multiple values) ===\n@app.get("/products")\nasync def list_products(\n    tags: Annotated[list[str], Query(\n        description="Filter by tags (multiple)",\n        example=["python", "web"],\n    )] = [],\n):\n    return {"tags": tags}\n\n# /products?tags=python&tags=web → tags=["python", "web"]\n# /products                        → tags=[]\n\n# === ENUM QUERY PARAMETERS ===\nclass SortOrder(str, Enum):\n    asc = "asc"\n    desc = "desc"\n\nclass SortField(str, Enum):\n    created_at = "created_at"\n    updated_at = "updated_at"\n    title = "title"\n    popularity = "popularity"\n\n@app.get("/posts")\nasync def list_posts(\n    sort_by: SortField = SortField.created_at,\n    order: SortOrder = SortOrder.desc,\n):\n    return {"sort_by": sort_by, "order": order}\n\n# /posts                      → sort_by=created_at, order=desc\n# /posts?sort_by=title&order=asc → sort_by=title, order=asc\n# /posts?sort_by=invalid       → 422 (not valid enum)\n\n# === DEPRECATED QUERY PARAMETERS ===\n@app.get("/items")\nasync def list_items(\n    q: Annotated[Optional[str], Query(\n        deprecated=True,  # shows as deprecated in docs\n        description="Use search instead",\n    )] = None,\n    search: Optional[str] = None,\n):\n    return {"search": search or q}\n\n# === REAL-WORLD: PAGINATION PATTERN ===\n@app.get("/articles")\nasync def list_articles(\n    page: Annotated[int, Query(ge=1, description="Page number")] = 1,\n    per_page: Annotated[int, Query(ge=1, le=100, description="Items per page")] = 20,\n    author: Annotated[Optional[str], Query(min_length=1)] = None,\n    tag: Annotated[Optional[str], Query(min_length=1)] = None,\n    search: Annotated[Optional[str], Query(min_length=2, max_length=100)] = None,\n    sort_by: Annotated[Literal["date", "title", "author"], Query()] = "date",\n    order: Annotated[Literal["asc", "desc"], Query()] = "desc",\n):\n    skip = (page - 1) * per_page\n    return {\n        "page": page,\n        "per_page": per_page,\n        "skip": skip,\n        "filters": {"author": author, "tag": tag, "search": search},\n        "sort": {"by": sort_by, "order": order},\n    }',
          explanation: 'Query params have defaults (optional) or no default (required). Query() adds validation. Booleans accept true/false/1/0/yes/no. Lists accept multiple values (?tags=a&tags=b). Enums show as dropdowns. Use Annotated[type, Query()] (modern syntax).'
        },
        {
          filename: 'headers_cookies.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Header, Cookie, HTTPException\nfrom typing import Annotated, Optional\nimport uuid\n\napp = FastAPI()\n\n# === HEADERS ===\n# FastAPI auto-converts: X-API-Key parameter → X-API-Key header\n# Underscores convert to hyphens: x_api_key → X-API-Key\n\n@app.get("/secure")\nasync def secure_endpoint(\n    x_api_key: Annotated[str, Header(\n        description="API key for authentication",\n        example="abc123-secret-key",\n    )],\n    user_agent: Annotated[Optional[str], Header()] = None,\n    accept_language: Annotated[Optional[str], Header()] = None,\n):\n    return {\n        "api_key": x_api_key,\n        "user_agent": user_agent,\n        "language": accept_language,\n    }\n\n# Request:\n# GET /secure\n# X-API-Key: abc123-secret-key\n# User-Agent: Mozilla/5.0...\n# Accept-Language: en-US\n\n# === OPTIONAL HEADERS ===\n@app.get("/info")\nasync def info(\n    x_request_id: Annotated[Optional[str], Header()] = None,\n    x_forwarded_for: Annotated[Optional[str], Header()] = None,\n):\n    return {\n        "request_id": x_request_id,\n        "client_ip": x_forwarded_for,\n    }\n\n# === HEADER WITH VALIDATION ===\n@app.get("/validate")\nasync def validate_header(\n    x_token: Annotated[str, Header(\n        min_length=10,\n        max_length=100,\n        pattern=r"^Bearer .+$",\n        description="Bearer token",\n    )],\n):\n    return {"token": x_token}\n\n# === DUPLICATE HEADERS (list) ===\n@app.get("/multi")\nasync def multi_header(\n    x_tags: Annotated[list[str], Header()] = [],\n):\n    return {"tags": x_tags}\n\n# Request with multiple X-Tags headers:\n# X-Tags: python\n# X-Tags: fastapi\n# → x_tags = ["python", "fastapi"]\n\n# === COOKIES ===\n@app.get("/session")\nasync def get_session(\n    session_id: Annotated[Optional[str], Cookie(\n        description="Session cookie",\n    )] = None,\n    csrf_token: Annotated[Optional[str], Cookie()] = None,\n):\n    if not session_id:\n        raise HTTPException(401, "Not authenticated")\n    return {"session_id": session_id, "csrf": csrf_token}\n\n# === SET COOKIES (in response) ===\nfrom fastapi import Response\n\n@app.post("/login")\nasync def login(response: Response):\n    session_id = str(uuid.uuid4())\n    # Set cookie in response\n    response.set_cookie(\n        key="session_id",\n        value=session_id,\        httponly=True,      # not accessible via JS (XSS protection)\n        secure=True,         # only over HTTPS (production)\n        samesite="lax",      # CSRF protection\n        max_age=3600,        # 1 hour\n        path="/",\n    )\n    return {"message": "Logged in", "session_id": session_id}\n\n@app.post("/logout")\nasync def logout(response: Response):\n    response.delete_cookie("session_id")\n    return {"message": "Logged out"}\n\n# === REAL-WORLD: API KEY AUTH VIA HEADER ===\nfrom functools import lru_cache\n\nVALID_API_KEYS = {"abc123", "xyz789"}\n\nasync def verify_api_key(\n    x_api_key: Annotated[str, Header(description="API key")],\n):\n    """Dependency that verifies API key."""\n    if x_api_key not in VALID_API_KEYS:\n        raise HTTPException(401, "Invalid API key")\n    return x_api_key\n\n@app.get("/protected", dependencies=[Depends(verify_api_key)])\nasync def protected():\n    return {"message": "You have access!"}\n\n# === REQUEST ID MIDDLEWARE (common pattern) ===\nfrom fastapi import Request\n\n@app.middleware("http")\nasync def add_request_id(request: Request, call_next):\n    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))\n    response = await call_next(request)\n    response.headers["X-Request-ID"] = request_id\n    return response',
          explanation: 'Header() and Cookie() for headers/cookies. Underscores auto-convert to hyphens (x_api_key → X-API-Key). Set cookies with response.set_cookie() (httponly, secure, samesite for security). Use for auth tokens, API keys, sessions.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a GET /products endpoint with: page (default 1, ge 1), per_page (default 20, ge 1, le 100), category (optional string), in_stock (optional bool), sort_by (enum: name, price, created_at), order (enum: asc, desc). Add docstrings and examples.',
          starterCode: 'from fastapi import FastAPI, Query\nfrom typing import Annotated, Optional\nfrom enum import Enum\n\napp = FastAPI()\n\n@app.get("/products")\nasync def list_products(\n    # your parameters\n):\n    pass\n',
          hint: 'Use Annotated[type, Query(...)] with validation. Define enums for sort_by and order. Add description and example to each.',
          solution: 'from fastapi import FastAPI, Query\nfrom typing import Annotated, Optional\nfrom enum import Enum\n\napp = FastAPI()\n\nclass SortField(str, Enum):\n    name = "name"\n    price = "price"\n    created_at = "created_at"\n\nclass SortOrder(str, Enum):\n    asc = "asc"\n    desc = "desc"\n\n@app.get("/products")\nasync def list_products(\n    page: Annotated[int, Query(ge=1, description="Page number")] = 1,\n    per_page: Annotated[int, Query(ge=1, le=100, description="Items per page (1-100)")] = 20,\n    category: Annotated[Optional[str], Query(min_length=1, description="Filter by category")] = None,\n    in_stock: Annotated[Optional[bool], Query(description="Filter in-stock only")] = None,\n    sort_by: Annotated[SortField, Query(description="Sort field")] = SortField.created_at,\n    order: Annotated[SortOrder, Query(description="Sort order")] = SortOrder.desc,\n):\n    """List products with pagination, filtering, and sorting."""\n    return {\n        "page": page,\n        "per_page": per_page,\n        "filters": {"category": category, "in_stock": in_stock},\n        "sort": {"by": sort_by, "order": order},\n    }',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'How does FastAPI know if a parameter is a path param or query param?',
          options: [
            'You specify with @path decorator',
            'It infers from URL path {x} and function signature',
            'Path params must be first',
            'You cannot have both',
          ],
          correctIndex: 1,
          explanation: 'FastAPI infers: if parameter name is in the URL path {param}, it is a path param. Otherwise, it is a query param. Type hints drive validation.'
        },
        {
          question: 'How to validate that a query parameter is between 1 and 100?',
          options: [
            'Query(1, 100)',
            'Query(ge=1, le=100)',
            'Query(min=1, max=100)',
            'Query(range=1-100)',
          ],
          correctIndex: 1,
          explanation: 'Query(ge=1, le=100) — ge = greater than or equal, le = less than or equal. Other options: gt (greater than), lt (less than), min_length, max_length, pattern.'
        },
        {
          question: 'How are header names converted?',
          options: [
            'Must match exactly',
            'Underscores convert to hyphens (x_api_key → X-API-Key)',
            'All lowercase',
            'All uppercase',
          ],
          correctIndex: 1,
          explanation: 'FastAPI auto-converts: parameter x_api_key matches header X-API-Key. Underscores become hyphens. This is a convenience so you can use valid Python variable names.'
        },
        {
          question: 'What happens if path parameter order is wrong (e.g., /users/{id} before /users/me)?',
          options: [
            'FastAPI auto-fixes the order',
            '/users/me matches {id} and fails int validation (422)',
            'Both work fine',
            'Error on startup',
          ],
          correctIndex: 1,
          explanation: 'Routes are matched in definition order. /users/{user_id} matches /users/me, then "me" fails int validation. FIX: define /users/me BEFORE /users/{user_id}.'
        },
      ],
      keyTakeaways: [
        'Type hints drive validation AND documentation — no separate schema files',
        'Path params: from URL {x}, required, use Path() for validation',
        'Query params: from function args with defaults, use Query() for validation',
        'Use Annotated[type, Query(...)] — modern syntax (Python 3.9+)',
        'Validation: ge, le, gt, lt, min_length, max_length, pattern (regex)',
        'Booleans accept: true/false/1/0/yes/no/on/off',
        'Lists accept multiple values: ?tags=a&tags=b',
        'Enums show as dropdowns in Swagger docs',
        'Headers: Header() — underscores auto-convert to hyphens',
        'Cookies: Cookie() — set with response.set_cookie(httponly, secure, samesite)',
        'Route order matters — fixed paths before dynamic ones',
      ],
      resources: [
        { title: 'FastAPI — Path Parameters', url: 'https://fastapi.tiangolo.com/tutorial/path-params/', type: 'docs' },
        { title: 'FastAPI — Query Parameters', url: 'https://fastapi.tiangolo.com/tutorial/query-params/', type: 'docs' },
        { title: 'FastAPI — Header Parameters', url: 'https://fastapi.tiangolo.com/tutorial/header-params/', type: 'docs' },
        { title: 'FastAPI — Cookie Parameters', url: 'https://fastapi.tiangolo.com/tutorial/cookie-params/', type: 'docs' },
      ]
    },

    {
      id: 'fa-03',
      title: 'Pydantic v2 Models — Validation, Custom Validators, Nested Models',
      subtitle: 'Master Pydantic v2 — the heart of FastAPI request/response validation',
      duration: 80,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Pydantic is the heart of FastAPI. It defines data schemas with Python type hints and validates incoming/outgoing data. Pydantic v2 (2023) is rewritten in Rust — 5-50x faster than v1, with a cleaner API. Use BaseModel to define schemas.',
        'Pydantic models support: optional fields, default values, complex types (EmailStr, HttpUrl, UUID, datetime), nested models, lists, dicts, enums, and custom validators. Validation happens automatically when data is parsed.',
        'Use Field() for constraints: max_length, min_length, ge, le, gt, lt, pattern (regex), default_factory. Custom validators with @field_validator (v2) or @model_validator for whole-model validation.',
        'In FastAPI, use Pydantic models as: request body (function parameter), response model (response_model parameter), and for query params (Query/Path/Body dependencies). Response models filter output — only declared fields are returned (security feature!).',
      ],
      visualization: {
        title: 'Pydantic Model Lifecycle',
        type: 'flow',
        diagram: `Input (JSON/dict)
       │
       ▼
┌──────────────────────────────┐
│  Pydantic Model Instantiation│
│  UserCreate(**data)          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  Field Validation            │
│  • Type coercion (str→int?)  │
│  • Constraints (ge, le, etc) │
│  • Format (EmailStr, URL)    │
│  • Required vs optional      │
└──────────────┬───────────────┘
               │ ✓ pass
               ▼
┌──────────────────────────────┐
│  @field_validator            │
│  • Custom validation logic   │
│  • Transform values          │
│  • Cross-field checks        │
└──────────────┬───────────────┘
               │ ✓ pass
               ▼
┌──────────────────────────────┐
│  @model_validator            │
│  • Whole-model validation    │
│  • Cross-field dependencies  │
│  • e.g., confirm_password    │
└──────────────┬───────────────┘
               │ ✓ pass
               ▼
┌──────────────────────────────┐
│  Valid Model Instance        │
│  • All fields typed & valid  │
│  • Ready for use             │
└──────────────────────────────┘
               │
               ▼ (on ANY failure)
┌──────────────────────────────┐
│  ValidationError             │
│  • FastAPI returns 422       │
│  • Detailed error messages   │
│  • Field-level errors        │
└──────────────────────────────┘`,
        legend: [
          'Validation happens in order: field → field_validator → model_validator',
          'ANY failure raises ValidationError → FastAPI returns 422',
          'Type coercion: "42" → 42 if field is int',
          'Custom validators can transform values (e.g., lowercase email)',
          'model_validator for cross-field validation (password confirm)',
        ],
      },
      codeExamples: [
        {
          filename: 'pydantic_basics.py',
          language: 'python',
          code: 'from pydantic import BaseModel, Field, EmailStr, HttpUrl, field_validator, model_validator\nfrom typing import Optional, Literal\nfrom datetime import datetime\nfrom enum import Enum\nimport uuid\n\n# === BASIC MODEL ===\nclass UserCreate(BaseModel):\n    name: str\n    email: str\n    age: int\n    is_active: bool = True\n\n# Validation happens on instantiation\nuser = UserCreate(name="Alice", email="alice@x.com", age=30)\nprint(user.name)      # Alice\nprint(user.model_dump())       # dict\nprint(user.model_dump_json())  # JSON string\n\n# Invalid data raises ValidationError\nfrom pydantic import ValidationError\ntry:\n    UserCreate(name="Bob", email="bob@x.com", age="not a number")\nexcept ValidationError as e:\n    print(e.errors())\n    # [{\'type\': \'int_parsing\', \'loc\': (\'age\',), ...}]\n\n# === FIELD WITH CONSTRAINTS ===\nclass Product(BaseModel):\n    name: str = Field(\n        min_length=1,\n        max_length=200,\n        description="Product name",\n        examples=["Wireless Mouse"],\n    )\n    price: float = Field(\n        gt=0,                # greater than 0\n        le=10000,            # less than or equal 10000\n        description="Price in USD",\n        examples=[29.99],\n    )\n    quantity: int = Field(\n        ge=0,                # greater than or equal 0\n        default=0,\n        description="Stock quantity",\n    )\n    sku: str = Field(\n        pattern=r"^[A-Z]{3}-\\d{6}$",  # regex: ABC-123456\n        description="Stock Keeping Unit",\n        examples=["ABC-123456"],\n    )\n    category: Literal[\n        "electronics", "books", "clothing", "food"\n    ] = Field(description="Product category")\n\n# === OPTIONAL FIELDS ===\nclass UpdateProduct(BaseModel):\n    """All fields optional for PATCH updates."""\n    name: Optional[str] = Field(None, min_length=1, max_length=200)\n    price: Optional[float] = Field(None, gt=0, le=10000)\n    quantity: Optional[int] = Field(None, ge=0)\n    # Only include fields you want to update\n\n# === SPECIAL TYPES ===\nfrom pydantic import EmailStr, HttpUrl, UUID4, SecretStr, AnyUrl\nfrom datetime import datetime, date\n\nclass UserProfile(BaseModel):\n    id: UUID4                           # validates UUID format\n    email: EmailStr                     # validates email format\n    website: Optional[HttpUrl] = None   # validates URL format\n    birth_date: Optional[date] = None   # parses ISO date strings\n    created_at: datetime                # parses ISO datetime\n    api_key: SecretStr                  # hidden in repr (security!)\n    tags: list[str] = []                # list of strings\n    metadata: dict[str, str] = {}       # dict with string keys/values\n\n# SecretStr protects sensitive data\nprofile = UserProfile(\n    id="123e4567-e89b-12d3-a456-426614174000",\n    email="alice@example.com",\n    website="https://alice.dev",\n    birth_date="1990-05-15",\n    created_at="2024-01-15T10:30:00Z",\n    api_key="super-secret-key",\n)\nprint(profile.api_key)        # SecretStr(\'**********\')\nprint(profile.api_key.get_secret_value())  # actual value (explicit)\n\n# === NESTED MODELS ===\nclass Address(BaseModel):\n    street: str\n    city: str\n    state: str = Field(min_length=2, max_length=2)  # US state code\n    zip_code: str = Field(pattern=r"^\\d{5}(-\\d{4})?$")\n\nclass Company(BaseModel):\n    name: str\n    address: Address              # nested model\n    employees: list[Address] = [] # list of nested models\n\ncompany = Company(\n    name="Acme Corp",\n    address={\n        "street": "123 Main St",\n        "city": "NYC",\n        "state": "NY",\n        "zip_code": "10001",\n    },\n    employees=[],\n)\n# Nested dicts auto-validated and converted to Address\n\n# === ENUMS ===\nclass Role(str, Enum):\n    ADMIN = "admin"\n    USER = "user"\n    GUEST = "guest"\n\nclass User(BaseModel):\n    name: str\n    role: Role = Role.USER\n\nuser = User(name="Alice", role="admin")\nprint(user.role)        # Role.ADMIN\nprint(user.role.value)  # "admin"\n\n# === DEFAULT_FACTORY (mutable defaults) ===\nfrom datetime import datetime\n\nclass Task(BaseModel):\n    title: str\n    created_at: datetime = Field(default_factory=datetime.now)  # NOT datetime.now()!\n    tags: list[str] = Field(default_factory=list)  # NOT []!\n    # default_factory is called each time — fresh instance\n    # default=[] would share the same list across instances (bug!)\n\n# === MODEL_CONFIG ===\nclass UserResponse(BaseModel):\n    id: int\n    name: str\n    email: str\n    created_at: datetime\n\n    model_config = {\n        "from_attributes": True,  # allow creating from ORM objects (UserResponse.from_orm(obj))\n        "populate_by_name": True, # allow both field name and alias\n        "str_strip_whitespace": True,  # strip strings automatically\n        "str_max_length": 1000,\n        "extra": "forbid",  # raise error on extra fields (default: "ignore")\n    }\n\n# === FROM_ORM (convert ORM object to Pydantic) ===\n# With from_attributes=True:\n# db_user = await session.get(User, 1)\n# user_response = UserResponse.model_validate(db_user)\n# OR: UserResponse.from_orm(db_user)  # v1 syntax',
          explanation: 'Pydantic v2 BaseModel validates on instantiation. Field() for constraints (ge, le, pattern, min_length). Special types: EmailStr, HttpUrl, UUID4, SecretStr, date/datetime. Nested models auto-validate. Use default_factory for mutable defaults.'
        },
        {
          filename: 'validators.py',
          language: 'python',
          code: 'from pydantic import BaseModel, Field, field_validator, model_validator\nfrom typing import Optional\nimport re\n\n# === @field_validator — validate/transform a single field ===\n\nclass UserCreate(BaseModel):\n    name: str = Field(min_length=2, max_length=50)\n    email: str\n    password: str = Field(min_length=8)\n    username: str = Field(min_length=3, max_length=20)\n    bio: Optional[str] = Field(None, max_length=500)\n\n    @field_validator("email")\n    @classmethod\n    def normalize_email(cls, v: str) -> str:\n        """Lowercase and strip email."""\n        return v.strip().lower()\n\n    @field_validator("username")\n    @classmethod\n    def validate_username(cls, v: str) -> str:\n        """Username must be alphanumeric with underscores."""\n        if not re.match(r"^[a-zA-Z0-9_]+$", v):\n            raise ValueError("Username can only contain letters, numbers, and underscores")\n        # Cannot start with underscore\n        if v.startswith("_"):\n            raise ValueError("Username cannot start with underscore")\n        return v.lower()  # normalize to lowercase\n\n    @field_validator("password")\n    @classmethod\n    def validate_password(cls, v: str) -> str:\n        """Strong password validation."""\n        if len(v) < 8:\n            raise ValueError("Password must be at least 8 characters")\n        if not re.search(r"[A-Z]", v):\n            raise ValueError("Password must contain uppercase letter")\n        if not re.search(r"[a-z]", v):\n            raise ValueError("Password must contain lowercase letter")\n        if not re.search(r"\\d", v):\n            raise ValueError("Password must contain digit")\n        if not re.search(r"[!@#$%^&*()\\-_=+]", v):\n            raise ValueError("Password must contain special character")\n        return v\n\n    @field_validator("name")\n    @classmethod\n    def normalize_name(cls, v: str) -> str:\n        """Strip and title-case the name."""\n        return v.strip().title()\n\n# Test\nuser = UserCreate(\n    name="  alice smith  ",  # → "Alice Smith"\n    email="  ALICE@EXAMPLE.COM  ",  # → "alice@example.com"\n    username="Alice_Smith",  # → "alice_smith"\n    password="StrongP@ss1",\n)\nprint(user.name)      # Alice Smith\nprint(user.email)     # alice@example.com\nprint(user.username)  # alice_smith\n\n# === VALIDATE MULTIPLE FIELDS (mode="after") ===\n\nclass Product(BaseModel):\n    name: str\n    price: float\n    discount_percent: float = Field(default=0, ge=0, le=100)\n\n    @field_validator("price")\n    @classmethod\n    def price_must_be_positive(cls, v: float) -> float:\n        if v <= 0:\n            raise ValueError("Price must be positive")\n        return round(v, 2)  # round to 2 decimals\n\n# === @model_validator — whole-model validation ===\n\nclass UserRegistration(BaseModel):\n    password: str\n    confirm_password: str\n    email: str\n    accept_terms: bool\n\n    @model_validator(mode="after")\n    def passwords_match(self) -> "UserRegistration":\n        """Validate that passwords match."""\n        if self.password != self.confirm_password:\n            raise ValueError("Passwords do not match")\n        return self\n\n    @model_validator(mode="after")\n    def must_accept_terms(self) -> "UserRegistration":\n        """Must accept terms to register."""\n        if not self.accept_terms:\n            raise ValueError("Must accept terms and conditions")\n        return self\n\n# Test\ntry:\n    UserRegistration(\n        password="secret123",\n        confirm_password="different",\n        email="a@b.com",\n        accept_terms=True,\n    )\nexcept ValidationError as e:\n    print(e)  # Passwords do not match\n\n# === model_validator(mode="before") — runs before field validation ===\n\nclass CSVData(BaseModel):\n    """Parse CSV string into list."""\n    data: list[str]\n\n    @model_validator(mode="before")\n    @classmethod\n    def parse_csv(cls, data):\n        """If data is a string, split by comma."""\n        if isinstance(data, dict) and isinstance(data.get("data"), str):\n            data["data"] = [x.strip() for x in data["data"].split(",")]\n        return data\n\n# Input: {"data": "a, b, c"} → data = ["a", "b", "c"]\ncsv = CSVData(data="apple, banana, cherry")\nprint(csv.data)  # [\'apple\', \'banana\', \'cherry\']\n\n# === REAL-WORLD: USER MODEL WITH FULL VALIDATION ===\n\nclass UserCreate(BaseModel):\n    """User registration model with comprehensive validation."""\n    name: str = Field(min_length=2, max_length=50, description="Full name")\n    email: EmailStr = Field(description="Valid email address")\n    username: str = Field(\n        min_length=3, max_length=20,\n        pattern=r"^[a-zA-Z0-9_]+$",\n        description="Alphanumeric + underscore, 3-20 chars",\n    )\n    password: str = Field(min_length=8, max_length=128)\n    confirm_password: str\n    role: Literal["user", "admin"] = "user"\n    accept_terms: bool = Field(description="Must accept terms")\n\n    @field_validator("name")\n    @classmethod\n    def normalize_name(cls, v: str) -> str:\n        return " ".join(v.split()).title()  # normalize whitespace\n\n    @field_validator("username")\n    @classmethod\n    def lowercase_username(cls, v: str) -> str:\n        return v.lower()\n\n    @field_validator("password")\n    @classmethod\n    def strong_password(cls, v: str) -> str:\n        if not re.search(r"[A-Z]", v):\n            raise ValueError("Must contain uppercase")\n        if not re.search(r"[a-z]", v):\n            raise ValueError("Must contain lowercase")\n        if not re.search(r"\\d", v):\n            raise ValueError("Must contain digit")\n        if not re.search(r"[!@#$%^&*]", v):\n            raise ValueError("Must contain special char")\n        return v\n\n    @model_validator(mode="after")\n    def passwords_match(self) -> "UserCreate":\n        if self.password != self.confirm_password:\n            raise ValueError("Passwords do not match")\n        return self\n\n    @model_validator(mode="after")\n    def accepted_terms(self) -> "UserCreate":\n        if not self.accept_terms:\n            raise ValueError("Must accept terms")\n        return self',
          explanation: '@field_validator validates/transforms single fields. @model_validator(mode="after") for cross-field validation (passwords match). mode="before" runs before field validation (parse raw input). Validators can transform values (normalize, lowercase).'
        },
        {
          filename: 'fastapi_schemas.py',
          language: 'python',
          code: 'from fastapi import FastAPI, status, HTTPException\nfrom pydantic import BaseModel, Field, ConfigDict\nfrom typing import Optional\nfrom datetime import datetime\n\napp = FastAPI()\n\n# === SEPARATE MODELS FOR CREATE/UPDATE/RESPONSE ===\n# This is a senior pattern — different models for different operations\n\nclass UserBase(BaseModel):\n    """Base fields shared by all user models."""\n    name: str = Field(min_length=2, max_length=50)\n    email: str = Field(pattern=r"^[^@]+@[^@]+\\.[^@]+$")\n    bio: Optional[str] = Field(None, max_length=500)\n\nclass UserCreate(UserBase):\n    """Fields for creating a user (includes password)."""\n    password: str = Field(min_length=8, max_length=128)\n\nclass UserUpdate(BaseModel):\n    """Fields for updating a user (all optional)."""\n    name: Optional[str] = Field(None, min_length=2, max_length=50)\n    email: Optional[str] = Field(None, pattern=r"^[^@]+@[^@]+\\.[^@]+$")\n    bio: Optional[str] = Field(None, max_length=500)\n    # NOTE: no password field — separate endpoint for that\n\nclass UserResponse(UserBase):\n    """Response model — what we return to client (NO password!)."""\n    id: int\n    is_active: bool\n    created_at: datetime\n    # NOTE: no password field — security!\n\n    model_config = ConfigDict(from_attributes=True)  # allow from ORM objects\n\nclass UserInDB(UserBase):\n    """Internal model — includes hashed password (never sent to client)."""\n    id: int\n    hashed_password: str\n    is_active: bool\n    created_at: datetime\n\n# === USE IN FASTAPI ===\n\n# POST — request body is UserCreate, response is UserResponse\n@app.post(\n    "/users",\n    response_model=UserResponse,     # filters output!\n    status_code=status.HTTP_201_CREATED,\n)\nasync def create_user(user: UserCreate):\n    # user is already validated UserCreate instance\n    # Hash password, save to DB\n    db_user = UserInDB(\n        id=1,\n        name=user.name,\n        email=user.email,\n        bio=user.bio,\n        hashed_password=hash_password(user.password),\n        is_active=True,\n        created_at=datetime.now(),\n    )\n    # response_model=UserResponse filters out hashed_password!\n    return db_user  # only UserResponse fields are returned\n\n# GET — response is list of UserResponse\n@app.get("/users", response_model=list[UserResponse])\nasync def list_users(skip: int = 0, limit: int = 20):\n    users = await get_users_from_db(skip, limit)\n    return users  # each filtered to UserResponse fields\n\n# GET single — response is UserResponse\n@app.get("/users/{user_id}", response_model=UserResponse)\nasync def get_user(user_id: int):\n    user = await get_user_from_db(user_id)\n    if not user:\n        raise HTTPException(404, "User not found")\n    return user  # hashed_password filtered out!\n\n# PUT — request is UserUpdate, response is UserResponse\n@app.put("/users/{user_id}", response_model=UserResponse)\nasync def update_user(user_id: int, user_update: UserUpdate):\n    user = await get_user_from_db(user_id)\n    if not user:\n        raise HTTPException(404, "User not found")\n    # Only update non-None fields\n    update_data = user_update.model_dump(exclude_unset=True)\n    for key, value in update_data.items():\n        setattr(user, key, value)\n    await save_user(user)\n    return user\n\n# === response_model SECURITY FEATURE ===\n# Without response_model, ALL fields are returned (including password!)\n@app.post("/users-bad")\nasync def create_user_bad(user: UserCreate):\n    db_user = save_to_db(user)\n    return db_user  # returns EVERYTHING including hashed_password!\n\n# With response_model, only declared fields are returned\n@app.post("/users-good", response_model=UserResponse)\nasync def create_user_good(user: UserCreate):\n    db_user = save_to_db(user)\n    return db_user  # hashed_password FILTERED OUT — security!\n\n# === RESPONSE MODEL WITH EXCLUDE ===\nfrom typing import ClassVar\n\nclass UserResponse(BaseModel):\n    id: int\n    name: str\n    email: str\n    is_active: bool\n    internal_notes: str = ""  # internal field\n\n# Exclude specific fields from response\n@app.get("/users/{id}", response_model=UserResponse)\nasync def get_user(id: int):\n    user = get_from_db(id)\n    return user\n\n# OR exclude at endpoint level\n@app.get(\n    "/users/{id}/public",\n    response_model=UserResponse,\n    response_model_exclude={"internal_notes"},  # exclude this field\n)\nasync def get_public_user(id: int):\n    user = get_from_db(id)\n    return user  # internal_notes excluded\n\n# === RESPONSE MODEL WITH EXAMPLES ===\nfrom pydantic import Field\n\nclass ProductResponse(BaseModel):\n    id: int = Field(examples=[1])\n    name: str = Field(examples=["Wireless Mouse"])\n    price: float = Field(examples=[29.99])\n\n@app.get(\n    "/products/{id}",\n    response_model=ProductResponse,\n    responses={\n        200: {\n            "description": "Successful response",\n            "content": {\n                "application/json": {\n                    "example": {\n                        "id": 1,\n                        "name": "Wireless Mouse",\n                        "price": 29.99,\n                    }\n                }\n            },\n        },\n        404: {"description": "Product not found"},\n    },\n)\nasync def get_product(id: int):\n    pass',
          explanation: 'Separate models for Create/Update/Response (security: no password in response). response_model filters output — ONLY declared fields returned. Use exclude/exclude_unset for fine control. ConfigDict(from_attributes=True) for ORM compatibility.'
        },
      ],
      lab: {
        title: 'Build a Validated User Registration System',
        objective: 'Create Pydantic models with full validation for user registration',
        estTime: '60-90 minutes',
        difficulty: 'Intermediate',
        setup: [
          'FastAPI project from lesson 1',
          'Create file: src/blog/schemas/user.py',
        ],
        steps: [
          {
            title: 'Step 1: Create UserCreate model',
            instruction: 'Define the registration model with validation',
            code: '"""User Pydantic schemas."""\nfrom pydantic import BaseModel, Field, field_validator, model_validator, EmailStr\nfrom typing import Optional, Literal\nfrom datetime import datetime\nimport re\n\nclass UserBase(BaseModel):\n    """Base user fields."""\n    name: str = Field(min_length=2, max_length=50, description="Full name")\n    email: EmailStr = Field(description="Valid email")\n    username: str = Field(\n        min_length=3, max_length=20,\n        pattern=r"^[a-zA-Z0-9_]+$",\n        description="3-20 chars, alphanumeric + underscore",\n    )\n    bio: Optional[str] = Field(None, max_length=500)\n\nclass UserCreate(UserBase):\n    """Registration model with password."""\n    password: str = Field(min_length=8, max_length=128)\n    confirm_password: str\n    role: Literal["user", "admin"] = "user"\n    accept_terms: bool = True\n\n    @field_validator("name")\n    @classmethod\n    def normalize_name(cls, v: str) -> str:\n        return " ".join(v.split()).title()\n\n    @field_validator("username")\n    @classmethod\n    def lowercase(cls, v: str) -> str:\n        return v.lower()\n\n    @field_validator("password")\n    @classmethod\n    def strong_password(cls, v: str) -> str:\n        if not re.search(r"[A-Z]", v):\n            raise ValueError("Must contain uppercase")\n        if not re.search(r"[a-z]", v):\n            raise ValueError("Must contain lowercase")\n        if not re.search(r"\\d", v):\n            raise ValueError("Must contain digit")\n        return v\n\n    @model_validator(mode="after")\n    def passwords_match(self) -> "UserCreate":\n        if self.password != self.confirm_password:\n            raise ValueError("Passwords do not match")\n        if not self.accept_terms:\n            raise ValueError("Must accept terms")\n        return self',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Create UserResponse model',
            instruction: 'Response model WITHOUT password (security!)',
            code: 'class UserResponse(UserBase):\n    """Response model — NO password!"""\n    id: int\n    is_active: bool\n    created_at: datetime\n    role: str\n\n    model_config = {"from_attributes": True}\n\nclass UserUpdate(BaseModel):\n    """Update model — all fields optional."""\n    name: Optional[str] = Field(None, min_length=2, max_length=50)\n    email: Optional[EmailStr] = None\n    bio: Optional[str] = Field(None, max_length=500)\n\nclass UserInDB(UserBase):\n    """Internal model with hashed password."""\n    id: int\n    hashed_password: str\n    is_active: bool\n    created_at: datetime\n    role: str',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Create the registration endpoint',
            instruction: 'Use the models in a FastAPI endpoint',
            code: 'from fastapi import APIRouter, status, HTTPException\nfrom .schemas.user import UserCreate, UserResponse\n\nrouter = APIRouter()\n\n@router.post(\n    "/register",\n    response_model=UserResponse,\n    status_code=status.HTTP_201_CREATED,\n)\nasync def register(user: UserCreate):\n    """Register a new user."""\n    # Check if email exists\n    existing = await get_user_by_email(user.email)\n    if existing:\n        raise HTTPException(400, "Email already registered")\n\n    # Check if username exists\n    existing = await get_user_by_username(user.username)\n    if existing:\n        raise HTTPException(400, "Username taken")\n\n    # Hash password, save to DB\n    db_user = await create_user_in_db(\n        name=user.name,\n        email=user.email,\n        username=user.username,\n        bio=user.bio,\n        hashed_password=hash_password(user.password),\n        role=user.role,\n    )\n    return db_user  # UserResponse filters out hashed_password!\n\n# Test with curl:\n# curl -X POST http://localhost:8000/register \\\n#   -H "Content-Type: application/json" \\\n#   -d \'{"\n#     "name": "Alice Smith",\n#     "email": "alice@example.com",\n#     "username": "alice_smith",\n#     "password": "StrongP@ss1",\n#     "confirm_password": "StrongP@ss1",\n#     "accept_terms": true\n#   }\'',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Test validation',
            instruction: 'Try various inputs to see validation in action',
            code: '# Test 1: Valid registration\ncurl -X POST http://localhost:8000/register \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Alice","email":"alice@x.com","username":"alice","password":"StrongP1!","confirm_password":"StrongP1!","accept_terms":true}\'\n# → 201 Created with UserResponse (no password!)\n\n# Test 2: Passwords dont match\ncurl -X POST http://localhost:8000/register \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Bob","email":"bob@x.com","username":"bob","password":"StrongP1!","confirm_password":"Different1!","accept_terms":true}\'\n# → 422 "Passwords do not match"\n\n# Test 3: Weak password\ncurl -X POST http://localhost:8000/register \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Bob","email":"bob@x.com","username":"bob","password":"weak","confirm_password":"weak","accept_terms":true}\'\n# → 422 multiple errors (min_length, no uppercase, no digit)\n\n# Test 4: Invalid email\ncurl -X POST http://localhost:8000/register \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Bob","email":"not-an-email","username":"bob","password":"StrongP1!","confirm_password":"StrongP1!","accept_terms":true}\'\n# → 422 "value is not a valid email address"\n\n# Test 5: Username with special chars\ncurl -X POST http://localhost:8000/register \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Bob","email":"bob@x.com","username":"bob!","password":"StrongP1!","confirm_password":"StrongP1!","accept_terms":true}\'\n# → 422 "String should match pattern ^[a-zA-Z0-9_]+$"',
            codeLanguage: 'bash',
          },
        ],
        verification: 'All 5 test cases produce expected results. Swagger UI at /docs shows the schema with all validation rules.',
      },
      exercises: [
        {
          prompt: 'Create a Product model with: name (1-200 chars), price (>0, ≤10000), sku (regex ABC-123456), category (enum), in_stock (bool). Add a field_validator that rounds price to 2 decimals.',
          starterCode: 'from pydantic import BaseModel, Field, field_validator\nfrom enum import Enum\n\nclass Category(str, Enum):\n    ELECTRONICS = "electronics"\n    BOOKS = "books"\n    CLOTHING = "clothing"\n\nclass Product(BaseModel):\n    # your fields\n    pass\n',
          hint: 'Use Field() with constraints. @field_validator("price") with round(v, 2).',
          solution: 'from pydantic import BaseModel, Field, field_validator\nfrom enum import Enum\n\nclass Category(str, Enum):\n    ELECTRONICS = "electronics"\n    BOOKS = "books"\n    CLOTHING = "clothing"\n\nclass Product(BaseModel):\n    name: str = Field(min_length=1, max_length=200)\n    price: float = Field(gt=0, le=10000)\n    sku: str = Field(pattern=r"^[A-Z]{3}-\\d{6}$")\n    category: Category\n    in_stock: bool = True\n\n    @field_validator("price")\n    @classmethod\n    def round_price(cls, v: float) -> float:\n        return round(v, 2)\n\n# Test\np = Product(name="Mouse", price=29.999, sku="ABC-123456", category="electronics")\nprint(p.price)  # 30.0 (rounded to 2 decimals)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does response_model do?',
          options: [
            'Validates the request body',
            'Filters the response to only declared fields (SECURITY!)',
            'Caches responses',
            'Sets the HTTP status code',
          ],
          correctIndex: 1,
          explanation: 'response_model is a SECURITY feature. It filters output — only fields declared in the model are returned, hiding internal fields like hashed_password. Always use it!'
        },
        {
          question: 'How to validate that a number is between 1 and 100?',
          options: [
            'Field(1, 100)',
            'Field(ge=1, le=100)',
            'Field(min=1, max=100)',
            'Field(range=1-100)',
          ],
          correctIndex: 1,
          explanation: 'Field(ge=1, le=100) — ge = greater than or equal, le = less than or equal. Also: gt (greater than), lt (less than), min_length, max_length, pattern.'
        },
        {
          question: 'What does @field_validator do?',
          options: [
            'Validates field exists',
            'Adds custom validation/transformation logic for a field',
            'Marks field as required',
            'Caches field value',
          ],
          correctIndex: 1,
          explanation: '@field_validator("field_name") lets you add custom validation AND transformation. Use mode="before" to run before type coercion, mode="after" (default) to run after.'
        },
        {
          question: 'Why use separate Create/Update/Response models?',
          options: [
            'Faster',
            'Security: response model excludes password, update model has optional fields',
            'Required by FastAPI',
            'Less code',
          ],
          correctIndex: 1,
          explanation: 'Separate models: UserCreate (includes password), UserUpdate (all optional), UserResponse (NO password). This prevents accidentally returning passwords and allows partial updates.'
        },
      ],
      keyTakeaways: [
        'Pydantic v2 models validate data on instantiation (5-50x faster than v1)',
        'Use Field() for constraints: ge, le, gt, lt, min_length, max_length, pattern',
        'Special types: EmailStr, HttpUrl, UUID4, SecretStr, date, datetime',
        'Nested models auto-validate (Address inside Company)',
        'Use default_factory for mutable defaults (list, dict) — never default=[]',
        '@field_validator: validate/transform single field',
        '@model_validator(mode="after"): cross-field validation (passwords match)',
        'Separate models: UserCreate (input), UserUpdate (partial), UserResponse (output, no password)',
        'response_model is a SECURITY feature — filters output to declared fields only',
        'ConfigDict(from_attributes=True) allows creating from ORM objects',
      ],
      resources: [
        { title: 'Pydantic v2 Documentation', url: 'https://docs.pydantic.dev/latest/', type: 'docs' },
        { title: 'Pydantic v2 Migration Guide', url: 'https://docs.pydantic.dev/latest/migration/', type: 'article' },
        { title: 'FastAPI — Request Body', url: 'https://fastapi.tiangolo.com/tutorial/body/', type: 'docs' },
        { title: 'FastAPI — Response Model', url: 'https://fastapi.tiangolo.com/tutorial/response-model/', type: 'docs' },
      ]
    },

    {
      id: 'fa-04',
      title: 'Dependency Injection — Depends, Yield Dependencies, Class-based',
      subtitle: 'Master FastAPI\'s powerful DI system — database sessions, auth, shared logic',
      duration: 75,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'FastAPI has a powerful dependency injection (DI) system. Use `Depends()` to declare dependencies — FastAPI calls them and injects the return value. Dependencies can themselves have dependencies, forming a graph. Great for: database sessions, authentication, configuration, common parameters.',
        'Dependencies are cached PER REQUEST by default. If multiple routes depend on the same function, it is called ONCE per request. Use `use_cache=False` to disable. Class-based dependencies are instantiated per request.',
        'Yield dependencies (FastAPI 0.93+) let you do setup/teardown — perfect for database sessions. Code BEFORE yield is setup, code AFTER is teardown (runs even if exception). Like a context manager.',
        'Dependencies can be: functions, classes (instantiated), or generators. Use them at route level with Depends(), globally with `app = FastAPI(dependencies=[...])`, or per-router with `APIRouter(dependencies=[...])`.',
      ],
      visualization: {
        title: 'Dependency Injection Graph',
        type: 'architecture',
        diagram: `Route Handler
  │
  ├── Depends(get_db)──────────► get_db()
  │                                 │
  │                                 ├── create session (setup)
  │                                 ├── yield session (inject)
  │                                 └── close session (teardown)
  │
  ├── Depends(get_current_user)─► get_current_user()
  │                                 │
  │                                 ├── Depends(get_token)  ──► get_token()
  │                                 │                              │
  │                                 │                              └── Header(OAuth2)
  │                                 │
  │                                 ├── Depends(get_db)  ──► (cached! same as above)
  │                                 │
  │                                 ├── decode JWT
  │                                 ├── fetch user from DB
  │                                 └── return User
  │
  ├── Depends(verify_permissions)─► verify_permissions()
  │                                   │
  │                                   ├── Depends(get_current_user)  ──► (cached!)
  │                                   ├── check user.role == "admin"
  │                                   └── return True
  │
  └── Route logic runs with all injected values

KEY INSIGHTS:
• Dependencies form a DAG (directed acyclic graph)
• Same dependency called ONCE per request (cached)
• Yield dependencies = setup + teardown (like context manager)
• Sub-dependencies resolved automatically
• Failures propagate (raise HTTPException in dependency)`,
        legend: [
          'Depends() injects return values into route functions',
          'Dependencies cached per-request (same call = same result)',
          'Yield dependencies: setup before yield, teardown after',
          'Sub-dependencies form a graph, resolved automatically',
          'Raise HTTPException in dependency to fail fast',
        ],
      },
      codeExamples: [
        {
          filename: 'dependencies.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Depends, HTTPException, status\nfrom pydantic import BaseModel\nfrom typing import Annotated, Optional\n\napp = FastAPI()\n\n# === BASIC DEPENDENCY ===\n\ndef common_parameters(\n    q: Optional[str] = None,\n    skip: int = 0,\n    limit: int = 100,\n):\n    """Shared query parameters."""\n    return {"q": q, "skip": skip, "limit": limit}\n\n@app.get("/items/")\nasync def read_items(commons: Annotated[dict, Depends(common_parameters)]):\n    return {"message": "Hello", **commons}\n\n@app.get("/users/")\nasync def read_users(commons: Annotated[dict, Depends(common_parameters)]):\n    return {"message": "Users", **commons}\n\n# Both endpoints share the same dependency — DRY!\n\n# === CLASS-BASED DEPENDENCY ===\n\nclass Pagination:\n    """Class-based dependency — instantiated per request."""\n    def __init__(\n        self,\n        page: int = 1,\n        per_page: int = 20,\n        max_per_page: int = 100,\n    ):\n        if per_page > max_per_page:\n            raise HTTPException(400, f"per_page cannot exceed {max_per_page}")\n        self.page = page\n        self.per_page = per_page\n        self.skip = (page - 1) * per_page\n        self.limit = per_page\n\n@app.get("/posts")\nasync def list_posts(pagination: Annotated[Pagination, Depends()]):\n    # pagination is a Pagination instance\n    return {\n        "page": pagination.page,\n        "skip": pagination.skip,\n        "limit": pagination.limit,\n    }\n\n# === YIELD DEPENDENCY (setup/teardown) ===\n# Perfect for database sessions!\n\nfrom sqlalchemy.ext.asyncio import AsyncSession\n\ndef get_db():\n    """Database session dependency.\n    Code before yield = setup (create session)\n    Code after yield = teardown (close session, runs even on exception)\n    """\n    db = SessionLocal()  # setup\n    try:\n        yield db  # inject this value\n    finally:\n        db.close()  # teardown — always runs\n\n@app.get("/users")\nasync def list_users(db: Annotated[AsyncSession, Depends(get_db)]):\n    # db is the session from get_db\n    result = await db.execute(select(User))\n    return result.scalars().all()\n\n# === DEPENDENCY WITH EXCEPTIONS ===\n\nasync def get_current_user(\n    token: Annotated[str, Header()],\n    db: Annotated[AsyncSession, Depends(get_db)],\n) -> User:\n    """Get current user from JWT token.\n    Raises 401 if token invalid or user not found.\n    """\n    # Decode JWT\n    try:\n        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])\n        user_id = payload.get("sub")\n        if user_id is None:\n            raise HTTPException(401, "Invalid token")\n    except jwt.PyJWTError:\n        raise HTTPException(401, "Invalid token")\n\n    # Fetch user\n    user = await db.get(User, int(user_id))\n    if not user:\n        raise HTTPException(401, "User not found")\n    return user\n\n@app.get("/me")\nasync def get_me(current_user: Annotated[User, Depends(get_current_user)]):\n    return current_user\n\n# === SUB-DEPENDENCIES (form a graph) ===\n\ndef get_token(\n    authorization: Annotated[str, Header()],\n) -> str:\n    """Extract token from Authorization header."""\n    if not authorization.startswith("Bearer "):\n        raise HTTPException(401, "Invalid auth scheme")\n    return authorization[7:]  # strip "Bearer "\n\ndef get_current_user(\n    token: Annotated[str, Depends(get_token)],  # sub-dependency!\n    db: Annotated[AsyncSession, Depends(get_db)],  # another sub-dependency\n) -> User:\n    """Get user from token."""\n    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])\n    user = await db.get(User, int(payload["sub"]))\n    if not user:\n        raise HTTPException(401, "User not found")\n    return user\n\ndef get_current_active_user(\n    current_user: Annotated[User, Depends(get_current_user)],\n) -> User:\n    """Ensure user is active."""\n    if not current_user.is_active:\n        raise HTTPException(403, "Inactive user")\n    return current_user\n\ndef get_admin_user(\n    current_user: Annotated[User, Depends(get_current_active_user)],\n) -> User:\n    """Ensure user is admin."""\n    if current_user.role != "admin":\n        raise HTTPException(403, "Admin access required")\n    return current_user\n\n# Chain: get_admin_user → get_current_active_user → get_current_user → get_token\n# Each can fail fast with appropriate HTTPException\n\n@app.get("/admin")\nasync def admin_only(admin: Annotated[User, Depends(get_admin_user)]):\n    return {"message": f"Hello admin {admin.name}"}\n\n# === GLOBAL DEPENDENCIES (apply to ALL routes) ===\n\n# Apply to entire app\nsecure_app = FastAPI(dependencies=[Depends(verify_api_key)])\n\n# Apply to a router\nadmin_router = APIRouter(dependencies=[Depends(get_admin_user)])\n\n@admin_router.get("/stats")\nasync def get_stats():\n    return {"users": 1000}\n\n@admin_router.get("/revenue")\nasync def get_revenue():\n    return {"total": 50000}\n\n# Both /stats and /revenue require admin — no need to add Depends() on each!\n\n# === DEPENDENCY CACHING ===\n# Same dependency called ONCE per request (cached)\n\n@app.get("/items")\nasync def list_items(\n    db: Annotated[AsyncSession, Depends(get_db)],\n    user: Annotated[User, Depends(get_current_user)],  # also calls get_db internally\n):\n    # get_db called ONCE — db and user.db are the same session\n    # This is the default behavior\n    pass\n\n# To disable caching:\n# def my_dep(): ...\n# Depends(my_dep, use_cache=False)\n\n# === DEPENDENCY WITH YIELD + EXCEPTION HANDLING ===\n\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    except Exception:\n        await db.rollback()  # rollback on exception\n        raise\n    finally:\n        await db.close()\n\n# === REAL-WORLD: DATABASE SESSION DEPENDENCY ===\n\nfrom sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession\n\nengine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")\nasync_session = async_sessionmaker(engine, expire_on_commit=False)\n\nasync def get_db() -> AsyncSession:\n    """Async database session dependency."""\n    async with async_session() as session:\n        try:\n            yield session\n        except Exception:\n            await session.rollback()\n            raise\n        # No commit here — let the route decide\n\n# Usage\n@app.get("/users")\nasync def list_users(db: Annotated[AsyncSession, Depends(get_db)]):\n    result = await db.execute(select(User))\n    return result.scalars().all()\n\n@app.post("/users")\nasync def create_user(\n    user: UserCreate,\n    db: Annotated[AsyncSession, Depends(get_db)],\n):\n    db_user = User(**user.model_dump())\n    db.add(db_user)\n    await db.commit()\n    await db.refresh(db_user)\n    return db_user',
          explanation: 'Depends() injects return values. Yield dependencies do setup/teardown (DB sessions). Sub-dependencies form a graph, cached per request. Use global dependencies for auth on all routes. Classes are instantiated per request.'
        },
        {
          filename: 'auth_dependencies.py',
          language: 'python',
          code: '"""Authentication dependencies — production-grade JWT auth."""\nfrom fastapi import Depends, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy import select\nfrom typing import Annotated, Optional\nimport jwt\nfrom datetime import datetime\n\nfrom blog.core.config import settings\nfrom blog.core.security import verify_password\nfrom blog.models.user import User\n\n# OAuth2 scheme — extracts token from Authorization header\n# tokenUrl is the URL where clients get tokens (shown in Swagger UI)\noauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")\n\n# === TOKEN VERIFICATION DEPENDENCY ===\n\nasync def get_current_user(\n    token: Annotated[str, Depends(oauth2_scheme)],\n    db: Annotated[AsyncSession, Depends(get_db)],\n) -> User:\n    """Validate JWT token and return the user.\n\n    Raises:\n        HTTPException 401: If token is invalid, expired, or user not found.\n    """\n    credentials_exception = HTTPException(\n        status_code=status.HTTP_401_UNAUTHORIZED,\n        detail="Could not validate credentials",\n        headers={"WWW-Authenticate": "Bearer"},\n    )\n\n    try:\n        # Decode JWT\n        payload = jwt.decode(\n            token,\n            settings.SECRET_KEY.get_secret_value(),\n            algorithms=[settings.JWT_ALGORITHM],\n        )\n        user_id: Optional[str] = payload.get("sub")\n        token_type: str = payload.get("type", "access")\n\n        if user_id is None or token_type != "access":\n            raise credentials_exception\n\n        # Check expiry\n        exp = payload.get("exp")\n        if exp and datetime.utcnow() > datetime.fromtimestamp(exp):\n            raise HTTPException(401, "Token expired")\n\n    except jwt.PyJWTError:\n        raise credentials_exception\n\n    # Fetch user from DB\n    user = await db.get(User, int(user_id))\n    if user is None:\n        raise credentials_exception\n\n    return user\n\n# === ACTIVE USER DEPENDENCY ===\n\nasync def get_current_active_user(\n    current_user: Annotated[User, Depends(get_current_user)],\n) -> User:\n    """Ensure user account is active."""\n    if not current_user.is_active:\n        raise HTTPException(403, "Inactive user account")\n    return current_user\n\n# === VERIFIED USER DEPENDENCY ===\n\nasync def get_verified_user(\n    current_user: Annotated[User, Depends(get_current_active_user)],\n) -> User:\n    """Ensure user email is verified."""\n    if not current_user.email_verified:\n        raise HTTPException(403, "Email not verified")\n    return current_user\n\n# === ADMIN DEPENDENCY ===\n\nasync def get_admin_user(\n    current_user: Annotated[User, Depends(get_current_active_user)],\n) -> User:\n    """Ensure user has admin role."""\n    if current_user.role != "admin":\n        raise HTTPException(403, "Admin access required")\n    return current_user\n\n# === OPTIONAL AUTH (user may or may not be logged in) ===\n\nasync def get_optional_user(\n    token: Annotated[Optional[str], Depends(oauth2_scheme)],\n    db: Annotated[AsyncSession, Depends(get_db)],\n) -> Optional[User]:\n    """Get user if token provided, None otherwise."""\n    if token is None:\n        return None\n    try:\n        return await get_current_user(token=token, db=db)\n    except HTTPException:\n        return None  # ignore auth errors for optional auth\n\n# === USAGE IN ROUTES ===\n\nfrom fastapi import APIRouter\n\nrouter = APIRouter()\n\n# Public endpoint (no auth)\n@router.get("/posts")\nasync def list_posts(db: Annotated[AsyncSession, Depends(get_db)]):\n    return await get_posts(db)\n\n# Authenticated (any active user)\n@router.post("/posts")\nasync def create_post(\n    post: PostCreate,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    user: Annotated[User, Depends(get_current_active_user)],\n):\n    return await create_post_for_user(db, post, user.id)\n\n# Admin only\n@router.delete("/posts/{id}")\nasync def delete_post(\n    id: int,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    admin: Annotated[User, Depends(get_admin_user)],\n):\n    await delete_post_from_db(db, id)\n    return {"message": "Deleted"}\n\n# Optional auth (show edit button if logged in)\n@router.get("/posts/{id}")\nasync def get_post(\n    id: int,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    user: Annotated[Optional[User], Depends(get_optional_user)],\n):\n    post = await get_post_from_db(db, id)\n    can_edit = user and (user.id == post.author_id or user.role == "admin")\n    return {**post.model_dump(), "can_edit": can_edit}\n\n# === APPLY DEPENDENCIES TO ENTIRE ROUTER ===\n\nadmin_router = APIRouter(\n    prefix="/admin",\n    tags=["admin"],\n    dependencies=[Depends(get_admin_user)],  # ALL routes require admin!\n)\n\n@admin_router.get("/stats")\nasync def get_stats():\n    return {"users": 1000}\n\n@admin_router.get("/revenue")\nasync def get_revenue():\n    return {"total": 50000}\n# No need to add Depends() on each — router handles it',
          explanation: 'Build a dependency chain: oauth2_scheme → get_current_user → get_current_active_user → get_admin_user. Each can fail fast with 401/403. Use Depends on router to apply to all routes. Optional auth for public endpoints that show more if logged in.'
        },
      ],
      lab: {
        title: 'Build a Complete Authentication System',
        objective: 'Implement JWT auth with OAuth2 password flow using dependencies',
        estTime: '90-120 minutes',
        difficulty: 'Intermediate',
        setup: [
          'FastAPI project from lesson 1',
          'pip install python-jose passlib[bcrypt] python-multipart',
        ],
        steps: [
          {
            title: 'Step 1: Create security utilities',
            instruction: 'Password hashing and JWT token creation',
            code: '"""Security utilities — password hashing and JWT."""\nfrom datetime import datetime, timedelta\nfrom typing import Optional\nfrom jose import jwt, JWTError\nfrom passlib.context import CryptContext\nfrom blog.core.config import settings\n\n# Password hashing\npwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")\n\ndef hash_password(password: str) -> str:\n    """Hash a password for storage."""\n    return pwd_context.hash(password)\n\ndef verify_password(plain: str, hashed: str) -> bool:\n    """Verify a password against its hash."""\n    return pwd_context.verify(plain, hashed)\n\ndef create_access_token(\n    subject: str,\n    expires_delta: Optional[timedelta] = None,\n) -> str:\n    """Create JWT access token."""\n    expire = datetime.utcnow() + (\n        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)\n    )\n    to_encode = {\n        "sub": subject,\n        "exp": expire,\n        "type": "access",\n        "iat": datetime.utcnow(),\n    }\n    return jwt.encode(\n        to_encode,\n        settings.SECRET_KEY.get_secret_value(),\n        algorithm=settings.JWT_ALGORITHM,\n    )\n\ndef create_refresh_token(subject: str) -> str:\n    """Create JWT refresh token (longer-lived)."""\n    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)\n    to_encode = {\n        "sub": subject,\n        "exp": expire,\n        "type": "refresh",\n        "iat": datetime.utcnow(),\n    }\n    return jwt.encode(\n        to_encode,\n        settings.SECRET_KEY.get_secret_value(),\n        algorithm=settings.JWT_ALGORITHM,\n    )\n\ndef decode_token(token: str) -> Optional[dict]:\n    """Decode and verify JWT token."""\n    try:\n        return jwt.decode(\n            token,\n            settings.SECRET_KEY.get_secret_value(),\n            algorithms=[settings.JWT_ALGORITHM],\n        )\n    except JWTError:\n        return None',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Create auth dependencies',
            instruction: 'FastAPI dependencies for getting current user',
            code: '"""Auth dependencies."""\nfrom fastapi import Depends, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom typing import Annotated\n\nfrom blog.core.security import decode_token\nfrom blog.api.deps import get_db\nfrom blog.models.user import User\n\noauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")\n\nasync def get_current_user(\n    token: Annotated[str, Depends(oauth2_scheme)],\n    db: Annotated[AsyncSession, Depends(get_db)],\n) -> User:\n    """Get current user from JWT token."""\n    credentials_exc = HTTPException(\n        status_code=status.HTTP_401_UNAUTHORIZED,\n        detail="Could not validate credentials",\n        headers={"WWW-Authenticate": "Bearer"},\n    )\n    payload = decode_token(token)\n    if payload is None or payload.get("type") != "access":\n        raise credentials_exc\n    user_id = payload.get("sub")\n    if user_id is None:\n        raise credentials_exc\n    user = await db.get(User, int(user_id))\n    if user is None or not user.is_active:\n        raise credentials_exc\n    return user',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Create auth endpoints',
            instruction: 'Login, register, refresh, me endpoints',
            code: '"""Auth router — login, register, refresh."""\nfrom fastapi import APIRouter, Depends, HTTPException, status\nfrom fastapi.security import OAuth2PasswordRequestForm\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy import select\nfrom typing import Annotated\nfrom pydantic import BaseModel\n\nfrom blog.api.deps import get_db\nfrom blog.core.security import (\n    hash_password, verify_password,\n    create_access_token, create_refresh_token, decode_token,\n)\nfrom blog.schemas.user import UserCreate, UserResponse\nfrom blog.models.user import User\nfrom blog.api.auth_deps import get_current_user\n\nrouter = APIRouter()\n\nclass TokenResponse(BaseModel):\n    access_token: str\n    refresh_token: str\n    token_type: str = "bearer"\n\nclass RefreshRequest(BaseModel):\n    refresh_token: str\n\n@router.post("/register", response_model=UserResponse, status_code=201)\nasync def register(\n    user: UserCreate,\n    db: Annotated[AsyncSession, Depends(get_db)],\n):\n    """Register a new user."""\n    # Check if email exists\n    existing = await db.execute(select(User).where(User.email == user.email))\n    if existing.scalar_one_or_none():\n        raise HTTPException(400, "Email already registered")\n\n    # Create user\n    db_user = User(\n        email=user.email,\n        name=user.name,\n        username=user.username,\n        hashed_password=hash_password(user.password),\n        is_active=True,\n    )\n    db.add(db_user)\n    await db.commit()\n    await db.refresh(db_user)\n    return db_user\n\n@router.post("/login", response_model=TokenResponse)\nasync def login(\n    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],\n    db: Annotated[AsyncSession, Depends(get_db)],\n):\n    """Login and get access + refresh tokens."""\n    # OAuth2PasswordRequestForm has username and password fields\n    user = await db.execute(\n        select(User).where(User.email == form_data.username)\n    )\n    user = user.scalar_one_or_none()\n\n    if not user or not verify_password(form_data.password, user.hashed_password):\n        raise HTTPException(401, "Incorrect email or password")\n\n    if not user.is_active:\n        raise HTTPException(403, "Account deactivated")\n\n    return TokenResponse(\n        access_token=create_access_token(str(user.id)),\n        refresh_token=create_refresh_token(str(user.id)),\n    )\n\n@router.post("/refresh", response_model=TokenResponse)\nasync def refresh_token(\n    request: RefreshRequest,\n    db: Annotated[AsyncSession, Depends(get_db)],\n):\n    """Get new access token using refresh token."""\n    payload = decode_token(request.refresh_token)\n    if not payload or payload.get("type") != "refresh":\n        raise HTTPException(401, "Invalid refresh token")\n\n    user_id = payload.get("sub")\n    user = await db.get(User, int(user_id))\n    if not user or not user.is_active:\n        raise HTTPException(401, "User not found or inactive")\n\n    return TokenResponse(\n        access_token=create_access_token(str(user.id)),\n        refresh_token=create_refresh_token(str(user.id)),\n    )\n\n@router.get("/me", response_model=UserResponse)\nasync def get_me(\n    current_user: Annotated[User, Depends(get_current_user)],\n):\n    """Get current user profile."""\n    return current_user',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Test the auth flow',
            instruction: 'Register, login, access protected endpoint',
            code: '# 1. Register\ncurl -X POST http://localhost:8000/api/v1/auth/register \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Alice","email":"alice@x.com","username":"alice","password":"StrongP1!","confirm_password":"StrongP1!","accept_terms":true}\'\n\n# 2. Login (get tokens)\nTOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/login \\\n  -d "username=alice@x.com&password=StrongP1!" | jq -r .access_token)\n\n# 3. Access protected endpoint\ncurl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/v1/auth/me\n\n# 4. Try without token (should get 401)\ncurl http://localhost:8000/api/v1/auth/me\n# → {"detail":"Not authenticated"}\n\n# 5. Refresh token\nREFRESH=$(curl -s -X POST http://localhost:8000/api/v1/auth/login \\\n  -d "username=alice@x.com&password=StrongP1!" | jq -r .refresh_token)\ncurl -X POST http://localhost:8000/api/v1/auth/refresh \\\n  -H "Content-Type: application/json" \\\n  -d "{\\"refresh_token\\": \\"$REFRESH\\"}"',
            codeLanguage: 'bash',
          },
        ],
        verification: 'Registration, login, token refresh, and protected /me endpoint all work. Without token, get 401. Swagger UI shows the lock icon on protected endpoints.',
      },
      exercises: [
        {
          prompt: 'Create a rate limiting dependency that limits to 100 requests per minute per IP. Use a simple in-memory dict.',
          starterCode: 'from fastapi import Depends, HTTPException, Request\nfrom collections import defaultdict\nfrom time import time\n\nRATE_LIMIT = 100  # requests per minute\n\n# your dependency\n',
          hint: 'Use a module-level dict to track {ip: [timestamps]}. In the dependency, clean old timestamps, check count.',
          solution: 'from fastapi import Depends, HTTPException, Request\nfrom collections import defaultdict\nfrom time import time\nfrom typing import Annotated\n\nRATE_LIMIT = 100  # requests per minute\n_rate_store: dict[str, list[float]] = defaultdict(list)\n\nasync def rate_limiter(request: Request):\n    """Limit to RATE_LIMIT requests per minute per IP."""\n    client_ip = request.client.host\n    now = time()\n\n    # Remove timestamps older than 60 seconds\n    _rate_store[client_ip] = [\n        t for t in _rate_store[client_ip] if now - t < 60\n    ]\n\n    if len(_rate_store[client_ip]) >= RATE_LIMIT:\n        raise HTTPException(429, "Too many requests")\n\n    _rate_store[client_ip].append(now)\n\n# Usage:\n# @app.get("/api", dependencies=[Depends(rate_limiter)])\n# async def api(): ...',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'How are dependencies cached?',
          options: [
            'Never cached',
            'Per-request (same Depends() in multiple places runs once)',
            'Forever',
            'Per-route',
          ],
          correctIndex: 1,
          explanation: 'By default, dependencies are cached per-request. If get_db is called in multiple places, it runs ONCE. Use use_cache=False to disable.'
        },
        {
          question: 'What is a yield dependency useful for?',
          options: [
            'Async code',
            'Setup/teardown like DB sessions (code before yield = setup, after = teardown)',
            'Caching',
            'Nothing special',
          ],
          correctIndex: 1,
          explanation: 'Yield dependencies are like context managers. Code before yield is setup, code after is teardown (runs even on exception). Perfect for DB sessions, transactions, file handles.'
        },
        {
          question: 'How to apply a dependency to ALL routes in a router?',
          options: [
            'Add Depends() to each route',
            'APIRouter(dependencies=[Depends(...)])',
            'Cannot be done',
            'Use middleware instead',
          ],
          correctIndex: 1,
          explanation: 'APIRouter(dependencies=[Depends(auth)]) applies the dependency to ALL routes in that router. Also works at app level: FastAPI(dependencies=[...]).'
        },
        {
          question: 'What happens if a dependency raises HTTPException?',
          options: [
            'Server crashes',
            'The exception propagates — route never runs, client gets the error',
            'It is ignored',
            '500 Internal Server Error',
          ],
          correctIndex: 1,
          explanation: 'If a dependency raises HTTPException, FastAPI returns that error to the client. The route handler never runs. This is how auth dependencies work — fail fast with 401.'
        },
      ],
      keyTakeaways: [
        'Depends() injects return values into route functions',
        'Dependencies can have sub-dependencies — form a graph',
        'Yield dependencies: setup before yield, teardown after (DB sessions)',
        'Dependencies cached per-request by default (use_cache=False to disable)',
        'Class-based dependencies instantiated per request',
        'Raise HTTPException in dependency to fail fast (auth, permissions)',
        'Apply to entire router: APIRouter(dependencies=[Depends(auth)])',
        'Build auth chains: get_token → get_current_user → get_admin_user',
        'OAuth2PasswordBearer extracts token from Authorization header',
        'Optional auth: use Optional[str] parameter type',
      ],
      resources: [
        { title: 'FastAPI — Dependencies', url: 'https://fastapi.tiangolo.com/tutorial/dependencies/', type: 'docs' },
        { title: 'FastAPI — Yield Dependencies', url: 'https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/', type: 'docs' },
        { title: 'FastAPI — Security', url: 'https://fastapi.tiangolo.com/tutorial/security/', type: 'docs' },
      ]
    },

    {
      id: 'fa-05',
      title: 'Database Integration — Async SQLAlchemy 2.0 + PostgreSQL',
      subtitle: 'Connect PostgreSQL with async SQLAlchemy, models, CRUD, relationships',
      duration: 85,
      difficulty: 'Intermediate',
      phase: 'Advanced',
      content: [
        'FastAPI works great with SQLAlchemy 2.0 async. Use create_async_engine with asyncpg driver for PostgreSQL. The pattern: define models in models.py, create async engine + session factory, use a yield dependency to provide sessions to routes.',
        'SQLAlchemy 2.0 uses typed Mapped[] annotations. Define models with `class User(Base)` using `Mapped[int] = mapped_column(primary_key=True)`. This gives type safety in your IDE and works with mypy/pyright.',
        'Use select() for queries (not the legacy Query API). Execute with `await session.execute(stmt)`, then use `.scalars()` to get ORM objects, `.first()` for one, `.all()` for list, `.scalar_one_or_none()` for optional single.',
        'For relationships: use relationship() + ForeignKey. one-to-many (User has many Posts), many-to-many (Posts and Tags via association table). Use back_populates for bidirectional access, lazy="selectin" to avoid N+1 queries.',
      ],
      codeExamples: [
        {
          filename: 'database_setup.py',
          language: 'python',
          code: '"""Database setup — async SQLAlchemy 2.0."""\nfrom sqlalchemy.ext.asyncio import (\n    create_async_engine,\n    async_sessionmaker,\n    AsyncSession,\n)\nfrom sqlalchemy.orm import DeclarativeBase\nfrom blog.core.config import settings\n\n# Async engine (asyncpg for PostgreSQL, aiosqlite for SQLite)\nengine = create_async_engine(\n    settings.DATABASE_URL,\n    echo=settings.DEBUG,  # log SQL queries in dev\n    pool_size=settings.DB_POOL_SIZE,  # connection pool\n    max_overflow=settings.DB_MAX_OVERFLOW,\n    pool_timeout=settings.DB_POOL_TIMEOUT,\n    pool_recycle=settings.DB_POOL_RECYCLE,  # recycle old connections\n    pool_pre_ping=True,  # check connection is alive before use\n)\n\n# Session factory\nasync_session = async_sessionmaker(\n    engine,\n    class_=AsyncSession,\n    expire_on_commit=False,  # CRITICAL for async! Objects stay usable after commit\n)\n\n# Base class for all models\nclass Base(DeclarativeBase):\n    """Base class for SQLAlchemy models."""\n    pass\n\n# === DATABASE SESSION DEPENDENCY ===\n\nfrom typing import AsyncIterator\nfrom fastapi import Depends\n\nasync def get_db() -> AsyncIterator[AsyncSession]:\n    """Yield a database session.\n\n    The session is created, used by the route, then closed.\n    On exception, the session is rolled back.\n    """\n    async with async_session() as session:\n        try:\n            yield session\n        except Exception:\n            await session.rollback()\n            raise\n        # Note: route is responsible for commit()\n\n# === INITIALIZATION (for testing/scripts) ===\n\nasync def init_db():\n    """Create all tables (use Alembic in production!)."""\n    async with engine.begin() as conn:\n        await conn.run_sync(Base.metadata.create_all)\n\nasync def drop_db():\n    """Drop all tables (testing only!)."""\n    async with engine.begin() as conn:\n        await conn.run_sync(Base.metadata.drop_all)\n\n# === CONNECTION POOLING EXPLAINED ===\n# pool_size=20: maintain 20 connections\n# max_overflow=10: allow 10 extra connections under load (total 30)\n# pool_timeout=30: wait 30s for a connection before erroring\n# pool_recycle=3600: recycle connections after 1 hour (prevents stale)\n# pool_pre_ping=True: check connection health before use\n\n# === TESTING DATABASE ===\n# Use in-memory SQLite for tests (fast, isolated)\n# test_engine = create_async_engine("sqlite+aiosqlite:///:memory:")\n# TestingSession = async_sessionmaker(test_engine, expire_on_commit=False)',
          explanation: 'create_async_engine + async_sessionmaker + yield dependency. CRITICAL: expire_on_commit=False for async (objects stay usable after commit). pool_pre_ping=True checks connection health. Use in-memory SQLite for tests.'
        },
        {
          filename: 'models.py',
          language: 'python',
          code: '"""SQLAlchemy 2.0 models with type annotations."""\nfrom sqlalchemy import (\n    String, Integer, Boolean, DateTime, Text, ForeignKey, Table, Column,\n    func, Index,\n)\nfrom sqlalchemy.orm import (\n    DeclarativeBase, Mapped, mapped_column, relationship,\n)\nfrom typing import Optional, List\nfrom datetime import datetime\nfrom blog.db.base import Base\n\n# === MANY-TO-MANY ASSOCIATION TABLE ===\npost_tags = Table(\n    "post_tags",\n    Base.metadata,\n    Column("post_id", ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),\n    Column("tag_id", ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),\n    Index("ix_post_tags_post_id", "post_id"),\n    Index("ix_post_tags_tag_id", "tag_id"),\n)\n\nclass User(Base):\n    __tablename__ = "users"\n\n    # Typed columns (SQLAlchemy 2.0 style)\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)\n    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)\n    name: Mapped[str] = mapped_column(String(100))\n    hashed_password: Mapped[str] = mapped_column(String(255))\n    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)\n    is_active: Mapped[bool] = mapped_column(Boolean, default=True)\n    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)\n    role: Mapped[str] = mapped_column(String(20), default="user")  # user, admin\n    created_at: Mapped[datetime] = mapped_column(\n        DateTime(timezone=True),\n        server_default=func.now(),\n    )\n    updated_at: Mapped[datetime] = mapped_column(\n        DateTime(timezone=True),\n        server_default=func.now(),\n        onupdate=func.now(),\n    )\n\n    # Relationships\n    posts: Mapped[List["Post"]] = relationship(\n        back_populates="author",\n        cascade="all, delete-orphan",\n        lazy="selectin",  # eager load by default\n    )\n    comments: Mapped[List["Comment"]] = relationship(\n        back_populates="author",\n        cascade="all, delete-orphan",\n    )\n\n    def __repr__(self) -> str:\n        return f"<User {self.email!r}>"\n\nclass Post(Base):\n    __tablename__ = "posts"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str] = mapped_column(String(200), index=True)\n    slug: Mapped[str] = mapped_column(String(200), unique=True, index=True)\n    content: Mapped[str] = mapped_column(Text)\n    excerpt: Mapped[Optional[str]] = mapped_column(String(500))\n    published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)\n    view_count: Mapped[int] = mapped_column(Integer, default=0)\n    author_id: Mapped[int] = mapped_column(\n        ForeignKey("users.id", ondelete="CASCADE"),\n        index=True,\n    )\n    created_at: Mapped[datetime] = mapped_column(\n        DateTime(timezone=True), server_default=func.now()\n    )\n    updated_at: Mapped[datetime] = mapped_column(\n        DateTime(timezone=True),\n        server_default=func.now(),\n        onupdate=func.now(),\n    )\n    published_at: Mapped[Optional[datetime]] = mapped_column(\n        DateTime(timezone=True), nullable=True\n    )\n\n    # Relationships\n    author: Mapped["User"] = relationship(back_populates="posts")\n    comments: Mapped[List["Comment"]] = relationship(\n        back_populates="post",\n        cascade="all, delete-orphan",\n        lazy="selectin",\n    )\n    tags: Mapped[List["Tag"]] = relationship(\n        secondary=post_tags,\n        back_populates="posts",\n        lazy="selectin",\n    )\n\n    # Indexes\n    __table_args__ = (\n        Index("ix_posts_published_created", "published", "created_at"),\n    )\n\nclass Comment(Base):\n    __tablename__ = "comments"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    content: Mapped[str] = mapped_column(Text)\n    author_id: Mapped[int] = mapped_column(\n        ForeignKey("users.id", ondelete="CASCADE")\n    )\n    post_id: Mapped[int] = mapped_column(\n        ForeignKey("posts.id", ondelete="CASCADE"),\n        index=True,\n    )\n    parent_id: Mapped[Optional[int]] = mapped_column(\n        ForeignKey("comments.id", ondelete="CASCADE"),\n        nullable=True,\n    )  # for nested replies\n    created_at: Mapped[datetime] = mapped_column(\n        DateTime(timezone=True), server_default=func.now()\n    )\n\n    # Relationships\n    author: Mapped["User"] = relationship(back_populates="comments")\n    post: Mapped["Post"] = relationship(back_populates="comments")\n    replies: Mapped[List["Comment"]] = relationship(\n        back_populates="parent",\n        cascade="all, delete-orphan",\n    )\n    parent: Mapped[Optional["Comment"]] = relationship(\n        back_populates="replies",\n        remote_side="Comment.id",  # self-referential\n    )\n\nclass Tag(Base):\n    __tablename__ = "tags"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)\n    slug: Mapped[str] = mapped_column(String(50), unique=True)\n    description: Mapped[Optional[str]] = mapped_column(String(200))\n\n    posts: Mapped[List["Post"]] = relationship(\n        secondary=post_tags,\n        back_populates="tags",\n        lazy="selectin",\n    )',
          explanation: 'SQLAlchemy 2.0 uses Mapped[] for typed columns. relationship() + ForeignKey for connections. back_populates for bidirectional. Many-to-many via association table. lazy="selectin" avoids N+1. server_default=func.now() for DB defaults.'
        },
        {
          filename: 'crud_routes.py',
          language: 'python',
          code: '"""CRUD operations and FastAPI routes."""\nfrom fastapi import APIRouter, Depends, HTTPException, status, Query\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy import select, func, update, delete\nfrom typing import Annotated, Optional\nfrom datetime import datetime\n\nfrom blog.api.deps import get_db, get_current_user\nfrom blog.models.user import User\nfrom blog.models.post import Post\nfrom blog.schemas.post import PostCreate, PostUpdate, PostResponse\n\nrouter = APIRouter()\n\n# === CREATE ===\n\n@router.post("/", response_model=PostResponse, status_code=201)\nasync def create_post(\n    post_data: PostCreate,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    current_user: Annotated[User, Depends(get_current_user)],\n):\n    """Create a new post."""\n    # Check if slug already exists\n    existing = await db.execute(\n        select(Post).where(Post.slug == post_data.slug)\n    )\n    if existing.scalar_one_or_none():\n        raise HTTPException(400, "Slug already exists")\n\n    # Create post\n    post = Post(\n        **post_data.model_dump(),\n        author_id=current_user.id,\n        published_at=datetime.utcnow() if post_data.published else None,\n    )\n    db.add(post)\n    await db.commit()\n    await db.refresh(post)\n    return post\n\n# === READ (single) ===\n\n@router.get("/{post_id}", response_model=PostResponse)\nasync def get_post(\n    post_id: int,\n    db: Annotated[AsyncSession, Depends(get_db)],\n):\n    """Get a single post by ID."""\n    post = await db.get(Post, post_id)\n    if not post:\n        raise HTTPException(404, "Post not found")\n    if not post.published:\n        raise HTTPException(404, "Post not found")\n    return post\n\n# Alternative: select with where\n@router.get("/by-slug/{slug}", response_model=PostResponse)\nasync def get_post_by_slug(\n    slug: str,\n    db: Annotated[AsyncSession, Depends(get_db)],\n):\n    """Get post by slug."""\n    stmt = select(Post).where(Post.slug == slug, Post.published == True)\n    result = await db.execute(stmt)\n    post = result.scalar_one_or_none()\n    if not post:\n        raise HTTPException(404, "Post not found")\n    return post\n\n# === READ (list with pagination, filtering, sorting) ===\n\n@router.get("/", response_model=list[PostResponse])\nasync def list_posts(\n    db: Annotated[AsyncSession, Depends(get_db)],\n    skip: int = Query(0, ge=0),\n    limit: int = Query(20, ge=1, le=100),\n    tag: Optional[str] = None,\n    author_id: Optional[int] = None,\n    search: Optional[str] = Query(None, min_length=2),\n    sort_by: str = Query("created_at", pattern="^(created_at|title|view_count)$"),\n    order: str = Query("desc", pattern="^(asc|desc)$"),\n):\n    """List published posts with filtering and pagination."""\n    # Build query dynamically\n    stmt = select(Post).where(Post.published == True)\n\n    # Apply filters\n    if author_id:\n        stmt = stmt.where(Post.author_id == author_id)\n    if search:\n        stmt = stmt.where(\n            Post.title.ilike(f"%{search}%") |\n            Post.content.ilike(f"%{search}%")\n        )\n    if tag:\n        stmt = stmt.join(Post.tags).where(Tag.name == tag)\n\n    # Apply sorting\n    sort_column = getattr(Post, sort_by)\n    stmt = stmt.order_by(\n        sort_column.desc() if order == "desc" else sort_column.asc()\n    )\n\n    # Apply pagination\n    stmt = stmt.offset(skip).limit(limit)\n\n    result = await db.execute(stmt)\n    return result.scalars().all()\n\n# === UPDATE ===\n\n@router.put("/{post_id}", response_model=PostResponse)\nasync def update_post(\n    post_id: int,\n    post_update: PostUpdate,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    current_user: Annotated[User, Depends(get_current_user)],\n):\n    """Update a post (author only)."""\n    post = await db.get(Post, post_id)\n    if not post:\n        raise HTTPException(404, "Post not found")\n    if post.author_id != current_user.id:\n        raise HTTPException(403, "Not authorized to edit this post")\n\n    # Only update non-None fields\n    update_data = post_update.model_dump(exclude_unset=True)\n    for key, value in update_data.items():\n        setattr(post, key, value)\n\n    # If publishing for the first time, set published_at\n    if post_update.published and not post.published_at:\n        post.published_at = datetime.utcnow()\n\n    await db.commit()\n    await db.refresh(post)\n    return post\n\n# Bulk update (faster than updating one by one)\n@router.post("/unpublish-all")\nasync def unpublish_all_by_author(\n    author_id: int,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    current_user: Annotated[User, Depends(get_current_user)],\n):\n    """Unpublish all posts by an author (admin only)."""\n    if current_user.role != "admin":\n        raise HTTPException(403, "Admin only")\n\n    stmt = (\n        update(Post)\n        .where(Post.author_id == author_id)\n        .values(published=False, published_at=None)\n    )\n    result = await db.execute(stmt)\n    await db.commit()\n    return {"updated": result.rowcount}\n\n# === DELETE ===\n\n@router.delete("/{post_id}", status_code=204)\nasync def delete_post(\n    post_id: int,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    current_user: Annotated[User, Depends(get_current_user)],\n):\n    """Delete a post (author or admin only)."""\n    post = await db.get(Post, post_id)\n    if not post:\n        raise HTTPException(404, "Post not found")\n    if post.author_id != current_user.id and current_user.role != "admin":\n        raise HTTPException(403, "Not authorized")\n\n    await db.delete(post)\n    await db.commit()\n\n# Bulk delete\n@router.delete("/old/")\nasync def delete_old_posts(\n    days: int = 365,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    current_user: Annotated[User, Depends(get_current_user)],\n):\n    """Delete posts older than N days (admin only)."""\n    if current_user.role != "admin":\n        raise HTTPException(403, "Admin only")\n\n    cutoff = datetime.utcnow() - timedelta(days=days)\n    stmt = delete(Post).where(\n        Post.created_at < cutoff,\n        Post.published == False,\n    )\n    result = await db.execute(stmt)\n    await db.commit()\n    return {"deleted": result.rowcount}\n\n# === AGGREGATE QUERIES ===\n\n@router.get("/stats/summary")\nasync def get_stats(\n    db: Annotated[AsyncSession, Depends(get_db)],\n):\n    """Get blog statistics."""\n    # Count posts\n    total_posts = await db.scalar(\n        select(func.count(Post.id))\n    )\n\n    # Count published\n    published_posts = await db.scalar(\n        select(func.count(Post.id)).where(Post.published == True)\n    )\n\n    # Total views\n    total_views = await db.scalar(\n        select(func.sum(Post.view_count))\n    )\n\n    # Average views per post\n    avg_views = await db.scalar(\n        select(func.avg(Post.view_count))\n    )\n\n    # Posts per author\n    posts_per_author = await db.execute(\n        select(\n            User.name,\n            func.count(Post.id).label("post_count")\n        )\n        .join(Post)\n        .group_by(User.id, User.name)\n        .order_by(func.count(Post.id).desc())\n        .limit(10)\n    )\n\n    return {\n        "total_posts": total_posts,\n        "published_posts": published_posts,\n        "total_views": total_views or 0,\n        "avg_views": float(avg_views) if avg_views else 0,\n        "top_authors": [\n            {"name": name, "posts": count}\n            for name, count in posts_per_author\n        ],\n    }',
          explanation: 'Use select() with .where() for queries. .scalar_one_or_none() for single optional. .scalars().all() for list. update() and delete() for bulk ops. func.count/sum/avg for aggregates. Always commit after writes.'
        },
      ],
      lab: {
        title: 'Build a Complete Posts API with Database',
        objective: 'Full CRUD for posts with filtering, pagination, search, and stats',
        estTime: '90-120 minutes',
        difficulty: 'Advanced',
        setup: [
          'PostgreSQL running (or use Docker)',
          'FastAPI project with auth from previous lessons',
        ],
        steps: [
          {
            title: 'Step 1: Set up PostgreSQL with Docker',
            instruction: 'Run PostgreSQL in Docker for development',
            code: '# docker-compose.yml\nservices:\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: blog\n      POSTGRES_PASSWORD: blogpass\n      POSTGRES_DB: blog\n    ports:\n      - "5432:5432"\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U blog"]\n      interval: 5s\n      retries: 5\n\nvolumes:\n  pgdata:\n\n# Start: docker compose up -d db',
            codeLanguage: 'yaml',
          },
          {
            title: 'Step 2: Create Post models',
            instruction: 'Define Post model with relationships',
            code: '# src/blog/models/post.py\nfrom sqlalchemy import String, Text, Boolean, Integer, DateTime, ForeignKey, func\nfrom sqlalchemy.orm import Mapped, mapped_column, relationship\nfrom typing import Optional, List\nfrom datetime import datetime\nfrom blog.db.base import Base\n\nclass Post(Base):\n    __tablename__ = "posts"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str] = mapped_column(String(200))\n    slug: Mapped[str] = mapped_column(String(200), unique=True, index=True)\n    content: Mapped[str] = mapped_column(Text)\n    excerpt: Mapped[Optional[str]] = mapped_column(String(500))\n    published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)\n    view_count: Mapped[int] = mapped_column(Integer, default=0)\n    author_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))\n    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())\n    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())\n    published_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)\n\n    author: Mapped["User"] = relationship(back_populates="posts")\n\n# Add to User model:\n# posts: Mapped[List["Post"]] = relationship(back_populates="author", cascade="all, delete-orphan")',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Create schemas and routes',
            instruction: 'Pydantic schemas and FastAPI routes',
            code: '# src/blog/schemas/post.py\nfrom pydantic import BaseModel, Field, ConfigDict\nfrom typing import Optional\nfrom datetime import datetime\n\nclass PostBase(BaseModel):\n    title: str = Field(min_length=1, max_length=200)\n    slug: str = Field(min_length=1, max_length=200, pattern=r"^[a-z0-9-]+$")\n    content: str = Field(min_length=1)\n    excerpt: Optional[str] = Field(None, max_length=500)\n    published: bool = False\n\nclass PostCreate(PostBase):\n    pass\n\nclass PostUpdate(BaseModel):\n    title: Optional[str] = Field(None, min_length=1, max_length=200)\n    content: Optional[str] = None\n    excerpt: Optional[str] = Field(None, max_length=500)\n    published: Optional[bool] = None\n\nclass PostResponse(PostBase):\n    id: int\n    author_id: int\n    view_count: int\n    created_at: datetime\n    updated_at: datetime\n    published_at: Optional[datetime]\n\n    model_config = ConfigDict(from_attributes=True)\n\n# src/blog/api/v1/posts.py — see crud_routes.py example above\n# Implement: create, get, list (with filters), update, delete, stats',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Run migrations with Alembic',
            instruction: 'Set up Alembic for database migrations',
            code: '# Install Alembic (already in deps)\n# Initialize:\nalembic init alembic\n\n# Edit alembic.ini:\n# sqlalchemy.url = postgresql+asyncpg://blog:blogpass@localhost/blog\n\n# Edit alembic/env.py to import your models:\n# from blog.db.base import Base\n# from blog.models import user, post  # noqa\n# target_metadata = Base.metadata\n\n# Create first migration:\nalembic revision --autogenerate -m "create users and posts"\n\n# Apply:\nalembic upgrade head\n\n# Verify tables:\ndocker compose exec db psql -U blog -c "\\dt"\n# Should show: users, posts, alembic_version',
            codeLanguage: 'bash',
          },
          {
            title: 'Step 5: Test the API',
            instruction: 'Full end-to-end test',
            code: '# 1. Register a user\ncurl -X POST http://localhost:8000/api/v1/auth/register \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Alice","email":"alice@x.com","username":"alice","password":"StrongP1!","confirm_password":"StrongP1!","accept_terms":true}\'\n\n# 2. Login\nTOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/login \\\n  -d "username=alice@x.com&password=StrongP1!" | jq -r .access_token)\n\n# 3. Create a post\ncurl -X POST http://localhost:8000/api/v1/posts \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title":"My First Post","slug":"my-first-post","content":"Hello world!","published":true}\'\n\n# 4. List posts\ncurl http://localhost:8000/api/v1/posts\n\n# 5. Get specific post\ncurl http://localhost:8000/api/v1/posts/1\n\n# 6. Update post\ncurl -X PUT http://localhost:8000/api/v1/posts/1 \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title":"Updated Title"}\'\n\n# 7. Get stats\ncurl http://localhost:8000/api/v1/posts/stats/summary\n\n# 8. Delete post\ncurl -X DELETE http://localhost:8000/api/v1/posts/1 \\\n  -H "Authorization: Bearer $TOKEN"',
            codeLanguage: 'bash',
          },
        ],
        verification: 'All CRUD operations work. Stats endpoint returns aggregates. Auth protects write operations. Swagger UI shows all endpoints.',
      },
      exercises: [
        {
          prompt: 'Write a query to find the top 5 most-viewed published posts, including author name.',
          starterCode: 'from sqlalchemy import select, func\nfrom blog.models.post import Post\nfrom blog.models.user import User\n\n# your query\n',
          hint: 'Use select(Post, User.name).join().order_by(Post.view_count.desc()).limit(5)',
          solution: 'from sqlalchemy import select, func\nfrom blog.models.post import Post\nfrom blog.models.user import User\n\nstmt = (\n    select(Post, User.name)\n    .join(User, Post.author_id == User.id)\n    .where(Post.published == True)\n    .order_by(Post.view_count.desc())\n    .limit(5)\n)\nresult = await db.execute(stmt)\ntop_posts = [\n    {"post": post, "author_name": name}\n    for post, name in result\n]\nreturn top_posts',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why is expire_on_commit=False critical for async SQLAlchemy?',
          options: [
            'Faster',
            'Objects stay usable after commit (no lazy reload, which async cannot do)',
            'Required by asyncpg',
            'No reason',
          ],
          correctIndex: 1,
          explanation: 'By default, SQLAlchemy expires objects after commit and lazily reloads on access. Async cannot do lazy reload (would block). Set expire_on_commit=False so objects stay usable.'
        },
        {
          question: 'How to query a single user by ID?',
          options: [
            'db.get(User, id) — simplest for primary key',
            'select(User).where(User.id == id)',
            'Both A and B work',
            'db.query(User).filter_by(id=id)',
          ],
          correctIndex: 2,
          explanation: 'Both work. db.get(User, id) is simpler for primary key lookups. select(User).where() is more flexible (can add more filters). Avoid the legacy Query API (option D).'
        },
        {
          question: 'What does .scalar_one_or_none() return if no rows match?',
          options: [
            'Raises exception',
            'Returns None',
            'Returns empty list',
            'Returns 0',
          ],
          correctIndex: 1,
          explanation: 'scalar_one_or_none() returns None if no rows, raises if multiple rows. one() raises in both cases. first() returns None if no rows.'
        },
        {
          question: 'How to avoid N+1 queries?',
          options: [
            'Use lazy="selectin" or eager loading with selectinload()/joinedload()',
            'Use raw SQL',
            'Cannot be avoided',
            'Add more indexes',
          ],
          correctIndex: 0,
          explanation: 'N+1: 1 query loads N items, then 1 query per item for relations. Fix: lazy="selectin" (separate IN query) or selectinload()/joinedload() per query.'
        },
      ],
      keyTakeaways: [
        'Use create_async_engine with asyncpg for PostgreSQL',
        'CRITICAL: expire_on_commit=False for async sessions',
        'SQLAlchemy 2.0 uses Mapped[] for typed columns',
        'relationship() + ForeignKey for connections, back_populates for bidirectional',
        'Use select() with .where() for queries (NOT legacy Query API)',
        '.scalar_one_or_none() for single optional, .scalars().all() for lists',
        'lazy="selectin" or selectinload() to avoid N+1 queries',
        'Use Alembic for migrations (never create_all in production)',
        'pool_pre_ping=True checks connection health',
        'func.count/sum/avg + group_by for aggregates',
      ],
      resources: [
        { title: 'SQLAlchemy 2.0 Async', url: 'https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html', type: 'docs' },
        { title: 'FastAPI — SQL Databases', url: 'https://fastapi.tiangolo.com/tutorial/sql-databases/', type: 'docs' },
        { title: 'Alembic Documentation', url: 'https://alembic.sqlalchemy.org/', type: 'docs' },
      ]
    },

    {
      id: 'fa-06',
      title: 'Middleware, CORS, Error Handling & Lifespan Events',
      subtitle: 'Production middleware, custom exception handlers, startup/shutdown',
      duration: 65,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Middleware runs before and after every request. Use it for: logging, CORS, rate limiting, request IDs, GZip compression, timing, security headers. FastAPI middleware are ASGI middleware — they can be async. Add with @app.middleware("http") or app.add_middleware().',
        'CORS (Cross-Origin Resource Sharing) is essential when your API and frontend are on different domains. Use CORSMiddleware with allow_origins, allow_methods, allow_headers, allow_credentials. NEVER use allow_origins=["*"] with allow_credentials=True — browsers reject it.',
        'Exception handlers convert exceptions into HTTP responses. Use @app.exception_handler(SomeException) to register a handler. FastAPI has built-in handlers for HTTPException and RequestValidationError. Override these to customize error formats.',
        'Lifespan events (replacing on_event) run on startup and shutdown. Use them to: connect to DB, initialize ML models, start background workers, warm caches. Define a lifespan context manager and pass it to FastAPI(lifespan=...).',
      ],
      codeExamples: [
        {
          filename: 'middleware.py',
          language: 'python',
          code: '"""Middleware — runs before and after every request."""\nimport time\nimport uuid\nimport logging\nfrom fastapi import FastAPI, Request, Response\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom fastapi.middleware.gzip import GZipMiddleware\nfrom fastapi.middleware.trustedhost import TrustedHostMiddleware\nfrom fastapi.responses import JSONResponse\n\napp = FastAPI()\nlogger = logging.getLogger(__name__)\n\n# === BUILT-IN MIDDLEWARE ===\n\n# CORS — allow frontend to call API (different origin)\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\n        "http://localhost:3000",     # Next.js dev\n        "https://myapp.com",         # production frontend\n        "https://*.myapp.com",       # subdomains\n    ],\n    allow_credentials=True,  # cookies, authorization headers\n    allow_methods=["*"],      # all HTTP methods\n    allow_headers=["*"],      # all headers\n    max_age=600,              # cache preflight for 10 min\n)\n\n# GZip compression for large responses\napp.add_middleware(GZipMiddleware, minimum_size=1000)\n\n# TrustedHost — prevent HTTP host header attacks\napp.add_middleware(\n    TrustedHostMiddleware,\n    allowed_hosts=["myapp.com", "*.myapp.com", "localhost"],\n)\n\n# === CUSTOM MIDDLEWARE ===\n\n# Request ID + Timing middleware\n@app.middleware("http")\nasync def add_request_id_and_timing(request: Request, call_next):\n    """Add request ID header and log timing."""\n    # BEFORE request\n    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))\n    start_time = time.perf_counter()\n\n    # Store request_id in request state (accessible in routes)\n    request.state.request_id = request_id\n\n    # Call the route handler\n    try:\n        response: Response = await call_next(request)\n    except Exception as e:\n        # Log unhandled exceptions\n        duration = time.perf_counter() - start_time\n        logger.exception(\n            "Request failed",\n            extra={\n                "request_id": request_id,\n                "method": request.method,\n                "path": request.url.path,\n                "duration_ms": duration * 1000,\n            },\n        )\n        raise\n\n    # AFTER request\n    duration = time.perf_counter() - start_time\n\n    # Add response headers\n    response.headers["X-Request-ID"] = request_id\n    response.headers["X-Response-Time"] = f"{duration:.3f}s"\n\n    # Log request\n    logger.info(\n        f"{request.method} {request.url.path} -> {response.status_code} "\n        f"({duration:.3f}s)",\n        extra={"request_id": request_id},\n    )\n\n    return response\n\n# === RATE LIMITING MIDDLEWARE ===\nfrom collections import defaultdict\nfrom time import time as now\n\n_rate_store: dict[str, list[float]] = defaultdict(list)\nRATE_LIMIT = 100  # per minute\n\n@app.middleware("http")\nasync def rate_limiter(request: Request, call_next):\n    """Simple rate limiting (100 req/min per IP)."""\n    # Skip health checks\n    if request.url.path == "/health":\n        return await call_next(request)\n\n    client_ip = request.client.host if request.client else "unknown"\n    current = now()\n\n    # Remove old entries (older than 60s)\n    _rate_store[client_ip] = [\n        t for t in _rate_store[client_ip] if current - t < 60\n    ]\n\n    if len(_rate_store[client_ip]) >= RATE_LIMIT:\n        return JSONResponse(\n            status_code=429,\n            content={\n                "error": "Too many requests",\n                "retry_after": 60,\n            },\n            headers={"Retry-After": "60"},\n        )\n\n    _rate_store[client_ip].append(current)\n    return await call_next(request)\n\n# === SECURITY HEADERS MIDDLEWARE ===\n@app.middleware("http")\nasync def add_security_headers(request: Request, call_next):\n    """Add security headers to all responses."""\n    response = await call_next(request)\n    response.headers["X-Content-Type-Options"] = "nosniff"\n    response.headers["X-Frame-Options"] = "DENY"\n    response.headers["X-XSS-Protection"] = "1; mode=block"\n    response.headers["Strict-Transport-Security"] = (\n        "max-age=31536000; includeSubDomains"\n    )\n    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"\n    return response\n\n# === ACCESS LOG MIDDLEWARE (structured JSON) ===\nimport json\nfrom datetime import datetime, timezone\n\n@app.middleware("http")\nasync def access_log(request: Request, call_next):\n    """Structured access logging."""\n    start = time.perf_counter()\n    response = await call_next(request)\n    duration = time.perf_counter() - start\n\n    log_entry = {\n        "timestamp": datetime.now(timezone.utc).isoformat(),\n        "method": request.method,\n        "path": str(request.url.path),\n        "status": response.status_code,\n        "duration_ms": round(duration * 1000, 2),\n        "ip": request.client.host if request.client else None,\n        "user_agent": request.headers.get("user-agent"),\n        "request_id": getattr(request.state, "request_id", None),\n    }\n    print(json.dumps(log_entry))  # in production, use logger\n    return response\n\n# === MIDDLEWARE ORDER (important!) ===\n# Middleware are executed in REVERSE order of addition (LIFO)\n# Last added runs FIRST on request, LAST on response\n#\n# Add in this order (conceptually outermost to innermost):\n# 1. CORS (outermost — needs to handle preflight)\n# 2. GZip\n# 3. TrustedHost\n# 4. Rate limiting\n# 5. Request ID / timing\n# 6. Security headers\n# 7. (route handler)\n#\n# But with add_middleware(), the LAST added is OUTERMOST\n# So add in reverse order if order matters',
          explanation: 'Middleware wraps every request. Built-in: CORS (web frontends), GZip (compression), TrustedHost (host header attacks). Custom: request ID, timing, rate limiting, security headers, access logging. Order matters (LIFO).'
        },
        {
          filename: 'error_handling.py',
          language: 'python',
          code: '"""Error handling — custom exceptions and handlers."""\nfrom fastapi import FastAPI, Request, HTTPException, status\nfrom fastapi.responses import JSONResponse\nfrom fastapi.exceptions import RequestValidationError\nfrom typing import Any\nimport logging\n\napp = FastAPI()\nlogger = logging.getLogger(__name__)\n\n# === CUSTOM EXCEPTIONS ===\n\nclass AppError(Exception):\n    """Base application error."""\n    def __init__(self, message: str, code: str = "INTERNAL_ERROR"):\n        self.message = message\n        self.code = code\n        super().__init__(message)\n\nclass NotFoundError(AppError):\n    def __init__(self, resource: str, id: Any):\n        super().__init__(f"{resource} {id} not found", "NOT_FOUND")\n\nclass ValidationError(AppError):\n    def __init__(self, message: str, field: str | None = None):\n        super().__init__(message, "VALIDATION_ERROR")\n        self.field = field\n\nclass AuthenticationError(AppError):\n    def __init__(self, message: str = "Authentication required"):\n        super().__init__(message, "AUTHENTICATION_ERROR")\n\nclass AuthorizationError(AppError):\n    def __init__(self, message: str = "Not authorized"):\n        super().__init__(message, "AUTHORIZATION_ERROR")\n\nclass ConflictError(AppError):\n    def __init__(self, message: str):\n        super().__init__(message, "CONFLICT")\n\nclass RateLimitError(AppError):\n    def __init__(self, retry_after: int = 60):\n        super().__init__("Too many requests", "RATE_LIMIT_EXCEEDED")\n        self.retry_after = retry_after\n\n# === EXCEPTION HANDLERS ===\n\n@app.exception_handler(NotFoundError)\nasync def not_found_handler(request: Request, exc: NotFoundError):\n    return JSONResponse(\n        status_code=status.HTTP_404_NOT_FOUND,\n        content={\n            "error": {\n                "code": exc.code,\n                "message": exc.message,\n            },\n            "request_id": getattr(request.state, "request_id", None),\n        },\n    )\n\n@app.exception_handler(ValidationError)\nasync def validation_error_handler(request: Request, exc: ValidationError):\n    return JSONResponse(\n        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,\n        content={\n            "error": {\n                "code": exc.code,\n                "message": exc.message,\n                "field": exc.field,\n            },\n        },\n    )\n\n@app.exception_handler(AuthenticationError)\nasync def auth_error_handler(request: Request, exc: AuthenticationError):\n    return JSONResponse(\n        status_code=status.HTTP_401_UNAUTHORIZED,\n        content={\n            "error": {\n                "code": exc.code,\n                "message": exc.message,\n            },\n        },\n        headers={"WWW-Authenticate": "Bearer"},\n    )\n\n@app.exception_handler(AuthorizationError)\nasync def authorization_error_handler(request: Request, exc: AuthorizationError):\n    return JSONResponse(\n        status_code=status.HTTP_403_FORBIDDEN,\n        content={\n            "error": {\n                "code": exc.code,\n                "message": exc.message,\n            },\n        },\n    )\n\n@app.exception_handler(ConflictError)\nasync def conflict_handler(request: Request, exc: ConflictError):\n    return JSONResponse(\n        status_code=status.HTTP_409_CONFLICT,\n        content={\n            "error": {\n                "code": exc.code,\n                "message": exc.message,\n            },\n        },\n    )\n\n# === OVERRIDE DEFAULT VALIDATION ERROR HANDLER ===\n# FastAPI returns 422 with a specific format for Pydantic validation errors\n# Override to use YOUR error format\n\n@app.exception_handler(RequestValidationError)\nasync def custom_validation_handler(\n    request: Request,\n    exc: RequestValidationError,\n):\n    """Custom format for Pydantic validation errors."""\n    errors = []\n    for error in exc.errors():\n        errors.append({\n            "field": ".".join(str(loc) for loc in error["loc"][1:]),  # skip "body"\n            "message": error["msg"],\n            "type": error["type"],\n        })\n\n    return JSONResponse(\n        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,\n        content={\n            "error": {\n                "code": "VALIDATION_ERROR",\n                "message": "Request validation failed",\n                "details": errors,\n            },\n            "request_id": getattr(request.state, "request_id", None),\n        },\n    )\n\n# === OVERRIDE HTTPException HANDLER ===\n@app.exception_handler(HTTPException)\nasync def http_exception_handler(request: Request, exc: HTTPException):\n    """Custom format for HTTPException."""\n    return JSONResponse(\n        status_code=exc.status_code,\n        content={\n            "error": {\n                "code": exc.status_code,\n                "message": exc.detail,\n            },\n            "request_id": getattr(request.state, "request_id", None),\n        },\n        headers=exc.headers,\n    )\n\n# === CATCH-ALL FOR UNHANDLED EXCEPTIONS ===\n@app.exception_handler(Exception)\nasync def unhandled_exception_handler(request: Request, exc: Exception):\n    """Log and return 500 for any unhandled exception."""\n    logger.exception(\n        "Unhandled exception",\n        extra={\n            "request_id": getattr(request.state, "request_id", None),\n            "path": request.url.path,\n        },\n    )\n    return JSONResponse(\n        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,\n        content={\n            "error": {\n                "code": "INTERNAL_ERROR",\n                "message": "An unexpected error occurred",\n            },\n            "request_id": getattr(request.state, "request_id", None),\n        },\n    )\n\n# === USAGE IN ROUTES ===\n\n@app.get("/users/{user_id}")\nasync def get_user(user_id: int, db: Session = Depends(get_db)):\n    user = await db.get(User, user_id)\n    if not user:\n        raise NotFoundError("User", user_id)  # custom exception\n    return user\n\n@app.post("/users")\nasync def create_user(user: UserCreate, db: Session = Depends(get_db)):\n    existing = await get_user_by_email(db, user.email)\n    if existing:\n        raise ConflictError(f"Email {user.email} already registered")\n    # ... create user\n\n@app.delete("/posts/{id}")\nasync def delete_post(id: int, db = Depends(get_db), user = Depends(get_current_user)):\n    post = await db.get(Post, id)\n    if not post:\n        raise NotFoundError("Post", id)\n    if post.author_id != user.id:\n        raise AuthorizationError("You can only delete your own posts")\n    await db.delete(post)\n    await db.commit()\n\n# === LIFESPAN EVENTS ===\n\nfrom contextlib import asynccontextmanager\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    """Startup and shutdown events."""\n    # === STARTUP ===\n    logger.info("Starting application...")\n\n    # Initialize database\n    from blog.db.base import engine, Base\n    # In production, use Alembic — do NOT use create_all\n    # async with engine.begin() as conn:\n    #     await conn.run_sync(Base.metadata.create_all)\n\n    # Initialize Redis\n    import redis.asyncio as aioredis\n    app.state.redis = aioredis.from_url(settings.REDIS_URL)\n    await app.state.redis.ping()\n    logger.info("Redis connected")\n\n    # Initialize ML models\n    # app.state.model = load_ml_model()\n\n    # Initialize background workers\n    # import asyncio\n    # app.state.bg_task = asyncio.create_task(background_worker())\n\n    logger.info("Application started")\n\n    yield  # App runs here\n\n    # === SHUTDOWN ===\n    logger.info("Shutting down...")\n\n    # Close Redis\n    await app.state.redis.close()\n\n    # Close database\n    await engine.dispose()\n\n    # Cancel background tasks\n    # app.state.bg_task.cancel()\n    # try:\n    #     await app.state.bg_task\n    # except asyncio.CancelledError:\n    #     pass\n\n    logger.info("Application stopped")\n\napp = FastAPI(lifespan=lifespan)',
          explanation: 'Custom exceptions with handlers give consistent error format. Override RequestValidationError and HTTPException handlers. Lifespan events for startup (DB, Redis, ML models) and shutdown (cleanup). Catch-all Exception handler for 500s.'
        },
      ],
      keyTakeaways: [
        'Middleware wraps every request — use for logging, CORS, rate limiting, security',
        'CORSMiddleware is essential for web frontends calling your API',
        'NEVER use allow_origins=["*"] with allow_credentials=True',
        'GZipMiddleware compresses large responses',
        'Custom exception handlers give consistent error format',
        'Override RequestValidationError handler to customize 422 format',
        'Lifespan events (not @app.on_event) for startup/shutdown',
        'Use lifespan to init DB, Redis, ML models, background workers',
        'Add security headers: X-Content-Type-Options, X-Frame-Options, HSTS',
        'Middleware order matters (LIFO — last added is outermost)',
      ],
      resources: [
        { title: 'FastAPI — Middleware', url: 'https://fastapi.tiangolo.com/tutorial/middleware/', type: 'docs' },
        { title: 'FastAPI — CORS', url: 'https://fastapi.tiangolo.com/tutorial/cors/', type: 'docs' },
        { title: 'FastAPI — Lifespan', url: 'https://fastapi.tiangolo.com/advanced/events/', type: 'docs' },
        { title: 'FastAPI — Error Handling', url: 'https://fastapi.tiangolo.com/handling-errors/', type: 'docs' },
      ]
    },

    {
      id: 'fa-07',
      title: 'File Uploads, Background Tasks & WebSockets',
      subtitle: 'Handle file uploads, run background tasks, build real-time WebSocket endpoints',
      duration: 70,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'File uploads use UploadFile (recommended) or File + bytes. UploadFile is async, uses spooling (small files in memory, large to disk), and exposes .file (SpooledTemporaryFile), .filename, .content_type. Always validate file type and size.',
        'BackgroundTasks run functions AFTER the response is sent. Use for: sending emails, writing logs, processing small files. For heavy work (ML training, video processing), use Celery or RQ instead — BackgroundTasks block the worker.',
        'WebSockets enable real-time bidirectional communication. Unlike HTTP (request-response), WebSockets keep a connection open. Perfect for: chat apps, live dashboards, notifications, multiplayer games. Use @app.websocket("/ws") and handle WebSocketDisconnect.',
        'For production WebSockets with multiple workers, use a pub/sub backend (Redis) so messages can broadcast across instances. Libraries like centrifugo, socket.io, or custom Redis pub/sub work well.',
      ],
      codeExamples: [
        {
          filename: 'file_uploads.py',
          language: 'python',
          code: '"""File upload handling — single, multiple, large files."""\nfrom fastapi import APIRouter, UploadFile, File, HTTPException, status\nfrom pathlib import Path\nimport shutil\nimport imghdr\n\nrouter = APIRouter()\n\n# === SINGLE FILE UPLOAD ===\n\n@router.post("/upload")\nasync def upload_file(file: UploadFile = File(...)):\n    """Upload a single file."""\n    # Validate file type\n    ALLOWED_TYPES = {"image/jpeg", "image/png", "image/gif"}\n    if file.content_type not in ALLOWED_TYPES:\n        raise HTTPException(400, f"File type {file.content_type} not allowed")\n\n    # Validate file size (10MB max)\n    MAX_SIZE = 10 * 1024 * 1024  # 10MB\n    contents = await file.read()\n    if len(contents) > MAX_SIZE:\n        raise HTTPException(413, "File too large (max 10MB)")\n\n    # Save file\n    upload_dir = Path("uploads")\n    upload_dir.mkdir(exist_ok=True)\n    file_path = upload_dir / file.filename\n\n    with file_path.open("wb") as f:\n        f.write(contents)\n\n    return {\n        "filename": file.filename,\n        "size": len(contents),\n        "type": file.content_type,\n        "path": str(file_path),\n    }\n\n# === MULTIPLE FILE UPLOAD ===\n\n@router.post("/upload-multiple")\nasync def upload_multiple(files: list[UploadFile] = File(...)):\n    """Upload multiple files."""\n    if len(files) > 10:\n        raise HTTPException(400, "Maximum 10 files allowed")\n\n    results = []\n    for file in files:\n        # Validate each file\n        if file.content_type not in {"image/jpeg", "image/png"}:\n            results.append({\n                "filename": file.filename,\n                "error": "Invalid type",\n            })\n            continue\n\n        # Save\n        file_path = Path("uploads") / file.filename\n        with file_path.open("wb") as f:\n            shutil.copyfileobj(file.file, f)\n\n        results.append({\n            "filename": file.filename,\n            "size": file_path.stat().st_size,\n            "path": str(file_path),\n        })\n\n    return {"uploaded": results}\n\n# === LARGE FILE UPLOAD (streaming) ===\n\n@router.post("/upload-large")\nasync def upload_large_file(file: UploadFile = File(...)):\n    """Upload large files by streaming (memory efficient)."""\n    CHUNK_SIZE = 1024 * 1024  # 1MB chunks\n    MAX_SIZE = 100 * 1024 * 1024  # 100MB max\n\n    upload_dir = Path("uploads")\n    upload_dir.mkdir(exist_ok=True)\n    file_path = upload_dir / file.filename\n\n    total_size = 0\n    with file_path.open("wb") as f:\n        while chunk := await file.read(CHUNK_SIZE):\n            total_size += len(chunk)\n            if total_size > MAX_SIZE:\n                file_path.unlink()  # delete partial file\n                raise HTTPException(413, "File too large")\n            f.write(chunk)\n\n    return {\n        "filename": file.filename,\n        "size": total_size,\n        "path": str(file_path),\n    }\n\n# === UPLOAD WITH FORM DATA ===\n\nfrom fastapi import Form\nfrom pydantic import BaseModel\n\nclass UploadMetadata(BaseModel):\n    title: str\n    description: str | None = None\n\n@router.post("/upload-with-metadata")\nasync def upload_with_metadata(\n    file: UploadFile = File(...),\n    title: str = Form(...),\n    description: str | None = Form(None),\n):\n    """Upload file with metadata (multipart form)."""\n    # Save file\n    file_path = Path("uploads") / file.filename\n    with file_path.open("wb") as f:\n        shutil.copyfileobj(file.file, f)\n\n    # Save metadata to DB\n    # metadata_obj = UploadMetadata(title=title, description=description)\n    # await save_to_db(file_path, metadata_obj)\n\n    return {\n        "file": file.filename,\n        "title": title,\n        "description": description,\n        "path": str(file_path),\n    }\n\n# === IMAGE VALIDATION (check actual content, not just content_type) ===\n\n@router.post("/upload-image")\nasync def upload_image(file: UploadFile = File(...)):\n    """Upload image with content validation."""\n    # Read contents\n    contents = await file.read()\n\n    # Check actual file type (not just content_type header)\n    file_type = imghdr.what(None, h=contents)\n    if file_type not in {"jpeg", "png", "gif"}:\n        raise HTTPException(400, "File is not a valid image")\n\n    # Reset file position (so it can be read again if needed)\n    await file.seek(0)\n\n    # Save\n    file_path = Path("uploads") / f"{uuid.uuid4()}.{file_type}"\n    file_path.write_bytes(contents)\n\n    return {"path": str(file_path), "type": file_type}\n\n# === DOWNLOAD FILE ===\n\nfrom fastapi.responses import FileResponse, StreamingResponse\n\n@router.get("/download/{filename}")\nasync def download_file(filename: str):\n    """Download a file."""\n    file_path = Path("uploads") / filename\n    if not file_path.exists():\n        raise HTTPException(404, "File not found")\n\n    return FileResponse(\n        path=file_path,\n        filename=filename,\n        media_type="application/octet-stream",\n    )\n\n# Stream large file download\n@router.get("/download-stream/{filename}")\nasync def download_stream(filename: str):\n    """Stream a large file download."""\n    file_path = Path("uploads") / filename\n    if not file_path.exists():\n        raise HTTPException(404, "File not found")\n\n    def iterfile():\n        with file_path.open("rb") as f:\n            while chunk := f.read(1024 * 1024):  # 1MB chunks\n                yield chunk\n\n    return StreamingResponse(\n        iterfile(),\n        media_type="application/octet-stream",\n        headers={\n            "Content-Disposition": f\'attachment; filename="{filename}"\',\n        },\n    )',
          explanation: 'UploadFile for async file uploads. Validate type AND size. For large files, stream in chunks (constant memory). Validate actual content (imghdr) not just content_type header. Use FileResponse or StreamingResponse for downloads.'
        },
        {
          filename: 'background_tasks.py',
          language: 'python',
          code: '"""Background tasks — run after response is sent."""\nfrom fastapi import APIRouter, BackgroundTasks, UploadFile\nfrom typing import Annotated\nimport time\nimport logging\n\nrouter = APIRouter()\nlogger = logging.getLogger(__name__)\n\n# === BASIC BACKGROUND TASK ===\n\ndef send_welcome_email(email: str, name: str):\n    """Simulate sending email (slow operation)."""\n    time.sleep(5)  # simulate SMTP delay\n    logger.info(f"Email sent to {name} <{email}>")\n\n@router.post("/register")\nasync def register(\n    email: str,\n    name: str,\n    background_tasks: BackgroundTasks,\n):\n    """Register user and send welcome email in background."""\n    # Save user to DB (immediate)\n    user = await create_user(email, name)\n\n    # Schedule email to send AFTER response\n    background_tasks.add_task(send_welcome_email, email, name)\n\n    # Response sent immediately — email sends in background\n    return {"id": user.id, "message": "Registered! Welcome email will arrive shortly."}\n\n# === MULTIPLE BACKGROUND TASKS ===\n\ndef send_email(to: str, subject: str, body: str):\n    time.sleep(2)\n    logger.info(f"Email sent: {to} - {subject}")\n\ndef update_analytics(user_id: int, event: str):\n    time.sleep(1)\n    logger.info(f"Analytics: user {user_id} did {event}")\n\ndef clear_cache(pattern: str):\n    time.sleep(0.5)\n    logger.info(f"Cache cleared: {pattern}")\n\n@router.post("/users/{user_id}/activity")\nasync def track_activity(\n    user_id: int,\n    event: str,\n    background_tasks: BackgroundTasks,\n):\n    """Track user activity with background tasks."""\n    # Multiple background tasks (run in order)\n    background_tasks.add_task(update_analytics, user_id, event)\n    background_tasks.add_task(send_email, "admin@x.com", f"User {user_id} active", event)\n    background_tasks.add_task(clear_cache, f"user:{user_id}:*")\n\n    return {"message": "Activity tracked"}\n\n# === BACKGROUND TASK WITH FILE PROCESSING ===\n\ndef process_image(file_path: str):\n    """Process uploaded image (resize, optimize)."""\n    time.sleep(10)  # simulate processing\n    logger.info(f"Image processed: {file_path}")\n    # Generate thumbnails, optimize, etc.\n\n@router.post("/upload-image")\nasync def upload_image(\n    file: UploadFile,\n    background_tasks: BackgroundTasks,\n):\n    """Upload image and process in background."""\n    # Save file (immediate)\n    file_path = f"uploads/{file.filename}"\n    with open(file_path, "wb") as f:\n        f.write(await file.read())\n\n    # Process in background (after response)\n    background_tasks.add_task(process_image, file_path)\n\n    return {"filename": file.filename, "message": "Upload received, processing..."}\n\n# === WHEN TO USE BACKGROUND TASKS vs CELERY ===\n# BackgroundTasks:\n#   - Simple, in-process\n#   - Good for: emails, logging, small file processing\n#   - Bad for: heavy work (blocks worker), retries, scheduling\n#\n# Celery (or RQ, Dramatiq):\n#   - Separate worker processes\n#   - Good for: ML training, video processing, scheduled tasks\n#   - Features: retries, scheduling, monitoring\n#   - Requires: Redis/RabbitMQ broker\n\n# === WEBSOCKETS ===\n\nfrom fastapi import FastAPI, WebSocket, WebSocketDisconnect\nfrom typing import list\nimport json\n\napp = FastAPI()\n\nclass ConnectionManager:\n    """Manages WebSocket connections."""\n\n    def __init__(self):\n        self.active_connections: list[WebSocket] = []\n\n    async def connect(self, websocket: WebSocket):\n        await websocket.accept()\n        self.active_connections.append(websocket)\n\n    def disconnect(self, websocket: WebSocket):\n        self.active_connections.remove(websocket)\n\n    async def send_personal_message(self, message: str, websocket: WebSocket):\n        await websocket.send_text(message)\n\n    async def broadcast(self, message: str):\n        for connection in self.active_connections:\n            await connection.send_text(message)\n\nmanager = ConnectionManager()\n\n@app.websocket("/ws/{client_id}")\nasync def websocket_endpoint(websocket: WebSocket, client_id: str):\n    """WebSocket endpoint for real-time chat."""\n    await manager.connect(websocket)\n    await manager.broadcast(f"{client_id} joined the chat")\n\n    try:\n        while True:\n            # Receive message from client\n            data = await websocket.receive_text()\n\n            # Broadcast to all clients\n            await manager.broadcast(f"{client_id}: {data}")\n    except WebSocketDisconnect:\n        manager.disconnect(websocket)\n        await manager.broadcast(f"{client_id} left the chat")\n\n# === WEBSOCKET WITH JSON MESSAGES ===\n\n@app.websocket("/ws")\nasync def websocket_json(websocket: WebSocket):\n    await websocket.accept()\n    try:\n        while True:\n            # Receive JSON message\n            data = await websocket.receive_json()\n\n            # Process based on message type\n            if data["type"] == "message":\n                await websocket.send_json({\n                    "type": "ack",\n                    "id": data.get("id"),\n                    "timestamp": time.time(),\n                })\n            elif data["type"] == "ping":\n                await websocket.send_json({"type": "pong"})\n\n    except WebSocketDisconnect:\n        logger.info("Client disconnected")\n\n# === CLIENT-SIDE JAVASCRIPT (for reference) ===\n"""\nconst ws = new WebSocket("ws://localhost:8000/ws/alice")\nws.onopen = () => console.log("Connected")\nws.onmessage = (e) => console.log("Received:", e.data)\nws.onclose = () => console.log("Disconnected")\nws.send("Hello everyone!")\n"""',
          explanation: 'BackgroundTasks run after response — good for emails, small tasks. Use Celery for heavy work. WebSockets for real-time bidirectional comms. ConnectionManager tracks active connections. Handle WebSocketDisconnect for cleanup.'
        },
      ],
      keyTakeaways: [
        'UploadFile for async file uploads (spools small files to memory)',
        'Always validate file type (content_type AND actual content) and size',
        'For large files, stream in chunks (constant memory)',
        'BackgroundTasks run AFTER response — for emails, logging, small tasks',
        'Use Celery for heavy work (ML training, video processing)',
        'WebSockets for real-time bidirectional communication',
        'Use a ConnectionManager class to track active connections',
        'Handle WebSocketDisconnect for cleanup',
        'For multi-worker WebSockets, use Redis pub/sub',
        'StreamingResponse for large file downloads',
      ],
      resources: [
        { title: 'FastAPI — File Uploads', url: 'https://fastapi.tiangolo.com/tutorial/request-files/', type: 'docs' },
        { title: 'FastAPI — Background Tasks', url: 'https://fastapi.tiangolo.com/tutorial/background-tasks/', type: 'docs' },
        { title: 'FastAPI — WebSockets', url: 'https://fastapi.tiangolo.com/advanced/websockets/', type: 'docs' },
      ]
    },

    {
      id: 'fa-08',
      title: 'Testing FastAPI — TestClient, Fixtures, Mocking, Coverage',
      subtitle: 'Write production-grade tests with pytest, TestClient, async testing',
      duration: 75,
     difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'FastAPI testing is easy with TestClient (uses httpx under the hood). For async code (DB, external APIs), use httpx.AsyncClient with pytest-asyncio. Tests run in milliseconds — no need to spin up a real server.',
        'Use fixtures for setup/teardown. Database fixtures should use a separate test database, rollback after each test for isolation. Override the get_db dependency to use the test DB. Fixtures can be scoped: function (default), class, module, session.',
        'Test the API as a black box: send HTTP requests, check responses. Test status codes, response body, headers. Test edge cases: missing fields, invalid types, unauthorized, not found. Use parametrize for the same test with different inputs.',
        'For end-to-end tests with real DB, use testcontainers-postgres to spin up a real Postgres in Docker. For unit tests, mock external services (use respx for HTTP mocking).',
      ],
      codeExamples: [
        {
          filename: 'test_setup.py',
          language: 'python',
          code: '"""Test configuration and fixtures."""\nimport pytest\nimport pytest_asyncio\nfrom httpx import AsyncClient, ASGITransport\nfrom sqlalchemy.ext.asyncio import (\n    create_async_engine,\n    async_sessionmaker,\n    AsyncSession,\n)\nfrom blog.main import app\nfrom blog.db.base import Base\nfrom blog.api.deps import get_db\n\n# Test database (in-memory SQLite — instant!)\nTEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"\n\n# Create test engine\ntest_engine = create_async_engine(\n    TEST_DATABASE_URL,\n    connect_args={"check_same_thread": False},\n)\nTestingSessionLocal = async_sessionmaker(\n    test_engine,\n    class_=AsyncSession,\n    expire_on_commit=False,\n)\n\n# === FIXTURES ===\n\n@pytest.fixture(scope="session")\ndef event_loop():\n    """Single event loop for all tests."""\n    import asyncio\n    loop = asyncio.new_event_loop()\n    yield loop\n    loop.close()\n\n@pytest_asyncio.fixture(scope="session", autouse=True)\nasync def setup_db():\n    """Create tables once for the test session."""\n    async with test_engine.begin() as conn:\n        await conn.run_sync(Base.metadata.create_all)\n    yield\n    async with test_engine.begin() as conn:\n        await conn.run_sync(Base.metadata.drop_all)\n    await test_engine.dispose()\n\n@pytest_asyncio.fixture(autouse=True)\nasync def clean_db():\n    """Clean all tables before each test (isolation)."""\n    async with test_engine.begin() as conn:\n        for table in reversed(Base.metadata.sorted_tables):\n            await conn.execute(table.delete())\n    yield\n\n@pytest_asyncio.fixture\nasync def db_session() -> AsyncSession:\n    """Get a test database session."""\n    async with TestingSessionLocal() as session:\n        yield session\n\n@pytest_asyncio.fixture\nasync def client(db_session: AsyncSession):\n    """Get an async test client with DB dependency overridden."""\n    async def override_get_db():\n        yield db_session\n\n    app.dependency_overrides[get_db] = override_get_db\n\n    async with AsyncClient(\n        transport=ASGITransport(app=app),\n        base_url="http://test",\n    ) as client:\n        yield client\n\n    app.dependency_overrides.clear()\n\n@pytest_asyncio.fixture\nasync def auth_token(client: AsyncClient) -> str:\n    """Get an auth token for testing."""\n    # Register a user\n    await client.post("/api/v1/auth/register", json={\n        "name": "Test User",\n        "email": "test@test.com",\n        "username": "testuser",\n        "password": "TestPass1!",\n        "confirm_password": "TestPass1!",\n        "accept_terms": True,\n    })\n\n    # Login\n    response = await client.post(\n        "/api/v1/auth/login",\n        data={"username": "test@test.com", "password": "TestPass1!"},\n    )\n    return response.json()["access_token"]\n\n@pytest_asyncio.fixture\nasync def auth_headers(auth_token: str) -> dict:\n    """Get auth headers for authenticated requests."""\n    return {"Authorization": f"Bearer {auth_token}"}',
          explanation: 'Use in-memory SQLite for fast tests. Override get_db dependency to use test session. Fixtures provide isolated DB per test (autouse clean_db). Auth fixtures for easy authenticated testing.'
        },
        {
          filename: 'tests.py',
          language: 'python',
          code: '"""API tests — test endpoints as black box."""\nimport pytest\nfrom httpx import AsyncClient\n\n# === AUTH TESTS ===\n\nclass TestAuth:\n    async def test_register_success(self, client: AsyncClient):\n        response = await client.post("/api/v1/auth/register", json={\n            "name": "Alice",\n            "email": "alice@test.com",\n            "username": "alice",\n            "password": "StrongP1!",\n            "confirm_password": "StrongP1!",\n            "accept_terms": True,\n        })\n        assert response.status_code == 201\n        data = response.json()\n        assert data["email"] == "alice@test.com"\n        assert data["username"] == "alice"\n        assert "password" not in data  # password not returned!\n        assert "hashed_password" not in data\n\n    async def test_register_duplicate_email(self, client: AsyncClient):\n        user_data = {\n            "name": "Alice",\n            "email": "alice@test.com",\n            "username": "alice",\n            "password": "StrongP1!",\n            "confirm_password": "StrongP1!",\n            "accept_terms": True,\n        }\n        # First registration succeeds\n        await client.post("/api/v1/auth/register", json=user_data)\n        # Second with same email fails\n        response = await client.post("/api/v1/auth/register", json=user_data)\n        assert response.status_code == 400\n\n    async def test_register_password_mismatch(self, client: AsyncClient):\n        response = await client.post("/api/v1/auth/register", json={\n            "name": "Bob",\n            "email": "bob@test.com",\n            "username": "bob",\n            "password": "StrongP1!",\n            "confirm_password": "DifferentP1!",\n            "accept_terms": True,\n        })\n        assert response.status_code == 422\n\n    async def test_login_success(self, client: AsyncClient, auth_token: str):\n        # auth_token fixture registers + logs in\n        assert auth_token is not None\n        assert len(auth_token) > 50  # JWT tokens are long\n\n    async def test_login_wrong_password(self, client: AsyncClient):\n        # Register first\n        await client.post("/api/v1/auth/register", json={\n            "name": "Alice",\n            "email": "alice@test.com",\n            "username": "alice",\n            "password": "StrongP1!",\n            "confirm_password": "StrongP1!",\n            "accept_terms": True,\n        })\n        # Try login with wrong password\n        response = await client.post(\n            "/api/v1/auth/login",\n            data={\n                "username": "alice@test.com",\n                "password": "WrongPass1!",\n            },\n        )\n        assert response.status_code == 401\n\n    async def test_me_without_token(self, client: AsyncClient):\n        response = await client.get("/api/v1/auth/me")\n        assert response.status_code == 401\n\n    async def test_me_with_token(self, client: AsyncClient, auth_headers: dict):\n        response = await client.get(\n            "/api/v1/auth/me",\n            headers=auth_headers,\n        )\n        assert response.status_code == 200\n        assert response.json()["email"] == "test@test.com"\n\n# === POST TESTS ===\n\nclass TestPosts:\n    async def test_create_post(self, client: AsyncClient, auth_headers: dict):\n        response = await client.post(\n            "/api/v1/posts",\n            headers=auth_headers,\n            json={\n                "title": "My Post",\n                "slug": "my-post",\n                "content": "Hello world!",\n                "published": True,\n            },\n        )\n        assert response.status_code == 201\n        data = response.json()\n        assert data["title"] == "My Post"\n        assert data["slug"] == "my-post"\n        assert data["published"] is True\n\n    async def test_create_post_no_auth(self, client: AsyncClient):\n        response = await client.post("/api/v1/posts", json={\n            "title": "My Post",\n            "slug": "my-post",\n            "content": "Hello world!",\n        })\n        assert response.status_code == 401\n\n    async def test_list_posts(self, client: AsyncClient, auth_headers: dict):\n        # Create some posts\n        for i in range(3):\n            await client.post(\n                "/api/v1/posts",\n                headers=auth_headers,\n                json={\n                    "title": f"Post {i}",\n                    "slug": f"post-{i}",\n                    "content": f"Content {i}",\n                    "published": True,\n                },\n            )\n\n        response = await client.get("/api/v1/posts")\n        assert response.status_code == 200\n        posts = response.json()\n        assert len(posts) == 3\n\n    async def test_get_post_not_found(self, client: AsyncClient):\n        response = await client.get("/api/v1/posts/99999")\n        assert response.status_code == 404\n\n    async def test_update_post(self, client: AsyncClient, auth_headers: dict):\n        # Create post\n        create_response = await client.post(\n            "/api/v1/posts",\n            headers=auth_headers,\n            json={\n                "title": "Original",\n                "slug": "original",\n                "content": "Original content",\n            },\n        )\n        post_id = create_response.json()["id"]\n\n        # Update it\n        response = await client.put(\n            f"/api/v1/posts/{post_id}",\n            headers=auth_headers,\n            json={"title": "Updated Title"},\n        )\n        assert response.status_code == 200\n        assert response.json()["title"] == "Updated Title"\n\n    async def test_delete_post(self, client: AsyncClient, auth_headers: dict):\n        create_response = await client.post(\n            "/api/v1/posts",\n            headers=auth_headers,\n            json={\n                "title": "To Delete",\n                "slug": "to-delete",\n                "content": "Goodbye",\n            },\n        )\n        post_id = create_response.json()["id"]\n\n        # Delete\n        response = await client.delete(\n            f"/api/v1/posts/{post_id}",\n            headers=auth_headers,\n        )\n        assert response.status_code == 204\n\n        # Verify gone\n        response = await client.get(f"/api/v1/posts/{post_id}")\n        assert response.status_code == 404\n\n# === PARAMETRIZED TESTS ===\n\n@pytest.mark.parametrize("email,valid", [\n    ("valid@test.com", True),\n    ("invalid", False),\n    ("", False),\n    ("@test.com", False),\n    ("a@b.c", True),\n])\nasync def test_email_validation(client: AsyncClient, email: str, valid: bool):\n    response = await client.post("/api/v1/auth/register", json={\n        "name": "Test",\n        "email": email,\n        "username": "testuser",\n        "password": "StrongP1!",\n        "confirm_password": "StrongP1!",\n        "accept_terms": True,\n    })\n    if valid:\n        assert response.status_code in (201, 400)  # 400 if duplicate\n    else:\n        assert response.status_code == 422\n\n# === MOCKING EXTERNAL SERVICES ===\n\nasync def test_send_email_called_on_register(\n    client: AsyncClient,\n    mocker,\n):\n    """Test that welcome email is sent on registration."""\n    mock_send = mocker.patch("blog.services.email.send_email")\n\n    response = await client.post("/api/v1/auth/register", json={\n        "name": "Alice",\n        "email": "alice@test.com",\n        "username": "alice",\n        "password": "StrongP1!",\n        "confirm_password": "StrongP1!",\n        "accept_terms": True,\n    })\n\n    assert response.status_code == 201\n    mock_send.assert_called_once()\n\n# === RUN TESTS ===\n# pytest -v --cov=src --cov-report=term-missing --cov-report=html',
          explanation: 'TestClient (sync) or AsyncClient (async) for HTTP requests. Fixtures provide clean DB and auth tokens per test. Test success, error cases, auth, permissions. Use parametrize for data-driven tests. Mock external services.'
        },
      ],
      lab: {
        title: 'Write Comprehensive Tests for Your API',
        objective: 'Achieve 90%+ test coverage with unit and integration tests',
        estTime: '90-120 minutes',
        difficulty: 'Advanced',
        setup: [
          'FastAPI project from previous lessons',
          'pip install pytest pytest-asyncio pytest-cov httpx pytest-mock',
        ],
        steps: [
          {
            title: 'Step 1: Create test configuration',
            instruction: 'Set up conftest.py with fixtures',
            code: '# src/blog/tests/conftest.py\nimport pytest\nimport pytest_asyncio\nfrom httpx import AsyncClient, ASGITransport\nfrom sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession\nfrom blog.main import app\nfrom blog.db.base import Base\nfrom blog.api.deps import get_db\n\ntest_engine = create_async_engine("sqlite+aiosqlite:///:memory:")\nTestingSession = async_sessionmaker(test_engine, expire_on_commit=False)\n\n@pytest_asyncio.fixture(scope="session", autouse=True)\nasync def setup_db():\n    async with test_engine.begin() as conn:\n        await conn.run_sync(Base.metadata.create_all)\n    yield\n    await test_engine.dispose()\n\n@pytest_asyncio.fixture(autouse=True)\nasync def clean_db():\n    async with test_engine.begin() as conn:\n        for table in reversed(Base.metadata.sorted_tables):\n            await conn.execute(table.delete())\n    yield\n\n@pytest_asyncio.fixture\nasync def db():\n    async with TestingSession() as session:\n        yield session\n\n@pytest_asyncio.fixture\nasync def client(db):\n    async def override():\n        yield db\n    app.dependency_overrides[get_db] = override\n    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:\n        yield c\n    app.dependency_overrides.clear()\n\n@pytest_asyncio.fixture\nasync def auth_token(client):\n    await client.post("/api/v1/auth/register", json={\n        "name": "Test", "email": "t@t.com", "username": "test",\n        "password": "Test1!aaaa", "confirm_password": "Test1!aaaa", "accept_terms": True\n    })\n    r = await client.post("/api/v1/auth/login", data={"username": "t@t.com", "password": "Test1!aaaa"})\n    return r.json()["access_token"]\n\n@pytest_asyncio.fixture\nasync def auth_client(client, auth_token):\n    client.headers.update({"Authorization": f"Bearer {auth_token}"})\n    return client',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Write auth tests',
            instruction: 'Test registration, login, protected endpoints',
            code: '# src/blog/tests/test_auth.py\nimport pytest\n\nclass TestRegister:\n    async def test_success(self, client):\n        r = await client.post("/api/v1/auth/register", json={\n            "name": "Alice", "email": "a@t.com", "username": "alice",\n            "password": "Strong1!", "confirm_password": "Strong1!", "accept_terms": True\n        })\n        assert r.status_code == 201\n        assert "password" not in r.json()\n\n    async def test_duplicate_email(self, client):\n        data = {"name":"A","email":"a@t.com","username":"a","password":"Strong1!","confirm_password":"Strong1!","accept_terms":True}\n        await client.post("/api/v1/auth/register", json=data)\n        r = await client.post("/api/v1/auth/register", json=data)\n        assert r.status_code == 400\n\n    async def test_password_mismatch(self, client):\n        r = await client.post("/api/v1/auth/register", json={\n            "name":"A","email":"a@t.com","username":"a","password":"Strong1!","confirm_password":"Different!","accept_terms":True\n        })\n        assert r.status_code == 422\n\nclass TestLogin:\n    async def test_success(self, client, auth_token):\n        assert auth_token\n\n    async def test_wrong_password(self, client):\n        await client.post("/api/v1/auth/register", json={\n            "name":"A","email":"a@t.com","username":"a","password":"Strong1!","confirm_password":"Strong1!","accept_terms":True\n        })\n        r = await client.post("/api/v1/auth/login", data={"username":"a@t.com","password":"Wrong!"})\n        assert r.status_code == 401\n\nclass TestMe:\n    async def test_without_token(self, client):\n        r = await client.get("/api/v1/auth/me")\n        assert r.status_code == 401\n\n    async def test_with_token(self, auth_client):\n        r = await auth_client.get("/api/v1/auth/me")\n        assert r.status_code == 200\n        assert r.json()["email"] == "t@t.com"',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Write post tests',
            instruction: 'Test CRUD operations',
            code: '# src/blog/tests/test_posts.py\nclass TestCreatePost:\n    async def test_success(self, auth_client):\n        r = await auth_client.post("/api/v1/posts", json={\n            "title": "Test", "slug": "test", "content": "Content", "published": True\n        })\n        assert r.status_code == 201\n\n    async def test_no_auth(self, client):\n        r = await client.post("/api/v1/posts", json={"title":"T","slug":"t","content":"c"})\n        assert r.status_code == 401\n\nclass TestListPosts:\n    async def test_empty(self, client):\n        r = await client.get("/api/v1/posts")\n        assert r.status_code == 200\n        assert r.json() == []\n\n    async def test_with_posts(self, auth_client, client):\n        for i in range(3):\n            await auth_client.post("/api/v1/posts", json={\n                "title": f"Post {i}", "slug": f"post-{i}", "content": "c", "published": True\n            })\n        r = await client.get("/api/v1/posts")\n        assert len(r.json()) == 3\n\nclass TestUpdatePost:\n    async def test_update_own(self, auth_client):\n        create = await auth_client.post("/api/v1/posts", json={\n            "title": "Original", "slug": "original", "content": "c"\n        })\n        post_id = create.json()["id"]\n        r = await auth_client.put(f"/api/v1/posts/{post_id}", json={"title": "Updated"})\n        assert r.status_code == 200\n        assert r.json()["title"] == "Updated"\n\nclass TestDeletePost:\n    async def test_delete_own(self, auth_client, client):\n        create = await auth_client.post("/api/v1/posts", json={\n            "title": "T", "slug": "t", "content": "c"\n        })\n        post_id = create.json()["id"]\n        r = await auth_client.delete(f"/api/v1/posts/{post_id}")\n        assert r.status_code == 204\n        assert (await client.get(f"/api/v1/posts/{post_id}")).status_code == 404',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Run with coverage',
            instruction: 'Check test coverage',
            code: '# Run tests\npytest -v\n\n# With coverage\npytest --cov=src/blog --cov-report=term-missing --cov-report=html\n\n# View HTML report\nopen htmlcov/index.html\n\n# In pyproject.toml:\n# [tool.pytest.ini_options]\n# asyncio_mode = "auto"\n# addopts = "--cov=src/blog --cov-report=term-missing"\n#\n# [tool.coverage.run]\n# source = ["src/blog"]\n# omit = ["*/tests/*"]\n#\n# [tool.coverage.report]\n# fail_under = 80  # fail CI if < 80%',
            codeLanguage: 'bash',
          },
        ],
        verification: 'All tests pass. Coverage > 80%. HTML report shows which lines are covered.',
      },
      keyTakeaways: [
        'Use TestClient (sync) or AsyncClient (async) for HTTP testing',
        'Override get_db dependency to use in-memory SQLite test DB',
        'Fixtures provide isolated DB per test (autouse clean_db)',
        'Auth fixtures make testing protected endpoints easy',
        'Test as black box: HTTP in, response out',
        'Test success, error, auth, permission, edge cases',
        'Use @pytest.mark.parametrize for data-driven tests',
        'Mock external services with pytest-mock (mocker fixture)',
        'Run coverage: pytest --cov=src --cov-report=html',
        'Aim for 80%+ coverage, focus on critical paths',
      ],
      resources: [
        { title: 'FastAPI — Testing', url: 'https://fastapi.tiangolo.com/tutorial/testing/', type: 'docs' },
        { title: 'pytest Documentation', url: 'https://docs.pytest.org/', type: 'docs' },
        { title: 'pytest-asyncio', url: 'https://pytest-asyncio.readthedocs.io/', type: 'docs' },
      ]
    },

    {
      id: 'fa-09',
      title: 'Production Deployment — Docker, Nginx, Gunicorn, CI/CD',
      subtitle: 'Deploy FastAPI to production with Docker, Nginx, TLS, GitHub Actions',
      duration: 80,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'Production deployment stack: Docker (containerization), Gunicorn (process manager, multiple workers), Uvicorn (ASGI server inside each worker), Nginx (reverse proxy, TLS, static files), Let\'s Encrypt (free TLS certificates), GitHub Actions (CI/CD).',
        'Multi-stage Docker builds create smaller images: builder stage has compilers, runtime stage only has what is needed to run. Run as non-root user for security. Health checks for orchestrators. .dockerignore excludes unnecessary files.',
        'Nginx reverse proxy: terminates TLS (HTTPS), serves static files, load balances, rate limits, adds security headers. Forwards /api/ to FastAPI. Special config for WebSockets (Upgrade headers).',
        'CI/CD with GitHub Actions: lint → test → build image → push to registry → deploy. Use secrets for credentials. Matrix builds test on multiple Python versions. Auto-deploy on push to main.',
      ],
      codeExamples: [
        {
          filename: 'Dockerfile',
          language: 'dockerfile',
          code: '# === MULTI-STAGE DOCKERFILE ===\n\n# Stage 1: Builder (has compilers, builds wheels)\nFROM python:3.12-slim AS builder\n\nWORKDIR /app\n\n# Install build dependencies\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    build-essential \\\n    libpq-dev \\\n    curl \\\n    && rm -rf /var/lib/apt/lists/*\n\n# Create venv and install deps\nRUN python -m venv /opt/venv\nENV PATH="/opt/venv/bin:$PATH"\n\nCOPY pyproject.toml ./\nRUN pip install --no-cache-dir --upgrade pip && \\\n    pip install --no-cache-dir -e ".[prod]"\n\n# Stage 2: Runtime (minimal — no compilers)\nFROM python:3.12-slim AS runtime\n\n# Install only runtime deps\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    libpq5 \\\n    curl \\\n    && rm -rf /var/lib/apt/lists/*\n\n# Copy venv from builder\nCOPY --from=builder /opt/venv /opt/venv\nENV PATH="/opt/venv/bin:$PATH"\n\n# Create non-root user\nRUN useradd -m -u 1000 appuser\nWORKDIR /app\nUSER appuser\n\n# Copy app code\nCOPY --chown=appuser:appuser . .\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \\\n    CMD curl -f http://localhost:8000/health || exit 1\n\nEXPOSE 8000\n\n# Production: gunicorn with uvicorn workers\nCMD ["gunicorn", \\\n    "blog.main:app", \\\n    "-w", "4", \\\n    "-k", "uvicorn.workers.UvicornWorker", \\\n    "-b", "0.0.0.0:8000", \\\n    "--access-logfile", "-", \\\n    "--error-logfile", "-", \\\n    "--timeout", "120", \\\n    "--keep-alive", "5"]\n\n# Development override (in docker-compose.override.yml):\n# command: uvicorn blog.main:app --host 0.0.0.0 --reload',
          explanation: 'Multi-stage: builder has compilers, runtime only has what is needed. Run as non-root user. Health check for orchestrators. Production: gunicorn -w 4 (4 workers) -k uvicorn.workers.UvicornWorker.'
        },
        {
          filename: 'docker-compose.yml',
          language: 'yaml',
          code: '# docker-compose.yml — full production stack\nservices:\n  api:\n    build: .\n    ports:\n      - "8000:8000"\n    environment:\n      - DATABASE_URL=postgresql+asyncpg://blog:blogpass@db:5432/blog\n      - REDIS_URL=redis://redis:6379/0\n      - SECRET_KEY=${SECRET_KEY}\n      - ENVIRONMENT=production\n    depends_on:\n      db:\n        condition: service_healthy\n      redis:\n        condition: service_started\n    restart: unless-stopped\n    volumes:\n      - ./uploads:/app/uploads\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: blog\n      POSTGRES_PASSWORD: blogpass\n      POSTGRES_DB: blog\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U blog"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n    restart: unless-stopped\n\n  redis:\n    image: redis:7-alpine\n    restart: unless-stopped\n    volumes:\n      - redisdata:/data\n\n  nginx:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n      - "443:443"\n    volumes:\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\n      - ./ssl:/etc/nginx/ssl:ro\n      - ./static:/var/www/static:ro\n    depends_on:\n      - api\n    restart: unless-stopped\n\nvolumes:\n  pgdata:\n  redisdata:\n\n# .env file:\n# SECRET_KEY=your-super-secret-key\n# POSTGRES_PASSWORD=blogpass',
          explanation: 'Full stack: api (FastAPI), db (PostgreSQL), redis (cache), nginx (reverse proxy). Health checks ensure startup order. Volumes persist data. restart: unless-stopped for auto-recovery.'
        },
        {
          filename: 'nginx.conf',
          language: 'nginx',
          code: '# nginx.conf — reverse proxy for FastAPI\n\nworker_processes auto;\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    include /etc/nginx/mime.types;\n    default_type application/octet-stream;\n\n    # Logging\n    access_log /var/log/nginx/access.log;\n    error_log /var/log/nginx/error.log;\n\n    # Gzip\n    gzip on;\n    gzip_types text/plain application/json application/javascript text/css;\n    gzip_min_length 1024;\n\n    # Rate limiting\n    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;\n    limit_req_zone $binary_remote_addr zone=auth:10m rate=1r/s;\n\n    # Upstream (FastAPI)\n    upstream api_backend {\n        server api:8000;\n        # For multiple instances:\n        # server api1:8000;\n        # server api2:8000;\n    }\n\n    # Redirect HTTP to HTTPS\n    server {\n        listen 80;\n        server_name api.example.com;\n        return 301 https://$host$request_uri;\n    }\n\n    # HTTPS server\n    server {\n        listen 443 ssl http2;\n        server_name api.example.com;\n\n        # TLS certificates (Let\'s Encrypt)\n        ssl_certificate /etc/nginx/ssl/cert.pem;\n        ssl_certificate_key /etc/nginx/ssl/key.pem;\n        ssl_protocols TLSv1.2 TLSv1.3;\n        ssl_ciphers HIGH:!aNULL:!MD5;\n\n        # Security headers\n        add_header X-Frame-Options "SAMEORIGIN" always;\n        add_header X-Content-Type-Options "nosniff" always;\n        add_header X-XSS-Protection "1; mode=block" always;\n        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;\n        add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\n        # API proxy\n        location /api/ {\n            limit_req zone=api burst=20 nodelay;\n\n            proxy_pass http://api_backend;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n            proxy_set_header X-Forwarded-Proto $scheme;\n\n            # Timeouts\n            proxy_connect_timeout 10s;\n            proxy_send_timeout 60s;\n            proxy_read_timeout 60s;\n        }\n\n        # Auth endpoints (stricter rate limit)\n        location /api/v1/auth/ {\n            limit_req zone=auth burst=5 nodelay;\n            proxy_pass http://api_backend;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        }\n\n        # WebSocket support\n        location /ws/ {\n            proxy_pass http://api_backend;\n            proxy_http_version 1.1;\n            proxy_set_header Upgrade $http_upgrade;\n            proxy_set_header Connection "upgrade";\n            proxy_set_header Host $host;\n            proxy_read_timeout 86400;  # 24h for long connections\n        }\n\n        # Health check (no rate limit)\n        location /health {\n            proxy_pass http://api_backend;\n            access_log off;\n        }\n\n        # Static files\n        location /static/ {\n            root /var/www;\n            expires 30d;\n            add_header Cache-Control "public, immutable";\n        }\n\n        # Docs (only in staging, not production)\n        location /docs {\n            # return 404;  # uncomment in production\n            proxy_pass http://api_backend;\n        }\n    }\n}',
          explanation: 'Nginx: TLS termination, rate limiting (10r/s for API, 1r/s for auth), security headers, WebSocket support, static files, gzip. Redirects HTTP to HTTPS. Proxy headers forward client info to FastAPI.'
        },
        {
          filename: 'ci_cd.yml',
          language: 'yaml',
          code: '# .github/workflows/ci.yml\nname: CI/CD\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        python-version: ["3.11", "3.12", "3.13"]\n\n    services:\n      postgres:\n        image: postgres:16\n        env:\n          POSTGRES_USER: blog\n          POSTGRES_PASSWORD: blogpass\n          POSTGRES_DB: blog_test\n        ports:\n          - 5432:5432\n\n      redis:\n        image: redis:7\n        ports:\n          - 6379:6379\n\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: 3.12\n          cache: pip\n\n      - run: pip install -e ".[dev]"\n      - run: ruff check .\n      - run: mypy src/blog/\n      - run: pytest --cov=src/blog --cov-report=xml\n        env:\n          DATABASE_URL: postgresql+asyncpg://blog:blogpass@localhost:5432/blog_test\n          SECRET_KEY: test-secret-key-for-ci\n\n  build-and-push:\n    needs: test\n    runs-on: ubuntu-latest\n    if: github.ref == refs/heads/main\n\n    steps:\n      - uses: actions/checkout@v4\n      - uses: docker/setup-buildx-action@v3\n      - uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: github.actor\n          password: secrets.GITHUB_TOKEN\n\n      - uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: ghcr.io/repo:latest\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\n\n  deploy:\n    needs: build-and-push\n    runs-on: ubuntu-latest\n    if: github.ref == refs/heads/main\n    environment: production\n\n    steps:\n      - uses: appleboy/ssh-action@v1\n        with:\n          host: secrets.SERVER_HOST\n          username: secrets.SERVER_USER\n          key: secrets.SSH_PRIVATE_KEY\n          script: |\n            cd /opt/blog-api\n            git pull origin main\n            docker compose pull\n            docker compose up -d --remove-orphans\n            docker compose exec api alembic upgrade head\n            docker image prune -f',
          explanation: 'CI: lint (ruff) → type check (mypy) → test (pytest with coverage). Build Docker image, push to GHCR. Deploy via SSH: pull, restart, run migrations. Matrix tests on Python 3.11/3.12/3.13.'
        },
      ],
      lab: {
        title: 'Deploy Your API to Production',
        objective: 'Containerize, deploy with Docker Compose, set up Nginx + TLS',
        estTime: '2-3 hours',
        difficulty: 'Advanced',
        setup: [
          'Completed FastAPI project with all features',
          'Docker installed',
          'Domain name pointing to your server (or use nip.io)',
        ],
        steps: [
          {
            title: 'Step 1: Create Dockerfile',
            instruction: 'Multi-stage build for production',
            code: '# See Dockerfile example above\n# Key: multi-stage, non-root user, health check, gunicorn+uvicorn',
            codeLanguage: 'dockerfile',
          },
          {
            title: 'Step 2: Create docker-compose.yml',
            instruction: 'Full stack with API, DB, Redis, Nginx',
            code: '# See docker-compose.yml above\n# Key: health checks, volumes, restart policy',
            codeLanguage: 'yaml',
          },
          {
            title: 'Step 3: Create .env file',
            instruction: 'Environment variables (NEVER commit!)',
            code: '# .env (NEVER commit this!)\nSECRET_KEY=generate-a-random-secret-key-here\nDATABASE_URL=postgresql+asyncpg://blog:blogpass@db:5432/blog\nREDIS_URL=redis://redis:6379/0\nENVIRONMENT=production\nCORS_ORIGINS=["https://myapp.com"]\n\n# .env.example (commit this)\nSECRET_KEY=\nDATABASE_URL=postgresql+asyncpg://blog:blogpass@db:5432/blog\nREDIS_URL=redis://redis:6379/0\nENVIRONMENT=production',
            codeLanguage: 'bash',
          },
          {
            title: 'Step 4: Deploy',
            instruction: 'Build and run the full stack',
            code: '# Generate secret key\npython -c "import secrets; print(secrets.token_urlsafe(32))"\n# Add to .env\n\n# Build and start\ndocker compose up -d --build\n\n# Check status\ndocker compose ps\ndocker compose logs api\n\n# Run migrations\ndocker compose exec api alembic upgrade head\n\n# Test\ncurl http://localhost/health\ncurl http://localhost/api/v1/posts',
            codeLanguage: 'bash',
          },
          {
            title: 'Step 5: Set up TLS with Let\'s Encrypt',
            instruction: 'Get free SSL certificate',
            code: '# Install certbot\ndocker run -it --rm \\\n  -v $(pwd)/ssl:/etc/letsencrypt \\\n  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf \\\n  certbot/certbot certonly --webroot -w /var/www/certbot \\\n  -d api.example.com \\\n  --email you@example.com \\\n  --agree-tos --no-eff-email\n\n# Or use certbot standalone:\ncertbot certonly --standalone -d api.example.com\n\n# Auto-renew (add to crontab):\n0 12 * * * /usr/bin/certbot renew --quiet',
            codeLanguage: 'bash',
          },
        ],
        verification: 'https://api.example.com/health returns 200. HTTPS works. Docker compose ps shows all services healthy.',
      },
      keyTakeaways: [
        'Multi-stage Docker builds: builder (compilers) → runtime (minimal)',
        'Run as non-root user for security',
        'Production: gunicorn -w 4 -k uvicorn.workers.UvicornWorker (4 workers)',
        'Nginx: TLS termination, rate limiting, security headers, WebSocket support',
        'Use Let\'s Encrypt for free TLS certificates',
        'Health checks for orchestrators (Docker, K8s)',
        'CI/CD: lint → test → build → push → deploy',
        'Use GitHub secrets for credentials',
        'Run Alembic migrations as part of deployment',
        'Use .env files for config (NEVER commit secrets)',
      ],
      resources: [
        { title: 'FastAPI — Deployment', url: 'https://fastapi.tiangolo.com/deployment/', type: 'docs' },
        { title: 'Gunicorn Documentation', url: 'https://docs.gunicorn.org/', type: 'docs' },
        { title: 'Nginx Documentation', url: 'https://nginx.org/en/docs/', type: 'docs' },
        { title: 'Docker Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: 'docs' },
      ],
      miniProject: {
        title: 'Deploy the Complete Blog API',
        description: 'Deploy the full blog API with Docker, Nginx, TLS, and CI/CD',
        requirements: [
          'Multi-stage Dockerfile',
          'docker-compose.yml with API, DB, Redis, Nginx',
          'Nginx config with TLS and rate limiting',
          '.env file with all secrets',
          'Health check endpoint',
          'Alembic migrations run on deploy',
          'GitHub Actions CI/CD pipeline',
          'HTTPS working with valid certificate',
        ],
        estTime: '3-5 hours',
        solutionCode: '# See all the code examples in this lesson.\n# Key files: Dockerfile, docker-compose.yml, nginx.conf, .github/workflows/ci.yml\n# Verify: https://your-domain.com/health returns 200\n# Verify: https://your-domain.com/docs shows Swagger UI',
        solutionLanguage: 'yaml'
      }
    },

    {
      id: 'fa-10',
      title: 'Redis Integration — Caching, Pub/Sub, Rate Limiting, Sessions',
      subtitle: 'Master Redis with FastAPI — caching expensive queries, real-time pub/sub, rate limiting, session storage',
      duration: 80,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Redis is the most popular in-memory data store. In FastAPI apps, it solves 4 critical problems: (1) Caching — store expensive query results, (2) Pub/Sub — real-time notifications, (3) Rate limiting — prevent abuse, (4) Session storage — JWT blacklists, user sessions. Use redis.asyncio (or aioredis) for async operations.',
        'Caching pattern: check Redis first → if hit, return cached → if miss, query DB → store in Redis with TTL → return. This reduces database load by 90%+ for read-heavy apps. Use JSON serialization for complex objects, set TTL on EVERY key to prevent memory leaks.',
        'Pub/Sub enables real-time features: publish messages to channels, subscribers receive them instantly. Perfect for: notifications, live updates, chat. For multi-instance deployments, Redis pub/sub broadcasts across all FastAPI workers.',
        'Rate limiting with Redis: use INCR + EXPIRE for sliding window, or sorted sets for token bucket. Store per-IP or per-user counters. Return 429 with Retry-After header when exceeded. For production, use redis-py with connection pooling.',
      ],
      visualization: {
        title: 'Redis in FastAPI Architecture',
        type: 'architecture',
        diagram: `┌─────────────────────────────────────────────────────┐
│                  FastAPI Application                  │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  GET /posts  │  │ POST /login │  │ GET /search │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │          │
│         ▼                ▼                ▼          │
│  ┌─────────────────────────────────────────────────┐ │
│  │            Redis Cache Layer                     │ │
│  │                                                   │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐         │ │
│  │  │ Cache   │  │ Rate    │  │ Session │         │ │
│  │  │ posts:1 │  │ Limit   │  │ Store   │         │ │
│  │  │ (TTL 5m)│  │ ip:1.2..│  │ sess:abc│         │ │
│  │  └─────────┘  └─────────┘  └─────────┘         │ │
│  │                                                   │ │
│  │  ┌─────────┐  ┌─────────┐                       │ │
│  │  │ Pub/Sub │  │ Job     │                       │ │
│  │  │ Channel │  │ Queue   │                       │ │
│  │  │ events  │  │ celery  │                       │ │
│  │  └─────────┘  └─────────┘                       │ │
│  └─────────────────────────────────────────────────┘ │
│         │                                            │
│         ▼                                            │
│  ┌─────────────┐                                    │
│  │ PostgreSQL  │  ← only on cache miss              │
│  │  Database   │                                    │
│  └─────────────┘                                    │
└─────────────────────────────────────────────────────┘

USE CASES:
• Cache: GET /posts/1 → check Redis → hit? return → miss? query DB, cache, return
• Rate limit: INCR ip:1.2.3.4, EXPIRE 60 → if >100, return 429
• Session: GET session:abc → user data (faster than DB)
• Pub/Sub: publish "user:1:notification" → WebSocket subscribers receive
• Queue: LPUSH jobs "send_email" → Celery worker BRPOP`,
        legend: [
          'Redis is in-memory — microsecond latency (1000x faster than DB)',
          'Always set TTL on cache keys to prevent memory leaks',
          'Cache invalidation is hard — use versioned keys or tags',
          'Pub/Sub has no persistence — use streams for durability',
          'Use connection pooling (max connections) for production',
        ],
      },
      codeExamples: [
        {
          filename: 'redis_setup.py',
          language: 'python',
          code: '"""Redis setup and connection management."""\nimport redis.asyncio as aioredis\nfrom blog.core.config import settings\nimport json\nimport logging\nfrom typing import Optional, Any\n\nlogger = logging.getLogger(__name__)\n\n# === REDIS CONNECTION POOL ===\n# Create once at module level, reuse everywhere\nredis_pool = aioredis.ConnectionPool.from_url(\n    settings.REDIS_URL,\n    max_connections=20,  # adjust based on load\n    retry_on_timeout=True,\n    retry_on_error=[aioredis.ConnectionError],\n    health_check_interval=30,  # ping every 30s to detect dead connections\n    socket_timeout=5,\n    socket_connect_timeout=5,\n)\n\nasync def get_redis() -> aioredis.Redis:\n    """Get Redis client from pool."""\n    return aioredis.Redis(connection_pool=redis_pool)\n\n# === CACHE UTILITY ===\n\nclass Cache:\n    """Production-grade Redis cache with JSON serialization."""\n\n    def __init__(self, redis: aioredis.Redis, prefix: str = "cache"):\n        self.redis = redis\n        self.prefix = prefix\n\n    def _key(self, key: str) -> str:\n        return f"{self.prefix}:{key}"\n\n    async def get(self, key: str, model_type: type | None = None) -> Any:\n        """Get value from cache. Returns None on miss."""\n        data = await self.redis.get(self._key(key))\n        if data is None:\n            return None\n        try:\n            value = json.loads(data)\n            if model_type and hasattr(model_type, "model_validate"):\n                return model_type.model_validate(value)\n            return value\n        except (json.JSONDecodeError, ValueError) as e:\n            logger.warning(f"Cache deserialization error for {key}: {e}")\n            await self.redis.delete(self._key(key))  # delete corrupt entry\n            return None\n\n    async def set(\n        self,\n        key: str,\n        value: Any,\n        ttl: int = 300,  # 5 minutes default\n    ) -> None:\n        """Set value in cache with TTL."""\n        try:\n            if hasattr(value, "model_dump"):\n                value = value.model_dump(mode="json")\n            data = json.dumps(value, default=str)\n            await self.redis.setex(self._key(key), ttl, data)\n        except Exception as e:\n            logger.error(f"Cache set error for {key}: {e}")\n            # Do not raise — cache failures should not break the app\n\n    async def delete(self, key: str) -> None:\n        """Delete a key from cache."""\n        await self.redis.delete(self._key(key))\n\n    async def delete_pattern(self, pattern: str) -> int:\n        """Delete all keys matching pattern (e.g., \'posts:*\')."""\n        keys = await self.redis.keys(f"{self.prefix}:{pattern}")\n        if keys:\n            return await self.redis.delete(*keys)\n        return 0\n\n    async def get_or_set(\n        self,\n        key: str,\n        factory,  # async callable that produces the value\n        ttl: int = 300,\n    ) -> Any:\n        """Cache-aside pattern: get from cache, or compute and cache."""\n        cached = await self.get(key)\n        if cached is not None:\n            logger.debug(f"Cache HIT: {key}")\n            return cached\n\n        logger.debug(f"Cache MISS: {key}")\n        value = await factory()\n        await self.set(key, value, ttl)\n        return value',
          explanation: 'Use connection pooling (max_connections=20). Cache class handles JSON serialization, TTL, and get_or_set pattern (cache-aside). Cache failures should NOT break the app — always catch and log.'
        },
        {
          filename: 'cache_dependency.py',
          language: 'python',
          code: '"""FastAPI dependency for Redis cache."""\nfrom fastapi import Depends, Request\nfrom typing import Annotated\nimport redis.asyncio as aioredis\n\nasync def get_cache(request: Request) -> "Cache":\n    """Get cache instance from app state."""\n    return request.app.state.cache\n\n# === USAGE IN ROUTES ===\n\nfrom fastapi import APIRouter\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy import select\n\nrouter = APIRouter()\n\n@router.get("/posts/{post_id}")\nasync def get_post(\n    post_id: int,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    cache: Annotated[Cache, Depends(get_cache)],\n):\n    """Get post with caching."""\n    cache_key = f"post:{post_id}"\n\n    # Try cache first\n    cached = await cache.get(cache_key)\n    if cached:\n        return cached  # cache hit — no DB query!\n\n    # Cache miss — query database\n    post = await db.get(Post, post_id)\n    if not post:\n        raise HTTPException(404, "Post not found")\n\n    # Cache for 5 minutes\n    await cache.set(cache_key, post, ttl=300)\n\n    return post\n\n# === CACHE INVALIDATION ===\n\n@router.put("/posts/{post_id}")\nasync def update_post(\n    post_id: int,\n    post_update: PostUpdate,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    cache: Annotated[Cache, Depends(get_cache)],\n):\n    """Update post and invalidate cache."""\n    post = await db.get(Post, post_id)\n    # ... update post ...\n    await db.commit()\n\n    # Invalidate cache\n    await cache.delete(f"post:{post_id}")\n    # Also invalidate list caches\n    await cache.delete_pattern("posts:list:*")\n\n    return post\n\n# === CACHED LIST WITH PAGINATION ===\n\n@router.get("/posts")\nasync def list_posts(\n    skip: int = 0,\n    limit: int = 20,\n    tag: str | None = None,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    cache: Annotated[Cache, Depends(get_cache)],\n):\n    """List posts with cache."""\n    # Cache key includes all parameters\n    cache_key = f"posts:list:{skip}:{limit}:{tag}"\n\n    async def fetch_from_db():\n        stmt = select(Post).where(Post.published == True)\n        if tag:\n            stmt = stmt.join(Post.tags).where(Tag.name == tag)\n        stmt = stmt.offset(skip).limit(limit)\n        result = await db.execute(stmt)\n        return result.scalars().all()\n\n    # get_or_set handles cache-aside pattern\n    return await cache.get_or_set(\n        cache_key,\n        fetch_from_db,\n        ttl=60,  # 1 minute for lists (shorter than single items)\n    )\n\n# === RATE LIMITING WITH REDIS ===\n\nclass RateLimiter:\n    """Sliding window rate limiter using Redis."""\n\n    def __init__(\n        self,\n        redis: aioredis.Redis,\n        key_prefix: str = "ratelimit",\n    ):\n        self.redis = redis\n        self.prefix = key_prefix\n\n    async def check(\n        self,\n        identifier: str,  # IP or user ID\n        limit: int,       # max requests\n        window: int,      # time window in seconds\n    ) -> tuple[bool, dict]:\n        """Check if request is allowed. Returns (allowed, info)."""\n        key = f"{self.prefix}:{identifier}"\n        now = time.time()\n\n        # Use Redis sorted set for sliding window\n        pipe = self.redis.pipeline()\n\n        # Remove old entries outside the window\n        pipe.zremrangebyscore(key, 0, now - window)\n\n        # Count current entries\n        pipe.zcard(key)\n\n        # Add current request\n        pipe.zadd(key, {str(now): now})\n\n        # Set expiry on the key\n        pipe.expire(key, window)\n\n        results = await pipe.execute()\n        current_count = results[1]\n\n        allowed = current_count < limit\n        info = {\n            "limit": limit,\n            "remaining": max(0, limit - current_count - 1),\n            "reset_at": now + window,\n        }\n\n        if not allowed:\n            # Remove the request we just added\n            await self.redis.zrem(key, str(now))\n\n        return allowed, info\n\n# === RATE LIMIT DEPENDENCY ===\n\nasync def rate_limit(\n    request: Request,\n    redis: Annotated[aioredis.Redis, Depends(get_redis)],\n) -> dict:\n    """Rate limit: 100 requests per minute per IP."""\n    limiter = RateLimiter(redis)\n    client_ip = request.client.host if request.client else "unknown"\n\n    allowed, info = await limiter.check(\n        identifier=f"ip:{client_ip}",\n        limit=100,\n        window=60,\n    )\n\n    if not allowed:\n        raise HTTPException(\n            status_code=429,\n            detail="Too many requests",\n            headers={\n                "Retry-After": str(int(info["reset_at"] - time.time())),\n                "X-RateLimit-Limit": str(info["limit"]),\n                "X-RateLimit-Remaining": "0",\n                "X-RateLimit-Reset": str(int(info["reset_at"])),\n            },\n        )\n\n    return info\n\n# Apply to all routes in a router\nrouter = APIRouter(dependencies=[Depends(rate_limit)])\n\n# Or per-route\n@router.get("/expensive-endpoint")\nasync def expensive():\n    pass',
          explanation: 'Cache-aside pattern: check cache → miss → query DB → cache result. Invalidate cache on writes. Rate limiting with Redis sorted sets (sliding window). Use pipeline for atomic multi-command operations.'
        },
        {
          filename: 'pubsub.py',
          language: 'python',
          code: '"""Redis Pub/Sub for real-time notifications."""\nimport redis.asyncio as aioredis\nimport json\nfrom typing import Callable, Any\nimport logging\nimport asyncio\n\nlogger = logging.getLogger(__name__)\n\nclass PubSubManager:\n    """Redis Pub/Sub for cross-instance communication."""\n\n    def __init__(self, redis: aioredis.Redis):\n        self.redis = redis\n        self._subscribers: dict[str, list[Callable]] = {}\n\n    async def publish(self, channel: str, message: Any) -> int:\n        """Publish message to a channel. Returns number of receivers."""\n        data = json.dumps(message, default=str)\n        return await self.redis.publish(channel, data)\n\n    async def subscribe(\n        self,\n        channel: str,\n        callback: Callable,\n    ) -> None:\n        """Subscribe to a channel with a callback."""\n        if channel not in self._subscribers:\n            self._subscribers[channel] = []\n        self._subscribers[channel].append(callback)\n\n    async def start_listening(self) -> None:\n        """Start listening to all subscribed channels (run in background)."""\n        if not self._subscribers:\n            return\n\n        pubsub = self.redis.pubsub()\n        await pubsub.subscribe(*self._subscribers.keys())\n\n        logger.info(f"Listening to channels: {list(self._subscribers.keys())}")\n\n        try:\n            async for message in pubsub.listen():\n                if message["type"] == "message":\n                    channel = message["channel"]\n                    if isinstance(channel, bytes):\n                        channel = channel.decode()\n\n                    try:\n                        data = json.loads(message["data"])\n                    except json.JSONDecodeError:\n                        data = message["data"]\n\n                    # Call all callbacks for this channel\n                    for callback in self._subscribers.get(channel, []):\n                        try:\n                            result = callback(data)\n                            if asyncio.iscoroutine(result):\n                                await result\n                        except Exception:\n                            logger.exception(f"Error in subscriber callback")\n        except asyncio.CancelledError:\n            logger.info("PubSub listener cancelled")\n        finally:\n            await pubsub.unsubscribe()\n            await pubsub.close()\n\n# === USAGE: NOTIFICATIONS ===\n\nclass NotificationService:\n    """Send real-time notifications via Redis Pub/Sub."""\n\n    def __init__(self, pubsub: PubSubManager):\n        self.pubsub = pubsub\n\n    async def notify_user(self, user_id: int, event: str, data: Any):\n        """Send notification to a specific user."""\n        await self.pubsub.publish(\n            f"user:{user_id}:notifications",\n            {"event": event, "data": data},\n        )\n\n    async def broadcast(self, event: str, data: Any):\n        """Broadcast to all connected clients."""\n        await self.pubsub.publish("broadcast", {"event": event, "data": data})\n\n# === WEBSOCKET + PUBSUB (multi-instance) ===\n\nfrom fastapi import WebSocket\n\nclass WebSocketManager:\n    """Manages WebSocket connections across multiple instances.\n\n    When you have multiple FastAPI workers/instances, each only knows\n    about its own WebSocket connections. Redis Pub/Sub broadcasts\n    messages to ALL instances, so any user on any instance receives them.\n    """\n\n    def __init__(self, redis: aioredis.Redis):\n        self.redis = redis\n        # Local connections: user_id -> set of WebSocket connections\n        self.connections: dict[int, set[WebSocket]] = {}\n        self.pubsub = redis.pubsub()\n\n    async def connect(self, websocket: WebSocket, user_id: int):\n        """Accept WebSocket and register connection."""\n        await websocket.accept()\n        if user_id not in self.connections:\n            self.connections[user_id] = set()\n        self.connections[user_id].add(websocket)\n\n    async def disconnect(self, websocket: WebSocket, user_id: int):\n        """Remove WebSocket connection."""\n        if user_id in self.connections:\n            self.connections[user_id].discard(websocket)\n            if not self.connections[user_id]:\n                del self.connections[user_id]\n\n    async def send_to_user(self, user_id: int, message: dict):\n        """Send message to a user (across ALL instances).\n\n        Publishes to Redis. All instances receive and deliver\n        to their local connections for that user.\n        """\n        await self.redis.publish(\n            f"ws:user:{user_id}",\n            json.dumps(message),\n        )\n\n    async def start_listener(self):\n        """Listen for Pub/Sub messages and deliver to local WebSockets."""\n        # Subscribe to all user channels (pattern subscription)\n        await self.pubsub.psubscribe("ws:user:*")\n\n        async for message in self.pubsub.listen():\n            if message["type"] == "pmessage":\n                # Extract user_id from channel name\n                channel = message["channel"]\n                if isinstance(channel, bytes):\n                    channel = channel.decode()\n                user_id = int(channel.split(":")[-1])\n\n                data = message["data"]\n                if isinstance(data, bytes):\n                    data = data.decode()\n\n                # Send to all local connections for this user\n                for ws in self.connections.get(user_id, set()):\n                    try:\n                        await ws.send_text(data)\n                    except Exception:\n                        pass  # connection closed\n\n# === STARTUP (in lifespan) ===\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # ... other startup ...\n\n    redis = aioredis.from_url(settings.REDIS_URL)\n    app.state.redis = redis\n\n    ws_manager = WebSocketManager(redis)\n    app.state.ws_manager = ws_manager\n\n    # Start background listener\n    listener_task = asyncio.create_task(ws_manager.start_listener())\n    app.state.listener_task = listener_task\n\n    yield\n\n    # Shutdown\n    listener_task.cancel()\n    try:\n        await listener_task\n    except asyncio.CancelledError:\n        pass\n    await redis.close()',
          explanation: 'Pub/Sub broadcasts to all subscribers instantly. WebSocketManager uses pattern subscription (ws:user:*) to route messages to the right user across multiple FastAPI instances. Start listener as background task in lifespan.'
        },
      ],
      lab: {
        title: 'Add Redis Caching to Your Blog API',
        objective: 'Cache posts, rate limit API, add real-time notifications',
        estTime: '90-120 minutes',
        difficulty: 'Advanced',
        setup: [
          'Redis running (docker compose includes redis service)',
          'pip install redis',
        ],
        steps: [
          {
            title: 'Step 1: Add Redis to docker-compose',
            instruction: 'Add Redis service',
            code: '# docker-compose.yml — add redis service\nservices:\n  # ... existing services ...\n\n  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n    volumes:\n      - redisdata:/data\n    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru\n    restart: unless-stopped\n\nvolumes:\n  redisdata:',
            codeLanguage: 'yaml',
          },
          {
            title: 'Step 2: Create cache utility',
            instruction: 'Cache class with get/set/delete',
            code: '# src/blog/core/cache.py\nimport redis.asyncio as aioredis\nimport json\nfrom typing import Any\n\nclass Cache:\n    def __init__(self, redis: aioredis.Redis):\n        self.redis = redis\n\n    async def get(self, key: str) -> Any | None:\n        data = await self.redis.get(key)\n        return json.loads(data) if data else None\n\n    async def set(self, key: str, value: Any, ttl: int = 300) -> None:\n        await self.redis.setex(key, ttl, json.dumps(value, default=str))\n\n    async def delete(self, key: str) -> None:\n        await self.redis.delete(key)\n\n    async def get_or_set(self, key: str, factory, ttl: int = 300) -> Any:\n        cached = await self.get(key)\n        if cached is not None:\n            return cached\n        value = await factory()\n        await self.set(key, value, ttl)\n        return value',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Add caching to routes',
            instruction: 'Cache GET requests, invalidate on writes',
            code: '# src/blog/api/v1/posts.py\nfrom blog.core.cache import Cache\n\n@router.get("/{post_id}", response_model=PostResponse)\nasync def get_post(\n    post_id: int,\n    db: Annotated[AsyncSession, Depends(get_db)],\n    cache: Annotated[Cache, Depends(get_cache)],\n):\n    cache_key = f"post:{post_id}"\n\n    async def fetch():\n        post = await db.get(Post, post_id)\n        if not post:\n            raise HTTPException(404, "Post not found")\n        return post\n\n    return await cache.get_or_set(cache_key, fetch, ttl=300)\n\n@router.put("/{post_id}")\nasync def update_post(...):\n    # ... update logic ...\n    await cache.delete(f"post:{post_id}")  # invalidate\n    await cache.delete_pattern("posts:list:*")  # invalidate lists\n    return post',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Add rate limiting',
            instruction: 'Rate limit expensive endpoints',
            code: '# src/blog/core/rate_limit.py\nimport time\n\nclass RateLimiter:\n    def __init__(self, redis):\n        self.redis = redis\n\n    async def check(self, key: str, limit: int, window: int):\n        pipe = self.redis.pipeline()\n        now = time.time()\n        pipe.zremrangebyscore(key, 0, now - window)\n        pipe.zcard(key)\n        pipe.zadd(key, {str(now): now})\n        pipe.expire(key, window)\n        results = await pipe.execute()\n        return results[1] < limit\n\n# Usage:\n@router.post("/expensive", dependencies=[Depends(rate_limit_dependency)])\nasync def expensive_op():\n    pass',
            codeLanguage: 'python',
          },
          {
            title: 'Step 5: Benchmark the improvement',
            instruction: 'Compare cached vs uncached performance',
            code: '# Without cache: 50ms per request (DB query)\n# With cache: 2ms per request (Redis hit)\n# 25x faster!\n\n# Test with ab (Apache Bench):\nab -n 1000 -c 10 http://localhost:8000/api/v1/posts/1\n\n# Without cache:\n# Time per request: 50ms\n# Requests per second: 200\n\n# With cache:\n# Time per request: 2ms\n# Requests per second: 5000\n# 25x improvement!',
            codeLanguage: 'bash',
          },
        ],
        verification: 'Cached requests are 25x faster. Rate limiting returns 429 after limit. Cache invalidation works on updates.',
      },
      exercises: [
        {
          prompt: 'Write a cached function get_user_stats(user_id) that caches for 5 minutes. If cache miss, query DB for user\'s post count, comment count, and last activity.',
          starterCode: 'async def get_user_stats(\n    user_id: int,\n    db: AsyncSession,\n    cache: Cache,\n) -> dict:\n    # your code\n    pass\n',
          hint: 'Use cache.get_or_set with key f"user_stats:{user_id}", factory queries DB.',
          solution: 'async def get_user_stats(\n    user_id: int,\n    db: AsyncSession,\n    cache: Cache,\n) -> dict:\n    cache_key = f"user_stats:{user_id}"\n\n    async def fetch():\n        post_count = await db.scalar(\n            select(func.count(Post.id)).where(Post.author_id == user_id)\n        )\n        comment_count = await db.scalar(\n            select(func.count(Comment.id)).where(Comment.author_id == user_id)\n        )\n        last_post = await db.scalar(\n            select(func.max(Post.created_at))\n            .where(Post.author_id == user_id)\n        )\n        return {\n            "post_count": post_count or 0,\n            "comment_count": comment_count or 0,\n            "last_activity": last_post.isoformat() if last_post else None,\n        }\n\n    return await cache.get_or_set(cache_key, fetch, ttl=300)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why use Redis instead of in-memory dict for caching?',
          options: [
            'Faster',
            'Shared across multiple FastAPI workers/instances, survives restarts',
            'Required by FastAPI',
            'Uses less memory',
          ],
          correctIndex: 1,
          explanation: 'In-memory dict is per-process — each FastAPI worker has its own cache. Redis is shared across ALL workers and survives restarts. It also has TTL, data structures, and pub/sub.'
        },
        {
          question: 'What is the cache-aside pattern?',
          options: [
            'Write to cache, then DB',
            'Check cache first, on miss query DB and cache result, on hit return cached',
            'Always query DB, cache for next time',
            'Cache invalidates automatically',
          ],
          correctIndex: 1,
          explanation: 'Cache-aside: 1) Check cache. 2) If hit, return. 3) If miss, query DB, cache result with TTL, return. Simple and effective. Invalidate cache on writes.'
        },
        {
          question: 'Why use Redis Pub/Sub with WebSockets?',
          options: [
            'Faster than WebSockets',
            'Broadcasts across multiple FastAPI instances (each only knows its own connections)',
            'Required by WebSockets',
            'For security',
          ],
          correctIndex: 1,
          explanation: 'With multiple FastAPI workers/instances, each only knows its own WebSocket connections. Redis Pub/Sub broadcasts to ALL instances, so messages reach users connected to any instance.'
        },
        {
          question: 'What happens if Redis goes down?',
          options: [
            'App crashes',
            'Cache misses → queries DB directly (app should degrade gracefully)',
            'Returns 500 errors',
            'Stops accepting requests',
          ],
          correctIndex: 1,
          explanation: 'Cache failures should NOT break the app. Always catch Redis errors in cache get/set, log them, and fall through to DB. The app degrades gracefully (slower but still works).'
        },
      ],
      keyTakeaways: [
        'Redis solves 4 problems: caching, pub/sub, rate limiting, sessions',
        'Use redis.asyncio with connection pooling (max_connections=20)',
        'Cache-aside pattern: check cache → miss → query DB → cache with TTL → return',
        'Always set TTL on cache keys to prevent memory leaks',
        'Invalidate cache on writes: delete key, delete_pattern for lists',
        'Rate limiting: use sorted sets for sliding window (INCR+EXPIRE simpler)',
        'Pub/Sub broadcasts to all subscribers instantly (no persistence)',
        'WebSocketManager + Pub/Sub: route messages across multiple instances',
        'Cache failures should NOT break the app — catch and log, fall through to DB',
        'Pipeline multiple Redis commands for atomicity and performance',
      ],
      resources: [
        { title: 'redis-py Documentation', url: 'https://redis-py.readthedocs.io/', type: 'docs' },
        { title: 'Redis Documentation', url: 'https://redis.io/docs/', type: 'docs' },
        { title: 'Try Redis (interactive)', url: 'https://try.redis.io/', type: 'interactive', isHiddenGem: true },
        { title: 'FastAPI + Redis Guide', url: 'https://fastapi.tiangolo.com/advanced/using-request-directly/', type: 'article' },
      ]
    },

    {
      id: 'fa-11',
      title: 'Server-Side ML Model Serving with FastAPI',
      subtitle: 'Deploy ML models as APIs — PyTorch, TensorFlow, scikit-learn, ONNX inference',
      duration: 90,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'FastAPI is the go-to framework for serving ML models in production. Why? 1) Async support for high throughput, 2) Automatic input validation with Pydantic, 3) Auto-generated docs for data scientists, 4) Easy to containerize and scale. Companies like Uber, Netflix, and Spotify use FastAPI (or similar) for ML serving.',
        'The ML serving pattern: load model ONCE at startup (not per request — that would be 1000x slower), store in app.state, use for inference. For PyTorch: torch.no_grad() + model.eval(). For TensorFlow: model.predict(). For ONNX: onnxruntime.InferenceSession.',
        'Input validation is critical — ML models expect specific input shapes and types. Use Pydantic to validate input before inference. Validate: shape (e.g., 784 pixels for MNIST), value range (0-1 for normalized images), data type (float32). Return 422 on invalid input.',
        'Performance considerations: 1) Batch requests for throughput (process 32 at once instead of 1), 2) Use ONNX Runtime for 2-5x speedup over PyTorch, 3) GPU inference for deep learning, 4) Async model loading, 5) A/B testing with multiple models, 6) Model versioning for rollback.',
      ],
      visualization: {
        title: 'ML Model Serving Architecture',
        type: 'architecture',
        diagram: `┌─────────────────────────────────────────────────────┐
│              Client (Web/Mobile/CLI)                 │
└──────────────────────┬──────────────────────────────┘
                       │ POST /predict
                       │ {"features": [0.1, 0.2, ...]}
                       ▼
┌─────────────────────────────────────────────────────┐
│              FastAPI Application                     │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ Pydantic    │  │ Preprocess  │  │ Postprocess │  │
│  │ Validation  │  │ Normalize   │  │ Softmax     │  │
│  │ (422 error) │  │ Reshape     │  │ Argmax      │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │          │
│         ▼                ▼                │          │
│  ┌──────────────────────────────┐         │          │
│  │     Model Registry           │         │          │
│  │  (loaded at startup)         │         │          │
│  │                              │         │          │
│  │  ┌────────┐  ┌────────┐    │         │          │
│  │  │PyTorch │  │ ONNX   │    │         │          │
│  │  │Model v1│  │Runtime │    │         │          │
│  │  └────────┘  └────────┘    │         │          │
│  │                              │         │          │
│  │  app.state.model = loaded    │         │          │
│  │  ONCE in lifespan()          │         │          │
│  └──────────────┬───────────────┘         │          │
│                 │                          │          │
│                 ▼                          │          │
│         ┌──────────────┐                  │          │
│         │  Inference   │──────────────────┘          │
│         │  (GPU/CPU)   │                             │
│         └──────────────┘                             │
└─────────────────────────────────────────────────────┘

KEY INSIGHTS:
• Model loaded ONCE at startup (lifespan), reused for ALL requests
• NEVER load model per request (1000x slower)
• Pydantic validates input BEFORE inference (fast fail)
• torch.no_grad() + model.eval() for inference (no gradients)
• Batch requests for 10-100x throughput improvement
• ONNX Runtime is 2-5x faster than PyTorch for inference`,
        legend: [
          'Model loaded at startup in lifespan event, stored in app.state',
          'Pydantic validates input (shape, type, range) — 422 on invalid',
          'Preprocess: normalize, reshape. Postprocess: softmax, argmax',
          'Use torch.no_grad() for PyTorch inference (no gradient tracking)',
          'ONNX Runtime is faster than native PyTorch/TF for inference',
        ],
      },
      codeExamples: [
        {
          filename: 'pytorch_serving.py',
          language: 'python',
          code: '"""Serve a PyTorch model with FastAPI."""\nfrom fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel, Field\nfrom typing import Annotated\nimport torch\nimport torch.nn as nn\nimport numpy as np\nfrom contextlib import asynccontextmanager\nimport logging\n\nlogger = logging.getLogger(__name__)\n\n# === MODEL DEFINITION (same as training) ===\n\nclass MNISTModel(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc1 = nn.Linear(784, 256)\n        self.fc2 = nn.Linear(256, 128)\n        self.fc3 = nn.Linear(128, 10)\n        self.relu = nn.ReLU()\n        self.dropout = nn.Dropout(0.2)\n\n    def forward(self, x):\n        x = self.dropout(self.relu(self.fc1(x)))\n        x = self.dropout(self.relu(self.fc2(x)))\n        return self.fc3(x)  # logits (pre-softmax)\n\n# === INPUT/OUTPUT SCHEMAS ===\n\nclass PredictRequest(BaseModel):\n    """Input for single prediction."""\n    features: list[float] = Field(\n        ...,\n        min_length=784,\n        max_length=784,\n        description="784 pixel values (0-1 normalized)",\n        example=[0.0] * 784,\n    )\n\nclass BatchPredictRequest(BaseModel):\n    """Input for batch prediction."""\n    features: list[list[float]] = Field(\n        ...,\n        min_length=1,\n        max_length=128,  # max batch size\n        description="List of 784-element arrays",\n    )\n\nclass PredictResponse(BaseModel):\n    """Prediction output."""\n    prediction: int\n    confidence: float\n    probabilities: list[float]\n\nclass BatchPredictResponse(BaseModel):\n    predictions: list[PredictResponse]\n    model_version: str\n    inference_time_ms: float\n\n# === LIFESPAN — LOAD MODEL ONCE AT STARTUP ===\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # Load model ONCE at startup\n    logger.info("Loading ML model...")\n\n    model = MNISTModel()\n\n    # Load trained weights\n    model.load_state_dict(torch.load("models/mnist_v1.pt", map_location="cpu"))\n    model.eval()  # CRITICAL: set to eval mode (disables dropout, batchnorm)\n\n    # Store in app state (accessible from routes)\n    app.state.model = model\n    app.state.model_version = "1.0.0"\n    app.state.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")\n    model.to(app.state.device)\n\n    logger.info(f"Model loaded on {app.state.device}")\n\n    yield\n\n    # Cleanup\n    logger.info("Cleaning up model...")\n    del app.state.model\n    if torch.cuda.is_available():\n        torch.cuda.empty_cache()\n\napp = FastAPI(lifespan=lifespan)\n\n# === PREDICTION ENDPOINTS ===\n\n@app.post("/predict", response_model=PredictResponse)\nasync def predict(request: PredictRequest):\n    """Single prediction."""\n    import time\n    start = time.perf_counter()\n\n    # Convert input to tensor\n    features = torch.tensor(\n        request.features,\n        dtype=torch.float32,\n    ).to(app.state.device)\n\n    # Inference (no gradients!)\n    with torch.no_grad():\n        logits = app.state.model(features)\n        probabilities = torch.softmax(logits, dim=0)\n        confidence, prediction = torch.max(probabilities, dim=0)\n\n    elapsed = (time.perf_counter() - start) * 1000\n    logger.info(f"Inference: {elapsed:.2f}ms")\n\n    return PredictResponse(\n        prediction=prediction.item(),\n        confidence=confidence.item(),\n        probabilities=probabilities.tolist(),\n    )\n\n@app.post("/predict/batch", response_model=BatchPredictResponse)\nasync def predict_batch(request: BatchPredictRequest):\n    """Batch prediction (10-100x faster than individual)."""\n    import time\n    start = time.perf_counter()\n\n    # Convert to batch tensor\n    features = torch.tensor(\n        request.features,\n        dtype=torch.float32,\n    ).to(app.state.device)\n\n    # Batch inference\n    with torch.no_grad():\n        logits = app.state.model(features)  # (batch_size, 10)\n        probabilities = torch.softmax(logits, dim=1)\n        confidences, predictions = torch.max(probabilities, dim=1)\n\n    elapsed = (time.perf_counter() - start) * 1000\n\n    results = [\n        PredictResponse(\n            prediction=pred.item(),\n            confidence=conf.item(),\n            probabilities=probs.tolist(),\n        )\n        for pred, conf, probs in zip(\n            predictions, confidences, probabilities\n        )\n    ]\n\n    return BatchPredictResponse(\n        predictions=results,\n        model_version=app.state.model_version,\n        inference_time_ms=elapsed,\n    )\n\n# === HEALTH CHECK ===\n\n@app.get("/health")\nasync def health():\n    return {\n        "status": "healthy",\n        "model_loaded": hasattr(app.state, "model"),\n        "model_version": getattr(app.state, "model_version", None),\n        "device": str(getattr(app.state, "device", "unknown")),\n    }',
          explanation: 'Load model ONCE in lifespan, store in app.state. Use torch.no_grad() for inference (no gradient tracking = faster + less memory). Batch requests are 10-100x faster than individual. model.eval() disables dropout/batchnorm.'
        },
        {
          filename: 'onnx_serving.py',
          language: 'python',
          code: '"""Serve ONNX model — 2-5x faster than PyTorch for inference."""\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel, Field\nimport onnxruntime as ort\nimport numpy as np\nfrom contextlib import asynccontextmanager\nimport time\nimport logging\n\nlogger = logging.getLogger(__name__)\n\nclass PredictRequest(BaseModel):\n    features: list[float] = Field(min_length=784, max_length=784)\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # ONNX Runtime session (faster than PyTorch!)\n    # Providers: CPUExecutionProvider, CUDAExecutionProvider, TensorrtExecutionProvider\n    session = ort.InferenceSession(\n        "models/mnist.onnx",\n        providers=[\n            ("CUDAExecutionProvider", {"device_id": 0}),\n            "CPUExecutionProvider",  # fallback\n        ],\n    )\n\n    app.state.session = session\n    app.state.input_name = session.get_inputs()[0].name\n    app.state.output_name = session.get_outputs()[0].name\n\n    logger.info(f"ONNX model loaded. Providers: {session.get_providers()}")\n\n    yield\n\n    del app.state.session\n\napp = FastAPI(lifespan=lifespan)\n\n@app.post("/predict")\nasync def predict(request: PredictRequest):\n    start = time.perf_counter()\n\n    # ONNX Runtime expects numpy arrays (not torch tensors)\n    features = np.array(\n        request.features,\n        dtype=np.float32,\n    ).reshape(1, 784)  # batch dimension\n\n    # Run inference\n    outputs = app.state.session.run(\n        [app.state.output_name],\n        {app.state.input_name: features},\n    )\n\n    logits = outputs[0]\n\n    # Softmax (ONNX model might not include it)\n    exp = np.exp(logits - logits.max(axis=1, keepdims=True))\n    probabilities = exp / exp.sum(axis=1, keepdims=True)\n\n    prediction = int(probabilities.argmax())\n    confidence = float(probabilities[0][prediction])\n\n    elapsed = (time.perf_counter() - start) * 1000\n    logger.info(f"ONNX inference: {elapsed:.2f}ms")\n\n    return {\n        "prediction": prediction,\n        "confidence": confidence,\n        "probabilities": probabilities.tolist()[0],\n        "inference_time_ms": elapsed,\n    }\n\n# === IMAGE CLASSIFICATION (real-world) ===\n\nclass ImageRequest(BaseModel):\n    """Image as base64 or list of pixel values."""\n    image: list[list[list[float]]] = Field(  # [height, width, channels]\n        ...,\n        description="Image as 3D array [H][W][C], values 0-1",\n    )\n\nclass ImageResponse(BaseModel):\n    class_name: str\n    class_index: int\n    confidence: float\n    top_5: list[dict]\n\n# Preprocessing (same as training)\nIMAGENET_MEAN = np.array([0.485, 0.456, 0.406])\nIMAGENET_STD = np.array([0.229, 0.224, 0.225])\n\ndef preprocess_image(image: list) -> np.ndarray:\n    """Preprocess image for model input."""\n    img = np.array(image, dtype=np.float32)\n\n    # Normalize (if values are 0-255)\n    if img.max() > 1.0:\n        img = img / 255.0\n\n    # Normalize with ImageNet mean/std\n    img = (img - IMAGENET_MEAN) / IMAGENET_STD\n\n    # Transpose to [C, H, W] (PyTorch format)\n    img = np.transpose(img, (2, 0, 1))\n\n    # Add batch dimension\n    img = np.expand_dims(img, axis=0)\n\n    return img\n\n@app.post("/classify", response_model=ImageResponse)\nasync def classify_image(request: ImageRequest):\n    """Classify an image."""\n    # Preprocess\n    input_data = preprocess_image(request.image)\n\n    # Inference\n    outputs = app.state.session.run(\n        [app.state.output_name],\n        {app.state.input_name: input_data},\n    )\n\n    # Postprocess\n    probabilities = softmax(outputs[0][0])\n\n    # Get top 5 predictions\n    top_5_idx = np.argsort(probabilities)[::-1][:5]\n\n    # Map to class names (load from file)\n    class_names = app.state.class_names\n\n    return ImageResponse(\n        class_name=class_names[top_5_idx[0]],\n        class_index=int(top_5_idx[0]),\n        confidence=float(probabilities[top_5_idx[0]]),\n        top_5=[\n            {"class": class_names[i], "confidence": float(probabilities[i])}\n            for i in top_5_idx\n        ],\n    )\n\ndef softmax(x):\n    e = np.exp(x - x.max())\n    return e / e.sum()',
          explanation: 'ONNX Runtime is 2-5x faster than PyTorch for inference. Providers: CUDAExecutionProvider (GPU), CPUExecutionProvider (fallback). Preprocess input (normalize, reshape) exactly as during training. Postprocess: softmax, argmax.'
        },
        {
          filename: 'model_registry.py',
          language: 'python',
          code: '"""Model registry — versioning, A/B testing, hot-swapping."""\nfrom fastapi import FastAPI, Request\nfrom pydantic import BaseModel\nfrom typing import Optional\nimport torch\nimport os\nfrom pathlib import Path\nimport logging\nfrom dataclasses import dataclass, field\n\nlogger = logging.getLogger(__name__)\n\n@dataclass\nclass ModelInfo:\n    name: str\n    version: str\n    model: object\n    loaded_at: float\n    request_count: int = 0\n    avg_latency_ms: float = 0.0\n\nclass ModelRegistry:\n    """Manages multiple model versions with A/B testing support."""\n\n    def __init__(self):\n        self.models: dict[str, ModelInfo] = {}  # version -> ModelInfo\n        self.default_version: Optional[str] = None\n        self.traffic_split: dict[str, float] = {}  # version -> % traffic\n\n    def register(\n        self,\n        version: str,\n        model: object,\n        is_default: bool = False,\n    ):\n        """Register a model version."""\n        import time\n        self.models[version] = ModelInfo(\n            name="mnist",\n            version=version,\n            model=model,\n            loaded_at=time.time(),\n        )\n        if is_default or not self.default_version:\n            self.default_version = version\n            self.traffic_split = {version: 1.0}\n        logger.info(f"Registered model version {version}")\n\n    def get_model(self, version: Optional[str] = None) -> tuple[object, str]:\n        """Get model, optionally specific version or A/B test."""\n        import random\n\n        if version and version in self.models:\n            return self.models[version].model, version\n\n        if not self.traffic_split:\n            raise RuntimeError("No models registered")\n\n        # A/B testing — select based on traffic split\n        versions = list(self.traffic_split.keys())\n        weights = list(self.traffic_split.values())\n        selected = random.choices(versions, weights=weights)[0]\n\n        return self.models[selected].model, selected\n\n    def set_traffic_split(self, split: dict[str, float]):\n        """Set traffic distribution (e.g., {"v1": 0.9, "v2": 0.1})."""\n        total = sum(split.values())\n        if not (0.99 <= total <= 1.01):\n            raise ValueError("Traffic split must sum to 1.0")\n        self.traffic_split = split\n        logger.info(f"Traffic split updated: {split}")\n\n    def list_models(self) -> list[dict]:\n        """List all registered models."""\n        return [\n            {\n                "version": info.version,\n                "loaded_at": info.loaded_at,\n                "request_count": info.request_count,\n                "avg_latency_ms": info.avg_latency_ms,\n            }\n            for info in self.models.values()\n        ]\n\n    def record_request(self, version: str, latency_ms: float):\n        """Record request metrics."""\n        if version in self.models:\n            info = self.models[version]\n            # Running average\n            info.avg_latency_ms = (\n                (info.avg_latency_ms * info.request_count + latency_ms)\n                / (info.request_count + 1)\n            )\n            info.request_count += 1\n\n# === USAGE WITH FASTAPI ===\n\nfrom contextlib import asynccontextmanager\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    registry = ModelRegistry()\n\n    # Load all model versions\n    models_dir = Path("models")\n    for model_path in models_dir.glob("*.pt"):\n        version = model_path.stem  # e.g., "v1" from "v1.pt"\n        model = MNISTModel()\n        model.load_state_dict(torch.load(model_path, map_location="cpu"))\n        model.eval()\n        registry.register(version, model, is_default=(version == "v1"))\n\n    # Set traffic split: 90% v1, 10% v2 (A/B test)\n    if "v2" in registry.models:\n        registry.set_traffic_split({"v1": 0.9, "v2": 0.1})\n\n    app.state.registry = registry\n    yield\n\napp = FastAPI(lifespan=lifespan)\n\nclass PredictRequest(BaseModel):\n    features: list[float]\n    model_version: Optional[str] = None  # optional — for testing specific version\n\n@app.post("/predict")\nasync def predict(request: PredictRequest):\n    import time\n    start = time.perf_counter()\n\n    registry: ModelRegistry = app.state.registry\n\n    # Get model (A/B test or specific version)\n    model, version = registry.get_model(request.model_version)\n\n    # Inference\n    features = torch.tensor(request.features, dtype=torch.float32)\n    with torch.no_grad():\n        logits = model(features)\n        probabilities = torch.softmax(logits, dim=0)\n        confidence, prediction = torch.max(probabilities, dim=0)\n\n    elapsed = (time.perf_counter() - start) * 1000\n\n    # Record metrics\n    registry.record_request(version, elapsed)\n\n    return {\n        "prediction": prediction.item(),\n        "confidence": confidence.item(),\n        "model_version": version,  # tell client which version was used\n        "inference_time_ms": elapsed,\n    }\n\n@app.get("/models")\nasync def list_models():\n    """List all model versions and metrics."""\n    return app.state.registry.list_models()\n\n@app.post("/models/traffic-split")\nasync def update_traffic_split(split: dict[str, float]):\n    """Update A/B test traffic split."""\n    app.state.registry.set_traffic_split(split)\n    return {"message": "Traffic split updated", "split": split}\n\n# === HOT MODEL SWAPPING (zero downtime) ===\n\n@app.post("/models/{version}/activate")\nasync def activate_model(version: str):\n    """Switch default model version (hot swap, no restart)."""\n    registry = app.state.registry\n    if version not in registry.models:\n        raise HTTPException(404, f"Model {version} not found")\n\n    # Switch 100% traffic to new version\n    registry.set_traffic_split({version: 1.0})\n    registry.default_version = version\n\n    return {"message": f"Activated {version}", "traffic_split": registry.traffic_split}\n\n# === GRADUAL ROLLOUT ===\n\n@app.post("/models/{version}/rollout")\nasync def gradual_rollout(version: str, percentage: float):\n    """Gradually shift traffic to new version (canary deployment)."""\n    registry = app.state.registry\n    if version not in registry.models:\n        raise HTTPException(404, f"Model {version} not found")\n\n    current = registry.default_version\n    registry.set_traffic_split({\n        current: 1.0 - percentage,\n        version: percentage,\n    })\n\n    return {\n        "message": f"Rollout {version} at {percentage*100}%",\n        "traffic_split": registry.traffic_split,\n    }',
          explanation: 'Model registry: load multiple versions, A/B test with traffic split, hot-swap without restart, gradual rollout (canary). Track metrics per version. Essential for production ML — update models without downtime.'
        },
      ],
      lab: {
        title: 'Deploy an ML Model as a Production API',
        objective: 'Train, export, and serve a model with FastAPI',
        estTime: '2-3 hours',
        difficulty: 'Advanced',
        setup: [
          'pip install torch onnxruntime fastapi uvicorn',
          'MNIST dataset (auto-downloaded)',
        ],
        steps: [
          {
            title: 'Step 1: Train a simple model',
            instruction: 'Train MNIST classifier with PyTorch',
            code: '# train.py\nimport torch\nimport torch.nn as nn\nfrom torch.utils.data import DataLoader\nfrom torchvision import datasets, transforms\n\nclass MNISTModel(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc1 = nn.Linear(784, 256)\n        self.fc2 = nn.Linear(256, 128)\n        self.fc3 = nn.Linear(128, 10)\n        self.relu = nn.ReLU()\n\n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        x = self.relu(self.fc2(x))\n        return self.fc3(x)\n\n# Load data\ntransform = transforms.Compose([\n    transforms.ToTensor(),\n    transforms.Flatten(),\n])\ntrain_data = datasets.MNIST(".", train=True, download=True, transform=transform)\ntrain_loader = DataLoader(train_data, batch_size=64, shuffle=True)\n\n# Train\nmodel = MNISTModel()\noptimizer = torch.optim.Adam(model.parameters())\ncriterion = nn.CrossEntropyLoss()\n\nfor epoch in range(5):\n    for batch_idx, (data, target) in enumerate(train_loader):\n        optimizer.zero_grad()\n        output = model(data)\n        loss = criterion(output, target)\n        loss.backward()\n        optimizer.step()\n    print(f"Epoch {epoch+1} done")\n\n# Save\ntorch.save(model.state_dict(), "models/mnist_v1.pt")\nprint("Model saved")',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Export to ONNX (faster inference)',
            instruction: 'Convert PyTorch to ONNX',
            code: '# export_onnx.py\nimport torch\nfrom train import MNISTModel\n\nmodel = MNISTModel()\nmodel.load_state_dict(torch.load("models/mnist_v1.pt"))\nmodel.eval()\n\n# Create dummy input\ndummy = torch.randn(1, 784)\n\n# Export\ntorch.onnx.export(\n    model,\n    dummy,\n    "models/mnist.onnx",\n    input_names=["input"],\n    output_names=["output"],\n    dynamic_axes={\n        "input": {0: "batch_size"},\n        "output": {0: "batch_size"},\n    },\n    opset_version=14,\n)\nprint("Exported to ONNX")',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Create FastAPI serving app',
            instruction: 'Use the pytorch_serving.py or onnx_serving.py from examples',
            code: '# Use the code from onnx_serving.py example\n# Key points:\n# - Load model in lifespan (ONCE)\n# - Store in app.state\n# - Use torch.no_grad() or onnxruntime for inference\n# - Validate input with Pydantic\n# - Add /health endpoint\n\n# Run:\nuvicorn main:app --reload\n# Visit http://localhost:8000/docs',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Add input validation and error handling',
            instruction: 'Validate input shape, handle errors gracefully',
            code: 'from fastapi import HTTPException\n\nclass PredictRequest(BaseModel):\n    features: list[float] = Field(\n        min_length=784, max_length=784,\n        description="Exactly 784 float values (0-1)",\n    )\n\n    @field_validator("features")\n    @classmethod\n    def validate_range(cls, v):\n        if any(x < 0 or x > 1 for x in v):\n            raise ValueError("All values must be between 0 and 1")\n        return v\n\n@app.post("/predict")\nasync def predict(request: PredictRequest):\n    try:\n        # inference\n        return result\n    except Exception as e:\n        logger.exception("Inference failed")\n        raise HTTPException(500, "Prediction failed")',
            codeLanguage: 'python',
          },
          {
            title: 'Step 5: Benchmark and optimize',
            instruction: 'Compare PyTorch vs ONNX, single vs batch',
            code: '# Benchmark with ab:\nab -n 1000 -c 10 -p request.json -T application/json http://localhost:8000/predict\n\n# Expected results:\n# PyTorch:  ~50ms per request, 200 req/s\n# ONNX:     ~15ms per request, 650 req/s (3x faster!)\n# Batch(32): ~5ms per item, 6000 items/s (30x faster!)\n\n# Optimize:\n# 1. Use ONNX Runtime (2-5x faster)\n# 2. Batch requests (10-100x throughput)\n# 3. GPU inference (if available)\n# 4. Quantization (int8 — 4x smaller, 2x faster)\n# 5. Connection pooling for DB calls',
            codeLanguage: 'bash',
          },
          {
            title: 'Step 6: Deploy with Docker',
            instruction: 'Containerize the ML API',
            code: '# Dockerfile\nFROM python:3.12-slim\n\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    libgomp1 && rm -rf /var/lib/apt/lists/*\n\nWORKDIR /app\nCOPY pyproject.toml .\nRUN pip install --no-cache-dir fastapi uvicorn onnxruntime pydantic\n\nCOPY . .\n\nHEALTHCHECK CMD curl -f http://localhost:8000/health || exit 1\n\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]\n\n# Build and run:\ndocker build -t mnist-api .\ndocker run -p 8000:8000 mnist-api',
            codeLanguage: 'dockerfile',
          },
        ],
        verification: 'API serves predictions. ONNX is 3x faster than PyTorch. Batch is 30x faster than single. Docker container works.',
      },
      exercises: [
        {
          prompt: 'Write an endpoint POST /predict/batch that takes a list of inputs and returns predictions. Include batch size limit (max 128) and timing.',
          starterCode: '@app.post("/predict/batch")\nasync def predict_batch(request: BatchPredictRequest):\n    # your code\n    pass\n',
          hint: 'Convert to batch tensor, single inference call, iterate results.',
          solution: '@app.post("/predict/batch", response_model=BatchPredictResponse)\nasync def predict_batch(request: BatchPredictRequest):\n    import time\n    start = time.perf_counter()\n\n    # Convert to batch tensor\n    features = torch.tensor(\n        request.features,\n        dtype=torch.float32,\n    ).to(app.state.device)\n\n    # Single batch inference (10-100x faster than loop)\n    with torch.no_grad():\n        logits = app.state.model(features)\n        probabilities = torch.softmax(logits, dim=1)\n        confidences, predictions = torch.max(probabilities, dim=1)\n\n    elapsed = (time.perf_counter() - start) * 1000\n\n    results = [\n        {"prediction": p.item(), "confidence": c.item()}\n        for p, c in zip(predictions, confidences)\n    ]\n\n    return BatchPredictResponse(\n        predictions=results,\n        model_version=app.state.model_version,\n        inference_time_ms=elapsed,\n    )',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When should you load the ML model?',
          options: [
            'Per request (each time)',
            'ONCE at startup (lifespan), reuse for all requests',
            'Every 100 requests',
            'Never — load on client side',
          ],
          correctIndex: 1,
          explanation: 'Loading a model takes 1-10 seconds. Doing it per request would make your API 1000x slower. Load ONCE in lifespan, store in app.state, reuse for all requests.'
        },
        {
          question: 'Why use ONNX Runtime instead of PyTorch for inference?',
          options: [
            'More accurate',
            '2-5x faster (optimized C++ runtime, graph optimizations)',
            'Required by FastAPI',
            'Uses less memory only',
          ],
          correctIndex: 1,
          explanation: 'ONNX Runtime is optimized for inference — graph optimizations, quantization, hardware acceleration. 2-5x faster than PyTorch. Also works with any framework (TF, sklearn, XGBoost).'
        },
        {
          question: 'What does torch.no_grad() do?',
          options: [
            'Disables the model',
            'Disables gradient tracking (faster inference, less memory)',
            'Disables GPU',
            'Required for training',
          ],
          correctIndex: 1,
          explanation: 'During inference, you do not need gradients. torch.no_grad() disables gradient tracking, saving memory and computation. Always use for inference.'
        },
        {
          question: 'Why batch predictions?',
          options: [
            'More accurate',
            '10-100x throughput improvement (GPU parallelism, amortized overhead)',
            'Required by PyTorch',
            'Uses less memory',
          ],
          correctIndex: 1,
          explanation: 'Batching processes multiple inputs in one forward pass. GPU parallelism makes batch of 32 nearly as fast as single. 10-100x throughput vs individual requests.'
        },
      ],
      keyTakeaways: [
        'Load model ONCE in lifespan, store in app.state, reuse for all requests',
        'Use torch.no_grad() + model.eval() for PyTorch inference',
        'ONNX Runtime is 2-5x faster than PyTorch for inference',
        'Batch requests for 10-100x throughput improvement',
        'Pydantic validates input BEFORE inference (shape, type, range)',
        'Preprocess input exactly as during training (normalize, reshape)',
        'Model registry for versioning, A/B testing, hot-swapping',
        'Gradual rollout (canary): 10% → 50% → 100% traffic to new model',
        'GPU inference for deep learning (CUDAExecutionProvider)',
        'Quantization (int8): 4x smaller model, 2x faster inference',
      ],
      resources: [
        { title: 'ONNX Runtime', url: 'https://onnxruntime.ai/', type: 'docs' },
        { title: 'FastAPI + ML Guide', url: 'https://fastapi.tiangolo.com/advanced/', type: 'article' },
        { title: 'MLflow Model Registry', url: 'https://mlflow.org/', type: 'tool' },
        { title: 'BentoML (ML serving)', url: 'https://bentoml.com/', type: 'tool', isHiddenGem: true },
      ],
      miniProject: {
        title: 'Build an Image Classification API',
        description: 'Train an image classifier, export to ONNX, serve with FastAPI, deploy with Docker',
        requirements: [
          'Train model (transfer learning with ResNet/EfficientNet)',
          'Export to ONNX format',
          'FastAPI app with /predict, /predict/batch, /health',
          'Input validation (image shape, value range)',
          'A/B testing with 2 model versions',
          'Model metrics (latency, request count)',
          'Docker deployment',
          'Benchmark: PyTorch vs ONNX vs batch',
        ],
        estTime: '4-6 hours',
        solutionCode: '# See lab steps above for patterns.\n# Key files:\n# - train.py: train model with transfer learning\n# - export_onnx.py: convert to ONNX\n# - main.py: FastAPI serving app\n# - Dockerfile: containerize\n# Verify: curl -X POST http://localhost:8000/predict -d \'{"features": [...]}\'',
        solutionLanguage: 'python'
      }
    },

    {
      id: 'fa-12',
      title: 'External API Integration — httpx, Async HTTP Clients, Webhooks',
      subtitle: 'Call external APIs (Stripe, SendGrid, GitHub), handle webhooks, retries, circuit breakers',
      duration: 75,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'Every production app calls external APIs: Stripe for payments, SendGrid for email, GitHub for auth, Twilio for SMS. Use httpx (modern, sync + async) or aiohttp. Always: set timeouts, handle errors, retry with backoff, rate limit your own requests.',
        'Webhooks receive notifications from external services: "payment succeeded", "email delivered", "push to GitHub". Create POST endpoints, verify signatures (security!), process idempotently (webhooks can be sent multiple times).',
        'Circuit breaker pattern: if an external API is down, stop calling it temporarily (fail fast instead of waiting for timeout). States: closed (normal), open (failing, reject immediately), half-open (testing if recovered). Use circuitbreaker library or implement manually.',
        'Retry with exponential backoff: 1s → 2s → 4s → 8s. Add jitter (random delay) to avoid thundering herd. Never retry on 4xx (client error — will fail again). Always retry on 5xx and network errors. Use tenacity library for production.',
      ],
      codeExamples: [
        {
          filename: 'httpx_client.py',
          language: 'python',
          code: '"""Async HTTP client with httpx — production patterns."""\nimport httpx\nfrom typing import Any, Optional\nimport logging\nimport asyncio\nfrom tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type\n\nlogger = logging.getLogger(__name__)\n\n# === PRODUCTION HTTPX CLIENT ===\n\nclass HttpClient:\n    """Production HTTP client with retries, timeouts, connection pooling."""\n\n    def __init__(\n        self,\n        base_url: str = "",\n        api_key: Optional[str] = None,\n        timeout: float = 30.0,\n        max_retries: int = 3,\n    ):\n        self.base_url = base_url\n        self.api_key = api_key\n        self.timeout = timeout\n        self.max_retries = max_retries\n\n        # Create persistent client (connection pooling)\n        self.client = httpx.AsyncClient(\n            base_url=base_url,\n            timeout=httpx.Timeout(\n                connect=10.0,  # connection timeout\n                read=30.0,     # read timeout\n                write=10.0,    # write timeout\n                pool=5.0,      # pool timeout (waiting for connection)\n            ),\n            limits=httpx.Limits(\n                max_connections=100,\n                max_keepalive_connections=20,\n                keepalive_expiry=30.0,\n            ),\n            headers=self._default_headers(),\n        )\n\n    def _default_headers(self) -> dict:\n        headers = {"Content-Type": "application/json", "Accept": "application/json"}\n        if self.api_key:\n            headers["Authorization"] = f"Bearer {self.api_key}"\n        return headers\n\n    @retry(\n        stop=stop_after_attempt(3),\n        wait=wait_exponential(multiplier=1, min=1, max=10),\n        retry=retry_if_exception_type((httpx.ConnectError, httpx.TimeoutException)),\n    )\n    async def get(self, path: str, **kwargs) -> dict:\n        """GET with automatic retry on network errors."""\n        response = await self.client.get(path, **kwargs)\n        response.raise_for_status()  # raise on 4xx/5xx\n        return response.json()\n\n    @retry(\n        stop=stop_after_attempt(3),\n        wait=wait_exponential(multiplier=1, min=1, max=10),\n    )\n    async def post(self, path: str, **kwargs) -> dict:\n        """POST with retry."""\n        response = await self.client.post(path, **kwargs)\n        response.raise_for_status()\n        return response.json()\n\n    async def close(self):\n        """Close the client (call on shutdown)."""\n        await self.client.aclose()\n\n# === USAGE: STRIPE PAYMENT API ===\n\nclass StripeClient:\n    """Stripe API client."""\n\n    def __init__(self, api_key: str):\n        self.client = HttpClient(\n            base_url="https://api.stripe.com/v1",\n            api_key=api_key,\n        )\n\n    async def create_payment_intent(\n        self,\n        amount: int,  # cents!\n        currency: str = "usd",\n        customer_id: Optional[str] = None,\n    ) -> dict:\n        """Create a Stripe PaymentIntent."""\n        data = {\n            "amount": amount,\n            "currency": currency,\n        }\n        if customer_id:\n            data["customer"] = customer_id\n\n        return await self.client.post(\n            "/payment_intents",\n            data=data,  # Stripe uses form encoding\n        )\n\n    async def retrieve_payment(self, payment_id: str) -> dict:\n        """Get payment status."""\n        return await self.client.get(f"/payment_intents/{payment_id}")\n\n    async def create_customer(self, email: str, name: str) -> dict:\n        """Create a customer."""\n        return await self.client.post(\n            "/customers",\n            data={"email": email, "name": name},\n        )\n\n    async def close(self):\n        await self.client.close()\n\n# === USAGE: SENDGRID EMAIL ===\n\nclass EmailClient:\n    """SendGrid email client."""\n\n    def __init__(self, api_key: str):\n        self.client = HttpClient(\n            base_url="https://api.sendgrid.com/v3",\n            api_key=api_key,\n        )\n\n    async def send_email(\n        self,\n        to: str,\n        subject: str,\n        html_content: str,\n        from_email: str = "noreply@myapp.com",\n    ) -> dict:\n        """Send transactional email."""\n        return await self.client.post(\n            "/mail/send",\n            json={\n                "personalizations": [{\n                    "to": [{"email": to}],\n                    "subject": subject,\n                }],\n                "from": {"email": from_email},\n                "content": [{\n                    "type": "text/html",\n                    "value": html_content,\n                }],\n            },\n        )\n\n    async def send_template_email(\n        self,\n        to: str,\n        template_id: str,\n        dynamic_data: dict,\n    ) -> dict:\n        """Send email using a SendGrid template."""\n        return await self.client.post(\n            "/mail/send",\n            json={\n                "personalizations": [{\n                    "to": [{"email": to}],\n                    "dynamic_template_data": dynamic_data,\n                }],\n                "template_id": template_id,\n                "from": {"email": "noreply@myapp.com"},\n            },\n        )\n\n# === USAGE: GITHUB API ===\n\nclass GitHubClient:\n    """GitHub API client."""\n\n    def __init__(self, token: str):\n        self.client = HttpClient(\n            base_url="https://api.github.com",\n            api_key=token,\n        )\n\n    async def get_user(self, username: str) -> dict:\n        """Get GitHub user info."""\n        return await self.client.get(f"/users/{username}")\n\n    async def get_repo(self, owner: str, repo: str) -> dict:\n        """Get repository info."""\n        return await self.client.get(f"/repos/{owner}/{repo}")\n\n    async def create_issue(\n        self,\n        owner: str,\n        repo: str,\n        title: str,\n        body: str,\n    ) -> dict:\n        """Create an issue."""\n        return await self.client.post(\n            f"/repos/{owner}/{repo}/issues",\n            json={"title": title, "body": body},\n        )',
          explanation: 'Production HTTP client: persistent (connection pooling), timeouts (connect/read/write), retries with exponential backoff (tenacity). Wrap external APIs (Stripe, SendGrid, GitHub) in client classes. Always close on shutdown.'
        },
        {
          filename: 'webhooks.py',
          language: 'python',
          code: '"""Webhook handlers — receive notifications from external services."""\nfrom fastapi import APIRouter, Request, HTTPException, Header, BackgroundTasks\nfrom pydantic import BaseModel\nfrom typing import Annotated, Optional\nimport hmac\nimport hashlib\nimport json\nimport logging\nfrom blog.core.config import settings\n\nrouter = APIRouter(prefix="/webhooks", tags=["webhooks"])\nlogger = logging.getLogger(__name__)\n\n# === STRIPE WEBHOOK ===\n\nclass StripeWebhookEvent(BaseModel):\n    id: str\n    type: str\n    data: dict\n\ndef verify_stripe_signature(\n    payload: bytes,\n    signature: str,\n    secret: str,\n) -> bool:\n    """Verify Stripe webhook signature (security!)."""\n    # Stripe sends: t=1234567890,v1=abc123...\n    elements = signature.split(",")\n    timestamp = None\n    signatures = []\n\n    for element in elements:\n        key, value = element.split("=")\n        if key == "t":\n            timestamp = value\n        elif key == "v1":\n            signatures.append(value)\n\n    if not timestamp:\n        return False\n\n    # Create expected signature\n    signed_payload = f"{timestamp}.".encode() + payload\n    expected = hmac.new(\n        secret.encode(),\n        signed_payload,\n        hashlib.sha256,\n    ).hexdigest()\n\n    # Compare securely (constant time to prevent timing attacks)\n    return hmac.compare_digest(expected, signatures[0]) if signatures else False\n\n@router.post("/stripe")\nasync def stripe_webhook(\n    request: Request,\n    background_tasks: BackgroundTasks,\n    stripe_signature: Annotated[str, Header(alias="Stripe-Signature")],\n):\n    """Handle Stripe webhook events.\n\n    Stripe sends events for: payment_succeeded, payment_failed,\n    customer_created, subscription_updated, etc.\n    """\n    payload = await request.body()\n\n    # 1. VERIFY SIGNATURE (security — do not skip!)\n    if not verify_stripe_signature(\n        payload,\n        stripe_signature,\n        settings.STRIPE_WEBHOOK_SECRET,\n    ):\n        logger.warning("Invalid Stripe webhook signature")\n        raise HTTPException(400, "Invalid signature")\n\n    # 2. PARSE EVENT\n    event = json.loads(payload)\n    event_type = event["type"]\n    event_id = event["id"]  # for idempotency\n\n    logger.info(f"Stripe webhook: {event_type} ({event_id})")\n\n    # 3. IDEMPOTENCY CHECK (webhooks can be sent multiple times!)\n    # Check if we already processed this event\n    if await is_event_processed(event_id):\n        logger.info(f"Event {event_id} already processed")\n        return {"status": "already_processed"}\n\n    # 4. PROCESS EVENT (in background for fast response)\n    background_tasks.add_task(\n        process_stripe_event,\n        event_id,\n        event_type,\n        event["data"]["object"],\n    )\n\n    # 5. MARK EVENT AS PROCESSED\n    await mark_event_processed(event_id)\n\n    # Return 200 quickly (Stripe expects fast response)\n    return {"status": "received"}\n\nasync def process_stripe_event(\n    event_id: str,\n    event_type: str,\n    data: dict,\n):\n    """Process Stripe event in background."""\n    try:\n        if event_type == "payment_intent.succeeded":\n            payment_id = data["id"]\n            amount = data["amount"]\n            customer = data.get("customer")\n\n            # Update order status, send confirmation email, etc.\n            await update_order_status(payment_id, "paid")\n            await send_payment_confirmation(customer, amount)\n\n        elif event_type == "payment_intent.payment_failed":\n            payment_id = data["id"]\n            failure_reason = data.get("last_payment_error", {}).get("message")\n\n            await update_order_status(payment_id, "failed")\n            await send_payment_failure_notification(customer, failure_reason)\n\n        elif event_type == "customer.subscription.deleted":\n            customer_id = data["customer"]\n            await cancel_subscription(customer_id)\n\n        elif event_type == "invoice.payment_succeeded":\n            invoice_id = data["id"]\n            await send_invoice(invoice_id)\n\n        else:\n            logger.info(f"Unhandled event type: {event_type}")\n\n    except Exception:\n        logger.exception(f"Error processing Stripe event {event_id}")\n        # Mark as failed for retry\n        await mark_event_failed(event_id)\n\n# === GITHUB WEBHOOK ===\n\ndef verify_github_signature(\n    payload: bytes,\n    signature: str,\n    secret: str,\n) -> bool:\n    """Verify GitHub webhook signature."""\n    if not signature.startswith("sha256="):\n        return False\n\n    expected = hmac.new(\n        secret.encode(),\n        payload,\n        hashlib.sha256,\n    ).hexdigest()\n\n    received = signature[7:]  # strip "sha256="\n    return hmac.compare_digest(expected, received)\n\n@router.post("/github")\nasync def github_webhook(\n    request: Request,\n    background_tasks: BackgroundTasks,\n    x_github_event: Annotated[str, Header()],\n    x_hub_signature_256: Annotated[str, Header()],\n    x_github_delivery: Annotated[str, Header()],\n):\n    """Handle GitHub webhook events.\n\n    Events: push, pull_request, issues, issue_comment, release, etc.\n    """\n    payload = await request.body()\n\n    # Verify signature\n    if not verify_github_signature(\n        payload,\n        x_hub_signature_256,\n        settings.GITHUB_WEBHOOK_SECRET,\n    ):\n        raise HTTPException(400, "Invalid signature")\n\n    event_data = json.loads(payload)\n\n    # Process in background\n    background_tasks.add_task(\n        process_github_event,\n        x_github_event,\n        x_github_delivery,\n        event_data,\n    )\n\n    return {"status": "received"}\n\nasync def process_github_event(\n    event: str,\n    delivery_id: str,\n    data: dict,\n):\n    """Process GitHub event."""\n    if event == "push":\n        repo = data["repository"]["name"]\n        pusher = data["pusher"]["name"]\n        commits = data["commits"]\n        logger.info(f"Push to {repo} by {pusher}: {len(commits)} commits")\n\n    elif event == "pull_request":\n        action = data["action"]\n        pr_number = data["number"]\n        repo = data["repository"]["name"]\n        logger.info(f"PR {pr_number} {action} in {repo}")\n\n    elif event == "issues":\n        action = data["action"]\n        issue_number = data["issue"]["number"]\n        logger.info(f"Issue {issue_number} {action}")\n\n# === IDEMPOTENCY HELPERS ===\n\nasync def is_event_processed(event_id: str) -> bool:\n    """Check if event was already processed (Redis)."""\n    # Use Redis SET with event_id\n    # return await redis.sismember("processed_events", event_id)\n    return False  # placeholder\n\nasync def mark_event_processed(event_id: str):\n    """Mark event as processed."""\n    # await redis.sadd("processed_events", event_id)\n    # await redis.expire("processed_events", 86400 * 7)  # 7 days\n    pass\n\nasync def mark_event_failed(event_id: str):\n    """Mark event as failed (for retry)."""\n    # await redis.sadd("failed_events", event_id)\n    pass',
          explanation: 'Webhooks: verify signatures (security!), check idempotency (webhooks sent multiple times), process in background (fast response), handle errors. Use Redis SET to track processed events. Stripe/GitHub send X-Signature headers.'
        },
        {
          filename: 'circuit_breaker.py',
          language: 'python',
          code: '"""Circuit breaker — fail fast when external service is down."""\nimport time\nfrom enum import Enum\nfrom typing import Callable, Any\nimport logging\nfrom functools import wraps\n\nlogger = logging.getLogger(__name__)\n\nclass CircuitState(Enum):\n    CLOSED = "closed"      # normal — requests flow through\n    OPEN = "open"          # failing — reject immediately\n    HALF_OPEN = "half_open" # testing — allow one request\n\nclass CircuitBreaker:\n    """Circuit breaker for external service calls.\n\n    States:\n    - CLOSED: normal operation, requests pass through\n    - OPEN: too many failures, reject immediately (fail fast)\n    - HALF_OPEN: testing if service recovered (allow one request)\n\n    When failures exceed threshold → OPEN\n    After recovery_timeout → HALF_OPEN\n    If test request succeeds → CLOSED\n    If test request fails → OPEN (reset timer)\n    """\n\n    def __init__(\n        self,\n        failure_threshold: int = 5,\n        recovery_timeout: float = 60.0,\n        expected_exception: type = Exception,\n    ):\n        self.failure_threshold = failure_threshold\n        self.recovery_timeout = recovery_timeout\n        self.expected_exception = expected_exception\n        self.state = CircuitState.CLOSED\n        self.failure_count = 0\n        self.last_failure_time = 0\n        self.success_count = 0\n\n    def __call__(self, func: Callable) -> Callable:\n        @wraps(func)\n        async def wrapper(*args, **kwargs):\n            return await self.call(func, *args, **kwargs)\n        return wrapper\n\n    async def call(self, func: Callable, *args, **kwargs) -> Any:\n        """Call function with circuit breaker protection."""\n        # Check if circuit is open\n        if self.state == CircuitState.OPEN:\n            if time.time() - self.last_failure_time > self.recovery_timeout:\n                logger.info("Circuit breaker: OPEN → HALF_OPEN (testing)")\n                self.state = CircuitState.HALF_OPEN\n            else:\n                raise CircuitBreakerOpenError(\n                    f"Circuit breaker is OPEN (failures: {self.failure_count})"\n                )\n\n        try:\n            result = await func(*args, **kwargs)\n\n            # Success\n            if self.state == CircuitState.HALF_OPEN:\n                logger.info("Circuit breaker: HALF_OPEN → CLOSED (recovered)")\n                self.state = CircuitState.CLOSED\n                self.failure_count = 0\n\n            self.success_count += 1\n            return result\n\n        except self.expected_exception as e:\n            self.failure_count += 1\n            self.last_failure_time = time.time()\n\n            if self.state == CircuitState.HALF_OPEN:\n                # Test failed — back to OPEN\n                logger.warning("Circuit breaker: HALF_OPEN → OPEN (test failed)")\n                self.state = CircuitState.OPEN\n\n            elif self.failure_count >= self.failure_threshold:\n                # Threshold exceeded — OPEN\n                logger.warning(\n                    f"Circuit breaker: CLOSED → OPEN "\n                    f"(failures: {self.failure_count})"\n                )\n                self.state = CircuitState.OPEN\n\n            raise\n\nclass CircuitBreakerOpenError(Exception):\n    """Raised when circuit breaker is open."""\n    pass\n\n# === USAGE ===\n\n# Create circuit breakers for each external service\nstripe_breaker = CircuitBreaker(\n    failure_threshold=5,\n    recovery_timeout=60,\n    expected_exception=httpx.HTTPError,\n)\n\nsendgrid_breaker = CircuitBreaker(\n    failure_threshold=3,\n    recovery_timeout=120,\n)\n\n# Apply to client methods\nclass PaymentService:\n    @stripe_breaker\n    async def charge_customer(self, customer_id: str, amount: int):\n        """Charge customer via Stripe (circuit breaker protected)."""\n        response = await stripe_client.post(\n            "/payment_intents",\n            json={"customer": customer_id, "amount": amount},\n        )\n        return response\n\nclass EmailService:\n    @sendgrid_breaker\n    async def send_email(self, to: str, subject: str, body: str):\n        """Send email via SendGrid (circuit breaker protected)."""\n        return await sendgrid_client.post(\n            "/mail/send",\n            json={"to": to, "subject": subject, "body": body},\n        )\n\n# === FALLBACK WHEN CIRCUIT IS OPEN ===\n\nclass ResilientEmailService:\n    """Email service with fallback when SendGrid is down."""\n\n    def __init__(self, primary, fallback):\n        self.primary = primary  # SendGrid\n        self.fallback = fallback  # e.g., AWS SES\n        self.breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=60)\n\n    async def send_email(self, to: str, subject: str, body: str):\n        try:\n            return await self.breaker.call(\n                self.primary.send_email, to, subject, body\n            )\n        except CircuitBreakerOpenError:\n            # Circuit open — use fallback\n            logger.warning("SendGrid circuit open, using fallback (SES)")\n            return await self.fallback.send_email(to, subject, body)\n        except Exception:\n            # Other error — use fallback\n            logger.exception("SendGrid failed, using fallback")\n            return await self.fallback.send_email(to, subject, body)\n\n# === CIRCUIT BREAKER STATUS ENDPOINT ===\n\nfrom fastapi import APIRouter\n\nrouter = APIRouter(prefix="/admin", tags=["admin"])\n\n@router.get("/circuit-breakers")\nasync def circuit_breaker_status():\n    """Get circuit breaker status (for monitoring)."""\n    return {\n        "stripe": {\n            "state": stripe_breaker.state.value,\n            "failures": stripe_breaker.failure_count,\n            "successes": stripe_breaker.success_count,\n        },\n        "sendgrid": {\n            "state": sendgrid_breaker.state.value,\n            "failures": sendgrid_breaker.failure_count,\n            "successes": sendgrid_breaker.success_count,\n        },\n    }',
          explanation: 'Circuit breaker: CLOSED (normal) → OPEN (failing, fail fast) → HALF_OPEN (testing) → CLOSED (recovered). Prevents cascading failures when external service is down. Use fallback service when circuit is open. Monitor status via endpoint.'
        },
      ],
      lab: {
        title: 'Integrate Stripe Payments + SendGrid Email',
        objective: 'Add payment processing and email notifications to your API',
        estTime: '2-3 hours',
        difficulty: 'Advanced',
        setup: [
          'Stripe account (test mode)',
          'SendGrid account (free tier)',
          'ngrok for local webhook testing',
        ],
        steps: [
          {
            title: 'Step 1: Create Stripe client',
            instruction: 'Set up Stripe payment integration',
            code: '# src/blog/services/stripe.py\nimport httpx\nfrom blog.core.config import settings\n\nclass StripeService:\n    def __init__(self):\n        self.client = httpx.AsyncClient(\n            base_url="https://api.stripe.com/v1",\n            auth=(settings.STRIPE_SECRET_KEY, ""),\n            timeout=30.0,\n        )\n\n    async def create_payment_intent(self, amount: int, currency="usd"):\n        response = await self.client.post(\n            "/payment_intents",\n            data={"amount": amount, "currency": currency},\n        )\n        response.raise_for_status()\n        return response.json()\n\n    async def create_customer(self, email: str, name: str):\n        response = await self.client.post(\n            "/customers",\n            data={"email": email, "name": name},\n        )\n        response.raise_for_status()\n        return response.json()\n\nstripe_service = StripeService()',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Create payment endpoints',
            instruction: 'API endpoints for payments',
            code: '# src/blog/api/v1/payments.py\n@router.post("/create-payment")\nasync def create_payment(\n    amount: int,  # in cents\n    current_user: User = Depends(get_current_user),\n):\n    intent = await stripe_service.create_payment_intent(amount)\n    return {\n        "client_secret": intent["client_secret"],\n        "payment_id": intent["id"],\n    }\n\n@router.get("/payment/{payment_id}")\nasync def get_payment_status(payment_id: str):\n    payment = await stripe_service.retrieve_payment(payment_id)\n    return {"status": payment["status"], "amount": payment["amount"]}',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Set up webhook handler',
            instruction: 'Receive Stripe webhooks',
            code: '# src/blog/api/v1/webhooks.py\n@router.post("/webhooks/stripe")\nasync def stripe_webhook(\n    request: Request,\n    background_tasks: BackgroundTasks,\n    stripe_signature: str = Header(alias="Stripe-Signature"),\n):\n    payload = await request.body()\n\n    # Verify signature!\n    if not verify_stripe_signature(payload, stripe_signature):\n        raise HTTPException(400, "Invalid signature")\n\n    event = json.loads(payload)\n\n    # Process in background\n    background_tasks.add_task(process_event, event)\n\n    return {"status": "received"}\n\nasync def process_event(event):\n    if event["type"] == "payment_intent.succeeded":\n        # Update order, send email\n        pass\n    elif event["type"] == "payment_intent.payment_failed":\n        # Notify customer\n        pass',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Add SendGrid email',
            instruction: 'Send transactional emails',
            code: '# src/blog/services/email.py\nclass EmailService:\n    def __init__(self):\n        self.client = httpx.AsyncClient(\n            base_url="https://api.sendgrid.com/v3",\n            headers={"Authorization": f"Bearer {settings.SENDGRID_API_KEY}"},\n            timeout=30.0,\n        )\n\n    async def send_welcome(self, to: str, name: str):\n        await self.client.post("/mail/send", json={\n            "from": {"email": "welcome@myapp.com"},\n            "personalizations": [{"to": [{"email": to}]}],\n            "subject": "Welcome!",\n            "content": [{"type": "text/html", "value": f"<h1>Hi {name}!</h1>"}],\n        })\n\nemail_service = EmailService()\n\n# Send in background after registration\n@router.post("/register")\nasync def register(user: UserCreate, background_tasks: BackgroundTasks):\n    # ... create user ...\n    background_tasks.add_task(email_service.send_welcome, user.email, user.name)\n    return user',
            codeLanguage: 'python',
          },
          {
            title: 'Step 5: Test with ngrok',
            instruction: 'Expose local server for webhooks',
            code: '# Install ngrok\n# Run your FastAPI server\nuvicorn blog.main:app --reload\n\n# In another terminal, expose with ngrok\nngrok http 8000\n\n# Use the ngrok URL for Stripe webhook:\n# https://abc123.ngrok.io/api/v1/webhooks/stripe\n\n# Add this URL to Stripe Dashboard > Webhooks\n\n# Test: create payment in your app\n# Stripe will send webhook → your handler processes it',
            codeLanguage: 'bash',
          },
        ],
        verification: 'Payment creation works. Webhook received and verified. Email sent on registration. ngrok tunnel active.',
      },
      exercises: [
        {
          prompt: 'Write a retry decorator that retries on httpx.ConnectError with exponential backoff (1s, 2s, 4s), max 3 attempts.',
          starterCode: 'import asyncio\nimport httpx\nfrom functools import wraps\n\ndef retry_async(max_retries=3, base_delay=1):\n    # your code\n    pass\n',
          hint: 'Use asyncio.sleep with exponential backoff. Catch specific exceptions. Re-raise after max retries.',
          solution: 'import asyncio\nimport httpx\nfrom functools import wraps\n\ndef retry_async(max_retries=3, base_delay=1):\n    def decorator(func):\n        @wraps(func)\n        async def wrapper(*args, **kwargs):\n            last_exception = None\n            for attempt in range(max_retries):\n                try:\n                    return await func(*args, **kwargs)\n                except (httpx.ConnectError, httpx.TimeoutException) as e:\n                    last_exception = e\n                    if attempt < max_retries - 1:\n                        delay = base_delay * (2 ** attempt)  # 1, 2, 4\n                        print(f"Attempt {attempt+1} failed, retrying in {delay}s...")\n                        await asyncio.sleep(delay)\n            raise last_exception\n        return wrapper\n    return decorator\n\n@retry_async(max_retries=3, base_delay=1)\nasync def fetch_data(url):\n    response = await httpx.AsyncClient().get(url)\n    return response.json()',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why verify webhook signatures?',
          options: [
            'For logging',
            'Security — prevent fake webhooks from attackers',
            'Required by FastAPI',
            'For performance',
          ],
          correctIndex: 1,
          explanation: 'Without signature verification, anyone can send fake webhooks to your endpoint. Verify with HMAC — the secret is shared between you and the service (Stripe, GitHub).'
        },
        {
          question: 'Why check idempotency in webhooks?',
          options: [
            'For performance',
            'Webhooks can be sent multiple times — prevent duplicate processing',
            'Required by HTTP',
            'For security',
          ],
          correctIndex: 1,
          explanation: 'Stripe/GitHub may send the same webhook multiple times (retries, network issues). Use event_id to check if already processed. Store in Redis SET with TTL.'
        },
        {
          question: 'What does a circuit breaker do?',
          options: [
            'Improves performance',
            'Fails fast when external service is down (prevents cascading failures)',
            'Encrypts requests',
            'Required by law',
          ],
          correctIndex: 1,
          explanation: 'Circuit breaker: when external service fails repeatedly, OPEN the circuit (reject immediately instead of waiting for timeout). After recovery timeout, try again (HALF_OPEN). Prevents cascading failures.'
        },
        {
          question: 'When should you NOT retry an HTTP request?',
          options: [
            'On 500 errors',
            'On network errors',
            'On 4xx errors (client error — will fail again)',
            'On timeouts',
          ],
          correctIndex: 2,
          explanation: '4xx errors (400 Bad Request, 401 Unauthorized, 404 Not Found) are client errors — retrying will give the same result. Retry on 5xx (server error) and network errors (ConnectError, TimeoutException).'
        },
      ],
      keyTakeaways: [
        'Use httpx.AsyncClient with connection pooling (persistent client)',
        'Always set timeouts: connect, read, write, pool',
        'Retry with exponential backoff + jitter (tenacity library)',
        'Never retry on 4xx (client error), always retry on 5xx and network errors',
        'Verify webhook signatures (HMAC) — security critical',
        'Check idempotency in webhooks (sent multiple times) — use Redis SET',
        'Process webhooks in background (fast 200 response)',
        'Circuit breaker: fail fast when external service is down',
        'Circuit states: CLOSED → OPEN (failing) → HALF_OPEN (testing) → CLOSED',
        'Use fallback service when circuit is open (Stripe → AWS SES for email)',
      ],
      resources: [
        { title: 'httpx Documentation', url: 'https://www.python-httpx.org/', type: 'docs' },
        { title: 'tenacity (retry library)', url: 'https://github.com/jd/tenacity', type: 'docs' },
        { title: 'Stripe Webhooks', url: 'https://stripe.com/docs/webhooks', type: 'docs' },
        { title: 'GitHub Webhooks', url: 'https://docs.github.com/webhooks', type: 'docs' },
      ]
    },

    {
      id: 'fa-13',
      title: 'Database Advanced — Transactions, Connection Pooling, Performance',
      subtitle: 'Master database performance — transactions, N+1 queries, connection pooling, indexing',
      duration: 85,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Database performance is the #1 bottleneck in most APIs. Master: 1) Transactions (atomic operations), 2) Connection pooling (reuse connections), 3) Avoiding N+1 queries (eager loading), 4) Indexing strategy, 5) Query optimization. These separate senior engineers from juniors.',
        'Transactions ensure atomicity — all operations succeed or all fail. Use `async with session.begin():` for automatic commit/rollback. For nested transactions, use `session.begin_nested()` (savepoints). Never leave transactions open long (locks).',
        'N+1 query problem: loading 100 users with their posts fires 101 queries (1 for users + 1 per user for posts). Fix with eager loading: `selectinload(User.posts)` (2 queries total) or `joinedload(User.posts)` (1 query with JOIN). Detect with logging.',
        'Connection pooling: SQLAlchemy maintains a pool of DB connections. Default pool_size=5, max_overflow=10. For async with asyncpg, use NullPool in serverless (Lambda) to avoid connection leaks. Use pool_pre_ping=True to detect stale connections.',
      ],
      visualization: {
        title: 'N+1 Query Problem vs Eager Loading',
        type: 'comparison',
        diagram: `N+1 PROBLEM (BAD — 101 queries for 100 users):

  Query 1: SELECT * FROM users               → 100 users
  Query 2: SELECT * FROM posts WHERE user=1  → posts for user 1
  Query 3: SELECT * FROM posts WHERE user=2  → posts for user 2
  ...
  Query 101: SELECT * FROM posts WHERE user=100

  Total: 101 DB queries → SLOW (100ms+ for 100 users)


EAGER LOADING WITH selectinload (GOOD — 2 queries):

  Query 1: SELECT * FROM users               → 100 users
  Query 2: SELECT * FROM posts WHERE user IN (1,2,3,...,100)  → all posts

  Total: 2 DB queries → FAST (5ms for 100 users)


EAGER LOADING WITH joinedload (GOOD — 1 query):

  Query 1: SELECT * FROM users JOIN posts ON posts.user_id = users.id

  Total: 1 DB query → FASTEST (but larger result set)


RULE: Use selectinload by default, joinedload for one-to-one

DETECT N+1: Enable SQLAlchemy echo=True and count queries`,
        legend: [
          'N+1: 1 query loads N items, then 1 query PER ITEM for relations',
          'selectinload: 2 queries (1 for items, 1 IN query for all relations)',
          'joinedload: 1 query with JOIN (fastest, but can produce huge results)',
          'lazy="selectin" on model = always eager load (default behavior)',
          'Detect with echo=True or query counting middleware',
        ],
      },
      codeExamples: [
        {
          filename: 'transactions.py',
          language: 'python',
          code: '"""Database transactions — atomic operations."""\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy import select\nimport logging\n\nlogger = logging.getLogger(__name__)\n\n# === BASIC TRANSACTION (auto-commit) ===\n\nasync def transfer_money(\n    db: AsyncSession,\n    from_id: int,\n    to_id: int,\n    amount: float,\n):\n    """Transfer money between accounts (atomic)."""\n    try:\n        from_acct = await db.get(Account, from_id)\n        to_acct = await db.get(Account, to_id)\n\n        if from_acct.balance < amount:\n            raise ValueError("Insufficient funds")\n\n        from_acct.balance -= amount\n        to_acct.balance += amount\n\n        await db.commit()  # both changes saved atomically\n        return True\n\n    except Exception:\n        await db.rollback()  # undo ALL changes\n        raise\n\n# === EXPLICIT TRANSACTION (async with) ===\n\nasync def create_order_with_items(\n    db: AsyncSession,\n    order_data: dict,\n    items: list[dict],\n):\n    """Create order and items in one transaction."""\n    # async with session.begin() = auto commit on success, rollback on exception\n    async with db.begin():\n        # Create order\n        order = Order(**order_data)\n        db.add(order)\n        await db.flush()  # get order.id without committing\n\n        # Create items\n        for item_data in items:\n            item_data["order_id"] = order.id\n            db.add(OrderItem(**item_data))\n\n        # If we get here, commit happens automatically\n        # If exception, rollback happens automatically\n\n    return order\n\n# === NESTED TRANSACTIONS (savepoints) ===\n\nasync def complex_operation(db: AsyncSession):\n    """Nested transactions with savepoints."""\n    async with db.begin():  # outer transaction\n        # Do something\n        db.add(User(name="Alice"))\n\n        try:\n            # Nested transaction (savepoint)\n            async with db.begin_nested():\n                db.add(Post(title="Post 1", author_id=1))\n                # This might fail\n                if some_condition:\n                    raise ValueError("Something went wrong")\n                # If we get here, savepoint is released\n        except ValueError:\n            # Only the nested transaction is rolled back\n            # The outer transaction (User) is still active!\n            pass\n\n        db.add(Post(title="Post 2", author_id=1))\n        # Outer transaction commits: User + Post 2 (not Post 1)\n\n# === TRANSACTION ISOLATION LEVELS ===\n\nfrom sqlalchemy import create_engine\n\n# READ COMMITTED (default): sees committed changes from other transactions\n# REPEATABLE READ: same query returns same result within transaction\n# SERIALIZABLE: as if transactions ran one at a time (slowest, safest)\n\nengine = create_engine(\n    "postgresql://user:pass@localhost/db",\n    isolation_level="REPEATABLE READ",\n)\n\n# Per-transaction isolation\nasync def critical_operation(db: AsyncSession):\n    """Use serializable for critical operations (e.g., money transfer)."""\n    async with db.begin():\n        await db.execute(\n            text("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE")\n        )\n        # Now this transaction is serializable\n        # ... do critical operations ...\n\n# === OPTIMISTIC LOCKING (version field) ===\n\nfrom sqlalchemy import Integer, mapped_column\n\nclass Product(Base):\n    __tablename__ = "products"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str]\n    stock: Mapped[int]\n    version: Mapped[int] = mapped_column(Integer, default=1)  # optimistic lock\n\nasync def update_stock(db: AsyncSession, product_id: int, quantity: int):\n    """Update stock with optimistic locking (prevents lost updates)."""\n    async with db.begin():\n        product = await db.get(Product, product_id)\n        original_version = product.version\n\n        product.stock -= quantity\n        product.version += 1\n\n        # Flush and check if row was modified by someone else\n        await db.flush()\n\n        # If version changed, someone else modified — raise\n        result = await db.execute(\n            select(Product.version).where(Product.id == product_id)\n        )\n        if result.scalar() != product.version:\n            raise ConcurrentModificationError(\n                "Product was modified by another transaction"\n            )\n\n# === PESSIMISTIC LOCKING (SELECT FOR UPDATE) ===\n\nfrom sqlalchemy import text\n\nasync def transfer_with_lock(db: AsyncSession, from_id: int, to_id: int, amount: float):\n    """Transfer with pessimistic locking (prevents concurrent modifications)."""\n    async with db.begin():\n        # Lock the rows (other transactions wait)\n        result = await db.execute(\n            text("SELECT * FROM accounts WHERE id = :id FOR UPDATE"),\n            {"id": from_id},\n        )\n        from_acct = result.fetchone()\n\n        result = await db.execute(\n            text("SELECT * FROM accounts WHERE id = :id FOR UPDATE"),\n            {"id": to_id},\n        )\n        to_acct = result.fetchone()\n\n        # Now we have exclusive lock on both rows\n        # No other transaction can modify them until we commit\n\n        if from_acct.balance < amount:\n            raise ValueError("Insufficient funds")\n\n        await db.execute(\n            text("UPDATE accounts SET balance = balance - :amt WHERE id = :id"),\n            {"amt": amount, "id": from_id},\n        )\n        await db.execute(\n            text("UPDATE accounts SET balance = balance + :amt WHERE id = :id"),\n            {"amt": amount, "id": to_id},\n        )',
          explanation: 'Transactions: async with db.begin() for auto commit/rollback. Nested: begin_nested() for savepoints. Isolation levels: READ COMMITTED (default), REPEATABLE READ, SERIALIZABLE. Optimistic: version field. Pessimistic: SELECT FOR UPDATE.'
        },
        {
          filename: 'eager_loading.py',
          language: 'python',
          code: '"""Avoid N+1 queries with eager loading."""\nfrom sqlalchemy import select\nfrom sqlalchemy.orm import selectinload, joinedload, subqueryload\nfrom sqlalchemy.ext.asyncio import AsyncSession\n\n# === N+1 PROBLEM (BAD) ===\n\nasync def get_users_with_posts_bad(db: AsyncSession):\n    """N+1: 1 query for users + N queries for posts."""\n    result = await db.execute(select(User))\n    users = result.scalars().all()\n\n    for user in users:  # 100 users\n        print(user.posts)  # Each access fires a query!\n\n    # Total: 101 queries (1 + 100)\n    # 100 users: ~500ms\n\n# === FIX 1: selectinload (RECOMMENDED) ===\n\nasync def get_users_with_posts_good(db: AsyncSession):\n    """selectinload: 2 queries total."""\n    stmt = select(User).options(selectinload(User.posts))\n    result = await db.execute(stmt)\n    users = result.scalars().all()\n\n    for user in users:\n        print(user.posts)  # already loaded!\n\n    # Total: 2 queries\n    # Query 1: SELECT * FROM users\n    # Query 2: SELECT * FROM posts WHERE user_id IN (1,2,3,...,100)\n    # 100 users: ~10ms\n\n# === FIX 2: joinedload (1 query) ===\n\nasync def get_users_with_posts_joined(db: AsyncSession):\n    """joinedload: 1 query with JOIN."""\n    stmt = select(User).options(joinedload(User.posts))\n    result = await db.execute(stmt)\n    users = result.scalars().all()\n\n    # Total: 1 query\n    # SELECT * FROM users JOIN posts ON posts.user_id = users.id\n    # 100 users: ~8ms (fastest, but larger result set)\n\n# === CHOOSE: selectinload vs joinedload ===\n# selectinload: separate IN query (better for collections, avoids duplicates)\n# joinedload: single JOIN (better for one-to-one, smaller collections)\n# Rule: use selectinload for one-to-many, joinedload for one-to-one/many-to-one\n\n# === MULTIPLE RELATIONS ===\n\nasync def get_posts_with_everything(db: AsyncSession):\n    """Load posts with author, comments, and tags."""\n    stmt = (\n        select(Post)\n        .options(\n            joinedload(Post.author),  # one-to-one (join)\n            selectinload(Post.comments),  # one-to-many (IN query)\n            selectinload(Post.tags),  # many-to-many (IN query)\n        )\n        .where(Post.published == True)\n    )\n    result = await db.execute(stmt)\n    return result.scalars().all()\n\n    # 3 queries total:\n    # 1. SELECT * FROM posts JOIN users ON ...\n    # 2. SELECT * FROM comments WHERE post_id IN (...)\n    # 3. SELECT * FROM tags JOIN post_tags WHERE post_id IN (...)\n\n# === NESTED EAGER LOADING ===\n\nasync def get_users_with_posts_and_comments(db: AsyncSession):\n    """Load users → their posts → comments on those posts."""\n    stmt = (\n        select(User)\n        .options(\n            selectinload(User.posts).selectinload(Post.comments)\n        )\n    )\n    result = await db.execute(stmt)\n    return result.scalars().all()\n\n    # 3 queries:\n    # 1. SELECT * FROM users\n    # 2. SELECT * FROM posts WHERE user_id IN (...)\n    # 3. SELECT * FROM comments WHERE post_id IN (...)\n\n# === LAZY LOADING CONFIGURATION (model level) ===\n\nclass User(Base):\n    __tablename__ = "users"\n\n    posts: Mapped[list["Post"]] = relationship(\n        back_populates="author",\n        lazy="selectin",  # ALWAYS eager load (default for this relation)\n    )\n\n# Options:\n# lazy="select" (default): lazy load (N+1 risk!)\n# lazy="selectin": eager load with IN query (recommended)\n# lazy="joined": eager load with JOIN\n# lazy="raise": raise exception if accessed without eager loading (catches N+1!)\n# lazy="noload": always return empty (disable relation)\n\n# === DETECT N+1 WITH RAISE ===\n\nclass User(Base):\n    posts: Mapped[list["Post"]] = relationship(\n        lazy="raise",  # force developers to be explicit\n    )\n\n# Now: accessing user.posts without eager loading raises exception\n# Forces developers to use selectinload/joinedload explicitly\n\n# === QUERY COUNTING (for testing) ===\n\nfrom sqlalchemy import event\n\nquery_count = 0\n\n@event.listens_for(engine.sync_engine, "before_cursor_execute")\ndef count_queries(conn, cursor, statement, parameters, context, executemany):\n    global query_count\n    query_count += 1\n    logger.debug(f"Query {query_count}: {statement[:100]}...")\n\n# In tests:\nasync def test_no_n_plus_one():\n    global query_count\n    query_count = 0\n\n    users = await get_users_with_posts(db)\n    for user in users:\n        _ = user.posts  # should not fire query\n\n    assert query_count <= 2  # max 2 queries (users + posts)\n\n# === BULK OPERATIONS (avoid loops) ===\n\n# BAD: 1000 INSERT queries\nfor user in users:\n    db.add(user)\nawait db.commit()\n\n# GOOD: 1 INSERT with all values\nfrom sqlalchemy import insert\n\nawait db.execute(\n    insert(User),\n    [{"name": u.name, "email": u.email} for u in users]\n)\nawait db.commit()\n\n# Bulk update\nfrom sqlalchemy import update\n\nawait db.execute(\n    update(User)\n    .where(User.is_active == True)\n    .values(is_active=False)\n)\nawait db.commit()  # 1 query updates all',
          explanation: 'selectinload: 2 queries (recommended for collections). joinedload: 1 query (for one-to-one). lazy="selectin" on model for always-eager. lazy="raise" to catch N+1 in development. Use bulk insert/update instead of loops.'
        },
        {
          filename: 'indexing.py',
          language: 'python',
          code: '"""Database indexing strategy and query optimization."""\nfrom sqlalchemy import Index, String, Integer, ForeignKey, text\nfrom sqlalchemy.orm import mapped_column\nimport logging\n\nlogger = logging.getLogger(__name__)\n\n# === INDEXING STRATEGY ===\n\nclass User(Base):\n    __tablename__ = "users"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)  # lookup by email\n    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)  # lookup by username\n    name: Mapped[str] = mapped_column(String(100))  # no index (rarely filtered)\n    is_active: Mapped[bool] = mapped_column(default=True)  # no index (low cardinality)\n    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow, index=True)  # sort by date\n\nclass Post(Base):\n    __tablename__ = "posts"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str] = mapped_column(String(200), index=True)  # search by title\n    slug: Mapped[str] = mapped_column(String(200), unique=True, index=True)  # lookup by slug\n    published: Mapped[bool] = mapped_column(default=False, index=True)  # filter by published\n    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)  # join by author\n    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow, index=True)\n\n    # COMPOSITE INDEX (multiple columns)\n    __table_args__ = (\n        # For: WHERE published=True ORDER BY created_at DESC\n        Index("ix_posts_published_created", "published", "created_at"),\n        # For: WHERE author_id=? AND published=True\n        Index("ix_posts_author_published", "author_id", "published"),\n    )\n\n# === WHEN TO INDEX ===\n# DO index:\n# - Foreign keys (joins)\n# - Columns in WHERE clauses\n# - Columns in ORDER BY / GROUP BY\n# - Columns with UNIQUE constraint\n#\n# DO NOT index:\n# - Low cardinality (boolean, gender — won\'t use index anyway)\n# - Frequently updated columns (index maintenance overhead)\n# - Small tables (seq scan is faster)\n# - Columns never used in queries\n\n# === ANALYZE QUERY PERFORMANCE ===\n\nasync def analyze_query(db: AsyncSession):\n    """Use EXPLAIN ANALYZE to see query plan."""\n    result = await db.execute(\n        text("EXPLAIN ANALYZE SELECT * FROM users WHERE email = \'alice@x.com\'")\n    )\n    for row in result:\n        print(row[0])\n\n    # Look for:\n    # - Seq Scan (BAD — full table scan)\n    # - Index Scan (GOOD — uses index)\n    # - Index Only Scan (BEST — all data from index)\n\n# === COMMON OPTIMIZATIONS ===\n\n# 1. Use EXISTS instead of COUNT\n# BAD: SELECT COUNT(*) FROM posts WHERE author_id = 1\n# GOOD: SELECT EXISTS(SELECT 1 FROM posts WHERE author_id = 1)\n\nasync def user_has_posts(db: AsyncSession, user_id: int) -> bool:\n    result = await db.execute(\n        select(func.exists().where(Post.author_id == user_id))\n    )\n    return result.scalar()\n\n# 2. Use LIMIT with ORDER BY (dont sort entire table)\nasync def get_latest_posts(db: AsyncSession, limit: int = 10):\n    stmt = (\n        select(Post)\n        .where(Post.published == True)\n        .order_by(Post.created_at.desc())\n        .limit(limit)  # only fetch N rows\n    )\n    return (await db.execute(stmt)).scalars().all()\n\n# 3. Use OFFSET for pagination (or keyset for large tables)\nasync def paginate_posts(db: AsyncSession, page: int, per_page: int = 20):\n    # Simple (works for small datasets)\n    stmt = (\n        select(Post)\n        .order_by(Post.created_at.desc())\n        .offset((page - 1) * per_page)\n        .limit(per_page)\n    )\n    return (await db.execute(stmt)).scalars().all()\n\n# Keyset pagination (better for large datasets — no offset scanning)\nasync def paginate_keyset(db: AsyncSession, last_id: int = 0, limit: int = 20):\n    stmt = (\n        select(Post)\n        .where(Post.id > last_id)  # instead of OFFSET\n        .order_by(Post.id.asc())\n        .limit(limit)\n    )\n    return (await db.execute(stmt)).scalars().all()\n\n# 4. Select only needed columns (not SELECT *)\nasync def get_post_titles(db: AsyncSession):\n    # BAD: select(Post) — fetches ALL columns\n    # GOOD: select(Post.id, Post.title) — only needed columns\n    stmt = select(Post.id, Post.title).where(Post.published == True)\n    result = await db.execute(stmt)\n    return result.all()  # list of Row objects\n\n# 5. Use covering indexes (index includes all needed columns)\n# CREATE INDEX ix_posts_published_title ON posts(published, title)\n# Now: SELECT title FROM posts WHERE published = True\n# Uses index only — no table access!\n\n# === CONNECTION POOL TUNING ===\n\nfrom sqlalchemy.ext.asyncio import create_async_engine\n\nengine = create_async_engine(\n    "postgresql+asyncpg://user:pass@localhost/db",\n    pool_size=20,          # base connections\n    max_overflow=10,       # extra connections under load (total: 30)\n    pool_timeout=30,       # wait 30s for connection before erroring\n    pool_recycle=3600,     # recycle connections after 1 hour\n    pool_pre_ping=True,    # check connection health before use\n    echo=False,            # set True to log all SQL (debugging only!)\n)\n\n# === FOR SERVERLESS (AWS Lambda) ===\n# Use NullPool — no connection pooling (each invocation creates fresh connection)\nfrom sqlalchemy.pool import NullPool\n\nserverless_engine = create_async_engine(\n    "postgresql+asyncpg://...",\n    poolclass=NullPool,  # no pool (Lambda has no persistent state)\n)\n\n# === MONITOR SLOW QUERIES ===\n\nimport time\n\n@event.listens_for(engine.sync_engine, "before_cursor_execute")\ndef before_query(conn, cursor, statement, parameters, context, executemany):\n    context._query_start = time.perf_counter()\n\n@event.listens_for(engine.sync_engine, "after_cursor_execute")\ndef after_query(conn, cursor, statement, parameters, context, executemany):\n    elapsed = time.perf_counter() - context._query_start\n    if elapsed > 0.1:  # log queries slower than 100ms\n        logger.warning(\n            f"Slow query ({elapsed:.3f}s): {statement[:200]}..."\n        )',
          explanation: 'Index: FKs, WHERE/ORDER BY columns, unique constraints. Composite indexes for multi-column queries. Use EXPLAIN ANALYZE to find slow queries. Keyset pagination > OFFSET for large tables. Select only needed columns. Monitor slow queries.'
        },
      ],
      lab: {
        title: 'Optimize Database Performance',
        objective: 'Fix N+1 queries, add indexes, optimize slow queries',
        estTime: '90 minutes',
        difficulty: 'Advanced',
        setup: [
          'Blog API with database from previous lessons',
          'Generate test data (1000+ posts)',
        ],
        steps: [
          {
            title: 'Step 1: Generate test data',
            instruction: 'Create 1000 posts for testing',
            code: '# scripts/generate_data.py\nimport asyncio\nfrom blog.db.base import async_session\nfrom blog.models.post import Post\nfrom blog.models.user import User\n\nasync def generate():\n    async with async_session() as db:\n        # Create 10 users\n        for i in range(10):\n            db.add(User(\n                email=f"user{i}@test.com",\n                username=f"user{i}",\n                name=f"User {i}",\n                hashed_password="x",\n            ))\n        await db.commit()\n\n        # Create 1000 posts\n        for i in range(1000):\n            db.add(Post(\n                title=f"Post {i}",\n                slug=f"post-{i}",\n                content=f"Content {i}",\n                author_id=(i % 10) + 1,\n                published=True,\n            ))\n        await db.commit()\n\nasyncio.run(generate())',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Find N+1 queries',
            instruction: 'Enable query logging and find N+1',
            code: '# Enable SQL logging\nimport logging\nlogging.basicConfig()\nlogging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)\n\n# Or add echo=True to engine\nengine = create_async_engine(DATABASE_URL, echo=True)\n\n# Now call your endpoint and count queries:\n# GET /users — should see 1 query for users + 1 per user for posts = N+1!\n# Fix with selectinload:',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Fix N+1 with eager loading',
            instruction: 'Add selectinload to queries',
            code: '# Before (N+1):\nstmt = select(User)\nusers = (await db.execute(stmt)).scalars().all()\nfor u in users:\n    print(u.posts)  # query per user!\n\n# After (2 queries):\nfrom sqlalchemy.orm import selectinload\nstmt = select(User).options(selectinload(User.posts))\nusers = (await db.execute(stmt)).scalars().all()\nfor u in users:\n    print(u.posts)  # already loaded!\n\n# Or set on model:\nclass User(Base):\n    posts = relationship(lazy="selectin")  # always eager',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Add missing indexes',
            instruction: 'Find slow queries and add indexes',
            code: '# Find slow queries with EXPLAIN ANALYZE\nSELECT * FROM posts WHERE published = true ORDER BY created_at DESC LIMIT 10;\n# If Seq Scan → add index\n\n# Add composite index:\n# CREATE INDEX ix_posts_published_created ON posts(published, created_at);\n\n# In SQLAlchemy model:\nclass Post(Base):\n    __table_args__ = (\n        Index("ix_posts_published_created", "published", "created_at"),\n    )\n\n# Create Alembic migration:\nalembic revision --autogenerate -m "add indexes"\nalembic upgrade head',
            codeLanguage: 'python',
          },
          {
            title: 'Step 5: Benchmark improvement',
            instruction: 'Compare before/after performance',
            code: '# Benchmark with ab:\nab -n 100 -c 10 http://localhost:8000/api/v1/posts\n\n# Before optimization:\n# Time per request: 200ms (N+1 queries, no indexes)\n# Requests per second: 50\n\n# After optimization:\n# Time per request: 20ms (eager loading, indexed)\n# Requests per second: 500\n# 10x improvement!\n\n# Add slow query logging:\n@event.listens_for(engine.sync_engine, "after_cursor_execute")\ndef log_slow(conn, cursor, statement, parameters, context, executemany):\n    elapsed = time.perf_counter() - context._query_start\n    if elapsed > 0.1:  # > 100ms\n        logger.warning(f"Slow query: {statement[:200]}")',
            codeLanguage: 'bash',
          },
        ],
        verification: 'N+1 queries eliminated. All queries use indexes. 10x performance improvement. No slow queries.',
      },
      exercises: [
        {
          prompt: 'Write a query to get all posts with their authors and tags, avoiding N+1. Should be 3 queries max.',
          starterCode: 'from sqlalchemy import select\nfrom sqlalchemy.orm import selectinload, joinedload\n\n# your query\n',
          hint: 'Use joinedload for author (one-to-one), selectinload for tags (many-to-many).',
          solution: 'from sqlalchemy import select\nfrom sqlalchemy.orm import selectinload, joinedload\n\nstmt = (\n    select(Post)\n    .options(\n        joinedload(Post.author),  # 1 query with JOIN\n        selectinload(Post.tags),   # 1 IN query\n    )\n    .where(Post.published == True)\n)\nresult = await db.execute(stmt)\nposts = result.scalars().all()\n# Total: 2 queries (1 for posts+author, 1 for tags)\n# Accessing post.author and post.tags fires NO additional queries',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is the N+1 query problem?',
          options: [
            'N queries for 1 item',
            '1 query loads N items, then 1 query PER ITEM for relations (N+1 total)',
            'N+1 indexes needed',
            'Network latency',
          ],
          correctIndex: 1,
          explanation: 'N+1: 1 query loads N items (e.g., 100 users), then 1 query PER ITEM to load relations (100 queries for posts). Total: 101 queries. Fix with selectinload (2 queries).'
        },
        {
          question: 'Which is better: selectinload or joinedload?',
          options: [
            'joinedload always',
            'selectinload for one-to-many (collections), joinedload for one-to-one',
            'selectinload always',
            'They are identical',
          ],
          correctIndex: 1,
          explanation: 'selectinload uses separate IN query (better for collections, avoids duplicate rows). joinedload uses JOIN (better for one-to-one, smaller relations). Rule: selectinload for collections, joinedload for scalars.'
        },
        {
          question: 'When should you NOT add a database index?',
          options: [
            'On foreign keys',
            'On low-cardinality columns (boolean, gender)',
            'On columns in WHERE clauses',
            'On unique columns',
          ],
          correctIndex: 1,
          explanation: 'Low-cardinality columns (boolean, gender) do not benefit from indexes — the query planner uses a sequential scan anyway. Index overhead (maintenance, storage) outweighs benefit.'
        },
        {
          question: 'What does SELECT FOR UPDATE do?',
          options: [
            'Selects and locks rows until transaction ends (pessimistic locking)',
            'Updates selected rows',
            'Faster SELECT',
            'Required by PostgreSQL',
          ],
          correctIndex: 1,
          explanation: 'SELECT FOR UPDATE locks the rows so no other transaction can modify them until you commit/rollback. Used for pessimistic locking (e.g., money transfer — prevent concurrent modifications).'
        },
      ],
      keyTakeaways: [
        'Transactions: async with db.begin() for atomic operations (auto commit/rollback)',
        'Nested transactions: db.begin_nested() for savepoints',
        'N+1 problem: 1 query + N queries for relations — use selectinload/joinedload',
        'selectinload: 2 queries (recommended for collections)',
        'joinedload: 1 query with JOIN (for one-to-one relations)',
        'lazy="selectin" on model for always-eager, lazy="raise" to catch N+1',
        'Index: foreign keys, WHERE/ORDER BY columns, unique constraints',
        'Composite indexes for multi-column queries',
        'Keyset pagination (WHERE id > last_id) > OFFSET for large tables',
        'Select only needed columns, use EXISTS instead of COUNT',
        'Connection pooling: pool_size, max_overflow, pool_pre_ping=True',
        'Use NullPool for serverless (AWS Lambda)',
      ],
      resources: [
        { title: 'SQLAlchemy 2.0 — Loading', url: 'https://docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html', type: 'docs' },
        { title: 'PostgreSQL EXPLAIN', url: 'https://www.postgresql.org/docs/current/sql-explain.html', type: 'docs' },
        { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'book', isHiddenGem: true },
      ]
    },

    {
      id: 'fa-14',
      title: 'Celery Background Tasks — Async Jobs, Scheduled Tasks, Workers',
      subtitle: 'Heavy background processing with Celery + Redis — emails, ML training, reports',
      duration: 80,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'FastAPI BackgroundTasks are for SHORT tasks (send email, log event). For HEAVY work (ML training, video processing, report generation, batch jobs), use Celery. Celery runs in separate worker processes, uses Redis/RabbitMQ as broker, supports retries, scheduling, monitoring.',
        'Celery architecture: 1) Your FastAPI app calls task.delay() (puts message on broker), 2) Worker process picks up message and executes task, 3) Results stored in result backend (optional). Workers scale horizontally — run as many as you need.',
        'Common patterns: .delay() for fire-and-forget, .apply_async(countdown=60) for delayed execution, chains for sequential tasks, groups for parallel, chords for fan-out-fan-in. Use @task(bind=True) for self-retry with exponential backoff.',
        'Always set time limits (soft_time_limit, time_limit) — a stuck task can hang a worker. Use idempotent tasks (safe to retry). Store progress for long tasks. Use celery beat for periodic tasks (cron-like). Monitor with Flower.',
      ],
      codeExamples: [
        {
          filename: 'celery_setup.py',
          language: 'python',
          code: '"""Celery setup — background task processing."""\nfrom celery import Celery\nfrom celery.schedules import crontab\nfrom blog.core.config import settings\nimport logging\n\nlogger = logging.getLogger(__name__)\n\n# Create Celery app\ncelery_app = Celery(\n    "blog",\n    broker=settings.REDIS_URL,        # message queue (Redis/RabbitMQ)\n    backend=settings.REDIS_URL,        # result storage\n    include=["blog.tasks"],            # task modules to load\n)\n\n# Configuration\ncelery_app.conf.update(\n    # Serialization\n    task_serializer="json",\n    accept_content=["json"],\n    result_serializer="json",\n    timezone="UTC",\n    enable_utc=True,\n\n    # Time limits (CRITICAL — stuck tasks hang workers!)\n    task_time_limit=300,         # hard kill after 5 min\n    task_soft_time_limit=240,    # soft limit at 4 min (raise SoftTimeLimitExceeded)\n\n    # Reliability\n    task_acks_late=True,          # acknowledge AFTER completion (crash-safe)\n    worker_prefetch_multiplier=1, # fair scheduling (dont hoard tasks)\n    task_reject_on_worker_lost=True, # re-queue if worker crashes\n\n    # Retries\n    task_default_max_retries=3,\n    task_default_retry_delay=60,  # 1 min between retries\n\n    # Results\n    result_expires=3600,          # results expire after 1 hour\n    task_ignore_result=True,      # dont store results (unless needed)\n\n    # Monitoring\n    worker_send_task_events=True,\n    task_send_sent_event=True,\n)\n\n# === SCHEDULED TASKS (celery beat) ===\n\ncelery_app.conf.beat_schedule = {\n    # Send daily digest email at 9 AM\n    "send-daily-digest": {\n        "task": "blog.tasks.send_daily_digest",\n        "schedule": crontab(hour=9, minute=0),\n    },\n    # Clean up expired sessions every hour\n    "cleanup-sessions": {\n        "task": "blog.tasks.cleanup_expired_sessions",\n        "schedule": crontab(minute=0),  # every hour\n    },\n    # Generate weekly report every Monday at 8 AM\n    "weekly-report": {\n        "task": "blog.tasks.generate_weekly_report",\n        "schedule": crontab(hour=8, minute=0, day_of_week=1),\n    },\n    # Health check every 5 minutes\n    "health-check": {\n        "task": "blog.tasks.health_check",\n        "schedule": 300.0,  # 5 minutes\n    },\n}\n\n# === DEFINE TASKS ===\n\n@celery_app.task(bind=True)\ndef send_welcome_email(self, user_id: int):\n    """Send welcome email to new user."""\n    try:\n        user = get_user_by_id(user_id)\n        send_email(\n            to=user.email,\n            subject="Welcome to Blog!",\n            body=f"Hi {user.name}, welcome!"\n        )\n        logger.info(f"Welcome email sent to {user.email}")\n    except Exception as e:\n        logger.error(f"Failed to send welcome email: {e}")\n        raise self.retry(exc=e, countdown=60)  # retry in 1 min\n\n@celery_app.task(bind=True, max_retries=3)\ndef process_image(self, image_path: str):\n    """Process uploaded image (resize, optimize)."""\n    try:\n        # Simulate slow processing\n        import time\n        time.sleep(30)\n\n        # Resize image\n        resize_image(image_path, sizes=[(800, 600), (400, 300)])\n\n        # Optimize\n        optimize_image(image_path)\n\n        logger.info(f"Image processed: {image_path}")\n\n    except SoftTimeLimitExceeded:\n        logger.warning(f"Image processing timed out: {image_path}")\n        raise\n    except Exception as e:\n        logger.error(f"Image processing failed: {e}")\n        # Retry with exponential backoff\n        raise self.retry(\n            exc=e,\n            countdown=2 ** self.request.retries,  # 1, 2, 4 seconds\n        )\n\n@celery_app.task(bind=True)\ndef train_ml_model(self, dataset_path: str, model_type: str = "random_forest"):\n    """Train ML model (very long task)."""\n    try:\n        # Update progress\n        self.update_state(\n            state="PROGRESS",\n            meta={"current": 0, "total": 100, "status": "Loading data..."}\n        )\n\n        # Load data\n        data = load_data(dataset_path)\n\n        self.update_state(\n            state="PROGRESS",\n            meta={"current": 25, "total": 100, "status": "Preprocessing..."}\n        )\n\n        # Preprocess\n        X, y = preprocess(data)\n\n        self.update_state(\n            state="PROGRESS",\n            meta={"current": 50, "total": 100, "status": "Training..."}\n        )\n\n        # Train\n        model = train(X, y, model_type=model_type)\n\n        self.update_state(\n            state="PROGRESS",\n            meta={"current": 75, "total": 100, "status": "Evaluating..."}\n        )\n\n        # Evaluate\n        score = evaluate(model, X, y)\n\n        self.update_state(\n            state="PROGRESS",\n            meta={"current": 90, "total": 100, "status": "Saving..."}\n        )\n\n        # Save model\n        save_model(model, f"models/{model_type}_{int(time.time())}.pkl")\n\n        return {"status": "SUCCESS", "score": score}\n\n    except SoftTimeLimitExceeded:\n        return {"status": "TIMEOUT", "message": "Training timed out"}\n    except Exception as e:\n        return {"status": "FAILED", "error": str(e)}\n\n# === CALL TASKS FROM FASTAPI ===\n\nfrom fastapi import APIRouter, BackgroundTasks\nfrom blog.tasks import send_welcome_email, process_image, train_ml_model\n\nrouter = APIRouter()\n\n@router.post("/register")\nasync def register(user: UserCreate):\n    # ... create user ...\n\n    # Option 1: FastAPI BackgroundTasks (simple, short tasks)\n    # background_tasks.add_task(send_welcome_email, user.id)\n\n    # Option 2: Celery (for heavy/long tasks — RECOMMENDED)\n    send_welcome_email.delay(user.id)  # async, returns immediately\n\n    return user\n\n@router.post("/upload-image")\nasync def upload_image(file: UploadFile):\n    # Save file\n    file_path = f"uploads/{file.filename}"\n    # ... save ...\n\n    # Queue processing (heavy task → Celery, not BackgroundTasks)\n    process_image.delay(file_path)\n\n    return {"message": "Upload received, processing in background"}\n\n@router.post("/train-model")\nasync def start_training(dataset: str, model_type: str = "rf"):\n    """Start ML training (long task)."""\n    # Queue task\n    task = train_ml_model.delay(dataset, model_type)\n\n    return {\n        "task_id": task.id,\n        "status": "STARTED",\n        "check_status": f"/tasks/{task.id}"\n    }\n\n@router.get("/tasks/{task_id}")\nasync def get_task_status(task_id: str):\n    """Check task status and progress."""\n    from celery.result import AsyncResult\n\n    result = AsyncResult(task_id, app=celery_app)\n\n    if result.state == "PENDING":\n        return {"status": "PENDING", "message": "Task waiting to start"}\n    elif result.state == "PROGRESS":\n        return {\n            "status": "PROGRESS",\n            "progress": result.info,\n        }\n    elif result.state == "SUCCESS":\n        return {"status": "SUCCESS", "result": result.result}\n    elif result.state == "FAILURE":\n        return {"status": "FAILED", "error": str(result.info)}\n    else:\n        return {"status": result.state}',
          explanation: 'Celery for heavy tasks (ML, video, reports). .delay() for fire-and-forget. update_state() for progress tracking. Set time limits! task_acks_late=True for crash safety. celery beat for scheduled tasks.'
        },
        {
          filename: 'task_patterns.py',
          language: 'python',
          code: '"""Advanced Celery patterns — chains, groups, chords."""\nfrom celery import chain, group, chord\nfrom blog.tasks import celery_app\n\n# === CHAIN — sequential tasks (output of one feeds into next) ===\n\n@celery_app.task\ndef download_file(url: str) -> str:\n    """Download file from URL."""\n    # ... download ...\n    return f"/tmp/{hash(url)}"\n\n@celery_app.task\ndef process_file(file_path: str) -> str:\n    """Process downloaded file."""\n    # ... process ...\n    return file_path.replace("file", "processed")\n\n@celery_app.task\ndef upload_result(file_path: str) -> str:\n    """Upload processed file."""\n    # ... upload ...\n    return f"s3://bucket/{file_path}"\n\n# Chain: download → process → upload (each passes result to next)\nworkflow = chain(\n    download_file.s("https://example.com/data.csv"),\n    process_file.s(),\n    upload_result.s(),\n)\nresult = workflow.apply_async()\nprint(result.get())  # final result: "s3://bucket/..."\n\n# === GROUP — parallel tasks (all run at once) ===\n\n@celery_app.task\ndef fetch_user_data(user_id: int) -> dict:\n    """Fetch data for one user."""\n    return {"id": user_id, "data": "..."}\n\n# Group: fetch data for 10 users in parallel\nuser_ids = list(range(1, 11))\njob = group(fetch_user_data.s(uid) for uid in user_ids)\nresult = job.apply_async()\n\n# Wait for all to complete\nresults = result.get()  # list of results in order\n# [{"id": 1, ...}, {"id": 2, ...}, ...]\n\n# === CHORD — group + callback (fan-out, then reduce) ===\n\n@celery_app.task\ndef process_chunk(chunk: list) -> int:\n    """Process a chunk of data."""\n    return sum(chunk)\n\n@celery_app.task\ndef aggregate_results(results: list[int]) -> int:\n    """Aggregate all chunk results."""\n    return sum(results)\n\n# Chord: process 10 chunks in parallel, then aggregate\ndata = list(range(100))\nchunks = [data[i::10] for i in range(10)]  # 10 chunks\n\nworkflow = chord(\n    [process_chunk.s(chunk) for chunk in chunks],\n    aggregate_results.s(),  # callback after all chunks done\n)\nresult = workflow.apply_async()\nprint(result.get())  # total sum\n\n# === REAL-WORLD: SEND BULK EMAILS ===\n\n@celery_app.task(bind=True, max_retries=3)\ndef send_email(self, to: str, subject: str, body: str):\n    """Send single email."""\n    try:\n        # ... sendgrid ...\n        pass\n    except Exception as e:\n        raise self.retry(exc=e, countdown=2 ** self.request.retries)\n\n@celery_app.task\ndef send_bulk_emails(recipients: list[dict]):\n    """Send bulk emails in parallel."""\n    job = group(\n        send_email.s(r["email"], r["subject"], r["body"])\n        for r in recipients\n    )\n    result = job.apply_async()\n    return result.id  # track progress\n\n# === REAL-WORLD: ML PIPELINE ===\n\n@celery_app.task\ndef fetch_data(source: str) -> str:\n    """Fetch training data."""\n    return f"/data/{source}.csv"\n\n@celery_app.task\ndef preprocess(data_path: str) -> str:\n    """Preprocess data."""\n    return f"/processed/{data_path}"\n\n@celery_app.task(bind=True)\ndef train_model(self, data_path: str) -> dict:\n    """Train model."""\n    self.update_state(state="PROGRESS", meta={"progress": 50})\n    # ... train ...\n    return {"model_path": "/models/model.pkl", "accuracy": 0.95}\n\n@celery_app.task\ndef evaluate_model(model_info: dict) -> dict:\n    """Evaluate model."""\n    # ... evaluate ...\n    return {**model_info, "evaluated": True}\n\n@celery_app.task\ndef deploy_model(model_info: dict) -> str:\n    """Deploy model to production."""\n    return f"Deployed: {model_info[\'model_path\']}"\n\n# Full ML pipeline\npipeline = chain(\n    fetch_data.s("dataset_v1"),\n    preprocess.s(),\n    train_model.s(),\n    evaluate_model.s(),\n    deploy_model.s(),\n)\nresult = pipeline.apply_async()\nprint(result.get())  # "Deployed: /models/model.pkl"\n\n# === TASK RETRY WITH BACKOFF ===\n\n@celery_app.task(bind=True, max_retries=5)\ndef call_external_api(self, url: str):\n    """Call external API with retry."""\n    try:\n        response = requests.get(url, timeout=10)\n        response.raise_for_status()\n        return response.json()\n    except (ConnectionError, TimeoutError) as e:\n        # Network error — retry with exponential backoff\n        raise self.retry(\n            exc=e,\n            countdown=2 ** self.request.retries,  # 1, 2, 4, 8, 16 seconds\n            max_retries=5,\n        )\n    except HTTPError as e:\n        if e.response.status_code >= 500:\n            # Server error — retry\n            raise self.retry(exc=e, countdown=60)\n        else:\n            # Client error — do not retry\n            raise\n\n# === IDEMPOTENT TASKS ===\n# Tasks may be executed multiple times (retries, redelivery)\n# Make them idempotent — safe to run multiple times\n\n@celery_app.task(bind=True)\ndef process_payment(self, payment_id: str):\n    """Process payment (idempotent — safe to retry)."""\n    # Check if already processed\n    payment = get_payment(payment_id)\n    if payment.status == "completed":\n        return {"status": "already_processed"}  # idempotent!\n\n    # Process\n    charge_customer(payment)\n    payment.status = "completed"\n    save_payment(payment)\n\n    return {"status": "processed"}\n\n# === RUN CELERY WORKER ===\n# celery -A blog.tasks worker --loglevel=info --concurrency=4\n# celery -A blog.tasks beat --loglevel=info  # for scheduled tasks\n# celery -A blog.tasks flower  # monitoring dashboard',
          explanation: 'Chains: sequential (output feeds next). Groups: parallel (all at once). Chords: fan-out + reduce. Use .s() for signatures. Make tasks idempotent (safe to retry). Exponential backoff for retries.'
        },
      ],
      lab: {
        title: 'Add Background Processing to Your API',
        objective: 'Set up Celery for emails, image processing, and scheduled tasks',
        estTime: '90-120 minutes',
        difficulty: 'Advanced',
        setup: [
          'Redis running (from previous lessons)',
          'pip install celery flower',
        ],
        steps: [
          {
            title: 'Step 1: Set up Celery',
            instruction: 'Create Celery app and config',
            code: '# src/blog/core/celery.py\nfrom celery import Celery\nfrom blog.core.config import settings\n\ncelery_app = Celery(\n    "blog",\n    broker=settings.REDIS_URL,\n    backend=settings.REDIS_URL,\n    include=["blog.tasks"],\n)\n\ncelery_app.conf.update(\n    task_serializer="json",\n    accept_content=["json"],\n    timezone="UTC",\n    enable_utc=True,\n    task_time_limit=300,\n    task_soft_time_limit=240,\n    task_acks_late=True,\n    worker_prefetch_multiplier=1,\n)\n\n# src/blog/tasks.py\nfrom blog.core.celery import celery_app\nimport logging\n\nlogger = logging.getLogger(__name__)\n\n@celery_app.task(bind=True, max_retries=3)\ndef send_email_task(self, to: str, subject: str, body: str):\n    try:\n        # send email via SendGrid\n        pass\n    except Exception as e:\n        raise self.retry(exc=e, countdown=2 ** self.request.retries)',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Add tasks for common operations',
            instruction: 'Email, image processing, reports',
            code: '# src/blog/tasks.py (continued)\n\n@celery_app.task(bind=True)\ndef process_image_task(self, image_path: str):\n    """Resize and optimize image."""\n    from PIL import Image\n    import time\n\n    self.update_state(state="PROGRESS", meta={"step": "resizing"})\n    img = Image.open(image_path)\n    img.thumbnail((800, 600))\n    img.save(image_path.replace(".", "_thumb."))\n\n    self.update_state(state="PROGRESS", meta={"step": "done"})\n    return {"thumbnail": image_path.replace(".", "_thumb.")}\n\n@celery_app.task\ndef generate_daily_report():\n    """Generate daily stats report."""\n    # query DB for stats\n    # generate PDF/CSV\n    # send email to admins\n    pass\n\n# Scheduled tasks\ncelery_app.conf.beat_schedule = {\n    "daily-report": {\n        "task": "blog.tasks.generate_daily_report",\n        "schedule": crontab(hour=9, minute=0),\n    },\n}',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Call tasks from FastAPI',
            instruction: 'Queue tasks from endpoints',
            code: '# src/blog/api/v1/posts.py\nfrom blog.tasks import send_email_task, process_image_task\n\n@router.post("/posts/{id}/notify")\nasync def notify_subscribers(id: int):\n    post = await get_post(id)\n    subscribers = await get_subscribers(post.author_id)\n\n    # Queue email for each subscriber (parallel via group)\n    from celery import group\n    job = group(\n        send_email_task.s(sub.email, f"New post: {post.title}", post.excerpt)\n        for sub in subscribers\n    )\n    result = job.apply_async()\n\n    return {"task_id": result.id, "subscribers": len(subscribers)}\n\n@router.post("/upload")\nasync def upload(file: UploadFile):\n    # save file\n    file_path = f"uploads/{file.filename}"\n    # ... save ...\n\n    # Queue processing\n    task = process_image_task.delay(file_path)\n    return {"task_id": task.id, "check": f"/tasks/{task.id}"}',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Add task status endpoint',
            instruction: 'Check task progress',
            code: '# src/blog/api/v1/tasks.py\nfrom celery.result import AsyncResult\nfrom blog.core.celery import celery_app\n\n@router.get("/tasks/{task_id}")\nasync def get_task(task_id: str):\n    result = AsyncResult(task_id, app=celery_app)\n\n    response = {"task_id": task_id, "state": result.state}\n\n    if result.state == "PENDING":\n        response["message"] = "Waiting to start"\n    elif result.state == "PROGRESS":\n        response["info"] = result.info\n    elif result.state == "SUCCESS":\n        response["result"] = result.result\n    elif result.state == "FAILURE":\n        response["error"] = str(result.info)\n\n    return response',
            codeLanguage: 'python',
          },
          {
            title: 'Step 5: Run with Docker',
            instruction: 'Add worker and beat to docker-compose',
            code: '# docker-compose.yml\nservices:\n  # ... api, db, redis ...\n\n  worker:\n    build: .\n    command: celery -A blog.tasks worker --loglevel=info --concurrency=4\n    environment:\n      - DATABASE_URL=postgresql+asyncpg://blog:blogpass@db:5432/blog\n      - REDIS_URL=redis://redis:6379/0\n    depends_on:\n      - db\n      - redis\n    restart: unless-stopped\n\n  beat:\n    build: .\n    command: celery -A blog.tasks beat --loglevel=info\n    environment:\n      - REDIS_URL=redis://redis:6379/0\n    depends_on:\n      - redis\n    restart: unless-stopped\n\n  flower:\n    image: mher/flower\n    command: celery --broker=redis://redis:6379/0 flower --port=5555\n    ports:\n      - "5555:5555"\n    depends_on:\n      - redis\n\n# Start everything:\ndocker compose up -d\n# Monitor at http://localhost:5555',
            codeLanguage: 'yaml',
          },
        ],
        verification: 'Tasks queued and processed. Progress tracking works. Flower dashboard shows workers. Scheduled tasks run on time.',
      },
      exercises: [
        {
          prompt: 'Write a Celery task that processes a video: 1) download, 2) transcode, 3) upload. Use a chain.',
          starterCode: 'from celery import chain\nfrom blog.tasks import celery_app\n\n@celery_app.task\ndef download_video(url): pass\n\n@celery_app.task\ndef transcode_video(path): pass\n\n@celery_app.task\ndef upload_video(path): pass\n\n# create chain\n',
          hint: 'chain(download.s(url), transcode.s(), upload.s())',
          solution: 'from celery import chain\nfrom blog.tasks import celery_app\n\n@celery_app.task\ndef download_video(url: str) -> str:\n    # download\n    return f"/tmp/{hash(url)}.mp4"\n\n@celery_app.task\ndef transcode_video(path: str) -> str:\n    # transcode\n    return path.replace(".mp4", "_transcoded.mp4")\n\n@celery_app.task\ndef upload_video(path: str) -> str:\n    # upload to S3\n    return f"s3://bucket/{path}"\n\n# Chain: download → transcode → upload\nworkflow = chain(\n    download_video.s("https://example.com/video.mp4"),\n    transcode_video.s(),\n    upload_video.s(),\n)\n\nresult = workflow.apply_async()\nfinal_url = result.get()  # "s3://bucket/..."\nprint(f"Video available at: {final_url}")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When to use Celery vs FastAPI BackgroundTasks?',
          options: [
            'Always use Celery',
            'BackgroundTasks for short tasks (email), Celery for heavy work (ML, video)',
            'Always use BackgroundTasks',
            'They are identical',
          ],
          correctIndex: 1,
          explanation: 'BackgroundTasks run in the same process (blocks worker if slow). Celery runs in separate worker processes, supports retries, scheduling, monitoring. Use Celery for anything > 1 second.'
        },
        {
          question: 'What does task_acks_late=True do?',
          options: [
            'Faster execution',
            'Acknowledge AFTER completion (crash-safe — task re-queued if worker dies)',
            'Required by Celery',
            'For ordering',
          ],
          correctIndex: 1,
          explanation: 'Default: acknowledge on receive (task lost if worker crashes). acks_late: acknowledge after completion. If worker crashes mid-task, task goes back to queue and another worker picks it up.'
        },
        {
          question: 'What is a Celery chord?',
          options: [
            'A musical term',
            'Group of parallel tasks + callback that runs after all complete (fan-out + reduce)',
            'Sequential tasks',
            'A retry mechanism',
          ],
          correctIndex: 1,
          explanation: 'Chord = group (parallel) + callback. Run N tasks in parallel, when ALL complete, run callback with all results. Perfect for map-reduce patterns (process chunks, aggregate).'
        },
        {
          question: 'Why make tasks idempotent?',
          options: [
            'Faster',
            'Tasks may be retried/redelivered — idempotent means safe to run multiple times',
            'Required by Celery',
            'Uses less memory',
          ],
          correctIndex: 1,
          explanation: 'Celery may retry tasks (network error, worker crash). If task charges a customer, running it twice = double charge! Check if already processed at start (idempotency key).'
        },
      ],
      keyTakeaways: [
        'Use Celery for heavy/long tasks (ML, video, reports), BackgroundTasks for short ones',
        'Architecture: FastAPI → broker (Redis) → worker processes → result backend',
        '.delay() for fire-and-forget, .apply_async(countdown=N) for delayed',
        'Chains: sequential (output feeds next), Groups: parallel, Chords: fan-out + reduce',
        'Always set time limits (task_time_limit, task_soft_time_limit)',
        'task_acks_late=True: crash-safe (task re-queued if worker dies)',
        'Make tasks idempotent (safe to retry) — check if already processed',
        'Exponential backoff for retries: countdown=2 ** self.request.retries',
        'celery beat for scheduled tasks (cron-like)',
        'Monitor with Flower (web dashboard at :5555)',
        'update_state() for progress tracking on long tasks',
      ],
      resources: [
        { title: 'Celery Documentation', url: 'https://docs.celeryq.dev/', type: 'docs' },
        { title: 'Celery Best Practices', url: 'https://docs.celeryq.dev/en/stable/userguide/tasks.html#best-practices', type: 'article' },
        { title: 'Flower (monitoring)', url: 'https://flower.readthedocs.io/', type: 'tool' },
      ]
    },

    {
      id: 'fa-15',
      title: 'Monitoring, Logging & Observability — Prometheus, Grafana, Sentry',
      subtitle: 'Production observability — metrics, structured logging, error tracking, alerting',
      duration: 70,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'Production observability has 3 pillars: 1) Metrics (Prometheus) — request count, latency, error rate, 2) Logs (structured JSON) — what happened, when, why, 3) Traces (OpenTelemetry) — request flow across services. Without these, you are flying blind in production.',
        'Prometheus scrapes metrics from your /metrics endpoint. Use prometheus-fastapi-instrumentator for automatic metrics (request count, latency histogram, status codes). Add custom metrics for business logic (users registered, posts created).',
        'Structured logging (JSON) is essential for production. Each log line is a JSON object with timestamp, level, message, request_id, user_id, etc. Tools like ELK (Elasticsearch + Logstash + Kibana) or Datadog parse and search these logs.',
        'Sentry captures unhandled exceptions in production. It shows the exact stack trace, request context, user info, and release version. Integrates with FastAPI automatically. Set up alerts for new errors. Use for error tracking, not for logging.',
      ],
      codeExamples: [
        {
          filename: 'metrics.py',
          language: 'python',
          code: '"""Prometheus metrics — track everything in production."""\nfrom prometheus_fastapi_instrumentator import Instrumentator\nfrom prometheus_client import Counter, Histogram, Gauge\nfrom fastapi import FastAPI, Request, Response\nimport time\n\n# === AUTOMATIC METRICS (prometheus-fastapi-instrumentator) ===\n\ndef setup_metrics(app: FastAPI):\n    """Set up automatic FastAPI metrics."""\n    Instrumentator(\n        should_group_status_codes=True,\n        should_ignore_untemplated=True,\n        should_respect_env_var=True,\n        should_instrument_requests_inprogress=True,\n        excluded_handlers=["/health", "/metrics"],  # dont track these\n        inprogress_name="fastapi_inprogress",\n        inprogress_labels=True,\n    ).add(\n        # Request latency histogram\n        latency_lowr_buckets=(0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5,\n                              0.75, 1.0, 2.5, 5.0, 7.5, 10.0, 30.0, 60.0),\n    ).instrument(app).expose(\n        app,\n        endpoint="/metrics",\n        include_in_schema=False,  # hide from Swagger docs\n    )\n\n# Automatic metrics include:\n# - http_requests_total (counter): total requests by method, path, status\n# - http_request_duration_seconds (histogram): latency distribution\n# - http_requests_inprogress (gauge): current in-flight requests\n# - http_responses_total (counter): responses by status code\n\n# === CUSTOM BUSINESS METRICS ===\n\n# Counter: only increases (request count, errors, users registered)\nUSERS_REGISTERED = Counter(\n    "blog_users_registered_total",\n    "Total users registered",\n    ["source"]  # labels: organic, referral, social\n)\n\nPOSTS_CREATED = Counter(\n    "blog_posts_created_total",\n    "Total posts created",\n    ["published"]  # True/False\n)\n\n# Histogram: distribution (latency, response size)\nDB_QUERY_DURATION = Histogram(\n    "blog_db_query_duration_seconds",\n    "Database query duration",\n    ["operation"],  # select, insert, update, delete\n    buckets=(0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5),\n)\n\n# Gauge: can go up or down (active users, queue size, memory)\nACTIVE_USERS = Gauge(\n    "blog_active_users",\n    "Currently active users (last 5 min)",\n)\n\nQUEUE_SIZE = Gauge(\n    "blog_task_queue_size",\n    "Pending Celery tasks",\n    ["queue"],  # default, high_priority, low_priority\n)\n\n# === USAGE IN ROUTES ===\n\nfrom fastapi import APIRouter, Depends\n\nrouter = APIRouter()\n\n@router.post("/register")\nasync def register(user: UserCreate, source: str = "organic"):\n    # ... create user ...\n\n    # Increment counter\n    USERS_REGISTERED.labels(source=source).inc()\n\n    return user\n\n@router.post("/posts")\nasync def create_post(post: PostCreate):\n    # ... create post ...\n\n    POSTS_CREATED.labels(published=str(post.published)).inc()\n\n    return post\n\n# === TRACK DATABASE QUERY TIME ===\n\nfrom sqlalchemy import event\nfrom blog.db.base import engine\n\n@event.listens_for(engine.sync_engine, "before_cursor_execute")\ndef before_query(conn, cursor, statement, parameters, context, executemany):\n    context._query_start = time.perf_counter()\n\n@event.listens_for(engine.sync_engine, "after_cursor_execute")\ndef after_query(conn, cursor, statement, parameters, context, executemany):\n    duration = time.perf_counter() - context._query_start\n\n    # Determine operation type\n    operation = statement.strip().split()[0].lower()  # select, insert, etc.\n\n    DB_QUERY_DURATION.labels(operation=operation).observe(duration)\n\n# === CUSTOM MIDDLEWARE FOR REQUEST TIMING ===\n\n@app.middleware("http")\nasync def metrics_middleware(request: Request, call_next):\n    start = time.perf_counter()\n\n    try:\n        response = await call_next(request)\n        status = response.status_code\n    except Exception:\n        status = 500\n        raise\n    finally:\n        duration = time.perf_counter() - start\n\n        # Record custom metrics\n        REQUEST_DURATION.labels(\n            method=request.method,\n            path=request.url.path,\n        ).observe(duration)\n\n    return response\n\n# === GRAFANA DASHBOARD QUERIES (PromQL) ===\n"""\n# Request rate (requests per second)\nrate(http_requests_total[5m])\n\n# Error rate (% of 5xx responses)\nsum(rate(http_requests_total{status=~"5.."}[5m])) /\nsum(rate(http_requests_total[5m]))\n\n# P99 latency (99th percentile)\nhistogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))\n\n# Average latency\nrate(http_request_duration_seconds_sum[5m]) /\nrate(http_request_duration_seconds_count[5m])\n\n# Users registered in last hour\nincrease(blog_users_registered_total[1h])\n\n# Database query P95\nhistogram_quantile(0.95, rate(blog_db_query_duration_seconds_bucket[5m]))\n"""\n\n# === ALERT RULES ===\n"""\n# Alert: High error rate\n- alert: HighErrorRate\n  expr: |\n    sum(rate(http_requests_total{status=~"5.."}[5m])) /\n    sum(rate(http_requests_total[5m])) > 0.05\n  for: 5m\n  labels:\n    severity: critical\n  annotations:\n    summary: "Error rate above 5%"\n\n# Alert: High latency\n- alert: HighLatency\n  expr: |\n    histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 2\n  for: 5m\n  labels:\n    severity: warning\n  annotations:\n    summary: "P99 latency above 2 seconds"\n"""\n',
          explanation: 'prometheus-fastapi-instrumentator for automatic metrics. Custom counters/histograms/gauges for business logic. Scrape at /metrics. Grafana dashboards with PromQL. Alert on error rate, latency, queue size.'
        },
        {
          filename: 'logging_sentry.py',
          language: 'python',
          code: '"""Structured logging and Sentry error tracking."""\nimport logging\nimport json\nimport sys\nimport uuid\nfrom datetime import datetime, timezone\nfrom fastapi import FastAPI, Request, Response\nfrom typing import Any, Optional\nimport sentry_sdk\nfrom sentry_sdk.integrations.fastapi import FastApiIntegration\nfrom sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration\n\n# === STRUCTURED JSON LOGGING ===\n\nclass JsonFormatter(logging.Formatter):\n    """JSON formatter for structured logging (ELK, Datadog)."""\n\n    def format(self, record: logging.LogRecord) -> str:\n        log_data = {\n            "timestamp": datetime.now(timezone.utc).isoformat(),\n            "level": record.levelname,\n            "logger": record.name,\n            "message": record.getMessage(),\n            "module": record.module,\n            "function": record.funcName,\n            "line": record.lineno,\n        }\n\n        # Add exception info\n        if record.exc_info:\n            log_data["exception"] = self.formatException(record.exc_info)\n\n        # Add extra fields\n        for key, value in record.__dict__.items():\n            if key not in {\n                "args", "msg", "levelname", "levelno", "pathname", "filename",\n                "module", "exc_info", "exc_text", "funcName", "lineno",\n                "created", "msecs", "relativeCreated", "thread", "threadName",\n                "processName", "process", "name", "message", "taskName",\n            }:\n                log_data[key] = value\n\n        return json.dumps(log_data, default=str)\n\ndef setup_logging(level: str = "INFO"):\n    """Set up structured logging."""\n    handler = logging.StreamHandler(sys.stdout)\n    handler.setFormatter(JsonFormatter())\n\n    root_logger = logging.getLogger()\n    root_logger.setLevel(level)\n    root_logger.handlers = [handler]  # replace default handler\n\n    # Reduce noise from libraries\n    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)\n    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)\n\n# === REQUEST ID MIDDLEWARE ===\n\n@app.middleware("http")\nasync def request_id_middleware(request: Request, call_next):\n    """Add request ID to every request (for tracing logs)."""\n    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))\n    request.state.request_id = request_id\n\n    # Add to logging context\n    logging_context = {\n        "request_id": request_id,\n        "method": request.method,\n        "path": request.url.path,\n        "ip": request.client.host if request.client else None,\n    }\n\n    start = time.perf_counter()\n\n    try:\n        response: Response = await call_next(request)\n        duration = time.perf_counter() - start\n\n        # Log request\n        logging.getLogger("blog.request").info(\n            f"{request.method} {request.url.path} -> {response.status_code}",\n            extra={\n                **logging_context,\n                "status_code": response.status_code,\n                "duration_ms": round(duration * 1000, 2),\n            },\n        )\n\n        # Add request ID to response\n        response.headers["X-Request-ID"] = request_id\n        return response\n\n    except Exception:\n        duration = time.perf_counter() - start\n        logging.getLogger("blog.request").exception(\n            f"Request failed: {request.method} {request.url.path}",\n            extra={\n                **logging_context,\n                "duration_ms": round(duration * 1000, 2),\n            },\n        )\n        raise\n\n# === USAGE IN ROUTES (with request_id automatically in logs) ===\n\n@router.post("/posts")\nasync def create_post(\n    post: PostCreate,\n    request: Request,  # inject to get request_id\n    db: AsyncSession = Depends(get_db),\n):\n    logger = logging.getLogger("blog.posts")\n\n    logger.info(\n        "Creating post",\n        extra={\n            "request_id": request.state.request_id,  # auto in logs\n            "user_id": current_user.id,\n            "post_title": post.title,\n        }\n    )\n\n    # ... create post ...\n\n    logger.info(\n        "Post created",\n        extra={\n            "request_id": request.state.request_id,\n            "post_id": post.id,\n        }\n    )\n\n    return post\n\n# Log output (JSON):\n# {"timestamp": "2024-01-15T10:30:00Z", "level": "INFO", "logger": "blog.posts",\n#  "message": "Creating post", "request_id": "abc-123", "user_id": 1, "post_title": "Hello"}\n\n# === SENTRY INTEGRATION ===\n\ndef setup_sentry(app: FastAPI):\n    """Set up Sentry error tracking."""\n    sentry_sdk.init(\n        dsn=settings.SENTRY_DSN,\n        environment=settings.ENVIRONMENT,\n        release=settings.VERSION,  # track which version has errors\n        traces_sample_rate=0.1,  # 10% of requests traced\n        profiles_sample_rate=0.1,  # 10% profiled\n        integrations=[\n            FastApiIntegration(),\n            SqlalchemyIntegration(),\n        ],\n        before_send=filter_sensitive_data,\n    )\n\ndef filter_sensitive_data(event: dict, hint: dict) -> Optional[dict]:\n    """Remove sensitive data before sending to Sentry."""\n    if "request" in event:\n        # Remove auth headers\n        headers = event["request"].get("headers", {})\n        headers.pop("authorization", None)\n        headers.pop("cookie", None)\n\n        # Remove password from body\n        if "data" in event["request"]:\n            try:\n                data = json.loads(event["request"]["data"])\n                data.pop("password", None)\n                data.pop("credit_card", None)\n                event["request"]["data"] = json.dumps(data)\n            except (json.JSONDecodeError, TypeError):\n                pass\n\n    return event\n\n# === AUTOMATIC ERROR CAPTURE ===\n# Sentry automatically captures:\n# - Unhandled exceptions (500 errors)\n# - HTTPException (if configured)\n# - Request context (URL, method, headers, body)\n# - User info (if set)\n\n# Set user context for Sentry\nfrom sentry_sdk import set_user\n\n@router.get("/me")\nasync def get_me(current_user: User = Depends(get_current_user)):\n    # Set user in Sentry (shows in error reports)\n    set_user({\n        "id": current_user.id,\n        "email": current_user.email,\n        "username": current_user.username,\n    })\n    return current_user\n\n# === MANUAL ERROR REPORTING ===\n\ntry:\n    risky_operation()\nexcept Exception as e:\n    # Capture to Sentry (does not re-raise)\n    sentry_sdk.capture_exception(e)\n\n    # Log it too\n    logger.exception("Operation failed", extra={"user_id": user_id})\n\n    # Re-raise or return error\n    raise HTTPException(500, "Internal error")\n\n# === PERFORMANCE MONITORING ===\n# Sentry automatically traces:\n# - HTTP requests (duration, status)\n# - Database queries (with SqlalchemyIntegration)\n# - External HTTP calls (httpx integration)\n\n# Add custom spans\nfrom sentry_sdk import start_span\n\n@router.get("/expensive")\nasync def expensive_operation():\n    with start_span(op="db.query", description="complex query"):\n        result = await complex_db_query()\n\n    with start_span(op="ml.inference", description="model prediction"):\n        prediction = model.predict(result)\n\n    return prediction\n\n# === SETUP IN LIFESPAN ===\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # Set up logging\n    setup_logging(level="INFO" if settings.ENVIRONMENT == "production" else "DEBUG")\n\n    # Set up Sentry\n    if settings.SENTRY_DSN:\n        setup_sentry(app)\n\n    # Set up metrics\n    setup_metrics(app)\n\n    yield\n\n    # Shutdown\n    sentry_sdk.flush()  # send pending events',
          explanation: 'Structured logging (JSON) for ELK/Datadog. Request ID middleware for tracing. Sentry for error tracking (auto-captures exceptions). Filter sensitive data. Set user context. Custom spans for performance. Prometheus for metrics.'
        },
      ],
      lab: {
        title: 'Add Production Observability',
        objective: 'Set up metrics, logging, and error tracking',
        estTime: '90 minutes',
        difficulty: 'Advanced',
        setup: [
          'pip install prometheus-fastapi-instrumentator prometheus-client sentry-sdk',
          'Sentry account (free tier)',
        ],
        steps: [
          {
            title: 'Step 1: Add Prometheus metrics',
            instruction: 'Automatic and custom metrics',
            code: '# src/blog/core/metrics.py\nfrom prometheus_fastapi_instrumentator import Instrumentator\nfrom prometheus_client import Counter, Histogram\n\nUSERS_REGISTERED = Counter(\n    "blog_users_registered_total",\n    "Total users registered",\n)\n\nDB_QUERY_DURATION = Histogram(\n    "blog_db_query_duration_seconds",\n    "DB query duration",\n    ["operation"],\n)\n\ndef setup_metrics(app):\n    Instrumentator().instrument(app).expose(app, endpoint="/metrics")\n\n# In main.py lifespan:\n# setup_metrics(app)\n\n# In routes:\n# USERS_REGISTERED.inc()',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Set up structured logging',
            instruction: 'JSON logging with request IDs',
            code: '# src/blog/core/logging.py\nimport logging\nimport json\nfrom datetime import datetime, timezone\n\nclass JsonFormatter(logging.Formatter):\n    def format(self, record):\n        return json.dumps({\n            "timestamp": datetime.now(timezone.utc).isoformat(),\n            "level": record.levelname,\n            "message": record.getMessage(),\n            "logger": record.name,\n            **getattr(record, "extra_data", {}),\n        })\n\ndef setup_logging():\n    handler = logging.StreamHandler()\n    handler.setFormatter(JsonFormatter())\n    logging.getLogger().handlers = [handler]\n    logging.getLogger().setLevel(logging.INFO)\n\n# Request ID middleware:\n@app.middleware("http")\nasync def request_id(request: Request, call_next):\n    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))\n    request.state.request_id = request_id\n    response = await call_next(request)\n    response.headers["X-Request-ID"] = request_id\n    return response',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Add Sentry',
            instruction: 'Error tracking and performance monitoring',
            code: '# src/blog/core/sentry.py\nimport sentry_sdk\nfrom sentry_sdk.integrations.fastapi import FastApiIntegration\n\ndef setup_sentry():\n    if not settings.SENTRY_DSN:\n        return\n\n    sentry_sdk.init(\n        dsn=settings.SENTRY_DSN,\n        environment=settings.ENVIRONMENT,\n        release=settings.VERSION,\n        traces_sample_rate=0.1,\n        integrations=[FastApiIntegration()],\n        before_send=filter_sensitive,\n    )\n\ndef filter_sensitive(event, hint):\n    # Remove auth, passwords from events\n    return event\n\n# In lifespan:\n# setup_sentry()',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Set up Grafana dashboard',
            instruction: 'Visualize metrics',
            code: '# docker-compose.yml — add Prometheus and Grafana\nservices:\n  prometheus:\n    image: prom/prometheus\n    ports: ["9090:9090"]\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n\n  grafana:\n    image: grafana/grafana\n    ports: ["3001:3000"]\n    environment:\n      GF_SECURITY_ADMIN_PASSWORD: admin\n    depends_on:\n      - prometheus\n\n# prometheus.yml\nscrape_configs:\n  - job_name: blog-api\n    scrape_interval: 5s\n    static_configs:\n      - targets: ["api:8000"]\n\n# Access Grafana at http://localhost:3001 (admin/admin)\n# Add Prometheus as data source\n# Create dashboard with queries:\n# - rate(http_requests_total[5m])\n# - histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))',
            codeLanguage: 'yaml',
          },
          {
            title: 'Step 5: Test the setup',
            instruction: 'Generate traffic and check dashboards',
            code: '# Generate traffic\nab -n 1000 -c 10 http://localhost:8000/api/v1/posts\n\n# Check metrics\ncurl http://localhost:8000/metrics | grep http_requests\n\n# View in Prometheus: http://localhost:9090\n# Query: rate(http_requests_total[5m])\n\n# View in Grafana: http://localhost:3001\n# See request rate, latency, error rate\n\n# Trigger an error (check Sentry)\ncurl http://localhost:8000/api/v1/posts/99999  # 404\n# Or trigger 500:\ncurl -X POST http://localhost:8000/api/v1/posts -d \'{}\'  # 422\n\n# Check Sentry dashboard for captured errors',
            codeLanguage: 'bash',
          },
        ],
        verification: 'Metrics at /metrics. Grafana shows dashboards. Errors appear in Sentry. Logs are JSON with request IDs.',
      },
      exercises: [
        {
          prompt: 'Add a custom metric that tracks the number of active users (gauge) and update it every 5 minutes.',
          starterCode: 'from prometheus_client import Gauge\n\nACTIVE_USERS = Gauge(\n    "blog_active_users",\n    "Active users in last 5 minutes",\n)\n\n# your update function\n',
          hint: 'Use a Celery beat task or background task to query DB and set gauge value.',
          solution: 'from prometheus_client import Gauge\nfrom blog.tasks import celery_app\nfrom sqlalchemy import select, func\n\nACTIVE_USERS = Gauge(\n    "blog_active_users",\n    "Active users in last 5 minutes",\n)\n\n@celery_app.task\ndef update_active_users():\n    """Update active users gauge every 5 min."""\n    from blog.db.base import async_session\n    from blog.models.user import UserSession\n    from datetime import datetime, timedelta\n\n    async with async_session() as db:\n        cutoff = datetime.utcnow() - timedelta(minutes=5)\n        count = await db.scalar(\n            select(func.count(UserSession.user_id.distinct()))\n            .where(UserSession.last_activity > cutoff)\n        )\n        ACTIVE_USERS.set(count or 0)\n\n# In celery beat schedule:\ncelery_app.conf.beat_schedule["update-active-users"] = {\n    "task": "blog.tasks.update_active_users",\n    "schedule": 300.0,  # 5 minutes\n}',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What are the 3 pillars of observability?',
          options: [
            'Logs, metrics, traces',
            'CPU, memory, disk',
            'Frontend, backend, database',
            'GET, POST, DELETE',
          ],
          correctIndex: 0,
          explanation: 'Metrics (numbers over time — Prometheus), Logs (events — ELK/Datadog), Traces (request flow — OpenTelemetry). Together they give full visibility into production systems.'
        },
        {
          question: 'Why use structured (JSON) logging?',
          options: [
            'Faster',
            'Machine-parseable (ELK, Datadog can search/filter fields)',
            'Required by FastAPI',
            'Uses less storage',
          ],
          correctIndex: 1,
          explanation: 'JSON logs are structured — tools can search by field (request_id, user_id, level). Plain text logs require regex parsing. JSON enables: "show me all ERROR logs for user 42 in the last hour".'
        },
        {
          question: 'What does Sentry capture?',
          options: [
            'All HTTP requests',
            'Unhandled exceptions (with stack trace, context, user info)',
            'Database queries',
            'Login attempts',
          ],
          correctIndex: 1,
          explanation: 'Sentry captures unhandled exceptions and errors. It shows the exact stack trace, request context (URL, headers, body), user info, and release version. Use for error tracking, not general logging.'
        },
        {
          question: 'What is a Prometheus histogram?',
          options: [
            'A chart type',
            'Metric that tracks distribution (e.g., latency percentiles: P50, P95, P99)',
            'A counter',
            'A gauge',
          ],
          correctIndex: 1,
          explanation: 'Histogram tracks distribution of values (request latency, response size). Enables percentile queries: "P99 latency = histogram_quantile(0.99, ...). Better than average for understanding tail latency.'
        },
      ],
      keyTakeaways: [
        '3 pillars: Metrics (Prometheus), Logs (structured JSON), Traces (OpenTelemetry)',
        'prometheus-fastapi-instrumentator for automatic HTTP metrics',
        'Custom metrics: Counter (increases), Histogram (distribution), Gauge (up/down)',
        'Structured JSON logging — machine-parseable for ELK/Datadog',
        'Request ID middleware — trace single request across logs',
        'Sentry for error tracking — captures stack traces, context, user info',
        'Filter sensitive data before sending to Sentry (passwords, tokens)',
        'Grafana dashboards with PromQL queries (rate, histogram_quantile)',
        'Alert on: error rate > 5%, P99 latency > 2s, queue size > 1000',
        'Set Sentry release version — track which version introduced errors',
      ],
      resources: [
        { title: 'Prometheus Documentation', url: 'https://prometheus.io/docs/', type: 'docs' },
        { title: 'Grafana Documentation', url: 'https://grafana.com/docs/', type: 'docs' },
        { title: 'Sentry Python SDK', url: 'https://docs.sentry.io/platforms/python/', type: 'docs' },
        { title: 'prometheus-fastapi-instrumentator', url: 'https://github.com/trallnag/prometheus-fastapi-instrumentator', type: 'tool' },
      ]
    },
  ]
};
