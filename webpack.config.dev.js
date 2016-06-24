var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  bail: true,
  devtool: 'cheap-module-eval-source-map',
  entry: ['./src/client/init', 'webpack-hot-middleware/client'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'server/views/index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        BABEL_ENV: JSON.stringify("development")
      }
    })
  ],
  postcss: function() {
    return [
      require('postcss-import')({ // Import all the css files...
        glob: true,
        onImport: function (files) {
            files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
        }.bind(this) // ...so they get hot–reloaded when something changes...
      }),
      require('postcss-simple-vars')(), // ...then replace the variables...
      require('autoprefixer')({ // ...and add vendor prefixes...
        browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
      }),
      require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
        clearMessages: true
      })
    ];
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.woff(\d+|\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  loader: "file" },
      { test: /\.jpe?g$|\.gif$|\.png$/i, loader: 'file?name=[path][name].[ext]' }
    ]
  }
}
