const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pages: {
    popup: {
      template: 'public/popup.html',
      entry: './src/popup/popup.js',
      title: 'Popup'
    },
    options: {
      template: 'public/options.html',
      entry: './src/options/options.js',
      title: 'Options'
    }
  },
  filenameHashing: false,
  chainWebpack: (config) => {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
            
        { from: 'src/assets', to: 'assets' },
          {
            from: 'public/manifest.json',
            to: 'manifest.json'
          }, 
          {
            from: 'src/background.js',
            to: 'background.js'
          }
        ]
      }
    ])
  }
})

 