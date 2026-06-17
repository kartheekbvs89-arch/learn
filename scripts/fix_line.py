#!/usr/bin/env python3
"""Replace line 1332 in fastapi.ts with a clean CI/CD code block."""
from pathlib import Path

filepath = Path("/home/z/my-project/src/lib/modules/fastapi.ts")
lines = filepath.read_text().split('\n')

# Line 1332 (index 1331) is the problematic code line
# Replace it with a clean version that has no ${{ }} and no internal single quotes

new_code_line = """          code: '# .github/workflows/ci.yml\\nname: CI/CD\\n\\non:\\n  push:\\n    branches: [main]\\n  pull_request:\\n    branches: [main]\\n\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    strategy:\\n      matrix:\\n        python-version: [\"3.11\", \"3.12\", \"3.13\"]\\n\\n    services:\\n      postgres:\\n        image: postgres:16\\n        env:\\n          POSTGRES_USER: blog\\n          POSTGRES_PASSWORD: blogpass\\n          POSTGRES_DB: blog_test\\n        ports:\\n          - 5432:5432\\n\\n      redis:\\n        image: redis:7\\n        ports:\\n          - 6379:6379\\n\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-python@v5\\n        with:\\n          python-version: 3.12\\n          cache: pip\\n\\n      - run: pip install -e \".[dev]\"\\n      - run: ruff check .\\n      - run: mypy src/blog/\\n      - run: pytest --cov=src/blog --cov-report=xml\\n        env:\\n          DATABASE_URL: postgresql+asyncpg://blog:blogpass@localhost:5432/blog_test\\n          SECRET_KEY: test-secret-key-for-ci\\n\\n  build-and-push:\\n    needs: test\\n    runs-on: ubuntu-latest\\n    if: github.ref == refs/heads/main\\n\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: docker/setup-buildx-action@v3\\n      - uses: docker/login-action@v3\\n        with:\\n          registry: ghcr.io\\n          username: github.actor\\n          password: secrets.GITHUB_TOKEN\\n\\n      - uses: docker/build-push-action@v5\\n        with:\\n          context: .\\n          push: true\\n          tags: ghcr.io/repo:latest\\n          cache-from: type=gha\\n          cache-to: type=gha,mode=max\\n\\n  deploy:\\n    needs: build-and-push\\n    runs-on: ubuntu-latest\\n    if: github.ref == refs/heads/main\\n    environment: production\\n\\n    steps:\\n      - uses: appleboy/ssh-action@v1\\n        with:\\n          host: secrets.SERVER_HOST\\n          username: secrets.SERVER_USER\\n          key: secrets.SSH_PRIVATE_KEY\\n          script: |\\n            cd /opt/blog-api\\n            git pull origin main\\n            docker compose pull\\n            docker compose up -d --remove-orphans\\n            docker compose exec api alembic upgrade head\\n            docker image prune -f',"""

lines[1331] = new_code_line

filepath.write_text('\n'.join(lines))
print("Replaced line 1332 with clean CI/CD code")
