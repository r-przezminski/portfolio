const path = require('path');
const glob = require('glob-all');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const cssnano = require('cssnano');

const minifyHtmlOptions = {
  removeEmptyAttributes: true,
  // removeEmptyElements: true,
  removeComments: true,
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  collapseBooleanAttributes: true
}

const config = {};
config.module = {};

config.entry = {
  'portfolio': './src/portfolio/js/app.js',
  'animal-shelter': './src/animalShelter/js/app.js',
  'landing-page': './src/landingPage/js/app.js',
  'giphy': './src/giphy/js/app.js'
};

config.output = {
  path: path.resolve(__dirname, './docs'),
  filename: 'js/[name].js',
  publicPath: '',
};

config.module.rules = [
  {
    test: /\.(js)/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['es2017'],
      },
    },
  },
  {
    test: /\.(css|scss|sass)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader'],
    }),
  },
  {
    test: /\.html$/,
    loader: ['html-loader']
  },
  {
    test: /\.(png|jpg|svg|webp)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[hash]-[name].[ext]',
          publicPath: '../images',
          outputPath: 'images/',
        }
      }
    ]
  }
];

config.plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, 'src/portfolio/template.html'),
    chunks: ['portfolio'],
    minify: minifyHtmlOptions,
    hash: true,
  }),
  new HtmlWebpackPlugin({
    filename: 'animal-shelter.html',
    template: path.resolve(__dirname, 'src/animalShelter/template.html'),
    chunks: ['animal-shelter'],
    minify: minifyHtmlOptions,
    hash: true,
  }),
  new HtmlWebpackPlugin({
    filename: 'giphy.html',
    template: path.resolve(__dirname, 'src/giphy/template.html'),
    chunks: ['giphy'],
    minify: minifyHtmlOptions,
    hash: true,
  }),
  new UglifyJsPlugin(),
  new ExtractTextPlugin({
    filename: 'css/[name].css',
  }),
  new OptimizeCssAssetPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: cssnano,
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true,
  }),
  new PurifyCSSPlugin({
    paths: glob.sync([
      path.resolve(__dirname, 'src/portfolio/*.html'),
      path.resolve(__dirname, 'src/animalShelter/*.html'),
      path.resolve(__dirname, 'src/landingPage/*.html'),
      path.resolve(__dirname, 'src/giphy/*.html'),
    ]),
  }),
];

config.devServer = {
  port: 5000,
  historyApiFallback: true,
};

module.exports = config;
