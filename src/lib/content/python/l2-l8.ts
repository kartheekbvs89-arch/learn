import { Lesson } from '../../types';

export const pythonL2: Lesson = {
  slug: 'types-variables', title: 'Types, Variables, Operators — Type Hints from Day 1',
  subtitle: 'Master Python data types, variables, operators with type hints',
  duration: 45, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python',
  objectives: ['Understand all Python data types (int, float, str, bool, list, dict, set, tuple)','Use type hints from day 1 (int, str, list[int], dict[str, int])','Master all operators (arithmetic, comparison, logical, bitwise)','Understand dynamic typing vs static type hints','Use isinstance(), type(), and type conversion'],
  realWorldContext: 'Every Python variable has a type. In production code at Google and Meta, type hints are mandatory — they catch bugs before runtime with mypy. Understanding types and operators is the foundation of everything you will write in Python.',
  prerequisites: ['Completed Python L1 (pyenv setup)'],
  conceptDiagram: `PYTHON TYPES:
  Numbers:  int (42), float (3.14), complex (2+3j), bool (True/False)
  Sequences: str ("hello"), list [1,2,3], tuple (1,2,3), range(10)
  Mappings:  dict {"key": "value"}
  Sets:      set {1,2,3}, frozenset
  None:      NoneType (None)

  TYPE HINTS (Python 3.9+):
  x: int = 42
  name: str = "Alice"
  prices: list[float] = [9.99, 19.99]
  user: dict[str, int] = {"alice": 30}
  result: int | None = None  # Python 3.10+

  OPERATORS:
  Arithmetic: + - * / // % **
  Comparison: == != < > <= >=
  Logical:    and or not
  Identity:   is  is not
  Membership: in  not in
  Bitwise:    & | ^ ~ << >>`,
  conceptExplanation: ['Python is dynamically typed — you do not declare types, Python infers them. But type hints (added in 3.5+) let you document intent and enable static analysis with mypy. Companies require type hints in production code.','The / operator always returns float (7/2 = 3.5), // is floor division (7//2 = 3), % is modulo (7%2 = 1), ** is exponent (2**10 = 1024). These are the most common beginner gotchas.','and/or use short-circuit evaluation: they return the first value that determines the result (not necessarily True/False). "hello" and "world" returns "world". "" or "default" returns "default". This is useful for default values.'],
  whyItMatters: 'Type hints catch bugs at write-time, not runtime. mypy can find "function expects int, got str" before you ever run the code. At Google, all Python code must have type hints — it is enforced in CI. Without type hints, refactoring large codebases is dangerous.',
  codeExamples: [
    { filename: 'types.py', language: 'python', approach: 'minimal', code: `# Variables — no declaration needed
name = "Alice"           # str
age = 30                 # int
height = 5.7             # float
is_active = True         # bool

# Type hints (recommended from day 1)
name: str = "Alice"
age: int = 30
prices: list[float] = [9.99, 19.99]
user: dict[str, int] = {"alice": 30}
tags: set[str] = {"python", "web"}
result: int | None = None  # Optional (Python 3.10+)

# Type checking
print(type(age))          # <class 'int'>
print(isinstance(age, int))  # True
age_str = str(age)        # "30" (type conversion)`, explanation: 'Type hints document intent. isinstance() checks type at runtime. str(), int(), float() convert types.' },
    { filename: 'operators.py', language: 'python', approach: 'real-world', code: `# Arithmetic
print(7 / 2)    # 3.5  (true division — always float)
print(7 // 2)   # 3    (floor division)
print(7 % 2)    # 1    (modulo)
print(2 ** 10)  # 1024 (exponent)

# Comparison (return bool)
print(5 == 5.0)  # True (value equality)
print(5 is 5.0)  # False (identity — different types)

# Chained comparison (Python special!)
x = 5
print(0 < x < 10)  # True — cleaner than (0 < x) and (x < 10)

# Logical (short-circuit — returns values, not just bool)
default = "" or "fallback"  # "fallback" (first truthy)
name = "Alice" and "Bob"    # "Bob" (last truthy if all true)

# Walrus operator := (assign and test)
if (n := len([1,2,3])) > 2:
    print(f"List has {n} elements")  # n = 3

# Membership
print(3 in [1,2,3])           # True
print("a" in "apple")         # True
print("name" in {"name":"x"}) # True`, explanation: 'Key gotchas: / vs //, chained comparisons, short-circuit returns values, walrus operator := assigns and tests in one expression.' },
    { filename: 'types_advanced.py', language: 'python', approach: 'production', code: `from typing import Optional, Union, Literal, Any
from dataclasses import dataclass

# Modern type hints (Python 3.10+)
def process(data: list[int | str]) -> dict[str, int]:
    """Process mixed list, return counts by type."""
    counts: dict[str, int] = {"ints": 0, "strs": 0}
    for item in data:
        if isinstance(item, int):
            counts["ints"] += 1
        elif isinstance(item, str):
            counts["strs"] += 1
    return counts

# Literal type — specific values
def set_mode(mode: Literal["train", "eval", "test"]) -> None:
    print(f"Mode: {mode}")

# Optional = X | None
def find_user(id: int) -> User | None:
    return db.get(id) if id in db else None

# Run mypy: mypy src/ --strict
# Catches: "Argument 1 has type str, expected int" BEFORE runtime`, explanation: 'Production type hints: Literal for specific values, X | None for optional, mypy --strict in CI. This is what senior engineers write.' },
  ],
  configFiles: [],
  lab: { title: 'Practice Types and Operators', steps: [
    { step: 1, title: 'Open Python REPL', instruction: 'Start the Python interpreter', command: 'python', verification: 'Should see >>> prompt' },
    { step: 2, title: 'Try arithmetic', instruction: 'Test /, //, %, **', command: '7 / 2, 7 // 2, 7 % 2, 2 ** 10', expectedOutput: '3.5, 3, 1, 1024' },
    { step: 3, title: 'Try short-circuit', instruction: 'Test and/or return values', command: '"" or "default"', expectedOutput: 'default' },
    { step: 4, title: 'Try walrus', instruction: 'Use := operator', command: 'if (n := len([1,2,3])) > 2: print(n)', expectedOutput: '3' },
    { step: 5, title: 'Try type hints', instruction: 'Create a typed function', command: 'echo \'def add(a: int, b: int) -> int: return a + b\\nprint(add(2, 3))\' > test.py && python test.py', expectedOutput: '5' },
  ]},
  commonErrors: [
    { error: 'TypeError: unsupported operand type(s)', fix: 'Check types — you cannot add str + int. Convert: str(42) or int("42").', rootCause: 'Python is dynamically typed but still enforces type rules at runtime.' },
    { error: '7 / 2 returns 3.5 not 3', fix: 'Use // for floor division. / always returns float.', rootCause: '/ is true division (always float). // is floor division (truncates to int).' },
  ],
  quiz: [
    { question: 'What does 7 // 2 return?', options: ['3.5', '3', '4', '1'], correctIndex: 1, explanation: '// is floor division — truncates the decimal. 7/2 = 3.5, 7//2 = 3.' },
    { question: 'What does "" or "default" return?', options: ['True', '""', '"default"', 'False'], correctIndex: 2, explanation: 'or returns first truthy value. "" is falsy, so it returns "default".' },
    { question: 'Do type hints affect runtime?', options: ['Yes, they validate', 'No, they are only for static analysis (mypy, IDE)', 'Yes, they slow code', 'Only with __future__'], correctIndex: 1, explanation: 'Type hints are NOT enforced at runtime. They are for mypy/pyright and IDE autocompletion. No runtime cost.' },
  ],
  resources: [{ title: 'Python Types', url: 'https://docs.python.org/3/library/stdtypes.html', type: 'docs' }, { title: 'mypy', url: 'https://mypy.readthedocs.io/', type: 'docs' }],
  whatToReadNext: 'Read about Strings (next lesson) — every method, formatting, and regex. Strings are 80% of real Python code.',
};

