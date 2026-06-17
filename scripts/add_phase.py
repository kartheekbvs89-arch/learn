#!/usr/bin/env python3
"""Add phase field to lessons and learningPath to existing modules."""
import re
from pathlib import Path

MODULES_DIR = Path("/home/z/my-project/src/lib/modules")

def get_phase(difficulty: str, lesson_index: int) -> str:
    if difficulty == "Beginner":
        return "Foundation"
    if difficulty == "Intermediate":
        return "Intermediate" if lesson_index >= 3 else "Foundation"
    if difficulty == "Advanced":
        return "Real-World" if lesson_index >= 5 else "Advanced"
    return "Foundation"

def process_file(filepath: Path):
    content = filepath.read_text()

    if "phase:" in content and "learningPath:" in content:
        print(f"  Skip {filepath.name}")
        return

    lines = content.split("\n")
    new_lines = []
    lesson_idx = 0

    for i, line in enumerate(lines):
        new_lines.append(line)
        stripped = line.strip()
        if stripped.startswith("difficulty:"):
            match = re.search(r"difficulty:\s*'?(Beginner|Intermediate|Advanced)'?", stripped)
            if match:
                difficulty = match.group(1)
                phase = get_phase(difficulty, lesson_idx)
                indent = line[:len(line) - len(line.lstrip())]
                new_lines.append(f"{indent}phase: '{phase}',")
                lesson_idx += 1

    content = "\n".join(new_lines)

    if "learningPath:" not in content:
        learning_path = """  learningPath: {
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
  },"""

        content = re.sub(
            r"(  description: ['\"].*?['\"],\n)",
            rf"\1{learning_path}\n",
            content,
            count=1,
        )

    filepath.write_text(content)
    print(f"  Updated {filepath.name}")

for f in ["fastapi.ts", "sqlalchemy.ts", "docker.ts", "ml.ts", "devops.ts"]:
    process_file(MODULES_DIR / f)

print("Done!")
