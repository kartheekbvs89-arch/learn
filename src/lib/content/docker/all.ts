import { Lesson } from '../../types';

export const dockerL1: Lesson = {
  slug: 'docker-fundamentals', title: 'Docker Fundamentals — Images, Containers, Run',
  subtitle: 'Master Docker basics — why containers, images, running containers',
  duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'docker',
  objectives: ['Understand containers vs VMs','Install Docker and verify','Run containers with docker run','List, stop, remove containers','Understand images vs containers'],
  realWorldContext: 'Docker is how every modern application is deployed. Companies like Google, Netflix, and Uber run everything in containers. Without Docker, "works on my machine" is a daily problem. With Docker, your app runs identically on every machine. This is day-one knowledge for every engineer.',
  prerequisites: ['Terminal familiarity','Basic Linux commands (cd, ls, ps)'],
  conceptDiagram: `CONTAINERS vs VMs:
  VM: full OS per VM (2GB each, slow startup)
  Container: shares host kernel (50MB each, starts in seconds)

  IMAGE vs CONTAINER:
  Image = blueprint (read-only, like a class)
  Container = running instance (like an object)
  
  docker run nginx  → creates container from nginx image and starts it
  docker ps         → see running containers
  docker stop       → stop container
  docker rm         → remove stopped container

  BASIC COMMANDS:
  docker pull nginx     → download image
  docker run nginx      → create + start container
  docker run -d nginx   → detached (background)
  docker run -p 80:80   → port mapping (host:container)
  docker run -v /data:/data  → volume mapping
  docker ps             → list running
  docker images         → list images`,
  conceptExplanation: ['Docker containers are like lightweight VMs — they isolate your app and its dependencies. But unlike VMs, they share the host kernel (no full OS per container). This makes them 100x smaller and faster.','An image is a read-only template (like a class). A container is a running instance of an image (like an object). You can run multiple containers from the same image. Images are built from Dockerfiles or pulled from registries (Docker Hub).','docker run creates AND starts a container. Common flags: -d (background), -p (port mapping), -v (volume mapping), --name (custom name), -e (environment variables). Without -p, the container port is not accessible from the host.'],
  whyItMatters: 'Without Docker, deployment is "install Python 3.12, install PostgreSQL, configure this, set that..." on every server. With Docker, you build an image once and run it anywhere. This is how every company deploys software in 2024.',
  codeExamples: [
    { filename: 'commands.sh', language: 'bash', approach: 'minimal', code: `# Pull and run nginx
docker pull nginx
docker run -d --name myweb -p 8080:80 nginx
# Open http://localhost:8080 → nginx welcome page

# List running containers
docker ps

# Stop and remove
docker stop myweb
docker rm myweb`, explanation: 'Minimal: pull image, run with port mapping, stop, remove. -d = background, -p 8080:80 = host:container port.' },
    { filename: 'commands.sh', language: 'bash', approach: 'real-world', code: `# Run PostgreSQL
docker run -d \\
  --name postgres \\
  -e POSTGRES_USER=myuser \\
  -e POSTGRES_PASSWORD=mypass \\
  -e POSTGRES_DB=mydb \\
  -p 5432:5432 \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

# Run Redis
docker run -d --name redis -p 6379:6379 redis:7

# Run Python app
docker run -d \\
  --name api \\
  -p 8000:8000 \\
  -e DATABASE_URL=postgresql://myuser:mypass@postgres:5432/mydb \\
  -e REDIS_URL=redis://redis:6379/0 \\
  myapp:latest

# View logs
docker logs -f api

# Execute command in running container
docker exec -it postgres psql -U myuser -d mydb

# Copy file from container
docker cp api:/app/output.txt .`, explanation: 'Real-world: run PostgreSQL (with env vars, volume, port), Redis, app. Logs, exec (run command inside), cp (copy files). -v creates named volume for persistent data.' },
  ],
  configFiles: [],
  lab: { title: 'Run Your First Containers', steps: [
    { step: 1, title: 'Verify Docker', instruction: 'Check Docker is installed', command: 'docker --version', expectedOutput: 'Docker version 24.x.x' },
    { step: 2, title: 'Run nginx', instruction: 'Start a web server', command: 'docker run -d --name web -p 8080:80 nginx', expectedOutput: 'Container ID' },
    { step: 3, title: 'Verify', instruction: 'Open in browser', command: 'curl http://localhost:8080', expectedOutput: 'nginx welcome page HTML' },
    { step: 4, title: 'Run PostgreSQL', instruction: 'Start a database', command: 'docker run -d --name db -e POSTGRES_PASSWORD=pass -p 5432:5432 postgres:16' },
    { step: 5, title: 'Connect', instruction: 'Connect to PostgreSQL', command: 'docker exec -it db psql -U postgres -c "SELECT version();"', expectedOutput: 'PostgreSQL 16.x' },
  ]},
  commonErrors: [
    { error: 'port is already allocated', fix: 'Another process is using the port. Use a different host port: -p 8081:80. Or kill the process: lsof -ti:8080 | xargs kill.', rootCause: 'Two containers cannot bind the same host port. The host port (left of :) must be unique.' },
    { error: 'Cannot connect to container', fix: 'Add -p flag: docker run -p 8080:80 nginx. Without -p, the container port is not accessible from the host.', rootCause: 'Containers have their own network. Without -p (port mapping), the port is only accessible inside the container.' },
  ],
  quiz: [
    { question: 'What is the difference between an image and a container?', options: ['Same thing', 'Image = blueprint (read-only), Container = running instance', 'Image = running, Container = blueprint', 'No difference'], correctIndex: 1, explanation: 'Image is the template (like a class). Container is a running instance (like an object). Multiple containers can run from the same image.' },
    { question: 'Why use -p 8080:80 in docker run?', options: ['For speed', 'Map host port 8080 to container port 80 (access container from host)', 'Required', 'For security'], correctIndex: 1, explanation: 'Without -p, the container port is isolated. -p 8080:80 maps host:container so you can access http://localhost:8080.' },
  ],
  resources: [{ title: 'Docker Documentation', url: 'https://docs.docker.com/', type: 'docs' }, { title: 'Play with Docker', url: 'https://labs.play-with-docker.com/', type: 'interactive', isHiddenGem: true }],
  whatToReadNext: 'Read about Dockerfile Best Practices (next lesson) — how to build your own images.',
};

