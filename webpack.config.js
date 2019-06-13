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
  plugins: [
    new DtsBundlePlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

function DtsBundlePlugin() {} // tslint:disable-line

DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.hooks.afterEmit.tap('DtsBundlePlugin', function() {
    const dts = require('dts-bundle');
    dts.bundle({
      main: '.dts/index.d.ts',
      name: '@nologis/maps',
      out: '../dist/index.d.ts',
      outputAsModuleFolder: true,
      removeSource: true
    });
  });
};
