/* eslint-disable */
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProdEnv = process.env.WEBPACK_ENV === 'production';

const config = {
	entry: [
		'./src/index'
	],
	output: {
		publicPath: '/',
    path: path.resolve(__dirname, './dist'),
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
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style' ,'css!sass!postcss')},
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
      })
  ]
};

if (!isProdEnv) {
	config.devtool = 'source-map';
  config.plugins = config.plugins.concat([
		new webpack.DefinePlugin({
			'WEBPACK_ENV': '"dev"'
		})
	]);
} else {
  config.output.publicPath = './';
	config.devtool = 'hidden-source-map';
  config.plugins = config.plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			comments: false
		}),
		new webpack.DefinePlugin({
			'WEBPACK_ENV': '"production"'
		}),
		new CopyWebpackPlugin([{from: './src/index.html', to: 'index.html'}], {})
	]);
}

module.exports = config;
/* eslint-enable */
