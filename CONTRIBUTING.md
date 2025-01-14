# Contributing to Deepseek Node.js Client

We value your contributions and aim to make the process as straightforward and transparent as possible. Follow the steps below to get started.

## Development Process

1. **Fork the repository** and create a new branch from the `main` branch.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Make your changes** and ensure they are thoroughly tested.
4. Run tests to verify your changes:
   ```bash
   npm test
   ```
5. **Lint your code** to ensure consistency:
   ```bash
   npm run lint
   ```

## Pull Request Process

1. **Update the README.md** with relevant changes, if applicable.
2. Increment the version number in `package.json` according to [Semantic Versioning (SemVer)](https://semver.org/).
3. Submit a pull request (PR). A maintainer will review your changes and provide feedback if necessary.
4. Your PR will be merged once it has been approved by the maintainers.

## Code Style Guidelines

To maintain a consistent codebase, adhere to the following standards:
- **Use TypeScript** throughout the project.
- Follow the **existing code style**.
- Include **JSDoc comments** for public APIs.
- Write **clear and descriptive commit messages**.

## Running Tests

Ensure your changes are tested thoroughly before submitting a pull request:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Reporting Bugs

Help us improve by reporting issues through GitHub's [issue tracker](issues).

A **great bug report** should include:
- A brief and descriptive summary.
- Steps to reproduce the issue.
- What you expected to happen.
- What actually happened.
- Any additional notes or insights.

## License

By contributing to this project, you agree that your contributions will be licensed under the **MIT License**.

