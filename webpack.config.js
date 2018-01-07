'use strict';
require('dotenv').config();
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
  index: path.join(__dirname, 'server'),
  app  : path.join(__dirname, 'client'),
  both : path.join(__dirname, 'both'),
};

const env = process.env.NODE_ENV || 'dev';

console.log('NODE_ENV =', env);

let config = {
  entry: {
   client: './client/index.js',
   vendor: ['react', 'react-router', 'react-router-dom', 'redux', 'redux-connect', 'react-router-config', 'reselect'],
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: (env === 'dev') ? '[name].js' : '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [ 'transform-decorators-legacy', 'dynamic-import-webpack' ],
          presets: ['env', 'react', 'es2015', 'stage-2'],
        }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader'
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    })
    // new BundleAnalyzerPlugin(),
  ]
};

if(env === 'dev') {
  config.devtool = 'source-map';
}

if (env === 'staged' || env === 'production') {
  config.devtool = 'nosources-source-map';

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  );
}
module.exports = config;