export const dockerL2: Lesson = {
  slug: 'dockerfile', title: 'Dockerfile Best Practices — Layers, Cache, Size',
  subtitle: 'Write efficient Dockerfiles that build fast and produce small images',
  duration: 70, difficulty: 'Beginner', phase: 'Foundation', xp: 200, moduleSlug: 'docker',
  objectives: ['Write a Dockerfile for a Python/FastAPI app','Understand layer caching (order matters!)','Use .dockerignore to exclude files','Run as non-root user','Add health checks'],
  realWorldContext: 'Every company builds Docker images for their apps. A well-written Dockerfile builds in 30 seconds and produces a 100MB image. A poorly-written one builds in 5 minutes and produces a 1GB image. Senior engineers know how to optimize Dockerfiles for speed and size.',
  prerequisites: ['Completed Docker L1'],
  conceptDiagram: `DOCKERFILE = recipe to build an image
  FROM python:3.12-slim    ← base image
  WORKDIR /app             ← working directory
  COPY requirements.txt .  ← copy file
  RUN pip install -r requirements.txt  ← install deps
  COPY . .                 ← copy app code
  CMD ["python", "main.py"] ← default command

  LAYER CACHING (critical!):
  Each instruction = one layer. Docker caches layers.
  If a layer changes, ALL subsequent layers rebuild.
  
  GOOD: COPY requirements.txt → RUN pip install → COPY . .
  (deps only reinstall when requirements.txt changes)
  
  BAD: COPY . . → RUN pip install
  (deps reinstall on EVERY code change!)`,
  conceptExplanation: ['Each Dockerfile instruction creates a layer. Docker caches layers — if a layer has not changed, it is reused. Order matters: put rarely-changing instructions (install deps) BEFORE frequently-changing ones (copy code). This is the #1 Docker optimization.','Use slim or alpine base images (100MB vs 900MB for full Python). They lack compilers, so install build deps separately if needed. Multi-stage builds (next lesson) solve this — builder stage has compilers, runtime stage does not.','Always run as non-root: RUN useradd -m appuser && USER appuser. Without this, your container runs as root — if an attacker breaks in, they have root access. Add HEALTHCHECK so orchestrators (Docker Compose, K8s) know if your app is healthy.'],
  whyItMatters: 'A 1GB image takes 5 minutes to push/pull. A 100MB image takes 30 seconds. In CI/CD, this is the difference between a 2-minute deploy and a 10-minute deploy. Layer caching means deploys take seconds (only changed layers are rebuilt).',
  codeExamples: [
    { filename: 'Dockerfile', language: 'dockerfile', approach: 'minimal', code: `FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install fastapi uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`, explanation: 'Minimal Dockerfile. Works but no caching (COPY . . before pip install = reinstall on every code change).' },
    { filename: 'Dockerfile', language: 'dockerfile', approach: 'real-world', code: `FROM python:3.12-slim

# Install system deps
RUN apt-get update && apt-get install -y --no-install-recommends \\
    libpq5 curl \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements FIRST (layer caching!)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code (changes frequently — after pip install)
COPY . .

# Non-root user (security!)
RUN useradd -m appuser
USER appuser

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`, explanation: 'Real-world: system deps, requirements first (caching!), app code second, non-root user, health check. This is what production Dockerfiles look like.' },
  ],
  configFiles: [{ filename: '.dockerignore', language: 'text', content: `.venv/
__pycache__/
*.pyc
.git/
.gitignore
.env
*.md
tests/
.pytest_cache/
.mypy_cache/
Dockerfile
docker-compose*.yml`, comment: 'Copy this exactly. Excludes venv, caches, git, tests from the image. Smaller image, faster build.' }],
  lab: { title: 'Write a Dockerfile', steps: [
    { step: 1, title: 'Create Dockerfile', instruction: 'Write a Dockerfile for your app', command: 'cat > Dockerfile << \'EOF\'\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nRUN useradd -m app && USER app\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0"]\nEOF' },
    { step: 2, title: 'Create .dockerignore', instruction: 'Exclude unnecessary files', command: 'echo -e ".venv\\n__pycache__\\n.git\\n.env\\ntests/" > .dockerignore' },
    { step: 3, title: 'Build', instruction: 'Build the image', command: 'docker build -t myapp .', expectedOutput: 'Successfully tagged myapp:latest' },
    { step: 4, title: 'Run', instruction: 'Run the container', command: 'docker run -d -p 8000:8000 myapp', verification: 'curl http://localhost:8000/health returns 200' },
  ]},
  commonErrors: [
    { error: 'Build takes too long (reinstalls deps every time)', fix: 'Put COPY requirements.txt BEFORE COPY . . Docker caches the pip install layer. Only rebuilds when requirements.txt changes.', rootCause: 'COPY . . before pip install = any code change invalidates the pip install layer. Reorder: requirements first, code second.' },
    { error: 'Image too large (1GB+)', fix: 'Use python:3.12-slim (150MB) not python:3.12 (900MB). Add .dockerignore to exclude .venv, .git, tests. Use multi-stage builds.', rootCause: 'Full Python image includes compilers, docs, and tools. Slim has only runtime. .dockerignore prevents unnecessary files from being copied.' },
  ],
  quiz: [
    { question: 'Why copy requirements.txt BEFORE app code?', options: ['Convention', 'Layer caching — pip install only runs when requirements change, not on every code change', 'Required', 'Faster'], correctIndex: 1, explanation: 'Docker caches layers. If requirements.txt has not changed, the pip install layer is reused. If you copy code first, every code change invalidates the pip install layer.' },
    { question: 'Why run as non-root user?', options: ['Faster', 'Security — if attacker breaks in, they do not have root access', 'Required', 'Less memory'], correctIndex: 1, explanation: 'Without non-root user, container runs as root. If an attacker exploits your app, they get root in the container. Non-root limits the damage.' },
  ],
  resources: [{ title: 'Dockerfile Reference', url: 'https://docs.docker.com/engine/reference/builder/', type: 'docs' }, { title: 'Docker Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: 'docs' }],
  whatToReadNext: 'Read about Multi-Stage Builds (next lesson) — smaller images with builder + runtime stages.',
};

export const dockerL3: Lesson = {
  slug: 'multi-stage', title: 'Multi-Stage Builds — Builder + Runtime',
  subtitle: 'Create small production images with multi-stage builds',
  duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'docker',
  objectives: ['Understand why multi-stage builds exist','Write a Dockerfile with builder + runtime stages','Compare image sizes (1GB → 200MB)','Use --from to copy between stages','Apply to Python, Node, Go apps'],
  realWorldContext: 'A single-stage Python image with build tools is 1GB. A multi-stage image with only runtime is 200MB. Companies like Google and Vercel use multi-stage builds for all their containers. Smaller images = faster deploys, less storage, smaller attack surface.',
  prerequisites: ['Completed Docker L1-L2'],
  conceptDiagram: `MULTI-STAGE BUILD:
  Stage 1 (builder): has compilers, build tools
    → install deps, compile, build wheels
    
  Stage 2 (runtime): minimal — only what is needed to RUN
    → copy built artifacts from builder
    → no compilers, no build tools
    
  Result: 200MB image instead of 1GB

  FROM python:3.12 AS builder
  RUN pip install --user -r requirements.txt
  
  FROM python:3.12-slim
  COPY --from=builder /root/.local /root/.local
  COPY . .
  CMD ["python", "main.py"]`,
  conceptExplanation: ['Multi-stage builds use multiple FROM statements. Each FROM starts a new stage. The final stage is the image that gets built. You copy artifacts from earlier stages with COPY --from=builder.','The builder stage has compilers (gcc, build-essential) needed to install packages like psycopg2, numpy. The runtime stage only has the installed packages — no compilers. This reduces image size by 5-10x.','For Python: build a virtualenv in the builder stage, copy the entire venv to runtime. For Node: build with full node image, copy dist/ to nginx. For Go: build binary in golang image, copy to scratch (2MB image!).'],
  whyItMatters: 'A 1GB image takes 5 minutes to push to registry. A 200MB image takes 1 minute. In CI/CD with 50 deploys per day, that is hours saved. Smaller images also have fewer vulnerabilities (less code = less attack surface).',
  codeExamples: [
    { filename: 'Dockerfile', language: 'dockerfile', approach: 'production', code: `# Stage 1: Builder (has compilers)
FROM python:3.12-slim AS builder

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \\
    build-essential libpq-dev \\
    && rm -rf /var/lib/apt/lists/*

# Create venv and install deps
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Runtime (minimal — no compilers!)
FROM python:3.12-slim AS runtime

# Only install runtime deps (no build tools)
RUN apt-get update && apt-get install -y --no-install-recommends \\
    libpq5 curl \\
    && rm -rf /var/lib/apt/lists/*

# Copy venv from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Non-root user
RUN useradd -m appuser
WORKDIR /app
USER appuser

# Copy app code
COPY --chown=appuser:appuser . .

HEALTHCHECK CMD curl -f http://localhost:8000/health || exit 1
EXPOSE 8000
CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]`, explanation: 'Builder: full Python + compilers, creates venv. Runtime: slim Python, copies venv, no compilers. Result: 200MB instead of 1GB. Non-root, health check, gunicorn for production.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Multi-Stage Image', steps: [
    { step: 1, title: 'Create Dockerfile', instruction: 'Write multi-stage Dockerfile', command: 'Create Dockerfile with builder + runtime stages' },
    { step: 2, title: 'Build', instruction: 'Build and check size', command: 'docker build -t myapp . && docker images myapp', expectedOutput: 'Size ~200MB (vs ~1GB single-stage)' },
  ]},
  commonErrors: [{ error: 'ModuleNotFoundError in runtime stage', fix: 'Make sure you copied the venv: COPY --from=builder /opt/venv /opt/venv. And set ENV PATH="/opt/venv/bin:$PATH" in runtime stage.', rootCause: 'Packages installed in builder venv but venv not copied to runtime. COPY --from=builder copies the venv.' }],
  quiz: [{ question: 'Why use multi-stage builds?', options: ['Faster builds', 'Smaller final image (no compilers/build tools in runtime) — faster deploys, fewer vulnerabilities', 'Required', 'Better caching'], correctIndex: 1, explanation: 'Builder stage has compilers (gcc, build-essential). Runtime stage copies only the built artifacts (venv, binary). Result: 200MB instead of 1GB. Less code = fewer vulnerabilities.' }],
  resources: [{ title: 'Multi-Stage Builds', url: 'https://docs.docker.com/build/building/multi-stage/', type: 'docs' }],
  whatToReadNext: 'Read about Docker Compose (next lesson) — multi-service local dev.',
};

// L4-L15 — real specific content
export const dockerL4: Lesson = {
  slug: 'compose', title: 'Docker Compose — Multi-service Local Dev',
  subtitle: 'Run your entire stack (API + DB + Redis) with one command',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'docker',
  objectives: ['Write docker-compose.yml for API + PostgreSQL + Redis','Use depends_on with healthchecks','Use named volumes for persistent data','Override config for dev vs prod','Run with docker compose up'],
  realWorldContext: 'Every modern app has multiple services: API, database, cache, queue. Without Docker Compose, you install PostgreSQL, Redis, and RabbitMQ on your machine — version conflicts, port conflicts, OS differences. With Compose, one command starts everything. Used by every development team.',
  prerequisites: ['Completed Docker L1-L3'],
  conceptDiagram: `DOCKER COMPOSE:
  One YAML file defines ALL services
  docker compose up → starts everything
  docker compose down → stops everything

  SERVICES CONNECT BY NAME:
  api can reach db at "db:5432" (not localhost)
  Compose sets up DNS automatically

  docker-compose.yml:
  services:
    api: build: . ports: ["8000:8000"]
    db: image: postgres:16
    redis: image: redis:7`,
  conceptExplanation: ['Docker Compose defines multi-service apps in one YAML file. Each service is a container. Services connect by service name (DNS): your API connects to db at db:5432, not localhost:5432. Compose handles networking.','depends_on with healthcheck ensures startup order: api waits for db to be healthy (pg_isready) before starting. Without this, api starts before db is ready → connection errors.','Named volumes persist data: pgdata:/var/lib/postgresql/data. Without volumes, data is lost on docker compose down. Volumes survive container recreation.'],
  whyItMatters: 'Without Compose, onboarding a new developer takes a day (install PostgreSQL, Redis, configure, import data). With Compose, it takes 30 seconds (docker compose up). This is the #1 developer productivity tool.',
  codeExamples: [
    { filename: 'docker-compose.yml', language: 'yaml', approach: 'production', code: `services:
  api:
    build: .
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=\${SECRET_KEY}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    ports: ["5432:5432"]
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    volumes: [redisdata:/data]

  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes: [./nginx.conf:/etc/nginx/nginx.conf:ro]
    depends_on: [api]

volumes:
  pgdata:
  redisdata:`, explanation: 'Full stack: API + PostgreSQL (healthcheck) + Redis + Nginx. Services connect by name. Named volumes persist data. depends_on ensures startup order.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up Docker Compose', steps: [
    { step: 1, title: 'Create compose file', instruction: 'Write docker-compose.yml', command: 'Create docker-compose.yml with api, db, redis services' },
    { step: 2, title: 'Start', instruction: 'Run everything', command: 'docker compose up -d', expectedOutput: 'All services running' },
    { step: 3, title: 'Verify', instruction: 'Check services', command: 'docker compose ps', expectedOutput: 'All healthy' },
    { step: 4, title: 'View logs', instruction: 'Check API logs', command: 'docker compose logs -f api' },
    { step: 5, title: 'Stop', instruction: 'Stop everything', command: 'docker compose down' },
  ]},
  commonErrors: [{ error: 'Connection refused to db', fix: 'Use service name as hostname: db:5432 (not localhost:5432). Add depends_on with healthcheck so api waits for db to be ready.', rootCause: 'In Compose, each service has its own network. localhost refers to the container itself, not the host. Use service names (db, redis) as hostnames.' }],
  quiz: [{ question: 'How do services connect in Docker Compose?', options: ['By IP address', 'By service name (db:5432, redis:6379) — Compose sets up DNS', 'Cannot connect', 'Via host network'], correctIndex: 1, explanation: 'Compose creates a network and DNS for services. api connects to db at "db:5432" — Compose resolves the name to the container IP. Never use localhost in Compose.' }],
  resources: [{ title: 'Docker Compose', url: 'https://docs.docker.com/compose/', type: 'docs' }],
  whatToReadNext: 'Read about Networking (next lesson) — bridge, host, custom networks.',
};

export const dockerL5: Lesson = {
  slug: 'networking', title: 'Networking — Bridge, Host, Custom Networks',
  subtitle: 'Understand Docker networking for multi-service apps',
  duration: 60, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'docker',
  objectives: ['Understand bridge vs host networking','Create custom networks for service isolation','Use docker network commands','Connect containers across networks','Debug networking issues'],
  realWorldContext: 'Networking is how containers talk to each other. Without understanding networks, you cannot connect your API to your database. Companies isolate services on different networks for security (frontend network vs backend network).',
  prerequisites: ['Completed Docker L1-L4'],
  conceptDiagram: `DOCKER NETWORKS:
  bridge (default): containers get private IP, can talk to each other
  host: container uses host network (no isolation, same ports)
  none: no networking (isolated)
  custom: user-created, better DNS, isolation

  COMPOSE AUTOMATICALLY CREATES A NETWORK:
  All services in docker-compose.yml are on the same network
  They can reach each other by service name

  CUSTOM NETWORK (for isolation):
  docker network create mynet
  docker run --network mynet --name api myapp
  docker run --network mynet --name db postgres`,
  conceptExplanation: ['Bridge is the default network. Each container gets a private IP. Containers on the same bridge can talk to each other by IP (or name if on same Compose network). Port mapping (-p) exposes ports to the host.','Custom networks give better DNS resolution (containers resolve by name, not just IP). Use multiple networks for isolation: frontend network (web + api), backend network (api + db). Web cannot reach db directly.','Host network mode: container shares the host network (no isolation). Faster (no NAT) but less secure. Use for performance-critical apps. Container ports = host ports (no -p needed).'],
  whyItMatters: 'Without networking knowledge, you cannot connect containers. Without network isolation, any container can reach any other (security risk). Understanding networks is essential for multi-service apps and Kubernetes.',
  codeExamples: [
    { filename: 'networks.sh', language: 'bash', approach: 'real-world', code: `# Create custom network
docker network create mynet

# Run containers on same network
docker run -d --network mynet --name db postgres:16
docker run -d --network mynet --name api -e DATABASE_URL=postgresql://postgres@db:5432 myapp

# api can reach db by name "db" (DNS!)
# db CANNOT be reached from outside (no -p port mapping)

# List networks
docker network ls

# Inspect network (see containers, IP addresses)
docker network inspect mynet

# Connect running container to another network
docker network connect backend api  # api now on both mynet and backend

# In docker-compose.yml: multiple networks
# services:
#   web:
#     networks: [frontend]
#   api:
#     networks: [frontend, backend]  # connects both networks
#   db:
#     networks: [backend]  # only backend, web cannot reach db!
# networks:
#   frontend:
#   backend:`, explanation: 'Custom networks: create, connect by name. Multiple networks for isolation (web on frontend, db on backend, api on both). DNS resolves service names to IPs.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up Custom Networks', steps: [{ step: 1, title: 'Create network', instruction: 'Create custom network', command: 'docker network create mynet' }, { step: 2, title: 'Run containers', instruction: 'Run on same network', command: 'docker run -d --network mynet --name db postgres:16 && docker run -d --network mynet --name api -e DB_HOST=db myapp' }, { step: 3, title: 'Verify', instruction: 'Check connectivity', command: 'docker exec api ping db', expectedOutput: 'Can resolve db by name' }] },
  commonErrors: [{ error: 'Container cannot reach another container', fix: 'Make sure both are on the same network. Use docker network inspect to verify. In Compose, all services are on the same default network.', rootCause: 'Containers on different networks cannot communicate. Put them on the same network or connect the container to both networks.' }],
  quiz: [{ question: 'How do containers on a custom network reach each other?', options: ['By IP address only', 'By container name (DNS resolution) — docker creates DNS entries', 'Cannot reach each other', 'By MAC address'], correctIndex: 1, explanation: 'Custom networks have built-in DNS. Container "db" is reachable at hostname "db". No need to know the IP address. This is why Compose services can use service names.' }],
  resources: [{ title: 'Docker Networking', url: 'https://docs.docker.com/network/', type: 'docs' }],
  whatToReadNext: 'Read about Volumes & Bind Mounts (next lesson) — persistent data.',
};

export const dockerL6: Lesson = {
  slug: 'volumes', title: 'Volumes & Bind Mounts — Persistent Data',
  subtitle: 'Persist data across container restarts',
  duration: 55, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'docker',
  objectives: ['Use named volumes for database data','Use bind mounts for development (hot reload)','Understand when to use each','Back up and restore volumes','Share volumes between containers'],
  realWorldContext: 'Without volumes, your database data disappears when the container stops. Volumes are how data survives container recreation. Every database container (PostgreSQL, MySQL, Redis) MUST have a volume. Bind mounts enable hot reload in development (edit code on host, reflects in container).',
  prerequisites: ['Completed Docker L1-L5'],
  conceptDiagram: `VOLUME TYPES:
  Named volume: Docker manages it (best for databases)
    -v pgdata:/var/lib/postgresql/data
    Data persists across container recreation
    Cannot easily access from host

  Bind mount: maps host directory to container (best for dev)
    -v /host/code:/app/code
    Changes on host reflect in container (hot reload!)
    Changes in container reflect on host

  WHEN TO USE:
  Named volume: databases, file uploads, any persistent data
  Bind mount: development (code hot reload), config files`,
  conceptExplanation: ['Named volumes are managed by Docker. Create with -v pgdata:/path. Docker stores the data in /var/lib/docker/volumes/. Data survives container deletion. Best for databases — Docker handles the storage.','Bind mounts map a host directory to a container directory: -v /host/path:/container/path. Changes on the host immediately reflect in the container. Use for development: edit code on host, container sees changes instantly (hot reload).','In docker-compose.yml, named volumes are declared at the bottom and referenced in services. Bind mounts use relative or absolute paths. For databases, ALWAYS use named volumes — data is precious.'],
  whyItMatters: 'Without volumes, docker compose down destroys your database. Without bind mounts, you rebuild the image on every code change (slow). Volumes are how data persists. Bind mounts are how development is fast.',
  codeExamples: [
    { filename: 'volumes.sh', language: 'bash', approach: 'real-world', code: `# Named volume (database data persists)
docker run -d \\
  --name postgres \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16
# pgdata survives docker rm postgres

# Bind mount (development hot reload)
docker run -d \\
  --name api \\
  -v $(pwd)/src:/app/src \\
  -p 8000:8000 \\
  myapp
# Edit src/main.py on host → container sees changes instantly!

# In docker-compose.yml:
# services:
#   db:
#     volumes:
#       - pgdata:/var/lib/postgresql/data    ← named volume
#       - ./init.sql:/docker-entrypoint-initdb.d/init.sql  ← bind mount
#   api:
#     volumes:
#       - ./src:/app/src    ← bind mount (hot reload)
#       - /app/node_modules ← anonymous volume (prevent override)
# volumes:
#   pgdata:    ← declare named volume

# Back up a volume
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine \\
  tar czf /backup/pgdata_backup.tar.gz /data

# Restore a volume
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine \\
  tar xzf /backup/pgdata_backup.tar.gz -C /`, explanation: 'Named volumes: Docker-managed, persistent (databases). Bind mounts: host directory, hot reload (dev). Back up with tar in a temporary container.' },
  ],
  configFiles: [],
  lab: { title: 'Use Volumes', steps: [{ step: 1, title: 'Named volume', instruction: 'Run PostgreSQL with volume', command: 'docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=pass postgres:16' }, { step: 2, title: 'Add data', instruction: 'Insert data', command: 'docker exec db psql -U postgres -c "CREATE TABLE test (id SERIAL PRIMARY KEY);"' }, { step: 3, title: 'Destroy and recreate', instruction: 'Delete container, keep volume', command: 'docker rm -f db && docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=pass postgres:16' }, { step: 4, title: 'Verify', instruction: 'Data persists', command: 'docker exec db psql -U postgres -c "\\dt"', expectedOutput: 'test table still exists!' }] },
  commonErrors: [{ error: 'Data lost after container recreation', fix: 'Use named volume: -v mydata:/path. Without -v, data is stored in the container writable layer and lost when container is deleted.', rootCause: 'Container filesystem is ephemeral. Named volumes store data outside the container, surviving deletion.' }],
  quiz: [{ question: 'When to use bind mount vs named volume?', options: ['Always bind mount', 'Bind mount for dev (hot reload), named volume for production (databases)', 'Always named volume', 'Same thing'], correctIndex: 1, explanation: 'Bind mount: host directory mapped to container — changes reflect instantly (hot reload for dev). Named volume: Docker-managed — persistent, isolated (databases in prod).' }],
  resources: [{ title: 'Docker Volumes', url: 'https://docs.docker.com/storage/volumes/', type: 'docs' }],
  whatToReadNext: 'Read about Nginx (next lesson) — reverse proxy, SSL, load balancing.',
};

export const dockerL7: Lesson = {
  slug: 'nginx', title: 'Nginx — Reverse Proxy, SSL, Load Balancing',
  subtitle: 'Use Nginx as reverse proxy for your Docker apps',
  duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'docker',
  objectives: ['Configure Nginx as reverse proxy','Terminate TLS (HTTPS) with Let\'s Encrypt','Load balance across multiple instances','Serve static files','Add rate limiting and security headers'],
  realWorldContext: 'Every production deployment uses Nginx (or similar) in front of the app. Nginx handles TLS (HTTPS), rate limiting, static files, and load balancing. Your FastAPI app should not handle TLS — Nginx does it faster and more securely. Companies like Cloudflare and AWS use Nginx extensively.',
  prerequisites: ['Completed Docker L1-L6'],
  conceptDiagram: `NGINX REVERSE PROXY:
  Internet → Nginx (TLS, rate limit) → FastAPI (:8000)
  
  Nginx handles:
  • TLS termination (HTTPS → HTTP)
  • Rate limiting (100 req/min per IP)
  • Static files (images, CSS, JS)
  • Load balancing (distribute across 4 API instances)
  • Gzip compression
  • Security headers

  CLIENT → Nginx → API (HTTP, no TLS)
  API does not know about TLS — Nginx handles it`,
  conceptExplanation: ['Nginx terminates TLS: client connects with HTTPS, Nginx decrypts and forwards HTTP to your app. Your app does not need TLS configured. Nginx handles certificates (Let\'s Encrypt), renewal, and cipher selection.','Reverse proxy: Nginx receives all requests and forwards to backend. This means: single entry point (port 443), load balancing (distribute across multiple API instances), rate limiting (protect from abuse).','Static files: Nginx serves images, CSS, JS directly (fast). Dynamic requests (/api/*) are proxied to FastAPI. This is 10x faster than having FastAPI serve static files.'],
  whyItMatters: 'Without Nginx, your app handles TLS (slow in Python), rate limiting (app-level, not optimized), and static files (Python is slow at serving files). Nginx does all of this in C — 10x faster. Every production deployment uses a reverse proxy.',
  codeExamples: [
    { filename: 'nginx.conf', language: 'nginx', approach: 'production', code: `worker_processes auto;
events { worker_connections 1024; }

http {
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    # Gzip
    gzip on;
    gzip_types application/json text/css application/javascript;
    
    # Upstream (API instances for load balancing)
    upstream api_backend {
        server api:8000;
        # server api2:8000;  ← add more for scaling
    }
    
    # Redirect HTTP to HTTPS
    server {
        listen 80;
        return 301 https://$host$request_uri;
    }
    
    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name api.example.com;
        
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        
        # Security headers
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Strict-Transport-Security "max-age=31536000" always;
        
        # API proxy
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://api_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # WebSocket support
        location /ws/ {
            proxy_pass http://api_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
        
        # Static files
        location /static/ {
            root /var/www;
            expires 30d;
        }
    }
}`, explanation: 'Production Nginx: TLS termination, rate limiting, load balancing (upstream), security headers, WebSocket proxy, static files. This is what every production deployment uses.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up Nginx Reverse Proxy', steps: [
    { step: 1, title: 'Create nginx.conf', instruction: 'Write config', command: 'Create nginx.conf with reverse proxy to api:8000' },
    { step: 2, title: 'Add to compose', instruction: 'Add Nginx service', command: 'Add nginx service to docker-compose.yml' },
    { step: 3, title: 'Test', instruction: 'Verify proxy works', command: 'docker compose up -d && curl http://localhost/api/health', expectedOutput: 'API responds through Nginx' },
  ]},
  commonErrors: [{ error: '502 Bad Gateway', fix: 'Check that backend (api) is running and accessible. Verify upstream server address matches service name. Check Nginx error logs: docker logs nginx.', rootCause: 'Nginx cannot reach the backend. Service is down, wrong hostname, or wrong port in upstream config.' }],
  quiz: [{ question: 'Why use Nginx as reverse proxy?', options: ['Faster app', 'TLS termination, rate limiting, load balancing, static files — all in C (10x faster than Python)', 'Required', 'For security only'], correctIndex: 1, explanation: 'Nginx handles TLS, rate limiting, load balancing, static files in C — 10x faster than Python. Your app focuses on business logic. Every production deployment uses a reverse proxy.' }],
  resources: [{ title: 'Nginx Documentation', url: 'https://nginx.org/en/docs/', type: 'docs' }],
  whatToReadNext: 'Read about GitHub Actions CI/CD (next lesson) — automate build, test, deploy.',
};

// L8-L15 — real content
export const dockerL8: Lesson = {
  slug: 'github-actions', title: 'GitHub Actions CI/CD — Test, Build, Push, Deploy',
  subtitle: 'Automate your deployment pipeline',
  duration: 80, difficulty: 'Intermediate', phase: 'Intermediate', xp: 250, moduleSlug: 'docker',
  objectives: ['Write GitHub Actions workflow YAML','Run tests on every push','Build Docker image and push to registry','Deploy to server via SSH','Use secrets for credentials'],
  realWorldContext: 'Every company uses CI/CD. Code push → automated tests → build Docker image → push to registry → deploy to server. No manual deploys. GitHub Actions is free for public repos and included in GitHub. This is how modern software is shipped.',
  prerequisites: ['Completed Docker L1-L7'],
  conceptDiagram: `CI/CD PIPELINE:
  Push to main → GitHub Actions triggers:
  1. Lint (ruff)
  2. Test (pytest)
  3. Build Docker image
  4. Push to GHCR (GitHub Container Registry)
  5. SSH to server → pull image → restart

  .github/workflows/ci.yml:
  on: push to main
  jobs: test → build → deploy`,
  conceptExplanation: ['GitHub Actions runs workflows on push/PR. Each workflow is a YAML file in .github/workflows/. Jobs run in parallel, steps run sequentially. Use actions/checkout, actions/setup-python for common setup.','Matrix builds test on multiple versions: Python 3.10, 3.11, 3.12. Each version = separate job. Caching (pip, Docker layers) speeds up builds.','Secrets store credentials (API tokens, SSH keys). Access with $\{\{ secrets.NAME }}. Never hardcode credentials in workflow files. Secrets are encrypted and never logged.'],
  whyItMatters: 'Without CI/CD, deploys are manual: run tests locally, build image, push, SSH to server, pull, restart. Error-prone and slow. With CI/CD, a git push triggers everything automatically. This is how every company ships code.',
  codeExamples: [
    { filename: 'ci.yml', language: 'yaml', approach: 'production', code: `name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11", "3.12"]
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: $\{\{ matrix.python-version }}
          cache: pip
      - run: pip install -e ".[dev]"
      - run: ruff check .
      - run: mypy src/
      - run: pytest --cov=src
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: $\{\{ github.actor }}
          password: $\{\{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/$\{\{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@v1
        with:
          host: $\{\{ secrets.SERVER_HOST }}
          username: $\{\{ secrets.SERVER_USER }}
          key: $\{\{ secrets.SSH_KEY }}
          script: |
            cd /opt/myapp
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f`, explanation: 'Full CI/CD: test (matrix, PostgreSQL service), build (Docker image to GHCR), deploy (SSH to server, pull, restart). Secrets for SSH key. Cache for speed.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up CI/CD', steps: [{ step: 1, title: 'Create workflow', instruction: 'Write ci.yml', command: 'mkdir -p .github/workflows && create ci.yml' }, { step: 2, title: 'Add secrets', instruction: 'Add SSH key to GitHub', command: 'GitHub repo → Settings → Secrets → Actions → New secret' }, { step: 3, title: 'Push', instruction: 'Trigger pipeline', command: 'git push origin main', verification: 'Check Actions tab — all jobs pass' }] },
  commonErrors: [{ error: 'Permission denied on SSH deploy', fix: 'Add SSH private key as GitHub secret (SERVER_HOST, SERVER_USER, SSH_KEY). Make sure the public key is in ~/.ssh/authorized_keys on the server.', rootCause: 'SSH key not configured. Add private key as GitHub secret, public key on server.' }],
  quiz: [{ question: 'What triggers a GitHub Actions workflow?', options: ['Manual only', 'Push, PR, schedule, manual (workflow_dispatch), and more', 'Cron only', 'Comments'], correctIndex: 1, explanation: 'Workflows trigger on: push, pull_request, schedule (cron), workflow_dispatch (manual), issues, release, and more. Most common: push to main triggers CI/CD.' }],
  resources: [{ title: 'GitHub Actions', url: 'https://docs.github.com/actions', type: 'docs' }],
  whatToReadNext: 'Read about Container Registry (next lesson) — GHCR, ECR, tagging.',
};

// L9-L15 — condensed real content
export const dockerL9: Lesson = {
  slug: 'registry', title: 'Container Registry — GHCR, ECR, Tagging Strategy',
  subtitle: 'Store and version your Docker images',
  duration: 55, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'docker',
  objectives: ['Push images to GitHub Container Registry (GHCR)','Tag images properly (latest, version, commit SHA)','Use ECR for AWS deployments','Set up image cleanup policies','Pull images on production server'],
  realWorldContext: 'Every company stores Docker images in a registry. GHCR (GitHub) is free for public repos. ECR (AWS) for production. Without a registry, you build images on the server (slow, no caching). With a registry, you build once and pull everywhere.',
  prerequisites: ['Completed Docker L1-L8'],
  conceptDiagram: `REGISTRY FLOW:
  Build locally → push to registry → pull on server → run

  TAGGING STRATEGY:
  myapp:latest      ← always points to newest (convenient but dangerous)
  myapp:1.0.0       ← semantic version (for releases)
  myapp:abc1234     ← git commit SHA (for rollback)
  
  BEST: tag with both version AND commit SHA
  ghcr.io/repo/myapp:1.0.0
  ghcr.io/repo/myapp:abc1234
  ghcr.io/repo/myapp:latest`,
  conceptExplanation: ['A registry stores Docker images (like GitHub stores code). GHCR (GitHub Container Registry) is free, integrated with GitHub. ECR (AWS) for AWS deployments. Push with docker push, pull with docker pull.','Tagging: latest (convenient but ambiguous — which version?), semver (1.0.0 — clear release), commit SHA (abc1234 — exact code version). Best practice: tag with both semver AND SHA. Use SHA for rollback (know exactly which code).','Image cleanup: registries fill up with old images. Set up lifecycle policies: keep last 10 versions, delete older. GHCR and ECR both support this. Saves storage costs.'],
  whyItMatters: 'Without a registry, you build on the server (slow, different images on different servers). Without proper tagging, you cannot rollback (which version is "latest"?). Without cleanup, you pay for gigabytes of old images.',
  codeExamples: [
    { filename: 'registry.sh', language: 'bash', approach: 'real-world', code: `# Login to GHCR (GitHub Container Registry)
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag with version + commit SHA
docker tag myapp ghcr.io/username/myapp:1.0.0
docker tag myapp ghcr.io/username/myapp:$(git rev-parse --short HEAD)
docker tag myapp ghcr.io/username/myapp:latest

# Push all tags
docker push ghcr.io/username/myapp:1.0.0
docker push ghcr.io/username/myapp:$(git rev-parse --short HEAD)
docker push ghcr.io/username/myapp:latest

# Pull on server
docker pull ghcr.io/username/myapp:latest

# Rollback to specific version
docker pull ghcr.io/username/myapp:abc1234
docker run -d ghcr.io/username/myapp:abc1234`, explanation: 'Login, tag with version+SHA+latest, push, pull on server, rollback to specific SHA. This is the production image management workflow.' },
  ],
  configFiles: [],
  lab: { title: 'Push to Registry', steps: [{ step: 1, title: 'Login', instruction: 'Login to GHCR', command: 'echo $TOKEN | docker login ghcr.io -u USER --password-stdin' }, { step: 2, title: 'Tag', instruction: 'Tag image', command: 'docker tag myapp ghcr.io/USER/myapp:latest' }, { step: 3, title: 'Push', instruction: 'Push image', command: 'docker push ghcr.io/USER/myapp:latest' }] },
  commonErrors: [{ error: 'denied: permission denied', fix: 'Make sure your GitHub token has write:packages scope. For GHCR, the repo must have packages permission enabled.', rootCause: 'Token lacks package permissions. Generate a new token with write:packages scope.' }],
  quiz: [{ question: 'Why tag with commit SHA?', options: ['Smaller image', 'Exact rollback — know exactly which code version is running', 'Faster pull', 'Required'], correctIndex: 1, explanation: 'SHA tag (abc1234) maps to exact git commit. If something breaks, pull that SHA to rollback. "latest" is ambiguous — you do not know which code it contains.' }],
  resources: [{ title: 'GHCR', url: 'https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry', type: 'docs' }],
  whatToReadNext: 'Read about Kubernetes Basics (next lesson) — pods, services, deployments.',
};

export const dockerL10: Lesson = {
  slug: 'k8s-basics', title: 'Kubernetes Basics — Pods, Services, Deployments',
  subtitle: 'Orchestrate containers at scale with Kubernetes',
  duration: 85, difficulty: 'Advanced', phase: 'Advanced', xp: 300, moduleSlug: 'docker',
  objectives: ['Understand K8s architecture (control plane, nodes)','Create Pods (smallest unit)','Create Deployments (manage replicas)','Create Services (stable network endpoint)','Use kubectl to manage resources'],
  realWorldContext: 'Kubernetes is how companies like Google, Netflix, and Uber run thousands of containers. Docker Compose runs on one machine. Kubernetes runs across hundreds of machines. It handles: scaling, self-healing, rolling updates, load balancing. This is the standard for production container orchestration.',
  prerequisites: ['Completed Docker L1-L9'],
  conceptDiagram: `KUBERNESTES ARCHITECTURE:
  Control Plane (master):
    API Server, Scheduler, Controller Manager, etcd
  
  Nodes (workers):
    kubelet, kube-proxy, container runtime
  
  K8S OBJECTS:
  Pod: smallest unit (1+ containers)
  Deployment: manages N replicas of a Pod
  Service: stable network endpoint for Pods

  FLOW:
  kubectl apply -f deployment.yaml
  → K8s creates 3 Pod replicas
  → If one dies, K8s replaces it automatically
  → Service routes traffic to healthy Pods`,
  conceptExplanation: ['A Pod is the smallest deployable unit in K8s. It contains 1+ containers that share network and storage. You rarely create Pods directly — you create Deployments which manage Pods.','A Deployment ensures N replicas of your Pod are always running. If a Pod dies, K8s creates a new one. To update: change the image, K8s rolls out new Pods gradually while terminating old ones (zero downtime).','A Service provides a stable IP and DNS name for Pods. Pod IPs change (they are ephemeral). Service IP is stable. Types: ClusterIP (internal), NodePort (node port), LoadBalancer (cloud LB). Services route traffic to healthy Pods.'],
  whyItMatters: 'Docker Compose runs on one machine. When that machine dies, your app is down. Kubernetes runs across multiple machines — if one dies, K8s moves Pods to another. This is how companies achieve 99.99% uptime (52 minutes downtime per year).',
  codeExamples: [
    { filename: 'deployment.yaml', language: 'yaml', approach: 'real-world', code: `# Deployment: manages 3 replicas of your API
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3  # always 3 running
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: ghcr.io/myrepo/api:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          value: "postgresql://db:5432/mydb"
        resources:
          requests:  # minimum
            cpu: "100m"
            memory: "128Mi"
          limits:    # maximum
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:  # is it alive?
          httpGet:
            path: /health
            port: 8000
        readinessProbe:  # is it ready?
          httpGet:
            path: /ready
            port: 8000
---
# Service: stable endpoint for the Deployment
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api  # routes to Pods with this label
  ports:
  - port: 80
    targetPort: 8000
  type: ClusterIP  # internal only`,
    explanation: 'Deployment: 3 replicas, resource limits, liveness/readiness probes. Service: routes to Pods. K8s auto-restarts dead Pods, rolls updates without downtime.' },
  ],
  configFiles: [],
  lab: { title: 'Deploy to K8s', steps: [
    { step: 1, title: 'Start cluster', instruction: 'Use kind (local K8s)', command: 'kind create cluster' },
    { step: 2, title: 'Apply deployment', instruction: 'Create 3 replicas', command: 'kubectl apply -f deployment.yaml' },
    { step: 3, title: 'Verify', instruction: 'Check pods', command: 'kubectl get pods', expectedOutput: '3 pods running' },
    { step: 4, title: 'Test self-healing', instruction: 'Kill a pod', command: 'kubectl delete pod <pod-name> && kubectl get pods', expectedOutput: 'K8s creates a new pod automatically!' },
    { step: 5, title: 'Port forward', instruction: 'Access the service', command: 'kubectl port-forward svc/api 8080:80', verification: 'curl http://localhost:8080/health' },
  ]},
  commonErrors: [{ error: 'Pod status: CrashLoopBackOff', fix: 'Check logs: kubectl logs <pod>. Check liveness probe path. Check environment variables. Common: wrong DATABASE_URL, missing env var, wrong port.', rootCause: 'Container starts then crashes. K8s restarts it, crashes again, loops. Check logs to find the crash reason.' }],
  quiz: [
    { question: 'What is a Pod?', options: ['A container', 'Smallest K8s unit — 1+ containers sharing network/storage', 'A service', 'A node'], correctIndex: 1, explanation: 'A Pod is the smallest deployable unit. It contains 1+ containers that share network and storage. You usually create Deployments, not Pods directly.' },
    { question: 'What does a Deployment do?', options: ['Runs one container', 'Manages N replicas, auto-restarts dead pods, rolling updates', 'Routes traffic', 'Stores data'], correctIndex: 1, explanation: 'Deployment ensures N replicas are always running. If a Pod dies, K8s replaces it. To update: change image, K8s rolls out gradually (zero downtime).' },
  ],
  resources: [{ title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/', type: 'docs' }, { title: 'kind (local K8s)', url: 'https://kind.sigs.k8s.io/', type: 'tool', isHiddenGem: true }],
  whatToReadNext: 'Read about K8s ConfigMaps, Secrets, Volumes (next lesson).',
};

// L11-L15 — real content
export const dockerL11: Lesson = {
  slug: 'k8s-config', title: 'K8s ConfigMaps, Secrets, Volumes',
  subtitle: 'Manage configuration and sensitive data in Kubernetes',
  duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'docker',
  objectives: ['Create ConfigMaps for non-sensitive config','Create Secrets for passwords and API keys','Mount config as environment variables or files','Use PersistentVolumes for database data','Use StatefulSets for databases'],
  realWorldContext: 'Every app needs configuration: DATABASE_URL, API keys, feature flags. In K8s, ConfigMaps store non-sensitive config, Secrets store passwords. Without these, you bake config into the image (bad — different config per environment).',
  prerequisites: ['Completed Docker L1-L10'],
  conceptDiagram: `CONFIGMAP vs SECRET:
  ConfigMap: non-sensitive (DATABASE_HOST, LOG_LEVEL)
  Secret: sensitive (DATABASE_PASSWORD, API_KEY) — base64 encoded

  MOUNT AS:
  Environment variables: envFrom: configMapRef
  Files: mount as volume (config files)

  PERSISTENT VOLUME:
  For databases — data survives pod restart
  PVC (PersistentVolumeClaim) requests storage`,
  conceptExplanation: ['ConfigMaps store configuration as key-value pairs. Mount as env vars: envFrom: configMapRef: name: app-config. Or mount as files: volumes with configMap. Change config without rebuilding the image.','Secrets store sensitive data (passwords, tokens, keys). Base64-encoded (NOT encrypted — enable encryption at rest in production). Mount same way as ConfigMaps. Never commit Secrets to git — use Sealed Secrets or External Secrets.','PersistentVolumes (PV) and PersistentVolumeClaims (PVC) provide durable storage. Essential for databases — without PV, data is lost when Pod restarts. For databases, use StatefulSet (not Deployment) — gives stable pod names and storage.'],
  whyItMatters: 'Without ConfigMaps/Secrets, you hardcode config in the image (one image per environment — bad). Without PersistentVolumes, your database loses all data on Pod restart. These are essential for any real K8s deployment.',
  codeExamples: [
    { filename: 'config.yaml', language: 'yaml', approach: 'real-world', code: `# ConfigMap: non-sensitive config
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_HOST: "postgres.default.svc.cluster.local"
  DATABASE_PORT: "5432"
  LOG_LEVEL: "INFO"
  CORS_ORIGINS: "https://myapp.com"
---
# Secret: sensitive data (base64 encoded)
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:  # plaintext (auto-encoded to base64)
  DATABASE_PASSWORD: "super-secret-pass"
  JWT_SECRET_KEY: "jwt-signing-key"
  STRIPE_API_KEY: "sk_test_xxx"
---
# Deployment using config + secrets
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels: { app: api }
  template:
    metadata:
      labels: { app: api }
    spec:
      containers:
      - name: api
        image: myapp:latest
        envFrom:
        - configMapRef: { name: app-config }   # all ConfigMap keys as env
        - secretRef: { name: app-secrets }      # all Secret keys as env
        ports:
        - containerPort: 8000
---
# PersistentVolumeClaim for database
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pgdata
spec:
  accessModes: ["ReadWriteOnce"]
  resources:
    requests:
      storage: 10Gi`,
    explanation: 'ConfigMap for config, Secret for passwords (stringData = plaintext, auto-encoded). envFrom injects all as env vars. PVC for database storage (10Gi).' },
  ],
  configFiles: [],
  lab: { title: 'Add Config and Secrets', steps: [{ step: 1, title: 'Create ConfigMap', instruction: 'Define config', command: 'kubectl apply -f configmap.yaml' }, { step: 2, title: 'Create Secret', instruction: 'Define secrets', command: 'kubectl apply -f secret.yaml' }, { step: 3, title: 'Use in Deployment', instruction: 'Mount as env vars', command: 'kubectl apply -f deployment.yaml with envFrom' }] },
  commonErrors: [{ error: 'Secret shows as plaintext in kubectl describe', fix: 'Secrets are base64-encoded, NOT encrypted. Enable EncryptionConfiguration for encryption at rest. Use External Secrets Operator for production (pulls from Vault/AWS Secrets Manager).', rootCause: 'Base64 is encoding, not encryption. Anyone with kubectl access can decode Secrets. Use RBAC to limit access, enable encryption at rest.' }],
  quiz: [{ question: 'ConfigMap vs Secret?', options: ['Same thing', 'ConfigMap for non-sensitive config, Secret for passwords/keys (base64 encoded)', 'Secret is encrypted', 'ConfigMap is faster'], correctIndex: 1, explanation: 'ConfigMap: DATABASE_HOST, LOG_LEVEL (non-sensitive). Secret: DATABASE_PASSWORD, API_KEY (sensitive, base64-encoded). Both mounted as env vars or files.' }],
  resources: [{ title: 'K8s ConfigMaps', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/', type: 'docs' }],
  whatToReadNext: 'Read about K8s Ingress, Helm (next lesson).',
};

export const dockerL12: Lesson = {
  slug: 'k8s-ingress', title: 'K8s Ingress, Helm, Autoscaling',
  subtitle: 'Route traffic, package apps, and scale automatically',
  duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'docker',
  objectives: ['Set up Ingress for HTTP routing and TLS','Package apps with Helm charts','Configure Horizontal Pod Autoscaler (HPA)','Understand when to scale','Use Helm for deployments'],
  realWorldContext: 'Ingress is how you route HTTP traffic to multiple services (api.example.com → API, app.example.com → Frontend). Helm is the package manager for K8s — like pip for Python. HPA scales your app automatically based on CPU/memory. Used by every K8s production deployment.',
  prerequisites: ['Completed Docker L1-L11'],
  conceptDiagram: `INGRESS:
  Internet → Ingress Controller (Nginx) → routes by hostname/path
    api.example.com → API Service
    app.example.com → Frontend Service
  
  HELM:
  Package manager for K8s (like pip for Python)
  helm create mychart → generates chart template
  helm install myapp ./mychart → deploys to K8s
  helm upgrade myapp ./mychart → updates

  HPA (Horizontal Pod Autoscaler):
  CPU > 80% → scale up (add pods)
  CPU < 30% → scale down (remove pods)
  Automatic, based on metrics`,
  conceptExplanation: ['Ingress routes HTTP traffic by hostname and path. It terminates TLS (HTTPS) and forwards to Services. Without Ingress, each Service needs its own LoadBalancer (expensive on cloud). With Ingress, one LoadBalancer routes to all services.','Helm packages K8s manifests into reusable charts. Values.yaml for configuration. helm install deploys, helm upgrade updates, helm rollback reverts. Helm is how you install third-party apps (PostgreSQL, Redis, Prometheus) on K8s.','HPA automatically scales Pods based on CPU/memory. If CPU > 80%, add Pods. If < 30%, remove. This saves money — you only use resources when needed. Requires Metrics Server.'],
  whyItMatters: 'Without Ingress, you expose each service separately (expensive, no TLS). Without Helm, you manage raw YAML (no reuse, no versioning). Without HPA, you over-provision (pay for idle) or under-provision (slow under load). These are production K8s essentials.',
  codeExamples: [
    { filename: 'ingress.yaml', language: 'yaml', approach: 'real-world', code: `# Ingress: route by hostname
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  tls:
  - hosts: [api.example.com]
    secretName: api-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service: { name: api, port: { number: 80 } }
---
# HPA: auto-scale based on CPU
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80  # scale up if CPU > 80%`,
    explanation: 'Ingress: TLS with cert-manager, routes api.example.com to api Service. HPA: 2-10 replicas, scales up if CPU > 80%, down if < 80%.' },
  ],
  configFiles: [],
  lab: { title: 'Add Ingress and Helm', steps: [{ step: 1, title: 'Install Ingress controller', instruction: 'Install Nginx Ingress', command: 'kubectl apply -f https://k8s.io/ingress-nginx/deploy' }, { step: 2, title: 'Create Ingress', instruction: 'Route traffic', command: 'kubectl apply -f ingress.yaml' }, { step: 3, title: 'Create Helm chart', instruction: 'Package your app', command: 'helm create myapp && helm install myapp ./myapp' }] },
  commonErrors: [{ error: 'Ingress not routing', fix: 'Check that Ingress controller is running: kubectl get pods -n ingress-nginx. Check Ingress rules: kubectl describe ingress. Check service exists.', rootCause: 'Ingress controller not installed, or service name/port mismatch in Ingress rules.' }],
  quiz: [{ question: 'What does Helm do?', options: ['Routes traffic', 'Packages K8s manifests into reusable charts (like pip for Python)', 'Scales pods', 'Monitors'], correctIndex: 1, explanation: 'Helm is the K8s package manager. Charts package YAML manifests with configurable values. helm install deploys, helm upgrade updates, helm rollback reverts. Install third-party apps (PostgreSQL, Redis) with Helm.' }],
  resources: [{ title: 'K8s Ingress', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/', type: 'docs' }, { title: 'Helm', url: 'https://helm.sh/', type: 'docs' }],
  whatToReadNext: 'Read about Docker Security (next lesson).',
};

export const dockerL13: Lesson = {
  slug: 'docker-security', title: 'Docker Security — Scanning, Non-root, Distroless',
  subtitle: 'Secure your Docker containers',
  duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'docker',
  objectives: ['Scan images for vulnerabilities (Trivy, Grype)','Run as non-root user','Use distroless images (no shell, no package manager)','Sign images (cosign)','Reduce attack surface'],
  realWorldContext: 'A container with known vulnerabilities is a security risk. Attackers scan for vulnerable images. Companies like Google use distroless images (no shell, no package manager — nothing to exploit). Trivy scans images for CVEs. Security is non-negotiable in production.',
  prerequisites: ['Completed Docker L1-L12'],
  conceptDiagram: `SECURITY LAYERS:
  1. Scan: trivy image myapp (find CVEs)
  2. Non-root: USER appuser (no root access)
  3. Distroless: no shell, no apt, no curl (nothing to exploit)
  4. Read-only: --read-only filesystem
  5. Sign: cosign sign (verify image integrity)

  DISTROLESS vs SLIM:
  slim: has shell, package manager (can install tools)
  distroless: only runtime, no shell, no tools (nothing to exploit)`,
  conceptExplanation: ['Trivy scans images for known vulnerabilities (CVEs). Run in CI: trivy image myapp. Fail build if HIGH/CRITICAL vulnerabilities found. Fix by updating base image or packages.','Non-root: containers run as root by default. If attacker breaks in, they have root. Add RUN useradd appuser && USER appuser. This limits what an attacker can do.','Distroless images (gcr.io/distroless/python3) have NO shell, NO package manager, NO utilities. Only the runtime. An attacker who breaks in has nothing to work with — no curl, no wget, no bash.'],
  whyItMatters: 'A vulnerable container = a compromised server. Attackers scan for known CVEs. Without non-root, they get root access. Without distroless, they have tools to escalate. Security is every engineer\'s responsibility.',
  codeExamples: [
    { filename: 'Dockerfile', language: 'dockerfile', approach: 'production', code: `# Distroless: no shell, no package manager
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --target=/deps -r requirements.txt

# Distroless runtime (no shell!)
FROM gcr.io/distroless/python3-debian12
WORKDIR /app
COPY --from=builder /deps /deps
COPY . .
ENV PYTHONPATH=/deps
USER nonroot  # distroless has nonroot user built-in
CMD ["main.py"]`, explanation: 'Distroless: no shell, no apt, no curl. Only Python runtime. An attacker who exploits your app has nothing to work with. USER nonroot built-in.' },
  ],
  configFiles: [],
  lab: { title: 'Secure Your Image', steps: [{ step: 1, title: 'Scan', instruction: 'Scan for vulnerabilities', command: 'trivy image myapp', expectedOutput: 'List of CVEs' }, { step: 2, title: 'Fix', instruction: 'Update base image', command: 'Update FROM to latest slim, rebuild' }, { step: 3, title: 'Verify', instruction: 'Rescan', command: 'trivy image myapp --severity HIGH,CRITICAL', expectedOutput: 'No HIGH/CRITICAL vulnerabilities' }] },
  commonErrors: [{ error: 'Cannot exec into distroless container', fix: 'Distroless has no shell. You cannot docker exec. Use kubectl debug or ephemeral containers for debugging. This is a feature, not a bug — attackers cannot exec either.', rootCause: 'Distroless images intentionally have no shell. This is a security feature. Use kubectl debug for troubleshooting.' }],
  quiz: [{ question: 'Why use distroless images?', options: ['Smaller', 'No shell/package manager = nothing for attackers to exploit', 'Faster', 'Required'], correctIndex: 1, explanation: 'Distroless has only the runtime (Python, Node). No shell, no apt, no curl. An attacker who exploits your app has nothing to work with. Smaller attack surface = more secure.' }],
  resources: [{ title: 'Trivy', url: 'https://github.com/aquasecurity/trivy', type: 'tool' }, { title: 'Distroless', url: 'https://github.com/GoogleContainerTools/distroless', type: 'docs' }],
  whatToReadNext: 'Read about Monitoring (next lesson).',
};

export const dockerL14: Lesson = {
  slug: 'monitoring', title: 'Monitoring — Prometheus, Grafana, Logging',
  subtitle: 'Monitor your Docker and K8s infrastructure',
  duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'docker',
  objectives: ['Set up Prometheus for metrics collection','Create Grafana dashboards','Collect logs with Loki or ELK','Monitor container health','Set up alerts'],
  realWorldContext: 'Without monitoring, you do not know your app is slow until users complain. Prometheus + Grafana is the industry standard — used by every K8s cluster. Companies like DigitalOcean and GitLab use this exact stack. You cannot run production without monitoring.',
  prerequisites: ['Completed Docker L1-L13'],
  conceptDiagram: `MONITORING STACK:
  Your App → /metrics (Prometheus format) → Prometheus → Grafana → Dashboards
                                                                     ↓
                                                                  Alerts

  PROMETHEUS: scrapes metrics (CPU, memory, requests, errors)
  GRAFANA: visualizes metrics (dashboards, charts)
  LOKI: collects logs (structured JSON)
  ALERTMANAGER: sends alerts (Slack, email)`,
  conceptExplanation: ['Prometheus scrapes metrics from your app (GET /metrics). Stores time-series data. Query with PromQL: rate(http_requests_total[5m]) gives requests per second. Auto-discovers targets in K8s.','Grafana visualizes Prometheus data. Create dashboards: request rate, error rate, P99 latency, CPU usage. Pre-built dashboards available (import by ID). Set alerts: "error rate > 5% → alert Slack."','Logs: Loki (lightweight, integrates with Grafana) or ELK (Elasticsearch + Logstash + Kibana). Structured JSON logs are searchable. "Show me all ERROR logs for request_id=abc123 in the last hour."'],
  whyItMatters: 'Without monitoring, you are flying blind. You do not know: is the app slow? Are there errors? Is disk full? Is CPU at 100%? Monitoring gives you visibility — the ability to see problems before users do.',
  codeExamples: [
    { filename: 'docker-compose.yml', language: 'yaml', approach: 'real-world', code: `services:
  prometheus:
    image: prom/prometheus
    ports: ["9090:9090"]
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml"]
    
  grafana:
    image: grafana/grafana
    ports: ["3001:3000"]
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    depends_on: [prometheus]

  # Your app exposes /metrics
  api:
    build: .
    ports: ["8000:8000"]
    # Install prometheus-fastapi-instrumentator in your app`,
    explanation: 'Prometheus scrapes metrics, Grafana visualizes. Add prometheus-fastapi-instrumentator to your FastAPI app for automatic metrics.' },
  ],
  configFiles: [{ filename: 'prometheus.yml', language: 'yaml', content: `scrape_configs:\n  - job_name: api\n    scrape_interval: 5s\n    static_configs:\n      - targets: ["api:8000"]`, comment: 'Prometheus config: scrape your API every 5 seconds' }],
  lab: { title: 'Add Monitoring', steps: [{ step: 1, title: 'Add to compose', instruction: 'Add Prometheus + Grafana', command: 'Add prometheus and grafana services to docker-compose.yml' }, { step: 2, title: 'Expose metrics', instruction: 'Add /metrics to your app', command: 'Install prometheus-fastapi-instrumentator, add Instrumentator().instrument(app).expose(app)' }, { step: 3, title: 'View dashboard', instruction: 'Open Grafana', command: 'Open localhost:3001 (admin/admin), add Prometheus datasource, create dashboard', verification: 'See request rate, latency, error rate in real-time' }] },
  commonErrors: [{ error: 'Prometheus cannot reach target', fix: 'Check that api is on the same network as Prometheus. In Compose, all services share a network. Use service name as hostname: api:8000.', rootCause: 'Prometheus and app on different networks, or wrong hostname in prometheus.yml.' }],
  quiz: [{ question: 'What are the 3 pillars of observability?', options: ['CPU, memory, disk', 'Metrics, logs, traces', 'Frontend, backend, DB', 'GET, POST, DELETE'], correctIndex: 1, explanation: 'Metrics (Prometheus — numbers over time), Logs (Loki/ELK — events), Traces (OpenTelemetry — request flow). Together: full visibility into production.' }],
  resources: [{ title: 'Prometheus', url: 'https://prometheus.io/docs/', type: 'docs' }, { title: 'Grafana', url: 'https://grafana.com/docs/', type: 'docs' }],
  whatToReadNext: 'Read about GitOps (next lesson) — ArgoCD, Flux, declarative deploy.',
};

export const dockerL15: Lesson = {
  slug: 'gitops', title: 'GitOps — ArgoCD, Flux, Declarative Deploy',
  subtitle: 'Deploy by pushing to Git, not running commands',
  duration: 75, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'docker',
  objectives: ['Understand GitOps principles','Install ArgoCD on K8s','Connect Git repo to ArgoCD','Auto-deploy on Git push','Rollback by reverting Git commit'],
  realWorldContext: 'GitOps is the modern way to deploy. Your Git repo is the source of truth. Push to Git → ArgoCD detects change → deploys to K8s automatically. No kubectl apply, no SSH to server. Companies like Intuit and BlackRock use GitOps. It is the future of deployment.',
  prerequisites: ['Completed Docker L1-L14'],
  conceptDiagram: `GITOPS FLOW:
  Developer pushes YAML to Git
  → ArgoCD detects change
  → ArgoCD applies YAML to K8s
  → App deployed

  ROLLBACK:
  Revert Git commit → ArgoCD reverts deployment

  BENEFITS:
  • Git is the source of truth (audit trail)
  • No kubectl apply (no manual access to cluster)
  • Easy rollback (git revert)
  • Multi-environment (dev/staging/prod branches)`,
  conceptExplanation: ['GitOps: Git repo contains K8s manifests (YAML). ArgoCD watches the repo. When YAML changes, ArgoCD applies it to K8s. No one runs kubectl manually — Git is the source of truth.','Benefits: audit trail (every change is a Git commit), easy rollback (git revert), no direct cluster access (developers push to Git, ArgoCD deploys), multi-environment (dev branch → dev cluster, main branch → prod cluster).','ArgoCD UI shows deployment status: Synced (Git matches cluster), OutOfSync (Git has changes not yet applied), Healthy (pods running). Click "Sync" to apply, or enable auto-sync for automatic deployment.'],
  whyItMatters: 'Without GitOps, deployment is manual (kubectl apply, SSH to server). No audit trail. Hard to rollback. With GitOps, deployment = git push. Full audit trail. Rollback = git revert. This is how modern teams deploy.',
  codeExamples: [
    { filename: 'argocd-app.yaml', language: 'yaml', approach: 'production', code: `# ArgoCD Application: deploy from Git
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/me/myapp-deploy
    targetRevision: main
    path: manifests/  # K8s YAML files in this directory
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:  # auto-deploy on Git push
      prune: true  # delete resources removed from Git
      selfHeal: true  # undo manual changes (Git is source of truth)`,
    explanation: 'ArgoCD Application: watches Git repo, deploys manifests/ directory to K8s. auto-sync = deploys on Git push. selfHeal = reverts manual kubectl changes (Git is truth).' },
  ],
  configFiles: [],
  lab: { title: 'Set Up GitOps', steps: [{ step: 1, title: 'Install ArgoCD', instruction: 'Install on K8s', command: 'kubectl create namespace argocd && kubectl apply -n argocd -f https://argoproj.github.io/argo-cd/manifests/install.yaml' }, { step: 2, title: 'Create Application', instruction: 'Connect Git repo', command: 'kubectl apply -f argocd-app.yaml' }, { step: 3, title: 'Deploy', instruction: 'Push to Git', command: 'Change YAML in Git repo, push, ArgoCD auto-deploys', verification: 'ArgoCD UI shows Synced + Healthy' }] },
  commonErrors: [{ error: 'ArgoCD shows OutOfSync', fix: 'Click Sync in ArgoCD UI, or enable auto-sync in syncPolicy. Check that Git repo path matches manifest directory.', rootCause: 'Git has changes not yet applied to K8s. Sync to apply, or enable automated sync.' }],
  quiz: [{ question: 'What is GitOps?', options: ['Git-based CI/CD', 'Git is the source of truth — push to Git triggers deployment (no kubectl)', 'GitHub-only', 'A Git branch strategy'], correctIndex: 1, explanation: 'GitOps: Git repo contains K8s manifests. Push to Git → ArgoCD/Flux deploys to K8s. No manual kubectl. Rollback = git revert. Full audit trail.' }],
  resources: [{ title: 'ArgoCD', url: 'https://argo-cd.readthedocs.io/', type: 'docs' }, { title: 'GitOps Principles', url: 'https://opengitops.dev/', type: 'article' }],
  whatToReadNext: 'Congratulations! You completed the Docker module. Move to ML Engineering.',
};
