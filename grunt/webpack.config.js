const path = require('path');
const webpack = require('webpack');
const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.js'],
    modules: [path.join(__dirname, '../node_modules'), path.join(__dirname, '../bower_components')],
  },
  entry: {
    'vrdl.webpack': `./assets/js/app`,
  },
  output: {
    path: path.join(__dirname, `../assets/js`),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: babelLoaderExcludeNodeModulesExcept(['@superkoders/sk-tools']),
        use: 'babel-loader',
      },
    ],
  },
  profile: true,
  watch: process.env.NODE_ENV === 'production',
  watchOptions: {
    ignored: /node_modules|bower_components/,
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
