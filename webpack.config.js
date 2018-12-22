const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let host;

let setHost = () => {
    switch(process.env.NODE_ENV) {
        case 'production':
            host = 'http://localhost:8280';
            break;
        case 'staging':
            host = 'http://localhost:8000';
            break;
        default:
            host = 'http://localhost:3000/';
            break;
    }
}
setHost();

module.exports = {
    entry: path.join(__dirname, 'src', 'app-client.js'),
    output: {
        path: path.join(__dirname, 'build', 'static', 'js'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: "#eval-source-map",
    module : {
        rules : [
            {
                test : path.join(__dirname, 'src'),

                use : [{
                    loader: 'babel-loader',

                    options: {
                        cacheDirectory: 'babel_cache',
                        presets: ['react', 'es2015']
                    }
                }]
            },
            {
                test: /(\.css|\.scss)$/,
                include: path.join(__dirname, 'node_modules'),
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    },
    optimization: {
        minimize: true,

        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            '__HOST__': JSON.stringify(host),
        })
    ]
};