export const pythonL3: Lesson = {
  slug: 'strings', title: 'Strings — Every Method, Regex, Formatting',
  subtitle: 'Master strings: 40+ methods, f-strings, regex (re module), parsing',
  duration: 75, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'python',
  objectives: ['Use every important string method (split, join, strip, replace, find, etc.)','Format strings with f-strings (modern), .format(), and Template','Use regex (re module) for pattern matching','Parse logs, validate emails, extract data','Understand string immutability and performance'],
  realWorldContext: 'Strings are 80% of real Python code: parsing logs, formatting output, cleaning user input, building SQL, processing JSON. At every company, string manipulation is daily work. Mastering strings and regex makes you 10x faster at data processing tasks.',
  prerequisites: ['Completed Python L1-L2'],
  conceptDiagram: `STRING METHODS BY CATEGORY:
  Searching:  .find() .rfind() .index() .count() .startswith() .endswith()
  Transform:  .upper() .lower() .strip() .replace() .removeprefix() .removesuffix()
  Split/Join: .split() .rsplit() .splitlines() .partition() .join()
  Testing:    .isdigit() .isalpha() .isalnum() .isspace() .isupper() .islower()
  Format:     f"{var}" .format() % Template

  FORMATTING (use f-strings 95% of time):
  f"Hello {name}! You are {age} years old."
  f"Pi: {3.14159:.2f}"           # 3.14
  f"Number: {1234567:,}"         # 1,234,567
  f"{name:>20}"                  # right-aligned, 20 chars
  f"{user['name']}"              # dict access
  f"{x = }"                      # debug: x = 42`,
  conceptExplanation: ['Strings are immutable — every method returns a NEW string. s.upper() does not change s, it returns a new uppercase string. This is important for performance: string concatenation in a loop is O(n²), use "".join(list) instead.','f-strings (Python 3.6+) are the modern way to format strings. They are fastest, most readable, and support expressions: f"2+2={2+2}", f"{user.name}", f"{x:.2f}" (2 decimals), f"{x:,}" (thousands separator).','Regex (re module) is essential for complex string matching. Use re.search (first match), re.findall (all matches), re.sub (replace), re.split. ALWAYS use raw strings (r"...") for regex so \\b means word boundary, not backspace. Compile patterns with re.compile for performance.'],
  whyItMatters: 'Without string mastery, you will struggle with log parsing, data cleaning, API responses, and file processing. Every backend engineer processes strings daily. Regex is essential for validating emails, phone numbers, and parsing structured text from logs.',
  codeExamples: [
    { filename: 'strings.py', language: 'python', approach: 'minimal', code: `s = "  Hello, World!  "
print(s.strip())           # "Hello, World!"
print(s.upper())           # "  HELLO, WORLD!  "
print(s.replace("World", "Python"))  # "  Hello, Python!  "
print(s.split(","))        # ["  Hello", " World!  "]
print(",".join(["a","b","c"]))  # "a,b,c"
print(s.startswith("  He")) # True
print(s.find("World"))     # 10 (index, -1 if not found)

# f-strings
name = "Alice"
age = 30
print(f"Hello, {name}! You are {age}.")
print(f"{age * 365} days old")  # expressions work!`, explanation: 'Core methods: strip, upper, replace, split, join, find. f-strings support expressions inside {}.' },
    { filename: 'formatting.py', language: 'python', approach: 'real-world', code: `# f-string format specs
pi = 3.14159265
print(f"Pi: {pi:.2f}")        # 3.14 (2 decimals)
print(f"Pi: {pi:>10.4f}")     # "    3.1416" (right-aligned, 10 wide)
print(f"Pi: {pi:<10.4f}")     # "3.1416    " (left-aligned)
print(f"Pi: {pi:^10.4f}")     # "  3.1416  " (centered)

n = 1234567
print(f"Thousands: {n:,}")    # 1,234,567
print(f"Hex: {n:x}")          # 12d687
print(f"Binary: {n:b}")       # 100101101011010000111
print(f"Percent: {0.85:.1%}") # 85.0%

# Date formatting
from datetime import datetime
now = datetime.now()
print(f"{now:%Y-%m-%d %H:%M:%S}")  # 2024-01-15 10:30:00
print(f"{now:%B %d, %Y}")          # January 15, 2024

# Debug mode (Python 3.8+)
x = 42
print(f"{x = }")  # x = 42 (shows variable name + value)

# Multi-line
user = {"name": "Alice", "age": 30}
msg = f"""
User Profile:
  Name: {user['name']}
  Age:  {user['age']}
"""
print(msg)`, explanation: 'f-string format specs: .2f (decimals), >/< /^ (alignment), :, (thousands), %x/%b (hex/binary), :% (percent). Debug mode {x = } shows name + value.' },
    { filename: 'regex.py', language: 'python', approach: 'production', code: `import re

# ALWAYS use raw strings (r"...") for regex!
# Without r: \\b = backspace, \\d = just d
# With r: \\b = word boundary, \\d = digit

# Find all email addresses
text = "Contact alice@x.com or bob@y.org"
emails = re.findall(r'[\\w.+-]+@[\\w-]+\\.[\\w.]+', text)
# ["alice@x.com", "bob@y.org"]

# Validate email
EMAIL_RE = re.compile(r'^[\\w.+-]+@[\\w-]+\\.[\\w.]+$')  # compile for performance
def is_valid_email(email: str) -> bool:
    return bool(EMAIL_RE.match(email))

# Named groups (readable!)
LOG_RE = re.compile(
    r'(?P<timestamp>\\S+)\\s+(?P<level>\\w+)\\s+(?P<message>.*)'
)
match = LOG_RE.match("2024-01-15 INFO User logged in")
if match:
    print(match.group("timestamp"))  # 2024-01-15
    print(match.group("level"))      # INFO
    print(match.groupdict())         # {"timestamp": ..., "level": ..., "message": ...}

# Replace (censor credit card numbers)
clean = re.sub(r'\\b\\d{4}\\b', '****', "Card: 1234 5678 9012")
# "Card: **** **** 9012"

# Split by pattern
parts = re.split(r'[,;\\s]+', "a, b; c d")
# ["a", "b", "c", "d"]

# VERBOSE flag for readable complex patterns
PHONE_RE = re.compile(r"""
    ^                             # start
    (?:\\+1[-.\\s]?)?             # optional country code
    \\(? (\\d{3}) \\)?            # area code
    [-.\\s]? (\\d{3})             # first 3 digits
    [-.\\s]? (\\d{4})             # last 4 digits
    $
""", re.VERBOSE)`, explanation: 'ALWAYS use raw strings for regex. Compile patterns for performance. Named groups (?P<name>...) for readability. VERBOSE flag for complex patterns. NEVER use regex for HTML/JSON parsing.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Log Parser with Strings and Regex', steps: [
    { step: 1, title: 'Create log file', instruction: 'Create a sample log file', command: 'echo "2024-01-15 10:30:45 INFO User logged in\\n2024-01-15 10:31:02 ERROR Database error\\n2024-01-15 10:31:15 WARNING Disk space low" > app.log' },
    { step: 2, title: 'Parse logs', instruction: 'Write a parser', command: 'cat > parse.py << \'EOF\'\nimport re\nLOG_RE = re.compile(r"(?P<ts>\\S+\\s+\\S+)\\s+(?P<level>\\w+)\\s+(?P<msg>.*)")\nfor line in open("app.log"):\n    m = LOG_RE.match(line.strip())\n    if m: print(f"[{m[\'level\']:8}] {m[\'msg\']}")\nEOF\npython parse.py', expectedOutput: '[INFO    ] User logged in\\n[ERROR   ] Database error\\n[WARNING ] Disk space low' },
    { step: 3, title: 'Count errors', instruction: 'Count by level', command: 'Modify parse.py to count ERROR lines', verification: 'Should output 1 error' },
  ]},
  commonErrors: [
    { error: 'regex not matching — \\\\b does not work', fix: 'Use raw strings: r"\\bword\\b". Without r prefix, \\b is backspace, not word boundary.', rootCause: 'Python string escapes vs regex escapes. r"..." disables Python escapes so regex escapes work.' },
    { error: 'f-string not formatting', fix: 'Make sure you use f prefix: f"Hello {name}". Check Python version (3.6+ required).', rootCause: 'f-strings were added in Python 3.6. Older Python does not support them.' },
  ],
  quiz: [
    { question: 'Why use raw strings (r"...") for regex?', options: ['Faster', 'So \\b, \\d, \\w are regex escapes not Python string escapes', 'Required', 'Memory efficient'], correctIndex: 1, explanation: 'Without r, \\b is backspace, \\d is just d. With r, \\b is word boundary, \\d is digit. ALWAYS use raw strings for regex.' },
    { question: 'What does f"{x:.2f}" do?', options: ['Rounds to 2 decimal places', 'Multiplies by 2', 'Converts to float', 'Formats as 2-digit'], correctIndex: 0, explanation: '.2f = 2 decimal places as float. 3.14159 → "3.14".' },
  ],
  resources: [{ title: 'Python String Methods', url: 'https://docs.python.org/3/library/stdtypes.html#string-methods', type: 'docs' }, { title: 'regex101.com', url: 'https://regex101.com/', type: 'interactive', isHiddenGem: true }],
  whatToReadNext: 'Read about Lists, Tuples, Dicts, Sets (next lesson) — when to use each, performance characteristics.',
};

export const pythonL4: Lesson = {
  slug: 'collections', title: 'Lists, Tuples, Dicts, Sets — O(1) vs O(n)',
  subtitle: 'Master collections — when to use each, performance, defaultdict, Counter',
  duration: 80, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'python',
  objectives: ['Choose between list, tuple, dict, set based on use case','Understand O(1) vs O(n) performance for each operation','Use defaultdict, Counter, OrderedDict from collections','Use comprehensions (list, dict, set, generator)','Understand mutability and hashability'],
  realWorldContext: 'Choosing the wrong data structure makes code 1000x slower. Using list for membership testing (x in list) is O(n) — for 1M items that is 1M comparisons. Using set is O(1) — same speed for 1 or 1M items. This is the #1 performance optimization in Python.',
  prerequisites: ['Completed Python L1-L3'],
  conceptDiagram: `┌────────────┬──────────┬──────────┬──────────┬──────────┐
│ Operation  │ list     │ tuple    │ dict     │ set      │
├────────────┼──────────┼──────────┼──────────┼──────────┤
│ Add        │ O(1)     │ N/A      │ O(1)     │ O(1)     │
│ Search     │ O(n) ←   │ O(n) ←   │ O(1) ✓   │ O(1) ✓   │
│ Index[i]   │ O(1)     │ O(1)     │ O(1)     │ N/A      │
│ Sort       │ O(n log) │ N/A      │ N/A      │ N/A      │
│ Mutable    │ YES      │ NO       │ YES      │ YES      │
│ Hashable   │ NO       │ YES      │ NO       │ NO       │
└────────────┴──────────┴──────────┴──────────┴──────────┘

RULES:
• Ordered + mutable?     → list
• Ordered + immutable?   → tuple
• Key → value lookup?    → dict (O(1) search!)
• Unique + fast search?  → set (O(1) membership!)
• Count items?           → Counter
• Group items?           → defaultdict(list)`,
  conceptExplanation: ['Sets and dicts use hash tables — O(1) lookup. Lists scan every element — O(n). For membership testing (if x in collection), ALWAYS use set or dict, never list. This is the #1 performance tip in Python.','defaultdict(auto-creates missing keys. Counter counts items. Both are in collections module. Use defaultdict(list) for grouping, Counter for frequency analysis.','Comprehensions are Pythonic shortcuts: [x**2 for x in range(10)] (list), {k: v for ...} (dict), {x for ...} (set). Generator expressions (with parens) are lazy — memory efficient for large data.'],
  whyItMatters: 'At scale, O(n) vs O(1) is the difference between 100ms and 100 seconds. Companies optimize hot paths by switching list to set for membership tests. This is the most common performance fix in production Python code.',
  codeExamples: [
    { filename: 'collections.py', language: 'python', approach: 'minimal', code: `# List — ordered, mutable
nums = [1, 2, 3]
nums.append(4)        # [1,2,3,4]
print(3 in nums)      # True — O(n), slow for big lists

# Dict — key-value, O(1) lookup
user = {"name": "Alice", "age": 30}
print("name" in user) # True — O(1), fast!

# Set — unique, O(1) membership
tags = {"python", "web"}
print("python" in tags) # True — O(1), fast!

# Tuple — immutable, hashable (can be dict key)
point = (3, 4)
grid = {(0,0): "A", (1,1): "B"}  # tuples as keys!`, explanation: 'List: O(n) membership. Dict/Set: O(1) membership. Tuple: immutable, hashable (can be dict key).' },
    { filename: 'collections_std.py', language: 'python', approach: 'real-world', code: `from collections import defaultdict, Counter

# defaultdict — auto-create missing keys
word_count = defaultdict(int)  # default = 0
for word in "the cat sat on the mat the cat".split():
    word_count[word] += 1  # no KeyError!
print(dict(word_count))  # {"the": 3, "cat": 2, "sat": 1, ...}

# Group items
groups = defaultdict(list)
people = [("Eng","Alice"), ("Eng","Bob"), ("Sales","Carol")]
for dept, name in people:
    groups[dept].append(name)
print(dict(groups))  # {"Eng": ["Alice","Bob"], "Sales": ["Carol"]}

# Counter — counting made easy
counter = Counter("abracadabra")
print(counter.most_common(3))  # [("a",5), ("b",2), ("r",2)]

# Comprehensions
squares = [x**2 for x in range(5)]           # [0,1,4,9,16]
evens = [x for x in range(10) if x % 2 == 0] # [0,2,4,6,8]
square_dict = {x: x**2 for x in range(5)}    # {0:0, 1:1, 2:4, ...}
unique = {len(w) for w in ["a","ab","abc"]}   # {1, 2, 3}

# Generator (lazy — memory efficient)
gen = (x**2 for x in range(1000000))  # KB memory, not MB!
print(sum(gen))  # 333332833333500000`, explanation: 'defaultdict for grouping/counting, Counter for frequency, comprehensions for transform/filter, generators for large data.' },
    { filename: 'performance.py', language: 'python', approach: 'production', code: `import time

# SLOW: list membership (O(n))
big_list = list(range(1_000_000))
start = time.perf_counter()
_ = 999999 in big_list  # scans entire list!
print(f"List: {time.perf_counter()-start:.4f}s")  # ~0.03s

# FAST: set membership (O(1))
big_set = set(range(1_000_000))
start = time.perf_counter()
_ = 999999 in big_set  # hash lookup!
print(f"Set:  {time.perf_counter()-start:.6f}s")  # ~0.000001s

# 30,000x faster!

# PATTERN: Index for fast lookup
users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
# BAD: linear scan every time
# user = next(u for u in users if u["id"] == 2)  # O(n)

# GOOD: build index once
users_by_id = {u["id"]: u for u in users}  # O(n) once
user = users_by_id[2]  # O(1) every time!`, explanation: 'Set membership is 30,000x faster than list for 1M items. Build dict index for repeated lookups: {id: item for item in items}.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Frequency Analyzer', steps: [
    { step: 1, title: 'Count words', instruction: 'Use Counter to count word frequencies', command: 'python -c "from collections import Counter; print(Counter(open(\'app.log\').read().split()).most_common(5))"', expectedOutput: 'Top 5 most common words' },
    { step: 2, title: 'Group by level', instruction: 'Use defaultdict to group log lines', command: 'Write a script that groups log lines by level (INFO/ERROR/WARNING)' },
  ]},
  commonErrors: [
    { error: 'List membership is slow for large lists', fix: 'Convert to set for O(1) membership: my_set = set(my_list). Then use `if x in my_set`.', rootCause: 'List scans every element O(n). Set uses hash table O(1).' },
    { error: 'TypeError: unhashable type: list', fix: 'Lists cannot be dict keys or set members. Convert to tuple: tuple([1,2,3]) → (1,2,3).', rootCause: 'Mutable types (list, dict, set) are not hashable. Immutable types (tuple, str, int) are.' },
  ],
  quiz: [
    { question: 'Why are sets faster than lists for membership testing?', options: ['Sets are smaller', 'Sets use hash tables — O(1) lookup vs O(n) scan', 'Sets are sorted', 'No reason'], correctIndex: 1, explanation: 'Sets use hash tables: direct lookup O(1). Lists scan every element O(n). For 1M items: set ~0.000001s, list ~0.03s.' },
    { question: 'What does defaultdict(int) do?', options: ['Stores only ints', 'Auto-creates missing keys with default value 0', 'Same as dict', 'Stores integers'], correctIndex: 1, explanation: 'defaultdict(int) auto-creates missing keys with int() = 0. Perfect for counting: counts[word] += 1 never raises KeyError.' },
  ],
  resources: [{ title: 'Python Collections', url: 'https://docs.python.org/3/library/collections.html', type: 'docs' }, { title: 'Time Complexity', url: 'https://wiki.python.org/moin/TimeComplexity', type: 'article', isHiddenGem: true }],
  whatToReadNext: 'Read about Control Flow (next lesson) — if/for/while, match-case, comprehensions.',
};

export const pythonL5: Lesson = {
  slug: 'control-flow', title: 'Control Flow — if/for/while, match-case, Comprehensions',
  subtitle: 'Master control flow: conditionals, loops, pattern matching, comprehensions',
  duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python',
  objectives: ['Use if/elif/else with chained comparisons','Master for loops with enumerate, zip, itertools','Use match-case (Python 3.10+) for pattern matching','Write list/dict/set comprehensions','Understand for-else and while-else'],
  realWorldContext: 'Control flow is how you direct program execution. Every algorithm uses conditionals and loops. The match-case statement (3.10+) is used in production at companies like LinkedIn for parsing API commands and routing requests.',
  prerequisites: ['Completed Python L1-L4'],
  conceptDiagram: `CONTROL FLOW:
  if/elif/else  → conditionals
  for           → iterate iterables (lists, dicts, files)
  while         → loop until condition false
  match-case    → pattern matching (3.10+)
  break/continue → control loop flow
  for-else      → runs if loop completes WITHOUT break

  COMPREHENSIONS:
  [x**2 for x in range(10)]              # list
  {k: v for k, v in items}               # dict
  {x for x in items}                     # set
  (x**2 for x in range(10))              # generator (lazy!)

  MATCH-CASE (3.10+):
  match command.split():
    case ["quit"]: return "bye"
    case ["hello", name]: return f"Hi {name}"
    case _: return "unknown"`,
  conceptExplanation: ['Use enumerate() instead of range(len()). enumerate gives index + value: for i, item in enumerate(items). zip() iterates in parallel: for name, age in zip(names, ages).','Comprehensions are Pythonic and faster than loops. [x**2 for x in nums if x % 2 == 0] — transform + filter in one line. Generator expressions (with parens) are lazy — use for large data.','match-case (3.10+) is structural pattern matching — far more powerful than switch-case. It can destructure data ([a, b]), match types (int()), use guards (case x if x > 0).'],
  whyItMatters: 'Clean control flow makes code readable and maintainable. Using enumerate/zip instead of range(len()) is the mark of a Pythonic developer. Comprehensions are 2x faster than equivalent loops. match-case eliminates long if-elif chains.',
  codeExamples: [
    { filename: 'control.py', language: 'python', approach: 'minimal', code: `# if/elif/else
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"

# for with enumerate (USE THIS, not range(len))
for i, name in enumerate(["Alice", "Bob"]):
    print(f"{i}: {name}")

# zip — parallel iteration
for name, age in zip(["Alice", "Bob"], [25, 30]):
    print(f"{name} is {age}")

# Comprehension
squares = [x**2 for x in range(5)]  # [0,1,4,9,16]
evens = [x for x in range(10) if x % 2 == 0]  # [0,2,4,6,8]`, explanation: 'enumerate for index+value, zip for parallel, comprehensions for transform+filter.' },
    { filename: 'match_case.py', language: 'python', approach: 'real-world', code: `def handle_command(cmd: str) -> str:
    match cmd.split():
        case ["quit"]:
            return "Goodbye"
        case ["hello", name]:
            return f"Hello, {name}!"
        case ["echo", *words]:
            return " ".join(words)
        case ["add", a, b]:
            return str(int(a) + int(b))
        case _:
            return "Unknown command"

# Type matching
def process(value):
    match value:
        case int():
            return f"Integer: {value}"
        case str():
            return f"String: {value!r}"
        case [a, b]:
            return f"Pair: {a}, {b}"
        case {"type": "user", "name": name}:
            return f"User {name}"
        case _:
            return "Unknown"`, explanation: 'match-case: destructuring ([a, b]), type matching (int()), dict matching, wildcards (_). Far more powerful than if-elif.' },
  ],
  configFiles: [],
  lab: { title: 'Build a CLI Command Parser', steps: [
    { step: 1, title: 'Create parser', instruction: 'Use match-case', command: 'cat > cli.py << \'EOF\'\ndef handle(cmd):\n    match cmd.split():\n        case ["quit"]: return "bye"\n        case ["hello", name]: return f"Hi {name}"\n        case ["add", a, b]: return str(int(a)+int(b))\n        case _: return "unknown"\nprint(handle("hello Alice"))\nprint(handle("add 5 3"))\nEOF\npython cli.py', expectedOutput: 'Hi Alice\\n8' },
  ]},
  commonErrors: [{ error: 'match-case not working', fix: 'Match-case requires Python 3.10+. Check: python --version. Use pyenv to install 3.12.', rootCause: 'match-case was added in Python 3.10.' }],
  quiz: [
    { question: 'What does enumerate() do?', options: ['Counts items', 'Gives index + value pairs', 'Sorts items', 'Reverses'], correctIndex: 1, explanation: 'enumerate(["a","b"]) → (0,"a"), (1,"b"). Use instead of range(len()).' },
    { question: 'What does for-else do?', options: ['Never runs', 'else runs if loop completes WITHOUT break', 'Same as while', 'Error'], correctIndex: 1, explanation: 'The else clause runs if the loop completes normally (no break). Useful for search: "if we did not find it, do X".' },
  ],
  resources: [{ title: 'Python Control Flow', url: 'https://docs.python.org/3/tutorial/controlflow.html', type: 'docs' }],
  whatToReadNext: 'Read about Functions (next lesson) — *args, **kwargs, closures, type hints.',
};

export const pythonL6: Lesson = {
  slug: 'functions', title: 'Functions — *args, **kwargs, Closures, Type Hints',
  subtitle: 'Master functions: parameter types, closures, decorators foundation',
  duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'python',
  objectives: ['Use all parameter types (positional, keyword, *args, **kwargs, keyword-only)','Use type hints on functions','Understand closures and nonlocal','Use lambda, map, filter, sorted with key','Use argument unpacking (* and **)'],
  realWorldContext: 'Functions are the building blocks of every Python program. At production scale, understanding *args/**kwargs is essential for writing flexible APIs (like FastAPI dependencies). Closures are the foundation of decorators — used everywhere in production code.',
  prerequisites: ['Completed Python L1-L5'],
  conceptDiagram: `PARAMETER ORDER (must be in this order):
  def f(a, b, /, c=10, *args, kw_only, **kwargs)
       │  │     │      │      │         │
       │  │     │      │      │         └─ variadic keyword (dict)
       │  │     │      │      └─ keyword-only (after *)
       │  │     │      └─ variadic positional (tuple)
       │  │     └─ default value (optional)
       │  └─ positional-only (before /)
       └─ positional or keyword

  UNPACKING:
  *list → unpack as positional args
  **dict → unpack as keyword args
  f(*[1,2,3]) == f(1, 2, 3)
  f(**{"a":1}) == f(a=1)

  CLOSURE: function that captures enclosing scope
  def make_counter():
      count = 0
      def inc():
          nonlocal count
          count += 1
          return count
      return inc`,
  conceptExplanation: ['*args collects positional args as tuple. **kwargs collects keyword args as dict. Use * to force keyword-only args (cleaner API): def f(*, timeout=30).','Closures capture variables from enclosing scope. Use nonlocal to modify them. Closures enable function factories and decorators.','Type hints on functions: def greet(name: str, times: int = 1) -> str. mypy checks these at write-time. Always add type hints in production code.'],
  whyItMatters: 'Understanding parameter order is essential — wrong order = SyntaxError. *args/**kwargs are used in every framework (FastAPI, Django, Flask). Closures are the foundation of decorators, which are used for auth, logging, caching in production.',
  codeExamples: [
    { filename: 'functions.py', language: 'python', approach: 'minimal', code: `def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

# *args — variable positional
def sum_all(*args: int) -> int:
    return sum(args)
print(sum_all(1, 2, 3))  # 6

# **kwargs — variable keyword
def create_user(**kwargs):
    return kwargs
print(create_user(name="Alice", age=30))
# {"name": "Alice", "age": 30}

# Unpacking
nums = [1, 2, 3]
print(sum_all(*nums))  # unpack list
config = {"name": "Bob", "age": 25}
create_user(**config)  # unpack dict`, explanation: 'Type hints, *args (tuple), **kwargs (dict), unpacking with * and **.' },
    { filename: 'closures.py', language: 'python', approach: 'real-world', code: `# Closure — function factory
def make_multiplier(factor: int):
    def multiply(x: int) -> int:
        return x * factor  # factor captured from enclosing scope
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))  # 10
print(triple(5))  # 15

# Counter with nonlocal
def make_counter():
    count = 0
    def increment() -> int:
        nonlocal count  # modify enclosing variable
        count += 1
        return count
    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2

# Keyword-only args (after *)
def fetch(url: str, *, timeout: int = 30, retries: int = 3):
    # timeout and retries MUST be keyword: fetch("url", timeout=10)
    pass

# Lambda (anonymous function) — for sorting, filtering
users = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]
users.sort(key=lambda u: u["age"])  # sort by age
users.sort(key=lambda u: u["name"])  # sort by name`, explanation: 'Closures capture enclosing scope. nonlocal modifies captured variables. * forces keyword args. lambda for inline functions.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Function Factory', steps: [
    { step: 1, title: 'Create closure', instruction: 'Build a logger factory', command: 'python -c "def make_logger(prefix):\\n    def log(msg): print(f\'{prefix}: {msg}\')\\n    return log\\ninfo = make_logger(\'INFO\')\\ninfo(\'Hello\')"', expectedOutput: 'INFO: Hello' },
  ]},
  commonErrors: [
    { error: 'SyntaxError on parameter order', fix: 'Order must be: positional-only (/), regular, defaults, *args, keyword-only, **kwargs.', rootCause: 'Python enforces strict parameter ordering.' },
    { error: 'UnboundLocalError in closure', fix: 'Use `nonlocal count` to modify enclosing scope variables. Without it, Python creates a new local variable.', rootCause: 'Assignment creates a local variable. nonlocal tells Python to use the enclosing variable.' },
  ],
  quiz: [
    { question: 'What does **kwargs collect?', options: ['list', 'tuple', 'dict', 'set'], correctIndex: 2, explanation: '**kwargs collects keyword arguments as a dict. *args collects positional as a tuple.' },
    { question: 'What does nonlocal do?', options: ['Declares global', 'Modifies enclosing (non-global) scope variable', 'Makes private', 'Same as global'], correctIndex: 1, explanation: 'nonlocal lets closures modify variables from their enclosing function scope.' },
  ],
  resources: [{ title: 'Python Functions', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', type: 'docs' }],
  whatToReadNext: 'Read about File I/O (next lesson) — pathlib, JSON, CSV, YAML.',
};

export const pythonL7: Lesson = {
  slug: 'file-io', title: 'File I/O — pathlib, JSON, CSV, YAML, TOML',
  subtitle: 'Read/write files like a senior engineer — pathlib, all formats, streaming',
  duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python',
  objectives: ['Use pathlib for cross-platform path operations','Read/write JSON, CSV, YAML, TOML','Stream large files line-by-line (memory efficient)','Use context managers (with statement) for file handling','Handle binary files and different encodings'],
  realWorldContext: 'Every application reads config, logs, and data files. pathlib is the modern standard — used at every company. JSON is the universal data format. Without proper file I/O, you cannot build anything real.',
  prerequisites: ['Completed Python L1-L6'],
  conceptDiagram: `FILE I/O:
  Read:   with open("file.txt") as f: data = f.read()
  Write:  with open("out.txt", "w") as f: f.write("hello")
  Append: with open("log.txt", "a") as f: f.write("entry")

  PATHLIB (modern — use / to join paths):
  Path("docs") / "notes.txt"  ← cross-platform!
  path.read_text()            ← one-line read
  path.write_text("hello")    ← one-line write
  path.exists(), .is_file(), .glob("*.py")

  FORMATS:
  JSON:  json.dump/load (APIs, config)
  CSV:   csv.DictReader/Writer (data export)
  YAML:  yaml.safe_load (config files)
  TOML:  tomllib (Python project config)`,
  conceptExplanation: ['Always use `with open(...)` — ensures file is closed even on exception. Without it, you leak file handles.','pathlib replaces os.path. Use / to join paths (works on all platforms). .read_text()/.write_text() for simple I/O. .glob()/.rglob() for finding files.','For large files, NEVER use .read() (loads entire file into memory). Iterate line-by-line: for line in f. This uses constant memory regardless of file size.'],
  whyItMatters: 'Loading a 10GB file with .read() crashes your server. Using os.path instead of pathlib makes code less portable. Not using `with` leaks file descriptors. These are fundamental skills every engineer must master.',
  codeExamples: [
    { filename: 'file_io.py', language: 'python', approach: 'minimal', code: `from pathlib import Path
import json

# pathlib (modern)
path = Path("output.txt")
path.write_text("Hello!", encoding="utf-8")
text = path.read_text(encoding="utf-8")

# Join paths with / (cross-platform!)
docs = Path.home() / "Documents" / "notes.txt"

# JSON
data = {"name": "Alice", "age": 30}
Path("data.json").write_text(json.dumps(data, indent=2))
loaded = json.loads(Path("data.json").read_text())`, explanation: 'pathlib: / joins paths, read_text/write_text one-liners. JSON: dumps/loads for strings, dump/load for files.' },
    { filename: 'streaming.py', language: 'python', approach: 'real-world', code: `from pathlib import Path
import csv, json

# BAD: loads entire file into RAM
# lines = Path("huge.log").read_text().splitlines()  # 10GB = crash!

# GOOD: stream line by line (constant memory)
for line in Path("huge.log").open():
    if "ERROR" in line:
        print(line.strip())

# CSV with DictReader
with open("users.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])

# JSONL (one JSON per line — streaming format)
for line in Path("data.jsonl").open():
    record = json.loads(line)
    print(record["name"])

# YAML (pip install pyyaml)
import yaml
config = yaml.safe_load(Path("config.yaml").read_text())  # safe_load, NOT load!

# TOML (Python 3.11+ built-in)
import tomllib
with open("pyproject.toml", "rb") as f:  # binary mode!
    config = tomllib.load(f)`, explanation: 'Stream large files line-by-line. CSV with DictReader. yaml.safe_load (NOT load — security!). tomllib for Python 3.11+.' },
  ],
  configFiles: [],
  lab: { title: 'Process a Log File', steps: [
    { step: 1, title: 'Create log file', instruction: 'Generate test data', command: 'for i in $(seq 1 100); do echo "2024-01-15 INFO Message $i"; done > app.log' },
    { step: 2, title: 'Count lines', instruction: 'Stream and count', command: 'python -c "print(sum(1 for _ in open(\'app.log\')))"', expectedOutput: '100' },
    { step: 3, title: 'Filter errors', instruction: 'Extract ERROR lines', command: 'python -c "[print(l.strip()) for l in open(\'app.log\') if \'ERROR\' in l]"' },
  ]},
  commonErrors: [
    { error: 'FileNotFoundError', fix: 'Check path exists: Path("file").exists(). Use absolute paths or check cwd.', rootCause: 'File does not exist or wrong working directory.' },
    { error: 'UnicodeDecodeError', fix: 'Specify encoding: open("file", encoding="utf-8"). Default encoding may differ by OS.', rootCause: 'File has non-UTF-8 characters. Always specify encoding="utf-8" for text files.' },
  ],
  quiz: [
    { question: 'Why use pathlib instead of os.path?', options: ['Faster', 'Object-oriented, / for joining, cross-platform', 'Required', 'Less features'], correctIndex: 1, explanation: 'pathlib is OO, uses / to join (works on all platforms), has read_text/write_text shortcuts. os.path is legacy.' },
    { question: 'Why use yaml.safe_load not yaml.load?', options: ['Faster', 'Security — yaml.load can execute arbitrary Python code', 'Better errors', 'No difference'], correctIndex: 1, explanation: 'yaml.load() can execute arbitrary code via YAML tags. ALWAYS use safe_load() for untrusted YAML.' },
  ],
  resources: [{ title: 'pathlib Documentation', url: 'https://docs.python.org/3/library/pathlib.html', type: 'docs' }],
  whatToReadNext: 'Read about Error Handling (next lesson) — try/except, custom exceptions, context managers.',
};

export const pythonL8: Lesson = {
  slug: 'error-handling', title: 'Error Handling — Exceptions, Context Managers',
  subtitle: 'Handle errors like a senior engineer — EAFP, custom exceptions, context managers',
  duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'python',
  objectives: ['Use try/except/else/finally correctly','Create custom exception hierarchies','Use context managers (with statement)','Implement @contextlib.contextmanager','Understand EAFP vs LBYL'],
  realWorldContext: 'Every production app handles errors. Without proper error handling, one failed database query crashes the entire app. Companies use custom exception hierarchies for consistent error handling across services. Context managers ensure resources are cleaned up — used everywhere in production.',
  prerequisites: ['Completed Python L1-L7'],
  conceptDiagram: `TRY/EXCEPT/ELSE/FINALLY:
  try:
      result = risky_operation()
  except SpecificError as e:
      handle_error(e)
  except (TypeError, ValueError) as e:
      handle_different(e)
  except Exception as e:  # catch-all (use sparingly)
      log_unexpected(e)
  else:
      # runs ONLY if no exception
      process(result)
  finally:
      # ALWAYS runs (cleanup)
      close_resources()

  CUSTOM EXCEPTIONS:
  class AppError(Exception): pass
  class ValidationError(AppError): pass
  class NotFoundError(AppError): pass

  CONTEXT MANAGER:
  with open("file.txt") as f:  # auto-close even on error
      data = f.read()`,
  conceptExplanation: ['Python philosophy: EAFP (Easier to Ask Forgiveness than Permission). Try the operation, catch the error. Do not check first (LBYL — Look Before You Leap). EAFP is more Pythonic and often faster.','Always catch SPECIFIC exceptions, never bare except: (which catches everything including KeyboardInterrupt and SystemExit). Use except Exception: at most.','Custom exceptions should inherit from Exception (not BaseException). Create a hierarchy: AppError → ValidationError, NotFoundError. This lets callers catch by category.'],
  whyItMatters: 'Without error handling, your app crashes on any unexpected input. Without context managers, you leak file descriptors and database connections. These are fundamental production skills.',
  codeExamples: [
    { filename: 'errors.py', language: 'python', approach: 'minimal', code: `# Basic try/except/else/finally
try:
    x = int(input("Number: "))
    result = 10 / x
except ValueError:
    print("Not a number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print(f"Result: {result}")  # runs if no exception
finally:
    print("Done")  # always runs

# Custom exceptions
class AppError(Exception): pass
class NotFoundError(AppError):
    def __init__(self, resource, id):
        self.resource = resource
        self.id = id
        super().__init__(f"{resource} {id} not found")

def get_user(id: int):
    if id not in users:
        raise NotFoundError("User", id)
    return users[id]

try:
    get_user(999)
except NotFoundError as e:
    print(e)  # "User 999 not found"`, explanation: 'try/except/else/finally. Custom exceptions with attributes for context. else runs on success, finally always runs.' },
    { filename: 'context_manager.py', language: 'python', approach: 'real-world', code: `import contextlib
import time

# Class-based context manager
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.perf_counter() - self.start
        print(f"Took {elapsed:.4f}s")
        return False  # True to suppress exceptions

with Timer():
    time.sleep(0.5)
# Output: Took 0.5003s

# Generator-based (cleaner — use @contextmanager)
@contextlib.contextmanager
def db_session(conn_str: str):
    print(f"Connecting to {conn_str}")
    conn = {"connected": True}
    try:
        yield conn  # this is the value given to `as`
    finally:
        conn["connected"] = False
        print("Connection closed")

with db_session("postgres://localhost") as db:
    print(f"Using: {db}")
# Connecting...
# Using: {'connected': True}
# Connection closed

# Suppress specific exceptions
with contextlib.suppress(FileNotFoundError):
    open("/nonexistent")  # silently ignored`, explanation: 'Class: __enter__/__exit__. Generator: @contextmanager with yield. contextlib.suppress ignores specific exceptions. yield = setup before, teardown after.' },
  ],
  configFiles: [],
  lab: { title: 'Add Error Handling', steps: [
    { step: 1, title: 'Create custom exceptions', instruction: 'Define exception hierarchy', command: 'cat > errors.py << \'EOF\'\nclass AppError(Exception): pass\nclass NotFound(AppError): pass\nclass Validation(AppAppError): pass\nEOF' },
    { step: 2, title: 'Create context manager', instruction: 'Use @contextmanager', command: 'Create a Timer context manager with @contextlib.contextmanager' },
  ]},
  commonErrors: [
    { error: 'Bare except: catches KeyboardInterrupt', fix: 'Never use bare except:. Use except Exception: or specific exceptions.', rootCause: 'Bare except catches EVERYTHING including Ctrl+C and sys.exit().' },
    { error: 'Resource not cleaned up on error', fix: 'Use context manager (with statement) or try/finally. Never leave resources open without cleanup.', rootCause: 'Without finally or context manager, exceptions skip cleanup code.' },
  ],
  quiz: [
    { question: 'When does the else clause of try/except run?', options: ['Always', 'Only if no exception occurred', 'Only if exception occurred', 'Never'], correctIndex: 1, explanation: 'else runs only if NO exception was raised. Separates success path from error handling.' },
    { question: 'What should custom exceptions inherit from?', options: ['BaseException', 'Exception', 'Error', 'object'], correctIndex: 1, explanation: 'Inherit from Exception. BaseException includes system-exiting exceptions (KeyboardInterrupt, SystemExit) that should not be caught normally.' },
  ],
  resources: [{ title: 'Python Errors', url: 'https://docs.python.org/3/tutorial/errors.html', type: 'docs' }, { title: 'contextlib', url: 'https://docs.python.org/3/library/contextlib.html', type: 'docs' }],
  whatToReadNext: 'Read about OOP (next lesson) — classes, inheritance, magic methods, dataclasses.',
};
