import { join } from 'path';
import autoprefixer from 'autoprefixer';

export default {
  entry: [
    join(__dirname, './src/index.jsx')
  ],
  output: {
    path: join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  resolve: ['', '.jsx', '.js'],
  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /.css$/, loader: 'style!css!postcss' }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 5 versions'] }) ]
};
