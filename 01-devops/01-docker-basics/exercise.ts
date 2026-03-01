/**
 * DOCKER BASICS - EXERCISES
 *
 * This file contains exercises to test your understanding of Docker fundamentals.
 * Fill in all the TODO sections to complete the exercises.
 *
 * Run `npm test` to validate your solutions.
 */

/**
 * EXERCISE 1: Docker Concepts
 *
 * Fill in the definitions to demonstrate your understanding of core Docker concepts.
 */

export const dockerConcepts = {
  /**
   * TODO: Complete the definition of what a Docker image is
   * Hint: Think about what it contains and its relationship to containers
   */
  whatIsImage: "A Docker image is ",  // TODO: Complete this

  /**
   * TODO: Complete the definition of what a Docker container is
   * Hint: Think about its relationship to images and its lifecycle
   */
  whatIsContainer: "",  // TODO: Complete this

  /**
   * TODO: List at least 3 benefits of using Docker
   * Hint: Think about consistency, portability, isolation, etc.
   */
  benefits: [
    "",  // TODO: Benefit 1
    "",  // TODO: Benefit 2
    "",  // TODO: Benefit 3
  ],

  /**
   * TODO: What's the difference between an image and a container?
   */
  imagevs Container: "",  // TODO: Explain the difference
};

/**
 * EXERCISE 2: Dockerfile Instructions
 *
 * Build Dockerfiles for different scenarios by filling in the TODO sections.
 */

/**
 * TODO: Complete this Dockerfile for a Node.js application
 *
 * Requirements:
 * - Use Node.js 18 Alpine as base image
 * - Set working directory to /app
 * - Copy package.json and package-lock.json first (for caching)
 * - Install dependencies
 * - Copy the rest of the application code
 * - Expose port 3000
 * - Run the application with "node server.js"
 */
export const nodeDockerfile = `
# TODO: Specify base image (Node.js 18 Alpine)


# TODO: Set working directory to /app


# TODO: Copy package*.json files


# TODO: Install dependencies (npm install)


# TODO: Copy rest of application code


# TODO: Expose port 3000


# TODO: Define the command to run the app

`;

/**
 * TODO: Complete this Dockerfile for a Python application
 *
 * Requirements:
 * - Use Python 3.11 slim as base image
 * - Set working directory to /app
 * - Copy requirements.txt first
 * - Install Python dependencies (pip install -r requirements.txt)
 * - Copy application code
 * - Set environment variable PYTHONUNBUFFERED=1
 * - Expose port 8000
 * - Run the application with "python app.py"
 */
export const pythonDockerfile = `
# TODO: Specify base image


# TODO: Set working directory


# TODO: Set environment variable PYTHONUNBUFFERED=1


# TODO: Copy requirements.txt


# TODO: Install dependencies


# TODO: Copy application code


# TODO: Expose port


# TODO: Run command

`;

/**
 * EXERCISE 3: Docker Commands
 *
 * Provide the correct Docker commands for various scenarios.
 */

export const dockerCommands = {
  /**
   * TODO: Command to build an image named "my-app" with tag "1.0" from current directory
   * Hint: docker build -t <name>:<tag> <path>
   */
  buildImage: "",  // TODO: Fill in command

  /**
   * TODO: Command to run a container in detached mode (-d),
   * mapping port 3000 on host to 3000 in container,
   * with name "my-container",
   * from image "my-app:1.0"
   */
  runContainer: "",  // TODO: Fill in command

  /**
   * TODO: Command to list all running containers
   */
  listRunningContainers: "",  // TODO: Fill in command

  /**
   * TODO: Command to list ALL containers (including stopped)
   */
  listAllContainers: "",  // TODO: Fill in command

  /**
   * TODO: Command to stop a container named "my-container"
   */
  stopContainer: "",  // TODO: Fill in command

  /**
   * TODO: Command to remove a container named "my-container"
   * Hint: Container must be stopped first, or use force flag
   */
  removeContainer: "",  // TODO: Fill in command

  /**
   * TODO: Command to view logs of container "my-container" and follow them
   * Hint: Use -f flag to follow
   */
  viewLogs: "",  // TODO: Fill in command

  /**
   * TODO: Command to execute an interactive bash shell in running container "my-container"
   * Hint: docker exec -it <container> <command>
   */
  execShell: "",  // TODO: Fill in command

  /**
   * TODO: Command to remove all stopped containers
   * Hint: Use prune
   */
  cleanupContainers: "",  // TODO: Fill in command
};

/**
 * EXERCISE 4: Advanced Dockerfile (Multi-stage Build)
 *
 * TODO: Complete this multi-stage Dockerfile for a Node.js application
 *
 * Requirements:
 * Stage 1 (build):
 * - Use node:18 as base
 * - Name this stage "build"
 * - Set working directory
 * - Copy package files and install dependencies
 * - Copy source code
 * - Run build command (npm run build)
 *
 * Stage 2 (production):
 * - Use node:18-alpine for smaller image
 * - Set working directory
 * - Copy only the built files from build stage (/app/dist)
 * - Copy only production dependencies from build stage (/app/node_modules)
 * - Expose port 3000
 * - Run the built application (node dist/server.js)
 */
