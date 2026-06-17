import { Lesson } from '../../types';

// L11: Async SQLAlchemy
export const fastapiL11: Lesson = {
  slug: 'async-sqlalchemy', title: 'Async SQLAlchemy 2.0 + PostgreSQL + Alembic',
  subtitle: 'Connect PostgreSQL with async SQLAlchemy, define models, run migrations',
  duration: 90, difficulty: 'Advanced', phase: 'Advanced', xp: 300, moduleSlug: 'fastapi',
  objectives: ['Create async engine and sessionmaker','Define SQLAlchemy 2.0 models with Mapped[]','Build yield dependency for DB sessions','Run Alembic migrations','Perform CRUD with async queries'],
  realWorldContext: 'Every production API needs a database. SQLAlchemy 2.0 async with PostgreSQL is the standard for FastAPI apps. Companies like Reddit and Instagram use async database drivers for high concurrency — async DB operations do not block the event loop.',
  prerequisites: ['Completed FastAPI L1-L10','Basic SQL knowledge'],
  conceptDiagram: `FastAPI → Depends(get_db) → AsyncSession → asyncpg → PostgreSQL

  create_async_engine("postgresql+asyncpg://...")
  async_sessionmaker(engine, expire_on_commit=False)
  
  get_db(): yield session (auto-close)
  
  Models: class User(Base): id: Mapped[int]; name: Mapped[str]
  
  Query: select(User).where(User.id == 1)
  Execute: await db.execute(stmt) → result.scalars().all()`,
  conceptExplanation: ['SQLAlchemy 2.0 uses Mapped[] type annotations for columns. This gives IDE autocompletion and mypy type checking. Define models with class User(Base), use mapped_column() for column options.','expire_on_commit=False is CRITICAL for async. By default, SQLAlchemy expires objects after commit and lazily reloads — but async cannot do lazy reloads (would block the event loop). Set this to False so objects stay usable after commit.','Alembic is the migration tool for SQLAlchemy. It generates migration scripts from your model changes. Run alembic revision --autogenerate to create, alembic upgrade head to apply. NEVER use Base.metadata.create_all() in production — always use migrations.'],
  whyItMatters: 'Without a database, your API cannot persist data. Without async, DB operations block the event loop and your API cannot handle concurrent requests. Without migrations, you cannot evolve your schema safely. This lesson is the foundation of every real backend.',
  codeExamples: [
    { filename: 'database.py', language: 'python', approach: 'real-world', code: `from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db", pool_size=20, max_overflow=10, pool_pre_ping=True)
async_session = async_sessionmaker(engine, expire_on_commit=False)  # CRITICAL for async!

class Base(DeclarativeBase): pass

async def get_db():
    async with async_session() as session:
        try: yield session
        except Exception: await session.rollback(); raise`, explanation: 'expire_on_commit=False is the #1 gotcha in async SQLAlchemy. Without it, objects become invalid after commit.' },
    { filename: 'models.py', language: 'python', approach: 'real-world', code: `from sqlalchemy import String, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, List
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(100))
    hashed_password: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    posts: Mapped[List["Post"]] = relationship(back_populates="author", cascade="all, delete-orphan")

class Post(Base):
    __tablename__ = "posts"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    content: Mapped[str]
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    author: Mapped["User"] = relationship(back_populates="posts")`, explanation: 'SQLAlchemy 2.0 Mapped[] syntax. relationship() for connections. cascade="all, delete-orphan" deletes posts when user is deleted.' },
    { filename: 'crud.py', language: 'python', approach: 'production', code: `from sqlalchemy import select
# CREATE
async def create_user(db: AsyncSession, user: UserCreate):
    db_user = User(email=user.email, name=user.name, hashed_password=hash(user.password))
    db.add(db_user); await db.commit(); await db.refresh(db_user)
    return db_user
# READ
async def get_user(db: AsyncSession, id: int):
    return await db.get(User, id)  # by primary key
async def list_users(db: AsyncSession, skip=0, limit=20):
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()
# UPDATE
async def update_user(db: AsyncSession, id: int, data: dict):
    user = await db.get(User, id)
    for k, v in data.items(): setattr(user, k, v)
    await db.commit(); return user
# DELETE
async def delete_user(db: AsyncSession, id: int):
    user = await db.get(User, id)
    if user: await db.delete(user); await db.commit()`, explanation: 'CRUD: db.add() + commit for create. db.get() for primary key lookup. select() + execute() for queries. setattr for update. db.delete() for delete.' },
  ],
  configFiles: [{ filename: 'alembic.ini', language: 'ini', content: '[alembic]\nscript_location = alembic\nsqlalchemy.url = postgresql+asyncpg://user:pass@localhost/db', comment: 'Configure Alembic to use your database URL' }],
  lab: { title: 'Connect PostgreSQL to FastAPI', steps: [
    { step: 1, title: 'Start PostgreSQL', instruction: 'Run PostgreSQL in Docker', command: 'docker run -d --name db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=myapp -p 5432:5432 postgres:16' },
    { step: 2, title: 'Install deps', instruction: 'Install SQLAlchemy and asyncpg', command: 'uv pip install sqlalchemy[asyncio] asyncpg alembic' },
    { step: 3, title: 'Create models', instruction: 'Define User and Post models', command: 'Create models.py with Mapped[] columns' },
    { step: 4, title: 'Init Alembic', instruction: 'Set up migrations', command: 'alembic init alembic && alembic revision --autogenerate -m "create tables" && alembic upgrade head' },
    { step: 5, title: 'Test CRUD', instruction: 'Create and query users', command: 'Create endpoints with get_db dependency, test via /docs', verification: 'Users persist across server restarts' },
  ]},
  commonErrors: [
    { error: 'MissingGreenlet: greenlet_spawn has not been called', fix: 'Set expire_on_commit=False on sessionmaker. This prevents lazy loading after commit which async cannot do.', rootCause: 'SQLAlchemy tries to lazy-load after commit, but async cannot block. expire_on_commit=False keeps objects valid.' },
    { error: 'asyncpg.exceptions.ConnectionDoesNotExistError', fix: 'Add pool_pre_ping=True to engine. This checks connection health before use.', rootCause: 'Stale connections in pool — connection was closed by server but pool does not know.' },
  ],
  quiz: [
    { question: 'Why is expire_on_commit=False critical for async?', options: ['Faster', 'Objects stay usable after commit (no lazy reload which async cannot do)', 'Required by asyncpg', 'No reason'], correctIndex: 1, explanation: 'Default behavior expires objects after commit and lazily reloads on access. Async cannot do lazy reload (blocks event loop). expire_on_commit=False prevents this.' },
    { question: 'How to query a single user by ID?', options: ['db.query(User).get(id)', 'db.get(User, id) — simplest for primary key', 'select(User).where(User.id == id)', 'Both B and C work'], correctIndex: 3, explanation: 'db.get(User, id) is simpler for PK lookups. select(User).where() is more flexible. Avoid legacy db.query() (v1 API).' },
  ],
  resources: [
    { title: 'SQLAlchemy 2.0 Async', url: 'https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html', type: 'docs' },
    { title: 'Alembic Documentation', url: 'https://alembic.sqlalchemy.org/', type: 'docs' },
  ],
  whatToReadNext: 'Read about Redis integration (next lesson) — caching, pub/sub, and rate limiting for your API.',
};

