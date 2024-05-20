const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'inline-source-map',
	stats: 'errors-only',
	bail: true,
	output: {filename: 'index.js', chunkFilename: 'index.js'},
	optimization: {minimize: true},
	plugins: [
		new Webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
		new Webpack.optimize.ModuleConcatenationPlugin(), new MiniCssExtractPlugin({filename: 'bundle.css'})
	],
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
			{test: /\.s?css/i,use: [MiniCssExtractPlugin.loader,'css-loader',]},
			{test: /\.(woff|woff2|eot|ttf|otf)$/,use: ['file-loader',],},
		]
	}
});
