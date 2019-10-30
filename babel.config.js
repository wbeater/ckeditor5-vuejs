module.exports = {
  presets: [
    '@vue/app',
    // "@babel/preset-env"
  ],
  sourceType: 'unambiguous',
  
  plugins: [
    '@babel/plugin-proposal-object-rest-spread', // https://goo.gl/LCHWnP
    '@babel/plugin-proposal-class-properties' // https://goo.gl/TE6TyG
  ]
}
