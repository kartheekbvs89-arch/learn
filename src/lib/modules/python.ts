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

    {
      id: 'py-04',
      title: 'Control Flow — if/elif/else, for, while, match-case, Comprehensions',
      subtitle: 'Master every control flow construct including pattern matching and comprehensions',
      duration: 65,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Control flow directs execution order. Python uses indentation (4 spaces) instead of braces. The constructs: if/elif/else, for, while, try/except, match-case (3.10+). Each has subtle behaviors senior engineers know.',
        'Python for loops iterate over iterables (lists, dicts, files, generators). Use enumerate() for index+value, zip() for parallel iteration, itertools for advanced patterns. The while loop supports an else clause that runs if no break occurred.',
        'Comprehensions are Pythonic shortcuts for creating collections: [expr for x in iter if cond] for lists, {k:v for ...} for dicts, {x for ...} for sets. Generator expressions (with parens) are lazy — they produce values one at a time, saving memory.',
        'match-case (Python 3.10+) brings structural pattern matching — far more powerful than C switch. It can destructure data, match types, use guards (with if), and capture variables.',
      ],
      codeExamples: [
        {
          filename: 'control_flow.py',
          language: 'python',
          code: '# === IF / ELIF / ELSE ===\nscore = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\n# Ternary (one-line conditional)\nstatus = "pass" if score >= 60 else "fail"\n\n# Walrus operator := (assign and test in one expression)\nif (n := len([1,2,3])) > 2:\n    print(f"List has {n} elements")\n\n# === FOR LOOPS ===\nfruits = ["apple", "banana", "cherry"]\n\n# Basic iteration\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate — index + value (USE THIS instead of range(len()))\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\n# zip — parallel iteration\nnames = ["Alice", "Bob", "Carol"]\nages = [25, 30, 35]\nfor name, age in zip(names, ages):\n    print(f"{name} is {age}")\n\n# zip_longest — fill missing with default\nfrom itertools import zip_longest\nfor a, b in zip_longest([1,2,3], [4,5], fillvalue=0):\n    print(a, b)  # (1,4) (2,5) (3,0)\n\n# range — numeric iteration\nfor i in range(5):        # 0,1,2,3,4\n    pass\nfor i in range(2, 10, 2): # 2,4,6,8 (start, stop, step)\n    pass\nfor i in range(10, 0, -1): # countdown 10..1\n    pass\n\n# Iterating dicts\nuser = {"name": "Alice", "age": 30}\nfor key in user:           # keys (default)\n    pass\nfor key, value in user.items():  # both\n    pass\nfor value in user.values():  # values only\n    pass\n\n# === WHILE LOOPS ===\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# while with else (runs if no break)\nwhile count < 10:\n    count += 1\n    if count == 7:\n        break  # else will NOT run\nelse:\n    print("completed normally")\n\n# === BREAK / CONTINUE ===\nfor n in range(10):\n    if n == 3:\n        continue  # skip this iteration\n    if n == 7:\n        break     # exit loop entirely\n    print(n)  # 0,1,2,4,5,6\n\n# Find pattern with for-else\ndef find_first_even(nums):\n    for n in nums:\n        if n % 2 == 0:\n            return n\n    else:  # only runs if loop completed without break/return\n        return None\n\n# === MATCH-CASE (Python 3.10+) ===\ndef handle_command(cmd):\n    match cmd.split():\n        case ["quit"]:\n            return "Goodbye"\n        case ["hello", name]:\n            return f"Hello, {name}!"\n        case ["echo", *words]:\n            return " ".join(words)\n        case ["add", a, b]:\n            return int(a) + int(b)\n        case _:\n            return "Unknown command"\n\nprint(handle_command("hello Alice"))  # Hello, Alice!\nprint(handle_command("echo hi there"))  # hi there\nprint(handle_command("add 5 3"))  # 8\n\n# Type matching\ndef process(value):\n    match value:\n        case int():\n            return f"Integer: {value}"\n        case str():\n            return f"String: {value!r}"\n        case [a, b]:\n            return f"Pair: {a}, {b}"\n        case {"type": "user", "name": name}:\n            return f"User {name}"\n        case _:\n            return "Unknown"',
          explanation: 'Use enumerate() and zip() instead of range(len()). for-else runs if no break. match-case (3.10+) supports destructuring, type matching, and guards.'
        },
        {
          filename: 'comprehensions.py',
          language: 'python',
          code: '# === LIST COMPREHENSIONS ===\nnums = range(1, 11)\n\n# Basic: transform each element\nsquares = [x ** 2 for x in nums]\n# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n\n# Filter\nevens = [x for x in nums if x % 2 == 0]\n# [2, 4, 6, 8, 10]\n\n# Transform + filter\nodd_squares = [x**2 for x in nums if x % 2 == 1]\n# [1, 9, 25, 49, 81]\n\n# Conditional expression (if-else in expression)\nlabels = ["even" if x % 2 == 0 else "odd" for x in nums]\n\n# Nested comprehension (flatten 2D)\nmatrix = [[1,2,3], [4,5,6], [7,8,9]]\nflat = [x for row in matrix for x in row]\n# [1,2,3,4,5,6,7,8,9]\n# Read as: for row in matrix: for x in row: yield x\n\n# With function calls\nwords = ["hello", "world", "python"]\nlengths = [len(w) for w in words]  # [5, 5, 6]\nuppers = [w.upper() for w in words]\n\n# === DICT COMPREHENSIONS ===\nsquares = {x: x**2 for x in range(1, 6)}\n# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\n# Invert a dict (swap keys/values)\noriginal = {"a": 1, "b": 2, "c": 3}\ninverted = {v: k for k, v in original.items()}\n# {1: \'a\', 2: \'b\', 3: \'c\'}\n\n# From two lists\nnames = ["Alice", "Bob", "Carol"]\nages = [25, 30, 35]\nusers = {name: age for name, age in zip(names, ages)}\n\n# === SET COMPREHENSIONS ===\nwords = ["apple", "banana", "cherry", "apple"]\nunique_lengths = {len(w) for w in words}  # {5, 6} (dedup!)\nfirst_letters = {w[0] for w in words}  # {\'a\', \'b\', \'c\'}\n\n# === GENERATOR EXPRESSIONS (lazy!) ===\n# Use () instead of [] — does NOT create list in memory\ngen = (x**2 for x in range(1000000))\nprint(next(gen))  # 0\nprint(next(gen))  # 1\n# Memory: KB instead of MB!\n\n# Common: pass to sum(), max(), min(), any(), all()\ntotal = sum(x**2 for x in range(101))  # 338350\nhas_negative = any(x < 0 for x in [1, 2, -3])  # True\nall_positive = all(x > 0 for x in [1, 2, 3])  # True\n\n# === REAL-WORLD EXAMPLES ===\n\n# Parse log file (lazy, memory efficient)\nfrom pathlib import Path\nerrors = [\n    line for line in Path("app.log").read_text().splitlines()\n    if "ERROR" in line\n]\n\n# Better — generator (does not load entire file):\nerrors = [\n    line for line in Path("app.log").open()\n    if "ERROR" in line\n]\n\n# Build lookup dict\nusers = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]\nby_id = {u["id"]: u for u in users}  # O(1) lookup!\n\n# Filter + transform pipeline\nresult = [\n    f"{u[\'name\'].upper()} ({u[\'age\']})"\n    for u in users\n    if u.get("age", 0) >= 18\n]\n\n# WARNING: do not overuse comprehensions!\n# This is unreadable:\n# result = [f(x) for x in [g(y) for y in items if h(y)] if f(x) > 0]\n# Use a regular for loop instead — clarity > cleverness',
          explanation: 'Comprehensions are Pythonic and faster than loops. Use generator expressions (parens) for large data — they are lazy. But do not overuse — readable for loops beat nested comprehensions.'
        },
      ],
      exercises: [
        {
          prompt: 'Use a dict comprehension to create a word frequency map from a sentence.',
          starterCode: 'sentence = "the cat sat on the mat the cat"\n# your code\n',
          hint: 'Split into words, then {word: count} using count() or Counter.',
          solution: 'from collections import Counter\n\nsentence = "the cat sat on the mat the cat"\nfreq = dict(Counter(sentence.split()))\nprint(freq)  # {\'the\': 3, \'cat\': 2, \'sat\': 1, \'on\': 1, \'mat\': 1}\n\n# Or without Counter:\nfreq = {word: sentence.split().count(word) for word in set(sentence.split())}\nprint(freq)',
          solutionLanguage: 'python'
        },
        {
          prompt: 'Use match-case to write a calculator that handles add, sub, mul, div operations.',
          starterCode: 'def calc(op, a, b):\n    match op:\n        # your cases\n        pass\n',
          hint: 'Match on op string, return result. Handle div by zero.',
          solution: 'def calc(op, a, b):\n    match op:\n        case "add":\n            return a + b\n        case "sub":\n            return a - b\n        case "mul":\n            return a * b\n        case "div" if b != 0:\n            return a / b\n        case "div":\n            return "Error: division by zero"\n        case _:\n            return f"Unknown operation: {op}"\n\nprint(calc("add", 5, 3))  # 8\nprint(calc("div", 10, 0))  # Error: division by zero',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When does the else clause of a for/while loop execute?',
          options: ['Never', 'Always', 'Only if loop completes without break', 'Only if break occurred'],
          correctIndex: 2,
          explanation: 'The else clause runs only if the loop completes normally (no break). Useful for search patterns — "if we did not find it, do X".'
        },
        {
          question: 'What is the difference between [x for x in range(10)] and (x for x in range(10))?',
          options: ['No difference', '[] creates a list, () creates a lazy generator', '() is faster', '[] is memory efficient'],
          correctIndex: 1,
          explanation: '[] creates a list in memory. () creates a generator — lazy, produces values one at a time. Use generators for large/infinite sequences.'
        },
        {
          question: 'What does match-case do better than if-elif-else?',
          options: ['Faster', 'Structural pattern matching — destructuring, type matching, guards', 'Less code', 'Nothing'],
          correctIndex: 1,
          explanation: 'match-case (3.10+) can destructure data ([a, b]), match types (int()), use guards (case x if x > 0), and capture variables. Much more powerful than if-elif.'
        },
      ],
      keyTakeaways: [
        'Use enumerate() instead of range(len()) — gives index + value',
        'Use zip() for parallel iteration over multiple lists',
        'for-else runs if no break occurred (useful for search)',
        'List/dict/set comprehensions are Pythonic and faster than loops',
        'Generator expressions (with parens) are lazy — use for large data',
        'match-case (3.10+) is powerful pattern matching, not just switch',
        'Walrus operator := assigns and tests in one expression',
        'Do not overuse comprehensions — readable for loops beat nested ones',
      ],
      resources: [
        { title: 'Python Control Flow', url: 'https://docs.python.org/3/tutorial/controlflow.html', type: 'docs' },
        { title: 'PEP 634 — match-case', url: 'https://peps.python.org/pep-0634/', type: 'article' },
        { title: 'Comprehensions Guide', url: 'https://realpython.com/list-comprehension-python/', type: 'article' },
      ]
    },

    {
      id: 'py-05',
      title: 'Functions Deep Dive — *args, **kwargs, Closures, Type Hints',
      subtitle: 'Master functions like a senior engineer — every parameter type, closures, type hints',
      duration: 70,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Functions are first-class objects in Python — they can be passed as arguments, returned from functions, assigned to variables. Define with `def`, use type hints for clarity (Python 3.5+). Every parameter type has a use case.',
        'Parameter types: positional (required), default values, *args (variable positional, collected as tuple), **kwargs (variable keyword, collected as dict), keyword-only (after *), positional-only (before /). Understanding the order is critical.',
        'Closures are functions that capture variables from their enclosing scope. They are the foundation of decorators. Use `nonlocal` to modify outer variables, `global` to modify module-level (avoid global — it is a code smell).',
        'Type hints document intent and enable static analysis with mypy. Basic types: int, str, list[int], dict[str, int]. Advanced: Optional[X] = X | None, Callable[[int], str], TypeVar for generics, Literal for specific values.',
      ],
      codeExamples: [
        {
          filename: 'functions.py',
          language: 'python',
          code: '# === FUNCTION BASICS WITH TYPE HINTS ===\n\ndef greet(name: str, greeting: str = "Hello") -> str:\n    """Return a greeting string.\n\n    Args:\n        name: The person to greet.\n        greeting: Custom greeting (default: "Hello").\n\n    Returns:\n        Formatted greeting string.\n    """\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))          # Hello, Alice!\nprint(greet("Bob", greeting="Hi"))  # keyword argument\n\n# === ALL PARAMETER TYPES ===\n\ndef example(\n    a,           # positional or keyword (required)\n    b,           # positional or keyword (required)\n    /,           # everything before / is POSITIONAL-ONLY\n    c=10,        # positional or keyword (optional)\n    *args,       # variadic positional (tuple)\n    keyword_only,# keyword-only (after *)\n    **kwargs     # variadic keyword (dict)\n):\n    print(f"a={a}, b={b}, c={c}")\n    print(f"args={args}")\n    print(f"keyword_only={keyword_only}")\n    print(f"kwargs={kwargs}")\n\nexample(1, 2, 3, 4, 5, keyword_only="x", extra="y")\n# a=1, b=2, c=3\n# args=(4, 5)\n# keyword_only=x\n# kwargs={\'extra\': \'y\'}\n\n# === *args — VARIABLE POSITIONAL ===\ndef sum_all(*args: int) -> int:\n    """Accept any number of integers, return sum."""\n    return sum(args)\n\nprint(sum_all(1, 2, 3))      # 6\nprint(sum_all(1, 2, 3, 4, 5))  # 15\n\n# === **kwargs — VARIABLE KEYWORD ===\ndef create_user(**kwargs):\n    """Create user from keyword args."""\n    defaults = {"active": True, "role": "user"}\n    defaults.update(kwargs)\n    return defaults\n\nuser = create_user(name="Alice", email="a@x.com", admin=True)\n# {\'active\': True, \'role\': \'user\', \'name\': \'Alice\', ...}\n\n# === ARGUMENT UNPACKING ===\ndef add(a, b, c):\n    return a + b + c\n\n# Unpack list/tuple with *\nnums = [1, 2, 3]\nprint(add(*nums))  # 6 — same as add(1, 2, 3)\n\n# Unpack dict with **\nconfig = {"a": 1, "b": 2, "c": 3}\nprint(add(**config))  # 6 — same as add(a=1, b=2, c=3)\n\n# === KEYWORD-ONLY ARGUMENTS (after *) ===\ndef fetch(url: str, *, timeout: int = 30, retries: int = 3):\n    # timeout and retries MUST be passed as keywords\n    # fetch("http://x.com", 30) — ERROR\n    # fetch("http://x.com", timeout=30) — OK\n    pass\n\n# === POSITIONAL-ONLY ARGUMENTS (before /) ===\ndef power(x, /, exponent=2):\n    # x MUST be positional, exponent can be either\n    # power(2, 3) — OK\n    # power(x=2, exponent=3) — ERROR (x is positional-only)\n    return x ** exponent\n\n# === MULTIPLE RETURN VALUES (returns tuple) ===\ndef min_max(numbers: list[int]) -> tuple[int, int]:\n    return min(numbers), max(numbers)\n\nlow, high = min_max([3, 1, 4, 1, 5, 9])\nprint(f"min={low}, max={high}")\n\n# === LAMBDA — anonymous function ===\n# Use for short, throwaway functions (sorting, filtering)\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n\n# Common: sort by key\nusers = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]\nusers.sort(key=lambda u: u["age"])  # sort by age\nusers.sort(key=lambda u: u["name"])  # sort by name\n\n# Common: map, filter (but comprehensions are more Pythonic)\nnums = [1, 2, 3, 4, 5]\nsquares = list(map(lambda x: x**2, nums))  # [1,4,9,16,25]\nevens = list(filter(lambda x: x%2==0, nums))  # [2,4]\n# PREFER: [x**2 for x in nums] and [x for x in nums if x%2==0]',
          explanation: 'Master parameter order: positional-only (/), regular, defaults, *args, keyword-only, **kwargs. Use * to force keyword args (cleaner API). Prefer comprehensions over map/filter.'
        },
        {
          filename: 'closures.py',
          language: 'python',
          code: '# === CLOSURES — functions that capture enclosing scope ===\n\ndef make_multiplier(factor: int):\n    """Return a function that multiplies by factor."""\n    def multiply(x: int) -> int:\n        return x * factor  # factor is captured from enclosing scope\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5))  # 10\nprint(triple(5))  # 15\n\n# Each closure has its own captured variable\ndouble2 = make_multiplier(2)\nprint(double is double2)  # False — different function objects\n\n# === COUNTER USING CLOSURE ===\ndef make_counter(start: int = 0):\n    count = start\n    def increment() -> int:\n        nonlocal count  # modify outer variable\n        count += 1\n        return count\n    return increment\n\ncounter = make_counter()\nprint(counter())  # 1\nprint(counter())  # 2\nprint(counter())  # 3\n\n# Each counter is independent\nother = make_counter(100)\nprint(other())  # 101\n\n# === FUNCTION FACTORY ===\ndef make_power(n: int):\n    """Create a power function: square, cube, etc."""\n    return lambda x: x ** n\n\nsquare = make_power(2)\ncube = make_power(3)\nprint(square(5))  # 25\nprint(cube(2))     # 8\n\n# === PRACTICAL: CONFIGURATION FACTORY ===\ndef make_db_connector(host: str, port: int):\n    """Factory that creates connections to a specific DB."""\n    def connect(database: str):\n        return f"Connected to {host}:{port}/{database}"\n    return connect\n\n# Configure once, use many times\nconnect_prod = make_db_connector("prod.db.com", 5432)\nconnect_dev = make_db_connector("localhost", 5432)\n\nprint(connect_prod("users"))  # Connected to prod.db.com:5432/users\nprint(connect_dev("test"))    # Connected to localhost:5432/test\n\n# === WHY USE CLOSURES? ===\n# 1. Encapsulation (hide state without classes)\n# 2. Function factories (create specialized functions)\n# 3. Decorators (next lesson)\n# 4. Callbacks (preserve context for async/event handlers)\n\n# === NONLOCAL VS GLOBAL ===\n\ncounter = 0  # module-level\n\ndef bad_increment():\n    global counter  # AVOID — global is a code smell\n    counter += 1\n\ndef make_good_counter():\n    count = 0\n    def increment():\n        nonlocal count  # BETTER — encapsulated state\n        count += 1\n        return count\n    return increment\n\n# Prefer closures (nonlocal) over global variables',
          explanation: 'Closures capture variables from enclosing scope. Use nonlocal to modify them. Closures enable encapsulation, function factories, and decorators. Avoid global — use closures or classes instead.'
        },
        {
          filename: 'type_hints.py',
          language: 'python',
          code: 'from typing import Optional, Union, Callable, TypeVar, Generic, overload, Literal\nfrom typing import Any, Iterable, Iterator, Sequence, Mapping\nfrom pathlib import Path\nfrom datetime import datetime\n\n# === BASIC TYPE HINTS ===\ndef greet(name: str, times: int = 1) -> str:\n    return f"Hello, {name}! " * times\n\n# === COLLECTION TYPES (Python 3.9+: use lowercase) ===\ndef process(items: list[int]) -> dict[str, list[int]]:\n    return {"evens": [x for x in items if x % 2 == 0]}\n\n# Before 3.9, use typing module:\n# from typing import List, Dict\n# def process(items: List[int]) -> Dict[str, List[int]]:\n\n# === OPTIONAL (X | None) ===\n# Python 3.10+: use | None\ndef find_user(user_id: int) -> dict | None:\n    if user_id == 1:\n        return {"id": 1, "name": "Alice"}\n    return None\n\n# Before 3.10: Optional[X] or Union[X, None]\n# def find_user(user_id: int) -> Optional[dict]:\n\n# === UNION (multiple types) ===\n# Python 3.10+: use |\ndef parse(value: int | str | float) -> str:\n    return str(value)\n\n# Before 3.10: Union[X, Y, Z]\n# def parse(value: Union[int, str, float]) -> str:\n\n# === CALLABLE (functions as arguments) ===\ndef apply(func: Callable[[int, int], int], a: int, b: int) -> int:\n    return func(a, b)\n\nprint(apply(lambda x, y: x + y, 5, 3))  # 8\n\n# Callable with no args: Callable[[], str]\n# Callable with any args: Callable[..., str]\n\n# === TYPEVAR — GENERIC FUNCTIONS ===\nT = TypeVar("T")\n\ndef first(items: list[T]) -> T:\n    """Return first element. T is inferred from input."""\n    return items[0]\n\nprint(first([1, 2, 3]))        # T = int\nprint(first(["a", "b", "c"]))  # T = str\n\n# TypeVar with constraints\nT = TypeVar("T", bound=int)  # T must be int or subclass\nT = TypeVar("T", int, str)   # T must be int or str\n\n# === GENERIC CLASS ===\nclass Stack(Generic[T]):\n    def __init__(self) -> None:\n        self._items: list[T] = []\n    def push(self, item: T) -> None:\n        self._items.append(item)\n    def pop(self) -> T:\n        return self._items.pop()\n\nstack: Stack[int] = Stack()\nstack.push(1)\n# stack.push("x")  # mypy error!\n\n# === LITERAL — specific values ===\ndef set_mode(mode: Literal["train", "eval", "test"]) -> None:\n    print(f"Mode: {mode}")\n\nset_mode("train")  # OK\n# set_mode("debug")  # mypy error!\n\n# === ANY — escape hatch (avoid if possible) ===\ndef legacy_function(data: Any) -> Any:\n    return data\n\n# === SEQUENCE, MAPPING, ITERABLE ===\ndef sum_all(nums: Iterable[int]) -> int:\n    return sum(nums)\n\ndef get_first(items: Sequence[T]) -> T:\n    return items[0]  # works for list, tuple, str, etc.\n\ndef lookup(key: str, mapping: Mapping[str, int]) -> int | None:\n    return mapping.get(key)\n\n# === OVERLOAD — multiple signatures ===\n@overload\ndef parse(value: int) -> int: ...\n@overload\ndef parse(value: str) -> str: ...\ndef parse(value):\n    return value\n\n# === TYPED DICT — dict with specific keys ===\nfrom typing import TypedDict\n\nclass UserDict(TypedDict):\n    name: str\n    age: int\n    email: str\n\nuser: UserDict = {"name": "Alice", "age": 30, "email": "a@x.com"}\n# mypy checks all keys are present and correct types!\n\n# === RUN TYPE CHECKING ===\n# Install: pip install mypy\n# Run: mypy src/\n# In pyproject.toml: [tool.mypy] strict = true',
          explanation: 'Type hints document intent and enable static analysis. Use list[int] (3.9+), X | None (3.10+), TypeVar for generics, Literal for specific values, TypedDict for structured dicts. Run mypy in CI to catch type errors.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a function make_logger(prefix: str) that returns a function which prints messages prefixed with the given prefix.',
          starterCode: 'def make_logger(prefix: str):\n    # your closure\n    pass\n',
          hint: 'Closure captures prefix. Inner function takes message and prints f"{prefix}: {message}".',
          solution: 'def make_logger(prefix: str):\n    def log(message: str) -> None:\n        print(f"{prefix}: {message}")\n    return log\n\ninfo = make_logger("INFO")\nerror = make_logger("ERROR")\n\ninfo("User logged in")    # INFO: User logged in\nerror("Database failed")  # ERROR: Database failed',
          solutionLanguage: 'python'
        },
        {
          prompt: 'Write a function with type hints: def group_by(items: list[dict], key: str) -> dict[str, list[dict]] that groups dicts by the value of a key.',
          starterCode: 'from collections import defaultdict\n\ndef group_by(items: list[dict], key: str) -> dict[str, list[dict]]:\n    # your code\n    pass\n',
          hint: 'Use defaultdict(list), iterate items, append to groups[item[key]].',
          solution: 'from collections import defaultdict\n\ndef group_by(items: list[dict], key: str) -> dict[str, list[dict]]:\n    groups: dict[str, list[dict]] = defaultdict(list)\n    for item in items:\n        groups[item[key]].append(item)\n    return dict(groups)\n\nusers = [\n    {"name": "Alice", "dept": "Eng"},\n    {"name": "Bob", "dept": "Sales"},\n    {"name": "Carol", "dept": "Eng"},\n]\nprint(group_by(users, "dept"))\n# {\'Eng\': [{\'name\': \'Alice\', ...}, {\'name\': \'Carol\', ...}], \'Sales\': [{\'name\': \'Bob\', ...}]}',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is the correct parameter order in a function?',
          options: [
            '*args, positional, defaults, **kwargs',
            'positional, defaults, *args, keyword-only, **kwargs',
            '**kwargs, *args, positional, defaults',
            'defaults, positional, *args, **kwargs',
          ],
          correctIndex: 1,
          explanation: 'Order: positional-only (/), regular, defaults, *args, keyword-only, **kwargs. Wrong order = SyntaxError.'
        },
        {
          question: 'What does **kwargs collect arguments as?',
          options: ['list', 'tuple', 'dict', 'set'],
          correctIndex: 2,
          explanation: '**kwargs collects keyword arguments into a dict. *args collects positional into a tuple.'
        },
        {
          question: 'What does nonlocal do?',
          options: [
            'Declares a global variable',
            'Allows modifying a variable from an enclosing (non-global) scope',
            'Makes a variable private',
            'Same as global',
          ],
          correctIndex: 1,
          explanation: 'nonlocal lets closures modify variables from their enclosing function scope. global modifies module-level (avoid).'
        },
        {
          question: 'Do type hints affect runtime performance?',
          options: [
            'Yes, they slow down code',
            'No, they are only for static analysis (mypy, IDE)',
            'Yes, they validate at runtime',
            'Only with from __future__ import annotations',
          ],
          correctIndex: 1,
          explanation: 'Type hints are NOT enforced at runtime. They are hints for static analyzers (mypy, pyright) and IDEs. No runtime cost.'
        },
      ],
      keyTakeaways: [
        'Functions are first-class objects — pass as args, return, assign',
        'Parameter order: positional (/), regular, defaults, *args, keyword-only, **kwargs',
        'Use * to force keyword args (cleaner API): def f(*, timeout=30)',
        'Closures capture enclosing scope — use nonlocal to modify',
        'Avoid global — use closures or classes for encapsulation',
        'Type hints document intent — list[int], X | None, Callable[[int], str]',
        'TypeVar for generics, Literal for specific values, TypedDict for structured dicts',
        'Run mypy in CI to catch type errors before runtime',
      ],
      resources: [
        { title: 'Python Functions', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', type: 'docs' },
        { title: 'Type Hints (PEP 484)', url: 'https://peps.python.org/pep-0484/', type: 'article' },
        { title: 'mypy Documentation', url: 'https://mypy.readthedocs.io/', type: 'docs' },
        { title: 'Real Python — Type Checking', url: 'https://realpython.com/python-type-checking/', type: 'article' },
      ]
    },

    {
      id: 'py-06',
      title: 'File I/O — pathlib, JSON, CSV, YAML, TOML',
      subtitle: 'Read/write files like a senior engineer — pathlib, all formats, streaming',
      duration: 60,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'File I/O is fundamental — every application reads config, logs, data. Python 3.4+ introduced pathlib which replaces os.path with an object-oriented, cross-platform API. Always use pathlib, never os.path.',
        'Always use `with open(...) as f:` (context manager) to ensure files close even on exceptions. Modes: "r" read, "w" write (truncate), "a" append, "x" exclusive create, "b" binary, "+" read+write. Always specify encoding="utf-8" for text files.',
        'JSON is the most common config/data format. Use json.dumps()/loads() for strings, json.dump()/load() for files. For CSV, use csv.DictReader/DictWriter. For YAML (configs), use PyYAML. For TOML (Python config), use tomllib (3.11+ built-in).',
        'For large files, NEVER load entirely into memory. Iterate line-by-line: `for line in file:` processes one line at a time. Use generators to build processing pipelines.',
      ],
      codeExamples: [
        {
          filename: 'pathlib.py',
          language: 'python',
          code: 'from pathlib import Path\nimport shutil\n\n# === CREATING PATHS (use / operator — cross-platform!) ===\np = Path.cwd()              # current working directory\nhome = Path.home()          # user home (~ on Unix, C:\\Users\\x on Windows)\ndocs = home / "Documents"   # join with /\nfile = docs / "notes.txt"   # / works on all platforms!\n\n# === PATH PROPERTIES ===\nprint(file.name)       # "notes.txt" — filename with extension\nprint(file.stem)       # "notes" — filename without extension\nprint(file.suffix)     # ".txt" — extension\nprint(file.suffixes)   # [".txt"] — all extensions\nprint(file.parent)     # parent directory\nprint(file.parents)    # all parents (iterator)\nprint(file.parts)      # (\'/\', \'home\', \'user\', \'Documents\', \'notes.txt\')\nprint(file.as_posix()) # forward-slash string\nprint(file.as_uri())   # file:///home/user/...\n\n# === EXISTENCE AND TYPE ===\nprint(file.exists())    # True/False\nprint(file.is_file())   # True if file\nprint(file.is_dir())    # True if directory\nprint(file.is_symlink())# True if symlink\n\n# === EASY FILE I/O ===\n# Write text (creates/overwrites)\nPath("output.txt").write_text("Hello!", encoding="utf-8")\n\n# Read text\ntext = Path("output.txt").read_text(encoding="utf-8")\n\n# Read/write bytes\nPath("image.png").write_bytes(binary_data)\ndata = Path("image.png").read_bytes()\n\n# Append (no direct method — use open)\nwith Path("log.txt").open("a") as f:\n    f.write("new entry\\n")\n\n# === DIRECTORY OPERATIONS ===\n# Create directory (and parents)\nPath("a/b/c").mkdir(parents=True, exist_ok=True)\n\n# List directory\nfor f in Path(".").iterdir():\n    print(f)\n\n# Glob patterns (non-recursive)\nfor py_file in Path(".").glob("*.py"):\n    print(py_file)\n\n# Recursive glob\nfor py_file in Path(".").rglob("*.py"):\n    print(py_file)\n\n# Find files modified in last 7 days\nimport time\nweek_ago = time.time() - 7 * 86400\nrecent = [p for p in Path(".").rglob("*.py") if p.stat().st_mtime > week_ago]\n\n# === FILE OPERATIONS ===\n# Rename/move\nPath("old.txt").rename("new.txt")\nPath("file.txt").replace(Path("backup") / "file.txt")  # overwrite if exists\n\n# Delete\nPath("file.txt").unlink()           # delete file (raises if missing)\nPath("file.txt").unlink(missing_ok=True)  # delete, no error if missing\nPath("empty_dir").rmdir()           # delete empty directory\nshutil.rmtree("non_empty_dir")      # delete non-empty directory\n\n# Copy\nshutil.copy("src.txt", "dst.txt")           # copy file\nshutil.copy2("src.txt", "dst.txt")          # copy + metadata\nshutil.copytree("src_dir", "dst_dir")       # copy directory tree\n\n# === STAT (file info) ===\nstat = Path("file.txt").stat()\nprint(stat.st_size)      # bytes\nprint(stat.st_mtime)     # modification time (epoch)\nprint(stat.st_mode)      # permissions\n\n# Convert epoch to datetime\nfrom datetime import datetime\nprint(datetime.fromtimestamp(stat.st_mtime))\n\n# === TEMP FILES ===\nimport tempfile\n\n# Temp file (auto-deleted when closed)\nwith tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:\n    f.write("temp data")\n    temp_path = Path(f.name)\n\n# Temp directory\nwith tempfile.TemporaryDirectory() as tmpdir:\n    tmp = Path(tmpdir)\n    (tmp / "file.txt").write_text("data")\n    # directory auto-deleted when block exits',
          explanation: 'pathlib is the modern way — use / to join paths (cross-platform), .read_text()/.write_text() for simple I/O, .glob()/.rglob() for finding files. Always specify encoding="utf-8".'
        },
        {
          filename: 'json_csv_yaml.py',
          language: 'python',
          code: '# === JSON ===\nimport json\n\n# Python dict/list <-> JSON string/file\nuser = {\n    "name": "Alice",\n    "age": 30,\n    "skills": ["Python", "ML"],\n    "active": True,\n    "balance": None,\n}\n\n# Serialize to string\njson_str = json.dumps(user, indent=2)\nprint(json_str)\n\n# Write to file\nwith open("user.json", "w") as f:\n    json.dump(user, f, indent=2)\n\n# Read from file\nwith open("user.json") as f:\n    loaded = json.load(f)\nprint(loaded["name"])  # Alice\n\n# Pretty print with sort\nprint(json.dumps(user, indent=2, sort_keys=True))\n\n# Custom serialization (e.g., datetime)\nfrom datetime import datetime, date\n\nclass CustomEncoder(json.JSONEncoder):\n    def default(self, obj):\n        if isinstance(obj, (datetime, date)):\n            return obj.isoformat()\n        if isinstance(obj, set):\n            return list(obj)\n        return super().default(obj)\n\ndata = {"time": datetime.now(), "tags": {"a", "b"}}\nprint(json.dumps(data, cls=CustomEncoder, indent=2, default=str))\n\n# === CSV ===\nimport csv\n\n# Write CSV\nrows = [\n    ["name", "age", "city"],\n    ["Alice", 30, "NYC"],\n    ["Bob", 25, "LA"],\n]\nwith open("users.csv", "w", newline="") as f:  # newline="" is IMPORTANT!\n    writer = csv.writer(f)\n    writer.writerows(rows)\n\n# Read CSV as dicts (uses header row)\nwith open("users.csv") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["name"], row["age"], row["city"])\n\n# Write CSV with DictWriter\nusers = [\n    {"name": "Carol", "age": 35, "city": "SF"},\n    {"name": "Dan", "age": 28, "city": "Boston"},\n]\nwith open("more.csv", "w", newline="") as f:\n    writer = csv.DictWriter(f, fieldnames=["name", "age", "city"])\n    writer.writeheader()  # write header row\n    writer.writerows(users)\n\n# === YAML (need: pip install pyyaml) ===\nimport yaml  # pip install pyyaml\n\nconfig = {\n    "database": {\n        "host": "localhost",\n        "port": 5432,\n        "name": "myapp",\n    },\n    "logging": {\n        "level": "INFO",\n        "file": "app.log",\n    },\n}\n\n# Write YAML\nwith open("config.yaml", "w") as f:\n    yaml.dump(config, f, default_flow_style=False)\n\n# Read YAML\nwith open("config.yaml") as f:\n    config = yaml.safe_load(f)  # safe_load, NOT load (security!)\n\nprint(config["database"]["host"])\n\n# === TOML (Python 3.11+ has tomllib built-in) ===\nimport tomllib  # Python 3.11+\n\n# Read TOML (cannot write with tomllib — use tomli_w for writing)\nwith open("pyproject.toml", "rb") as f:  # NOTE: binary mode!\n    config = tomllib.load(f)\n\nprint(config["project"]["name"])\nprint(config["project"]["dependencies"])\n\n# For Python < 3.11: pip install tomli (same API)\n# import tomli as tomllib',
          explanation: 'JSON for APIs, CSV for data exchange, YAML for configs (human-readable), TOML for Python project configs. Always use safe_load for YAML (security). tomllib is built-in for 3.11+.'
        },
        {
          filename: 'streaming.py',
          language: 'python',
          code: '# === STREAMING LARGE FILES (memory efficient) ===\n\n# BAD — loads entire file into memory\n# with open("huge.log") as f:\n#     lines = f.readlines()  # 10GB file = 10GB RAM!\n#     errors = [l for l in lines if "ERROR" in l]\n\n# GOOD — process line by line (constant memory)\nfrom pathlib import Path\n\ndef count_errors(log_path: Path) -> int:\n    """Count error lines in a log file — constant memory."""\n    count = 0\n    with log_path.open() as f:\n        for line in f:  # one line at a time, NOT loaded all at once\n            if "ERROR" in line:\n                count += 1\n    return count\n\n# === GENERATOR PIPELINE (lazy processing) ===\ndef read_lines(path: Path):\n    """Lazily yield lines from file."""\n    with path.open() as f:\n        yield from f\n\ndef filter_errors(lines):\n    """Yield only ERROR lines."""\n    for line in lines:\n        if "ERROR" in line:\n            yield line\n\ndef parse_log(line: str) -> dict:\n    """Parse a log line into dict."""\n    parts = line.split(" ", 3)\n    if len(parts) >= 4:\n        return {\n            "timestamp": parts[0] + " " + parts[1],\n            "level": parts[2],\n            "message": parts[3].strip(),\n        }\n    return {}\n\n# Pipeline — each stage is lazy, processes one item at a time\npipeline = (\n    parse_log(line)\n    for line in filter_errors(read_lines(Path("app.log")))\n)\n\n# Process without loading entire file\nfor entry in pipeline:\n    print(entry["level"], entry["message"])\n\n# === TAIL -F (follow file) ===\nimport time\n\ndef tail(path: Path):\n    """Like `tail -f` — yield new lines as they arrive."""\n    with path.open() as f:\n        # Seek to end\n        f.seek(0, 2)\n        while True:\n            line = f.readline()\n            if not line:\n                time.sleep(0.1)\n                continue\n            yield line\n\n# for line in tail(Path("app.log")):\n#     print(line, end="")\n\n# === READ LARGE JSON LINE BY LINE (JSONL format) ===\nimport json\n\ndef read_jsonl(path: Path):\n    """Read JSONL file (one JSON object per line)."""\n    with path.open() as f:\n        for line in f:\n            yield json.loads(line)\n\n# Each line is a separate JSON object\n# {"name": "Alice", "age": 30}\n# {"name": "Bob", "age": 25}\nfor user in read_jsonl(Path("users.jsonl")):\n    print(user["name"])\n\n# Write JSONL\nwith Path("output.jsonl").open("w") as f:\n    for user in users:\n        f.write(json.dumps(user) + "\\n")\n\n# === READ CSV IN CHUNKS (pandas) ===\n# import pandas as pd\n# for chunk in pd.read_csv("huge.csv", chunksize=10000):\n#     process(chunk)  # 10K rows at a time\n\n# === MEMORY-EFFICIENT FILE COPYING ===\ndef copy_file(src: Path, dst: Path, chunk_size: int = 8192):\n    """Copy file in chunks — constant memory."""\n    with src.open("rb") as fin, dst.open("wb") as fout:\n        while chunk := fin.read(chunk_size):  # walrus operator!\n            fout.write(chunk)\n\n# This uses ~8KB memory regardless of file size',
          explanation: 'For large files: iterate line-by-line, use generators for pipelines, never .readlines() on huge files. JSONL (one JSON per line) is great for streaming. Walrus operator := is perfect for read loops.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a function that reads a JSON file of users, filters adults (age >= 18), and writes them to a new JSON file.',
          starterCode: 'import json\nfrom pathlib import Path\n\ndef filter_adults(input_path: str, output_path: str) -> int:\n    # your code\n    pass\n',
          hint: 'Use Path.read_text(), json.loads(), list comprehension, json.dumps(), Path.write_text().',
          solution: 'import json\nfrom pathlib import Path\n\ndef filter_adults(input_path: str, output_path: str) -> int:\n    data = json.loads(Path(input_path).read_text(encoding="utf-8"))\n    adults = [u for u in data if u.get("age", 0) >= 18]\n    Path(output_path).write_text(\n        json.dumps(adults, indent=2),\n        encoding="utf-8",\n    )\n    return len(adults)\n\n# Usage:\n# Path("users.json").write_text(json.dumps([\n#     {"name": "Alice", "age": 30},\n#     {"name": "Bob", "age": 15},\n# ]))\n# count = filter_adults("users.json", "adults.json")\n# print(f"Wrote {count} adults")',
          solutionLanguage: 'python'
        },
        {
          prompt: 'Write a generator that yields log entries from a file (one dict per line), filtering by level.',
          starterCode: 'from pathlib import Path\nfrom typing import Iterator\n\ndef parse_logs(path: Path, level: str = "ERROR") -> Iterator[dict]:\n    # your code\n    pass\n',
          hint: 'yield from generator, split lines, check level, yield dict.',
          solution: 'from pathlib import Path\nfrom typing import Iterator\n\ndef parse_logs(path: Path, level: str = "ERROR") -> Iterator[dict]:\n    with path.open() as f:\n        for line in f:\n            parts = line.strip().split(" ", 3)\n            if len(parts) < 4:\n                continue\n            if parts[2] == level:\n                yield {\n                    "timestamp": f"{parts[0]} {parts[1]}",\n                    "level": parts[2],\n                    "message": parts[3],\n                }\n\n# Memory efficient — processes one line at a time\n# for entry in parse_logs(Path("app.log"), level="ERROR"):\n#     print(entry)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why use pathlib instead of os.path?',
          options: [
            'Faster',
            'Object-oriented, cross-platform, cleaner API with / operator',
            'Required by Python 3',
            'More features',
          ],
          correctIndex: 1,
          explanation: 'pathlib is OO, uses / for joining (works on all platforms), has .read_text()/.write_text() shortcuts, and .glob()/.rglob() built in. os.path is legacy.'
        },
        {
          question: 'Why use `with open(...)` instead of just open()?',
          options: [
            'Faster',
            'Auto-closes file even if exception occurs',
            'Required by Python',
            'Caches reads',
          ],
          correctIndex: 1,
          explanation: 'The with statement (context manager) ensures the file is closed even if an exception occurs. Without it, you might leak file handles.'
        },
        {
          question: 'Why use yaml.safe_load instead of yaml.load?',
          options: [
            'Faster',
            'Security — yaml.load can execute arbitrary Python code',
            'Better error messages',
            'No difference',
          ],
          correctIndex: 1,
          explanation: 'yaml.load() can execute arbitrary code (YAML !!python/object tags). ALWAYS use safe_load() for untrusted YAML. This is a real security vulnerability.'
        },
        {
          question: 'How to process a 10GB file without running out of memory?',
          options: [
            'Buy more RAM',
            'Read line by line: `for line in file:` (constant memory)',
            'Use multiprocessing',
            'Compress the file first',
          ],
          correctIndex: 1,
          explanation: 'Iterating `for line in file:` reads one line at a time — constant memory regardless of file size. Never use .read() or .readlines() on huge files.'
        },
      ],
      keyTakeaways: [
        'Use pathlib — never os.path. Use / to join paths (cross-platform)',
        'Always use `with open(...)` for automatic file closing',
        'Always specify encoding="utf-8" for text files',
        'JSON: dumps/load for strings, dump/load for files',
        'CSV: use newline="" and DictReader/DictWriter',
        'YAML: ALWAYS use safe_load() (security!)',
        'TOML: tomllib is built-in for Python 3.11+',
        'For large files: iterate line-by-line, use generators, never .readlines()',
      ],
      resources: [
        { title: 'pathlib Documentation', url: 'https://docs.python.org/3/library/pathlib.html', type: 'docs' },
        { title: 'json module', url: 'https://docs.python.org/3/library/json.html', type: 'docs' },
        { title: 'csv module', url: 'https://docs.python.org/3/library/csv.html', type: 'docs' },
        { title: 'Real Python — Read/Write Files', url: 'https://realpython.com/read-write-files-python/', type: 'article' },
      ]
    },

    {
      id: 'py-07',
      title: 'Error Handling — Exceptions, Custom Errors, Context Managers',
      subtitle: 'Handle errors like a senior engineer — EAFP, custom exceptions, context managers',
      duration: 60,
      difficulty: 'Intermediate',
      phase: 'Foundation',
      content: [
        'Python uses exceptions for error handling. The philosophy is EAFP: "Easier to Ask Forgiveness than Permission" — try the operation, catch the error, rather than checking first (LBYL: Look Before You Leap). This is more Pythonic and often faster.',
        'The try/except/else/finally construct: try (run risky code), except (handle specific errors), else (runs only if no exception), finally (always runs — cleanup). Always catch SPECIFIC exceptions, never bare `except:` which swallows everything including KeyboardInterrupt.',
        'Built-in exceptions form a hierarchy: BaseException > Exception > (ValueError, TypeError, RuntimeError, ...). Custom exceptions should inherit from Exception (not BaseException). Add context with `raise NewError from original` for chaining.',
        'Context managers (the `with` statement) ensure cleanup. Implement __enter__/__exit__ on a class, or use @contextlib.contextmanager on a generator. They handle exceptions in __exit__ — return True to suppress.',
      ],
      codeExamples: [
        {
          filename: 'exceptions.py',
          language: 'python',
          code: '# === TRY/EXCEPT/ELSE/FINALLY ===\ntry:\n    x = int(input("Enter number: "))\n    result = 10 / x\nexcept ValueError as e:\n    print(f"Not a valid number: {e}")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:  # catch-all (use sparingly!)\n    print(f"Unexpected error: {type(e).__name__}: {e}")\nelse:\n    # Runs ONLY if no exception occurred\n    print(f"Result: {result}")\nfinally:\n    # ALWAYS runs (even on exception/break/return)\n    print("Cleanup complete")\n\n# === EAFP vs LBYL ===\n\n# LBYL (Look Before You Leap) — NOT Pythonic\nif "key" in my_dict:\n    value = my_dict["key"]\nelse:\n    value = None\n\n# EAFP (Easier to Ask Forgiveness) — Pythonic!\ntry:\n    value = my_dict["key"]\nexcept KeyError:\n    value = None\n\n# EAFP is often FASTER when the common case succeeds\n# (no need to check, just try)\n\n# === CATCH MULTIPLE EXCEPTIONS ===\ntry:\n    value = int("abc")\nexcept (ValueError, TypeError) as e:\n    print(f"Conversion failed: {e}")\n\n# === RE-RAISING ===\ndef risky_operation():\n    try:\n        return 1 / 0\n    except ZeroDivisionError:\n        print("Logging the error...")\n        raise  # re-raise the same exception\n\n# === EXCEPTION CHAINING ===\ntry:\n    try:\n        d = {}\n        d["missing"]\n    except KeyError as e:\n        # Chain with `from` to preserve cause\n        raise RuntimeError("Configuration error") from e\nexcept RuntimeError as e:\n    print(f"Error: {e}")\n    print(f"Caused by: {e.__cause__}")  # the KeyError\n\n# === CUSTOM EXCEPTIONS ===\nclass AppError(Exception):\n    """Base exception for our application."""\n    pass\n\nclass ValidationError(AppError):\n    """Raised when input validation fails."""\n    def __init__(self, field: str, message: str):\n        self.field = field\n        self.message = message\n        super().__init__(f"{field}: {message}")\n\nclass InsufficientFunds(AppError):\n    """Raised when withdrawal exceeds balance."""\n    def __init__(self, balance: float, amount: float):\n        self.balance = balance\n        self.amount = amount\n        super().__init__(\n            f"Need ${amount:.2f}, have ${balance:.2f}, "\n            f"short ${amount - balance:.2f}"\n        )\n\n# Usage\ndef withdraw(balance: float, amount: float) -> float:\n    if amount <= 0:\n        raise ValidationError("amount", "Must be positive")\n    if amount > balance:\n        raise InsufficientFunds(balance, amount)\n    return balance - amount\n\ntry:\n    withdraw(50, 100)\nexcept InsufficientFunds as e:\n    print(e)            # Need $100.00, have $50.00, short $50.00\n    print(e.balance)    # 50.0\n    print(e.amount)     # 100.0\nexcept ValidationError as e:\n    print(f"Validation failed: {e.field}")\nexcept AppError as e:\n    # Catches any AppError subclass\n    print(f"App error: {e}")\n\n# === EXCEPTION HIERARCHY ===\n# BaseException\n# ├── SystemExit          (sys.exit())\n# ├── KeyboardInterrupt   (Ctrl+C)\n# ├── GeneratorExit\n# └── Exception\n#     ├── StopIteration\n#     ├── StopAsyncIteration\n#     ├── ArithmeticError\n#     │   ├── ZeroDivisionError\n#     │   └── OverflowError\n#     ├── LookupError\n#     │   ├── KeyError\n#     │   └── IndexError\n#     ├── OSError\n#     │   ├── FileNotFoundError\n#     │   ├── PermissionError\n#     │   └── ConnectionError\n#     ├── TypeError\n#     ├── ValueError\n#     │   └── UnicodeError\n#     ├── AttributeError\n#     ├── RuntimeError\n#     │   └── RecursionError\n#     └── ... many more\n\n# === NEVER catch BaseException or bare except ===\n# BAD:\n# except:  # swallows EVERYTHING including Ctrl+C!\n#     pass\n#\n# BAD:\n# except BaseException:  # same problem\n#     pass\n#\n# GOOD:\n# except Exception:  # catches all exceptions but not SystemExit/KeyboardInterrupt\n#     pass\n#\n# BEST:\n# except SpecificError:  # catch only what you handle\n#     pass',
          explanation: 'Use EAFP (try/except) over LBYL (if checks). Always catch specific exceptions. Custom exceptions inherit from Exception, add context with attributes. Use `raise from` to chain. Never bare except:.'
        },
        {
          filename: 'context_managers.py',
          language: 'python',
          code: 'import contextlib\nimport time\nimport logging\nfrom typing import Iterator\n\n# === CLASS-BASED CONTEXT MANAGER ===\nclass Timer:\n    """Context manager that measures execution time."""\n\n    def __init__(self, name: str = ""):\n        self.name = name\n\n    def __enter__(self) -> "Timer":\n        self.start = time.perf_counter()\n        return self  # value assigned to `as` variable\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.elapsed = time.perf_counter() - self.start\n        print(f"{self.name}: {self.elapsed:.4f}s")\n        # Return True to SUPPRESS exceptions\n        # Return False/None to PROPAGATE exceptions\n        return False\n\n# Usage\nwith Timer("sleep") as t:\n    time.sleep(0.5)\n# Output: sleep: 0.5003s\n\n# === SUPPRESSING EXCEPTIONS ===\nclass IgnoreErrors:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type is not None:\n            print(f"Suppressed: {exc_type.__name__}: {exc_val}")\n        return True  # suppress all exceptions\n\nwith IgnoreErrors():\n    raise ValueError("This will be suppressed")\nprint("Continued normally")\n\n# === GENERATOR-BASED (cleaner — use @contextmanager) ===\n@contextlib.contextmanager\ndef timer(name: str = "") -> Iterator[None]:\n    """Simpler timer using generator."""\n    start = time.perf_counter()\n    try:\n        yield  # code inside `with` block runs here\n    finally:\n        elapsed = time.perf_counter() - start\n        print(f"{name}: {elapsed:.4f}s")\n\nwith timer("operation"):\n    time.sleep(0.3)\n\n# === DATABASE SESSION CONTEXT MANAGER ===\n@contextlib.contextmanager\ndef db_session(connection_string: str):\n    """Manage database session — auto commit/rollback."""\n    print(f"Connecting to {connection_string}")\n    conn = {"connected": True, "queries": []}  # mock\n    try:\n        yield conn  # give connection to user\n        # If we get here, no exception — commit\n        print(f"Committing ({len(conn[\'queries\'])} queries)")\n    except Exception as e:\n        print(f"Rolling back due to: {e}")\n        raise\n    finally:\n        conn["connected"] = False\n        print("Connection closed")\n\nwith db_session("postgres://localhost") as db:\n    db["queries"].append("INSERT ...")\n    db["queries"].append("UPDATE ...")\n# Output:\n# Connecting to postgres://localhost\n# Committing (2 queries)\n# Connection closed\n\n# === FILE HANDLING (already a context manager) ===\nwith open("file.txt") as f:  # file objects are context managers\n    content = f.read()\n# file auto-closed\n\n# === MULTIPLE CONTEXT MANAGERS ===\nwith open("input.txt") as fin, open("output.txt", "w") as fout:\n    for line in fin:\n        fout.write(line.upper())\n\n# Python 3.10+ — better syntax with parens:\nwith (\n    open("input.txt") as fin,\n    open("output.txt", "w") as fout,\n    Timer("copy") as t,\n):\n    fout.write(fin.read())\n\n# === BUILT-IN CONTEXTLIB HELPERS ===\n\n# contextlib.suppress — ignore specific exceptions\nwith contextlib.suppress(FileNotFoundError):\n    open("/nonexistent")  # silently ignored\n\n# contextlib.redirect_stdout — capture prints\nimport io\nbuffer = io.StringIO()\nwith contextlib.redirect_stdout(buffer):\n    print("This goes to buffer, not console")\ncaptured = buffer.getvalue()\n\n# contextlib.redirect_stderr — same for stderr\n\n# contextlib.chdir — temporarily change directory (3.11+)\n# with contextlib.chdir("/tmp"):\n#     # now in /tmp\n#     pass\n# back to original dir\n\n# === NESTED CONTEXT MANAGERS ===\n@contextlib.contextmanager\ndef log_level(level: str):\n    """Temporarily set log level."""\n    logger = logging.getLogger()\n    old_level = logger.level\n    logger.setLevel(level)\n    try:\n        yield\n    finally:\n        logger.setLevel(old_level)\n\nwith log_level("DEBUG"):\n    logging.debug("This will show")\nlogging.debug("This will NOT show (back to WARNING)")',
          explanation: 'Context managers ensure cleanup. Use @contextlib.contextmanager with generators (cleaner than class-based). Use suppress() to ignore specific exceptions. Multiple context managers in one with statement.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a custom exception hierarchy: AppError (base), ValidationError, NotFoundError. Write a function get_user(user_id) that raises NotFoundError if user not found.',
          starterCode: 'class AppError(Exception):\n    pass\n\nclass ValidationError(AppError):\n    pass\n\nclass NotFoundError(AppError):\n    pass\n\ndef get_user(user_id: int) -> dict:\n    # your code\n    pass\n',
          hint: 'Check if user_id in users dict, raise NotFoundError with descriptive message.',
          solution: 'class AppError(Exception):\n    """Base exception for application."""\n    pass\n\nclass ValidationError(AppError):\n    """Raised when input validation fails."""\n    pass\n\nclass NotFoundError(AppError):\n    """Raised when resource is not found."""\n    def __init__(self, resource: str, id):\n        self.resource = resource\n        self.id = id\n        super().__init__(f"{resource} {id} not found")\n\nusers = {1: {"id": 1, "name": "Alice"}}\n\ndef get_user(user_id: int) -> dict:\n    if not isinstance(user_id, int) or user_id <= 0:\n        raise ValidationError("user_id must be positive integer")\n    if user_id not in users:\n        raise NotFoundError("User", user_id)\n    return users[user_id]\n\ntry:\n    user = get_user(99)\nexcept NotFoundError as e:\n    print(e)  # User 99 not found\nexcept ValidationError as e:\n    print(f"Invalid input: {e}")\nexcept AppError as e:\n    print(f"App error: {e}")',
          solutionLanguage: 'python'
        },
        {
          prompt: 'Write a context manager @contextmanager that temporarily changes the working directory and restores it after.',
          starterCode: 'import contextlib\nimport os\nfrom pathlib import Path\n\n@contextlib.contextmanager\ndef chdir(path):\n    # your code\n    pass\n',
          hint: 'Save os.getcwd(), os.chdir(path), yield, finally os.chdir back.',
          solution: 'import contextlib\nimport os\nfrom pathlib import Path\nfrom typing import Iterator\n\n@contextlib.contextmanager\ndef chdir(path: Path | str) -> Iterator[None]:\n    """Temporarily change working directory."""\n    old = Path.cwd()\n    os.chdir(path)\n    try:\n        yield\n    finally:\n        os.chdir(old)\n\n# Usage:\nwith chdir("/tmp"):\n    print(Path.cwd())  # /tmp\n    Path("file.txt").write_text("hi")\nprint(Path.cwd())  # back to original\n# /tmp/file.txt was created',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does the else clause of try/except do?',
          options: [
            'Always runs',
            'Runs only if NO exception occurred in try',
            'Runs only if exception occurred',
            'Same as finally',
          ],
          correctIndex: 1,
          explanation: 'else runs only if no exception was raised. Useful for code that should only run on success — separates the happy path from error handling.'
        },
        {
          question: 'Why avoid bare `except:` (without specifying exception type)?',
          options: [
            'It is slower',
            'It swallows ALL exceptions including KeyboardInterrupt and SystemExit',
            'It is deprecated',
            'No reason',
          ],
          correctIndex: 1,
          explanation: 'Bare except: catches everything including Ctrl+C (KeyboardInterrupt) and sys.exit() (SystemExit). Use `except Exception:` at most, or better, catch specific exceptions.'
        },
        {
          question: 'What should custom exceptions inherit from?',
          options: ['BaseException', 'Exception', 'Error', 'object'],
          correctIndex: 1,
          explanation: 'Inherit from Exception (or a subclass like ValueError). BaseException includes system-exiting exceptions that should not be caught normally.'
        },
        {
          question: 'How to suppress an exception in __exit__?',
          options: [
            'Return False',
            'Return True',
            'Re-raise it',
            'Call sys.exit()',
          ],
          correctIndex: 1,
          explanation: '__exit__ returning True suppresses the exception. Returning False or None propagates it. Use sparingly — usually you want exceptions to propagate.'
        },
      ],
      keyTakeaways: [
        'Use EAFP (try/except) over LBYL (if checks) — more Pythonic, often faster',
        'Always catch SPECIFIC exceptions, never bare except:',
        'try/except/else/finally: else runs on success, finally always runs',
        'Custom exceptions inherit from Exception, add attributes for context',
        'Use `raise NewError from original` to chain exceptions with cause',
        'Context managers (with statement) ensure cleanup — use @contextlib.contextmanager',
        'contextlib.suppress() ignores specific exceptions cleanly',
        'Multiple context managers: `with A() as a, B() as b:`',
      ],
      resources: [
        { title: 'Python Errors and Exceptions', url: 'https://docs.python.org/3/tutorial/errors.html', type: 'docs' },
        { title: 'contextlib module', url: 'https://docs.python.org/3/library/contextlib.html', type: 'docs' },
        { title: 'Real Python — Exceptions', url: 'https://realpython.com/python-exceptions/', type: 'article' },
      ]
    },

    {
      id: 'py-08',
      title: 'OOP — Classes, Inheritance, Magic Methods, Properties, Dataclasses',
      subtitle: 'Master object-oriented Python — classes, inheritance, dunder methods, dataclasses',
      duration: 90,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Python is multi-paradigm but deeply supports OOP. Classes group data and behavior. The __init__ method is the constructor. All instance methods take `self` as first parameter (the instance). Class attributes are shared, instance attributes are per-object.',
        'Inheritance: a class can inherit from one or more parents. Use super() to call parent methods. Method Resolution Order (MRO) determines which method runs when there are conflicts. Python supports multiple inheritance via C3 linearization.',
        'Magic methods (dunder methods) integrate your class with Python syntax: __str__ (print), __repr__ (debug), __len__ (len()), __eq__ (==), __lt__ (<), __add__ (+), __getitem__ (x[i]), __iter__ (for x in obj), __enter__/__exit__ (with statement), __call__ (obj()).',
        'The @property decorator turns methods into managed attributes. @dataclass (Python 3.7+) auto-generates __init__, __repr__, __eq__ for data containers. Use ABC (abstract base class) for interfaces.',
      ],
      codeExamples: [
        {
          filename: 'oop_basics.py',
          language: 'python',
          code: 'from __future__ import annotations\nfrom typing import Optional\n\nclass Dog:\n    """A simple Dog class."""\n\n    # Class attribute — shared by ALL instances\n    species = "Canis familiaris"\n    _count = 0  # "protected" (convention only)\n\n    def __init__(self, name: str, age: int):\n        # Instance attributes — unique per instance\n        self.name = name\n        self.age = age\n        self._tricks: list[str] = []  # "protected"\n        Dog._count += 1\n\n    # Instance method\n    def bark(self) -> str:\n        return f"{self.name} says Woof!"\n\n    # Add a trick\n    def learn(self, trick: str) -> None:\n        self._tricks.append(trick)\n\n    # __str__ — human-readable (print, str())\n    def __str__(self) -> str:\n        return f"Dog(name={self.name!r}, age={self.age})"\n\n    # __repr__ — developer representation (repr(), debugging)\n    # Goal: should be valid Python that recreates the object\n    def __repr__(self) -> str:\n        return f"Dog(name={self.name!r}, age={self.age})"\n\n    # __eq__ for equality comparison (==)\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Dog):\n            return NotImplemented\n        return self.name == other.name and self.age == other.age\n\n    # __hash__ — needed if you want to use Dog as dict key\n    # (must implement if you implement __eq__)\n    def __hash__(self) -> int:\n        return hash((self.name, self.age))\n\n    # __lt__ for sorting (<)\n    def __lt__(self, other: "Dog") -> bool:\n        return self.age < other.age\n\n    # Class method — alternative constructor\n    @classmethod\n    def from_dict(cls, data: dict) -> "Dog":\n        return cls(name=data["name"], age=data["age"])\n\n    # Class method — access class state\n    @classmethod\n    def get_count(cls) -> int:\n        return cls._count\n\n    # Static method — no access to self or cls\n    @staticmethod\n    def is_valid_name(name: str) -> bool:\n        return len(name) >= 2 and name.isalpha()\n\n# Create instances\nrex = Dog("Rex", 5)\nbuddy = Dog("Buddy", 3)\n\nprint(rex.bark())      # Rex says Woof!\nprint(rex)             # Dog(name=\'Rex\', age=5) — uses __str__\nprint(repr(rex))       # Dog(name=\'Rex\', age=5) — uses __repr__\nprint(rex == Dog("Rex", 5))  # True — uses __eq__\nprint(rex > buddy)     # True — uses __lt__ (rex is older)\n\n# Class attribute is shared\nprint(rex.species)     # Canis familiaris\nprint(Dog.species)     # Canis familiaris (access via class)\n\n# Class method (alternative constructor)\ndog = Dog.from_dict({"name": "Max", "age": 4})\nprint(dog)  # Dog(name=\'Max\', age=4)\n\n# Static method\nprint(Dog.is_valid_name("Rex"))   # True\nprint(Dog.is_valid_name("R"))     # False (too short)\n\n# Sort dogs by age\ndogs = [Dog("Rex", 5), Dog("Buddy", 3), Dog("Max", 7)]\ndogs.sort()  # uses __lt__\nfor d in dogs:\n    print(d.name, d.age)  # Buddy 3, Rex 5, Max 7',
          explanation: 'Classes group data + behavior. Use __init__ for construction, __str__ for users, __repr__ for developers. Implement __eq__/__lt__ for comparisons. @classmethod for alternative constructors, @staticmethod for utility functions.'
        },
        {
          filename: 'inheritance.py',
          language: 'python',
          code: 'from abc import ABC, abstractmethod\nfrom typing import override\n\nclass Animal(ABC):\n    """Abstract base class — cannot be instantiated directly."""\n\n    def __init__(self, name: str, age: int):\n        self.name = name\n        self.age = age\n\n    @abstractmethod\n    def sound(self) -> str:\n        """Each animal must implement this."""\n        ...\n\n    @abstractmethod\n    def diet(self) -> str:\n        ...\n\n    # Concrete method — inherited as-is\n    def describe(self) -> str:\n        return f"{self.name} is {self.age} years old, says {self.sound()}"\n\nclass Dog(Animal):\n    def __init__(self, name: str, age: int, breed: str):\n        super().__init__(name, age)  # call parent constructor\n        self.breed = breed\n\n    @override  # Python 3.12+ — verifies this overrides parent\n    def sound(self) -> str:\n        return "Woof"\n\n    @override\n    def diet(self) -> str:\n        return "Omnivore"\n\n    # Add new method\n    def fetch(self) -> str:\n        return f"{self.name} fetches the ball!"\n\nclass Cat(Animal):\n    @override\n    def sound(self) -> str:\n        return "Meow"\n\n    @override\n    def diet(self) -> str:\n        return "Carnivore"\n\n# animal = Animal("x", 1)  # TypeError — cannot instantiate ABC\ndog = Dog("Rex", 5, "Labrador")\ncat = Cat("Whiskers", 3)\n\nprint(dog.describe())  # Rex is 5 years old, says Woof\nprint(cat.describe())  # Whiskers is 3 years old, says Meow\nprint(dog.fetch())     # Rex fetches the ball!\n\n# Polymorphism — same interface, different behavior\nanimals: list[Animal] = [dog, cat]\nfor animal in animals:\n    print(f"{animal.name}: {animal.sound()}")  # each makes own sound\n\n# === MULTIPLE INHERITANCE ===\nclass Swimmer:\n    def swim(self) -> str:\n        return f"{self.name} swims"\n\nclass Flyer:\n    def fly(self) -> str:\n        return f"{self.name} flies"\n\nclass Duck(Animal, Swimmer, Flyer):\n    @override\n    def sound(self) -> str:\n        return "Quack"\n\n    @override\n    def diet(self) -> str:\n        return "Omnivore"\n\nduck = Duck("Donald", 5)\nprint(duck.sound())  # Quack\nprint(duck.swim())   # Donald swims\nprint(duck.fly())    # Donald flies\n\n# MRO — Method Resolution Order\nprint(Duck.__mro__)\n# (Duck, Animal, Swimmer, Flyer, object)\n# Python uses C3 linearization to determine order\n\n# === COMPOSITION OVER INHERITANCE ===\n# "Favor composition over inheritance" — Gang of Four\n\nclass Engine:\n    def start(self) -> str:\n        return "Engine started"\n\nclass Wheels:\n    def roll(self) -> str:\n        return "Wheels rolling"\n\nclass Car:\n    """Car HAS-A engine and wheels (composition)."""\n    def __init__(self):\n        self.engine = Engine()  # compose, do not inherit\n        self.wheels = Wheels()\n\n    def drive(self) -> str:\n        return f"{self.engine.start()}, {self.wheels.roll()}"\n\ncar = Car()\nprint(car.drive())  # Engine started, Wheels rolling\n\n# Composition is more flexible:\n# - Can swap components at runtime\n# - No deep inheritance hierarchies\n# - Easier to test (mock components)',
          explanation: 'Use ABC for interfaces (cannot instantiate, must implement abstract methods). Multiple inheritance works but prefer composition (HAS-A) over inheritance (IS-A). @override (3.12+) verifies method overrides.'
        },
        {
          filename: 'magic_methods.py',
          language: 'python',
          code: 'from typing import Iterator\nimport math\n\n# === MAKE YOUR CLASS BEHAVE LIKE A BUILT-IN ===\n\nclass Vector:\n    """A 2D vector that supports math operations like a built-in."""\n\n    def __init__(self, x: float, y: float):\n        self.x = x\n        self.y = y\n\n    # String representations\n    def __str__(self) -> str:\n        return f"({self.x}, {self.y})"\n\n    def __repr__(self) -> str:\n        return f"Vector({self.x}, {self.y})"\n\n    # Math operations\n    def __add__(self, other: "Vector") -> "Vector":\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __sub__(self, other: "Vector") -> "Vector":\n        return Vector(self.x - other.x, self.y - other.y)\n\n    def __mul__(self, scalar: float) -> "Vector":\n        return Vector(self.x * scalar, self.y * scalar)\n\n    # Reverse multiplication (scalar * vector)\n    def __rmul__(self, scalar: float) -> "Vector":\n        return self.__mul__(scalar)\n\n    # Equality\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Vector):\n            return NotImplemented\n        return self.x == other.x and self.y == other.y\n\n    def __hash__(self) -> int:\n        return hash((self.x, self.y))\n\n    # Comparison\n    def __lt__(self, other: "Vector") -> bool:\n        return self.magnitude() < other.magnitude()\n\n    # Length (magnitude)\n    def __abs__(self) -> float:\n        return self.magnitude()\n\n    def magnitude(self) -> float:\n        return math.sqrt(self.x ** 2 + self.y ** 2)\n\n    # Make it callable\n    def __call__(self, scalar: float) -> "Vector":\n        """Scale vector when called."""\n        return self * scalar\n\n    # Make it iterable\n    def __iter__(self) -> Iterator[float]:\n        yield self.x\n        yield self.y\n\n    # Indexing\n    def __getitem__(self, index: int) -> float:\n        if index == 0:\n            return self.x\n        elif index == 1:\n            return self.y\n        raise IndexError("Vector index out of range")\n\n    # Boolean context\n    def __bool__(self) -> bool:\n        return self.magnitude() > 0\n\nv1 = Vector(3, 4)\nv2 = Vector(1, 2)\n\nprint(v1)              # (3.0, 4.0) — __str__\nprint(repr(v1))        # Vector(3.0, 4.0) — __repr__\nprint(v1 + v2)         # (4.0, 6.0) — __add__\nprint(v1 - v2)         # (2.0, 2.0) — __sub__\nprint(v1 * 2)          # (6.0, 8.0) — __mul__\nprint(2 * v1)          # (6.0, 8.0) — __rmul__\nprint(v1 == Vector(3, 4))  # True — __eq__\nprint(abs(v1))         # 5.0 — __abs__\nprint(v1(2))           # (6.0, 8.0) — __call__\nprint(list(v1))        # [3.0, 4.0] — __iter__\nprint(v1[0])           # 3.0 — __getitem__\nprint(bool(v1))        # True — __bool__\nprint(bool(Vector(0, 0)))  # False\n\n# Sort vectors by magnitude\nvectors = [Vector(1, 1), Vector(3, 4), Vector(0, 1)]\nvectors.sort()  # uses __lt__\nfor v in vectors:\n    print(v, abs(v))\n\n# === CONTAINER-LIKE CLASS ===\n\nclass Stack:\n    """A stack that behaves like a built-in collection."""\n\n    def __init__(self, items=None):\n        self._items = list(items) if items else []\n\n    def push(self, item) -> None:\n        self._items.append(item)\n\n    def pop(self):\n        return self._items.pop()\n\n    def __len__(self) -> int:           # len(stack)\n        return len(self._items)\n\n    def __getitem__(self, idx):         # stack[0]\n        return self._items[idx]\n\n    def __contains__(self, item) -> bool:  # item in stack\n        return item in self._items\n\n    def __iter__(self) -> Iterator:     # for item in stack\n        return iter(self._items)\n\n    def __add__(self, other: "Stack") -> "Stack":  # stack1 + stack2\n        return Stack(self._items + other._items)\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Stack):\n            return NotImplemented\n        return self._items == other._items\n\n    def __str__(self) -> str:\n        return f"Stack({self._items})"\n\n    def __repr__(self) -> str:\n        return f"Stack({self._items!r})"\n\n    # Context manager support\n    def __enter__(self) -> "Stack":\n        return self\n\n    def __exit__(self, *exc):\n        self._items.clear()\n\ns = Stack([1, 2, 3])\nprint(len(s))        # 3 — __len__\nprint(s[0])          # 1 — __getitem__\nprint(2 in s)        # True — __contains__\nfor x in s:          # __iter__\n    print(x)\nprint(s + Stack([4, 5]))  # Stack([1, 2, 3, 4, 5]) — __add__\n\nwith Stack([1, 2]) as s2:  # __enter__/__exit__\n    print(s2)\n# After with: stack cleared',
          explanation: 'Magic methods make your classes behave like built-ins. Implement __len__/__getitem__/__iter__/__contains__ for containers, __add__/__sub__/__mul__ for math, __enter__/__exit__ for context managers, __call__ for callable objects.'
        },
        {
          filename: 'properties_dataclasses.py',
          language: 'python',
          code: 'from dataclasses import dataclass, field\nfrom typing import List, Optional\nfrom datetime import datetime\n\n# === @property — MANAGED ATTRIBUTES ===\n\nclass Temperature:\n    """Temperature with validation and computed properties."""\n\n    def __init__(self, celsius: float):\n        # Use private attribute, expose via property\n        self._celsius = celsius  # calls the setter!\n\n    @property\n    def celsius(self) -> float:\n        """Get temperature in Celsius."""\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value: float) -> None:\n        """Set temperature with validation."""\n        if value < -273.15:\n            raise ValueError(f"Below absolute zero: {value}")\n        self._celsius = value\n\n    # Computed property (no setter = read-only)\n    @property\n    def fahrenheit(self) -> float:\n        return self._celsius * 9/5 + 32\n\n    @fahrenheit.setter\n    def fahrenheit(self, value: float) -> None:\n        self.celsius = (value - 32) * 5/9  # uses celsius setter\n\n    @property\n    def kelvin(self) -> float:\n        return self._celsius + 273.15\n\n    def __str__(self) -> str:\n        return f"{self._celsius:.1f}°C ({self.fahrenheit:.1f}°F)"\n\ntemp = Temperature(25)\nprint(temp.celsius)      # 25.0 — uses getter\nprint(temp.fahrenheit)   # 77.0 — computed property\nprint(temp.kelvin)       # 298.15\n\ntemp.fahrenheit = 100    # uses fahrenheit setter → celsius setter\nprint(temp.celsius)      # 37.78...\n\ntry:\n    temp.celsius = -300   # ValueError — below absolute zero\nexcept ValueError as e:\n    print(e)\n\n# === READ-ONLY PROPERTY ===\nclass Circle:\n    def __init__(self, radius: float):\n        self._radius = radius\n\n    @property\n    def radius(self) -> float:\n        return self._radius\n\n    # NO setter — radius is read-only!\n\n    @property\n    def area(self) -> float:\n        return 3.14159 * self._radius ** 2\n\n    @property\n    def circumference(self) -> float:\n        return 2 * 3.14159 * self._radius\n\nc = Circle(5)\nprint(c.area)         # 78.54\nprint(c.circumference)  # 31.42\n# c.radius = 10  # AttributeError — no setter!\n\n# === @DATACLASS — AUTO-GENERATE BOILERPLATE ===\n\n@dataclass\nclass User:\n    """Data class — auto-generates __init__, __repr__, __eq__."""\n    name: str\n    age: int\n    email: str = ""  # default\n    tags: List[str] = field(default_factory=list)  # mutable default!\n\nuser1 = User("Alice", 30)\nuser2 = User("Alice", 30)\nprint(user1)            # User(name=\'Alice\', age=30, email=\'\', tags=[])\nprint(user1 == user2)   # True — auto-generated __eq__\n\n# Frozen (immutable) — like a tuple but with named fields\n@dataclass(frozen=True)\nclass Point:\n    x: float\n    y: float\n\np = Point(1.0, 2.0)\n# p.x = 5  # FrozenInstanceError!\nprint(hash(p))  # hashable (can be dict key)\n\n# With slots (saves memory, faster attribute access)\n@dataclass(slots=True)\nclass Pixel:\n    r: int\n    g: int\n    b: int\n\n# === DATACLASS WITH VALIDATION ===\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    quantity: int = 0\n\n    def __post_init__(self):\n        """Called after __init__ — use for validation."""\n        if self.price < 0:\n            raise ValueError("Price must be non-negative")\n        if self.quantity < 0:\n            raise ValueError("Quantity must be non-negative")\n\n    @property\n    def total_value(self) -> float:\n        return self.price * self.quantity\n\n    def __str__(self) -> str:\n        return f"{self.name}: ${self.price:.2f} x {self.quantity} = ${self.total_value:.2f}"\n\nproduct = Product("Widget", 9.99, 100)\nprint(product)  # Widget: $9.99 x 100 = $999.00\n\n# === NESTED DATACLASSES ===\n\n@dataclass\nclass Address:\n    street: str\n    city: str\n    zip_code: str\n\n@dataclass\nclass Employee:\n    name: str\n    age: int\n    address: Address\n    salary: float = 0.0\n\nemp = Employee(\n    name="Alice",\n    age=30,\n    address=Address("123 Main St", "NYC", "10001"),\n    salary=75000,\n)\nprint(emp.address.city)  # NYC\n\n# === CONVERT DATACLASS TO/FROM DICT ===\nfrom dataclasses import asdict, astuple\n\nprint(asdict(emp))  # nested dict\nprint(astuple(emp))  # tuple',
          explanation: '@property creates managed attributes (validation, computed values, read-only). @dataclass auto-generates __init__/__repr__/__eq__. Use field(default_factory=...) for mutable defaults, __post_init__ for validation, frozen=True for immutability.'
        },
      ],
      lab: {
        title: 'Build a Bank Account System with OOP',
        objective: 'Apply all OOP concepts — classes, inheritance, magic methods, properties, dataclasses',
        estTime: '90 minutes',
        difficulty: 'Intermediate',
        setup: [
          'Create file: bank.py',
          'No external dependencies',
        ],
        steps: [
          {
            title: 'Step 1: Create Account base class with properties',
            instruction: 'Account with balance (read-only property), deposit, withdraw methods',
            code: 'from abc import ABC, abstractmethod\nfrom dataclasses import dataclass, field\nfrom datetime import datetime\nfrom typing import Optional\n\nclass InsufficientFundsError(Exception):\n    def __init__(self, balance: float, amount: float):\n        self.balance = balance\n        self.amount = amount\n        super().__init__(\n            f"Need ${amount:.2f}, have ${balance:.2f}"\n        )\n\nclass Account(ABC):\n    """Abstract bank account."""\n\n    def __init__(self, owner: str, initial_balance: float = 0):\n        self.owner = owner\n        self._balance = initial_balance\n        self._transactions: list[dict] = []\n        self._created_at = datetime.now()\n\n    @property\n    def balance(self) -> float:\n        """Read-only balance — can only change via deposit/withdraw."""\n        return self._balance\n\n    @property\n    def account_number(self) -> str:\n        return self._account_number\n\n    def deposit(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError("Deposit must be positive")\n        self._balance += amount\n        self._log_transaction("deposit", amount)\n\n    def withdraw(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError("Withdrawal must be positive")\n        if amount > self._balance:\n            raise InsufficientFundsError(self._balance, amount)\n        self._balance -= amount\n        self._log_transaction("withdraw", amount)\n\n    def _log_transaction(self, type: str, amount: float) -> None:\n        self._transactions.append({\n            "type": type,\n            "amount": amount,\n            "balance_after": self._balance,\n            "timestamp": datetime.now(),\n        })\n\n    @abstractmethod\n    def account_type(self) -> str:\n        ...\n\n    def __str__(self) -> str:\n        return f"{self.account_type()}({self.owner}, balance=${self._balance:.2f})"\n\n    def __repr__(self) -> str:\n        return f"{self.__class__.__name__}(owner={self.owner!r}, balance={self._balance})"\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Account):\n            return NotImplemented\n        return self.account_number == other.account_number\n\n    def __len__(self) -> int:\n        return len(self._transactions)\n\n    def __iter__(self):\n        return iter(self._transactions)',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Create CheckingAccount and SavingsAccount subclasses',
            instruction: 'Different account types with different rules',
            code: 'class CheckingAccount(Account):\n    """Checking account with overdraft protection."""\n\n    def __init__(self, owner: str, initial_balance: float = 0, overdraft_limit: float = 100):\n        super().__init__(owner, initial_balance)\n        self._overdraft_limit = overdraft_limit\n        self._account_number = f"CHK-{id(self)}"\n\n    def account_type(self) -> str:\n        return "Checking"\n\n    def withdraw(self, amount: float) -> None:\n        # Override to allow overdraft\n        if amount <= 0:\n            raise ValueError("Withdrawal must be positive")\n        if amount > self._balance + self._overdraft_limit:\n            raise InsufficientFundsError(self._balance + self._overdraft_limit, amount)\n        self._balance -= amount\n        self._log_transaction("withdraw", amount)\n\nclass SavingsAccount(Account):\n    """Savings account with interest."""\n\n    INTEREST_RATE = 0.04  # 4% annual\n\n    def __init__(self, owner: str, initial_balance: float = 0):\n        super().__init__(owner, initial_balance)\n        self._account_number = f"SAV-{id(self)}"\n\n    def account_type(self) -> str:\n        return "Savings"\n\n    def apply_interest(self) -> float:\n        """Apply monthly interest. Returns interest earned."""\n        interest = self._balance * (self.INTEREST_RATE / 12)\n        if interest > 0:\n            self._balance += interest\n            self._log_transaction("interest", interest)\n        return interest',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Create Bank class to manage accounts',
            instruction: 'Bank holds multiple accounts, supports transfers',
            code: 'class Bank:\n    """Bank that manages multiple accounts."""\n\n    def __init__(self, name: str):\n        self.name = name\n        self._accounts: dict[str, Account] = {}\n\n    def open_account(self, account: Account) -> str:\n        """Open a new account."""\n        if account.account_number in self._accounts:\n            raise ValueError("Account already exists")\n        self._accounts[account.account_number] = account\n        return account.account_number\n\n    def get_account(self, account_number: str) -> Account:\n        if account_number not in self._accounts:\n            raise KeyError(f"Account {account_number} not found")\n        return self._accounts[account_number]\n\n    def transfer(self, from_num: str, to_num: str, amount: float) -> None:\n        """Transfer money between accounts."""\n        from_acct = self.get_account(from_num)\n        to_acct = self.get_account(to_num)\n\n        # Withdraw first (may raise InsufficientFundsError)\n        from_acct.withdraw(amount)\n        try:\n            to_acct.deposit(amount)\n        except Exception:\n            # Refund if deposit fails\n            from_acct.deposit(amount)\n            raise\n\n    def total_holdings(self) -> float:\n        return sum(a.balance for a in self._accounts.values())\n\n    def __len__(self) -> int:\n        return len(self._accounts)\n\n    def __iter__(self):\n        return iter(self._accounts.values())\n\n    def __str__(self) -> str:\n        return f"{self.name} ({len(self)} accounts, ${self.total_holdings():.2f} total)"',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Test the system',
            instruction: 'Use the bank system end-to-end',
            code: '# Create bank\nbank = Bank("First Python Bank")\n\n# Open accounts\nchecking = CheckingAccount("Alice", 1000, overdraft_limit=500)\nsavings = SavingsAccount("Alice", 5000)\n\nbank.open_account(checking)\nbank.open_account(savings)\n\n# Transactions\nchecking.deposit(500)\nchecking.withdraw(200)\n\n# Transfer\nbank.transfer(checking.account_number, savings.account_number, 300)\n\n# Apply savings interest\ninterest = savings.apply_interest()\nprint(f"Interest earned: ${interest:.2f}")\n\n# Print all accounts\nprint(bank)\nfor account in bank:\n    print(f"  {account}")\n    print(f"    Transactions: {len(account)}")\n\n# Test overdraft\nchecking.withdraw(1500)  # uses overdraft\nprint(checking)  # negative balance\n\n# Test insufficient funds (beyond overdraft)\ntry:\n    checking.withdraw(10000)\nexcept InsufficientFundsError as e:\n    print(f"Error: {e}")',
            codeLanguage: 'python',
            expectedOutput: 'First Python Bank (2 accounts, $6500.00 total)\n  Checking(Alice, balance=$-500.00)\n    Transactions: 4\n  Savings(Alice, balance=$5300.00)\n    Transactions: 3\nInterest earned: $17.67',
          },
        ],
        verification: 'All accounts work, transfers succeed, overdraft works, interest applied, exceptions raised correctly.',
      },
      exercises: [
        {
          prompt: 'Create a Temperature class with celsius property (validated, cannot be below -273.15) and computed fahrenheit property.',
          starterCode: 'class Temperature:\n    def __init__(self, celsius: float):\n        # your code\n        pass\n',
          hint: 'Use private _celsius, @property with @celsius.setter for validation, @property for fahrenheit (computed).',
          solution: 'class Temperature:\n    def __init__(self, celsius: float):\n        self.celsius = celsius  # calls setter!\n\n    @property\n    def celsius(self) -> float:\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value: float) -> None:\n        if value < -273.15:\n            raise ValueError("Below absolute zero!")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self) -> float:\n        return self._celsius * 9/5 + 32\n\ntemp = Temperature(25)\nprint(temp.fahrenheit)  # 77.0\ntemp.celsius = 0\nprint(temp.fahrenheit)  # 32.0\ntry:\n    temp.celsius = -300\nexcept ValueError as e:\n    print(e)  # Below absolute zero!',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is the difference between __str__ and __repr__?',
          options: [
            'No difference',
            '__str__ is for users (print), __repr__ is for developers (should recreate object)',
            '__repr__ is for users, __str__ for developers',
            '__str__ is faster',
          ],
          correctIndex: 1,
          explanation: '__str__ gives human-readable output (print(obj)). __repr__ gives developer output — ideally valid Python like ClassName(arg1, arg2). Used by repr() and in debugging.'
        },
        {
          question: 'When to use @classmethod vs @staticmethod?',
          options: [
            'Always use @classmethod',
            '@classmethod for alternative constructors / class state, @staticmethod for utility functions',
            '@staticmethod for constructors',
            'They are identical',
          ],
          correctIndex: 1,
          explanation: '@classmethod receives cls — use for alternative constructors (from_dict) or accessing class state. @staticmethod receives nothing — use for utility functions that do not need instance or class.'
        },
        {
          question: 'What does @dataclass(frozen=True) do?',
          options: [
            'Makes the class frozen (cannot be subclassed)',
            'Makes instances immutable — cannot modify attributes after creation',
            'Freezes the class during import',
            'Caches the class',
          ],
          correctIndex: 1,
          explanation: 'frozen=True makes instances immutable. You cannot set attributes after __init__. Also makes the class hashable (can be dict keys, set members).'
        },
        {
          question: 'Why prefer composition over inheritance?',
          options: [
            'Inheritance is bad',
            'Composition is more flexible — swap components at runtime, no deep hierarchies',
            'Composition is faster',
            'Inheritance is deprecated',
          ],
          correctIndex: 1,
          explanation: '"Favor composition over inheritance" — Gang of Four. Composition (HAS-A) lets you swap components, avoids fragile base class problem, easier to test. Inheritance (IS-A) creates tight coupling.'
        },
      ],
      keyTakeaways: [
        'Classes group data + behavior. Use __init__ for construction, self for instance',
        'Magic methods (__str__, __repr__, __len__, __add__, __iter__) enable built-in behavior',
        '@property creates managed attributes — validation, computed values, read-only',
        '@dataclass auto-generates __init__, __repr__, __eq__ — use field(default_factory=...) for mutables',
        'Use ABC + @abstractmethod for interfaces (cannot instantiate directly)',
        'Use super() to call parent methods, @override (3.12+) to verify overrides',
        'Favor composition (HAS-A) over inheritance (IS-A) — more flexible',
        '__post_init__ in dataclasses for validation after auto-generated __init__',
      ],
      resources: [
        { title: 'Python Classes Tutorial', url: 'https://docs.python.org/3/tutorial/classes.html', type: 'docs' },
        { title: 'Dataclasses Documentation', url: 'https://docs.python.org/3/library/dataclasses.html', type: 'docs' },
        { title: 'Real Python — OOP', url: 'https://realpython.com/python3-object-oriented-programming/', type: 'article' },
        { title: 'Real Python — Property Decorator', url: 'https://realpython.com/python-property/', type: 'article' },
      ],
      miniProject: {
        title: 'Build a Library Management System',
        description: 'Apply OOP: Book, Member, Library classes with borrowing, returns, and tracking.',
        requirements: [
          'Book dataclass with title, author, isbn, is_borrowed',
          'Member class with name, member_id, borrowed_books (max 5)',
          'Library class with add_book, register_member, borrow_book, return_book',
          'Custom exceptions (BookNotAvailable, MemberLimitExceeded)',
          'Use @property for computed values (available_books)',
          'Track borrowing history',
        ],
        estTime: '2-3 hours',
        solutionCode: 'from dataclasses import dataclass, field\nfrom typing import List, Optional\nfrom datetime import datetime\n\nclass LibraryError(Exception):\n    pass\n\nclass BookNotAvailable(LibraryError):\n    pass\n\nclass MemberLimitExceeded(LibraryError):\n    pass\n\n@dataclass\nclass Book:\n    title: str\n    author: str\n    isbn: str\n    is_borrowed: bool = False\n    borrowed_by: Optional[str] = None\n    borrowed_at: Optional[datetime] = None\n\nclass Member:\n    BORROW_LIMIT = 5\n\n    def __init__(self, name: str, member_id: str):\n        self.name = name\n        self.member_id = member_id\n        self._borrowed: List[Book] = []\n\n    @property\n    def borrowed_count(self) -> int:\n        return len(self._borrowed)\n\n    @property\n    def can_borrow(self) -> bool:\n        return self.borrowed_count < self.BORROW_LIMIT\n\n    def borrow(self, book: Book) -> None:\n        if not self.can_borrow:\n            raise MemberLimitExceeded(f"{self.name} has {self.BORROW_LIMIT} books")\n        if book.is_borrowed:\n            raise BookNotAvailable(f"{book.title} is borrowed")\n        book.is_borrowed = True\n        book.borrowed_by = self.member_id\n        book.borrowed_at = datetime.now()\n        self._borrowed.append(book)\n\n    def return_book(self, book: Book) -> None:\n        if book not in self._borrowed:\n            raise LibraryError(f"{self.name} did not borrow {book.title}")\n        book.is_borrowed = False\n        book.borrowed_by = None\n        book.borrowed_at = None\n        self._borrowed.remove(book)\n\nclass Library:\n    def __init__(self, name: str):\n        self.name = name\n        self._books: List[Book] = []\n        self._members: dict = {}\n\n    def add_book(self, book: Book) -> None:\n        self._books.append(book)\n\n    def register_member(self, member: Member) -> None:\n        self._members[member.member_id] = member\n\n    @property\n    def available_books(self) -> List[Book]:\n        return [b for b in self._books if not b.is_borrowed]\n\n    def borrow_book(self, isbn: str, member_id: str) -> None:\n        book = next((b for b in self._books if b.isbn == isbn), None)\n        if not book:\n            raise LibraryError(f"Book {isbn} not found")\n        member = self._members.get(member_id)\n        if not member:\n            raise LibraryError(f"Member {member_id} not found")\n        member.borrow(book)\n\n    def return_book(self, isbn: str, member_id: str) -> None:\n        book = next((b for b in self._books if b.isbn == isbn), None)\n        if not book:\n            raise LibraryError(f"Book {isbn} not found")\n        member = self._members.get(member_id)\n        if not member:\n            raise LibraryError(f"Member {member_id} not found")\n        member.return_book(book)',
        solutionLanguage: 'python'
      }
    },

    {
      id: 'py-09',
      title: 'Decorators — Function, Class, Parametrized, Built-in',
      subtitle: 'Master decorators — the Python engineer\'s power tool',
      duration: 70,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Decorators wrap functions to extend behavior without modifying them. Use cases: logging, timing, caching, authentication, retry logic, input validation. A decorator is a function that takes a function and returns a new function.',
        'Always use @functools.wraps to preserve the original function\'s metadata (__name__, __doc__). Without it, the wrapped function loses its identity — debugging becomes hell. This is the #1 decorator mistake.',
        'Parametrized decorators take arguments: @retry(max_attempts=3). They are three levels deep: decorator factory → decorator → wrapper. Class-based decorators use __call__ and can maintain state.',
        'Built-in decorators: @property, @staticmethod, @classmethod, @dataclass, @functools.lru_cache (memoization), @functools.singledispatch (function overloading by type), @contextlib.contextmanager.',
      ],
      codeExamples: [
        {
          filename: 'decorators.py',
          language: 'python',
          code: 'import functools\nimport time\nimport logging\nfrom typing import Callable, Any, TypeVar, ParamSpec\n\n# === BASIC DECORATOR ===\ndef timing(func: Callable) -> Callable:\n    """Measure and print execution time of a function."""\n    @functools.wraps(func)  # CRITICAL: preserve metadata\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timing\ndef slow_function():\n    """Simulate a slow operation."""\n    time.sleep(1)\n    return "done"\n\nprint(slow_function())  # slow_function took 1.0010s\nprint(slow_function.__name__)  # "slow_function" (preserved by @wraps)\nprint(slow_function.__doc__)   # "Simulate a slow operation."\n\n# === DECORATOR WITH LOGGING ===\ndef log_calls(func: Callable) -> Callable:\n    """Log all calls to a function."""\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        args_str = ", ".join([repr(a) for a in args] +\n                             [f"{k}={v!r}" for k, v in kwargs.items()])\n        logging.info(f"Calling {func.__name__}({args_str})")\n        try:\n            result = func(*args, **kwargs)\n            logging.info(f"{func.__name__} returned {result!r}")\n            return result\n        except Exception as e:\n            logging.error(f"{func.__name__} raised {type(e).__name__}: {e}")\n            raise\n    return wrapper\n\n@log_calls\ndef divide(a: int, b: int) -> float:\n    return a / b\n\nprint(divide(10, 2))  # logs the call\n# divide(10, 0)  # logs the error then raises\n\n# === PARAMETRIZED DECORATOR (takes arguments) ===\ndef retry(max_attempts: int = 3, delay: float = 1.0, exceptions: tuple = (Exception,)):\n    """Retry a function on failure.\n\n    Args:\n        max_attempts: Maximum number of attempts.\n        delay: Seconds to wait between retries.\n        exceptions: Tuple of exception types to catch.\n    """\n    def decorator(func: Callable) -> Callable:\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            last_exception = None\n            for attempt in range(1, max_attempts + 1):\n                try:\n                    return func(*args, **kwargs)\n                except exceptions as e:\n                    last_exception = e\n                    if attempt < max_attempts:\n                        print(f"Attempt {attempt}/{max_attempts} failed: {e}")\n                        time.sleep(delay)\n            raise last_exception  # all attempts failed\n        return wrapper\n    return decorator\n\n@retry(max_attempts=3, delay=1.0, exceptions=(ConnectionError, TimeoutError))\ndef fetch_url(url: str) -> str:\n    # Simulate flaky network\n    import random\n    if random.random() < 0.7:\n        raise ConnectionError("Network unreachable")\n    return f"Data from {url}"\n\n# Will retry up to 3 times\ntry:\n    result = fetch_url("https://example.com")\n    print(result)\nexcept ConnectionError:\n    print("All retries failed")\n\n# === CACHING DECORATOR ===\ndef memoize(func: Callable) -> Callable:\n    """Cache function results."""\n    cache: dict = {}\n\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n\n    # Expose cache for inspection/clearing\n    wrapper.cache = cache\n    wrapper.cache_clear = cache.clear\n    return wrapper\n\n@memoize\ndef expensive_computation(n: int) -> int:\n    print(f"  Computing for {n}...")\n    time.sleep(0.5)\n    return n ** 2\n\nprint(expensive_computation(4))  # Computing for 4... → 16\nprint(expensive_computation(4))  # 16 (cached, no "Computing")\nprint(expensive_computation(5))  # Computing for 5... → 25\nprint(f"Cache: {expensive_computation.cache}")\n\n# === USE functools.lru_cache INSTEAD (built-in, better) ===\nfrom functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fibonacci(n: int) -> int:\n    if n < 2:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(100))  # instant! (would take forever without cache)\nprint(fibonacci.cache_info())  # CacheInfo(hits=98, misses=101, maxsize=128, currsize=101)\n\n# === CLASS-BASED DECORATOR (can maintain state) ===\nclass CountCalls:\n    """Decorator that counts how many times a function is called."""\n\n    def __init__(self, func: Callable):\n        functools.update_wrapper(self, func)  # preserve metadata\n        self.func = func\n        self.count = 0\n\n    def __call__(self, *args, **kwargs):\n        self.count += 1\n        print(f"Call {self.count} to {self.func.__name__}")\n        return self.func(*args, **kwargs)\n\n@CountCalls\ndef say_hi():\n    print("Hi!")\n\nsay_hi()  # Call 1 to say_hi / Hi!\nsay_hi()  # Call 2 to say_hi / Hi!\nsay_hi()  # Call 3 to say_hi / Hi!\nprint(f"Total calls: {say_hi.count}")  # 3\n\n# === CLASS-BASED PARAMETRIZED DECORATOR ===\nclass Retry:\n    """Parametrized class-based retry decorator."""\n\n    def __init__(self, max_attempts: int = 3):\n        self.max_attempts = max_attempts\n\n    def __call__(self, func: Callable) -> Callable:\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for attempt in range(self.max_attempts):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    if attempt == self.max_attempts - 1:\n                        raise\n                    print(f"Retry {attempt + 1}/{self.max_attempts}: {e}")\n                    time.sleep(1)\n        return wrapper\n\n@Retry(max_attempts=5)\ndef flaky_operation():\n    import random\n    if random.random() < 0.5:\n        raise RuntimeError("Failed")\n    return "Success"\n\n# === DECORATOR WITH TYPE HINTS (Python 3.10+) ===\nP = ParamSpec("P")\nT = TypeVar("T")\n\ndef typed_decorator(func: Callable[P, T]) -> Callable[P, T]:\n    """Decorator that preserves the original function\'s signature."""\n    @functools.wraps(func)\n    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:\n        return func(*args, **kwargs)\n    return wrapper\n\n# === STACKING DECORATORS (applied bottom-up) ===\n@timing       # applied LAST (outermost)\n@log_calls    # applied SECOND\n@retry(max_attempts=2)  # applied FIRST (innermost)\ndef important_function():\n    """Does something important."""\n    time.sleep(0.5)\n    return "result"\n\n# Execution order:\n# 1. timing starts timer\n# 2. log_calls logs\n# 3. retry tries\n# 4. actual function runs\n# 5. retry returns\n# 6. log_calls logs result\n# 7. timing prints elapsed',
          explanation: 'Always use @functools.wraps. Parametrized decorators are 3 levels: factory → decorator → wrapper. Class-based decorators use __call__. Stack bottom-up. Use lru_cache instead of writing your own cache.'
        },
        {
          filename: 'builtin_decorators.py',
          language: 'python',
          code: 'import functools\nfrom functools import lru_cache, singledispatch, cached_property\nfrom dataclasses import dataclass\n\n# === @lru_cache — MEMOIZATION (built-in) ===\n\n@lru_cache(maxsize=128)\ndef fibonacci(n: int) -> int:\n    if n < 2:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(100))  # instant!\nprint(fibonacci.cache_info())\n# CacheInfo(hits=98, misses=101, maxsize=128, currsize=101)\nfibonacci.cache_clear()  # clear cache\n\n# @cache (Python 3.9+) — unbounded cache\nfrom functools import cache\n\n@cache\ndef factorial(n: int) -> int:\n    return 1 if n <= 1 else n * factorial(n - 1)\n\n# === @singledispatch — FUNCTION OVERLOADING BY TYPE ===\n\n@singledispatch\ndef process(data):\n    """Default handler."""\n    raise TypeError(f"Cannot process {type(data)}")\n\n@process.register\ndef _(data: int) -> str:\n    return f"Integer: {data}"\n\n@process.register\ndef _(data: str) -> str:\n    return f"String: {data!r}"\n\n@process.register\ndef _(data: list) -> str:\n    return f"List with {len(data)} items"\n\n@process.register\ndef _(data: dict) -> str:\n    return f"Dict with keys: {list(data.keys())}"\n\nprint(process(42))           # Integer: 42\nprint(process("hello"))      # String: \'hello\'\nprint(process([1, 2, 3]))    # List with 3 items\nprint(process({"a": 1}))     # Dict with keys: [\'a\']\n# process(3.14)  # TypeError — no handler for float\n\n# === @cached_property — PROPERTY WITH CACHING ===\n\nclass DataSet:\n    """Expensive computation cached after first access."""\n\n    def __init__(self, data: list):\n        self.data = data\n\n    @cached_property\n    def mean(self) -> float:\n        print("Computing mean...")  # only runs once!\n        return sum(self.data) / len(self.data)\n\n    @cached_property\n    def variance(self) -> float:\n        print("Computing variance...")\n        m = self.mean  # uses cached mean\n        return sum((x - m) ** 2 for x in self.data) / len(self.data)\n\nds = DataSet([1, 2, 3, 4, 5])\nprint(ds.mean)      # Computing mean... → 3.0\nprint(ds.mean)      # 3.0 (no "Computing" — cached!)\nprint(ds.variance)  # Computing variance... → 2.0\n\n# === @dataclass — auto-generates __init__, __repr__, __eq__ ===\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\n# Auto-generated __init__, __repr__, __eq__\np1 = Point(1.0, 2.0)\np2 = Point(1.0, 2.0)\nprint(p1)            # Point(x=1.0, y=2.0)\nprint(p1 == p2)      # True\n\n# === @property — managed attributes ===\n\nclass Temperature:\n    def __init__(self, celsius: float):\n        self.celsius = celsius\n\n    @property\n    def celsius(self) -> float:\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value: float):\n        if value < -273.15:\n            raise ValueError("Below absolute zero")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self) -> float:\n        return self._celsius * 9/5 + 32\n\n# === @staticmethod and @classmethod ===\n\nclass MyClass:\n    class_var = "shared"\n\n    @staticmethod\n    def utility_function(x: int) -> int:\n        """No access to self or cls — just a utility."""\n        return x * 2\n\n    @classmethod\n    def from_string(cls, s: str) -> "MyClass":\n        """Alternative constructor — has access to cls."""\n        return cls()\n\n    @classmethod\n    def get_class_var(cls) -> str:\n        return cls.class_var\n\n# === DECORATOR FOR INPUT VALIDATION ===\n\ndef validate_args(*types):\n    """Validate argument types at runtime."""\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for arg, expected_type in zip(args, types):\n                if not isinstance(arg, expected_type):\n                    raise TypeError(\n                        f"{func.__name__} expected {expected_type.__name__}, "\n                        f"got {type(arg).__name__}"\n                    )\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@validate_args(int, int)\ndef add(a, b):\n    return a + b\n\nprint(add(1, 2))      # 3\n# add("1", 2)  # TypeError: add expected int, got str\n\n# === DECORATOR FOR AUTHORIZATION ===\n\ndef requires_role(role: str):\n    """Check that user has required role."""\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, current_user=None, **kwargs):\n            if not current_user or role not in current_user.get("roles", []):\n                raise PermissionError(f"Requires role: {role}")\n            return func(*args, current_user=current_user, **kwargs)\n        return wrapper\n    return decorator\n\n@requires_role("admin")\ndef delete_user(user_id: int, current_user=None):\n    print(f"Deleted user {user_id}")\n\nadmin = {"name": "Alice", "roles": ["admin", "user"]}\nregular = {"name": "Bob", "roles": ["user"]}\n\ndelete_user(1, current_user=admin)  # works\n# delete_user(1, current_user=regular)  # PermissionError',
          explanation: 'Built-in decorators: @lru_cache (memoization), @singledispatch (type overloading), @cached_property (cached computed), @dataclass, @property, @staticmethod/@classmethod. Use these instead of writing your own.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a @rate_limit decorator that limits a function to N calls per minute.',
          starterCode: 'import time\nimport functools\nfrom collections import deque\n\ndef rate_limit(max_calls: int, per_seconds: int = 60):\n    # your code\n    pass\n',
          hint: 'Use a deque to track call timestamps. Before calling, remove timestamps older than per_seconds. If len >= max_calls, raise or wait.',
          solution: 'import time\nimport functools\nfrom collections import deque\n\ndef rate_limit(max_calls: int, per_seconds: int = 60):\n    """Limit function to max_calls per per_seconds window."""\n    def decorator(func):\n        calls: deque = deque()\n\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            now = time.time()\n            # Remove old calls outside the window\n            while calls and calls[0] < now - per_seconds:\n                calls.popleft()\n\n            if len(calls) >= max_calls:\n                wait = calls[0] + per_seconds - now\n                raise RuntimeError(\n                    f"Rate limit exceeded. Wait {wait:.1f}s"\n                )\n\n            calls.append(now)\n            return func(*args, **kwargs)\n\n        return wrapper\n    return decorator\n\n@rate_limit(max_calls=3, per_seconds=10)\ndef api_call():\n    return "success"\n\nfor i in range(5):\n    try:\n        print(api_call())\n    except RuntimeError as e:\n        print(f"Blocked: {e}")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why use @functools.wraps in a decorator?',
          options: [
            'To speed up the function',
            'To preserve the original function\'s metadata (__name__, __doc__)',
            'To cache results',
            'Required by Python',
          ],
          correctIndex: 1,
          explanation: 'Without @wraps, the wrapped function loses __name__, __doc__, __module__. Debugging becomes hell. Always use @functools.wraps(func) in your wrapper.'
        },
        {
          question: 'How many levels deep is a parametrized decorator?',
          options: [
            '1 (just the wrapper)',
            '2 (decorator + wrapper)',
            '3 (factory → decorator → wrapper)',
            '4',
          ],
          correctIndex: 2,
          explanation: 'Parametrized: @retry(max_attempts=3). Three levels: retry() returns decorator, decorator(func) returns wrapper, wrapper(*args) runs the function.'
        },
        {
          question: 'Which built-in decorator provides memoization?',
          options: ['@cache', '@functools.lru_cache', '@memoize', '@cached_property'],
          correctIndex: 1,
          explanation: '@functools.lru_cache(maxsize=N) is the standard. @cache (3.9+) is unbounded. @cached_property is for class properties, not functions.'
        },
      ],
      keyTakeaways: [
        'Decorators wrap functions to extend behavior (logging, timing, caching, auth)',
        'ALWAYS use @functools.wraps(func) to preserve metadata',
        'Parametrized decorators are 3 levels: factory → decorator → wrapper',
        'Class-based decorators use __call__ and can maintain state',
        'Stack decorators bottom-up: @outer @inner def f() → inner runs first',
        'Use @lru_cache for memoization, @singledispatch for type overloading',
        'Use @cached_property for expensive computed properties',
        'Real use cases: retry, rate limit, auth, validation, logging',
      ],
      resources: [
        { title: 'PEP 318 — Decorators', url: 'https://peps.python.org/pep-0318/', type: 'article' },
        { title: 'functools Documentation', url: 'https://docs.python.org/3/library/functools.html', type: 'docs' },
        { title: 'Real Python — Decorators Primer', url: 'https://realpython.com/primer-on-python-decorators/', type: 'article' },
      ]
    },

    {
      id: 'py-10',
      title: 'Iterators, Generators & itertools — Lazy Evaluation',
      subtitle: 'Master lazy evaluation — generators, yield, itertools for memory-efficient pipelines',
      duration: 65,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Iterators are objects that implement __iter__() and __next__(). Any object that can be looped over is iterable (lists, dicts, files, generators). The iter() function gets an iterator, next() gets the next value, StopIteration signals end.',
        'Generators are the easiest way to create iterators. Use `yield` instead of `return` — the function pauses at yield, resumes on next call. Generators are LAZY — they produce values one at a time, saving memory for large/infinite sequences.',
        'The itertools module is a superpower: chain (concatenate), cycle (repeat), islice (slice), groupby (group consecutive), product/permutations/combinations (combinatorics), accumulate (running totals), takewhile/dropwhile. Master itertools and you write cleaner, faster code.',
        'Use generators for: large files, infinite sequences, streaming data, pipelines (each stage transforms lazily). They are the foundation of async/await.',
      ],
      codeExamples: [
        {
          filename: 'iterators.py',
          language: 'python',
          code: '# === ITERATOR PROTOCOL ===\n\nclass CountDown:\n    """Custom iterator that counts down from n to 1."""\n\n    def __init__(self, start: int):\n        self.current = start\n\n    def __iter__(self) -> "CountDown":\n        return self  # iterator returns itself\n\n    def __next__(self) -> int:\n        if self.current <= 0:\n            raise StopIteration  # signals end of iteration\n        self.current -= 1\n        return self.current + 1\n\n# Use it\nfor n in CountDown(5):\n    print(n)  # 5, 4, 3, 2, 1\n\n# Manual iteration\nit = iter(CountDown(3))\nprint(next(it))  # 3\nprint(next(it))  # 2\nprint(next(it))  # 1\n# print(next(it))  # StopIteration!\n\n# === BUILT-IN ITERABLES ===\n# All these are iterable:\nfor c in "hello":       # strings\n    pass\nfor item in [1, 2, 3]: # lists\n    pass\nfor k in {"a": 1}:     # dicts (iterates keys)\n    pass\nfor x in {1, 2, 3}:    # sets\n    pass\nfor line in open("file.txt"):  # files (one line at a time!)\n    pass\n\n# iter() and next()\nit = iter([10, 20, 30])\nprint(next(it))  # 10\nprint(next(it))  # 20\nprint(next(it))  # 30\n# print(next(it))  # StopIteration\n\n# next() with default (no exception)\nit = iter([])\nprint(next(it, "default"))  # "default" (no StopIteration)\n\n# === ITERATOR VS ITERABLE ===\n# Iterable: has __iter__ (lists, dicts, strings, files)\n# Iterator: has __iter__ AND __next__ (generators, custom iterators)\n\n# iter() creates an iterator from an iterable\nmy_list = [1, 2, 3]  # iterable\nmy_iter = iter(my_list)  # iterator\nprint(type(my_iter))  # <class \'list_iterator\'>\n\n# Iterators are EXHAUSTED after use\nfor x in my_iter:\n    print(x)  # 1, 2, 3\nfor x in my_iter:\n    print(x)  # nothing! iterator exhausted\n\n# === UNPACKING WITH * (uses iteration) ===\nfirst, *rest = [1, 2, 3, 4, 5]\nprint(first)  # 1\nprint(rest)   # [2, 3, 4, 5]\n\n*init, last = [1, 2, 3, 4, 5]\nprint(init)  # [1, 2, 3, 4]\nprint(last)  # 5\n\nfirst, *middle, last = [1, 2, 3, 4, 5]\nprint(first, middle, last)  # 1 [2, 3, 4] 5\n\n# === ENUMERATE AND ZIP (common iterator tools) ===\nfor index, value in enumerate(["a", "b", "c"]):\n    print(f"{index}: {value}")\n# 0: a, 1: b, 2: c\n\nfor index, value in enumerate(["a", "b", "c"], start=1):\n    print(f"{index}: {value}")  # starts at 1\n\nfor name, age in zip(["Alice", "Bob"], [25, 30]):\n    print(f"{name} is {age}")\n# Alice is 25, Bob is 30\n\n# zip_longest (fill missing)\nfrom itertools import zip_longest\nfor a, b in zip_longest([1, 2, 3], [4, 5], fillvalue=0):\n    print(a, b)  # (1,4) (2,5) (3,0)',
          explanation: 'Iterators implement __iter__ and __next__. Use iter() to get iterator, next() to get values. Iterators are exhausted after use. enumerate() and zip() are the most common iterator tools.'
        },
        {
          filename: 'generators.py',
          language: 'python',
          code: 'import itertools\nfrom typing import Iterator, Generator\n\n# === GENERATOR FUNCTION (uses yield) ===\n\ndef count_up_to(n: int) -> Generator[int, None, None]:\n    """Generate numbers 1 to n lazily."""\n    i = 1\n    while i <= n:\n        yield i  # PAUSES here, resumes on next()\n        i += 1\n\n# Use it\nfor x in count_up_to(5):\n    print(x)  # 1, 2, 3, 4, 5\n\n# Manual\ngen = count_up_to(3)\nprint(next(gen))  # 1\nprint(next(gen))  # 2\nprint(next(gen))  # 3\n# print(next(gen))  # StopIteration\n\n# === INFINITE GENERATOR (lazy, never exhausts memory) ===\n\ndef natural_numbers() -> Generator[int, None, None]:\n    """Infinite sequence: 1, 2, 3, ..."""\n    n = 1\n    while True:\n        yield n\n        n += 1\n\n# Take first 5 with islice (do not use list() on infinite!)\nfor x in itertools.islice(natural_numbers(), 5):\n    print(x)  # 1, 2, 3, 4, 5\n\n# === FIBONACCI (infinite, lazy) ===\n\ndef fibonacci() -> Generator[int, None, None]:\n    """Infinite Fibonacci sequence."""\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# First 10 Fibonacci numbers\nfibs = list(itertools.islice(fibonacci(), 10))\nprint(fibs)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\n# === yield from — DELEGATE TO SUB-ITERATOR ===\n\ndef flatten(nested):\n    """Flatten arbitrarily nested lists."""\n    for item in nested:\n        if isinstance(item, (list, tuple)):\n            yield from flatten(item)  # recursively yield\n        else:\n            yield item\n\nprint(list(flatten([1, [2, [3, 4], 5], 6])))\n# [1, 2, 3, 4, 5, 6]\n\n# yield from with any iterable\ndef chain(*iterables):\n    for it in iterables:\n        yield from it\n\nprint(list(chain([1, 2], [3, 4], [5, 6])))\n# [1, 2, 3, 4, 5, 6]\n\n# === GENERATOR EXPRESSIONS (lazy list comprehension) ===\n\n# List comprehension — creates full list in memory\nsquares_list = [x**2 for x in range(1000000)]  # ~8MB memory\n\n# Generator expression — lazy, ~120 bytes memory!\nsquares_gen = (x**2 for x in range(1000000))\n\nprint(next(squares_gen))  # 0\nprint(next(squares_gen))  # 1\n# Does NOT create 1M element list!\n\n# Common: pass to sum, max, min, any, all\ntotal = sum(x**2 for x in range(101))  # 338350\nhas_neg = any(x < 0 for x in [1, 2, -3])  # True\nall_pos = all(x > 0 for x in [1, 2, 3])   # True\nmax_len = max(len(w) for w in ["a", "bb", "ccc"])  # 3\n\n# === GENERATOR WITH send() — BIDIRECTIONAL ===\n\ndef echo() -> Generator:\n    """Generator that can receive values via send()."""\n    while True:\n        received = yield  # yield with no value, receive via send()\n        print(f"Got: {received}")\n\ngen = echo()\nnext(gen)        # prime the generator (run to first yield)\ngen.send("Hi")   # Got: Hi\ngen.send("Yo")   # Got: Yo\n\n# === GENERATOR PIPELINE (lazy processing) ===\n\ndef read_lines(path: str) -> Iterator[str]:\n    """Lazily yield lines from file."""\n    with open(path) as f:\n        yield from f\n\ndef strip_lines(lines: Iterator[str]) -> Iterator[str]:\n    """Strip whitespace from each line."""\n    for line in lines:\n        yield line.strip()\n\ndef filter_empty(lines: Iterator[str]) -> Iterator[str]:\n    """Filter out empty lines."""\n    for line in lines:\n        if line:\n            yield line\n\ndef parse_csv(lines: Iterator[str]) -> Iterator[dict]:\n    """Parse CSV lines into dicts."""\n    import csv\n    reader = csv.DictReader(lines)\n    for row in reader:\n        yield dict(row)\n\n# Pipeline — each stage processes lazily\n# Memory stays constant regardless of file size!\npipeline = parse_csv(filter_empty(strip_lines(read_lines("data.csv"))))\n\nfor row in pipeline:\n    print(row)  # one row at a time\n\n# === REAL-WORLD: PROCESS 10GB LOG FILE ===\n\ndef process_huge_log(path: str) -> dict:\n    """Process a 10GB log file with constant memory."""\n    error_count = 0\n    error_messages = []\n\n    with open(path) as f:  # lazy file reading\n        for line in f:    # one line at a time\n            if "ERROR" in line:\n                error_count += 1\n                if len(error_messages) < 100:  # keep first 100\n                    error_messages.append(line.strip())\n\n    return {\n        "total_errors": error_count,\n        "sample_errors": error_messages,\n    }\n\n# This uses KB of memory regardless of file size!',
          explanation: 'Generators use yield — lazy and memory-efficient. yield from delegates to sub-iterators. Generator expressions (parens) are lazy. Use generators for pipelines, infinite sequences, and large files.'
        },
        {
          filename: 'itertools.py',
          language: 'python',
          code: 'import itertools\nfrom typing import Iterator\n\n# === itertools — ITERATOR ALGEBRA ===\n\n# chain — concatenate iterables\nprint(list(itertools.chain([1, 2], [3, 4], [5])))\n# [1, 2, 3, 4, 5]\n\n# chain.from_iterable — chain a list of lists\nlists = [[1, 2], [3, 4], [5, 6]]\nprint(list(itertools.chain.from_iterable(lists)))\n# [1, 2, 3, 4, 5, 6]\n\n# cycle — repeat forever (infinite)\nfor i, x in enumerate(itertools.cycle("AB")):\n    if i >= 5: break\n    print(x)  # A, B, A, B, A\n\n# repeat — repeat same value\nfor x in itertools.repeat("hi", 3):  # repeat 3 times\n    print(x)  # hi, hi, hi\n\n# islice — slice an iterator (lazy!)\nnums = itertools.count(10)  # 10, 11, 12, ... (infinite)\nprint(list(itertools.islice(nums, 5)))        # [10, 11, 12, 13, 14]\nprint(list(itertools.islice(nums, 2, 5)))     # [15, 16, 17] (start, stop)\nprint(list(itertools.islice(nums, 0, 10, 2))) # [18, 20, 22, 24, 26] (step)\n\n# === COMBINATORICS ===\n\n# product — Cartesian product\nprint(list(itertools.product("AB", "12")))\n# [(\'A\',\'1\'), (\'A\',\'2\'), (\'B\',\'1\'), (\'B\',\'2\')]\n\n# product with repeat\nprint(list(itertools.product("AB", repeat=2)))\n# [(\'A\',\'A\'), (\'A\',\'B\'), (\'B\',\'A\'), (\'B\',\'B\')]\n\n# permutations — ordered arrangements\nprint(list(itertools.permutations("ABC", 2)))\n# [(\'A\',\'B\'), (\'A\',\'C\'), (\'B\',\'A\'), (\'B\',\'C\'), (\'C\',\'A\'), (\'C\',\'B\')]\n\n# combinations — unordered (no repeats)\nprint(list(itertools.combinations("ABC", 2)))\n# [(\'A\',\'B\'), (\'A\',\'C\'), (\'B\',\'C\')]\n\n# combinations_with_replacement\nprint(list(itertools.combinations_with_replacement("AB", 2)))\n# [(\'A\',\'A\'), (\'A\',\'B\'), (\'B\',\'B\')]\n\n# === ACCUMULATE — running totals ===\nprint(list(itertools.accumulate([1, 2, 3, 4, 5])))\n# [1, 3, 6, 10, 15] (running sum)\n\n# With custom function\nimport operator\nprint(list(itertools.accumulate([1, 2, 3, 4], operator.mul)))\n# [1, 2, 6, 24] (running product: factorials!)\n\n# Running max\nprint(list(itertools.accumulate([3, 1, 4, 1, 5, 9], max)))\n# [3, 3, 4, 4, 5, 9]\n\n# === GROUPBY — group consecutive elements ===\n# IMPORTANT: sort first if you want all groups!\n\ndata = [("A", 1), ("A", 2), ("B", 3), ("B", 4), ("A", 5)]\n# Group consecutive (A,A,B,B,A — note last A is separate group)\nfor key, group in itertools.groupby(data, key=lambda x: x[0]):\n    print(key, list(group))\n# A [(\'A\', 1), (\'A\', 2)]\n# B [(\'B\', 3), (\'B\', 4)]\n# A [(\'A\', 5)]\n\n# To group ALL same keys together, sort first:\ndata_sorted = sorted(data, key=lambda x: x[0])\nfor key, group in itertools.groupby(data_sorted, key=lambda x: x[0]):\n    print(key, list(group))\n# A [(\'A\', 1), (\'A\', 2), (\'A\', 5)]\n# B [(\'B\', 3), (\'B\', 4)]\n\n# === TAKWHILE / DROPWHILE ===\nnums = [1, 2, 3, 4, 1, 2]\n\n# takewhile — take while condition is True, then stop\nprint(list(itertools.takewhile(lambda x: x < 4, nums)))\n# [1, 2, 3] (stops at first 4)\n\n# dropwhile — drop while condition is True, then take rest\nprint(list(itertools.dropwhile(lambda x: x < 4, nums)))\n# [4, 1, 2] (drops 1,2,3 then takes everything after)\n\n# === FILTERFALSE — opposite of filter ===\nprint(list(itertools.filterfalse(lambda x: x % 2, range(10))))\n# [0, 2, 4, 6, 8] (evens — opposite of filter)\n\n# === STARMAP — like map but unpacks args ===\nprint(list(itertools.starmap(pow, [(2, 3), (3, 2), (10, 3)])))\n# [8, 9, 1000]\n\n# === ZIP_LONGEST — zip with fill value ===\nprint(list(itertools.zip_longest([1, 2, 3], [\'a\', \'b\'], fillvalue=0)))\n# [(1, \'a\'), (2, \'b\'), (3, 0)]\n\n# === REAL-WORLD EXAMPLES ===\n\n# Sliding window\ndef sliding_window(iterable, n):\n    """Yield sliding windows of size n."""\n    it = iter(iterable)\n    window = tuple(itertools.islice(it, n))\n    if len(window) == n:\n        yield window\n    for x in it:\n        window = window[1:] + (x,)\n        yield window\n\nfor window in sliding_window([1, 2, 3, 4, 5], 3):\n    print(window)  # (1,2,3), (2,3,4), (3,4,5)\n\n# Pairwise (Python 3.10+: itertools.pairwise)\nfor a, b in itertools.pairwise([1, 2, 3, 4]):\n    print(a, b)  # 1 2, 2 3, 3 4\n\n# Round-robin merge\ndef round_robin(*iterables):\n    """Yield from each iterable in round-robin fashion."""\n    active = len(iterables)\n    nexts = itertools.cycle(iter(it).next for it in iterables)\n    while active:\n        try:\n            for next_func in nexts:\n                yield next_func()\n        except StopIteration:\n            active -= 1\n            nexts = itertools.cycle(itertools.islice(nexts, active))\n\n# All combinations of 2 from a list\nfriends = ["Alice", "Bob", "Carol", "Dan"]\npairs = list(itertools.combinations(friends, 2))\nprint(pairs)  # all possible pairs',
          explanation: 'itertools is a superpower: chain (concat), product/permutations/combinations (combinatorics), groupby (group), accumulate (running totals), islice (lazy slice), takewhile/dropwhile. Master it for cleaner, faster code.'
        },
      ],
      lab: {
        title: 'Build a Log Processing Pipeline',
        objective: 'Process a 10GB log file with constant memory using generators',
        estTime: '60 minutes',
        difficulty: 'Intermediate',
        setup: [
          'Create a sample log file (or use the generator)',
          'Python 3.12+',
        ],
        steps: [
          {
            title: 'Step 1: Generate sample log data',
            instruction: 'Create a script to generate test data',
            code: '# generate_logs.py\nimport random\nfrom datetime import datetime, timedelta\nfrom pathlib import Path\n\nLEVELS = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]\nMESSAGES = [\n    "User logged in",\n    "Database query completed",\n    "Cache miss",\n    "Connection timeout",\n    "Disk space low",\n    "Authentication failed",\n    "API rate limit exceeded",\n]\n\ndef generate_logs(path: Path, num_lines: int = 100000):\n    """Generate sample log file."""\n    start_time = datetime(2024, 1, 1)\n    with path.open("w") as f:\n        for i in range(num_lines):\n            ts = start_time + timedelta(seconds=i)\n            level = random.choices(\n                LEVELS,\n                weights=[10, 50, 20, 15, 5],  # weighted random\n            )[0]\n            msg = random.choice(MESSAGES)\n            f.write(f"{ts:%Y-%m-%d %H:%M:%S} {level:8s} {msg}\\n")\n\ngenerate_logs(Path("app.log"), 100000)\nprint("Generated 100K log lines")',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Build the generator pipeline',
            instruction: 'Each stage is a generator — processes lazily',
            code: '# pipeline.py\nfrom pathlib import Path\nfrom typing import Iterator\nfrom datetime import datetime\nfrom dataclasses import dataclass\nimport re\n\n@dataclass(frozen=True)\nclass LogEntry:\n    timestamp: datetime\n    level: str\n    message: str\n\ndef read_lines(path: Path) -> Iterator[str]:\n    """Lazily yield lines from file."""\n    with path.open() as f:\n        yield from f\n\ndef parse_lines(lines: Iterator[str]) -> Iterator[LogEntry]:\n    """Parse each line into LogEntry."""\n    pattern = re.compile(\n        r\'(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\s+\'\n        r\'(\\w+)\\s+(.*)\'\n    )\n    for line in lines:\n        match = pattern.match(line.strip())\n        if match:\n            ts = datetime.strptime(match.group(1), "%Y-%m-%d %H:%M:%S")\n            yield LogEntry(ts, match.group(2), match.group(3))\n\ndef filter_level(entries: Iterator[LogEntry], level: str) -> Iterator[LogEntry]:\n    """Filter entries by level."""\n    for entry in entries:\n        if entry.level == level:\n            yield entry\n\ndef count_entries(entries: Iterator[LogEntry]) -> int:\n    """Count entries (consumes the iterator)."""\n    return sum(1 for _ in entries)\n\n# Pipeline — each stage is lazy, constant memory\npath = Path("app.log")\n\n# Count all ERROR entries\npipeline = filter_level(parse_lines(read_lines(path)), "ERROR")\nerror_count = count_entries(pipeline)\nprint(f"Total errors: {error_count}")\n\n# Find first 5 CRITICAL entries\npipeline = filter_level(parse_lines(read_lines(path)), "CRITICAL")\nfor i, entry in enumerate(pipeline):\n    if i >= 5: break\n    print(entry)\n\n# Memory: ~1KB regardless of file size (10GB or 1MB — same!)',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Add aggregation',
            instruction: 'Count by level using Counter',
            code: '# aggregate.py\nfrom collections import Counter\nfrom pathlib import Path\nfrom typing import Iterator\n\n# ... (reuse parse_lines, read_lines from step 2)\n\ndef count_by_level(path: Path) -> dict[str, int]:\n    """Count log entries by level — constant memory."""\n    counter: Counter = Counter()\n    for entry in parse_lines(read_lines(path)):\n        counter[entry.level] += 1\n    return dict(counter)\n\ndef count_by_hour(path: Path) -> dict[int, int]:\n    """Count entries by hour of day."""\n    counter: Counter = Counter()\n    for entry in parse_lines(read_lines(path)):\n        counter[entry.timestamp.hour] += 1\n    return dict(counter)\n\n# Usage\nprint("By level:", count_by_level(Path("app.log")))\n# {\'INFO\': 50000, \'WARNING\': 20000, \'ERROR\': 15000, ...}\n\nprint("By hour:", count_by_hour(Path("app.log")))\n# {0: 4200, 1: 4100, ..., 23: 4300}',
            codeLanguage: 'python',
          },
        ],
        verification: 'Pipeline processes 100K lines with KB of memory. Counts are accurate.',
      },
      exercises: [
        {
          prompt: 'Write a generator that yields prime numbers infinitely. Use itertools.islice to get the first 20.',
          starterCode: 'import itertools\n\ndef primes():\n    # your code\n    pass\n\nfirst_20 = list(itertools.islice(primes(), 20))\n',
          hint: 'Yield 2, then iterate odd numbers. Check divisibility by previously yielded primes.',
          solution: 'import itertools\n\ndef primes():\n    yield 2\n    found = [2]\n    n = 3\n    while True:\n        is_prime = True\n        for p in found:\n            if p * p > n:  # only check up to sqrt(n)\n                break\n            if n % p == 0:\n                is_prime = False\n                break\n        if is_prime:\n            found.append(n)\n            yield n\n        n += 2  # only check odd numbers\n\nfirst_20 = list(itertools.islice(primes(), 20))\nprint(first_20)\n# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]',
          solutionLanguage: 'python'
        },
        {
          prompt: 'Use itertools.combinations to generate all possible 2-person pairs from a list of friends.',
          starterCode: 'import itertools\n\nfriends = ["Alice", "Bob", "Carol", "Dan"]\npairs = \n',
          hint: 'itertools.combinations(iterable, r) where r=2',
          solution: 'import itertools\n\nfriends = ["Alice", "Bob", "Carol", "Dan"]\npairs = list(itertools.combinations(friends, 2))\nprint(pairs)\n# [(\'Alice\', \'Bob\'), (\'Alice\', \'Carol\'), (\'Alice\', \'Dan\'),\n#  (\'Bob\', \'Carol\'), (\'Bob\', \'Dan\'), (\'Carol\', \'Dan\')]\nprint(f"Total pairs: {len(pairs)}")  # 6 (4C2 = 6)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does yield do?',
          options: [
            'Returns a value and ends the function',
            'Returns a value but PAUSES the function — resumes on next() call',
            'Returns multiple values as a list',
            'Same as return',
          ],
          correctIndex: 1,
          explanation: 'yield produces a value but pauses the function. The function\'s state is preserved. On the next next() call, it resumes right after the yield.'
        },
        {
          question: 'What is the main advantage of generators over lists?',
          options: [
            'Faster iteration',
            'Memory efficiency — lazy evaluation, only produces values as needed',
            'More features',
            'Better syntax',
          ],
          correctIndex: 1,
          explanation: 'Generators produce values one at a time (lazy). A generator for 1M items uses KB of memory. A list of 1M items uses MB. Generators can even be infinite.'
        },
        {
          question: 'When does a generator raise StopIteration?',
          options: [
            'Never',
            'When it runs out of values (function returns)',
            'On first call',
            'When yield is reached',
          ],
          correctIndex: 1,
          explanation: 'When the generator function returns (or runs out of yields), next() raises StopIteration. This signals the for loop to stop.'
        },
        {
          question: 'What does itertools.groupby require?',
          options: [
            'Nothing special',
            'Input must be SORTED by the group key (only groups consecutive)',
            'A dictionary',
            'A list',
          ],
          correctIndex: 1,
          explanation: 'groupby only groups CONSECUTIVE items with the same key. If you want all items with the same key together, sort by the key first.'
        },
      ],
      keyTakeaways: [
        'Iterators implement __iter__ and __next__. Use iter() and next()',
        'Generators use yield — lazy, memory-efficient, can be infinite',
        'yield from delegates to a sub-generator (recursion, chaining)',
        'Generator expressions (parens) are lazy — use for large data',
        'itertools: chain, cycle, islice, product, permutations, combinations',
        'itertools: accumulate, groupby (sort first!), takewhile, dropwhile',
        'Generator pipelines process huge files with constant memory',
        'Generators are the foundation of async/await',
      ],
      resources: [
        { title: 'itertools Documentation', url: 'https://docs.python.org/3/library/itertools.html', type: 'docs' },
        { title: 'Itertools Recipes', url: 'https://docs.python.org/3/library/itertools.html#itertools-recipes', type: 'article', isHiddenGem: true },
        { title: 'Real Python — Generators', url: 'https://realpython.com/introduction-to-python-generators/', type: 'article' },
      ]
    },

    {
      id: 'py-11',
      title: 'Async/Await — asyncio, aiohttp, Concurrent Programming',
      subtitle: 'Master async/await for high-concurrency I/O-bound applications',
      duration: 80,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Async/await lets you handle thousands of I/O operations concurrently WITHOUT threads. While one coroutine waits for I/O (network, disk), the event loop runs others. Perfect for web scrapers, API clients, chat servers, real-time apps.',
        'Use async for I/O-bound work (network requests, file I/O, database calls). For CPU-bound work (math, image processing), use multiprocessing — async gives no benefit there because the GIL prevents true parallelism.',
        'Core concepts: async def creates a coroutine, await pauses execution, asyncio.gather() runs coroutines concurrently, asyncio.create_task() schedules a coroutine, asyncio.Queue for producer-consumer, Semaphore for limiting concurrency.',
        'Key async libraries: aiohttp (HTTP client/server), httpx (modern HTTP, sync+async), asyncpg (PostgreSQL), motor (MongoDB), websockets, aioredis. Most modern Python web frameworks (FastAPI, Litestar) support async natively.',
      ],
      codeExamples: [
        {
          filename: 'async_basics.py',
          language: 'python',
          code: '# pip install aiohttp httpx\nimport asyncio\nimport time\nimport httpx\n\n# === DEFINE A COROUTINE (async def) ===\nasync def greet(name: str) -> str:\n    print(f"Hello {name}")\n    await asyncio.sleep(1)  # NON-BLOCKING sleep\n    print(f"Bye {name}")\n    return f"done-{name}"\n\n# === RUN A COROUTINE ===\nasync def main():\n    result = await greet("Alice")\n    print(result)\n\n# Top-level await (Python 3.7+ in scripts)\nasyncio.run(main())\n# Output:\n# Hello Alice\n# Bye Alice\n# done-Alice\n\n# === SEQUENTIAL vs CONCURRENT ===\n\nasync def fetch(url: str) -> str:\n    await asyncio.sleep(1)  # simulate network request\n    return f"data from {url}"\n\nasync def sequential():\n    """Run one at a time — total time = sum of all"""\n    start = time.perf_counter()\n    a = await fetch("api/a")  # 1s\n    b = await fetch("api/b")  # 1s\n    c = await fetch("api/c")  # 1s\n    print(f"Sequential: {time.perf_counter() - start:.2f}s")  # ~3s\n\nasync def concurrent():\n    """Run all at once — total time = max of all"""\n    start = time.perf_counter()\n    # asyncio.gather runs all coroutines concurrently\n    results = await asyncio.gather(\n        fetch("api/a"),\n        fetch("api/b"),\n        fetch("api/c"),\n    )\n    print(f"Concurrent: {time.perf_counter() - start:.2f}s")  # ~1s\n    print(results)\n\nasyncio.run(sequential())  # 3s\nasyncio.run(concurrent())  # 1s\n\n# === asyncio.create_task — schedule without awaiting ===\n\nasync def worker(name: str, duration: int) -> str:\n    print(f"{name} starting")\n    await asyncio.sleep(duration)\n    print(f"{name} done")\n    return name\n\nasync def main():\n    # Create tasks (they start running immediately!)\n    task1 = asyncio.create_task(worker("A", 2))\n    task2 = asyncio.create_task(worker("B", 1))\n\n    # Do other work while tasks run\n    print("Doing other work...")\n    await asyncio.sleep(0.5)\n\n    # Now await both\n    results = await asyncio.gather(task1, task2)\n    print(results)  # [\'A\', \'B\']\n\nasyncio.run(main())\n# Output:\n# A starting\n# B starting\n# Doing other work...\n# B done (after 1s)\n# A done (after 2s)\n# [\'A\', \'B\']\n\n# === TIMEOUT with wait_for ===\n\nasync def slow_operation():\n    await asyncio.sleep(10)\n    return "finally done"\n\nasync def with_timeout():\n    try:\n        # Cancel if takes longer than 2 seconds\n        result = await asyncio.wait_for(slow_operation(), timeout=2)\n        print(result)\n    except asyncio.TimeoutError:\n        print("Timed out after 2s!")\n\nasyncio.run(with_timeout())  # Timed out after 2s!\n\n# === REAL HTTP REQUESTS WITH httpx ===\n\nasync def fetch_url(client: httpx.AsyncClient, url: str) -> dict:\n    """Fetch a URL asynchronously."""\n    response = await client.get(url, timeout=10)\n    response.raise_for_status()\n    return response.json()\n\nasync def fetch_all(urls: list[str]) -> list[dict]:\n    """Fetch multiple URLs concurrently."""\n    async with httpx.AsyncClient() as client:\n        tasks = [fetch_url(client, url) for url in urls]\n        return await asyncio.gather(*tasks)\n\n# Fetch 10 APIs in ~1s instead of ~10s\nurls = [f"https://httpbin.org/delay/1" for _ in range(10)]\nresults = asyncio.run(fetch_all(urls))\nprint(f"Fetched {len(results)} URLs")',
          explanation: 'async def creates a coroutine. await pauses execution. asyncio.gather runs coroutines concurrently — total time = max, not sum. create_task schedules without awaiting. Use httpx.AsyncClient for async HTTP.'
        },
        {
          filename: 'async_patterns.py',
          language: 'python',
          code: 'import asyncio\nimport time\nfrom typing import AsyncIterator\n\n# === SEMAPHORE — LIMIT CONCURRENCY ===\n# Prevent overwhelming a server with too many parallel requests\n\nasync def fetch_with_limit(url: str, sem: asyncio.Semaphore) -> str:\n    async with sem:  # acquire / release\n        print(f"Fetching {url}")\n        await asyncio.sleep(1)  # simulate request\n        return f"data-{url}"\n\nasync def fetch_all_limited(urls: list[str], max_concurrent: int = 3) -> list[str]:\n    """Fetch URLs but limit to 3 concurrent requests."""\n    sem = asyncio.Semaphore(max_concurrent)\n    tasks = [fetch_with_limit(url, sem) for url in urls]\n    return await asyncio.gather(*tasks)\n\nasync def main():\n    urls = [f"url{i}" for i in range(10)]\n    start = time.perf_counter()\n    results = await fetch_all_limited(urls, max_concurrent=3)\n    print(f"Time: {time.perf_counter() - start:.2f}s")\n    # 10 URLs, 3 at a time, 1s each = ~4 batches * 1s = ~4s\n    # (instead of 1s if all at once, or 10s if sequential)\n\nasyncio.run(main())\n\n# === ASYNC QUEUE — PRODUCER/CONSUMER ===\n\nasync def producer(queue: asyncio.Queue, items: list):\n    """Produce items and put them in the queue."""\n    for item in items:\n        await asyncio.sleep(0.1)  # simulate work\n        await queue.put(item)\n        print(f"Produced: {item}")\n    # Send sentinel to signal completion\n    await queue.put(None)\n\nasync def consumer(queue: asyncio.Queue, name: str):\n    """Consume items from the queue."""\n    while True:\n        item = await queue.get()\n        if item is None:  # sentinel — done\n            # Put sentinel back for other consumers\n            await queue.put(None)\n            break\n        print(f"Consumer {name} processing: {item}")\n        await asyncio.sleep(0.5)  # simulate work\n        queue.task_done()\n\nasync def main():\n    queue = asyncio.Queue(maxsize=10)  # bounded queue\n    items = [f"item-{i}" for i in range(5)]\n\n    # Run producer + 2 consumers concurrently\n    await asyncio.gather(\n        producer(queue, items),\n        consumer(queue, "A"),\n        consumer(queue, "B"),\n    )\n\nasyncio.run(main())\n\n# === ASYNC ITERATOR (async for) ===\n\nasync def async_range(n: int) -> AsyncIterator[int]:\n    """Async generator — yields values with delays."""\n    for i in range(n):\n        await asyncio.sleep(0.1)  # simulate async work\n        yield i\n\nasync def main():\n    async for x in async_range(5):\n        print(x)  # 0, 1, 2, 3, 4 (with 0.1s delay between)\n\nasyncio.run(main())\n\n# === ASYNC CONTEXT MANAGER ===\n\nclass AsyncDatabase:\n    async def __aenter__(self) -> "AsyncDatabase":\n        print("Connecting...")\n        await asyncio.sleep(0.5)  # simulate connect\n        return self\n\n    async def __aexit__(self, exc_type, exc_val, exc_tb):\n        print("Closing...")\n        await asyncio.sleep(0.1)  # simulate close\n\n    async def query(self, sql: str) -> str:\n        await asyncio.sleep(0.2)  # simulate query\n        return f"result of {sql}"\n\nasync def main():\n    async with AsyncDatabase() as db:\n        result = await db.query("SELECT * FROM users")\n        print(result)\n\nasyncio.run(main())\n# Output:\n# Connecting...\n# result of SELECT * FROM users\n# Closing...\n\n# === CANCELLATION ===\n\nasync def long_running():\n    try:\n        print("Starting long task...")\n        await asyncio.sleep(60)  # long operation\n        print("Completed!")\n    except asyncio.CancelledError:\n        print("Was cancelled — cleaning up...")\n        # Cleanup resources here\n        raise  # re-raise to propagate cancellation\n\nasync def main():\n    task = asyncio.create_task(long_running())\n    await asyncio.sleep(1)  # let it start\n    task.cancel()  # request cancellation\n    try:\n        await task\n    except asyncio.CancelledError:\n        print("Task was cancelled")\n\nasyncio.run(main())\n# Output:\n# Starting long task...\n# Was cancelled — cleaning up...\n# Task was cancelled\n\n# === ASYNC GENERATOR WITH QUEUE (streaming) ===\n\nasync def stream_data() -> AsyncIterator[str]:\n    """Simulate streaming data."""\n    for i in range(5):\n        await asyncio.sleep(0.5)\n        yield f"data-{i}"\n\nasync def process_stream():\n    async for data in stream_data():\n        print(f"Processed: {data}")\n\nasyncio.run(process_stream())\n\n# === MIXING SYNC AND ASYNC (run_in_executor) ===\n# For calling sync code (like requests library) from async\n\nimport requests  # sync library\n\nasync def fetch_sync(url: str) -> dict:\n    """Run sync function in thread pool."""\n    loop = asyncio.get_event_loop()\n    return await loop.run_in_executor(None, requests.get, url)\n\n# Or use functools.partial for multiple args\nimport functools\n\nasync def fetch_sync2(url: str, headers: dict) -> dict:\n    loop = asyncio.get_event_loop()\n    func = functools.partial(requests.get, url, headers=headers)\n    return await loop.run_in_executor(None, func)',
          explanation: 'Semaphore limits concurrency. asyncio.Queue for producer-consumer. async for with async generators. async with for async context managers (__aenter__/__aexit__). Handle CancelledError for cleanup. run_in_executor bridges sync code.'
        },
      ],
      lab: {
        title: 'Build a Concurrent Web Scraper',
        objective: 'Scrape 100 URLs concurrently with rate limiting and error handling',
        estTime: '90 minutes',
        difficulty: 'Advanced',
        setup: [
          'pip install httpx aiofiles',
          'Internet access',
        ],
        steps: [
          {
            title: 'Step 1: Basic async fetcher',
            instruction: 'Fetch a single URL asynchronously',
            code: 'import asyncio\nimport httpx\nimport time\n\nasync def fetch(client: httpx.AsyncClient, url: str) -> dict:\n    """Fetch a URL and return status + content length."""\n    try:\n        response = await client.get(url, timeout=10, follow_redirects=True)\n        return {\n            "url": url,\n            "status": response.status_code,\n            "length": len(response.text),\n            "error": None,\n        }\n    except Exception as e:\n        return {\n            "url": url,\n            "status": None,\n            "length": 0,\n            "error": str(e),\n        }\n\nasync def main():\n    async with httpx.AsyncClient() as client:\n        result = await fetch(client, "https://httpbin.org/json")\n        print(result)\n\nasyncio.run(main())',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Add concurrency with gather',
            instruction: 'Fetch multiple URLs concurrently',
            code: 'import asyncio\nimport httpx\nimport time\n\nasync def fetch(client, url):\n    try:\n        response = await client.get(url, timeout=10)\n        return {"url": url, "status": response.status_code, "length": len(response.text)}\n    except Exception as e:\n        return {"url": url, "status": None, "length": 0, "error": str(e)}\n\nasync def fetch_all(urls: list[str]) -> list[dict]:\n    """Fetch all URLs concurrently."""\n    async with httpx.AsyncClient() as client:\n        tasks = [fetch(client, url) for url in urls]\n        return await asyncio.gather(*tasks)\n\nasync def main():\n    urls = [f"https://httpbin.org/delay/1" for _ in range(10)]\n\n    start = time.perf_counter()\n    results = await fetch_all(urls)\n    elapsed = time.perf_counter() - start\n\n    success = sum(1 for r in results if r.get("status") == 200)\n    print(f"Fetched {success}/{len(urls)} URLs in {elapsed:.2f}s")\n    # Concurrent: ~1s (instead of 10s sequential)\n\nasyncio.run(main())',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Add rate limiting with Semaphore',
            instruction: 'Limit to 5 concurrent requests to avoid overwhelming servers',
            code: 'import asyncio\nimport httpx\nimport time\n\nasync def fetch(client, url, sem: asyncio.Semaphore):\n    """Fetch with concurrency limit."""\n    async with sem:  # only 5 can run at once\n        try:\n            response = await client.get(url, timeout=10)\n            return {"url": url, "status": response.status_code}\n        except Exception as e:\n            return {"url": url, "status": None, "error": str(e)}\n\nasync def scrape(urls: list[str], max_concurrent: int = 5) -> list[dict]:\n    """Scrape URLs with rate limiting."""\n    sem = asyncio.Semaphore(max_concurrent)\n    async with httpx.AsyncClient() as client:\n        tasks = [fetch(client, url, sem) for url in urls]\n        return await asyncio.gather(*tasks)\n\nasync def main():\n    # 100 URLs, 5 concurrent, 1s each = ~20s total\n    urls = [f"https://httpbin.org/delay/1?id={i}" for i in range(100)]\n\n    start = time.perf_counter()\n    results = await scrape(urls, max_concurrent=5)\n    elapsed = time.perf_counter() - start\n\n    success = sum(1 for r in results if r.get("status") == 200)\n    print(f"Scraped {success}/{len(urls)} URLs in {elapsed:.1f}s")\n    print(f"Concurrency: 5, expected ~20s")\n\nasyncio.run(main())',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Add retry and progress tracking',
            instruction: 'Retry failed requests, show progress bar',
            code: 'import asyncio\nimport httpx\nimport time\nfrom typing import Callable\n\nasync def fetch_with_retry(\n    client: httpx.AsyncClient,\n    url: str,\n    sem: asyncio.Semaphore,\n    max_retries: int = 3,\n) -> dict:\n    """Fetch with exponential backoff retry."""\n    async with sem:\n        for attempt in range(max_retries):\n            try:\n                response = await client.get(url, timeout=10)\n                response.raise_for_status()\n                return {"url": url, "status": response.status_code, "attempts": attempt + 1}\n            except Exception as e:\n                if attempt < max_retries - 1:\n                    wait = 2 ** attempt  # 1s, 2s, 4s\n                    await asyncio.sleep(wait)\n                else:\n                    return {"url": url, "status": None, "error": str(e), "attempts": attempt + 1}\n\nasync def scrape_with_progress(\n    urls: list[str],\n    max_concurrent: int = 5,\n    progress_callback: Callable[[int, int], None] = None,\n) -> list[dict]:\n    """Scrape with progress tracking."""\n    sem = asyncio.Semaphore(max_concurrent)\n    completed = 0\n    total = len(urls)\n\n    async def fetch_and_track(client, url):\n        nonlocal completed\n        result = await fetch_with_retry(client, url, sem)\n        completed += 1\n        if progress_callback:\n            progress_callback(completed, total)\n        return result\n\n    async with httpx.AsyncClient() as client:\n        tasks = [fetch_and_track(client, url) for url in urls]\n        return await asyncio.gather(*tasks)\n\ndef show_progress(done: int, total: int):\n    pct = done / total * 100\n    bar = "#" * int(pct // 5) + "-" * (20 - int(pct // 5))\n    print(f"\\r[{bar}] {done}/{total} ({pct:.0f}%)", end="", flush=True)\n\nasync def main():\n    urls = [f"https://httpbin.org/delay/1?id={i}" for i in range(50)]\n\n    print("Scraping 50 URLs (5 concurrent, 3 retries each)...")\n    start = time.perf_counter()\n    results = await scrape_with_progress(\n        urls,\n        max_concurrent=5,\n        progress_callback=show_progress,\n    )\n    elapsed = time.perf_counter() - start\n    print()  # newline after progress bar\n\n    success = sum(1 for r in results if r.get("status") == 200)\n    failed = [r for r in results if r.get("error")]\n    print(f"\\nDone in {elapsed:.1f}s")\n    print(f"Success: {success}/{len(urls)}")\n    if failed:\n        print(f"Failed: {len(failed)}")\n        for f in failed[:3]:\n            print(f"  {f[\'url\']}: {f[\'error\']}")\n\nasyncio.run(main())',
            codeLanguage: 'python',
          },
        ],
        verification: 'Scrapes 50 URLs with rate limiting, retries, and progress bar. Should complete in ~10s with 5 concurrent.',
      },
      exercises: [
        {
          prompt: 'Write an async function that fetches 5 URLs concurrently and returns the total size of all responses.',
          starterCode: 'import asyncio\nimport httpx\n\nasync def total_size(urls: list[str]) -> int:\n    # your code\n    pass\n',
          hint: 'Use httpx.AsyncClient, asyncio.gather, sum of response lengths.',
          solution: 'import asyncio\nimport httpx\n\nasync def fetch_size(client: httpx.AsyncClient, url: str) -> int:\n    response = await client.get(url)\n    return len(response.text)\n\nasync def total_size(urls: list[str]) -> int:\n    async with httpx.AsyncClient() as client:\n        tasks = [fetch_size(client, url) for url in urls]\n        sizes = await asyncio.gather(*tasks)\n        return sum(sizes)\n\nurls = ["https://httpbin.org/json"] * 5\nresult = asyncio.run(total_size(urls))\nprint(f"Total size: {result} bytes")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When should you use async/await?',
          options: [
            'For CPU-bound work (math, image processing)',
            'For I/O-bound work (network, disk, database)',
            'Always — async is always better',
            'Never — use threading instead',
          ],
          correctIndex: 1,
          explanation: 'Async is for I/O-bound work. While one coroutine waits for I/O, others run. For CPU-bound work, use multiprocessing (async gives no benefit due to GIL).'
        },
        {
          question: 'What does asyncio.gather do?',
          options: [
            'Runs coroutines sequentially',
            'Runs coroutines concurrently and collects results in order',
            'Cancels all coroutines',
            'Waits for all to fail',
          ],
          correctIndex: 1,
          explanation: 'gather() runs all coroutines concurrently. Returns a list of results in the SAME ORDER as the input coroutines. Total time = max individual time, not sum.'
        },
        {
          question: 'How to limit concurrency in asyncio?',
          options: [
            'asyncio.Limit',
            'asyncio.Semaphore',
            'asyncio.Queue',
            'Cannot be done',
          ],
          correctIndex: 1,
          explanation: 'asyncio.Semaphore(n) limits to n concurrent accesses. Use `async with sem:` inside your coroutine to acquire/release.'
        },
        {
          question: 'How to call sync code from async?',
          options: [
            'Cannot be done',
            'loop.run_in_executor() — runs sync function in thread pool',
            'Use await directly',
            'Convert to async first',
          ],
          correctIndex: 1,
          explanation: 'run_in_executor() runs a sync function in a thread pool, returning an awaitable. This is how you bridge sync libraries (like requests) into async code.'
        },
      ],
      keyTakeaways: [
        'Use async/await for I/O-bound work, multiprocessing for CPU-bound',
        'asyncio.gather runs coroutines concurrently — total time = max, not sum',
        'asyncio.create_task schedules a coroutine without awaiting',
        'Semaphore limits concurrency, Queue for producer-consumer',
        'async for with async generators, async with for async context managers',
        'Use httpx.AsyncClient for async HTTP requests',
        'Handle CancelledError for cleanup in long-running tasks',
        'run_in_executor bridges sync code into async context',
      ],
      resources: [
        { title: 'asyncio Documentation', url: 'https://docs.python.org/3/library/asyncio.html', type: 'docs' },
        { title: 'httpx Documentation', url: 'https://www.python-httpx.org/', type: 'docs' },
        { title: 'Real Python — Async IO', url: 'https://realpython.com/async-io-python/', type: 'article' },
        { title: 'aiohttp Documentation', url: 'https://docs.aiohttp.org/', type: 'docs' },
      ]
    },

    {
      id: 'py-12',
      title: 'Testing with pytest — Fixtures, Mocking, Coverage',
      subtitle: 'Write tests like a senior engineer — fixtures, parametrize, mocking, TDD',
      duration: 70,
      difficulty: 'Intermediate',
      phase: 'Real-World',
      content: [
        'pytest is the most popular Python testing framework. Simpler than unittest, more powerful. Discovers tests automatically (test_*.py files, test_* functions). Uses plain assert — no self.assertEqual nonsense.',
        'Fixtures are setup functions reused across tests. Use @pytest.fixture. Scope: function (default, runs per test), class, module, session. Use yield for setup/teardown. Fixtures can depend on other fixtures.',
        'Use @pytest.mark.parametrize to run one test with multiple inputs. Use markers (@pytest.mark.slow) to group/filter tests. conftest.py shares fixtures across files.',
        'Mocking: use unittest.mock.patch to replace dependencies (DB, APIs) with mocks. Use pytest-mock for cleaner syntax. Verify calls with assert_called_with. Mock external services in unit tests, use real ones in integration tests.',
      ],
      codeExamples: [
        {
          filename: 'test_basics.py',
          language: 'python',
          code: '# test_math.py\nimport pytest\n\ndef add(a: int, b: int) -> int:\n    return a + b\n\n# === BASIC TEST ===\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0\n    assert add(0, 0) == 0\n\n# === TEST EXCEPTIONS ===\ndef test_divide_by_zero():\n    with pytest.raises(ZeroDivisionError):\n        1 / 0\n\n# Test exception message with regex\ndef test_value_error():\n    with pytest.raises(ValueError, match="must be positive"):\n        raise ValueError("age must be positive")\n\n# === PARAMETRIZED TESTS (data-driven) ===\n@pytest.mark.parametrize("a, b, expected", [\n    (1, 2, 3),\n    (-1, 1, 0),\n    (0, 0, 0),\n    (100, 200, 300),\n    (-5, -5, -10),\n])\ndef test_add_parametrized(a, b, expected):\n    assert add(a, b) == expected\n\n# Parametrize with IDs (for readable test names)\n@pytest.mark.parametrize("input,expected", [\n    ("radar", True),\n    ("level", True),\n    ("hello", False),\n], ids=["radar_palindrome", "level_palindrome", "hello_not"])\ndef test_is_palindrome(input, expected):\n    assert (input == input[::-1]) == expected\n\n# === MARKERS — group and filter tests ===\n@pytest.mark.slow\ndef test_long_running():\n    import time\n    time.sleep(5)\n    assert True\n\n@pytest.mark.integration\ndef test_database():\n    # requires real database\n    pass\n\n@pytest.mark.skip(reason="Not implemented yet")\ndef test_future_feature():\n    pass\n\n@pytest.mark.skipif(sys.platform == "win32", reason="Unix only")\ndef test_unix_feature():\n    pass\n\n@pytest.mark.xfail(reason="Known bug #123")\ndef test_known_bug():\n    assert 1 == 2  # expected to fail\n\n# Run: pytest -v\n# Run slow only: pytest -m slow\n# Skip slow: pytest -m "not slow"\n# Run integration: pytest -m integration\n\n# === FIXTURES ===\n\n@pytest.fixture\ndef sample_user():\n    """Fixture — reusable test data."""\n    return {"id": 1, "name": "Alice", "email": "alice@example.com"}\n\ndef test_user_name(sample_user):  # fixture injected by name\n    assert sample_user["name"] == "Alice"\n\ndef test_user_email(sample_user):\n    assert "@" in sample_user["email"]\n\n# Fixture with setup/teardown (yield)\n@pytest.fixture\ndef db_session():\n    # SETUP — runs before test\n    session = create_session()\n    session.begin()\n    yield session  # test runs here\n    # TEARDOWN — runs after test (even on exception)\n    session.rollback()\n    session.close()\n\ndef test_db_query(db_session):\n    db_session.add(User(name="test"))\n    db_session.commit()\n    assert db_session.query(User).count() == 1\n\n# Session-scoped fixture (runs once per session)\n@pytest.fixture(scope="session")\ndef app():\n    app = create_app()\n    app.config["TESTING"] = True\n    yield app  # runs once\n    app.cleanup()\n\n# Module-scoped fixture (runs once per file)\n@pytest.fixture(scope="module")\ndef test_data():\n    return load_large_dataset()  # expensive, do once\n\n# === FACTORY FIXTURE — create multiple instances ===\n@pytest.fixture\ndef make_user():\n    """Factory that creates users."""\n    def _make(name="Test", email=None, age=25):\n        return {\n            "name": name,\n            "email": email or f"{name.lower()}@test.com",\n            "age": age,\n        }\n    return _make\n\ndef test_factory(make_user):\n    u1 = make_user("Alice")\n    u2 = make_user("Bob", age=30)\n    assert u1["email"] == "alice@test.com"\n    assert u2["age"] == 30\n\n# === FIXTURE DEPENDENCIES ===\n@pytest.fixture\ndef db():\n    return {"users": []}\n\n@pytest.fixture\ndef user_with_posts(db):  # depends on db fixture\n    user = {"id": 1, "name": "Alice", "posts": []}\n    db["users"].append(user)\n    return user\n\ndef test_user_in_db(db, user_with_posts):\n    assert len(db["users"]) == 1\n    assert db["users"][0]["name"] == "Alice"\n\n# === CONFTEST.PY — shared fixtures ===\n# tests/conftest.py:\n# import pytest\n# @pytest.fixture\n# def client():\n#     from myapp import app\n#     with app.test_client() as c:\n#         yield c\n#\n# Now `client` is available in ALL test files',
          explanation: 'pytest uses plain assert. @parametrize for data-driven tests. @fixture for setup/teardown (yield). Factory fixtures create multiple instances. conftest.py shares fixtures across files.'
        },
        {
          filename: 'mocking.py',
          language: 'python',
          code: 'import pytest\nfrom unittest.mock import Mock, patch, MagicMock, call\nfrom myapp.services import UserService, fetch_user\n\n# === MOCK — fake object ===\n\ndef test_mock_basic():\n    mock = Mock()\n    mock.method.return_value = "fake"\n\n    result = mock.method("arg")\n    assert result == "fake"\n\n    # Verify it was called\n    mock.method.assert_called_once()\n    mock.method.assert_called_once_with("arg")\n    mock.method.assert_called_with("arg")\n\n# Mock with different return values per call\nmock = Mock()\nmock.side_effect = [1, 2, 3]  # returns 1, then 2, then 3\nprint(mock())  # 1\nprint(mock())  # 2\nprint(mock())  # 3\n\n# Mock that raises an exception\nmock = Mock()\nmock.side_effect = ValueError("boom")\n# mock()  # raises ValueError\n\n# === PATCH — REPLACE REAL OBJECTS ===\n\n# Patch a function\ndef test_fetch_user():\n    with patch("myapp.services.requests.get") as mock_get:\n        # Configure the mock\n        mock_response = Mock()\n        mock_response.status_code = 200\n        mock_response.json.return_value = {"id": 1, "name": "Alice"}\n        mock_get.return_value = mock_response\n\n        # Call the function that uses requests.get\n        result = fetch_user(1)\n\n        # Verify\n        assert result["name"] == "Alice"\n        mock_get.assert_called_once_with("https://api/users/1")\n\n# Patch as decorator (cleaner)\n@patch("myapp.services.requests.get")\ndef test_fetch_user_decorated(mock_get):\n    mock_response = Mock()\n    mock_response.json.return_value = {"name": "Alice"}\n    mock_get.return_value = mock_response\n\n    result = fetch_user(1)\n    assert result["name"] == "Alice"\n\n# Patch a class\n@patch("myapp.services.UserService")\ndef test_user_service(MockUserService):\n    # MockUserService is the CLASS, .return_value is the INSTANCE\n    mock_instance = MockUserService.return_value\n    mock_instance.get_user.return_value = {"id": 1, "name": "Alice"}\n\n    # Code that uses UserService\n    service = UserService()\n    user = service.get_user(1)\n    assert user["name"] == "Alice"\n\n# === PYTEST-MOCK (cleaner — uses mocker fixture) ===\n# pip install pytest-mock\n\ndef test_with_mocker(mocker):\n    # mocker.patch is auto-cleaned after test\n    mock_get = mocker.patch("myapp.services.requests.get")\n    mock_get.return_value.json.return_value = {"name": "Alice"}\n\n    result = fetch_user(1)\n    assert result["name"] == "Alice"\n    mock_get.assert_called_once()\n\n# === MOCK MULTIPLE METHODS ===\n\ndef test_complex_mock(mocker):\n    mock_client = mocker.patch("myapp.services.HttpClient")\n    instance = mock_client.return_value\n\n    # Different return values for different methods\n    instance.get_user.return_value = {"id": 1, "name": "Alice"}\n    instance.get_posts.return_value = [{"title": "Hello"}]\n    instance.create_user.return_value = {"id": 2}\n\n    service = UserService(client=HttpClient())\n    user = service.get_user(1)\n    posts = service.get_posts(1)\n\n    assert user["name"] == "Alice"\n    assert len(posts) == 1\n\n    # Verify call count and arguments\n    assert instance.get_user.call_count == 1\n    instance.get_user.assert_called_with(1)\n\n# === ASSERT CALLED WITH — verify mock interactions ===\n\ndef test_assertions():\n    mock = Mock()\n\n    mock(1, 2, key="value")\n    mock(3, 4)\n\n    # Was called at all?\n    mock.assert_called()\n\n    # Was called exactly twice?\n    assert mock.call_count == 2\n\n    # Last call\n    mock.assert_called_with(3, 4)\n\n    # First call\n    mock.assert_any_call(1, 2, key="value")\n\n    # All calls\n    assert mock.call_args_list == [\n        call(1, 2, key="value"),\n        call(3, 4),\n    ]\n\n# === PATCH.BUILTINS — mock built-in functions ===\n\ndef test_print(mocker):\n    mock_print = mocker.patch("builtins.print")\n    my_function_that_prints()\n    mock_print.assert_called_with("Hello")\n\n# Mock open() for file operations\ndef test_file_write(mocker):\n    mock_open = mocker.patch("builtins.open", mocker.mock_open())\n\n    with open("file.txt", "w") as f:\n        f.write("hello")\n\n    mock_open.assert_called_once_with("file.txt", "w")\n    handle = mock_open()\n    handle.write.assert_called_once_with("hello")\n\n# === SPY — wrap real object, count calls ===\n\ndef test_spy(mocker):\n    # spy wraps the real function but tracks calls\n    spy = mocker.spy(MyClass, "method")\n\n    obj = MyClass()\n    result = obj.method(1, 2)  # REAL method runs\n\n    assert result == 3  # real result\n    assert spy.call_count == 1\n    spy.assert_called_with(1, 2)\n\n# === FAKE TIME ===\n\ndef test_with_frozen_time(mocker):\n    # Freeze time for deterministic tests\n    mock_datetime = mocker.patch("myapp.services.datetime")\n    mock_datetime.now.return_value = datetime(2024, 1, 15, 10, 30)\n\n    result = my_function_that_uses_time()\n    assert result == "2024-01-15 10:30"\n\n# Or use freezegun: pip install freezegun\n# from freezegun import freeze_time\n# @freeze_time("2024-01-15")\n# def test_with_frozen_time():\n#     assert datetime.now() == datetime(2024, 1, 15)',
          explanation: 'Mock creates fake objects. patch replaces real objects temporarily. pytest-mock (mocker fixture) auto-cleans. Verify with assert_called_with, call_count, call_args_list. Spy wraps real functions to track calls.'
        },
        {
          filename: 'test_fastapi.py',
          language: 'python',
          code: '# === TESTING FASTAPI WITH TESTCLIENT ===\n# pip install httpx pytest\n\nfrom fastapi.testclient import TestClient\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\nfrom main import app, get_db, Base\nimport pytest\n\n# Test database (in-memory SQLite — fast!)\nSQLALCHEMY_URL = "sqlite:///./test.db"\nengine = create_engine(SQLALCHEMY_URL, connect_args={"check_same_thread": False})\nTestingSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)\n\n# Override the get_db dependency\ndef override_get_db():\n    db = TestingSession()\n    try:\n        yield db\n    finally:\n        db.close()\n\napp.dependency_overrides[get_db] = override_get_db\n\n# Create tables once\nBase.metadata.create_all(engine)\n\nclient = TestClient(app)\n\n# === FIXTURES ===\n\n@pytest.fixture(autouse=True)\ndef clean_db():\n    """Clean all tables before each test."""\n    for table in reversed(Base.metadata.sorted_tables):\n        engine.execute(table.delete())\n    yield\n\ndef test_create_user():\n    response = client.post(\n        "/users",\n        json={"email": "test@test.com", "name": "Test", "password": "pass"}\n    )\n    assert response.status_code == 201\n    data = response.json()\n    assert data["email"] == "test@test.com"\n    assert "password" not in data  # password not returned!\n\ndef test_get_user_not_found():\n    response = client.get("/users/9999")\n    assert response.status_code == 404\n\ndef test_duplicate_email():\n    user = {"email": "dup@test.com", "name": "A", "password": "p"}\n    client.post("/users", json=user)\n    response = client.post("/users", json=user)\n    assert response.status_code == 400\n\n# === PARAMETRIZED API TESTS ===\n\n@pytest.mark.parametrize("email,valid", [\n    ("valid@test.com", True),\n    ("invalid", False),\n    ("", False),\n    ("@test.com", False),\n    ("a@b.c", True),\n])\ndef test_email_validation(email, valid):\n    response = client.post("/users", json={\n        "email": email, "name": "T", "password": "p"\n    })\n    if valid:\n        assert response.status_code == 201\n    else:\n        assert response.status_code == 422\n\n# === TEST AUTH ===\n\ndef get_auth_token(client, email="test@test.com", password="pass"):\n    """Helper to get JWT token."""\n    client.post("/users", json={"email": email, "name": "T", "password": password})\n    response = client.post(\n        "/token",\n        data={"username": email, "password": password}\n    )\n    return response.json()["access_token"]\n\ndef test_protected_endpoint():\n    token = get_auth_token(client)\n    response = client.get(\n        "/users/me",\n        headers={"Authorization": f"Bearer {token}"}\n    )\n    assert response.status_code == 200\n    assert response.json()["email"] == "test@test.com"\n\ndef test_protected_no_token():\n    response = client.get("/users/me")\n    assert response.status_code == 401\n\n# === ASYNC TESTS (for async endpoints) ===\n\nimport pytest_asyncio\nfrom httpx import AsyncClient, ASGITransport\n\n@pytest_asyncio.fixture\nasync def async_client():\n    async with AsyncClient(\n        transport=ASGITransport(app=app),\n        base_url="http://test"\n    ) as c:\n        yield c\n\n@pytest.mark.asyncio\nasync def test_async_endpoint(async_client):\n    response = await async_client.get("/users")\n    assert response.status_code == 200\n\n# === COVERAGE ===\n# Run: pytest --cov=myapp --cov-report=html\n# Open: htmlcov/index.html\n\n# pyproject.toml:\n# [tool.pytest.ini_options]\n# addopts = "-v --cov=src --cov-report=term-missing --cov-report=html"\n# testpaths = ["tests"]\n#\n# [tool.coverage.run]\n# source = ["src"]\n# omit = ["tests/*"]\n#\n# [tool.coverage.report]\n# exclude_lines = [\n#     "pragma: no cover",\n#     "if __name__ == .__main__.:",\n#     "if TYPE_CHECKING:",\n# ]',
          explanation: 'TestClient makes HTTP requests in-process (no server needed). Override dependencies to use test DB. Clean DB between tests with autouse fixture. Use AsyncClient for async endpoints. Run coverage with --cov.'
        },
      ],
      lab: {
        title: 'Write Tests for a Real Application',
        objective: 'Test a FastAPI app with fixtures, mocking, parametrize, and coverage',
        estTime: '90 minutes',
        difficulty: 'Intermediate',
        setup: [
          'pip install pytest pytest-cov pytest-mock pytest-asyncio httpx',
          'A FastAPI app to test (or create one)',
        ],
        steps: [
          {
            title: 'Step 1: Set up test structure',
            instruction: 'Create tests/ directory with conftest.py',
            code: '# tests/conftest.py\nimport pytest\nfrom fastapi.testclient import TestClient\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\nfrom myapp.main import app, get_db, Base\n\n# Test DB (in-memory SQLite — instant!)\nengine = create_engine("sqlite://", connect_args={"check_same_thread": False})\nTestingSession = sessionmaker(bind=engine)\n\ndef override_get_db():\n    db = TestingSession()\n    try:\n        yield db\n    finally:\n        db.close()\n\n@pytest.fixture(scope="session", autouse=True)\ndef setup_db():\n    Base.metadata.create_all(engine)\n    yield\n    Base.metadata.drop_all(engine)\n\n@pytest.fixture(autouse=True)\ndef clean_db():\n    """Clean tables before each test."""\n    for table in reversed(Base.metadata.sorted_tables):\n        engine.execute(table.delete())\n    yield\n\n@pytest.fixture\ndef client():\n    app.dependency_overrides[get_db] = override_get_db\n    yield TestClient(app)\n    app.dependency_overrides.clear()\n\n@pytest.fixture\ndef sample_user(client):\n    response = client.post("/users", json={\n        "email": "test@test.com",\n        "name": "Test User",\n        "password": "password123"\n    })\n    return response.json()',
            codeLanguage: 'python',
          },
          {
            title: 'Step 2: Write unit tests',
            instruction: 'Test individual functions with parametrize',
            code: '# tests/test_services.py\nimport pytest\nfrom myapp.services import validate_email, hash_password, verify_password\n\n@pytest.mark.parametrize("email,valid", [\n    ("user@example.com", True),\n    ("user.name@domain.co.uk", True),\n    ("invalid", False),\n    ("@domain.com", False),\n    ("user@", False),\n    ("", False),\n    (None, False),\n])\ndef test_validate_email(email, valid):\n    assert validate_email(email) == valid\n\ndef test_hash_password():\n    password = "mysecret"\n    hashed = hash_password(password)\n    assert hashed != password\n    assert hashed.startswith("$2b$")  # bcrypt format\n\ndef test_verify_password():\n    password = "mysecret"\n    hashed = hash_password(password)\n    assert verify_password(password, hashed) is True\n    assert verify_password("wrong", hashed) is False',
            codeLanguage: 'python',
          },
          {
            title: 'Step 3: Write API tests',
            instruction: 'Test endpoints with TestClient',
            code: '# tests/test_api.py\ndef test_create_user(client):\n    response = client.post("/users", json={\n        "email": "new@test.com",\n        "name": "New User",\n        "password": "pass123"\n    })\n    assert response.status_code == 201\n    data = response.json()\n    assert data["email"] == "new@test.com"\n    assert "password" not in data\n    assert "hashed_password" not in data\n\ndef test_create_duplicate_email(client, sample_user):\n    response = client.post("/users", json={\n        "email": sample_user["email"],\n        "name": "Another",\n        "password": "pass"\n    })\n    assert response.status_code == 400\n\ndef test_get_user(client, sample_user):\n    response = client.get(f"/users/{sample_user[\'id\']}")\n    assert response.status_code == 200\n    assert response.json()["email"] == sample_user["email"]\n\ndef test_get_user_not_found(client):\n    response = client.get("/users/99999")\n    assert response.status_code == 404\n\ndef test_list_users(client, sample_user):\n    response = client.get("/users")\n    assert response.status_code == 200\n    users = response.json()\n    assert len(users) >= 1\n\ndef test_delete_user(client, sample_user):\n    response = client.delete(f"/users/{sample_user[\'id\']}")\n    assert response.status_code == 204\n    # Verify it\'s gone\n    response = client.get(f"/users/{sample_user[\'id\']}")\n    assert response.status_code == 404',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Write tests with mocking',
            instruction: 'Mock external services (email, payment, etc.)',
            code: '# tests/test_with_mocks.py\ndef test_send_welcome_email(client, mocker):\n    """Test that welcome email is sent on registration."""\n    mock_send = mocker.patch("myapp.services.send_email")\n\n    response = client.post("/users", json={\n        "email": "new@test.com",\n        "name": "New",\n        "password": "pass"\n    })\n\n    assert response.status_code == 201\n    # Verify email was "sent"\n    mock_send.assert_called_once()\n    call_args = mock_send.call_args\n    assert "new@test.com" in call_args.args[0]  # recipient\n    assert "Welcome" in call_args.args[1]  # subject\n\ndef test_payment_failure(client, mocker, sample_user):\n    """Test handling of payment service failure."""\n    mock_charge = mocker.patch("myapp.services.charge_card")\n    mock_charge.side_effect = Exception("Payment failed")\n\n    response = client.post(f"/users/{sample_user[\'id\']}/subscribe",\n                          json={"plan": "premium"})\n\n    assert response.status_code == 502  # Bad Gateway\n    assert "payment" in response.json()["detail"].lower()\n\ndef test_external_api_timeout(client, mocker, sample_user):\n    """Test handling of external API timeout."""\n    mock_get = mocker.patch("httpx.get")\n    mock_get.side_effect = httpx.TimeoutException("timeout")\n\n    response = client.get(f"/users/{sample_user[\'id\']}/recommendations")\n\n    assert response.status_code == 504  # Gateway Timeout',
            codeLanguage: 'python',
          },
          {
            title: 'Step 5: Run with coverage',
            instruction: 'See which code is covered by tests',
            code: '# Run tests with coverage\npytest --cov=myapp --cov-report=term-missing --cov-report=html\n\n# Output:\n# Name                          Stmts   Miss  Cover   Missing\n# -----------------------------------------------------------\n# myapp/__init__.py                 1      0   100%\n# myapp/main.py                    20      2    90%   15, 23\n# myapp/services.py                45      5    89%   34-38, 52\n# myapp/models.py                  30      0   100%\n# -----------------------------------------------------------\n# TOTAL                           96      7    93%\n\n# Open detailed HTML report:\n# open htmlcov/index.html\n\n# Set up in pyproject.toml:\n# [tool.pytest.ini_options]\n# addopts = "--cov=myapp --cov-report=term-missing"\n# [tool.coverage.report]\n# fail_under = 80  # fail CI if coverage < 80%',
            codeLanguage: 'bash',
          },
        ],
        verification: 'All tests pass. Coverage > 80%. HTML report generated.',
      },
      exercises: [
        {
          prompt: 'Write a parametrized test for is_palindrome(s) with 6 cases (3 true, 3 false).',
          starterCode: 'import pytest\n\ndef is_palindrome(s: str) -> bool:\n    return s == s[::-1]\n\n@pytest.mark.parametrize("input,expected", [\n    # your cases\n])\ndef test_is_palindrome(input, expected):\n    assert is_palindrome(input) == expected\n',
          hint: 'True: radar, level, racecar. False: hello, world, python.',
          solution: 'import pytest\n\ndef is_palindrome(s: str) -> bool:\n    return s == s[::-1]\n\n@pytest.mark.parametrize("input,expected", [\n    ("radar", True),\n    ("level", True),\n    ("racecar", True),\n    ("hello", False),\n    ("world", False),\n    ("python", False),\n])\ndef test_is_palindrome(input, expected):\n    assert is_palindrome(input) == expected',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does a fixture with yield do?',
          options: [
            'Returns a generator',
            'Setup before yield, teardown after (even on exception)',
            'Same as return',
            'Caches the value',
          ],
          correctIndex: 1,
          explanation: 'Code before yield is setup, code after is teardown. The yielded value is injected into the test. Teardown runs even if the test raises.'
        },
        {
          question: 'What does @pytest.mark.parametrize do?',
          options: [
            'Runs tests in parallel',
            'Runs the same test multiple times with different arguments',
            'Marks as slow',
            'Skips the test',
          ],
          correctIndex: 1,
          explanation: 'parametrize runs the test function once per set of arguments. Great for testing the same logic with many inputs without writing duplicate tests.'
        },
        {
          question: 'What does unittest.mock.patch do?',
          options: [
            'Tests a function',
            'Replaces an object with a Mock for the test duration',
            'Adds logging',
            'Skips the test',
          ],
          correctIndex: 1,
          explanation: 'patch temporarily replaces the target (function, class, attribute) with a Mock. After the test, the original is restored. Perfect for replacing external dependencies.'
        },
        {
          question: 'Where do shared fixtures go?',
          options: [
            'In each test file',
            'In conftest.py (automatically discovered by pytest)',
            'In pyproject.toml',
            'In setup.py',
          ],
          correctIndex: 1,
          explanation: 'conftest.py is automatically discovered by pytest. Fixtures defined there are available to all test files in the same directory and subdirectories.'
        },
      ],
      keyTakeaways: [
        'pytest uses plain assert — no self.assertEqual nonsense',
        'Fixtures (with yield) provide reusable setup/teardown',
        'Use @pytest.mark.parametrize for data-driven tests',
        'Mock with @patch or pytest-mock (mocker fixture) — replace dependencies',
        'conftest.py shares fixtures across all test files',
        'Markers (skip, xfail, custom) organize and filter tests',
        'TestClient makes HTTP requests in-process for FastAPI testing',
        'Run coverage: pytest --cov=src --cov-report=html',
      ],
      resources: [
        { title: 'pytest Documentation', url: 'https://docs.pytest.org/', type: 'docs' },
        { title: 'pytest Fixtures', url: 'https://docs.pytest.org/en/stable/explanation/fixtures.html', type: 'docs' },
        { title: 'Obey the Testing Goat (free book)', url: 'https://www.obeythetestinggoat.com/', type: 'book', isHiddenGem: true },
        { title: 'pytest-mock', url: 'https://github.com/pytest-dev/pytest-mock/', type: 'docs' },
      ]
    },

    {
      id: 'py-13',
      title: 'Logging, Configuration & CLI Apps',
      subtitle: 'Production logging, env config, Click/Typer CLIs',
      duration: 65,
      difficulty: 'Intermediate',
      phase: 'Real-World',
      content: [
        'NEVER use print() for production logging. Use the logging module — it supports levels (DEBUG, INFO, WARNING, ERROR, CRITICAL), formatters, handlers (console, file, network), and rotation. Structured logging (JSON) is essential for production observability.',
        'Configuration: use pydantic-settings (or python-dotenv) to load .env files. NEVER hardcode secrets. Use environment variables for everything that changes between environments. pydantic-settings validates types and provides defaults.',
        'For CLI apps, use Click (decorator-based) or Typer (Click + type hints). They handle argument parsing, validation, help text, and subcommands automatically. Rich adds beautiful terminal output (colors, tables, progress bars).',
        'Structure: config.py (settings), logger.py (logging setup), cli.py (commands), services/ (business logic). This separation makes testing easy — test services without CLI, swap config for tests.',
      ],
      codeExamples: [
        {
          filename: 'logging.py',
          language: 'python',
          code: 'import logging\nimport sys\nimport json\nfrom logging.handlers import RotatingFileHandler, TimedRotatingFileHandler\nfrom pathlib import Path\nfrom datetime import datetime\n\n# === BASIC LOGGING ===\nlogging.basicConfig(\n    level=logging.INFO,\n    format="%(asctime)s | %(name)s | %(levelname)-8s | %(message)s",\n    datefmt="%Y-%m-%d %H:%M:%S",\n)\nlogger = logging.getLogger(__name__)\n\nlogger.debug("Debug message")     # not shown (level=INFO)\nlogger.info("Info message")       # shown\nlogger.warning("Warning!")        # shown\nlogger.error("Error occurred")    # shown\nlogger.critical("Critical!")      # shown\n\n# === PRODUCTION LOGGING SETUP ===\n\ndef setup_logger(\n    name: str = "app",\n    log_file: str = "logs/app.log",\n    level: int = logging.DEBUG,\n) -> logging.Logger:\n    """Configure a production-ready logger with console + file output."""\n    logger = logging.getLogger(name)\n    logger.setLevel(level)\n    logger.handlers.clear()  # avoid duplicate handlers\n\n    # Format\n    fmt = logging.Formatter(\n        "%(asctime)s | %(name)s | %(levelname)-8s | %(filename)s:%(lineno)d | %(message)s",\n        datefmt="%Y-%m-%d %H:%M:%S",\n    )\n\n    # Console handler (INFO and above)\n    console = logging.StreamHandler(sys.stdout)\n    console.setLevel(logging.INFO)\n    console.setFormatter(fmt)\n    logger.addHandler(console)\n\n    # File handler with rotation (10MB, keep 5 backups)\n    log_path = Path(log_file)\n    log_path.parent.mkdir(parents=True, exist_ok=True)\n    file_handler = RotatingFileHandler(\n        log_file,\n        maxBytes=10_000_000,  # 10MB\n        backupCount=5,\n        encoding="utf-8",\n    )\n    file_handler.setLevel(logging.DEBUG)\n    file_handler.setFormatter(fmt)\n    logger.addHandler(file_handler)\n\n    return logger\n\n# === STRUCTURED LOGGING (JSON) — for production ===\n\nclass JsonFormatter(logging.Formatter):\n    """JSON formatter for structured logging (ELK, Datadog, etc.)."""\n\n    def format(self, record: logging.LogRecord) -> str:\n        log_data = {\n            "timestamp": datetime.utcnow().isoformat() + "Z",\n            "level": record.levelname,\n            "logger": record.name,\n            "message": record.getMessage(),\n            "module": record.module,\n            "function": record.funcName,\n            "line": record.lineno,\n        }\n        if record.exc_info:\n            log_data["exception"] = self.formatException(record.exc_info)\n        # Add extra fields\n        for key, value in record.__dict__.items():\n            if key not in {"args", "msg", "levelname", "levelno", "pathname",\n                          "filename", "module", "exc_info", "exc_text",\n                          "funcName", "lineno", "created", "msecs", "relativeCreated",\n                          "thread", "threadName", "processName", "process",\n                          "name", "message"}:\n                log_data[key] = value\n        return json.dumps(log_data)\n\n# Usage: structured logging\ndef setup_json_logger(name: str = "app") -> logging.Logger:\n    logger = logging.getLogger(name)\n    logger.setLevel(logging.INFO)\n    handler = logging.StreamHandler(sys.stdout)\n    handler.setFormatter(JsonFormatter())\n    logger.addHandler(handler)\n    return logger\n\nlogger = setup_json_logger("myapp")\nlogger.info("User logged in", extra={"user_id": 42, "ip": "1.2.3.4"})\n# {"timestamp": "2024-01-15T10:30:00Z", "level": "INFO", "logger": "myapp", "message": "User logged in", "user_id": 42, "ip": "1.2.3.4", ...}\n\n# === LOG LEVELS — when to use each ===\n# DEBUG   — detailed diagnostic info (only in development)\n# INFO    — confirmation that things are working (default for production)\n# WARNING — something unexpected, but app still works\n# ERROR   — serious problem, app could not do something\n# CRITICAL — app cannot continue (system-level failure)\n\n# === LOG EXCEPTIONS WITH TRACEBACKS ===\ntry:\n    risky_operation()\nexcept Exception:\n    logger.exception("Operation failed")  # includes full traceback!\n    # OR\n    logger.error("Operation failed", exc_info=True)\n    # OR with extra context\n    logger.error("Failed to process user", extra={"user_id": uid}, exc_info=True)\n\n# === TIMED ROTATION (daily logs) ===\nhandler = TimedRotatingFileHandler(\n    "logs/app.log",\n    when="midnight",  # rotate daily at midnight\n    interval=1,\n    backupCount=30,  # keep 30 days\n)\nhandler.suffix = "%Y-%m-%d"  # filename: app.log.2024-01-15',
          explanation: 'Use logging module, not print(). RotatingFileHandler prevents huge files. JSON formatter for production (ELK, Datadog). logger.exception() includes traceback. Use levels appropriately.'
        },
        {
          filename: 'config_cli.py',
          language: 'python',
          code: '# === CONFIGURATION WITH pydantic-settings ===\n# pip install pydantic-settings\n\nfrom pydantic_settings import BaseSettings, SettingsConfigDict\nfrom pydantic import Field, SecretStr\nfrom typing import Optional\n\nclass Settings(BaseSettings):\n    """Application settings loaded from environment variables."""\n\n    # App\n    APP_NAME: str = "MyApp"\n    DEBUG: bool = False\n    ENVIRONMENT: str = "development"  # development, staging, production\n\n    # Database\n    DATABASE_URL: str = "postgresql://user:pass@localhost:5432/myapp"\n    DB_POOL_SIZE: int = 20\n    DB_MAX_OVERFLOW: int = 10\n\n    # Redis\n    REDIS_URL: str = "redis://localhost:6379/0"\n\n    # Security\n    SECRET_KEY: SecretStr  # required, no default — fails if missing!\n    JWT_ALGORITHM: str = "HS256"\n    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30\n\n    # CORS\n    CORS_ORIGINS: list[str] = ["http://localhost:3000"]\n\n    # External APIs\n    SENDGRID_API_KEY: Optional[SecretStr] = None\n    STRIPE_SECRET_KEY: Optional[SecretStr] = None\n\n    model_config = SettingsConfigDict(\n        env_file=".env",          # load from .env file\n        env_file_encoding="utf-8",\n        case_sensitive=False,     # ENV_VAR works\n        extra="ignore",           # ignore unknown env vars\n    )\n\n# Usage\nsettings = Settings()  # loads from env / .env\nprint(settings.APP_NAME)\nprint(settings.DATABASE_URL)\nprint(settings.SECRET_KEY.get_secret_value())  # access secret\n\n# .env file example:\n# APP_NAME=MyApp\n# DEBUG=true\n# DATABASE_URL=postgresql://user:pass@localhost/myapp\n# SECRET_KEY=your-super-secret-key\n# CORS_ORIGINS=["http://localhost:3000","http://localhost:3001"]\n\n# === CLI WITH CLICK ===\n# pip install click rich\n\nimport click\nfrom rich.console import Console\nfrom rich.table import Table\nfrom rich.progress import Progress\nimport time\n\nconsole = Console()\n\n@click.group()\ndef cli():\n    """Task manager CLI."""\n    pass\n\n@cli.command()\n@click.argument("title")\n@click.option("-p", "--priority", default="medium",\n              type=click.Choice(["low", "medium", "high"]))\n@click.option("-d", "--description", help="Task description")\n@click.option("--due", help="Due date YYYY-MM-DD")\ndef add(title, priority, description, due):\n    """Add a new task."""\n    console.print(f"[green]Added:[/] {title}")\n    console.print(f"  Priority: {priority}")\n    if description:\n        console.print(f"  Description: {description}")\n    if due:\n        console.print(f"  Due: {due}")\n\n@cli.command(name="list")\n@click.option("-s", "--status", default="all",\n              type=click.Choice(["all", "pending", "done"]))\n@click.option("--format", "fmt", default="table",\n              type=click.Choice(["table", "json", "csv"]))\ndef list_tasks(status, fmt):\n    """List tasks."""\n    tasks = [\n        {"id": 1, "title": "Buy groceries", "priority": "high", "done": False},\n        {"id": 2, "title": "Write blog", "priority": "medium", "done": True},\n    ]\n\n    if fmt == "json":\n        import json\n        console.print_json(json.dumps(tasks))\n    elif fmt == "csv":\n        console.print("id,title,priority,done")\n        for t in tasks:\n            console.print(f"{t[\'id\']},{t[\'title\']},{t[\'priority\']},{t[\'done\']}")\n    else:\n        table = Table(show_header=True, title="Tasks")\n        table.add_column("ID", style="cyan")\n        table.add_column("Status")\n        table.add_column("Title")\n        table.add_column("Priority")\n        for t in tasks:\n            status_icon = "[green]✓[/]" if t["done"] else "[yellow]○[/]"\n            table.add_row(str(t["id"]), status_icon, t["title"], t["priority"])\n        console.print(table)\n\n@cli.command()\n@click.argument("task_id", type=int)\ndef done(task_id):\n    """Mark task as done."""\n    console.print(f"[green]Completed task {task_id}[/]")\n\n@cli.command()\ndef progress_demo():\n    """Demo progress bar."""\n    with Progress() as progress:\n        task = progress.add_task("[cyan]Processing...", total=100)\n        while not progress.finished:\n            progress.update(task, advance=5)\n            time.sleep(0.1)\n    console.print("[green]Done![/]")\n\nif __name__ == "__main__":\n    cli()\n\n# Usage:\n# python cli.py add "Buy groceries" --priority high --due 2024-12-31\n# python cli.py list --status pending\n# python cli.py list --format json\n# python cli.py done 1\n# python cli.py progress-demo\n# python cli.py --help\n\n# === CLI WITH TYPER (Click + type hints — even cleaner) ===\n# pip install typer\n\nimport typer\nfrom typing import Optional\nfrom enum import Enum\n\nclass Priority(str, Enum):\n    low = "low"\n    medium = "medium"\n    high = "high"\n\napp = typer.Typer(help="Task manager CLI")\n\n@app.command()\ndef add(\n    title: str = typer.Argument(..., help="Task title"),\n    priority: Priority = typer.Option(Priority.medium, "-p", "--priority"),\n    description: Optional[str] = typer.Option(None, "-d", "--description"),\n):\n    """Add a new task."""\n    typer.echo(f"Added: {title} (priority={priority.value})")\n\n@app.command()\ndef list_tasks(\n    status: str = typer.Option("all", "-s", "--status"),\n):\n    """List tasks."""\n    typer.echo(f"Listing {status} tasks...")\n\nif __name__ == "__main__":\n    app()\n\n# Typer auto-generates --help from type hints and docstrings!',
          explanation: 'pydantic-settings loads env vars + .env files with type validation. Click/Typer handle CLI parsing, validation, help text. Rich adds colors, tables, progress bars. Structure: config.py, logger.py, cli.py, services/.'
        },
      ],
      keyTakeaways: [
        'NEVER use print() for production — use logging module',
        'RotatingFileHandler prevents huge log files',
        'JSON logging for production (ELK, Datadog, etc.)',
        'Use pydantic-settings for config — loads env vars + .env with validation',
        'Never hardcode secrets — use environment variables',
        'Click/Typer for CLIs — handle parsing, validation, help automatically',
        'Rich for beautiful terminal output (colors, tables, progress)',
        'Structure: config.py (settings), logger.py, cli.py, services/',
      ],
      resources: [
        { title: 'logging Documentation', url: 'https://docs.python.org/3/library/logging.html', type: 'docs' },
        { title: 'pydantic-settings', url: 'https://docs.pydantic.dev/latest/concepts/pydantic_settings/', type: 'docs' },
        { title: 'Click Documentation', url: 'https://click.palletsprojects.com/', type: 'docs' },
        { title: 'Rich Documentation', url: 'https://rich.readthedocs.io/', type: 'docs' },
        { title: 'Typer Documentation', url: 'https://typer.tiangolo.com/', type: 'docs' },
      ]
    },

    {
      id: 'py-14',
      title: 'Packaging & Publishing to PyPI',
      subtitle: 'Package your code with pyproject.toml, publish to PyPI',
      duration: 50,
      difficulty: 'Intermediate',
      phase: 'Real-World',
      content: [
        'Packaging makes your code installable with `pip install yourpackage`. Modern Python uses pyproject.toml (PEP 517/518/621) — one file replaces setup.py, setup.cfg, requirements.txt, MANIFEST.in.',
        'Project structure: src/ layout (recommended) — `src/mypackage/` with __init__.py. pyproject.toml at root. Build with `python -m build`, install with `pip install .` (or `pip install -e .` for editable/dev).',
        'Build backends: hatchling (modern, fast), setuptools (legacy, compatible), flit (simple), poetry-core (poetry). Hatchling is recommended for new projects.',
        'Publish to PyPI: 1) Build with `python -m build` (creates dist/*.whl and *.tar.gz), 2) Upload with `twine upload dist/*`, 3) Install with `pip install yourpackage` from anywhere. Use TestPyPI for testing first.',
      ],
      codeExamples: [
        {
          filename: 'packaging.py',
          language: 'python',
          code: '# === COMPLETE pyproject.toml FOR A PUBLISHABLE PACKAGE ===\n\n# pyproject.toml\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "mypackage"                    # pip install mypackage\nversion = "1.0.0"                      # semver: MAJOR.MINOR.PATCH\ndescription = "A short, clear description"\nreadme = "README.md"                   # shown on PyPI page\nrequires-python = ">=3.10"             # minimum Python version\nlicense = {text = "MIT"}               # or {file = "LICENSE"}\nauthors = [\n    {name = "Your Name", email = "you@example.com"}\n]\nmaintainers = [                        # optional (different from authors)\n    {name = "Maintainer Name", email = "maintainer@example.com"}\n]\nkeywords = ["api", "cli", "tools"]     # PyPI search keywords\nclassifiers = [                        # PyPI categories (browsing)\n    "Development Status :: 4 - Beta",\n    "Development Status :: 5 - Production/Stable",\n    "Intended Audience :: Developers",\n    "License :: OSI Approved :: MIT License",\n    "Operating System :: OS Independent",\n    "Programming Language :: Python :: 3",\n    "Programming Language :: Python :: 3.10",\n    "Programming Language :: Python :: 3.11",\n    "Programming Language :: Python :: 3.12",\n    "Programming Language :: Python :: 3.13",\n    "Topic :: Software Development :: Libraries",\n    "Typing :: Typed",                 # has type hints\n]\n\n# Runtime dependencies\ndependencies = [\n    "httpx>=0.27,<1.0",\n    "rich>=13.7",\n    "pydantic>=2.6",\n    "click>=8.1",\n]\n\n# Optional dependencies (extras)\n[project.optional-dependencies]\ndev = [\n    "pytest>=8.0",\n    "pytest-cov>=5.0",\n    "ruff>=0.5",\n    "mypy>=1.10",\n    "pre-commit>=3.7",\n    "build>=1.0",\n    "twine>=5.0",\n]\ndocs = [\n    "mkdocs>=1.6",\n    "mkdocs-material>=9.5",\n]\nasync = [\n    "aiofiles>=23.0",\n    "aiostream>=0.5",\n]\n\n# CLI entry points — creates `mypackage` command after install\n[project.scripts]\nmypackage = "mypackage.cli:main"\nmypackage-admin = "mypackage.admin:main"\n\n# GUI entry points (rarely needed)\n[project.gui-scripts]\nmypackage-gui = "mypackage.gui:main"\n\n# URLs shown on PyPI page\n[project.urls]\nHomepage = "https://github.com/you/mypackage"\nDocumentation = "https://mypackage.readthedocs.io"\nRepository = "https://github.com/you/mypackage"\nIssues = "https://github.com/you/mypackage/issues"\nChangelog = "https://github.com/you/mypackage/blob/main/CHANGELOG.md"\n\n# Entry points (plugins, integrations)\n[project.entry-points."mypackage.plugins"]\nbasic = "mypackage.plugins:BasicPlugin"\nadvanced = "mypackage.plugins:AdvancedPlugin"\n\n# === HATCHLING-SPECIFIC CONFIG ===\n\n[tool.hatch.version]\n# Auto-version from a variable in source code\npath = "src/mypackage/__init__.py"\n# OR from git tags:\n# [tool.hatch.version]\n# source = "vcs"\n# OR from a file:\n# [tool.hatch.version]\n# path = "VERSION"\n\n[tool.hatch.build.targets.wheel]\n# What to include in the wheel\npackages = ["src/mypackage"]\n# OR include specific files:\n# only-include = ["src/mypackage"]\n# sources = ["src"]\n\n[tool.hatch.build.targets.sdist]\n# What to include in source distribution\ninclude = [\n    "src/mypackage",\n    "tests",\n    "README.md",\n    "LICENSE",\n    "pyproject.toml",\n]\n\n# === BUILD AND PUBLISH ===\n\n# Install build tools\n# pip install build twine\n\n# Build the package (creates dist/)\n# python -m build\n# Creates:\n#   dist/mypackage-1.0.0-py3-none-any.whl  (wheel — binary distribution)\n#   dist/mypackage-1.0.0.tar.gz            (sdist — source distribution)\n\n# Check the package\n# twine check dist/*\n\n# Upload to TestPyPI first (for testing)\n# twine upload --repository testpypi dist/*\n# Install from TestPyPI to verify:\n# pip install -i https://test.pypi.org/simple/ mypackage\n\n# Upload to real PyPI\n# twine upload dist/*\n\n# Now anyone can install:\n# pip install mypackage',
          explanation: 'pyproject.toml with hatchling backend. Build with `python -m build`, upload with `twine upload`. Test on TestPyPI first. Classifiers improve discoverability on PyPI.'
        },
        {
          filename: 'project_layout.py',
          language: 'python',
          code: '# === RECOMMENDED PROJECT STRUCTURE ===\n\n# mypackage/\n# ├── pyproject.toml          ← project config\n# ├── README.md               ← shown on PyPI\n# ├── LICENSE                 ← MIT, Apache, etc.\n# ├── CHANGELOG.md            ← version history\n# ├── .gitignore\n# ├── .pre-commit-config.yaml ← pre-commit hooks\n# ├── src/                    ← src layout (recommended)\n# │   └── mypackage/\n# │       ├── __init__.py     ← exports, __version__\n# │       ├── __main__.py     ← enables: python -m mypackage\n# │       ├── cli.py          ← CLI entry point\n# │       ├── core.py         ← main code\n# │       ├── utils.py        ← helpers\n# │       ├── exceptions.py   ← custom exceptions\n# │       ├── types.py        ← type definitions\n# │       └── py.typed        ← marker: package has type hints\n# ├── tests/\n# │   ├── __init__.py\n# │   ├── conftest.py         ← shared fixtures\n# │   ├── test_core.py\n# │   └── test_cli.py\n# ├── docs/                   ← documentation\n# │   ├── index.md\n# │   └── mkdocs.yml\n# ├── .github/\n# │   └── workflows/\n# │       └── ci.yml          ← GitHub Actions\n# └── examples/               ← usage examples\n#     └── basic_usage.py\n\n# === __init__.py — PUBLIC API ===\n\n# src/mypackage/__init__.py\n"""MyPackage — a short description.\n\nLong description with usage examples.\n"""\n\n__version__ = "1.0.0"\n__author__ = "Your Name"\n__all__ = ["main_function", "MyClass", "MyError"]\n\nfrom .core import main_function, MyClass\nfrom .exceptions import MyError\n\n# === __main__.py — enables `python -m mypackage` ===\n\n# src/mypackage/__main__.py\n"""Enable: python -m mypackage"""\nfrom .cli import main\n\nif __name__ == "__main__":\n    main()\n\n# === py.typed — marker for type hints ===\n# Just create an empty file: src/mypackage/py.typed\n# This tells mypy that your package has type hints\n# Users of your package get type checking!\n\n# === VERSION MANAGEMENT ===\n\n# Option 1: hardcode in __init__.py\n# src/mypackage/__init__.py:\n# __version__ = "1.0.0"\n\n# Option 2: read from pyproject.toml (single source of truth)\n# from importlib.metadata import version\n# __version__ = version("mypackage")\n\n# Option 3: use hatch-vcs (auto-version from git tags)\n# [tool.hatch.version]\n# source = "vcs"\n# Then: git tag v1.0.0 → version becomes 1.0.0\n\n# === GITHUB ACTIONS CI/CD ===\n\n# .github/workflows/ci.yml\n"""\nname: CI/CD\n\non:\n  push:\n    tags: ["v*"]  # only on version tags\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        python-version: ["3.10", "3.11", "3.12", "3.13"]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: ${{ matrix.python-version }}\n      - run: pip install -e ".[dev]"\n      - run: ruff check .\n      - run: mypy src/\n      - run: pytest --cov\n\n  publish:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.12"\n      - run: pip install build twine\n      - run: python -m build\n      - run: twine upload dist/*\n        env:\n          TWINE_USERNAME: __token__\n          TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}\n"""\n\n# === SEMANTIC VERSIONING ===\n# MAJOR.MINOR.PATCH (e.g., 2.1.3)\n#\n# MAJOR: breaking changes (1.0.0 → 2.0.0)\n# MINOR: new features, backward compatible (1.0.0 → 1.1.0)\n# PATCH: bug fixes, backward compatible (1.0.0 → 1.0.1)\n#\n# Pre-release: 1.0.0a1 (alpha), 1.0.0b1 (beta), 1.0.0rc1 (release candidate)\n# Dev release: 1.0.0.dev1\n#\n# Tag in git: git tag v1.0.0 && git push --tags',
          explanation: 'Use src/ layout with py.typed marker. __init__.py defines public API with __all__. __main__.py enables `python -m mypackage`. CI/CD with GitHub Actions: test on multiple Python versions, publish on tags.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a publishable package "stringtools" with reverse(), count_vowels(), and slugify() functions. Include pyproject.toml, src/ layout, and a CLI entry point.',
          starterCode: '# Create the full project structure\n',
          hint: 'Follow the structure above: pyproject.toml, src/stringtools/__init__.py with functions, cli.py with main().',
          solution: '# stringtools/pyproject.toml\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "stringtools"\nversion = "0.1.0"\ndescription = "String manipulation utilities"\nrequires-python = ">=3.10"\nlicense = {text = "MIT"}\ndependencies = []\n\n[project.scripts]\nstringtools = "stringtools.cli:main"\n\n[tool.hatch.build.targets.wheel]\npackages = ["src/stringtools"]\n\n# src/stringtools/__init__.py\n__version__ = "0.1.0"\n__all__ = ["reverse", "count_vowels", "slugify"]\n\ndef reverse(s: str) -> str:\n    return s[::-1]\n\ndef count_vowels(s: str) -> int:\n    return sum(1 for c in s.lower() if c in "aeiou")\n\ndef slugify(s: str) -> str:\n    import re\n    return re.sub(r\'[^a-z0-9]+\', \'-\', s.lower()).strip(\'-\')\n\n# src/stringtools/cli.py\nimport sys\nfrom . import reverse, count_vowels, slugify\n\ndef main():\n    if len(sys.argv) < 3:\n        print("Usage: stringtools <command> <string>")\n        print("Commands: reverse, count_vowels, slugify")\n        sys.exit(1)\n    cmd, text = sys.argv[1], sys.argv[2]\n    commands = {"reverse": reverse, "count_vowels": count_vowels, "slugify": slugify}\n    if cmd in commands:\n        print(commands[cmd](text))\n    else:\n        print(f"Unknown command: {cmd}")\n\n# src/stringtools/py.typed  (empty file)\n\n# Build and install:\n# pip install -e .\n# stringtools reverse "hello"  # olleh\n# stringtools count_vowels "hello world"  # 3\n# stringtools slugify "Hello, World!"  # hello-world',
          solutionLanguage: 'bash'
        },
      ],
      quiz: [
        {
          question: 'What is the modern way to package a Python project?',
          options: [
            'setup.py',
            'requirements.txt + setup.cfg',
            'pyproject.toml (PEP 517/518/621)',
            'Pipfile',
          ],
          correctIndex: 2,
          explanation: 'pyproject.toml is the modern standard. One file replaces setup.py, setup.cfg, requirements.txt, MANIFEST.in. Use hatchling as build backend.'
        },
        {
          question: 'What does `pip install -e .` do?',
          options: [
            'Installs to /etc/',
            'Editable install — changes to source reflect immediately without reinstall',
            'Same as pip install .',
            'Installs only examples',
          ],
          correctIndex: 1,
          explanation: 'Editable install (-e) creates a link to your source code. When you edit files, changes take effect immediately without reinstalling. Perfect for development.'
        },
        {
          question: 'What is the purpose of py.typed marker file?',
          options: [
            'It marks the package as typed (has type hints) so users get type checking',
            'It enables Python type hints',
            'It is required for packaging',
            'It runs mypy automatically',
          ],
          correctIndex: 0,
          explanation: 'py.typed (empty file in package root) tells mypy/pyright that your package has type hints. Without it, users of your package do not get type checking for your code.'
        },
        {
          question: 'How to publish to PyPI?',
          options: [
            'git push pypi main',
            'python -m build && twine upload dist/*',
            'pip upload mypackage',
            'Email the PyPI team',
          ],
          correctIndex: 1,
          explanation: 'Build with `python -m build` (creates dist/*.whl and *.tar.gz), then upload with `twine upload dist/*`. Get an API token from pypi.org.'
        },
      ],
      keyTakeaways: [
        'Use pyproject.toml with hatchling backend — single source of truth',
        'src/ layout prevents accidental imports from cwd',
        'py.typed marker enables type checking for package users',
        '__init__.py defines public API with __version__ and __all__',
        '__main__.py enables `python -m mypackage`',
        'Build with `python -m build`, upload with `twine upload`',
        'Test on TestPyPI before real PyPI',
        'Use semantic versioning: MAJOR.MINOR.PATCH',
        'CI/CD with GitHub Actions: test on multiple Python versions, publish on tags',
      ],
      resources: [
        { title: 'Python Packaging Guide', url: 'https://packaging.python.org/en/latest/', type: 'docs' },
        { title: 'pyproject.toml Guide', url: 'https://packaging.python.org/en/latest/guides/writing-pyproject-toml/', type: 'docs' },
        { title: 'Hatch (build backend)', url: 'https://hatch.pypa.io/', type: 'docs' },
        { title: 'Semantic Versioning', url: 'https://semver.org/', type: 'article' },
      ]
    },
  ]
};

