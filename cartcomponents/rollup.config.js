import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';

const pkg = require('./package.json');

export default [
    {
        input: 'main.js',
        output: {
            file: pkg.main,
            format: 'cjs',
            name: 'cartcomponents',
            sourcemap: true,
        },
        external: ['svelte/store.js'],
        plugins: plugins()
    }
];

function plugins() {
    return [
        svelte({
            hydratable: true,
            store: true
        }),
        buble(),
        // buble({transforms: {classes: false}})
    ]
}

function pluginsWebComponent() {
    return [
        svelte({
            hydratable: true,
            store: true,
            customElement: true
        }),
        buble(),
        buble({transforms: {classes: false}})
    ]
}