const path = require('path');
const express = require('express');
const app = require('./dist/ssr/bundle.js'); // require component
const server = express();

server.use(express.static(path.join(__dirname, 'dist')));

server.get('/product/', function (req, res) {

    res.write(`
    <!DOCTYPE html>
    <div id="product">${app.render({
        products: [
            {
                name: "Hosting",
                domain: 'example.de',
                hostingType: "lamp"
            },
            {
                name: "Domain",
                domain: 'example.de'
            },
            {
                name: "DSL",
                speed: "50 MBit/s"
            },
            {
                name: "LTE",
                dataAllowance: "10 GB"
            },
            {
                name: "Office"
            },
            {
                name: "Cloud Storage",
                size: "250 GB"
            }

        ]
    })}</div> 
    <script src="/hostingactions/bundle.js"></script>
    <script src="/product/bundle.js"></script>
  `);

    res.end();
});

const port = 3006;
server.listen(port, () => console.log(`Listening on port ${port}`));
