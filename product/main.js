import {createHistory} from 'svelte-routing';
import App from './App.html';

createHistory('browser');

const app = new App({
    target: document.getElementById('app'),
    hydrate: true,
    data: {items: ["Stilton", "Mature Cheddar", "Emmentaler", "Gouda extra belegen", "Provolone", "Caciocavallo", "Scamorza"]}
});
