const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config')
const interfaces = require('os').networkInterfaces() // 在开发环境中获取局域网中的本机iP地址

let IPAdress = '' // 保存本地IP地址
for (let devName in interfaces) {
	let iface = interfaces[devName];
	for (let i = 0; i < iface.length; i++) {
		let alias = iface[i];
		if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
			IPAdress = alias.address;
		}
	}
}

module.exports = merge(common, {
  mode: 'development',
  devServer: {

    // 设置基本目录结构
    contentBase: path.resolve(__dirname, '../dist'),

    // 服务器的ip地址
    host: IPAdress,

    // 服务端压缩是否开启
    compress: true,

    // 配置服务器端口
    port: 8099,

    // 热刷新
    hot: true,

    // 浏览器自动刷新
    inline: true
  },
  plugins: [
    // 全局挂载插件在写模块时不在引入jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ],

  devtool: 'eval-source-map'
})
