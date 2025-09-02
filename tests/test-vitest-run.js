const { exec } = require('child_process');

console.log('Starting test runner...');

const child = exec('npx vitest run src/__tests__/verify.test.js --no-threads --run', {
  env: { ...process.env, FORCE_COLOR: '1' }
});

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

// Add a timeout to prevent hanging
setTimeout(() => {
  console.log('Test runner timeout reached');
  child.kill();
  process.exit(1);
}, 10000);
