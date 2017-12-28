const path = require('path');
const express = require('express');
const app = require('./dist/ssr/bundle.js'); // require component
const server = express();

server.use(express.static(path.join(__dirname, 'dist')));

server.get('/hostingactions/', function (req, res) {

    res.write(`
    <!DOCTYPE html>
    <div id="hostingactions">${app.render()}</div> 
    <script src="/hostingactions/bundle.js"></script>
  `);

    res.end();
});

const port = 3007;
server.listen(port, () => console.log(`Listening on port ${port}`));
