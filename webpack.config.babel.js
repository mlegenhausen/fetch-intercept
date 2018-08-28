import path from 'path';

import optimist from 'optimist';

import CopyWebpackPlugin from 'copy-webpack-plugin';

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
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/index.d.ts'},
    ], {})
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
