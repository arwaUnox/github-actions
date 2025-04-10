import json

with open("qlty-output.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

issues = []
current = None
collecting = False

for line in lines:
    raw = line.rstrip("\n")
    line = raw.strip()

    # Start of a new file block
    if line.endswith((".jsx", ".js", ".ts", ".tsx")):
        if current:
            issues.append(current)
        current = {"file": line, "details": ""}
        collecting = False

    # Start of a code smell block
    elif any(line.startswith(prefix) for prefix in ["Function with", "Found", "Detected", "Smell", "Issue"]) or "also found at" in line:
        if current:
            current["details"] += line + "\n"
            collecting = True

    # Collect indented lines (code) after the smell
    elif collecting and (raw.startswith(" ") or raw.startswith("\t")):
        if current:
            current["details"] += raw + "\n"

    # Stop collecting if we hit an empty or unrelated line
    elif collecting and line == "":
        collecting = False

# Don't forget the last one
if current:
    issues.append(current)

# Format issues for GitHub
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
