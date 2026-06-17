#!/usr/bin/env python3
"""Replace the ci_cd.yml code block in fastapi.ts with a clean version."""
from pathlib import Path
import re

filepath = Path("/home/z/my-project/src/lib/modules/fastapi.ts")
content = filepath.read_text()

# The ci_cd.yml code block - replace internal single quotes with escaped versions
# In JS single-quoted strings, ' must be escaped as \'

# Find the code block and replace it
old_pattern = r"code: '# \.github/workflows/ci\.yl.*?docker image prune -f',"
new_code = r"""code: '# .github/workflows/ci.yml
name: CI/CD

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
        python-version: ["3.11", "3.12", "3.13"]

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: blog
          POSTGRES_PASSWORD: blogpass
          POSTGRES_DB: blog_test
        ports:
          - 5432:5432

      redis:
        image: redis:7
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: 3.12
          cache: pip

      - run: pip install -e ".[dev]"
      - run: ruff check .
      - run: mypy src/blog/
      - run: pytest --cov=src/blog --cov-report=xml
        env:
          DATABASE_URL: postgresql+asyncpg://blog:blogpass@localhost:5432/blog_test
          SECRET_KEY: test-secret-key-for-ci

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == refs/heads/main

    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: github.actor
          password: secrets.GITHUB_TOKEN

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/repo:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == refs/heads/main
    environment: production

    steps:
      - uses: appleboy/ssh-action@v1
        with:
          host: secrets.SERVER_HOST
          username: secrets.SERVER_USER
          key: secrets.SSH_PRIVATE_KEY
          script: |
            cd /opt/blog-api
            git pull origin main
            docker compose pull
            docker compose up -d --remove-orphans
            docker compose exec api alembic upgrade head
            docker image prune -f',"""

# Find the old code block
match = re.search(old_pattern, content, re.DOTALL)
if match:
    old_code = match.group(0)
    # Replace it
    content = content.replace(old_code, new_code)
    filepath.write_text(content)
    print("Replaced ci_cd.yml code block")
else:
    print("Could not find the code block")
    # Let's see what's around line 1332
    lines = content.split('\n')
    for i, line in enumerate(lines[1325:1340], 1326):
        print(f"{i}: {line[:100]}")
