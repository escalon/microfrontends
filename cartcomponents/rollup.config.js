import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import sass from 'node-sass';

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
            store: true,
            cascade: false, // remove unused css
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
        buble(),
        //uglify()
    ]
}

function pluginsWebComponent() {
    return [
        svelte({
            hydratable: true,
            store: true,
            customElement: true,
            preprocess: {
                style: ({ content, attributes }) => {
                    if (attributes.type !== 'text/scss') return;

                    return new Promise((fulfil, reject) => {
                        sass.render({
                            data: content,
                            includePaths: ['components'],
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
        buble(),
        buble({transforms: {classes: false}})
    ]
}