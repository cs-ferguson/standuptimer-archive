const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: './dist',
		hot: false
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
			{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
			{
	      test: /\.scss$/,
	      use: ExtractTextPlugin.extract({
	        fallback: 'style-loader',
	        use: ['css-loader', 'sass-loader']
	      })
	    }
		]
	},
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
};
