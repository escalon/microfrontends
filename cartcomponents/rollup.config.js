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
            sourcemap: true
        },
        plugins: plugins()
    },
    {
        input: 'main.js',
        output: {
            file: pkg.module,
            format: 'es',
            name: 'cartcomponents',
            sourcemap: true
        },
        plugins: plugins()
    }
];

function plugins() {
    return [
        svelte({
            hydratable: true,
            store: true
        }),
        resolve(),
        buble(),
        // buble({transforms: {classes: false}})
    ]
}