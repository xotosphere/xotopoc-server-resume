const Path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require("optimize-js-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	entry: {app: Path.resolve(__dirname, '../public/index.js')},
	output: {path: Path.join(__dirname, '../build'), filename: '[name].js'},
	optimization: {
		minimizer: [new UglifyJsPlugin({cache: true, parallel: true, sourceMap: true}), new OptimizeCSSAssetsPlugin({cssProcessorOptions: {discardComments: {removeAll: true}}, canPrint: true})],
	},
	
	plugins: [new OptimizeJsPlugin({sourceMap: true}), new CleanWebpackPlugin(), new CopyWebpackPlugin([{from: Path.resolve(__dirname, '../public'), to: 'public'}]), new HtmlWebpackPlugin({template: Path.resolve(__dirname, '../public/index.html')})],
	resolve: {alias: {'~': Path.resolve(__dirname, '../public')}},
	module: {
		rules: [
			{test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto'},
			{test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/, use: {loader: 'file-loader', options: {name: '[path][name].[ext]'}}},
		]
	}
};