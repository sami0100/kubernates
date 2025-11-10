const express = require('express');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

const appMessage = process.env.APP_MESSAGE || 'Hello from the app!';
const secretToken = process.env.SECRET_TOKEN ? '[loaded]' : '[not-set]';

// Basic health endpoint for livenessProbe
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Basic readiness endpoint for readinessProbe (could add logic if needed)
app.get('/readyz', (req, res) => {
  res.status(200).send('ready');
});

// Root endpoint shows config and where app runs
app.get('/', (req, res) => {
  res.json({
    message: appMessage,
    secretTokenStatus: secretToken,
    hostname: os.hostname(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});