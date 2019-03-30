const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify').uglify
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const postcss = require('rollup-plugin-postcss')

export default [
    {
        input: 'index.js',
        plugins: rollupPlugins(),
        // external: ['lodash'],
        output: {
            file: './dist/umd/util.js',
            format: 'umd',
            // sourcemap: 'inline',
            name: 'Util'

        }
    },

    {
        input: 'index.js',
        plugins: [ ...rollupPlugins(), uglify({})],
        // external: ['lodash'],
        output: {
            file: './dist/umd/util.min.js',
            format: 'umd',
            name: 'Util'
        }
    }
];

function rollupPlugins() {
    return [
        resolve({
            preferBuiltins: false
        }),
        commonjs(),
        babel({
            babelrc: false,
            exclude: './node_modules/**', // only transpile our source code
            presets: ["@babel/env"],
            plugins: [
                [
                    "@babel/plugin-transform-runtime", {
                        "helpers": false,
                        "regenerator": true,
                    }
                ],
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-do-expressions'
            ],
            runtimeHelpers: true
        }),
        
    ];
}