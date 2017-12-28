import App from './CartApp.html';
import { createHistory } from 'svelte-routing';

createHistory('browser');

const app = new App({
    target: document.getElementById('cart'),
    hydrate: true
});