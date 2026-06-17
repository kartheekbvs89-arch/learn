import { Module } from '../types';

export const pythonModule: Module = {
  id: 'python',
  title: 'Python Mastery',
  icon: '🐍',
  color: '#3776AB',
  gradient: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
  description: 'From zero to writing production Python applications. 20 lessons across 4 phases: Foundation → Intermediate → Advanced → Real-World. Build a complete CLI task manager by the end.',
  level: 'All Levels',
  learningPath: {
    title: 'Python Developer Path',
    description: 'Master Python from syntax to production-grade applications with async, testing, and packaging.',
    phases: [
      {
        name: 'Foundation',
        description: 'Core syntax, data types, control flow, functions',
        outcomes: [
          'Write basic Python scripts',
          'Understand all built-in data types',
          'Use functions, loops, conditionals',
          'Read and write files',
        ],
      },
      {
        name: 'Intermediate',
        description: 'OOP, error handling, decorators, generators',
        outcomes: [
          'Design classes with inheritance and polymorphism',
          'Use magic methods and properties',
          'Write decorators and context managers',
          'Handle errors gracefully',
        ],
      },
      {
        name: 'Advanced',
        description: 'Async, metaclasses, type hints, performance',
        outcomes: [
          'Build async applications with asyncio',
          'Add type hints and use mypy',
          'Profile and optimize code',
          'Use advanced patterns (descriptors, metaclasses)',
        ],
      },
      {
        name: 'Real-World',
        description: 'Testing, packaging, logging, deployment',
        outcomes: [
          'Write tests with pytest',
          'Package and publish to PyPI',
          'Set up logging and configuration',
          'Deploy Python apps to production',
        ],
      },
    ],
  },
  capstoneProject: {
    title: 'Production CLI Task Manager',
    description: 'Build a complete CLI task manager with SQLite persistence, JSON export/import, rich CLI output, tests, and proper packaging for pip install.',
    architecture: `┌─────────────────────────────────────────────┐
│            User (terminal)                  │
└──────────────┬──────────────────────────────┘
               │ CLI commands
               ▼
┌─────────────────────────────────────────────┐
│  Click CLI Layer (commands.py)              │
│  • add • list • done • delete • export      │
└──────────────┬──────────────────────────────┘
               │ Service calls
               ▼
┌─────────────────────────────────────────────┐
│  Service Layer (services.py)                │
│  • Business logic                            │
│  • Validation                                │
│  • Coordinates DB + export                   │
└──────┬───────────────────────────┬──────────┘
       │                           │
       ▼                           ▼
┌──────────────┐         ┌──────────────────┐
│ SQLite DB    │         │  Export/Import   │
│ (SQLAlchemy) │         │  JSON / CSV      │
└──────────────┘         └──────────────────┘`,
    features: [
      'Add, list, complete, delete tasks',
      'Priority levels (low/medium/high)',
      'Due dates and overdue detection',
      'Tag-based filtering',
      'Export to JSON/CSV',
      'Import from JSON',
      'Colored terminal output (rich)',
      'Search tasks by keyword',
    ],
    techStack: [
      'Python 3.12+',
      'Click (CLI framework)',
      'SQLAlchemy 2.0 (ORM)',
      'SQLite (database)',
      'Rich (terminal formatting)',
      'pytest (testing)',
      'pyproject.toml (packaging)',
    ],
    estTime: '6-8 hours',
    difficulty: 'Intermediate',
  },
  lessons: [
    // ============ PHASE 1: FOUNDATION ============
    {
      id: 'py-01',
      title: 'What is Python? Setup & First Program',
      subtitle: 'Install Python, run your first script, understand the REPL',
      duration: 30,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. Its design philosophy emphasizes code readability with significant indentation. Python is dynamically typed and garbage-collected, supporting multiple programming paradigms including structured, object-oriented, and functional programming.',
        'Python is used everywhere: web development (Django, Flask, FastAPI), data science (NumPy, Pandas, scikit-learn), machine learning (PyTorch, TensorFlow), automation, scripting, scientific computing, and more. Its massive ecosystem and clean syntax make it the most popular programming language in the world as of 2024.',
        'To install Python, download the latest version from python.org. On Linux/macOS, you can also use pyenv or your package manager. On Windows, the Microsoft Store version is recommended. Always use Python 3.10+ for modern features like match statements and improved error messages.',
        'The Python REPL (Read-Eval-Print Loop) lets you execute Python interactively. Just type `python` in your terminal. For a better experience, install IPython with `pip install ipython`. For notebooks, install Jupyter with `pip install jupyter`.',
      ],
      codeExamples: [
        {
          filename: 'hello.py',
          language: 'python',
          code: '# Your first Python program\nprint("Hello, World!")\n\n# Variables - no type declaration needed\nname = "Alice"\nage = 30\nheight = 5.7\nis_student = True\n\n# f-strings for formatting (Python 3.6+)\nprint(f"My name is {name}, I am {age} years old")\n\n# Multiple assignment\nx, y, z = 1, 2, 3\n\n# Type checking\nprint(type(name))    # <class \'str\'>\nprint(type(age))     # <class \'int\'>\nprint(type(height))  # <class \'float\'>\n\n# Type conversion\nnum_str = "42"\nnum = int(num_str)\nprint(num + 8)  # 50',
          explanation: 'Python uses dynamic typing - you do not declare variable types. f-strings (formatted string literals) are the modern way to embed expressions in strings.'
        },
        {
          filename: 'cli.py',
          language: 'python',
          code: '# Get user input from command line\nname = input("What is your name? ")\nprint(f"Welcome, {name}!")\n\n# Command-line arguments\nimport sys\nprint(f"Script name: {sys.argv[0]}")\nprint(f"All args: {sys.argv}")\n\n# Run: python cli.py arg1 arg2',
          explanation: 'sys.argv[0] is the script name, sys.argv[1:] are the actual arguments passed.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a Python script that asks the user for their name and age, then prints how old they will be in 10 years.',
          starterCode: '# Your code here\n',
          hint: 'Use input() to get values, int() to convert strings to numbers, and f-strings to format output.',
          solution: 'name = input("Enter your name: ")\nage = int(input("Enter your age: "))\nprint(f"Hi {name}! In 10 years you will be {age + 10} years old.")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Who created Python?',
          options: ['Linus Torvalds', 'Guido van Rossum', 'Brendan Eich', 'James Gosling'],
          correctIndex: 1,
          explanation: 'Guido van Rossum created Python in 1991.'
        },
        {
          question: 'What does the REPL stand for?',
          options: ['Read-Eval-Print Loop', 'Run-Execute-Print Language', 'Rapid Eval Print Loop', 'Read-Evaluate-Process Loop'],
          correctIndex: 0,
          explanation: 'REPL = Read-Eval-Print Loop, an interactive programming environment.'
        },
      ],
      keyTakeaways: [
        'Python is dynamically typed - no need to declare variable types',
        'Use f-strings (f"...") for string formatting',
        'input() returns a string - convert with int(), float() when needed',
        'sys.argv contains command-line arguments',
        'Always use Python 3.10+ for modern features'
      ],
      resources: [
        { title: 'Official Python Docs', url: 'https://docs.python.org/3/', type: 'docs' },
        { title: 'Python for Beginners - freeCodeCamp (4 hr)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', type: 'video' },
        { title: 'Automate the Boring Stuff (free book)', url: 'https://automatetheboringstuff.com/', type: 'book', isHiddenGem: true },
        { title: 'Python Tutor - visualize execution', url: 'https://pythontutor.com/', type: 'interactive', isHiddenGem: true },
      ],
      setup: {
        title: 'Install Python 3.12+',
        os: 'all',
        steps: [
          {
            description: 'Download from python.org (Windows/macOS) or use package manager',
            command: '# Linux (Ubuntu/Debian)\nsudo apt update && sudo apt install python3.12 python3.12-venv\n\n# macOS with Homebrew\nbrew install python@3.12\n\n# Windows: download installer from python.org\n# OR use winget:\nwinget install Python.Python.3.12',
            expectedOutput: '$ python3 --version\nPython 3.12.0',
          },
          {
            description: 'Verify installation',
            command: 'python3 --version\npython3 -c "print(\'Python works!\')"',
            expectedOutput: 'Python 3.12.0\nPython works!',
          },
          {
            description: 'Install pip (if not included) and upgrade',
            command: 'python3 -m ensurepip --upgrade\npython3 -m pip install --upgrade pip',
          },
          {
            description: 'Create your first virtual environment',
            command: 'python3 -m venv .venv\nsource .venv/bin/activate  # Linux/macOS\n# OR: .venv\\Scripts\\activate  # Windows\npip install ipython  # better REPL',
          },
        ],
        verification: 'Run `python3 -c "import sys; print(sys.version)"` - should show 3.10+.',
        troubleshooting: [
          {
            problem: 'python command not found on Linux',
            solution: 'Use python3 instead, or create an alias: alias python=python3',
          },
          {
            problem: 'pip not found',
            solution: 'Run python3 -m ensurepip --upgrade, then use python3 -m pip install <package>',
          },
          {
            problem: 'Permission denied installing packages',
            solution: 'Never use sudo with pip. Always use a virtual environment: python3 -m venv .venv && source .venv/bin/activate',
          },
        ],
      },
      miniProject: {
        title: 'Personal Greeting Card Generator',
        description: 'Build a CLI script that asks for name, age, and favorite color, then prints a decorative greeting card.',
        requirements: [
          'Use input() for 3 prompts',
          'Validate age is a number between 1-120',
          'Print a decorative card using print() and ASCII art',
          'Use f-strings throughout',
        ],
        estTime: '30 minutes',
        solutionCode: 'name = input("Name: ")\nwhile True:\n    try:\n        age = int(input("Age (1-120): "))\n        if 1 <= age <= 120:\n            break\n        print("Age must be 1-120")\n    except ValueError:\n        print("Please enter a number")\ncolor = input("Favorite color: ")\n\nborder = "=" * 40\nprint(border)\nprint(f"  Hello, {name}!")\nprint(f"  You are {age} years young.")\nprint(f"  Your favorite color is {color}.")\nprint(border)',
        solutionLanguage: 'python'
      }
    },

    {
      id: 'py-02',
      title: 'Data Types, Variables & Operators',
      subtitle: 'Numbers, strings, booleans, lists, tuples, dicts, sets',
      duration: 45,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Python has several built-in data types. The fundamental ones are: int (integers), float (decimal numbers), str (strings), bool (True/False), list (ordered, mutable), tuple (ordered, immutable), dict (key-value pairs), and set (unordered, unique elements).',
        'Understanding when to use each type is crucial. Lists are great for ordered collections you will modify. Tuples are perfect for fixed records (like coordinates). Dicts map keys to values - ideal for lookups. Sets are best when you need uniqueness.',
        'Python operators include arithmetic (+, -, *, /, //, %, **), comparison (==, !=, <, >, <=, >=), logical (and, or, not), and special operators like `in`, `is`, and bitwise operators.',
        'One unique Python feature: chained comparisons. You can write `if 0 < x < 100` directly - Python translates it to `0 < x and x < 100` but evaluates x only once.',
      ],
      visualization: {
        title: 'Python Data Types Hierarchy',
        type: 'tree',
        description: 'Built-in types organized by category',
        diagram: `Python Data Types
│
├── Numbers
│   ├── int        (42, -7, 0)
│   ├── float      (3.14, -0.5)
│   ├── complex    (2+3j)
│   └── bool       (True, False) ← subclass of int!
│
├── Sequences
│   ├── str        "hello" (immutable)
│   ├── list       [1,2,3] (mutable)
│   ├── tuple      (1,2,3) (immutable)
│   └── range      range(10)
│
├──Mappings
│   └── dict       {"key": "value"} (mutable, ordered 3.7+)
│
├── Sets
│   ├── set        {1,2,3} (mutable, unique)
│   └── frozenset  frozenset({1,2,3}) (immutable)
│
└── None
    └── NoneType   None (singleton)`,
        legend: [
          'Mutable: can be modified after creation (list, dict, set)',
          'Immutable: cannot be modified (str, tuple, int, float, bool)',
          'Ordered: maintains insertion order (list, tuple, dict)',
          'Hashable: can be dict key (immutable types)',
        ],
      },
      codeExamples: [
        {
          filename: 'data_types.py',
          language: 'python',
          code: '# Numbers\na = 10           # int\nb = 3.14         # float\nc = 2 + 3j        # complex\nd = 10 / 3        # 3.333 (true division)\ne = 10 // 3       # 3 (floor division)\nf = 10 % 3        # 1 (modulo)\ng = 2 ** 10       # 1024 (exponent)\n\n# Strings - immutable\ns = "Hello"\nprint(s[0])       # H\nprint(s[-1])      # o (negative indexing)\nprint(s[1:4])     # ell (slicing)\nprint(s * 3)      # HelloHelloHello\nprint(len(s))     # 5\n\n# Lists - ordered, mutable\nnums = [1, 2, 3, 4, 5]\nnums.append(6)\nnums.insert(0, 0)\nnums.pop()         # removes 6\nnums.remove(3)     # removes first 3\nprint(nums[::2])   # step slicing\n\n# Tuples - ordered, immutable\npoint = (10, 20)\nx, y = point       # unpacking\n\n# Dicts - key-value, ordered (3.7+)\nuser = {\n    "name": "Alice",\n    "age": 30,\n    "skills": ["Python", "ML"]\n}\nprint(user["name"])\nuser["email"] = "alice@example.com"\nprint(user.keys())\nprint(user.items())\n\n# Sets - unordered, unique\ncolors = {"red", "green", "blue"}\ncolors.add("red")    # no duplicate added\n\n# Set operations\na_set = {1, 2, 3}\nb_set = {3, 4, 5}\nprint(a_set & b_set)  # intersection\nprint(a_set | b_set)  # union\nprint(a_set - b_set)  # difference',
          explanation: 'Python has rich built-in types. Lists and dicts are most common. Sets are perfect for membership testing and deduplication.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a dictionary representing a book (title, author, year, pages). Then add a "genre" key. Print all key-value pairs.',
          starterCode: 'book = {\n    # your fields here\n}\n# your code here\n',
          hint: 'Use book["genre"] = "value" to add. Iterate with .items().',
          solution: 'book = {\n    "title": "Clean Code",\n    "author": "Robert Martin",\n    "year": 2008,\n    "pages": 464\n}\nbook["genre"] = "Programming"\n\nfor key, value in book.items():\n    print(f"{key}: {value}")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is the difference between / and //?',
          options: ['No difference', '/ is true division, // is floor division', '// is true division, / is floor', '/ and // both do floor division'],
          correctIndex: 1,
          explanation: '7 / 2 = 3.5 (float), 7 // 2 = 3 (int, floor).'
        },
        {
          question: 'Which data type is immutable?',
          options: ['list', 'dict', 'tuple', 'set'],
          correctIndex: 2,
          explanation: 'Tuples are immutable - once created, they cannot be modified.'
        },
      ],
      keyTakeaways: [
        'Python has rich built-in types: int, float, str, list, tuple, dict, set',
        'Lists are mutable, tuples are immutable',
        'Dicts preserve insertion order (Python 3.7+)',
        'Sets are unordered and unique - great for membership/dedup',
        'Walrus operator := assigns within expressions',
        'and/or return values (not just bool) due to short-circuit'
      ],
      resources: [
        { title: 'Python Data Structures', url: 'https://docs.python.org/3/tutorial/datastructures.html', type: 'docs' },
        { title: 'Python Operators Cheat Sheet', url: 'https://overapi.com/python', type: 'cheatsheet' },
      ]
    },

    {
      id: 'py-03',
      title: 'Control Flow: if, for, while, match-case',
      subtitle: 'Conditionals, loops, comprehensions, pattern matching',
      duration: 50,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Control flow statements direct the order of execution. Python uses indentation (typically 4 spaces) to define blocks instead of braces. The standard constructs are: if/elif/else, for loops, while loops, try/except, and the newer match-case (Python 3.10+).',
        'For loops in Python iterate over iterables - lists, tuples, strings, dicts, files, generators. Use range() for numeric iteration. The enumerate() function gives you index + value pairs. The zip() function lets you iterate over multiple iterables in parallel.',
        'List comprehensions are a Pythonic way to create lists. They are often faster than equivalent for loops. Syntax: [expression for item in iterable if condition]. You can also have dict comprehensions and set comprehensions.',
        'The match-case statement (Python 3.10+) brings structural pattern matching - much more powerful than switch-case in other languages.',
      ],
      visualization: {
        title: 'Loop Execution Flow',
        type: 'flow',
        diagram: `         ┌─────────────────┐
         │   Start Loop    │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  Get next item  │◄────────┐
         │  (or check cond)│         │
         └────────┬────────┘         │
                  │                  │
                  ▼                  │
              ┌────────┐             │
              │ Items  │── No ───────┘
              │ left?  │
              └────┬───┘
                   │ Yes
                   ▼
         ┌─────────────────┐
         │ Execute block   │
         │ (break? continue?)│
         └────────┬────────┘
                  │
                  ▼
              ┌────────┐
              │ break? │── Yes ──► Exit Loop
              └────┬───┘
                   │ No
                   ▼
              ┌─────────────┐
              │ continue?   │── Yes ──► Skip rest, next iter
              └────┬────────┘
                   │ No
                   ▼
              (back to top)`,
        legend: [
          'break: exit the loop immediately',
          'continue: skip to next iteration',
          'else clause: runs if loop completes WITHOUT break',
        ],
      },
      codeExamples: [
        {
          filename: 'control_flow.py',
          language: 'python',
          code: '# if / elif / else\nscore = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\nprint(f"Grade: {grade}")\n\n# Ternary expression\nstatus = "pass" if score >= 60 else "fail"\n\n# For loop over iterable\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate - get index + value\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\n# zip - iterate in parallel\nnames = ["Alice", "Bob", "Carol"]\nages = [25, 30, 35]\nfor name, age in zip(names, ages):\n    print(f"{name} is {age}")\n\n# range\nfor i in range(5):       # 0,1,2,3,4\n    print(i)\nfor i in range(2, 10, 2):  # 2,4,6,8\n    print(i)\n\n# while loop with else (!)\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\nelse:\n    print("Loop completed normally")  # runs if no break\n\n# break / continue\nfor n in range(10):\n    if n == 3:\n        continue  # skip 3\n    if n == 7:\n        break     # stop at 7\n    print(n)',
          explanation: 'Python loops support else clauses - the else block runs if the loop completes without hitting a break.'
        },
        {
          filename: 'comprehensions.py',
          language: 'python',
          code: '# List comprehension - fast and Pythonic\nnums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Squares of all numbers\nsquares = [x ** 2 for x in nums]\n# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n\n# Even numbers only\nevens = [x for x in nums if x % 2 == 0]\n# [2, 4, 6, 8, 10]\n\n# With transformation\nlabels = ["even" if x % 2 == 0 else "odd" for x in nums]\n\n# Nested comprehension - flatten 2D list\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflat = [x for row in matrix for x in row]\n# [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n# Dict comprehension\nsquares_dict = {x: x**2 for x in range(1, 6)}\n# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\n# Set comprehension\nunique_lengths = {len(w) for w in ["a", "ab", "abc", "ab"]}\n# {1, 2, 3}\n\n# Generator expression - lazy evaluation\n# Use () instead of []\ngen = (x**2 for x in range(1000000))\nprint(next(gen))  # 0\nprint(next(gen))  # 1\n# Does not create a list of 1M elements in memory',
          explanation: 'Comprehensions are concise and fast. Generator expressions (with parens) are lazy - they produce values one at a time, saving memory.'
        },
      ],
      exercises: [
        {
          prompt: 'Use a list comprehension to create a list of cubes of odd numbers from 1 to 20.',
          starterCode: 'cubes = \n',
          hint: 'Combine for, if, and the ** operator.',
          solution: 'cubes = [x**3 for x in range(1, 21) if x % 2 == 1]\nprint(cubes)\n# [1, 27, 125, 343, 729, 1331, 2197, 3375, 4913, 6859]',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does range(2, 10, 2) produce?',
          options: ['[2, 4, 6, 8, 10]', '[2, 4, 6, 8]', '[2, 4, 6]', '[10, 8, 6, 4]'],
          correctIndex: 1,
          explanation: 'range(start, stop, step) excludes stop. So 2,4,6,8.'
        },
        {
          question: 'When does the else clause of a for loop execute?',
          options: ['Never', 'Always', 'Only if no break occurred', 'Only if break occurred'],
          correctIndex: 2,
          explanation: 'The else clause runs if the loop completes without hitting break.'
        },
      ],
      keyTakeaways: [
        'Python uses indentation, not braces, for blocks',
        'enumerate() gives index + value, zip() iterates in parallel',
        'List/dict/set comprehensions are Pythonic and fast',
        'Generator expressions are lazy and memory-efficient',
        'match-case (3.10+) is powerful pattern matching',
        'Loops support else clause - runs if no break'
      ],
      resources: [
        { title: 'Python Control Flow Tutorial', url: 'https://docs.python.org/3/tutorial/controlflow.html', type: 'docs' },
      ]
    },

    {
      id: 'py-04',
      title: 'Functions, *args, **kwargs & Decorators',
      subtitle: 'Define functions, use closures, build decorators',
      duration: 60,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Functions in Python are first-class objects - they can be passed as arguments, returned from other functions, and assigned to variables. Define them with the `def` keyword. Use type hints for clarity.',
        'Python supports default arguments, keyword arguments, *args (variable positional), and **kwargs (variable keyword). Understanding argument unpacking is essential.',
        'Closures are functions that capture variables from their enclosing scope. They are the foundation of decorators. A decorator is a function that takes another function and extends its behavior without modifying it.',
        'Python has built-in decorators like @staticmethod, @classmethod, @property, @functools.lru_cache, @dataclass.',
      ],
      progressiveExample: {
        title: 'Building a Logging System Progressively',
        description: 'See how a simple logging function evolves into a production-grade system',
        stages: [
          {
            name: 'Tiny',
            description: 'A simple print statement',
            code: 'def log(message):\n    print(message)\n\nlog("User logged in")  # User logged in',
            language: 'python',
            explanation: 'Start with the simplest possible thing - just print the message.',
          },
          {
            name: 'Small',
            description: 'Add log levels and timestamps',
            code: 'from datetime import datetime\n\ndef log(message, level="INFO"):\n    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")\n    print(f"[{timestamp}] {level}: {message}")\n\nlog("User logged in")\nlog("Database error", level="ERROR")\n# [2024-01-15 10:30:45] INFO: User logged in\n# [2024-01-15 10:30:45] ERROR: Database error',
            language: 'python',
            explanation: 'Add timestamp and log levels. Now logs are structured and filterable.',
          },
          {
            name: 'Real-World',
            description: 'Full logging system with handlers, formatting, and file output',
            code: 'import logging\nimport sys\nfrom logging.handlers import RotatingFileHandler\nfrom pathlib import Path\n\ndef setup_logger(name: str, log_file: str = "app.log", level=logging.INFO):\n    """Configure a production-ready logger."""\n    logger = logging.getLogger(name)\n    logger.setLevel(level)\n    logger.handlers.clear()  # avoid duplicate handlers\n\n    # Format\n    fmt = logging.Formatter(\n        "%(asctime)s | %(name)s | %(levelname)-8s | %(message)s",\n        datefmt="%Y-%m-%d %H:%M:%S",\n    )\n\n    # Console handler (INFO+)\n    console = logging.StreamHandler(sys.stdout)\n    console.setLevel(logging.INFO)\n    console.setFormatter(fmt)\n    logger.addHandler(console)\n\n    # File handler with rotation (10MB, keep 5 backups)\n    Path(log_file).parent.mkdir(parents=True, exist_ok=True)\n    file_handler = RotatingFileHandler(\n        log_file, maxBytes=10_000_000, backupCount=5\n    )\n    file_handler.setLevel(logging.DEBUG)\n    file_handler.setFormatter(fmt)\n    logger.addHandler(file_handler)\n\n    return logger\n\n# Usage\nlogger = setup_logger("myapp", "logs/app.log")\nlogger.info("Application started")\nlogger.warning("Disk space low")\nlogger.error("Failed to connect to database", exc_info=True)\nlogger.debug("This only goes to file, not console")',
            language: 'python',
            explanation: 'Production logger with: multiple handlers (console + file), log rotation (prevents huge files), different levels per handler (debug to file, info to console), structured format. This is what real applications use.',
          },
        ],
      },
      codeExamples: [
        {
          filename: 'functions.py',
          language: 'python',
          code: '# Basic function with type hints\ndef greet(name: str, greeting: str = "Hello") -> str:\n    """Return a greeting string."""\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))          # Hello, Alice!\nprint(greet("Bob", greeting="Hi"))  # keyword argument\n\n# *args - variable positional arguments (tuple)\ndef sum_all(*args):\n    return sum(args)\nprint(sum_all(1, 2, 3, 4, 5))  # 15\n\n# **kwargs - variable keyword arguments (dict)\ndef show_config(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key} = {value}")\n\nshow_config(host="localhost", port=8000, debug=True)\n\n# Both *args and **kwargs\ndef log_call(*args, **kwargs):\n    print(f"args: {args}")\n    print(f"kwargs: {kwargs}")\n\n# Argument unpacking\nnums = [1, 2, 3]\nprint(sum_all(*nums))  # unpack list\n\nconfig = {"host": "0.0.0.0", "port": 8080}\nshow_config(**config)  # unpack dict\n\n# Multiple return values (returns tuple)\ndef min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([3, 1, 4, 1, 5, 9, 2, 6])\nprint(f"min={low}, max={high}")\n\n# Lambda - anonymous function\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n\n# Common use: sort by key\nusers = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]\nusers.sort(key=lambda u: u["age"])',
          explanation: 'Use *args for variable positional args, **kwargs for keyword args. The * and ** operators also unpack iterables/dicts when calling functions.'
        },
        {
          filename: 'decorators.py',
          language: 'python',
          code: 'import time\nimport functools\n\n# Basic decorator\ndef timing(func):\n    @functools.wraps(func)  # preserves function metadata\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timing\ndef slow_function():\n    time.sleep(1)\n    return "done"\n\nslow_function()  # slow_function took 1.0010s\n\n# Decorator with arguments\ndef retry(max_attempts=3, delay=1):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for attempt in range(max_attempts):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    if attempt == max_attempts - 1:\n                        raise\n                    print(f"Attempt {attempt+1} failed: {e}, retrying...")\n                    time.sleep(delay)\n        return wrapper\n    return decorator\n\n@retry(max_attempts=3, delay=2)\ndef fetch_data():\n    pass\n\n# functools.lru_cache - built-in memoization\nfrom functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(100))  # instant thanks to caching',
          explanation: 'Decorators wrap functions to extend behavior. @functools.wraps preserves metadata. @lru_cache is a built-in memoization decorator.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a decorator @cache that memoizes function results.',
          starterCode: 'def cache(func):\n    # your code\n    pass\n',
          hint: 'Store results in a dict keyed by args.',
          solution: 'import functools\n\ndef cache(func):\n    stored = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in stored:\n            stored[args] = func(*args)\n        return stored[args]\n    return wrapper\n\n@cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(50))  # 12586269025 - instant',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does *args collect arguments as?',
          options: ['list', 'tuple', 'dict', 'set'],
          correctIndex: 1,
          explanation: '*args collects positional arguments into a tuple.'
        },
        {
          question: 'Why use @functools.wraps in a decorator?',
          options: ['To speed up the function', 'To preserve function metadata like __name__', 'To cache results', 'No reason'],
          correctIndex: 1,
          explanation: '@functools.wraps copies __name__, __doc__, etc. from the original function so introspection still works.'
        },
      ],
      keyTakeaways: [
        'Functions are first-class objects - pass them as arguments, return them',
        '*args collects positional args (tuple), **kwargs collects keyword args (dict)',
        'Use *list and **dict to unpack when calling functions',
        'Closures capture variables from enclosing scope',
        'Decorators wrap functions to extend behavior - use @functools.wraps',
        '@lru_cache is built-in memoization',
      ],
      resources: [
        { title: 'Python Functions Tutorial', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', type: 'docs' },
        { title: 'Real Python - Decorators Guide', url: 'https://realpython.com/primer-on-python-decorators/', type: 'article' },
      ]
    },

    {
      id: 'py-05',
      title: 'File I/O & Working with Paths',
      subtitle: 'Read/write files, pathlib, JSON, CSV',
      duration: 50,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'File I/O in Python is straightforward with the built-in open() function. Always use `with open(...) as f:` to ensure files are closed, even if an exception occurs.',
        'The pathlib module (Python 3.4+) is the modern way to work with paths. It is object-oriented, cross-platform, and replaces os.path. Use Path() to create paths, / operator to join.',
        'Python has built-in support for JSON (json module), CSV (csv module), and many other formats.',
        'For large files, process them line-by-line instead of loading entirely into memory.',
      ],
      codeExamples: [
        {
          filename: 'pathlib_demo.py',
          language: 'python',
          code: 'from pathlib import Path\n\n# Create paths (use / operator - cross-platform)\np = Path.cwd()  # current working directory\nhome = Path.home()  # user home directory\ndocs = home / "Documents" / "notes.txt"  # / operator joins paths\n\n# Path parts\nprint(docs.name)        # notes.txt\nprint(docs.stem)        # notes (without extension)\nprint(docs.suffix)      # .txt\nprint(docs.parent)      # ~/Documents\n\n# Existence and type\nprint(docs.exists())     # True/False\nprint(docs.is_file())    # True if file\nprint(docs.is_dir())     # True if directory\n\n# Easy file I/O\nPath("output.txt").write_text("Hello!", encoding="utf-8")\ntext = Path("output.txt").read_text(encoding="utf-8")\n\n# Create directories\nPath("new_dir/sub").mkdir(parents=True, exist_ok=True)\n\n# Glob patterns\nfor py_file in Path(".").rglob("*.py"):  # recursive\n    print(py_file)',
          explanation: 'pathlib is the modern, object-oriented way to handle paths. Use / to join, .read_text()/.write_text() for simple I/O.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a function that reads a JSON file of users, filters users over 18, and writes them to a new JSON file.',
          starterCode: 'import json\nfrom pathlib import Path\n\ndef filter_adults(input_path, output_path):\n    # your code\n    pass\n',
          hint: 'Use json.load(), list comprehension, then json.dump().',
          solution: 'import json\nfrom pathlib import Path\n\ndef filter_adults(input_path, output_path):\n    data = json.loads(Path(input_path).read_text())\n    adults = [u for u in data if u.get("age", 0) >= 18]\n    Path(output_path).write_text(json.dumps(adults, indent=2))\n    return len(adults)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why use `with open(...)` instead of just open()?',
          options: ['It is faster', 'It auto-closes the file', 'It caches reads', 'No difference'],
          correctIndex: 1,
          explanation: 'The with statement ensures the file is closed even if an exception occurs.'
        },
      ],
      keyTakeaways: [
        'Always use `with open(...)` for automatic file closing',
        'pathlib is the modern way to handle paths - use / to join',
        'For large files, iterate line-by-line instead of .read()',
        'json.dumps/load for strings, json.dump/load for files',
        'csv.DictReader/DictWriter work with header-based CSVs',
      ],
      resources: [
        { title: 'pathlib Documentation', url: 'https://docs.python.org/3/library/pathlib.html', type: 'docs' },
      ]
    },

    // ============ PHASE 2: INTERMEDIATE ============
    {
      id: 'py-06',
      title: 'Object-Oriented Programming Deep Dive',
      subtitle: 'Classes, inheritance, magic methods, properties, dataclasses',
      duration: 75,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Python is multi-paradigm but deeply supports OOP. Classes are defined with the `class` keyword. The __init__ method is the constructor. All instance methods take `self` as the first parameter.',
        'Magic methods (dunder methods) let your classes integrate with Python syntax: __str__, __repr__, __len__, __eq__, __lt__, __add__, __getitem__, __iter__, __enter__, __call__.',
        'The @property decorator turns methods into read-only attributes. Use @x.setter to allow assignment.',
        'Use @dataclass (Python 3.7+) to auto-generate __init__, __repr__, and __eq__ for data containers.',
      ],
      visualization: {
        title: 'OOP Concepts in Python',
        type: 'tree',
        diagram: `OOP in Python
│
├── Classes & Objects
│   ├── __init__ (constructor)
│   ├── self (instance reference)
│   ├── Class attributes (shared)
│   └── Instance attributes (per-object)
│
├── Inheritance
│   ├── Single (class Child(Parent))
│   ├── Multiple (class C(A, B))
│   ├── MRO (Method Resolution Order)
│   └── super() (call parent methods)
│
├── Polymorphism
│   ├── Method overriding
│   ├── Duck typing
│   └── ABC (@abstractmethod)
│
├── Encapsulation
│   ├── _protected (convention)
│   ├── __private (name mangling)
│   └── @property (controlled access)
│
└── Magic Methods
    ├── __str__ / __repr__ (string repr)
    ├── __eq__ / __lt__ (comparisons)
    ├── __len__ / __getitem__ (container)
    ├── __iter__ / __next__ (iteration)
    ├── __enter__ / __exit__ (context mgr)
    └── __add__ / __mul__ (operators)`,
      },
      codeExamples: [
        {
          filename: 'oop_basics.py',
          language: 'python',
          code: 'class Dog:\n    # Class attribute - shared by all instances\n    species = "Canis familiaris"\n\n    def __init__(self, name: str, age: int):\n        self.name = name\n        self.age = age\n        self._tricks = []  # "protected" by convention\n\n    def bark(self) -> str:\n        return f"{self.name} says Woof!"\n\n    # __str__ - human readable (print, str())\n    def __str__(self):\n        return f"Dog(name={self.name!r}, age={self.age})"\n\n    # __repr__ - developer representation\n    def __repr__(self):\n        return f"Dog({self.name!r}, {self.age})"\n\n    # __eq__ for equality comparison\n    def __eq__(self, other):\n        if not isinstance(other, Dog):\n            return NotImplemented\n        return self.name == other.name and self.age == other.age\n\nrex = Dog("Rex", 5)\nprint(rex.bark())  # Rex says Woof!\nprint(rex)         # Dog(name=\'Rex\', age=5)\n\n# Inheritance\nclass Puppy(Dog):\n    def __init__(self, name, age=0):\n        super().__init__(name, age)\n\n    def bark(self):  # override\n        return f"{self.name} says Yip!"\n\npup = Puppy("Buddy", 1)\nprint(pup.bark())   # Buddy says Yip!\nprint(isinstance(pup, Dog))  # True',
          explanation: 'Use __init__ for construction, __str__ for users, __repr__ for developers. Use super() to call parent methods.'
        },
        {
          filename: 'dataclasses.py',
          language: 'python',
          code: 'from dataclasses import dataclass, field\nfrom typing import List\n\n# Auto-generates __init__, __repr__, __eq__\n@dataclass\nclass User:\n    name: str\n    age: int\n    email: str = ""  # default\n    tags: List[str] = field(default_factory=list)\n\nuser1 = User("Alice", 30)\nuser2 = User("Alice", 30)\nprint(user1)            # User(name=\'Alice\', age=30, email=\'\', tags=[])\nprint(user1 == user2)   # True\n\n# Frozen dataclass - immutable\n@dataclass(frozen=True)\nclass Point:\n    x: float\n    y: float\n\np = Point(1.0, 2.0)\n# p.x = 5  # FrozenInstanceError!\n\n# Slots for memory efficiency\n@dataclass(slots=True)\nclass Pixel:\n    r: int\n    g: int\n    b: int',
          explanation: '@dataclass auto-generates boilerplate. Use field(default_factory=list) for mutable defaults. frozen=True makes it immutable.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a BankAccount class with deposit, withdraw, and balance (with overdraft protection). Use @property for balance (read-only).',
          starterCode: 'class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        pass\n',
          hint: 'Store balance in self._balance. Use @property without @x.setter.',
          solution: 'class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        self.owner = owner\n        self._balance = initial_balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Amount must be positive")\n        self._balance += amount\n        return self._balance\n\n    def withdraw(self, amount):\n        if amount > self._balance:\n            raise ValueError("Insufficient funds")\n        self._balance -= amount\n        return self._balance\n\n    def __str__(self):\n        return f"BankAccount({self.owner}, balance={self._balance:.2f})"\n\nacct = BankAccount("Alice", 100)\nacct.deposit(50)\nprint(acct.balance)  # 150',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does @property do?',
          options: ['Makes attribute private', 'Turns a method into a getter', 'Caches method results', 'Creates a class method'],
          correctIndex: 1,
          explanation: '@property turns a method into a getter - you access it as obj.name not obj.name().'
        },
        {
          question: 'What does super() do?',
          options: ['Returns the parent class instance', 'Calls the parent class method', 'Creates a new instance', 'Skips inheritance'],
          correctIndex: 1,
          explanation: 'super() returns a proxy that lets you call parent class methods.'
        },
      ],
      keyTakeaways: [
        'Classes use __init__ for construction, self for instance reference',
        'Magic methods (__str__, __repr__, __len__, etc.) enable built-in behavior',
        '@property creates managed attributes - no need for getX/setX',
        '@dataclass auto-generates __init__, __repr__, __eq__',
        'Use super() to call parent methods, isinstance() for type checks',
      ],
      resources: [
        { title: 'Python Classes Tutorial', url: 'https://docs.python.org/3/tutorial/classes.html', type: 'docs' },
        { title: 'Dataclasses Documentation', url: 'https://docs.python.org/3/library/dataclasses.html', type: 'docs' },
      ],
      miniProject: {
        title: 'Build a Library Management System',
        description: 'Build an OOP system with Book, Member, and Library classes.',
        requirements: [
          'Book class with title, author, isbn, is_borrowed',
          'Member class with name, member_id, borrowed_books (max 5)',
          'Library class with add_book, register_member, borrow_book, return_book',
          'Use @property where appropriate',
          'Use @dataclass for Book',
        ],
        estTime: '1-2 hours',
        solutionCode: 'from dataclasses import dataclass\nfrom typing import List\n\n@dataclass\nclass Book:\n    title: str\n    author: str\n    isbn: str\n    is_borrowed: bool = False\n\nclass Member:\n    BORROW_LIMIT = 5\n\n    def __init__(self, name: str, member_id: str):\n        self.name = name\n        self.member_id = member_id\n        self._borrowed: List[Book] = []\n\n    @property\n    def borrowed_count(self):\n        return len(self._borrowed)\n\n    def can_borrow(self) -> bool:\n        return self.borrowed_count < self.BORROW_LIMIT\n\n    def borrow(self, book: Book) -> bool:\n        if not self.can_borrow() or book.is_borrowed:\n            return False\n        book.is_borrowed = True\n        self._borrowed.append(book)\n        return True\n\nclass Library:\n    def __init__(self, name: str):\n        self.name = name\n        self._books = []\n        self._members = {}\n\n    def add_book(self, book: Book):\n        self._books.append(book)\n\n    def register_member(self, member: Member):\n        self._members[member.member_id] = member\n\n    def borrow_book(self, isbn: str, member_id: str) -> bool:\n        book = next((b for b in self._books if b.isbn == isbn), None)\n        member = self._members.get(member_id)\n        if not book or not member:\n            return False\n        return member.borrow(book)',
        solutionLanguage: 'python'
      }
    },

    {
      id: 'py-07',
      title: 'Error Handling & Exceptions',
      subtitle: 'try/except, custom exceptions, context managers',
      duration: 45,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Python uses exceptions for error handling. The try/except/else/finally construct catches and handles errors. Python encourages "EAFP" (Easier to Ask Forgiveness than Permission).',
        'Built-in exceptions form a hierarchy: BaseException > Exception > (ValueError, TypeError, RuntimeError, ...). Always catch specific exceptions, not bare `except:`.',
        'You can raise exceptions with `raise ValueError("message")`. To chain exceptions, use `raise NewError from original`. Custom exceptions should inherit from Exception.',
        'Context managers (the `with` statement) ensure resources are cleaned up. Implement __enter__ and __exit__ on a class, or use @contextlib.contextmanager on a generator function.',
      ],
      codeExamples: [
        {
          filename: 'exceptions.py',
          language: 'python',
          code: '# Basic try/except/else/finally\ntry:\n    x = int(input("Enter number: "))\n    result = 10 / x\nexcept ValueError:\n    print("Not a valid number!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:\n    print(f"Unexpected error: {e}")\nelse:\n    # Runs only if no exception\n    print(f"Result: {result}")\nfinally:\n    # Always runs (cleanup)\n    print("Done")\n\n# Custom exceptions\nclass ValidationError(Exception):\n    """Raised when input validation fails."""\n    pass\n\nclass InsufficientFunds(Exception):\n    def __init__(self, balance, amount):\n        self.balance = balance\n        self.amount = amount\n        super().__init__(\n            f"Need \\$\\{amount}, have \\$\\{balance}"\n        )\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFunds(balance, amount)\n    return balance - amount\n\ntry:\n    withdraw(50, 100)\nexcept InsufficientFunds as e:\n    print(e)            # message\n    print(e.balance)    # 50\n    print(e.amount)     # 100',
          explanation: 'Use specific exception types. Create custom exceptions inheriting from Exception. Use else for code that runs only if no exception, finally for cleanup.'
        },
        {
          filename: 'context_managers.py',
          language: 'python',
          code: 'import contextlib\nimport time\n\n# Class-based context manager\nclass Timer:\n    def __init__(self, name=""):\n        self.name = name\n\n    def __enter__(self):\n        self.start = time.perf_counter()\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        elapsed = time.perf_counter() - self.start\n        print(f"{self.name} took {elapsed:.4f}s")\n        return False  # True to suppress exceptions\n\nwith Timer("sleep"):\n    time.sleep(0.5)\n\n# Generator-based context manager (cleaner!)\n@contextlib.contextmanager\ndef open_db(connection_string):\n    print(f"Connecting to {connection_string}")\n    conn = {"connected": True}\n    try:\n        yield conn\n    finally:\n        conn["connected"] = False\n        print("Connection closed")\n\nwith open_db("postgres://localhost") as db:\n    print(f"Using: {db}")',
          explanation: 'Context managers ensure cleanup. Use __enter__/__exit__ for classes, or @contextlib.contextmanager with a generator for simpler cases.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a custom exception `InvalidAgeError`. Write a function `validate_age(age)` that raises it if age < 0 or > 150.',
          starterCode: 'class InvalidAgeError(Exception):\n    pass\n\ndef validate_age(age):\n    pass\n',
          hint: 'Raise InvalidAgeError with a descriptive message inside an if check.',
          solution: 'class InvalidAgeError(Exception):\n    pass\n\ndef validate_age(age):\n    if not isinstance(age, (int, float)):\n        raise InvalidAgeError(f"Age must be a number")\n    if age < 0 or age > 150:\n        raise InvalidAgeError(f"Age must be 0-150, got {age}")\n    return True\n\ntry:\n    validate_age(-5)\nexcept InvalidAgeError as e:\n    print(e)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When does the `else` clause of try/except run?',
          options: ['Always', 'Only if no exception occurred', 'Only if exception occurred', 'Never'],
          correctIndex: 1,
          explanation: 'The else block runs only if no exception was raised in try.'
        },
      ],
      keyTakeaways: [
        'Use try/except/else/finally - else runs if no exception, finally always runs',
        'Catch specific exceptions, not bare except:',
        'Custom exceptions inherit from Exception',
        'Use `raise from` to chain exceptions with cause',
        'Context managers (with statement) ensure cleanup',
      ],
      resources: [
        { title: 'Python Errors and Exceptions', url: 'https://docs.python.org/3/tutorial/errors.html', type: 'docs' },
      ]
    },

    {
      id: 'py-08',
      title: 'Iterators, Generators & itertools',
      subtitle: 'Lazy evaluation, yield, infinite sequences',
      duration: 55,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Iterators are objects that implement __iter__() and __next__(). Any object that can be looped over is iterable (lists, dicts, files, generators).',
        'Generators are the easiest way to create iterators. Use the `yield` keyword instead of `return` - the function pauses at yield, resumes when next() is called. Generators are lazy - they produce values one at a time, saving memory.',
        'The itertools module provides powerful iterator combinators: chain, cycle, islice, groupby, product, permutations, combinations, accumulate, takewhile/dropwhile.',
        'Use generators when: working with large/infinite sequences, streaming data, building pipelines.',
      ],
      progressiveExample: {
        title: 'Processing a Large Log File',
        description: 'Process a 10GB log file efficiently - from naive to optimized',
        stages: [
          {
            name: 'Tiny',
            description: 'Naive: load entire file into memory',
            code: '# BAD - loads entire 10GB file into RAM\nwith open("huge.log") as f:\n    lines = f.readlines()  # 10GB in memory!\n\nerrors = [line for line in lines if "ERROR" in line]\nprint(f"Found {len(errors)} errors")',
            language: 'python',
            explanation: 'This crashes with MemoryError on large files. Reads everything at once.',
          },
          {
            name: 'Small',
            description: 'Better: iterate line by line',
            code: '# BETTER - one line at a time, but builds error list\nerrors = []\nwith open("huge.log") as f:\n    for line in f:\n        if "ERROR" in line:\n            errors.append(line)\n\nprint(f"Found {len(errors)} errors")',
            language: 'python',
            explanation: 'Reads one line at a time, but the errors list could still be huge if many errors.',
          },
          {
            name: 'Real-World',
            description: 'Best: generator pipeline, only counts, no list built',
            code: 'from pathlib import Path\nfrom typing import Iterator\nimport time\n\ndef read_lines(path: Path) -> Iterator[str]:\n    """Lazily yield lines from a file."""\n    with open(path) as f:\n        yield from f\n\ndef filter_errors(lines: Iterator[str]) -> Iterator[str]:\n    """Yield only lines containing ERROR."""\n    for line in lines:\n        if "ERROR" in line:\n            yield line\n\ndef parse_log(line: str) -> dict:\n    """Parse a log line into a dict."""\n    parts = line.split(" | ")\n    if len(parts) >= 4:\n        return {\n            "timestamp": parts[0],\n            "level": parts[2],\n            "message": " | ".join(parts[3:]),\n        }\n    return {}\n\ndef count_errors(log_path: str) -> int:\n    """Count errors in a log file - constant memory!"""\n    path = Path(log_path)\n    lines = read_lines(path)              # lazy\n    error_lines = filter_errors(lines)    # lazy\n    return sum(1 for _ in error_lines)    # count without storing\n\n# Process 10GB file with only KB of memory\nstart = time.perf_counter()\ncount = count_errors("huge.log")\nelapsed = time.perf_counter() - start\nprint(f"Found {count} errors in {elapsed:.1f}s")\n\n# Can even process infinite streams!\ndef tail(path: Path) -> Iterator[str]:\n    """Like `tail -f` - yields new lines as they arrive."""\n    with open(path) as f:\n        f.seek(0, 2)  # jump to end\n        while True:\n            line = f.readline()\n            if not line:\n                time.sleep(0.1)\n                continue\n            yield line',
            language: 'python',
            explanation: 'Generator pipeline: each stage transforms lazily. Memory stays constant regardless of file size. Can even handle infinite streams (like tail -f).',
          },
        ],
      },
      codeExamples: [
        {
          filename: 'generators.py',
          language: 'python',
          code: '# Generator function - uses yield\ndef count_up_to(n):\n    i = 1\n    while i <= n:\n        yield i  # pauses here, resumes on next()\n        i += 1\n\nfor x in count_up_to(5):\n    print(x)  # 1, 2, 3, 4, 5\n\n# Infinite generator - lazy, never exhausts memory\ndef natural_numbers():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\n# Fibonacci - infinite but lazy\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# Get first 10 fibs with itertools.islice\nimport itertools\nfibs = list(itertools.islice(fibonacci(), 10))\nprint(fibs)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\n# yield from - delegate to sub-iterator\ndef flatten(nested):\n    for item in nested:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item\n\nprint(list(flatten([1, [2, [3, 4], 5], 6])))\n# [1, 2, 3, 4, 5, 6]',
          explanation: 'Generators use yield to pause execution. They are lazy and memory-efficient. yield from delegates to sub-generators.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a generator that yields prime numbers infinitely.',
          starterCode: 'def primes():\n    pass\n',
          hint: 'Yield 2, then iterate odd numbers. Check divisibility only by previously yielded primes.',
          solution: 'import itertools\n\ndef primes():\n    yield 2\n    found = [2]\n    n = 3\n    while True:\n        is_prime = True\n        for p in found:\n            if p * p > n:\n                break\n            if n % p == 0:\n                is_prime = False\n                break\n        if is_prime:\n            found.append(n)\n            yield n\n        n += 2\n\nfirst_20 = list(itertools.islice(primes(), 20))\nprint(first_20)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does yield do?',
          options: ['Returns a value and ends the function', 'Returns a value but pauses the function', 'Returns multiple values as a list', 'Same as return'],
          correctIndex: 1,
          explanation: 'yield produces a value but pauses the function. It resumes from there on the next call.'
        },
      ],
      keyTakeaways: [
        'Iterators implement __iter__ and __next__',
        'Generators use yield - they are lazy and memory-efficient',
        'yield from delegates to a sub-generator',
        'itertools has powerful combinatorics: product, permutations, combinations',
        'Generators are perfect for pipelines and infinite sequences',
      ],
      resources: [
        { title: 'itertools Documentation', url: 'https://docs.python.org/3/library/itertools.html', type: 'docs' },
      ]
    },

    // ============ PHASE 3: ADVANCED ============
    {
      id: 'py-09',
      title: 'Async/Await & Concurrent Programming',
      subtitle: 'asyncio, async/await, asyncio.gather, Tasks',
      duration: 70,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Async programming lets you handle many I/O operations concurrently without threads. Python uses async/await syntax (Python 3.5+). An async function (coroutine) is defined with `async def` and must be awaited.',
        'Use async when your code is I/O-bound: network requests, file I/O, database calls. For CPU-bound work, use multiprocessing.',
        'Common asyncio patterns: asyncio.gather(*coros) runs coroutines concurrently. asyncio.create_task() schedules a coroutine. asyncio.wait_for() adds a timeout. asyncio.Queue for producer-consumer.',
        'Async libraries: aiohttp (HTTP), httpx (modern HTTP), asyncpg (PostgreSQL), motor (MongoDB), websockets.',
      ],
      visualization: {
        title: 'Sync vs Async Execution',
        type: 'comparison',
        diagram: `SYNC (sequential) - Total time: 3s

  Request 1 ████ (1s)
  Request 2          ████ (1s)
  Request 3                  ████ (1s)
  ──────────────────────────────────────► time
            Total: 3s


ASYNC (concurrent) - Total time: 1s

  Request 1 ████ (1s)
  Request 2 ████ (1s)         ← all run concurrently
  Request 3 ████ (1s)
  ──────────────────────────────────────► time
            Total: 1s (max of all)


WHILE waiting for I/O on Request 1,
the event loop starts Request 2 and 3.
No threads needed - just cooperative multitasking!`,
        legend: [
          'Sync: requests run one after another, total = sum',
          'Async: requests run concurrently, total = max',
          'Works for I/O-bound tasks (network, disk, DB)',
          'For CPU-bound tasks, use multiprocessing instead',
        ],
      },
      codeExamples: [
        {
          filename: 'async_basics.py',
          language: 'python',
          code: 'import asyncio\nimport time\n\n# Define a coroutine with `async def`\nasync def greet(name):\n    print(f"Hello {name}")\n    await asyncio.sleep(1)  # non-blocking sleep\n    print(f"Bye {name}")\n    return f"done-{name}"\n\n# Run a coroutine\nasync def main():\n    result = await greet("Alice")\n    print(result)\n\nasyncio.run(main())\n\n# Sequential vs concurrent\nasync def fetch(url):\n    await asyncio.sleep(1)\n    return f"data from {url}"\n\nasync def concurrent():\n    start = time.time()\n    results = await asyncio.gather(\n        fetch("api/a"),\n        fetch("api/b"),\n        fetch("api/c"),\n    )\n    print(f"Concurrent: {time.time()-start:.2f}s")  # ~1s\n    print(results)\n\nasyncio.run(concurrent())',
          explanation: 'async def creates a coroutine. await pauses execution. asyncio.gather runs multiple coroutines concurrently - total time = max individual time, not sum.'
        },
        {
          filename: 'async_patterns.py',
          language: 'python',
          code: 'import asyncio\n\n# Semaphore - limit concurrency\nasync def limited_fetch(url, sem):\n    async with sem:  # acquire / release\n        print(f"Fetching {url}")\n        await asyncio.sleep(1)\n        return f"data-{url}"\n\nasync def many_concurrent():\n    sem = asyncio.Semaphore(3)  # max 3 at a time\n    urls = [f"url{i}" for i in range(10)]\n    tasks = [limited_fetch(u, sem) for u in urls]\n    return await asyncio.gather(*tasks)\n\n# Timeout with wait_for\nasync def slow():\n    await asyncio.sleep(10)\n    return "finally"\n\nasync def with_timeout():\n    try:\n        result = await asyncio.wait_for(slow(), timeout=2)\n    except asyncio.TimeoutError:\n        print("Timed out!")\n\n# Producer-consumer with Queue\nasync def producer(queue):\n    for i in range(5):\n        await asyncio.sleep(0.1)\n        await queue.put(f"item-{i}")\n    await queue.put(None)  # sentinel\n\nasync def consumer(queue):\n    while True:\n        item = await queue.get()\n        if item is None:\n            break\n        print(f"Processed {item}")\n        queue.task_done()\n\nasync def pipeline():\n    queue = asyncio.Queue()\n    await asyncio.gather(producer(queue), consumer(queue))\n\nasyncio.run(pipeline())',
          explanation: 'Use Semaphores to limit concurrency. asyncio.Queue for async producer-consumer. handle CancelledError in long-running tasks.'
        },
      ],
      exercises: [
        {
          prompt: 'Write an async function that fetches 5 URLs concurrently and returns total size.',
          starterCode: 'import asyncio\nimport aiohttp\n\nasync def total_size(urls):\n    pass\n',
          hint: 'Use aiohttp.ClientSession and asyncio.gather.',
          solution: 'import asyncio\nimport aiohttp\n\nasync def fetch_size(session, url):\n    async with session.get(url) as resp:\n        text = await resp.text()\n        return len(text)\n\nasync def total_size(urls):\n    async with aiohttp.ClientSession() as session:\n        tasks = [fetch_size(session, url) for url in urls]\n        sizes = await asyncio.gather(*tasks)\n        return sum(sizes)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When should you use async/await?',
          options: ['For CPU-bound work', 'For I/O-bound work', 'Always', 'Never'],
          correctIndex: 1,
          explanation: 'Async is for I/O-bound tasks. For CPU-bound, use multiprocessing.'
        },
      ],
      keyTakeaways: [
        'Use async/await for I/O-bound work, multiprocessing for CPU-bound',
        'asyncio.gather runs coroutines concurrently - total time = max, not sum',
        'asyncio.create_task schedules a coroutine to run',
        'Semaphore limits concurrency, Queue for producer-consumer',
        'Use aiohttp/httpx for async HTTP requests',
      ],
      resources: [
        { title: 'asyncio Documentation', url: 'https://docs.python.org/3/library/asyncio.html', type: 'docs' },
        { title: 'Real Python - Async IO', url: 'https://realpython.com/async-io-python/', type: 'article' },
      ]
    },

    {
      id: 'py-10',
      title: 'Type Hints & Static Analysis',
      subtitle: 'Type annotations, mypy, pydantic-style validation',
      duration: 50,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Type hints (PEP 484) let you annotate types without affecting runtime. They are checked by static analyzers like mypy, pyright, pytype. IDEs use them for autocompletion and error detection.',
        'Basic types: int, str, float, bool, bytes. Complex types: list[int], dict[str, int], tuple[int, str], set[str]. Optional[X] = X | None. Use typing module for Callable, Iterable, Iterator, Any, TypeVar.',
        'Generic types and TypeVar let you write reusable typed functions and classes. Use @overload for functions with multiple signatures. Use Literal for specific string/int values.',
        'Configure mypy in pyproject.toml: strict = true, disallow_untyped_defs = true. Run with `mypy src/`. It catches bugs before runtime - especially valuable for large codebases.',
      ],
      codeExamples: [
        {
          filename: 'type_hints.py',
          language: 'python',
          code: 'from typing import Optional, Union, List, Dict, Callable, TypeVar, Generic, overload, Literal\nfrom pathlib import Path\nfrom datetime import datetime\n\n# Basic annotations\ndef greet(name: str, times: int = 1) -> str:\n    return (f"Hello, {name}! " * times).strip()\n\n# Complex types (Python 3.9+: use lowercase list/dict/tuple)\ndef process(items: list[int]) -> dict[str, list[int]]:\n    return {"evens": [x for x in items if x % 2 == 0],\n            "odds": [x for x in items if x % 2 == 1]}\n\n# Optional = X | None (Python 3.10+)\ndef find_user(user_id: int) -> dict | None:\n    if user_id == 1:\n        return {"id": 1, "name": "Alice"}\n    return None\n\n# Callable - functions as arguments\ndef apply(func: Callable[[int, int], int], a: int, b: int) -> int:\n    return func(a, b)\n\nprint(apply(lambda x, y: x + y, 5, 3))  # 8\n\n# TypeVar - generic functions\nT = TypeVar("T")\n\ndef first(items: list[T]) -> T:\n    return items[0]\n\nprint(first([1, 2, 3]))        # T = int\nprint(first(["a", "b", "c"]))  # T = str\n\n# Generic class\nclass Stack(Generic[T]):\n    def __init__(self) -> None:\n        self._items: list[T] = []\n\n    def push(self, item: T) -> None:\n        self._items.append(item)\n\n    def pop(self) -> T:\n        return self._items.pop()\n\nstack: Stack[int] = Stack()\nstack.push(1)\n# stack.push("x")  # mypy error!\n\n# Literal types\ndef set_mode(mode: Literal["train", "eval", "test"]) -> None:\n    print(f"Mode: {mode}")\n\nset_mode("train")  # OK\n# set_mode("debug")  # mypy error!\n\n# @overload - multiple signatures\n@overload\ndef parse(value: int) -> int: ...\n@overload\ndef parse(value: str) -> str: ...\ndef parse(value):\n    return value\n\n# TypedDict - dict with specific keys\nclass UserDict(TypedDict):\n    name: str\n    age: int\n    email: str\n\nuser: UserDict = {"name": "Alice", "age": 30, "email": "a@x.com"}',
          explanation: 'Type hints document intent and enable static analysis. Use TypeVar for generics, Literal for specific values, TypedDict for structured dicts.'
        },
      ],
      exercises: [
        {
          prompt: 'Add type hints to a function that takes a list of strings and returns a dict mapping each string to its length.',
          starterCode: 'def word_lengths(words):\n    return {w: len(w) for w in words}\n',
          hint: 'Use list[str] for input, dict[str, int] for output.',
          solution: 'def word_lengths(words: list[str]) -> dict[str, int]:\n    return {w: len(w) for w in words}\n\nresult = word_lengths(["hello", "world"])\nprint(result)  # {\'hello\': 5, \'world\': 5}',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Do type hints affect runtime behavior?',
          options: ['Yes, they validate at runtime', 'No, they are only for static analysis', 'Yes, they slow down code', 'Only with from __future__ import annotations'],
          correctIndex: 1,
          explanation: 'Type hints are NOT enforced at runtime. They are hints for static analyzers (mypy, pyright) and IDEs.'
        },
      ],
      keyTakeaways: [
        'Type hints document intent and enable IDE autocompletion',
        'Use list[int], dict[str, int] (Python 3.9+ lowercase)',
        'Optional[X] = X | None (Python 3.10+)',
        'TypeVar for generics, Literal for specific values, TypedDict for structured dicts',
        'Run mypy in CI to catch type errors before runtime',
      ],
      resources: [
        { title: 'Python Type Hints (PEP 484)', url: 'https://peps.python.org/pep-0484/', type: 'article' },
        { title: 'mypy Documentation', url: 'https://mypy.readthedocs.io/', type: 'docs' },
      ]
    },

    {
      id: 'py-11',
      title: 'Performance Profiling & Optimization',
      subtitle: 'cProfile, timeit, memory profiling, optimization strategies',
      duration: 55,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Premature optimization is the root of all evil. Always PROFILE first to find the actual bottleneck, then optimize. Python has great profiling tools: cProfile, timeit, memory_profiler, py-spy.',
        'Common optimization strategies: 1) Use built-in functions (C-implemented, fast), 2) Use comprehensions instead of loops, 3) Use generators for large data, 4) Use sets for membership tests, 5) Cache with @lru_cache, 6) Use numpy for numerical work, 7) Use multiprocessing for CPU-bound, async for I/O-bound.',
        'cProfile shows where time is spent. Run with `python -m cProfile -s cumulative script.py`. Look for hot spots. Use snakeviz to visualize profile output.',
        'Memory profiling: use memory_profiler to see memory usage line by line. Use tracemalloc to track allocations. For large data, prefer generators, arrays, and numpy over lists.',
      ],
      lab: {
        title: 'Profile and Optimize a Slow Function',
        objective: 'Profile a function, find the bottleneck, and optimize it 100x',
        estTime: '45 minutes',
        difficulty: 'Intermediate',
        setup: [
          'Install profiling tools: pip install memory_profiler snakeviz',
          'Create a file called slow.py',
        ],
        steps: [
          {
            title: 'Write a slow function',
            instruction: 'Create a function that finds duplicate numbers in a list using nested loops (O(n²))',
            code: 'def find_duplicates_slow(numbers):\n    duplicates = []\n    for i in range(len(numbers)):\n        for j in range(i + 1, len(numbers)):\n            if numbers[i] == numbers[j] and numbers[i] not in duplicates:\n                duplicates.append(numbers[i])\n    return duplicates\n\nimport random\nnums = [random.randint(0, 100) for _ in range(5000)]',
            codeLanguage: 'python',
          },
          {
            title: 'Profile it with cProfile',
            instruction: 'Run with cProfile to see where time is spent',
            code: 'python -m cProfile -s cumulative -c "\nfrom slow import find_duplicates_slow, nums\nfind_duplicates_slow(nums)\n" 2>&1 | head -20',
            codeLanguage: 'bash',
            expectedOutput: '   ncalls  tottime  percall  cumtime  percall filename:lineno(function)\n        1    0.850    0.850    0.850    0.850 slow.py:1(find_duplicates_slow)\n     2500    0.001    0.000    0.001    0.000 {method \'append\' of \'list\' objects}',
            explanation: 'The function takes 0.85s. The nested loops are the bottleneck (O(n²)).',
          },
          {
            title: 'Optimize with a set',
            instruction: 'Use a set for O(1) membership testing instead of list (O(n))',
            code: 'def find_duplicates_fast(numbers):\n    seen = set()\n    duplicates = set()\n    for n in numbers:\n        if n in seen:\n            duplicates.add(n)\n        else:\n            seen.add(n)\n    return list(duplicates)',
            codeLanguage: 'python',
            explanation: 'Now O(n) instead of O(n²). Set lookup is O(1).',
          },
          {
            title: 'Verify the optimization',
            instruction: 'Time both functions with timeit',
            code: 'python -c "\nimport timeit\nfrom slow import find_duplicates_slow, find_duplicates_fast, nums\n\nt_slow = timeit.timeit(lambda: find_duplicates_slow(nums), number=3)\nt_fast = timeit.timeit(lambda: find_duplicates_fast(nums), number=3)\nprint(f\'Slow: {t_slow:.3f}s\')\nprint(f\'Fast: {t_fast:.3f}s\')\nprint(f\'Speedup: {t_slow/t_fast:.0f}x\')\n"',
            codeLanguage: 'bash',
            expectedOutput: 'Slow: 2.550s\nFast: 0.003s\nSpeedup: 850x',
            explanation: '850x speedup just by using a set instead of a list for membership testing!',
          },
        ],
        verification: 'Run the final timing - should see at least 100x speedup.',
        cleanup: 'rm slow.py',
      },
      codeExamples: [
        {
          filename: 'profiling.py',
          language: 'python',
          code: '# Time a small code snippet\nimport timeit\n\n# Time list vs set membership\nt_list = timeit.timeit("x in data",\n    setup="data = list(range(10000)); x = 9999",\n    number=1000)\nt_set = timeit.timeit("x in data",\n    setup="data = set(range(10000)); x = 9999",\n    number=1000)\n\nprint(f"List: {t_list:.3f}s")  # ~2.5s\nprint(f"Set:  {t_set:.3f}s")   # ~0.0001s\nprint(f"Set is {t_list/t_set:.0f}x faster for membership")\n\n# cProfile - find bottlenecks\nimport cProfile\n\ndef slow_function():\n    total = 0\n    for i in range(1000000):\n        total += i\n    return total\n\ncProfile.run("slow_function()", sort="cumulative")\n# Output shows:\n# ncalls  tottime  percall  cumtime  percall filename:lineno(function)\n#     1    0.045    0.045    0.045    0.045 slow_function()\n\n# @lru_cache for memoization\nfrom functools import lru_cache\nimport time\n\n@lru_cache(maxsize=None)\ndef expensive(n):\n    time.sleep(0.1)\n    return n * 2\n\nstart = time.time()\nprint(expensive(5))  # 0.1s\nprint(expensive(5))  # 0.0001s (cached!)\nprint(f"{time.time()-start:.3f}s total")',
          explanation: 'timeit for micro-benchmarks. cProfile for finding bottlenecks. @lru_cache for memoization. Always profile before optimizing.'
        },
      ],
      keyTakeaways: [
        'Always profile before optimizing - find the actual bottleneck',
        'Use cProfile and timeit for timing',
        'Use sets for O(1) membership (vs O(n) for lists)',
        'Use @lru_cache for memoization of pure functions',
        'Prefer built-in functions (C-implemented, fast)',
        'Use generators for large data, numpy for numerical work',
      ],
      resources: [
        { title: 'cProfile Documentation', url: 'https://docs.python.org/3/library/profile.html', type: 'docs' },
        { title: 'py-spy - sampling profiler', url: 'https://github.com/benfred/py-spy', type: 'tool', isHiddenGem: true },
      ]
    },

    // ============ PHASE 4: REAL-WORLD ============
    {
      id: 'py-12',
      title: 'Testing with pytest',
      subtitle: 'Write tests, fixtures, parametrize, mocking',
      duration: 50,
      difficulty: 'Intermediate',
      phase: 'Real-World',
      content: [
        'pytest is the most popular Python testing framework. Simpler than unittest, more powerful. Discover tests automatically (test_*.py files, test_* functions). Use plain assert statements.',
        'Fixtures are setup functions reused across tests. Use @pytest.fixture. Scope: function (default), class, module, session. Use yield for setup/teardown.',
        'Use @pytest.mark.parametrize to run one test with multiple inputs. Use pytest.mark.skip / .xfail for known issues.',
        'Mocking: use unittest.mock.patch to replace dependencies (DB, APIs) with mocks. Use respx for mocking HTTPX/requests.',
      ],
      codeExamples: [
        {
          filename: 'test_basics.py',
          language: 'python',
          code: '# test_math.py - simple tests\nimport pytest\n\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0\n    assert add(0, 0) == 0\n\n# Test that expects an exception\ndef test_divide_by_zero():\n    with pytest.raises(ZeroDivisionError):\n        1 / 0\n\n# Parameterized - run same test with multiple inputs\n@pytest.mark.parametrize("a, b, expected", [\n    (1, 2, 3),\n    (-1, 1, 0),\n    (0, 0, 0),\n    (100, 200, 300),\n])\ndef test_add_parametrized(a, b, expected):\n    assert add(a, b) == expected\n\n# Skip and xfail\n@pytest.mark.skip(reason="Not implemented yet")\ndef test_future_feature():\n    pass\n\n# Run: pytest -v\n# Run with coverage: pytest --cov=src --cov-report=html',
          explanation: 'pytest uses plain assert. Use pytest.raises for exceptions. @parametrize for data-driven tests.'
        },
        {
          filename: 'fixtures_mocking.py',
          language: 'python',
          code: 'import pytest\nfrom unittest.mock import Mock, patch\n\n# Fixtures - reusable setup\n@pytest.fixture\ndef sample_user():\n    return {"id": 1, "name": "Alice", "email": "alice@example.com"}\n\ndef test_user_name(sample_user):  # fixture injected by name\n    assert sample_user["name"] == "Alice"\n\n# Fixture with setup/teardown\n@pytest.fixture\ndef db_session():\n    session = create_session()  # setup\n    yield session  # test runs here\n    session.close()  # teardown\n\n# Session-scoped fixture (runs once per session)\n@pytest.fixture(scope="session")\ndef app():\n    app = create_app()\n    app.config["TESTING"] = True\n    yield app\n    app.cleanup()\n\n# Factory fixture - create multiple instances\n@pytest.fixture\ndef make_user():\n    def _make(name="Test", email=None):\n        return {"name": name, "email": email or f"{name.lower()}@test.com"}\n    return _make\n\ndef test_factory(make_user):\n    u1 = make_user("Alice")\n    assert u1["email"] == "alice@test.com"\n\n# Mocking - replace dependencies\n@patch("myapp.services.requests.get")\ndef test_fetch_user(mock_get, sample_user):\n    mock_get.return_value.json.return_value = sample_user\n    mock_get.return_value.status_code = 200\n\n    result = fetch_user(1)\n\n    assert result["name"] == "Alice"\n    mock_get.assert_called_once_with("https://api/users/1")',
          explanation: 'Fixtures: reusable setup with yield for teardown. Factory fixtures create multiple instances. patch() replaces dependencies.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a parametrized test for is_palindrome(s) testing 5 cases.',
          starterCode: 'def is_palindrome(s):\n    return s == s[::-1]\n\n@pytest.mark.parametrize("input,expected", [\n    # your test cases\n])\ndef test_is_palindrome(input, expected):\n    assert is_palindrome(input) == expected\n',
          hint: 'Mix true (radar, level) and false (hello) cases.',
          solution: 'def is_palindrome(s):\n    return s == s[::-1]\n\n@pytest.mark.parametrize("input,expected", [\n    ("radar", True),\n    ("level", True),\n    ("racecar", True),\n    ("hello", False),\n    ("world", False),\n])\ndef test_is_palindrome(input, expected):\n    assert is_palindrome(input) == expected',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does a fixture with yield do?',
          options: ['Returns a generator', 'Setup before yield, teardown after', 'Same as return', 'Caches the value'],
          correctIndex: 1,
          explanation: 'Code before yield is setup, code after is teardown. The yielded value is injected into the test.'
        },
      ],
      keyTakeaways: [
        'pytest uses plain assert with detailed failure messages',
        'Fixtures (with yield) provide reusable setup/teardown',
        'Use @pytest.mark.parametrize for data-driven tests',
        'Mock with @patch or pytest-mock - replace dependencies',
        'conftest.py shares fixtures across test files',
      ],
      resources: [
        { title: 'pytest Documentation', url: 'https://docs.pytest.org/', type: 'docs' },
        { title: 'Obey the Testing Goat (free book)', url: 'https://www.obeythetestinggoat.com/', type: 'book', isHiddenGem: true },
      ]
    },

    {
      id: 'py-13',
      title: 'Modules, Packages & Virtual Environments',
      subtitle: 'Organize code, pip, venv, pyproject.toml',
      duration: 50,
      difficulty: 'Intermediate',
      phase: 'Real-World',
      content: [
        'A module is any .py file. A package is a directory containing modules with an __init__.py file. Use `import module` or `from module import name`.',
        'Virtual environments isolate project dependencies. Use `python -m venv .venv` to create one, then activate it. On modern Python use `uv` for blazing fast dependency management.',
        'Modern Python uses pyproject.toml as the single source of truth for project metadata, dependencies, and build configuration.',
        'When creating your own package, structure it as: mypackage/ (with __init__.py), pyproject.toml at root, src/ layout preferred.',
      ],
      codeExamples: [
        {
          filename: 'pyproject.toml',
          language: 'toml',
          code: '# pyproject.toml - modern Python project config\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "mypackage"\nversion = "0.1.0"\ndescription = "My awesome Python package"\nreadme = "README.md"\nrequires-python = ">=3.10"\nlicense = {text = "MIT"}\nauthors = [\n    {name = "Your Name", email = "you@example.com"}\n]\ndependencies = [\n    "requests>=2.31",\n    "pydantic>=2.0",\n]\n\n[project.optional-dependencies]\ndev = [\n    "pytest>=7.0",\n    "ruff>=0.1",\n    "mypy>=1.0",\n]\n\n[project.scripts]\nmyapp = "mypackage.cli:main"\n\n# Tool configs in same file\n[tool.ruff]\nline-length = 100\ntarget-version = "py310"\n\n[tool.pytest.ini_options]\ntestpaths = ["tests"]',
          explanation: 'pyproject.toml is the modern standard. Define project metadata, dependencies, optional deps (dev), CLI scripts, and tool configs all in one file.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a package `stringtools` with reverse(), count_vowels(), and is_palindrome() functions.',
          starterCode: '# stringtools/__init__.py\n',
          hint: 'Define functions in __init__.py or import them from submodules.',
          solution: '# stringtools/__init__.py\ndef reverse(s: str) -> str:\n    return s[::-1]\n\ndef count_vowels(s: str) -> int:\n    return sum(1 for c in s.lower() if c in "aeiou")\n\ndef is_palindrome(s: str) -> bool:\n    cleaned = "".join(c.lower() for c in s if c.isalnum())\n    return cleaned == cleaned[::-1]\n\n__all__ = ["reverse", "count_vowels", "is_palindrome"]\n__version__ = "0.1.0"',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does `if __name__ == "__main__":` do?',
          options: ['Imports the module', 'Runs code only when file is executed directly', 'Defines the main module', 'Nothing'],
          correctIndex: 1,
          explanation: 'Code inside this block runs only when the file is run directly, not when imported as a module.'
        },
      ],
      keyTakeaways: [
        'A module is any .py file, a package is a directory with __init__.py',
        'Always use `if __name__ == "__main__":` guard for script code',
        'Virtual environments isolate dependencies - one per project',
        'pyproject.toml is the modern standard for project config',
        'Use `pip install -e .` for editable development installs',
      ],
      resources: [
        { title: 'Python Modules Tutorial', url: 'https://docs.python.org/3/tutorial/modules.html', type: 'docs' },
        { title: 'uv - fast package manager', url: 'https://github.com/astral-sh/uv', type: 'tool', isHiddenGem: true },
      ]
    },

    {
      id: 'py-14',
      title: 'Logging, Configuration & CLI Apps',
      subtitle: 'logging module, .env, click/argparse for CLIs',
      duration: 50,
      difficulty: 'Intermediate',
      phase: 'Real-World',
      content: [
        'Never use print() for production logging - use the logging module. It supports levels (DEBUG, INFO, WARNING, ERROR, CRITICAL), formatters, handlers (console, file, network), and rotation.',
        'Configuration: use pydantic-settings or python-dotenv to load .env files. Never hardcode secrets. Use environment variables for everything that changes between environments.',
        'For CLI apps, use Click (modern, decorator-based) or Typer (Click + type hints). They handle argument parsing, validation, help text, and subcommands automatically.',
        'Structure: config.py (settings), logger.py (logging setup), cli.py (commands), services/ (business logic). This separation makes testing easy.',
      ],
      codeExamples: [
        {
          filename: 'logging_config.py',
          language: 'python',
          code: 'import logging\nimport sys\nfrom logging.handlers import RotatingFileHandler\nfrom pathlib import Path\n\ndef setup_logger(name: str = "app", log_file: str = "app.log") -> logging.Logger:\n    """Configure a production-ready logger."""\n    logger = logging.getLogger(name)\n    logger.setLevel(logging.DEBUG)\n    logger.handlers.clear()  # avoid duplicate handlers\n\n    # Format: timestamp | logger | level | message\n    fmt = logging.Formatter(\n        "%(asctime)s | %(name)s | %(levelname)-8s | %(message)s",\n        datefmt="%Y-%m-%d %H:%M:%S",\n    )\n\n    # Console handler (INFO+)\n    console = logging.StreamHandler(sys.stdout)\n    console.setLevel(logging.INFO)\n    console.setFormatter(fmt)\n    logger.addHandler(console)\n\n    # File handler with rotation (10MB, keep 5 backups)\n    Path(log_file).parent.mkdir(parents=True, exist_ok=True)\n    file_handler = RotatingFileHandler(\n        log_file, maxBytes=10_000_000, backupCount=5\n    )\n    file_handler.setLevel(logging.DEBUG)\n    file_handler.setFormatter(fmt)\n    logger.addHandler(file_handler)\n\n    return logger\n\n# Usage\nlogger = setup_logger("myapp", "logs/app.log")\nlogger.info("Application started")\nlogger.warning("Disk space low")\nlogger.error("Failed to connect", exc_info=True)\nlogger.debug("This only goes to file")',
          explanation: 'Production logger with: multiple handlers, log rotation, different levels per handler. This is what real applications use.'
        },
        {
          filename: 'click_cli.py',
          language: 'python',
          code: '# pip install click\nimport click\nfrom pathlib import Path\n\n@click.group()\ndef cli():\n    """Task manager CLI."""\n    pass\n\n@cli.command()\n@click.argument("title")\n@click.option("--priority", default="medium",\n              type=click.Choice(["low", "medium", "high"]))\n@click.option("--due", help="Due date YYYY-MM-DD")\ndef add(title, priority, due):\n    """Add a new task."""\n    click.echo(f"Added: {title} (priority={priority}, due={due})")\n\n@cli.command()\n@click.option("--status", default="all",\n              type=click.Choice(["all", "pending", "done"]))\ndef list(status):\n    """List tasks."""\n    click.echo(f"Listing {status} tasks...")\n\n@cli.command()\n@click.argument("task_id", type=int)\ndef done(task_id):\n    """Mark task as done."""\n    click.echo(f"Marked task {task_id} as done")\n\nif __name__ == "__main__":\n    cli()\n\n# Usage:\n# python cli.py add "Buy groceries" --priority high --due 2024-12-31\n# python cli.py list --status pending\n# python cli.py done 5\n# python cli.py --help',
          explanation: 'Click handles argument parsing, validation, help text, and subcommands. Much cleaner than argparse.'
        },
      ],
      keyTakeaways: [
        'Use logging module, not print(), for production logs',
        'Configure handlers: console (INFO+), file with rotation (DEBUG+)',
        'Load config from .env with pydantic-settings or python-dotenv',
        'Use Click or Typer for CLIs - handles parsing, validation, help',
        'Separate config, logger, CLI, and services for testability',
      ],
      resources: [
        { title: 'logging Documentation', url: 'https://docs.python.org/3/library/logging.html', type: 'docs' },
        { title: 'Click Documentation', url: 'https://click.palletsprojects.com/', type: 'docs' },
      ]
    },

    {
      id: 'py-15',
      title: 'Capstone: Build a Complete CLI Task Manager',
      subtitle: 'Put it all together - SQLAlchemy, Click, tests, packaging',
      duration: 120,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'Time to combine everything you\'ve learned into a real application. We\'ll build a CLI task manager with: SQLite persistence (SQLAlchemy), rich CLI output (Click), proper logging, tests (pytest), and packaging (pyproject.toml).',
        'This capstone ties together: OOP (Task, TaskService classes), error handling (validation, DB errors), file I/O (JSON export), type hints (throughout), testing (pytest with fixtures), packaging (pyproject.toml).',
        'Architecture: CLI Layer (commands.py) → Service Layer (services.py) → Data Layer (models.py + database.py). This separation means you can swap the CLI for a web UI without touching business logic.',
        'After completing this, you\'ll have a real, installable Python package you can `pip install` and use daily. This is the kind of project that demonstrates production Python skills.',
      ],
      visualization: {
        title: 'Task Manager Architecture',
        type: 'architecture',
        diagram: `┌─────────────────────────────────────────────┐
│            User (terminal)                  │
└──────────────┬──────────────────────────────┘
               │ CLI commands (Click)
               ▼
┌─────────────────────────────────────────────┐
│  CLI Layer (cli.py)                         │
│  • add • list • done • delete • export      │
│  • Parses arguments                         │
│  • Formats output (Rich)                    │
└──────────────┬──────────────────────────────┘
               │ Service calls
               ▼
┌─────────────────────────────────────────────┐
│  Service Layer (services.py)                │
│  • Business logic (validation, rules)       │
│  • Coordinates DB + export                  │
│  • Raises domain exceptions                 │
└──────┬───────────────────────────┬──────────┘
       │                           │
       ▼                           ▼
┌──────────────┐         ┌──────────────────┐
│ SQLite DB    │         │  Export/Import   │
│ (SQLAlchemy) │         │  JSON / CSV      │
│ models.py    │         │  exporters.py    │
└──────────────┘         └──────────────────┘

Files:
├── pyproject.toml     # Package config + deps
├── src/taskmanager/
│   ├── __init__.py
│   ├── cli.py         # Click commands
│   ├── models.py      # SQLAlchemy models
│   ├── database.py    # Engine, session
│   ├── services.py    # Business logic
│   └── exporters.py   # JSON/CSV export
└── tests/
    ├── conftest.py    # Fixtures
    ├── test_services.py
    └── test_cli.py`,
        legend: [
          'Layers separate concerns - each has one job',
          'CLI knows nothing about DB - only calls services',
          'Services know nothing about CLI - only business logic',
          'Easy to test: test services without CLI, test DB without services',
        ],
      },
      lab: {
        title: 'Build the Task Manager Step by Step',
        objective: 'Build a complete, installable CLI task manager',
        estTime: '6-8 hours',
        difficulty: 'Intermediate',
        setup: [
          'Create project: mkdir taskmanager && cd taskmanager',
          'Create venv: python -m venv .venv && source .venv/bin/activate',
          'Install deps: pip install click sqlalchemy rich pytest',
          'Create structure: mkdir -p src/taskmanager tests',
        ],
        steps: [
          {
            title: 'Step 1: Create pyproject.toml',
            instruction: 'Define the package metadata and dependencies',
            code: '[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "taskmanager"\nversion = "0.1.0"\ndescription = "CLI task manager"\nrequires-python = ">=3.10"\ndependencies = [\n    "click>=8.0",\n    "sqlalchemy>=2.0",\n    "rich>=13.0",\n]\n\n[project.optional-dependencies]\ndev = ["pytest>=7.0"]\n\n[project.scripts]\ntask = "taskmanager.cli:cli"\n\n[tool.hatch.build.targets.wheel]\npackages = ["src/taskmanager"]',
            codeLanguage: 'toml',
            explanation: 'This makes `task` available as a command after pip install.',
          },
          {
            title: 'Step 2: Create database.py',
            instruction: 'Set up SQLAlchemy engine and session',
            code: '# src/taskmanager/database.py\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker, DeclarativeBase\nfrom pathlib import Path\n\nclass Base(DeclarativeBase):\n    pass\n\nDB_PATH = Path.home() / ".taskmanager" / "tasks.db"\nDB_PATH.parent.mkdir(parents=True, exist_ok=True)\n\nengine = create_engine(f"sqlite:///{DB_PATH}", echo=False)\nSessionLocal = sessionmaker(bind=engine)\n\ndef init_db():\n    from . import models\n    Base.metadata.create_all(engine)\n\ndef get_session():\n    return SessionLocal()',
            codeLanguage: 'python',
            explanation: 'SQLite DB in ~/.taskmanager/tasks.db. Creates the dir if missing.',
          },
          {
            title: 'Step 3: Create models.py',
            instruction: 'Define the Task model',
            code: '# src/taskmanager/models.py\nfrom sqlalchemy import String, Integer, Boolean, DateTime, Text\nfrom sqlalchemy.orm import Mapped, mapped_column\nfrom datetime import datetime\nfrom .database import Base\n\nclass Task(Base):\n    __tablename__ = "tasks"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str] = mapped_column(String(200))\n    description: Mapped[str | None] = mapped_column(Text, nullable=True)\n    priority: Mapped[str] = mapped_column(String(20), default="medium")\n    completed: Mapped[bool] = mapped_column(Boolean, default=False)\n    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)\n    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)\n\n    def __repr__(self):\n        status = "✓" if self.completed else "○"\n        return f"{status} [{self.id}] {self.title} ({self.priority})"',
            codeLanguage: 'python',
          },
          {
            title: 'Step 4: Create services.py',
            instruction: 'Business logic layer',
            code: '# src/taskmanager/services.py\nfrom sqlalchemy import select\nfrom sqlalchemy.orm import Session\nfrom .models import Task\nfrom datetime import datetime\n\nclass TaskService:\n    def __init__(self, session: Session):\n        self.session = session\n\n    def add_task(self, title: str, priority: str = "medium",\n                 description: str | None = None) -> Task:\n        task = Task(title=title, priority=priority, description=description)\n        self.session.add(task)\n        self.session.commit()\n        self.session.refresh(task)\n        return task\n\n    def list_tasks(self, status: str = "all") -> list[Task]:\n        stmt = select(Task).order_by(Task.created_at.desc())\n        if status == "pending":\n            stmt = stmt.where(Task.completed == False)\n        elif status == "done":\n            stmt = stmt.where(Task.completed == True)\n        return list(self.session.execute(stmt).scalars().all())\n\n    def complete_task(self, task_id: int) -> Task | None:\n        task = self.session.get(Task, task_id)\n        if task and not task.completed:\n            task.completed = True\n            task.completed_at = datetime.utcnow()\n            self.session.commit()\n            self.session.refresh(task)\n        return task\n\n    def delete_task(self, task_id: int) -> bool:\n        task = self.session.get(Task, task_id)\n        if task:\n            self.session.delete(task)\n            self.session.commit()\n            return True\n        return False\n\n    def search(self, query: str) -> list[Task]:\n        stmt = select(Task).where(Task.title.ilike(f"%{query}%"))\n        return list(self.session.execute(stmt).scalars().all())',
            codeLanguage: 'python',
          },
          {
            title: 'Step 5: Create cli.py',
            instruction: 'CLI commands with Click + Rich output',
            code: '# src/taskmanager/cli.py\nimport click\nfrom rich.console import Console\nfrom rich.table import Table\nfrom .database import init_db, get_session\nfrom .services import TaskService\n\nconsole = Console()\n\n@click.group()\ndef cli():\n    """Task manager CLI."""\n    init_db()\n\n@cli.command()\n@click.argument("title")\n@click.option("-p", "--priority", default="medium",\n              type=click.Choice(["low", "medium", "high"]))\n@click.option("-d", "--description")\ndef add(title, priority, description):\n    """Add a new task."""\n    with get_session() as session:\n        svc = TaskService(session)\n        task = svc.add_task(title, priority, description)\n        console.print(f"[green]Added:[/] {task}")\n\n@cli.command(name="list")\n@click.option("-s", "--status", default="all",\n              type=click.Choice(["all", "pending", "done"]))\ndef list_tasks(status):\n    """List tasks."""\n    with get_session() as session:\n        svc = TaskService(session)\n        tasks = svc.list_tasks(status)\n        if not tasks:\n            console.print("[yellow]No tasks found.[/]")\n            return\n        table = Table(show_header=True)\n        table.add_column("ID", style="cyan")\n        table.add_column("Status")\n        table.add_column("Title")\n        table.add_column("Priority")\n        for t in tasks:\n            status = "[green]✓[/]" if t.completed else "[yellow]○[/]"\n            table.add_row(str(t.id), status, t.title, t.priority)\n        console.print(table)\n\n@cli.command()\n@click.argument("task_id", type=int)\ndef done(task_id):\n    """Mark task as done."""\n    with get_session() as session:\n        svc = TaskService(session)\n        task = svc.complete_task(task_id)\n        if task:\n            console.print(f"[green]Completed:[/] {task}")\n        else:\n            console.print(f"[red]Task {task_id} not found.[/]")\n\n@cli.command()\n@click.argument("task_id", type=int)\ndef delete(task_id):\n    """Delete a task."""\n    with get_session() as session:\n        svc = TaskService(session)\n        if svc.delete_task(task_id):\n            console.print(f"[green]Deleted task {task_id}[/]")\n        else:\n            console.print(f"[red]Task {task_id} not found.[/]")\n\nif __name__ == "__main__":\n    cli()',
            codeLanguage: 'python',
          },
          {
            title: 'Step 6: Install and test',
            instruction: 'Install in development mode and use it',
            code: '# Install (editable mode)\npip install -e ".[dev]"\n\n# Use it!\ntask add "Buy groceries" --priority high\ntask add "Write blog post" --priority medium -d "About Python"\ntask list\ntask list --status pending\ntask done 1\ntask list\ntask delete 2\ntask --help',
            codeLanguage: 'bash',
            expectedOutput: '$ task list\n┏━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┓\n┃ ID   ┃ Status ┃ Title            ┃ Priority ┃\n┡━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━┩\n│ 1    │ ✓      │ Buy groceries    │ high     │\n│ 2    │ ○      │ Write blog post  │ medium   │\n└──────┴────────┴──────────────────┴──────────┘',
          },
          {
            title: 'Step 7: Write tests',
            instruction: 'Test the service layer with pytest',
            code: '# tests/test_services.py\nimport pytest\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\nfrom taskmanager.database import Base\nfrom taskmanager.services import TaskService\n\n@pytest.fixture\ndef session():\n    engine = create_engine("sqlite:///:memory:")\n    Base.metadata.create_all(engine)\n    Session = sessionmaker(bind=engine)\n    s = Session()\n    yield s\n    s.close()\n\ndef test_add_task(session):\n    svc = TaskService(session)\n    task = svc.add_task("Test task", priority="high")\n    assert task.id is not None\n    assert task.title == "Test task"\n    assert task.priority == "high"\n    assert task.completed is False\n\ndef test_complete_task(session):\n    svc = TaskService(session)\n    task = svc.add_task("Test")\n    completed = svc.complete_task(task.id)\n    assert completed.completed is True\n    assert completed.completed_at is not None\n\ndef test_list_pending(session):\n    svc = TaskService(session)\n    svc.add_task("Task 1")\n    svc.add_task("Task 2")\n    svc.complete_task(1)\n    pending = svc.list_tasks(status="pending")\n    assert len(pending) == 1\n    assert pending[0].title == "Task 2"\n\ndef test_delete_task(session):\n    svc = TaskService(session)\n    task = svc.add_task("To delete")\n    assert svc.delete_task(task.id) is True\n    assert svc.delete_task(task.id) is False  # already gone\n\n# Run: pytest -v',
            codeLanguage: 'python',
            explanation: 'Use in-memory SQLite for fast tests. Fixtures provide clean DB per test.',
          },
        ],
        verification: 'Run `task --help`, `task add "test"`, `task list` - all should work. Run `pytest` - all tests should pass.',
      },
      keyTakeaways: [
        'Layered architecture: CLI → Service → Data',
        'Use Click for CLIs, SQLAlchemy for DB, Rich for output',
        'Test the service layer with in-memory SQLite',
        'Package with pyproject.toml and `pip install -e .`',
        'This is a real, installable Python application!',
      ],
      resources: [
        { title: 'Click Documentation', url: 'https://click.palletsprojects.com/', type: 'docs' },
        { title: 'Rich Documentation', url: 'https://rich.readthedocs.io/', type: 'docs' },
      ],
      miniProject: {
        title: 'Extend the Task Manager',
        description: 'Add features to the task manager: due dates, tags, JSON export/import, search.',
        requirements: [
          'Add due_date field with overdue detection',
          'Add tags (many-to-many with Tag model)',
          'Export tasks to JSON',
          'Import tasks from JSON',
          'Search by keyword with task search --query',
          'Add tests for new features',
        ],
        estTime: '3-4 hours',
        solutionCode: '# See the full implementation in the lab steps above.\n# Key additions:\n# 1. Add due_date: Mapped[datetime | None] to Task model\n# 2. Add Tag model + association table for many-to-many\n# 3. Add export_json() and import_json() to TaskService\n# 4. Add search() method (already in services.py)\n# 5. Add CLI commands: task export, task import, task search',
        solutionLanguage: 'python'
      }
    },
  ]
};
