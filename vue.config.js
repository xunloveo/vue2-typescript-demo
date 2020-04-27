const path = require('path')
const name = 'Vue Typescript Demo'
const resolve = dir => {
  return path.resolve(__dirname, dir)
}

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  // lintOnSave: false,
  devServer: {
    open: true
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('src/styles/_variables.scss'),
        resolve('src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // 给index.html设置标题
    config.set('name', name)
    config.resolve.alias.set('@', resolve('./src'))
  }
}
