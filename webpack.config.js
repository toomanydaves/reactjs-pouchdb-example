var webpack = require('webpack');
var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

var config = {
    entry: './src/index.jsx',
    exclude: /node_modules/,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015' ]
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015', 'react' ]
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    plugins: [
        new HtmlPlugin({
            minify: { },
            title: 'Proof of Concept',
            bodyContent: '',
            template: './src/index.html',
            inject: 'body'
        })
    ]
};

switch (process.env.npm_lifecycle_event) {
    case 'start':
        config.devServer = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        };

        config.plugins.push(new webpack.HotModuleReplacementPlugin());

        break;
    case 'build':
        break;
}

module.exports = config;
