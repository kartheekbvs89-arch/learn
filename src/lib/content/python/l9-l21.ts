import { Lesson } from '../../types';

export const pythonL9: Lesson = {
  slug: 'oop', title: 'OOP — Classes, Inheritance, Magic Methods, Dataclasses',
  subtitle: 'Master object-oriented Python — classes, MRO, dunder methods, dataclasses',
  duration: 90, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'python',
  objectives: ['Define classes with __init__, type hints, class/instance attributes','Use inheritance, super(), ABC (abstract base classes)','Implement magic methods (__str__, __repr__, __eq__, __lt__, __len__)','Use @property for managed attributes','Use @dataclass for data containers'],
  realWorldContext: 'OOP is how production Python is organized. Django models, SQLAlchemy models, PyTorch models — all use classes. Understanding magic methods makes your objects behave like built-ins. @dataclass is used everywhere for configuration and data transfer objects.',
  prerequisites: ['Completed Python L1-L8'],
  conceptDiagram: `OOP CONCEPTS:
  Class:     blueprint (Dog)
  Instance:  object (rex = Dog("Rex"))
  Attributes: instance (self.name) vs class (Dog.species)
  Methods:   instance (self.bark()), classmethod, staticmethod

  MAGIC METHODS (dunder):
  __init__  → constructor
  __str__   → print(obj) (user-friendly)
  __repr__  → repr(obj) (developer-friendly)
  __eq__    → obj1 == obj2
  __lt__    → obj1 < obj2 (for sorting)
  __len__   → len(obj)
  __iter__  → for x in obj
  __enter__/__exit__ → with obj

  @property: managed attribute (validation, computed)
  @dataclass: auto-generates __init__, __repr__, __eq__`,
  conceptExplanation: ['Magic methods integrate your class with Python syntax. __str__ for print(), __repr__ for debugging, __eq__ for ==, __lt__ for sorting, __len__ for len(), __iter__ for for-loops. Implementing these makes your objects behave like built-ins.','@property turns a method into a managed attribute. Use for validation (check before set), computed properties (full_name from first+last), and read-only attributes (no setter = read-only).','@dataclass auto-generates __init__, __repr__, __eq__ for data containers. Use field(default_factory=list) for mutable defaults. frozen=True for immutability. slots=True for memory efficiency.'],
  whyItMatters: 'Without OOP, you cannot use Django, SQLAlchemy, PyTorch, or any major Python framework. Magic methods make your code Pythonic. @dataclass eliminates boilerplate — used in every modern Python codebase.',
  codeExamples: [
    { filename: 'oop.py', language: 'python', approach: 'minimal', code: `class Dog:
    species = "Canis familiaris"  # class attribute (shared)

    def __init__(self, name: str, age: int):
        self.name = name  # instance attribute
        self.age = age

    def bark(self) -> str:
        return f"{self.name} says Woof!"

    def __str__(self) -> str:
        return f"Dog({self.name!r}, {self.age})"

rex = Dog("Rex", 5)
print(rex)          # Dog('Rex', 5) — uses __str__
print(rex.bark())   # Rex says Woof!`, explanation: 'Class with __init__, instance method, __str__ for print. Class attribute shared by all instances.' },
    { filename: 'magic.py', language: 'python', approach: 'real-world', code: `from dataclasses import dataclass, field
from typing import List

# @dataclass — auto-generates __init__, __repr__, __eq__
@dataclass
class User:
    name: str
    age: int
    email: str = ""
    tags: List[str] = field(default_factory=list)  # mutable default!

user1 = User("Alice", 30)
user2 = User("Alice", 30)
print(user1)            # User(name='Alice', age=30, email='', tags=[])
print(user1 == user2)   # True (auto-generated __eq__)

# Frozen (immutable)
@dataclass(frozen=True)
class Point:
    x: float
    y: float
p = Point(1.0, 2.0)
# p.x = 5  # FrozenInstanceError!

# @property — managed attribute
class Temperature:
    def __init__(self, celsius: float):
        self.celsius = celsius  # calls setter!
    @property
    def celsius(self) -> float:
        return self._celsius
    @celsius.setter
    def celsius(self, value: float):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value
    @property
    def fahrenheit(self) -> float:
        return self._celsius * 9/5 + 32  # computed, read-only

temp = Temperature(25)
print(temp.fahrenheit)  # 77.0 (computed property)

# Magic methods for container-like behavior
class Stack:
    def __init__(self): self._items = []
    def push(self, item): self._items.append(item)
    def __len__(self): return len(self._items)      # len(stack)
    def __iter__(self): return iter(self._items)    # for x in stack
    def __contains__(self, item): return item in self._items  # x in stack
    def __getitem__(self, i): return self._items[i]  # stack[0]`, explanation: '@dataclass for data containers. @property for validation/computed. Magic methods (__len__, __iter__, __contains__, __getitem__) for built-in behavior.' },
    { filename: 'inheritance.py', language: 'python', approach: 'production', code: `from abc import ABC, abstractmethod

# Abstract base class — cannot be instantiated
class Animal(ABC):
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    @abstractmethod
    def sound(self) -> str: ...

    def describe(self) -> str:  # concrete method — inherited
        return f"{self.name} is {self.age} years old"

class Dog(Animal):
    def __init__(self, name: str, age: int, breed: str):
        super().__init__(name, age)  # call parent
        self.breed = breed
    def sound(self) -> str:
        return "Woof"

class Cat(Animal):
    def sound(self) -> str:
        return "Meow"

# animal = Animal("x", 1)  # TypeError — cannot instantiate ABC
dog = Dog("Rex", 5, "Lab")
cat = Cat("Whiskers", 3)
for animal in [dog, cat]:
    print(f"{animal.name}: {animal.sound()}")  # polymorphism

# Composition over inheritance
class Engine:
    def start(self): return "Engine running"
class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A (composition)
    def drive(self): return self.engine.start() + " and wheels turning"`, explanation: 'ABC for interfaces (must implement abstract methods). super() to call parent. Composition (HAS-A) is preferred over deep inheritance (IS-A).' },
  ],
  configFiles: [],
  lab: { title: 'Build a Bank Account Class', steps: [
    { step: 1, title: 'Create class', instruction: 'BankAccount with deposit/withdraw', command: 'cat > bank.py << \'EOF\'\nfrom dataclasses import dataclass\n\n@dataclass\nclass BankAccount:\n    owner: str\n    _balance: float = 0\n\n    @property\n    def balance(self): return self._balance\n\n    def deposit(self, amount: float):\n        if amount <= 0: raise ValueError("Positive only")\n        self._balance += amount\n\n    def withdraw(self, amount: float):\n        if amount > self._balance: raise ValueError("Insufficient")\n        self._balance -= amount\n\nacct = BankAccount("Alice", 100)\nacct.deposit(50)\nprint(acct.balance)  # 150\nEOF\npython bank.py', expectedOutput: '150' },
  ]},
  commonErrors: [
    { error: 'TypeError: Cannot instantiate abstract class', fix: 'You must implement all @abstractmethod methods in subclasses. ABCs cannot be instantiated directly.', rootCause: 'ABC enforces that subclasses implement abstract methods.' },
    { error: 'Mutable default in dataclass', fix: 'Use field(default_factory=list) not default=[]. Default [] is shared across all instances.', rootCause: 'Python evaluates default values once at class definition. All instances share the same list object.' },
  ],
  quiz: [
    { question: 'What does @dataclass(frozen=True) do?', options: ['Freezes the class', 'Makes instances immutable — cannot modify attributes', 'Required', 'Caches'], correctIndex: 1, explanation: 'frozen=True makes instances immutable. Cannot set attributes after __init__. Also makes the class hashable (can be dict key).' },
    { question: '@property without @x.setter makes what?', options: ['Error', 'Read-only attribute', 'Private attribute', 'Cached'], correctIndex: 1, explanation: 'No setter = read-only. You can get but not set the property. Useful for computed values and immutable attributes.' },
  ],
  resources: [{ title: 'Python Classes', url: 'https://docs.python.org/3/tutorial/classes.html', type: 'docs' }, { title: 'Dataclasses', url: 'https://docs.python.org/3/library/dataclasses.html', type: 'docs' }],
  whatToReadNext: 'Read about Decorators (next lesson) — function decorators, parametrized decorators, built-in decorators.',
};

