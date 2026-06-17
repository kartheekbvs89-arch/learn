import { Module } from '../types';

export const fastapiModule: Module = {
  id: 'fastapi',
  title: 'FastAPI - Modern Web APIs',
  icon: '⚡',
  color: '#009688',
  gradient: 'linear-gradient(135deg, #009688 0%, #00BCD4 100%)',
  description: 'Build production-grade REST APIs with FastAPI. From first route to authentication, middleware, websockets, and deployment.',
  level: 'All Levels',
  lessons: [
    {
      id: 'fa-01',
      title: 'First API - Routes, Path Parameters, Query Parameters',
      subtitle: 'Set up FastAPI, define routes, handle path and query params',
      duration: 40,
      difficulty: 'Beginner',
      content: [
        'FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It was created by Sebastian Ramirez in 2018. Key features: automatic OpenAPI/Swagger docs, async support, type validation via Pydantic, and incredible speed (on par with Node.js and Go).',
        'Install FastAPI and uvicorn (ASGI server): `pip install fastapi uvicorn`. Run a dev server with `uvicorn main:app --reload`. The --reload flag auto-restarts on code changes. For production, use `gunicorn -k uvicorn.workers.UvicornWorker main:app`.',
        'FastAPI uses Python type hints to do everything: validate inputs, generate docs, serialize outputs. Path parameters come from the URL path. Query parameters come from the URL query string. The framework infers which is which from your function signature.',
        'One killer feature: visit /docs for interactive Swagger UI, /redoc for ReDoc. These are auto-generated from your code. You can test every endpoint directly from the browser - no Postman needed for basic testing.'
      ],
      codeExamples: [
        {
          filename: 'main.py',
          language: 'python',
          code: 'from fastapi import FastAPI\n\napp = FastAPI(\n    title="My API",\n    description="Learning FastAPI",\n    version="1.0.0",\n)\n\n# Basic route\n@app.get("/")\nasync def root():\n    return {"message": "Hello, World!"}\n\n# Path parameter\n@app.get("/users/{user_id}")\nasync def get_user(user_id: int):  # type hint = validation\n    return {"user_id": user_id}\n\n# Query parameters\n@app.get("/search")\nasync def search(q: str, limit: int = 10):  # q required, limit optional\n    return {"query": q, "limit": limit}\n\n# Mixed path + query\n@app.get("/items/{item_id}")\nasync def read_item(item_id: int, q: str | None = None):\n    result = {"item_id": item_id}\n    if q:\n        result["q"] = q\n    return result\n\n# Run: uvicorn main:app --reload\n# Visit: http://localhost:8000/docs',
          explanation: 'Path parameters come from {x} in URL. Query params come from function arguments with defaults. Type hints enable validation - /users/abc returns 422, /users/123 works.'
        },
        {
          filename: 'http_methods.py',
          language: 'python',
          code: 'from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\n# Pydantic model for request body\nclass Item(BaseModel):\n    name: str\n    price: float\n    is_offer: bool | None = None\n\n# In-memory "database"\nitems = {}\n\n@app.get("/items")\nasync def list_items():\n    return {"items": list(items.values())}\n\n@app.post("/items")\nasync def create_item(item: Item):\n    item_id = len(items) + 1\n    items[item_id] = item.model_dump()\n    return {"id": item_id, **item.model_dump()}\n\n@app.get("/items/{item_id}")\nasync def get_item(item_id: int):\n    if item_id not in items:\n        raise HTTPException(status_code=404, detail="Item not found")\n    return items[item_id]\n\n@app.put("/items/{item_id}")\nasync def update_item(item_id: int, item: Item):\n    if item_id not in items:\n        raise HTTPException(status_code=404, detail="Item not found")\n    items[item_id] = item.model_dump()\n    return {"id": item_id, **item.model_dump()}\n\n@app.delete("/items/{item_id}")\nasync def delete_item(item_id: int):\n    if item_id not in items:\n        raise HTTPException(status_code=404, detail="Item not found")\n    deleted = items.pop(item_id)\n    return {"deleted": deleted}',
          explanation: 'Use @app.get/post/put/delete for HTTP methods. Pydantic BaseModel validates request body. Raise HTTPException for errors with status codes.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a /calculate/{operation} endpoint that takes two numbers as query params (a, b) and returns the result of +, -, *, /. Return 400 for division by zero.',
          starterCode: 'from fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n\n@app.get("/calculate/{operation}")\nasync def calculate(operation: str, a: float, b: float):\n    # your code\n    pass\n',
          hint: 'Use if/elif on operation. Raise HTTPException(400) for invalid operation or division by zero.',
          solution: 'from fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n\n@app.get("/calculate/{operation}")\nasync def calculate(operation: str, a: float, b: float):\n    if operation == "add":\n        result = a + b\n    elif operation == "sub":\n        result = a - b\n    elif operation == "mul":\n        result = a * b\n    elif operation == "div":\n        if b == 0:\n            raise HTTPException(400, "Cannot divide by zero")\n        result = a / b\n    else:\n        raise HTTPException(400, f"Unknown operation: {operation}")\n    return {"operation": operation, "a": a, "b": b, "result": result}',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'How does FastAPI know if a parameter is a path param or query param?',
          options: ['You specify with @path decorator', 'It infers from the URL path and function signature', 'Path params must be first', 'You cannot have both'],
          correctIndex: 1,
          explanation: 'FastAPI infers from the URL path - parameters in {x} are path params, others are query params.'
        },
        {
          question: 'What is the dev server command?',
          options: ['python main.py', 'fastapi run', 'uvicorn main:app --reload', 'flask run'],
          correctIndex: 2,
          explanation: 'uvicorn main:app --reload runs the FastAPI app in main.py with hot reload.'
        },
        {
          question: 'Where are auto-generated API docs?',
          options: ['/api-docs', '/docs', '/documentation', '/swagger'],
          correctIndex: 1,
          explanation: 'FastAPI auto-generates Swagger UI at /docs and ReDoc at /redoc.'
        }
      ],
      keyTakeaways: [
        'FastAPI uses Python type hints for validation and docs generation',
        'Path params come from {x} in URL, query params from function args',
        'Visit /docs for interactive Swagger UI - no Postman needed',
        'Run dev server with `uvicorn main:app --reload`',
        'Raise HTTPException for error responses with status codes',
        'Pydantic BaseModel validates request bodies automatically'
      ],
      resources: [
        { title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', type: 'docs' },
        { title: 'FastAPI Tutorial - Full Course', url: 'https://www.youtube.com/watch?v=0sOvHCWFrdU', type: 'video' },
        { title: 'FastAPI Best Practices', url: 'https://github.com/zhanymkanov/fastapi-best-practices', type: 'article', isHiddenGem: true },
      ]
    },

    {
      id: 'fa-02',
      title: 'Pydantic Models & Request Validation',
      subtitle: 'Define schemas, validate data, nested models, custom validators',
      duration: 55,
      difficulty: 'Beginner',
      content: [
        'Pydantic is the heart of FastAPI. It defines data schemas with Python type hints and validates incoming/outgoing data. Pydantic v2 (2023) is rewritten in Rust and 5-50x faster than v1. Use BaseModel to define schemas.',
        'Pydantic models support: optional fields, default values, complex types (EmailStr, HttpUrl, UUID, datetime), nested models, lists, dicts, enums, and custom validators. Validation happens automatically when data is parsed.',
        'Use Field() for additional constraints: max_length, min_length, ge (greater than or equal), le, regex pattern, default_factory. Custom validators with @field_validator (v2) or @validator (v1) let you add complex validation logic.',
        'In FastAPI, use Pydantic models as: request body (function parameter), response model (response_model parameter), and for query params (Query/Path/Body dependencies). Response models filter output - only declared fields are returned.'
      ],
      codeExamples: [
        {
          filename: 'pydantic_models.py',
          language: 'python',
          code: 'from pydantic import BaseModel, Field, EmailStr, field_validator\nfrom typing import Optional\nfrom datetime import datetime\nfrom enum import Enum\n\nclass Role(str, Enum):\n    ADMIN = "admin"\n    USER = "user"\n    GUEST = "guest"\n\nclass Address(BaseModel):\n    street: str\n    city: str\n    zip_code: str = Field(pattern=r"^\\d{5}$")  # regex validation\n\nclass UserCreate(BaseModel):\n    name: str = Field(min_length=2, max_length=50)\n    email: EmailStr  # validates email format\n    age: int = Field(ge=13, le=120)  # 13-120\n    role: Role = Role.USER\n    address: Optional[Address] = None\n    tags: list[str] = Field(default_factory=list, max_length=10)\n    created_at: datetime = Field(default_factory=datetime.now)\n\n    # Custom validator\n    @field_validator("name")\n    @classmethod\n    def name_must_be_capitalized(cls, v: str) -> str:\n        if not v[0].isupper():\n            raise ValueError("Name must start with capital letter")\n        return v.strip()\n\n# Validation happens on instantiation\ntry:\n    user = UserCreate(\n        name="alice",  # fails - lowercase\n        email="not-an-email",\n        age=200,  # fails - > 120\n    )\nexcept ValidationError as e:\n    print(e.errors())\n\n# Valid\nuser = UserCreate(\n    name="Alice",\n    email="alice@example.com",\n    age=30,\n    address=Address(street="123 Main", city="NYC", zip_code="10001"),\n)\nprint(user.model_dump())  # convert to dict\nprint(user.model_dump_json(indent=2))  # JSON string',
          explanation: 'Pydantic models validate on instantiation. Use Field() for constraints (min/max/pattern). Custom validators with @field_validator. Enums, nested models, and complex types work seamlessly.'
        },
        {
          filename: 'fastapi_schemas.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Query, Path\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nclass ItemCreate(BaseModel):\n    name: str = Field(min_length=1, max_length=100)\n    price: float = Field(gt=0)  # greater than 0\n    description: str | None = None\n\nclass ItemResponse(BaseModel):\n    id: int\n    name: str\n    price: float\n    description: str | None\n\n    model_config = {\n        "from_attributes": True  # allow from ORM objects\n    }\n\n# response_model filters output - only declared fields returned\n@app.post("/items", response_model=ItemResponse)\nasync def create_item(item: ItemCreate):\n    # In real app, save to DB\n    saved = {"id": 1, **item.model_dump(), "secret_field": "hidden"}\n    return saved  # secret_field is filtered out!\n\n# Query parameter validation\n@app.get("/items")\nasync def list_items(\n    q: str | None = Query(None, min_length=2, max_length=50),\n    limit: int = Query(10, ge=1, le=100),  # 1-100\n    offset: int = Query(0, ge=0),\n):\n    return {"q": q, "limit": limit, "offset": offset}\n\n# Path parameter validation\n@app.get("/items/{item_id}")\nasync def get_item(\n    item_id: int = Path(ge=1),  # must be >= 1\n):\n    return {"item_id": item_id}',
          explanation: 'Use response_model to filter output - only declared fields are returned (security feature). Query() and Path() add validation to query/path params.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a Product schema with name, price (positive), sku (10 chars), and an in_stock boolean. Add a custom validator that uppercases the SKU.',
          starterCode: 'from pydantic import BaseModel, Field, field_validator\n\nclass Product(BaseModel):\n    # your fields\n    pass\n',
          hint: 'Use Field(min_length=10, max_length=10) for SKU. Use @field_validator to uppercase.',
          solution: 'from pydantic import BaseModel, Field, field_validator\n\nclass Product(BaseModel):\n    name: str = Field(min_length=1, max_length=200)\n    price: float = Field(gt=0)\n    sku: str = Field(min_length=10, max_length=10)\n    in_stock: bool = True\n\n    @field_validator("sku")\n    @classmethod\n    def uppercase_sku(cls, v: str) -> str:\n        return v.upper()\n\np = Product(name="Widget", price=9.99, sku="widget0001")\nprint(p.sku)  # WIDGET0001',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does response_model do?',
          options: ['Validates the request body', 'Filters the response to only declared fields', 'Caches responses', 'Sets the HTTP status code'],
          correctIndex: 1,
          explanation: 'response_model filters the output - only fields declared in the model are returned, hiding internal fields.'
        },
        {
          question: 'How do you validate that a number is between 1 and 100?',
          options: ['Field(1, 100)', 'Field(ge=1, le=100)', 'Field(min=1, max=100)', 'Field(range=1-100)'],
          correctIndex: 1,
          explanation: 'Field(ge=1, le=100) - ge = greater than or equal, le = less than or equal.'
        },
        {
          question: 'What does @field_validator do?',
          options: ['Validates field exists', 'Adds custom validation logic', 'Marks field as required', 'Caches field value'],
          correctIndex: 1,
          explanation: '@field_validator lets you add custom validation logic for a field.'
        }
      ],
      keyTakeaways: [
        'Pydantic models validate data on instantiation',
        'Use Field() for constraints: min_length, max_length, ge, le, pattern',
        'Custom validators with @field_validator (v2) add complex validation',
        'response_model filters output - security feature for hiding fields',
        'Use Query() and Path() to validate query/path parameters',
        'Nested models, enums, and complex types (EmailStr, HttpUrl) work natively'
      ],
      resources: [
        { title: 'Pydantic Documentation', url: 'https://docs.pydantic.dev/', type: 'docs' },
        { title: 'FastAPI - Request Body', url: 'https://fastapi.tiangolo.com/tutorial/body/', type: 'docs' },
      ]
    },

    {
      id: 'fa-03',
      title: 'Dependency Injection System',
      subtitle: 'Depends(), reusable dependencies, yield dependencies, classes',
      duration: 50,
      difficulty: 'Intermediate',
      content: [
        'FastAPI has a powerful dependency injection system. Use `Depends()` to declare dependencies - FastAPI calls them and injects the return value. Dependencies can themselves have dependencies, forming a graph. This is great for: database sessions, authentication, configuration, common parameters.',
        'Dependencies are cached per-request by default. If multiple routes depend on the same function, it is called once per request. Use `use_cache=False` to disable caching. Class-based dependencies are instantiated per request.',
        'Yield dependencies (FastAPI 0.93+) let you do setup/teardown - useful for database sessions, transactions, file handles. Code before `yield` is setup, code after is teardown (runs even if exception).',
        'Dependencies can be: functions, classes (instantiated), or generators. Use them at route level with Depends(), or globally with `app = FastAPI(dependencies=[Depends(verify_token)])`. Router-level dependencies apply to all routes in the router.'
      ],
      codeExamples: [
        {
          filename: 'dependencies.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Depends, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\n# Function dependency\ndef common_parameters(q: str | None = None, limit: int = 10):\n    return {"q": q, "limit": limit}\n\n@app.get("/items")\nasync def read_items(commons: dict = Depends(common_parameters)):\n    return {"data": commons}\n\n# Class dependency (instantiated per request)\nclass Pagination:\n    def __init__(self, page: int = 1, size: int = 10):\n        self.page = page\n        self.size = size\n        self.offset = (page - 1) * size\n\n@app.get("/users")\nasync def list_users(pag: Pagination = Depends()):\n    return {"page": pag.page, "offset": pag.offset, "limit": pag.size}\n\n# Yield dependency - setup/teardown (like context manager)\ndef get_db():\n    db = {"connected": True}  # simulate DB connection\n    try:\n        yield db  # this is the value injected\n    finally:\n        db["connected"] = False  # cleanup\n        print("DB closed")\n\n@app.get("/data")\nasync def get_data(db = Depends(get_db)):\n    return {"db_status": db["connected"]}\n\n# Authentication dependency\ndef verify_token(token: str):\n    if token != "secret":\n        raise HTTPException(401, "Invalid token")\n    return {"user": "alice"}\n\n@app.get("/secure")\nasync def secure_endpoint(user = Depends(verify_token)):\n    return {"user": user}\n\n# Global dependencies - applied to all routes\nsecure_app = FastAPI(dependencies=[Depends(verify_token)])\n\n# Sub-dependencies (form a graph)\ndef get_query(q: str | None = None):\n    return q\n\ndef get_query_or_default(q: str | None = Depends(get_query)):\n    return q or "default"\n\n@app.get("/search")\nasync def search(query: str = Depends(get_query_or_default)):\n    return {"query": query}',
          explanation: 'Depends() injects return values. Yield dependencies do setup/teardown. Classes are instantiated per request. Sub-dependencies form a graph.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a dependency `get_current_user` that checks an Authorization header and returns the user. Use it on a /me endpoint.',
          starterCode: 'from fastapi import FastAPI, Depends, Header, HTTPException\n\napp = FastAPI()\n\ndef get_current_user(authorization: str = Header(...)):\n    # your code\n    pass\n\n@app.get("/me")\nasync def me(user = Depends(get_current_user)):\n    return user\n',
          hint: 'Check if authorization starts with "Bearer ". Extract token, return user dict.',
          solution: 'from fastapi import FastAPI, Depends, Header, HTTPException\n\napp = FastAPI()\n\nfake_users = {"abc123": {"id": 1, "name": "Alice"}}\n\ndef get_current_user(authorization: str = Header(...)) -> dict:\n    if not authorization.startswith("Bearer "):\n        raise HTTPException(401, "Invalid auth scheme")\n    token = authorization[7:]  # strip "Bearer "\n    user = fake_users.get(token)\n    if not user:\n        raise HTTPException(401, "Invalid token")\n    return user\n\n@app.get("/me")\nasync def me(user: dict = Depends(get_current_user)):\n    return user',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'How are dependencies cached?',
          options: ['Never cached', 'Per-request (same call returns same value within a request)', 'Forever', 'Per-route'],
          correctIndex: 1,
          explanation: 'By default, dependencies are cached per-request. Same Depends() in multiple places only runs once per request.'
        },
        {
          question: 'What is a yield dependency useful for?',
          options: ['Async code', 'Setup/teardown like DB sessions', 'Caching', 'Nothing'],
          correctIndex: 1,
          explanation: 'Yield dependencies run setup before yield, teardown after (even on exceptions). Perfect for DB sessions.'
        },
        {
          question: 'How to apply a dependency to all routes in the app?',
          options: ['app.dependencies = [...]', 'FastAPI(dependencies=[Depends(...)])', '@app.middleware', 'Cannot be done'],
          correctIndex: 1,
          explanation: 'Pass dependencies=[Depends(...)] to FastAPI() or APIRouter() to apply to all routes.'
        }
      ],
      keyTakeaways: [
        'Depends() injects return values into route functions',
        'Dependencies can have sub-dependencies - forming a graph',
        'Yield dependencies do setup/teardown (DB sessions, transactions)',
        'Class-based dependencies are instantiated per request',
        'Dependencies are cached per-request by default',
        'Apply globally with FastAPI(dependencies=[...]) or per-router'
      ],
      resources: [
        { title: 'FastAPI Dependencies', url: 'https://fastapi.tiangolo.com/tutorial/dependencies/', type: 'docs' },
        { title: 'FastAPI - Yield Dependencies', url: 'https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/', type: 'docs' },
      ]
    },

    {
      id: 'fa-04',
      title: 'Database Integration with SQLAlchemy',
      subtitle: 'Connect Postgres, define models, CRUD, async sessions',
      duration: 60,
      difficulty: 'Intermediate',
      content: [
        'FastAPI works great with SQLAlchemy. Use async SQLAlchemy 2.0 for non-blocking DB operations. The pattern: define models in models.py, create an async engine and session factory, use a yield dependency to provide sessions to routes.',
        'For async SQLAlchemy, use `create_async_engine` with asyncpg driver (PostgreSQL) or aiosqlite (SQLite). Use `AsyncSession` and `async_sessionmaker`. Always await session.execute() - it returns a Result object, use .scalars()/.first()/.all() to get data.',
        'SQLAlchemy 2.0 uses typed Mapped[] annotations. Define models with `class User(Base)` using `Mapped[int] = mapped_column(primary_key=True)`. This gives type safety in your IDE and works with mypy/pyright.',
        'For migrations, use Alembic. Run `alembic init alembic`, configure it to use your models, then `alembic revision --autogenerate -m "create users"` and `alembic upgrade head`.'
      ],
      codeExamples: [
        {
          filename: 'database.py',
          language: 'python',
          code: 'from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship\nfrom typing import Optional\nfrom datetime import datetime\n\n# Async engine\nengine = create_async_engine(\n    "postgresql+asyncpg://user:pass@localhost:5432/mydb",\n    echo=True,  # log SQL\n    pool_size=20,\n    max_overflow=10,\n)\n\n# Session factory\nasync_session = async_sessionmaker(engine, expire_on_commit=False)\n\n# Base class\nclass Base(DeclarativeBase):\n    pass\n\n# Models with type annotations (SQLAlchemy 2.0)\nclass User(Base):\n    __tablename__ = "users"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(unique=True, index=True)\n    name: Mapped[str]\n    hashed_password: Mapped[str]\n    is_active: Mapped[bool] = mapped_column(default=True)\n    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)\n    posts: Mapped[list["Post"]] = relationship(back_populates="author")\n\nclass Post(Base):\n    __tablename__ = "posts"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str]\n    content: Mapped[str]\n    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"))\n    author: Mapped["User"] = relationship(back_populates="posts")\n\n# Database session dependency\ndef get_db():\n    async with async_session() as session:\n        try:\n            yield session\n        except Exception:\n            await session.rollback()\n            raise',
          explanation: 'Async engine + sessionmaker + yield dependency gives you async DB access. Use Mapped[] for typed columns. Sessions auto-close after request.'
        },
        {
          filename: 'crud_routes.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Depends, HTTPException\nfrom sqlalchemy import select\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass UserCreate(BaseModel):\n    email: str\n    name: str\n    password: str\n\nclass UserResponse(BaseModel):\n    id: int\n    email: str\n    name: str\n\n    model_config = {"from_attributes": True}\n\n@app.post("/users", response_model=UserResponse, status_code=201)\nasync def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):\n    # Check if email exists\n    existing = await db.execute(select(User).where(User.email == user.email))\n    if existing.scalar_one_or_none():\n        raise HTTPException(400, "Email already registered")\n\n    # Create\n    db_user = User(\n        email=user.email,\n        name=user.name,\n        hashed_password=hash_password(user.password),\n    )\n    db.add(db_user)\n    await db.commit()\n    await db.refresh(db_user)\n    return db_user\n\n@app.get("/users/{user_id}", response_model=UserResponse)\nasync def get_user(user_id: int, db: AsyncSession = Depends(get_db)):\n    result = await db.execute(select(User).where(User.id == user_id))\n    user = result.scalar_one_or_none()\n    if not user:\n        raise HTTPException(404, "User not found")\n    return user\n\n@app.get("/users", response_model=list[UserResponse])\nasync def list_users(skip: int = 0, limit: int = 20, db: AsyncSession = Depends(get_db)):\n    result = await db.execute(select(User).offset(skip).limit(limit))\n    return result.scalars().all()\n\n@app.delete("/users/{user_id}", status_code=204)\nasync def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):\n    result = await db.execute(select(User).where(User.id == user_id))\n    user = result.scalar_one_or_none()\n    if not user:\n        raise HTTPException(404, "User not found")\n    await db.delete(user)\n    await db.commit()',
          explanation: 'Use select() with .where() for queries. .scalar_one_or_none() returns None if not found (vs .one() which raises). .scalars().all() for lists.'
        },
      ],
      exercises: [
        {
          prompt: 'Add a PUT /users/{user_id} endpoint that updates name and email. Validate email is not taken by another user.',
          starterCode: 'from pydantic import BaseModel\n\nclass UserUpdate(BaseModel):\n    name: str | None = None\n    email: str | None = None\n\n@app.put("/users/{user_id}", response_model=UserResponse)\nasync def update_user(user_id: int, user: UserUpdate, db: AsyncSession = Depends(get_db)):\n    # your code\n    pass\n',
          hint: 'Fetch user, check email conflict if changing, update fields, commit.',
          solution: 'from pydantic import BaseModel\n\nclass UserUpdate(BaseModel):\n    name: str | None = None\n    email: str | None = None\n\n@app.put("/users/{user_id}", response_model=UserResponse)\nasync def update_user(user_id: int, user: UserUpdate, db: AsyncSession = Depends(get_db)):\n    result = await db.execute(select(User).where(User.id == user_id))\n    db_user = result.scalar_one_or_none()\n    if not db_user:\n        raise HTTPException(404, "User not found")\n\n    if user.email and user.email != db_user.email:\n        existing = await db.execute(select(User).where(User.email == user.email))\n        if existing.scalar_one_or_none():\n            raise HTTPException(400, "Email already taken")\n        db_user.email = user.email\n\n    if user.name:\n        db_user.name = user.name\n\n    await db.commit()\n    await db.refresh(db_user)\n    return db_user',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'How do you query a single user by ID?',
          options: ['db.get(User, id)', 'select(User).where(User.id == id)', 'Both A and B', 'db.query(User).filter_by(id=id)'],
          correctIndex: 2,
          explanation: 'Both db.get() and select().where() work. db.get() is simpler for primary key lookups.'
        },
        {
          question: 'What does scalar_one_or_none() return if no rows match?',
          options: ['Raises exception', 'Returns None', 'Returns empty list', 'Returns 0'],
          correctIndex: 1,
          explanation: 'scalar_one_or_none() returns None if no rows, raises if multiple rows. one() raises in both cases.'
        },
        {
          question: 'How do you use async sessions with FastAPI?',
          options: ['Direct session creation', 'Yield dependency (get_db)', 'Global session', 'Thread-local session'],
          correctIndex: 1,
          explanation: 'Use a yield dependency that creates an async session and closes it after the request.'
        }
      ],
      keyTakeaways: [
        'Use create_async_engine with asyncpg for PostgreSQL',
        'AsyncSession + yield dependency provides sessions per request',
        'SQLAlchemy 2.0 uses Mapped[] for typed columns',
        'Use select() with .where() for queries (not the legacy Query API)',
        'scalar_one_or_none() returns None if not found',
        'Always commit() after writes, refresh() to get generated values'
      ],
      resources: [
        { title: 'SQLAlchemy 2.0 Async', url: 'https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html', type: 'docs' },
        { title: 'FastAPI - SQL Databases', url: 'https://fastapi.tiangolo.com/tutorial/sql-databases/', type: 'docs' },
      ]
    },

    {
      id: 'fa-05',
      title: 'Authentication with JWT',
      subtitle: 'OAuth2 with password flow, JWT tokens, password hashing',
      duration: 65,
      difficulty: 'Advanced',
      content: [
        'JSON Web Tokens (JWT) are the standard for stateless authentication. A JWT contains: header (algorithm), payload (claims like user_id, exp), and signature. The server signs it with a secret key. Clients send it in the Authorization header as "Bearer <token>".',
        'The OAuth2 password flow: 1) User POSTs username/password to /token, 2) Server validates, returns access_token, 3) Client includes token in subsequent requests, 4) Server validates token, extracts user. FastAPI has built-in OAuth2PasswordBearer for this.',
        'Use passlib[bcrypt] for password hashing. Never store plaintext passwords! Hash with `pwd_context.hash(password)`, verify with `pwd_context.verify(plain, hashed)`. Bcrypt is slow by design (prevents brute force).',
        'Use python-jose or PyJWT to create/verify JWTs. Encode with `jwt.encode(payload, secret, algorithm)`, decode with `jwt.decode(token, secret, algorithms)`. Always include `exp` (expiration) - typically 30 min for access tokens, 30 days for refresh tokens.'
      ],
      codeExamples: [
        {
          filename: 'auth.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Depends, HTTPException, status\nfrom fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm\nfrom passlib.context import CryptContext\nfrom jose import jwt, JWTError\nfrom datetime import datetime, timedelta\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\n# Config\nSECRET_KEY = "your-secret-key-keep-safe"  # use env var in production!\nALGORITHM = "HS256"\nACCESS_TOKEN_EXPIRE_MINUTES = 30\n\n# Password hashing\npwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")\n\n# OAuth2 scheme - extracts token from Authorization header\noauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")\n\n# Fake user DB\nfake_users_db = {\n    "alice": {\n        "username": "alice",\n        "hashed_password": pwd_context.hash("secret123"),\n        "email": "alice@example.com",\n    }\n}\n\nclass Token(BaseModel):\n    access_token: str\n    token_type: str\n\nclass TokenData(BaseModel):\n    username: str | None = None\n\ndef verify_password(plain: str, hashed: str) -> bool:\n    return pwd_context.verify(plain, hashed)\n\ndef authenticate_user(db, username: str, password: str):\n    user = db.get(username)\n    if not user or not verify_password(password, user["hashed_password"]):\n        return False\n    return user\n\ndef create_access_token(data: dict) -> str:\n    to_encode = data.copy()\n    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)\n    to_encode.update({"exp": expire})\n    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)\n\nasync def get_current_user(token: str = Depends(oauth2_scheme)):\n    credentials_exception = HTTPException(\n        status_code=401,\n        detail="Could not validate credentials",\n        headers={"WWW-Authenticate": "Bearer"},\n    )\n    try:\n        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])\n        username: str = payload.get("sub")\n        if not username:\n            raise credentials_exception\n        token_data = TokenData(username=username)\n    except JWTError:\n        raise credentials_exception\n    user = fake_users_db.get(token_data.username)\n    if not user:\n        raise credentials_exception\n    return user\n\n# Login endpoint - returns JWT\n@app.post("/token", response_model=Token)\nasync def login(form_data: OAuth2PasswordRequestForm = Depends()):\n    user = authenticate_user(fake_users_db, form_data.username, form_data.password)\n    if not user:\n        raise HTTPException(401, "Incorrect username or password")\n    access_token = create_access_token({"sub": user["username"]})\n    return {"access_token": access_token, "token_type": "bearer"}\n\n# Protected endpoint\n@app.get("/users/me")\nasync def read_users_me(current_user = Depends(get_current_user)):\n    return current_user',
          explanation: 'OAuth2PasswordBearer extracts token from header. pwd_context.hash/verify for passwords. jwt.encode/decode for tokens. Always include exp claim.'
        },
      ],
      exercises: [
        {
          prompt: 'Add a /refresh endpoint that takes a valid (non-expired) token and returns a new one with extended expiration.',
          starterCode: '@app.post("/refresh", response_model=Token)\nasync def refresh_token(current_user = Depends(get_current_user)):\n    # your code\n    pass\n',
          hint: 'Use create_access_token with current username.',
          solution: '@app.post("/refresh", response_model=Token)\nasync def refresh_token(current_user = Depends(get_current_user)):\n    access_token = create_access_token({"sub": current_user["username"]})\n    return {"access_token": access_token, "token_type": "bearer"}',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Where should the SECRET_KEY come from in production?',
          options: ['Hardcoded in source', 'Environment variable', 'Database', 'Config file in repo'],
          correctIndex: 1,
          explanation: 'Always load secrets from environment variables, never commit them to source control.'
        },
        {
          question: 'Why use bcrypt instead of MD5/SHA for passwords?',
          options: ['Faster', 'Slower (prevents brute force)', 'Smaller output', 'No reason'],
          correctIndex: 1,
          explanation: 'Bcrypt is intentionally slow and adds a salt - making brute force attacks computationally expensive.'
        },
        {
          question: 'What does the "exp" claim in JWT do?',
          options: ['Sets expiration time', 'Encrypts payload', 'Sets algorithm', 'Identifies user'],
          correctIndex: 0,
          explanation: 'exp (expiration) claim sets when the token expires. Always include it to limit token lifetime.'
        }
      ],
      keyTakeaways: [
        'JWT = header + payload + signature, signed with secret key',
        'OAuth2 password flow: POST credentials to /token, get JWT back',
        'Use passlib[bcrypt] for password hashing - never store plaintext',
        'Always include exp claim - short-lived access tokens (30 min)',
        'OAuth2PasswordBearer auto-extracts token from Authorization header',
        'Use Depends(get_current_user) to protect routes'
      ],
      resources: [
        { title: 'FastAPI Security Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/security/', type: 'docs' },
        { title: 'JWT.io - Debug JWTs', url: 'https://jwt.io/', type: 'tool' },
        { title: 'OAuth2 Spec', url: 'https://oauth.net/2/', type: 'article' },
      ]
    },

    {
      id: 'fa-06',
      title: 'Middleware, CORS & Error Handling',
      subtitle: 'Custom middleware, CORS, exception handlers, lifespan',
      duration: 50,
      difficulty: 'Intermediate',
      content: [
        'Middleware runs before and after every request. Use it for: logging, CORS, rate limiting, request IDs, GZip compression, timing. FastAPI middleware are ASGI middleware - they can be async. Add with @app.middleware("http") or app.add_middleware().',
        'CORS (Cross-Origin Resource Sharing) is essential when your API and frontend are on different domains. Use CORSMiddleware with allow_origins, allow_methods, allow_headers, allow_credentials. Never use allow_origins=["*"] with allow_credentials=True - browsers reject it.',
        'Exception handlers convert exceptions into HTTP responses. Use @app.exception_handler(SomeException) to register a handler. FastAPI has built-in handlers for HTTPException, RequestValidationError. Override these to customize error formats.',
        'Lifespan events (replacing on_event) run on startup and shutdown. Use them to: connect to DB, initialize ML models, start background workers, warm caches. Define a lifespan context manager and pass it to FastAPI(lifespan=...).'
      ],
      codeExamples: [
        {
          filename: 'middleware.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Request\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom fastapi.middleware.gzip import GZipMiddleware\nimport time\nimport uuid\n\napp = FastAPI()\n\n# CORS - allow frontend to call API\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["https://myapp.com", "http://localhost:3000"],\n    allow_credentials=True,\n    allow_methods=["*"],\n    allow_headers=["*"],\n)\n\n# GZip compression for large responses\napp.add_middleware(GZipMiddleware, minimum_size=1000)\n\n# Custom middleware - request ID + timing\n@app.middleware("http")\nasync def add_request_id_and_timing(request: Request, call_next):\n    # Before request\n    request_id = str(uuid.uuid4())\n    request.state.request_id = request_id\n    start = time.perf_counter()\n\n    # Call the route\n    response = await call_next(request)\n\n    # After request\n    duration = time.perf_counter() - start\n    response.headers["X-Request-ID"] = request_id\n    response.headers["X-Response-Time"] = f"{duration:.3f}s"\n    return response\n\n# Rate limiting middleware\nfrom collections import defaultdict\nfrom time import time as now\n\nrate_limit = defaultdict(list)\n\n@app.middleware("http")\nasync def rate_limiter(request: Request, call_next):\n    client_ip = request.client.host\n    current = now()\n    # Keep only requests from last 60s\n    rate_limit[client_ip] = [t for t in rate_limit[client_ip] if current - t < 60]\n    if len(rate_limit[client_ip]) >= 100:  # 100 req/min\n        return JSONResponse(\n            status_code=429,\n            content={"detail": "Too many requests"}\n        )\n    rate_limit[client_ip].append(current)\n    return await call_next(request)',
          explanation: 'Middleware wraps every request. Use app.add_middleware() for built-ins, @app.middleware("http") for custom. CORS is essential for web frontends.'
        },
        {
          filename: 'errors_lifespan.py',
          language: 'python',
          code: 'from fastapi import FastAPI, Request, HTTPException\nfrom fastapi.responses import JSONResponse\nfrom contextlib import asynccontextmanager\n\n# Custom exception\nclass BusinessError(Exception):\n    def __init__(self, message: str, code: str):\n        self.message = message\n        self.code = code\n\n# Lifespan - runs on startup/shutdown\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # Startup\n    print("Starting up...")\n    app.state.db = connect_to_db()\n    app.state.model = load_ml_model()\n    yield\n    # Shutdown\n    print("Shutting down...")\n    app.state.db.close()\n\napp = FastAPI(lifespan=lifespan)\n\n# Exception handlers - convert exceptions to responses\n@app.exception_handler(BusinessError)\nasync def business_error_handler(request: Request, exc: BusinessError):\n    return JSONResponse(\n        status_code=400,\n        content={"error": exc.message, "code": exc.code},\n    )\n\n# Override default validation error format\nfrom fastapi.exceptions import RequestValidationError\n\n@app.exception_handler(RequestValidationError)\nasync def validation_handler(request: Request, exc: RequestValidationError):\n    return JSONResponse(\n        status_code=422,\n        content={\n            "error": "Validation failed",\n            "details": exc.errors(),\n            "path": request.url.path,\n        },\n    )\n\n# 404 handler\n@app.exception_handler(404)\nasync def not_found_handler(request: Request, exc):\n    return JSONResponse(\n        status_code=404,\n        content={"error": "Not found", "path": request.url.path},\n    )\n\n@app.get("/items/{id}")\nasync def get_item(id: int):\n    if id < 0:\n        raise BusinessError("ID must be positive", "INVALID_ID")\n    return {"id": id}',
          explanation: 'Use lifespan for startup/shutdown logic. Exception handlers convert exceptions to JSON responses - customize error formats for your API.'
        },
      ],
      exercises: [
        {
          prompt: 'Write middleware that logs every request method, path, and status code to console.',
          starterCode: '@app.middleware("http")\nasync def log_requests(request: Request, call_next):\n    # your code\n    pass\n',
          hint: 'Capture method and path before, status after. Use call_next.',
          solution: '@app.middleware("http")\nasync def log_requests(request: Request, call_next):\n    method = request.method\n    path = request.url.path\n    response = await call_next(request)\n    print(f"{method} {path} -> {response.status_code}")\n    return response',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does CORSMiddleware do?',
          options: ['Compresses responses', 'Allows cross-origin requests from browsers', 'Adds authentication', 'Caches responses'],
          correctIndex: 1,
          explanation: 'CORS allows browsers to make cross-origin requests. Without it, browsers block API calls to different domains.'
        },
        {
          question: 'How do you run code on app startup and shutdown?',
          options: ['@app.on_event', 'Lifespan context manager', 'Middleware', 'Both A and B'],
          correctIndex: 1,
          explanation: 'Lifespan is the modern way (on_event is deprecated). Use @asynccontextmanager and pass to FastAPI(lifespan=...).'
        },
        {
          question: 'What does @app.exception_handler(SomeException) do?',
          options: ['Ignores the exception', 'Converts the exception to an HTTP response', 'Logs the exception', 'Rethrows the exception'],
          correctIndex: 1,
          explanation: 'Exception handlers convert exceptions to HTTP responses, letting you customize error formats.'
        }
      ],
      keyTakeaways: [
        'Middleware wraps every request - use for logging, CORS, rate limiting',
        'CORSMiddleware is essential for web frontends calling your API',
        'Use lifespan context manager for startup/shutdown logic',
        'Exception handlers convert exceptions to JSON responses',
        'Override RequestValidationError handler to customize 422 responses',
        'Built-in middleware: GZip, TrustedHost, HTTPSRedirect, Session'
      ],
      resources: [
        { title: 'FastAPI Middleware', url: 'https://fastapi.tiangolo.com/tutorial/middleware/', type: 'docs' },
        { title: 'FastAPI CORS', url: 'https://fastapi.tiangolo.com/tutorial/cors/', type: 'docs' },
        { title: 'FastAPI Lifespan', url: 'https://fastapi.tiangolo.com/advanced/events/', type: 'docs' },
      ]
    },

    {
      id: 'fa-07',
      title: 'Background Tasks & WebSockets',
      subtitle: 'BackgroundTasks, websockets, real-time communication',
      duration: 50,
      difficulty: 'Advanced',
      content: [
        'FastAPI BackgroundTasks let you run functions after the response is sent. Use for: sending emails, writing to log files, processing small files. For heavy work (ML training, video processing), use Celery or RQ instead.',
        'WebSockets enable real-time bidirectional communication. Unlike HTTP (request-response), WebSockets keep a connection open. Perfect for: chat apps, live dashboards, notifications, multiplayer games.',
        'FastAPI WebSocket support uses the `websockets` library. Define a route with @app.websocket("/ws"). Accept the connection, then loop receiving/sending messages. Handle WebSocketDisconnect to clean up.',
        'For production WebSockets with multiple workers, use a pub/sub backend (Redis) so messages can be broadcast across instances. Libraries like `centrifugo`, `socket.io`, or custom Redis pub/sub work well.'
      ],
      codeExamples: [
        {
          filename: 'background_tasks.py',
          language: 'python',
          code: 'from fastapi import FastAPI, BackgroundTasks\nimport time\n\napp = FastAPI()\n\ndef send_welcome_email(email: str):\n    # Simulate slow email sending\n    time.sleep(5)\n    print(f"Email sent to {email}")\n\ndef process_file(file_path: str):\n    # Simulate file processing\n    time.sleep(10)\n    print(f"Processed {file_path}")\n\n@app.post("/register")\nasync def register(email: str, background_tasks: BackgroundTasks):\n    # Add task to run AFTER response sent\n    background_tasks.add_task(send_welcome_email, email)\n    return {"message": "Registered! Email will arrive shortly."}\n\n# Multiple tasks run in order\n@app.post("/upload")\nasync def upload(file_path: str, bg: BackgroundTasks):\n    bg.add_task(process_file, file_path)\n    bg.add_task(send_welcome_email, "uploader@example.com")\n    return {"message": "Upload received"}\n\n# For HEAVY work, use Celery instead:\n# from celery import Celery\n# celery_app = Celery("tasks", broker="redis://localhost")\n# @celery_app.task\n# def heavy_computation(data):\n#     ...',
          explanation: 'BackgroundTasks run after response sent. Add multiple tasks - they run in order. For heavy/long work, use Celery with Redis/RabbitMQ broker.'
        },
        {
          filename: 'websockets.py',
          language: 'python',
          code: 'from fastapi import FastAPI, WebSocket, WebSocketDisconnect\nfrom typing import list\nimport json\n\napp = FastAPI()\n\nclass ConnectionManager:\n    def __init__(self):\n        self.active: list[WebSocket] = []\n\n    async def connect(self, ws: WebSocket):\n        await ws.accept()\n        self.active.append(ws)\n\n    def disconnect(self, ws: WebSocket):\n        self.active.remove(ws)\n\n    async def broadcast(self, message: str):\n        for ws in self.active:\n            await ws.send_text(message)\n\nmanager = ConnectionManager()\n\n@app.websocket("/ws/{client_id}")\nasync def websocket_endpoint(ws: WebSocket, client_id: str):\n    await manager.connect(ws)\n    await manager.broadcast(f"{client_id} joined the chat")\n    try:\n        while True:\n            # Receive message from client\n            data = await ws.receive_text()\n            # Broadcast to all clients\n            await manager.broadcast(f"{client_id}: {data}")\n    except WebSocketDisconnect:\n        manager.disconnect(ws)\n        await manager.broadcast(f"{client_id} left")\n\n# Client-side JavaScript (for reference):\n# const ws = new WebSocket("ws://localhost:8000/ws/alice")\n# ws.onmessage = (e) => console.log(e.data)\n# ws.send("Hello everyone!")',
          explanation: 'WebSockets stay open for real-time bidirectional comms. Use a ConnectionManager to track active connections. Handle WebSocketDisconnect to clean up.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a WebSocket endpoint that echoes back any message received, prefixed with "Echo: ".',
          starterCode: '@app.websocket("/echo")\nasync def echo(ws: WebSocket):\n    # your code\n    pass\n',
          hint: 'Accept connection, loop receive_text/send_text.',
          solution: '@app.websocket("/echo")\nasync def echo(ws: WebSocket):\n    await ws.accept()\n    try:\n        while True:\n            data = await ws.receive_text()\n            await ws.send_text(f"Echo: {data}")\n    except WebSocketDisconnect:\n        print("Client disconnected")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When should you use Celery instead of BackgroundTasks?',
          options: ['Always', 'For heavy/long-running work', 'Never', 'For very short tasks'],
          correctIndex: 1,
          explanation: 'BackgroundTasks run in the same process. For heavy work (minutes/hours), use Celery with a broker like Redis.'
        },
        {
          question: 'What makes WebSockets different from HTTP?',
          options: ['Faster', 'Bidirectional, persistent connection', 'More secure', 'Cheaper'],
          correctIndex: 1,
          explanation: 'WebSockets keep a persistent bidirectional connection. HTTP is request-response (client must initiate).'
        },
        {
          question: 'How do you handle a client disconnecting?',
          options: ['You cannot', 'Catch WebSocketDisconnect exception', 'Check ws.connected', 'Use a timeout'],
          correctIndex: 1,
          explanation: 'Catch WebSocketDisconnect from the receive loop to clean up resources.'
        }
      ],
      keyTakeaways: [
        'BackgroundTasks run after response is sent - for short tasks',
        'Use Celery + Redis/RabbitMQ for heavy/long-running work',
        'WebSockets enable real-time bidirectional communication',
        'Use a ConnectionManager class to track active connections',
        'Handle WebSocketDisconnect to clean up on client disconnect',
        'For multi-worker WebSocket broadcasts, use Redis pub/sub'
      ],
      resources: [
        { title: 'FastAPI Background Tasks', url: 'https://fastapi.tiangolo.com/tutorial/background-tasks/', type: 'docs' },
        { title: 'FastAPI WebSockets', url: 'https://fastapi.tiangolo.com/advanced/websockets/', type: 'docs' },
      ]
    },

    {
      id: 'fa-08',
      title: 'Testing FastAPI Apps',
      subtitle: 'TestClient, fixtures, async tests, test databases',
      duration: 45,
      difficulty: 'Intermediate',
      content: [
        'FastAPI testing is easy with TestClient (uses httpx under the hood). For async code (DB, external APIs), use httpx.AsyncClient with pytest-asyncio. Tests run in milliseconds - no need to spin up a real server.',
        'Use fixtures for setup/teardown. Database fixtures should use a separate test database, rollback after each test for isolation. Override the get_db dependency to use the test DB. Fixtures can be scoped: function (default), class, module, session.',
        'Test the API as a black box: send HTTP requests, check responses. Test status codes, response body, headers. Test edge cases: missing fields, invalid types, unauthorized, not found. Use parametrize for the same test with different inputs.',
        'For end-to-end tests with real DB, use testcontainers-postgres to spin up a real Postgres in Docker. For unit tests, mock external services (use respx for HTTP mocking).'
      ],
      codeExamples: [
        {
          filename: 'test_app.py',
          language: 'python',
          code: 'import pytest\nfrom fastapi.testclient import TestClient\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\nfrom main import app, get_db, Base\n\n# Test database (SQLite in-memory)\nSQLALCHEMY_TEST_URL = "sqlite:///./test.db"\nengine = create_engine(SQLALCHEMY_TEST_URL, connect_args={"check_same_thread": False})\nTestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)\n\n# Create tables\nBase.metadata.create_all(engine)\n\n# Override dependency\ndef override_get_db():\n    db = TestingSessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()\n\napp.dependency_overrides[get_db] = override_get_db\n\nclient = TestClient(app)\n\n# Fixture - runs before each test\n@pytest.fixture\ndef clean_db():\n    # Clean tables before each test\n    for table in reversed(Base.metadata.sorted_tables):\n        engine.execute(table.delete())\n    yield\n\ndef test_create_user():\n    response = client.post(\n        "/users",\n        json={"email": "test@test.com", "name": "Test", "password": "pass"}\n    )\n    assert response.status_code == 201\n    data = response.json()\n    assert data["email"] == "test@test.com"\n    assert "password" not in data  # password should not be returned!\n\ndef test_get_user_not_found():\n    response = client.get("/users/9999")\n    assert response.status_code == 404\n\ndef test_duplicate_email():\n    user = {"email": "dup@test.com", "name": "A", "password": "p"}\n    client.post("/users", json=user)\n    response = client.post("/users", json=user)\n    assert response.status_code == 400\n\n# Parameterized tests\n@pytest.mark.parametrize("email,valid", [\n    ("valid@test.com", True),\n    ("invalid", False),\n    ("", False),\n    ("@test.com", False),\n])\ndef test_email_validation(email, valid):\n    response = client.post("/users", json={\n        "email": email, "name": "T", "password": "p"\n    })\n    if valid:\n        assert response.status_code == 201\n    else:\n        assert response.status_code == 422',
          explanation: 'TestClient makes HTTP requests in-process. Override get_db to use test DB. Use fixtures for setup. Parameterize for multiple inputs.'
        },
        {
          filename: 'test_async.py',
          language: 'python',
          code: 'import pytest\nimport pytest_asyncio\nfrom httpx import AsyncClient, ASGITransport\nfrom main import app\n\n@pytest_asyncio.fixture\nasync def client():\n    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:\n        yield c\n\n@pytest.mark.asyncio\nasync def test_async_endpoint(client):\n    response = await client.get("/users")\n    assert response.status_code == 200\n\n@pytest.mark.asyncio\nasync def test_concurrent_requests(client):\n    import asyncio\n    responses = await asyncio.gather(\n        client.get("/users/1"),\n        client.get("/users/2"),\n        client.get("/users/3"),\n    )\n    assert all(r.status_code == 200 for r in responses)\n\n# Run: pytest -v --asyncio-mode=auto',
          explanation: 'For async endpoints, use AsyncClient with ASGITransport. pytest-asyncio enables async test functions. Useful for testing concurrent requests.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a test that verifies a DELETE /users/{id} returns 204 and the user is gone from GET /users/{id}.',
          starterCode: 'def test_delete_user():\n    # your code\n    pass\n',
          hint: 'Create a user first, then DELETE, then GET to verify 404.',
          solution: 'def test_delete_user():\n    # Create\n    resp = client.post("/users", json={"email": "del@test.com", "name": "Del", "password": "p"})\n    user_id = resp.json()["id"]\n\n    # Delete\n    del_resp = client.delete(f"/users/{user_id}")\n    assert del_resp.status_code == 204\n\n    # Verify gone\n    get_resp = client.get(f"/users/{user_id}")\n    assert get_resp.status_code == 404',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'How does TestClient work?',
          options: ['Spins up a real server', 'Makes in-process HTTP requests', 'Uses curl', 'Mocks everything'],
          correctIndex: 1,
          explanation: 'TestClient uses httpx with ASGI transport - no real server needed. Tests run in milliseconds.'
        },
        {
          question: 'How do you use a test database?',
          options: ['Use production DB', 'Override the get_db dependency', 'Cannot be done', 'Use transactions only'],
          correctIndex: 1,
          explanation: 'Override get_db dependency via app.dependency_overrides to use a test database.'
        },
        {
          question: 'What does @pytest.mark.parametrize do?',
          options: ['Runs test in parallel', 'Runs the same test with different inputs', 'Skips test', 'Marks as slow'],
          correctIndex: 1,
          explanation: 'parametrize runs the test function multiple times with different argument values.'
        }
      ],
      keyTakeaways: [
        'Use TestClient for sync tests, AsyncClient for async tests',
        'Override dependencies (get_db) to use test database',
        'Use fixtures for setup/teardown (clean DB between tests)',
        'Test status codes, response body, and edge cases',
        'Use @pytest.mark.parametrize for data-driven tests',
        'Test as black box: HTTP in, response out'
      ],
      resources: [
        { title: 'FastAPI Testing', url: 'https://fastapi.tiangolo.com/tutorial/testing/', type: 'docs' },
        { title: 'pytest Documentation', url: 'https://docs.pytest.org/', type: 'docs' },
      ]
    },

    {
      id: 'fa-09',
      title: 'Project Structure & Best Practices',
      subtitle: 'Organize larger apps, routers, settings, production tips',
      duration: 50,
      difficulty: 'Advanced',
      content: [
        'As your app grows, split it into modules. Common structure: app/main.py (entry), app/api/ (routes by domain), app/core/ (config, security), app/db/ (database), app/models/ (SQLAlchemy), app/schemas/ (Pydantic), app/services/ (business logic), app/tests/.',
        'Use APIRouter to split routes into files. Each router handles a domain (users, items, auth). Mount with app.include_router(user_router, prefix="/users", tags=["users"]). Tags group endpoints in the Swagger docs.',
        'Use pydantic-settings (BaseSettings) for configuration. Load from environment variables automatically. Use .env files for local development (python-dotenv). Never commit secrets - use environment variables in production.',
        'Production tips: 1) Use gunicorn with uvicorn workers, 2) Set CORS origins explicitly (no wildcards), 3) Use HTTPS (Nginx/Caddy proxy), 4) Add health checks (/health), 5) Log structured JSON, 6) Monitor with Sentry, 7) Use connection pooling, 8) Cache with Redis.'
      ],
      codeExamples: [
        {
          filename: 'project_structure.txt',
          language: 'text',
          code: 'myapp/\n├── app/\n│   ├── __init__.py\n│   ├── main.py              # FastAPI app creation\n│   ├── core/\n│   │   ├── config.py        # Settings (BaseSettings)\n│   │   ├── security.py      # JWT, password hashing\n│   │   └── deps.py          # Shared dependencies\n│   ├── db/\n│   │   ├── base.py          # SQLAlchemy Base\n│   │   ├── session.py       # Engine + session\n│   │   └── init_db.py       # Initial data\n│   ├── models/              # SQLAlchemy models\n│   │   ├── user.py\n│   │   └── item.py\n│   ├── schemas/             # Pydantic schemas\n│   │   ├── user.py\n│   │   └── item.py\n│   ├── api/                 # Routes\n│   │   ├── deps.py\n│   │   ├── router.py        # Combines all routers\n│   │   └── endpoints/\n│   │       ├── users.py\n│   │       ├── items.py\n│   │       └── auth.py\n│   ├── services/            # Business logic\n│   │   ├── user_service.py\n│   │   └── email_service.py\n│   └── tests/\n│       ├── conftest.py\n│       ├── test_users.py\n│       └── test_items.py\n├── alembic/                 # DB migrations\n├── alembic.ini\n├── pyproject.toml\n├── .env\n├── .env.example\n├── Dockerfile\n└── docker-compose.yml',
          explanation: 'Separate concerns: routes (api), data shapes (schemas, models), logic (services), infrastructure (db, core). This scales to large teams.'
        },
        {
          filename: 'config_routers.py',
          language: 'python',
          code: '# app/core/config.py\nfrom pydantic_settings import BaseSettings\n\nclass Settings(BaseSettings):\n    APP_NAME: str = "My API"\n    DATABASE_URL: str\n    SECRET_KEY: str\n    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30\n    CORS_ORIGINS: list[str] = ["http://localhost:3000"]\n\n    model_config = {"env_file": ".env"}\n\nsettings = Settings()\n\n# app/api/endpoints/users.py\nfrom fastapi import APIRouter, Depends\n\nrouter = APIRouter()\n\n@router.get("/")\nasync def list_users():\n    return []\n\n@router.get("/{user_id}")\nasync def get_user(user_id: int):\n    return {"id": user_id}\n\n# app/api/router.py\nfrom fastapi import APIRouter\nfrom .endpoints import users, items, auth\n\napi_router = APIRouter()\napi_router.include_router(users.router, prefix="/users", tags=["users"])\napi_router.include_router(items.router, prefix="/items", tags=["items"])\napi_router.include_router(auth.router, prefix="/auth", tags=["auth"])\n\n# app/main.py\nfrom fastapi import FastAPI\nfrom .core.config import settings\nfrom .api.router import api_router\n\napp = FastAPI(title=settings.APP_NAME)\n\n# CORS\nfrom fastapi.middleware.cors import CORSMiddleware\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=settings.CORS_ORIGINS,\n    allow_credentials=True,\n    allow_methods=["*"],\n    allow_headers=["*"],\n)\n\n# Health check\n@app.get("/health")\nasync def health():\n    return {"status": "healthy"}\n\n# Include all routes\napp.include_router(api_router, prefix="/api/v1")',
          explanation: 'BaseSettings auto-loads env vars. APIRouter splits routes into modules. Tags group endpoints in docs. Prefix adds path to all routes in router.'
        },
      ],
      exercises: [
        {
          prompt: 'Refactor a single-file FastAPI app into routers. Create users router with GET /users and POST /users, mount at /api/v1/users.',
          starterCode: '# users.py\nfrom fastapi import APIRouter\n\nrouter = APIRouter()\n\n# your routes\n\n# main.py\n# mount the router with prefix',
          hint: 'Use APIRouter(), define routes with @router.get, mount with app.include_router.',
          solution: '# users.py\nfrom fastapi import APIRouter\nfrom pydantic import BaseModel\n\nrouter = APIRouter()\n\nclass User(BaseModel):\n    name: str\n    email: str\n\n@router.get("/")\nasync def list_users():\n    return [{"id": 1, "name": "Alice"}]\n\n@router.post("/", status_code=201)\nasync def create_user(user: User):\n    return {"id": 2, **user.model_dump()}\n\n# main.py\nfrom fastapi import FastAPI\nfrom users import router as users_router\n\napp = FastAPI()\napp.include_router(users_router, prefix="/api/v1/users", tags=["users"])',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is APIRouter used for?',
          options: ['API versioning', 'Splitting routes into modules', 'Async routes', 'Authentication'],
          correctIndex: 1,
          explanation: 'APIRouter lets you define routes in separate files and mount them into the main app with include_router().'
        },
        {
          question: 'How to load configuration from environment variables?',
          options: ['os.environ.get()', 'pydantic-settings BaseSettings', 'Both work', 'ConfigParser'],
          correctIndex: 2,
          explanation: 'Both work, but BaseSettings is cleaner - it auto-loads .env files and validates types.'
        },
        {
          question: 'What is a health check endpoint?',
          options: ['/health returning 200', '/api/status', '/ping with auth', 'Optional'],
          correctIndex: 0,
          explanation: '/health (or /healthz) is a standard endpoint returning 200 if app is healthy. Used by load balancers and orchestrators.'
        }
      ],
      keyTakeaways: [
        'Split large apps: api/ for routes, services/ for logic, models/ for DB',
        'Use APIRouter to modularize routes - mount with include_router()',
        'BaseSettings auto-loads env vars and .env files',
        'Add /health endpoint for load balancer health checks',
        'Use tags to group endpoints in Swagger docs',
        'Production: gunicorn + uvicorn workers, HTTPS, Redis cache, Sentry'
      ],
      resources: [
        { title: 'FastAPI Bigger Applications', url: 'https://fastapi.tiangolo.com/tutorial/bigger-applications/', type: 'docs' },
        { title: 'FastAPI Best Practices GitHub', url: 'https://github.com/zhanymkanov/fastapi-best-practices', type: 'article', isHiddenGem: true },
        { title: 'FastAPI Fullstack Template', url: 'https://github.com/tiangolo/full-stack-fastapi-template', type: 'article' },
      ],
      miniProject: {
        title: 'Build a Complete Blog API',
        description: 'Build a production-style blog API with users, posts, comments, JWT auth, SQLAlchemy models, Pydantic schemas, routers, and tests.',
        requirements: [
          'User registration + login (JWT)',
          'CRUD for posts (authenticated)',
          'Comments on posts',
          'Pydantic schemas for all entities',
          'SQLAlchemy models with relationships',
          'Split into routers (users, posts, comments)',
          'Health check endpoint',
          'Test with TestClient'
        ],
        estTime: '4-6 hours',
        solutionCode: '# See full-stack-fastapi-template on GitHub for a complete reference implementation.\n# Key endpoints:\n# POST /api/v1/auth/register - register user\n# POST /api/v1/auth/login - get JWT\n# GET /api/v1/posts - list published posts\n# POST /api/v1/posts - create post (auth)\n# GET /api/v1/posts/{id} - get post\n# POST /api/v1/posts/{id}/comments - add comment\n# DELETE /api/v1/posts/{id} - delete own post',
        solutionLanguage: 'python'
      }
    },
  ]
};
