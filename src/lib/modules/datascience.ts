import { Module } from '../types';

export const dataScienceModule: Module = {
  id: 'data-science',
  title: 'Data Science: NumPy & Pandas',
  icon: '📊',
  color: '#150458',
  gradient: 'linear-gradient(135deg, #150458 0%, #FFCA00 100%)',
  description: 'Master data manipulation with NumPy (numerical computing) and Pandas (data analysis). The foundation of all Python data work.',
  level: 'Intermediate',
  learningPath: {
    title: 'Data Scientist Path',
    description: 'From arrays to dataframes to real-world data analysis.',
    phases: [
      {
        name: 'Foundation',
        description: 'NumPy arrays, vectorized operations',
        outcomes: [
          'Create and manipulate NumPy arrays',
          'Understand broadcasting and vectorization',
          'Use NumPy for fast numerical computations',
        ],
      },
      {
        name: 'Intermediate',
        description: 'Pandas DataFrames, indexing, filtering',
        outcomes: [
          'Load data from CSV, JSON, SQL',
          'Filter, transform, and aggregate data',
          'Handle missing data',
          'Merge and join datasets',
        ],
      },
      {
        name: 'Advanced',
        description: 'GroupBy, time series, performance',
        outcomes: [
          'Master groupby operations',
          'Work with time series data',
          'Optimize Pandas for large datasets',
        ],
      },
      {
        name: 'Real-World',
        description: 'Complete data analysis pipeline',
        outcomes: [
          'Clean messy real-world data',
          'Build an EDA pipeline',
          'Export insights and visualizations',
        ],
      },
    ],
  },
  capstoneProject: {
    title: 'Sales Data Analysis Dashboard',
    description: 'Analyze 1M+ rows of sales data: clean, transform, aggregate, and produce insights with visualizations.',
    features: [
      'Load 1M+ row CSV efficiently',
      'Clean missing/invalid data',
      'Aggregate by region, product, time',
      'Calculate KPIs (revenue, growth, churn)',
      'Time series analysis (monthly trends)',
      'Export to Excel with multiple sheets',
      'Generate matplotlib visualizations',
    ],
    techStack: ['NumPy', 'Pandas', 'Matplotlib', 'openpyxl'],
    estTime: '5-7 hours',
    difficulty: 'Intermediate',
  },
  lessons: [
    {
      id: 'ds-01',
      title: 'NumPy Fundamentals: Arrays & Vectorization',
      subtitle: 'Why NumPy is 100x faster than pure Python',
      duration: 50,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'NumPy (Numerical Python) is the foundation of scientific computing in Python. It provides the ndarray - a fast, memory-efficient n-dimensional array. Almost every data science library (Pandas, scikit-learn, PyTorch) is built on NumPy.',
        'Why is NumPy fast? 1) Homogeneous data (all same type) stored in contiguous memory, 2) Vectorized operations (no Python loops - C under the hood), 3) Broadcasting (operate on arrays of different shapes), 4) Views instead of copies (memory efficient).',
        'A NumPy array (ndarray) has: shape (dimensions), dtype (data type), ndim (number of dimensions), size (total elements). Create with np.array(), np.zeros(), np.ones(), np.arange(), np.linspace(), np.random.',
        'Vectorization is the key insight: instead of looping element-by-element in Python, you express the operation on the whole array. NumPy executes it in C - 100x faster than a Python loop.',
      ],
      visualization: {
        title: 'Python List vs NumPy Array',
        type: 'comparison',
        diagram: `PYTHON LIST:
┌────┬────┬────┬────┐
│ py │ py │ py │ py │  Each element is a PyObject
│obj │obj │obj │obj │  (type, refcount, value)
└─┬──┴─┬──┴─┬──┴─┬──┘
  │    │    │    │       Scattered in memory
  ▼    ▼    ▼    ▼       Each access: pointer chase
  
NUMPY ARRAY (int64):
┌────────────────────────┐
│ 1  │ 2  │ 3  │ 4  │ 5  │  Contiguous memory
└────────────────────────┘  All same type (8 bytes each)
                            Direct C array access
                            CPU cache friendly

OPERATION: multiply all by 2
Python: [x*2 for x in lst]  → Python loop, slow
NumPy:  arr * 2              → C-level SIMD, 100x faster`,
        legend: [
          'Lists: heterogeneous, scattered, pointer-heavy → slow',
          'Arrays: homogeneous, contiguous, typed → fast',
          'Vectorization = express operation on whole array',
          'NumPy executes in C, often with SIMD instructions',
        ],
      },
      codeExamples: [
        {
          filename: 'numpy_basics.py',
          language: 'python',
          code: '# pip install numpy\nimport numpy as np\n\n# Create arrays\na = np.array([1, 2, 3, 4, 5])\nb = np.array([[1, 2, 3], [4, 5, 6]])\n\nprint(a.shape)    # (5,)\nprint(b.shape)    # (2, 3)\nprint(b.ndim)     # 2 (2D)\nprint(b.size)     # 6\nprint(b.dtype)    # int64\n\n# Special arrays\nzeros = np.zeros((3, 4))        # 3x4 of 0.0\nones = np.ones(5)               # 5 of 1.0\nidentity = np.eye(3)            # 3x3 identity\narange = np.arange(0, 10, 2)    # [0,2,4,6,8]\nlinspace = np.linspace(0, 1, 5) # [0, 0.25, 0.5, 0.75, 1.0]\n\n# Random\nnp.random.seed(42)\nrand = np.random.rand(3)            # uniform [0,1)\nrandn = np.random.randn(3)          # normal (mean=0, std=1)\nrandint = np.random.randint(0, 10, 5)  # [0,10) integers\n\n# Vectorized operations (FAST!)\na = np.array([1, 2, 3, 4, 5])\nprint(a * 2)         # [2, 4, 6, 8, 10]\nprint(a ** 2)        # [1, 4, 9, 16, 25]\nprint(np.sqrt(a))    # [1, 1.41, 1.73, 2, 2.24]\nprint(a.sum())       # 15\nprint(a.mean())      # 3.0\nprint(a.max(), a.min())  # 5 1\n\n# Element-wise operations between arrays\nb = np.array([10, 20, 30, 40, 50])\nprint(a + b)   # [11, 22, 33, 44, 55]\nprint(a * b)   # [10, 40, 90, 160, 250]\nprint(a > 3)   # [False, False, False, True, True]',
          explanation: 'NumPy arrays are typed, contiguous, and support vectorized operations. a * 2 multiplies all elements in C - no Python loop.'
        },
        {
          filename: 'numpy_performance.py',
          language: 'python',
          code: 'import numpy as np\nimport time\n\n# Create large arrays\nn = 10_000_000\npy_list = list(range(n))\nnp_arr = np.arange(n)\n\n# Python loop - slow\nstart = time.time()\nresult_py = [x * 2 for x in py_list]\nprint(f"Python list: {time.time() - start:.3f}s")  # ~1.5s\n\n# NumPy vectorized - fast!\nstart = time.time()\nresult_np = np_arr * 2\nprint(f"NumPy array: {time.time() - start:.3f}s")  # ~0.02s\n\n# NumPy is 75x faster!\n\n# Broadcasting - operate on different shapes\nmatrix = np.array([[1, 2, 3],\n                   [4, 5, 6]])  # shape (2, 3)\nrow = np.array([10, 20, 30])    # shape (3,)\n\n# Broadcasting: row is "stretched" to (2, 3)\nprint(matrix + row)\n# [[11, 22, 33],\n#  [14, 25, 36]]\n\n# Indexing and slicing\narr = np.array([10, 20, 30, 40, 50])\nprint(arr[0])      # 10\nprint(arr[-1])     # 50\nprint(arr[1:4])    # [20, 30, 40]\nprint(arr[arr > 20])  # [30, 40, 50] - boolean mask\n\n# 2D indexing\nmat = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(mat[0, 0])    # 1 (row 0, col 0)\nprint(mat[1, :])    # [4, 5, 6] (row 1, all cols)\nprint(mat[:, 1])    # [2, 5, 8] (all rows, col 1)\nprint(mat[0:2, 1:])  # [[2,3], [5,6]] (submatrix)',
          explanation: 'NumPy is 50-100x faster than Python loops for numerical work. Broadcasting lets you operate on different-shaped arrays. Boolean masking is powerful for filtering.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a 5x5 matrix with values 1-25, then extract the center 3x3 submatrix.',
          starterCode: 'import numpy as np\n\nmat = np.arange(1, 26).reshape(5, 5)\n# extract center 3x3\n',
          hint: 'Slice rows 1:4 and cols 1:4.',
          solution: 'import numpy as np\n\nmat = np.arange(1, 26).reshape(5, 5)\nprint(mat)\n# [[ 1  2  3  4  5]\n#  [ 6  7  8  9 10]\n#  [11 12 13 14 15]\n#  [16 17 18 19 20]\n#  [21 22 23 24 25]]\n\ncenter = mat[1:4, 1:4]\nprint(center)\n# [[ 7  8  9]\n#  [12 13 14]\n#  [17 18 19]]',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why is NumPy faster than pure Python lists?',
          options: ['Better algorithms', 'Contiguous memory + C implementation', 'Multi-threading', 'Just-in-time compilation'],
          correctIndex: 1,
          explanation: 'NumPy stores data in contiguous memory as typed C arrays. Operations run in C, often with SIMD. No Python overhead per element.'
        },
        {
          question: 'What is broadcasting?',
          options: ['Sending data over network', 'Operating on arrays of different shapes by "stretching"', 'Multi-threading', 'A type of indexing'],
          correctIndex: 1,
          explanation: 'Broadcasting lets you do element-wise ops on different-shaped arrays. NumPy "stretches" the smaller one without copying data.'
        },
      ],
      keyTakeaways: [
        'NumPy ndarray = typed, contiguous, n-dimensional array',
        'Vectorization: express ops on whole arrays, not element-by-element',
        'NumPy is 50-100x faster than Python loops for numerical work',
        'Broadcasting: operate on different-shaped arrays (no copies)',
        'Boolean masking: arr[arr > 5] filters elements',
        'NumPy is the foundation of Pandas, scikit-learn, PyTorch',
      ],
      resources: [
        { title: 'NumPy Documentation', url: 'https://numpy.org/doc/', type: 'docs' },
        { title: 'NumPy Cheat Sheet', url: 'https://numpy.org/devdocs/user/quickstart.html', type: 'cheatsheet' },
      ]
    },

    {
      id: 'ds-02',
      title: 'Pandas: DataFrames & Series',
      subtitle: 'The Excel of Python - load, view, filter, transform',
      duration: 60,
      difficulty: 'Beginner',
      phase: 'Intermediate',
      content: [
        'Pandas is THE data analysis library for Python. A DataFrame is like a spreadsheet or SQL table - rows and columns with labels. A Series is a single column. Built on NumPy, so it inherits the speed.',
        'Load data: pd.read_csv(), pd.read_json(), pd.read_excel(), pd.read_sql(). Inspect: df.head(), df.tail(), df.info(), df.describe(), df.shape, df.columns, df.dtypes.',
        'Selecting: df["col"] (Series), df[["col1", "col2"]] (DataFrame), df.loc[label] (by label), df.iloc[pos] (by position), df.query("age > 30") (SQL-like).',
        'Filtering: df[df["age"] > 30], df[(df["age"] > 30) & (df["city"] == "NYC")]. Sorting: df.sort_values("age", ascending=False). Unique: df["city"].unique(), df["city"].value_counts().',
      ],
      codeExamples: [
        {
          filename: 'pandas_basics.py',
          language: 'python',
          code: '# pip install pandas\nimport pandas as pd\nimport numpy as np\n\n# Create DataFrame from dict\ndata = {\n    "name": ["Alice", "Bob", "Carol", "Dan", "Eve"],\n    "age": [25, 30, 35, 28, 32],\n    "city": ["NYC", "LA", "NYC", "SF", "LA"],\n    "salary": [70000, 80000, 90000, 75000, 85000],\n}\ndf = pd.DataFrame(data)\nprint(df)\n#     name  age city  salary\n# 0  Alice   25  NYC   70000\n# 1    Bob   30   LA   80000\n# ...\n\n# Inspect\nprint(df.head(3))        # first 3 rows\nprint(df.tail(2))        # last 2 rows\nprint(df.info())         # data types, non-null counts\nprint(df.describe())     # statistics for numeric columns\nprint(df.shape)          # (5, 4)\nprint(df.columns)        # column names\nprint(df.dtypes)         # data types\n\n# Select columns\nprint(df["name"])              # Series (one column)\nprint(df[["name", "age"]])     # DataFrame (multiple cols)\n\n# Select rows\nprint(df.loc[0])              # by label (index)\nprint(df.loc[0:2])            # rows 0,1,2 (inclusive!)\nprint(df.iloc[0])             # by position\nprint(df.iloc[0:3])           # rows 0,1,2 (exclusive)\n\n# Filter rows\nprint(df[df["age"] > 30])                          # age > 30\nprint(df[(df["age"] > 30) & (df["city"] == "NYC")])  # AND\nprint(df[df["city"].isin(["NYC", "SF"])])           # IN\nprint(df.query("age > 30 and city == \'NYC\'"))       # SQL-like\n\n# Sort\nprint(df.sort_values("age"))                    # ascending\nprint(df.sort_values("age", ascending=False))   # descending\nprint(df.sort_values(["city", "salary"], ascending=[True, False]))\n\n# Unique values\nprint(df["city"].unique())        # [\'NYC\' \'LA\' \'SF\']\nprint(df["city"].nunique())       # 3\nprint(df["city"].value_counts())  # NYC 2, LA 2, SF 1',
          explanation: 'Pandas DataFrames are like SQL tables. Use .loc[] for label-based, .iloc[] for position-based indexing. Filter with boolean masks or query().'
        },
        {
          filename: 'load_data.py',
          language: 'python',
          code: 'import pandas as pd\n\n# Load CSV\ndf = pd.read_csv("data.csv")\ndf = pd.read_csv("data.csv", sep=";", encoding="utf-8",\n                 parse_dates=["date"], index_col="id")\n\n# Load JSON\ndf = pd.read_json("data.json")\ndf = pd.read_json("data.json", lines=True)  # one JSON per line\n\n# Load Excel (need openpyxl)\ndf = pd.read_excel("data.xlsx", sheet_name="Sheet1")\n\n# Load from SQL\nfrom sqlalchemy import create_engine\nengine = create_engine("postgresql://user:pass@host/db")\ndf = pd.read_sql("SELECT * FROM users", engine)\n\n# Load from URL\ndf = pd.read_csv("https://example.com/data.csv")\n\n# Save data\ndf.to_csv("output.csv", index=False)\ndf.to_json("output.json", orient="records")\ndf.to_excel("output.xlsx", sheet_name="Data")\ndf.to_sql("users", engine, if_exists="replace", index=False)\n\n# Large files - read in chunks\nfor chunk in pd.read_csv("huge.csv", chunksize=10000):\n    process(chunk)  # process 10K rows at a time\n\n# Only load specific columns (saves memory)\ndf = pd.read_csv("data.csv", usecols=["name", "age", "salary"])\n\n# Specify dtypes (saves memory)\ndf = pd.read_csv("data.csv", dtype={"id": "int32", "name": "string"})',
          explanation: 'Pandas loads from CSV, JSON, Excel, SQL, URLs. For large files, use chunksize or specify usecols/dtype to save memory.'
        },
      ],
      lab: {
        title: 'Analyze a Real Dataset with Pandas',
        objective: 'Load the Titanic dataset and answer business questions',
        estTime: '60 minutes',
        difficulty: 'Beginner',
        setup: [
          'pip install pandas matplotlib',
          'Internet access to download data',
        ],
        steps: [
          {
            title: 'Load the Titanic dataset',
            instruction: 'Load the famous Titanic dataset from a URL',
            code: 'import pandas as pd\n\nurl = "https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv"\ndf = pd.read_csv(url)\nprint(df.shape)  # (891, 12)\nprint(df.head())',
            codeLanguage: 'python',
            expectedOutput: '   PassengerId  Survived  Pclass  ...    Fare Cabin  Embarked\n0            1         0       3  ...  7.2500   NaN         S\n1            2         1       1  ... 71.2833   C85         C',
          },
          {
            title: 'Explore the data',
            instruction: 'Get basic info and statistics',
            code: 'print(df.info())\nprint()\nprint(df.describe())\nprint()\nprint("Missing values:")\nprint(df.isnull().sum())\nprint()\nprint("Survival rate:\", df["Survived"].mean())  # ~38%\nprint("Survival by gender:")\nprint(df.groupby("Sex")["Survived"].mean())\n# female    0.742\n# male      0.189',
            codeLanguage: 'python',
            explanation: 'Survival rate was 74% for women, 19% for men - "women and children first" was real!',
          },
          {
            title: 'Answer business questions',
            instruction: 'Use groupby and aggregations',
            code: '# Survival by class and gender\nprint(df.groupby(["Pclass", "Sex"])["Survived"].mean())\n\n# Average fare by class\nprint(df.groupby("Pclass")["Fare"].agg(["mean", "median", "min", "max"]))\n\n# Age distribution of survivors vs non-survivors\nprint(df.groupby("Survived")["Age"].describe())\n\n# Most common embarkation port\nprint(df["Embarked"].value_counts())\n\n# Family size analysis\ndf["FamilySize"] = df["SibSp"] + df["Parch"] + 1\nprint(df.groupby("FamilySize")["Survived"].mean())',
            codeLanguage: 'python',
            expectedOutput: 'Pclass  Sex   \n1       female    0.968\n        male      0.369\n2       female    0.921\n        male      0.157\n3       female    0.500\n        male      0.135',
          },
          {
            title: 'Visualize insights',
            instruction: 'Create basic visualizations',
            code: 'import matplotlib.pyplot as plt\n\nfig, axes = plt.subplots(2, 2, figsize=(12, 10))\n\n# Survival by gender\ndf.groupby("Sex")["Survived"].mean().plot.bar(ax=axes[0,0], color="steelblue")\naxes[0,0].set_title("Survival Rate by Gender")\n\n# Survival by class\ndf.groupby("Pclass")["Survived"].mean().plot.bar(ax=axes[0,1], color="coral")\naxes[0,1].set_title("Survival Rate by Class")\n\n# Age distribution\ndf["Age"].hist(bins=30, ax=axes[1,0], color="green")\naxes[1,0].set_title("Age Distribution")\n\n# Fare distribution\ndf["Fare"].hist(bins=50, ax=axes[1,1], color="purple")\naxes[1,1].set_title("Fare Distribution")\n\nplt.tight_layout()\nplt.savefig("titanic_analysis.png")\nprint("Saved titanic_analysis.png")',
            codeLanguage: 'python',
          },
        ],
        verification: 'Plot saved, survival rates match historical records (74% women, 19% men).',
      },
      exercises: [
        {
          prompt: 'Load a CSV of employees, filter those making > $50K in NYC or SF, sort by salary desc, select name and salary columns.',
          starterCode: 'import pandas as pd\n\ndf = pd.read_csv("employees.csv")\n# your code\n',
          hint: 'Use isin() for cities, & for AND, sort_values, then [[...]] for columns.',
          solution: 'import pandas as pd\n\ndf = pd.read_csv("employees.csv")\nresult = (\n    df[\n        (df["salary"] > 50000) &\n        (df["city"].isin(["NYC", "SF"]))\n    ]\n    .sort_values("salary", ascending=False)\n    [["name", "salary"]]\n)\nprint(result)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is the difference between .loc[] and .iloc[]?',
          options: ['No difference', '.loc uses labels, .iloc uses positions', '.loc is faster, .iloc is slower', '.loc works on rows, .iloc on columns'],
          correctIndex: 1,
          explanation: '.loc[5] gets row with LABEL 5. .iloc[5] gets the 6th row (POSITION 5). When index is 0,1,2... they seem same but differ with custom indexes.'
        },
        {
          question: 'How do you filter rows where age > 30 AND city is NYC?',
          options: ['df[df.age > 30 and df.city == "NYC"]', 'df[(df.age > 30) & (df.city == "NYC")]', 'df.filter(age>30, city="NYC")', 'df.query(age>30, city="NYC")'],
          correctIndex: 1,
          explanation: 'Use & for AND, | for OR. Always wrap conditions in parens! `and`/`or` do not work on Series.'
        }
      ],
      keyTakeaways: [
        'DataFrame = table (like Excel/SQL), Series = single column',
        'Load: pd.read_csv/json/excel/sql',
        'Inspect: head, info, describe, shape, dtypes',
        'Select: df["col"], df.loc[label], df.iloc[pos], df.query()',
        'Filter: df[(cond1) & (cond2)], df[df.col.isin([...])]',
        'Sort: df.sort_values("col", ascending=False)',
      ],
      resources: [
        { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/', type: 'docs' },
        { title: 'Pandas Cheat Sheet', url: 'https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf', type: 'cheatsheet' },
      ]
    },

    {
      id: 'ds-03',
      title: 'GroupBy, Aggregation & Merging',
      subtitle: 'The SQL of Pandas - split-apply-combine',
      duration: 55,
      difficulty: 'Intermediate',
      phase: 'Advanced',
      content: [
        'GroupBy is the most powerful Pandas feature. It implements the split-apply-combine pattern: split data into groups, apply a function to each, combine results. Like SQL GROUP BY but more flexible.',
        'Aggregations: df.groupby("col")["value"].sum(), .mean(), .count(), .min(), .max(), .std(), .agg(["mean", "sum", "count"]), .agg({"col1": "mean", "col2": "sum"}).',
        'Merging combines DataFrames like SQL JOINs: pd.merge(left, right, on="key", how="inner/left/right/outer"). Concat stacks: pd.concat([df1, df2], axis=0/1).',
        'Advanced: .transform() broadcasts group results back to original shape. .filter() keeps groups matching a condition. .apply() runs any function on each group. .pivot_table() for cross-tabulations.',
      ],
      codeExamples: [
        {
          filename: 'groupby.py',
          language: 'python',
          code: 'import pandas as pd\nimport numpy as np\n\n# Sample sales data\nnp.random.seed(42)\ndf = pd.DataFrame({\n    "date": pd.date_range("2024-01-01", periods=100),\n    "region": np.random.choice(["North", "South", "East", "West"], 100),\n    "product": np.random.choice(["A", "B", "C"], 100),\n    "quantity": np.random.randint(1, 10, 100),\n    "price": np.random.uniform(10, 100, 100).round(2),\n})\ndf["revenue"] = df["quantity"] * df["price"]\n\n# Basic groupby - one column, one aggregation\nprint(df.groupby("region")["revenue"].sum())\n# East    12450.32\n# North   15234.11\n# ...\n\n# Multiple aggregations\nprint(df.groupby("region")["revenue"].agg(["sum", "mean", "count"]))\n#         sum    mean  count\n# East  12450  498.01     25\n# ...\n\n# Different agg per column\nprint(df.groupby("region").agg({\n    "revenue": ["sum", "mean"],\n    "quantity": "count",\n}))\n\n# Group by multiple columns\nprint(df.groupby(["region", "product"])["revenue"].sum())\n# region  product\n# East    A          4231.12\n#         B          5123.45\n# ...\n\n# Named aggregations (cleaner)\nprint(df.groupby("region").agg(\n    total_revenue=("revenue", "sum"),\n    avg_price=("price", "mean"),\n    num_sales=("revenue", "count"),\n))\n\n# Transform - broadcast back to original shape\ndf["region_avg"] = df.groupby("region")["revenue"].transform("mean")\ndf["above_avg"] = df["revenue"] > df["region_avg"]\n# Now each row has its region average for comparison\n\n# Filter - keep groups matching condition\nbig_regions = df.groupby("region").filter(lambda g: g["revenue"].sum() > 10000)\n# Only regions with total revenue > 10K\n\n# Apply - custom function per group\ndef top_sale(group):\n    return group.nlargest(1, "revenue")\n\ntop_per_region = df.groupby("region").apply(top_sale)\n# One row per region - the highest sale',
          explanation: 'groupby is split-apply-combine. Use .agg() for multiple aggregations, .transform() to broadcast back, .filter() to keep groups, .apply() for custom logic.'
        },
        {
          filename: 'merging.py',
          language: 'python',
          code: 'import pandas as pd\n\n# Create two DataFrames to merge\nemployees = pd.DataFrame({\n    "emp_id": [1, 2, 3, 4, 5],\n    "name": ["Alice", "Bob", "Carol", "Dan", "Eve"],\n    "dept_id": [10, 20, 10, 30, 20],\n})\n\ndepartments = pd.DataFrame({\n    "dept_id": [10, 20, 30, 40],\n    "dept_name": ["Engineering", "Sales", "Marketing", "HR"],\n    "location": ["NYC", "LA", "SF", "Boston"],\n})\n\n# Merge (SQL JOIN)\nresult = pd.merge(employees, departments, on="dept_id", how="inner")\n# Only rows with matching dept_id (40 has no employees)\nprint(result)\n\n# Different join types\ninner = pd.merge(employees, departments, on="dept_id", how="inner")  # both\nleft  = pd.merge(employees, departments, on="dept_id", how="left")   # all employees\nright = pd.merge(employees, departments, on="dept_id", how="right")  # all depts\nouter = pd.merge(employees, departments, on="dept_id", how="outer")  # everything\n\n# Different column names\n# pd.merge(df1, df2, left_on="id", right_on="user_id")\n\n# Concat - stack DataFrames\nq1 = pd.DataFrame({"month": [1,2,3], "sales": [100, 110, 120]})\nq2 = pd.DataFrame({"month": [4,5,6], "sales": [130, 125, 140]})\n\n# Stack vertically (more rows)\nyear = pd.concat([q1, q2], ignore_index=True)\n\n# Stack horizontally (more columns)\n# pd.concat([df1, df2], axis=1)\n\n# Pivot table - cross-tabulation\nsales = pd.DataFrame({\n    "date": pd.date_range("2024-01-01", periods=12, freq="M"),\n    "region": ["N","S","N","S","N","S","N","S","N","S","N","S"],\n    "revenue": range(100, 112),\n})\n\npivot = sales.pivot_table(\n    index="date",\n    columns="region",\n    values="revenue",\n    aggfunc="sum",\n)\n# Each region gets its own column, indexed by date\n\n# Pivot with multiple aggregations\npivot2 = sales.pivot_table(\n    index="region",\n    values="revenue",\n    aggfunc=["sum", "mean", "count"],\n)',
          explanation: 'pd.merge = SQL JOIN (inner/left/right/outer). pd.concat stacks DataFrames. pivot_table creates cross-tabulations (like Excel pivot).'
        },
      ],
      exercises: [
        {
          prompt: 'Given a DataFrame of orders (date, customer_id, amount), find the top 3 customers by total spend.',
          starterCode: 'import pandas as pd\n\n# df has columns: date, customer_id, amount\nresult = \n',
          hint: 'groupby customer_id, sum amount, sort desc, head 3.',
          solution: 'import pandas as pd\n\nresult = (\n    df.groupby("customer_id")["amount"]\n    .sum()\n    .sort_values(ascending=False)\n    .head(3)\n)\nprint(result)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does .transform() do?',
          options: ['Transforms data types', 'Broadcasts group results back to original shape', 'Transposes the DataFrame', 'Same as apply'],
          correctIndex: 1,
          explanation: 'transform returns a Series with the same length as the original, with group results broadcast back. Great for adding group-level columns.'
        },
        {
          question: 'Which merge keeps all rows from both DataFrames?',
          options: ['inner', 'left', 'right', 'outer'],
          correctIndex: 3,
          explanation: 'outer join keeps all rows from both sides, filling NaN for non-matches. Like SQL FULL OUTER JOIN.'
        }
      ],
      keyTakeaways: [
        'groupby = split-apply-combine (like SQL GROUP BY)',
        'Use .agg() for multiple aggregations, named aggregations for clarity',
        '.transform() broadcasts group results to original shape',
        '.filter() keeps groups matching a condition',
        'pd.merge = SQL JOIN, pd.concat stacks DataFrames',
        'pivot_table for cross-tabulations (Excel-like pivots)',
      ],
      resources: [
        { title: 'Pandas GroupBy', url: 'https://pandas.pydata.org/docs/user_guide/groupby.html', type: 'docs' },
        { title: 'Pandas Merging', url: 'https://pandas.pydata.org/docs/user_guide/merging.html', type: 'docs' },
      ]
    },

    {
      id: 'ds-04',
      title: 'Time Series & Real-World Data Cleaning',
      subtitle: 'Dates, missing data, outliers, large datasets',
      duration: 60,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'Time series is a first-class citizen in Pandas. Use DatetimeIndex for time-based selection, resampling, rolling windows. parse_dates when loading, pd.to_datetime() to convert, .dt accessor for components.',
        'Missing data is everywhere in real-world data. Strategies: drop (df.dropna()), fill (df.fillna(value)), interpolate (df.interpolate()), forward fill (ffill), backward fill (bfill). Choose based on context.',
        'Handling outliers: detect with .describe(), IQR method, z-score. Options: remove, cap (winsorize), transform. Always understand WHY outliers exist before removing.',
        'Large datasets: 1) Read only needed columns (usecols), 2) Specify dtypes (not object), 3) Use chunksize for streaming, 4) Use categorical dtype for low-cardinality strings, 5) Consider Dask or Polars for >memory datasets.',
      ],
      codeExamples: [
        {
          filename: 'time_series.py',
          language: 'python',
          code: 'import pandas as pd\nimport numpy as np\n\n# Create time series\ndates = pd.date_range("2024-01-01", periods=365, freq="D")\nprices = 100 + np.cumsum(np.random.randn(365) * 2)  # random walk\ndf = pd.DataFrame({"price": prices}, index=dates)\ndf.index.name = "date"\n\n# Time-based selection\nprint(df.loc["2024-01"])              # all of January\nprint(df.loc["2024-01":"2024-03"])    # Jan to March\nprint(df.loc["2024-06-15"])           # specific date\n\n# .dt accessor (for date columns)\ndf["weekday"] = df.index.weekday\ndf["month"] = df.index.month\ndf["is_weekend"] = df.index.weekday >= 5\n\n# Resampling - change frequency\ndaily = df["price"]\nweekly = daily.resample("W").mean()     # weekly average\nmonthly = daily.resample("ME").mean()   # monthly average\nyearly = daily.resample("YE").mean()    # yearly average\n\n# Rolling windows\ndf["rolling_7d"] = df["price"].rolling(7).mean()      # 7-day moving avg\ndf["rolling_30d"] = df["price"].rolling(30).mean()    # 30-day moving avg\ndf["rolling_std"] = df["price"].rolling(30).std()     # 30-day volatility\n\n# Shift - compare to previous period\ndf["prev_day"] = df["price"].shift(1)\ndf["daily_return"] = df["price"].pct_change()  # (today - yesterday) / yesterday\ndf["cumulative_return"] = (1 + df["daily_return"]).cumprod() - 1\n\n# Date offsets\nfrom pandas.tseries.offsets import MonthEnd, BDay\ndf.index + BDay(5)  # add 5 business days\n\n# Time zone handling\nts = pd.Timestamp("2024-01-15 10:00")\nts_utc = ts.tz_localize("UTC")\nts_nyc = ts_utc.tz_convert("America/New_York")\nprint(ts_nyc)  # 2024-01-15 05:00:00-05:00',
          explanation: 'Pandas excels at time series. resample changes frequency, rolling computes moving statistics, shift compares to previous periods, pct_change computes returns.'
        },
        {
          filename: 'cleaning.py',
          language: 'python',
          code: 'import pandas as pd\nimport numpy as np\n\n# Messy data\ndf = pd.DataFrame({\n    "name": ["Alice", "Bob", "Carol", "Dan", "Eve", "Alice"],  # duplicate\n    "age": [25, np.nan, 35, -5, 32, 25],  # missing + invalid\n    "email": ["alice@x.com", "BOB@X.COM", "carol@x.com", "", "eve@x.com", "alice@x.com"],\n    "salary": [70000, 80000, 90000, 75000, np.nan, 70000],\n})\n\n# 1. Remove duplicates\nprint(f"Before: {len(df)}")\ndf = df.drop_duplicates()\nprint(f"After dedup: {len(df)}")\n\n# 2. Standardize text\ndf["email"] = df["email"].str.lower().str.strip()\ndf["name"] = df["name"].str.title()\n\n# 3. Handle missing values\nprint(df.isnull().sum())\n\n# Drop rows with missing critical data\ndf = df.dropna(subset=["email"])\n\n# Fill with reasonable defaults\ndf["age"] = df["age"].fillna(df["age"].median())\ndf["salary"] = df["salary"].fillna(df["salary"].mean())\n\n# 4. Handle invalid values\ndf.loc[df["age"] < 0, "age"] = np.nan\ndf["age"] = df["age"].fillna(df["age"].median())\n\n# 5. Detect outliers (IQR method)\nQ1 = df["salary"].quantile(0.25)\nQ3 = df["salary"].quantile(0.75)\nIQR = Q3 - Q1\nlower = Q1 - 1.5 * IQR\nupper = Q3 + 1.5 * IQR\n\noutliers = df[(df["salary"] < lower) | (df["salary"] > upper)]\nprint(f"Outliers: {len(outliers)}")\n\n# Cap outliers (winsorize)\ndf["salary_capped"] = df["salary"].clip(lower, upper)\n\n# 6. Convert dtypes (saves memory)\ndf["age"] = df["age"].astype("int8")  # -128 to 127\ndf["salary"] = df["salary"].astype("float32")\n\n# 7. Categorical (for low-cardinality strings)\ndf["name"] = df["name"].astype("category")\n\nprint(df.info())  # check memory usage',
          explanation: 'Real-world data cleaning: dedup, standardize text, handle missing (drop/fill/interpolate), detect & cap outliers, optimize dtypes for memory.'
        },
      ],
      exercises: [
        {
          prompt: 'Load a CSV with a date column, set it as index, resample to monthly average, and plot.',
          starterCode: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("sales.csv", parse_dates=["date"], index_col="date")\n# your code\n',
          hint: 'Use resample("ME").mean() then .plot().',
          solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("sales.csv", parse_dates=["date"], index_col="date")\nmonthly = df["revenue"].resample("ME").mean()\nmonthly.plot(figsize=(12, 6), title="Monthly Average Revenue")\nplt.savefig("monthly_revenue.png")',
          solutionLanguage: 'python'
        },
      ],
      keyTakeaways: [
        'Use DatetimeIndex and parse_dates for time series',
        'resample() changes frequency (D/W/ME/YE)',
        'rolling() computes moving statistics',
        'shift() and pct_change() for period-over-period comparisons',
        'Clean data: dedup, standardize, fill missing, cap outliers',
        'Optimize memory: usecols, dtype, category for low-cardinality',
      ],
      resources: [
        { title: 'Pandas Time Series', url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html', type: 'docs' },
        { title: 'Pandas Cleaning Data', url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html', type: 'docs' },
      ],
      miniProject: {
        title: 'Sales Data Analysis Dashboard',
        description: 'Analyze 1M+ rows of sales data end-to-end.',
        requirements: [
          'Load CSV with proper dtypes (memory efficient)',
          'Clean: handle missing values, remove duplicates',
          'Add derived columns (revenue, month, quarter)',
          'Aggregate by region, product, time period',
          'Calculate KPIs: total revenue, growth rate, top products',
          'Time series: monthly trends, year-over-year comparison',
          'Export to Excel with multiple sheets',
          'Generate 4+ matplotlib visualizations',
        ],
        estTime: '5-7 hours',
        solutionCode: '# See lab steps in lesson ds-02 for patterns.\n# Key steps:\n# 1. df = pd.read_csv("sales.csv", parse_dates=["date"],\n#      dtype={"region": "category", "product": "category"})\n# 2. df["revenue"] = df["qty"] * df["price"]\n# 3. monthly = df.set_index("date")["revenue"].resample("ME").sum()\n# 4. by_region = df.groupby("region")["revenue"].agg(["sum","mean","count"])\n# 5. top_products = df.groupby("product")["revenue"].sum().nlargest(10)\n# 6. with pd.ExcelWriter("report.xlsx") as xw:\n#      by_region.to_excel(xw, sheet_name="By Region")\n#      monthly.to_excel(xw, sheet_name="Monthly")',
        solutionLanguage: 'python'
      }
    },
  ]
};
