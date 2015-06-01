'use strict';

var path = require('path');

var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './client.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        loaders: [
          'babel-loader'
        ]
      }
    ]
  },
  //resolve: {
  //  alias: {
  //  }
  //},
  watch: true
};