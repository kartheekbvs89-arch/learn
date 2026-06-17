import { Phase, Difficulty } from './types';

export interface LessonMeta {
  slug: string;
  title: string;
  duration: number;
  difficulty: Difficulty;
  phase: Phase;
  xp: number;
  moduleSlug: string;
}

export const lessonMetadata: Record<string, LessonMeta[]> = {
  python: [
    // Phase 1 — Foundation
    { slug: 'pyenv-setup', title: 'pyenv, uv, venv, pyproject.toml', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python' },
    { slug: 'types-variables', title: 'Types, Variables, Operators + Type Hints', duration: 45, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python' },
    { slug: 'strings', title: 'Strings — Every Method, Regex, Formatting', duration: 75, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'python' },
    { slug: 'collections', title: 'Lists, Tuples, Dicts, Sets — O(1) vs O(n)', duration: 80, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'python' },
    { slug: 'control-flow', title: 'Control Flow — if/for/while, match-case, Comprehensions', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python' },
    { slug: 'functions', title: 'Functions — *args, **kwargs, Closures, Type Hints', duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'python' },
    { slug: 'file-io', title: 'File I/O — pathlib, JSON, CSV, YAML, TOML', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python' },
    { slug: 'error-handling', title: 'Error Handling — Exceptions, Context Managers', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python' },
    // Phase 2 — Intermediate
    { slug: 'oop', title: 'OOP — Classes, Inheritance, Magic Methods, Dataclasses', duration: 90, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'python' },
    { slug: 'decorators', title: 'Decorators — Function, Class, Parametrized, Built-in', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'python' },
    { slug: 'iterators-generators', title: 'Iterators & Generators — yield, itertools', duration: 65, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'python' },
    { slug: 'modules-packages', title: 'Modules & Packages — __init__.py, Imports', duration: 50, difficulty: 'Intermediate', phase: 'Intermediate', xp: 100, moduleSlug: 'python' },
    { slug: 'stdlib', title: 'Standard Library — collections, functools, contextlib', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'python' },
    // Phase 3 — Advanced
    { slug: 'async-await', title: 'Async/Await — asyncio, aiohttp, Threading vs Multiprocessing', duration: 85, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'python' },
    { slug: 'metaclasses', title: 'Metaclasses & Descriptors', duration: 70, difficulty: 'Expert', phase: 'Advanced', xp: 200, moduleSlug: 'python' },
    { slug: 'performance', title: 'Memory & Performance — cProfile, slots, gc', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 150, moduleSlug: 'python' },
    { slug: 'type-system', title: 'Type System — TypeVar, Generic, Protocol, mypy', duration: 60, difficulty: 'Advanced', phase: 'Advanced', xp: 150, moduleSlug: 'python' },
    // Phase 4 — Real-World
    { slug: 'pytest', title: 'Testing with pytest — Fixtures, Parametrize, Coverage', duration: 75, difficulty: 'Intermediate', phase: 'Real-World', xp: 200, moduleSlug: 'python' },
    { slug: 'logging-config', title: 'Logging & Configuration — structlog, pydantic-settings', duration: 60, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'python' },
    { slug: 'cli-apps', title: 'CLI Apps — Click, Typer, Rich', duration: 65, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'python' },
    { slug: 'packaging', title: 'Packaging & Publishing — pyproject.toml, PyPI, CI/CD', duration: 55, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'python' },
  ],
  fastapi: [
    // Phase 1 — Foundation
    { slug: 'installation', title: 'Installation, Project Structure, First API', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'fastapi' },
    { slug: 'path-query-params', title: 'Path Params, Query Params, Request Body', duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'fastapi' },
    { slug: 'pydantic-v2', title: 'Pydantic v2 — BaseModel, Field, Validators', duration: 80, difficulty: 'Beginner', phase: 'Foundation', xp: 200, moduleSlug: 'fastapi' },
    { slug: 'response-models', title: 'Response Models, Status Codes, Serializers', duration: 55, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'fastapi' },
    { slug: 'routers-structure', title: 'Routers & App Structure — APIRouter, Lifespan', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'fastapi' },
    // Phase 2 — Intermediate
    { slug: 'dependency-injection', title: 'Dependency Injection — Depends, Yield, Classes', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'fastapi' },
    { slug: 'middleware', title: 'Middleware — CORS, GZip, Trusted Host', duration: 60, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'fastapi' },
    { slug: 'authentication', title: 'Authentication — OAuth2, JWT, Password Hashing', duration: 85, difficulty: 'Intermediate', phase: 'Intermediate', xp: 250, moduleSlug: 'fastapi' },
    { slug: 'file-uploads', title: 'File Uploads — UploadFile, S3 Integration', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'fastapi' },
    { slug: 'websockets', title: 'WebSockets — Connection Manager, Real-time Chat', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'fastapi' },
    // Phase 3 — Advanced
    { slug: 'async-sqlalchemy', title: 'Async SQLAlchemy 2.0 + PostgreSQL + Alembic', duration: 90, difficulty: 'Advanced', phase: 'Advanced', xp: 300, moduleSlug: 'fastapi' },
    { slug: 'redis', title: 'Redis — Caching, Pub/Sub, Rate Limiting', duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'fastapi' },
    { slug: 'celery', title: 'Celery — Background Tasks, Beat Scheduler, Flower', duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'fastapi' },
    { slug: 'ml-serving', title: 'ML Model Serving — PyTorch, ONNX, A/B Testing', duration: 90, difficulty: 'Advanced', phase: 'Advanced', xp: 300, moduleSlug: 'fastapi' },
    { slug: 'external-apis', title: 'External APIs — httpx, Webhooks, Circuit Breaker', duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'fastapi' },
    // Phase 4 — Real-World
    { slug: 'db-advanced', title: 'Database Advanced — Transactions, N+1, Indexing', duration: 85, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'fastapi' },
    { slug: 'testing', title: 'Testing FastAPI — TestClient, Fixtures, 95% Coverage', duration: 80, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'fastapi' },
    { slug: 'error-logging', title: 'Error Handling & Logging — structlog, Sentry', duration: 65, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'fastapi' },
    { slug: 'deployment', title: 'Production Deployment — Docker, Nginx, Gunicorn', duration: 80, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'fastapi' },
    { slug: 'monitoring', title: 'Monitoring — Prometheus, Grafana, Health Checks', duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'fastapi' },
  ],
  react: [
    { slug: 'vite-setup', title: 'Vite Setup, ESLint, Prettier, Path Aliases', duration: 50, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'react' },
    { slug: 'typescript', title: 'TypeScript — Interfaces, Generics, Utility Types', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'react' },
    { slug: 'react-fundamentals', title: 'React 19 Fundamentals — JSX, Props, State', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'react' },
    { slug: 'hooks', title: 'Hooks Deep Dive — useState, useEffect, Custom Hooks', duration: 75, difficulty: 'Beginner', phase: 'Foundation', xp: 200, moduleSlug: 'react' },
    { slug: 'component-patterns', title: 'Component Patterns — Composition, Compound, HOC', duration: 70, difficulty: 'Intermediate', phase: 'Foundation', xp: 150, moduleSlug: 'react' },
    { slug: 'react-router', title: 'React Router v6 — Nested Routes, Loaders, Actions', duration: 65, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'react' },
    { slug: 'state-management', title: 'State Management — Context, Zustand, Jotai', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'react' },
    { slug: 'tanstack-query', title: 'TanStack Query — useQuery, useMutation, Cache', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'react' },
    { slug: 'forms', title: 'Forms — React Hook Form + Zod Validation', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'react' },
    { slug: 'styling', title: 'Styling — Tailwind CSS, shadcn/ui, CVA', duration: 60, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'react' },
    { slug: 'api-integration', title: 'API Integration — Axios, Interceptors, Auth Refresh', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react' },
    { slug: 'websocket-client', title: 'WebSocket Client — useWebSocket Hook, Reconnection', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react' },
    { slug: 'performance', title: 'Performance — Profiler, Memo, Virtualization', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react' },
    { slug: 'testing', title: 'Testing — Vitest, Testing Library, MSW', duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react' },
    { slug: 'auth-flows', title: 'Auth Flows — JWT, Protected Routes, Refresh', duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'react' },
    { slug: 'file-upload-ui', title: 'File Upload UI — Drag-drop, Progress, S3 Presigned', duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'react' },
    { slug: 'realtime-dashboard', title: 'Real-time Dashboard — WebSocket + Charts', duration: 80, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'react' },
    { slug: 'deployment', title: 'Deployment — Vite Build, Nginx, Docker, CI/CD', duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'react' },
  ],
  postgresql: [
    { slug: 'sql-fundamentals', title: 'SQL Fundamentals — SELECT, INSERT, UPDATE, DELETE', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'postgresql' },
    { slug: 'joins', title: 'JOINs — INNER, LEFT, RIGHT, FULL, Self-joins', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'postgresql' },
    { slug: 'aggregations', title: 'Aggregations — GROUP BY, HAVING, Window Functions', duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'postgresql' },
    { slug: 'indexes', title: 'Indexes — B-tree, GIN, BRIN, EXPLAIN ANALYZE', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'query-optimization', title: 'Query Optimization — N+1, Pagination, Denormalization', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'transactions', title: 'Transactions, MVCC, Isolation Levels, Deadlocks', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'jsonb-arrays', title: 'JSONB & Arrays — Store, Query, Index', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'full-text-search', title: 'Full-Text Search — tsvector, GIN, pg_trgm', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'partitioning', title: 'Table Partitioning — Range, List, Hash', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'alembic', title: 'Alembic Migrations — Autogenerate, Upgrade, Downgrade', duration: 70, difficulty: 'Intermediate', phase: 'Real-World', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'seeds-testing', title: 'Seeds & Test Databases — Fixtures, Factories', duration: 60, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql' },
    { slug: 'pgbouncer', title: 'PgBouncer — Connection Pooling in Production', duration: 55, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql' },
    { slug: 'backup-recovery', title: 'Backup & Recovery — pg_dump, PITR, Replication', duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'postgresql' },
    { slug: 'security', title: 'Security — Roles, Grants, RLS, Encryption', duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql' },
    { slug: 'monitoring', title: 'Monitoring — pg_stat, slow queries, vacuum', duration: 55, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql' },
  ],
  docker: [
    { slug: 'docker-fundamentals', title: 'Docker Fundamentals — Images, Containers, Run', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'docker' },
    { slug: 'dockerfile', title: 'Dockerfile Best Practices — Layers, Cache, Size', duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 200, moduleSlug: 'docker' },
    { slug: 'multi-stage', title: 'Multi-Stage Builds — Builder + Runtime', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'docker' },
    { slug: 'compose', title: 'Docker Compose — Multi-service Local Dev', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'docker' },
    { slug: 'networking', title: 'Networking — Bridge, Host, Custom Networks', duration: 60, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'docker' },
    { slug: 'volumes', title: 'Volumes & Bind Mounts — Persistent Data', duration: 55, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'docker' },
    { slug: 'nginx', title: 'Nginx — Reverse Proxy, SSL, Load Balancing', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'docker' },
    { slug: 'github-actions', title: 'GitHub Actions CI/CD — Test, Build, Push, Deploy', duration: 80, difficulty: 'Intermediate', phase: 'Intermediate', xp: 250, moduleSlug: 'docker' },
    { slug: 'registry', title: 'Container Registry — GHCR, ECR, Tagging Strategy', duration: 55, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'docker' },
    { slug: 'k8s-basics', title: 'Kubernetes Basics — Pods, Services, Deployments', duration: 85, difficulty: 'Advanced', phase: 'Advanced', xp: 300, moduleSlug: 'docker' },
    { slug: 'k8s-config', title: 'K8s ConfigMaps, Secrets, Volumes', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'docker' },
    { slug: 'k8s-ingress', title: 'K8s Ingress, Helm, Autoscaling', duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'docker' },
    { slug: 'docker-security', title: 'Docker Security — Scanning, Non-root, Distroless', duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'docker' },
    { slug: 'monitoring', title: 'Monitoring — Prometheus, Grafana, Logging', duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'docker' },
    { slug: 'gitops', title: 'GitOps — ArgoCD, Flux, Declarative Deploy', duration: 75, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'docker' },
  ],
  ml: [
    { slug: 'project-structure', title: 'ML Project Structure, DVC, MLflow', duration: 70, difficulty: 'Intermediate', phase: 'Foundation', xp: 200, moduleSlug: 'ml' },
    { slug: 'data-pipeline', title: 'Data Pipeline — Load, Clean, Feature Engineering', duration: 75, difficulty: 'Intermediate', phase: 'Foundation', xp: 200, moduleSlug: 'ml' },
    { slug: 'experiment-tracking', title: 'Experiment Tracking — MLflow, W&B', duration: 65, difficulty: 'Intermediate', phase: 'Foundation', xp: 150, moduleSlug: 'ml' },
    { slug: 'pytorch-dataset', title: 'PyTorch Dataset & DataLoader', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'ml' },
    { slug: 'pytorch-model', title: 'PyTorch Model — nn.Module, Layers, Forward', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'ml' },
    { slug: 'training-loop', title: 'Training Loop — Optimizer, Loss, Checkpoints', duration: 80, difficulty: 'Intermediate', phase: 'Intermediate', xp: 250, moduleSlug: 'ml' },
    { slug: 'evaluation', title: 'Evaluation — Confusion Matrix, ROC, Calibration', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'ml' },
    { slug: 'ab-testing', title: 'A/B Testing Models — Statistical Significance', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'ml' },
    { slug: 'onnx-export', title: 'ONNX Export — PyTorch/TF → ONNX Runtime', duration: 60, difficulty: 'Advanced', phase: 'Advanced', xp: 150, moduleSlug: 'ml' },
    { slug: 'fastapi-serving', title: 'FastAPI Model Serving — Batch, Async, GPU', duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'ml' },
    { slug: 'model-registry', title: 'Model Registry — Versioning, Rollback, Canary', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'ml' },
    { slug: 'mlops-pipeline', title: 'MLOps Pipeline — GitHub Actions Training', duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'ml' },
    { slug: 'data-drift', title: 'Data Drift Detection — Monitor, Alert, Retrain', duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'ml' },
    { slug: 'distributed-training', title: 'Distributed Training — DDP, Multi-GPU', duration: 75, difficulty: 'Expert', phase: 'Real-World', xp: 250, moduleSlug: 'ml' },
    { slug: 'production-checklist', title: 'Production ML Checklist — 50-point Audit', duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'ml' },
  ],
};

export function getLessonsForModule(moduleSlug: string): LessonMeta[] {
  return lessonMetadata[moduleSlug] || [];
}

export function getLessonMeta(moduleSlug: string, lessonSlug: string): LessonMeta | undefined {
  return lessonMetadata[moduleSlug]?.find(l => l.slug === lessonSlug);
}
