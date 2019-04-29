/**
 * @description webpack配置文件
 * @createTime 2019/4/28
 * @author Lonely_liu
 */


const path = require('path')
const glob = require('glob')
const htmlPlugin = require('html-webpack-plugin')


/**
 * @description 获取所有入口文件绝对路径
 * @param {指定要打包的路径匹配规则} globPath
 */
function getMutilEntries(globPath) {
  let entries = {}, pathname, extname
  glob.sync(globPath).forEach(entry => {
    extname = path.extname(entry)
    if(extname.indexOf('js') !== -1) {
      pathname = path.basename(entry).split('.')[1]
    } else {
      pathname = path.basename(entry).split('.')[0]
    }
    entries[pathname] = entry
  })
  return entries
}


/**
 * @description 获取html页面Plugin
 * @param {指定要打包的路径匹配规则} globPath
 */
function getMutilHtmls(globPath) {
  let entries = getMutilEntries(globPath)
  let htmls = []
  Object.keys(entries).forEach(pathname => {
    const path = entries[pathname]
    const conf = {
      // 通过 html-withimg-loader 编译html里的静态文件
      template: 'html-withimg-loader!' + path, // 基本模板路径
      filename: `html/${pathname}.html`, // 设置打包后的文件名以及路径
      inject: true, // 为true的时候表示把js文件注入到body结尾，css注入到head中
      hash: false, // 避免开发中浏览器等对js进行缓存
      minify: {
        removeAttributeQuotes: true, // 去掉双引号
        removeComments: true // 删除html中的注释
      },
      chunks: [`${pathname}`, 'vendors', 'commons'] // 引用页面所需js文件
    }
    htmls.push(new htmlPlugin(conf))
  })
  return htmls
}


module.exports = {
  getMutilHtmls,
  getMutilEntries
}