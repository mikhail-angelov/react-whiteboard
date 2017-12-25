module.exports = {
	entry: './main.js',
	output: {
		path: '/',
		filename: 'dist/index.js'
	},
	devServer:{
		port:4000,
		inline: true
	},
	module:{
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['stage-2', 'react']
			}
		}]
	}
}