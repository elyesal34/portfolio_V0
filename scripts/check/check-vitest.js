// Simple check to see if vitest can run
console.log('Starting vitest check...');

// Try to require vitest
try {
  const { test, expect } = require('vitest');
  console.log('✅ Vitest is installed and can be required');
  
  // Run a simple test
  test('1 + 1 = 2', () => {
    console.log('Running test...');
    expect(1 + 1).toBe(2);
    console.log('Test completed');
  });
  
  console.log('✅ Test was defined');
} catch (error) {
  console.error('❌ Error requiring vitest:', error);
}
