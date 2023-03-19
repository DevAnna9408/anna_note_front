module.exports = {
  lintOnSave: false,

  outputDir: 'dist',

  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js' // router parent사용
      }
    }
  },

  chainWebpack: (config) => {
    // <i18n> block 사용</i18n>
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
  },

  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'assets/lang/general',
      enableInSFC: true
    }
  }
}
// https://cli.vuejs.org/config/#indexpath
