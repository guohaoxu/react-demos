module.exports = {
	entry: [
		'./public/KanbanBoard.js'
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
