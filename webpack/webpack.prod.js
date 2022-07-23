const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env.name': JSON.stringify('Grosh'),
    }),
  ],
};
