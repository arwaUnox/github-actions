from github import Github
import os

def get_push_commit_files():
    repo_name = os.getenv("GITHUB_REPOSITORY")
    sha = os.getenv("GITHUB_SHA")
    token = os.getenv("GITHUB_TOKEN")

    g = Github(token)
    repo = g.get_repo(repo_name)
    commit = repo.get_commit(sha)
    return commit.files, repo, commit

def post_commit_comment(repo, sha, body):
    repo.get_commit(sha).create_comment(body)
