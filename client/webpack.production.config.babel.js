import { join } from 'path';
import autoprefixer from 'autoprefixer';
import { DefinePlugin, optimize } from 'webpack';

const config = {
  entry: [
    join(__dirname, './src/index.jsx')
  ],
  output: {
    path: join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /.css$/, loader: 'style!css!postcss' }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
  postcss: [ autoprefixer({ browsers: ['last 5 versions'] }) ]
};

module.exports = config;
export default config;
