import { Lesson } from '../../types';

// FastAPI L7: Middleware
export const fastapiL7: Lesson = {
  slug: 'middleware',
  title: 'Middleware — CORS, GZip, Trusted Host',
  subtitle: 'Add middleware for CORS, compression, security headers, request timing',
  duration: 60,
  difficulty: 'Intermediate',
  phase: 'Intermediate',
  xp: 150,
  moduleSlug: 'fastapi',

  objectives: [
    'Add CORSMiddleware for web frontend access',
    'Add GZipMiddleware for response compression',
    'Write custom middleware (request ID, timing, security headers)',
    'Understand middleware execution order (LIFO)',
    'Add TrustedHostMiddleware for host header protection',
  ],
  realWorldContext: 'Every production API needs CORS (for frontend), compression (for performance), and security headers (for protection). Without CORS, your React app cannot call your API. Without security headers, you are vulnerable to clickjacking and XSS.',
  prerequisites: ['Completed FastAPI L1-L6'],

  conceptDiagram: `MIDDLEWARE STACK (LIFO — last added is outermost):

  Request → [Custom MW] → [GZip] → [CORS] → [Route Handler]
  Response ← [Custom MW] ← [GZip] ← [CORS] ← [Route Handler]

  Each middleware wraps the next:
  CORS checks origin → GZip compresses → Your code runs → GZip compresses response → CORS adds headers

  ADD ORDER (conceptual):
  1. CORS (outermost — handles preflight OPTIONS)
  2. GZip
  3. Custom (timing, request-id, security headers)
  4. Route handler

  NOTE: With add_middleware(), LAST added is OUTERMOST`,

  conceptExplanation: [
    'Middleware wraps every request. It runs BEFORE the route handler (on request) and AFTER (on response). Use for cross-cutting concerns: CORS, compression, logging, security headers, rate limiting. Middleware does not know which route will handle the request.',
    'CORS (Cross-Origin Resource Sharing) is required when your frontend (localhost:3000) calls your API (localhost:8000) — different origins. Without CORS, browsers block the request. allow_origins specifies which frontend URLs are allowed. NEVER use ["*"] with allow_credentials=True — browsers reject it.',
    'Custom middleware uses @app.middleware("http"). It receives the request and call_next (which calls the next middleware/route). You can modify the request before and the response after. Common: add request IDs, log timing, add security headers.',
  ],
  whyItMatters: 'CORS is the #1 issue frontend developers hit when calling a new API. Security headers (X-Frame-Options, X-Content-Type-Options, HSTS) protect against clickjacking, MIME sniffing, and downgrade attacks. GZip reduces response size by 70%, making your API faster. These are non-negotiable in production.',

  codeExamples: [
    { filename: 'main.py', language: 'python', approach: 'minimal',
      code: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`,
      explanation: 'Minimal CORS. Allows React dev server to call API. Adjust allow_origins for production.' },
    { filename: 'main.py', language: 'python', approach: 'real-world',
      code: `from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import time, uuid

app = FastAPI()

# 1. CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp.com", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. GZip compression (responses > 1000 bytes)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# 3. Trusted Host (prevent host header attacks)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["myapp.com", "*.myapp.com", "localhost"],
)

# 4. Custom: Request ID + Timing
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    request.state.request_id = request_id
    start = time.perf_counter()
    response = await call_next(request)
    elapsed = time.perf_counter() - start
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time"] = f"{elapsed:.3f}s"
    return response

# 5. Custom: Security headers
@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Strict-Transport-Security"] = "max-age=31536000"
    return response`,
      explanation: 'Real-world: CORS (specific origins), GZip (compress), TrustedHost (prevent attacks), request ID + timing (debugging), security headers (protection). All 5 are production essentials.' },
    { filename: 'main.py', language: 'python', approach: 'production',
      code: `# Rate limiting middleware
from collections import defaultdict
from time import time as now
from fastapi.responses import JSONResponse

_rate_store: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 100  # per minute

@app.middleware("http")
async def rate_limiter(request: Request, call_next):
    if request.url.path == "/health":
        return await call_next(request)  # skip health checks

    client_ip = request.client.host if request.client else "unknown"
    current = now()

    _rate_store[client_ip] = [
        t for t in _rate_store[client_ip] if current - t < 60
    ]

    if len(_rate_store[client_ip]) >= RATE_LIMIT:
        return JSONResponse(
            status_code=429,
            content={"error": "Too many requests", "retry_after": 60},
            headers={"Retry-After": "60"},
        )

    _rate_store[client_ip].append(current)
    return await call_next(request)`,
      explanation: 'Production rate limiter: tracks per-IP request timestamps, returns 429 when exceeded. In production, use Redis instead of in-memory dict for multi-process support.' },
  ],

  configFiles: [],

  lab: {
    title: 'Add Middleware to Your API',
    steps: [
      { step: 1, title: 'Add CORS', instruction: 'Enable CORS for frontend', command: 'Add CORSMiddleware to your app' },
      { step: 2, title: 'Add timing middleware', instruction: 'Log request duration', command: 'Add @app.middleware("http") that measures time' },
      { step: 3, title: 'Test CORS', instruction: 'Verify OPTIONS preflight works', command: 'curl -v -X OPTIONS http://localhost:8000/api/v1/posts -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: GET"', expectedOutput: 'HTTP 200 with Access-Control-Allow-Origin header' },
    ],
  },

  commonErrors: [
    { error: 'CORS error in browser: "blocked by CORS policy"', fix: 'Add CORSMiddleware with allow_origins including the frontend URL. Check that allow_credentials is not used with allow_origins=["*"].', rootCause: 'Browser blocks cross-origin requests without CORS headers from the server.' },
    { error: 'allow_origins=["*"] with allow_credentials=True not working', fix: 'Browsers reject this combination. List specific origins instead: ["http://localhost:3000", "https://myapp.com"]', rootCause: 'Security: wildcard origin with credentials allows any site to make authenticated requests.' },
  ],

  quiz: [
    { question: 'Why is CORS needed?', options: ['For security', 'Browsers block cross-origin requests without it', 'For performance', 'Required by HTTP spec'], correctIndex: 1, explanation: 'Browsers enforce same-origin policy. CORS tells the browser which origins are allowed to call the API. Without it, your frontend cannot call your API.' },
    { question: 'What does middleware order matter?', options: ['It does not', 'LIFO — last added is outermost (runs first on request, last on response)', 'FIFO', 'Random'], correctIndex: 1, explanation: 'Middleware wraps like an onion. Last added is outermost. CORS should be outermost to handle preflight OPTIONS before other middleware.' },
  ],

  resources: [
    { title: 'FastAPI — Middleware', url: 'https://fastapi.tiangolo.com/tutorial/middleware/', type: 'docs' },
    { title: 'FastAPI — CORS', url: 'https://fastapi.tiangolo.com/tutorial/cors/', type: 'docs' },
  ],
  whatToReadNext: 'Read about Authentication (next lesson) — JWT tokens, OAuth2 password flow, and password hashing.',
};

// FastAPI L8: Authentication
export const fastapiL8: Lesson = {
  slug: 'authentication',
  title: 'Authentication — OAuth2, JWT, Password Hashing',
  subtitle: 'Implement JWT auth with OAuth2 password flow and bcrypt hashing',
  duration: 85,
  difficulty: 'Intermediate',
  phase: 'Intermediate',
  xp: 250,
  moduleSlug: 'fastapi',

  objectives: [
    'Hash passwords with bcrypt (passlib)',
    'Create and verify JWT tokens (python-jose)',
    'Implement OAuth2 password flow (/token endpoint)',
    'Create get_current_user dependency for protected routes',
    'Add token refresh endpoint',
  ],
  realWorldContext: 'Authentication is required for every app with users. The OAuth2 password flow is the industry standard: user sends username+password, gets JWT access token, includes it in subsequent requests. Companies like Stripe, GitHub, and Spotify all use JWT for API auth.',
  prerequisites: ['Completed FastAPI L1-L7', 'Understanding of Depends() (L6)'],

  conceptDiagram: `OAUTH2 PASSWORD FLOW:

  1. LOGIN
  Client → POST /token (username, password)
  Server → validates credentials → returns {access_token, refresh_token}

  2. AUTHENTICATED REQUEST
  Client → GET /me (Authorization: Bearer <token>)
  Server → decode JWT → get user_id → fetch user → return user

  JWT STRUCTURE:
  header.payload.signature
  {"alg":"HS256"}.{"sub":"42","exp":1234567890,"type":"access"}.signature

  PASSWORD HASHING:
  Plain: "mypassword" → bcrypt → "$2b$12$N9qo8u..." (irreversible)
  Verify: bcrypt.checkpw("mypassword", "$2b$12$...") → True/False

  KEY: NEVER store plaintext passwords. NEVER return password in API.`,

  conceptExplanation: [
    'JWT (JSON Web Token) is a signed token containing user ID and expiry. The server signs it with a secret key. Clients include it in the Authorization header. The server verifies the signature (cannot be forged) and extracts the user ID. Tokens expire (typically 30 min) for security.',
    'Bcrypt is the standard for password hashing. It is intentionally slow (prevents brute force) and adds a salt automatically. Hash with passlib: pwd_context.hash("password"). Verify: pwd_context.verify("password", hashed). NEVER store or return plaintext passwords.',
    'OAuth2PasswordBearer is a FastAPI dependency that extracts the token from the Authorization header. It also configures the Swagger UI "Authorize" button — you can test authenticated endpoints directly from /docs by clicking the lock icon and entering your token.',
  ],
  whyItMatters: 'Without auth, anyone can access any endpoint. In production, you need: 1) users can only see their own data, 2) admins can access admin endpoints, 3) API keys prevent abuse. JWT is stateless (no session storage needed) and scales perfectly. This is the #1 interview topic for backend roles.',

  codeExamples: [
    { filename: 'auth.py', language: 'python', approach: 'minimal',
      code: `from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

@app.get("/me")
async def me(token: str = Depends(oauth2_scheme)):
    return {"token": token}  # just returns the token for now`,
      explanation: 'Minimal: OAuth2PasswordBearer extracts token from Authorization header. Without token, returns 401. The Swagger UI shows a lock icon on /me.' },
    { filename: 'auth.py', language: 'python', approach: 'real-world',
      code: `from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, status

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "your-secret-key"  # use env var in production!
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(user_id: int, expires_minutes: int = 30) -> str:
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    return jwt.encode(
        {"sub": str(user_id), "exp": expire, "type": "access"},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db = Depends(get_db),
) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except (JWTError, ValueError, KeyError):
        raise HTTPException(401, "Could not validate credentials")

    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(401, "User not found")
    return user

@app.post("/token")
async def login(form: OAuth2PasswordRequestForm = Depends(), db = Depends(get_db)):
    user = await get_user_by_email(db, form.username)
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(401, "Incorrect email or password")
    return {
        "access_token": create_access_token(user.id),
        "token_type": "bearer",
    }

@app.get("/me", response_model=UserResponse)
async def me(current_user: User = Depends(get_current_user)):
    return current_user`,
      explanation: 'Real-world: bcrypt hashing, JWT creation/verification, /token login endpoint, get_current_user dependency chain. OAuth2PasswordRequestForm gives username+password fields in Swagger.' },
    { filename: 'auth.py', language: 'python', approach: 'production',
      code: `# Add refresh token + permission deps
def create_refresh_token(user_id: int) -> str:
    expire = datetime.utcnow() + timedelta(days=7)
    return jwt.encode(
        {"sub": str(user_id), "exp": expire, "type": "refresh"},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

@app.post("/refresh")
async def refresh(refresh_token: str, db = Depends(get_db)):
    payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    if payload.get("type") != "refresh":
        raise HTTPException(401, "Invalid refresh token")
    user = await db.get(User, int(payload["sub"]))
    if not user:
        raise HTTPException(401, "User not found")
    return {
        "access_token": create_access_token(user.id),
        "refresh_token": create_refresh_token(user.id),
        "token_type": "bearer",
    }

# Permission dependency
async def get_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(403, "Admin access required")
    return user

@app.delete("/users/{id}")
async def delete_user(id: int, admin: User = Depends(get_admin)):
    # Only admins can reach here
    await delete_from_db(id)
    return {"message": "Deleted"}`,
      explanation: 'Production: refresh tokens (7-day, for seamless re-auth), admin permission dependency. Token types prevent using refresh as access. get_admin chains on get_current_user.' },
  ],

  configFiles: [
    { filename: '.env.example', language: 'bash', content: 'SECRET_KEY=generate-a-random-64-char-key\nJWT_ALGORITHM=HS256\nACCESS_TOKEN_EXPIRE_MINUTES=30\nREFRESH_TOKEN_EXPIRE_DAYS=7', comment: 'SECRET_KEY must be random and long. Generate with: python -c "import secrets; print(secrets.token_urlsafe(48))"' },
  ],

  lab: {
    title: 'Implement JWT Authentication',
    steps: [
      { step: 1, title: 'Install deps', instruction: 'Install auth packages', command: 'uv pip install python-jose passlib[bcrypt] python-multipart' },
      { step: 2, title: 'Create security utils', instruction: 'Password hashing and JWT functions', command: 'Create security.py with hash_password, verify_password, create_access_token, get_current_user' },
      { step: 3, title: 'Create login endpoint', instruction: 'POST /token endpoint', command: 'Create OAuth2PasswordRequestForm endpoint that validates and returns JWT' },
      { step: 4, title: 'Create protected endpoint', instruction: 'GET /me with auth', command: 'Add Depends(get_current_user) to /me endpoint' },
      { step: 5, title: 'Test in Swagger', instruction: 'Use the Authorize button', command: 'Open /docs, click Authorize, enter credentials, test /me', verification: '/me returns user data with token, 401 without' },
    ],
  },

  commonErrors: [
    { error: '401 Unauthorized — "Not authenticated"', fix: 'Make sure you are sending the Authorization header: "Bearer <token>". Check that OAuth2PasswordBearer is configured.', rootCause: 'OAuth2PasswordBearer expects "Authorization: Bearer <token>" header.' },
    { error: 'jwt.exceptions.InvalidSignatureError', fix: 'Use the same SECRET_KEY for encoding and decoding. Load from environment variable, do not hardcode.', rootCause: 'JWT signature must match. Different keys = different signatures = verification fails.' },
    { error: 'passlib cannot find bcrypt', fix: 'Install: pip install "passlib[bcrypt]". Do not install bcrypt separately — passlib manages it.', rootCause: 'passlib needs bcrypt as a backend. The [bcrypt] extra installs it.' },
  ],

  quiz: [
    { question: 'Why use bcrypt instead of MD5 for passwords?', options: ['Faster', 'Intentionally slow (prevents brute force) + auto-salt', 'Smaller output', 'No reason'], correctIndex: 1, explanation: 'Bcrypt is slow by design, making brute-force attacks expensive. It auto-generates a salt. MD5/SHA are fast — bad for passwords.' },
    { question: 'What is in a JWT?', options: ['Username and password', 'User ID (sub), expiry (exp), type — signed with secret key', 'Session data', 'Nothing — it is random'], correctIndex: 1, explanation: 'JWT contains claims: sub (user ID), exp (expiry), type (access/refresh). Signed with server secret — cannot be forged.' },
    { question: 'What does OAuth2PasswordBearer do?', options: ['Creates users', 'Extracts token from Authorization header + adds lock icon to Swagger', 'Hashes passwords', 'Creates JWT tokens'], correctIndex: 1, explanation: 'It is a dependency that extracts "Bearer <token>" from the Authorization header. It also enables the Authorize button in Swagger UI.' },
  ],

  resources: [
    { title: 'FastAPI — Security', url: 'https://fastapi.tiangolo.com/tutorial/security/', type: 'docs' },
    { title: 'JWT.io — Debug JWTs', url: 'https://jwt.io/', type: 'tool' },
    { title: 'OAuth2 Spec', url: 'https://oauth.net/2/', type: 'article' },
  ],
  whatToReadNext: 'Read about File Uploads (next lesson) — handling multipart form data, large file streaming, and S3 integration.',
};

