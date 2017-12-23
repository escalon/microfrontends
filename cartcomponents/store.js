import {Store} from 'svelte/store.js'

let globalObject = (typeof window !== 'undefined' ? window : global);

let store;
if (typeof globalObject.store === 'undefined') {
    store = new Store({
        items: []
    })
    globalObject.store = store;
} else {
    store = globalObject.store;
}

function useSessionStorage(store, key) {
    try {
        const json = sessionStorage.getItem(key);
        if (json) {
            store.set(JSON.parse(json));
        }

        store.onchange(state => {
            sessionStorage.setItem(key, JSON.stringify(state));
        });
    }
    catch (e) {
        // apparently no sessionStorage
    }
}

useSessionStorage(store, 'microfrontends-cart-store');

export default store;
