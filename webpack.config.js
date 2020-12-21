/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @param {WebpackEnvFlags} envFlags
 * @param {Argv} argv
 * @returns {import('webpack').Configuration}
 */
const webpackFactory = (envFlags, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    target: 'web',
    entry: {
      index: `${__dirname}/src/index.ts`,
    },
    output: {
      path: `${__dirname}/public`,
      filename: isProduction ? '[name]-[contenthash].js' : '[name].js',
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Snake Game',
        filename: 'index.html',
        template: `${__dirname}/src/index.html`,
        chunks: ['index'],
      }),
      new MiniCssExtractPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.m?[jt]sx?$/i,
          exclude: /(node_modules)/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: isProduction ? 'tsconfig.prod.json' : 'tsconfig.json',
            },
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    watchOptions: {
      ignored: ['node_modules/**', 'public/**'],
    },
  };
};

module.exports = webpackFactory;

/**
 * @typedef {{
 * production?: boolean;
 * development?: boolean;
 * local?: boolean;
 * }} WebpackEnvFlags
 */

/**
 * @typedef {{
 * color: boolean,
 * mode: 'production' | 'development',
 * analyze: boolean,
 * }} Argv
 */
