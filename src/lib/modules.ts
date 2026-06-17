import { Module } from './types';

export const modules: Module[] = [
  {
    slug: 'python',
    title: 'Python Mastery',
    icon: '🐍',
    color: '#3776AB',
    gradient: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
    description: 'From zero to senior Python engineer. 21 lessons covering fundamentals to production packaging.',
    totalLessons: 21,
    estimatedHours: 35,
    capstoneProject: {
      title: 'Production CLI Task Manager',
      description: 'Build a pip-installable CLI app with SQLite, Click, Rich, tests, and CI/CD.',
      architecture: 'CLI → Service → SQLite (SQLAlchemy) → JSON export',
      features: ['CRUD tasks', 'Priority levels', 'Tags', 'Search', 'Export JSON/CSV', 'Rich UI'],
      techStack: ['Python 3.12', 'Click', 'SQLAlchemy', 'Rich', 'pytest', 'GitHub Actions'],
      rubric: [
        { criterion: 'All CLI commands work', weight: 30 },
        { criterion: 'Tests pass (90%+ coverage)', weight: 25 },
        { criterion: 'Proper packaging (pip install -e .)', weight: 20 },
        { criterion: 'Code quality (ruff, mypy)', weight: 15 },
        { criterion: 'Documentation', weight: 10 },
      ],
    },
  },
  {
    slug: 'fastapi',
    title: 'FastAPI — Production APIs',
    icon: '⚡',
    color: '#009688',
    gradient: 'linear-gradient(135deg, #009688 0%, #FFC107 100%)',
    description: 'Build production-grade REST APIs. 20 lessons from first route to ML serving.',
    totalLessons: 20,
    estimatedHours: 40,
    capstoneProject: {
      title: 'Production Blog API',
      description: 'Full blog API: auth, posts, comments, Redis cache, Celery, Docker, CI/CD.',
      architecture: 'Nginx → FastAPI → PostgreSQL + Redis + Celery',
      features: ['JWT auth', 'CRUD posts', 'Comments', 'Redis cache', 'Rate limiting', 'WebSocket notifications'],
      techStack: ['FastAPI', 'SQLAlchemy 2.0', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
      rubric: [
        { criterion: 'All endpoints work', weight: 25 },
        { criterion: 'Auth + permissions', weight: 20 },
        { criterion: 'Tests (95%+ coverage)', weight: 20 },
        { criterion: 'Docker deployment', weight: 15 },
        { criterion: 'CI/CD pipeline', weight: 10 },
        { criterion: 'Monitoring (Prometheus)', weight: 10 },
      ],
    },
  },
  {
    slug: 'react',
    title: 'React + TypeScript',
    icon: '⚛️',
    color: '#61DAFB',
    gradient: 'linear-gradient(135deg, #61DAFB 0%, #3178C6 100%)',
    description: 'Modern React 19 with TypeScript. 18 lessons from Vite setup to deployment.',
    totalLessons: 18,
    estimatedHours: 30,
    capstoneProject: {
      title: 'Real-time Dashboard',
      description: 'WebSocket + TanStack Query dashboard with charts, auth, and Docker deployment.',
      architecture: 'React SPA → FastAPI WebSocket → Charts',
      features: ['Auth flow', 'Real-time updates', 'Charts (Recharts)', 'Dark mode', 'Responsive'],
      techStack: ['React 19', 'TypeScript', 'Vite', 'TanStack Query', 'Tailwind', 'shadcn/ui'],
      rubric: [
        { criterion: 'All pages work', weight: 25 },
        { criterion: 'TypeScript strict', weight: 20 },
        { criterion: 'Tests (Vitest + Testing Library)', weight: 20 },
        { criterion: 'Performance (Lighthouse 90+)', weight: 15 },
        { criterion: 'Docker deployment', weight: 10 },
        { criterion: 'CI/CD', weight: 10 },
      ],
    },
  },
  {
    slug: 'postgresql',
    title: 'PostgreSQL & Databases',
    icon: '🗄️',
    color: '#336791',
    gradient: 'linear-gradient(135deg, #336791 0%, #4EC5F1 100%)',
    description: 'Master PostgreSQL. 15 lessons from SQL basics to partitioning and PgBouncer.',
    totalLessons: 15,
    estimatedHours: 25,
  },
  {
    slug: 'docker',
    title: 'Docker & DevOps',
    icon: '🐳',
    color: '#2496ED',
    gradient: 'linear-gradient(135deg, #2496ED 0%, #0DB7ED 100%)',
    description: 'Containerize everything. 15 lessons from Docker basics to Kubernetes.',
    totalLessons: 15,
    estimatedHours: 25,
  },
  {
    slug: 'ml',
    title: 'ML Engineering',
    icon: '🧠',
    color: '#FF6F00',
    gradient: 'linear-gradient(135deg, #FF6F00 0%, #FFC107 100%)',
    description: 'Connect ML to backend. 15 lessons from PyTorch training to MLOps.',
    totalLessons: 15,
    estimatedHours: 30,
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find(m => m.slug === slug);
}

export function getModuleIndex(slug: string): number {
  return modules.findIndex(m => m.slug === slug);
}