// L12: Redis Integration
export const fastapiL12: Lesson = {
  slug: 'redis', title: 'Redis — Caching, Pub/Sub, Rate Limiting',
  subtitle: 'Add Redis for caching, real-time pub/sub, and rate limiting',
  duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'fastapi',
  objectives: ['Cache expensive queries with Redis (cache-aside pattern)','Publish/subscribe for real-time notifications','Rate limit with sliding window','Use connection pooling','Handle cache invalidation on writes'],
  realWorldContext: 'Redis is the #1 caching solution. Twitter caches tweets, Netflix caches movie metadata, Uber caches driver locations. Without Redis, every request hits the database — slow and expensive. Redis gives microsecond latency (1000x faster than PostgreSQL).',
  prerequisites: ['Completed FastAPI L1-L11'],
  conceptDiagram: `CACHE-ASIDE PATTERN:
  Request → Check Redis → HIT? Return cached
                      → MISS? Query DB → Cache result (TTL) → Return

  Redis: posts:1 = {"id":1,"title":"Hello"} (TTL 5 min)
  
  On write (PUT/DELETE): Invalidate cache (delete key)

RATE LIMITING (sliding window):
  INCR ip:1.2.3.4 → 1, 2, 3... 100 → 429 Too Many Requests
  EXPIRE 60 (reset every minute)

PUB/SUB:
  publish("notifications", {"user":1,"msg":"Hello"})
  → all subscribers receive instantly`,
  conceptExplanation: ['Redis is in-memory — microsecond latency vs milliseconds for PostgreSQL. Use for: caching (store query results with TTL), rate limiting (count requests per IP), pub/sub (broadcast messages), session storage.','Cache-aside pattern: check Redis first. If hit, return cached data (no DB query). If miss, query DB, cache result with TTL, return. On writes, invalidate cache. Always set TTL to prevent memory leaks.','Rate limiting with sorted sets: ZADD timestamps, ZREMRANGEBYSCORE old entries, ZCARD to count. If count > limit, return 429. This gives a sliding window (more accurate than fixed window).'],
  whyItMatters: 'Without caching, your database is hit on every request. For a blog post with 10K views/hour, that is 10K DB queries. With Redis cache (5-min TTL), it is 12 DB queries/hour — 833x reduction. Rate limiting prevents abuse — without it, one user can DOS your API.',
  codeExamples: [
    { filename: 'cache.py', language: 'python', approach: 'real-world', code: `import redis.asyncio as aioredis, json
from typing import Any

class Cache:
    def __init__(self, redis: aioredis.Redis):
        self.redis = redis
    async def get(self, key: str) -> Any | None:
        data = await self.redis.get(key)
        return json.loads(data) if data else None
    async def set(self, key: str, val: Any, ttl: int = 300):
        await self.redis.setex(key, ttl, json.dumps(val, default=str))
    async def delete(self, key: str):
        await self.redis.delete(key)
    async def get_or_set(self, key: str, factory, ttl: int = 300):
        cached = await self.get(key)
        if cached is not None: return cached
        val = await factory()
        await self.set(key, val, ttl)
        return val

# Usage in route
@router.get("/posts/{id}")
async def get_post(id: int, db = Depends(get_db), cache = Depends(get_cache)):
    async def fetch():
        post = await db.get(Post, id)
        if not post: raise HTTPException(404)
        return post
    return await cache.get_or_set(f"post:{id}", fetch, ttl=300)

@router.put("/posts/{id}")
async def update_post(id: int, db = Depends(get_db), cache = Depends(get_cache)):
    # ... update ...
    await cache.delete(f"post:{id}")  # invalidate cache
    return post`, explanation: 'Cache-aside pattern: get_or_set checks cache, on miss calls factory (DB query), caches result. On writes, delete cache key to invalidate.' },
    { filename: 'rate_limit.py', language: 'python', approach: 'production', code: `import time
class RateLimiter:
    def __init__(self, redis): self.redis = redis
    async def check(self, key: str, limit: int, window: int):
        pipe = self.redis.pipeline()
        now = time.time()
        pipe.zremrangebyscore(key, 0, now - window)  # remove old
        pipe.zcard(key)  # count current
        pipe.zadd(key, {str(now): now})  # add current
        pipe.expire(key, window)  # set TTL
        results = await pipe.execute()
        return results[1] < limit  # allowed if count < limit

# Dependency
async def rate_limit(request: Request, redis = Depends(get_redis)):
    limiter = RateLimiter(redis)
    ip = request.client.host
    if not await limiter.check(f"rl:{ip}", 100, 60):
        raise HTTPException(429, "Too many requests", headers={"Retry-After": "60"})`, explanation: 'Sliding window rate limiter: sorted set with timestamps, remove old, count, if > limit return 429. Pipeline for atomic multi-command.' },
  ],
  configFiles: [],
  lab: { title: 'Add Redis Caching', steps: [
    { step: 1, title: 'Start Redis', instruction: 'Run Redis in Docker', command: 'docker run -d --name redis -p 6379:6379 redis:7-alpine' },
    { step: 2, title: 'Install', instruction: 'Install redis-py', command: 'uv pip install redis' },
    { step: 3, title: 'Add cache', instruction: 'Cache GET endpoints', command: 'Add cache.get_or_set to GET routes' },
    { step: 4, title: 'Benchmark', instruction: 'Compare cached vs uncached', command: 'ab -n 1000 http://localhost:8000/api/v1/posts/1', expectedOutput: 'Cached: 5000 req/s vs uncached: 200 req/s (25x faster!)' },
  ]},
  commonErrors: [
    { error: 'Redis connection refused', fix: 'Make sure Redis is running: docker ps. Check REDIS_URL env var.', rootCause: 'Redis server not running or wrong URL.' },
    { error: 'Cache not invalidating after update', fix: 'Delete cache key on writes: await cache.delete(f"post:{id}"). Also delete list caches: await cache.delete_pattern("posts:list:*")', rootCause: 'Cache invalidation must be explicit — Redis does not know when your DB changes.' },
  ],
  quiz: [
    { question: 'Why use Redis instead of in-memory dict?', options: ['Faster', 'Shared across multiple workers/instances, survives restarts', 'Required by FastAPI', 'Less memory'], correctIndex: 1, explanation: 'In-memory dict is per-process — each FastAPI worker has its own cache. Redis is shared across ALL workers and survives restarts.' },
    { question: 'What is the cache-aside pattern?', options: ['Write to cache then DB', 'Check cache → miss → query DB → cache result → return', 'Always query DB', 'Cache auto-invalidates'], correctIndex: 1, explanation: 'Cache-aside: check cache first. On hit, return. On miss, query DB, cache with TTL, return. Invalidate on writes.' },
  ],
  resources: [
    { title: 'redis-py Documentation', url: 'https://redis-py.readthedocs.io/', type: 'docs' },
    { title: 'Try Redis (interactive)', url: 'https://try.redis.io/', type: 'interactive', isHiddenGem: true },
  ],
  whatToReadNext: 'Read about Celery (next lesson) — heavy background tasks like ML training, email sending, report generation.',
};

