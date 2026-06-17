#!/usr/bin/env python3
"""Fix the ci_cd.yml code block in fastapi.ts.
The issue: single quotes inside single-quoted string terminate it early.
Solution: escape them as \' or use a different approach.
"""
from pathlib import Path

filepath = Path("/home/z/my-project/src/lib/modules/fastapi.ts")
content = filepath.read_text()

# The problem is that the YAML code contains '3.12' and 'refs/heads/main'
# These single quotes inside the single-quoted string break it.
# In JS single-quoted strings, you escape ' as \'

# Find the ci_cd.yml code block and fix the internal single quotes
# The code string starts with: code: '# .github/workflows/ci.yml
# and ends with: docker image prune -f',

# Replace '3.12' with \\'3.12\\' (escaped in the JS string)
# Replace 'refs/heads/main' with \\'refs/heads/main\\'

# Actually, the simplest fix: replace internal ' with \\' within the code string
# But we need to be careful not to break the outer quotes

# Let's find the specific problematic patterns and fix them
content = content.replace(
    "if: matrix.python-version == '3.12'",
    "if: matrix.python-version == \\\\'3.12\\\\'"
)
content = content.replace(
    "if: github.ref == 'refs/heads/main'",
    "if: github.ref == \\\\'refs/heads/main\\\\'"
)

filepath.write_text(content)
print("Fixed single quotes in YAML code block")
