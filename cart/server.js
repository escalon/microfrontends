const path = require('path');
const express = require('express');
const { createHistory } = require('svelte-routing');

const history = createHistory('memory');

const server = express();

const app = require('./dist/ssr/bundle.js'); // require component

server.use(express.static(path.join(__dirname, 'dist')));

server.get('/cart/*', function(req, res) {
    history.replace(req.url);
    res.write(`
    <!DOCTYPE html>
    <div id="cart">${app.render().html}</div> 
    <script src="/cart/bundle.js"></script>
  `);
    res.end();
});

const port = 3005;
server.listen(port, () => console.log(`Listening on port ${port}`));
