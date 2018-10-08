const path = require('path');
const OUTPUT_PATH = path.resolve(__dirname, './dist');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const webpackConfig = {
	mode: 'development',
	entry: 'src/example/app.ts',
	watchOptions: {
		ignored: /node_modules/
	},
	devServer: {
		contentBase: './',
		port: 8082
	},
	output: {
		path: OUTPUT_PATH,
		filename: `app.js`
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.js'],
		plugins: [
			new TsconfigPathsPlugin()
		],
		alias: {}
	},
	module: {
		rules: [{
			test: /\.ts$/,
			use: [
				{
					loader: 'ts-loader',
					options: {
						transpileOnly: true
					}
				}
			]
		}]
	},
	plugins: []
};

module.exports = webpackConfig;
