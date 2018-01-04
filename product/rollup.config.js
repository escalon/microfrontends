import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import buble from 'rollup-plugin-buble';

const pkg = require('./package.json');

export default [
    {
        input: 'main.js',
        output: {
            file: pkg.browser,
            format: 'iife',
            sourcemap: true
        },
        external: ['hostingactions/HostingActions.html'],
        globals: {
            'hostingactions/HostingActions.html' : 'hostingactions.HostingActions'
        },
        plugins: [
            svelte({
                hydratable: true,
                store: true
                //customElement: true
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            commonjs(),
            replace({'process.env.NODE_ENV': '"production"'}),
            buble(),
            //livereload({watch: 'dist/product', port: 35733})
        ]
    },
    {
        input: 'ProductApp.html',
        output: {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        plugins: [
            svelte({
                hydratable: true,
                store: true,
                generate: 'ssr'
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            commonjs(),
            replace({'process.env.NODE_ENV': '"production"'}),
            buble()
        ]
    }
];