const path = require('path');

module.exports = [
	{
		mode: 'development',
		entry: './src/index.js',
		devtool: 'inline-source-map',
		output: {
			filename: 'example.js',
			path: path.resolve(__dirname, 'src')
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
			contentBase: './src'
		}
	}
];