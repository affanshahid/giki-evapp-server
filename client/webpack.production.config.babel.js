import { join } from 'path';

export default {
  entry: [
    join(__dirname, './src/index.jsx')
  ],
  output: {
    path: join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  resolve: ['', 'jsx', 'js'],
  module: {
    loaders: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /.css$/, loader: 'style!css!autoprefixer?browsers=last 2 versions'}
    ]
  }
};
