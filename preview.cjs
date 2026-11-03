const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/assets/icp-glossy.png') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    fs.createReadStream(path.join(root, 'assets', 'icp-glossy.png')).pipe(res); return;
  }
  if (pathname !== '/' && pathname !== '/index.html') {
    res.writeHead(404); res.end('Not found'); return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(path.join(root, 'index.html')).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
