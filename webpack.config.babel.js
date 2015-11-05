import path from 'path';

export default {
  devtool: 'sourcemap',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    library: true,
    libraryTarget: 'commonjs2'
  },
  externals: {
    'whatwg-fetch': 'fetch'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
