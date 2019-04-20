const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader  : 'url-loader?limit=3000&name=images/[name].[ext]'
             },
             {
                test: /\.svg$/,
                use: {
                    loader: "file-loader",
                    options: {
                      name: "images/[name].[ext]",
                    }
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(ttf|eot|woff|woff2|otf)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "fonts/[name].[ext]",
                  }
                }
            }
        ]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ErrorOverlayPlugin()
    ],
    devtool: 'cheap-module-source-map',
};