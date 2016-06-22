module.exports = {
    entry: './src/client/init.js',
    output: {
        path: './server/public',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    }
}
