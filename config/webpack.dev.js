const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.config')

module.exports = merge(common, {
  mode: 'development',
  devServer: {

    // 设置基本目录结构
    contentBase: path.resolve(__dirname, '../dist'),

    // 服务器的ip地址
    host: 'localhost',

    // 服务端压缩是否开启
    compress: true,

    // 配置服务器端口
    port: 8099,

    // 热刷新
    hot: true,

    // 浏览器自动刷新
    inline: true
  },

  devtool: 'eval-source-map'
})
