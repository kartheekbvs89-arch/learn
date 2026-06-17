import { Lesson } from '../../types';

export const postgresqlL1: Lesson = {
  slug: 'sql-fundamentals', title: 'SQL Fundamentals — SELECT, INSERT, UPDATE, DELETE',
  subtitle: 'Master the 4 basic SQL operations with real schemas',
  duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'postgresql',
  objectives: ['Write SELECT queries with WHERE, ORDER BY, LIMIT','INSERT rows with proper column mapping','UPDATE rows with WHERE (never forget WHERE!)','DELETE rows safely','Understand data types (INTEGER, VARCHAR, TEXT, TIMESTAMP, BOOLEAN)'],
  realWorldContext: 'SQL is the language of every database. Every backend engineer writes SQL daily. At companies like Google and Amazon, understanding SQL is non-negotiable. Even with ORMs (SQLAlchemy), you need to understand what SQL is generated to debug performance issues.',
  prerequisites: ['Basic computer literacy','A PostgreSQL instance (Docker: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres:16)'],
  conceptDiagram: `SQL CRUD OPERATIONS:
  CREATE: INSERT INTO users (name, email) VALUES ('Alice', 'a@x.com')
  READ:   SELECT * FROM users WHERE age > 18 ORDER BY name LIMIT 10
  UPDATE: UPDATE users SET name = 'Bob' WHERE id = 1
  DELETE: DELETE FROM users WHERE id = 1

  CRITICAL: Always use WHERE with UPDATE/DELETE!
  UPDATE users SET name='Bob'  ← changes ALL rows! (disaster)
  UPDATE users SET name='Bob' WHERE id=1  ← only one row (safe)`,
  conceptExplanation: ['SELECT retrieves data. Use WHERE for filtering, ORDER BY for sorting, LIMIT for pagination. Always specify columns (SELECT name, email) instead of SELECT * — it is faster and more explicit.','INSERT adds rows. Always specify column names: INSERT INTO users (name, email) VALUES (...). Without column names, the order must match the table definition (fragile).','UPDATE modifies existing rows. ALWAYS include WHERE clause. Without WHERE, ALL rows are updated — this is the #1 SQL disaster. Some tools require --safe-update mode that forces WHERE.'],
  whyItMatters: 'SQL is used by every database in the world. Understanding CRUD operations is the foundation of backend development. A single UPDATE without WHERE can destroy your entire production database. This is not optional knowledge.',
  codeExamples: [
    { filename: 'sql.sql', language: 'sql', approach: 'minimal', code: `-- CREATE TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER CHECK (age >= 0),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- INSERT
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@x.com', 30);

-- SELECT
SELECT * FROM users;
SELECT name, email FROM users WHERE active = TRUE ORDER BY name;

-- UPDATE (ALWAYS use WHERE!)
UPDATE users SET age = 31 WHERE id = 1;

-- DELETE (ALWAYS use WHERE!)
DELETE FROM users WHERE id = 1;`, explanation: 'Basic CRUD: CREATE TABLE with constraints, INSERT with columns, SELECT with WHERE/ORDER BY, UPDATE/DELETE with WHERE (CRITICAL).' },
    { filename: 'sql.sql', language: 'sql', approach: 'real-world', code: `-- Insert multiple rows
INSERT INTO users (name, email, age) VALUES
    ('Alice', 'alice@x.com', 30),
    ('Bob', 'bob@x.com', 25),
    ('Carol', 'carol@x.com', 35);

-- Select with multiple conditions
SELECT name, email, age FROM users
WHERE active = TRUE AND age >= 25
ORDER BY age DESC, name ASC
LIMIT 10 OFFSET 20;  -- pagination (page 3, 10 per page)

-- Update with conditions
UPDATE users SET active = FALSE WHERE age < 18;

-- Delete with subquery
DELETE FROM users WHERE id NOT IN (
    SELECT user_id FROM orders WHERE created_at > NOW() - INTERVAL '1 year'
);

-- Upsert (insert or update if exists)
INSERT INTO users (email, name) VALUES ('alice@x.com', 'Alice Updated')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;

-- Returning (get back what was inserted/updated)
INSERT INTO users (name, email) VALUES ('Dan', 'dan@x.com') RETURNING id, created_at;
UPDATE users SET age = 32 WHERE email = 'alice@x.com' RETURNING *;`, explanation: 'Real-world: batch insert, multi-condition WHERE, pagination, upsert (ON CONFLICT), RETURNING (get inserted/updated row back). These are used in production daily.' },
  ],
  configFiles: [],
  lab: { title: 'Practice SQL CRUD', steps: [
    { step: 1, title: 'Start PostgreSQL', instruction: 'Run in Docker', command: 'docker run -d --name pg -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres:16' },
    { step: 2, title: 'Connect', instruction: 'Open psql', command: 'docker exec -it pg psql -U postgres' },
    { step: 3, title: 'Create table', instruction: 'Create users table', command: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(255) UNIQUE, age INT);' },
    { step: 4, title: 'CRUD', instruction: 'Insert, select, update, delete', command: 'INSERT INTO users (name,email,age) VALUES (\'Alice\',\'a@x.com\',30); SELECT * FROM users; UPDATE users SET age=31 WHERE id=1;' },
  ]},
  commonErrors: [
    { error: 'UPDATE without WHERE changes all rows', fix: 'ALWAYS include WHERE clause. Use BEGIN; ... ROLLBACK; to test safely. Enable --safe-updates in MySQL.', rootCause: 'Without WHERE, UPDATE applies to every row in the table. This is the #1 SQL disaster.' },
  ],
  quiz: [
    { question: 'What does SERIAL PRIMARY KEY do?', options: ['Makes it faster', 'Auto-incrementing integer that uniquely identifies each row', 'Required', 'Adds index'], correctIndex: 1, explanation: 'SERIAL = auto-incrementing integer. PRIMARY KEY = unique, not null, indexed. Every table should have a primary key.' },
    { question: 'Why always use WHERE with UPDATE/DELETE?', options: ['Faster', 'Without WHERE, ALL rows are affected (disaster!)', 'Required by SQL', 'For security'], correctIndex: 1, explanation: 'UPDATE users SET name=Bob (no WHERE) changes every row. This has caused real production disasters. ALWAYS use WHERE.' },
  ],
  resources: [{ title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'docs' }, { title: 'SQLBolt (interactive)', url: 'https://sqlbolt.com/', type: 'interactive', isHiddenGem: true }],
  whatToReadNext: 'Read about JOINs (next lesson) — combining data from multiple tables.',
};

export const postgresqlL2: Lesson = {
  slug: 'joins', title: 'JOINs — INNER, LEFT, RIGHT, FULL, Self-joins',
  subtitle: 'Combine data from multiple tables with JOINs',
  duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'postgresql',
  objectives: ['Write INNER JOIN (most common) — only matching rows','Write LEFT JOIN — all left rows + matching right','Write RIGHT and FULL JOINs','Self-join for hierarchical data','Use table aliases for readable queries'],
  realWorldContext: 'JOINs are how you combine data from multiple tables. Every real query uses JOINs: users + orders, posts + comments, products + categories. Without JOINs, your data is isolated silos. This is the most important SQL skill.',
  prerequisites: ['Completed PostgreSQL L1'],
  conceptDiagram: `JOIN TYPES:
  INNER JOIN: only rows that match in BOTH tables
    A ∩ B (intersection)

  LEFT JOIN: ALL left rows + matching right (NULL if no match)
    A (everything in A, plus matching B)

  RIGHT JOIN: ALL right rows + matching left
    B (everything in B, plus matching A)

  FULL JOIN: ALL rows from both tables
    A ∪ B (union)

  EXAMPLE:
  users table:  Alice(1), Bob(2), Carol(3)
  orders table: Order by Alice, Order by Bob

  INNER JOIN: Alice + order, Bob + order (Carol excluded — no orders)
  LEFT JOIN:  Alice + order, Bob + order, Carol + NULL (all users)`,
  conceptExplanation: ['INNER JOIN returns only rows that have a match in BOTH tables. If a user has no orders, they do not appear. This is the most common JOIN.','LEFT JOIN returns ALL rows from the left table, plus matching rows from the right. If no match, right columns are NULL. Use when you want all users, even those without orders.','Self-join joins a table to itself. Use for hierarchical data: employees + managers (both in same employees table). Alias as e (employee) and m (manager).'],
  whyItMatters: 'Without JOINs, you cannot answer business questions: "show me all users with their order counts" or "find products that were never ordered." JOINs are the core of SQL — every report, dashboard, and API query uses them.',
  codeExamples: [
    { filename: 'joins.sql', language: 'sql', approach: 'minimal', code: `-- INNER JOIN: users with orders (users without orders excluded)
SELECT u.name, o.product, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: ALL users, with their orders (NULL if no orders)
SELECT u.name, o.product
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Carol appears with NULL product (no orders)

-- Self-join: employee + manager (same table)
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`, explanation: 'INNER JOIN: matching rows only. LEFT JOIN: all left rows + matching. Self-join: table joined to itself with aliases.' },
    { filename: 'joins.sql', language: 'sql', approach: 'real-world', code: `-- Multiple JOINs: users + orders + products
SELECT u.name, o.created_at, p.name AS product, p.price
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN products p ON o.product_id = p.id
WHERE u.active = TRUE
ORDER BY o.created_at DESC
LIMIT 50;

-- LEFT JOIN with filter: users who NEVER ordered
SELECT u.name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;  -- no matching order = never ordered

-- JOIN with aggregation: top 5 users by total spending
SELECT u.name, SUM(p.price * o.quantity) AS total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN products p ON o.product_id = p.id
GROUP BY u.id, u.name
ORDER BY total_spent DESC
LIMIT 5;

-- COUNT orders per user (including zero orders)
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY order_count DESC;`, explanation: 'Multiple JOINs (3 tables), LEFT JOIN to find users with no orders, JOIN + GROUP BY + SUM for spending, COUNT with LEFT JOIN (includes zero-order users).' },
  ],
  configFiles: [],
  lab: { title: 'Practice JOINs', steps: [
    { step: 1, title: 'Create tables', instruction: 'Create users and orders tables', command: 'CREATE TABLE users (id SERIAL PK, name VARCHAR(100)); CREATE TABLE orders (id SERIAL PK, user_id INT REFERENCES users(id), product VARCHAR(100));' },
    { step: 2, title: 'Insert data', instruction: 'Add users and orders', command: 'INSERT INTO users (name) VALUES (\'Alice\'),(\'Bob\'),(\'Carol\'); INSERT INTO orders (user_id, product) VALUES (1,\'Book\'),(1,\'Pen\'),(2,\'Lamp\');' },
    { step: 3, title: 'INNER JOIN', instruction: 'Users with orders', command: 'SELECT u.name, o.product FROM users u INNER JOIN orders o ON u.id=o.user_id;', expectedOutput: 'Alice+Book, Alice+Pen, Bob+Lamp (no Carol)' },
    { step: 4, title: 'LEFT JOIN', instruction: 'All users including no orders', command: 'SELECT u.name, o.product FROM users u LEFT JOIN orders o ON u.id=o.user_id;', expectedOutput: 'Alice+Book, Alice+Pen, Bob+Lamp, Carol+NULL' },
  ]},
  commonErrors: [{ error: 'JOIN produces duplicate rows', fix: 'Check if the joined table has multiple matching rows. Use DISTINCT or GROUP BY to deduplicate. Check your JOIN condition.', rootCause: 'One user with 3 orders = 3 rows in JOIN. This is correct behavior — use GROUP BY + COUNT to aggregate.' }],
  quiz: [{ question: 'Which JOIN includes users with no orders?', options: ['INNER JOIN', 'LEFT JOIN (all left rows + matching right, NULL if no match)', 'RIGHT JOIN', 'INNER JOIN with WHERE'], correctIndex: 1, explanation: 'LEFT JOIN returns all users. Users without orders get NULL for order columns. INNER JOIN excludes them.' }],
  resources: [{ title: 'SQL JOINs Visualizer', url: 'https://joins.spathon.com/', type: 'interactive', isHiddenGem: true }],
  whatToReadNext: 'Read about Aggregations (next lesson) — GROUP BY, HAVING, window functions.',
};