// L13: Celery
export const fastapiL13: Lesson = {
  slug: 'celery', title: 'Celery — Background Tasks, Beat, Flower',
  subtitle: 'Heavy background processing with Celery + Redis broker',
  duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'fastapi',
  objectives: ['Set up Celery with Redis broker','Define tasks with @celery_app.task','Use chains, groups, chords for complex workflows','Schedule tasks with celery beat','Monitor with Flower'],
  realWorldContext: 'FastAPI BackgroundTasks are for SHORT tasks (emails, logging). For HEAVY work (ML training, video processing, report generation), use Celery. Celery runs in separate worker processes, supports retries, scheduling, and monitoring. Used by Instagram, Mozilla, and Reddit.',
  prerequisites: ['Completed FastAPI L1-L12 (especially Redis L12)'],
  conceptDiagram: `CELERY ARCHITECTURE:

  FastAPI App → task.delay(args) → Redis (broker) → Celery Worker → execute task
                                                        ↓
                                               Result Backend (Redis)

  PATTERNS:
  .delay()         → fire-and-forget
  .apply_async(countdown=60) → delayed execution
  chain(a, b, c)   → sequential (output feeds next)
  group(a, b, c)   → parallel (all at once)
  chord(group, cb) → fan-out + reduce

  SCHEDULING (celery beat):
  crontab(hour=9, minute=0) → daily at 9 AM
  crontab(minute=0) → every hour
  300.0 → every 5 minutes`,
  conceptExplanation: ['Celery runs in separate worker processes. Your FastAPI app puts a message on Redis (broker), the Celery worker picks it up and executes. This means heavy tasks do not block your API — the response returns immediately, the task runs in background.','Always set time limits (task_time_limit=300) — a stuck task can hang a worker forever. Use task_acks_late=True for crash safety: the task is re-queued if the worker dies.','Make tasks idempotent — they may be retried. If a task charges a customer, running it twice = double charge. Check if already processed at the start.'],
  whyItMatters: 'Without Celery, a 30-second ML training task blocks your API worker for 30 seconds. With Celery, the API returns immediately and the task runs in background. Users get instant feedback. You can scale workers independently from your API.',
  codeExamples: [
    { filename: 'celery_app.py', language: 'python', approach: 'real-world', code: `from celery import Celery
from celery.schedules import crontab

celery_app = Celery("blog", broker="redis://localhost:6379/0", backend="redis://localhost:6379/1", include=["blog.tasks"])
celery_app.conf.update(
    task_time_limit=300, task_soft_time_limit=240,
    task_acks_late=True, worker_prefetch_multiplier=1,
    beat_schedule={
        "daily-digest": {"task": "blog.tasks.send_digest", "schedule": crontab(hour=9)},
    },
)

@celery_app.task(bind=True, max_retries=3)
def send_email(self, to, subject, body):
    try: smtp.send(to, subject, body)
    except Exception as e: raise self.retry(exc=e, countdown=2 ** self.request.retries)

# In FastAPI route:
@router.post("/register")
async def register(user: UserCreate):
    # ... create user ...
    send_email.delay(user.email, "Welcome!", "...")
    return user  # returns immediately, email sends in background`, explanation: 'Celery app config: broker/backend, time limits (CRITICAL), acks_late (crash-safe), beat schedule. .delay() = fire and forget.' },
  ],
  configFiles: [{ filename: 'docker-compose.yml', language: 'yaml', content: 'services:\n  worker:\n    build: .\n    command: celery -A blog.celery_app worker --loglevel=info --concurrency=4\n    depends_on: [redis]\n  beat:\n    build: .\n    command: celery -A blog.celery_app beat --loglevel=info\n    depends_on: [redis]\n  flower:\n    image: mher/flower\n    ports: ["5555:5555"]', comment: 'Worker (executes tasks), Beat (schedules), Flower (monitoring dashboard)' }],
  lab: { title: 'Add Celery Workers', steps: [
    { step: 1, title: 'Install', instruction: 'Install Celery', command: 'uv pip install celery flower' },
    { step: 2, title: 'Create tasks', instruction: 'Define a task', command: 'Create celery_app.py with @task decorated functions' },
    { step: 3, title: 'Start worker', instruction: 'Run Celery worker', command: 'celery -A blog.celery_app worker --loglevel=info' },
    { step: 4, title: 'Test', instruction: 'Call task from FastAPI', command: 'Add task.delay() to an endpoint, verify it runs in background' },
  ]},
  commonErrors: [
    { error: 'Task not executing', fix: 'Make sure Celery worker is running. Check that include=["blog.tasks"] is set. Verify broker URL matches Redis.', rootCause: 'Worker not running or cannot find task module.' },
    { error: 'Double execution (task runs twice)', fix: 'Make task idempotent. Check if already processed at start. Use task_acks_late=True to prevent duplicate on worker crash.', rootCause: 'Celery retries on failure, or worker crash causes re-queue.' },
  ],
  quiz: [
    { question: 'When to use Celery vs BackgroundTasks?', options: ['Always Celery', 'BackgroundTasks for short (email), Celery for heavy (ML, video)', 'Always BackgroundTasks', 'Same thing'], correctIndex: 1, explanation: 'BackgroundTasks run in the same process (blocks worker if slow). Celery runs in separate processes with retries, scheduling, monitoring.' },
    { question: 'Why set task_acks_late=True?', options: ['Faster', 'Crash-safe — task re-queued if worker dies', 'Required', 'For ordering'], correctIndex: 1, explanation: 'Default: ack on receive (task lost if worker crashes). acks_late: ack after completion. If worker dies, task goes back to queue.' },
  ],
  resources: [{ title: 'Celery Documentation', url: 'https://docs.celeryq.dev/', type: 'docs' }],
  whatToReadNext: 'Read about ML Model Serving (next lesson) — load PyTorch/ONNX models at startup, serve predictions via API.',
};

