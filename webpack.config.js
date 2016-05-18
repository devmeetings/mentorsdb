/* eslint-disable */
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
	entry: {
		base: './src/base/index',
    settings: './src/settings/index'
	},
	output: {
		publicPath: './',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.js'
	},
	resolve: {
		extensions: ['', '.es6', '.js', '.json']
	},
	module: {
		/* preLoaders: [
			{test: /\.js$/, loader: 'eslint', exclude: /node_modules/}
		], */
		loaders: [
			{test: /\.js$/, loader: ['ng-annotate', 'babel'], exclude: /node_modules/},
			{test: /\.json$/, loader: 'json', exclude: /node_modules/},
			{test: /\.html$/, loader: 'html'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
      {test: /\.(gif|png|jpe?g)$/i, loader: 'file?name=images/[name]-[hash:6].[ext]'},
      {test: /\.woff2?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'},
      {test: /\.(ttf|eot|svg)$/, loader: 'file?name=fonts/[name].[ext]'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")}
		]
	},
  postcss: [autoprefixer({browsers: ['ie >= 9', 'last 2 versions']})],
  plugins: [
    new webpack.ProvidePlugin({
      'moment': 'moment'
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css", {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
    new CopyWebpackPlugin([
      {from: './_locales', to: '_locales'},
      {from: './assets', to: 'assets'},
      {from: './manifest.json'},
      {from: './src/base/index.html', to: 'base/index.html'},
      {from: './src/settings/index.html', to: 'settings/index.html'}
    ], {})
  ]
};

module.exports = config;
/* eslint-enable */
