# Workspace Rules

## Git & Deployment Workflow (Railway)
1. **Always use Git branches**: Every feature or fix must be created on a dedicated feature/fix branch (e.g., `fix/14inch-laptop-hero-display`, `feature/xyz`).
2. **Commit & Push Branch**: Commit all code changes with descriptive commit messages and push the feature branch to GitHub.
3. **Merge to Main**: Merge the feature branch into `main` and push `main` to `origin/main`.
4. **Railway Deployment**: Railway is configured to auto-deploy from `main`. Merging changes to `main` completes the deployment.
