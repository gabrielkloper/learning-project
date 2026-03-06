# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

A hands-on learning workbook with fill-in-the-blank exercises. Each project has:
- A `README.md` with theory
- An exercise file with `TODO` comments to complete
- Test files to validate solutions

Solutions live on the `my-solutions` branch; `main` contains the pristine exercises.

## Commands

All commands must be run from the specific exercise directory (each has its own `package.json`).

### TypeScript projects (Vitest)
```bash
npm install       # First time setup
npm test          # Run tests once
npm run test:watch  # Run tests in watch mode
```

### JavaScript projects (Jest) — e.g., `01-devops/03-ci-cd-basics/`
```bash
npm install
npm test
npm run test:coverage
npm run lint
npm run lint:fix
npm run build
```

### Python projects (future areas 04, 05)
```bash
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python exercise.py
pytest test.py
```

### Docker Compose — `01-devops/02-docker-compose/`
```bash
docker-compose up --build    # Build and start all services
docker-compose down -v       # Stop and remove volumes
docker-compose logs -f       # Follow logs
```

## Repository Structure

```
01-devops/
  01-docker-basics/     # TypeScript + Vitest; exercise.ts + exercise.test.ts
  02-docker-compose/    # docker-compose.yml, web/Dockerfile, db/init.sql
  03-ci-cd-basics/      # JavaScript + Jest; .github/workflows/ci.yml with TODOs
02-webdev-fundamentals/ # (not yet created)
03-typescript-deep-dive/# (not yet created)
04-ai-ml-agents/        # Python (not yet created)
05-data-engineering/    # Python (not yet created)
06-software-principles/ # (not yet created)
07-frameworks-libraries/# (not yet created)
```

## Architecture Notes

**Exercise pattern**: Exports from `exercise.ts`/`exercise.js` are imported and validated by the test file. Completing a TODO means providing a non-empty, meaningful value or correct implementation.

**Module system**: `01-docker-basics` uses ES modules (`"type": "module"`). `03-ci-cd-basics` uses CommonJS.

**Docker Compose service wiring**: The `web` service connects to `db` using the service name as hostname (`db:5432`). Health checks on `db` gate `web` startup.

**CI/CD workflow**: `.github/workflows/ci.yml` has sequential jobs: `test` → `build` → `deploy` (optional). Jobs use dependency caching via `actions/cache` on `~/.npm`.

**Progress tracking**: Update `PROGRESS.md` checkboxes as exercises are completed: `[ ]` → `[~]` → `[x]`.
