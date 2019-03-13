const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const isDev = process.env.NODE_ENV === 'development';
const uril = require('./utils.js')

const miniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let config;
const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: {
        index: '/public/index.html'
    },
    proxy: {
        '/api': 'http:127.0.0.1:3333',
        '/user': 'http://127.0.0.1:3333'
    },
    hot: true
};
const defaultPlugin = [
    new miniCssExtractPlugin({
        filename: "style.[contenthash:8].css",
        chunkFilename: "chunk.[contenthash:8].css"
    }),
    new webpack.DefinePlugin({ // 设定环境变量
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, '../template.html')
    })
];

if (isDev) {
    config  = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            /*rules: uril.styleLoaders({
                sourceMap: true,
                usePostCSS: true,
                extract: true
            })*/
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
                }, {
                    test: /\.styl/,
                    use: [
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }, {
                    test: /\.less$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'less-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins: defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../examples/index.js'),
            // vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js',
            publicPath: '/public/'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
                }, {
                    test: /\.styl/,
                    use: [
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }, {
                    test: /\.less$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'less-loader'
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: 'all' // 默认将js代码打包到vendor里面
            },
            runtimeChunk: true // 将除了entry里面指定的js的name的时候，其他的js放到runtime里面去
        },
        plugins: defaultPlugin.concat([
        ])
    });
}

module.exports = config