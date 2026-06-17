import { Module } from '../types';

export const pythonModule: Module = {
  id: 'python',
  title: 'Python Mastery — Industrial Grade',
  icon: '🐍',
  color: '#3776AB',
  gradient: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
  description: 'Master Python the way Google engineers use it. 30 lessons across 4 phases — every fundamental drilled with multiple examples, real configurations, project setups, and trade-offs. By the end, you can build applications like z.ai.',
  level: 'All Levels',
  learningPath: {
    title: 'Python Engineer Path — Zero to Industrial',
    description: 'This is not a tutorial. This is a structured path that takes you from never-written-Python to building production applications. Every concept is taught 3+ ways with real configurations and trade-offs. Skip nothing.',
    phases: [
      {
        name: 'Foundation',
        description: 'Master EVERY fundamental — strings, numbers, lists, dicts, sets, control flow, functions. No skipping.',
        outcomes: [
          'Install Python 3.12+ with pyenv, set up virtual environments like a pro',
          'Know every string method, formatting option, and when to use each',
          'Understand list vs tuple vs dict vs set at a memory and performance level',
          'Write functions with proper type hints, *args, **kwargs, defaults',
          'Read and write files with pathlib, handle JSON/CSV/YAML/TOML',
          'Handle errors like a Python engineer, not like a beginner',
        ],
      },
      {
        name: 'Intermediate',
        description: 'OOP, decorators, generators, context managers, type hints — the Python engineer toolkit.',
        outcomes: [
          'Design classes with inheritance, composition, magic methods, properties',
          'Write decorators (including parametrized and class-based)',
          'Build generators and async generators for memory-efficient pipelines',
          'Implement context managers (class-based and @contextmanager)',
          'Add type hints everywhere and run mypy in CI',
          'Master collections, functools, itertools — the standard library power tools',
        ],
      },
      {
        name: 'Advanced',
        description: 'Async, multiprocessing, metaclasses, performance — what senior engineers know.',
        outcomes: [
          'Build async applications with asyncio, aiohttp, asyncpg',
          'Use multiprocessing for CPU-bound work, threading for I/O',
          'Understand GIL, memory model, garbage collection',
          'Profile and optimize hot paths (cProfile, memory_profiler, py-spy)',
          'Write metaclasses, descriptors, and use them sparingly',
          'Apply design patterns (Factory, Strategy, Observer, Singleton) in Python',
        ],
      },
      {
        name: 'Real-World',
        description: 'Build actual applications — CLIs, scrapers, API clients, databases, packaging.',
        outcomes: [
          'Build CLI apps with Click/Typer — subcommands, options, autocomplete',
          'Scrape websites with requests + BeautifulSoup, handle JS with Playwright',
          'Build API clients with httpx (sync + async), handle retries, auth',
          'Integrate PostgreSQL with SQLAlchemy 2.0 async, write migrations',
          'Package your code with pyproject.toml, publish to PyPI',
          'Write tests with pytest, set up CI with GitHub Actions, deploy with Docker',
        ],
      },
    ],
  },
  capstoneProject: {
    title: 'Production CLI Task Manager with Cloud Sync',
    description: 'Build a real, publishable CLI app: SQLite + PostgreSQL sync, Click CLI, Rich output, full test suite, packaged for pip install, deployed via Docker.',
    architecture: `┌──────────────────────────────────────────────────────────────┐
│                    User Terminal                              │
└────────────────────────┬─────────────────────────────────────┘
                         │ task add/list/done/sync/export
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  Click CLI Layer (cli.py)                                    │
│  • Subcommands: add, list, done, delete, sync, export, search│
│  • Rich-formatted tables, colors, progress bars              │
│  • Autocomplete support                                       │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  Service Layer (services.py)                                 │
│  • Business logic, validation, domain exceptions             │
│  • Coordinates local DB + remote sync + export               │
└──────┬──────────────────────────────────────────┬───────────┘
       │                                          │
       ▼                                          ▼
┌──────────────┐                       ┌────────────────────┐
│ Local SQLite │◄────── sync ─────────►│ Remote PostgreSQL  │
│ (SQLAlchemy) │       (httpx)         │ (async SQLAlchemy) │
└──────────────┘                       └────────────────────┘
       │                                          │
       ▼                                          ▼
┌──────────────┐                       ┌────────────────────┐
│ JSON Export  │                       │ Audit log table    │
│ CSV Export   │                       │ (every change)     │
└──────────────┘                       └────────────────────┘

Files:
taskmanager/
├── pyproject.toml         # Packaging, deps, CLI entry point
├── README.md
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── src/taskmanager/
│   ├── __init__.py
│   ├── cli.py             # Click commands
│   ├── models.py          # SQLAlchemy models
│   ├── database.py        # Engine, session, async engine
│   ├── services.py        # Business logic
│   ├── sync.py            # Remote sync via httpx
│   ├── exporters.py       # JSON/CSV export
│   ├── config.py          # pydantic-settings
│   └── exceptions.py      # Domain exceptions
├── tests/
│   ├── conftest.py
│   ├── test_services.py
│   ├── test_cli.py
│   └── test_sync.py
└── .github/workflows/
    └── ci.yml             # Lint, test, build, publish`,
    features: [
      'Add, list, complete, delete tasks with priorities and due dates',
      'Tags with many-to-many relationship',
      'Search by keyword, filter by status/priority/tag',
      'Local SQLite for offline work',
      'Sync to remote PostgreSQL (conflict resolution)',
      'Export to JSON, CSV, Markdown',
      'Import from JSON',
      'Rich-formatted terminal output (tables, colors, progress)',
      'Shell autocomplete (bash, zsh, fish)',
      'Full audit log of every change',
      'Config via .env file or CLI flags',
      'Docker distribution',
    ],
    techStack: [
      'Python 3.12+',
      'Click 8.x (CLI)',
      'SQLAlchemy 2.0 async (ORM)',
      'SQLite (local) + PostgreSQL (remote)',
      'httpx (sync + async HTTP)',
      'Rich (terminal formatting)',
      'pydantic-settings (config)',
      'pytest (testing)',
      'ruff + mypy (linting + types)',
      'Docker (deployment)',
      'GitHub Actions (CI/CD)',
    ],
    estTime: '15-20 hours',
    difficulty: 'Advanced',
  },
  lessons: [
    // ============================================================
    // PHASE 1: FOUNDATION — Master every fundamental
    // ============================================================
    {
      id: 'py-01',
      title: 'Installation, pyenv, Virtual Environments & Project Structure',
      subtitle: 'Set up Python like a senior engineer — pyenv, venv, uv, pyproject.toml',
      duration: 60,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Most beginners install Python once and use it for everything. Senior engineers install Python PER PROJECT, isolated, version-pinned, reproducible. This lesson teaches you the senior way.',
        'Three tools dominate Python environment management in 2024: (1) pyenv — manages multiple Python versions on your machine, (2) venv (built-in) or uv (10x faster) — creates isolated environments per project, (3) pyproject.toml — the modern standard for project metadata, dependencies, and tool config.',
        'Why not just use system Python? Three reasons: (1) Different projects need different Python versions — your OS might ship 3.10, your ML project needs 3.12. (2) Different projects need different package versions — project A needs Django 4, project B needs Django 5. (3) System Python is owned by root — installing packages there breaks OS tools that depend on it (ask anyone who broke macOS by sudo pip install).',
        'The senior workflow: 1) Install pyenv, install Python 3.12, 2) Create project dir, 3) Create venv with `uv venv` (or `python -m venv .venv`), 4) Activate it, 5) Create pyproject.toml with dependencies, 6) Install with `uv pip install -e .` (editable), 7) Add .venv/ to .gitignore. Every command after this runs in the isolated env.',
      ],
      setup: {
        title: 'Set Up Python Like a Senior Engineer',
        os: 'all',
        steps: [
          {
            description: 'Install pyenv to manage multiple Python versions',
            command: '# macOS\nbrew install pyenv\n\n# Linux (Ubuntu/Debian)\nsudo apt update\nsudo apt install -y make build-essential libssl-dev zlib1g-dev \\\n  libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \\\n  libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev \\\n  libffi-dev liblzma-dev\ncurl https://pyenv.run | bash\n\n# Add to ~/.bashrc or ~/.zshrc:\nexport PATH="$HOME/.pyenv/bin:$PATH"\neval "$(pyenv init --path)"\neval "$(pyenv init -)"',
            expectedOutput: '$ pyenv --version\npyenv 2.3.0',
          },
          {
            description: 'Install Python 3.12 (does not affect system Python)',
            command: 'pyenv install 3.12.0\npyenv install 3.11.6  # also install 3.11 for testing\npyenv global 3.12.0\npython --version  # Python 3.12.0',
          },
          {
            description: 'Install uv — 10x faster pip alternative by Astral',
            command: '# macOS / Linux\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Windows\npowershell -c "irm https://astral.sh/uv/install.ps1 | iex"\n\n# Verify\nuv --version  # uv 0.4.0',
          },
          {
            description: 'Create your first project with proper structure',
            command: 'mkdir myproject && cd myproject\n\n# Set local Python version for this project\npyenv local 3.12.0  # creates .python-version file\n\n# Create virtual environment (uv is 10x faster than venv)\nuv venv\n# OR classic: python -m venv .venv\n\n# Activate\nsource .venv/bin/activate  # Linux/macOS\n# .venv\\Scripts\\activate    # Windows\n\n# Verify\nwhich python  # /path/to/myproject/.venv/bin/python\npython --version  # Python 3.12.0',
          },
          {
            description: 'Create pyproject.toml — modern project config',
            command: 'cat > pyproject.toml << \'EOF\'\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "myproject"\nversion = "0.1.0"\ndescription = "My awesome project"\nreadme = "README.md"\nrequires-python = ">=3.12"\nlicense = {text = "MIT"}\nauthors = [{name = "You", email = "you@example.com"}]\ndependencies = [\n    "httpx>=0.27",\n    "rich>=13.0",\n]\n\n[project.optional-dependencies]\ndev = [\n    "pytest>=8.0",\n    "ruff>=0.5",\n    "mypy>=1.10",\n]\n\n[project.scripts]\nmyproject = "myproject.cli:main"\n\n[tool.ruff]\nline-length = 100\ntarget-version = "py312"\n\n[tool.pytest.ini_options]\ntestpaths = ["tests"]\naddopts = "-v --cov=myproject"\n\n[tool.mypy]\nstrict = true\nEOF\n\n# Install in editable mode (changes reflect immediately)\nuv pip install -e ".[dev]"',
          },
          {
            description: 'Create .gitignore and project structure',
            command: 'cat > .gitignore << \'EOF\'\n.venv/\n__pycache__/\n*.pyc\n.pytest_cache/\n.mypy_cache/\n.ruff_cache/\n*.egg-info/\ndist/\nbuild/\n.env\nEOF\n\nmkdir -p src/myproject tests\ntouch src/myproject/__init__.py tests/__init__.py\necho "# My Project" > README.md\n\necho \'def main():\n    print("Hello from myproject")\n\nif __name__ == "__main__":\n    main()\' > src/myproject/cli.py\n\n# Test it\nmyproject  # Hello from myproject',
          },
        ],
        verification: 'Run `which python` — should show your .venv path, not system. Run `myproject` — should print "Hello from myproject". Run `pytest` — should run (even with no tests).',
        troubleshooting: [
          {
            problem: 'pyenv: command not found after install',
            solution: 'Add the three export lines to your ~/.bashrc (or ~/.zshrc on macOS), then `source ~/.bashrc`. Log out and back in if needed.',
          },
          {
            problem: 'python --version shows old version after pyenv install',
            solution: 'Run `pyenv global 3.12.0`. If that does not work, run `pyenv rehash`. Check `pyenv versions` to see installed.',
          },
          {
            problem: 'pip install is slow',
            solution: 'Switch to uv: `uv pip install <package>` is 10-100x faster. Or use `pip install --user pip && pip install uv`.',
          },
          {
            problem: '"externally-managed-environment" error on macOS/Linux',
            solution: 'NEVER use sudo with pip. Always create a venv first: `python -m venv .venv && source .venv/bin/activate`. Then pip install works.',
          },
          {
            problem: 'Command not found after pip install -e .',
            solution: 'Make sure your pyproject.toml has [project.scripts] with the entry point. Run `pip install -e .` again. Check `which <your-command>`.',
          },
        ],
      },
      visualization: {
        title: 'The Senior Python Project Structure',
        type: 'architecture',
        diagram: `myproject/                    ← project root
├── .python-version          ← pyenv: which Python to use
├── .gitignore               ← what to exclude from git
├── .env.example             ← template for env vars (commit this)
├── .env                     ← actual env vars (NEVER commit!)
├── pyproject.toml           ← project config (deps, tools, scripts)
├── uv.lock                  ← lockfile (commit for reproducibility)
├── README.md
├── LICENSE
├── src/                     ← src layout (prevents import bugs)
│   └── myproject/
│       ├── __init__.py
│       ├── __main__.py      ← enables: python -m myproject
│       ├── cli.py           ← entry point: myproject command
│       ├── core.py
│       └── utils.py
├── tests/                   ← mirror src structure
│   ├── __init__.py
│   ├── conftest.py          ← shared fixtures
│   ├── test_core.py
│   └── test_cli.py
├── .github/
│   └── workflows/
│       └── ci.yml           ← GitHub Actions
└── .venv/                   ← virtual env (gitignored!)

WHY src/ layout?
- Forces you to install package before importing
- Prevents accidental imports from cwd
- Matches how users will use your package
- Catches packaging bugs early`,
        legend: [
          '.python-version: pyenv uses this to pick Python version per project',
          'pyproject.toml: single source of truth — deps, tool config, entry points',
          'uv.lock: exact versions installed (like package-lock.json)',
          '.env: secrets (DB URLs, API keys). NEVER commit.',
          'src/ layout: prevents accidental imports from cwd during testing',
        ],
      },
      codeExamples: [
        {
          filename: 'pyproject.toml',
          language: 'toml',
          code: '# The modern Python project config — replaces setup.py, requirements.txt,\n# setup.cfg, and more. ONE file to rule them all.\n\n[build-system]\n# How to build the package. Hatchling is modern & fast.\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n# Alternatives: setuptools, flit, poetry-core, pdm-backend\n\n[project]\nname = "myproject"                    # pip install myproject\nversion = "0.1.0"                      # semver\ndescription = "A short description"\nreadme = "README.md"                   # included in PyPI page\nrequires-python = ">=3.12"             # set min Python version\nlicense = {text = "MIT"}               # or {file = "LICENSE"}\nauthors = [\n    {name = "Your Name", email = "you@example.com"}\n]\nkeywords = ["api", "cli", "tools"]     # PyPI search\nclassifiers = [                        # PyPI categories\n    "Development Status :: 4 - Beta",\n    "Programming Language :: Python :: 3",\n    "Programming Language :: Python :: 3.12",\n    "License :: OSI Approved :: MIT License",\n    "Operating System :: OS Independent",\n]\n\n# Runtime dependencies — pinned with lower bounds\ndependencies = [\n    "httpx>=0.27,<1.0",        # >= 0.27, < 1.0 (avoid breaking changes)\n    "rich>=13.7",              # >= 13.7 (no upper bound)\n    "pydantic>=2.6",\n    "click>=8.1",\n]\n\n# Optional dependencies — install with pip install myproject[dev]\n[project.optional-dependencies]\ndev = [\n    "pytest>=8.0",\n    "pytest-cov>=5.0",\n    "ruff>=0.5",\n    "mypy>=1.10",\n    "pre-commit>=3.7",\n]\ndocs = [\n    "mkdocs>=1.6",\n    "mkdocs-material>=9.5",\n]\n\n# CLI entry points — creates `myproject` command after install\n[project.scripts]\nmyproject = "myproject.cli:main"\nmyproject-admin = "myproject.admin:main"\n\n# GUI entry points (if needed)\n[project.gui-scripts]\nmyproject-gui = "myproject.gui:main"\n\n# URLs shown on PyPI page\n[project.urls]\nHomepage = "https://github.com/you/myproject"\nDocumentation = "https://myproject.readthedocs.io"\nRepository = "https://github.com/you/myproject"\nIssues = "https://github.com/you/myproject/issues"\n\n# Tell hatchling where the code is (src layout)\n[tool.hatch.build.targets.wheel]\npackages = ["src/myproject"]\n\n# === Tool configs in the same file ===\n\n[tool.ruff]\nline-length = 100\ntarget-version = "py312"\n\n[tool.ruff.lint]\nselect = [\n    "E",    # pycodestyle errors\n    "W",    # pycodestyle warnings\n    "F",    # pyflakes\n    "I",    # isort\n    "B",    # bugbear\n    "C4",   # comprehensions\n    "UP",   # pyupgrade\n    "RUF",  # ruff-specific\n]\nignore = ["E501"]  # line too long (handled by formatter)\n\n[tool.ruff.format]\nquote-style = "double"\nindent-style = "space"\n\n[tool.pytest.ini_options]\ntestpaths = ["tests"]\naddopts = "-v --cov=myproject --cov-report=term-missing --cov-report=html"\nmarkers = [\n    "slow: marks tests as slow (deselect with -m \'not slow\')",\n    "integration: marks tests as integration tests",\n]\n\n[tool.mypy]\nstrict = true\nwarn_return_any = true\nwarn_unused_configs = true\ndisallow_untyped_defs = true\n\n[tool.coverage.run]\nsource = ["src"]\nomit = ["tests/*"]\n\n[tool.coverage.report]\nexclude_lines = [\n    "pragma: no cover",\n    "if __name__ == .__main__.:",\n    "if TYPE_CHECKING:",\n    "raise NotImplementedError",\n]',
          explanation: 'pyproject.toml is the modern standard (PEP 517/518/621). It replaces setup.py, requirements.txt, setup.cfg, mypy.ini, .ruff.toml, pytest.ini, .coveragerc — all in one file. Master this.',
        },
        {
          filename: 'multiple_pythons.sh',
          language: 'bash',
          code: '# Senior engineers test their code on multiple Python versions\n# pyenv makes this trivial\n\n# Install multiple versions\npyenv install 3.10.13 3.11.6 3.12.0 3.13.0\n\n# Use specific version in a project\ncd ~/projects/legacy-app\npyenv local 3.10.13  # creates .python-version\ncd ~/projects/new-app\npyenv local 3.13.0\n\n# Each project automatically uses the right Python\npython --version  # changes based on which dir you are in!\n\n# Test on ALL versions with tox or nox\n# tox.ini:\n# [tox]\n# envlist = py310, py311, py312, py313\n#\n# [testenv]\n# deps = pytest\n# commands = pytest\n\n# Or with nox (noxfile.py):\n# import nox\n# @nox.session(python=["3.10", "3.11", "3.12", "3.13"])\n# def tests(session):\n#     session.install("pytest", ".")\n#     session.run("pytest")',
          explanation: 'pyenv lets you install and switch between multiple Python versions. Each project can pin its own version via .python-version file. Test on all supported versions with tox/nox in CI.'
        },
      ],
      exercises: [
        {
          prompt: 'Set up a new Python project called "weather-cli" with: pyenv local 3.12, uv venv, pyproject.toml (with httpx + rich deps), src/weather_cli/ structure, and a CLI entry point that prints "Weather CLI ready".',
          starterCode: '# Your shell commands\n',
          hint: 'Follow the setup steps above. The CLI entry point needs [project.scripts] and a function in src/weather_cli/cli.py.',
          solution: 'mkdir weather-cli && cd weather-cli\npyenv local 3.12.0\nuv venv\nsource .venv/bin/activate\n\nmkdir -p src/weather_cli tests\ntouch src/weather_cli/__init__.py tests/__init__.py\n\ncat > pyproject.toml << \'EOF\'\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "weather-cli"\nversion = "0.1.0"\nrequires-python = ">=3.12"\ndependencies = ["httpx>=0.27", "rich>=13.7"]\n\n[project.scripts]\nweather = "weather_cli.cli:main"\n\n[tool.hatch.build.targets.wheel]\npackages = ["src/weather_cli"]\nEOF\n\ncat > src/weather_cli/cli.py << \'EOF\'\ndef main():\n    print("Weather CLI ready")\n\nif __name__ == "__main__":\n    main()\nEOF\n\nuv pip install -e ".[dev]"\nweather  # Weather CLI ready',
          solutionLanguage: 'bash'
        },
      ],
      quiz: [
        {
          question: 'Why use a virtual environment per project?',
          options: [
            'It is faster',
            'Isolate dependencies — different projects can use different package versions without conflict',
            'Required by Python',
            'Uses less memory',
          ],
          correctIndex: 1,
          explanation: 'Without venv, all packages install to system Python. Project A needs Django 4, Project B needs Django 5 — conflict. venv isolates each project.'
        },
        {
          question: 'What does `pyenv local 3.12.0` do?',
          options: [
            'Installs Python 3.12.0',
            'Sets Python 3.12.0 as the version for THIS directory (creates .python-version file)',
            'Sets Python 3.12.0 globally',
            'Uninstalls other versions',
          ],
          correctIndex: 1,
          explanation: '`pyenv local X` creates a .python-version file. Whenever you cd into this dir, pyenv automatically uses that version. Different projects can use different versions.'
        },
        {
          question: 'What is the src/ layout and why use it?',
          options: [
            'It is required by Python',
            'Forces you to install the package before importing, catching packaging bugs early',
            'Makes code faster',
            'It is just a convention, no real benefit',
          ],
          correctIndex: 1,
          explanation: 'Without src/ layout, you can accidentally import from cwd (which works in dev but breaks for users). src/ layout forces proper install, catching packaging bugs immediately.'
        },
        {
          question: 'What is the modern replacement for setup.py + requirements.txt + setup.cfg?',
          options: ['Pipfile', 'pyproject.toml', 'poetry.lock', 'environment.yml'],
          correctIndex: 1,
          explanation: 'pyproject.toml is the PEP 517/518/621 standard. One file replaces setup.py, requirements.txt, setup.cfg, mypy.ini, pytest.ini, .coveragerc.'
        },
      ],
      keyTakeaways: [
        'Use pyenv to manage multiple Python versions — never rely on system Python',
        'Create a venv per project: `uv venv` (10x faster than `python -m venv`)',
        'pyproject.toml is the modern standard — deps, tool config, entry points in ONE file',
        'Use src/ layout to catch packaging bugs early',
        'NEVER use `sudo pip install` — always venv first',
        'Pin versions in pyproject.toml with lower bounds: `httpx>=0.27,<1.0`',
        'Install in editable mode: `uv pip install -e .` — changes reflect immediately',
      ],
      resources: [
        { title: 'pyenv Documentation', url: 'https://github.com/pyenv/pyenv', type: 'docs' },
        { title: 'uv — Astral (10x faster pip)', url: 'https://docs.astral.sh/uv/', type: 'tool', isHiddenGem: true },
        { title: 'pyproject.toml Guide', url: 'https://packaging.python.org/en/latest/guides/writing-pyproject-toml/', type: 'docs' },
        { title: 'Hatch (build backend)', url: 'https://hatch.pypa.io/', type: 'docs' },
        { title: 'Real Python — pyenv Tutorial', url: 'https://realpython.com/intro-to-pyenv/', type: 'article' },
      ],
      miniProject: {
        title: 'Set Up Your Python Development Environment',
        description: 'Properly install pyenv, Python 3.12, uv, and create your first project with the senior-engineer structure. This is the foundation for EVERYTHING else.',
        requirements: [
          'Install pyenv and Python 3.12.0',
          'Install uv (faster pip)',
          'Create a project called "playground" with src/ layout',
          'Configure pyproject.toml with ruff, pytest, mypy',
          'Add a CLI entry point that prints "Ready!"',
          'Verify: which python shows .venv, mycommand prints Ready!',
        ],
        estTime: '30-45 minutes',
        solutionCode: '# See the setup steps in this lesson.\n# Key verification:\n# 1. pyenv --version works\n# 2. python --version shows 3.12.0\n# 3. uv --version works\n# 4. Created project has: pyproject.toml, src/playground/, tests/\n# 5. pip install -e . works without errors\n# 6. Running the CLI command prints "Ready!"',
        solutionLanguage: 'bash'
      }
    },

    {
      id: 'py-02',
      title: 'Strings Mastery — Every Method, Formatting, Regex',
      subtitle: 'Strings are 80% of real Python code. Master every method, f-strings, and regex.',
      duration: 75,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Strings are immutable sequences of Unicode characters. In real-world Python, you spend more time manipulating strings than anything else: parsing logs, formatting output, cleaning user input, building SQL queries, processing JSON, working with file paths. Master strings and you are 60% of the way to being a Python engineer.',
        'Python has FOUR ways to format strings (senior engineers know all four and when to use each): (1) %-formatting (legacy, avoid), (2) str.format() (legacy, avoid), (3) f-strings (modern, default choice, Python 3.6+), (4) string Template (for user-supplied templates, safe).',
        'The str class has 40+ methods. The most important: split, join, strip, replace, find, startswith, endswith, upper, lower, title, capitalize, isdigit, isalpha, isalnum, isnumeric, zfill, center, ljust, rjust, partition, removeprefix, removesuffix. Know them all.',
        'Regular expressions (re module) are essential for complex string matching: emails, phone numbers, log parsing. Use re.search, re.match, re.findall, re.sub, re.split. Compile patterns with re.compile for performance. ALWAYS use raw strings (r"...") for regex.',
      ],
      visualization: {
        title: 'String Methods by Category',
        type: 'tree',
        diagram: `String Methods (40+ total)
│
├── SEARCHING
│   ├── .find(sub)          → index or -1
│   ├── .rfind(sub)         → last index or -1
│   ├── .index(sub)         → index or ValueError
│   ├── .count(sub)         → number of occurrences
│   ├── .startswith(prefix) → bool
│   └── .endswith(suffix)   → bool
│
├── TRANSFORMING
│   ├── .upper() / .lower() / .title()
│   ├── .capitalize() / .swapcase()
│   ├── .strip() / .lstrip() / .rstrip()
│   ├── .replace(old, new, count)
│   ├── .removeprefix(p) / .removesuffix(s)  ← Python 3.9+
│   ├── .zfill(width)       → pad with zeros
│   ├── .center(w) / .ljust(w) / .rjust(w)
│   └── .expandtabs(tabsize)
│
├── SPLITTING & JOINING
│   ├── .split(sep, maxsplit)      → list
│   ├── .rsplit(sep, maxsplit)     → from right
│   ├── .splitlines(keepends)      → by \\n
│   ├── .partition(sep)            → (before, sep, after)
│   ├── .rpartition(sep)           → from right
│   └── sep.join(iterable)         → string
│
├── TESTING (return bool)
│   ├── .isdigit() / .isalpha() / .isalnum()
│   ├── .isnumeric() / .isdecimal()
│   ├── .isupper() / .islower() / .istitle()
│   ├── .isspace() / .isprintable()
│   └── .isidentifier() / .isascii()
│
├── FORMATTING (4 ways — use f-strings!)
│   ├── f"{var}"            ← MODERN, FAST, READABLE
│   ├── str.format()        ← legacy
│   ├── "..." % (vars,)     ← legacy (C-style)
│   └── Template("...")     ← for user input (safe)
│
└── ENCODING
    ├── .encode("utf-8")    → bytes
    ├── .encode("utf-8", errors="ignore")
    └── bytes.decode("utf-8") → str`,
        legend: [
          'Strings are IMMUTABLE — every method returns a NEW string',
          'Use f-strings for 95% of formatting (fastest, most readable)',
          'Use Template for user-supplied templates (safe from injection)',
          'For complex matching, use regex (re module)',
        ],
      },
      progressiveExample: {
        title: 'Building a Log Parser — From Naive to Production',
        description: 'See how a simple string operation evolves into a production log parser',
        stages: [
          {
            name: 'Tiny',
            description: 'Split a log line by spaces',
            code: 'log_line = "2024-01-15 10:30:45 INFO User logged in"\nparts = log_line.split(" ")\nprint(parts)\n# [\'2024-01-15\', \'10:30:45\', \'INFO\', \'User\', \'logged\', \'in\']\n\n# Problem: message has spaces, gets split too!',
            language: 'python',
            explanation: 'Naive approach fails — message words get split. Real logs have variable structure.',
          },
          {
            name: 'Small',
            description: 'Use split with maxsplit',
            code: 'log_line = "2024-01-15 10:30:45 INFO User logged in from 192.168.1.1"\n# Split into 4 parts max: date, time, level, rest\nparts = log_line.split(" ", 3)\nprint(parts)\n# [\'2024-01-15\', \'10:30:45\', \'INFO\', \'User logged in from 192.168.1.1\']\n\ndate, time, level, message = parts\nprint(f"Level: {level}, Message: {message}")',
            language: 'python',
            explanation: 'maxsplit=3 limits splits — message stays intact. Better, but still fragile (what if date has different format?).',
          },
          {
            name: 'Real-World',
            description: 'Use regex for robust parsing, dataclass for structure, error handling',
            code: 'import re\nfrom datetime import datetime\nfrom dataclasses import dataclass\nfrom typing import Literal\n\nLogLevel = Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]\n\n@dataclass(frozen=True)\nclass LogEntry:\n    timestamp: datetime\n    level: LogLevel\n    message: str\n    source: str | None = None\n\n    def __str__(self) -> str:\n        return f"[{self.timestamp:%Y-%m-%d %H:%M:%S}] {self.level:8s} {self.message}"\n\n# Compiled regex — faster than re.compile per call\nLOG_PATTERN = re.compile(\n    r\'^(?P<timestamp>\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2})\\s*\'\n    r\'(?P<level>DEBUG|INFO|WARNING|ERROR|CRITICAL)\\s*\'\n    r\'(?:\\[(?P<source>[^\\]]+)\\]\\s*)?\'  # optional [source]\n    r\'(?P<message>.*)$\'\n)\n\nclass LogParseError(ValueError):\n    """Raised when a log line cannot be parsed."""\n\ndef parse_log(line: str) -> LogEntry:\n    """Parse a log line into a LogEntry.\n\n    Args:\n        line: Raw log line.\n\n    Returns:\n        LogEntry with parsed fields.\n\n    Raises:\n        LogParseError: If the line does not match expected format.\n    """\n    line = line.strip()\n    if not line:\n        raise LogParseError("Empty log line")\n\n    match = LOG_PATTERN.match(line)\n    if not match:\n        raise LogParseError(f"Invalid log format: {line!r}")\n\n    try:\n        timestamp = datetime.strptime(\n            match.group("timestamp"),\n            "%Y-%m-%d %H:%M:%S"\n        )\n    except ValueError as e:\n        raise LogParseError(f"Invalid timestamp: {e}") from e\n\n    return LogEntry(\n        timestamp=timestamp,\n        level=match.group("level"),  # type: ignore\n        message=match.group("message"),\n        source=match.group("source"),\n    )\n\n# Usage\nlines = [\n    "2024-01-15 10:30:45 INFO User logged in",\n    "2024-01-15 10:31:02 ERROR [auth] Failed login for user=admin",\n    "2024-01-15 10:31:15 WARNING [db] Connection pool 80% full",\n]\n\nfor line in lines:\n    try:\n        entry = parse_log(line)\n        print(entry)\n    except LogParseError as e:\n        print(f"SKIP: {e}")\n\n# Output:\n# [2024-01-15 10:30:45] INFO     User logged in\n# [2024-01-15 10:31:02] ERROR    Failed login for user=admin\n# [2024-01-15 10:31:15 WARNING  Connection pool 80% full',
            language: 'python',
            explanation: 'Production parser: compiled regex with named groups, dataclass for structure, proper error handling, type hints, docstrings. This is what senior engineers write.',
          },
        ],
      },
      codeExamples: [
        {
          filename: 'string_formatting.py',
          language: 'python',
          code: '# === 4 WAYS TO FORMAT STRINGS ===\n\n# 1. f-strings (MODERN — use this 95% of the time)\nname = "Alice"\nage = 30\nprint(f"Hello, {name}! You are {age} years old.")\n\n# Expressions in f-strings\nprint(f"2 + 2 = {2 + 2}")\nprint(f"Name upper: {name.upper()}")\nprint(f"Length: {len(name)}")\n\n# Format specs\npi = 3.14159265\nprint(f"Pi: {pi:.2f}")           # 2 decimals: 3.14\nprint(f"Pi: {pi:>10.4f}")        # right-aligned, 10 wide, 4 decimals\nprint(f"Pi: {pi:<10.4f}")        # left-aligned\nprint(f"Pi: {pi:^10.4f}")        # centered\nprint(f"Pi: {pi:_^11}")          # centered with _ padding\n\n# Number formatting\nn = 1234567\nprint(f"Thousands: {n:,}")       # 1,234,567\nprint(f"Binary: {n:b}")          # 100101101011010000111\nprint(f"Hex: {n:x}")             # 12d687\nprint(f"Octal: {n:o}")           # 4553207\nprint(f"Scientific: {n:e}")      # 1.234567e+06\nprint(f"Percent: {0.85:.1%}")    # 85.0%\n\n# Date formatting\nfrom datetime import datetime\nnow = datetime.now()\nprint(f"Today: {now:%Y-%m-%d %H:%M:%S}")\nprint(f"Date: {now:%B %d, %Y}")  # January 15, 2024\n\n# Debug mode (Python 3.8+) — shows variable name + value\nx = 42\nprint(f"{x = }")           # x = 42\nprint(f"{x * 2 = }")       # x * 2 = 84\n\n# Multi-line f-strings\nuser = {"name": "Bob", "age": 25}\nmessage = f"""\nUser Profile:\n  Name: {user[\'name\']}\n  Age:  {user[\'age\']}\n  ID:   {hash(user[\'name\']) % 10000:04d}\n"""\nprint(message)\n\n# 2. str.format() — legacy, but useful for templates\n# Use when the template is stored separately from values\ntemplate = "Hello, {name}! You are {age} years old."\nprint(template.format(name="Alice", age=30))\n\n# 3. %-formatting — C-style, AVOID (only for logging module historically)\nprint("Hello, %s! You are %d years old." % (name, age))\n\n# 4. string.Template — for USER-SUPPLIED templates (safe from injection)\nfrom string import Template\n# Safe: user cannot inject Python expressions\nt = Template("Hello, $name! You earned $amount.")\nprint(t.safe_substitute(name="Alice", amount="$100"))\n# Use case: email templates, config files where users provide the template',
          explanation: 'f-strings are the modern default — fastest, most readable, support expressions and format specs. Use Template for user-supplied templates (safe from injection). Avoid % and .format() unless maintaining legacy code.'
        },
        {
          filename: 'string_methods.py',
          language: 'python',
          code: '# === EVERY IMPORTANT STRING METHOD ===\n\ns = "  Hello, World!  "\n\n# --- SEARCHING ---\nprint(s.find("World"))       # 10 (index, -1 if not found)\nprint(s.rfind("l"))          # 12 (last occurrence)\nprint(s.index("World"))      # 10 (like find but raises ValueError)\nprint(s.count("l"))          # 3\nprint(s.startswith("  Hel")) # True\nprint(s.endswith("!  "))     # True\n\n# --- TRANSFORMING ---\nprint(s.strip())             # "Hello, World!" (both ends)\nprint(s.lstrip())            # "Hello, World!  "\nprint(s.rstrip())            # "  Hello, World!"\nprint(s.lower())             # "  hello, world!  "\nprint(s.upper())             # "  HELLO, WORLD!  "\nprint(s.title())             # "  Hello, World!  "\nprint(s.capitalize())        # "  hello, world!  "\nprint(s.swapcase())          # "  hELLO, wORLD!  "\nprint(s.replace("World", "Python"))  # "  Hello, Python!  "\n\n# removeprefix/removesuffix (Python 3.9+)\nfilename = "report_2024.pdf"\nprint(filename.removesuffix(".pdf"))   # "report_2024"\nprint(filename.removeprefix("report_"))  # "2024.pdf"\n\n# Padding\nnum = "42"\nprint(num.zfill(5))          # "00042" (pad with zeros)\nprint(num.center(6, "-"))    # "--42--"\nprint(num.ljust(6, "-"))     # "42----"\nprint(num.rjust(6, "-"))     # "----42"\n\n# --- SPLITTING & JOINING ---\ncsv = "Alice,30,NYC,Engineer"\nprint(csv.split(","))                # [\'Alice\', \'30\', \'NYC\', \'Engineer\']\nprint(csv.split(",", 2))             # [\'Alice\', \'30\', \'NYC,Engineer\'] (maxsplit)\nprint(csv.rsplit(",", 1))            # [\'Alice,30,NYC\', \'Engineer\'] (from right)\n\nlog = "2024-01-15 INFO User logged in\\n2024-01-15 ERROR Disk full"\nprint(log.splitlines())      # [\'...INFO...\', \'...ERROR...\']\nprint(log.splitlines(keepends=True))  # keeps \\n\n\n# partition — split into 3 parts (before, sep, after)\nemail = "alice@example.com"\nprint(email.partition("@"))  # (\'alice\', \'@\', \'example.com\')\nprint(email.rpartition("@")) # same, but from right\n\n# join — the OPPOSITE of split\nparts = ["Alice", "30", "NYC"]\nprint(",".join(parts))       # "Alice,30,NYC"\nprint(" | ".join(parts))     # "Alice | 30 | NYC"\nprint("/".join(["home", "user", "docs"]))  # "home/user/docs"\n\n# --- TESTING (return bool) ---\nprint("123".isdigit())       # True\nprint("abc".isalpha())       # True\nprint("abc123".isalnum())    # True\nprint("  ".isspace())        # True\nprint("Hello".istitle())     # True\nprint("HELLO".isupper())     # True\nprint("hello".islower())     # True\n\n# isnumeric vs isdigit vs isdecimal (subtle!)\nprint("²".isdigit())         # True (superscript)\nprint("²".isnumeric())       # True\nprint("²".isdecimal())       # False (!)\n\n# --- REAL-WORLD COMBO ---\ndef slugify(text: str) -> str:\n    """Convert text to URL-safe slug: \'Hello World!\' -> \'hello-world\'."""\n    return (\n        text.lower()\n        .strip()\n        .replace(" ", "-")\n        .replace("_", "-")\n        # remove non-alphanumeric (except -)\n        .encode("ascii", "ignore")\n        .decode()\n    )\n\n# Wait, that does not remove special chars properly. Better:\nimport re\ndef slugify_proper(text: str) -> str:\n    """Production slugify: \'Hello, World!\' -> \'hello-world\'."""\n    # Lowercase, replace any non-alphanumeric with -\n    slug = re.sub(r\'[^a-z0-9]+\', \'-\', text.lower())\n    # Remove leading/trailing -\n    return slug.strip(\'-\')\n\nprint(slugify_proper("Hello, World!"))  # "hello-world"\nprint(slugify_proper("  My Blog Post #1  "))  # "my-blog-post-1"',
          explanation: 'Master split/join (most used), strip/replace (cleaning), startswith/endswith (validation), and is* methods (type checking). These cover 90% of string manipulation needs.'
        },
        {
          filename: 'regex.py',
          language: 'python',
          code: 'import re\n\n# === REGEX ESSENTIALS ===\n\n# Always use RAW STRINGS (r"...") for regex!\n# Otherwise \\b is backspace, \\d is just d, etc.\n\n# Basic patterns\n# .     any char except newline\n# \\d    digit [0-9]\n# \\D    non-digit\n# \\w    word char [a-zA-Z0-9_]\n# \\W    non-word char\n# \\s    whitespace\n# \\S    non-whitespace\n# ^     start of string\n# $     end of string\n# \\b    word boundary\n\n# Quantifiers\n# *     0 or more\n# +     1 or more\n# ?     0 or 1\n# {n}   exactly n\n# {n,m} between n and m\n# {n,}  n or more\n\n# Groups\n# (abc)   capture group\n# (?:abc) non-capturing group\n# (?P<name>abc) named group\n# [abc]   character class\n# [^abc]  negated class\n# a|b     alternation\n\n# re.search — find first match anywhere\nmatch = re.search(r\'\\d+\', "Order #12345 confirmed")\nif match:\n    print(match.group())  # "12345"\n\n# re.match — match from START of string\nmatch = re.match(r\'Hello\', "Hello World")\nprint(match.group())  # "Hello"\n\n# re.fullmatch — entire string must match\nvalid = bool(re.fullmatch(r\'\\d{3}-\\d{4}\', "555-1234"))  # True\n\n# re.findall — all matches as list\nemails = re.findall(r\'[\\w.+-]+@[\\w-]+\\.[\\w.]+\', text)\n\n# re.finditer — iterator of match objects (memory efficient)\nfor m in re.finditer(r\'\\d+\', "a1 b22 c333"):\n    print(m.group(), m.start(), m.end())\n\n# re.sub — replace matches\nclean = re.sub(r\'<[^>]+>\', \'\', "<p>Hello</p>")  # "Hello" (strip HTML tags)\ncensored = re.sub(r\'\\b\\d{4}\\b\', \'****\', "Card: 1234 5678")  # "Card: **** ****"\n\n# re.split — split by pattern\nparts = re.split(r\'[,;\\s]+\', "a, b; c d")  # [\'a\', \'b\', \'c\', \'d\']\n\n# === COMPILED PATTERNS (faster for repeated use) ===\n# Compile ONCE, use MANY times\nEMAIL_RE = re.compile(r\'^[\\w.+-]+@[\\w-]+\\.[\\w.]+$\')\n\ndef is_valid_email(email: str) -> bool:\n    return bool(EMAIL_RE.match(email))\n\n# === NAMED GROUPS — much more readable ===\nLOG_RE = re.compile(\n    r\'(?P<timestamp>\\S+)\\s+\'\n    r\'(?P<level>DEBUG|INFO|WARNING|ERROR)\\s+\'\n    r\'(?P<message>.*)\'\n)\n\nmatch = LOG_RE.match("2024-01-15 INFO User logged in")\nif match:\n    print(match.group("timestamp"))  # "2024-01-15"\n    print(match.group("level"))      # "INFO"\n    print(match.group("message"))    # "User logged in"\n    # Or get all as dict:\n    print(match.groupdict())\n    # {\'timestamp\': \'2024-01-15\', \'level\': \'INFO\', \'message\': \'User logged in\'}\n\n# === FLAGS ===\nre.IGNORECASE  # case insensitive\nre.MULTILINE   # ^ and $ match line boundaries\nre.DOTALL      # . matches newline too\nre.VERBOSE     # allow whitespace and comments in pattern\n\n# VERBOSE example — readable complex regex\nPHONE_RE = re.compile(r"""\n    ^                   # start of string\n    (?:\\+1[-.\\s]?)?    # optional country code\n    \\(?                 # optional opening paren\n    (\\d{3})             # area code\n    \\)?                 # optional closing paren\n    [-.\\s]?             # separator\n    (\\d{3})             # first 3 digits\n    [-.\\s]?             # separator\n    (\\d{4})             # last 4 digits\n    $                   # end of string\n""", re.VERBOSE)\n\nmatch = PHONE_RE.match("(555) 123-4567")\nif match:\n    area, first, last = match.groups()\n    print(f"({area}) {first}-{last}")\n\n# === COMMON PATTERNS ===\n# Email\nEMAIL = r\'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\'\n\n# URL\nURL = r\'https?://[\\w.-]+(?:/[\\w._-]*)*\'\n\n# IP address\nIP = r\'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b\'\n\n# Phone (US)\nPHONE = r\'\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\'\n\n# Date (YYYY-MM-DD)\nDATE = r\'\\d{4}-\\d{2}-\\d{2}\'\n\n# Strong password (8+, upper, lower, digit, special)\nPASSWORD = r\'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$\'\n\n# === WARNING: do not use regex for HTML/JSON parsing! ===\n# Use BeautifulSoup for HTML, json module for JSON\n# Regex on HTML is famously broken',
          explanation: 'Regex is powerful but easy to misuse. Compile patterns for performance. Use named groups for readability. Use VERBOSE flag for complex patterns. NEVER use regex for HTML/JSON parsing.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a function parse_phone(phone: str) -> dict that parses US phone numbers in any format (555-123-4567, (555) 123-4567, 5551234567, +1-555-123-4567) and returns {"area": "555", "first": "123", "last": "4567"}. Raise ValueError if invalid.',
          starterCode: 'import re\n\nPHONE_RE = re.compile(...)\n\ndef parse_phone(phone: str) -> dict:\n    # your code\n    pass\n',
          hint: 'Use re.compile with VERBOSE flag. Match optional country code, area code, separator, 3 digits, separator, 4 digits. Use named groups.',
          solution: 'import re\n\nPHONE_RE = re.compile(r"""\n    ^\n    (?:\\+1[-.\\s]?)?    # optional country code\n    \\(?(?P<area>\\d{3})\\)?  # area code (parens optional)\n    [-.\\s]?            # separator\n    (?P<first>\\d{3})   # first 3 digits\n    [-.\\s]?            # separator\n    (?P<last>\\d{4})    # last 4 digits\n    $\n""", re.VERBOSE)\n\ndef parse_phone(phone: str) -> dict:\n    match = PHONE_RE.match(phone.strip())\n    if not match:\n        raise ValueError(f"Invalid phone number: {phone!r}")\n    return match.groupdict()\n\n# Test\nfor p in ["555-123-4567", "(555) 123-4567", "5551234567", "+1-555-123-4567"]:\n    print(parse_phone(p))\n# All return {\'area\': \'555\', \'first\': \'123\', \'last\': \'4567\'}',
          solutionLanguage: 'python'
        },
        {
          prompt: 'Write slugify(text: str) -> str that converts "Hello, World! This is #1!" to "hello-world-this-is-1". Strip special chars, lowercase, replace spaces with hyphens.',
          starterCode: 'import re\n\ndef slugify(text: str) -> str:\n    # your code\n    pass\n',
          hint: 'Use re.sub to replace non-alphanumeric with hyphens, then strip leading/trailing hyphens.',
          solution: 'import re\n\ndef slugify(text: str) -> str:\n    # Replace any run of non-alphanumeric chars with single hyphen\n    slug = re.sub(r\'[^a-zA-Z0-9]+\', \'-\', text.lower())\n    # Strip leading/trailing hyphens\n    return slug.strip(\'-\')\n\nprint(slugify("Hello, World! This is #1!"))  # "hello-world-this-is-1"\nprint(slugify("  My   Cool   Post  "))       # "my-cool-post"\nprint(slugify("Café & Müller"))              # "caf-m-ller"',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why use raw strings (r"...") for regex patterns?',
          options: [
            'Faster',
            'So \\b, \\d, \\w are treated as regex escapes, not Python string escapes',
            'Required by Python',
            'For memory efficiency',
          ],
          correctIndex: 1,
          explanation: 'Without r prefix, \\b is backspace, \\d is just d. With r prefix, \\b is word boundary, \\d is digit. ALWAYS use raw strings for regex.'
        },
        {
          question: 'What is the difference between re.search and re.match?',
          options: [
            'No difference',
            'search finds match anywhere, match only matches at the START of string',
            'match is faster',
            'search is case-insensitive',
          ],
          correctIndex: 1,
          explanation: 're.match only checks at the start. re.search scans the entire string. For "must match entire string" use re.fullmatch.'
        },
        {
          question: 'Why compile regex patterns with re.compile?',
          options: [
            'Required by Python',
            'Faster when used repeatedly — compile once, use many times',
            'For readability only',
            'To enable named groups',
          ],
          correctIndex: 1,
          explanation: 're.compile caches the parsed pattern. For patterns used in loops or frequently-called functions, compile once at module level.'
        },
        {
          question: 'Which string method splits "a,b,c" into ["a", "b", "c"]?',
          options: ['"a,b,c".split(",")', '"a,b,c".partition(",")', '"a,b,c".join(",")', '"a,b,c".break(",")'],
          correctIndex: 0,
          explanation: 'split(sep) returns a list. partition returns a 3-tuple (before, sep, after). join is the OPPOSITE of split.'
        },
      ],
      keyTakeaways: [
        'Use f-strings for 95% of formatting — fastest, most readable, support expressions',
        'Use string.Template for user-supplied templates (safe from injection)',
        'split/join are the most-used methods — master them',
        'strip/lstrip/rstrip remove whitespace; replace substitutes text',
        'is* methods (isdigit, isalpha, isalnum) for validation',
        'Always use raw strings (r"...") for regex patterns',
        'Compile regex with re.compile for repeated use',
        'Use named groups (?P<name>...) for readability',
        'NEVER use regex to parse HTML/JSON — use BeautifulSoup/json module',
      ],
      resources: [
        { title: 'Python String Methods', url: 'https://docs.python.org/3/library/stdtypes.html#string-methods', type: 'docs' },
        { title: 're module Documentation', url: 'https://docs.python.org/3/library/re.html', type: 'docs' },
        { title: 'regex101.com — Test Regex Online', url: 'https://regex101.com/', type: 'interactive', isHiddenGem: true },
        { title: 'f-string Format Spec', url: 'https://docs.python.org/3/library/string.html#format-specification-mini-language', type: 'docs' },
        { title: 'Real Python — Regex Tutorial', url: 'https://realpython.com/regex-python/', type: 'article' },
      ]
    },

    {
      id: 'py-03',
      title: 'Lists, Tuples, Dicts, Sets — When to Use Each, Performance',
      subtitle: 'Deep dive into every collection type — memory, performance, use cases',
      duration: 80,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Python has 4 main collection types: list (ordered, mutable), tuple (ordered, immutable), dict (key-value, ordered 3.7+), set (unordered, unique). Choosing the right one is the difference between code that runs in 10ms and 10s.',
        'Performance matters: list membership test `x in list` is O(n) — for 1M items, that is 1M comparisons. Set membership `x in set` is O(1) — same speed for 1 or 1M items. Use sets for membership tests, dicts for lookups by key, lists for ordered sequences, tuples for fixed records.',
        'Memory matters too: a list of 1M ints uses ~40MB. A tuple of 1M ints uses ~32MB (less overhead). An array.array of 1M ints uses ~8MB. A numpy array uses ~8MB but with vectorized ops. For large numerical data, use numpy/array — not lists.',
        'Common senior-engineer patterns: defaultdict (no KeyError), Counter (counting), deque (fast queue), namedtuple (self-documenting tuples), dataclass (modern namedtuple). The collections module is a treasure trove.',
      ],
      visualization: {
        title: 'Collection Types — Performance Comparison',
        type: 'comparison',
        diagram: `┌────────────┬──────────┬──────────┬──────────┬──────────┐
│ Operation  │ list     │ tuple    │ dict     │ set      │
├────────────┼──────────┼──────────┼──────────┼──────────┤
│ Add        │ O(1) amrt│ N/A      │ O(1)     │ O(1)     │
│ Append     │ O(1) amrt│ N/A      │ N/A      │ add O(1) │
│ Insert(0)  │ O(n) ←BAD│ N/A      │ N/A      │ N/A      │
│ Remove     │ O(n)     │ N/A      │ O(1)     │ O(1)     │
│ Search     │ O(n)     │ O(n)     │ O(1)     │ O(1) ←KEY│
│ Index[i]   │ O(1)     │ O(1)     │ O(1)     │ N/A      │
│ Iterate    │ O(n)     │ O(n)     │ O(n)     │ O(n)     │
│ Sort       │ O(n logn)│ N/A      │ N/A      │ N/A      │
│ Memory     │ High     │ Lower    │ High     │ High     │
│ Mutable    │ YES      │ NO       │ YES      │ YES      │
│ Ordered    │ YES      │ YES      │ YES(3.7+)│ NO       │
│ Hashable   │ NO       │ YES      │ NO       │ NO       │
└────────────┴──────────┴──────────┴──────────┴──────────┘

GOLDEN RULES:
• Need ordered + mutable?     → list
• Need ordered + immutable?   → tuple (or namedtuple, dataclass)
• Need key → value lookup?    → dict (or defaultdict)
• Need unique items + fast membership? → set
• Need fast queue (push/pop both ends)? → deque (collections)
• Need to count items?        → Counter (collections)
• Need numeric data?          → numpy array or array.array`,
        legend: [
          'O(1) amortized = usually fast, occasionally slow (resize)',
          'Sets and dicts use hash tables — O(1) lookup is their superpower',
          'Tuples are hashable (can be dict keys), lists are not',
          'For large numerical data, numpy is 10-100x faster than lists',
        ],
      },
      progressiveExample: {
        title: 'Building a Cache — From Slow to Fast',
        description: 'See how choosing the right data structure makes code 10,000x faster',
        stages: [
          {
            name: 'Tiny',
            description: 'Naive cache with list — O(n) lookup',
            code: '# BAD: Using list for cache lookup\nclass SlowCache:\n    def __init__(self):\n        self._keys = []\n        self._values = []\n\n    def get(self, key):\n        if key in self._keys:  # O(n) — scans entire list!\n            idx = self._keys.index(key)  # O(n) again\n            return self._values[idx]\n        return None\n\n    def set(self, key, value):\n        if key not in self._keys:  # O(n)\n            self._keys.append(key)\n            self._values.append(value)\n        else:\n            idx = self._keys.index(key)  # O(n)\n            self._values[idx] = value\n\n# For 1M items, each get() takes ~100ms. Unusable.',
            language: 'python',
            explanation: 'List membership test is O(n). For 1M items, every lookup scans 1M entries. Terrible performance.',
          },
          {
            name: 'Small',
            description: 'Use dict — O(1) lookup',
            code: '# GOOD: Using dict for cache lookup\nclass FastCache:\n    def __init__(self):\n        self._store = {}  # dict = hash table = O(1)\n\n    def get(self, key):\n        return self._store.get(key)  # O(1)!\n\n    def set(self, key, value):\n        self._store[key] = value  # O(1)!\n\n# For 1M items, each get() takes ~0.0001ms. 1000x faster.',
            language: 'python',
            explanation: 'Dict lookup is O(1) thanks to hash table. Same data, 1000x faster. This is the #1 optimization in Python.',
          },
          {
            name: 'Real-World',
            description: 'LRU cache with OrderedDict, TTL support, size limits',
            code: 'from collections import OrderedDict\nfrom time import time, monotonic\nfrom typing import Any, Callable\nimport threading\n\nclass LRUCache:\n    """Production LRU cache with TTL, thread-safe, size-limited."""\n\n    def __init__(self, maxsize: int = 1000, ttl: float | None = None):\n        self._maxsize = maxsize\n        self._ttl = ttl\n        self._cache: OrderedDict = OrderedDict()\n        self._timestamps: dict = {}\n        self._lock = threading.RLock()\n\n    def get(self, key: Any) -> Any | None:\n        with self._lock:\n            if key not in self._cache:\n                return None\n\n            # Check TTL\n            if self._ttl is not None:\n                age = monotonic() - self._timestamps[key]\n                if age > self._ttl:\n                    del self._cache[key]\n                    del self._timestamps[key]\n                    return None\n\n            # Move to end (most recently used)\n            self._cache.move_to_end(key)\n            return self._cache[key]\n\n    def set(self, key: Any, value: Any) -> None:\n        with self._lock:\n            if key in self._cache:\n                # Update existing — move to end\n                self._cache.move_to_end(key)\n            else:\n                # New key — evict LRU if at capacity\n                if len(self._cache) >= self._maxsize:\n                    evicted_key = next(iter(self._cache))  # first = oldest\n                    del self._cache[evicted_key]\n                    del self._timestamps[evicted_key]\n\n            self._cache[key] = value\n            self._timestamps[key] = monotonic()\n\n    def clear(self) -> None:\n        with self._lock:\n            self._cache.clear()\n            self._timestamps.clear()\n\n    def __len__(self) -> int:\n        with self._lock:\n            return len(self._cache)\n\n    def __contains__(self, key: Any) -> bool:\n        return self.get(key) is not None\n\n# Usage\ncache = LRUCache(maxsize=1000, ttl=300)  # 5-min TTL\n\n# As a decorator\ndef cached(maxsize: int = 128, ttl: float | None = None):\n    """Decorator that caches function results."""\n    def decorator(func: Callable) -> Callable:\n        cache = LRUCache(maxsize=maxsize, ttl=ttl)\n\n        def wrapper(*args, **kwargs):\n            key = (args, tuple(sorted(kwargs.items())))\n            result = cache.get(key)\n            if result is None:\n                result = func(*args, **kwargs)\n                cache.set(key, result)\n            return result\n\n        wrapper.cache_clear = cache.clear\n        wrapper.cache_info = lambda: {"size": len(cache)}\n        return wrapper\n\n    return decorator\n\n@cached(maxsize=1000, ttl=60)\ndef expensive_api_call(user_id: int) -> dict:\n    # Simulate slow API\n    import time\n    time.sleep(0.5)\n    return {"user_id": user_id, "name": f"User{user_id}"}\n\n# First call: 500ms\nresult = expensive_api_call(42)\n# Second call: 0.0001ms (cached)\nresult = expensive_api_call(42)',
            language: 'python',
            explanation: 'Production cache: OrderedDict for LRU eviction, TTL for expiry, thread-safe with RLock, can be used as decorator. This is essentially what functools.lru_cache does internally.',
          },
        ],
      },
      codeExamples: [
        {
          filename: 'lists_deep.py',
          language: 'python',
          code: '# === LISTS — ordered, mutable, allows duplicates ===\n\n# Creating lists\nnums = [1, 2, 3, 4, 5]\nempty = []\nfrom_list = list("hello")  # [\'h\', \'e\', \'l\', \'l\', \'o\']\nfrom_range = list(range(5))  # [0, 1, 2, 3, 4]\n\n# Adding elements\nnums.append(6)              # [1,2,3,4,5,6] — O(1)\nnums.insert(0, 0)           # [0,1,2,3,4,5,6] — O(n) (slow at start!)\nnums.extend([7, 8, 9])     # [0,1,2,3,4,5,6,7,8,9] — O(k)\n\n# Removing elements\nnums.remove(0)              # remove by value — O(n)\npopped = nums.pop()         # remove last — O(1)\nfirst = nums.pop(0)         # remove first — O(n) (BAD!)\ndel nums[0]                 # same as pop(0) — O(n)\nnums.clear()                # remove all\n\n# Slicing (creates NEW list)\nnums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(nums[2:5])      # [2, 3, 4] (start:stop, exclusive)\nprint(nums[:5])       # [0,1,2,3,4]\nprint(nums[5:])       # [5,6,7,8,9]\nprint(nums[-3:])      # [7,8,9] (last 3)\nprint(nums[::2])      # [0,2,4,6,8] (every 2nd)\nprint(nums[::-1])     # [9,8,7,6,5,4,3,2,1,0] (reversed!)\nprint(nums[1:7:2])    # [1,3,5] (start:stop:step)\n\n# Slice assignment (replace section)\nnums[1:3] = [10, 20, 30]  # mutates in place\n\n# Sorting\nnums = [3, 1, 4, 1, 5, 9, 2, 6]\nnums.sort()                # in-place sort (mutates)\nprint(nums)  # [1, 1, 2, 3, 4, 5, 6, 9]\nnums.sort(reverse=True)    # descending\n\n# sorted() returns NEW list (does not mutate)\noriginal = [3, 1, 4, 1, 5]\nsorted_list = sorted(original)  # [1, 1, 3, 4, 5]\n\n# Sort by key function\nusers = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]\nusers.sort(key=lambda u: u["age"])         # by age\nusers.sort(key=lambda u: u["name"])        # by name\nusers.sort(key=lambda u: (u["age"], u["name"]))  # by multiple\n\n# Sort with itemgetter (faster than lambda)\nfrom operator import itemgetter\nusers.sort(key=itemgetter("age"))\n\n# Searching\nprint(3 in nums)           # True — O(n), slow for big lists\nprint(nums.count(1))       # 2 — count occurrences\nprint(nums.index(4))       # 1 — first index of 4 (raises if not found)\n\n# Copying\na = [1, 2, 3]\nb = a                      # NOT a copy — same object!\nb.append(4)\nprint(a)  # [1, 2, 3, 4] (a was modified too!)\n\nc = a.copy()               # shallow copy\nimport copy\nd = copy.deepcopy(a)       # deep copy (for nested lists)\n\n# Common patterns\n# Filter\nevens = [x for x in nums if x % 2 == 0]\n# Map\nsquares = [x**2 for x in nums]\n# Reduce\nfrom functools import reduce\ntotal = reduce(lambda a, b: a + b, nums, 0)\n# Or just:\ntotal = sum(nums)  # built-in, faster',
          explanation: 'Lists are the workhorse. Master slicing (start:stop:step), sort with key, and remember append/pop() are O(1) but insert(0)/pop(0) are O(n). Use deque for fast queue operations.'
        },
        {
          filename: 'dicts_deep.py',
          language: 'python',
          code: '# === DICTS — key-value, O(1) lookup, ordered (3.7+) ===\n\n# Creating\nuser = {"name": "Alice", "age": 30}\nempty = {}\nfrom_pairs = dict([("a", 1), ("b", 2)])\nfrom_kwargs = dict(name="Alice", age=30)\n\n# Dict comprehension (common!)\nsquares = {x: x**2 for x in range(5)}  # {0:0, 1:1, 2:4, 3:9, 4:16}\ninverted = {v: k for k, v in squares.items()}  # swap keys/values\n\n# Accessing\nprint(user["name"])         # Alice — raises KeyError if missing!\nprint(user.get("email"))    # None (safe, no error)\nprint(user.get("email", "N/A"))  # "N/A" (default)\n\n# Adding/updating\nuser["email"] = "a@x.com"   # add new key\nuser["age"] = 31            # update existing\nuser.update({"city": "NYC", "age": 32})  # bulk update\n\n# Removing\npopped = user.pop("email")  # remove and return (raises if missing)\npopped = user.pop("email", None)  # safe\nuser.popitem()              # remove last (3.7+)\ndel user["age"]             # remove by key\nuser.clear()                # remove all\n\n# Iterating\nfor key in user:            # iterates keys\n    print(key)\nfor key, value in user.items():  # both\n    print(f"{key}: {value}")\nfor value in user.values():\n    print(value)\n\n# Checking\nprint("name" in user)       # True — O(1)!\n\n# Merging (Python 3.9+)\nmerged = {"a": 1} | {"b": 2}  # {\'a\': 1, \'b\': 2}\n\n# === SPECIAL DICT TYPES (collections module) ===\nfrom collections import defaultdict, Counter, OrderedDict\n\n# defaultdict — no KeyError, auto-creates default\nword_count = defaultdict(int)  # default = 0\nfor word in "the cat sat on the mat".split():\n    word_count[word] += 1  # no KeyError even if first time\nprint(dict(word_count))  # {\'the\': 2, \'cat\': 1, \'sat\': 1, \'on\': 1, \'mat\': 1}\n\n# Group items with defaultdict\ngroups = defaultdict(list)\npeople = [("Engineer", "Alice"), ("Engineer", "Bob"), ("Sales", "Carol")]\nfor dept, name in people:\n    groups[dept].append(name)\nprint(dict(groups))  # {\'Engineer\': [\'Alice\', \'Bob\'], \'Sales\': [\'Carol\']}\n\n# Counter — counting made easy\ncounter = Counter("abracadabra")\nprint(counter)  # Counter({\'a\': 5, \'b\': 2, \'r\': 2, \'c\': 1, \'d\': 1})\nprint(counter.most_common(3))  # [(\'a\', 5), (\'b\', 2), (\'r\', 2)]\nprint(counter.most_common(1))  # [(\'a\', 5)]\n\n# Counter operations\nc1 = Counter(a=3, b=1)\nc2 = Counter(a=1, b=2)\nprint(c1 + c2)  # Counter({\'a\': 4, \'b\': 3})\nprint(c1 - c2)  # Counter({\'a\': 2}) (only positive)\n\n# OrderedDict — still useful for LRU caches\nod = OrderedDict()\nod["a"] = 1\nod["b"] = 2\nod["c"] = 3\nod.move_to_end("a")  # move to most recent\nod.popitem(last=False)  # remove least recent\n\n# === REAL-WORLD PATTERNS ===\n\n# Pattern 1: Group and aggregate\norders = [\n    {"customer": "Alice", "amount": 100},\n    {"customer": "Bob", "amount": 50},\n    {"customer": "Alice", "amount": 200},\n]\ntotal_by_customer = defaultdict(float)\nfor order in orders:\n    total_by_customer[order["customer"]] += order["amount"]\n# {\'Alice\': 300.0, \'Bob\': 50.0}\n\n# Pattern 2: Indexing for fast lookup\nusers = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]\nusers_by_id = {u["id"]: u for u in users}\n# Now O(1) lookup by id: users_by_id[1]["name"]\n\n# Pattern 3: Frequency analysis\ndef most_frequent(items: list) -> any:\n    """Return most common item."""\n    return Counter(items).most_common(1)[0][0]\n\nprint(most_frequent([1, 2, 2, 3, 3, 3]))  # 3',
          explanation: 'Dicts are Python\'s hash table — O(1) for everything. Use defaultdict to avoid KeyError, Counter for counting, OrderedDict for LRU caches. Dict comprehension is the most common way to transform dicts.'
        },
        {
          filename: 'sets_tuples.py',
          language: 'python',
          code: '# === SETS — unordered, unique, O(1) membership ===\n\n# Creating\ncolors = {"red", "green", "blue"}\nempty = set()  # NOT {} (that\'s a dict!)\nfrom_list = set([1, 2, 2, 3, 3])  # {1, 2, 3} (dedup!)\n\n# Adding/removing\ncolors.add("yellow")\ncolors.discard("red")  # no error if missing\ncolors.remove("green")  # raises KeyError if missing\ncolors.pop()           # remove arbitrary element\ncolors.clear()\n\n# Membership (O(1) — this is the superpower!)\nif "red" in colors:  # FAST even for 1M items\n    print("Found")\n\n# Set operations (math!)\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\nprint(a & b)          # {3, 4} intersection\nprint(a | b)          # {1,2,3,4,5,6} union\nprint(a - b)          # {1, 2} difference\nprint(a ^ b)          # {1, 2, 5, 6} symmetric difference\nprint(a <= b)         # False (is a subset of b?)\nprint(a.isdisjoint(b)) # False (no common elements?)\n\n# Frozen set (immutable, hashable — can be dict key)\nfs = frozenset([1, 2, 3])\n# fs.add(4)  # error!\nmy_dict = {fs: "value"}  # works as key\n\n# REAL-WORLD USE CASES\n\n# 1. Deduplication\nemails = ["a@x.com", "b@x.com", "a@x.com", "c@x.com"]\nunique_emails = list(set(emails))  # order lost!\nunique_ordered = list(dict.fromkeys(emails))  # preserves order\n\n# 2. Fast membership testing (1000x faster than list!)\nvalid_users = {"alice", "bob", "carol"}  # set\n# vs ["alice", "bob", "carol"]  # list\nif username in valid_users:  # O(1) vs O(n)\n    allow_access()\n\n# 3. Finding common/different items\nactive_users = {"alice", "bob", "carol"}\npaid_users = {"bob", "carol", "dan"}\n\nboth = active_users & paid_users           # {\'bob\', \'carol\'}\nfree_users = active_users - paid_users     # {\'alice\'}\nchurned = paid_users - active_users        # {\'dan\'}\nall_users = active_users | paid_users      # {\'alice\', \'bob\', \'carol\', \'dan\'}\n\n# 4. Set comprehension\nunique_first_letters = {word[0] for word in ["apple", "banana", "apricot"]}\n# {\'a\', \'b\'}\n\n# === TUPLES — ordered, IMMUTABLE, hashable ===\n\n# Creating\npoint = (3, 4)\nsingle = (42,)  # SINGLE element needs comma!\nempty = ()\n\n# Without parens (auto-packing)\npoint = 3, 4\nx, y = point  # unpacking\n\n# Multiple return values (returns tuple)\ndef min_max(items):\n    return min(items), max(items)\n\nlow, high = min_max([3, 1, 4, 1, 5])\n\n# Swap variables (no temp!)\na, b = b, a\n\n# Tuple methods (only 2!)\nprint(point.count(3))  # 1\nprint(point.index(4))  # 1\n\n# Tuples as dict keys (lists cannot!)\ngrid = {(0, 0): "A", (0, 1): "B", (1, 0): "C"}\nprint(grid[(0, 1)])  # "B"\n\n# Named tuples (self-documenting)\nfrom collections import namedtuple\n\n# Old way\nPoint = namedtuple("Point", ["x", "y"])\np = Point(3, 4)\nprint(p.x, p.y)  # 3 4 (access by name!)\nprint(p[0], p[1])  # 3 4 (still indexable)\n\n# Modern way: dataclass (more flexible)\nfrom dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Point:\n    x: float\n    y: float\n\n    def distance_to(self, other: "Point") -> float:\n        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5\n\np1 = Point(0, 0)\np2 = Point(3, 4)\nprint(p1.distance_to(p2))  # 5.0',
          explanation: 'Sets give O(1) membership testing — use them whenever you check `if x in collection` frequently. Tuples are immutable and hashable — use for fixed records, dict keys, multiple return values. Prefer dataclass over namedtuple for new code.'
        },
      ],
      lab: {
        title: 'Build a Production-Grade Cache',
        objective: 'Build an LRU cache with TTL, thread safety, and metrics',
        estTime: '60-90 minutes',
        difficulty: 'Intermediate',
        setup: [
          'Python 3.12+ installed',
          'Create file: cache.py',
          'No external dependencies needed',
        ],
        steps: [
          {
            title: 'Step 1: Basic dict cache',
            instruction: 'Start with the simplest possible cache using a dict',
            code: 'class SimpleCache:\n    def __init__(self):\n        self._store = {}\n\n    def get(self, key):\n        return self._store.get(key)\n\n    def set(self, key, value):\n        self._store[key] = value\n\n# Test\ncache = SimpleCache()\ncache.set("user:1", {"name": "Alice"})\nprint(cache.get("user:1"))  # {\'name\': \'Alice\'}\nprint(cache.get("user:2"))  # None',
            codeLanguage: 'python',
            explanation: 'Plain dict works, but grows forever — no size limit, no expiry.',
          },
          {
            title: 'Step 2: Add LRU eviction with OrderedDict',
            instruction: 'Use OrderedDict to track access order and evict least recently used',
            code: 'from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, maxsize=100):\n        self._maxsize = maxsize\n        self._cache = OrderedDict()\n\n    def get(self, key):\n        if key not in self._cache:\n            return None\n        # Move to end (most recently used)\n        self._cache.move_to_end(key)\n        return self._cache[key]\n\n    def set(self, key, value):\n        if key in self._cache:\n            self._cache.move_to_end(key)\n        elif len(self._cache) >= self._maxsize:\n            # Evict least recently used (first item)\n            self._cache.popitem(last=False)\n        self._cache[key] = value\n\ncache = LRUCache(maxsize=3)\ncache.set("a", 1)\ncache.set("b", 2)\ncache.set("c", 3)\ncache.get("a")  # makes "a" most recent\ncache.set("d", 4)  # evicts "b" (least recent)\nprint(cache.get("b"))  # None (evicted)',
            codeLanguage: 'python',
            explanation: 'OrderedDict.move_to_end() and popitem(last=False) make LRU trivial. This is the core pattern.',
          },
          {
            title: 'Step 3: Add TTL (time-to-live)',
            instruction: 'Items should expire after a configurable time',
            code: 'from time import monotonic\n\nclass LRUCache:\n    def __init__(self, maxsize=100, ttl=None):\n        self._maxsize = maxsize\n        self._ttl = ttl\n        self._cache = OrderedDict()\n        self._timestamps = {}  # key -> creation time\n\n    def _is_expired(self, key):\n        if self._ttl is None:\n            return False\n        age = monotonic() - self._timestamps[key]\n        return age > self._ttl\n\n    def get(self, key):\n        if key not in self._cache:\n            return None\n        if self._is_expired(key):\n            del self._cache[key]\n            del self._timestamps[key]\n            return None\n        self._cache.move_to_end(key)\n        return self._cache[key]\n\n    def set(self, key, value):\n        if key in self._cache:\n            self._cache.move_to_end(key)\n        elif len(self._cache) >= self._maxsize:\n            evicted = self._cache.popitem(last=False)[0]\n            del self._timestamps[evicted]\n        self._cache[key] = value\n        self._timestamps[key] = monotonic()\n\ncache = LRUCache(maxsize=100, ttl=1)  # 1 second TTL\ncache.set("temp", "value")\nprint(cache.get("temp"))  # "value"\nimport time\ntime.sleep(1.1)\nprint(cache.get("temp"))  # None (expired)',
            codeLanguage: 'python',
            explanation: 'Use monotonic() (not time()) for elapsed time — it is monotonic (never goes backward). Check expiry on get().',
          },
          {
            title: 'Step 4: Add thread safety',
            instruction: 'Make it thread-safe with a lock',
            code: 'import threading\n\nclass LRUCache:\n    def __init__(self, maxsize=100, ttl=None):\n        self._maxsize = maxsize\n        self._ttl = ttl\n        self._cache = OrderedDict()\n        self._timestamps = {}\n        self._lock = threading.RLock()  # reentrant (nested locking)\n        self._hits = 0\n        self._misses = 0\n\n    def get(self, key):\n        with self._lock:\n            if key not in self._cache:\n                self._misses += 1\n                return None\n            if self._is_expired(key):\n                del self._cache[key]\n                del self._timestamps[key]\n                self._misses += 1\n                return None\n            self._cache.move_to_end(key)\n            self._hits += 1\n            return self._cache[key]\n\n    def set(self, key, value):\n        with self._lock:\n            if key in self._cache:\n                self._cache.move_to_end(key)\n            elif len(self._cache) >= self._maxsize:\n                evicted = self._cache.popitem(last=False)[0]\n                del self._timestamps[evicted]\n            self._cache[key] = value\n            self._timestamps[key] = monotonic()\n\n    def stats(self):\n        with self._lock:\n            total = self._hits + self._misses\n            hit_rate = self._hits / total if total else 0\n            return {\n                "size": len(self._cache),\n                "maxsize": self._maxsize,\n                "hits": self._hits,\n                "misses": self._misses,\n                "hit_rate": f"{hit_rate:.1%}",\n            }\n\n    def _is_expired(self, key):\n        if self._ttl is None:\n            return False\n        return monotonic() - self._timestamps[key] > self._ttl\n\n# Test with threads\nfrom concurrent.futures import ThreadPoolExecutor\n\ncache = LRUCache(maxsize=1000, ttl=60)\n\ndef worker(n):\n    cache.set(f"key{n}", n)\n    return cache.get(f"key{n}")\n\nwith ThreadPoolExecutor(max_workers=10) as pool:\n    results = list(pool.map(worker, range(1000)))\n\nprint(cache.stats())\n# {\'size\': 1000, \'hits\': 1000, \'misses\': 0, \'hit_rate\': \'100.0%\'}',
            codeLanguage: 'python',
            explanation: 'RLock (reentrant) allows the same thread to acquire the lock multiple times. Stats let you monitor cache effectiveness.',
          },
          {
            title: 'Step 5: Use as a decorator',
            instruction: 'Make it usable as @cached decorator on functions',
            code: 'from functools import wraps\n\ndef cached(maxsize=128, ttl=None):\n    """Decorator that caches function results."""\n    def decorator(func):\n        cache = LRUCache(maxsize=maxsize, ttl=ttl)\n\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            # Create cache key from args\n            key = (args, tuple(sorted(kwargs.items())))\n            result = cache.get(key)\n            if result is None:\n                result = func(*args, **kwargs)\n                cache.set(key, result)\n            return result\n\n        # Expose cache methods\n        wrapper.cache = cache\n        wrapper.cache_clear = cache.clear if hasattr(cache, \'clear\') else lambda: None\n        wrapper.cache_stats = cache.stats\n        return wrapper\n\n    return decorator\n\n# Usage\n@cached(maxsize=100, ttl=30)\ndef fetch_user(user_id):\n    import time\n    time.sleep(0.5)  # simulate slow API\n    return {"id": user_id, "name": f"User{user_id}"}\n\n# First call: ~500ms\nprint(fetch_user(1))\n# Second call: ~0ms (cached)\nprint(fetch_user(1))\nprint(fetch_user.cache_stats())\n# {\'size\': 1, \'hits\': 1, \'misses\': 1, \'hit_rate\': \'50.0%\'}',
            codeLanguage: 'python',
            explanation: '@wraps preserves function metadata. Cache key from args + sorted kwargs. Expose stats for monitoring.',
          },
        ],
        verification: 'All 5 steps work. Stats show hits/misses. Threadsafe with ThreadPoolExecutor. Decorator caches function calls.',
      },
      exercises: [
        {
          prompt: 'Given a list of 1M user IDs, write a function that returns the 10 most common IDs. Then write a function that returns IDs that appear more than 5 times. Use the right collection types.',
          starterCode: 'from collections import Counter\nfrom typing import List\n\ndef top_10(user_ids: List[int]) -> List[int]:\n    # your code\n    pass\n\ndef frequent_5plus(user_ids: List[int]) -> List[int]:\n    # your code\n    pass\n',
          hint: 'Counter.most_common(10) for top 10. Iterate Counter items for frequency threshold.',
          solution: 'from collections import Counter\nfrom typing import List\n\ndef top_10(user_ids: List[int]) -> List[int]:\n    """Return 10 most common user IDs."""\n    counter = Counter(user_ids)\n    return [uid for uid, _ in counter.most_common(10)]\n\ndef frequent_5plus(user_ids: List[int]) -> List[int]:\n    """Return IDs appearing more than 5 times."""\n    counter = Counter(user_ids)\n    return [uid for uid, count in counter.items() if count > 5]\n\n# Test\nimport random\nids = [random.randint(1, 100) for _ in range(10000)]\nprint(top_10(ids))        # [42, 17, 88, ...] most common\nprint(frequent_5plus(ids))  # all IDs appearing > 5 times',
          solutionLanguage: 'python'
        },
        {
          prompt: 'Implement a function that takes two lists and returns items in list1 but not in list2, using set operations. Should be O(n) not O(n²).',
          starterCode: 'def difference(list1: list, list2: list) -> list:\n    # your code\n    pass\n',
          hint: 'Convert list2 to set, then use list comprehension with `not in`.',
          solution: 'def difference(list1: list, list2: list) -> list:\n    """Return items in list1 but not in list2. O(n) complexity."""\n    set2 = set(list2)  # O(m) build, O(1) lookup\n    return [item for item in list1 if item not in set2]  # O(n)\n\n# Test\nprint(difference([1, 2, 3, 4, 5], [2, 4, 6]))\n# [1, 3, 5]',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is the time complexity of `x in my_list` vs `x in my_set`?',
          options: [
            'Both O(1)',
            'Both O(n)',
            'list O(n), set O(1)',
            'list O(1), set O(n)',
          ],
          correctIndex: 2,
          explanation: 'List scans all elements O(n). Set uses hash table for O(1) lookup. For 1M items: list ~100ms, set ~0.0001ms.'
        },
        {
          question: 'When should you use a tuple instead of a list?',
          options: [
            'When you need to add items',
            'When the data is fixed/immutable and you need it hashable (e.g., as dict key)',
            'Never, lists are always better',
            'When you need to sort',
          ],
          correctIndex: 1,
          explanation: 'Tuples are immutable and hashable — use for fixed records (coordinates, RGB values) and as dict keys. Lists are mutable and not hashable.'
        },
        {
          question: 'What does defaultdict(int) do?',
          options: [
            'Creates a dict with only integer keys',
            'Creates a dict that auto-creates missing keys with default value 0',
            'Same as regular dict',
            'Creates a dict that only stores integers',
          ],
          correctIndex: 1,
          explanation: 'defaultdict(int) auto-creates missing keys with int() = 0. Perfect for counting: `counts[word] += 1` never raises KeyError.'
        },
        {
          question: 'Why use Counter instead of dict for counting?',
          options: [
            'Faster',
            'Provides .most_common() method and supports arithmetic (+, -, &, |)',
            'Uses less memory',
            'Required for counting',
          ],
          correctIndex: 1,
          explanation: 'Counter has most_common(n), supports + (combine counts), - (subtract), & (intersection), | (union). Much more convenient than plain dict.'
        },
      ],
      keyTakeaways: [
        'Sets give O(1) membership testing — use whenever you check `x in collection` often',
        'Dicts give O(1) lookup by key — index your data: {id: item}',
        'defaultdict avoids KeyError — perfect for grouping and counting',
        'Counter is the standard way to count things — use most_common()',
        'Tuples are immutable and hashable — use as dict keys and for fixed records',
        'Lists: O(1) append/pop, but O(n) insert(0)/pop(0) — use deque for queues',
        'Prefer dataclass over namedtuple for new code (more flexible)',
        'For large numerical data, use numpy arrays (10-100x faster than lists)',
      ],
      resources: [
        { title: 'Python Collections', url: 'https://docs.python.org/3/library/collections.html', type: 'docs' },
        { title: 'Time Complexity Wiki', url: 'https://wiki.python.org/moin/TimeComplexity', type: 'article', isHiddenGem: true },
        { title: 'Real Python — Lists and Tuples', url: 'https://realpython.com/python-lists-tuples/', type: 'article' },
        { title: 'Real Python — Dictionaries', url: 'https://realpython.com/python-dicts/', type: 'article' },
      ]
    },
  ]
};