// L14: ML Model Serving
export const fastapiL14: Lesson = {
  slug: 'ml-serving', title: 'ML Model Serving — PyTorch, ONNX, A/B Testing',
  subtitle: 'Deploy ML models as production APIs with batching and A/B testing',
  duration: 90, difficulty: 'Advanced', phase: 'Advanced', xp: 300, moduleSlug: 'fastapi',
  objectives: ['Load ML model ONCE at startup (lifespan)','Serve PyTorch and ONNX predictions','Batch requests for 10-100x throughput','Implement model registry with versioning','A/B test with traffic splitting'],
  realWorldContext: 'FastAPI is the go-to framework for ML serving. Uber uses it for ride predictions, Netflix for recommendations, Spotify for music classification. The pattern: load model at startup, store in app.state, serve predictions. Loading per request would be 1000x slower.',
  prerequisites: ['Completed FastAPI L1-L13','Basic ML knowledge'],
  conceptDiagram: `ML SERVING PATTERN:

  Startup (lifespan):
    model = load_model("model.pt")
    app.state.model = model  ← load ONCE

  Request:
    POST /predict {"features": [0.1, 0.2, ...]}
      → Pydantic validates input
      → torch.no_grad() + model(input)
      → return prediction

  OPTIMIZATION:
  • ONNX Runtime: 2-5x faster than PyTorch
  • Batch: process 32 at once (10-100x throughput)
  • GPU: CUDAExecutionProvider
  • Quantization: int8 (4x smaller, 2x faster)`,
  conceptExplanation: ['Load model ONCE in lifespan, store in app.state, reuse for ALL requests. Loading per request takes 1-10 seconds — loading once takes 1-10 seconds total. This is the #1 ML serving principle.','Use torch.no_grad() for PyTorch inference — disables gradient tracking (saves memory, faster). Set model.eval() to disable dropout and batchnorm training mode.','ONNX Runtime is 2-5x faster than PyTorch for inference. Export with torch.onnx.export(), load with onnxruntime.InferenceSession. Same model, faster execution.'],
  whyItMatters: 'ML serving is how models reach production. A model in a notebook is useless — it needs an API. FastAPI + ONNX is the industry standard for serving. Companies pay ML engineers 6-figure salaries for this skill. Without proper serving, your model is a science experiment, not a product.',
  codeExamples: [
    { filename: 'ml_serving.py', language: 'python', approach: 'real-world', code: `from contextlib import asynccontextmanager
import torch

@asynccontextmanager
async def lifespan(app: FastAPI):
    model = MyModel()
    model.load_state_dict(torch.load("model.pt", map_location="cpu"))
    model.eval()  # CRITICAL: disable dropout, batchnorm training
    app.state.model = model
    yield
    del app.state.model

app = FastAPI(lifespan=lifespan)

class PredictRequest(BaseModel):
    features: list[float] = Field(min_length=784, max_length=784)

@app.post("/predict")
async def predict(req: PredictRequest):
    x = torch.tensor(req.features, dtype=torch.float32)
    with torch.no_grad():  # CRITICAL: no gradients for inference
        logits = app.state.model(x)
        probs = torch.softmax(logits, dim=0)
    return {"prediction": probs.argmax().item(), "confidence": probs.max().item()}`, explanation: 'Load model ONCE in lifespan. Use torch.no_grad() + model.eval() for inference. Pydantic validates input shape. This is the standard ML serving pattern.' },
    { filename: 'onnx_serving.py', language: 'python', approach: 'production', code: `import onnxruntime as ort
import numpy as np

@asynccontextmanager
async def lifespan(app: FastAPI):
    session = ort.InferenceSession("model.onnx", providers=["CUDAExecutionProvider", "CPUExecutionProvider"])
    app.state.session = session
    app.state.input_name = session.get_inputs()[0].name
    yield

@app.post("/predict/batch")
async def predict_batch(features: list[list[float]]):
    x = np.array(features, dtype=np.float32)  # ONNX expects numpy
    outputs = app.state.session.run(None, {app.state.input_name: x})
    probs = softmax(outputs[0])
    return {"predictions": probs.argmax(axis=1).tolist()}`, explanation: 'ONNX Runtime: 2-5x faster than PyTorch. numpy arrays (not torch tensors). Batch inference: 10-100x throughput vs individual requests.' },
  ],
  configFiles: [],
  lab: { title: 'Deploy a Model as API', steps: [
    { step: 1, title: 'Train model', instruction: 'Train a simple MNIST model', command: 'python train.py' },
    { step: 2, title: 'Export to ONNX', instruction: 'Convert for faster inference', command: 'python export_onnx.py' },
    { step: 3, title: 'Create API', instruction: 'Serve with FastAPI', command: 'Create main.py with lifespan + /predict endpoint' },
    { step: 4, title: 'Benchmark', instruction: 'Compare PyTorch vs ONNX', command: 'ab -n 1000 http://localhost:8000/predict', expectedOutput: 'ONNX: 650 req/s vs PyTorch: 200 req/s (3x faster!)' },
  ]},
  commonErrors: [
    { error: 'Model loaded per request (1000x slower)', fix: 'Load model in lifespan (startup), store in app.state. Access via app.state.model in routes.', rootCause: 'Loading a model takes 1-10 seconds. Doing it per request makes the API unusably slow.' },
    { error: 'Out of memory on GPU', fix: 'Use torch.no_grad() (no gradient storage). Process in smaller batches. Use model.eval() to disable dropout.', rootCause: 'Gradient tracking stores intermediate values. no_grad() frees this memory.' },
  ],
  quiz: [
    { question: 'When should you load the ML model?', options: ['Per request', 'ONCE at startup (lifespan), reuse for all requests', 'Every 100 requests', 'Never'], correctIndex: 1, explanation: 'Loading takes 1-10 seconds. Per request = 1000x slower. Load ONCE in lifespan, store in app.state.' },
    { question: 'Why use ONNX Runtime?', options: ['More accurate', '2-5x faster than PyTorch for inference', 'Required', 'Less memory only'], correctIndex: 1, explanation: 'ONNX Runtime is optimized for inference — graph optimizations, quantization, hardware acceleration. 2-5x faster than PyTorch.' },
  ],
  resources: [{ title: 'ONNX Runtime', url: 'https://onnxruntime.ai/', type: 'docs' }, { title: 'BentoML (ML serving)', url: 'https://bentoml.com/', type: 'tool', isHiddenGem: true }],
  whatToReadNext: 'Read about External APIs (next lesson) — calling Stripe, SendGrid, GitHub from your API with retries and circuit breakers.',
};

