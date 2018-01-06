import ProductApp from './ProductApp.html';

const app = new ProductApp({
    target: document.getElementById('product'),
    hydrate: true,
    data: {
        products: [
            {
                name: "Hosting",
                domain: 'example.de',
                hostingType: "lamp"
            },
            {
                name: "Domain",
                domain: 'example.com',
                redirect: 'example.de'
            },
            {
                name: "DSL",
                speed: "50 MBit/s"
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
                offerPrice: 'EUR 4.99'
            },
        ]
    }
});
