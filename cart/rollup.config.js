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
            file: pkg.main,
            format: 'iife',
            sourcemap: true
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
            // buble({transforms: {classes: false}}),
            // livereload({watch: 'dist', port: 35731})
        ]
    },
    {
        input: 'App.html',
        output: {
            file: 'dist/ssr/bundle.js',
            format: 'cjs',
            sourcemap: true
        },
        plugins: [
            svelte({
                hydratable: true,
                store: true,
                generate: 'ssr'
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
            // buble({transforms: {classes: false}})
        ]
    }
];