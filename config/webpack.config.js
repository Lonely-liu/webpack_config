/**
 * @description webpack配置文件
 * @createTime 2019/4/26
 * @author Lonely_liu
 */


const path = require('path')
const utils = require('./utils')
const Uglify = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const modules = require('./module')

const entries = utils.getMutilEntries(path.join(__dirname, '../src/js/**/entry.**.js'))
const htmlPlugins = utils.getMutilHtmls(path.join(__dirname, '../src/html/**.html'))


const config = {
  mode: 'development',

  entry: entries,

  output: {

    // publicPath: './',
    filename: 'js/default/[name].min.js',
    path: path.join(__dirname, '../dist/')
  },

  ...modules,

  plugins: [
    new Uglify(), // 压缩js
    new CleanWebpackPlugin({
      verbose: true
    }), // 打包之前清理已有的dist目录
    ...htmlPlugins,

    // 分离css
    // eslint-disable-next-line new-cap
    new extractTextPlugin({
      filename: 'css/[name].css'
    }),

    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.*\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }]
      },
      canPrint: true
    })
  ],

  // 优化项配置
  optimization: {

    // 代码分割
    splitChunks: {

      // 分割组
      cacheGroups: {

        // 公用模块抽离
        common: {
          name: 'commons',
          chunks: 'initial',
          minSize: 0, // 大于0个字节
          minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
        },

        // 第三方库抽离
        vendor: {
          name: 'vendors',
          priority: 1, // 权重, vender权重比common高，就先抽离第三方包然后打包公共引用
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minSize: 0, // 大于0个字节
          minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
        }
      }
    }
  },

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
}


module.exports = config