export const multiStageDockerfile = `
# Stage 1: Build
# TODO: FROM instruction with alias "build"


# TODO: WORKDIR instruction


# TODO: Copy package files


# TODO: Install dependencies (including dev dependencies)


# TODO: Copy source code


# TODO: Run build command (npm run build)


# Stage 2: Production
# TODO: FROM instruction using Alpine


# TODO: WORKDIR instruction


# TODO: Copy dist folder from build stage
# Hint: COPY --from=build /app/dist ./dist


# TODO: Copy node_modules from build stage


# TODO: Expose port 3000


# TODO: CMD to run the application

`;

/**
 * EXERCISE 5: Docker Volumes & Networks
 *
 * Answer questions about volumes and networks.
 */

export const volumesAndNetworks = {
  /**
   * TODO: Why do we need Docker volumes?
   * Hint: Think about data persistence
   */
  whyVolumes: "",  // TODO: Explain

  /**
   * TODO: Command to create a named volume called "app-data"
   */
  createVolume: "",  // TODO: Fill in command

  /**
   * TODO: Command to run a container with volume "app-data" mounted to /data in container
   * Use image "my-app"
   */
  runWithVolume: "",  // TODO: Fill in command

  /**
   * TODO: Why do containers need networks?
   * Hint: Think about container isolation and communication
   */
  whyNetworks: "",  // TODO: Explain

  /**
   * TODO: Command to create a network called "app-network"
   */
  createNetwork: "",  // TODO: Fill in command

  /**
   * TODO: Command to run two containers on the same network
   * Container 1: name "db", image "postgres", network "app-network"
   * Container 2: name "api", image "my-api", network "app-network"
   *
   * Provide both commands as an array
   */
  runOnSameNetwork: [
    "",  // TODO: Command for db container
    "",  // TODO: Command for api container
  ],
};

/**
 * EXERCISE 6: Best Practices
 *
 * Identify and fix issues in the Dockerfile below.
 */

/**
 * TODO: Fix this Dockerfile - it has several issues
 *
 * Issues to fix:
 * 1. Using ":latest" tag (not specific enough)
 * 2. Not leveraging build cache (copying code before dependencies)
 * 3. Running as root user (security issue)
 * 4. Too many layers (RUN commands not combined)
 * 5. No .dockerignore mentioned
 *
 * Create a corrected version below
 */
export const badDockerfile = `
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN apt-get update
RUN apt-get install -y curl
EXPOSE 3000
CMD ["node", "dist/server.js"]
`;

/**
 * TODO: Provide the corrected Dockerfile
 */
export const goodDockerfile = `
# TODO: Fix all the issues from badDockerfile above






`;

/**
 * TODO: What should be in a .dockerignore file for a Node.js project?
 * List at least 5 entries
 */
export const dockerignoreContents = `
# TODO: Add .dockerignore entries (one per line)




`;

/**
 * EXERCISE 7: Practical Scenario
 *
 * You're deploying a full-stack application with:
 * - React frontend (runs on port 3000)
 * - Node.js API (runs on port 4000)
 * - PostgreSQL database (runs on port 5432)
 *
 * TODO: Provide the Docker commands to:
 */
export const practicalScenario = {
  /**
   * TODO: Create a network for all services to communicate
   */
  step1_createNetwork: "",  // TODO: Command

  /**
   * TODO: Run PostgreSQL container
   * - Name: "postgres-db"
   * - Network: "app-net"
   * - Environment: POSTGRES_PASSWORD=mysecret
   * - Volume: postgres-data mounted to /var/lib/postgresql/data
   */
  step2_runDatabase: "",  // TODO: Command

  /**
   * TODO: Run API container
   * - Name: "api"
   * - Network: "app-net"
   * - Port: 4000:4000
   * - Environment: DATABASE_URL=postgresql://postgres:mysecret@postgres-db:5432/mydb
   * - Image: "my-api:1.0"
   */
  step3_runAPI: "",  // TODO: Command

  /**
   * TODO: Run frontend container
   * - Name: "frontend"
   * - Network: "app-net"
   * - Port: 3000:3000
   * - Environment: REACT_APP_API_URL=http://localhost:4000
   * - Image: "my-frontend:1.0"
   */
  step4_runFrontend: "",  // TODO: Command

  /**
   * TODO: How would you check if all containers are running?
   */
  step5_checkStatus: "",  // TODO: Command

  /**
   * TODO: How would you view API logs?
   */
  step6_viewLogs: "",  // TODO: Command
};

/**
 * CONGRATULATIONS!
 *
 * Once you've completed all exercises:
 * 1. Run `npm test` to validate your solutions
 * 2. Try the commands in your terminal with real Docker
 * 3. Build an actual Dockerfile for a project
 *
 * Next: Move on to 02-docker-compose to learn about orchestrating multiple containers!
 */