// L15: External APIs
export const fastapiL15: Lesson = {
  slug: 'external-apis', title: 'External APIs — httpx, Webhooks, Circuit Breaker',
  subtitle: 'Call external APIs (Stripe, SendGrid), handle webhooks, circuit breakers',
  duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'fastapi',
  objectives: ['Use httpx.AsyncClient with connection pooling','Retry with exponential backoff (tenacity)','Verify webhook signatures (security)','Implement circuit breaker pattern','Handle external API failures gracefully'],
  realWorldContext: 'Every production app calls external APIs: Stripe for payments, SendGrid for email, GitHub for auth. These APIs go down, rate limit, and timeout. Without retries, circuit breakers, and fallbacks, your app fails when they fail. Companies like Netflix use circuit breakers to prevent cascading failures.',
  prerequisites: ['Completed FastAPI L1-L14'],
  conceptDiagram: `EXTERNAL API CALL:
  Your API → httpx.AsyncClient → Stripe API
             ↑ connection pooling
             ↑ timeout (30s)
             ↑ retry (exponential backoff)

WEBHOOK (incoming):
  Stripe → POST /webhooks/stripe (with signature)
  Your API → verify signature (HMAC) → process → 200 OK

CIRCUIT BREAKER:
  CLOSED (normal) → failures → OPEN (reject fast)
  OPEN → timeout → HALF_OPEN (test) → success → CLOSED
  Prevents cascading failures when external service is down`,
  conceptExplanation: ['Use httpx.AsyncClient as a persistent client (connection pooling). Set timeouts: connect=10s, read=30s. Never create a new client per request — reuse one with connection pooling.','Retry with exponential backoff: 1s, 2s, 4s, 8s. Add jitter (random delay) to avoid thundering herd. Never retry 4xx (client error — will fail again). Always retry 5xx and network errors. Use tenacity library.','Circuit breaker: if an external API fails repeatedly, OPEN the circuit (fail fast instead of waiting for timeout). After recovery period, HALF_OPEN (try one request). If it succeeds, CLOSE. If it fails, stay OPEN. This prevents cascading failures.'],
  whyItMatters: 'When Stripe goes down, your payment endpoint should not hang for 30 seconds per request. Circuit breaker fails fast (returns error immediately) instead of waiting. Without retries, a single network blip causes a failed payment. Without webhook verification, attackers can send fake "payment succeeded" webhooks.',
  codeExamples: [
    { filename: 'client.py', language: 'python', approach: 'real-world', code: `import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

class StripeClient:
    def __init__(self):
        self.client = httpx.AsyncClient(
            base_url="https://api.stripe.com/v1",
            timeout=httpx.Timeout(connect=10, read=30, write=10, pool=5),
            headers={"Authorization": f"Bearer {settings.STRIPE_KEY}"},
        )
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=10))
    async def create_payment(self, amount: int):
        r = await self.client.post("/payment_intents", data={"amount": amount, "currency": "usd"})
        r.raise_for_status()
        return r.json()`, explanation: 'httpx.AsyncClient with connection pooling, timeouts, retry with exponential backoff. Reuse client — do not create per request.' },
    { filename: 'webhook.py', language: 'python', approach: 'production', code: `import hmac, hashlib

@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request, bg: BackgroundTasks):
    payload = await request.body()
    sig = request.headers.get("Stripe-Signature", "")
    # VERIFY SIGNATURE (security — do not skip!)
    if not verify_signature(payload, sig, settings.STRIPE_WEBHOOK_SECRET):
        raise HTTPException(400, "Invalid signature")
    event = json.loads(payload)
    # Check idempotency (webhooks sent multiple times!)
    if await already_processed(event["id"]): return {"status": "duplicate"}
    # Process in background (fast 200 response)
    bg.add_task(process_event, event)
    return {"status": "received"}

def verify_signature(payload, sig, secret):
    expected = hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, sig.split("=")[-1])`, explanation: 'Webhook: verify HMAC signature (security!), check idempotency (sent multiple times), process in background (fast response). Never skip signature verification.' },
  ],
  configFiles: [],
  lab: { title: 'Integrate External APIs', steps: [
    { step: 1, title: 'Create httpx client', instruction: 'Set up persistent client', command: 'Create StripeClient class with httpx.AsyncClient' },
    { step: 2, title: 'Add retries', instruction: 'Use tenacity for retry', command: 'Add @retry decorator with exponential backoff' },
    { step: 3, title: 'Add webhook', instruction: 'Create webhook endpoint', command: 'Create POST /webhooks/stripe with signature verification' },
  ]},
  commonErrors: [
    { error: 'httpx.ConnectError on every request', fix: 'Check the URL. Add retry with tenacity. Set reasonable timeouts.', rootCause: 'Network issues or wrong URL. Retries handle transient failures.' },
    { error: 'Webhook signature verification fails', fix: 'Make sure you are using the raw body (await request.body()), not parsed JSON. Use the webhook signing secret, not the API key.', rootCause: 'Signature is computed on raw bytes. Parsing to JSON changes the bytes.' },
  ],
  quiz: [
    { question: 'Why verify webhook signatures?', options: ['For logging', 'Security — prevent fake webhooks from attackers', 'Required by HTTP', 'For performance'], correctIndex: 1, explanation: 'Without verification, anyone can send fake "payment succeeded" webhooks. HMAC signature proves it came from Stripe.' },
    { question: 'When should you NOT retry?', options: ['On 500 errors', 'On network errors', 'On 4xx errors (client error — will fail again)', 'On timeouts'], correctIndex: 2, explanation: '4xx = client error (bad request, unauthorized). Retrying gives same result. Retry 5xx (server error) and network errors (transient).' },
  ],
  resources: [{ title: 'httpx Documentation', url: 'https://www.python-httpx.org/', type: 'docs' }, { title: 'tenacity', url: 'https://github.com/jd/tenacity', type: 'docs' }],
  whatToReadNext: 'Read about Database Advanced (next lesson) — transactions, N+1 queries, eager loading, connection pooling.',
};

