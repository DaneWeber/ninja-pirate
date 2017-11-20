var webpack = require('webpack');
var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

var abspath = function(p) {
  return process.env.APP_ROOT + "/" + p;
}

// This is the webpack configuration to compile and bundle React code and
// other assets. The configuration is heavily influenced by the official
// create-react-app template by Facebook:
// https://github.com/facebookincubator/create-react-app
var config = {
  entry: {
    app: [
      abspath('frontend/index.jsx')
    ]
  },
  output: {
    path: abspath('build'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [abspath('node_modules')],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: abspath('frontend'),
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['react', 'es2015'],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: abspath('static/index.html')
    })
  ],
  performance: {
    hints: false
  }
}

module.exports = config;
