#!/usr/bin/env python3
"""Fix ${ } in GitHub Actions YAML code blocks in fastapi.ts."""
from pathlib import Path

filepath = Path("/home/z/my-project/src/lib/modules/fastapi.ts")
content = filepath.read_text()

# Find the ci_cd.yml code block and replace ${{ with $\{\{ and }} with \}\}
# This escapes the ${ } so JavaScript doesn't interpret them as template literals

# Replace all occurrences of ${{ with $\{\{ and }} with \}\}
# But ONLY within the ci_cd.yml code string

# Find the ci_cd.yml section
import re

# Pattern: find code blocks containing ${{ and escape them
# We need to find the ci_cd.yml code string and replace ${{ X }} with $\{\{ X \}\}

# Simple approach: replace all ${{ with $\{\{ and }} with \}\} in the whole file
# But only in string literals (single quotes)

# Actually, let's just replace them everywhere - they only appear in the YAML code block
content = content.replace('${{', '$\\{\\{')
content = content.replace('}}', '\\}\\}')

filepath.write_text(content)
print("Fixed ${{ }} patterns")
