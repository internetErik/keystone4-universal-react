 var config = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: './public'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy' ],
          presets: ['react','es2015','stage-2'],
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
      },
    ]
  }
};

// depending on the environment, we should toggle this on or off
config.devtool = 'source-map';

module.exports = config;