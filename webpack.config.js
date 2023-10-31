const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;


const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    const configObj = {splitChunks:{
        chunks: 'all'
    }}

    if(isProd) {
        configObj.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ];
    }
    return configObj;
}

const plugins = () => {
    const basePlugins = [
        new HTMLWebpackPlugin({
            template: "./index.html",
            filename: 'index.html',
            inject: "body",
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/assets") ,
                    to: path.resolve(__dirname, "app/assets"),
                    noErrorOnMissing: true,
                },
            ]
        }),
    ];

    if (isProd) {
        basePlugins.push(
            new ImageminPlugin({
                bail: false, 
                cache: true,
                imageminOptions: {
                  plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                      "svgo",
                      {
                        plugins: [
                          {
                            removeViewBox: false
                          }
                        ]
                      }
                    ]
                  ]
                }
              })
        )
    }

    return basePlugins;
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `./js/${filename('js')}`,
        publicPath: '', 
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: plugins(),
    optimization: optimization(),
    devtool: isProd ? false : "source-map",
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                     "css-loader",
                ],
              },
              {
                test: /\.s[ac]ss$/,
                use: [
                    {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: (resourcePath, context) => {
                            return path.relative(path.dirname(resourcePath), context) + "/";
                        },
                    }
                },
                "css-loader", "sass-loader",
            ]
              },
              {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/, 
                type: 'asset/resource',
                generator: {
                filename: `./img/${filename('[ext]')}`
                    } 
              },
              {
                test: /\.(?:|woff2|)$/, 
                type: 'asset/resource',
                generator: {
                    filename: `./fonts/${filename('[ext]')}`
                 }       
                },
                {
                    test: /\.js$/, 
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                  },
        ]
    }
}