const { DefinePlugin } = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.name': JSON.stringify('Dima'),
    }),
    new ReactRefreshPlugin(),
  ],
};