export const pythonL10: Lesson = {
  slug: 'decorators', title: 'Decorators — Function, Class, Parametrized, Built-in',
  subtitle: 'Master decorators — the Python engineer power tool',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'python',
  objectives: ['Write function decorators with @functools.wraps','Create parametrized decorators (retry, timing)','Use class-based decorators','Use built-in: @lru_cache, @property, @dataclass','Stack multiple decorators'],
  realWorldContext: 'Decorators are used everywhere in production: FastAPI routes (@app.get), Django views, pytest fixtures, click commands. At every company, decorators handle cross-cutting concerns: logging, timing, auth, caching, retries.',
  prerequisites: ['Completed Python L9 (OOP, closures)'],
  conceptDiagram: `DECORATOR = function that takes a function and returns a new function

  @timing
  def slow_function(): ...
  
  Is equivalent to:
  slow_function = timing(slow_function)

  EXECUTION ORDER:
  @timing        ← applied LAST (outermost)
  @retry(3)      ← applied SECOND
  @log_calls     ← applied FIRST (innermost)
  def func(): ...
  
  Call: timing → retry → log_calls → func → log_calls → retry → timing

  ALWAYS use @functools.wraps to preserve metadata!`,
  conceptExplanation: ['A decorator is a function that takes a function and returns a new function. @decorator above def func() is shorthand for func = decorator(func). The wrapper function replaces the original.','ALWAYS use @functools.wraps(func) in your wrapper. Without it, the wrapped function loses __name__, __doc__, __module__. This breaks debugging and introspection.','Parametrized decorators are 3 levels deep: factory(params) → decorator(func) → wrapper(*args). Example: @retry(max_attempts=3) creates a decorator with those params, which then wraps the function.'],
  whyItMatters: 'Without decorators, you repeat logging/timing/auth code in every function. With decorators, you write it once and apply with @. This is DRY at the function level. Every Python framework uses decorators heavily.',
  codeExamples: [
    { filename: 'decorators.py', language: 'python', approach: 'minimal', code: `import functools, time

def timing(func):
    @functools.wraps(func)  # CRITICAL: preserve metadata
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.perf_counter()-start:.4f}s")
        return result
    return wrapper

@timing
def slow():
    time.sleep(1)
    return "done"

slow()  # slow: 1.0010s
print(slow.__name__)  # "slow" (preserved by @wraps)`, explanation: 'Basic decorator: timing wraps function, prints elapsed time. @functools.wraps preserves __name__ and __doc__.' },
    { filename: 'parametrized.py', language: 'python', approach: 'real-world', code: `import functools, time

# Parametrized decorator (3 levels: factory → decorator → wrapper)
def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1: raise
                    print(f"Attempt {attempt+1} failed: {e}")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2)
def fetch_data():
    import random
    if random.random() < 0.5:
        raise ConnectionError("Network error")
    return "data"

# Built-in: @lru_cache (memoization)
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n < 2: return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # instant! (cached)

# Class-based decorator (maintains state)
class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0
    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call {self.count}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hi(): print("Hi!")

say_hi()  # Call 1 / Hi!
say_hi()  # Call 2 / Hi!`, explanation: 'Parametrized: @retry(max_attempts=3). @lru_cache for memoization. Class-based: __call__ with state (call counter).' },
  ],
  configFiles: [],
  lab: { title: 'Write a Cache Decorator', steps: [
    { step: 1, title: 'Create decorator', instruction: 'Write @cache that memoizes results', command: 'cat > cache.py << \'EOF\'\nimport functools\n\ndef cache(func):\n    stored = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in stored:\n            stored[args] = func(*args)\n        return stored[args]\n    return wrapper\n\n@cache\ndef fib(n): return n if n < 2 else fib(n-1) + fib(n-2)\nprint(fib(50))  # instant!\nEOF\npython cache.py', expectedOutput: '12586269025' },
  ]},
  commonErrors: [
    { error: 'func.__name__ returns "wrapper"', fix: 'Add @functools.wraps(func) to your wrapper. This copies __name__, __doc__, __module__ from the original.', rootCause: 'Without @wraps, the wrapper replaces the original function identity. Debugging becomes hell.' },
  ],
  quiz: [
    { question: 'Why use @functools.wraps?', options: ['Speed', 'Preserve function metadata (__name__, __doc__)', 'Cache results', 'Required'], correctIndex: 1, explanation: 'Without @wraps, the wrapped function loses its identity. __name__ becomes "wrapper", __doc__ is lost. Always use @wraps.' },
    { question: 'How many levels deep is a parametrized decorator?', options: ['1', '2', '3 (factory → decorator → wrapper)', '4'], correctIndex: 2, explanation: '@retry(max_attempts=3): retry() returns decorator, decorator(func) returns wrapper, wrapper(*args) runs the function.' },
  ],
  resources: [{ title: 'functools', url: 'https://docs.python.org/3/library/functools.html', type: 'docs' }, { title: 'Real Python — Decorators', url: 'https://realpython.com/primer-on-python-decorators/', type: 'article' }],
  whatToReadNext: 'Read about Iterators & Generators (next lesson) — yield, itertools, lazy evaluation.',
};