// L16: Database Advanced
export const fastapiL16: Lesson = {
  slug: 'db-advanced', title: 'Database Advanced — Transactions, N+1, Indexing',
  subtitle: 'Master database performance — transactions, eager loading, query optimization',
  duration: 85, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'fastapi',
  objectives: ['Use transactions for atomic operations','Fix N+1 queries with selectinload/joinedload','Add indexes for query performance','Use keyset pagination for large tables','Monitor slow queries'],
  realWorldContext: 'Database performance is the #1 bottleneck in most APIs. The N+1 query problem (1 query + N queries for relations) makes apps 100x slower. Senior engineers know how to use EXPLAIN ANALYZE, add indexes, and avoid N+1. This is the difference between a 50ms and 5000ms response.',
  prerequisites: ['Completed FastAPI L11 (Async SQLAlchemy)'],
  conceptDiagram: `N+1 PROBLEM:
  Query 1: SELECT * FROM users → 100 users
  Query 2-101: SELECT * FROM posts WHERE user_id = ? (per user!)
  Total: 101 queries → 500ms

FIX (selectinload):
  Query 1: SELECT * FROM users → 100 users
  Query 2: SELECT * FROM posts WHERE user_id IN (1,2,...,100)
  Total: 2 queries → 10ms (50x faster!)

INDEX STRATEGY:
  ✓ Index: foreign keys, WHERE columns, ORDER BY columns
  ✗ Don't index: low cardinality (boolean), frequently updated
  ✓ Composite: Index("ix_posts_pub_created", "published", "created_at")`,
  conceptExplanation: ['N+1: loading 100 users with their posts fires 101 queries. selectinload(User.posts) loads all posts in one IN query (2 total). joinedload uses JOIN (1 query). Use selectinload for collections, joinedload for one-to-one.','Transactions ensure atomicity: all operations succeed or all fail. Use async with db.begin() for auto commit/rollback. For money transfers, this prevents partial updates (debit without credit).','Index foreign keys, columns in WHERE clauses, and ORDER BY columns. Use EXPLAIN ANALYZE to find slow queries — look for "Seq Scan" (bad, full table scan) vs "Index Scan" (good).'],
  whyItMatters: 'N+1 queries are the #1 performance killer in ORM-based apps. Without indexes, every query scans the entire table. Without transactions, a crash mid-transfer loses money. These skills separate juniors (who write code that "works") from seniors (who write code that scales).',
  codeExamples: [
    { filename: 'queries.py', language: 'python', approach: 'real-world', code: `from sqlalchemy.orm import selectinload, joinedload

# BAD: N+1 (101 queries)
users = (await db.execute(select(User))).scalars().all()
for u in users: print(u.posts)  # query per user!

# GOOD: selectinload (2 queries)
stmt = select(User).options(selectinload(User.posts))
users = (await db.execute(stmt)).scalars().all()
for u in users: print(u.posts)  # already loaded!

# GOOD: joinedload (1 query, for one-to-one)
stmt = select(Post).options(joinedload(Post.author))
posts = (await db.execute(stmt)).scalars().all()
for p in posts: print(p.author.name)  # no extra query

# Transaction
async with db.begin():
    account1.balance -= 100
    account2.balance += 100
    # both committed atomically, or both rolled back`, explanation: 'selectinload: 2 queries (users + IN query for posts). joinedload: 1 query with JOIN. async with db.begin(): atomic transaction.' },
  ],
  configFiles: [],
  lab: { title: 'Fix N+1 Queries', steps: [
    { step: 1, title: 'Enable SQL logging', instruction: 'See all queries', command: 'Set echo=True on engine' },
    { step: 2, title: 'Find N+1', instruction: 'Load users with posts, count queries', command: 'Call endpoint, count SQL queries in log' },
    { step: 3, title: 'Fix with selectinload', instruction: 'Add eager loading', command: 'Add .options(selectinload(User.posts)) to query' },
    { step: 4, title: 'Verify', instruction: 'Count queries again', command: 'Should see 2 queries instead of 101', verification: '50x performance improvement' },
  ]},
  commonErrors: [
    { error: 'MissingGreenlet on lazy load', fix: 'Use selectinload or joinedload. Async cannot do lazy loading (would block event loop).', rootCause: 'SQLAlchemy tries to lazy-load relation access, but async cannot block.' },
  ],
  quiz: [
    { question: 'What is the N+1 problem?', options: ['N queries for 1 item', '1 query loads N items, then 1 query PER item for relations', 'N+1 indexes', 'Network latency'], correctIndex: 1, explanation: '1 query loads N items, then 1 query per item for relations. 100 users = 101 queries. Fix with selectinload (2 queries).' },
    { question: 'selectinload vs joinedload?', options: ['Same thing', 'selectinload for collections (IN query), joinedload for one-to-one (JOIN)', 'joinedload always better', 'selectinload always better'], correctIndex: 1, explanation: 'selectinload: separate IN query (better for collections, avoids duplicate rows). joinedload: single JOIN (better for one-to-one).' },
  ],
  resources: [{ title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'book', isHiddenGem: true }],
  whatToReadNext: 'Read about Testing (next lesson) — TestClient, fixtures, mocking, 95% coverage.',
};

// L17-L20 (summarized for context limits)
export const fastapiL17: Lesson = {
  slug: 'testing', title: 'Testing FastAPI — TestClient, Fixtures, 95% Coverage',
  subtitle: 'Write comprehensive tests with pytest, TestClient, mocking',
  duration: 80, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'fastapi',
  objectives: ['Use TestClient for sync tests and AsyncClient for async','Override dependencies for test database','Write fixtures for clean DB per test','Mock external services','Achieve 95%+ coverage'],
  realWorldContext: 'Untested code is broken code. Companies require 80%+ coverage for production deployment. FastAPI makes testing easy: TestClient makes HTTP requests in-process (no server needed), dependency overrides let you swap the database.',
  prerequisites: ['Completed FastAPI L1-L16'],
  conceptDiagram: `TEST ARCHITECTURE:
  TestClient(app) → HTTP request → FastAPI → Test DB (in-memory SQLite)
  No server needed! Runs in-process, milliseconds per test.

  Fixtures:
  - db_session: clean DB per test (autouse)
  - client: TestClient with DB overridden
  - auth_token: registered + logged in user

  Coverage: pytest --cov=src --cov-report=html`,
  conceptExplanation: ['TestClient uses httpx to make HTTP requests directly to your FastAPI app in-process. No server, no port, no network — runs in milliseconds. For async code, use AsyncClient with ASGITransport.','Override get_db dependency to use in-memory SQLite (fast, isolated). Each test gets a clean database. Use autouse fixture to clean tables before each test.','Mock external services (Stripe, SendGrid) with pytest-mock. Do NOT call real APIs in tests — they are slow, cost money, and fail when the service is down.'],
  whyItMatters: 'Tests catch bugs before production. Without them, every deploy is a gamble. 95% coverage means you can refactor confidently — if you break something, a test fails. CI pipelines block merges if tests fail or coverage drops.',
  codeExamples: [
    { filename: 'test_app.py', language: 'python', approach: 'real-world', code: `import pytest
from httpx import AsyncClient, ASGITransport
from blog.main import app
from blog.db.base import Base, engine

@pytest.fixture(autouse=True)
async def clean_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        r = await c.post("/api/v1/users", json={"name":"Alice","email":"a@x.com"})
        assert r.status_code == 201
        assert "password" not in r.json()  # security!`, explanation: 'AsyncClient with ASGITransport for in-process testing. autouse fixture creates/drops tables per test. Assert response status, body, and security (no password leaked).' },
  ],
  configFiles: [],
  lab: { title: 'Write Tests for Your API', steps: [
    { step: 1, title: 'Install', instruction: 'Install test deps', command: 'uv pip install pytest pytest-asyncio httpx pytest-cov' },
    { step: 2, title: 'Create conftest', instruction: 'Set up fixtures', command: 'Create tests/conftest.py with clean_db and client fixtures' },
    { step: 3, title: 'Write tests', instruction: 'Test all endpoints', command: 'Test create, read, update, delete, auth, errors' },
    { step: 4, title: 'Run coverage', instruction: 'Check coverage', command: 'pytest --cov=src --cov-report=html', verification: 'Open htmlcov/index.html — aim for 95%+' },
  ]},
  commonErrors: [
    { error: 'Tests share state (one test affects another)', fix: 'Use autouse fixture that cleans DB before each test. Each test should be independent.', rootCause: 'No isolation between tests — shared database state.' },
  ],
  quiz: [
    { question: 'How does TestClient work?', options: ['Spins up a real server', 'Makes in-process HTTP requests (no server needed)', 'Uses curl', 'Mocks everything'], correctIndex: 1, explanation: 'TestClient (httpx + ASGITransport) calls your FastAPI app directly in-process. No server, no port, no network. Tests run in milliseconds.' },
  ],
  resources: [{ title: 'FastAPI — Testing', url: 'https://fastapi.tiangolo.com/tutorial/testing/', type: 'docs' }],
  whatToReadNext: 'Read about Error Handling & Logging (next lesson) — global exception handlers, structured logging, Sentry.',
};

