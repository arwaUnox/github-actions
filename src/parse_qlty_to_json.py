import json
import re

with open("qlty-output.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

issues = []
current = None
collecting_code = False

for i, line in enumerate(lines):
    raw = line.rstrip("\n")
    stripped = raw.strip()

    # Detect filename line
    if re.match(r"^src/.*\.(jsx|js|ts|tsx)$", stripped):
        if current:
            issues.append(current)
        current = {"file": stripped, "details": ""}
        collecting_code = False

    # Detect code smell description
    elif stripped.startswith("Function with") or stripped.startswith("Found") or "also found at" in stripped:
        if current:
            current["details"] += stripped + "\n"
            collecting_code = True

    # Capture indented lines (likely code)
    elif collecting_code and re.match(r"^\s{2,}\d+\s", raw):  # lines that start with indentation + line number
        if current:
            current["details"] += raw + "\n"

    # Stop collecting code block when we hit a blank or unrelated line
    elif collecting_code and stripped == "":
        collecting_code = False

# Capture the last block
if current:
    issues.append(current)

# Build GitHub-friendly issue JSON
issue_output = []
for i in issues:
    body = f"**File**: `{i['file']}`\n\n```js\n{i['details'].strip()}\n```"
    issue_output.append({
        "title": f"Qlty Smell in {i['file']}",
        "body": body,
        "labels": ["code-quality"]
    })

with open("clean-output.json", "w", encoding="utf-8") as f:
    json.dump(issue_output, f, indent=2, ensure_ascii=False)

print(f"✅ Extracted {len(issue_output)} issues to clean-output.json")
