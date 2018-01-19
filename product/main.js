import ProductApp from './ProductApp.html';

const app = new ProductApp({
    target: document.getElementById('product'),
    hydrate: true,
    data: {
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
    }
});
