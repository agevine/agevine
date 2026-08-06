const { execSync } = require('child_process');

console.log("Compiling Voice SDK...");
execSync('npx tsc', { cwd: __dirname, stdio: 'inherit' });

const { AgevineVoiceClient } = require('./dist/index.js');

async function testVoiceSDK() {
  console.log("Initializing Agevine Voice Client...");
  const client = new AgevineVoiceClient({
    endpoint: "http://localhost:3001"
  });

  console.log("Simulating AI phone call completion...");
  const success = await client.logCall({
    patientId: 1,
    durationSeconds: 180,
    sentimentScore: 85,
    summary: "Patient reported feeling well. No new symptoms. Discussed upcoming doctor appointment.",
    transcript: "AI: Hello, how are you feeling today?\nPatient: I am doing well, thank you.\nAI: Did you remember to take your medication?\nPatient: Yes, I took it with breakfast."
  });

  if (success) {
    console.log("SUCCESS: AI Voice Call logged to Agevine platform!");
  } else {
    console.log("FAILED to log voice call.");
  }
}

testVoiceSDK();
