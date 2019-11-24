const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === "development"

const config = {
    target: 'web',

    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },  
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test:/\.styl$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'    
          ]
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: '[name]-aaa.[ext]'
              },
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HTMLWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
        }
      })
    ]
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer ={
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    open: true,
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else {

}

module.exports = config