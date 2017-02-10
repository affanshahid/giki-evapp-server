import { join } from 'path';
import autoprefixer from 'autoprefixer';
import { DefinePlugin } from 'webpack';

export default {
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
    })
  ],
  postcss: [ autoprefixer({ browsers: ['last 5 versions'] }) ]
};
