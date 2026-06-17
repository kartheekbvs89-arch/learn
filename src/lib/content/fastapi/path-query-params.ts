import { Lesson } from '../../types';

export const fastapiL2: Lesson = {
  slug: 'path-query-params',
  title: 'Path Params, Query Params, Request Body',
  subtitle: 'Master every parameter type — path, query, body, headers, cookies with validation',
  duration: 70,
  difficulty: 'Beginner',
  phase: 'Foundation',
  xp: 150,
  moduleSlug: 'fastapi',

  objectives: [
    'Use path parameters with type validation (int, str, enums)',
    'Add query parameters with defaults, validation, and optional filters',
    'Accept request bodies with Pydantic models',
    'Use Query(), Path(), Body() for advanced validation constraints',
    'Handle headers and cookies in route handlers',
  ],
  realWorldContext: 'Every API endpoint accepts some combination of path params (/users/42), query params (/posts?limit=20&tag=python), and request bodies (POST with JSON). Understanding which to use and how to validate them is the difference between a safe API and one that crashes on bad input. Companies like Stripe and GitHub use exact same patterns you learn here.',
  prerequisites: [
    'Completed FastAPI L1 (installation and first API)',
    'Basic understanding of HTTP (GET, POST, PUT, DELETE)',
    'Basic Python type hints (int, str, list, dict)',
  ],

  conceptDiagram: `REQUEST: GET /api/v1/posts/42?limit=10&tag=python
                │       │         │        │
                │       │         │        └── Query param (optional, with default)
                │       │         └── Query param (optional, with default)
                │       └── Path param (required, from URL {post_id})
                └── Route prefix

REQUEST: POST /api/v1/posts
Body: {"title": "Hello", "content": "World", "published": true}
                │
                └── Request body (Pydantic model validates this JSON)

PARAMETER TYPES:
┌──────────────┬──────────────────┬─────────────────────┐
│ Type         │ Source           │ Example             │
├──────────────┼──────────────────┼─────────────────────┤
│ Path param   │ URL path {x}     │ /users/{user_id}   │
│ Query param  │ URL ?key=value   │ ?limit=20&skip=0   │
│ Body         │ Request JSON     │ {"title": "Hello"} │
│ Header       │ HTTP headers     │ X-API-Key: abc123  │
│ Cookie       │ HTTP cookies     │ session_id=xyz     │
└──────────────┴──────────────────┴─────────────────────┘

VALIDATION:
• Type hints: item_id: int → /items/abc returns 422
• Path(ge=1, le=1000): number must be 1-1000
• Query(min_length=2): string must be 2+ chars
• Pydantic model: validates JSON body structure
• All validation errors return 422 with details`,

  conceptExplanation: [
    'FastAPI infers parameter types from your function signature. If a parameter name matches a path variable ({user_id}), it is a path parameter. If it has a default value (limit: int = 20), it is a query parameter. If it is a Pydantic model (post: PostCreate), it is a request body. This automatic inference is what makes FastAPI so concise.',
    'Use Path() and Query() for validation constraints: ge (greater than or equal), le (less than or equal), min_length, max_length, pattern (regex). These constraints are reflected in the auto-generated Swagger docs. For example, Query(ge=1, le=100) on a limit parameter shows "1 ≤ limit ≤ 100" in the docs.',
    'The modern syntax uses Annotated[type, Query(...)] instead of Query() as a default value. This separates the type from the metadata and is the recommended approach for Python 3.9+. Example: `skip: Annotated[int, Query(ge=0)] = 0` instead of `skip: int = Query(0, ge=0)`.',
  ],
  whyItMatters: 'Input validation is your first line of defense against bad data, security vulnerabilities, and crashes. If your API accepts `limit=999999999`, a malicious user can cause memory exhaustion. FastAPI\'s validation (Query(le=100)) prevents this at the framework level — before your code even runs. In production, every parameter should have validation constraints.',

  codeExamples: [
    {
      filename: 'path_params.py',
      language: 'python',
      approach: 'minimal',
      code: `from fastapi import FastAPI

app = FastAPI()

# Path parameter with type validation
@app.get("/users/{user_id}")
async def get_user(user_id: int):  # /users/abc → 422 error
    return {"user_id": user_id}

# String path param
@app.get("/products/{sku}")
async def get_product(sku: str):
    return {"sku": sku}`,
      explanation: 'Type hints drive validation. user_id: int means /users/abc returns 422 (Unprocessable Entity). /users/42 works. This is zero-config validation.',
    },
    {
      filename: 'query_params.py',
      language: 'python',
      approach: 'real-world',
      code: `from fastapi import FastAPI, Query
from typing import Annotated, Optional
from enum import Enum

app = FastAPI()

class SortBy(str, Enum):
    created_at = "created_at"
    title = "title"
    popularity = "popularity"

@app.get("/posts")
async def list_posts(
    skip: Annotated[int, Query(ge=0, description="Items to skip")] = 0,
    limit: Annotated[int, Query(ge=1, le=100, description="Max items (1-100)")] = 20,
    search: Annotated[Optional[str], Query(min_length=2, max_length=100)] = None,
    tag: Annotated[Optional[str], Query(min_length=1)] = None,
    sort_by: SortBy = SortBy.created_at,
    order: Annotated[str, Query(pattern="^(asc|desc)$")] = "desc",
):
    """List posts with pagination, filtering, and sorting."""
    return {
        "skip": skip,
        "limit": limit,
        "filters": {"search": search, "tag": tag},
        "sort": {"by": sort_by, "order": order},
    }

# /posts?skip=10&limit=5&search=python&sort_by=title&order=asc
# /posts?limit=200 → 422 (limit must be ≤ 100)`,
      explanation: 'Query params have defaults (optional). Annotated[type, Query(...)] is modern syntax. Enums show as dropdowns in Swagger. Validation (ge, le, min_length, pattern) returns 422 on violation.',
    },
    {
      filename: 'request_body.py',
      language: 'python',
      approach: 'production',
      code: `from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel, Field, field_validator
from typing import Annotated, Optional
from datetime import datetime

app = FastAPI()

# Pydantic model for request body
class PostCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    content: str = Field(min_length=1)
    published: bool = False
    tags: list[str] = Field(default_factory=list, max_length=10)

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Title cannot be empty or whitespace")
        return v.strip()

# Response model (filters output — security!)
class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    published: bool
    created_at: datetime
    author_id: int

    model_config = {"from_attributes": True}

# POST with request body
@app.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(post: PostCreate):
    # post is already validated PostCreate instance
    # In real app: save to DB
    saved = {
        "id": 1,
        "title": post.title,
        "content": post.content,
        "published": post.published,
        "created_at": datetime.now(),
        "author_id": 42,
    }
    return saved  # response_model filters to PostResponse fields only

# PUT with path param + body
@app.put("/posts/{post_id}", response_model=PostResponse)
async def update_post(post_id: int, post: PostCreate):
    # post_id is path param, post is request body
    # Both validated automatically
    return {"id": post_id, **post.model_dump(), "created_at": datetime.now(), "author_id": 42}`,
      explanation: 'Pydantic model = request body validation. response_model = output filtering (security: only declared fields returned). Field() for constraints. @field_validator for custom validation. Both path params and body in same endpoint.',
    },
  ],

  configFiles: [],

  lab: {
    title: 'Build a REST API with All Parameter Types',
    steps: [
      {
        step: 1,
        title: 'Create the app',
        instruction: 'Create a FastAPI app with path and query params',
        command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI, Query\nfrom typing import Annotated, Optional\n\napp = FastAPI()\n\n@app.get("/items/{item_id}")\nasync def get_item(item_id: int):\n    return {"item_id": item_id}\n\n@app.get("/search")\nasync def search(\n    q: Annotated[str, Query(min_length=2)],\n    limit: Annotated[int, Query(ge=1, le=100)] = 10,\n):\n    return {"query": q, "limit": limit}\nEOF',
        expectedOutput: '(creates main.py)',
        verification: 'Run `cat main.py` to verify',
      },
      {
        step: 2,
        title: 'Run the server',
        instruction: 'Start uvicorn',
        command: 'uvicorn main:app --reload',
        expectedOutput: 'Uvicorn running on http://127.0.0.1:8000',
        verification: 'Open http://localhost:8000/docs',
      },
      {
        step: 3,
        title: 'Test path params',
        instruction: 'Test with valid and invalid inputs',
        command: 'curl http://localhost:8000/items/42',
        expectedOutput: '{"item_id":42}',
        verification: 'Also try: curl http://localhost:8000/items/abc (should get 422)',
      },
      {
        step: 4,
        title: 'Test query params with validation',
        instruction: 'Test the search endpoint',
        command: 'curl "http://localhost:8000/search?q=python&limit=5"',
        expectedOutput: '{"query":"python","limit":5}',
        verification: 'Try: curl "http://localhost:8000/search?q=p" (422: min_length=2)',
      },
      {
        step: 5,
        title: 'Add a POST endpoint with body',
        instruction: 'Add request body handling',
        command: 'cat >> main.py << \'EOF\'\n\nfrom pydantic import BaseModel\n\nclass ItemCreate(BaseModel):\n    name: str\n    price: float\n\n@app.post("/items")\nasync def create_item(item: ItemCreate):\n    return {"created": item}\nEOF',
        expectedOutput: '(appends to main.py)',
        verification: 'Test: curl -X POST http://localhost:8000/items -H "Content-Type: application/json" -d \'{"name":"Widget","price":9.99}\'',
        hint: 'The server auto-reloads. Check /docs to see the new endpoint.',
      },
    ],
  },

  commonErrors: [
    {
      error: '422 Unprocessable Entity — {"detail":[{"loc":["path","item_id"],...}]}',
      fix: 'The path parameter type validation failed. /items/abc with item_id: int returns 422. Use /items/42 instead.',
      rootCause: 'FastAPI validates type hints. "abc" cannot be converted to int, so it returns 422 with detailed error.',
    },
    {
      error: '422 — query parameter validation failed',
      fix: 'Check the constraints. If Query(min_length=2), the query must be 2+ characters. If Query(le=100), the value must be ≤ 100.',
      rootCause: 'Query() constraints are enforced by FastAPI before your code runs.',
    },
    {
      error: 'POST returns 422 — missing required field',
      fix: 'Check your Pydantic model. All fields without defaults are required. Send all required fields in the JSON body.',
      rootCause: 'Pydantic validates the request body. Missing required fields return 422 with field-level errors.',
    },
    {
      error: 'Route not found (404) for /users/me but /users/{user_id} exists',
      fix: 'Define /users/me BEFORE /users/{user_id}. FastAPI matches routes in order — {user_id} matches "me" first and fails int validation.',
      rootCause: 'Route order matters. Dynamic routes must come after fixed routes with the same prefix.',
    },
    {
      error: 'Enum parameter not working in Swagger UI',
      fix: 'Inherit from str and Enum: `class SortBy(str, Enum): ...`. FastAPI shows a dropdown in Swagger for enum types.',
      rootCause: 'FastAPI detects str, Enum subclasses and generates a dropdown in the docs. Plain Enum without str may not work correctly.',
    },
  ],

  quiz: [
    {
      question: 'How does FastAPI know if a parameter is a path param or query param?',
      options: [
        'You specify with @path decorator',
        'It infers: if the name is in the URL path {x}, it is a path param; otherwise query param',
        'Path params must be first',
        'You cannot have both',
      ],
      correctIndex: 1,
      explanation: 'FastAPI infers from the URL path. If the parameter name matches {param_name} in the route, it is a path param. Otherwise, it is a query param (if it has a default) or a request body (if it is a Pydantic model).',
    },
    {
      question: 'How to validate that a query parameter is between 1 and 100?',
      options: ['Query(1, 100)', 'Query(ge=1, le=100)', 'Query(min=1, max=100)', 'Query(range=1-100)'],
      correctIndex: 1,
      explanation: 'ge = greater than or equal, le = less than or equal. Query(ge=1, le=100) enforces 1 ≤ value ≤ 100. Other options: gt (greater than), lt (less than), min_length, max_length, pattern.',
    },
    {
      question: 'What happens when you send invalid JSON to a POST endpoint?',
      options: ['Server crashes (500)', 'FastAPI returns 422 with field-level validation errors', 'The endpoint receives None', 'FastAPI silently ignores invalid fields'],
      correctIndex: 1,
      explanation: 'FastAPI validates the request body with Pydantic. Invalid JSON returns 422 with detailed errors: which fields failed, what was expected, what was received. This is automatic — no try/except needed.',
    },
    {
      question: 'Why define /users/me before /users/{user_id}?',
      options: [
        'Convention only',
        'Otherwise {user_id} matches "me" and fails int validation (422 instead of the correct route)',
        'Faster routing',
        'Required by FastAPI',
      ],
      correctIndex: 1,
      explanation: 'Routes are matched in definition order. /users/{user_id} matches /users/me, then "me" fails int validation. FIX: define fixed routes (/users/me) before dynamic ones (/users/{user_id}).',
    },
    {
      question: 'What does response_model do?',
      options: [
        'Validates the request body',
        'Filters the response to only declared fields (SECURITY: hides internal fields like passwords)',
        'Sets the HTTP status code',
        'Caches the response',
      ],
      correctIndex: 1,
      explanation: 'response_model is a SECURITY feature. It filters the output — only fields declared in the model are returned. This prevents accidentally leaking hashed_password, internal_notes, or other sensitive fields.',
    },
  ],

  resources: [
    { title: 'FastAPI — Path Parameters', url: 'https://fastapi.tiangolo.com/tutorial/path-params/', type: 'docs' },
    { title: 'FastAPI — Query Parameters', url: 'https://fastapi.tiangolo.com/tutorial/query-params/', type: 'docs' },
    { title: 'FastAPI — Request Body', url: 'https://fastapi.tiangolo.com/tutorial/body/', type: 'docs' },
    { title: 'FastAPI — Header Parameters', url: 'https://fastapi.tiangolo.com/tutorial/header-params/', type: 'docs' },
  ],
  whatToReadNext: 'Read about Pydantic v2 models (next lesson) — they are the foundation of request/response validation in FastAPI. Understanding Field(), @field_validator, and model_config is essential.',
};