export const postgresqlL3: Lesson = {
  slug: 'aggregations', title: 'Aggregations — GROUP BY, HAVING, Window Functions',
  subtitle: 'Summarize data with GROUP BY, HAVING, and window functions',
  duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'postgresql',
  objectives: ['Use aggregate functions (COUNT, SUM, AVG, MIN, MAX)','Group data with GROUP BY','Filter groups with HAVING (vs WHERE)','Use window functions (ROW_NUMBER, RANK, LAG)','Understand the difference between WHERE and HAVING'],
  realWorldContext: 'Every dashboard and report uses aggregations: "total revenue by month", "top 10 customers", "average order value by category". Companies like Amazon run thousands of aggregation queries daily for analytics. Window functions (RANK, LAG) are essential for time-series analysis.',
  prerequisites: ['Completed PostgreSQL L1-L2'],
  conceptDiagram: `AGGREGATION FLOW:
  Raw data → GROUP BY → Aggregate (COUNT/SUM/AVG) → HAVING filter

  WHERE vs HAVING:
  WHERE: filters ROWS before grouping
  HAVING: filters GROUPS after grouping

  EXAMPLE:
  SELECT category, COUNT(*), SUM(price)
  FROM products
  WHERE active = TRUE       ← filter rows first
  GROUP BY category          ← then group
  HAVING COUNT(*) > 5        ← then filter groups

  WINDOW FUNCTIONS:
  ROW_NUMBER() OVER (ORDER BY price DESC)  ← row number
  RANK() OVER (PARTITION BY category ORDER BY price)  ← rank within group
  LAG(price, 1) OVER (ORDER BY date)  ← previous row's value`,
  conceptExplanation: ['Aggregate functions collapse multiple rows into one: COUNT (number of rows), SUM (total), AVG (average), MIN/MAX. Used with GROUP BY to aggregate per group (per category, per user, per month).','WHERE filters individual rows BEFORE grouping. HAVING filters groups AFTER grouping. "Show categories with more than 5 products" = HAVING COUNT(*) > 5 (cannot use WHERE — COUNT is not available before grouping).','Window functions operate on a "window" of rows without collapsing them. ROW_NUMBER gives each row a number. RANK gives a rank within a partition. LAG accesses the previous row. Used for: top-N per group, running totals, month-over-month comparison.'],
  whyItMatters: 'Without aggregations, you cannot answer business questions. "How much revenue did we make last month?" "Who are our top 10 customers?" "What is the average order value by category?" These are the questions executives ask — and they all require GROUP BY.',
  codeExamples: [
    { filename: 'aggregations.sql', language: 'sql', approach: 'minimal', code: `-- Basic aggregation
SELECT COUNT(*) FROM users;                          -- total users
SELECT AVG(age) FROM users;                          -- average age
SELECT SUM(amount) FROM orders;                      -- total revenue

-- GROUP BY: aggregate per group
SELECT category, COUNT(*), AVG(price)
FROM products
GROUP BY category;

-- HAVING: filter groups (not rows!)
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 5;  -- only categories with 5+ products`, explanation: 'COUNT/SUM/AVG collapse rows. GROUP BY aggregates per group. HAVING filters groups (after GROUP BY). WHERE filters rows (before GROUP BY).' },
    { filename: 'window.sql', language: 'sql', approach: 'real-world', code: `-- Window functions (no collapsing — every row preserved)
-- ROW_NUMBER: unique number per row
SELECT name, price,
  ROW_NUMBER() OVER (ORDER BY price DESC) AS rank
FROM products;

-- RANK with PARTITION: rank within each category
SELECT name, category, price,
  RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank
FROM products;
-- Gives rank within each category (reset per category)

-- LAG: compare to previous row (month-over-month)
SELECT month, revenue,
  LAG(revenue, 1) OVER (ORDER BY month) AS prev_month,
  revenue - LAG(revenue, 1) OVER (ORDER BY month) AS growth
FROM monthly_revenue;

-- Running total
SELECT date, amount,
  SUM(amount) OVER (ORDER BY date) AS running_total
FROM transactions;

-- Top 3 products per category
SELECT * FROM (
  SELECT name, category, price,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn
  FROM products
) ranked
WHERE rn <= 3;  -- top 3 per category`, explanation: 'Window functions: ROW_NUMBER (unique number), RANK (rank with gaps), LAG (previous row value), SUM OVER (running total). PARTITION BY resets per group. Does NOT collapse rows.' },
  ],
  configFiles: [],
  lab: { title: 'Practice Aggregations', steps: [
    { step: 1, title: 'Count by category', instruction: 'Group products', command: 'SELECT category, COUNT(*) FROM products GROUP BY category;' },
    { step: 2, title: 'Revenue by month', instruction: 'Sum and group', command: 'SELECT DATE_TRUNC(\'month\', created_at) AS month, SUM(amount) FROM orders GROUP BY month ORDER BY month;' },
    { step: 3, title: 'Top 3 per category', instruction: 'Use window function', command: 'SELECT * FROM (SELECT name, category, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn FROM products) t WHERE rn <= 3;' },
  ]},
  commonErrors: [{ error: 'column must appear in GROUP BY or be used in aggregate', fix: 'Every column in SELECT must be in GROUP BY or wrapped in an aggregate (COUNT, SUM, etc). Add the column to GROUP BY.', rootCause: 'SQL requires that non-aggregated columns in SELECT are in GROUP BY. Otherwise it does not know which value to show.' }],
  quiz: [{ question: 'What is the difference between WHERE and HAVING?', options: ['Same thing', 'WHERE filters rows before grouping, HAVING filters groups after grouping', 'HAVING is faster', 'WHERE is for SELECT only'], correctIndex: 1, explanation: 'WHERE runs before GROUP BY (filters individual rows). HAVING runs after GROUP BY (filters aggregated groups). Use HAVING COUNT(*) > 5.' }],
  resources: [{ title: 'PostgreSQL Aggregate Functions', url: 'https://www.postgresql.org/docs/current/functions-aggregate.html', type: 'docs' }, { title: 'Window Functions', url: 'https://www.postgresql.org/docs/current/tutorial-window.html', type: 'docs' }],
  whatToReadNext: 'Read about Indexes (next lesson) — B-tree, GIN, EXPLAIN ANALYZE.',
};