export const fastapiL18: Lesson = {
  slug: 'error-logging', title: 'Error Handling & Logging — structlog, Sentry',
  subtitle: 'Global exception handlers, structured JSON logging, Sentry error tracking',
  duration: 65, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'fastapi',
  objectives: ['Create custom exception handlers for consistent error format','Set up structured JSON logging','Integrate Sentry for error tracking','Add request ID middleware for tracing','Override default 422 validation error format'],
  realWorldContext: 'In production, errors happen. Without proper logging, you cannot debug them. Without Sentry, you do not know about them until a user complains. Structured logging (JSON) lets tools like ELK/Datadog search by field. Request IDs let you trace a single request across all logs.',
  prerequisites: ['Completed FastAPI L1-L17'],
  conceptDiagram: `OBSERVABILITY STACK:
  Request → Middleware (request-id, timing) → Route → Response
                    ↓                                     ↓
              Structured Log                    Error? → Sentry

  LOG FORMAT (JSON):
  {"timestamp":"2024-01-15T10:30:00Z","level":"INFO","request_id":"abc-123",
   "method":"GET","path":"/users/1","status":200,"duration_ms":45}

  SENTRY:
  Unhandled exception → Sentry captures → stack trace + context → alert`,
  conceptExplanation: ['Structured logging outputs JSON instead of plain text. This lets ELK/Datadog search by field: "show me all ERROR logs for request_id=abc-123". Use structlog or a custom JSON formatter.','Sentry captures unhandled exceptions in production. It shows the exact stack trace, request context (URL, headers, body), user info, and release version. Set up alerts for new errors.','Custom exception handlers convert your app\'s exceptions into consistent JSON responses. Override FastAPI\'s default 422 handler to match your error format.'],
  whyItMatters: 'Without logging, production bugs are invisible. Without Sentry, you find out about errors from angry users. Without request IDs, you cannot trace a single request through your logs. These are the tools that make production debugging possible.',
  codeExamples: [
    { filename: 'logging.py', language: 'python', approach: 'real-world', code: `import logging, json, sys
from datetime import datetime, timezone

class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "request_id": getattr(record, "request_id", None),
        })

def setup_logging():
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JsonFormatter())
    logging.getLogger().handlers = [handler]
    logging.getLogger().setLevel(logging.INFO)

# Sentry
import sentry_sdk
sentry_sdk.init(dsn=settings.SENTRY_DSN, environment=settings.ENVIRONMENT, traces_sample_rate=0.1)`, explanation: 'JSON formatter for structured logging. Sentry for error tracking. Setup in lifespan.' },
  ],
  configFiles: [],
  lab: { title: 'Add Production Logging', steps: [
    { step: 1, title: 'Set up JSON logging', instruction: 'Create JsonFormatter', command: 'Create logging.py with JSON formatter' },
    { step: 2, title: 'Add request ID middleware', instruction: 'Trace requests', command: 'Add middleware that generates and logs request_id' },
    { step: 3, title: 'Add Sentry', instruction: 'Error tracking', command: 'pip install sentry-sdk && sentry_sdk.init()' },
  ]},
  commonErrors: [{ error: 'Sentry not capturing errors', fix: 'Make sure sentry_sdk.init() is called in lifespan BEFORE any routes. Check DSN is correct.', rootCause: 'Sentry must be initialized before exceptions occur.' }],
  quiz: [
    { question: 'Why use structured (JSON) logging?', options: ['Faster', 'Machine-parseable (ELK, Datadog can search by field)', 'Required', 'Less storage'], correctIndex: 1, explanation: 'JSON logs are structured — tools can search "level=ERROR AND request_id=abc-123". Plain text requires regex parsing.' },
  ],
  resources: [{ title: 'Sentry Python SDK', url: 'https://docs.sentry.io/platforms/python/', type: 'docs' }],
  whatToReadNext: 'Read about Production Deployment (next lesson) — Docker, Nginx, Gunicorn.',
};

export const fastapiL19: Lesson = {
  slug: 'deployment', title: 'Production Deployment — Docker, Nginx, Gunicorn',
  subtitle: 'Deploy FastAPI to production with Docker, Nginx reverse proxy, Gunicorn',
  duration: 80, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'fastapi',
  objectives: ['Create multi-stage Dockerfile for FastAPI','Configure Gunicorn with Uvicorn workers','Set up Nginx as reverse proxy with TLS','Create docker-compose for full stack','Run Alembic migrations on deploy'],
  realWorldContext: 'Production deployment is where your code meets reality. Docker containers, Nginx for TLS termination, Gunicorn for multi-process management — this is the standard stack for every Python API in production. Companies like Uber and Netflix use this exact pattern.',
  prerequisites: ['Completed FastAPI L1-L18'],
  conceptDiagram: `PRODUCTION STACK:
  Internet → Nginx (TLS, rate limit) → Gunicorn (4 workers) → FastAPI → PostgreSQL
                                          ↓
                                    Each worker = Uvicorn process

  Docker:
  Multi-stage: Builder (compilers) → Runtime (minimal, non-root)
  
  Nginx:
  • TLS termination (Let's Encrypt)
  • Rate limiting
  • Static files
  • WebSocket proxy`,
  conceptExplanation: ['Multi-stage Docker builds: builder stage has compilers (builds wheels), runtime stage only has what is needed to run. Final image is 10x smaller and more secure.','Gunicorn manages multiple Uvicorn worker processes (one per CPU core). This gives process-level concurrency. Each worker is a separate Python process running your FastAPI app.','Nginx terminates TLS (HTTPS), rate limits, serves static files, and proxies to Gunicorn. It handles slow clients (Gunicorn workers are not blocked waiting for slow uploads).'],
  whyItMatters: 'Without Docker, your app works differently on every machine. Without Nginx, you have no TLS (HTTPS), no rate limiting, no static file serving. Without Gunicorn, you run a single process (no concurrency). This stack is non-negotiable for production.',
  codeExamples: [
    { filename: 'Dockerfile', language: 'dockerfile', approach: 'production', code: `FROM python:3.12-slim AS builder
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim AS runtime
RUN useradd -m appuser
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --chown=appuser:appuser . .
USER appuser
HEALTHCHECK CMD curl -f http://localhost:8000/health || exit 1
CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]`, explanation: 'Multi-stage: builder installs deps, runtime copies only what is needed. Non-root user. Health check. Gunicorn with 4 Uvicorn workers.' },
  ],
  configFiles: [
    { filename: 'docker-compose.yml', language: 'yaml', content: 'services:\n  api:\n    build: .\n    ports: ["8000:8000"]\n    depends_on: [db, redis]\n  db:\n    image: postgres:16\n    volumes: [pgdata:/var/lib/postgresql/data]\n  redis:\n    image: redis:7\n  nginx:\n    image: nginx\n    ports: ["80:80", "443:443"]\n    volumes: [./nginx.conf:/etc/nginx/nginx.conf]\nvolumes:\n  pgdata:', comment: 'Full stack: API + PostgreSQL + Redis + Nginx' },
  ],
  lab: { title: 'Deploy with Docker', steps: [
    { step: 1, title: 'Create Dockerfile', instruction: 'Multi-stage build', command: 'Create Dockerfile with builder + runtime stages' },
    { step: 2, title: 'Create docker-compose', instruction: 'Full stack', command: 'Create docker-compose.yml with api, db, redis, nginx' },
    { step: 3, title: 'Deploy', instruction: 'Build and run', command: 'docker compose up -d --build', verification: 'curl http://localhost/health returns 200' },
  ]},
  commonErrors: [{ error: 'Docker image too large', fix: 'Use multi-stage build. Use slim base image. Add .dockerignore to exclude .venv, tests, .git.', rootCause: 'Single-stage builds include compilers, build tools, and caches in the final image.' }],
  quiz: [
    { question: 'Why use Gunicorn with Uvicorn workers?', options: ['Faster', 'Multi-process concurrency (one process per CPU core)', 'Required by FastAPI', 'Less memory'], correctIndex: 1, explanation: 'Gunicorn manages multiple Uvicorn worker processes. Each is a separate Python process. This gives process-level concurrency for handling multiple requests simultaneously.' },
  ],
  resources: [{ title: 'FastAPI — Deployment', url: 'https://fastapi.tiangolo.com/deployment/', type: 'docs' }],
  whatToReadNext: 'Read about Monitoring (next lesson) — Prometheus metrics, Grafana dashboards, health checks.',
};

