import { Lesson } from '../../types';

// Helper to create lessons quickly with all 8 sections
function makeLesson(partial: Partial<Lesson> & { slug: string; title: string; moduleSlug: string }): Lesson {
  return {
    subtitle: partial.title, duration: 60, difficulty: 'Intermediate', phase: 'Foundation',
    xp: 150, objectives: ['Understand core concepts','Apply in real projects','Debug common issues'],
    realWorldContext: 'Used in production at every tech company.', prerequisites: ['Previous lessons'],
    conceptDiagram: 'See code examples for architecture.', conceptExplanation: ['Core concept explanation.','Production usage.','Best practices.'],
    whyItMatters: 'Essential for production applications.',
    codeExamples: [
      { filename: 'example.py', language: 'python', approach: 'minimal', code: '# Minimal example\nprint("Hello")', explanation: 'Basic usage.' },
      { filename: 'example.py', language: 'python', approach: 'real-world', code: '# Real-world example\ndef process(data):\n    return data', explanation: 'Production pattern.' },
      { filename: 'example.py', language: 'python', approach: 'production', code: '# Production with error handling\nimport logging\nlogger = logging.getLogger(__name__)\ndef process(data):\n    try:\n        return data\n    except Exception as e:\n        logger.exception("Failed")\n        raise', explanation: 'Full production code.' },
    ],
    configFiles: [], lab: { title: 'Practice', steps: [{ step: 1, title: 'Setup', instruction: 'Set up environment', command: 'echo setup', expectedOutput: 'OK', verification: 'Works' }] },
    commonErrors: [{ error: 'Common error', fix: 'Fix it', rootCause: 'Reason' }],
    quiz: [
      { question: 'Question?', options: ['A','B','C','D'], correctIndex: 0, explanation: 'Because.' },
      { question: 'Question 2?', options: ['A','B','C','D'], correctIndex: 0, explanation: 'Because.' },
    ],
    resources: [{ title: 'Docs', url: 'https://docs.example.com', type: 'docs' }],
    whatToReadNext: 'Read the next lesson.',
    ...partial,
  } as Lesson;
}

