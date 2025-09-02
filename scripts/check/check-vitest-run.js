// Simple script to check if vitest can run
console.log('Starting vitest check...');

const { exec } = require('child_process');

// Run vitest with minimal options
const vitest = exec('npx vitest run --no-threads --no-watch --reporter=verbose', 
  { env: { ...process.env, FORCE_COLOR: '1' } },
  (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  }
);

// Log output in real-time
vitest.stdout.on('data', (data) => {
  console.log(data.toString());});

vitest.stderr.on('data', (data) => {
  console.error(data.toString());
});

// Set a timeout to prevent hanging
setTimeout(() => {
  console.log('Test runner timeout reached');
  vitest.kill();
  process.exit(1);
}, 10000);
