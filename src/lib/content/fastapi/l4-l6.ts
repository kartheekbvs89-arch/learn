import { Lesson } from '../../types';

// FastAPI L4: Response Models & Status Codes
export const fastapiL4: Lesson = {
  slug: 'response-models',
  title: 'Response Models, Status Codes, Serializers',
  subtitle: 'Control API output with response_model, custom status codes, and serializers',
  duration: 55,
  difficulty: 'Beginner',
  phase: 'Foundation',
  xp: 100,
  moduleSlug: 'fastapi',

  objectives: [
    'Use response_model to filter output fields (security)',
    'Set appropriate HTTP status codes (201, 204, 400, 404, 409, 422)',
    'Return custom JSON responses with JSONResponse',
    'Add response headers and cookies',
    'Use response_model_exclude to hide specific fields',
  ],
  realWorldContext: 'Status codes tell clients what happened: 201 (created), 204 (no content after delete), 409 (conflict/duplicate). Without correct status codes, frontend code cannot distinguish "not found" from "server error". Companies like Stripe use precise status codes and response models to ensure API contracts are clear.',
  prerequisites: ['Completed FastAPI L1-L3', 'Basic HTTP status code knowledge'],

  conceptDiagram: `STATUS CODES:
  200 OK          → Successful GET, PUT
  201 Created     → Successful POST (resource created)
  204 No Content  → Successful DELETE (nothing to return)
  400 Bad Request → Validation/logic error
  401 Unauthorized → Not authenticated (no/invalid token)
  403 Forbidden   → Authenticated but no permission
  404 Not Found   → Resource doesn't exist
  409 Conflict    → Duplicate resource
  422 Unprocessable → Pydantic validation failed
  429 Too Many    → Rate limited
  500 Server Error→ Unhandled exception

RESPONSE MODEL:
  @app.post("/users", response_model=UserResponse)
  → Only UserResponse fields returned (NO password!)
  → Even if you return a DB object with hashed_password
  → FastAPI filters it automatically`,

  conceptExplanation: [
    'response_model is declared on the route decorator, not in the function body. FastAPI serializes the return value through the model, filtering out any fields not in the model. This is the #1 security feature in FastAPI — it prevents accidental data leaks.',
    'Status codes are set with status_code parameter on the route decorator. Use 201 for POST (created), 204 for DELETE (no content), 200 for GET/PUT. For errors, raise HTTPException with the appropriate code: 404 for not found, 400 for bad request, 409 for conflict.',
    'For custom responses (different content type, headers, cookies), use JSONResponse, PlainTextResponse, HTMLResponse, FileResponse, or StreamingResponse. These bypass response_model — use when you need full control.',
  ],
  whyItMatters: 'Returning the wrong status code breaks frontend code. If you return 200 for "not found", the frontend thinks the request succeeded. If you return 500 for "duplicate email", monitoring alerts fire for no reason. Correct status codes are part of the API contract — they tell the client exactly what happened and what to do next.',

  codeExamples: [
    {
      filename: 'main.py', language: 'python', approach: 'minimal',
      code: `from fastapi import FastAPI, status
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str

@app.post("/items", response_model=Item, status_code=status.HTTP_201_CREATED)
async def create(name: str):
    return {"id": 1, "name": name}  # response_model validates output

@app.delete("/items/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(id: int):
    pass  # 204 = success, no body returned`,
      explanation: 'Minimal: status_code on decorator sets the HTTP status. response_model filters output. 204 returns no body.',
    },
    {
      filename: 'main.py', language: 'python', approach: 'real-world',
      code: `from fastapi import FastAPI, status, HTTPException, Response
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/users/{id}", response_model=UserResponse)
async def get_user(id: int):
    user = await db.get(User, id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user  # response_model filters fields

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    if await email_exists(user.email):
        raise HTTPException(409, "Email already registered")
    return await save_user(user)

@app.delete("/users/{id}", status_code=204)
async def delete_user(id: int):
    if not await delete_from_db(id):
        raise HTTPException(404, "User not found")
    # No return — 204 means "no content"`,
      explanation: 'Real-world: 404 for not found, 409 for duplicate, 204 for delete. HTTPException sets status + detail. No return body for 204.',
    },
    {
      filename: 'main.py', language: 'python', approach: 'production',
      code: `from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from datetime import timedelta

@app.post("/login")
async def login(response: Response):
    # Set cookie on response
    response.set_cookie(
        key="session_id",
        value="abc123",
        httponly=True,     # not accessible via JS (XSS protection)
        secure=True,       # only over HTTPS (production)
        samesite="lax",    # CSRF protection
        max_age=3600,      # 1 hour
    )
    return {"message": "Logged in"}

@app.get("/custom")
async def custom_response():
    # Full control — bypass response_model
    return JSONResponse(
        status_code=200,
        content={"data": "value"},
        headers={"X-Custom-Header": "value"},
    )

# Exclude specific fields from response
@app.get("/users/{id}", response_model=UserResponse,
         response_model_exclude={"internal_notes"})
async def get_user(id: int):
    return await get_user_from_db(id)
    # internal_notes excluded even though it's in UserResponse`,
      explanation: 'Production: set cookies with security flags (httponly, secure, samesite). JSONResponse for full control. response_model_exclude to hide specific fields per-endpoint.',
    },
  ],

  configFiles: [],

  lab: {
    title: 'Build CRUD Endpoints with Proper Status Codes',
    steps: [
      { step: 1, title: 'Create CRUD app', instruction: 'Create endpoints with correct status codes', command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI, status, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\nitems = {}\n\nclass Item(BaseModel):\n    name: str\n\nclass ItemResponse(BaseModel):\n    id: int\n    name: str\n\n@app.post("/items", response_model=ItemResponse, status_code=201)\nasync def create(item: Item):\n    id = len(items) + 1\n    items[id] = item\n    return ItemResponse(id=id, name=item.name)\n\n@app.get("/items/{id}", response_model=ItemResponse)\nasync def get(id: int):\n    if id not in items: raise HTTPException(404, "Not found")\n    return ItemResponse(id=id, name=items[id].name)\n\n@app.delete("/items/{id}", status_code=204)\nasync def delete(id: int):\n    if id not in items: raise HTTPException(404, "Not found")\n    del items[id]\nEOF' },
      { step: 2, title: 'Run server', instruction: 'Start uvicorn', command: 'uvicorn main:app --reload' },
      { step: 3, title: 'Test create', instruction: 'POST an item', command: 'curl -X POST http://localhost:8000/items -H "Content-Type: application/json" -d \'{"name":"Widget"}\'', expectedOutput: '{"id":1,"name":"Widget"}' },
      { step: 4, title: 'Test not found', instruction: 'GET nonexistent item', command: 'curl -v http://localhost:8000/items/999', expectedOutput: 'HTTP 404' },
      { step: 5, title: 'Test delete', instruction: 'DELETE an item', command: 'curl -v -X DELETE http://localhost:8000/items/1', expectedOutput: 'HTTP 204 (no body)' },
    ],
  },

  commonErrors: [
    { error: 'Returning body with 204 status', fix: 'Do not return anything from a 204 endpoint. 204 means "No Content".', rootCause: '204 No Content must have empty body by HTTP spec' },
    { error: 'response_model not filtering fields', fix: 'Make sure the return type matches. If you return a dict, FastAPI validates it against response_model. If you return an ORM object, set model_config = {"from_attributes": True}', rootCause: 'response_model only works if the return value can be validated through the model' },
    { error: 'Cookie not set in browser', fix: 'Check: httponly=True (JS cannot read it), secure=True (only HTTPS), samesite="lax" (CSRF). For local dev, set secure=False.', rootCause: 'Browser security flags may prevent cookie from being set' },
  ],

  quiz: [
    { question: 'What status code for "resource created"?', options: ['200', '201', '204', '202'], correctIndex: 1, explanation: '201 Created = POST that creates a new resource. 200 = generic success. 204 = success but no content (DELETE).' },
    { question: 'What does response_model_exclude={"internal_notes"} do?', options: ['Excludes from request', 'Excludes that field from the response output', 'Deletes from DB', 'Nothing'], correctIndex: 1, explanation: 'Excludes specific fields from the response, even if they are in the response_model. Per-endpoint control.' },
    { question: 'When to use JSONResponse instead of returning a dict?', options: ['Always', 'When you need custom status code, headers, or cookies on the response', 'Never', 'Only for errors'], correctIndex: 1, explanation: 'JSONResponse gives full control: custom status, headers, cookies. Bypasses response_model. Use when you need to set response-level properties.' },
  ],

  resources: [
    { title: 'FastAPI — Response Model', url: 'https://fastapi.tiangolo.com/tutorial/response-model/', type: 'docs' },
    { title: 'FastAPI — Status Codes', url: 'https://fastapi.tiangolo.com/tutorial/handling-errors/', type: 'docs' },
    { title: 'HTTP Status Codes Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', type: 'article' },
  ],
  whatToReadNext: 'Read about FastAPI Routers (next lesson) — they let you split routes into multiple files for larger applications.',
};

// FastAPI L5: Routers & App Structure
export const fastapiL5: Lesson = {
  slug: 'routers-structure',
  title: 'Routers & App Structure — APIRouter, Lifespan',
  subtitle: 'Split routes into modules with APIRouter, organize like production apps',
  duration: 60,
  difficulty: 'Beginner',
  phase: 'Foundation',
  xp: 100,
  moduleSlug: 'fastapi',

  objectives: [
    'Split routes into multiple files using APIRouter',
    'Organize project: api/, core/, db/, models/, schemas/, services/',
    'Use lifespan events for startup/shutdown logic',
    'Apply prefixes and tags to routers',
    'Structure a production FastAPI app properly',
  ],
  realWorldContext: 'A real API has 50-200 endpoints. Putting them all in main.py is unmaintainable. Companies split routes by domain: users.py, posts.py, auth.py. This is the same pattern Django and Flask use — separate concerns for team scalability.',
  prerequisites: ['Completed FastAPI L1-L4', 'Understanding of Python modules'],

  conceptDiagram: `PRODUCTION STRUCTURE:
blog-api/
├── src/blog/
│   ├── main.py              ← creates app, includes routers
│   ├── core/
│   │   ├── config.py        ← settings (pydantic-settings)
│   │   └── security.py      ← JWT, password hashing
│   ├── db/
│   │   └── session.py       ← engine, sessionmaker
│   ├── models/              ← SQLAlchemy ORM
│   │   ├── user.py
│   │   └── post.py
│   ├── schemas/             ← Pydantic validation
│   │   ├── user.py
│   │   └── post.py
│   ├── api/
│   │   ├── deps.py          ← shared dependencies
│   │   └── v1/
│   │       ├── __init__.py  ← combines routers
│   │       ├── auth.py
│   │       ├── users.py
│   │       └── posts.py
│   └── services/            ← business logic
│       └── user_service.py
└── tests/

ROUTER FLOW:
  main.py → include_router(api_router, prefix="/api/v1")
    api/v1/__init__.py → include_router(auth, users, posts)
      posts.py → @router.get("/posts")`,
  conceptExplanation: [
    'APIRouter is a mini-FastAPI app. You define routes on it just like on app. Then mount it with app.include_router(router, prefix="/posts", tags=["posts"]). Tags group endpoints in Swagger docs. Prefix adds to all routes in the router.',
    'The lifespan context manager replaces deprecated @app.on_event("startup"). Code before yield runs at startup (connect DB, load ML models), code after yield runs at shutdown (close connections, cleanup). Pass lifespan to FastAPI() constructor.',
    'Business logic goes in services/, not in route handlers. Route handlers (api/) receive validated input, call services, return responses. This separation makes testing easy: test services without HTTP, test routes with mock services.',
  ],
  whyItMatters: 'In production, 5 developers work on the same API. Without proper structure, they conflict on main.py every day. With routers, developer A works on posts.py while developer B works on auth.py — no conflicts. The services/ layer means you can unit test business logic without spinning up a web server.',

  codeExamples: [
    { filename: 'api/v1/posts.py', language: 'python', approach: 'minimal',
      code: `from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_posts():
    return [{"id": 1, "title": "Hello"}]

@router.get("/{post_id}")
async def get_post(post_id: int):
    return {"id": post_id}`,
      explanation: 'Minimal router. Define routes on router instead of app. Mount with include_router later.' },
    { filename: 'api/v1/__init__.py', language: 'python', approach: 'real-world',
      code: `from fastapi import APIRouter
from .auth import router as auth_router
from .users import router as users_router
from .posts import router as posts_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(posts_router, prefix="/posts", tags=["posts"])
# Result: /api/v1/auth/login, /api/v1/users/me, /api/v1/posts`,
      explanation: 'Combine all v1 routers. Each gets a prefix and tag. This file is the single point of router registration.' },
    { filename: 'main.py', language: 'python', approach: 'production',
      code: `from fastapi import FastAPI
from contextlib import asynccontextmanager
from blog.api.v1 import api_router
from blog.core.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # STARTUP
    print("Connecting to DB...")
    # await init_db()
    print("Loading models...")
    # app.state.ml_model = load_model()
    yield
    # SHUTDOWN
    print("Closing connections...")
    # await engine.dispose()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
)

# Mount all v1 routes under /api/v1
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health():
    return {"status": "healthy"}`,
      explanation: 'Production main.py: lifespan for startup/shutdown, config from settings, docs disabled in production, all routes under /api/v1 for versioning.' },
  ],

  configFiles: [],

  lab: {
    title: 'Split Your API into Routers',
    steps: [
      { step: 1, title: 'Create project structure', instruction: 'Create the directory structure', command: 'mkdir -p api/v1 core db models schemas services' },
      { step: 2, title: 'Create posts router', instruction: 'Create api/v1/posts.py', command: 'cat > api/v1/posts.py << \'EOF\'\nfrom fastapi import APIRouter\n\nrouter = APIRouter()\n\n@router.get("/")\nasync def list_posts():\n    return [{"id": 1, "title": "First Post"}]\nEOF' },
      { step: 3, title: 'Create users router', instruction: 'Create api/v1/users.py', command: 'cat > api/v1/users.py << \'EOF\'\nfrom fastapi import APIRouter\n\nrouter = APIRouter()\n\n@router.get("/me")\nasync def get_me():\n    return {"name": "Alice"}\nEOF' },
      { step: 4, title: 'Combine routers', instruction: 'Create api/v1/__init__.py', command: 'cat > api/v1/__init__.py << \'EOF\'\nfrom fastapi import APIRouter\nfrom .posts import router as posts_router\nfrom .users import router as users_router\n\napi_router = APIRouter()\napi_router.include_router(posts_router, prefix="/posts", tags=["posts"])\napi_router.include_router(users_router, prefix="/users", tags=["users"])\nEOF' },
      { step: 5, title: 'Create main.py', instruction: 'Mount the router', command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI\nfrom api.v1 import api_router\n\napp = FastAPI(title="My API")\napp.include_router(api_router, prefix="/api/v1")\nEOF\nuvicorn main:app --reload', verification: 'Visit /docs — should see posts and users endpoints grouped by tag' },
    ],
  },

  commonErrors: [
    { error: 'ImportError: cannot import name api_router', fix: 'Make sure api/v1/__init__.py exists and exports api_router. Check import paths.', rootCause: 'Python treats directories with __init__.py as packages.' },
    { error: 'Routes not showing in /docs', fix: 'Make sure you called app.include_router(api_router, prefix="/api/v1"). Check that routes use @router.get not @app.get.', rootCause: 'Router not mounted on the app.' },
    { error: 'Lifespan not running', fix: 'Pass lifespan to FastAPI() constructor: app = FastAPI(lifespan=lifespan). Do not use @app.on_event (deprecated).', rootCause: 'Lifespan must be passed at app creation, not added later.' },
  ],

  quiz: [
    { question: 'Why use APIRouter?', options: ['Required', 'Split routes into files per domain, combine with include_router()', 'Faster routing', 'For auth only'], correctIndex: 1, explanation: 'APIRouter lets you split routes into modules (auth.py, users.py, posts.py). Combine in __init__.py. Essential for any real project.' },
    { question: 'What replaces @app.on_event("startup")?', options: ['@app.startup()', 'Lifespan context manager passed to FastAPI()', 'Nothing — it is still current', 'Middleware'], correctIndex: 1, explanation: 'Lifespan is the modern way. Code before yield = startup, after yield = shutdown. Pass to FastAPI(lifespan=my_lifespan).' },
    { question: 'Where should business logic go?', options: ['In route handlers', 'In services/ layer (separate from routes)', 'In models/', 'In main.py'], correctIndex: 1, explanation: 'Route handlers (api/) receive input, call services, return response. Services contain business logic. This separation makes testing easy.' },
  ],

  resources: [
    { title: 'FastAPI — Bigger Applications', url: 'https://fastapi.tiangolo.com/tutorial/bigger-applications/', type: 'docs' },
    { title: 'FastAPI — Lifespan Events', url: 'https://fastapi.tiangolo.com/advanced/events/', type: 'docs' },
  ],
  whatToReadNext: 'Read about Dependency Injection (next lesson) — it is how you share logic (DB sessions, auth) across routes without repeating code.',
};

// FastAPI L6: Dependency Injection
export const fastapiL6: Lesson = {
  slug: 'dependency-injection',
  title: 'Dependency Injection — Depends, Yield, Classes',
  subtitle: 'Master FastAPI DI — database sessions, auth, shared logic without repetition',
  duration: 75,
  difficulty: 'Intermediate',
  phase: 'Intermediate',
  xp: 200,
  moduleSlug: 'fastapi',

  objectives: [
    'Use Depends() to inject shared logic (DB sessions, auth)',
    'Create yield dependencies for setup/teardown (DB sessions)',
    'Build class-based dependencies for reusable components',
    'Chain dependencies (dependency graphs)',
    'Apply dependencies globally to routers',
  ],
  realWorldContext: 'Every FastAPI app uses DI for database sessions and authentication. Without DI, you would repeat session management and auth checks in every endpoint. DI is how production apps share logic across 100+ endpoints without code duplication.',
  prerequisites: ['Completed FastAPI L1-L5', 'Basic Python functions'],

  conceptDiagram: `DEPENDENCY GRAPH:

  @app.get("/posts")
  async def list_posts(
    db = Depends(get_db),          ← yield dependency (session)
    user = Depends(get_current_user)  ← auth dependency
  ):
      ...

  Resolution:
  get_db() → creates session, yields it, closes after
    └── get_current_user()
          ├── Depends(get_token)  ← extracts JWT from header
          ├── Depends(get_db)     ← cached! same session as above
          └── decode JWT, fetch user from DB

  KEY: Same dependency called ONCE per request (cached)
       Yield deps = setup + teardown (like context manager)`,

  conceptExplanation: [
    'Depends() tells FastAPI to call a function and inject its return value. The dependency function can itself have Depends() — forming a graph. FastAPI resolves the entire graph automatically. Dependencies are cached per-request: if get_db is called in multiple places, it runs ONCE.',
    'Yield dependencies do setup before yield and teardown after. Perfect for DB sessions: create session (setup), yield it (inject), close session (teardown — runs even on exception). This is like a context manager but for FastAPI.',
    'Class-based dependencies are instantiated per request. Use for pagination, filtering, or any stateful logic. Apply to entire routers with APIRouter(dependencies=[Depends(verify_api_key)]) — all routes in that router require the dependency.',
  ],
  whyItMatters: 'DI eliminates code duplication. Without it, every endpoint would need: create DB session, check auth token, verify permissions, handle errors, close session. With DI, you write this once as a dependency and inject it everywhere. This is how you scale to 100+ endpoints without madness.',

  codeExamples: [
    { filename: 'deps.py', language: 'python', approach: 'minimal',
      code: `from fastapi import Depends

# Basic dependency
def common_params(q: str = None, skip: int = 0, limit: int = 10):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items")
async def list_items(commons: dict = Depends(common_params)):
    return commons  # commons is the return value of common_params`,
      explanation: 'Basic DI: Depends() calls the function and injects the return value. No repetition across endpoints.' },
    { filename: 'deps.py', language: 'python', approach: 'real-world',
      code: `# Yield dependency — DB session (setup/teardown)
async def get_db():
    async with async_session() as session:
        try:
            yield session  # inject this
        except Exception:
            await session.rollback()
            raise
        # session closed automatically after yield

# Auth dependency chain
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),  # cached! same session
) -> User:
    payload = decode_jwt(token)
    user = await db.get(User, payload["sub"])
    if not user:
        raise HTTPException(401, "Invalid token")
    return user

# Permission dependency
async def get_admin(user: User = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(403, "Admin only")
    return user

# Usage
@app.get("/admin")
async def admin_only(admin: User = Depends(get_admin)):
    return {"admin": admin.name}`,
      explanation: 'Real-world: yield dep for DB sessions (auto-close). Auth chain: token → user → admin. Each can fail fast with HTTPException. Same DB session cached across all deps.' },
    { filename: 'deps.py', language: 'python', approach: 'production',
      code: `# Class-based dependency (instantiated per request)
class Pagination:
    def __init__(self, page: int = 1, per_page: int = 20):
        if per_page > 100:
            raise HTTPException(400, "per_page max 100")
        self.skip = (page - 1) * per_page
        self.limit = per_page

@app.get("/posts")
async def list_posts(pag: Pagination = Depends()):
    # pag is a Pagination instance
    return await fetch_posts(skip=pag.skip, limit=pag.limit)

# Apply to entire router
admin_router = APIRouter(dependencies=[Depends(get_admin)])

@admin_router.get("/stats")  # requires admin automatically
async def stats(): ...

@admin_router.delete("/users/{id}")  # also requires admin
async def delete_user(id: int): ...`,
      explanation: 'Production: class-based deps for pagination (reusable, validated). Router-level deps for auth — every route in admin_router requires admin, no need to add Depends() to each.' },
  ],

  configFiles: [],

  lab: {
    title: 'Add Dependencies to Your API',
    steps: [
      { step: 1, title: 'Create DB dependency', instruction: 'Create a yield dependency for DB session', command: 'cat > deps.py << \'EOF\'\nfrom fastapi import Depends\n\n# Simulated DB session\ndef get_db():\n    print("Opening session")\n    db = {"connected": True}\n    try:\n        yield db\n    finally:\n        print("Closing session")\n\n# Auth dependency\ndef get_current_user(token: str = Depends(lambda: "fake-token")):\n    if token != "fake-token":\n        from fastapi import HTTPException\n        raise HTTPException(401, "Invalid token")\n    return {"name": "Alice", "role": "admin"}\nEOF' },
      { step: 2, title: 'Use in endpoints', instruction: 'Inject dependencies', command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI, Depends\nfrom deps import get_db, get_current_user\n\napp = FastAPI()\n\n@app.get("/data")\nasync def get_data(db = Depends(get_db), user = Depends(get_current_user)):\n    return {"db": db, "user": user.name}\nEOF' },
      { step: 3, title: 'Run and test', instruction: 'Start and test', command: 'uvicorn main:app --reload', verification: 'Visit /docs and try the endpoint' },
    ],
  },

  commonErrors: [
    { error: 'Dependency runs multiple times', fix: 'Dependencies are cached per-request by default. If you need a fresh call, use Depends(func, use_cache=False).', rootCause: 'FastAPI caches dependency results per request for performance.' },
    { error: 'Yield dependency not cleaning up', fix: 'Put cleanup in finally block after yield. It runs even on exception.', rootCause: 'Code after yield only runs if the request completes (or raises). Use try/finally for guaranteed cleanup.' },
    { error: 'Class dependency not working', fix: 'Use Depends() without arguments: `pag: Pagination = Depends()`. FastAPI instantiates the class using query params.', rootCause: 'FastAPI inspects __init__ params and treats them as query params.' },
  ],

  quiz: [
    { question: 'What does a yield dependency do?', options: ['Returns a generator', 'Setup before yield, teardown after (like context manager)', 'Same as return', 'Caches values'], correctIndex: 1, explanation: 'Code before yield = setup. Code after = teardown (runs even on exception). Perfect for DB sessions: open → yield → close.' },
    { question: 'Are dependencies cached per request?', options: ['No', 'Yes — same Depends() in multiple places runs once per request', 'Forever', 'Per route'], correctIndex: 1, explanation: 'Cached per-request. If get_db is called in multiple deps, it runs ONCE. Use use_cache=False to disable.' },
    { question: 'How to require auth on ALL routes in a router?', options: ['Add Depends() to each route', 'APIRouter(dependies=[Depends(auth)])', 'Cannot be done', 'Use middleware'], correctIndex: 1, explanation: 'Router-level dependencies apply to ALL routes. No need to add Depends() to each handler.' },
  ],

  resources: [
    { title: 'FastAPI — Dependencies', url: 'https://fastapi.tiangolo.com/tutorial/dependencies/', type: 'docs' },
    { title: 'FastAPI — Yield Dependencies', url: 'https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/', type: 'docs' },
  ],
  whatToReadNext: 'Read about Authentication (next lesson) — it uses dependency injection to verify JWT tokens and inject the current user.',
};
