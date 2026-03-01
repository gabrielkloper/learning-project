# Docker Compose

Learn to orchestrate multi-container applications with Docker Compose - the tool for defining and running multiple Docker containers together.

## Table of Contents

1. [What is Docker Compose?](#what-is-docker-compose)
2. [Why Docker Compose?](#why-docker-compose)
3. [Docker Compose File Structure](#docker-compose-file-structure)
4. [Core Concepts](#core-concepts)
5. [Common Patterns](#common-patterns)
6. [Commands](#commands)
7. [Best Practices](#best-practices)
8. [Exercise](#exercise)

---

## What is Docker Compose?

**Docker Compose** is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services, networks, and volumes. Then, with a single command, you create and start all the services.

### The Problem

**Without Docker Compose:**
```bash
# Start database
docker network create my-network
docker run -d --name db --network my-network \
  -e POSTGRES_PASSWORD=secret \
  -v pgdata:/var/lib/postgresql/data \
  postgres:15

# Start backend API
docker run -d --name api --network my-network \
  -p 4000:4000 \
  -e DATABASE_URL=postgresql://postgres:secret@db:5432/mydb \
  my-api:1.0

# Start frontend
docker run -d --name frontend --network my-network \
  -p 3000:3000 \
  -e REACT_APP_API_URL=http://localhost:4000 \
  my-frontend:1.0
```

**Complex, error-prone, hard to remember!**

**With Docker Compose:**
```bash
docker-compose up
```

**Simple, reproducible, documented!**

---

## Why Docker Compose?

### Benefits

1. **Simplified Workflow**: Single command to start/stop entire stack
2. **Configuration as Code**: docker-compose.yml documents your infrastructure
3. **Reproducibility**: Same setup on every machine
4. **Development Environment**: Perfect for local development with multiple services
5. **Easy Networking**: Containers can communicate by service name
6. **Volume Management**: Persistent data handled automatically

### Use Cases

- **Local Development**: Run full stack (web + API + database) locally
- **Testing**: Spin up test environment with all dependencies
- **CI/CD Pipelines**: Run integration tests with real services
- **Demos**: Quickly showcase multi-service applications

---

## Docker Compose File Structure

### Basic docker-compose.yml

```yaml
version: '3.9'                # Compose file version

services:                     # Define your containers
  web:                        # Service name
    build: ./web              # Build from Dockerfile in ./web
    ports:
      - "3000:3000"           # Port mapping
    environment:
      - NODE_ENV=development
    depends_on:
      - api                   # Wait for api to start

  api:
    build: ./api
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://postgres:secret@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15        # Use pre-built image
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:                      # Named volumes
  postgres-data:              # Volume for database data
```

---

## Core Concepts

### 1. Services

**What**: Each service is a container. You define how it should be built and run.

**Ways to Define**:

```yaml
services:
  # Option 1: Build from Dockerfile
  web:
    build: ./web                    # Path to Dockerfile
    # or
    build:
      context: ./web
      dockerfile: Dockerfile.dev    # Custom Dockerfile name

  # Option 2: Use pre-built image
  db:
    image: postgres:15

  # Option 3: Build and name the image
  api:
    build: ./api
    image: my-api:1.0              # Tag the built image
```

### 2. Ports

**What**: Map container ports to host ports.

```yaml
services:
  web:
    ports:
      - "3000:3000"         # host:container
      - "8080:80"           # Different ports
      - "3000-3005:3000-3005"  # Port range
```

**Expose** (for inter-container communication only):
```yaml
services:
  api:
    expose:
      - "4000"              # Accessible to other containers, not host
```

### 3. Environment Variables

**Way 1: Inline**
```yaml
services:
  web:
    environment:
      - NODE_ENV=production
      - API_URL=http://api:4000
```

**Way 2: From .env file**
```yaml
services:
  web:
    env_file:
      - .env              # Load from .env file
```

**.env file:**
```
NODE_ENV=production
API_URL=http://api:4000
DATABASE_PASSWORD=supersecret
```

### 4. Volumes

**Named Volumes** (managed by Docker):
```yaml
services:
  db:
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:              # Define volume
```

**Bind Mounts** (map host directory):
```yaml
services:
  web:
    volumes:
      - ./src:/app/src        # Hot reload in development
      - /app/node_modules     # Don't overwrite node_modules
```

### 5. Networks

**Default Behavior**: Docker Compose creates a default network. All services can reach each other by service name.

**Custom Networks**:
```yaml
services:
  web:
    networks:
      - frontend

  api:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

### 6. Depends On

**What**: Control startup order.

```yaml
services:
  web:
    depends_on:
      - api               # Start api before web

  api:
    depends_on:
      - db                # Start db before api
```

**Note**: `depends_on` waits for container to start, NOT for the service to be ready. For health checks, use:

```yaml
services:
  web:
    depends_on:
      api:
        condition: service_healthy

  api:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 7. Restart Policies

```yaml
services:
  web:
    restart: always           # Always restart
    # or
    restart: on-failure       # Only on failure
    # or
    restart: unless-stopped   # Restart unless manually stopped
```

---

## Common Patterns

### Full Stack Application

```yaml
version: '3.9'

services:
  # Frontend (React)
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:4000
    depends_on:
      - api

  # Backend API (Node.js)
  api:
    build: ./api
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://postgres:secret@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  # Database (PostgreSQL)
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql  # Initial schema

  # Cache (Redis)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:
```

### Development with Hot Reload

```yaml
version: '3.9'

services:
  web:
    build:
      context: ./web
      dockerfile: Dockerfile.dev    # Dev Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./web/src:/app/src          # Hot reload source files
      - /app/node_modules            # Preserve node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev             # Override CMD
```

---

## Commands

### Basic Commands

```bash
# Start all services (detached mode)
docker-compose up -d

# Start and rebuild images
docker-compose up --build

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs
docker-compose logs -f web    # Follow logs for web service

# List running services
docker-compose ps

# Execute command in running service
docker-compose exec web bash
docker-compose exec db psql -U postgres

# Restart a service
docker-compose restart web

# Scale a service (multiple instances)
docker-compose up -d --scale api=3
```

### Build Commands

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build web

# Build without cache
docker-compose build --no-cache
```

### Cleanup

```bash
# Stop and remove containers, networks
docker-compose down

# Also remove volumes
docker-compose down -v

# Also remove images
docker-compose down --rmi all
```

---

## Best Practices

### 1. Use .env Files

**docker-compose.yml**:
```yaml
services:
  db:
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
```

**.env** (gitignored):
```
DB_PASSWORD=supersecret
```

### 2. Separate Dev and Prod Configs

**docker-compose.yml** (base):
```yaml
services:
  web:
    build: ./web
    ports:
      - "3000:3000"
```

**docker-compose.override.yml** (dev - auto-loaded):
```yaml
services:
  web:
    volumes:
      - ./web/src:/app/src    # Hot reload
    environment:
      - NODE_ENV=development
```

**docker-compose.prod.yml** (prod):
```yaml
services:
  web:
    environment:
      - NODE_ENV=production
    restart: always
```

**Usage**:
```bash
# Development (uses override automatically)
docker-compose up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

### 3. Health Checks

```yaml
services:
  api:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### 4. Resource Limits

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          memory: 256M
```

### 5. Logging

```yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## Exercise

In this project, you'll complete a multi-container application setup:

### What You'll Build

A simple full-stack application with:
- **Web Service**: Node.js Express server
- **Database**: PostgreSQL
- Network configuration
- Volume management

### Files to Complete

1. **docker-compose.yml** - Define services, networks, volumes (has TODOs)
2. **web/Dockerfile** - Dockerfile for Node.js app (has TODOs)
3. **web/app.js** - Express app (already complete, no TODOs)
4. **db/init.sql** - Initial database schema (has TODOs)

### How to Complete

1. Read this README thoroughly
2. Open each file and find TODO comments
3. Fill in the blanks based on what you learned
4. Run `docker-compose up` to test
5. Verify app works by visiting http://localhost:3000

### Success Criteria

When complete:
- `docker-compose up` builds and starts all services
- Web server accessible at http://localhost:3000
- Database connected and initialized
- Can create and retrieve data

---

## Quick Reference

**Start stack:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop stack:**
```bash
docker-compose down
```

**Rebuild and restart:**
```bash
docker-compose up --build
```

---

## Further Learning

- [Official Docker Compose Documentation](https://docs.docker.com/compose/)
- [Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Awesome Compose Examples](https://github.com/docker/awesome-compose)

**Ready?** Open the exercise files and start completing the TODOs! 🚢
