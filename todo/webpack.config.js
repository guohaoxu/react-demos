module.exports = {
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080',
		'webpack/hot/only-dev-server',
		'./public/todoApp.js'
	],
	output: {
		path: __dirname + '/public/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel'
			}
		]
	}
}
