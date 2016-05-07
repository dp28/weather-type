module.exports = {
  entry: './src/weather-type.ts',
  output: {
    filename: 'dist/weather-type.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }
    ]
  }
}
