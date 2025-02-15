const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  // Read the HTML file
  fs.readFile(path.join(__dirname, 'public/website.html'), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Error loading the page');
      return;
    }
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});