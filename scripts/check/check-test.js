console.log('Test file is being executed');

const test = (name, fn) => {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(e);
  }
};

const expect = (actual) => ({
  toBe(expected) {
    if (actual !== expected) {
      throw new Error(`Expected ${expected}, but got ${actual}`);
    }
  }
});

test('basic test', () => {
  expect(1 + 1).toBe(2);
});