// FastAPI L9: File Uploads
export const fastapiL9: Lesson = {
  slug: 'file-uploads',
  title: 'File Uploads — UploadFile, S3 Integration',
  subtitle: 'Handle file uploads — single, multiple, large files, S3 with presigned URLs',
  duration: 70,
  difficulty: 'Intermediate',
  phase: 'Intermediate',
  xp: 150,
  moduleSlug: 'fastapi',

  objectives: [
    'Upload single and multiple files with UploadFile',
    'Validate file type and size',
    'Stream large files in chunks (memory efficient)',
    'Upload files with form data (metadata)',
    'Integrate with S3 using presigned URLs',
  ],
  realWorldContext: 'Every app that handles user content needs file uploads: profile pictures, documents, videos. Doing it wrong causes memory crashes (loading 10GB file into RAM) or security issues (accepting .exe files). Companies like Dropbox and Google Drive use chunked streaming for large files.',
  prerequisites: ['Completed FastAPI L1-L8'],

  conceptDiagram: `FILE UPLOAD FLOW:

  Client → POST /upload (multipart/form-data)
    └── UploadFile (spooled to disk if > 1MB)
         ├── .filename: original name
         ├── .content_type: MIME type
         ├── .file: SpooledTemporaryFile (file-like)
         └── .read(): returns bytes

  VALIDATION:
  ✓ Check content_type (image/jpeg, application/pdf)
  ✓ Check file size (limit to prevent memory exhaustion)
  ✓ Check actual content (imghdr, not just header)

  LARGE FILES:
  BAD:  contents = await file.read()  # loads entire file into RAM
  GOOD: while chunk := await file.read(8192):  # 8KB chunks
            f.write(chunk)

  S3 PATTERN:
  1. Client requests presigned URL from API
  2. API generates presigned URL (time-limited)
  3. Client uploads directly to S3 (bypasses API)
  4. Client tells API upload is complete`,

  conceptExplanation: [
    'UploadFile is FastAPI\'s file upload handler. It uses SpooledTemporaryFile — small files (< 1MB default) are in memory, larger files spill to disk. This prevents memory crashes. Access the file with await file.read() (all bytes) or await file.read(chunk_size) (streaming).',
    'Always validate file type AND size. content_type header can be spoofed — use imghdr or python-magic to check actual file content. Set a max size to prevent denial of service (someone uploading a 100GB file).',
    'For very large files (video, datasets), use S3 presigned URLs. The API generates a time-limited URL that lets the client upload directly to S3 — your API never handles the file data. This is how YouTube and Dropbox handle large uploads efficiently.',
  ],
  whyItMatters: 'Loading a 10GB file into RAM crashes your server. Accepting .exe files enables malware distribution. Not validating file types leads to security vulnerabilities. Proper file upload handling is critical for any app that accepts user content.',

  codeExamples: [
    { filename: 'upload.py', language: 'python', approach: 'minimal',
      code: `from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    return {
        "filename": file.filename,
        "size": len(contents),
        "type": file.content_type,
    }`,
      explanation: 'Minimal upload. file.read() loads entire file into memory — only for small files.' },
    { filename: 'upload.py', language: 'python', approach: 'real-world',
      code: `from fastapi import FastAPI, UploadFile, File, HTTPException
from pathlib import Path
import imghdr

app = FastAPI()
MAX_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/gif"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    # Validate type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, f"Type {file.content_type} not allowed")

    # Read and validate size
    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(413, "File too large (max 10MB)")

    # Validate actual content (not just header)
    actual_type = imghdr.what(None, h=contents)
    if actual_type not in {"jpeg", "png", "gif"}:
        raise HTTPException(400, "File is not a valid image")

    # Save
    path = Path("uploads") / file.filename
    path.parent.mkdir(exist_ok=True)
    path.write_bytes(contents)

    return {"filename": file.filename, "size": len(contents), "path": str(path)}`,
      explanation: 'Real-world: validates content_type, size, AND actual content (imghdr). Saves to disk. This prevents spoofed headers and oversized files.' },
    { filename: 'upload.py', language: 'python', approach: 'production',
      code: `# Large file streaming + S3 presigned URLs
from fastapi import UploadFile
import boto3
from botocore.exceptions import ClientError

# Stream large file (constant memory)
@app.post("/upload-large")
async def upload_large(file: UploadFile = File(...)):
    CHUNK = 1024 * 1024  # 1MB chunks
    total = 0
    path = Path("uploads") / file.filename
    path.parent.mkdir(exist_ok=True)

    with path.open("wb") as f:
        while chunk := await file.read(CHUNK):
            total += len(chunk)
            if total > 100 * 1024 * 1024:  # 100MB limit
                path.unlink()  # delete partial
                raise HTTPException(413, "File too large")
            f.write(chunk)

    return {"filename": file.filename, "size": total}

# S3 presigned URL pattern
s3 = boto3.client("s3", region_name="us-east-1")

@app.post("/presign-upload")
async def get_presigned_url(filename: str, content_type: str):
    """Generate presigned URL for direct S3 upload."""
    key = f"uploads/{uuid.uuid4()}/{filename}"
    try:
        url = s3.generate_presigned_url(
            "put_object",
            Params={"Bucket": "my-bucket", "Key": key, "ContentType": content_type},
            ExpiresIn=3600,  # 1 hour
        )
        return {"upload_url": url, "key": key}
    except ClientError as e:
        raise HTTPException(500, f"Could not generate URL: {e}")

# Client uploads directly to S3, then tells API
@app.post("/upload-complete")
async def upload_complete(key: str):
    """Client confirms S3 upload is complete."""
    # Verify file exists in S3
    try:
        s3.head_object(Bucket="my-bucket", Key=key)
    except ClientError:
        raise HTTPException(400, "File not found in S3")
    # Save metadata to DB
    return {"message": "Upload confirmed", "key": key}`,
      explanation: 'Production: streaming for large files (constant memory, 1MB chunks). S3 presigned URLs: client uploads directly to S3, API never handles file data. This is how large-scale apps handle uploads.' },
  ],

  configFiles: [],

  lab: {
    title: 'Build a File Upload API',
    steps: [
      { step: 1, title: 'Create upload endpoint', instruction: 'Create FastAPI app with file upload', command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI, UploadFile, File, HTTPException\n\napp = FastAPI()\n\n@app.post("/upload")\nasync def upload(file: UploadFile = File(...)):\n    if file.content_type not in ["image/jpeg", "image/png"]:\n        raise HTTPException(400, "Only JPEG/PNG allowed")\n    contents = await file.read()\n    if len(contents) > 5_000_000:\n        raise HTTPException(413, "Max 5MB")\n    with open(f"uploads/{file.filename}", "wb") as f:\n        f.write(contents)\n    return {"filename": file.filename, "size": len(contents)}\nEOF' },
      { step: 2, title: 'Create uploads dir', instruction: 'Create directory', command: 'mkdir -p uploads' },
      { step: 3, title: 'Run and test', instruction: 'Start server and upload', command: 'uvicorn main:app --reload', verification: 'Upload via /docs or: curl -X POST http://localhost:8000/upload -F "file=@test.jpg"' },
    ],
  },

  commonErrors: [
    { error: '422 — "field required" when uploading', fix: 'Use File(...) not just the parameter. Send as multipart/form-data, not JSON. Use -F in curl, not -d.', rootCause: 'File uploads use multipart/form-data, not application/json.' },
    { error: 'Memory error on large file', fix: 'Do not use file.read() for large files. Stream in chunks: while chunk := await file.read(1024*1024): ...', rootCause: 'file.read() loads entire file into RAM. Use chunked reading for files > 10MB.' },
  ],

  quiz: [
    { question: 'Why use chunked reading for large files?', options: ['Faster', 'Constant memory — does not load entire file into RAM', 'Required by FastAPI', 'More secure'], correctIndex: 1, explanation: 'file.read() loads the entire file into memory. For a 10GB file, that crashes the server. Chunked reading (read(1MB) in loop) uses constant ~1MB memory.' },
    { question: 'What is an S3 presigned URL?', options: ['A permanent URL', 'Time-limited URL that lets client upload directly to S3 (bypasses API)', 'A signed download link', 'An S3 error'], correctIndex: 1, explanation: 'Presigned URLs let clients upload directly to S3. Your API generates the URL, client uploads to S3, API never handles file data. Perfect for large files.' },
  ],

  resources: [
    { title: 'FastAPI — File Uploads', url: 'https://fastapi.tiangolo.com/tutorial/request-files/', type: 'docs' },
    { title: 'AWS S3 Presigned URLs', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html', type: 'docs' },
  ],
  whatToReadNext: 'Read about WebSockets (next lesson) — real-time bidirectional communication for chat, notifications, live updates.',
};

// FastAPI L10: WebSockets
export const fastapiL10: Lesson = {
  slug: 'websockets',
  title: 'WebSockets — Connection Manager, Real-time Chat',
  subtitle: 'Build real-time features with WebSocket endpoints',
  duration: 70,
  difficulty: 'Intermediate',
  phase: 'Intermediate',
  xp: 200,
  moduleSlug: 'fastapi',

  objectives: [
    'Create WebSocket endpoints with @app.websocket()',
    'Build a ConnectionManager to track active connections',
    'Broadcast messages to all connected clients',
    'Handle WebSocketDisconnect for cleanup',
    'Implement a real-time chat application',
  ],
  realWorldContext: 'WebSockets power real-time features: chat apps (WhatsApp, Discord), live dashboards (trading, analytics), collaborative editing (Google Docs), and notifications. Unlike HTTP (request-response), WebSockets keep a connection open for bidirectional communication.',
  prerequisites: ['Completed FastAPI L1-L9'],

  conceptDiagram: `HTTP vs WEBSOCKET:

  HTTP (request-response):
  Client → Request → Server
  Client ← Response ← Server
  (connection closed)

  WEBSOCKET (bidirectional, persistent):
  Client ↔ Server (connection stays open)
  Client → message → Server
  Server → message → Client (push!)
  Server → message → ALL clients (broadcast!)

  CONNECTION MANAGER:
  ┌──────────────────────────────────┐
  │  Server                          │
  │  ┌─────────────────────────────┐ │
  │  │ ConnectionManager           │ │
  │  │  connections: [ws1, ws2, ws3]│ │
  │  │                             │ │
  │  │  connect(ws) → add to list  │ │
  │  │  disconnect(ws) → remove    │ │
  │  │  broadcast(msg) → send all  │ │
  │  └─────────────────────────────┘ │
  └──────────────────────────────────┘
    ↑           ↑           ↑
    ws1         ws2         ws3
    Alice       Bob         Carol`,

  conceptExplanation: [
    'WebSockets keep a persistent connection open between client and server. Unlike HTTP (where the client must request), the server can PUSH messages to the client at any time. This is essential for real-time: chat, notifications, live updates.',
    'A ConnectionManager class tracks all active WebSocket connections. When a client connects, add to the list. When they disconnect, remove. To broadcast, iterate all connections and send. This pattern is used in every real-time app.',
    'Handle WebSocketDisconnect — it fires when a client closes the tab or loses connection. If you do not handle it, your server crashes. Always remove the connection from the manager in the except block.',
  ],
  whyItMatters: 'HTTP is request-response — the server cannot push data to the client. For real-time features (chat, live scores, notifications), you need WebSockets. Without them, you would have to poll the server every second (wasteful, slow). WebSockets give instant updates with minimal overhead.',

  codeExamples: [
    { filename: 'ws.py', language: 'python', approach: 'minimal',
      code: `from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    while True:
        data = await ws.receive_text()
        await ws.send_text(f"Echo: {data}")`,
      explanation: 'Minimal WebSocket: accept connection, loop receiving and sending. This is an echo server.' },
    { filename: 'ws.py', language: 'python', approach: 'real-world',
      code: `from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import list

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)

    def disconnect(self, ws: WebSocket):
        self.active.remove(ws)

    async def broadcast(self, message: str):
        for ws in self.active:
            await ws.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def chat(ws: WebSocket, client_id: str):
    await manager.connect(ws)
    await manager.broadcast(f"{client_id} joined")
    try:
        while True:
            data = await ws.receive_text()
            await manager.broadcast(f"{client_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(ws)
        await manager.broadcast(f"{client_id} left")`,
      explanation: 'Real-world chat: ConnectionManager tracks connections, broadcast sends to all. Handle WebSocketDisconnect for cleanup. This is the core of every chat app.' },
    { filename: 'ws.py', language: 'python', approach: 'production',
      code: `# JSON messages + auth + Redis pub/sub for multi-instance
import json
import redis.asyncio as aioredis

class WebSocketManager:
    """Production WebSocket manager with Redis for multi-instance."""
    def __init__(self):
        self.connections: dict[int, set[WebSocket]] = {}  # user_id → connections
        self.redis = None

    async def connect(self, ws: WebSocket, user_id: int):
        await ws.accept()
        if user_id not in self.connections:
            self.connections[user_id] = set()
        self.connections[user_id].add(ws)

    def disconnect(self, ws: WebSocket, user_id: int):
        if user_id in self.connections:
            self.connections[user_id].discard(ws)

    async def send_to_user(self, user_id: int, message: dict):
        """Send to a specific user across all instances (via Redis)."""
        await self.redis.publish(
            f"ws:user:{user_id}",
            json.dumps(message),
        )

    async def start_listener(self):
        """Listen for Redis messages and deliver to local connections."""
        pubsub = self.redis.pubsub()
        await pubsub.psubscribe("ws:user:*")
        async for msg in pubsub.listen():
            if msg["type"] == "pmessage":
                channel = msg["channel"].decode() if isinstance(msg["channel"], bytes) else msg["channel"]
                user_id = int(channel.split(":")[-1])
                data = msg["data"].decode() if isinstance(msg["data"], bytes) else msg["data"]
                for ws in self.connections.get(user_id, set()):
                    try:
                        await ws.send_text(data)
                    except Exception:
                        pass  # connection closed

# Usage with auth
@app.websocket("/ws")
async def websocket(ws: WebSocket, token: str = Query(...)):
    # Verify JWT
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except Exception:
        await ws.close(code=4001)
        return

    await manager.connect(ws, user_id)
    try:
        while True:
            data = await ws.receive_json()
            # Process message by type
            if data["type"] == "message":
                await manager.send_to_user(data["to"], {
                    "type": "message",
                    "from": user_id,
                    "content": data["content"],
                })
    except WebSocketDisconnect:
        manager.disconnect(ws, user_id)`,
      explanation: 'Production: per-user connection tracking, JWT auth on WebSocket, Redis pub/sub for multi-instance (message reaches user on ANY server). JSON messages with types. This is how Discord/Slack scale WebSockets.' },
  ],

  configFiles: [],

  lab: {
    title: 'Build a Real-time Chat',
    steps: [
      { step: 1, title: 'Create chat app', instruction: 'Create WebSocket chat with ConnectionManager', command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI, WebSocket, WebSocketDisconnect\n\napp = FastAPI()\n\nclass Manager:\n    def __init__(self): self.active = []\n    async def connect(self, ws): await ws.accept(); self.active.append(ws)\n    def disconnect(self, ws): self.active.remove(ws)\n    async def broadcast(self, msg):\n        for ws in self.active: await ws.send_text(msg)\n\nmgr = Manager()\n\n@app.websocket("/ws/{name}")\nasync def chat(ws: WebSocket, name: str):\n    await mgr.connect(ws)\n    await mgr.broadcast(f"{name} joined")\n    try:\n        while True:\n            data = await ws.receive_text()\n            await mgr.broadcast(f"{name}: {data}")\n    except WebSocketDisconnect:\n        mgr.disconnect(ws)\n        await mgr.broadcast(f"{name} left")\nEOF' },
      { step: 2, title: 'Run server', instruction: 'Start uvicorn', command: 'uvicorn main:app --reload' },
      { step: 3, title: 'Test with websocat', instruction: 'Install and test', command: 'pip install websocat && websocat ws://localhost:8000/ws/Alice', verification: 'Open multiple terminals, type messages, see them broadcast' },
    ],
  },

  commonErrors: [
    { error: 'WebSocketDisconnect not caught — server crashes', fix: 'Wrap the receive loop in try/except WebSocketDisconnect. Remove the connection in the except block.', rootCause: 'When client disconnects, receive_text() raises WebSocketDisconnect. If not caught, the server crashes.' },
    { error: 'Messages not reaching all instances', fix: 'Use Redis pub/sub. Each instance subscribes to a channel, broadcasts publish to Redis, all instances receive and deliver to their local connections.', rootCause: 'Each FastAPI worker only knows its own connections. Without Redis, messages do not cross instance boundaries.' },
  ],

  quiz: [
    { question: 'How are WebSockets different from HTTP?', options: ['Faster', 'Persistent bidirectional connection — server can push to client', 'More secure', 'Same thing'], correctIndex: 1, explanation: 'HTTP is request-response (client initiates). WebSockets keep a connection open — either side can send at any time. Server can PUSH without client asking.' },
    { question: 'Why use Redis pub/sub with WebSockets?', options: ['Faster', 'Broadcast across multiple server instances (each only knows its own connections)', 'Required by WebSockets', 'For security'], correctIndex: 1, explanation: 'With 4 FastAPI workers, each only knows its own WebSocket connections. Redis pub/sub broadcasts to ALL instances, so messages reach users connected to any instance.' },
  ],

  resources: [
    { title: 'FastAPI — WebSockets', url: 'https://fastapi.tiangolo.com/advanced/websockets/', type: 'docs' },
    { title: 'WebSocket Protocol', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket', type: 'article' },
  ],
  whatToReadNext: 'Read about Async SQLAlchemy (next lesson) — connecting PostgreSQL with async SQLAlchemy 2.0 for non-blocking database operations.',
};
