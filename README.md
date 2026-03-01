# Software Engineering Learning Project

A comprehensive collection of hands-on coding exercises covering all major software engineering areas. Learn by doing - fill in the TODOs, run the tests, and master the concepts.

## Overview

This project is designed as a practical learning workbook for developers who want to deepen their understanding of software engineering fundamentals across multiple domains. Instead of passive tutorials, each topic includes:

- **Theory**: Comprehensive explanations in README files
- **Examples**: Working code demonstrating concepts
- **Exercises**: Code with TODO comments for hands-on practice
- **Tests**: Automated validation of your solutions

## Structure

The project is organized into 7 major learning areas:

```
01-devops/                    # Docker, CI/CD, Infrastructure
02-webdev-fundamentals/       # HTTP, CORS, WebSockets, Security
03-typescript-deep-dive/      # Advanced types, Generics, Patterns
04-ai-ml-agents/             # Machine Learning, LLMs, AI Agents (Python)
05-data-engineering/         # ETL, SQL, Data Processing (Python)
06-software-principles/      # SOLID, Design Patterns, Clean Code
07-frameworks-libraries/     # State Management, ORMs, Testing
```

## How to Use

### Getting Started

1. **Clone and navigate**
   ```bash
   cd learning-project
   ```

2. **Pick a learning area** - Start with any area that interests you (01-devops recommended for beginners)

3. **Read the README** - Each project folder has a README.md explaining the concepts

4. **Complete the TODOs** - Open the exercise files and fill in the blank sections marked with TODO comments

5. **Run the tests** - Validate your solution by running the test files
   ```bash
   npm test          # For TypeScript projects
   pytest test.py    # For Python projects
   ```

6. **Track your progress** - Check off completed projects in PROGRESS.md

### Learning Path Recommendations

**For Backend Developers:**
- Start with: DevOps → WebDev Fundamentals → TypeScript → Software Principles

**For Frontend Developers:**
- Start with: TypeScript → WebDev Fundamentals → Frameworks → Software Principles

**For Data/ML Engineers:**
- Start with: TypeScript Basics → AI/ML → Data Engineering → Software Principles

**For Full Stack:**
- Follow all areas in order (01 → 07)

## Prerequisites

### Required
- **Node.js** v18+ (for TypeScript projects)
- **npm** or **pnpm** (package management)
- **Git** (version control)
- Basic programming knowledge (2+ years experience)

### Optional (for specific areas)
- **Docker** (for DevOps exercises)
- **Python 3.11+** (for AI/ML and Data Engineering)
- **PostgreSQL** (for database optimization exercises)

## Technology Stack

- **TypeScript/JavaScript**: Primary language for web, backend, and general programming concepts
- **Python**: For AI/ML and data engineering projects
- **Node.js**: Runtime for TypeScript exercises
- **Vitest**: Testing framework for TypeScript
- **pytest**: Testing framework for Python
- **Docker**: Containerization (DevOps area)

## Project Types

### Single-File Exercises
Simple concepts with all code in one file. Fill in the TODOs and run the file.

**Example:**
```typescript
// exercises.ts
// TODO: Implement this function
function calculateSum(a: number, b: number): number {
  // Your code here
}
```

### Multi-File Projects
Complex concepts requiring multiple files (server, client, config, tests).

**Example:**
```
01-http-basics/
├── README.md          # Theory
├── server.ts          # TODO: Implement routes
├── client.ts          # TODO: Make requests
├── test.ts            # Validation
└── package.json
```

## Running Exercises

### TypeScript Projects

```bash
# Navigate to project folder
cd 02-webdev-fundamentals/01-http-basics

# Install dependencies
npm install

# Run the exercise (if applicable)
npm run dev

# Run tests
npm test
```

### Python Projects

```bash
# Navigate to project folder
cd 04-ai-ml-agents/01-ml-basics

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the exercise
python exercise.py

# Run tests
pytest test.py
```

## Progress Tracking

Use `PROGRESS.md` to track your learning journey:

```markdown
## 01. DevOps
- [x] 01-docker-basics        # Completed
- [~] 02-docker-compose        # In progress
- [ ] 03-ci-cd-basics          # Not started
```

**Legend:**
- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed

## Learning Tips

1. **Read theory first** - Always start by reading the README.md in each project folder

2. **Study examples** - Look at working examples before attempting exercises

3. **Search for TODOs** - Use your editor to find all TODO comments in exercise files

4. **Run tests frequently** - Use tests to validate your understanding as you go

5. **Experiment** - Don't just fill in blanks - try variations and edge cases

6. **Take notes** - Add your own comments explaining concepts in your own words

7. **Build on knowledge** - Earlier areas provide foundation for later ones

## Getting Help

- **README files**: Each project has detailed explanations
- **Comments in code**: Inline hints and explanations
- **Test files**: Show expected behavior and usage
- **Internet resources**: MDN, TypeScript docs, Python docs, etc.

## Contributing

Found an error or want to add a new exercise? Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Submit a pull request

## License

This learning project is open source and available for educational purposes.

---

**Happy Learning!** Remember: The goal isn't just to complete the exercises, but to deeply understand the concepts. Take your time, experiment, and build strong foundations.
