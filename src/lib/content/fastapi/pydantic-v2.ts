import { Lesson } from '../../types';

export const fastapiL3: Lesson = {
  slug: 'pydantic-v2',
  title: 'Pydantic v2 — BaseModel, Field, Validators',
  subtitle: 'Master Pydantic v2 — the heart of FastAPI request/response validation',
  duration: 80,
  difficulty: 'Beginner',
  phase: 'Foundation',
  xp: 200,
  moduleSlug: 'fastapi',

  objectives: [
    'Create Pydantic models with Field constraints (ge, le, min_length, pattern)',
    'Use @field_validator for custom validation and transformation',
    'Use @model_validator for cross-field validation (passwords match)',
    'Create separate Create/Update/Response models for security',
    'Use response_model to filter output and prevent data leaks',
  ],
  realWorldContext: 'Every FastAPI endpoint uses Pydantic for validation. Companies like Uber and Netflix use it to ensure data integrity before processing. Without proper validation, your API accepts garbage data that corrupts your database. Pydantic v2 (rewritten in Rust) is 5-50x faster than v1 and is the industry standard for Python data validation.',
  prerequisites: ['Completed FastAPI L1 and L2', 'Basic Python type hints', 'Understanding of JSON'],

  conceptDiagram: `REQUEST (JSON) → Pydantic Model → VALIDATION → Your Code

  {"name":"Alice","age":30,"email":"a@x.com"}
         │
         ▼
  ┌──────────────────┐
  │ UserCreate model │
  │ name: str        │ ← type check (must be string)
  │ age: int = Field │ ← constraint (ge=0, le=150)
  │ email: EmailStr  │ ← format validation
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │ @field_validator │ ← custom validation (lowercase email)
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │ @model_validator │ ← cross-field (passwords match)
  └────────┬─────────┘
           │
     ✓ VALID or ✗ 422 ERROR
     (detailed field-level errors)`,

  conceptExplanation: [
    'Pydantic v2 models validate data at instantiation time. If data does not match the type hints or constraints, it raises ValidationError (which FastAPI converts to 422 responses automatically). Field() adds constraints: ge (greater than or equal), le, gt, lt, min_length, max_length, pattern (regex).',
    '@field_validator lets you add custom validation AND transformation for a single field. Use mode="before" to run before type coercion, mode="after" (default) to run after. Common uses: normalize email to lowercase, validate password strength, strip whitespace.',
    '@model_validator(mode="after") validates the entire model at once — perfect for cross-field validation like "passwords must match" or "end_date must be after start_date". Return self to indicate success, raise ValueError to fail.',
  ],
  whyItMatters: 'In production, input validation is your first line of defense. Without it, users can submit empty strings where emails are expected, negative ages, SQL injection payloads, or JSON with missing required fields. Pydantic handles ALL of this automatically — you write type hints, it validates everything. The response_model parameter is a SECURITY feature: it filters output so you never accidentally leak hashed passwords or internal fields.',

  codeExamples: [
    {
      filename: 'models.py',
      language: 'python',
      approach: 'minimal',
      code: `from pydantic import BaseModel, Field
from typing import Optional

class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=50)
    email: str
    age: int = Field(ge=0, le=150)
    bio: Optional[str] = None

# FastAPI automatically validates POST body
@app.post("/users")
async def create_user(user: UserCreate):
    return user  # already validated!`,
      explanation: 'Minimum viable model. Field() adds constraints. FastAPI validates automatically — invalid input returns 422 with field-level errors.',
    },
    {
      filename: 'models.py',
      language: 'python',
      approach: 'real-world',
      code: `from pydantic import BaseModel, Field, EmailStr, field_validator, model_validator
import re

class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=50)
    email: EmailStr  # validates email format
    username: str = Field(min_length=3, max_length=20, pattern=r"^[a-zA-Z0-9_]+$")
    password: str = Field(min_length=8, max_length=128)
    confirm_password: str
    age: int = Field(ge=13, le=120)
    accept_terms: bool = True

    @field_validator("name")
    @classmethod
    def normalize_name(cls, v: str) -> str:
        return " ".join(v.split()).title()  # strip + title case

    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        return v.lower().strip()

    @field_validator("password")
    @classmethod
    def strong_password(cls, v: str) -> str:
        if not re.search(r"[A-Z]", v): raise ValueError("Must contain uppercase")
        if not re.search(r"[a-z]", v): raise ValueError("Must contain lowercase")
        if not re.search(r"\d", v): raise ValueError("Must contain digit")
        if not re.search(r"[!@#$%^&*]", v): raise ValueError("Must contain special char")
        return v

    @model_validator(mode="after")
    def passwords_match(self) -> "UserCreate":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        if not self.accept_terms:
            raise ValueError("Must accept terms")
        return self

# Separate response model — NO password field!
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    username: str
    created_at: datetime
    model_config = {"from_attributes": True}  # allow from ORM objects`,
      explanation: 'Real-world model: EmailStr validates format, pattern for username, @field_validator for normalization + password strength, @model_validator for cross-field (passwords match). Separate UserResponse (no password) = security.',
    },
    {
      filename: 'endpoint.py',
      language: 'python',
      approach: 'production',
      code: `from fastapi import APIRouter, status, HTTPException
from typing import Optional

router = APIRouter()

# PATCH model — all fields optional
class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    email: Optional[EmailStr] = None
    bio: Optional[str] = Field(None, max_length=500)

@router.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, db = Depends(get_db)):
    # Check duplicates
    if await get_user_by_email(db, user.email):
        raise HTTPException(400, "Email already registered")
    # Hash password, save to DB
    db_user = await save_user(db, user)
    return db_user  # response_model filters out hashed_password!

@router.put("/users/{id}", response_model=UserResponse)
async def update_user(id: int, update: UserUpdate, db = Depends(get_db)):
    user = await db.get(User, id)
    if not user: raise HTTPException(404, "Not found")
    # Only update non-None fields (exclude_unset)
    for key, val in update.model_dump(exclude_unset=True).items():
        setattr(user, key, val)
    await db.commit()
    return user  # response_model ensures no password leaked`,
      explanation: 'Production pattern: separate Create/Update/Response models. response_model=UserResponse is SECURITY — it filters output so hashed_password NEVER appears in the API response, even if you return the full DB object.',
    },
  ],

  configFiles: [],

  lab: {
    title: 'Build a Validated User Registration System',
    steps: [
      { step: 1, title: 'Create the app', instruction: 'Set up FastAPI with Pydantic models', command: 'cat > main.py << \'EOF\'\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel, Field, field_validator\nimport re\n\napp = FastAPI()\n\nclass UserCreate(BaseModel):\n    name: str = Field(min_length=2)\n    email: str = Field(pattern=r"^[^@]+@[^@]+\\.[^@]+$")\n    password: str = Field(min_length=8)\n\n    @field_validator("password")\n    @classmethod\n    def strong(cls, v):\n        if not re.search(r"[A-Z]", v): raise ValueError("Need uppercase")\n        if not re.search(r"\\d", v): raise ValueError("Need digit")\n        return v\n\n@app.post("/register")\nasync def register(user: UserCreate):\n    return {"message": f"Welcome {user.name}!"}\nEOF' },
      { step: 2, title: 'Run the server', instruction: 'Start uvicorn', command: 'uvicorn main:app --reload' },
      { step: 3, title: 'Test valid input', instruction: 'Send a valid registration', command: 'curl -X POST http://localhost:8000/register -H "Content-Type: application/json" -d \'{"name":"Alice","email":"alice@x.com","password":"Strong1A"}\'', expectedOutput: '{"message":"Welcome Alice!"}' },
      { step: 4, title: 'Test invalid input', instruction: 'Try weak password', command: 'curl -X POST http://localhost:8000/register -H "Content-Type: application/json" -d \'{"name":"A","email":"bad","password":"weak"}\'', expectedOutput: '422 with multiple validation errors' },
      { step: 5, title: 'Explore Swagger docs', instruction: 'Open /docs and see the schema', command: 'Open http://localhost:8000/docs in browser', verification: 'Schema shows all validation rules (min_length, pattern, etc.)' },
    ],
  },

  commonErrors: [
    { error: '422 — "value is not a valid email address"', fix: 'Use EmailStr from pydantic (requires email-validator package: pip install email-validator)', rootCause: 'EmailStr validates RFC-compliant email format' },
    { error: '422 — "ensure this value has at least 8 characters"', fix: 'Check Field(min_length=8) constraint. Send a longer password.', rootCause: 'Field constraint enforced before your code runs' },
    { error: '@field_validator not working', fix: 'Add @classmethod decorator BELOW @field_validator. In v2, the order is: @field_validator("field") then @classmethod', rootCause: 'Pydantic v2 requires @classmethod on validators' },
    { error: 'model_config not recognized', fix: 'Use model_config = ConfigDict(from_attributes=True) or model_config = {"from_attributes": True} (not class Config which is v1)', rootCause: 'v2 uses model_config, v1 used class Config' },
    { error: 'Password leaked in response', fix: 'Add response_model=UserResponse to your endpoint. UserResponse must NOT have a password field.', rootCause: 'Without response_model, FastAPI returns ALL fields from the returned object' },
  ],

  quiz: [
    { question: 'What does response_model do?', options: ['Validates request body', 'Filters response to only declared fields (SECURITY!)', 'Caches responses', 'Sets status code'], correctIndex: 1, explanation: 'response_model is a SECURITY feature. It filters output — only fields declared in the model are returned. This prevents leaking hashed_password or internal fields.' },
    { question: 'How to validate that a number is between 1 and 100?', options: ['Field(1, 100)', 'Field(ge=1, le=100)', 'Field(min=1, max=100)', 'Field(range=1-100)'], correctIndex: 1, explanation: 'ge = greater than or equal, le = less than or equal. Field(ge=1, le=100).' },
    { question: 'What does @model_validator(mode="after") do?', options: ['Validates one field', 'Validates the entire model after all fields are set (cross-field validation)', 'Runs before validation', 'Caches the model'], correctIndex: 1, explanation: 'mode="after" runs after all fields are validated. Perfect for cross-field checks like "passwords match" or "end_date > start_date".' },
    { question: 'Why create separate UserCreate and UserResponse models?', options: ['Faster', 'Security: UserResponse excludes password, UserCreate includes it', 'Required by FastAPI', 'Less code'], correctIndex: 1, explanation: 'UserCreate has password (needed for registration). UserResponse does NOT have password (should never be returned to client). This separation prevents data leaks.' },
    { question: 'What does model_dump(exclude_unset=True) do?', options: ['Returns all fields', 'Returns only fields that were explicitly set (not defaults) — perfect for PATCH updates', 'Excludes None values', 'Excludes all fields'], correctIndex: 1, explanation: 'exclude_unset=True returns only fields the user explicitly provided. This is essential for PATCH endpoints where you only update provided fields.' },
  ],

  resources: [
    { title: 'Pydantic v2 Documentation', url: 'https://docs.pydantic.dev/latest/', type: 'docs' },
    { title: 'Pydantic v2 Migration Guide', url: 'https://docs.pydantic.dev/latest/migration/', type: 'article' },
    { title: 'FastAPI — Response Model', url: 'https://fastapi.tiangolo.com/tutorial/response-model/', type: 'docs' },
  ],
  whatToReadNext: 'Read about Pydantic custom types and JSON schema generation. Understanding how Pydantic generates OpenAPI schemas is key to customizing your Swagger docs.',
};
