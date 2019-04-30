const merge = require('webpack-merge')
const Uglify = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./webpack.config')

module.exports = merge(common, {
  mode: 'production',

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

  plugins: [
    new Uglify(), // 压缩js
    new CleanWebpackPlugin({
      verbose: true
    }), // 打包之前清理已有的dist目录


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
  ]
})
