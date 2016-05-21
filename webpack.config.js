module.exports = {
  entry: './src/weather-type.ts',
  output: {
    filename: './dist/weather-type.js',
    library: 'weather-type',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }
    ]
  }
}
