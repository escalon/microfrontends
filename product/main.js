import App from './ProductApp.html';

const app = new App({
    target: document.getElementById('product'),
    hydrate: true,
    data: {products: ["Stilton", "Mature Cheddar", "Emmentaler",
            "Gouda extra belegen", "Provolone", "Caciocavallo", "Scamorza", "Manchego"]}
});
