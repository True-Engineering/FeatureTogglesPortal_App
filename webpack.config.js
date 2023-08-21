const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: './src/index.tsx',
  },

  performance: {
    hints: false,
  },

  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-source-map',

  output: {
    path: path.resolve('out'),
    publicPath: '/',
    filename:
      process.env.NODE_ENV === 'production'
        ? 'index.[contenthash].js'
        : 'index.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        use: [
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/feature-toggles-portal-theme/dist/fonts',
          to: 'fonts',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.png',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        THEME: JSON.stringify(process.env.THEME),
        APP_VERSION: JSON.stringify(process.env.APP_VERSION),
      },
    }),
  ],

  devServer:
    process.env.NODE_ENV === 'development-docker'
      ? {
          contentBase: './src',
          watchContentBase: true,
          host: '172.16.255.255',

          historyApiFallback: true,
          disableHostCheck: true,
          hot: true,
        }
      : {
          historyApiFallback: true,
          disableHostCheck: true,
          hot: true,
        },
});
