const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const target = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!target.startsWith(root + path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  const mime = ({'.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'})[path.extname(target)] || 'text/html; charset=utf-8';
  res.writeHead(200, { 'Content-Type': mime });
  fs.createReadStream(target).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
