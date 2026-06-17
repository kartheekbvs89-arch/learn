import { Module } from '../types';

export const sqlalchemyModule: Module = {
  id: 'sqlalchemy',
  title: 'SQLAlchemy & PostgreSQL',
  icon: '🗄️',
  color: '#336791',
  gradient: 'linear-gradient(135deg, #336791 0%, #4EC5F1 100%)',
  description: 'Master the most popular Python ORM. From raw SQL to relationships, migrations, and async queries.',
  learningPath: {
    title: 'Complete Learning Path',
    description: 'Master this technology from basics to production.',
    phases: [
      {
        name: 'Foundation',
        description: 'Core concepts and basics',
        outcomes: ['Understand fundamentals', 'Write basic code', 'Set up environment'],
      },
      {
        name: 'Intermediate',
        description: 'Practical patterns and techniques',
        outcomes: ['Build real features', 'Handle common scenarios', 'Apply best practices'],
      },
      {
        name: 'Advanced',
        description: 'Performance, security, scaling',
        outcomes: ['Optimize performance', 'Handle edge cases', 'Production-ready code'],
      },
      {
        name: 'Real-World',
        description: 'Production deployment and integration',
        outcomes: ['Deploy to production', 'Integrate with other systems', 'Debug real issues'],
      },
    ],
  },
  level: 'Intermediate',
  lessons: [
    {
      id: 'sql-01',
      title: 'What is a Database? SQL Basics & SQLAlchemy Setup',
      subtitle: 'Relational model, SQL CRUD, SQLAlchemy 2.0 architecture',
      duration: 50,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'A relational database organizes data into tables (rows and columns). Tables can have relationships: one-to-many (a user has many posts), many-to-many (posts and tags), one-to-one (user and profile). SQL (Structured Query Language) is the standard language for working with relational databases.',
        'PostgreSQL is the most powerful open-source relational database. It supports JSON, full-text search, geospatial data (PostGIS), and has excellent concurrency. SQLite is great for development (single file, no server). MySQL/MariaDB are popular for web apps.',
        'SQLAlchemy is the Python SQL toolkit and ORM. It has two layers: Core (SQL expression language, schema) and ORM (object-relational mapping). SQLAlchemy 2.0 unified the API - use Mapped[] types, select() statements, and async support throughout.',
        'Why use an ORM? 1) SQL injection protection (parameterized queries), 2) Database portability (swap Postgres for SQLite), 3) Type safety in Python, 4) Migration tools (Alembic), 5) Easier refactoring. Trade-off: small performance overhead, complex queries can be hard.',
      ],
      codeExamples: [
        {
          filename: 'raw_sql.py',
          language: 'python',
          code: '# Raw SQL basics - what SQLAlchemy abstracts for you\n\n# CREATE TABLE users (\n#     id SERIAL PRIMARY KEY,\n#     email VARCHAR(255) UNIQUE NOT NULL,\n#     name VARCHAR(100) NOT NULL,\n#     created_at TIMESTAMP DEFAULT NOW()\n# );\n\n# INSERT INTO users (email, name) VALUES (\'alice@example.com\', \'Alice\');\n# SELECT * FROM users WHERE email = \'alice@example.com\';\n# UPDATE users SET name = \'Alice Smith\' WHERE id = 1;\n# DELETE FROM users WHERE id = 1;\n\n# SELECT with JOIN\n# SELECT u.name, COUNT(p.id) as post_count\n# FROM users u\n# LEFT JOIN posts p ON p.author_id = u.id\n# GROUP BY u.id, u.name\n# ORDER BY post_count DESC;\n\n# SQLAlchemy equivalent (much cleaner!)\nfrom sqlalchemy import select, func\nfrom models import User, Post\n\nstmt = (\n    select(User.name, func.count(Post.id).label("post_count"))\n    .outerjoin(Post, Post.author_id == User.id)\n    .group_by(User.id, User.name)\n    .order_by(func.count(Post.id).desc())\n)',
          explanation: 'SQLAlchemy generates SQL from Python expressions. Same query, but with type safety, IDE autocompletion, and SQL injection protection.'
        },
        {
          filename: 'setup.py',
          language: 'python',
          code: '# pip install sqlalchemy[asyncio] asyncpg aiosqlite\nfrom sqlalchemy.ext.asyncio import (\n    create_async_engine,\n    async_sessionmaker,\n    AsyncSession,\n)\nfrom sqlalchemy.orm import DeclarativeBase\n\n# SQLite (dev/testing)\nengine = create_async_engine("sqlite+aiosqlite:///./app.db")\n\n# PostgreSQL (production)\n# engine = create_async_engine(\n#     "postgresql+asyncpg://user:pass@localhost:5432/mydb",\n#     pool_size=20,\n#     max_overflow=10,\n#     pool_pre_ping=True,  # check connection is alive\n# )\n\n# Session factory - creates new sessions\nasync_session = async_sessionmaker(\n    engine,\n    expire_on_commit=False,  # important for async!\n)\n\nclass Base(DeclarativeBase):\n    """Base class for all models."""\n    pass\n\n# Create tables (use Alembic in production)\nasync def init_db():\n    async with engine.begin() as conn:\n        await conn.run_sync(Base.metadata.create_all)\n\n# Drop all tables (testing only!)\nasync def drop_db():\n    async with engine.begin() as conn:\n        await conn.run_sync(Base.metadata.drop_all)',
          explanation: 'create_async_engine connects to DB. async_sessionmaker creates sessions. expire_on_commit=False is critical for async - objects stay usable after commit.'
        },
      ],
      exercises: [
        {
          prompt: 'Write raw SQL to create a products table with id, name, price, and stock columns. Then write an INSERT and a SELECT.',
          starterCode: '-- your SQL here\n',
          hint: 'Use SERIAL PRIMARY KEY for id, NUMERIC(10,2) for price.',
          solution: 'CREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(200) NOT NULL,\n    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),\n    stock INTEGER NOT NULL DEFAULT 0\n);\n\nINSERT INTO products (name, price, stock)\nVALUES (\'Widget\', 9.99, 100);\n\nSELECT * FROM products WHERE stock > 0 ORDER BY price;',
          solutionLanguage: 'sql'
        },
      ],
      quiz: [
        {
          question: 'What are the two layers of SQLAlchemy?',
          options: ['Sync and Async', 'Core and ORM', 'SQL and Python', 'Models and Queries'],
          correctIndex: 1,
          explanation: 'Core = SQL expression language and schema. ORM = object-relational mapping on top of Core.'
        },
        {
          question: 'Why is expire_on_commit=False important for async?',
          options: ['Faster', 'Objects stay usable after commit (no lazy reload)', 'Required by asyncpg', 'No reason'],
          correctIndex: 1,
          explanation: 'By default, SQLAlchemy expires objects after commit and lazily reloads. Async cannot do lazy reload - so set expire_on_commit=False.'
        },
        {
          question: 'What does asyncpg provide?',
          options: ['Async driver for PostgreSQL', 'ORM', 'Migration tool', 'Connection pool'],
          correctIndex: 0,
          explanation: 'asyncpg is an async PostgreSQL driver. SQLAlchemy uses it via postgresql+asyncpg:// URL.'
        }
      ],
      keyTakeaways: [
        'Relational databases organize data into tables with relationships',
        'PostgreSQL is the most powerful open-source database',
        'SQLAlchemy has two layers: Core (SQL) and ORM (objects)',
        'Use create_async_engine + async_sessionmaker for async',
        'Always set expire_on_commit=False for async sessions',
        'ORM gives type safety, portability, and SQL injection protection'
      ],
      resources: [
        { title: 'SQLAlchemy 2.0 Documentation', url: 'https://docs.sqlalchemy.org/en/20/', type: 'docs' },
        { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'article' },
        { title: 'SQLBolt - Interactive SQL', url: 'https://sqlbolt.com/', type: 'interactive', isHiddenGem: true },
      ]
    },

    {
      id: 'sql-02',
      title: 'Defining Models with Mapped[] Types',
      subtitle: 'Tables, columns, relationships, constraints',
      duration: 55,
      difficulty: 'Intermediate',
      phase: 'Foundation',
      content: [
        'SQLAlchemy 2.0 uses Mapped[] type annotations for columns. This gives IDE autocompletion, type checking with mypy/pyright, and clean syntax. Use mapped_column() for column options (primary_key, default, nullable, etc.).',
        'Define relationships with relationship() and ForeignKey(). Common types: one-to-many (use relationship on the "one" side, ForeignKey on the "many" side), many-to-many (use an association table), one-to-one (use uselist=False).',
        'Use back_populates to make relationships bidirectional - accessing user.posts and post.author both work. Use lazy="selectin" or lazy="joined" to control eager loading and avoid N+1 queries.',
        'Common column types: Integer, String(n), Text, Boolean, DateTime, Float, Numeric, JSON, UUID, Enum. Use server_default for DB-level defaults, default for Python-level. Use index=True for frequently filtered columns.'
      ],
      codeExamples: [
        {
          filename: 'models.py',
          language: 'python',
          code: 'from sqlalchemy import String, Integer, ForeignKey, DateTime, Boolean, Text\nfrom sqlalchemy.orm import Mapped, mapped_column, relationship, DeclarativeBase\nfrom datetime import datetime\nfrom typing import Optional\n\nclass Base(DeclarativeBase):\n    pass\n\nclass User(Base):\n    __tablename__ = "users"\n\n    # Mapped[] gives type info to IDE and type checkers\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)\n    name: Mapped[str] = mapped_column(String(100))\n    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)\n    is_active: Mapped[bool] = mapped_column(default=True)\n    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)\n\n    # Relationship - one user has many posts\n    posts: Mapped[list["Post"]] = relationship(\n        back_populates="author",\n        cascade="all, delete-orphan",  # delete posts when user deleted\n        lazy="selectin",  # eager load by default\n    )\n\nclass Post(Base):\n    __tablename__ = "posts"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str] = mapped_column(String(200))\n    content: Mapped[str] = mapped_column(Text)\n    published: Mapped[bool] = mapped_column(default=False)\n    author_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))\n    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)\n\n    # Back-reference to author\n    author: Mapped["User"] = relationship(back_populates="posts")\n\n# Many-to-many (posts <-> tags)\nfrom sqlalchemy import Table, Column\n\npost_tags = Table(\n    "post_tags",\n    Base.metadata,\n    Column("post_id", ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),\n    Column("tag_id", ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),\n)\n\nclass Tag(Base):\n    __tablename__ = "tags"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str] = mapped_column(String(50), unique=True)\n\n    posts: Mapped[list["Post"]] = relationship(secondary=post_tags, back_populates="tags")\n\n# Add tags relationship to Post (above):\n# tags: Mapped[list["Tag"]] = relationship(secondary=post_tags, back_populates="posts")',
          explanation: 'Use Mapped[] for type-safe columns. relationship() defines connections. back_populates makes them bidirectional. Many-to-many needs an association table.'
        },
      ],
      exercises: [
        {
          prompt: 'Define a Comment model with id, content, post_id (FK to posts), and a relationship to Post.',
          starterCode: 'class Comment(Base):\n    __tablename__ = "comments"\n    # your fields\n',
          hint: 'Use Mapped[int] for id, Mapped[str] for content, ForeignKey for post_id, relationship with back_populates.',
          solution: 'class Comment(Base):\n    __tablename__ = "comments"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    content: Mapped[str] = mapped_column(Text)\n    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id", ondelete="CASCADE"))\n    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)\n\n    post: Mapped["Post"] = relationship(back_populates="comments")\n\n# Add to Post class:\n# comments: Mapped[list["Comment"]] = relationship(back_populates="post", cascade="all, delete-orphan")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does Mapped[int] do?',
          options: ['Validates the value at runtime', 'Provides type info to IDE and type checkers', 'Sets the column type', 'Caches the value'],
          correctIndex: 1,
          explanation: 'Mapped[] is a type annotation. SQLAlchemy uses it to determine column type and gives your IDE autocompletion.'
        },
        {
          question: 'How do you make a relationship bidirectional?',
          options: ['Use ForeignKey on both', 'Use back_populates on both sides', 'Use cascade', 'Cannot be done'],
          correctIndex: 1,
          explanation: 'Set back_populates="other_side" on both models. Then user.posts and post.author both work.'
        },
        {
          question: 'How to avoid N+1 queries?',
          options: ['Use lazy="selectin" or joined eager loading', 'Use raw SQL', 'Cannot be avoided', 'Add more indexes'],
          correctIndex: 0,
          explanation: 'lazy="selectin" loads relationships in a separate IN query. lazy="joined" uses a JOIN. Both avoid N+1.'
        }
      ],
      keyTakeaways: [
        'SQLAlchemy 2.0 uses Mapped[] for type-safe columns',
        'Use mapped_column() for column options (primary_key, default, etc.)',
        'relationship() + ForeignKey defines connections',
        'back_populates makes relationships bidirectional',
        'Many-to-many needs an association Table',
        'Use lazy="selectin" or "joined" to avoid N+1 queries'
      ],
      resources: [
        { title: 'SQLAlchemy ORM - Models', url: 'https://docs.sqlalchemy.org/en/20/tutorial/orm_data_model.html', type: 'docs' },
        { title: 'SQLAlchemy Relationships', url: 'https://docs.sqlalchemy.org/en/20/orm/relationships.html', type: 'docs' },
      ]
    },

    {
      id: 'sql-03',
      title: 'CRUD Operations & Queries',
      subtitle: 'select(), where, joins, aggregates, pagination',
      duration: 60,
      difficulty: 'Intermediate',
      phase: 'Foundation',
      content: [
        'SQLAlchemy 2.0 uses select() for queries (replacing the legacy Query API). Execute with session.execute(stmt), then use .scalars() to get ORM objects, .first() for one, .all() for list, .one() (raises if not found), .scalar_one_or_none() for optional.',
        'Filter with .where() (chainable). Comparison operators: ==, !=, <, >, <=, >=, .in_(), .like(), .ilike(), .is_(None), .between(). Combine with and_(), or_(), not_(). Use func for SQL functions (count, sum, avg, max, min).',
        'Joins: use .join() for inner, .outerjoin() for left. Group with .group_by(), filter groups with .having(). Order with .order_by(), limit with .limit(), offset with .offset(). Use select_from() to control the FROM clause.',
        'For pagination: use .offset() and .limit(). For better performance on large datasets, use keyset pagination (where id > last_id) instead of offset - offset scans all skipped rows.'
      ],
      codeExamples: [
        {
          filename: 'queries.py',
          language: 'python',
          code: 'from sqlalchemy import select, and_, or_, func, desc\nfrom sqlalchemy.ext.asyncio import AsyncSession\n\n# CREATE\nasync def create_user(db: AsyncSession, email: str, name: str):\n    user = User(email=email, name=name)\n    db.add(user)\n    await db.commit()\n    await db.refresh(user)  # get generated id\n    return user\n\n# READ - single\nasync def get_user(db: AsyncSession, user_id: int):\n    # Method 1: select with where\n    stmt = select(User).where(User.id == user_id)\n    result = await db.execute(stmt)\n    return result.scalar_one_or_none()  # None if not found\n\n    # Method 2: get by primary key (simpler)\n    # return await db.get(User, user_id)\n\n# READ - list with filters\nasync def search_users(db: AsyncSession, name: str | None = None, active_only: bool = False):\n    stmt = select(User)\n\n    # Conditional filters - chain .where()\n    if name:\n        stmt = stmt.where(User.name.ilike(f"%{name}%"))  # case-insensitive\n    if active_only:\n        stmt = stmt.where(User.is_active == True)\n\n    result = await db.execute(stmt)\n    return result.scalars().all()\n\n# READ - with complex WHERE\nasync def complex_query(db: AsyncSession):\n    stmt = select(User).where(\n        and_(\n            User.is_active == True,\n            or_(\n                User.email.like("%@gmail.com"),\n                User.email.like("%@yahoo.com"),\n            ),\n        )\n    ).order_by(desc(User.created_at))\n    return (await db.execute(stmt)).scalars().all()\n\n# UPDATE\nasync def update_user(db: AsyncSession, user_id: int, name: str):\n    user = await db.get(User, user_id)\n    if not user:\n        return None\n    user.name = name  # just set attributes\n    await db.commit()\n    return user\n\n# Bulk update\nfrom sqlalchemy import update\nasync def deactivate_all(db: AsyncSession):\n    stmt = update(User).where(User.is_active == True).values(is_active=False)\n    await db.execute(stmt)\n    await db.commit()\n\n# DELETE\nasync def delete_user(db: AsyncSession, user_id: int):\n    user = await db.get(User, user_id)\n    if user:\n        await db.delete(user)\n        await db.commit()\n        return True\n    return False\n\n# Bulk delete\nfrom sqlalchemy import delete\nasync def delete_inactive(db: AsyncSession):\n    stmt = delete(User).where(User.is_active == False)\n    await db.execute(stmt)\n    await db.commit()',
          explanation: 'Use select() + .where() for queries. .scalar_one_or_none() for single optional, .scalars().all() for lists. Update by setting attributes, delete with db.delete() or bulk delete().'
        },
        {
          filename: 'advanced_queries.py',
          language: 'python',
          code: 'from sqlalchemy import select, func, desc, and_\n\n# JOINs\nasync def users_with_posts(db: AsyncSession):\n    stmt = (\n        select(User, Post)\n        .join(Post, Post.author_id == User.id)  # inner join\n        .where(Post.published == True)\n    )\n    result = await db.execute(stmt)\n    for user, post in result:\n        print(user.name, post.title)\n\n# LEFT JOIN (include users without posts)\nasync def all_users_with_optional_posts(db: AsyncSession):\n    stmt = (\n        select(User, Post)\n        .outerjoin(Post, Post.author_id == User.id)\n    )\n    result = await db.execute(stmt)\n    for user, post in result:\n        print(user.name, post.title if post else "no posts")\n\n# Aggregates\nasync def user_post_counts(db: AsyncSession):\n    stmt = (\n        select(User.name, func.count(Post.id).label("post_count"))\n        .outerjoin(Post, Post.author_id == User.id)\n        .group_by(User.id, User.name)\n        .order_by(desc(func.count(Post.id)))\n    )\n    result = await db.execute(stmt)\n    return result.all()  # list of Row objects\n\n# HAVING (filter groups, vs WHERE filters rows)\nasync def users_with_many_posts(db: AsyncSession, min_posts: int = 5):\n    stmt = (\n        select(User.name, func.count(Post.id).label("count"))\n        .join(Post)\n        .group_by(User.id, User.name)\n        .having(func.count(Post.id) >= min_posts)\n    )\n    return (await db.execute(stmt)).all()\n\n# Pagination\nasync def paginate_posts(db: AsyncSession, page: int = 1, size: int = 20):\n    offset = (page - 1) * size\n    stmt = (\n        select(Post)\n        .where(Post.published == True)\n        .order_by(desc(Post.created_at))\n        .offset(offset)\n        .limit(size)\n    )\n    return (await db.execute(stmt)).scalars().all()\n\n# Subqueries\nasync def users_with_published_posts(db: AsyncSession):\n    # Subquery: authors of published posts\n    subq = (\n        select(Post.author_id)\n        .where(Post.published == True)\n        .distinct()\n        .subquery()\n    )\n    stmt = select(User).where(User.id.in_(select(subq)))\n    return (await db.execute(stmt)).scalars().all()',
          explanation: 'Use .join() and .outerjoin() for joins. func.count/sum/avg for aggregates. .group_by() + .having() for groups. .offset()/.limit() for pagination.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a query to find the top 3 users by total post count, including users with zero posts.',
          starterCode: 'stmt = (\n    # your query\n)\n',
          hint: 'Use outerjoin, group_by, count, order_by desc, limit.',
          solution: 'stmt = (\n    select(User.name, func.count(Post.id).label("post_count"))\n    .outerjoin(Post, Post.author_id == User.id)\n    .group_by(User.id, User.name)\n    .order_by(desc(func.count(Post.id)))\n    .limit(3)\n)\nresult = await db.execute(stmt)\nfor row in result:\n    print(row.name, row.post_count)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does .scalar_one_or_none() return if no rows match?',
          options: ['Raises exception', 'Returns None', 'Returns empty list', 'Returns 0'],
          correctIndex: 1,
          explanation: 'scalar_one_or_none() returns None if no rows, raises if multiple. one() raises in both cases.'
        },
        {
          question: 'What is the difference between WHERE and HAVING?',
          options: ['No difference', 'WHERE filters rows, HAVING filters groups', 'HAVING is faster', 'WHERE is for joins'],
          correctIndex: 1,
          explanation: 'WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY.'
        },
        {
          question: 'How do you do a LEFT JOIN in SQLAlchemy?',
          options: ['.left_join()', '.outerjoin()', '.join(left=True)', '.join() with left=True param'],
          correctIndex: 1,
          explanation: 'Use .outerjoin() for LEFT OUTER JOIN. .join() is INNER JOIN by default.'
        }
      ],
      keyTakeaways: [
        'Use select() + .where() for queries (SQLAlchemy 2.0 API)',
        '.scalar_one_or_none() returns None if not found (safer than .one())',
        'Update by setting attributes, then commit',
        'Use .join() and .outerjoin() for joins',
        'func.count/sum/avg + .group_by() + .having() for aggregates',
        'Pagination: .offset() + .limit() (or keyset pagination for large datasets)'
      ],
      resources: [
        { title: 'SQLAlchemy 2.0 - ORM Querying', url: 'https://docs.sqlalchemy.org/en/20/tutorial/orm_related_objects.html', type: 'docs' },
        { title: 'SQLAlchemy - SELECT statements', url: 'https://docs.sqlalchemy.org/en/20/tutorial/data_select.html', type: 'docs' },
      ]
    },

    {
      id: 'sql-04',
      title: 'Migrations with Alembic',
      subtitle: 'Version control your database schema',
      duration: 40,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Alembic is SQLAlchemy\'s migration tool. It tracks schema changes as Python scripts. Each migration is a snapshot - you can upgrade or downgrade. Migrations are version-controlled alongside your code, so the DB schema evolves with the application.',
        'Setup: 1) `alembic init alembic` creates the alembic/ directory, 2) Edit alembic.ini to set sqlalchemy.url, 3) Edit alembic/env.py to import your Base.metadata, 4) `alembic revision --autogenerate -m "create users"` generates a migration from your models, 5) `alembic upgrade head` applies it.',
        'Autogenerate detects: new/removed tables, added/removed columns, type changes, foreign key changes. It does NOT detect: column renames (looks like drop+add), server defaults, check constraints. Always review generated migrations!',
        'Common commands: `alembic upgrade head` (latest), `alembic upgrade +1` (one ahead), `alembic downgrade -1` (one back), `alembic history` (see all), `alembic current` (see current version), `alembic stamp head` (mark as current without running - for existing DBs).'
      ],
      codeExamples: [
        {
          filename: 'alembic_workflow.sh',
          language: 'bash',
          code: '# Initialize Alembic\nalembic init alembic\n\n# This creates:\n# alembic/\n#   env.py         - migration runner\n#   script.py.mako  - template\n#   versions/      - migration scripts\n# alembic.ini      - config\n\n# After changing models, autogenerate a migration\nalembic revision --autogenerate -m "add email index to users"\n\n# Review the generated file in alembic/versions/!\n# Autogenerate is not perfect - check for:\n# - Renamed columns (looks like drop + add)\n# - Constraint changes\n# - Default values\n\n# Apply the migration\nalembic upgrade head\n\n# Roll back one migration\nalembic downgrade -1\n\n# See migration history\nalembic history\n\n# See current version\nalembic current\n\n# Mark DB as up-to-date without running migrations\n# (useful when pointing Alembic at an existing DB)\nalembic stamp head',
          explanation: 'Always review autogenerated migrations! Autogenerate is a starting point - it misses renames, defaults, and constraints.'
        },
        {
          filename: 'migration_example.py',
          language: 'python',
          code: '# alembic/versions/abc123_add_email_index.py\n"""add email index to users\n\nRevision ID: abc123\nRevises: def456\nCreate Date: 2024-01-15 10:00:00\n"""\nfrom alembic import op\nimport sqlalchemy as sa\n\n# revision identifiers\nrevision = "abc123"\ndown_revision = "def456"  # previous migration\nbranch_labels = None\ndepends_on = None\n\ndef upgrade() -> None:\n    # Create a new index\n    op.create_index(\n        "ix_users_email",\n        "users",\n        ["email"],\n        unique=True,\n    )\n\n    # Add a new column\n    op.add_column(\n        "users",\n        sa.Column("bio", sa.Text(), nullable=True),\n    )\n\n    # Create a new table\n    op.create_table(\n        "posts",\n        sa.Column("id", sa.Integer(), primary_key=True),\n        sa.Column("title", sa.String(200), nullable=False),\n        sa.Column("author_id", sa.Integer(), sa.ForeignKey("users.id")),\n    )\n\ndef downgrade() -> None:\n    # Reverse of upgrade - must be safe to run\n    op.drop_table("posts")\n    op.drop_column("users", "bio")\n    op.drop_index("ix_users_email", table_name="users")\n\n# Common Alembic operations:\n# op.create_table(name, *columns)\n# op.drop_table(name)\n# op.add_column(table, column)\n# op.drop_column(table, column_name)\n# op.alter_column(table, column, nullable=..., type_=..., server_default=...)\n# op.create_index(name, table, columns, unique=...)\n# op.drop_index(name, table)\n# op.create_foreign_key(name, source, referent, local_cols, remote_cols)\n# op.execute("RAW SQL HERE")',
          explanation: 'Each migration has upgrade() and downgrade(). Use op.create_table, op.add_column, op.create_index, etc. Always implement downgrade for safe rollbacks.'
        },
      ],
      exercises: [
        {
          prompt: 'Write an Alembic migration that adds a "deleted_at" nullable DateTime column to the posts table (for soft deletes).',
          starterCode: 'def upgrade():\n    # your code\n    pass\n\ndef downgrade():\n    # your code\n    pass\n',
          hint: 'Use op.add_column with sa.Column("deleted_at", sa.DateTime(), nullable=True).',
          solution: 'def upgrade():\n    op.add_column(\n        "posts",\n        sa.Column("deleted_at", sa.DateTime(), nullable=True),\n    )\n    op.create_index(\n        "ix_posts_deleted_at",\n        "posts",\n        ["deleted_at"],\n    )\n\ndef downgrade():\n    op.drop_index("ix_posts_deleted_at", table_name="posts")\n    op.drop_column("posts", "deleted_at")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does `alembic revision --autogenerate` do?',
          options: ['Generates migration from model changes', 'Applies all migrations', 'Creates the database', 'Rolls back migrations'],
          correctIndex: 0,
          explanation: 'Autogenerate compares your models to the current DB schema and generates a migration script. Always review it!'
        },
        {
          question: 'What does the downgrade() function do?',
          options: ['Removes the migration', 'Reverses the migration', 'Downgrades Alembic', 'Nothing'],
          correctIndex: 1,
          explanation: 'downgrade() reverses what upgrade() did, allowing you to roll back migrations safely.'
        },
        {
          question: 'What does autogenerate NOT detect?',
          options: ['New tables', 'Removed columns', 'Renamed columns (looks like drop+add)', 'New foreign keys'],
          correctIndex: 2,
          explanation: 'Autogenerate cannot distinguish a rename from a drop+add. It also misses server defaults and some constraints. Always review!'
        }
      ],
      keyTakeaways: [
        'Alembic version-controls your database schema',
        'Setup: alembic init, configure env.py, autogenerate migrations',
        'Always review autogenerated migrations - they miss renames and defaults',
        'Every migration needs upgrade() AND downgrade() for safe rollbacks',
        'Use op.create_table, op.add_column, op.create_index, op.alter_column',
        'Commands: upgrade head, downgrade -1, history, current, stamp head'
      ],
      resources: [
        { title: 'Alembic Documentation', url: 'https://alembic.sqlalchemy.org/', type: 'docs' },
        { title: 'Alembic Cookbook', url: 'https://alembic.sqlalchemy.org/en/latest/cookbook.html', type: 'article' },
      ]
    },

    {
      id: 'sql-05',
      title: 'Transactions, Indexes & Performance',
      subtitle: 'ACID, isolation levels, indexing strategy, query optimization',
      duration: 50,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Transactions are units of work that are atomic (all or nothing), consistent, isolated, and durable (ACID). In SQLAlchemy, a session is a transaction - commit() to save, rollback() to undo. Use nested transactions with begin_nested() for savepoints.',
        'Indexes speed up queries but slow down writes. Add indexes on: foreign keys, columns in WHERE clauses, columns in ORDER BY/GROUP BY. Avoid indexes on: low-cardinality columns (boolean), frequently updated columns, small tables. Use EXPLAIN ANALYZE to see query plans.',
        'N+1 query problem: loading 100 users with their posts fires 101 queries (1 for users + 1 per user for posts). Fix with eager loading: lazy="selectin" (separate IN query), lazy="joined" (JOIN), or explicit selectinload()/joinedload() per query.',
        'Connection pooling: SQLAlchemy maintains a pool of connections. Default pool_size=5, max_overflow=10. For async with asyncpg, use NullPool in serverless (Lambda) to avoid connection leaks. Use pool_pre_ping=True to detect stale connections.'
      ],
      codeExamples: [
        {
          filename: 'transactions.py',
          language: 'python',
          code: 'from sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy.exc import SQLAlchemyError\n\n# Transaction - all or nothing\nasync def transfer_money(db: AsyncSession, from_id: int, to_id: int, amount: float):\n    try:\n        from_acct = await db.get(Account, from_id)\n        to_acct = await db.get(Account, to_id)\n\n        if from_acct.balance < amount:\n            raise ValueError("Insufficient funds")\n\n        from_acct.balance -= amount\n        to_acct.balance += amount\n\n        await db.commit()  # both changes saved atomically\n    except Exception:\n        await db.rollback()  # undo all changes\n        raise\n\n# Nested transactions (savepoints)\nasync def with_savepoint(db: AsyncSession):\n    async with db.begin():  # outer transaction\n        user = User(name="test")\n        db.add(user)\n\n        try:\n            async with db.begin_nested():  # savepoint\n                post = Post(title="x", author_id=user.id)\n                db.add(post)\n                # If this fails, only the savepoint rolls back\n        except Exception:\n            pass  # post not saved, but user is\n\n# Manual transaction control\nasync def manual_txn(db: AsyncSession):\n    # Transaction starts implicitly\n    db.add(User(name="a"))\n    db.add(User(name="b"))\n    # Both pending - not yet saved\n\n    await db.commit()  # save both\n    # OR\n    await db.rollback()  # discard both\n\n# Isolation levels\nfrom sqlalchemy import create_engine\nengine = create_engine(\n    "postgresql://user:pass@localhost/db",\n    isolation_level="REPEATABLE READ",  # READ COMMITTED (default), REPEATABLE READ, SERIALIZABLE\n)',
          explanation: 'Transactions are atomic - commit() saves all, rollback() discards all. Use begin_nested() for savepoints. Set isolation_level on engine for concurrency control.'
        },
        {
          filename: 'indexes_perf.py',
          language: 'python',
          code: 'from sqlalchemy import Index, create_engine, text\nfrom sqlalchemy.orm import Mapped, mapped_column\n\n# Define indexes on models\nclass User(Base):\n    __tablename__ = "users"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    email: Mapped[str] = mapped_column(index=True)  # single-column index\n    name: Mapped[str] = mapped_column()\n    created_at: Mapped[datetime] = mapped_column()\n\n    # Composite index (multiple columns)\n    __table_args__ = (\n        Index("ix_user_name_created", "name", "created_at"),\n    )\n\n# Analyze query performance with EXPLAIN\nasync def analyze_query(db: AsyncSession):\n    # See the query plan\n    result = await db.execute(\n        text("EXPLAIN ANALYZE SELECT * FROM users WHERE email = \'alice@example.com\'")\n    )\n    for row in result:\n        print(row[0])\n\n    # Look for:\n    # - Seq Scan (bad - full table scan)\n    # - Index Scan (good - uses index)\n    # - Index Only Scan (best - all data from index)\n\n# Eager loading - fix N+1 queries\nfrom sqlalchemy.orm import selectinload, joinedload\n\nasync def get_users_with_posts(db: AsyncSession):\n    # BAD: N+1 query (1 for users + N for posts)\n    users = (await db.execute(select(User))).scalars().all()\n    for u in users:\n        print(u.posts)  # Each access fires a new query!\n\n    # GOOD: selectinload (2 queries total)\n    stmt = select(User).options(selectinload(User.posts))\n    users = (await db.execute(stmt)).scalars().all()\n\n    # GOOD: joinedload (1 query with JOIN)\n    stmt = select(User).options(joinedload(User.posts))\n    users = (await db.execute(stmt)).scalars().all()\n\n# Bulk operations - much faster than individual adds\nasync def bulk_insert(db: AsyncSession):\n    users = [User(name=f"user{i}", email=f"u{i}@x.com") for i in range(1000)]\n\n    # Slow: 1000 INSERT statements\n    for u in users:\n        db.add(u)\n    await db.commit()\n\n    # Fast: 1 INSERT with all values\n    await db.execute(\n        insert(User),\n        [{"name": f"user{i}", "email": f"u{i}@x.com"} for i in range(1000)]\n    )\n    await db.commit()',
          explanation: 'Add indexes on FK and filtered columns. Use EXPLAIN ANALYZE to find slow queries. Fix N+1 with selectinload/joinedload. Use bulk insert for many rows.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a function that uses selectinload to fetch all users and their posts in just 2 queries.',
          starterCode: 'from sqlalchemy import select\nfrom sqlalchemy.orm import selectinload\n\nasync def users_with_posts(db):\n    # your code\n    pass\n',
          hint: 'Use select(User).options(selectinload(User.posts)).',
          solution: 'from sqlalchemy import select\nfrom sqlalchemy.orm import selectinload\n\nasync def users_with_posts(db):\n    stmt = select(User).options(selectinload(User.posts))\n    result = await db.execute(stmt)\n    users = result.scalars().all()\n    for u in users:\n        print(u.name, len(u.posts))  # posts already loaded\n    return users',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does ACID stand for?',
          options: ['Atomic, Consistent, Isolated, Durable', 'Atomic, Concurrent, Indexed, Distributed', 'Async, Consistent, Indexed, Durable', 'Atomic, Cached, Isolated, Durable'],
          correctIndex: 0,
          explanation: 'ACID: Atomic (all or nothing), Consistent (valid state), Isolated (concurrent txns do not interfere), Durable (survives crashes).'
        },
        {
          question: 'What is the N+1 query problem?',
          options: ['N queries for N items', '1 query for items + N for relations = N+1 total', 'N+1 indexes needed', 'Network latency'],
          correctIndex: 1,
          explanation: 'N+1: 1 query loads N items, then 1 query per item to load relations. Fix with eager loading (selectinload/joinedload).'
        },
        {
          question: 'When should you NOT add an index?',
          options: ['On foreign keys', 'On low-cardinality columns (boolean)', 'On columns in WHERE', 'On columns in ORDER BY'],
          correctIndex: 1,
          explanation: 'Low-cardinality columns (boolean, gender) do not benefit from indexes - the planner uses a seq scan anyway.'
        }
      ],
      keyTakeaways: [
        'Transactions are ACID - commit() saves all, rollback() discards all',
        'Use begin_nested() for savepoints (partial rollback)',
        'Add indexes on FKs, filtered columns, and ORDER BY columns',
        'Avoid indexes on low-cardinality and frequently-updated columns',
        'Fix N+1 with selectinload() (2 queries) or joinedload() (1 query)',
        'Use EXPLAIN ANALYZE to find slow queries'
      ],
      resources: [
        { title: 'SQLAlchemy Transactions', url: 'https://docs.sqlalchemy.org/en/20/orm/session_transaction.html', type: 'docs' },
        { title: 'PostgreSQL EXPLAIN', url: 'https://www.postgresql.org/docs/current/sql-explain.html', type: 'docs' },
        { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'book', isHiddenGem: true },
      ]
    },
  ]
};
