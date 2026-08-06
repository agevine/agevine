// Since we haven't compiled the TypeScript yet for NPM, we'll just test the logic directly
// using ts-node or just compiling it quickly.
// Wait, Node 18+ has native fetch. Let's just write a plain JS version of the test.
const { execSync } = require('child_process');

// Compile the TS file
console.log("Compiling SDK...");
execSync('npx tsc', { cwd: __dirname, stdio: 'inherit' });

// Now import the built JS file
const { AgevineClient } = require('./dist/index.js');

async function testSDK() {
  console.log("Initializing Agevine Client...");
  const client = new AgevineClient({
    endpoint: "http://localhost:3001"
  });

  console.log("Sending simulated smartwatch vitals...");
  const success = await client.syncVitals({
    patientId: 1,
    heartRate: 72,
    steps: 12000,
    bloodOxygen: 99
  });

  if (success) {
    console.log("SUCCESS: Vitals synced to Agevine platform!");
  } else {
    console.log("FAILED to sync vitals.");
  }
}

testSDK();
