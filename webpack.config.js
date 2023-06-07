const
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: {
		main: [path.resolve(__dirname, 'src/app.js')]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: true,
				}
			}, {
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}, {
				test: /\.(gif|png|jpg|woff2?|)$/,
				loader: 'url-loader?limit=8192&name=[name].[ext]'
			}, {
				test: /\.svg$/,
				include: [/styles[\\\/]layouts[\\\/]images/],
				loader: 'file-loader?name=[name].[ext]'
			}, {
				test: /\.svg$/,
				exclude: [/styles[\\\/]layouts[\\\/]images/],
				loader: 'svg-sprite-loader'
			}
		]
	},
	output: {
		path: path.resolve(__dirname,'dist/assets'),
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					enforce: true,
					chunks: 'all',
				},
			},
		},
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // Must be set to true if using source-maps in production
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {},
					mangle: true, // Note `mangle.properties` is `false` by default.
					module: false,
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: true,
					keep_classnames: undefined,
					keep_fnames: false,
					safari10: true,
				},
			}),
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				BROWSER: JSON.stringify(true),
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new ExtractTextPlugin("[name].css"),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new webpack.NoEmitOnErrorsPlugin()
	],
	resolve: {
		alias: {
			'styles': path.resolve(__dirname, './styles')
		},
		extensions: [ '.js', '.vue', '.scss' ]
	},
    "devServer": {
        contentBase: path.join(__dirname, 'dist/assets'),
        "historyApiFallback": true,
        "https": false
	}
};
