module.exports = {
    entry: './src/main.js',
    output: {
        filename: './prod/js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader", options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }]
            },{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif|woff|otf|png|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath : './prod',
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
};