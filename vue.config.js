module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Prácticas Sustentables'
      return args
    })
  },
  //
  publicPath: process.env.NODE_ENV === 'production'
    ? '/practicas_sustentables'
    : '/',
}
