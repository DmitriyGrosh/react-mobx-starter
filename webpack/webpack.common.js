const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      pages: path.resolve(__dirname, '..', './src/pages'),
      shared: path.resolve(__dirname, '..', './src/shared'),
      assets: path.resolve(__dirname, '..', './src/assets'),
      entities: path.resolve(__dirname, '..', './src/entities'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: '/node_modules/',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', './build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
