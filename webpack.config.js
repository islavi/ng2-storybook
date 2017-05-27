const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const libraryName = 'storybook';
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env  = require('yargs').argv.env;
let plugins = [], outputFile;

if (env === 'prod') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

console.log("Building env: " + env);

var webpackConfig = {

    devtool: 'source-map',
    entry: {
        'main': './src/index.ts'
    },
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: plugins.concat([
        // new CopyWebpackPlugin([
        //     { from: './src/index.html', to: 'index.html' }
        // ]),
    ]),
    module: {
        loaders: [
            { test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/ }, 
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', options: {} }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }

};

module.exports = webpackConfig;
