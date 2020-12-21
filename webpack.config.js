/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      filename: '[name]-[contenthash].js',
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Snake Game',
        filename: 'index.html',
        template: `${__dirname}/src/index.html`,
        chunks: ['index'],
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.m?[jt]sx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: isProduction ? 'tsconfig.prod.json' : 'tsconfig.json',
            },
          },
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