// ============ REACT MODULE (L1-L18) ============
export const reactLessons: Lesson[] = [
  makeLesson({ slug: 'vite-setup', title: 'Vite Setup, ESLint, Prettier, Path Aliases', moduleSlug: 'react', duration: 50, difficulty: 'Beginner', phase: 'Foundation', xp: 100,
    objectives: ['Set up Vite with React 19 + TypeScript','Configure ESLint and Prettier','Set up path aliases (@/ for src/)','Create project structure'],
    realWorldContext: 'Every React project at every company starts with Vite (or Next.js). Vite is 10-100x faster than CRA. Path aliases make imports clean: import Button from "@/components/Button" instead of "../../../../components/Button".',
    conceptDiagram: `VITE PROJECT:\nsrc/\n├── components/  ← reusable UI\n├── pages/       ← route pages\n├── hooks/       ← custom hooks\n├── lib/         ← utilities\n├── types/       ← TypeScript types\n└── App.tsx      ← root component\n\nPATH ALIAS:\ntsconfig.json: "paths": {"@/*": ["./src/*"]}\nvite.config.ts: resolve.alias: { "@": "/src" }`,
    conceptExplanation: ['Vite uses esbuild for dev server (instant startup) and Rollup for production builds. It is the standard for new React projects — Create React App is deprecated.','Path aliases (@/) make imports clean and refactor-safe. Without them, deep nesting creates "../../../" hell.','ESLint catches bugs (unused vars, missing deps). Prettier formats code. Both are mandatory in production teams.'],
    whyItMatters: 'A well-configured project setup saves hours every week. Path aliases prevent import hell. ESLint catches bugs before runtime. This is day-one setup for every React project.',
    codeExamples: [
      { filename: 'vite.config.ts', language: 'typescript', approach: 'real-world', code: `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport path from "path";\n\nexport default defineConfig({\n  plugins: [react()],\n  resolve: {\n    alias: { "@": path.resolve(__dirname, "./src") },\n  },\n  server: { port: 3000, proxy: { "/api": "http://localhost:8000" } },\n});`, explanation: 'Vite config with React plugin, path alias (@/), dev server proxy for API.' },
      { filename: 'tsconfig.json', language: 'json', approach: 'real-world', code: `{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": ["ES2022", "DOM", "DOM.Iterable"],\n    "module": "ESNext",\n    "jsx": "react-jsx",\n    "strict": true,\n    "paths": { "@/*": ["./src/*"] }\n  }\n}`, explanation: 'TypeScript config with strict mode, path alias, React JSX transform.' },
    ],
    configFiles: [], lab: { title: 'Set Up Vite Project', steps: [
      { step: 1, title: 'Create project', instruction: 'Scaffold Vite React TS', command: 'bun create vite myapp --template react-ts', expectedOutput: 'Project created' },
      { step: 2, title: 'Install deps', instruction: 'Install dependencies', command: 'cd myapp && bun install' },
      { step: 3, title: 'Run dev server', instruction: 'Start Vite', command: 'bun run dev', expectedOutput: 'Vite running on http://localhost:5173' },
    ]},
    commonErrors: [{ error: 'Cannot find module @/components/Button', fix: 'Configure path alias in both tsconfig.json (paths) AND vite.config.ts (resolve.alias).', rootCause: 'TypeScript and Vite need separate alias configurations.' }],
    quiz: [{ question: 'Why use Vite over Create React App?', options: ['More features', '10-100x faster dev server (esbuild)', 'Required', 'Better SEO'], correctIndex: 1, explanation: 'Vite uses esbuild for instant dev server startup. CRA is deprecated. Vite is the standard for new React projects.' }],
    resources: [{ title: 'Vite Documentation', url: 'https://vitejs.dev/', type: 'docs' }],
    whatToReadNext: 'Read about TypeScript fundamentals (next lesson).',
  }),
  makeLesson({ slug: 'typescript', title: 'TypeScript — Interfaces, Generics, Utility Types', moduleSlug: 'react', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150,
    objectives: ['Define interfaces and types','Use generics (TypeVar equivalent)','Use utility types: Partial, Pick, Omit, Record','Understand strict mode'],
    realWorldContext: 'TypeScript is mandatory at Google, Meta, and every major tech company for frontend. It catches 30% of bugs before runtime. Without TS, refactoring React codebases is terrifying.',
    conceptDiagram: `TYPESCRIPT:\ninterface User { name: string; age: number }\ntype Status = "active" | "inactive"  // union\ntype PartialUser = Partial<User>     // all optional\ntype UserName = Pick<User, "name">  // only name\ntype WithoutAge = Omit<User, "age"> // exclude age\ntype UserMap = Record<string, User> // { [key: string]: User }`,
    conceptExplanation: ['interface defines object shape. type is more flexible (unions, intersections). Use interface for objects, type for unions.','Generics: function identity<T>(x: T): T. Utility types: Partial<T> (all optional), Pick<T, K> (select keys), Omit<T, K> (exclude keys), Record<K, V> (map type).'],
    whyItMatters: 'TypeScript catches "Cannot read property of undefined" at write-time, not runtime. At scale (100+ components), TS is the only way to refactor safely.',
    codeExamples: [
      { filename: 'types.ts', language: 'typescript', approach: 'real-world', code: `// Interface\ninterface User {\n  id: number;\n  name: string;\n  email?: string; // optional\n  readonly createdAt: Date; // cannot modify\n}\n\n// Union type\ntype Status = "active" | "inactive" | "pending";\n\n// Generic function\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\nconst n = first([1, 2, 3]); // T = number\nconst s = first(["a", "b"]); // T = string\n\n// Utility types\ntype UserUpdate = Partial<User>;     // all fields optional\ntype UserName = Pick<User, "name">;  // { name: string }\ntype WithoutId = Omit<User, "id">;  // exclude id\ntype UserMap = Record<string, User>; // { [key: string]: User }`, explanation: 'interface for objects, type for unions. Generics <T> for reusable functions. Utility types transform existing types.' },
    ],
    configFiles: [], lab: { title: 'Add TypeScript Types', steps: [{ step: 1, title: 'Define types', instruction: 'Create types for your app', command: 'Create src/types/index.ts with interfaces' }] },
    commonErrors: [{ error: 'Type X is missing properties', fix: 'Check interface — all required fields must be present. Use ? for optional fields.', rootCause: 'TypeScript enforces interface contracts strictly.' }],
    quiz: [{ question: 'What does Partial<User> do?', options: ['Removes fields', 'Makes all fields optional', 'Adds fields', 'Creates copy'], correctIndex: 1, explanation: 'Partial<T> makes all properties of T optional. Perfect for PATCH/update operations.' }],
    resources: [{ title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', type: 'docs' }],
    whatToReadNext: 'Read about React 19 fundamentals (next lesson).',
  }),
  makeLesson({ slug: 'react-fundamentals', title: 'React 19 Fundamentals — JSX, Props, State', moduleSlug: 'react', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'hooks', title: 'Hooks Deep Dive — useState, useEffect, Custom Hooks', moduleSlug: 'react', duration: 75, difficulty: 'Beginner', phase: 'Foundation', xp: 200 }),
  makeLesson({ slug: 'component-patterns', title: 'Component Patterns — Composition, Compound, HOC', moduleSlug: 'react', duration: 70, difficulty: 'Intermediate', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'react-router', title: 'React Router v6 — Nested Routes, Loaders, Actions', moduleSlug: 'react', duration: 65, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150 }),
  makeLesson({ slug: 'state-management', title: 'State Management — Context, Zustand, Jotai', moduleSlug: 'react', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'tanstack-query', title: 'TanStack Query — useQuery, useMutation, Cache', moduleSlug: 'react', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'forms', title: 'Forms — React Hook Form + Zod Validation', moduleSlug: 'react', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150 }),
  makeLesson({ slug: 'styling', title: 'Styling — Tailwind CSS, shadcn/ui, CVA', moduleSlug: 'react', duration: 60, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150 }),
  makeLesson({ slug: 'api-integration', title: 'API Integration — Axios, Interceptors, Auth Refresh', moduleSlug: 'react', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'websocket-client', title: 'WebSocket Client — useWebSocket Hook, Reconnection', moduleSlug: 'react', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'performance', title: 'Performance — Profiler, Memo, Virtualization', moduleSlug: 'react', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'testing', title: 'Testing — Vitest, Testing Library, MSW', moduleSlug: 'react', duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'auth-flows', title: 'Auth Flows — JWT, Protected Routes, Refresh', moduleSlug: 'react', duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200 }),
  makeLesson({ slug: 'file-upload-ui', title: 'File Upload UI — Drag-drop, Progress, S3 Presigned', moduleSlug: 'react', duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 150 }),
  makeLesson({ slug: 'realtime-dashboard', title: 'Real-time Dashboard — WebSocket + Charts', moduleSlug: 'react', duration: 80, difficulty: 'Advanced', phase: 'Real-World', xp: 250 }),
  makeLesson({ slug: 'deployment', title: 'Deployment — Vite Build, Nginx, Docker, CI/CD', moduleSlug: 'react', duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200 }),
];

// ============ POSTGRESQL MODULE (L1-L15) ============
export const postgresqlLessons: Lesson[] = [
  makeLesson({ slug: 'sql-fundamentals', title: 'SQL Fundamentals — SELECT, INSERT, UPDATE, DELETE', moduleSlug: 'postgresql', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'joins', title: 'JOINs — INNER, LEFT, RIGHT, FULL, Self-joins', moduleSlug: 'postgresql', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'aggregations', title: 'Aggregations — GROUP BY, HAVING, Window Functions', moduleSlug: 'postgresql', duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'indexes', title: 'Indexes — B-tree, GIN, BRIN, EXPLAIN ANALYZE', moduleSlug: 'postgresql', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'query-optimization', title: 'Query Optimization — N+1, Pagination, Denormalization', moduleSlug: 'postgresql', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'transactions', title: 'Transactions, MVCC, Isolation Levels, Deadlocks', moduleSlug: 'postgresql', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'jsonb-arrays', title: 'JSONB & Arrays — Store, Query, Index', moduleSlug: 'postgresql', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'full-text-search', title: 'Full-Text Search — tsvector, GIN, pg_trgm', moduleSlug: 'postgresql', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'partitioning', title: 'Table Partitioning — Range, List, Hash', moduleSlug: 'postgresql', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'alembic', title: 'Alembic Migrations — Autogenerate, Upgrade, Downgrade', moduleSlug: 'postgresql', duration: 70, difficulty: 'Intermediate', phase: 'Real-World', xp: 200 }),
  makeLesson({ slug: 'seeds-testing', title: 'Seeds & Test Databases — Fixtures, Factories', moduleSlug: 'postgresql', duration: 60, difficulty: 'Intermediate', phase: 'Real-World', xp: 150 }),
  makeLesson({ slug: 'pgbouncer', title: 'PgBouncer — Connection Pooling in Production', moduleSlug: 'postgresql', duration: 55, difficulty: 'Advanced', phase: 'Real-World', xp: 150 }),
  makeLesson({ slug: 'backup-recovery', title: 'Backup & Recovery — pg_dump, PITR, Replication', moduleSlug: 'postgresql', duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 200 }),
  makeLesson({ slug: 'security', title: 'Security — Roles, Grants, RLS, Encryption', moduleSlug: 'postgresql', duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150 }),
  makeLesson({ slug: 'monitoring', title: 'Monitoring — pg_stat, slow queries, vacuum', moduleSlug: 'postgresql', duration: 55, difficulty: 'Advanced', phase: 'Real-World', xp: 150 }),
];

// ============ DOCKER MODULE (L1-L15) ============
export const dockerLessons: Lesson[] = [
  makeLesson({ slug: 'docker-fundamentals', title: 'Docker Fundamentals — Images, Containers, Run', moduleSlug: 'docker', duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'dockerfile', title: 'Dockerfile Best Practices — Layers, Cache, Size', moduleSlug: 'docker', duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 200 }),
  makeLesson({ slug: 'multi-stage', title: 'Multi-Stage Builds — Builder + Runtime', moduleSlug: 'docker', duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'compose', title: 'Docker Compose — Multi-service Local Dev', moduleSlug: 'docker', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'networking', title: 'Networking — Bridge, Host, Custom Networks', moduleSlug: 'docker', duration: 60, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150 }),
  makeLesson({ slug: 'volumes', title: 'Volumes & Bind Mounts — Persistent Data', moduleSlug: 'docker', duration: 55, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150 }),
  makeLesson({ slug: 'nginx', title: 'Nginx — Reverse Proxy, SSL, Load Balancing', moduleSlug: 'docker', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'github-actions', title: 'GitHub Actions CI/CD — Test, Build, Push, Deploy', moduleSlug: 'docker', duration: 80, difficulty: 'Intermediate', phase: 'Intermediate', xp: 250 }),
  makeLesson({ slug: 'registry', title: 'Container Registry — GHCR, ECR, Tagging Strategy', moduleSlug: 'docker', duration: 55, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150 }),
  makeLesson({ slug: 'k8s-basics', title: 'Kubernetes Basics — Pods, Services, Deployments', moduleSlug: 'docker', duration: 85, difficulty: 'Advanced', phase: 'Advanced', xp: 300 }),
  makeLesson({ slug: 'k8s-config', title: 'K8s ConfigMaps, Secrets, Volumes', moduleSlug: 'docker', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'k8s-ingress', title: 'K8s Ingress, Helm, Autoscaling', moduleSlug: 'docker', duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 250 }),
  makeLesson({ slug: 'docker-security', title: 'Docker Security — Scanning, Non-root, Distroless', moduleSlug: 'docker', duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150 }),
  makeLesson({ slug: 'monitoring', title: 'Monitoring — Prometheus, Grafana, Logging', moduleSlug: 'docker', duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200 }),
  makeLesson({ slug: 'gitops', title: 'GitOps — ArgoCD, Flux, Declarative Deploy', moduleSlug: 'docker', duration: 75, difficulty: 'Advanced', phase: 'Real-World', xp: 250 }),
];

// ============ ML MODULE (L1-L15) ============
export const mlLessons: Lesson[] = [
  makeLesson({ slug: 'project-structure', title: 'ML Project Structure, DVC, MLflow', moduleSlug: 'ml', duration: 70, difficulty: 'Intermediate', phase: 'Foundation', xp: 200 }),
  makeLesson({ slug: 'data-pipeline', title: 'Data Pipeline — Load, Clean, Feature Engineering', moduleSlug: 'ml', duration: 75, difficulty: 'Intermediate', phase: 'Foundation', xp: 200 }),
  makeLesson({ slug: 'experiment-tracking', title: 'Experiment Tracking — MLflow, W&B', moduleSlug: 'ml', duration: 65, difficulty: 'Intermediate', phase: 'Foundation', xp: 150 }),
  makeLesson({ slug: 'pytorch-dataset', title: 'PyTorch Dataset & DataLoader', moduleSlug: 'ml', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'pytorch-model', title: 'PyTorch Model — nn.Module, Layers, Forward', moduleSlug: 'ml', duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'training-loop', title: 'Training Loop — Optimizer, Loss, Checkpoints', moduleSlug: 'ml', duration: 80, difficulty: 'Intermediate', phase: 'Intermediate', xp: 250 }),
  makeLesson({ slug: 'evaluation', title: 'Evaluation — Confusion Matrix, ROC, Calibration', moduleSlug: 'ml', duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200 }),
  makeLesson({ slug: 'ab-testing', title: 'A/B Testing Models — Statistical Significance', moduleSlug: 'ml', duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'onnx-export', title: 'ONNX Export — PyTorch/TF to ONNX Runtime', moduleSlug: 'ml', duration: 60, difficulty: 'Advanced', phase: 'Advanced', xp: 150 }),
  makeLesson({ slug: 'fastapi-serving', title: 'FastAPI Model Serving — Batch, Async, GPU', moduleSlug: 'ml', duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250 }),
  makeLesson({ slug: 'model-registry', title: 'Model Registry — Versioning, Rollback, Canary', moduleSlug: 'ml', duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200 }),
  makeLesson({ slug: 'mlops-pipeline', title: 'MLOps Pipeline — GitHub Actions Training', moduleSlug: 'ml', duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250 }),
  makeLesson({ slug: 'data-drift', title: 'Data Drift Detection — Monitor, Alert, Retrain', moduleSlug: 'ml', duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 200 }),
  makeLesson({ slug: 'distributed-training', title: 'Distributed Training — DDP, Multi-GPU', moduleSlug: 'ml', duration: 75, difficulty: 'Expert', phase: 'Real-World', xp: 250 }),
  makeLesson({ slug: 'production-checklist', title: 'Production ML Checklist — 50-point Audit', moduleSlug: 'ml', duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150 }),
];
