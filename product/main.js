import ProductApp from './ProductApp.html';

const app = new ProductApp({
    target: document.getElementById('product'),
    hydrate: true,
    data: {
        products: ["Hosting example.de",
            "Domain example.com",
            "DSL 50 MBit/s",
            "LTE 10 GB",
            "Office",
            "Cloud Storage"]
    },
    slots: {
        actions: document.getElementById('hostingactions')
    }
});
