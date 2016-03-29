import path from 'path';

import optimist from 'optimist';

const isProduction = optimist.argv.p;

export default {
  devtool: 'sourcemap',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: isProduction ? 'index.min.js' : 'index.js',
    library: true,
    libraryTarget: 'commonjs2'
  },
  externals: [
    'whatwg-fetch'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
