import json
import re

with open("qlty-output.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

issues = []
current = None
collecting = False

def is_filename(line):
    return re.match(r"^src/.*\.(jsx|js|ts|tsx)$", line)

def is_smell_start(line):
    return line.startswith("Function with") or line.startswith("Found") or "also found at" in line

def is_code_line(line):
    return re.match(r"^\s+\d+\s", line) or line.strip().startswith("</") or line.strip().startswith("<")

for line in lines:
    raw = line.rstrip("\n")
    stripped = raw.strip()

    if is_filename(stripped):
        if current:
            issues.append(current)
        current = {"file": stripped, "details": ""}
        collecting = False

    elif is_smell_start(stripped):
        if current:
            current["details"] += stripped + "\n"
        collecting = True

    elif collecting and (is_code_line(raw) or raw.startswith("    ") or raw.startswith("  ")):
        if current:
            current["details"] += raw + "\n"

    elif collecting and stripped == "":
        # allow blank lines in block
        current["details"] += "\n"

    elif collecting and not raw.startswith(" "):
        # stop if we hit an unindented line (likely a new section)
        collecting = False

# Capture last one
if current:
    issues.append(current)

# Create final JSON
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

print("\n📦 GitHub Issues to Create:\n")
print(json.dumps(issue_output, indent=2, ensure_ascii=False))
print(f"\n✅ Extracted {len(issue_output)} issues to clean-output.json")
