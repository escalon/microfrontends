const path = require('path');
const express = require('express');
const { createHistory } = require('svelte-routing');
require('svelte/ssr/register'); // enable ssr
const app = require('./App.html'); // require component

const history = createHistory('memory');
const server = express();

server.use(express.static(path.join(__dirname, 'dist')));

server.get('*', function(req, res) {
    history.replace(req.url);

    res.write(`
    <!DOCTYPE html>
    <!--<link rel="stylesheet" href="/styles.css">-->
    <!-- render component, optionally passing data -->
    <div id="app">${app.render({items: ["Stilton", "Mature Cheddar"]})}</div> 
    <script src="/bundle.js"></script>
  `);

    res.end();
});

const port = 3005;
server.listen(port, () => console.log(`Listening on port ${port}`));
