require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin")
const S3Plugin = require('webpack-s3-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')

const PATHS = {
  index: path.join(__dirname, 'server'),
  app  : path.join(__dirname, 'client'),
  both : path.join(__dirname, 'both'),
};

const env = process.env.NODE_ENV || 'dev';

console.log('NODE_ENV =', env);

let config = {
  mode: (env === 'dev') ? 'development' : 'production',
  entry: {
    main      : './client/main.js',
    login     : './client/login.js',
    vendor    : ['react', 'react-dom', 'react-router', 'react-redux', 'react-router-dom', 'redux', 'connected-react-router', 'redux-connect', 'redux-actions', 'react-router-config', 'whatwg-fetch', 'history'],
  },
  output: {
    path: __dirname + '/public',
    publicPath: (
        (env === 'staged')     ? process.env.ROOT_ASSET_URL + 'assets/staged/'
      : (env === 'production') ? process.env.ROOT_ASSET_URL + 'assets/'
      : '/'
      ),
    filename: (env === 'dev') ? '[name].js' : '[name]-[hash].min.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vender',
          test: 'vender',
          enforce: true
        },
      }
    },
    runtimeChunk: false,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy : true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',
            ...(
              env === 'staged' || env === 'production'
                ? ['transform-react-remove-prop-types']
                : []
            )
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                loose: true,
                targets: {
                  browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
                },
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
            '@babel/preset-react',
          ],
        }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader?sourceMap"
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (env === 'dev') ? 'styles.css' : 'styles-[hash].css',
    }),
    new LoadablePlugin({ writeToDisk : true }),
    // new BundleAnalyzerPlugin(),
  ]
};

if(env === 'dev') {
  config.devtool = 'source-map';
}

if(env === 'staged' || env === 'production') {
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
    new CompressionPlugin({
      include: /.*\.(css|js)$/,
      filename: '[file]',
    }),
    // This is a plugin to write to the .env file
    function () {
      this.plugin("done", function (stats) {
        const appendString = `WEBPACK_HASH=${stats.hash}`;
        fs.appendFile('.env.tmp', appendString, err => {
          if (err) throw err;
          console.log(`Wrote to .env.tmp: ${appendString}`);
        });
      });
    },
    new S3Plugin({
      include: /.*\.(css|js)/,
      s3Options: {
        accessKeyId     : process.env.S3_KEY,
        secretAccessKey : process.env.S3_SECRET,
        region          : process.env.S3_REGION,
      },
      s3UploadOptions: {
        Bucket: process.env.S3_BUCKET,
        ContentEncoding(fileName) {
          return 'gzip';
        },
      },
      basePath: (
          (env === 'staged')     ? 'assets/staged'
        : (env === 'production') ? 'assets'
        : '/'
      ),
    })
  );
}
module.exports = config;

