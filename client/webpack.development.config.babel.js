import { join } from 'path';
import { HotModuleReplacementPlugin, DefinePlugin } from 'webpack';
import autoprefixer from 'autoprefixer';

const config = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8001',
    'webpack/hot/only-dev-server',
    join(__dirname, './src/index.jsx')
  ],
  output: {
    path: join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel' },
      { test: /.css$/, loader: 'style!css!postcss' }
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 5 versions'] })],
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': 'development'
      }
    })
  ],
  devServer: {
    contentBase: join(__dirname, './dist')
  }
};
module.exports = config;
export default config;
