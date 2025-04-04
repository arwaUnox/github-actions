from github_utils import get_push_commit_files, post_commit_comment
from llm_utils import generate_code_review

def main():
    files, repo, commit = get_push_commit_files()
    sha = commit.sha

    for file in files:
        if not file.filename.endswith((".py", ".ts", ".js", ".java")):
            continue

        patch = file.patch
        if patch:
            review_prompt = f"Please review the following code diff and give suggestions:\n{patch}"
            review_comment = generate_code_review(review_prompt)

            try:
                post_commit_comment(repo, sha, f"**Review for `{file.filename}`**\n\n{review_comment}")
                print('ai comment is: ', review_comment)
            except Exception as e:
                print(f"Failed to post comment for {file.filename}: {e}")

if __name__ == "__main__":
    main()
