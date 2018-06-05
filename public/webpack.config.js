module.exports = {
    entry: './js/src/main.js',
    output: {
        filename: './js/dist/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react']
                }
            }
        ]
    },
};