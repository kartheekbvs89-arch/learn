import { Module } from '../types';

export const dockerModule: Module = {
  id: 'docker',
  title: 'Docker & Deployment',
  icon: '🐳',
  color: '#2496ED',
  gradient: 'linear-gradient(135deg, #2496ED 0%, #0DB7ED 100%)',
  description: 'Containerize applications, manage multi-service stacks with Compose, and deploy to production.',
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
      id: 'dk-01',
      title: 'What is Docker? Containers vs VMs',
      subtitle: 'Why containers, images, layers, registries',
      duration: 40,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Docker is a platform for developing, shipping, and running applications in containers. A container is a lightweight, standalone package that includes everything an app needs to run: code, runtime, libraries, system tools. Containers share the host OS kernel - making them much lighter than VMs.',
        'VMs virtualize hardware - each VM has a full OS. Containers virtualize at the OS level - they share the kernel but isolate processes. A VM might be 2GB, a container might be 50MB. VMs take minutes to start, containers take seconds.',
        'Key concepts: Image (blueprint, read-only), Container (running instance of image), Dockerfile (recipe to build an image), Registry (where images are stored - Docker Hub, GitHub Container Registry, AWS ECR), Volume (persistent storage), Network (communication between containers).',
        'Why use Docker? 1) "Works on my machine" becomes "works everywhere", 2) Consistent dev/prod environments, 3) Easy scaling with orchestrators (Kubernetes, Docker Swarm), 4) Microservices-friendly, 5) Reproducible builds, 6) Easy CI/CD.'
      ],
      codeExamples: [
        {
          filename: 'docker_basics.sh',
          language: 'bash',
          code: '# Install Docker: https://docs.docker.com/get-docker/\n\n# Pull an image from Docker Hub\ndocker pull python:3.12-slim\n\n# Run a container\ndocker run python:3.12-slim python -c "print(\'Hello from container\')"\n\n# Run interactive terminal\ndocker run -it python:3.12-slim bash\n\n# Run with name and detached\ndocker run -d --name myapp python:3.12-slim sleep 3600\n\n# List running containers\ndocker ps\n\n# List all containers (including stopped)\ndocker ps -a\n\n# Stop/start/remove\ndocker stop myapp\ndocker start myapp\ndocker rm myapp\n\n# List images\ndocker images\n\n# Remove image\ndocker rmi python:3.12-slim\n\n# View logs\ndocker logs myapp\ndocker logs -f myapp  # follow\n\n# Execute command in running container\ndocker exec -it myapp bash\n\n# Copy files in/out\ndocker cp file.txt myapp:/tmp/\ndocker cp myapp:/app/output.txt .\n\n# Port mapping (host:container)\ndocker run -p 8000:8000 myapi\n# Now localhost:8000 -> container:8000\n\n# Volume mapping (host:container)\ndocker run -v /host/data:/container/data myapp',
          explanation: 'Core commands: pull (download), run (create+start container), ps (list), exec (run command inside), logs (view output), cp (copy files). Use -p for ports, -v for volumes.'
        },
        {
          filename: 'Dockerfile',
          language: 'dockerfile',
          code: '# Dockerfile - recipe to build an image\n\n# Start from a base image (use slim/alpine for smaller images)\nFROM python:3.12-slim\n\n# Set working directory inside container\nWORKDIR /app\n\n# Install system dependencies (if needed)\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    build-essential \\\n    && rm -rf /var/lib/apt/lists/*\n\n# Copy requirements first (better caching)\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copy application code\nCOPY . .\n\n# Expose port (documentation only - still need -p to publish)\nEXPOSE 8000\n\n# Set environment variables\nENV PYTHONUNBUFFERED=1 \\\n    PYTHONDONTWRITEBYTECODE=1\n\n# Run as non-root user (security)\nRUN useradd -m appuser\nUSER appuser\n\n# Default command\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]',
          explanation: 'Order matters for caching! Copy requirements.txt first, install, THEN copy code. Code changes frequently - deps rarely. This way, dep install is cached and only runs when requirements.txt changes.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a Dockerfile for a Node.js Express app. Use node:20-alpine base, install deps, copy code, expose 3000.',
          starterCode: '# your Dockerfile\n',
          hint: 'Same pattern: FROM, WORKDIR, COPY package.json, RUN npm install, COPY ., EXPOSE, CMD.',
          solution: 'FROM node:20-alpine\n\nWORKDIR /app\n\nCOPY package*.json ./\nRUN npm ci --only=production\n\nCOPY . .\n\nEXPOSE 3000\n\nUSER node\n\nCMD ["node", "server.js"]',
          solutionLanguage: 'dockerfile'
        },
      ],
      quiz: [
        {
          question: 'What is the main difference between containers and VMs?',
          options: ['Containers are slower', 'Containers share the host kernel, VMs have full OS', 'VMs are smaller', 'No difference'],
          correctIndex: 1,
          explanation: 'Containers share the host OS kernel (lighter, faster). VMs virtualize hardware and run a full OS (heavier, slower).'
        },
        {
          question: 'What is a Docker image?',
          options: ['A running container', 'A blueprint for containers (read-only)', 'A registry', 'A volume'],
          correctIndex: 1,
          explanation: 'An image is a read-only blueprint. A container is a running instance of an image. Build images with Dockerfile.'
        },
        {
          question: 'Why copy requirements.txt before the code?',
          options: ['Convention only', 'Better layer caching - deps only reinstall when requirements change', 'Required by Docker', 'For security'],
          correctIndex: 1,
          explanation: 'Docker caches layers. Code changes often, deps rarely. Copying requirements first means dep install is cached and fast on rebuilds.'
        }
      ],
      keyTakeaways: [
        'Containers are lightweight (share host kernel) vs VMs (full OS)',
        'Image = blueprint (read-only), Container = running instance',
        'Dockerfile is the recipe to build images',
        'Order Dockerfile commands for caching: deps first, code last',
        'Use slim/alpine base images for smaller, faster builds',
        'Run as non-root user for security'
      ],
      resources: [
        { title: 'Docker Documentation', url: 'https://docs.docker.com/', type: 'docs' },
        { title: 'Docker Curriculum (free)', url: 'https://docker-curriculum.com/', type: 'article' },
        { title: 'Play with Docker', url: 'https://labs.play-with-docker.com/', type: 'interactive', isHiddenGem: true },
      ]
    },

    {
      id: 'dk-02',
      title: 'Docker Compose for Multi-Service Apps',
      subtitle: 'Define, run, connect multiple containers',
      duration: 50,
      difficulty: 'Intermediate',
      phase: 'Foundation',
      content: [
        'Docker Compose defines multi-container applications in a docker-compose.yml file. One command (`docker compose up`) starts everything: API, database, cache, frontend. Perfect for development environments and small production deployments.',
        'Services in compose can communicate via service name as hostname. The web service can connect to db at `db:5432` - Compose sets up DNS automatically. Use `depends_on` for startup order (but use healthchecks for true readiness).',
        'Volumes persist data across container restarts. Named volumes (managed by Docker) are best for databases. Bind mounts (host:container) are best for development - code changes reflect immediately.',
        'Compose has environments: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up`. The prod file overrides dev settings. Use .env file for secrets - never commit them.'
      ],
      codeExamples: [
        {
          filename: 'docker-compose.yml',
          language: 'yaml',
          code: '# docker-compose.yml - multi-service FastAPI app\nservices:\n  api:\n    build: .\n    ports:\n      - "8000:8000"\n    environment:\n      - DATABASE_URL=postgresql://user:pass@db:5432/mydb\n      - REDIS_URL=redis://redis:6379/0\n      - SECRET_KEY=\\$\\{SECRET_KEY\\}\n    depends_on:\n      db:\n        condition: service_healthy\n      redis:\n        condition: service_started\n    volumes:\n      - ./:/app  # dev: code hot-reload\n    command: uvicorn main:app --host 0.0.0.0 --reload\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n      POSTGRES_DB: mydb\n    ports:\n      - "5432:5432"\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U user"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n\n  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n    volumes:\n      - redis_data:/data\n\n  # Optional: frontend\n  web:\n    build: ./frontend\n    ports:\n      - "3000:3000"\n    depends_on:\n      - api\n    environment:\n      - NEXT_PUBLIC_API_URL=http://localhost:8000\n\nvolumes:\n  postgres_data:\n  redis_data:',
          explanation: 'Services connect by service name (db, redis). depends_on with healthcheck waits for DB to be ready. Named volumes persist data. Bind mounts for dev hot-reload.'
        },
        {
          filename: 'compose_commands.sh',
          language: 'bash',
          code: '# Start all services (foreground, see logs)\ndocker compose up\n\n# Start in background (detached)\ndocker compose up -d\n\n# Rebuild images before starting\ndocker compose up --build\n\n# Start specific service only\ndocker compose up db redis\n\n# View logs\ndocker compose logs -f api\n\n# Stop all services\ndocker compose down\n\n# Stop and remove volumes (DESTRUCTIVE!)\ndocker compose down -v\n\n# Stop and remove images\ndocker compose down --rmi all\n\n# List running services\ndocker compose ps\n\n# Run command in service\ndocker compose exec api bash\ndocker compose run api python migrate.py\n\n# Restart a service\ndocker compose restart api\n\n# Use multiple compose files (override)\n# docker-compose.yml (base) + docker-compose.prod.yml (overrides)\ndocker compose -f docker-compose.yml -f docker-compose.prod.yml up\n\n# docker-compose.prod.yml example:\n# services:\n#   api:\n#     command: gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker\n#     restart: always\n#     volumes: !reset []  # clear dev volumes',
          explanation: 'Common commands: up (start), down (stop), logs, exec (run command), ps (list). Use -f to overlay prod/dev configs. !reset clears inherited lists.'
        },
      ],
      exercises: [
        {
          prompt: 'Add a Celery worker service to the compose file that uses the same image as api but runs celery -A tasks worker.',
          starterCode: '# Add to services: in docker-compose.yml\nworker:\n  # your config\n',
          hint: 'Use build: ., depends_on redis, same env vars, command celery.',
          solution: 'worker:\n  build: .\n  command: celery -A tasks worker --loglevel=info\n  environment:\n    - DATABASE_URL=postgresql://user:pass@db:5432/mydb\n    - REDIS_URL=redis://redis:6379/0\n  depends_on:\n    - api\n    - redis\n  volumes:\n    - ./:/app',
          solutionLanguage: 'yaml'
        },
      ],
      quiz: [
        {
          question: 'How do services communicate in Compose?',
          options: ['By IP address', 'By service name as hostname', 'Cannot communicate', 'Via host network only'],
          correctIndex: 1,
          explanation: 'Compose sets up DNS - services can reach each other by service name. e.g., web can connect to db at db:5432.'
        },
        {
          question: 'What does depends_on with healthcheck do?',
          options: ['Nothing special', 'Waits for the dependency to be healthy (not just started)', 'Forces restart order', 'Adds network rules'],
          correctIndex: 1,
          explanation: 'condition: service_healthy waits for the healthcheck to pass. Without it, depends_on only waits for the container to start (not be ready).'
        },
        {
          question: 'Why use named volumes for databases?',
          options: ['Faster', 'Data persists across container recreation', 'Required by Docker', 'For networking'],
          correctIndex: 1,
          explanation: 'Named volumes persist data even when containers are removed. Without a volume, db data is lost on docker compose down.'
        }
      ],
      keyTakeaways: [
        'Compose defines multi-container apps in one YAML file',
        'Services connect by service name (auto DNS)',
        'Use depends_on with healthcheck for startup order',
        'Named volumes persist data, bind mounts for dev hot-reload',
        'Use multiple compose files to override settings per environment',
        'Commands: up, down, logs, exec, ps, run'
      ],
      resources: [
        { title: 'Docker Compose Documentation', url: 'https://docs.docker.com/compose/', type: 'docs' },
        { title: 'Compose File Reference', url: 'https://docs.docker.com/compose/compose-file/', type: 'docs' },
      ]
    },

    {
      id: 'dk-03',
      title: 'Production Deployment & Best Practices',
      subtitle: 'Multi-stage builds, security, Nginx reverse proxy, CI/CD',
      duration: 60,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Multi-stage builds create smaller production images. Use one stage to build (with compilers), another to run (only runtime). Final image can be 10x smaller. Especially important for compiled languages (Go, Rust) but also useful for Python (separate build deps from runtime).',
        'Security best practices: 1) Run as non-root user, 2) Use minimal base images (alpine, distroless), 3) Scan with trivy/grype, 4) Never bake secrets into images - use env vars/vaults, 5) Pin versions (not :latest), 6) Use .dockerignore to exclude sensitive files, 7) Enable Docker Content Trust.',
        'Nginx as reverse proxy: handles TLS termination, static files, load balancing, rate limiting, gzip. Put Nginx in front of your app: client -> Nginx (443) -> App (8000). Use docker-compose with Nginx service.',
        'CI/CD with GitHub Actions: build image on push, run tests, push to registry, deploy. Use secrets for credentials. Multi-arch builds with docker buildx for ARM (Apple Silicon, AWS Graviton) and AMD64.'
      ],
      codeExamples: [
        {
          filename: 'Dockerfile.multistage',
          language: 'dockerfile',
          code: '# Multi-stage build for Python app\n\n# Stage 1: Builder (has compilers, wheels)\nFROM python:3.12-slim AS builder\n\nWORKDIR /app\n\n# Install build dependencies\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    build-essential libpq-dev \\\n    && rm -rf /var/lib/apt/lists/*\n\n# Create venv and install deps\nRUN python -m venv /opt/venv\nENV PATH="/opt/venv/bin:$PATH"\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Stage 2: Runtime (minimal - no compilers)\nFROM python:3.12-slim AS runtime\n\n# Install only runtime deps\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    libpq5 curl \\\n    && rm -rf /var/lib/apt/lists/*\n\n# Copy venv from builder\nCOPY --from=builder /opt/venv /opt/venv\nENV PATH="/opt/venv/bin:$PATH"\n\n# Setup non-root user\nRUN useradd -m -u 1000 appuser\nWORKDIR /app\nUSER appuser\n\n# Copy app code\nCOPY --chown=appuser:appuser . .\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=3s \\\n    CMD curl -f http://localhost:8000/health || exit 1\n\nEXPOSE 8000\n\nCMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]',
          explanation: 'Multi-stage: builder has compilers (builds wheels), runtime has only what is needed to run. Final image is much smaller and more secure.'
        },
        {
          filename: 'nginx.conf',
          language: 'nginx',
          code: '# nginx.conf - reverse proxy for FastAPI\n\nworker_processes auto;\n\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    # Rate limiting\n    limit_req_zone \\$\\{binary_remote_addr\\} zone=api:10m rate=10r/s;\n\n    # Gzip\n    gzip on;\n    gzip_types text/plain application/json application/javascript text/css;\n    gzip_min_length 1024;\n\n    upstream api_backend {\n        server api:8000;\n        # For multiple instances (load balancing):\n        # server api1:8000;\n        # server api2:8000;\n    }\n\n    server {\n        listen 80;\n        server_name example.com;\n        return 301 https://\\$\\{host\\}\\$\\{request_uri\\};\n    }\n\n    server {\n        listen 443 ssl http2;\n        server_name example.com;\n\n        # TLS\n        ssl_certificate /etc/nginx/ssl/cert.pem;\n        ssl_certificate_key /etc/nginx/ssl/key.pem;\n        ssl_protocols TLSv1.2 TLSv1.3;\n\n        # Security headers\n        add_header X-Frame-Options "SAMEORIGIN";\n        add_header X-Content-Type-Options "nosniff";\n        add_header Strict-Transport-Security "max-age=31536000";\n\n        # API proxy\n        location /api/ {\n            limit_req zone=api burst=20 nodelay;\n            proxy_pass http://api_backend;\n            proxy_set_header Host \\$\\{host\\};\n            proxy_set_header X-Real-IP \\$\\{remote_addr\\};\n            proxy_set_header X-Forwarded-For \\$\\{proxy_add_x_forwarded_for\\};\n            proxy_set_header X-Forwarded-Proto \\$\\{scheme\\};\n        }\n\n        # WebSocket support\n        location /ws/ {\n            proxy_pass http://api_backend;\n            proxy_http_version 1.1;\n            proxy_set_header Upgrade \\$\\{http_upgrade\\};\n            proxy_set_header Connection "upgrade";\n        }\n\n        # Static files\n        location /static/ {\n            root /var/www;\n            expires 30d;\n        }\n    }\n}',
          explanation: 'Nginx handles TLS, rate limiting, gzip, security headers, static files. Forwards /api/ to FastAPI. Special handling for WebSockets.'
        },
        {
          filename: 'github_actions.yml',
          language: 'yaml',
          code: '# .github/workflows/deploy.yml\nname: Build and Deploy\n\non:\n  push:\n    branches: [main]\n\njobs:\n  build-and-push:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Set up Docker Buildx\n        uses: docker/setup-buildx-action@v3\n\n      - name: Login to GitHub Container Registry\n        uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: \\$\\{\\{ github.actor \\}\\}\n          password: \\$\\{\\{ secrets.GITHUB_TOKEN \\}\\}\n\n      - name: Build and push\n        uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: |\n            ghcr.io/\\$\\{\\{ github.repository \\}\\}:latest\n            ghcr.io/\\$\\{\\{ github.repository \\}\\}:\\$\\{\\{ github.sha \\}\\}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\n\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.12"\n      - run: pip install -r requirements.txt\n      - run: pip install pytest\n      - run: pytest\n\n  deploy:\n    needs: [build-and-push, test]\n    runs-on: ubuntu-latest\n    steps:\n      - name: SSH and deploy\n        uses: appleboy/ssh-action@v1\n        with:\n          host: \\$\\{\\{ secrets.SERVER_HOST \\}\\}\n          username: \\$\\{\\{ secrets.SERVER_USER \\}\\}\n          key: \\$\\{\\{ secrets.SSH_PRIVATE_KEY \\}\\}\n          script: |\n            cd /opt/myapp\n            docker compose pull\n            docker compose up -d --remove-orphans\n            docker image prune -f',
          explanation: 'CI/CD pipeline: build image, run tests, push to registry, SSH to server and redeploy. Use GitHub secrets for credentials.'
        },
      ],
      exercises: [
        {
          prompt: 'Write a .dockerignore file that excludes .git, __pycache__, .venv, .env, and tests.',
          starterCode: '# .dockerignore\n',
          hint: 'One pattern per line. Same syntax as .gitignore.',
          solution: '.git\n.gitignore\n__pycache__\n*.pyc\n.venv\nvenv\n.env\n.env.local\ntests/\ntest_*.py\n.pytest_cache\n.mypy_cache\n.ruff_cache\n*.md\n!README.md\nDockerfile*\ndocker-compose*.yml\n.github/',
          solutionLanguage: 'text'
        },
      ],
      quiz: [
        {
          question: 'What is the main benefit of multi-stage builds?',
          options: ['Faster builds', 'Smaller final images', 'More secure', 'All of the above'],
          correctIndex: 3,
          explanation: 'Multi-stage builds produce smaller images (no build tools in final), faster (cached layers), and more secure (fewer tools for attackers).'
        },
        {
          question: 'Why run containers as non-root?',
          options: ['Faster', 'Security - limits damage if container is compromised', 'Required by Docker', 'No benefit'],
          correctIndex: 1,
          explanation: 'If an attacker breaks out of a container running as root, they have root on the host. Non-root limits the damage.'
        },
        {
          question: 'What does Nginx do as a reverse proxy?',
          options: ['Serves static files', 'Terminates TLS', 'Load balances', 'All of the above'],
          correctIndex: 3,
          explanation: 'Nginx handles TLS, static files, load balancing, rate limiting, gzip - freeing the app server to focus on application logic.'
        }
      ],
      keyTakeaways: [
        'Multi-stage builds create smaller, more secure production images',
        'Run as non-root user, use minimal base images, pin versions',
        'Never bake secrets into images - use env vars or vaults',
        'Nginx reverse proxy: TLS, static files, load balancing, rate limiting',
        'CI/CD: build, test, push to registry, deploy via SSH',
        'Use .dockerignore to exclude sensitive/unneeded files'
      ],
      resources: [
        { title: 'Docker Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: 'docs' },
        { title: 'Nginx Documentation', url: 'https://nginx.org/en/docs/', type: 'docs' },
        { title: 'Docker Security Best Practices', url: 'https://snyk.io/blog/10-docker-image-security-best-practices/', type: 'article' },
      ],
      miniProject: {
        title: 'Containerize a Full-Stack App',
        description: 'Containerize a FastAPI + PostgreSQL + Redis app with multi-stage Dockerfile, docker-compose for dev, Nginx reverse proxy, and GitHub Actions CI.',
        requirements: [
          'Multi-stage Dockerfile for FastAPI (slim image, non-root user)',
          'docker-compose.yml with api, db, redis services',
          'Nginx config with TLS and /api proxy',
          'GitHub Actions: build, test, push to GHCR',
          'Health check endpoint',
          '.dockerignore and .env.example files'
        ],
        estTime: '3-5 hours',
        solutionCode: '# See the full-stack-fastapi-template by tiangolo on GitHub for a complete\n# production-ready reference implementation with all of these features.\n# Key files: Dockerfile, docker-compose.yml, nginx/nginx.conf, .github/workflows/',
        solutionLanguage: 'yaml'
      }
    },
  ]
};
