import path from 'path';

import webpack from 'webpack';

export default function (config) {
  config.set({
    browsers: ['PhantomJSCustom'],
    frameworks: ['mocha'],
    singleRun: true,

    files: [
      require.resolve('babel-polyfill/browser'),
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'coverage']
    },

    reporters: ['progress', 'coverage'],

    client: {
      captureConsole: true
    },

    customLaunchers: {
      PhantomJSCustom: {
        base: 'PhantomJS',
        options: {
          settings: {
            webSecurityEnabled: false
          }
        }
      }
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader'
          }
        ],
        plugins: [
          new webpack.ProvidePlugin({
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
          })
        ],
        postLoaders: [
          { // << add subject as webpack's postloader
            test: /\.js$/,
            include: path.resolve('src'),
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
}