export const postgresqlL4: Lesson = {
  slug: 'indexes', title: 'Indexes — B-tree, GIN, BRIN, EXPLAIN ANALYZE',
  subtitle: 'Make queries 1000x faster with proper indexing',
  duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Create B-tree indexes for equality and range queries','Create GIN indexes for JSONB and full-text search','Use EXPLAIN ANALYZE to find slow queries','Understand Seq Scan vs Index Scan','Know when NOT to index'],
  realWorldContext: 'Without indexes, every query scans the entire table (Seq Scan). For 10M rows, that takes seconds. With an index, the same query takes milliseconds (Index Scan) — 1000x faster. Companies like Amazon optimize indexes aggressively — it directly affects user experience and server costs.',
  prerequisites: ['Completed PostgreSQL L1-L3'],
  conceptDiagram: `INDEX TYPES:
  B-tree (default): equality (=), range (<, >), sorting (ORDER BY)
    CREATE INDEX idx_users_email ON users(email);

  GIN: JSONB, arrays, full-text search
    CREATE INDEX idx_products_tags ON products USING GIN(tags);

  BRIN: large tables with natural ordering (time-series)
    CREATE INDEX idx_logs_time ON logs USING BRIN(created_at);

  EXPLAIN ANALYZE:
  Seq Scan    → BAD (scans entire table)
  Index Scan  → GOOD (uses index)
  Index Only  → BEST (all data from index, no table access)`,
  conceptExplanation: ['An index is like a book index — instead of scanning every page, you look up the term in the index and jump directly to the page. B-tree (default) works for =, <, >, ORDER BY. Without an index, PostgreSQL scans every row (Seq Scan — slow).','EXPLAIN ANALYZE shows the query plan: does it use an index? How many rows does it scan? How long does it take? Look for "Seq Scan" (bad) vs "Index Scan" (good). This is the #1 performance debugging tool.','Index the right columns: foreign keys (JOINs), columns in WHERE, columns in ORDER BY. Do NOT index: low cardinality (boolean), frequently updated columns, small tables. Every index slows down writes (INSERT/UPDATE).'],
  whyItMatters: 'A missing index on a 10M row table makes queries take 30 seconds instead of 3 milliseconds. This is the difference between a responsive app and a frozen one. Indexing strategy is the #1 database performance skill.',
  codeExamples: [
    { filename: 'indexes.sql', language: 'sql', approach: 'real-world', code: `-- Create indexes
CREATE INDEX idx_users_email ON users(email);           -- B-tree (for WHERE email = ?)
CREATE INDEX idx_users_created ON users(created_at);     -- for ORDER BY created_at
CREATE INDEX idx_orders_user ON orders(user_id);         -- foreign key index (for JOINs)

-- Composite index (for multi-column queries)
CREATE INDEX idx_products_cat_price ON products(category, price);
-- Optimizes: WHERE category = 'electronics' ORDER BY price

-- GIN index for JSONB
CREATE INDEX idx_products_attrs ON products USING GIN(attributes);
-- Optimizes: WHERE attributes @> '{"color": "red"}'

-- Check query plan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@x.com';
-- If "Seq Scan" → no index (slow!)
-- If "Index Scan" → using index (fast!)

-- Find slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;`, explanation: 'Create indexes on FKs, WHERE columns, ORDER BY columns. Composite for multi-column. GIN for JSONB. EXPLAIN ANALYZE to verify index usage. pg_stat_statements for slow query monitoring.' },
  ],
  configFiles: [],
  lab: { title: 'Add Indexes and Benchmark', steps: [
    { step: 1, title: 'Create big table', instruction: 'Generate 1M rows', command: 'INSERT INTO users (name, email) SELECT \'User\'||g, \'user\'||g||\'@x.com\' FROM generate_series(1,1000000) g;' },
    { step: 2, title: 'Query without index', instruction: 'Time it', command: 'EXPLAIN ANALYZE SELECT * FROM users WHERE email = \'user999999@x.com\';', expectedOutput: 'Seq Scan, ~500ms' },
    { step: 3, title: 'Add index', instruction: 'Create index', command: 'CREATE INDEX idx_users_email ON users(email);' },
    { step: 4, title: 'Query with index', instruction: 'Time it again', command: 'EXPLAIN ANALYZE SELECT * FROM users WHERE email = \'user999999@x.com\';', expectedOutput: 'Index Scan, ~0.1ms (5000x faster!)' },
  ]},
  commonErrors: [{ error: 'Seq Scan instead of Index Scan', fix: 'Check if index exists: \\d table_name. If exists, query may not match index (wrong column, function on column). Use EXPLAIN ANALYZE to debug.', rootCause: 'PostgreSQL uses Seq Scan when: no index exists, table is small, or query does not match index. ANALYZE table to update statistics.' }],
  quiz: [{ question: 'When NOT to create an index?', options: ['On foreign keys', 'On low-cardinality columns (boolean, gender) — planner uses Seq Scan anyway', 'On WHERE columns', 'On ORDER BY columns'], correctIndex: 1, explanation: 'Low-cardinality columns (boolean: true/false) do not benefit from indexes — the planner does a Seq Scan anyway. Index overhead (slower writes, storage) outweighs benefit.' }],
  resources: [{ title: 'PostgreSQL Indexes', url: 'https://www.postgresql.org/docs/current/indexes.html', type: 'docs' }, { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'book', isHiddenGem: true }],
  whatToReadNext: 'Read about Query Optimization (next lesson) — N+1, pagination, denormalization.',
};

// L5-L15 — real specific content
export const postgresqlL5: Lesson = {
  slug: 'query-optimization', title: 'Query Optimization — N+1, Pagination, Denormalization',
  subtitle: 'Make slow queries fast',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Fix N+1 query problem','Use keyset pagination instead of OFFSET','Select only needed columns (not SELECT *)','Use EXISTS instead of COUNT','Understand denormalization trade-offs'],
  realWorldContext: 'The N+1 problem is the #1 performance killer in ORM apps. Loading 100 users with their posts fires 101 queries (1 for users + 100 for posts). Fixing it = 2 queries (50x faster). Companies like Shopify and GitHub obsess over query optimization.',
  prerequisites: ['Completed PostgreSQL L1-L4'],
  conceptDiagram: `N+1 PROBLEM:
  Query 1: SELECT * FROM users → 100 users
  Query 2-101: SELECT * FROM posts WHERE user_id = ? (per user!)
  Total: 101 queries → 500ms

  FIX (JOIN or IN):
  Query 1: SELECT * FROM users u JOIN posts p ON p.user_id = u.id
  Total: 1 query → 10ms (50x faster!)

  PAGINATION:
  BAD:  OFFSET 100000 LIMIT 20 (scans 100K rows first!)
  GOOD: WHERE id > last_id LIMIT 20 (index lookup, instant)`,
  conceptExplanation: ['N+1: 1 query loads N items, then 1 query PER ITEM for relations. Fix with JOIN (1 query) or IN (2 queries). In SQLAlchemy, use selectinload/joinedload. In raw SQL, use JOIN.','OFFSET pagination scans all skipped rows. Page 1000 (OFFSET 20000) scans 20000 rows then returns 20. Keyset pagination (WHERE id > last_id) uses index — instant regardless of page number.','SELECT * fetches ALL columns. If you only need name and email, SELECT name, email — less data transferred, faster. Also enables Index Only Scan (all data from index, no table access).'],
  whyItMatters: 'N+1 makes apps 50x slower. OFFSET pagination makes page 1000 take 10 seconds. SELECT * wastes bandwidth and memory. These are the top 3 query optimizations — they directly impact user experience.',
  codeExamples: [
    { filename: 'optimization.sql', language: 'sql', approach: 'real-world', code: `-- BAD: N+1 (do not do this in application code)
-- for user in users: SELECT * FROM posts WHERE user_id = user.id  ← N queries!

-- GOOD: JOIN (1 query)
SELECT u.name, p.title
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
WHERE u.active = TRUE;

-- BAD: OFFSET pagination (scans all skipped rows)
SELECT * FROM posts ORDER BY created_at DESC OFFSET 100000 LIMIT 20;
-- Scans 100K rows, then returns 20. Slow!

-- GOOD: Keyset pagination (index lookup)
SELECT * FROM posts WHERE created_at < '2024-01-01' ORDER BY created_at DESC LIMIT 20;
-- Uses index on created_at. Instant regardless of page.

-- BAD: SELECT * (fetches all columns)
SELECT * FROM users WHERE id = 1;

-- GOOD: Select only needed columns
SELECT name, email FROM users WHERE id = 1;
-- Less data, enables Index Only Scan

-- BAD: COUNT for existence check
SELECT COUNT(*) FROM posts WHERE user_id = 1;
-- Counts ALL matching rows

-- GOOD: EXISTS (stops at first match)
SELECT EXISTS(SELECT 1 FROM posts WHERE user_id = 1);
-- Returns true/false, stops immediately`, explanation: 'Fix N+1 with JOIN. Use keyset pagination (WHERE > last). Select only needed columns. Use EXISTS instead of COUNT for existence checks.' },
  ],
  configFiles: [],
  lab: { title: 'Optimize Queries', steps: [
    { step: 1, title: 'Find N+1', instruction: 'Enable query logging', command: 'In app: enable SQL echo, count queries for a request' },
    { step: 2, title: 'Fix with JOIN', instruction: 'Replace N+1 with single query', command: 'Use JOIN or selectinload instead of loop' },
    { step: 3, title: 'Benchmark', instruction: 'Compare before/after', command: 'EXPLAIN ANALYZE both approaches', expectedOutput: '50x faster' },
  ]},
  commonErrors: [{ error: 'OFFSET pagination slow on page 1000', fix: 'Use keyset pagination: WHERE id > last_seen_id ORDER BY id LIMIT 20. Uses index, instant regardless of page.', rootCause: 'OFFSET 20000 scans 20000 rows before returning 20. Keyset uses index lookup.' }],
  quiz: [{ question: 'What is the N+1 problem?', options: ['N queries for 1 item', '1 query loads N items, then 1 query PER ITEM for relations', 'N+1 indexes', 'Network latency'], correctIndex: 1, explanation: '1 query loads N items (users), then 1 query per item for relations (posts). 100 users = 101 queries. Fix with JOIN (1 query) or selectinload (2 queries).' }],
  resources: [{ title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'book', isHiddenGem: true }],
  whatToReadNext: 'Read about Transactions (next lesson) — ACID, isolation levels, deadlocks.',
};

