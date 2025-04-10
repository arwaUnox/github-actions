import json
import re

# Read from a file saved from `qlty smells --all > qlty-output.txt`
with open("qlty-output.txt", "r") as f:
    lines = f.readlines()

issues = []
current = {}

for line in lines:
    line = line.strip()

    # Start of a new issue block
    if line.endswith(".jsx") or line.endswith(".js") or line.endswith(".ts") or line.endswith(".tsx"):
        if current:
            issues.append(current)
        current = {"file": line, "details": ""}

    elif line.startswith("Function with") or line.startswith("Found") or "also found at" in line:
        if "details" in current:
            current["details"] += line + "\n"

# Add the last one
if current:
    issues.append(current)

# Convert to GitHub Issue format
issue_output = []
for i in issues:
    issue_output.append({
        "title": f"Qlty Smell in {i['file']}",
        "body": f"**File**: `{i['file']}`\n\n```\n{i['details'].strip()}\n```",
        "labels": ["code-quality"]
    })

# Save to file
with open("clean-output.json", "w") as f:
    json.dump(issue_output, f, indent=2)

print(f"✅ Extracted {len(issue_output)} issues to clean-output.json")
