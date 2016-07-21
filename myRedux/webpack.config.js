module.exports = {
	entry: [
		'./public/src/entry2.js'
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
				loader: 'babel'
			}
		]
	}
}
