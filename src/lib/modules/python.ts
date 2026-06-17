import { Module } from '../types';

export const pythonModule: Module = {
  id: 'python',
  title: 'Python Mastery',
  icon: '🐍',
  color: '#3776AB',
  gradient: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
  description: 'From zero to writing production Python applications. 10 lessons covering syntax, OOP, async, packaging, testing, and full app building.',
  level: 'All Levels',
  lessons: [
    {
      id: 'py-01',
      title: 'What is Python? Setup & First Program',
      subtitle: 'Install Python, run your first script, understand the REPL',
      duration: 30,
      difficulty: 'Beginner',
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
        {
          prompt: 'Write a script that takes three numbers as command-line arguments and prints their average.',
          starterCode: 'import sys\n# Your code here\n',
          hint: 'Use sys.argv, slice [1:], convert to float, then compute average.',
          solution: 'import sys\nif len(sys.argv) != 4:\n    print("Usage: python avg.py num1 num2 num3")\n    sys.exit(1)\n\nnums = [float(x) for x in sys.argv[1:4]]\naverage = sum(nums) / len(nums)\nprint(f"Average: {average:.2f}")',
          solutionLanguage: 'python'
        }
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
        {
          question: 'How do you embed a variable in an f-string?',
          options: ['{variable}', '\\$\\{variable\\}', '%variable%', '#{variable}'],
          correctIndex: 0,
          explanation: 'f-strings use {variable} syntax: f"Hello {name}"'
        }
      ],
      keyTakeaways: [
        'Python is dynamically typed - no need to declare variable types',
        'Use f-strings (f"...") for string formatting - cleaner than % or .format()',
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
      miniProject: {
        title: 'Personal Greeting Card Generator',
        description: 'Build a CLI script that asks for name, age, and favorite color, then prints a decorative greeting card with that information.',
        requirements: [
          'Use input() for 3 prompts',
          'Validate age is a number between 1-120',
          'Print a decorative card using print() and ASCII art',
          'Use f-strings throughout'
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
      content: [
        'Python has several built-in data types. The fundamental ones are: int (integers), float (decimal numbers), str (strings), bool (True/False), list (ordered, mutable), tuple (ordered, immutable), dict (key-value pairs), and set (unordered, unique elements).',
        'Understanding when to use each type is crucial. Lists are great for ordered collections you will modify. Tuples are perfect for fixed records (like coordinates). Dicts map keys to values - ideal for lookups. Sets are best when you need uniqueness.',
        'Python operators include arithmetic (+, -, *, /, //, %, **), comparison (==, !=, <, >, <=, >=), logical (and, or, not), and special operators like `in`, `is`, and bitwise operators (&, |, ^, ~, <<, >>).',
        'One unique Python feature: chained comparisons. You can write `if 0 < x < 100` directly - Python translates it to `0 < x and x < 100` but evaluates x only once.'
      ],
      codeExamples: [
        {
          filename: 'data_types.py',
          language: 'python',
          code: '# Numbers\na = 10           # int\nb = 3.14         # float\nc = 2 + 3j        # complex (j is imaginary unit)\nd = 10 / 3        # 3.333 (true division)\ne = 10 // 3       # 3 (floor division)\nf = 10 % 3        # 1 (modulo)\ng = 2 ** 10       # 1024 (exponent)\n\n# Strings - immutable\ns = "Hello"\ns_multi = """Multi\nline\nstring"""\nprint(s[0])       # H\nprint(s[-1])      # o (negative indexing)\nprint(s[1:4])     # ell (slicing)\nprint(s * 3)      # HelloHelloHello\nprint(len(s))     # 5\n\n# Lists - ordered, mutable\nnums = [1, 2, 3, 4, 5]\nnums.append(6)\nnums.insert(0, 0)\nnums.pop()         # removes 6\nnums.remove(3)     # removes first 3\nprint(nums[::2])   # [0, 2, 4] step slicing\n\n# Tuples - ordered, immutable\npoint = (10, 20)\nx, y = point       # unpacking\nsingle = (42,)     # single-element tuple needs comma\n\n# Dicts - key-value, ordered (3.7+)\nuser = {\n    "name": "Alice",\n    "age": 30,\n    "skills": ["Python", "ML"]\n}\nprint(user["name"])\nuser["email"] = "alice@example.com"  # add key\nprint(user.keys())\nprint(user.items())\n\n# Sets - unordered, unique\ncolors = {"red", "green", "blue"}\ncolors.add("red")    # no duplicate added\nprint(len(colors))   # 3\n\n# Set operations\na_set = {1, 2, 3}\nb_set = {3, 4, 5}\nprint(a_set & b_set)  # intersection\nprint(a_set | b_set)  # union\nprint(a_set - b_set)  # difference',
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
      subtitle: 'Conditionals, loops, comprehensions, and pattern matching',
      duration: 50,
      difficulty: 'Beginner',
      content: [
        'Control flow statements direct the order of execution. Python uses indentation (typically 4 spaces) to define blocks instead of braces. The standard constructs are: if/elif/else, for loops, while loops, try/except, and the newer match-case (Python 3.10+).',
        'For loops in Python iterate over iterables - lists, tuples, strings, dicts, files, generators. Use range() for numeric iteration. The enumerate() function gives you index + value pairs. The zip() function lets you iterate over multiple iterables in parallel.',
        'List comprehensions are a Pythonic way to create lists. They are often faster than equivalent for loops. Syntax: [expression for item in iterable if condition]. You can also have dict comprehensions {k: v for ...} and set comprehensions {x for ...}.',
        'The match-case statement (Python 3.10+) brings structural pattern matching. It is much more powerful than switch-case in other languages - it can destructure data, match types, and use guards.'
      ],
      codeExamples: [
        {
          filename: 'control_flow.py',
          language: 'python',
          code: '# if / elif / else\nscore = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\nprint(f"Grade: {grade}")\n\n# Ternary expression\nstatus = "pass" if score >= 60 else "fail"\n\n# For loop over iterable\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate - get index + value\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\n# zip - iterate in parallel\nnames = ["Alice", "Bob", "Carol"]\nages = [25, 30, 35]\nfor name, age in zip(names, ages):\n    print(f"{name} is {age}")\n\n# range\nfor i in range(5):       # 0,1,2,3,4\n    print(i)\nfor i in range(2, 10, 2):  # 2,4,6,8 (start, stop, step)\n    print(i)\n\n# while loop with else (!)\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\nelse:\n    print("Loop completed normally")  # runs if no break\n\n# break / continue\nfor n in range(10):\n    if n == 3:\n        continue  # skip 3\n    if n == 7:\n        break     # stop at 7\n    print(n)',
          explanation: 'Python loops support else clauses - the else block runs if the loop completes without hitting a break. This is rarely used but useful for search patterns.'
        },
        {
          filename: 'comprehensions.py',
          language: 'python',
          code: '# List comprehension - fast and Pythonic\nnums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Squares of all numbers\nsquares = [x ** 2 for x in nums]\n# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n\n# Even numbers only\nevens = [x for x in nums if x % 2 == 0]\n# [2, 4, 6, 8, 10]\n\n# With transformation\nlabels = ["even" if x % 2 == 0 else "odd" for x in nums]\n\n# Nested comprehension - flatten 2D list\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflat = [x for row in matrix for x in row]\n# [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n# Dict comprehension\nsquares_dict = {x: x**2 for x in range(1, 6)}\n# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\n# Set comprehension\nunique_lengths = {len(w) for w in ["a", "ab", "abc", "ab"]}\n# {1, 2, 3}\n\n# Generator expression - lazy evaluation, memory-efficient\n# Use () instead of []\ngen = (x**2 for x in range(1000000))\nprint(next(gen))  # 0\nprint(next(gen))  # 1\n# Does not create a list of 1M elements in memory',
          explanation: 'Comprehensions are concise and fast. Generator expressions (with parens) are lazy - they produce values one at a time, saving memory for large datasets.'
        },
      ],
      exercises: [
        {
          prompt: 'Use a list comprehension to create a list of cubes of odd numbers from 1 to 20.',
          starterCode: '# Your list comprehension here\ncubes = \n',
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
        { title: 'PEP 634 - match-case', url: 'https://peps.python.org/pep-0634/', type: 'article' },
      ]
    },

    {
      id: 'py-04',
      title: 'Functions, *args, **kwargs & Decorators',
      subtitle: 'Define functions, use closures, build decorators',
      duration: 60,
      difficulty: 'Beginner',
      content: [
        'Functions in Python are first-class objects - they can be passed as arguments, returned from other functions, and assigned to variables. Define them with the `def` keyword. Use type hints for clarity (Python 3.5+).',
        'Python supports default arguments, keyword arguments, *args (variable positional), and **kwargs (variable keyword). Understanding argument unpacking is essential - you can use * to unpack iterables and ** to unpack dicts when calling functions.',
        'Closures are functions that capture variables from their enclosing scope. They are the foundation of decorators. A decorator is a function that takes another function and extends its behavior without modifying it - typically used for logging, timing, caching, authentication.',
        'Python has built-in decorators like @staticmethod, @classmethod, @property, @functools.lru_cache, @dataclass. You can stack multiple decorators - they apply bottom-up but appear top-down.'
      ],
      codeExamples: [
        {
          filename: 'functions.py',
          language: 'python',
          code: '# Basic function with type hints\ndef greet(name: str, greeting: str = "Hello") -> str:\n    """Return a greeting string."""\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))          # Hello, Alice!\nprint(greet("Bob", greeting="Hi"))  # keyword argument\n\n# *args - variable positional arguments (tuple)\ndef sum_all(*args):\n    return sum(args)\nprint(sum_all(1, 2, 3, 4, 5))  # 15\n\n# **kwargs - variable keyword arguments (dict)\ndef show_config(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key} = {value}")\n\nshow_config(host="localhost", port=8000, debug=True)\n\n# Both *args and **kwargs\ndef log_call(*args, **kwargs):\n    print(f"args: {args}")\n    print(f"kwargs: {kwargs}")\n\n# Argument unpacking\nnums = [1, 2, 3]\nprint(sum_all(*nums))  # equivalent to sum_all(1, 2, 3)\n\nconfig = {"host": "0.0.0.0", "port": 8080}\nshow_config(**config)  # unpacks dict as kwargs\n\n# Multiple return values (returns tuple)\ndef min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([3, 1, 4, 1, 5, 9, 2, 6])\nprint(f"min={low}, max={high}")\n\n# Lambda - anonymous function\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n\n# Common use: sort by key\nusers = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]\nusers.sort(key=lambda u: u["age"])',
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
          prompt: 'Write a decorator @cache that memoizes function results. Use a dict to store results.',
          starterCode: 'def cache(func):\n    # your code here\n    pass\n',
          hint: 'Store results in a dict keyed by args. Check if args already in dict before calling.',
          solution: 'import functools\n\ndef cache(func):\n    stored = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in stored:\n            stored[args] = func(*args)\n        return stored[args]\n    return wrapper\n\n@cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(50))  # 12586269025 - instant thanks to caching',
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
          options: ['To speed up the function', 'To preserve function metadata like __name__', 'To cache results', 'No reason, optional'],
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
        'Class-based decorators implement __call__'
      ],
      resources: [
        { title: 'Python Functions Tutorial', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', type: 'docs' },
        { title: 'PEP 318 - Decorators', url: 'https://peps.python.org/pep-0318/', type: 'article' },
        { title: 'Real Python - Decorators Guide', url: 'https://realpython.com/primer-on-python-decorators/', type: 'article' },
      ]
    },

    {
      id: 'py-05',
      title: 'Object-Oriented Programming',
      subtitle: 'Classes, inheritance, magic methods, properties, dataclasses',
      duration: 75,
      difficulty: 'Intermediate',
      content: [
        'Python is multi-paradigm but deeply supports OOP. Classes are defined with the `class` keyword. The __init__ method is the constructor. All instance methods take `self` as the first parameter, which refers to the instance. Python supports single and multiple inheritance, mixins, and abstract base classes.',
        'Magic methods (dunder methods) let your classes integrate with Python syntax: __str__, __repr__, __len__, __eq__, __lt__, __add__, __getitem__, __iter__, __enter__, __call__, and many more. Implementing these makes your objects behave like built-in types.',
        'The @property decorator turns methods into read-only attributes. Use @x.setter to allow assignment. Properties are the Pythonic way to encapsulate - you do not need getX/setX methods.',
        'Use @dataclass (Python 3.7+) to auto-generate __init__, __repr__, and __eq__ for data containers. Use ABC (abstract base class) and @abstractmethod to define interfaces. Use typing.Protocol for structural typing (duck typing with type checking).'
      ],
      codeExamples: [
        {
          filename: 'oop_basics.py',
          language: 'python',
          code: 'class Dog:\n    # Class attribute - shared by all instances\n    species = "Canis familiaris"\n\n    def __init__(self, name: str, age: int):\n        # Instance attributes\n        self.name = name\n        self.age = age\n        self._tricks = []  # "protected" by convention\n\n    # Instance method\n    def bark(self) -> str:\n        return f"{self.name} says Woof!"\n\n    # __str__ - human readable (print, str())\n    def __str__(self):\n        return f"Dog(name={self.name!r}, age={self.age})"\n\n    # __repr__ - developer representation (repr(), debugging)\n    def __repr__(self):\n        return f"Dog({self.name!r}, {self.age})"\n\n    # __eq__ for equality comparison\n    def __eq__(self, other):\n        if not isinstance(other, Dog):\n            return NotImplemented\n        return self.name == other.name and self.age == other.age\n\nrex = Dog("Rex", 5)\nprint(rex.bark())  # Rex says Woof!\nprint(rex)         # Dog(name=\'Rex\', age=5)\n\n# Inheritance\nclass Puppy(Dog):\n    def __init__(self, name, age=0):\n        super().__init__(name, age)  # call parent constructor\n\n    def bark(self):  # override\n        return f"{self.name} says Yip!"\n\npup = Puppy("Buddy", 1)\nprint(pup.bark())   # Buddy says Yip!\nprint(isinstance(pup, Dog))  # True',
          explanation: 'Use __init__ for construction, __str__ for users, __repr__ for developers. Use super() to call parent methods. Single underscore prefix is "protected" by convention only.'
        },
        {
          filename: 'dataclasses.py',
          language: 'python',
          code: 'from dataclasses import dataclass, field\nfrom typing import List\n\n# Auto-generates __init__, __repr__, __eq__\n@dataclass\nclass User:\n    name: str\n    age: int\n    email: str = ""  # default\n    tags: List[str] = field(default_factory=list)  # mutable default\n\nuser1 = User("Alice", 30)\nuser2 = User("Alice", 30)\nprint(user1)            # User(name=\'Alice\', age=30, email=\'\', tags=[])\nprint(user1 == user2)   # True (auto-generated __eq__)\n\n# Frozen dataclass - immutable\n@dataclass(frozen=True)\nclass Point:\n    x: float\n    y: float\n\np = Point(1.0, 2.0)\n# p.x = 5  # FrozenInstanceError!\n\n# Slots for memory efficiency\n@dataclass(slots=True)\nclass Pixel:\n    r: int\n    g: int\n    b: int',
          explanation: '@dataclass auto-generates boilerplate. Use field(default_factory=list) for mutable defaults. frozen=True makes it immutable. slots=True saves memory.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a BankAccount class with deposit, withdraw, and balance (with overdraft protection). Use @property for balance (read-only).',
          starterCode: 'class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        # your code here\n        pass\n',
          hint: 'Store balance in self._balance. Use @property without @x.setter to make it read-only.',
          solution: 'class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        self.owner = owner\n        self._balance = initial_balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Amount must be positive")\n        self._balance += amount\n        return self._balance\n\n    def withdraw(self, amount):\n        if amount > self._balance:\n            raise ValueError("Insufficient funds")\n        self._balance -= amount\n        return self._balance\n\n    def __str__(self):\n        return f"BankAccount({self.owner}, balance={self._balance:.2f})"\n\nacct = BankAccount("Alice", 100)\nacct.deposit(50)\nprint(acct.balance)  # 150\nacct.withdraw(30)\nprint(acct.balance)  # 120',
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
          explanation: 'super() returns a proxy that lets you call parent class methods, useful in __init__ and overrides.'
        },
      ],
      keyTakeaways: [
        'Classes use __init__ for construction, self for instance reference',
        'Magic methods (__str__, __repr__, __len__, etc.) enable built-in behavior',
        '@property creates managed attributes - no need for getX/setX',
        '@dataclass auto-generates __init__, __repr__, __eq__',
        'Use super() to call parent methods, isinstance() for type checks',
        'Single underscore = protected by convention, double = name mangling'
      ],
      resources: [
        { title: 'Python Classes Tutorial', url: 'https://docs.python.org/3/tutorial/classes.html', type: 'docs' },
        { title: 'Dataclasses Documentation', url: 'https://docs.python.org/3/library/dataclasses.html', type: 'docs' },
        { title: 'Real Python - OOP', url: 'https://realpython.com/python3-object-oriented-programming/', type: 'article' },
      ],
      miniProject: {
        title: 'Build a Library Management System',
        description: 'Build an OOP system with Book, Member, and Library classes. Books can be borrowed/returned. Members have a borrowing limit. Library tracks all books and members.',
        requirements: [
          'Book class with title, author, isbn, is_borrowed',
          'Member class with name, member_id, borrowed_books (max 5)',
          'Library class with add_book, register_member, borrow_book, return_book',
          'Use @property where appropriate',
          'Use @dataclass for Book',
          'Implement __str__ for human-readable output'
        ],
        estTime: '1-2 hours',
        solutionCode: 'from dataclasses import dataclass, field\nfrom typing import List, Optional\n\n@dataclass\nclass Book:\n    title: str\n    author: str\n    isbn: str\n    is_borrowed: bool = False\n\n    def __str__(self):\n        status = "Borrowed" if self.is_borrowed else "Available"\n        return f"{self.title} by {self.author} [{status}]"\n\nclass Member:\n    BORROW_LIMIT = 5\n\n    def __init__(self, name: str, member_id: str):\n        self.name = name\n        self.member_id = member_id\n        self._borrowed: List[Book] = []\n\n    @property\n    def borrowed_count(self):\n        return len(self._borrowed)\n\n    def can_borrow(self) -> bool:\n        return self.borrowed_count < self.BORROW_LIMIT\n\n    def borrow(self, book: Book) -> bool:\n        if not self.can_borrow():\n            return False\n        if book.is_borrowed:\n            return False\n        book.is_borrowed = True\n        self._borrowed.append(book)\n        return True\n\n    def return_book(self, book: Book) -> bool:\n        if book not in self._borrowed:\n            return False\n        book.is_borrowed = False\n        self._borrowed.remove(book)\n        return True\n\nclass Library:\n    def __init__(self, name: str):\n        self.name = name\n        self._books: List[Book] = []\n        self._members: dict = {}\n\n    def add_book(self, book: Book):\n        self._books.append(book)\n\n    def register_member(self, member: Member):\n        self._members[member.member_id] = member\n\n    def borrow_book(self, isbn: str, member_id: str) -> bool:\n        book = next((b for b in self._books if b.isbn == isbn), None)\n        member = self._members.get(member_id)\n        if not book or not member:\n            return False\n        return member.borrow(book)',
        solutionLanguage: 'python'
      }
    },

    {
      id: 'py-06',
      title: 'Error Handling & Exceptions',
      subtitle: 'try/except, custom exceptions, context managers',
      duration: 45,
      difficulty: 'Intermediate',
      content: [
        'Python uses exceptions for error handling. The try/except/else/finally construct catches and handles errors. Unlike some languages, Python encourages "EAFP" (Easier to Ask Forgiveness than Permission) - try the operation, catch the error, rather than checking first.',
        'Built-in exceptions form a hierarchy: BaseException > Exception > (ValueError, TypeError, RuntimeError, ...). Always catch specific exceptions, not bare `except:` which swallows everything including KeyboardInterrupt. Use `except Exception` if you must catch broadly.',
        'You can raise exceptions with `raise ValueError("message")`. To re-raise the current exception, use bare `raise`. To chain exceptions, use `raise NewError from original`. Custom exceptions should inherit from Exception (not BaseException).',
        'Context managers (the `with` statement) ensure resources are cleaned up. Implement __enter__ and __exit__ on a class, or use @contextlib.contextmanager on a generator function. They handle exceptions in __exit__ - return True to suppress.'
      ],
      codeExamples: [
        {
          filename: 'exceptions.py',
          language: 'python',
          code: '# Basic try/except/else/finally\ntry:\n    x = int(input("Enter number: "))\n    result = 10 / x\nexcept ValueError:\n    print("Not a valid number!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:\n    print(f"Unexpected error: {e}")\nelse:\n    # Runs only if no exception\n    print(f"Result: {result}")\nfinally:\n    # Always runs (cleanup)\n    print("Done")\n\n# Custom exceptions\nclass ValidationError(Exception):\n    """Raised when input validation fails."""\n    pass\n\nclass InsufficientFunds(Exception):\n    def __init__(self, balance, amount):\n        self.balance = balance\n        self.amount = amount\n        super().__init__(\n            f"Need \\$\\{amount}, have \\$\\{balance}, short \\$\\{amount-balance}"\n        )\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFunds(balance, amount)\n    return balance - amount\n\ntry:\n    withdraw(50, 100)\nexcept InsufficientFunds as e:\n    print(e)            # message\n    print(e.balance)    # 50\n    print(e.amount)     # 100',
          explanation: 'Use specific exception types. Create custom exceptions inheriting from Exception. Use else for code that runs only if no exception, finally for cleanup.'
        },
        {
          filename: 'context_managers.py',
          language: 'python',
          code: 'import contextlib\nimport time\n\n# Class-based context manager\nclass Timer:\n    def __init__(self, name=""):\n        self.name = name\n\n    def __enter__(self):\n        self.start = time.perf_counter()\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        elapsed = time.perf_counter() - self.start\n        print(f"{self.name} took {elapsed:.4f}s")\n        return False  # True to suppress exceptions\n\nwith Timer("sleep"):\n    time.sleep(0.5)\n\n# Generator-based context manager (cleaner!)\n@contextlib.contextmanager\ndef open_db(connection_string):\n    print(f"Connecting to {connection_string}")\n    conn = {"connected": True}\n    try:\n        yield conn  # this is the value given to `as`\n    finally:\n        conn["connected"] = False\n        print("Connection closed")\n\nwith open_db("postgres://localhost") as db:\n    print(f"Using: {db}")',
          explanation: 'Context managers ensure cleanup. Use __enter__/__exit__ for classes, or @contextlib.contextmanager with a generator for simpler cases.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a custom exception `InvalidAgeError`. Write a function `validate_age(age)` that raises it if age < 0 or > 150.',
          starterCode: 'class InvalidAgeError(Exception):\n    pass\n\ndef validate_age(age):\n    # your code\n    pass\n',
          hint: 'Raise InvalidAgeError with a descriptive message inside an if check.',
          solution: 'class InvalidAgeError(Exception):\n    pass\n\ndef validate_age(age):\n    if not isinstance(age, (int, float)):\n        raise InvalidAgeError(f"Age must be a number, got {type(age).__name__}")\n    if age < 0 or age > 150:\n        raise InvalidAgeError(f"Age must be 0-150, got {age}")\n    return True\n\ntry:\n    validate_age(-5)\nexcept InvalidAgeError as e:\n    print(e)',
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
        {
          question: 'What should custom exceptions inherit from?',
          options: ['BaseException', 'Exception', 'Error', 'object'],
          correctIndex: 1,
          explanation: 'Inherit from Exception, not BaseException (which includes system-exiting exceptions).'
        },
      ],
      keyTakeaways: [
        'Use try/except/else/finally - else runs if no exception, finally always runs',
        'Catch specific exceptions, not bare except:',
        'Custom exceptions inherit from Exception',
        'Use `raise from` to chain exceptions with cause',
        'Context managers (with statement) ensure cleanup',
        'Use @contextlib.contextmanager for generator-based context managers'
      ],
      resources: [
        { title: 'Python Errors and Exceptions', url: 'https://docs.python.org/3/tutorial/errors.html', type: 'docs' },
        { title: 'contextlib module', url: 'https://docs.python.org/3/library/contextlib.html', type: 'docs' },
      ]
    },

    {
      id: 'py-07',
      title: 'File I/O & Working with Paths',
      subtitle: 'Read/write files, pathlib, JSON, CSV',
      duration: 50,
      difficulty: 'Intermediate',
      content: [
        'File I/O in Python is straightforward with the built-in open() function. Always use `with open(...) as f:` to ensure files are closed, even if an exception occurs. Modes: "r" (read), "w" (write, truncate), "a" (append), "x" (exclusive create), "b" (binary), "+" (read+write).',
        'The pathlib module (Python 3.4+) is the modern way to work with paths. It is object-oriented, cross-platform, and replaces os.path. Use Path() to create paths, / operator to join, .read_text()/.write_text() for simple I/O, .exists(), .is_file(), .mkdir(), .glob() for listing.',
        'Python has built-in support for JSON (json module), CSV (csv module), and many other formats. For JSON, use json.dumps() to serialize to string, json.dump() to write to file, json.loads()/json.load() to deserialize. For CSV, use csv.reader/csv.writer or csv.DictReader/csv.DictWriter for dict-based access.',
        'For large files, process them line-by-line instead of loading entirely into memory. Iterate over the file object directly: `for line in file:`. This is memory-efficient and idiomatic.'
      ],
      codeExamples: [
        {
          filename: 'pathlib_demo.py',
          language: 'python',
          code: 'from pathlib import Path\n\n# Create paths (use / operator - cross-platform)\np = Path.cwd()  # current working directory\nhome = Path.home()  # user home directory\ndocs = home / "Documents" / "notes.txt"  # / operator joins paths\n\n# Path parts\nprint(docs.name)        # notes.txt\nprint(docs.stem)        # notes (without extension)\nprint(docs.suffix)      # .txt\nprint(docs.parent)      # ~/Documents\n\n# Existence and type\nprint(docs.exists())     # True/False\nprint(docs.is_file())    # True if file\nprint(docs.is_dir())     # True if directory\n\n# Easy file I/O\nPath("output.txt").write_text("Hello!", encoding="utf-8")\ntext = Path("output.txt").read_text(encoding="utf-8")\n\n# Create directories\nPath("new_dir/sub").mkdir(parents=True, exist_ok=True)\n\n# Glob patterns\nfor py_file in Path(".").rglob("*.py"):  # recursive\n    print(py_file)',
          explanation: 'pathlib is the modern, object-oriented way to handle paths. Use / to join, .read_text()/.write_text() for simple I/O, .glob()/.rglob() for finding files.'
        },
        {
          filename: 'json_csv.py',
          language: 'python',
          code: 'import json\nimport csv\n\n# JSON: Python dict/list <-> JSON string/file\nuser = {\n    "name": "Alice",\n    "age": 30,\n    "skills": ["Python", "ML"],\n    "active": True,\n    "balance": None\n}\n\n# Serialize to string\njson_str = json.dumps(user, indent=2)\n\n# Write to file\nwith open("user.json", "w") as f:\n    json.dump(user, f, indent=2)\n\n# Read from file\nwith open("user.json") as f:\n    loaded = json.load(f)\nprint(loaded["name"])  # Alice\n\n# CSV - write rows\nrows = [\n    ["name", "age", "city"],\n    ["Alice", 30, "NYC"],\n    ["Bob", 25, "LA"],\n]\nwith open("users.csv", "w", newline="") as f:\n    writer = csv.writer(f)\n    writer.writerows(rows)\n\n# CSV - read with DictReader\nwith open("users.csv") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["name"], row["age"], row["city"])',
          explanation: 'json.dumps/load for strings, json.dump/load for files. csv.writer/reader for lists, DictReader/DictWriter for dicts. Always use newline="" for CSV on all platforms.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a function that reads a JSON file of users, filters users over 18, and writes them to a new JSON file.',
          starterCode: 'import json\nfrom pathlib import Path\n\ndef filter_adults(input_path, output_path):\n    # your code\n    pass\n',
          hint: 'Use json.load(), list comprehension with if, then json.dump() with indent=2.',
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
        {
          question: 'How do you join paths in pathlib?',
          options: ['path + "/sub"', 'path / "sub"', 'path.join("sub")', 'path.append("sub")'],
          correctIndex: 1,
          explanation: 'Use the / operator: Path("/home") / "user" / "file.txt". Cross-platform.'
        },
      ],
      keyTakeaways: [
        'Always use `with open(...)` for automatic file closing',
        'pathlib is the modern way to handle paths - use / to join',
        'For large files, iterate line-by-line instead of .read()',
        'json.dumps/load for strings, json.dump/load for files',
        'csv.DictReader/DictWriter work with header-based CSVs',
        'Specify encoding="utf-8" for cross-platform text files'
      ],
      resources: [
        { title: 'pathlib Documentation', url: 'https://docs.python.org/3/library/pathlib.html', type: 'docs' },
        { title: 'Working with Files in Python', url: 'https://realpython.com/read-write-files-python/', type: 'article' },
      ]
    },

    {
      id: 'py-08',
      title: 'Iterators, Generators & itertools',
      subtitle: 'Lazy evaluation, yield, infinite sequences',
      duration: 55,
      difficulty: 'Intermediate',
      content: [
        'Iterators are objects that implement __iter__() and __next__(). Any object that can be looped over is iterable (lists, dicts, files, generators). The iter() function gets an iterator from an iterable, next() gets the next value. When exhausted, next() raises StopIteration.',
        'Generators are the easiest way to create iterators. Use the `yield` keyword instead of `return` - the function pauses at yield, resumes when next() is called. Generators are lazy - they produce values one at a time, saving memory for large sequences. Generator expressions (with parens) are even more concise.',
        'The itertools module provides powerful iterator combinators: chain (concatenate), cycle (repeat), islice (slice), groupby (group consecutive), product/permutations/combinations (combinatorics), accumulate (running totals), takewhile/dropwhile, and more. Mastering itertools is a Python superpower.',
        'Use generators when: working with large/infinite sequences, streaming data, building pipelines (each step transforms data lazily). They are essential for memory-efficient Python and form the basis of async/await.'
      ],
      codeExamples: [
        {
          filename: 'generators.py',
          language: 'python',
          code: '# Generator function - uses yield\ndef count_up_to(n):\n    i = 1\n    while i <= n:\n        yield i  # pauses here, resumes on next()\n        i += 1\n\nfor x in count_up_to(5):\n    print(x)  # 1, 2, 3, 4, 5\n\n# Infinite generator - lazy, never exhausts memory\ndef natural_numbers():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\n# Fibonacci - infinite but lazy\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# Get first 10 fibs with itertools.islice\nimport itertools\nfibs = list(itertools.islice(fibonacci(), 10))\nprint(fibs)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\n# yield from - delegate to sub-iterator\ndef flatten(nested):\n    for item in nested:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item\n\nprint(list(flatten([1, [2, [3, 4], 5], 6])))\n# [1, 2, 3, 4, 5, 6]',
          explanation: 'Generators use yield to pause execution. They are lazy and memory-efficient. yield from delegates to sub-generators.'
        },
        {
          filename: 'itertools_demo.py',
          language: 'python',
          code: 'import itertools\n\n# chain - concatenate iterables\nprint(list(itertools.chain([1,2], [3,4])))  # [1,2,3,4]\n\n# cycle - repeat forever\nfor i, x in enumerate(itertools.cycle("AB")):\n    if i >= 5: break\n    print(x)  # A, B, A, B, A\n\n# Combinatorics\nprint(list(itertools.product("AB", "12")))  # Cartesian product\nprint(list(itertools.permutations("ABC", 2)))  # ordered, no repeat\nprint(list(itertools.combinations("ABC", 2)))  # unordered\n\n# accumulate - running total\nprint(list(itertools.accumulate([1,2,3,4,5])))  # [1,3,6,10,15]\n\n# groupby - group consecutive elements (sort first!)\ndata = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]\nfor key, group in itertools.groupby(data, lambda x: x[0]):\n    print(key, list(group))\n# A [(\'A\',1), (\'A\',2)]\n# B [(\'B\',3), (\'B\',4)]\n\n# takewhile / dropwhile\nnums = [1, 2, 3, 4, 1, 2]\nprint(list(itertools.takewhile(lambda x: x < 4, nums)))  # [1,2,3]\nprint(list(itertools.dropwhile(lambda x: x < 4, nums)))  # [4,1,2]',
          explanation: 'itertools is a superpower for working with iterators. chain, product, permutations, combinations, groupby, accumulate are the most commonly used.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a generator that yields prime numbers infinitely. Use it to get the first 20 primes.',
          starterCode: 'def primes():\n    # your code\n    pass\n',
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
        {
          question: 'When does a generator raise StopIteration?',
          options: ['Never', 'When it runs out of values', 'On first call', 'When yield is reached'],
          correctIndex: 1,
          explanation: 'When the generator function returns (or runs out of yields), next() raises StopIteration.'
        },
      ],
      keyTakeaways: [
        'Iterators implement __iter__ and __next__',
        'Generators use yield - they are lazy and memory-efficient',
        'yield from delegates to a sub-generator',
        'itertools has powerful combinatorics: product, permutations, combinations',
        'Generators are perfect for pipelines and infinite sequences',
        'send() enables bidirectional generator communication'
      ],
      resources: [
        { title: 'itertools Documentation', url: 'https://docs.python.org/3/library/itertools.html', type: 'docs' },
        { title: 'Real Python - Generators', url: 'https://realpython.com/introduction-to-python-generators/', type: 'article' },
      ]
    },

    {
      id: 'py-09',
      title: 'Async/Await & Concurrent Programming',
      subtitle: 'asyncio, async/await, asyncio.gather, Tasks',
      duration: 70,
      difficulty: 'Advanced',
      content: [
        'Async programming lets you handle many I/O operations concurrently without threads. Python uses async/await syntax (Python 3.5+). An async function (coroutine) is defined with `async def` and must be awaited. The asyncio library provides the event loop that schedules coroutines.',
        'Use async when your code is I/O-bound: network requests, file I/O, database calls. For CPU-bound work, use multiprocessing. The key insight: while one coroutine waits for I/O, the event loop runs others. This gives concurrency without thread-safety headaches.',
        'Common asyncio patterns: asyncio.gather(*coros) runs coroutines concurrently and returns all results. asyncio.create_task() schedules a coroutine without awaiting immediately. asyncio.wait_for() adds a timeout. asyncio.Queue for producer-consumer patterns. Semaphores limit concurrency.',
        'Async libraries: aiohttp (HTTP client/server), httpx (modern HTTP), asyncpg (PostgreSQL), motor (MongoDB), websockets, aioredis. Most modern Python web frameworks (FastAPI, Sanic, Litestar) support async natively.'
      ],
      codeExamples: [
        {
          filename: 'async_basics.py',
          language: 'python',
          code: 'import asyncio\nimport time\n\n# Define a coroutine with `async def`\nasync def greet(name):\n    print(f"Hello {name}")\n    await asyncio.sleep(1)  # non-blocking sleep\n    print(f"Bye {name}")\n    return f"done-{name}"\n\n# Run a coroutine\nasync def main():\n    result = await greet("Alice")\n    print(result)\n\n# asyncio.run() is the entry point\nasyncio.run(main())\n\n# Sequential vs concurrent\nasync def fetch(url):\n    await asyncio.sleep(1)\n    return f"data from {url}"\n\nasync def concurrent():\n    start = time.time()\n    # gather runs all concurrently\n    results = await asyncio.gather(\n        fetch("api/a"),\n        fetch("api/b"),\n        fetch("api/c"),\n    )\n    print(f"Concurrent: {time.time()-start:.2f}s")  # ~1s\n    print(results)\n\nasyncio.run(concurrent())',
          explanation: 'async def creates a coroutine. await pauses execution until the awaited coroutine completes. asyncio.gather runs multiple coroutines concurrently - total time = max individual time, not sum.'
        },
        {
          filename: 'async_patterns.py',
          language: 'python',
          code: 'import asyncio\n\n# Semaphore - limit concurrency\nasync def limited_fetch(url, sem):\n    async with sem:  # acquire / release\n        print(f"Fetching {url}")\n        await asyncio.sleep(1)\n        return f"data-{url}"\n\nasync def many_concurrent():\n    sem = asyncio.Semaphore(3)  # max 3 at a time\n    urls = [f"url{i}" for i in range(10)]\n    tasks = [limited_fetch(u, sem) for u in urls]\n    return await asyncio.gather(*tasks)\n\n# Timeout with wait_for\nasync def slow():\n    await asyncio.sleep(10)\n    return "finally"\n\nasync def with_timeout():\n    try:\n        result = await asyncio.wait_for(slow(), timeout=2)\n    except asyncio.TimeoutError:\n        print("Timed out!")\n\n# Producer-consumer with Queue\nasync def producer(queue):\n    for i in range(5):\n        await asyncio.sleep(0.1)\n        await queue.put(f"item-{i}")\n    await queue.put(None)  # sentinel\n\nasync def consumer(queue):\n    while True:\n        item = await queue.get()\n        if item is None:\n            break\n        print(f"Processed {item}")\n        queue.task_done()\n\nasync def pipeline():\n    queue = asyncio.Queue()\n    await asyncio.gather(producer(queue), consumer(queue))\n\nasyncio.run(pipeline())',
          explanation: 'create_task schedules coroutines. Use Semaphores to limit concurrency. asyncio.Queue for async producer-consumer.'
        },
      ],
      exercises: [
        {
          prompt: 'Write an async function that fetches 5 URLs concurrently and returns the total size of all responses.',
          starterCode: 'import asyncio\nimport aiohttp\n\nasync def total_size(urls):\n    # your code\n    pass\n',
          hint: 'Use aiohttp.ClientSession, asyncio.gather, and sum lengths of response texts.',
          solution: 'import asyncio\nimport aiohttp\n\nasync def fetch_size(session, url):\n    async with session.get(url) as resp:\n        text = await resp.text()\n        return len(text)\n\nasync def total_size(urls):\n    async with aiohttp.ClientSession() as session:\n        tasks = [fetch_size(session, url) for url in urls]\n        sizes = await asyncio.gather(*tasks)\n        return sum(sizes)\n\nurls = ["https://httpbin.org/json"] * 5\nprint(asyncio.run(total_size(urls)))',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'When should you use async/await?',
          options: ['For CPU-bound work', 'For I/O-bound work', 'Always', 'Never'],
          correctIndex: 1,
          explanation: 'Async is for I/O-bound tasks (network, disk). For CPU-bound, use multiprocessing.'
        },
        {
          question: 'What does asyncio.gather do?',
          options: ['Runs coroutines sequentially', 'Runs coroutines concurrently and collects results', 'Cancels all coroutines', 'Waits for all to fail'],
          correctIndex: 1,
          explanation: 'gather runs coroutines concurrently and returns a list of their results in order.'
        },
      ],
      keyTakeaways: [
        'Use async/await for I/O-bound work, multiprocessing for CPU-bound',
        'asyncio.gather runs coroutines concurrently - total time = max, not sum',
        'asyncio.create_task schedules a coroutine to run',
        'Semaphore limits concurrency, Queue for producer-consumer',
        'Use aiohttp/httpx for async HTTP requests',
        'run_in_executor bridges sync code into async context'
      ],
      resources: [
        { title: 'asyncio Documentation', url: 'https://docs.python.org/3/library/asyncio.html', type: 'docs' },
        { title: 'Real Python - Async IO', url: 'https://realpython.com/async-io-python/', type: 'article' },
        { title: 'aiohttp Documentation', url: 'https://docs.aiohttp.org/', type: 'docs' },
      ]
    },

    {
      id: 'py-10',
      title: 'Modules, Packages & Virtual Environments',
      subtitle: 'Organize code, pip, venv, pyproject.toml',
      duration: 50,
      difficulty: 'Intermediate',
      content: [
        'A module is any .py file. A package is a directory containing modules with an __init__.py file. Use `import module` or `from module import name`. Use `as` to alias: `import numpy as np`. Avoid `from module import *` - it pollutes the namespace.',
        'Virtual environments isolate project dependencies. Use `python -m venv .venv` to create one, then activate it. On modern Python (3.13+) use `uv` for blazing fast dependency management. Always pin versions in requirements.txt for reproducibility.',
        'Modern Python uses pyproject.toml as the single source of truth for project metadata, dependencies, and build configuration. Tools like poetry, hatch, pdm, and uv work with pyproject.toml. The old setup.py approach is legacy.',
        'When creating your own package, structure it as: mypackage/ (with __init__.py), pyproject.toml at root, src/ layout preferred. Use `pip install -e .` for development (editable install). Distribute to PyPI with `python -m build` then `twine upload`.'
      ],
      codeExamples: [
        {
          filename: 'modules_demo.py',
          language: 'python',
          code: '# math_utils.py - a module\ndef add(a, b):\n    return a + b\n\ndef multiply(a, b):\n    return a * b\n\nPI = 3.14159\n\n# main.py - importing\nimport math_utils  # imports the whole module\nprint(math_utils.add(2, 3))  # 5\n\nfrom math_utils import add, multiply  # specific names\nprint(add(5, 5))  # 10\n\nimport math_utils as mu  # alias\nprint(mu.multiply(3, 4))\n\n# __name__ == "__main__" idiom\ndef main():\n    print("Running as script")\n\nif __name__ == "__main__":\n    # Only runs when file is executed directly\n    # NOT when imported\n    main()',
          explanation: 'Use __name__ == "__main__" guard so code only runs when file is executed directly, not when imported.'
        },
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
          starterCode: '# stringtools/__init__.py\n# your code\n',
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
        {
          question: 'What is the modern Python project config file?',
          options: ['setup.py', 'requirements.txt', 'pyproject.toml', 'Pipfile'],
          correctIndex: 2,
          explanation: 'pyproject.toml is the modern standard (PEP 517/518) replacing setup.py.'
        },
      ],
      keyTakeaways: [
        'A module is any .py file, a package is a directory with __init__.py',
        'Always use `if __name__ == "__main__":` guard for script code',
        'Virtual environments isolate dependencies - one per project',
        'pyproject.toml is the modern standard for project config',
        'Use `pip install -e .` for editable development installs',
        'src/ layout prevents accidental imports during testing'
      ],
      resources: [
        { title: 'Python Modules Tutorial', url: 'https://docs.python.org/3/tutorial/modules.html', type: 'docs' },
        { title: 'pyproject.toml Guide', url: 'https://packaging.python.org/en/latest/guides/writing-pyproject-toml/', type: 'docs' },
        { title: 'uv - fast package manager', url: 'https://github.com/astral-sh/uv', type: 'tool', isHiddenGem: true },
      ]
    },
  ]
};
