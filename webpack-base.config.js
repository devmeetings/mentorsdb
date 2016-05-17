/* eslint-disable */
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
	entry: [
		'./src/base/app'
	],
	output: {
		publicPath: './',
    path: path.resolve(__dirname, './dist/base'),
    filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.es6', '.js', '.json']
	},
	module: {
		preLoaders: [
			{test: /\.js$/, loader: 'eslint', exclude: /node_modules/}
		],
		loaders: [
			{test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/},
			{test: /\.json$/, loader: 'json', exclude: /node_modules/},
			{test: /\.html$/, loader: 'html'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
      {test: /\.(gif|png|jpe?g|svg)$/i, loader: 'file?name=images/[name].[ext]'},
      {test: /(\.eot|\.woff|\.woff2|\.ttf)$/,loader: 'file?name=fonts/[name].[ext]'},
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
    new CopyWebpackPlugin([{from: './src/index.html', to: 'index.html'}], {})
  ]
};

module.exports = config;
/* eslint-enable */
