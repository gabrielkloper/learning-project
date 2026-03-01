/**
 * Simple Build Script
 *
 * Simulates a build process for the CI/CD pipeline.
 * In a real project, this might bundle, transpile, or optimize code.
 */

const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy app.js to dist
const srcFile = path.join(__dirname, 'src', 'app.js');
const distFile = path.join(distDir, 'app.js');
fs.copyFileSync(srcFile, distFile);

// Create a simple index.html
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator App</title>
</head>
<body>
  <h1>Calculator Application</h1>
  <p>Build successful! This would be your production build.</p>
  <p>Build timestamp: ${new Date().toISOString()}</p>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);

// Create build info JSON
const buildInfo = {
  version: require('./package.json').version,
  buildTime: new Date().toISOString(),
  nodeVersion: process.version,
  platform: process.platform,
};

fs.writeFileSync(
  path.join(distDir, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);

console.log('✓ Build completed successfully!');
console.log(`✓ Output directory: ${distDir}`);
console.log('✓ Files created:');
console.log('  - app.js');
console.log('  - index.html');
console.log('  - build-info.json');
