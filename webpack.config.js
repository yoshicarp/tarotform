const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css/,
				exclude: /node_modules/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"}
				]
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			template: "./src/index.html"
		})
	],
	devServer: {
		contentBase: "./dist",
		hot: true
	},
	devtool: 'inline-source-map'
};
