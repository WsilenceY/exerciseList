const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './src/index.js',
    output:{
        filename:'bundle.js',
        library:'myex',
        libraryTarget:'umd',
        libraryExport:'default',
        clean: true,
    },
    devtool:'inline-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            title: 'tttt'
        })
    ],
    devServer:{
        static: './dist'
    },
}