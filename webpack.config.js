module.exports = {
  mode: 'production',
  entry: {
    'index': './src/index.ts'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  output: {
    library: 'true',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new DtsBundlePlugin()
  ],
  externals: ['axios']
};

function DtsBundlePlugin() {} // tslint:disable-line

DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.hooks.afterEmit.tap('DtsBundlePlugin', function() {
    const dts = require('dts-bundle');
    dts.bundle({
      main: '.dts/index.d.ts',
      name: 'toggle-lib',
      out: '../dist/index.d.ts',
      outputAsModuleFolder: true,
      removeSource: true
    });
  });
};
