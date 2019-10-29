const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  	entry: './src/app.jsx',
  	output: {
    	path: path.resolve(__dirname, 'dist'),
    	publicPath: '/dist/',
    	filename: 'js/app.js'
	  },
	resolve:{
		alias : {
			page : path.resolve(__dirname, 'src/page'),
			component : path.resolve(__dirname, 'src/component'),
			src : path.resolve(__dirname, 'src'),
		},
	},
  	module: {
		rules: [
		//react
	    {
	      	test: /\.m?jsx$/,
	      	exclude: /(node_modules)/,
	      	use: {
	        	loader: 'babel-loader',
	        	options: {
	          	presets: ['env','react']
	        	}
	      	}
	    },
	    //css
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
          		fallback: "style-loader",
          		use: "css-loader"
        	})
		},
		//图片
		{
			test: /\.(png|jpg|gif)$/,
			use:[
			{
				loader:'url-loader',
				options:{
					limit:8192,
					name:'resource/[name].[text]'
				}
			}
			]
		},
		//字体图标
		{
			test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
			use:[
			{
				loader:'url-loader',
				options:{
					limit:8192,
					name:'resource/[name].[ext]'
				}
			}
			]
		},
		//js
		{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					 presets: ['es2015']
				}
			}]
		}
		]
	},
  	plugins: [
  		//html
  		new HtmlWebpackPlugin({
  			template:'./src/index.html'
  		}),
  		//css
  		new ExtractTextPlugin("css/[name].css"),
  		//公共模块
  		new webpack.optimize.CommonsChunkPlugin({
  			name:'common',
  			filename:'js/base.js'
  		}),
  	],
  	devServer: {
    	contentBase: './dist',
			port:8086,
			historyApiFallback :{
				index : "/dist/index.html"
			}
   	},
};