export const postgresqlL6: Lesson = {
  slug: 'transactions', title: 'Transactions, MVCC, Isolation Levels, Deadlocks',
  subtitle: 'Ensure data consistency with transactions',
  duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Use BEGIN/COMMIT/ROLLBACK for atomic operations','Understand ACID properties','Choose isolation levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE)','Prevent deadlocks','Use SELECT FOR UPDATE for pessimistic locking'],
  realWorldContext: 'Transactions prevent data corruption. Without them, a money transfer could debit one account but not credit the other (if the server crashes mid-transfer). Every financial system uses SERIALIZABLE isolation. Companies like Stripe and PayPal rely on transaction guarantees.',
  prerequisites: ['Completed PostgreSQL L1-L5'],
  conceptDiagram: `TRANSACTION:
  BEGIN;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- debit
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- credit
  COMMIT;  -- both succeed or both fail (atomic)

  ACID:
  Atomicity: all or nothing
  Consistency: valid state before and after
  Isolation: concurrent transactions do not interfere
  Durability: committed data survives crashes

  ISOLATION LEVELS:
  READ COMMITTED (default): sees committed changes from others
  REPEATABLE READ: same query = same result within transaction
  SERIALIZABLE: as if transactions ran one at a time (safest, slowest)`,
  conceptExplanation: ['A transaction groups operations into an atomic unit. Either ALL succeed (COMMIT) or ALL fail (ROLLBACK). If the server crashes after debit but before credit, the entire transaction rolls back — no money lost.','PostgreSQL uses MVCC (Multi-Version Concurrency Control) — each transaction sees a snapshot of data. Readers do not block writers, writers do not block readers. This is why PostgreSQL handles high concurrency well.','SELECT FOR UPDATE locks rows so no other transaction can modify them. Use for pessimistic locking: transfer money — lock both accounts, modify, commit. Other transactions wait. Prevents concurrent modifications.'],
  whyItMatters: 'Without transactions, a crash during a multi-step operation leaves your database in an inconsistent state. Money disappears. Orders are half-fulfilled. Inventory is wrong. Transactions are the foundation of data integrity.',
  codeExamples: [
    { filename: 'transactions.sql', language: 'sql', approach: 'real-world', code: `-- Atomic money transfer
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  -- If either fails, ROLLBACK undoes BOTH
COMMIT;

-- With error handling (psql)
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  -- Oops, wrong amount
ROLLBACK;  -- undo everything since BEGIN

-- Pessimistic locking (prevent concurrent modification)
BEGIN;
  SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  -- locks row
  -- Other transactions waiting for this row...
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- releases lock

-- Set isolation level
BEGIN ISOLATION LEVEL SERIALIZABLE;
  -- As if transactions ran one at a time
  -- Safest, but may cause serialization failures (retry)
  SELECT * FROM products WHERE id = 1;
  -- Another transaction cannot modify product 1
COMMIT;`, explanation: 'BEGIN/COMMIT/ROLLBACK for atomicity. SELECT FOR UPDATE for pessimistic locking. SERIALIZABLE for maximum safety (may need retry on conflict).' },
  ],
  configFiles: [],
  lab: { title: 'Practice Transactions', steps: [
    { step: 1, title: 'Start transaction', instruction: 'Begin and make changes', command: 'BEGIN; UPDATE users SET name = \'Test\' WHERE id = 1;' },
    { step: 2, title: 'Rollback', instruction: 'Undo changes', command: 'ROLLBACK; SELECT name FROM users WHERE id = 1;', expectedOutput: 'Original name (not Test)' },
    { step: 3, title: 'Commit', instruction: 'Make permanent', command: 'BEGIN; UPDATE users SET name = \'Committed\' WHERE id = 1; COMMIT;' },
  ]},
  commonErrors: [{ error: 'deadlock detected', fix: 'Always lock tables/rows in the same order across transactions. If transaction A locks row 1 then 2, and B locks 2 then 1, they deadlock. Standardize lock order.', rootCause: 'Two transactions each hold a lock the other needs. PostgreSQL detects this and kills one transaction. Retry the killed one.' }],
  quiz: [{ question: 'What does ACID stand for?', options: ['Atomic, Consistent, Isolated, Durable', 'Async, Cached, Indexed, Distributed', 'Atomic, Concurrent, Indexed, Durable', 'Auto, Commit, Isolate, Delete'], correctIndex: 0, explanation: 'ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (no interference), Durability (survives crashes). These are the guarantees transactions provide.' }],
  resources: [{ title: 'PostgreSQL Transactions', url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html', type: 'docs' }],
  whatToReadNext: 'Read about JSONB & Arrays (next lesson) — PostgreSQL-specific features.',
};

export const postgresqlL7: Lesson = {
  slug: 'jsonb-arrays', title: 'JSONB & Arrays — Store, Query, Index',
  subtitle: 'Use PostgreSQL JSONB for flexible data and arrays for lists',
  duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Store and query JSONB data','Index JSONB with GIN indexes','Use array columns (tags, categories)','Query arrays with ANY, @>, unnest','Choose between JSONB and normalized tables'],
  realWorldContext: 'JSONB is PostgreSQL killer feature. It lets you store flexible JSON data with query and index support. Companies like Supabase build their entire product on JSONB. Use for: user preferences, product attributes, event payloads. Arrays for tags and categories.',
  prerequisites: ['Completed PostgreSQL L1-L6'],
  conceptDiagram: `JSONB vs JSON:
  JSON: stored as text (slow queries, no indexing)
  JSONB: stored as binary (fast queries, indexable, GIN support)
  ALWAYS use JSONB, never JSON.

  JSONB OPERATORS:
  -> : get value by key (returns JSONB)
  ->> : get value as text
  @> : contains (jsonb contains another jsonb)
  ? : key exists

  ARRAY OPERATORS:
  = ANY(array) : value matches any element
  @> : array contains
  unnest() : expand array to rows`,
  conceptExplanation: ['JSONB stores JSON as binary. You can query inside it: WHERE attributes @> \'{"color":"red"}\'. Add GIN index for fast JSONB queries: CREATE INDEX USING GIN(attributes). This is unique to PostgreSQL — MySQL JSON is slower.','Arrays for lists of same-type values: tags TEXT[], categories TEXT[]. Query with WHERE \'python\' = ANY(tags) or WHERE tags @> ARRAY[\'python\']. Use unnest() to expand array to rows for JOINs.','Choose JSONB when: schema is flexible, varies per row, or is nested. Choose normalized tables when: data is structured, you need referential integrity, you query/join frequently.'],
  whyItMatters: 'JSONB eliminates the need for a separate NoSQL database (MongoDB). You get the flexibility of JSON with the ACID guarantees of PostgreSQL. GIN indexes make JSONB queries fast. This is why companies choose PostgreSQL over MongoDB.',
  codeExamples: [
    { filename: 'jsonb.sql', language: 'sql', approach: 'real-world', code: `-- Create table with JSONB
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    attributes JSONB NOT NULL DEFAULT '{}'
);

-- Insert with JSONB
INSERT INTO products (name, attributes) VALUES
    ('Laptop', '{"color":"silver","ram":16,"ssd":512,"ports":["usb-c","hdmi"]}'),
    ('Phone', '{"color":"black","ram":8,"storage":128}');

-- Query JSONB
SELECT name FROM products WHERE attributes->>'color' = 'silver';
SELECT name, attributes->'ram' AS ram FROM products;
SELECT name FROM products WHERE attributes @> '{"ram": 16}';  -- contains

-- GIN index for fast JSONB queries
CREATE INDEX idx_products_attrs ON products USING GIN(attributes);
-- Now: WHERE attributes @> '{"color":"silver"}' uses index (fast!)

-- Array column
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    tags TEXT[] DEFAULT '{}'
);

INSERT INTO posts (title, tags) VALUES ('Python Tips', ARRAY['python','tips']);
INSERT INTO posts (title, tags) VALUES ('Docker Guide', ARRAY['docker','devops']);

-- Query arrays
SELECT * FROM posts WHERE 'python' = ANY(tags);  -- has tag
SELECT * FROM posts WHERE tags @> ARRAY['python','tips'];  -- has both
SELECT tag FROM posts, unnest(tags) AS tag;  -- expand to rows
SELECT title, array_length(tags, 1) AS tag_count FROM posts;  -- count tags`, explanation: 'JSONB: store flexible JSON, query with ->>/@>, index with GIN. Arrays: TEXT[] for tags, query with ANY/@>/unnest. GIN index makes both fast.' },
  ],
  configFiles: [],
  lab: { title: 'Use JSONB and Arrays', steps: [
    { step: 1, title: 'Create table', instruction: 'Add JSONB column', command: 'CREATE TABLE products (id SERIAL PK, name VARCHAR(200), attrs JSONB);' },
    { step: 2, title: 'Insert JSONB', instruction: 'Add products with attributes', command: 'INSERT INTO products (name, attrs) VALUES (\'Laptop\', \'{"ram":16,"color":"silver"}\');' },
    { step: 3, title: 'Query JSONB', instruction: 'Filter by attribute', command: 'SELECT * FROM products WHERE attrs->>\'color\' = \'silver\';' },
    { step: 4, title: 'Add GIN index', instruction: 'Index for fast queries', command: 'CREATE INDEX idx_attrs ON products USING GIN(attrs);' },
  ]},
  commonErrors: [{ error: 'JSONB query is slow', fix: 'Add GIN index: CREATE INDEX idx_name ON table USING GIN(jsonb_column). Without GIN, every JSONB query does a Seq Scan.', rootCause: 'JSONB is not indexed by default. GIN index enables fast @> and ? queries.' }],
  quiz: [{ question: 'JSONB vs JSON in PostgreSQL?', options: ['Same', 'JSONB is binary (fast queries, indexable with GIN). JSON is text (slow). Always use JSONB.', 'JSON is better', 'No difference'], correctIndex: 1, explanation: 'JSONB stores as binary — supports indexing (GIN), faster queries. JSON stores as text — no indexing, slower. ALWAYS use JSONB.' }],
  resources: [{ title: 'PostgreSQL JSONB', url: 'https://www.postgresql.org/docs/current/datatype-json.html', type: 'docs' }],
  whatToReadNext: 'Read about Full-Text Search (next lesson) — tsvector, GIN, pg_trgm.',
};

// L8-L15 — real content
export const postgresqlL8: Lesson = {
  slug: 'full-text-search', title: 'Full-Text Search — tsvector, GIN, pg_trgm',
  subtitle: 'Build powerful search with PostgreSQL built-in full-text search',
  duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Create tsvector columns for full-text search','Use GIN index for fast text search','Use to_tsquery for complex search queries','Rank results with ts_rank','Use pg_trgm for fuzzy matching (typos)'],
  realWorldContext: 'Search is essential for every app: product search, article search, user search. PostgreSQL has built-in full-text search that rivals Elasticsearch for many use cases. Companies like GitLab use PostgreSQL FTS for code search.',
  prerequisites: ['Completed PostgreSQL L1-L7'],
  conceptDiagram: `FULL-TEXT SEARCH:
  tsvector: pre-processed text (stemmed, stopwords removed)
  tsquery: search query
  GIN index: fast text search

  CREATE INDEX idx_posts_search
    ON posts USING GIN(to_tsvector('english', title || ' ' || content));

  SELECT * FROM posts
  WHERE to_tsvector('english', content) @@ to_tsquery('python & web');`,
  conceptExplanation: ['tsvector converts text to searchable tokens: "running dogs" → "run" + "dog" (stemmed). Stopwords (the, a, is) removed. This makes searching smarter than LIKE.','tsquery is the search query: to_tsquery("python & web") = search for posts containing both "python" AND "web". Use | for OR, ! for NOT. @@ operator matches tsvector against tsquery.','GIN index on tsvector makes search fast. Without it, every search scans all rows. pg_trgm extension adds fuzzy matching (typos): "pythn" matches "python". Use for autocomplete.'],
  whyItMatters: 'Without FTS, you use LIKE "%search%" which scans every row (slow, no ranking). With FTS + GIN index, search is instant and ranked by relevance. This is how every search bar works.',
  codeExamples: [
    { filename: 'fts.sql', language: 'sql', approach: 'real-world', code: `-- Create search index
CREATE INDEX idx_posts_search
  ON posts USING GIN(to_tsvector('english', title || ' ' || content));

-- Search (find posts about Python AND web)
SELECT title, ts_rank(to_tsvector('english', content), query) AS rank
FROM posts, to_tsquery('english', 'python & web') AS query
WHERE to_tsvector('english', title || ' ' || content) @@ query
ORDER BY rank DESC
LIMIT 10;

-- Fuzzy matching with pg_trgm (handles typos)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_products_name_trgm ON products USING GIN(name gin_trgm_ops);

-- Find "laptop" even if user types "latop" (typo)
SELECT name, similarity(name, 'latop') AS sim
FROM products
WHERE name % 'latop'  -- trigram similarity match
ORDER BY sim DESC;

-- Autocomplete (prefix search)
SELECT name FROM products
WHERE name ILIKE 'lap%';  -- starts with "lap"`, explanation: 'Full-text search: tsvector + GIN index + @@ operator. Ranked by ts_rank. pg_trgm for fuzzy/typo matching. ILIKE for prefix/autocomplete.' },
  ],
  configFiles: [],
  lab: { title: 'Add Search', steps: [{ step: 1, title: 'Create index', instruction: 'Add GIN full-text index', command: 'CREATE INDEX idx_search ON posts USING GIN(to_tsvector(\'english\', title || \' \' || content));' }, { step: 2, title: 'Search', instruction: 'Query with @@', command: 'SELECT * FROM posts WHERE to_tsvector(\'english\', content) @@ to_tsquery(\'python\');' }] },
  commonErrors: [{ error: 'Full-text search slow', fix: 'Add GIN index on to_tsvector. Without GIN, every search scans all rows. CREATE INDEX USING GIN(to_tsvector(...)).', rootCause: 'No GIN index = Seq Scan on every search. GIN index enables instant search.' }],
  quiz: [{ question: 'What does tsvector do?', options: ['Stores timestamps', 'Converts text to searchable tokens (stemmed, stopwords removed)', 'Indexes JSON', 'Creates triggers'], correctIndex: 1, explanation: 'tsvector pre-processes text: "running dogs" → "run" "dog" (stemmed). Stopwords removed. This makes search smarter than LIKE.' }],
  resources: [{ title: 'PostgreSQL Full-Text Search', url: 'https://www.postgresql.org/docs/current/textsearch.html', type: 'docs' }],
  whatToReadNext: 'Read about Partitioning (next lesson) — range, list, hash.',
};

export const postgresqlL9: Lesson = {
  slug: 'partitioning', title: 'Table Partitioning — Range, List, Hash',
  subtitle: 'Handle billion-row tables with partitioning',
  duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Understand when to partition (10M+ rows)','Create range partitions (by date)','Create list partitions (by category)','Create hash partitions (by ID)','Use partition pruning for performance'],
  realWorldContext: 'Tables with billions of rows (logs, events, metrics) become slow to query and maintain. Partitioning splits a table into smaller physical tables. PostgreSQL handles this transparently — you query the parent table, PostgreSQL only scans relevant partitions. Used by every analytics company.',
  prerequisites: ['Completed PostgreSQL L1-L8'],
  conceptDiagram: `PARTITIONING:
  One logical table → many physical tables (partitions)
  Query parent → PostgreSQL only scans relevant partitions (pruning)

  RANGE (by date): logs_2024_01, logs_2024_02, ...
  LIST (by category): products_electronics, products_books, ...
  HASH (by ID): even distribution across N partitions

  WHEN: 10M+ rows, queries filter by partition key (date, category)`,
  conceptExplanation: ['Partitioning splits a large table into smaller tables. The parent table is virtual — data lives in partitions. When you query with WHERE date = "2024-01-15", PostgreSQL only scans the January partition (partition pruning). This makes queries 100x faster on billion-row tables.','Range partitioning by date is most common: one partition per month/day. Old partitions can be archived or dropped without affecting the rest. This is how time-series data is managed.','Hash partitioning distributes rows evenly across N partitions by hashing a key. Use when there is no natural range (e.g., distribute users by user_id). List partitioning by category: electronics, books, etc.'],
  whyItMatters: 'A 1-billion-row log table is slow to query, vacuum, and backup. Partitioned by month, each partition is ~80M rows — manageable. You can drop old partitions instantly (DROP TABLE logs_2023_01) instead of slow DELETE. This is essential for large-scale apps.',
  codeExamples: [
    { filename: 'partitioning.sql', language: 'sql', approach: 'real-world', code: `-- Range partitioning by date
CREATE TABLE logs (
    id BIGSERIAL,
    created_at TIMESTAMP NOT NULL,
    level VARCHAR(10),
    message TEXT
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE logs_2024_01 PARTITION OF logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE logs_2024_02 PARTITION OF logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Insert goes to correct partition automatically
INSERT INTO logs (created_at, level, message)
VALUES ('2024-01-15', 'INFO', 'User logged in');
-- → stored in logs_2024_01

-- Query with pruning (only scans January partition!)
SELECT * FROM logs WHERE created_at >= '2024-01-01' AND created_at < '2024-02-01';
-- Only scans logs_2024_01, not all partitions

-- Drop old partition (instant — no DELETE, no VACUUM)
DROP TABLE logs_2023_01;

-- Automate with pg_partman (auto-creates future partitions)
-- CREATE EXTENSION pg_partman;
-- SELECT partman.create_parent('public.logs', 'created_at', 'native', 'monthly');`, explanation: 'Range partition by date. Insert auto-routes to correct partition. Query with date filter = partition pruning (only scans relevant partition). Drop old partitions instantly.' },
  ],
  configFiles: [],
  lab: { title: 'Partition a Table', steps: [{ step: 1, title: 'Create partitioned table', instruction: 'Create with RANGE partitioning', command: 'CREATE TABLE logs (id BIGSERIAL, created_at TIMESTAMP NOT NULL, msg TEXT) PARTITION BY RANGE(created_at);' }, { step: 2, title: 'Add partitions', instruction: 'Create monthly partitions', command: 'CREATE TABLE logs_2024_01 PARTITION OF logs FOR VALUES FROM (\'2024-01-01\') TO (\'2024-02-01\');' }, { step: 3, title: 'Insert and verify', instruction: 'Insert and check pruning', command: 'INSERT INTO logs (created_at, msg) VALUES (\'2024-01-15\', \'test\'); EXPLAIN SELECT * FROM logs WHERE created_at >= \'2024-01-01\';', expectedOutput: 'Only scans logs_2024_01 (pruning!)' }] },
  commonErrors: [{ error: 'no partition found for row', fix: 'Create a default partition or ensure all possible values are covered: CREATE TABLE logs_default PARTITION OF logs DEFAULT.', rootCause: 'Insert with a date outside all partition ranges. Add DEFAULT partition or create future partitions.' }],
  quiz: [{ question: 'What is partition pruning?', options: ['Deletes old data', 'PostgreSQL only scans relevant partitions based on WHERE clause (skips others)', 'Compresses data', 'Creates indexes'], correctIndex: 1, explanation: 'When you query with WHERE date = X, PostgreSQL knows which partition contains that date and only scans that one. Other partitions are skipped (pruned). This makes queries 100x faster.' }],
  resources: [{ title: 'PostgreSQL Partitioning', url: 'https://www.postgresql.org/docs/current/ddl-partitioning.html', type: 'docs' }, { title: 'pg_partman', url: 'https://github.com/pgpartman/pg_partman', type: 'tool', isHiddenGem: true }],
  whatToReadNext: 'Read about Alembic Migrations (next lesson) — version control for your schema.',
};

export const postgresqlL10: Lesson = {
  slug: 'alembic', title: 'Alembic Migrations — Autogenerate, Upgrade, Downgrade',
  subtitle: 'Version control your database schema',
  duration: 70, difficulty: 'Intermediate', phase: 'Real-World', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Initialize Alembic and configure for async SQLAlchemy','Run alembic revision --autogenerate','Apply migrations with alembic upgrade head','Roll back with alembic downgrade','Review autogenerated migrations (they are not perfect)'],
  realWorldContext: 'Every production database evolves: new tables, new columns, index changes. Without migrations, you manually run SQL on each environment — error-prone and unrepeatable. Alembic (used by SQLAlchemy, FastAPI) version-controls your schema. Every team uses it.',
  prerequisites: ['Completed PostgreSQL L1-L9','SQLAlchemy knowledge'],
  conceptDiagram: `ALEMBIC FLOW:
  1. Change SQLAlchemy models (add column, new table)
  2. alembic revision --autogenerate -m "add email column"
  3. REVIEW generated migration (autogenerate is not perfect!)
  4. alembic upgrade head (apply to database)
  5. If wrong: alembic downgrade -1 (roll back)

  VERSIONS:
  abc123 (add email) → def456 (add orders table) → ghi789 (add index)
  upgrade head → applies all
  downgrade -1 → rolls back last migration`,
  conceptExplanation: ['Alembic compares your SQLAlchemy models to the current database schema and generates a migration script. The script has upgrade() (apply) and downgrade() (rollback) functions. Always review — autogenerate misses renames and constraint changes.','Run alembic upgrade head in your CI/CD pipeline before deploying new code. This ensures the database schema matches the code version. Never use Base.metadata.create_all() in production — always use migrations.','Every migration is a Python file in alembic/versions/. It is committed to git. This means your schema changes are version-controlled, reviewable, and reproducible across environments.'],
  whyItMatters: 'Without migrations, schema changes are ad-hoc and error-prone. With migrations, every change is versioned, reviewed, and reversible. If a migration breaks something, you downgrade. This is how production databases are managed safely.',
  codeExamples: [
    { filename: 'migration.py', language: 'python', approach: 'real-world', code: `# alembic/versions/abc123_add_email_index.py
"""add email index to users

Revision ID: abc123
Revises: def456
"""
from alembic import op
import sqlalchemy as sa

revision = "abc123"
down_revision = "def456"

def upgrade():
    # Add index
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    # Add column
    op.add_column("users", sa.Column("bio", sa.Text(), nullable=True))
    # Create table
    op.create_table(
        "tags",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(50), unique=True),
    )

def downgrade():
    # Reverse of upgrade (must be safe to run)
    op.drop_table("tags")
    op.drop_column("users", "bio")
    op.drop_index("ix_users_email", table_name="users")

# Commands:
# alembic revision --autogenerate -m "add email index"
# alembic upgrade head
# alembic downgrade -1
# alembic history
# alembic current`, explanation: 'Migration has upgrade() and downgrade(). op.create_index, op.add_column, op.create_table, op.drop_*. Always implement both directions.' },
  ],
  configFiles: [{ filename: 'alembic.ini', language: 'ini', content: '[alembic]\nscript_location = alembic\nsqlalchemy.url = postgresql+asyncpg://user:pass@localhost/db', comment: 'Point Alembic to your database' }],
  lab: { title: 'Run Your First Migration', steps: [
    { step: 1, title: 'Init Alembic', instruction: 'Initialize Alembic', command: 'alembic init alembic' },
    { step: 2, title: 'Configure', instruction: 'Set database URL', command: 'Edit alembic.ini and alembic/env.py to import your models' },
    { step: 3, title: 'Generate migration', instruction: 'Create first migration', command: 'alembic revision --autogenerate -m "create tables"' },
    { step: 4, title: 'Apply', instruction: 'Run migration', command: 'alembic upgrade head', verification: 'Tables created in database' },
  ]},
  commonErrors: [{ error: 'autogenerate misses column rename', fix: 'Autogenerate sees rename as drop+add (loses data). Manually edit migration to use op.alter_column with new_column_name. Always review generated migrations!', rootCause: 'Autogenerate compares column names, not data. A rename looks like drop old + add new. It cannot detect renames.' }],
  quiz: [{ question: 'Why always review autogenerated migrations?', options: ['They are slow', 'Autogenerate misses renames, constraint changes, and data migrations. It only detects add/remove.', 'Required by law', 'They have bugs'], correctIndex: 1, explanation: 'Autogenerate detects added/removed tables, columns, indexes. It MISSES: column renames (shows as drop+add = data loss), default values, check constraints. Always review.' }],
  resources: [{ title: 'Alembic Documentation', url: 'https://alembic.sqlalchemy.org/', type: 'docs' }],
  whatToReadNext: 'Read about Seeds & Test Databases (next lesson).',
};

// L11-L15 — real content
export const postgresqlL11: Lesson = {
  slug: 'seeds-testing', title: 'Seeds & Test Databases — Fixtures, Factories',
  subtitle: 'Set up test data and test databases',
  duration: 60, difficulty: 'Intermediate', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql',
  objectives: ['Create seed data for development','Set up isolated test database','Use factory_boy for test data generation','Clean tables between tests','Run migrations on test database'],
  realWorldContext: 'Development needs realistic data to test features. Tests need isolated databases. Without seeds, every developer manually creates data. Without test databases, tests pollute production data. Every team sets this up on day one.',
  prerequisites: ['Completed PostgreSQL L1-L10'],
  conceptDiagram: `SEEDS:
  scripts/seed.py → inserts realistic data (users, posts, products)
  Run: python scripts/seed.py

  TEST DB:
  Separate database (test_db) for tests
  Each test gets clean tables (truncate before/after)
  Fixtures: reusable test data (sample_user, sample_post)`,
  conceptExplanation: ['Seeds insert realistic data for development: 100 users, 500 posts, 50 products. Run once after migrations. Developers get a working app immediately — no manual data entry.','Test database: separate database for tests (test_myapp). Before each test, truncate all tables. This ensures tests are isolated — one test does not affect another. Use in-memory SQLite for speed, or testcontainers for real PostgreSQL.','factory_boy generates test data: UserFactory.create() creates a user with random data. Override specific fields: UserFactory.create(name="Alice"). Eliminates repetitive test data setup.'],
  whyItMatters: 'Without seeds, every developer wastes time creating data manually. Without test isolation, tests fail randomly (one test affects another). Without factories, test data is repetitive and fragile. This setup saves hours every week.',
  codeExamples: [
    { filename: 'seed.py', language: 'python', approach: 'real-world', code: `# scripts/seed.py
import asyncio
from blog.db.base import async_session, engine, Base
from blog.models import User, Post
from blog.core.security import hash_password

async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        # Create 10 users
        for i in range(10):
            db.add(User(
                email=f"user{i}@test.com",
                name=f"User {i}",
                hashed_password=hash_password("password123"),
            ))
        await db.commit()

        # Create 50 posts
        for i in range(50):
            db.add(Post(
                title=f"Post {i}",
                content=f"Content for post {i}",
                author_id=(i % 10) + 1,
                published=True,
            ))
        await db.commit()

    print("Seed data created!")

asyncio.run(seed())`, explanation: 'Seed script: creates realistic data (10 users, 50 posts). Run after migrations. Developers get a working app immediately.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up Seeds and Test DB', steps: [{ step: 1, title: 'Create seed script', instruction: 'Write seed.py', command: 'Create scripts/seed.py that inserts test data' }, { step: 2, title: 'Run seed', instruction: 'Populate dev database', command: 'python scripts/seed.py' }, { step: 3, title: 'Set up test DB', instruction: 'Create test conftest', command: 'Create tests/conftest.py with clean_db fixture' }] },
  commonErrors: [{ error: 'Tests fail randomly (shared state)', fix: 'Add autouse fixture that truncates all tables before each test. Each test must be independent — no shared state.', rootCause: 'Tests share database state. One test inserts data, another test sees it and fails. Truncate before each test.' }],
  quiz: [{ question: 'Why use a separate test database?', options: ['Faster', 'Isolation — tests do not pollute dev/prod data', 'Required', 'Less memory'], correctIndex: 1, explanation: 'Separate test database ensures tests do not affect dev/production data. Each test gets clean tables. Tests can create/delete without consequences.' }],
  resources: [{ title: 'factory_boy', url: 'https://factoryboy.readthedocs.io/', type: 'docs' }],
  whatToReadNext: 'Read about PgBouncer (next lesson) — connection pooling.',
};

export const postgresqlL12: Lesson = {
  slug: 'pgbouncer', title: 'PgBouncer — Connection Pooling in Production',
  subtitle: 'Pool database connections for high concurrency',
  duration: 55, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql',
  objectives: ['Understand why connection pooling is needed','Install and configure PgBouncer','Choose pool mode (session, transaction, statement)','Configure pool size and timeouts','Monitor PgBouncer stats'],
  realWorldContext: 'PostgreSQL connections are expensive (each = a fork process). With 1000 concurrent users, you run out of connections. PgBouncer pools connections — 1000 users share 20 database connections. Used by every high-traffic PostgreSQL deployment (Supabase, Heroku, AWS RDS).',
  prerequisites: ['Completed PostgreSQL L1-L11'],
  conceptDiagram: `WITHOUT PgBouncer:
  1000 clients → 1000 PostgreSQL connections → server crashes (max_connections)

  WITH PgBouncer:
  1000 clients → PgBouncer → 20 PostgreSQL connections → server happy

  POOL MODES:
  session: one DB connection per client session (safe, fewer connections saved)
  transaction: connection per transaction (most efficient, recommended)
  statement: connection per statement (no transactions, rarely used)`,
  conceptExplanation: ['PostgreSQL forks a process per connection (heavy). Default max_connections=100. With 1000 users, you hit the limit. PgBouncer sits between app and DB — maintains a small pool of real connections, multiplexes client connections.','Transaction mode (recommended): connection is borrowed for the duration of a transaction, then returned to pool. 1000 clients can share 20 connections. Downside: session-level features (SET, LISTEN) do not work.','PgBouncer is a single binary. Install, configure pool_mode=transaction, default_pool_size=20. Point your app at PgBouncer (port 6432) instead of PostgreSQL (port 5432). That is it.'],
  whyItMatters: 'Without PgBouncer, your database crashes at 100 concurrent connections. With it, 1000 users share 20 connections. Every cloud provider (Supabase, Heroku, RDS) runs PgBouncer by default. If you manage PostgreSQL, you need PgBouncer.',
  codeExamples: [
    { filename: 'pgbouncer.ini', language: 'ini', approach: 'production', code: `[databases]
mydb = host=127.0.0.1 port=5432 dbname=mydb

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt

pool_mode = transaction    ; recommended (connection per transaction)
default_pool_size = 20     ; 20 real DB connections
max_client_conn = 1000     ; 1000 clients can connect
reserve_pool_size = 5      ; extra connections under load
server_idle_timeout = 600  ; close idle connections after 10 min

; Stats
admin_users = postgres
stats_period = 60`,
    explanation: 'PgBouncer config: transaction mode (most efficient), 20 DB connections shared by 1000 clients. Point app to port 6432.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up PgBouncer', steps: [{ step: 1, title: 'Install', instruction: 'Install PgBouncer', command: 'apt install pgbouncer (or docker run edoburu/pgbouncer)' }, { step: 2, title: 'Configure', instruction: 'Create pgbouncer.ini', command: 'Set pool_mode=transaction, default_pool_size=20' }, { step: 3, title: 'Connect app', instruction: 'Point app to PgBouncer', command: 'Change DATABASE_URL port from 5432 to 6432', verification: 'App works through PgBouncer' }] },
  commonErrors: [{ error: 'prepared statement does not exist', fix: 'PgBouncer transaction mode does not support prepared statements. Use pool_mode=session (less efficient) or disable prepared statements in your driver.', rootCause: 'Transaction mode resets session state between transactions. Prepared statements are session-level and get lost.' }],
  quiz: [{ question: 'Why use PgBouncer?', options: ['Faster queries', 'Pool DB connections — 1000 clients share 20 connections (prevents connection exhaustion)', 'Required by PostgreSQL', 'For security'], correctIndex: 1, explanation: 'PostgreSQL forks a process per connection (expensive). With 1000 users, you hit max_connections. PgBouncer multiplexes — 1000 clients share 20 real connections.' }],
  resources: [{ title: 'PgBouncer', url: 'https://www.pgbouncer.org/', type: 'docs' }],
  whatToReadNext: 'Read about Backup & Recovery (next lesson).',
};

export const postgresqlL13: Lesson = {
  slug: 'backup-recovery', title: 'Backup & Recovery — pg_dump, PITR, Replication',
  subtitle: 'Protect your data with backups and replication',
  duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'postgresql',
  objectives: ['Create logical backups with pg_dump','Set up continuous archiving (WAL) for PITR','Configure streaming replication','Understand RPO and RTO','Automate backups with cron or scripts'],
  realWorldContext: 'Data loss is the worst thing that can happen to a company. Without backups, a single disk failure destroys everything. GitHub had a 24-hour outage in 2018 due to backup failures. Every production database must have: daily backups, continuous WAL archiving, and tested recovery procedures.',
  prerequisites: ['Completed PostgreSQL L1-L12'],
  conceptDiagram: `BACKUP TYPES:
  pg_dump: logical backup (SQL statements to recreate data)
    Pros: portable, selective. Cons: slow for large DBs.

  pg_basebackup: physical backup (binary copy of data files)
    Pros: fast, supports PITR. Cons: same architecture required.

  PITR (Point-in-Time Recovery): restore to ANY point in time
    Uses WAL (Write-Ahead Log) archives.
    "Restore to 2:30 PM yesterday before the bad UPDATE"

  REPLICATION:
  Primary → Replica (streaming replication)
  Read queries on replica, writes on primary`,
  conceptExplanation: ['pg_dump creates a SQL file that can recreate the database. Good for small databases, migrations, and selective dumps. For large databases, use pg_basebackup (binary, faster).','PITR (Point-in-Time Recovery) uses WAL (Write-Ahead Log). Every change is logged to WAL files. If you archive WAL files, you can restore to ANY point in time: "restore to 2:30 PM, before the accidental DROP TABLE." This is the gold standard.','Streaming replication: primary sends WAL to replica in real-time. Replica can serve read queries (load balancing). If primary fails, promote replica to primary (failover). This is how high availability works.'],
  whyItMatters: 'Without backups, you are one disk failure away from bankruptcy. Without PITR, you cannot undo a bad UPDATE or DROP. Without replication, a server failure = downtime. These are non-negotiable for production.',
  codeExamples: [
    { filename: 'backup.sh', language: 'bash', approach: 'real-world', code: `# Logical backup (pg_dump)
pg_dump -h localhost -U postgres mydb > backup.sql
pg_dump -h localhost -U postgres mydb -Fc > backup.dump  # compressed
# Restore: psql < backup.sql  OR  pg_restore backup.dump

# Automated daily backup (cron)
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump -Fc -h localhost -U postgres mydb > /backups/mydb_$DATE.dump
# Keep last 30 days
find /backups -name "mydb_*.dump" -mtime +30 -delete

# Cron: every night at 2 AM
# 0 2 * * * /scripts/backup.sh

# PITR setup (postgresql.conf)
# archive_mode = on
# archive_command = 'cp %p /archive/%f'
# wal_level = replica

# Restore to specific time (recovery.conf)
# restore_command = 'cp /archive/%f %p'
# recovery_target_time = '2024-01-15 14:30:00'`,
    explanation: 'pg_dump for logical backups. Cron for automation. PITR with WAL archiving for point-in-time recovery. recovery_target_time to restore to specific moment.' },
  ],
  configFiles: [],
  lab: { title: 'Create and Restore Backup', steps: [{ step: 1, title: 'Backup', instruction: 'Create pg_dump backup', command: 'pg_dump -h localhost -U postgres mydb > backup.sql' }, { step: 2, title: 'Restore', instruction: 'Restore from backup', command: 'psql -h localhost -U postgres mydb_restored < backup.sql' }, { step: 3, title: 'Verify', instruction: 'Check data', command: 'psql -c "SELECT COUNT(*) FROM users;" mydb_restored', verification: 'Same count as original' }] },
  commonErrors: [{ error: 'Cannot restore — version mismatch', fix: 'Use pg_dump from the SAME or NEWER version as the target. Cannot restore a newer pg_dump into an older PostgreSQL.', rootCause: 'pg_dump generates SQL for specific PostgreSQL version. Newer versions may use features not in older versions.' }],
  quiz: [{ question: 'What is PITR?', options: ['A backup type', 'Point-in-Time Recovery — restore to ANY moment using WAL archives', 'A replication method', 'A compression algorithm'], correctIndex: 1, explanation: 'PITR uses WAL (Write-Ahead Log) archives to restore to any point in time. "Restore to 2:30 PM before the bad UPDATE." This requires continuous WAL archiving.' }],
  resources: [{ title: 'PostgreSQL Backup', url: 'https://www.postgresql.org/docs/current/backup.html', type: 'docs' }],
  whatToReadNext: 'Read about Security (next lesson) — roles, grants, RLS.',
};

export const postgresqlL14: Lesson = {
  slug: 'security', title: 'Security — Roles, Grants, RLS, Encryption',
  subtitle: 'Secure your PostgreSQL database',
  duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql',
  objectives: ['Create roles with specific permissions','Grant/REVOKE table and column permissions','Set up Row-Level Security (RLS)','Encrypt sensitive columns (pgcrypto)','Use SSL for connections'],
  realWorldContext: 'A database breach exposes all user data. Equifax breach exposed 147M people because of unpatched software. Security is not optional. RLS (Row-Level Security) ensures users only see their own data — used by every multi-tenant SaaS.',
  prerequisites: ['Completed PostgreSQL L1-L13'],
  conceptDiagram: `SECURITY LAYERS:
  1. Roles & Grants: who can access what (CREATE ROLE, GRANT SELECT)
  2. RLS: row-level security (users only see their own rows)
  3. Encryption: pgcrypto for sensitive data (SSN, credit cards)
  4. SSL: encrypted connections (prevent MITM)
  5. pg_hba.conf: IP-based access control`,
  conceptExplanation: ['Roles are users or groups. Grant specific permissions: GRANT SELECT ON users TO readonly. Revoke: REVOKE DELETE ON users FROM app_user. Principle of least privilege — give minimum permissions needed.','RLS (Row-Level Security) adds policies: users only see rows where user_id = current_user. This is how multi-tenant apps work — every tenant only sees their own data. No application code needed — enforced at database level.','pgcrypto encrypts sensitive data: SELECT encrypt(data, key, aes). The data is encrypted at rest — even if someone steals the disk, they cannot read it without the key. Use for SSN, credit card numbers, medical records.'],
  whyItMatters: 'Without proper roles, every app has full database access (DROP TABLE). Without RLS, a bug in your query can leak other users data. Without encryption, a disk theft exposes everything. Security is the most important aspect of production databases.',
  codeExamples: [
    { filename: 'security.sql', language: 'sql', approach: 'real-world', code: `-- Create roles
CREATE ROLE readonly;
CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_pass';

-- Grant permissions (least privilege)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
GRANT SELECT, INSERT, UPDATE ON users TO app_user;
REVOKE DELETE ON users FROM app_user;  -- cannot delete!

-- Row-Level Security (users only see their own data)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_posts ON posts
    FOR SELECT
    USING (author_id = current_setting('app.user_id')::int);
-- User 42 only sees posts WHERE author_id = 42

-- Encrypt sensitive data (pgcrypto)
CREATE EXTENSION pgcrypto;
INSERT INTO users (email, ssn)
VALUES ('alice@x.com', encrypt('123-45-6789', 'secret_key', 'aes'));
-- SSN is encrypted in database — disk theft = unreadable

-- SSL connections (postgresql.conf)
-- ssl = on
-- ssl_cert_file = 'server.crt'
-- ssl_key_file = 'server.key'`,
    explanation: 'Roles with least privilege. RLS for multi-tenant (users only see own data). pgcrypto for encryption at rest. SSL for encrypted connections.' },
  ],
  configFiles: [],
  lab: { title: 'Secure Your Database', steps: [{ step: 1, title: 'Create roles', instruction: 'Set up roles', command: 'CREATE ROLE readonly; GRANT SELECT ON users TO readonly;' }, { step: 2, title: 'Enable RLS', instruction: 'Row-level security', command: 'ALTER TABLE posts ENABLE ROW LEVEL SECURITY; CREATE POLICY user_posts ON posts FOR SELECT USING (author_id = 1);' }] },
  commonErrors: [{ error: 'permission denied for table', fix: 'Grant permissions: GRANT SELECT ON table_name TO role_name. Check current user: SELECT current_user.', rootCause: 'User does not have permission for the operation. Grant specific permissions per role.' }],
  quiz: [{ question: 'What does RLS (Row-Level Security) do?', options: ['Encrypts rows', 'Users only see rows matching a policy (e.g., their own data) — enforced at DB level', 'Adds indexes', 'Compresses data'], correctIndex: 1, explanation: 'RLS adds policies that filter rows automatically. Users only see rows where the policy returns true. Multi-tenant apps use RLS so tenants never see each others data.' }],
  resources: [{ title: 'PostgreSQL Security', url: 'https://www.postgresql.org/docs/current/security.html', type: 'docs' }],
  whatToReadNext: 'Read about Monitoring (next lesson) — pg_stat, slow queries, vacuum.',
};

export const postgresqlL15: Lesson = {
  slug: 'monitoring', title: 'Monitoring — pg_stat, slow queries, vacuum',
  subtitle: 'Monitor PostgreSQL health and performance',
  duration: 55, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'postgresql',
  objectives: ['Use pg_stat_activity to see active queries','Find slow queries with pg_stat_statements','Monitor VACUUM and bloat','Set up alerts for connections and disk space','Use pg_stat_user_tables for table statistics'],
  realWorldContext: 'Without monitoring, you do not know your database is slow until users complain. pg_stat_statements shows the slowest queries. pg_stat_activity shows what is running RIGHT NOW. VACUUM monitoring prevents bloat. Every DBA monitors these daily.',
  prerequisites: ['Completed PostgreSQL L1-L14'],
  conceptDiagram: `MONITORING QUERIES:
  pg_stat_activity: what queries are running NOW
  pg_stat_statements: slowest queries over time
  pg_stat_user_tables: table stats (seq_scan, index_scan)
  pg_stat_database: database-level stats (connections, transactions)
  VACUUM: reclaim space from deleted rows (prevents bloat)`,
  conceptExplanation: ['pg_stat_activity shows every active query: who is running it, how long, what state (active, idle, waiting). Use to find long-running queries and blocked transactions. Kill with pg_terminate_backend(pid).','pg_stat_statements tracks every query: total time, calls, average time. Find the slowest queries: ORDER BY mean_exec_time DESC. This is the #1 performance debugging tool — install the extension and start tracking.','VACUUM reclaims space from DELETEd/UPDATEd rows. PostgreSQL does not immediately remove old data (MVCC). Without VACUUM, tables bloat (wasted disk, slower scans). Monitor with pg_stat_user_tables — look for last_vacuum and n_dead_tup.'],
  whyItMatters: 'Without monitoring, you are blind. You do not know which queries are slow, which tables are bloated, or when you will run out of connections. Monitoring is how you catch problems before users do.',
  codeExamples: [
    { filename: 'monitoring.sql', language: 'sql', approach: 'real-world', code: `-- What is running RIGHT NOW?
SELECT pid, usename, state, query, query_start,
       now() - query_start AS duration
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- Kill a long-running query
SELECT pg_terminate_backend(12345);  -- pid from above

-- Top 10 slowest queries (requires pg_stat_statements extension)
CREATE EXTENSION pg_stat_statements;
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Table bloat (dead tuples)
SELECT relname, n_live_tup, n_dead_tup,
       last_vacuum, last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 10000
ORDER BY n_dead_tup DESC;

-- Connection count
SELECT count(*), state FROM pg_stat_activity GROUP BY state;

-- Database size
SELECT pg_size_pretty(pg_database_size('mydb'));

-- Table sizes (find biggest)
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC
LIMIT 10;`,
    explanation: 'pg_stat_activity: running queries. pg_stat_statements: slowest queries. n_dead_tup: bloat (needs VACUUM). Connection count: prevent exhaustion. Table sizes: find biggest.' },
  ],
  configFiles: [],
  lab: { title: 'Monitor Your Database', steps: [{ step: 1, title: 'See active queries', instruction: 'Check pg_stat_activity', command: 'SELECT pid, state, query, now()-query_start AS duration FROM pg_stat_activity WHERE state != \'idle\';' }, { step: 2, title: 'Find slow queries', instruction: 'Enable pg_stat_statements', command: 'CREATE EXTENSION pg_stat_statements; SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 5;' }, { step: 3, title: 'Check bloat', instruction: 'Dead tuples', command: 'SELECT relname, n_dead_tup FROM pg_stat_user_tables WHERE n_dead_tup > 0;' }] },
  commonErrors: [{ error: 'pg_stat_statements not found', fix: 'Add to shared_preload_libraries in postgresql.conf: shared_preload_libraries = pg_stat_statements. Restart PostgreSQL.', rootCause: 'pg_stat_statements must be loaded at server start (shared_preload_libraries), not just CREATE EXTENSION.' }],
  quiz: [{ question: 'What does pg_stat_activity show?', options: ['Historical queries', 'Queries running RIGHT NOW (who, what, how long)', 'Table sizes', 'Index usage'], correctIndex: 1, explanation: 'pg_stat_activity shows currently active queries: pid, user, state, query text, duration. Use to find long-running or blocked queries. Kill with pg_terminate_backend(pid).' }],
  resources: [{ title: 'PostgreSQL Monitoring', url: 'https://www.postgresql.org/docs/current/monitoring.html', type: 'docs' }, { title: 'pg_stat_statements', url: 'https://www.postgresql.org/docs/current/pgstatstatements.html', type: 'docs' }],
  whatToReadNext: 'Congratulations! You completed the PostgreSQL module. Move to Docker or ML.',
};
