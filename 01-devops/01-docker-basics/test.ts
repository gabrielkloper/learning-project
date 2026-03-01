import { describe, it, expect } from 'vitest';
import {
  dockerConcepts,
  nodeDockerfile,
  pythonDockerfile,
  dockerCommands,
  multiStageDockerfile,
  volumesAndNetworks,
  goodDockerfile,
  dockerignoreContents,
  practicalScenario,
} from './exercise';

describe('Docker Basics - Exercises', () => {
  describe('Exercise 1: Docker Concepts', () => {
    it('should define what a Docker image is', () => {
      expect(dockerConcepts.whatIsImage).toBeTruthy();
      expect(dockerConcepts.whatIsImage.length).toBeGreaterThan(20);
      expect(dockerConcepts.whatIsImage.toLowerCase()).toContain('image');
    });

    it('should define what a Docker container is', () => {
      expect(dockerConcepts.whatIsContainer).toBeTruthy();
      expect(dockerConcepts.whatIsContainer.length).toBeGreaterThan(20);
      expect(dockerConcepts.whatIsContainer.toLowerCase()).toContain('container');
    });

    it('should list at least 3 benefits of Docker', () => {
      expect(dockerConcepts.benefits).toHaveLength(3);
      dockerConcepts.benefits.forEach((benefit) => {
        expect(benefit).toBeTruthy();
        expect(benefit.length).toBeGreaterThan(5);
      });
    });

    it('should explain the difference between image and container', () => {
      expect(dockerConcepts.imageVsContainer).toBeTruthy();
      expect(dockerConcepts.imageVsContainer.length).toBeGreaterThan(20);
    });
  });

  describe('Exercise 2: Dockerfile Instructions - Node.js', () => {
    it('should use Node.js 18 Alpine as base image', () => {
      expect(nodeDockerfile).toContain('FROM node:18-alpine');
    });

    it('should set working directory to /app', () => {
      expect(nodeDockerfile).toMatch(/WORKDIR\s+\/app/);
    });

    it('should copy package*.json files first', () => {
      const lines = nodeDockerfile.split('\n');
      const packageCopyLine = lines.findIndex((line) =>
        line.includes('COPY') && line.includes('package')
      );
      const fullCopyLine = lines.findIndex(
        (line) => line.includes('COPY . .') || (line.includes('COPY') && line.includes('. ./'))
      );

      expect(packageCopyLine).toBeGreaterThan(-1);
      if (fullCopyLine > -1) {
        expect(packageCopyLine).toBeLessThan(fullCopyLine);
      }
    });

    it('should install dependencies', () => {
      expect(nodeDockerfile).toMatch(/RUN\s+npm\s+(ci|install)/);
    });

    it('should copy application code', () => {
      expect(nodeDockerfile).toMatch(/COPY\s+\.\s+\./);
    });

    it('should expose port 3000', () => {
      expect(nodeDockerfile).toMatch(/EXPOSE\s+3000/);
    });

    it('should have CMD to run the app', () => {
      expect(nodeDockerfile).toContain('CMD');
      expect(nodeDockerfile).toContain('node');
      expect(nodeDockerfile).toContain('server.js');
    });
  });

  describe('Exercise 2: Dockerfile Instructions - Python', () => {
    it('should use Python 3.11 slim as base image', () => {
      expect(pythonDockerfile).toMatch(/FROM\s+python:3\.11(-slim)?/);
    });

    it('should set PYTHONUNBUFFERED environment variable', () => {
      expect(pythonDockerfile).toMatch(/ENV\s+PYTHONUNBUFFERED[=\s]+1/);
    });

    it('should copy requirements.txt and install dependencies', () => {
      expect(pythonDockerfile).toContain('requirements.txt');
      expect(pythonDockerfile).toMatch(/pip\s+install.*requirements\.txt/);
    });

    it('should expose a port', () => {
      expect(pythonDockerfile).toMatch(/EXPOSE\s+\d+/);
    });

    it('should have CMD to run Python app', () => {
      expect(pythonDockerfile).toContain('python');
      expect(pythonDockerfile).toContain('app.py');
    });
  });

  describe('Exercise 3: Docker Commands', () => {
    it('should have build command', () => {
      expect(dockerCommands.buildImage).toContain('docker build');
      expect(dockerCommands.buildImage).toContain('-t');
      expect(dockerCommands.buildImage).toContain('my-app:1.0');
    });

    it('should have run command with all flags', () => {
      const cmd = dockerCommands.runContainer;
      expect(cmd).toContain('docker run');
      expect(cmd).toContain('-d');
      expect(cmd).toContain('-p 3000:3000');
      expect(cmd).toContain('--name my-container');
      expect(cmd).toContain('my-app:1.0');
    });

    it('should list running containers', () => {
      expect(dockerCommands.listRunningContainers).toMatch(/docker\s+ps/);
    });

    it('should list all containers', () => {
      expect(dockerCommands.listAllContainers).toContain('docker ps');
      expect(dockerCommands.listAllContainers).toContain('-a');
    });

    it('should stop container', () => {
      expect(dockerCommands.stopContainer).toContain('docker stop');
      expect(dockerCommands.stopContainer).toContain('my-container');
    });

    it('should remove container', () => {
      expect(dockerCommands.removeContainer).toContain('docker rm');
      expect(dockerCommands.removeContainer).toContain('my-container');
    });

    it('should view logs with follow flag', () => {
      expect(dockerCommands.viewLogs).toContain('docker logs');
      expect(dockerCommands.viewLogs).toContain('-f');
      expect(dockerCommands.viewLogs).toContain('my-container');
    });

    it('should exec into container with bash', () => {
      expect(dockerCommands.execShell).toContain('docker exec');
      expect(dockerCommands.execShell).toContain('-it');
      expect(dockerCommands.execShell).toContain('my-container');
      expect(dockerCommands.execShell).toMatch(/bash|sh/);
    });

    it('should cleanup with prune', () => {
      expect(dockerCommands.cleanupContainers).toContain('docker');
      expect(dockerCommands.cleanupContainers).toContain('prune');
    });
  });

  describe('Exercise 4: Multi-stage Dockerfile', () => {
    it('should have two FROM statements (multi-stage)', () => {
      const fromCount = (multiStageDockerfile.match(/FROM/g) || []).length;
      expect(fromCount).toBeGreaterThanOrEqual(2);
    });

    it('should name the build stage', () => {
      expect(multiStageDockerfile).toMatch(/FROM.*AS\s+build/i);
    });

    it('should use Alpine in production stage', () => {
      const lines = multiStageDockerfile.split('\n');
      const secondFrom = lines.filter((line) => line.includes('FROM'))[1];
      expect(secondFrom).toContain('alpine');
    });

    it('should copy from build stage', () => {
      expect(multiStageDockerfile).toMatch(/COPY\s+--from=build/);
    });

    it('should run build command in build stage', () => {
      expect(multiStageDockerfile).toMatch(/npm\s+run\s+build/);
    });
  });

  describe('Exercise 5: Volumes & Networks', () => {
    it('should explain why volumes are needed', () => {
      expect(volumesAndNetworks.whyVolumes).toBeTruthy();
      expect(volumesAndNetworks.whyVolumes.length).toBeGreaterThan(15);
    });

    it('should create a volume', () => {
      expect(volumesAndNetworks.createVolume).toContain('docker volume create');
      expect(volumesAndNetworks.createVolume).toContain('app-data');
    });

    it('should run container with volume', () => {
      expect(volumesAndNetworks.runWithVolume).toContain('docker run');
      expect(volumesAndNetworks.runWithVolume).toContain('-v');
      expect(volumesAndNetworks.runWithVolume).toContain('app-data');
    });

    it('should explain why networks are needed', () => {
      expect(volumesAndNetworks.whyNetworks).toBeTruthy();
      expect(volumesAndNetworks.whyNetworks.length).toBeGreaterThan(15);
    });

    it('should create a network', () => {
      expect(volumesAndNetworks.createNetwork).toContain('docker network create');
      expect(volumesAndNetworks.createNetwork).toContain('app-network');
    });

    it('should run containers on same network', () => {
      const [dbCmd, apiCmd] = volumesAndNetworks.runOnSameNetwork;

      expect(dbCmd).toContain('docker run');
      expect(dbCmd).toContain('--network app-network');
      expect(dbCmd).toContain('--name db');
      expect(dbCmd).toContain('postgres');

      expect(apiCmd).toContain('docker run');
      expect(apiCmd).toContain('--network app-network');
      expect(apiCmd).toContain('--name api');
      expect(apiCmd).toContain('my-api');
    });
  });

  describe('Exercise 6: Best Practices', () => {
    it('should use specific image tag (not :latest)', () => {
      expect(goodDockerfile).toMatch(/FROM\s+node:\d+/);
      expect(goodDockerfile).not.toContain(':latest');
    });

    it('should copy package files before code (leverage cache)', () => {
      const lines = goodDockerfile.split('\n');
      const packageCopyLine = lines.findIndex((line) =>
        line.includes('COPY') && line.includes('package')
      );
      const fullCopyLine = lines.findIndex((line) =>
        line.includes('COPY . .')
      );

      if (packageCopyLine > -1 && fullCopyLine > -1) {
        expect(packageCopyLine).toBeLessThan(fullCopyLine);
      }
    });

    it('should have .dockerignore entries', () => {
      const entries = dockerignoreContents.split('\n').filter((line) => line.trim() && !line.startsWith('#'));
      expect(entries.length).toBeGreaterThanOrEqual(5);
      expect(dockerignoreContents).toMatch(/node_modules|\.git|\.env/);
    });
  });

  describe('Exercise 7: Practical Scenario', () => {
    it('should create network', () => {
      expect(practicalScenario.step1_createNetwork).toContain('docker network create');
      expect(practicalScenario.step1_createNetwork).toContain('app-net');
    });

    it('should run database with volume and environment', () => {
      const cmd = practicalScenario.step2_runDatabase;
      expect(cmd).toContain('docker run');
      expect(cmd).toContain('--network app-net');
      expect(cmd).toContain('--name postgres-db');
      expect(cmd).toContain('POSTGRES_PASSWORD');
      expect(cmd).toContain('-v');
      expect(cmd).toContain('postgres');
    });

    it('should run API with environment variables', () => {
      const cmd = practicalScenario.step3_runAPI;
      expect(cmd).toContain('docker run');
      expect(cmd).toContain('--network app-net');
      expect(cmd).toContain('-p 4000:4000');
      expect(cmd).toContain('DATABASE_URL');
      expect(cmd).toContain('my-api:1.0');
    });

    it('should run frontend', () => {
      const cmd = practicalScenario.step4_runFrontend;
      expect(cmd).toContain('docker run');
      expect(cmd).toContain('-p 3000:3000');
      expect(cmd).toContain('my-frontend:1.0');
    });

    it('should check status with docker ps', () => {
      expect(practicalScenario.step5_checkStatus).toContain('docker ps');
    });

    it('should view logs', () => {
      expect(practicalScenario.step6_viewLogs).toContain('docker logs');
      expect(practicalScenario.step6_viewLogs).toContain('api');
    });
  });
});
