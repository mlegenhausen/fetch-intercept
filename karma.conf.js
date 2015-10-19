import path from 'path';

export default function (config) {
  config.set({
    browsers: ['PhantomJSCustom'],
    frameworks: ['mocha'],
    singleRun: true,

    files: [
      'node_modules/babel-core/browser-polyfill.js',
      'node_modules/whatwg-fetch/fetch.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'coverage']
    },

    reporters: ['progress', 'coverage'],

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
