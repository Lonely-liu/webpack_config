/**
 * @description webpack配置文件
 * @createTime 2019/4/26
 * @author Lonely_liu
 */


const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')

const modules = require('./module')

const entries = utils.getMutilEntries(path.join(__dirname, '../src/js/**/entry.**.js'))
const htmlPlugins = utils.getMutilHtmls(path.join(__dirname, '../src/html/**.html'))

const isDev = process.env.NODE_ENV === 'development'

console.log('isDev', isDev, process.env.NODE_ENV)

const config = {

  entry: entries,

  output: {
    filename: 'js/default/[name].min.js',
    path: path.join(__dirname, '../dist/')
  },

  ...modules,

  plugins: [
    ...htmlPlugins,

    // 分离css
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    })
  ]


}


module.exports = config
