import { Lesson } from '../../types';

export const pythonL1: Lesson = {
  slug: 'pyenv-setup',
  title: 'pyenv, uv, venv, pyproject.toml',
  subtitle: 'Set up Python like a senior engineer — pyenv, uv, project structure',
  duration: 60,
  difficulty: 'Beginner',
  phase: 'Foundation',
  xp: 100,
  moduleSlug: 'python',

  objectives: [
    'Install and manage multiple Python versions with pyenv',
    'Create isolated virtual environments with uv (10x faster than venv)',
    'Configure a project with pyproject.toml (modern standard)',
    'Set up the src/ layout that production Python packages use',
    'Install your package in editable mode for development',
  ],
  realWorldContext: 'At companies like Instagram, Dropbox, and Reddit, every Python project uses isolated environments and pyproject.toml. Without this setup, you would have dependency conflicts between projects and could not reproduce builds. This lesson teaches the exact workflow senior engineers use on day one of a new project.',
  prerequisites: [
    'A terminal (Terminal on macOS, WSL on Windows, or any terminal on Linux)',
    'Basic command line familiarity (cd, ls, mkdir)',
    'No prior Python experience needed — we start from zero',
  ],

  conceptDiagram: `┌──────────────────────────────────────────────────────┐
│                   YOUR MACHINE                        │
│                                                       │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │  pyenv          │  │  uv (or pip)    │            │
│  │  Manages Python │  │  Installs       │            │
│  │  versions:      │  │  packages       │            │
│  │  3.10, 3.11,    │  │  per-project    │            │
│  │  3.12, 3.13     │  │                 │            │
│  └────────┬────────┘  └────────┬────────┘            │
│           │                    │                      │
│           ▼                    ▼                      │
│  ┌─────────────────────────────────────────┐         │
│  │  PROJECT: myapp/                        │         │
│  │  ├── .python-version  ← pyenv uses this │         │
│  │  ├── .venv/           ← isolated deps   │         │
│  │  ├── pyproject.toml   ← project config  │         │
│  │  ├── src/myapp/       ← src layout      │         │
│  │  │   ├── __init__.py                    │         │
│  │  │   └── main.py                        │         │
│  │  └── tests/                             │         │
│  └─────────────────────────────────────────┘         │
└──────────────────────────────────────────────────────┘

WHY ISOLATE?
- Project A needs Django 4, Project B needs Django 5
- System Python is owned by OS — never touch it
- Reproducible builds (same deps on every machine)`,
  conceptExplanation: [
    'Python environments have three layers: (1) pyenv manages which Python version (3.10, 3.12, etc.) is installed on your machine — it does NOT touch system Python, (2) venv (or uv) creates an isolated bubble per project where packages install without affecting anything else, (3) pyproject.toml is the single config file that declares dependencies, build settings, and tool configuration.',
    'The src/ layout (src/myapp/ instead of just myapp/) forces you to install your package before importing it. This catches packaging bugs early — if your imports work only from the project root but not after pip install, you have a broken package. Every serious Python project (Django, Flask, FastAPI, requests, etc.) uses src/ layout.',
    'uv is a modern package manager written in Rust by Astral. It is 10-100x faster than pip because it downloads and installs in parallel, uses a global cache (packages install once, hardlinked everywhere), and resolves dependencies faster. Use uv instead of pip for all new projects.',
  ],
  whyItMatters: 'In production, your code runs in a Docker container with EXACTLY the dependencies listed in pyproject.toml. If you develop with different versions locally, you will have "works on my machine" bugs that are impossible to reproduce. The src/ layout ensures your package is properly installable — critical when deploying to production or publishing to PyPI.',

  codeExamples: [
    {
      filename: 'pyproject.toml',
      language: 'toml',
      approach: 'minimal',
      code: `[project]
name = "myapp"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["httpx"]`,
      explanation: 'The absolute minimum. Name, version, Python requirement, and one dependency. This is enough for pip install -e . to work.',
    },
    {
      filename: 'pyproject.toml',
      language: 'toml',
      approach: 'real-world',
      code: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "myapp"
version = "0.1.0"
description = "My awesome application"
readme = "README.md"
requires-python = ">=3.12"
license = {text = "MIT"}
authors = [{name = "You", email = "you@example.com"}]
dependencies = [
    "httpx>=0.27,<1.0",
    "rich>=13.7",
]

[project.optional-dependencies]
dev = ["pytest>=8.0", "ruff>=0.5", "mypy>=1.10"]

[project.scripts]
myapp = "myapp.cli:main"

[tool.hatch.build.targets.wheel]
packages = ["src/myapp"]`,
      explanation: 'Real-world config: build system (hatchling), metadata (description, license, authors), pinned dependencies with version ranges, optional dev dependencies, CLI entry point (creates myapp command after install), and src/ layout configuration.',
    },
    {
      filename: 'pyproject.toml',
      language: 'toml',
      approach: 'production',
      code: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "myapp"
version = "0.1.0"
description = "Production-grade application"
readme = "README.md"
requires-python = ">=3.12"
license = {text = "MIT"}
authors = [{name = "You", email = "you@example.com"}]
keywords = ["api", "cli", "tools"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Programming Language :: Python :: 3.12",
    "License :: OSI Approved :: MIT License",
]
dependencies = [
    "httpx>=0.27,<1.0",
    "rich>=13.7",
    "pydantic>=2.6",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0",
    "pytest-cov>=5.0",
    "ruff>=0.5",
    "mypy>=1.10",
    "pre-commit>=3.7",
]

[project.scripts]
myapp = "myapp.cli:main"

[project.urls]
Homepage = "https://github.com/you/myapp"
Repository = "https://github.com/you/myapp"

[tool.hatch.build.targets.wheel]
packages = ["src/myapp"]

[tool.ruff]
line-length = 100
target-version = "py312"

[tool.ruff.lint]
select = ["E", "W", "F", "I", "B", "C4", "UP", "RUF"]

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v --cov=myapp --cov-report=term-missing"

[tool.mypy]
strict = true`,
      explanation: 'Production config: classifiers for PyPI, full dev dependencies, URLs for PyPI page, ruff/pytest/mypy configuration. This is what published open-source packages use.',
    },
  ],

  configFiles: [
    {
      filename: '.python-version',
      language: 'text',
      content: '3.12.0',
      comment: 'Created by pyenv local 3.12.0. pyenv reads this file and automatically uses this Python version.',
    },
    {
      filename: '.gitignore',
      language: 'text',
      content: `.venv/
__pycache__/
*.pyc
.pytest_cache/
.mypy_cache/
.ruff_cache/
*.egg-info/
dist/
build/
.env`,
      comment: 'Copy this exactly. Prevents committing virtual envs, caches, and secrets.',
    },
    {
      filename: '.env.example',
      language: 'bash',
      content: `# Copy to .env and fill in real values
SECRET_KEY=change-me-in-production
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp
DEBUG=true`,
      comment: 'Commit .env.example (template), NEVER commit .env (real secrets).',
    },
  ],

  lab: {
    title: 'Set Up Your Python Development Environment',
    steps: [
      {
        step: 1,
        title: 'Install pyenv',
        instruction: 'Install pyenv to manage multiple Python versions.',
        command: 'curl https://pyenv.run | bash',
        expectedOutput: 'Cloning into pyenv...',
        verification: 'Run `pyenv --version` — should show version number',
        hint: 'After install, add the export lines to your ~/.bashrc',
      },
      {
        step: 2,
        title: 'Install Python 3.12',
        instruction: 'Install Python 3.12 using pyenv',
        command: 'pyenv install 3.12.0',
        expectedOutput: 'Installing Python-3.12.0...',
        verification: 'Run `python --version` — should show Python 3.12.0',
      },
      {
        step: 3,
        title: 'Create project directory',
        instruction: 'Create your project and set the local Python version',
        command: 'mkdir myapp && cd myapp && pyenv local 3.12.0',
        expectedOutput: '(creates .python-version file)',
        verification: 'Run `cat .python-version` — should show 3.12.0',
      },
      {
        step: 4,
        title: 'Create virtual environment with uv',
        instruction: 'Install uv and create virtual environment',
        command: 'uv venv && source .venv/bin/activate',
        expectedOutput: 'Creating virtualenv at: .venv',
        verification: 'Run `which python` — should show .venv/bin/python',
        hint: 'If uv not found, install: curl -LsSf https://astral.sh/uv/install.sh | sh',
      },
      {
        step: 5,
        title: 'Create project structure',
        instruction: 'Create src/ layout and install in editable mode',
        command: 'mkdir -p src/myapp tests && touch src/myapp/__init__.py',
        expectedOutput: '(creates directories and files)',
        verification: 'Run `ls src/myapp/` — should show __init__.py',
      },
    ],
  },

  commonErrors: [
    {
      error: 'pyenv: command not found',
      fix: 'Add to ~/.bashrc: export PATH="$HOME/.pyenv/bin:$PATH" then source ~/.bashrc',
      rootCause: 'pyenv is installed but not in your PATH.',
    },
    {
      error: 'python: command not found (after pyenv install)',
      fix: 'Run `pyenv global 3.12.0` to set the default Python version',
      rootCause: 'pyenv installed Python but did not set it as default.',
    },
    {
      error: 'externally-managed-environment error when pip install',
      fix: 'NEVER use sudo with pip. Always create a venv first: `uv venv && source .venv/bin/activate`',
      rootCause: 'Modern Linux/macOS prevent installing to system Python (breaks OS tools).',
    },
    {
      error: 'pip install -e . fails with "No module named build"',
      fix: 'Install build tools: `uv pip install build` then `python -m build`',
      rootCause: 'Missing build backend specified in [build-system].',
    },
    {
      error: 'Command not found after pip install -e .',
      fix: 'Add [project.scripts] to pyproject.toml: myapp = "myapp.cli:main"',
      rootCause: 'CLI entry point not declared in pyproject.toml.',
    },
  ],

  quiz: [
    {
      question: 'Why use pyenv instead of system Python?',
      options: [
        'It is faster',
        'Install multiple Python versions without touching system Python',
        'Required by Python',
        'Uses less memory',
      ],
      correctIndex: 1,
      explanation: 'System Python is owned by the OS. pyenv installs Python in your home directory, isolated from system.',
    },
    {
      question: 'What does `pyenv local 3.12.0` do?',
      options: [
        'Installs Python 3.12.0',
        'Creates a .python-version file so this directory always uses 3.12.0',
        'Sets 3.12.0 globally',
        'Uninstalls other versions',
      ],
      correctIndex: 1,
      explanation: 'Creates .python-version file. When you cd into this directory, pyenv automatically uses that version.',
    },
    {
      question: 'Why use src/ layout (src/myapp/) instead of just myapp/?',
      options: [
        'It is required by Python',
        'Forces you to install the package before importing, catching packaging bugs early',
        'Makes code faster',
        'Just a convention with no benefit',
      ],
      correctIndex: 1,
      explanation: 'Without src/ layout, you can accidentally import from cwd. src/ layout forces proper install.',
    },
    {
      question: 'What is the modern replacement for setup.py + requirements.txt?',
      options: ['Pipfile', 'pyproject.toml', 'poetry.lock', 'environment.yml'],
      correctIndex: 1,
      explanation: 'pyproject.toml is the PEP 517/518/621 standard.',
    },
    {
      question: 'Why is uv faster than pip?',
      options: [
        'Written in C',
        'Written in Rust, parallel downloads, global cache with hardlinks',
        'Uses less memory',
        'Not actually faster',
      ],
      correctIndex: 1,
      explanation: 'uv by Astral is written in Rust. Parallel downloads, global cache, 10-100x faster than pip.',
    },
  ],

  resources: [
    { title: 'pyenv Documentation', url: 'https://github.com/pyenv/pyenv', type: 'docs' },
    { title: 'uv Documentation', url: 'https://docs.astral.sh/uv/', type: 'docs', isHiddenGem: true },
    { title: 'pyproject.toml Guide', url: 'https://packaging.python.org/en/latest/guides/writing-pyproject-toml/', type: 'docs' },
    { title: 'Hatch (build backend)', url: 'https://hatch.pypa.io/', type: 'tool' },
  ],
  whatToReadNext: 'Read "Python Packaging User Guide" by PyPA — goes deeper into build systems, wheel vs sdist, and publishing to PyPI.',
};
