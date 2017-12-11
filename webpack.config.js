const webpack = require('webpack');
const path = require('path');
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

const config = {
  entry: path.join(__dirname, 'src', 'app-client.js'),
  output: {
    path: path.join(__dirname, 'build', 'static', 'js'),
    filename: 'bundle.js'
  },
  devtool: "#eval-source-map",
  module : {
    loaders : [
      {
        test : path.join(__dirname, 'src'),
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['react', 'es2015']
        },
        loader : 'babel-loader'
      },
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'node_modules'),
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__HOST__': JSON.stringify(host),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};

module.exports = config;
