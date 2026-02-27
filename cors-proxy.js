const http = require('http');

const PORT = 1235;
const LMSTUDIO_URL = 'http://127.0.0.1:1234';

const proxy = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const options = {
    hostname: '127.0.0.1',
    port: 1234,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
});

proxy.listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}`);
  console.log(`Forwarding to LM Studio at http://127.0.0.1:1234`);
});