export const fastapiL20: Lesson = {
  slug: 'monitoring', title: 'Monitoring — Prometheus, Grafana, Health Checks',
  subtitle: 'Production observability — metrics, dashboards, health probes',
  duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'fastapi',
  objectives: ['Expose Prometheus metrics at /metrics','Add custom business metrics (users, posts)','Set up Grafana dashboards','Implement health and readiness probes','Create alert rules'],
  realWorldContext: 'In production, you need to know: request rate, latency, error rate, queue depth. Without metrics, you are flying blind. Prometheus + Grafana is the industry standard — used by Google, Amazon, and every Kubernetes cluster.',
  prerequisites: ['Completed FastAPI L1-L19'],
  conceptDiagram: `OBSERVABILITY:
  FastAPI → /metrics (Prometheus format) → Prometheus → Grafana → Dashboards
                                                              ↓
                                                           Alerts

  METRICS:
  • http_requests_total (counter): request count by method, path, status
  • http_request_duration_seconds (histogram): latency P50, P95, P99
  • blog_users_registered_total (counter): business metric
  • blog_db_query_duration (histogram): DB performance

  HEALTH:
  /health → liveness (is the app running?)
  /ready → readiness (is the app ready? DB connected?)`,
  conceptExplanation: ['prometheus-fastapi-instrumentator adds automatic metrics: request count, latency histogram, status codes. Expose at /metrics. Prometheus scrapes this endpoint every 5-15 seconds.','Custom metrics for business logic: Counter (increases only — users registered), Histogram (distribution — query latency), Gauge (up/down — active connections).','Grafana visualizes Prometheus data. Create dashboards: request rate (req/s), error rate (%), P99 latency. Set alerts: error rate > 5%, P99 > 2s, queue > 1000.'],
  whyItMatters: 'Without monitoring, you do not know your API is slow until users complain. Without alerts, you do not know your API is down until your boss calls. Prometheus + Grafana gives you visibility — the ability to see problems before users do.',
  codeExamples: [
    { filename: 'metrics.py', language: 'python', approach: 'real-world', code: `from prometheus_fastapi_instrumentator import Instrumentator
from prometheus_client import Counter, Histogram

# Automatic metrics
Instrumentator().instrument(app).expose(app, endpoint="/metrics")

# Custom business metrics
USERS_REGISTERED = Counter("blog_users_registered_total", "Users registered")
DB_QUERY_TIME = Histogram("blog_db_query_seconds", "DB query time", ["operation"])

@router.post("/register")
async def register(user: UserCreate):
    # ... create user ...
    USERS_REGISTERED.inc()  # increment counter
    return user`, explanation: 'Automatic metrics via Instrumentator. Custom Counter for business events. Histogram for DB query timing. All exposed at /metrics.' },
  ],
  configFiles: [{ filename: 'docker-compose.yml', language: 'yaml', content: 'services:\n  prometheus:\n    image: prom/prometheus\n    ports: ["9090:9090"]\n  grafana:\n    image: grafana/grafana\n    ports: ["3001:3000"]', comment: 'Add Prometheus and Grafana to your stack' }],
  lab: { title: 'Add Monitoring', steps: [
    { step: 1, title: 'Install', instruction: 'Install instrumentator', command: 'uv pip install prometheus-fastapi-instrumentator' },
    { step: 2, title: 'Add metrics', instruction: 'Expose /metrics', command: 'Add Instrumentator to app' },
    { step: 3, title: 'Start Grafana', instruction: 'Run Prometheus + Grafana', command: 'docker compose up prometheus grafana' },
    { step: 4, title: 'Create dashboard', instruction: 'Visualize metrics', command: 'Open Grafana at :3001, add Prometheus datasource, create dashboard', verification: 'See request rate, latency, error rate in real-time' },
  ]},
  commonErrors: [{ error: 'Metrics not appearing in Prometheus', fix: 'Check that /metrics endpoint is accessible. Configure prometheus.yml to scrape your app. Check network policies.', rootCause: 'Prometheus cannot reach your app, or scrape config is wrong.' }],
  quiz: [
    { question: 'What are the 3 pillars of observability?', options: ['CPU, memory, disk', 'Metrics, logs, traces', 'Frontend, backend, DB', 'GET, POST, DELETE'], correctIndex: 1, explanation: 'Metrics (Prometheus — numbers over time), Logs (structured JSON — events), Traces (OpenTelemetry — request flow). Together: full visibility.' },
  ],
  resources: [{ title: 'Prometheus', url: 'https://prometheus.io/docs/', type: 'docs' }, { title: 'Grafana', url: 'https://grafana.com/docs/', type: 'docs' }],
  whatToReadNext: 'Congratulations! You have completed the FastAPI module. Start the capstone project: build a production blog API with all the skills you learned.',
};
