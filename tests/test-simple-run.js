// Simple test runner
const { exec } = require('child_process');
const fs = require('fs');

console.log('=== Starting Test Runner ===');

// 1. Create a simple test file
const testContent = `
// @vitest-environment node
import { test, expect } from 'vitest';

test('1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});
`;

fs.writeFileSync('temp-test.js', testContent);

// 2. Run the test with vitest
console.log('Running Vitest...');
const vitest = exec('npx vitest run temp-test.js --reporter=verbose', (error, stdout, stderr) => {
  console.log('\n=== Test Output ===');
  console.log(stdout);
  
  if (error) {
    console.error('Test failed:', error);
  }
  
  if (stderr) {
    console.error('Error output:', stderr);
  }
  
  // Clean up
  try {
    fs.unlinkSync('temp-test.js');
  } catch (e) {
    console.error('Error cleaning up:', e.message);
  }
  
  console.log('=== Test Runner Finished ===');
});

// Log output as it happens
vitest.stdout.on('data', (data) => {
  console.log(data.toString());
});

vitest.stderr.on('data', (data) => {
  console.error(data.toString());
});
