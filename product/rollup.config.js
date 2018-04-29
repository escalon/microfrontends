import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import buble from 'rollup-plugin-buble';
import sass from 'node-sass';

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
                    style: ({ content, attributes }) => {
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
                generate: 'ssr',
                onwarn: function (warning, defaultHandler) {
                    if (warning.message === "Unused CSS selector") {
                        // suppress
                    } else {
                        defaultHandler(warning);
                    }
                },
                preprocess: {
                    style: ({ content, attributes }) => {
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