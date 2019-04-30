/**
 * @description webpack  module依赖项
 * @createTime 2019/4/29
 * @author Lonely_liu
 * 可根据项目需要自行添加loader, 比如 vue、react、ts等
 */

const extractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    rules: [{
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'postcss-loader']
        })
      },
      {
        test: /\.styl$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader', 'postcss-loader']
        })
      },
      {
        test: /\.js/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(vue|js)/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|eot|woff|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            publicPath: '../img', // 设置css静态资源引用路径
            outputPath: 'img', // 设置静态资源输出路径
            limit: 1024
          }
        }]
      }
    ]
  }
}
