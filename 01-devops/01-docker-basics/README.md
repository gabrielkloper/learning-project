# Docker Basics

Master the fundamentals of containerization with Docker - the industry standard for packaging and deploying applications.

## Table of Contents

1. [What is Docker?](#what-is-docker)
2. [Core Concepts](#core-concepts)
3. [Dockerfile Basics](#dockerfile-basics)
4. [Docker Commands](#docker-commands)
5. [Best Practices](#best-practices)
6. [Exercises](#exercises)

---

## What is Docker?

**Docker** is a platform for developing, shipping, and running applications in containers. Containers package an application with all its dependencies (code, runtime, libraries, settings) into a standardized unit.

### The Problem Docker Solves

**Before Docker:**
```
Developer: "It works on my machine!"
Operations: "But it doesn't work in production..."
```

**With Docker:**
```
Developer: "Here's the container image"
Operations: "It runs the same everywhere!"
```

### Benefits

- **Consistency**: Same environment across development, testing, and production
- **Isolation**: Applications don't interfere with each other
- **Portability**: Run anywhere (laptop, server, cloud)
- **Efficiency**: Lightweight compared to virtual machines
- **Speed**: Start containers in seconds, not minutes

---

## Core Concepts

### 1. Images

**What**: A blueprint/template for containers. Read-only package with application code and dependencies.

**Analogy**: Like a class in programming - defines what the container will be.

**Example**:
```
node:18-alpine     ← Official Node.js 18 image (Alpine Linux)
postgres:15        ← PostgreSQL database image
nginx:latest       ← Nginx web server image
```

**Key Points**:
- Images are built from Dockerfiles
- Stored in registries (Docker Hub, private registries)
- Versioned with tags (`:latest`, `:1.0`, `:18-alpine`)
- Layered architecture (each instruction creates a layer)

### 2. Containers

**What**: Running instance of an image. Isolated process with its own filesystem, network, and resources.

**Analogy**: Like an object/instance in programming - created from a class (image).

**Lifecycle**:
```
Image → Container (Created) → Container (Running) → Container (Stopped) → Removed
```

**Key Points**:
- Containers are ephemeral (disposable)
- Multiple containers can run from the same image
- Containers can be started, stopped, deleted
- Each container has unique ID and name

### 3. Dockerfile

**What**: Text file with instructions to build a Docker image.

**Basic Structure**:
```dockerfile
FROM node:18-alpine          # Base image
WORKDIR /app                 # Working directory inside container
COPY package*.json ./        # Copy dependency files
RUN npm install              # Install dependencies
COPY . .                     # Copy application code
EXPOSE 3000                  # Document which port app uses
CMD ["node", "server.js"]    # Command to run when container starts
```

### 4. Volumes

**What**: Persistent data storage that survives container deletion.

**Why Needed**: Containers are ephemeral - data inside is lost when container is removed.

**Types**:
- **Named volumes**: Managed by Docker (`docker volume create my-data`)
- **Bind mounts**: Map host directory to container directory
- **tmpfs mounts**: Temporary filesystem in memory

**Example**:
```bash
# Named volume
docker run -v my-data:/app/data my-app

# Bind mount
docker run -v /host/path:/container/path my-app
```

### 5. Networks

**What**: Virtual networks for container communication.

**Why Needed**: Containers are isolated by default - networks enable communication.

**Types**:
- **bridge** (default): Containers on same network can communicate
- **host**: Container uses host's network directly
- **none**: No networking

**Example**:
```bash
# Create network
docker network create my-network

# Run containers on same network
docker run --network my-network --name db postgres
docker run --network my-network --name api my-api
```

---

## Dockerfile Basics

### Essential Instructions

#### FROM
**Purpose**: Specify the base image

```dockerfile
FROM node:18-alpine          # Use Node.js 18 on Alpine Linux
FROM python:3.11-slim        # Use Python 3.11 slim variant
FROM scratch                 # Start from empty image (advanced)
```

#### WORKDIR
**Purpose**: Set working directory for subsequent instructions

```dockerfile
WORKDIR /app                 # All paths now relative to /app
```

#### COPY vs ADD
**Purpose**: Copy files from host to container

```dockerfile
COPY package.json ./         # Copy single file (preferred)
COPY src/ ./src/             # Copy directory
ADD archive.tar.gz /app/     # ADD can extract archives (rarely needed)
```

**Rule**: Use `COPY` unless you specifically need `ADD`'s features.

#### RUN
**Purpose**: Execute commands during build (installs software, dependencies)

```dockerfile
RUN npm install                      # Install Node dependencies
RUN apt-get update && apt-get install -y curl  # Install system packages
RUN pip install -r requirements.txt  # Install Python packages
```

**Tip**: Combine commands with `&&` to reduce layers:
```dockerfile
# Bad (3 layers)
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Good (1 layer)
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean
```

#### EXPOSE
**Purpose**: Document which ports the container listens on (documentation only, doesn't actually publish)

```dockerfile
EXPOSE 3000      # App listens on port 3000
EXPOSE 8080      # Multiple ports okay
```

#### ENV
**Purpose**: Set environment variables

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=postgresql://localhost/mydb
```

#### CMD vs ENTRYPOINT
**Purpose**: Define the command to run when container starts

```dockerfile
# CMD - can be overridden
CMD ["node", "server.js"]

# ENTRYPOINT - always runs (harder to override)
ENTRYPOINT ["node"]
CMD ["server.js"]        # Default args for ENTRYPOINT

# When container runs:
# Without override: node server.js
# With override (docker run my-image app.js): node app.js
```

---

## Docker Commands

### Image Commands

```bash
# Build image from Dockerfile
docker build -t my-app:1.0 .

# List images
docker images

# Pull image from registry
docker pull node:18-alpine

# Remove image
docker rmi my-app:1.0

# Tag image
docker tag my-app:1.0 my-app:latest
```

### Container Commands

```bash
# Run container
docker run my-app                          # Basic run
docker run -d my-app                       # Detached (background)
docker run -p 3000:3000 my-app             # Port mapping (host:container)
docker run --name my-container my-app      # Named container
docker run -e NODE_ENV=production my-app   # Environment variable
docker run -v my-data:/app/data my-app     # Mount volume

# List containers
docker ps           # Running containers
docker ps -a        # All containers (including stopped)

# Container lifecycle
docker start my-container
docker stop my-container
docker restart my-container
docker rm my-container       # Remove stopped container
docker rm -f my-container    # Force remove (even if running)

# Execute command in running container
docker exec -it my-container bash     # Interactive shell
docker exec my-container ls /app      # Run single command

# View logs
docker logs my-container
docker logs -f my-container    # Follow logs (like tail -f)

# Inspect container
docker inspect my-container
docker stats my-container      # Resource usage
```

### Cleanup Commands

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything unused
docker system prune      # Containers, networks, images
docker system prune -a   # Also remove unused images (not just dangling)

# Remove volumes
docker volume prune
```

---

## Best Practices

### 1. Use Specific Image Tags

```dockerfile
# Bad - version can change
FROM node:latest

# Good - explicit version
FROM node:18-alpine
```

### 2. Minimize Layer Count

```dockerfile
# Bad - 3 layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git

# Good - 1 layer
RUN apt-get update && \
    apt-get install -y \
        curl \
        git && \
    rm -rf /var/lib/apt/lists/*
```

### 3. Leverage Build Cache

```dockerfile
# Good - dependencies cached separately from code
COPY package*.json ./
RUN npm install
COPY . .              # Code changes don't invalidate npm install cache
```

### 4. Use .dockerignore

```
# .dockerignore
node_modules/
.git/
.env
*.log
.DS_Store
```

### 5. Multi-Stage Builds (Advanced)

```dockerfile
# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]
```

**Benefits**: Smaller final image (no build tools), more secure

### 6. Run as Non-Root User

```dockerfile
# Create user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Now all commands run as appuser (more secure)
```

### 7. Keep Images Small

- Use Alpine-based images (`node:18-alpine` instead of `node:18`)
- Remove unnecessary files
- Don't install development dependencies in production
- Use multi-stage builds

---

## Exercises

In this project, you'll complete exercises that test your understanding of Docker basics:

### Exercise Files

1. **exercise.ts** - Main exercise file with TODO tasks
   - Building Dockerfiles
   - Understanding Docker concepts
   - Running containers

2. **test.ts** - Validation tests (run with `npm test`)

### What You'll Build

- Dockerfiles for various scenarios
- Docker commands for container management
- Understanding of Docker layers and caching

### How to Complete

1. Read this README thoroughly
2. Open `exercise.ts` and find all TODO comments
3. Fill in the blanks based on what you learned
4. Run `npm test` to validate your solutions
5. Experiment with Docker commands in your terminal

---

## Quick Reference

**Build image:**
```bash
docker build -t my-app .
```

**Run container:**
```bash
docker run -d -p 3000:3000 --name my-container my-app
```

**View logs:**
```bash
docker logs -f my-container
```

**Stop and remove:**
```bash
docker stop my-container && docker rm my-container
```

---

## Further Learning

- [Official Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/) - Explore public images
- [Play with Docker](https://labs.play-with-docker.com/) - Browser-based Docker playground
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

**Ready?** Open `exercise.ts` and start coding! 🐳
