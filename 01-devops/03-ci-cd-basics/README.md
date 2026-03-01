# CI/CD Basics with GitHub Actions

Learn to automate your development workflow with Continuous Integration and Continuous Deployment (CI/CD) using GitHub Actions.

## Table of Contents

1. [What is CI/CD?](#what-is-cicd)
2. [Why CI/CD?](#why-cicd)
3. [GitHub Actions Overview](#github-actions-overview)
4. [Workflow Basics](#workflow-basics)
5. [Common CI/CD Steps](#common-cicd-steps)
6. [Best Practices](#best-practices)
7. [Exercise](#exercise)

---

## What is CI/CD?

**CI/CD** stands for **Continuous Integration** and **Continuous Deployment** - practices that automate the software delivery process.

### Continuous Integration (CI)

**Definition**: Automatically build and test code whenever changes are pushed.

**Flow**:
```
Developer pushes code
  ↓
CI system detects changes
  ↓
Code is built
  ↓
Tests are run
  ↓
Results reported (pass/fail)
```

**Goal**: Catch bugs early, ensure code quality

### Continuous Deployment (CD)

**Definition**: Automatically deploy code to production when tests pass.

**Flow**:
```
Tests pass in CI
  ↓
Code is deployed to staging
  ↓
Staging tests pass
  ↓
Code is deployed to production
```

**Goal**: Ship features faster, reduce manual deployment errors

---

## Why CI/CD?

### Problems Without CI/CD

- **Manual testing**: Developers forget to run tests
- **Integration issues**: Code works locally but breaks when merged
- **Slow deployments**: Manual deployments are error-prone and time-consuming
- **No consistency**: Different environments, different results

### Benefits With CI/CD

1. **Early Bug Detection**: Catch issues before they reach production
2. **Faster Feedback**: Know immediately if your code breaks something
3. **Automated Testing**: Tests run on every commit
4. **Consistent Builds**: Same build process every time
5. **Faster Releases**: Deploy multiple times per day instead of per month
6. **Reduced Risk**: Small, frequent changes are easier to troubleshoot
7. **Team Confidence**: Know the code works before merging

---

## GitHub Actions Overview

**GitHub Actions** is a CI/CD platform built into GitHub that runs workflows when events occur in your repository.

### Key Concepts

#### 1. Workflow

**What**: Automated process defined in a YAML file.

**Location**: `.github/workflows/filename.yml`

**Example**:
```yaml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test
```

#### 2. Events (Triggers)

**What**: GitHub events that trigger workflows.

**Common Events**:
- `push`: Code pushed to repository
- `pull_request`: Pull request opened or updated
- `schedule`: Run on a schedule (cron)
- `workflow_dispatch`: Manual trigger

**Example**:
```yaml
on:
  push:
    branches: [main]        # Only on pushes to main
  pull_request:
    branches: [main]        # On PRs targeting main
```

#### 3. Jobs

**What**: A set of steps that run on the same runner.

**Key Points**:
- Jobs run in parallel by default
- Can depend on other jobs
- Run on specified OS (ubuntu, windows, macos)

**Example**:
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  test:
    needs: build          # Wait for build to complete
    runs-on: ubuntu-latest
    steps:
      - run: npm test
```

#### 4. Steps

**What**: Individual tasks within a job.

**Types**:
- **Run command**: `run: npm install`
- **Use action**: `uses: actions/checkout@v3`

**Example**:
```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v3

  - name: Install dependencies
    run: npm install

  - name: Run tests
    run: npm test
```

#### 5. Runners

**What**: Servers that run your workflows.

**Types**:
- **GitHub-hosted**: `ubuntu-latest`, `windows-latest`, `macos-latest`
- **Self-hosted**: Your own servers

#### 6. Actions (Reusable Modules)

**What**: Pre-built steps you can use in your workflows.

**Common Actions**:
- `actions/checkout@v3`: Check out your repository
- `actions/setup-node@v3`: Set up Node.js environment
- `actions/setup-python@v4`: Set up Python environment
- `actions/cache@v3`: Cache dependencies for faster builds

---

## Workflow Basics

### Simple CI Workflow

```yaml
name: CI

# Trigger on push to main or PRs
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    # Run on Ubuntu
    runs-on: ubuntu-latest

    steps:
      # Checkout code
      - name: Checkout repository
        uses: actions/checkout@v3

      # Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      # Install dependencies
      - name: Install dependencies
        run: npm install

      # Run linter
      - name: Lint code
        run: npm run lint

      # Run tests
      - name: Run tests
        run: npm test
```

### Workflow with Multiple Jobs

```yaml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  # Job 1: Lint and test
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run lint
      - run: npm test

  # Job 2: Build (runs in parallel with test)
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build

  # Job 3: Deploy (runs after test and build succeed)
  deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: echo "Deploying to production..."
```

---

## Common CI/CD Steps

### 1. Code Checkout

```yaml
- name: Checkout code
  uses: actions/checkout@v3
```

### 2. Environment Setup

**Node.js**:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 18
```

**Python**:
```yaml
- name: Setup Python
  uses: actions/setup-python@v4
  with:
    python-version: '3.11'
```

### 3. Dependency Caching

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 4. Install Dependencies

```yaml
- name: Install dependencies
  run: npm ci              # Faster than npm install for CI
```

### 5. Linting

```yaml
- name: Lint code
  run: npm run lint
```

### 6. Type Checking

```yaml
- name: Type check
  run: npm run type-check
```

### 7. Run Tests

```yaml
- name: Run tests
  run: npm test

- name: Run tests with coverage
  run: npm run test:coverage
```

### 8. Build

```yaml
- name: Build application
  run: npm run build
```

### 9. Docker Build

```yaml
- name: Build Docker image
  run: docker build -t my-app:${{ github.sha }} .
```

### 10. Deploy

```yaml
- name: Deploy to production
  run: |
    echo "Deploying to server..."
    # Deployment commands here
```

---

## Best Practices

### 1. Fast Feedback

**Goal**: Developers should get feedback quickly.

**Practices**:
- Run fast tests first (lint, type-check)
- Run slow tests later (integration, E2E)
- Use caching for dependencies
- Run jobs in parallel

**Example**:
```yaml
jobs:
  # Fast checks first
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run lint

  # Slower tests
  test:
    needs: lint        # Only if lint passes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test
```

### 2. Fail Fast

**Goal**: Stop the build as soon as any step fails.

```yaml
steps:
  - run: npm run lint
    # If this fails, workflow stops here
  - run: npm test
    # Only runs if lint passed
```

### 3. Use Caching

**Goal**: Speed up builds by caching dependencies.

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
```

### 4. Matrix Builds

**Goal**: Test against multiple versions/environments.

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm test
```

### 5. Environment Variables

**Goal**: Keep secrets secure.

```yaml
jobs:
  deploy:
    steps:
      - name: Deploy
        env:
          API_KEY: ${{ secrets.API_KEY }}    # From GitHub secrets
        run: ./deploy.sh
```

### 6. Branch Protection

**Goal**: Require CI to pass before merging.

**GitHub Settings**:
1. Go to repository Settings → Branches
2. Add branch protection rule for `main`
3. Check "Require status checks to pass before merging"
4. Select your CI workflow

### 7. Status Badges

**Goal**: Show build status in README.

```markdown
![CI](https://github.com/username/repo/workflows/CI/badge.svg)
```

---

## Exercise

In this project, you'll create a complete CI/CD pipeline for a Node.js application.

### What You'll Build

A GitHub Actions workflow that:
- Runs on every push and pull request
- Checks code quality (linting)
- Runs tests
- Builds the application
- Caches dependencies for speed

### Files to Complete

1. **.github/workflows/ci.yml** - CI workflow (has TODOs)
2. **src/app.js** - Simple Node.js app (already complete)
3. **src/app.test.js** - Tests (already complete)

### How to Complete

1. Read this README thoroughly
2. Open `.github/workflows/ci.yml`
3. Fill in all TODO comments
4. Push to GitHub to see the workflow run
5. Check the Actions tab in your GitHub repository

### Success Criteria

When complete:
- Workflow triggers on push/PR
- All jobs run successfully
- Tests pass
- Build completes
- Workflow appears in GitHub Actions tab

---

## Common Issues

### Issue: "npm: command not found"

**Solution**: Make sure you have `setup-node` action before running npm commands.

### Issue: "ENOENT: no such file or directory"

**Solution**: Make sure you checkout code first (`actions/checkout@v3`).

### Issue: Workflow doesn't trigger

**Solution**: Check that your YAML file is in `.github/workflows/` and has correct syntax.

---

## Quick Reference

**Basic workflow structure:**
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
```

---

## Further Learning

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Awesome Actions](https://github.com/sdras/awesome-actions)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

**Ready?** Open `.github/workflows/ci.yml` and start completing the TODOs! 🚀
