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
                hostingType: "lamp",
                widget: "DescHosting"
            },
            {
                name: "Domain",
                domain: 'example.com',
                redirect: 'example.de',
                widget: "DescDomain"
            },
            {
                name: "DSL",
                speed: "50 MBit/s",
                widget: "DescDsl"
            }
        ],
        promotions: [
            {
                name: "Cloud Storage",
                size: "250 GB",
                offerPrice: 'Free',
                widget: "PromoCloudStorage"
            },
            {
                name: "LTE",
                dataAllowance: "10 GB",
                offerPrice: 'EUR 7.99',
                widget: "PromoLte"
            },
            {
                name: "Office as a Service",
                users: 5,
                offerPrice: 'EUR 4.99',
                widget: "PromoOaas"
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
