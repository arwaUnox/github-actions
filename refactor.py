# refactor.py

import openai
import os
import glob

openai.api_key = os.getenv("OPENAI_API_KEY")

def refactor_code(code, filename):
    prompt = f"""Refactor the following JavaScript code from `{filename}` to improve readability and maintainability. Use modern ES6+ syntax and best practices. Keep functionality unchanged.\n\n```js\n{code}\n```\n\nRefactored code:"""

    response = openai.ChatCompletion.create(
        model="gpt-4",  # or "gpt-3.5-turbo"
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response['choices'][0]['message']['content']

def scan_and_refactor_all():
    os.makedirs("refactor-output", exist_ok=True)

    js_files = glob.glob("src/**/*.js", recursive=True)

    if not js_files:
        print("No JavaScript files found.")
        return

    for file_path in js_files:
        with open(file_path, "r") as f:
            original = f.read()

        refactored = refactor_code(original, file_path)

        out_name = file_path.replace("/", "_").replace(".js", "_refactored.md")
        out_path = os.path.join("refactor-output", out_name)

        with open(out_path, "w") as f:
            f.write(refactored)

        print(f"✅ Refactored {file_path} → {out_path}")

if __name__ == "__main__":
    scan_and_refactor_all()
