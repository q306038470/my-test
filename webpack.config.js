const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"

const config = {
    target: 'web',

    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.[hash:8].js',
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
  config.module.rules.push({
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
  })
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
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test:/\.styl$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'    
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[md5:contenthash:hex:8].css')
  )
}

module.exports = config