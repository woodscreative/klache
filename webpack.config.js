const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/lib.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: 'klache',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  target: 'web',
  node: {
    process: false
  },
  externals: {}
};