import path from 'path';

import optimist from 'optimist';

const isProduction = optimist.argv.p;

export default {
  devtool: 'sourcemap',
  entry: {
    node: path.join(__dirname, 'src/node.js'),
    browser: path.join(__dirname, 'src/browser.js')
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: isProduction ? '[name].min.js' : '[name].js',
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
