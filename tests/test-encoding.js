// Simple test file with ASCII only
const fs = require('fs');

console.log("=== TEST START ===");
console.log("1. Basic test:");
console.log("   Hello, world!");
console.log("\n2. File system test:");

try {
  const files = fs.readdirSync('.').slice(0, 3);
  console.log("   First 3 files:", files.join(', '));
} catch (e) {
  console.log("   Error reading directory:", e.message);
}

console.log("\n3. Environment:");
console.log("   Node version:", process.version);
console.log("   Platform:", process.platform);
console.log("   Current directory:", process.cwd());

console.log("\n=== TEST END ===");
