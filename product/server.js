const path = require('path');
const express = require('express');
const app = require('./dist/ssr/bundle.js'); // require component
const server = express();

server.use('/', express.static(path.join(__dirname, 'dist')));
// TODO: don't do this in production build
server.use('/hostingactions', express.static(path.join(__dirname, '..', 'hostingactions', 'dist', 'hostingactions')));

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
        ],
        promotions: [
            {
                name: "Cloud Storage",
                size: "250 GB",
                offerPrice: 'Free'
            },
            {
                name: "LTE",
                dataAllowance: "10 GB",
                offerPrice: 'EUR 7.99'
            },
            {
                name: "Office as a Service",
                users: 5,
                offerPrice: 'EUR 5.99'
            },
        ]
    })}</div> 
    <script src="/hostingactions/bundle.js"></script>
    <script src="/product/bundle.js"></script>
  `);

    res.end();
});

const port = 3006;
server.listen(port, () => console.log(`Listening on port ${port}`));
