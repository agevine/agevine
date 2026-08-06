const http = require('http');

const data = JSON.stringify({
  patientId: 1,
  heartRate: 110,
  steps: 8500,
  bloodOxygen: 97
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/v1/wearables/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
