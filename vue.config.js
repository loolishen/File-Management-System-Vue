const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/<File-Management-System-Vue>/' // Replace <repository-name> with your GitHub repo name
    : '/'
})
