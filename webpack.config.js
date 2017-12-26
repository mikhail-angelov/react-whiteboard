module.exports = {
	entry: './main.js',
	output: {
		path: __dirname,
		filename: 'dist/index.js'
	},
	devServer:{
		port:4000,
		inline: true
	},
	devtool: 'inline-source-map',
	module:{
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['stage-2', 'react', 'es2015']
			},
			
		}]
	}
}