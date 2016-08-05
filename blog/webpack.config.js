module.exports = {
	entry: [
		'./public/todoApp.js'
	],
	output: {
		path: __dirname + '/public/build',
    publicPath: '/public/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	}
}
