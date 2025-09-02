const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting test runner...');

const logFile = path.join(__dirname, 'test-runner.log');
const logStream = fs.createWriteStream(logFile, { flags: 'w' });

const vitest = spawn('npx', ['vitest', 'run'], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true,
  env: {
    ...process.env,
    FORCE_COLOR: '1',
    DEBUG: 'vitest:*',
    NODE_OPTIONS: '--no-warnings'
  }
});

vitest.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);
  logStream.write(`[STDOUT] ${output}`);
});

vitest.stderr.on('data', (data) => {
  const output = data.toString();
  process.stderr.write(`[ERROR] ${output}`);
  logStream.write(`[STDERR] ${output}`);
});

vitest.on('close', (code) => {
  console.log(`\nVitest process exited with code ${code}`);
  logStream.write(`\nProcess exited with code ${code}`);
  logStream.end();
  console.log(`Logs written to: ${logFile}`);
});

// Add a timeout
setTimeout(() => {
  console.log('Test runner timeout reached (30s)');
  vitest.kill();
  process.exit(1);
}, 30000);
