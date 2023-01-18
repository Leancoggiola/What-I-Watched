const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config();

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const isDebug = !isProduction;
const sourceMap = isDebug ? 'source-map' : 'nosources-source-map'

module.exports = {
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: `${sourceMap}`,
  watch: isDebug,
  optimization: {
    minimize: isProduction,
    minimizer: [ new TerserPlugin({ parallel: true})]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: { limit: false },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ 'cleanAfterEveryBuildPatterns': 'build'}),
    new webpack.LoaderOptionsPlugin({ minimize: isProduction }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  target: 'web',
};