export const pythonL11: Lesson = {
  slug: 'iterators-generators', title: 'Iterators & Generators — yield, itertools',
  subtitle: 'Master lazy evaluation — generators, yield, itertools for memory efficiency',
  duration: 65, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'python',
  objectives: ['Create generators with yield','Use yield from for delegation','Master itertools (chain, groupby, islice, product, permutations)','Build generator pipelines for streaming','Understand lazy evaluation and memory efficiency'],
  realWorldContext: 'Generators are how Python handles large data. Processing a 10GB log file? Generator. Infinite sequences? Generator. Pandas, scikit-learn, and asyncio all use generators internally. At scale, generators are the difference between KB and GB of memory usage.',
  prerequisites: ['Completed Python L10 (decorators)'],
  conceptDiagram: `GENERATOR = function with yield (lazy evaluation)

  def count_up_to(n):
      i = 1
      while i <= n:
          yield i    ← PAUSES here, resumes on next()
          i += 1

  gen = count_up_to(5)
  next(gen)  # 1 (paused at yield)
  next(gen)  # 2 (resumed, yielded again)
  
  for x in count_up_to(5): print(x)  # 1,2,3,4,5

  MEMORY:
  [x**2 for x in range(1M)]  → 8MB list in memory
  (x**2 for x in range(1M))  → ~120 bytes generator (lazy!)

  PIPELINE (each stage lazy):
  parse(filter(read_lines(file)))  → constant memory!`,
  conceptExplanation: ['yield pauses the function. When next() is called, it resumes right after the yield. This is lazy — values are produced one at a time, not all at once. Generators use constant memory regardless of sequence size.','Generator expressions (with parens) are lazy comprehensions. sum(x**2 for x in range(1000000)) uses KB of memory. [x**2 for x in range(1000000)] uses 8MB.','itertools provides powerful iterator combinators: chain (concatenate), groupby (group consecutive), islice (lazy slice), product/permutations/combinations (combinatorics), accumulate (running totals). Master itertools for cleaner, faster code.'],
  whyItMatters: 'Without generators, processing large files crashes your server (OOM). Without itertools, you write verbose loops that could be one-liners. Generators are the foundation of async/await in Python.',
  codeExamples: [
    { filename: 'generators.py', language: 'python', approach: 'minimal', code: `# Generator function — uses yield
def fibonacci():
    a, b = 0, 1
    while True:  # infinite! but lazy — no memory issue
        yield a
        a, b = b, a + b

import itertools
fibs = list(itertools.islice(fibonacci(), 10))
print(fibs)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# yield from — delegate to sub-generator
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)  # recursive!
        else:
            yield item

print(list(flatten([1, [2, [3, 4], 5], 6])))
# [1, 2, 3, 4, 5, 6]

# Generator expression (lazy — memory efficient)
gen = (x**2 for x in range(1000000))  # ~120 bytes!
print(next(gen))  # 0
print(next(gen))  # 1
print(sum(x**2 for x in range(101)))  # 338350`, explanation: 'yield pauses function. Infinite sequences work (lazy). yield from delegates. Generator expressions (parens) are lazy — KB not MB.' },
    { filename: 'itertools.py', language: 'python', approach: 'real-world', code: `import itertools

# chain — concatenate iterables
print(list(itertools.chain([1,2], [3,4])))  # [1,2,3,4]

# islice — lazy slice (works on infinite!)
for x in itertools.islice(itertools.count(10), 5):
    print(x)  # 10, 11, 12, 13, 14

# groupby — group consecutive (sort first!)
data = [("A",1), ("A",2), ("B",3), ("B",4)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))
# A [("A",1), ("A",2)]
# B [("B",3), ("B",4)]

# Combinatorics
print(list(itertools.product("AB", "12")))  # Cartesian product
print(list(itertools.permutations("ABC", 2)))  # ordered pairs
print(list(itertools.combinations("ABC", 2)))  # unordered pairs

# accumulate — running totals
print(list(itertools.accumulate([1,2,3,4,5])))  # [1,3,6,10,15]

# Pipeline — process 10GB file with constant memory
def read_lines(path):
    with open(path) as f:
        yield from f  # one line at a time

def filter_errors(lines):
    for line in lines:
        if "ERROR" in line: yield line

def parse(lines):
    for line in lines:
        yield line.strip().split()

# Each stage is lazy — constant memory!
pipeline = parse(filter_errors(read_lines("huge.log")))
for entry in pipeline:
    print(entry)  # one at a time, KB memory`, explanation: 'itertools: chain, islice (lazy slice), groupby (sort first!), product/permutations/combinations, accumulate. Generator pipeline: constant memory for 10GB files.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Generator Pipeline', steps: [
    { step: 1, title: 'Create generator', instruction: 'Write a prime number generator', command: 'python -c "import itertools;\\ndef primes():\\n    yield 2\\n    found=[2]\\n    n=3\\n    while True:\\n        if all(n%p for p in found if p*p<=n): found.append(n); yield n\\n        n+=2\\nprint(list(itertools.islice(primes(), 20)))"', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]' },
  ]},
  commonErrors: [
    { error: 'StopIteration', fix: 'Generator is exhausted. Use for loop (handles StopIteration) or next(gen, default) for safe access.', rootCause: 'Generators raise StopIteration when exhausted. for loops handle this automatically.' },
  ],
  quiz: [
    { question: 'What does yield do?', options: ['Returns and ends', 'Returns but PAUSES — resumes on next()', 'Returns list', 'Same as return'], correctIndex: 1, explanation: 'yield produces a value but pauses the function. It resumes from the same point on the next call. This is lazy evaluation.' },
    { question: 'Why use generator expressions over list comprehensions?', options: ['Faster', 'Memory efficient — lazy, produces values one at a time', 'Required', 'More features'], correctIndex: 1, explanation: 'Generator (parens) is lazy — KB memory for 1M items. List (brackets) creates full list in memory — 8MB for 1M items.' },
  ],
  resources: [{ title: 'itertools', url: 'https://docs.python.org/3/library/itertools.html', type: 'docs' }],
  whatToReadNext: 'Read about Modules & Packages (next lesson) — __init__.py, imports, namespace packages.',
};

// L12-L21 — condensed for context but with full structure
export const pythonL12: Lesson = {
  slug: 'modules-packages', title: 'Modules & Packages — __init__.py, Imports',
  subtitle: 'Organize code into modules and packages',
  duration: 50, difficulty: 'Intermediate', phase: 'Intermediate', xp: 100, moduleSlug: 'python',
  objectives: ['Create packages with __init__.py','Use relative and absolute imports','Understand namespace packages (3.3+)','Use importlib for dynamic imports','Structure a Python package properly'],
  realWorldContext: 'Every production Python project is organized into packages. Django apps, FastAPI routers, Python stdlib — all use the package system. Understanding imports is essential for working with any real codebase.',
  prerequisites: ['Completed Python L1-L11'],
  conceptDiagram: `PACKAGE STRUCTURE:
  mypackage/
  ├── __init__.py     ← marks directory as package
  ├── core.py
  ├── utils.py
  └── subpackage/
      ├── __init__.py
      └── helper.py

  IMPORTS:
  import mypackage              → mypackage.core.function()
  from mypackage import core    → core.function()
  from mypackage.core import function  → function()
  from .core import function    → relative (within package)
  from ..utils import helper    → parent package`,
  conceptExplanation: ['A module is any .py file. A package is a directory with __init__.py. __init__.py can be empty or contain initialization code and exports.','Use absolute imports (from mypackage.core import func) for clarity. Use relative imports (from .core import func) within packages to make them relocatable.','The if __name__ == "__main__": guard lets a file be both importable and runnable. Code inside runs only when executed directly, not when imported.'],
  whyItMatters: 'Poor package structure makes code hard to test and reuse. Circular imports crash your app. Understanding __init__.py and relative imports is essential for any project with more than 10 files.',
  codeExamples: [
    { filename: 'package.py', language: 'python', approach: 'real-world', code: `# mypackage/__init__.py — public API
from .core import main_function, MyClass
from .utils import helper

__all__ = ["main_function", "MyClass", "helper"]
__version__ = "1.0.0"

# Users can do: from mypackage import main_function
# Instead of: from mypackage.core import main_function

# mypackage/core.py
def main_function(): return "Hello"

# Usage in main.py
if __name__ == "__main__":
    # Only runs when: python main.py
    # Does NOT run when: import main
    print("Running as script")`, explanation: '__init__.py defines public API with __all__. __name__ guard allows both import and direct execution.' },
  ],
  configFiles: [],
  lab: { title: 'Create a Package', steps: [
    { step: 1, title: 'Create package', instruction: 'Create mypackage with __init__.py', command: 'mkdir -p mypackage && touch mypackage/__init__.py && echo "def hello(): return \'Hi\'" > mypackage/core.py && echo "from .core import hello" >> mypackage/__init__.py && python -c "from mypackage import hello; print(hello())"', expectedOutput: 'Hi' },
  ]},
  commonErrors: [{ error: 'ImportError: attempted relative import with no known parent package', fix: 'Use absolute imports or run as module: python -m mypackage.main (not python mypackage/main.py)', rootCause: 'Relative imports require the file to be part of a package. Running directly does not set up package context.' }],
  quiz: [{ question: 'What does if __name__ == "__main__" do?', options: ['Imports module', 'Runs code only when file is executed directly, not imported', 'Defines main', 'Nothing'], correctIndex: 1, explanation: 'Guard that runs code only when file is run directly (python main.py), not when imported. Essential for reusable modules.' }],
  resources: [{ title: 'Python Modules', url: 'https://docs.python.org/3/tutorial/modules.html', type: 'docs' }],
  whatToReadNext: 'Read about Standard Library (next lesson) — collections, functools, contextlib deep dive.',
};

export const pythonL13: Lesson = {
  slug: 'stdlib', title: 'Standard Library — collections, functools, contextlib',
  subtitle: 'Deep dive into Python standard library power tools',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'python',
  objectives: ['Master collections: defaultdict, Counter, OrderedDict, deque, namedtuple','Master functools: lru_cache, partial, reduce, singledispatch','Master contextlib: contextmanager, suppress, redirect_stdout','Use pathlib, datetime, enum, abc effectively'],
  realWorldContext: 'The Python standard library is a treasure trove. Senior engineers know it inside out — they do not reinvent wheels. Counter for frequency analysis, lru_cache for memoization, deque for queues, namedtuple for self-documenting tuples. This knowledge separates juniors from seniors.',
  prerequisites: ['Completed Python L1-L12'],
  conceptDiagram: `STDLIB POWER TOOLS:
  collections:  defaultdict, Counter, deque, namedtuple, OrderedDict
  functools:    lru_cache, partial, reduce, singledispatch, wraps
  contextlib:   contextmanager, suppress, redirect_stdout, ExitStack
  pathlib:      Path (modern file paths)
  datetime:     datetime, timedelta, timezone
  enum:         Enum, IntEnum, auto
  abc:          ABC, abstractmethod`,
  conceptExplanation: ['collections has the most-used utilities: defaultdict (no KeyError), Counter (counting), deque (fast queue — O(1) at both ends), namedtuple (self-documenting tuples).','functools: @lru_cache (memoization — turns O(2^n) fibonacci into O(n)), partial (fix some args), @singledispatch (function overloading by type).','contextlib: @contextmanager (generator-based context managers), suppress (ignore exceptions), redirect_stdout (capture print output).'],
  whyItMatters: 'Knowing the stdlib means you write less code, fewer bugs, and faster programs. Why write a cache when @lru_cache exists? Why write a counter when Counter exists? Senior engineers reach for stdlib first.',
  codeExamples: [
    { filename: 'stdlib.py', language: 'python', approach: 'real-world', code: `from collections import defaultdict, Counter, deque, namedtuple
from functools import lru_cache, partial, singledispatch
from contextlib import suppress
import time

# Counter — frequency analysis
words = "the cat sat on the mat the cat".split()
c = Counter(words)
print(c.most_common(2))  # [("the", 3), ("cat", 2)]

# defaultdict — grouping
groups = defaultdict(list)
for dept, name in [("Eng","Alice"), ("Eng","Bob"), ("Sales","Carol")]:
    groups[dept].append(name)

# deque — fast queue (O(1) at both ends)
from collections import deque
q = deque([1, 2, 3])
q.appendleft(0)  # O(1) — would be O(n) on list!
q.popleft()      # O(1)

# @lru_cache — memoization (1000x faster for fibonacci)
@lru_cache(maxsize=128)
def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)
print(fib(100))  # instant (cached)

# partial — fix some arguments
from functools import partial
double = partial(lambda x, y: x * y, 2)
print(double(5))  # 10

# @singledispatch — function overloading by type
@singledispatch
def process(data): raise TypeError(f"Cannot process {type(data)}")
@process.register
def _(data: int): return f"Integer: {data}"
@process.register
def _(data: str): return f"String: {data!r}"
print(process(42))     # Integer: 42
print(process("hi"))   # String: 'hi'

# suppress — ignore specific exceptions
with suppress(FileNotFoundError):
    open("/nonexistent")  # silently ignored

# namedtuple — self-documenting tuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)  # 3 4 (access by name!)`, explanation: 'Counter for counting, defaultdict for grouping, deque for queues, @lru_cache for memoization, partial for currying, @singledispatch for overloading, suppress for ignoring exceptions, namedtuple for readable tuples.' },
  ],
  configFiles: [],
  lab: { title: 'Use stdlib Power Tools', steps: [
    { step: 1, title: 'Count words', instruction: 'Use Counter', command: 'python -c "from collections import Counter; print(Counter(open(\'app.log\').read().split()).most_common(5))"' },
    { step: 2, title: 'Cache fibonacci', instruction: 'Use @lru_cache', command: 'python -c "from functools import lru_cache;\\n@lru_cache\\ndef fib(n): return n if n<2 else fib(n-1)+fib(n-2)\\nprint(fib(100))"', expectedOutput: '354224848179261915075' },
  ]},
  commonErrors: [{ error: 'KeyError on dict access', fix: 'Use defaultdict or .get(key, default) instead of dict[key]. defaultdict(int) auto-creates with 0.', rootCause: 'Regular dict raises KeyError on missing keys. defaultdict auto-creates.' }],
  quiz: [{ question: 'What does @lru_cache do?', options: ['Logs function', 'Memoizes results — caches return values by arguments', 'Limits rate', 'Locks function'], correctIndex: 1, explanation: '@lru_cache caches function results. If called with same args, returns cached result instead of recomputing. Turns O(2^n) fibonacci into O(n).' }],
  resources: [{ title: 'collections', url: 'https://docs.python.org/3/library/collections.html', type: 'docs' }, { title: 'functools', url: 'https://docs.python.org/3/library/functools.html', type: 'docs' }],
  whatToReadNext: 'Read about Async/Await (next lesson) — asyncio for high-concurrency I/O.',
};

export const pythonL14: Lesson = {
  slug: 'async-await', title: 'Async/Await — asyncio, aiohttp, Threading vs Multiprocessing',
  subtitle: 'Master async for I/O-bound, multiprocessing for CPU-bound',
  duration: 85, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'python',
  objectives: ['Use async/await with asyncio','Run concurrent tasks with asyncio.gather','Choose between async, threading, multiprocessing','Use Semaphore to limit concurrency','Use async HTTP (httpx) and async DB (asyncpg)'],
  realWorldContext: 'Async is how Python handles 10,000 concurrent connections. FastAPI, aiohttp, and asyncpg all use it. Without async, each request blocks a thread — with async, one thread handles thousands of I/O operations. This is how companies scale Python to millions of users.',
  prerequisites: ['Completed Python L1-L13'],
  conceptDiagram: `SYNC vs ASYNC:
  SYNC (sequential):     ASYNC (concurrent):
  fetch(url1) → 1s       fetch(url1) → 1s ─┐
  fetch(url2) → 1s       fetch(url2) → 1s ─┤ Total: 1s!
  fetch(url3) → 1s       fetch(url3) → 1s ─┘
  Total: 3s              (all run simultaneously)

  WHEN TO USE WHAT:
  I/O-bound (network, DB, disk) → async/await
  CPU-bound (math, image processing) → multiprocessing
  Mixing sync in async → run_in_executor

  asyncio.gather(*tasks) → run all concurrently
  asyncio.Semaphore(n) → limit to n concurrent`,
  conceptExplanation: ['async def creates a coroutine. await pauses execution until the awaited coroutine completes. While waiting, the event loop runs other coroutines. This gives concurrency without threads.','asyncio.gather(*coros) runs all coroutines concurrently. Total time = max(individual times), not sum. For 3 requests of 1s each: sequential = 3s, concurrent = 1s.','Use async for I/O-bound (network, disk, DB). For CPU-bound (math, ML), use multiprocessing — the GIL prevents true parallelism with threads. Bridge sync code into async with run_in_executor.'],
  whyItMatters: 'Without async, your API can handle 1 request at a time per worker. With async, one worker handles thousands. This is the difference between needing 100 servers and 5. Every modern Python web framework (FastAPI, aiohttp, Litestar) is async-native.',
  codeExamples: [
    { filename: 'async.py', language: 'python', approach: 'minimal', code: `import asyncio, time

async def fetch(url: str) -> str:
    await asyncio.sleep(1)  # simulate network (non-blocking!)
    return f"data from {url}"

async def main():
    start = time.perf_counter()
    # CONCURRENT: all at once — total ~1s
    results = await asyncio.gather(
        fetch("api/a"),
        fetch("api/b"),
        fetch("api/c"),
    )
    print(f"Concurrent: {time.perf_counter()-start:.2f}s")  # ~1s
    print(results)

asyncio.run(main())`, explanation: 'async def + await. asyncio.gather runs coroutines concurrently — total = max, not sum. 3 requests of 1s = 1s total.' },
    { filename: 'async_patterns.py', language: 'python', approach: 'real-world', code: `import asyncio, httpx

# Semaphore — limit concurrency (don't overwhelm server)
async def fetch_limited(client, url, sem):
    async with sem:  # only 3 at a time
        r = await client.get(url)
        return r.json()

async def fetch_all(urls, max_concurrent=3):
    sem = asyncio.Semaphore(max_concurrent)
    async with httpx.AsyncClient() as client:
        tasks = [fetch_limited(client, url, sem) for url in urls]
        return await asyncio.gather(*tasks)

# Timeout
async def with_timeout():
    try:
        result = await asyncio.wait_for(slow_operation(), timeout=2)
    except asyncio.TimeoutError:
        print("Timed out!")

# Producer-consumer with Queue
async def producer(queue):
    for i in range(5):
        await asyncio.sleep(0.1)
        await queue.put(f"item-{i}")
    await queue.put(None)  # sentinel

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None: break
        print(f"Processed: {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    await asyncio.gather(producer(queue), consumer(queue))`, explanation: 'Semaphore limits concurrency (3 at a time). wait_for adds timeout. Queue for producer-consumer pattern.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Concurrent Web Scraper', steps: [
    { step: 1, title: 'Install httpx', instruction: 'Install async HTTP client', command: 'uv pip install httpx' },
    { step: 2, title: 'Create scraper', instruction: 'Fetch 5 URLs concurrently', command: 'cat > scrape.py << \'EOF\'\nimport asyncio, httpx, time\n\nasync def fetch(client, url):\n    r = await client.get(url)\n    return len(r.text)\n\nasync def main():\n    urls = ["https://httpbin.org/delay/1"] * 5\n    start = time.perf_counter()\n    async with httpx.AsyncClient() as client:\n        sizes = await asyncio.gather(*[fetch(client, u) for u in urls])\n    print(f"Fetched {len(sizes)} URLs in {time.perf_counter()-start:.2f}s")\n\nasyncio.run(main())\nEOF\npython scrape.py', expectedOutput: 'Fetched 5 URLs in ~1.0s (not 5s!)' },
  ]},
  commonErrors: [{ error: 'RuntimeWarning: coroutine was never awaited', fix: 'You forgot await. Call with: await my_coroutine(). Or run: asyncio.run(my_coroutine())', rootCause: 'Calling async function without await returns a coroutine object, does not execute it.' }],
  quiz: [
    { question: 'When should you use async/await?', options: ['CPU-bound', 'I/O-bound (network, disk, DB)', 'Always', 'Never'], correctIndex: 1, explanation: 'Async for I/O-bound: while waiting for network, event loop runs other tasks. For CPU-bound, use multiprocessing (GIL prevents parallelism with threads).' },
    { question: 'What does asyncio.gather do?', options: ['Sequential', 'Runs coroutines concurrently, collects results in order', 'Cancels all', 'Waits for failure'], correctIndex: 1, explanation: 'gather runs all coroutines concurrently. Returns list of results in the SAME ORDER as input. Total time = max individual.' },
  ],
  resources: [{ title: 'asyncio', url: 'https://docs.python.org/3/library/asyncio.html', type: 'docs' }, { title: 'httpx', url: 'https://www.python-httpx.org/', type: 'docs' }],
  whatToReadNext: 'Read about Metaclasses & Descriptors (next lesson) — advanced Python internals.',
};

// L15-L21 — condensed lessons
export const pythonL15: Lesson = {
  slug: 'metaclasses', title: 'Metaclasses & Descriptors', subtitle: 'Advanced Python internals',
  duration: 70, difficulty: 'Expert', phase: 'Advanced', xp: 200, moduleSlug: 'python',
  objectives: ['Understand metaclasses (type, __init_subclass__)','Create descriptors (__get__, __set__, __delete__)','Use @property as a descriptor','Understand __class__ and class creation'],
  realWorldContext: 'Metaclasses are used by Django (models), SQLAlchemy (ORM), and PyTorch (nn.Module). You may never write one, but understanding them helps you debug frameworks. Descriptors power @property, @classmethod, @staticmethod.',
  prerequisites: ['Completed Python L1-L14'],
  conceptDiagram: `METACLASS = class that creates classes
  type is the default metaclass
  class MyClass(Base, metaclass=MyMeta): ...
  
  DESCRIPTOR = object with __get__, __set__, __delete__
  @property is a descriptor
  class Validated:
      def __set__(self, obj, value): validate(value); obj._x = value`,
  conceptExplanation: ['Metaclasses customize class creation. __init_subclass__ is the modern, simpler alternative — runs when a subclass is created. Use sparingly — most code does not need metaclasses.','Descriptors control attribute access. @property is a built-in descriptor. You can write custom descriptors for validation, logging, or computed attributes.'],
  whyItMatters: 'Understanding metaclasses helps you read framework source code (Django, SQLAlchemy). Descriptors are how @property works internally. This is advanced Python — most engineers do not write these, but senior engineers understand them.',
  codeExamples: [
    { filename: 'meta.py', language: 'python', approach: 'real-world', code: `# __init_subclass__ — modern alternative to metaclasses
class Plugin:
    registry = []
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry.append(cls)  # auto-register subclasses

class MyPlugin(Plugin): pass  # auto-added to registry!
print(Plugin.registry)  # [<class MyPlugin>]

# Descriptor — validated attribute
class Validated:
    def __set_name__(self, owner, name):
        self.name = "_" + name
    def __get__(self, obj, objtype=None):
        return getattr(obj, self.name) if obj else self
    def __set__(self, obj, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Must be positive int")
        setattr(obj, self.name, value)

class Product:
    quantity = Validated()  # descriptor!
    def __init__(self, q): self.quantity = q

p = Product(5)
# p.quantity = -1  # ValueError!`, explanation: '__init_subclass__ auto-registers subclasses. Descriptor validates attribute on set. @property is a built-in descriptor.' },
  ],
  configFiles: [],
  lab: { title: 'Create a Descriptor', steps: [{ step: 1, title: 'Write descriptor', instruction: 'Create a validated attribute', command: 'Create Validated descriptor that checks type and range' }] },
  commonErrors: [{ error: 'Confused about when to use metaclasses', fix: 'Rarely. Use __init_subclass__ instead. Use ABC for interfaces. Use decorators for most cases.', rootCause: 'Metaclasses are powerful but complex. Most problems have simpler solutions.' }],
  quiz: [{ question: 'What is a descriptor?', options: ['A class decorator', 'Object with __get__/__set__ that controls attribute access', 'A metaclass', 'A type hint'], correctIndex: 1, explanation: 'Descriptors control attribute access. @property is a descriptor. Custom descriptors can validate, log, or compute attributes.' }],
  resources: [{ title: 'Python Metaclasses', url: 'https://docs.python.org/3/reference/datamodel.html#metaclasses', type: 'docs' }],
  whatToReadNext: 'Read about Memory & Performance (next lesson) — profiling, slots, gc.',
};

export const pythonL16: Lesson = {
  slug: 'performance', title: 'Memory & Performance — cProfile, slots, gc',
  subtitle: 'Profile and optimize Python code',
  duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 150, moduleSlug: 'python',
  objectives: ['Profile with cProfile and timeit','Use __slots__ for memory efficiency','Understand garbage collection and weakref','Optimize hot paths','Use memory_profiler'],
  realWorldContext: 'In production, performance matters. A 10x optimization can save $100K/year in server costs. Companies profile hot paths and optimize them. Understanding cProfile, __slots__, and memory profiling is essential for senior engineers.',
  prerequisites: ['Completed Python L1-L15'],
  conceptDiagram: `PROFILING:
  cProfile → find slow functions
  timeit → micro-benchmark
  memory_profiler → memory usage per line

  OPTIMIZATION:
  1. Profile (find bottleneck)
  2. Optimize hot path
  3. Measure (verify improvement)
  4. Repeat

  __slots__: saves ~40% memory per instance
  set vs list: 30,000x faster membership test`,
  conceptExplanation: ['Always PROFILE before optimizing. cProfile shows which functions take the most time. Optimize the hot path (top function), not random code. Premature optimization is the root of all evil.','__slots__ tells Python to use a fixed-size array for attributes instead of __dict__. Saves ~40% memory per instance. Use for classes with millions of instances.','Use sets for O(1) membership testing (vs O(n) for lists). Use @lru_cache for memoization. Use generators for large data. These are the top 3 Python optimizations.'],
  whyItMatters: 'Without profiling, you optimize the wrong code. Without __slots__, your ML model with 1M instances uses 40% more memory. Performance optimization is what senior engineers do — it directly impacts server costs and user experience.',
  codeExamples: [
    { filename: 'perf.py', language: 'python', approach: 'real-world', code: `import cProfile, timeit
from functools import lru_cache

# Profile: find the bottleneck
def slow_function():
    total = 0
    for i in range(1000000): total += i
    return total

cProfile.run('slow_function()', sort='cumulative')

# Benchmark: compare approaches
t_list = timeit.timeit('999999 in list(range(1000000))', number=100)
t_set = timeit.timeit('999999 in set(range(1000000))', number=100)
print(f"List: {t_list:.3f}s, Set: {t_set:.6f}s")
# List: ~2.5s, Set: ~0.0001s — 25,000x faster!

# __slots__ — memory optimization
class PointDict:
    def __init__(self, x, y): self.x, self.y = x, y

class PointSlots:
    __slots__ = ['x', 'y']  # no __dict__, saves ~40% memory
    def __init__(self, x, y): self.x, self.y = x, y

import sys
p1 = PointDict(1, 2)
p2 = PointSlots(1, 2)
print(sys.getsizeof(p1.__dict__))  # ~104 bytes
# PointSlots has no __dict__ — saves memory

# @lru_cache — memoization
@lru_cache(maxsize=128)
def expensive(n): return sum(range(n))

# Compare
t1 = timeit.timeit(lambda: expensive(10000), number=10000)  # cached
t2 = timeit.timeit(lambda: sum(range(10000)), number=10000)  # uncached
print(f"Cached: {t1:.4f}s, Uncached: {t2:.4f}s")`, explanation: 'cProfile finds slow functions. timeit benchmarks. __slots__ saves memory. @lru_cache memoizes. Set vs list: 25,000x faster membership.' },
  ],
  configFiles: [],
  lab: { title: 'Profile and Optimize', steps: [
    { step: 1, title: 'Profile code', instruction: 'Find bottleneck', command: 'python -m cProfile -s cumulative -c "sum(range(1000000))"' },
    { step: 2, title: 'Benchmark list vs set', instruction: 'Compare membership', command: 'python -c "import timeit; print(f\'List: {timeit.timeit(\"999 in list(range(1000))\", number=10000):.4f}s\'); print(f\'Set: {timeit.timeit(\"999 in set(range(1000))\", number=10000):.6f}s\')"' },
  ]},
  commonErrors: [{ error: 'Premature optimization', fix: 'Always profile first. Do not optimize code that is not a bottleneck. "Premature optimization is the root of all evil." — Knuth', rootCause: 'Optimizing without profiling leads to wasted effort and harder-to-read code.' }],
  quiz: [{ question: 'What does __slots__ do?', options: ['Faster methods', 'Saves memory by using fixed array instead of __dict__', 'Required', 'Adds slots to class'], correctIndex: 1, explanation: '__slots__ replaces __dict__ with a fixed-size array. Saves ~40% memory per instance. Use for classes with many instances.' }],
  resources: [{ title: 'cProfile', url: 'https://docs.python.org/3/library/profile.html', type: 'docs' }, { title: 'py-spy', url: 'https://github.com/benfred/py-spy', type: 'tool', isHiddenGem: true }],
  whatToReadNext: 'Read about Type System (next lesson) — TypeVar, Generic, Protocol, mypy.',
};

export const pythonL17: Lesson = {
  slug: 'type-system', title: 'Type System — TypeVar, Generic, Protocol, mypy',
  subtitle: 'Deep dive into Python type system and static analysis',
  duration: 60, difficulty: 'Advanced', phase: 'Advanced', xp: 150, moduleSlug: 'python',
  objectives: ['Use TypeVar for generic functions','Create Generic classes','Use Protocol for structural typing','Configure mypy in pyproject.toml','Use Literal, TypedDict, overload'],
  realWorldContext: 'At Google, all Python code must have type hints and pass mypy. Type hints catch bugs before runtime — "function expects int, got str" is found at write-time, not by a user. mypy in CI is standard at every major tech company.',
  prerequisites: ['Completed Python L1-L16'],
  conceptDiagram: `TYPE SYSTEM:
  Basic:    int, str, list[int], dict[str, int]
  Optional: X | None (3.10+)
  Generic:  TypeVar, Generic[T]
  Protocol: structural typing (duck typing with types)
  Literal:  specific values ("train", "eval")
  TypedDict: dict with specific keys
  overload: multiple signatures

  mypy --strict catches:
  - Missing type hints
  - Wrong types passed
  - Optional not handled (None check missing)`,
  conceptExplanation: ['TypeVar enables generic functions: def first(items: list[T]) -> T works for any type T. Generic classes: class Stack(Generic[T]). Protocol: structural typing — if it has the methods, it matches.','mypy checks type hints at write-time. Run mypy --strict in CI. It catches: wrong types, missing None checks, incompatible returns. This is like having a test that runs automatically.'],
  whyItMatters: 'Type hints + mypy catch 30% of bugs before runtime. At Google, this is mandatory. Without types, refactoring large codebases is terrifying — you do not know what breaks. With types, the compiler tells you.',
  codeExamples: [
    { filename: 'types.py', language: 'python', approach: 'real-world', code: `from typing import TypeVar, Generic, Protocol, Literal, TypedDict, overload

# TypeVar — generic functions
T = TypeVar("T")
def first(items: list[T]) -> T:
    return items[0]
# T is inferred: first([1,2,3]) → int, first(["a"]) → str

# Generic class
class Stack(Generic[T]):
    def __init__(self): self._items: list[T] = []
    def push(self, item: T): self._items.append(item)
    def pop(self) -> T: return self._items.pop()

stack: Stack[int] = Stack()
stack.push(1)
# stack.push("x")  # mypy error!

# Protocol — structural typing
class Drawable(Protocol):
    def draw(self) -> None: ...
def render(obj: Drawable): obj.draw()  # any object with draw() works

# Literal — specific values
def set_mode(mode: Literal["train", "eval"]) -> None: ...

# TypedDict — dict with specific keys
class UserDict(TypedDict):
    name: str
    age: int
user: UserDict = {"name": "Alice", "age": 30}  # mypy checks keys!

# Run: mypy src/ --strict`, explanation: 'TypeVar for generics, Generic[T] for classes, Protocol for structural typing, Literal for specific values, TypedDict for typed dicts. mypy --strict enforces all of this.' },
  ],
  configFiles: [{ filename: 'pyproject.toml', language: 'toml', content: '[tool.mypy]\nstrict = true\nwarn_return_any = true\ndisallow_untyped_defs = true', comment: 'Configure mypy strict mode in pyproject.toml' }],
  lab: { title: 'Add Type Hints', steps: [{ step: 1, title: 'Install mypy', instruction: 'Install type checker', command: 'uv pip install mypy' }, { step: 2, title: 'Add types', instruction: 'Add type hints to functions', command: 'Add type hints to all function parameters and returns' }, { step: 3, title: 'Run mypy', instruction: 'Check types', command: 'mypy src/ --strict', verification: 'No type errors' }] },
  commonErrors: [{ error: 'mypy: Missing type parameters for generic type', fix: 'Specify the type: list[int] not list. Stack[int] not Stack.', rootCause: 'Generic types need type parameters in strict mode.' }],
  quiz: [{ question: 'Do type hints affect runtime?', options: ['Yes', 'No — only for static analysis (mypy, IDE)', 'Yes, they validate', 'Only with __future__'], correctIndex: 1, explanation: 'Type hints are NOT enforced at runtime. They are for mypy/pyright and IDEs. No runtime cost.' }],
  resources: [{ title: 'mypy', url: 'https://mypy.readthedocs.io/', type: 'docs' }, { title: 'PEP 484', url: 'https://peps.python.org/pep-0484/', type: 'article' }],
  whatToReadNext: 'Read about Testing with pytest (next lesson) — fixtures, parametrize, coverage.',
};

export const pythonL18: Lesson = {
  slug: 'pytest', title: 'Testing with pytest — Fixtures, Parametrize, Coverage',
  subtitle: 'Write tests like a senior engineer',
  duration: 75, difficulty: 'Intermediate', phase: 'Real-World', xp: 200, moduleSlug: 'python',
  objectives: ['Write tests with plain assert','Use fixtures (yield for setup/teardown)','Use @pytest.mark.parametrize for data-driven tests','Mock with pytest-mock','Run coverage with pytest-cov'],
  realWorldContext: 'Untested code is broken code. At every company, CI requires tests to pass. pytest is the standard — simpler than unittest, more powerful. 80%+ coverage is required for production at Google, Meta, and every major tech company.',
  prerequisites: ['Completed Python L1-L17'],
  conceptDiagram: `pytest BASICS:
  test_*.py files, test_* functions
  assert statement (no self.assertEqual)
  Fixtures: reusable setup (yield = teardown)
  @parametrize: run same test with different inputs
  Mocking: @patch replaces dependencies

  RUN:
  pytest -v                    → verbose
  pytest --cov=src             → coverage
  pytest -k "test_add"         → filter by name
  pytest -m "not slow"         → filter by marker`,
  conceptExplanation: ['pytest discovers tests automatically: files named test_*.py, functions named test_*. Uses plain assert — no self.assertEqual. Rich failure messages automatically.','Fixtures provide setup/teardown. @pytest.fixture with yield: code before yield is setup, after is teardown. Fixtures can depend on other fixtures.','@pytest.mark.parametrize runs the same test with different inputs. Instead of 5 test functions, write 1 with 5 parametrize cases. DRY testing.'],
  whyItMatters: 'Without tests, every deploy is a gamble. With tests, you refactor confidently. 80%+ coverage means if you break something, a test fails. CI pipelines block merges if tests fail.',
  codeExamples: [
    { filename: 'test_app.py', language: 'python', approach: 'real-world', code: `import pytest
from unittest.mock import patch

# Fixtures — reusable setup
@pytest.fixture
def sample_user():
    return {"id": 1, "name": "Alice", "email": "a@x.com"}

def test_user_name(sample_user):  # fixture injected by name
    assert sample_user["name"] == "Alice"

# Fixture with setup/teardown
@pytest.fixture
def db_session():
    session = create_session()  # setup
    yield session               # test runs here
    session.close()             # teardown (even on error)

# Parametrize — data-driven tests
@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (-1, 1, 0),
    (0, 0, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    assert add(a, b) == expected

# Test exceptions
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        1 / 0

# Mocking — replace dependencies
@patch("myapp.services.requests.get")
def test_fetch_user(mock_get, sample_user):
    mock_get.return_value.json.return_value = sample_user
    result = fetch_user(1)  # uses mocked requests.get
    assert result["name"] == "Alice"
    mock_get.assert_called_once_with("https://api/users/1")

# Run: pytest -v --cov=src --cov-report=html`, explanation: 'Fixtures for setup/teardown (yield). @parametrize for data-driven tests. pytest.raises for exceptions. @patch for mocking. Coverage with --cov.' },
  ],
  configFiles: [{ filename: 'pyproject.toml', language: 'toml', content: '[tool.pytest.ini_options]\ntestpaths = ["tests"]\naddopts = "-v --cov=src --cov-report=term-missing"\n\n[tool.coverage.run]\nsource = ["src"]', comment: 'pytest config with coverage' }],
  lab: { title: 'Write Tests', steps: [{ step: 1, title: 'Install pytest', instruction: 'Install', command: 'uv pip install pytest pytest-cov pytest-mock' }, { step: 2, title: 'Write tests', instruction: 'Create test file', command: 'Create tests/test_app.py with fixtures and parametrize' }, { step: 3, title: 'Run with coverage', instruction: 'Check coverage', command: 'pytest --cov=src --cov-report=html', verification: 'Open htmlcov/index.html — aim for 80%+' }] },
  commonErrors: [{ error: 'ImportError when running pytest', fix: 'Install package in editable mode: pip install -e . Check conftest.py for path setup.', rootCause: 'pytest cannot find your package. Editable install makes it importable.' }],
  quiz: [{ question: 'What does a fixture with yield do?', options: ['Returns generator', 'Setup before yield, teardown after (even on exception)', 'Same as return', 'Caches'], correctIndex: 1, explanation: 'Code before yield = setup, after = teardown. Teardown runs even if test raises. Like context manager.' }],
  resources: [{ title: 'pytest', url: 'https://docs.pytest.org/', type: 'docs' }, { title: 'Obey the Testing Goat', url: 'https://www.obeythetestinggoat.com/', type: 'book', isHiddenGem: true }],
  whatToReadNext: 'Read about Logging & Configuration (next lesson) — structlog, pydantic-settings.',
};

export const pythonL19: Lesson = {
  slug: 'logging-config', title: 'Logging & Configuration — structlog, pydantic-settings',
  subtitle: 'Production logging and config management',
  duration: 60, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'python',
  objectives: ['Use logging module (NOT print)','Set up structured JSON logging','Use pydantic-settings for env config','Configure rotating file handlers','Never hardcode secrets'],
  realWorldContext: 'In production, print() is useless — you need structured logs searchable in ELK/Datadog. Every company uses environment-based config (12-factor app). Without proper logging, you cannot debug production issues.',
  prerequisites: ['Completed Python L1-L18'],
  conceptDiagram: `LOGGING LEVELS:
  DEBUG → INFO → WARNING → ERROR → CRITICAL
  (set level to filter — INFO shows INFO+)

  STRUCTURED LOGGING (JSON):
  {"timestamp":"...","level":"INFO","message":"User logged in","user_id":42}

  CONFIG:
  .env file → pydantic-settings → Settings class
  NEVER hardcode secrets!`,
  conceptExplanation: ['NEVER use print() in production. Use logging module: logger.info(), logger.error(). Set up handlers: console (INFO+), file with rotation (DEBUG+). Structured JSON logging for ELK/Datadog.','pydantic-settings loads env vars + .env files with type validation. SECRET_KEY as SecretStr (never logged). Required fields fail fast if missing.'],
  whyItMatters: 'Without logging, production bugs are invisible. Without proper config, you hardcode secrets (security risk). Structured logging lets you search "show me all ERROR logs for user 42 in the last hour". This is non-negotiable in production.',
  codeExamples: [
    { filename: 'logging.py', language: 'python', approach: 'real-world', code: `import logging, sys, json
from logging.handlers import RotatingFileHandler
from datetime import datetime, timezone

# JSON formatter for structured logging
class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
        })

def setup_logging():
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    # Console (INFO+)
    console = logging.StreamHandler(sys.stdout)
    console.setLevel(logging.INFO)
    console.setFormatter(JsonFormatter())
    logger.addHandler(console)
    # File with rotation (10MB, keep 5)
    file_h = RotatingFileHandler("app.log", maxBytes=10_000_000, backupCount=5)
    file_h.setLevel(logging.DEBUG)
    file_h.setFormatter(JsonFormatter())
    logger.addHandler(file_h)

# pydantic-settings for config
from pydantic_settings import BaseSettings
from pydantic import SecretStr

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: SecretStr  # required, never logged
    DEBUG: bool = False
    model_config = {"env_file": ".env"}

settings = Settings()  # loads from env/.env`, explanation: 'JSON formatter for structured logging. RotatingFileHandler prevents huge files. pydantic-settings loads env vars with validation. SecretStr for secrets.' },
  ],
  configFiles: [{ filename: '.env.example', language: 'bash', content: 'DATABASE_URL=postgresql://user:pass@localhost/db\nSECRET_KEY=generate-random-key\nDEBUG=true', comment: 'Commit .env.example, NEVER commit .env' }],
  lab: { title: 'Add Logging', steps: [{ step: 1, title: 'Setup logging', instruction: 'Configure JSON logging', command: 'Create logging.py with JsonFormatter' }] },
  commonErrors: [{ error: 'SECRET_KEY not set', fix: 'Add to .env file. pydantic-settings requires it (no default). Generate: python -c "import secrets; print(secrets.token_urlsafe(48))"', rootCause: 'Required field with no default — fails fast if missing.' }],
  quiz: [{ question: 'Why use logging instead of print()?', options: ['Faster', 'Levels (INFO/WARNING/ERROR), handlers (file/console), structured format', 'Required', 'Less memory'], correctIndex: 1, explanation: 'logging gives levels (filter by severity), handlers (file, console, network), and structured format (JSON for ELK). print() has none of this.' }],
  resources: [{ title: 'logging', url: 'https://docs.python.org/3/library/logging.html', type: 'docs' }, { title: 'pydantic-settings', url: 'https://docs.pydantic.dev/latest/concepts/pydantic_settings/', type: 'docs' }],
  whatToReadNext: 'Read about CLI Apps (next lesson) — Click, Typer, Rich.',
};

export const pythonL20: Lesson = {
  slug: 'cli-apps', title: 'CLI Apps — Click, Typer, Rich',
  subtitle: 'Build beautiful command-line interfaces',
  duration: 65, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'python',
  objectives: ['Use Click for CLI with subcommands and options','Use Typer (Click + type hints)','Use Rich for colored output, tables, progress bars','Create pip-installable CLI tools','Add shell autocomplete'],
  realWorldContext: 'CLI tools are how developers interact with infrastructure. pip, git, docker, kubectl — all CLIs. Click and Typer are the standard for Python CLIs. Rich makes them beautiful. Every DevOps tool you use was built this way.',
  prerequisites: ['Completed Python L1-L19'],
  conceptDiagram: `CLI TOOLS:
  Click: decorator-based, mature, widely used
  Typer: Click + type hints (modern, cleaner)
  Rich: colors, tables, progress bars, panels

  STRUCTURE:
  @click.group()
  def cli(): ...
  
  @cli.command()
  @click.argument("name")
  @click.option("--priority", default="medium")
  def add(name, priority): ...

  pip install -e . creates myapp command`,
  conceptExplanation: ['Click uses decorators: @click.command(), @click.argument(), @click.option(). Groups enable subcommands (git add, git commit). Auto-generates --help.','Typer is Click + type hints. Instead of @click.option, use Python type hints. Cleaner, more Pythonic. Same power as Click.','Rich adds colors, tables, progress bars, panels, trees. Makes CLI output beautiful and readable. Use for tables of data, progress bars for long operations.'],
  whyItMatters: 'A good CLI is how your tool gets adopted. If it has --help, autocomplete, and beautiful output, people use it. If it is bare print() with sys.argv parsing, nobody will. Click/Typer/Rich are the standard for Python CLIs at every company.',
  codeExamples: [
    { filename: 'cli.py', language: 'python', approach: 'real-world', code: `import click
from rich.console import Console
from rich.table import Table

console = Console()

@click.group()
def cli():
    """Task manager CLI."""
    pass

@cli.command()
@click.argument("title")
@click.option("-p", "--priority", type=click.Choice(["low","medium","high"]), default="medium")
def add(title, priority):
    """Add a new task."""
    console.print(f"[green]Added:[/] {title} (priority={priority})")

@cli.command(name="list")
@click.option("--status", type=click.Choice(["all","pending","done"]), default="all")
def list_tasks(status):
    """List tasks."""
    table = Table(show_header=True, title="Tasks")
    table.add_column("ID", style="cyan")
    table.add_column("Title")
    table.add_column("Priority")
    for t in [{"id":1,"title":"Test","priority":"high"}]:
        table.add_row(str(t["id"]), t["title"], t["priority"])
    console.print(table)

if __name__ == "__main__":
    cli()

# Usage:
# python cli.py add "Buy groceries" --priority high
# python cli.py list --status pending
# python cli.py --help`, explanation: 'Click groups for subcommands. Rich tables for formatted output. @click.option for flags. --help auto-generated.' },
  ],
  configFiles: [{ filename: 'pyproject.toml', language: 'toml', content: '[project.scripts]\nmyapp = "myapp.cli:cli"', comment: 'Creates `myapp` command after pip install -e .' }],
  lab: { title: 'Build a CLI Tool', steps: [{ step: 1, title: 'Install', instruction: 'Install Click and Rich', command: 'uv pip install click rich' }, { step: 2, title: 'Create CLI', instruction: 'Build task manager CLI', command: 'Create cli.py with add and list commands' }, { step: 3, title: 'Test', instruction: 'Run CLI', command: 'python cli.py add "Test task" --priority high && python cli.py list', expectedOutput: 'Colored table with task' }] },
  commonErrors: [{ error: 'Command not found after pip install', fix: 'Add [project.scripts] to pyproject.toml: myapp = "myapp.cli:main". Run pip install -e . again.', rootCause: 'Entry point not declared in pyproject.toml.' }],
  quiz: [{ question: 'What does Typer do differently from Click?', options: ['Different features', 'Uses type hints instead of decorators for options (cleaner)', 'Faster', 'Same thing'], correctIndex: 1, explanation: 'Typer uses Python type hints: def add(title: str, priority: str = "medium"). Click uses @click.option. Typer is Click under the hood, just cleaner syntax.' }],
  resources: [{ title: 'Click', url: 'https://click.palletsprojects.com/', type: 'docs' }, { title: 'Rich', url: 'https://rich.readthedocs.io/', type: 'docs' }, { title: 'Typer', url: 'https://typer.tiangolo.com/', type: 'docs' }],
  whatToReadNext: 'Read about Packaging & Publishing (next lesson) — pyproject.toml, PyPI, CI/CD.',
};

export const pythonL21: Lesson = {
  slug: 'packaging', title: 'Packaging & Publishing — pyproject.toml, PyPI, CI/CD',
  subtitle: 'Package and publish Python code to PyPI',
  duration: 55, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'python',
  objectives: ['Configure pyproject.toml for packaging','Use src/ layout with py.typed','Build with python -m build','Publish to PyPI with twine','Set up GitHub Actions for auto-publish'],
  realWorldContext: 'Every Python package you pip install was packaged this way. Publishing to PyPI makes your code available to millions of developers. Companies like FastAPI, Pydantic, and httpx all use pyproject.toml and this exact workflow.',
  prerequisites: ['Completed Python L1-L20'],
  conceptDiagram: `PACKAGING FLOW:
  pyproject.toml → python -m build → dist/*.whl + *.tar.gz → twine upload → PyPI

  STRUCTURE:
  src/mypackage/
    __init__.py  → exports, __version__
    py.typed     → marker (has type hints)
  pyproject.toml → config

  CI/CD:
  git tag v1.0.0 → GitHub Actions → build → test → publish to PyPI`,
  conceptExplanation: ['pyproject.toml is the modern standard (PEP 517/518/621). One file replaces setup.py, requirements.txt, setup.cfg. Use hatchling as build backend.','src/ layout prevents accidental imports. py.typed marker enables type checking for package users. __init__.py defines public API with __all__.','Build with python -m build (creates .whl and .tar.gz in dist/). Upload with twine upload dist/. Use TestPyPI for testing first. GitHub Actions can auto-publish on git tags.'],
  whyItMatters: 'Without packaging, your code is not reusable. Without PyPI, nobody can pip install your package. Without CI/CD, publishing is manual and error-prone. This is the final step of the Python engineer journey — making your code available to the world.',
  codeExamples: [
    { filename: 'pyproject.toml', language: 'toml', approach: 'production', code: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "mypackage"
version = "1.0.0"
description = "My awesome package"
readme = "README.md"
requires-python = ">=3.12"
license = {text = "MIT"}
authors = [{name = "You", email = "you@example.com"}]
dependencies = ["httpx>=0.27"]

[project.optional-dependencies]
dev = ["pytest>=8.0", "ruff>=0.5", "mypy>=1.10"]

[project.scripts]
myapp = "mypackage.cli:main"

[project.urls]
Homepage = "https://github.com/you/mypackage"

[tool.hatch.build.targets.wheel]
packages = ["src/mypackage"]

# Build: python -m build
# Upload: twine upload dist/*
# Install: pip install mypackage`, explanation: 'Complete pyproject.toml: metadata, deps, scripts, URLs, build config. Build with python -m build, upload with twine.' },
  ],
  configFiles: [{ filename: '.github/workflows/publish.yml', language: 'yaml', content: 'name: Publish\non:\n  push:\n    tags: ["v*"]\njobs:\n  publish:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n      - run: pip install build twine\n      - run: python -m build\n      - run: twine upload dist/*\n        env:\n          TWINE_USERNAME: __token__\n          TWINE_PASSWORD: $\{\{ secrets.PYPI_API_TOKEN }}', comment: 'Auto-publish to PyPI on git tags' }],
  lab: { title: 'Publish a Package', steps: [
    { step: 1, title: 'Create package', instruction: 'Set up src/ layout with pyproject.toml', command: 'mkdir -p src/mypackage && touch src/mypackage/__init__.py src/mypackage/py.typed' },
    { step: 2, title: 'Install editable', instruction: 'Install in dev mode', command: 'pip install -e ".[dev]"', verification: 'myapp command works' },
    { step: 3, title: 'Build', instruction: 'Create distribution', command: 'pip install build && python -m build', expectedOutput: 'dist/*.whl and dist/*.tar.gz created' },
    { step: 4, title: 'Upload to TestPyPI', instruction: 'Test publish', command: 'twine upload --repository testpypi dist/*' },
  ]},
  commonErrors: [{ error: 'pip install -e . fails', fix: 'Make sure [build-system] and [tool.hatch.build.targets.wheel] are set. Check packages = ["src/mypackage"].', rootCause: 'Missing build config in pyproject.toml.' }],
  quiz: [{ question: 'What is the modern replacement for setup.py?', options: ['Pipfile', 'pyproject.toml', 'requirements.txt', 'environment.yml'], correctIndex: 1, explanation: 'pyproject.toml (PEP 517/518/621). One file for everything: deps, build, scripts, tool config.' }],
  resources: [{ title: 'Python Packaging', url: 'https://packaging.python.org/', type: 'docs' }, { title: 'Hatch', url: 'https://hatch.pypa.io/', type: 'docs' }],
  whatToReadNext: 'Congratulations! You completed the Python module. Start the capstone project or move to FastAPI.',
};
