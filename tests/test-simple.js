const assert = require('assert');

// Simple test using Node's built-in assert
console.log('Running simple test...');
try {
  assert.strictEqual(1 + 1, 2);
  console.log('✓ Test passed');
  process.exit(0);
} catch (error) {
  console.error('✗ Test failed:', error);
  process.exit(1);
}
