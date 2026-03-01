# DevOps Learning Area

Welcome to the DevOps learning area! This section covers fundamental DevOps practices including containerization, orchestration, and continuous integration/deployment.

## What is DevOps?

**DevOps** is a set of practices that combines software development (Dev) and IT operations (Ops). The goal is to shorten the development lifecycle and provide continuous delivery with high software quality.

### Key DevOps Principles

1. **Automation**: Automate repetitive tasks (testing, deployment, infrastructure setup)
2. **Continuous Integration/Continuous Deployment (CI/CD)**: Regularly merge code changes and deploy automatically
3. **Infrastructure as Code (IaC)**: Manage infrastructure through code rather than manual processes
4. **Monitoring & Logging**: Track application health and performance
5. **Collaboration**: Break down silos between development and operations teams

## What You'll Learn

### 01. Docker Basics
**Focus**: Containerization fundamentals

- What are containers and why they matter
- Docker images, containers, and registries
- Writing Dockerfiles
- Managing volumes and networks
- Best practices for container images

**Skills**: Package applications in portable, isolated environments

---

### 02. Docker Compose
**Focus**: Multi-container applications

- Defining services with docker-compose.yml
- Container orchestration basics
- Service networking and communication
- Volume management across services
- Environment variables and configuration

**Skills**: Run complex multi-service applications locally

---

### 03. CI/CD Basics
**Focus**: Automated testing and deployment

- Continuous Integration concepts
- GitHub Actions workflows
- Automated testing in pipelines
- Build and deployment automation
- Environment-specific configurations

**Skills**: Automate your development workflow from commit to deployment

---

## Prerequisites

### Required
- Basic command line knowledge
- Understanding of software development workflow
- Git basics (commits, branches, pull requests)

### Tools Needed
- **Docker Desktop** (for Docker exercises)
  - Download: https://www.docker.com/products/docker-desktop
- **Node.js** v18+ (for exercise code)
- **Git** (for CI/CD exercises)
- Text editor or IDE

## Learning Path

**Recommended Order:**
1. **Docker Basics** → Understand containers first
2. **Docker Compose** → Build on Docker knowledge
3. **CI/CD Basics** → Apply to real workflows

**Time Estimate**: 6-10 hours total for all three projects

## Real-World Applications

### Why Learn DevOps?

**For Developers:**
- Package your application consistently across environments ("It works on my machine" problem solved)
- Speed up development with automated testing and deployment
- Collaborate better with operations teams
- Understand production infrastructure

**Career Benefits:**
- DevOps skills are highly valued (increased demand)
- Enables full-stack understanding
- Opens roles like DevOps Engineer, Site Reliability Engineer (SRE), Platform Engineer

### Industry Usage

- **Docker**: Used by 80%+ of software companies for containerization
- **CI/CD**: Standard practice in modern software development
- **Infrastructure as Code**: Growing adoption in cloud-native applications

## Projects Overview

| Project | Type | Difficulty | Est. Time |
|---------|------|-----------|-----------|
| 01-docker-basics | Single file + multi-file | Beginner | 2-3 hours |
| 02-docker-compose | Multi-file project | Intermediate | 2-3 hours |
| 03-ci-cd-basics | Configuration file | Intermediate | 2-4 hours |

## Getting Help

### Resources

**Docker:**
- [Official Docker Documentation](https://docs.docker.com/)
- [Docker Getting Started Tutorial](https://docs.docker.com/get-started/)
- [Docker Hub](https://hub.docker.com/) - Public container registry

**CI/CD:**
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

**General DevOps:**
- [The Phoenix Project](https://www.goodreads.com/book/show/17255186-the-phoenix-project) (Book)
- [DevOps Roadmap](https://roadmap.sh/devops)

### Common Issues

**Docker not starting?**
- Ensure Docker Desktop is running
- Check that virtualization is enabled in BIOS (Windows)
- Try restarting Docker Desktop

**Permission errors?**
- On Linux: Add your user to the docker group
- On Windows/Mac: Docker Desktop handles permissions

**Containers not accessible?**
- Check port mappings (`-p` flag)
- Ensure ports aren't already in use
- Verify firewall settings

## Next Steps

Ready to start? Head to:
1. `01-docker-basics/` - Begin with Docker fundamentals
2. Read the README.md in each project folder
3. Complete the exercises
4. Run the tests to validate your learning

**Let's containerize!** 🚀
