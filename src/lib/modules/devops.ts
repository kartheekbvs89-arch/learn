import { Module } from '../types';

export const devopsModule: Module = {
  id: 'devops',
  title: 'DevOps & Tools',
  icon: '🚀',
  color: '#181717',
  gradient: 'linear-gradient(135deg, #6e5494 0%, #f34f29 100%)',
  description: 'Git, GitHub Actions CI/CD, Redis caching, Celery async tasks, testing with pytest. The essential tools for production Python development.',
  learningPath: {
    title: 'Complete Learning Path',
    description: 'Master this technology from basics to production.',
    phases: [
      {
        name: 'Foundation',
        description: 'Core concepts and basics',
        outcomes: ['Understand fundamentals', 'Write basic code', 'Set up environment'],
      },
      {
        name: 'Intermediate',
        description: 'Practical patterns and techniques',
        outcomes: ['Build real features', 'Handle common scenarios', 'Apply best practices'],
      },
      {
        name: 'Advanced',
        description: 'Performance, security, scaling',
        outcomes: ['Optimize performance', 'Handle edge cases', 'Production-ready code'],
      },
      {
        name: 'Real-World',
        description: 'Production deployment and integration',
        outcomes: ['Deploy to production', 'Integrate with other systems', 'Debug real issues'],
      },
    ],
  },
  level: 'Intermediate',
  lessons: [
    {
      id: 'do-01',
      title: 'Git & GitHub - Version Control',
      subtitle: 'Commits, branches, merge, rebase, pull requests',
      duration: 50,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Git is a distributed version control system created by Linus Torvalds in 2005. It tracks changes to files over time, lets you branch and merge work, and collaborate with others. GitHub/GitLab/Bitbucket are hosting services that add collaboration features (PRs, issues, CI/CD).',
        'The core workflow: edit files, `git add` to stage, `git commit -m "msg"` to save snapshot, `git push` to upload to remote. Branches let you work in isolation - `git checkout -b feature` creates and switches to a new branch. Merge with `git merge` or via Pull Request.',
        'A good commit message: imperative mood ("Add login page" not "Added"), short subject (<50 chars), blank line, detailed body (wrap at 72). One logical change per commit. Use conventional commits: feat:, fix:, docs:, refactor:, test:, chore:.',
        'Rebase vs merge: merge preserves history (creates merge commit), rebase replays your commits on top of another branch (linear history). Use rebase for cleaning up local branches before pushing. NEVER rebase commits that have been pushed/shared!'
      ],
      codeExamples: [
        {
          filename: 'git_workflow.sh',
          language: 'bash',
          code: '# Initial setup\ngit config --global user.name "Your Name"\ngit config --global user.email "you@example.com"\ngit config --global init.defaultBranch main\n\n# Start a new project\ngit init\ngh repo create myproject --public --source=. --push  # GitHub CLI\n\n# Daily workflow\ngit status                    # see what changed\ngit diff                      # see unstaged changes\ngit diff --staged             # see staged changes\ngit add file.py               # stage one file\ngit add .                     # stage everything\ngit add -p                    # stage hunks interactively\ngit commit -m "Add user login"\ngit push\n\n# Branching\ngit branch                    # list branches\ngit checkout -b feature/auth  # create + switch\ngit switch main               # switch (modern)\ngit merge feature/auth        # merge into current\ngit branch -d feature/auth    # delete (safe)\ngit branch -D feature/auth    # delete (force)\n\n# Syncing with remotegit pull                       # fetch + merge\ngit pull --rebase             # fetch + rebase (cleaner)\ngit fetch                     # download without merging\ngit push                      # upload\ngit push -u origin main       # set upstream\n\n# Undoing\ngit restore file.py           # discard unstaged changes\ngit restore --staged file.py  # unstage\ngit reset --soft HEAD~1       # undo last commit, keep changes\ngit reset --hard HEAD~1       # undo last commit, discard changes\n\ngit revert <commit>           # create commit that undoes <commit>\n\n# Viewing history\ngit log --oneline --graph --all\ngit log --author="Alice"\ngit log --since="2 weeks ago"\ngit blame file.py             # who changed each line\ngit show <commit>             # see what a commit did',
          explanation: 'Daily workflow: status, add, commit, push. Branch with checkout -b, merge or PR. Use restore to undo. Never reset --hard shared commits!'
        },
        {
          filename: 'git_advanced.sh',
          language: 'bash',
          code: '# Rebase - replay your commits on top of another branch\ngit checkout feature\ngit rebase main  # feature commits now on top of main\n# If conflicts:\n#   fix files, git add, git rebase --continue\n#   OR git rebase --abort\n\n# Interactive rebase - clean up history\ngit rebase -i HEAD~5  # edit last 5 commits\n# Options:\n#   pick - keep as is\n#   reword - change message\n#   squash - combine with previous\n#   drop - remove\n#   edit - pause and modify\n\n# Stash - save work without committing\ngit stash                     # save + clean working dir\ngit stash push -m "WIP auth"  # with message\ngit stash list                # see all stashes\ngit stash pop                 # apply most recent + remove\ngit stash apply               # apply but keep\n\n# Cherry-pick - apply a specific commit\ngit cherry-pick <commit-hash>\n\n# Tags - mark releases\ngit tag v1.0.0\ngit tag -a v1.0.0 -m "Release 1.0"\ngit push origin v1.0.0\ngit push --tags  # push all tags\n\n# Bisect - find which commit introduced a bug\ngit bisect start\ngit bisect bad                 # current is broken\ngit bisect good v1.0.0         # v1.0.0 works\ngit bisect good/bad            # mark each tested commit\ngit bisect reset               # when done\n\n# Reflog - recover deleted commits/branches\ngit reflog                     # see all HEAD changes\ngit checkout HEAD@{5}          # go back in time\n\n# Submodules - embed another repo\ngit submodule add https://github.com/user/repo.git\ngit submodule update --init --recursive',
          explanation: 'Rebase for clean linear history. Stash to save WIP. Cherry-pick to apply specific commits. Bisect to find bugs. Reflog to recover. NEVER rebase shared commits!'
        },
      ],
      exercises: [
        {
          prompt: 'You started work on a feature, then realized you are on main. Move your uncommitted changes to a new branch without losing them.',
          starterCode: '# you are on main with changes\n',
          hint: 'Just create a new branch - uncommitted changes come with you.',
          solution: '# Git is smart - uncommitted changes follow you to a new branch\ngit checkout -b feature/my-work\n# Your changes are now on the new branch\ngit add .\ngit commit -m "Start my feature"',
          solutionLanguage: 'bash'
        },
      ],
      quiz: [
        {
          question: 'What is the difference between git reset --soft and --hard?',
          options: ['No difference', 'soft keeps changes in working dir, hard discards them', 'soft is faster', 'hard is safer'],
          correctIndex: 1,
          explanation: 'reset --soft undoes the commit but keeps changes staged. reset --hard discards everything - dangerous!'
        },
        {
          question: 'When should you NOT use git rebase?',
          options: ['On local branches', 'On commits that have been pushed/shared', 'For cleaning history', 'Always avoid'],
          correctIndex: 1,
          explanation: 'NEVER rebase commits that others may have based work on - it rewrites history and breaks their repos.'
        },
        {
          question: 'What does git stash do?',
          options: ['Commits changes', 'Saves changes without committing, cleans working dir', 'Deletes changes', 'Pushes to remote'],
          correctIndex: 1,
          explanation: 'stash saves your uncommitted changes and cleans the working directory. Use pop to restore them.'
        }
      ],
      keyTakeaways: [
        'Git tracks changes, enables branching/merging, and collaboration',
        'Daily workflow: status, add, commit, push',
        'Branch with checkout -b, merge via Pull Request',
        'Use rebase for clean history, never on shared commits',
        'Stash saves WIP without committing',
        'Bisect finds bugs, reflog recovers deleted work'
      ],
      resources: [
        { title: 'Pro Git (free book)', url: 'https://git-scm.com/book/en/v2', type: 'book' },
        { title: 'Learn Git Branching (interactive)', url: 'https://learngitbranching.js.org/', type: 'interactive', isHiddenGem: true },
        { title: 'Oh Shit, Git!?!', url: 'https://ohshitgit.com/', type: 'article', isHiddenGem: true },
      ]
    },

    {
      id: 'do-02',
      title: 'GitHub Actions - CI/CD Pipelines',
      subtitle: 'Automate testing, building, deployment',
      duration: 50,
      difficulty: 'Intermediate',
      phase: 'Foundation',
      content: [
        'GitHub Actions is GitHub\'s built-in CI/CD. Define workflows in YAML files in .github/workflows/. Workflows trigger on events (push, PR, schedule, manual). Each workflow has jobs, each job has steps. Runners can be GitHub-hosted (Ubuntu, Windows, macOS) or self-hosted.',
        'Common patterns: run tests on every push, build and push Docker image on merge to main, deploy on tagged release, run nightly security scans. Use caching to speed up builds (pip, npm, Docker layers). Use secrets for credentials.',
        'Matrix builds let you test across multiple versions/languages/OSes in parallel. e.g., test on Python 3.10, 3.11, 3.12 x Ubuntu, macOS. Each combination runs as a separate job.',
        'Reusable workflows (workflow_call) let you share CI across repos. Composite actions package multi-step actions. The actions marketplace has thousands of pre-built actions (checkout, setup-python, cache, etc.).'
      ],
      codeExamples: [
        {
          filename: 'ci.yml',
          language: 'yaml',
          code: '# .github/workflows/ci.yml\nname: CI\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        python-version: ["3.10", "3.11", "3.12"]\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Set up Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: \\$\\{\\{ matrix.python-version \\}\\}\n          cache: "pip"\n\n      - name: Install dependencies\n        run: |\n          python -m pip install --upgrade pip\n          pip install -r requirements.txt\n          pip install pytest ruff mypy\n\n      - name: Lint\n        run: ruff check .\n\n      - name: Type check\n        run: mypy src/\n\n      - name: Test\n        run: pytest --cov=src --cov-report=xml\n\n      - name: Upload coverage\n        uses: codecov/codecov-action@v3\n        if: matrix.python-version == \'3.12\'\n\n  security:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Trivy vulnerability scanner\n        uses: aquasecurity/trivy-action@master\n        with:\n          scan-type: "fs"\n          scan-ref: "."',
          explanation: 'CI workflow: matrix test on multiple Python versions, lint, type check, test, upload coverage, security scan. Caching pip speeds up builds.'
        },
        {
          filename: 'deploy.yml',
          language: 'yaml',
          code: '# .github/workflows/deploy.yml\nname: Deploy\n\non:\n  push:\n    tags: ["v*"]  # only on version tags\n\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Set up Docker Buildx\n        uses: docker/setup-buildx-action@v3\n\n      - name: Login to GHCR\n        uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: \\$\\{\\{ github.actor \\}\\}\n          password: \\$\\{\\{ secrets.GITHUB_TOKEN \\}\\}\n\n      - name: Build and push\n        uses: docker/build-push-action@v5\n        with:\n          push: true\n          tags: |\n            ghcr.io/\\$\\{\\{ github.repository \\}\\}:\\$\\{\\{ github.ref_name \\}\\}\n            ghcr.io/\\$\\{\\{ github.repository \\}\\}:latest\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\n\n      - name: Deploy to server\n        uses: appleboy/ssh-action@v1\n        with:\n          host: \\$\\{\\{ secrets.SERVER_HOST \\}\\}\n          username: \\$\\{\\{ secrets.SERVER_USER \\}\\}\n          key: \\$\\{\\{ secrets.SSH_KEY \\}\\}\n          script: |\n            cd /opt/myapp\n            docker compose pull\n            docker compose up -d --remove-orphans\n            docker image prune -f\n\n  notify:\n    needs: build-and-deploy\n    if: always()\n    runs-on: ubuntu-latest\n    steps:\n      - name: Notify Slack\n        uses: 8398a7/action-slack@v3\n        with:\n          status: \\$\\{\\{ job.status \\}\\}\n          fields: repo,message,commit,author,action,eventName,ref,workflow\n        env:\n          SLACK_WEBHOOK_URL: \\$\\{\\{ secrets.SLACK_WEBHOOK \\}\\}',
          explanation: 'Deploy on version tags: build image, push to GHCR, SSH to server and pull/restart, notify Slack. Use secrets for credentials.'
        },
      ],
      exercises: [
        {
          prompt: 'Add a job that runs nightly at 2 AM UTC to check for dependency updates.',
          starterCode: 'name: Nightly\n\non:\n  schedule:\n    # your cron\n\njobs:\n  check-deps:\n    # your job\n',
          hint: 'Use cron: "0 2 * * *" and a dependency check action like dependabot or pyup.',
          solution: 'name: Nightly\n\non:\n  schedule:\n    - cron: "0 2 * * *"  # 2 AM UTC daily\n  workflow_dispatch:  # manual trigger\n\njobs:\n  check-deps:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.12"\n      - run: |\n          pip install pip-audit\n          pip-audit -r requirements.txt',
          solutionLanguage: 'yaml'
        },
      ],
      quiz: [
        {
          question: 'What triggers a GitHub Actions workflow?',
          options: ['Push only', 'PRs, pushes, schedules, manual, webhooks', 'Manual only', 'Daily only'],
          correctIndex: 1,
          explanation: 'Many triggers: push, pull_request, schedule (cron), workflow_dispatch (manual), repository_dispatch (webhook), release, issue, and more.'
        },
        {
          question: 'What does a matrix build do?',
          options: ['Runs tests in parallel within a job', 'Runs the same job across multiple configurations', 'Builds a matrix of files', 'Caches dependencies'],
          correctIndex: 1,
          explanation: 'Matrix runs the same job across multiple values (Python versions, OSes). e.g., 3 versions x 2 OSes = 6 parallel jobs.'
        },
        {
          question: 'Where do you store secrets for GitHub Actions?',
          options: ['In the workflow file', 'In the repo settings (Settings > Secrets)', 'In .env file', 'In a separate repo'],
          correctIndex: 1,
          explanation: 'Repo Settings > Secrets and variables > Actions. Access in workflow with secrets.NAME. Never log or echo secrets!'
        }
      ],
      keyTakeaways: [
        'Workflows live in .github/workflows/*.yml',
        'Trigger on push, PR, schedule, manual, webhooks',
        'Matrix builds test across multiple versions/OSes in parallel',
        'Use caching (pip, npm, Docker layers) to speed up builds',
        'Store secrets in repo settings, access with secrets.NAME',
        'Common: lint, type check, test, build, deploy, security scan'
      ],
      resources: [
        { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/actions', type: 'docs' },
        { title: 'Actions Marketplace', url: 'https://github.com/marketplace/actions', type: 'tool' },
        { title: 'Actions Starter Workflows', url: 'https://github.com/actions/starter-workflows', type: 'article' },
      ]
    },

    {
      id: 'do-03',
      title: 'Redis - Caching, Pub/Sub, Queues',
      subtitle: 'In-memory data store for caching, sessions, queues',
      duration: 45,
      difficulty: 'Intermediate',
      phase: 'Foundation',
      content: [
        'Redis is an in-memory key-value store. Blazing fast (microseconds), supports many data structures: strings, lists, sets, sorted sets, hashes, streams, bitmaps, hyperloglog. Use cases: caching, session storage, rate limiting, pub/sub, queues, leaderboards.',
        'Common patterns: cache expensive DB queries (set with TTL), session storage (key=session_id, value=user data), rate limiting (incr + expire), real-time leaderboards (sorted sets), pub/sub for notifications, message queues (lists with brpop).',
        'In Python, use redis-py (sync) or redis.asyncio (async). Always use connection pooling. Set TTL on every key to prevent memory leaks. Use pipelines for bulk operations (atomic + faster).',
        'For production: enable persistence (RDB snapshots or AOF), use Redis Sentinel for HA, or Redis Cluster for sharding. Memory matters - Redis is in-memory. Use maxmemory + eviction policy (allkeys-lru is common).'
      ],
      codeExamples: [
        {
          filename: 'redis_basics.py',
          language: 'python',
          code: '# pip install redis\nimport redis\nimport json\nimport time\n\n# Connect (use connection pool in production)\nr = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)\n\n# Strings\nr.set("name", "Alice", ex=3600)  # ex=expire in seconds\nprint(r.get("name"))  # Alice\nr.delete("name")\n\n# Increment (atomic - perfect for counters/rate limiting)\nr.set("counter", 0)\nr.incr("counter")  # 1\nr.incrby("counter", 5)  # 6\nr.decr("counter")  # 5\n\n# Hashes (like a dict)\nr.hset("user:1", mapping={"name": "Alice", "age": 30, "city": "NYC"})\nprint(r.hget("user:1", "name"))  # Alice\nprint(r.hgetall("user:1"))  # {\'name\': \'Alice\', \'age\': \'30\', \'city\': \'NYC\'}\n\n# Lists (queue/stack)\nr.lpush("queue", "task1", "task2", "task3")\nprint(r.rpop("queue"))  # task1 (FIFO queue with lpush/rpop)\nprint(r.llen("queue"))  # 2\n\n# Sets (unique members)\nr.sadd("tags:post:1", "python", "redis", "cache")\nr.sadd("tags:post:2", "python", "web")\nprint(r.smembers("tags:post:1"))\nprint(r.sinter("tags:post:1", "tags:post:2"))  # intersection: {\'python\'}\n\n# Sorted sets (leaderboards!)\nr.zadd("leaderboard", {"Alice": 100, "Bob": 150, "Carol": 120})\nprint(r.zrevrange("leaderboard", 0, -1, withscores=True))\n# [(\'Bob\', 150.0), (\'Carol\', 120.0), (\'Alice\', 100.0)]\nprint(r.zrank("leaderboard", "Bob"))  # 0 (1st place)\n\n# Cache pattern - get_or_set\ndef cached_query(key, query_func, ttl=300):\n    cached = r.get(key)\n    if cached:\n        return json.loads(cached)\n    result = query_func()\n    r.set(key, json.dumps(result), ex=ttl)\n    return result',
          explanation: 'Redis supports many data structures: strings, hashes, lists, sets, sorted sets. Use TTL on every key. Sorted sets are perfect for leaderboards.'
        },
        {
          filename: 'redis_advanced.py',
          language: 'python',
          code: 'import redis.asyncio as aioredis\nimport asyncio\nimport json\n\n# Async Redis\nasync def main():\n    r = aioredis.Redis(host="localhost", port=6379, decode_responses=True)\n\n    # Pipeline - batch operations (atomic + faster)\n    pipe = r.pipeline()\n    pipe.set("a", 1)\n    pipe.set("b", 2)\n    pipe.set("c", 3)\n    pipe.get("a")\n    results = await pipe.execute()\n    print(results)  # [True, True, True, \'1\']\n\n    # Rate limiting (sliding window)\n    async def rate_limit(user_id, limit=10, window=60):\n        key = f"rate:{user_id}"\n        current = await r.incr(key)\n        if current == 1:\n            await r.expire(key, window)\n        return current <= limit\n\n    # Pub/Sub\n    async def publisher():\n        await asyncio.sleep(1)\n        await r.publish("notifications", "Hello subscribers!")\n\n    async def subscriber():\n        pubsub = r.pubsub()\n        await pubsub.subscribe("notifications")\n        async for message in pubsub.listen():\n            if message[\'type\'] == \'message\':\n                print(f"Received: {message[\'data\']}")\n                break\n\n    await asyncio.gather(publisher(), subscriber())\n\n    # Stream (log-like, perfect for event sourcing)\n    await r.xadd("events", {"user": "alice", "action": "login"})\n    await r.xadd("events", {"user": "bob", "action": "purchase"})\n    # Read from start\n    events = await r.xrange("events")\n    print(events)\n\nasyncio.run(main())',
          explanation: 'Use redis.asyncio for async. Pipelines batch operations (atomic). Pub/Sub for notifications. Streams for event logs. Sorted sets for leaderboards.'
        },
      ],
      exercises: [
        {
          prompt: 'Implement a function cache_api_call(key, api_func, ttl=60) that caches API results in Redis.',
          starterCode: 'import redis\nimport json\n\nr = redis.Redis(decode_responses=True)\n\ndef cache_api_call(key, api_func, ttl=60):\n    # your code\n    pass\n',
          hint: 'Check if key exists in Redis, if so return parsed JSON. Otherwise call api_func, cache result with TTL, return.',
          solution: 'import redis\nimport json\n\nr = redis.Redis(decode_responses=True)\n\ndef cache_api_call(key, api_func, ttl=60):\n    cached = r.get(key)\n    if cached is not None:\n        return json.loads(cached)\n    result = api_func()\n    r.set(key, json.dumps(result), ex=ttl)\n    return result\n\n# Usage:\n# def fetch_weather(city):\n#     # expensive API call\n#     return requests.get(f"https://api.weather/{city}").json()\n#\n# data = cache_api_call("weather:nyc", lambda: fetch_weather("nyc"), ttl=300)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'Why is Redis so fast?',
          options: ['Uses SSDs', 'In-memory + single-threaded (no locks)', 'Uses compression', 'Multi-threaded'],
          correctIndex: 1,
          explanation: 'Redis is in-memory (microsecond access) and single-threaded (no lock overhead). Operations are atomic without locking.'
        },
        {
          question: 'What Redis data structure is best for a leaderboard?',
          options: ['List', 'Set', 'Sorted Set (ZSET)', 'Hash'],
          correctIndex: 2,
          explanation: 'Sorted sets store members with scores. ZADD to add, ZREVRANGE for top-N, ZRANK for position. Perfect for leaderboards.'
        },
        {
          question: 'What is a Redis pipeline?',
          options: ['A way to compress data', 'Batch multiple commands (atomic + faster)', 'A backup method', 'A pub/sub channel'],
          correctIndex: 1,
          explanation: 'Pipelines batch multiple commands into one round-trip. They are atomic (MULTI/EXEC) and much faster than individual commands.'
        }
      ],
      keyTakeaways: [
        'Redis is an in-memory key-value store with rich data structures',
        'Use TTL on every key to prevent memory leaks',
        'Sorted sets are perfect for leaderboards/rankings',
        'Pipelines batch operations (atomic + faster)',
        'Pub/Sub for real-time notifications, Streams for event logs',
        'Common: caching, sessions, rate limiting, queues, leaderboards'
      ],
      resources: [
        { title: 'Redis Documentation', url: 'https://redis.io/docs/', type: 'docs' },
        { title: 'redis-py', url: 'https://redis-py.readthedocs.io/', type: 'docs' },
        { title: 'Try Redis (interactive)', url: 'https://try.redis.io/', type: 'interactive', isHiddenGem: true },
      ]
    },

    {
      id: 'do-04',
      title: 'Celery - Async Task Queues',
      subtitle: 'Background jobs, scheduled tasks, retries',
      duration: 50,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Celery is the most popular Python task queue. It distributes work across workers, perfect for long-running tasks (email sending, video processing, ML training, report generation). Uses a broker (Redis/RabbitMQ) to pass messages between your app and workers.',
        'Architecture: 1) Your app calls task.delay() - this puts a message on the broker, 2) Worker process picks up the message and executes the task, 3) Results stored in result backend (optional). Workers can scale horizontally - run as many as you need.',
        'Common patterns: .delay() for fire-and-forget, .apply_async() with countdown/eta for delayed execution, chains for sequential tasks, groups for parallel, chords for fan-out-fan-in. Use @task(bind=True) for self-retry.',
        'Always set time limits (soft_time_limit, time_limit) - a stuck task can hang a worker. Use idempotent tasks (safe to retry). Store progress for long tasks. Use celery beat for periodic tasks (cron-like).'
      ],
      codeExamples: [
        {
          filename: 'celery_setup.py',
          language: 'python',
          code: '# pip install celery redis\nfrom celery import Celery\nimport time\n\n# Configure\napp = Celery(\n    "myapp",\n    broker="redis://localhost:6379/0",\n    backend="redis://localhost:6379/1",\n)\n\n# Configure (better in celeryconfig.py)\napp.conf.update(\n    task_serializer="json",\n    accept_content=["json"],\n    result_serializer="json",\n    timezone="UTC",\n    enable_utc=True,\n    task_time_limit=300,  # hard kill after 5 min\n    task_soft_time_limit=240,  # soft limit at 4 min\n    task_acks_late=True,  # acknowledge after completion (crash-safe)\n    worker_prefetch_multiplier=1,  # fair scheduling\n)\n\n# Define a task\n@app.task\ndef add(x, y):\n    return x + y\n\n@app.task\ndef send_email(to, subject, body):\n    # simulate slow email send\n    time.sleep(5)\n    print(f"Sent to {to}: {subject}")\n    return {"status": "sent", "to": to}\n\n# Task with retry\n@app.task(bind=True, max_retries=3)\ndef fetch_external_api(self, url):\n    try:\n        import requests\n        resp = requests.get(url, timeout=10)\n        resp.raise_for_status()\n        return resp.json()\n    except Exception as exc:\n        # Retry with exponential backoff\n        raise self.retry(exc=exc, countdown=2 ** self.request.retries)\n\n# Long-running task with progress\n@app.task(bind=True)\ndef process_video(self, video_path):\n    total_frames = 1000\n    for i in range(total_frames):\n        # process frame i\n        time.sleep(0.01)\n        # Update progress\n        self.update_state(\n            state="PROGRESS",\n            meta={"current": i, "total": total_frames}\n        )\n    return {"result": "video_processed.mp4"}',
          explanation: 'Celery distributes tasks via broker (Redis). @app.task decorator. .delay() to call async. Use bind=True for self-retry. Set time limits!'
        },
        {
          filename: 'celery_usage.py',
          language: 'python',
          code: 'from celery import chain, group, chord\nfrom celery_setup import add, send_email, fetch_external_api\n\n# Simple - fire and forget\nresult = add.delay(4, 5)\nprint(result.id)  # task ID\nprint(result.ready())  # False (still running)\nprint(result.get(timeout=10))  # 9 (blocks until done)\n\n# Delayed execution\nsend_email.apply_async(\n    args=["user@example.com", "Welcome", "Hi!"],\n    countdown=60,  # wait 60 seconds\n)\n\n# Scheduled (eta instead of countdown)\nfrom datetime import datetime, timedelta\neta = datetime.utcnow() + timedelta(hours=2)\nsend_email.apply_async(args=[...], eta=eta)\n\n# Chain - sequential tasks\nworkflow = chain(\n    add.s(2, 3),       # 5\n    add.s(10),         # 5 + 10 = 15\n    add.s(100),        # 15 + 100 = 115\n)\nresult = workflow.apply_async()\nprint(result.get())  # 115\n\n# Group - parallel\nfrom celery import group\nparallel = group(add.s(i, i) for i in range(10))\nresult = parallel.apply_async()\nprint(result.get())  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\n\n# Chord - group + callback\ncallback = add.s(100)  # add 100 to sum of results\nworkflow = chord((add.s(i, i) for i in range(5)), callback)\nresult = workflow.apply_async()\n# 0+2+4+6+8 = 20, then 20 + 100 = 120\nprint(result.get())  # 120\n\n# Periodic tasks (celery beat)\n# In celeryconfig.py:\n# beat_schedule = {\n#     "send-daily-report": {\n#         "task": "tasks.send_report",\n#         "schedule": crontab(hour=9, minute=0),\n#     },\n#     "check-health-every-min": {\n#         "task": "tasks.health_check",\n#         "schedule": 60.0,  # every 60 seconds\n#     },\n# }\n\n# Run worker: celery -A celery_setup worker --loglevel=info\n# Run beat: celery -A celery_setup beat --loglevel=info',
          explanation: 'Use .delay() for fire-and-forget, .apply_async() for advanced options. Chains = sequential, groups = parallel, chords = fan-out + reduce. Beat for cron-like schedules.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a Celery task that downloads a file, processes it, and uploads the result. Use a chain.',
          starterCode: '@app.task\ndef download(url):\n    # download\n    pass\n\n@app.task\ndef process(filepath):\n    # process\n    pass\n\n@app.task\ndef upload(filepath):\n    # upload\n    pass\n\n# Chain them\n',
          hint: 'Use chain(download.s(url), process.s(), upload.s())',
          solution: '@app.task\ndef download(url):\n    print(f"Downloading {url}")\n    return f"/tmp/file_{hash(url)}"\n\n@app.task\ndef process(filepath):\n    print(f"Processing {filepath}")\n    return filepath.replace("file", "processed")\n\n@app.task\ndef upload(filepath):\n    print(f"Uploading {filepath}")\n    return f"s3://bucket/{filepath}"\n\n# Chain - output of each feeds into next\nworkflow = chain(\n    download.s("https://example.com/data.csv"),\n    process.s(),\n    upload.s(),\n)\nresult = workflow.apply_async()\nprint(result.get())  # s3://bucket/tmp/processed_xxx',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does the broker do in Celery?',
          options: ['Stores results', 'Passes messages between app and workers', 'Runs tasks', 'Schedules tasks'],
          correctIndex: 1,
          explanation: 'Broker (Redis/RabbitMQ) queues messages. App produces messages, workers consume them. Result backend (separate) stores results.'
        },
        {
          question: 'What is the difference between .delay() and .apply_async()?',
          options: ['No difference', '.apply_async() supports advanced options (countdown, eta, retry)', '.delay() is async', '.apply_async() is faster'],
          correctIndex: 1,
          explanation: '.delay(*args) is shorthand. .apply_async() supports countdown, eta, retry policy, queue routing, and more.'
        },
        {
          question: 'Why use task_acks_late=True?',
          options: ['Faster', 'Crash-safe - acknowledge after completion, not before', 'Required by Redis', 'For ordering'],
          correctIndex: 1,
          explanation: 'acks_late acknowledges after the task completes. If a worker crashes mid-task, the message goes back to the queue and another worker picks it up.'
        }
      ],
      keyTakeaways: [
        'Celery distributes async tasks via broker (Redis/RabbitMQ)',
        '@app.task decorator, .delay() to call async',
        'Use bind=True for self-retry with exponential backoff',
        'Always set time limits - stuck tasks hang workers',
        'Chains = sequential, groups = parallel, chords = fan-out + reduce',
        'celery beat for periodic/cron-like tasks'
      ],
      resources: [
        { title: 'Celery Documentation', url: 'https://docs.celeryq.dev/', type: 'docs' },
        { title: 'Celery Best Practices', url: 'https://docs.celeryq.dev/en/stable/userguide/tasks.html#best-practices', type: 'article' },
      ]
    },

    {
      id: 'do-05',
      title: 'Testing with pytest',
      subtitle: 'Write tests, fixtures, parametrize, mocking, coverage',
      duration: 50,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'pytest is the most popular Python testing framework. Simpler than unittest, more powerful. Discover tests automatically (test_*.py files, test_* functions). Use plain assert statements - pytest gives detailed failure messages.',
        'Fixtures are setup functions reused across tests. Use @pytest.fixture. Scope: function (default, runs per test), class, module, session. Use yield for setup/teardown. Fixtures can depend on other fixtures (just add as parameter).',
        'Use @pytest.mark.parametrize to run one test with multiple inputs. Use pytest.mark.skip / .xfail for known issues. Custom markers for grouping (e.g., @pytest.mark.slow). Run subset with -m "marker".',
        'Mocking: use unittest.mock.patch to replace dependencies (DB, APIs) with mocks. Use respx for mocking HTTPX/requests. Use pytest-mock for cleaner syntax. Verify calls with assert_called_with. Mock external services in unit tests, use real ones in integration tests.'
      ],
      codeExamples: [
        {
          filename: 'test_basics.py',
          language: 'python',
          code: '# test_math.py - simple tests\nimport pytest\n\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0\n    assert add(0, 0) == 0\n\n# Test that expects an exception\ndef test_divide_by_zero():\n    with pytest.raises(ZeroDivisionError):\n        1 / 0\n\n# Test exception message\ndef test_value_error():\n    with pytest.raises(ValueError, match="must be positive"):\n        raise ValueError("Age must be positive")\n\n# Parameterized - run same test with multiple inputs\n@pytest.mark.parametrize("a, b, expected", [\n    (1, 2, 3),\n    (-1, 1, 0),\n    (0, 0, 0),\n    (100, 200, 300),\n])\ndef test_add_parametrized(a, b, expected):\n    assert add(a, b) == expected\n\n# Skip and xfail\n@pytest.mark.skip(reason="Not implemented yet")\ndef test_future_feature():\n    pass\n\n@pytest.mark.xfail(reason="Known bug #123")\ndef test_known_bug():\n    assert 1 == 2  # expected to fail\n\n# Custom markers (register in pyproject.toml)\n@pytest.mark.slow\ndef test_long_running():\n    import time\n    time.sleep(10)\n    assert True\n\n# Run: pytest -v\n# Run slow only: pytest -m slow\n# Run all but slow: pytest -m "not slow"',
          explanation: 'pytest uses plain assert. Use pytest.raises for exceptions. @parametrize for data-driven tests. Markers (skip, xfail, custom) for organization.'
        },
        {
          filename: 'fixtures_mocking.py',
          language: 'python',
          code: 'import pytest\nfrom unittest.mock import Mock, patch, MagicMock\n\n# Fixtures - reusable setup\n@pytest.fixture\ndef sample_user():\n    return {"id": 1, "name": "Alice", "email": "alice@example.com"}\n\ndef test_user_name(sample_user):  # fixture injected by name\n    assert sample_user["name"] == "Alice"\n\n# Fixture with setup/teardown\n@pytest.fixture\ndef db_session():\n    session = create_session()  # setup\n    yield session  # test runs here\n    session.close()  # teardown\n\n# Session-scoped fixture (runs once per session)\n@pytest.fixture(scope="session")\ndef app():\n    app = create_app()\n    app.config["TESTING"] = True\n    yield app\n    app.cleanup()\n\n# Factory fixture - create multiple instances\n@pytest.fixture\ndef make_user():\n    def _make(name="Test", email=None):\n        return {"name": name, "email": email or f"{name.lower()}@test.com"}\n    return _make\n\ndef test_factory(make_user):\n    u1 = make_user("Alice")\n    u2 = make_user("Bob", email="bob@x.com")\n    assert u1["email"] == "alice@test.com"\n\n# Mocking - replace dependencies\n@patch("myapp.services.requests.get")\ndef test_fetch_user(mock_get, sample_user):\n    # Configure mock\n    mock_get.return_value.json.return_value = sample_user\n    mock_get.return_value.status_code = 200\n\n    # Call function that uses requests.get\n    result = fetch_user(1)\n\n    # Verify\n    assert result["name"] == "Alice"\n    mock_get.assert_called_once_with("https://api/users/1")\n\n# Using pytest-mock (cleaner)\ndef test_with_mocker(mocker, sample_user):\n    mock_get = mocker.patch("myapp.services.requests.get")\n    mock_get.return_value.json.return_value = sample_user\n\n    result = fetch_user(1)\n    assert result["email"] == "alice@example.com"\n\n# Mock a class\n@patch("myapp.services.UserService")\ndef test_user_service(MockUserService):\n    # Configure the mock instance\n    mock_instance = MockUserService.return_value\n    mock_instance.get_user.return_value = {"id": 1, "name": "Alice"}\n\n    result = my_function(1)\n    assert result["name"] == "Alice"\n\n# Conftest.py - shared fixtures across all tests\n# tests/conftest.py:\n# @pytest.fixture\n# def client():\n#     from myapp import app\n#     app.config["TESTING"] = True\n#     with app.test_client() as client:\n#         yield client',
          explanation: 'Fixtures: reusable setup with yield for teardown. Factory fixtures create multiple instances. patch() replaces dependencies. conftest.py shares fixtures across files.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a parametrized test for a function `is_palindrome(s)` that tests 5 cases: true and false.',
          starterCode: 'def is_palindrome(s):\n    return s == s[::-1]\n\n@pytest.mark.parametrize("input,expected", [\n    # your test cases\n])\ndef test_is_palindrome(input, expected):\n    assert is_palindrome(input) == expected\n',
          hint: 'Mix true (radar, level, racecar) and false (hello, world) cases.',
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
        {
          question: 'What does @pytest.mark.parametrize do?',
          options: ['Runs test in parallel', 'Runs the same test multiple times with different arguments', 'Marks as slow', 'Skips the test'],
          correctIndex: 1,
          explanation: 'parametrize runs the test function once per set of arguments. Great for testing the same logic with many inputs.'
        },
        {
          question: 'What does unittest.mock.patch do?',
          options: ['Tests a function', 'Replaces an object with a Mock for the test duration', 'Adds logging', 'Skips the test'],
          correctIndex: 1,
          explanation: 'patch temporarily replaces the target (function, class, attribute) with a Mock. After the test, the original is restored.'
        }
      ],
      keyTakeaways: [
        'pytest uses plain assert with detailed failure messages',
        'Fixtures (with yield) provide reusable setup/teardown',
        'Use @pytest.mark.parametrize for data-driven tests',
        'Mock with @patch or pytest-mock - replace dependencies',
        'conftest.py shares fixtures across test files',
        'Markers (skip, xfail, custom) organize and filter tests'
      ],
      resources: [
        { title: 'pytest Documentation', url: 'https://docs.pytest.org/', type: 'docs' },
        { title: 'pytest Fixtures', url: 'https://docs.pytest.org/en/stable/explanation/fixtures.html', type: 'docs' },
        { title: 'Obey the Testing Goat (free book)', url: 'https://www.obeythetestinggoat.com/', type: 'book', isHiddenGem: true },
      ]
    },
  ]
};
