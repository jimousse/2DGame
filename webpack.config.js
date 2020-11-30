const path = require('path');

module.exports = [
	{
		mode: 'development',
		entry: './src/index.js',
		devtool: 'inline-source-map',
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'docs')
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env' ]
						}
					}
				}
			]
		},
		devServer: {
			contentBase: './docs'
		}
	}
];