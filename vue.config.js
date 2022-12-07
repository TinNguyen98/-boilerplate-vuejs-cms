const { defineConfig } = require('@vue/cli-service')

const setPublicPath = () => {
  switch (process.env.NODE_ENV) {
    case 'development': return '/'
    default: return process.env.BASE_URL
  }
}

module.exports = defineConfig({
  outputDir: 'dist',
  assetsDir: './assets',
  publicPath: setPublicPath(),
  productionSourceMap: false,
  configureWebpack: {
    mode:
      process.env.NODE_ENV !== 'development' ? 'production' : 'development'
  },
  css: {
    extract: true
  }
})
