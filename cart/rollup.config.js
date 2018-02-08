import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import sass from 'node-sass';

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
                store: true,
                cascade: false,
                onwarn: function (warning, defaultHandler) {
                    if (warning.message === "Unused CSS selector") {
                        // suppress
                    } else {
                        defaultHandler(warning);
                    }
                },
                preprocess: {
                    style: ({content, attributes}) => {
                        if (attributes.type !== 'text/scss') return;

                        return new Promise((fulfil, reject) => {
                            sass.render({
                                data: content,
                                includePaths: ['../comet/src'],
                                sourceMap: true,
                                outFile: 'x' // this is necessary, but is ignored
                            }, (err, result) => {
                                if (err) return reject(err);

                                fulfil({
                                    code: result.css.toString(),
                                    map: result.map.toString()
                                });
                            });
                        });
                    }
                },
                // css: function (css) {
                //     css.write('dist/main.css');
                // }
            }),
            resolve(),
            commonjs(),
            replace({'process.env.NODE_ENV': '"production"'}),
            buble(),
            // uglify()
        ]
    },
    {
        input: 'CartApp.html',
        output: {
            file: 'dist/ssr/bundle.js',
            format: 'cjs',
            sourcemap: true,
        },
        external: ['svelte/store.js'],
        plugins: [
            svelte({
                hydratable: true,
                store: true,
                generate: 'ssr',
                cascade: false,
                onwarn: function (warning, defaultHandler) {
                    if (warning.message === "Unused CSS selector") {
                        // suppress
                    } else {
                        defaultHandler(warning);
                    }
                },
                preprocess: {
                    style: ({content, attributes}) => {
                        if (attributes.type !== 'text/scss') return;

                        return new Promise((fulfil, reject) => {
                            sass.render({
                                data: content,
                                includePaths: ['../comet/src'],
                                sourceMap: true,
                                outFile: 'x' // this is necessary, but is ignored
                            }, (err, result) => {
                                if (err) return reject(err);

                                fulfil({
                                    code: result.css.toString(),
                                    map: result.map.toString()
                                });
                            });
                        });
                    }
                },
            }),
            resolve(),
            commonjs(),
            replace({'process.env.NODE_ENV': '"production"'}),
            buble(),
        ]
    },
    {
        input: 'main.js',
        output: {
            file: pkg.ce,
            format: 'iife',
            store: true,
            sourcemap: true
        },
        plugins: [
            svelte({
                hydratable: true,
                store: true,
                customElement: true,
                cascade: false,
                onwarn: function (warning, defaultHandler) {
                    if (warning.message === "Unused CSS selector") {
                        // suppress
                    } else {
                        defaultHandler(warning);
                    }
                },
                preprocess: {
                    style: ({content, attributes}) => {
                        if (attributes.type !== 'text/scss') return;

                        return new Promise((fulfil, reject) => {
                            sass.render({
                                data: content,
                                includePaths: ['../comet/src'],
                                sourceMap: true,
                                outFile: 'x' // this is necessary, but is ignored
                            }, (err, result) => {
                                if (err) return reject(err);

                                fulfil({
                                    code: result.css.toString(),
                                    map: result.map.toString()
                                });
                            });
                        });
                    }
                }
            }),
            resolve(),
            commonjs(),
            replace({'process.env.NODE_ENV': '"production"'}),
            buble({transforms: {classes: false}}),
            // livereload({watch: 'dist', port: 35731})
        ]
    },
    {
        input: 'main.js',
        output: {
            file: pkg.noclassce,
            format: 'iife',
            store: true,
            sourcemap: true
        },
        plugins: [
            svelte({
                hydratable: true,
                store: true,
                customElement: true,
                cascade: false,
                onwarn: function (warning, defaultHandler) {
                    if (warning.message === "Unused CSS selector") {
                        // suppress
                    } else {
                        defaultHandler(warning);
                    }
                },
                preprocess: {
                    style: ({content, attributes}) => {
                        if (attributes.type !== 'text/scss') return;

                        return new Promise((fulfil, reject) => {
                            sass.render({
                                data: content,
                                includePaths: ['../comet/src'],
                                sourceMap: true,
                                outFile: 'x' // this is necessary, but is ignored
                            }, (err, result) => {
                                if (err) return reject(err);

                                fulfil({
                                    code: result.css.toString(),
                                    map: result.map.toString()
                                });
                            });
                        });
                    }
                }
            }),
            resolve(),
            commonjs(),
            replace({'process.env.NODE_ENV': '"production"'}),
            buble()
        ]
    }
];