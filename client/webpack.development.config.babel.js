import { join } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';

const config = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    join(__dirname, './src/index.jsx')
  ],
  output: {
    path: join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  resolve: ['', 'jsx', 'js'],
  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel' },
      { test: /.css$/, loader: 'style!css!autoprefixer?browsers=last 2 versions' }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: join(__dirname, './dist')
  }
};
module.exports = config;
export default config;
