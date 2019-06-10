const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'index': './src/index.ts'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        extractComments: true,
        parallel: true
      })
    ]
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    path: __dirname + '/dist'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
