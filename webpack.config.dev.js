var path = require('path');
var webpack = require("webpack");
module.exports = {
    devtool: 'source-map',
    entry: {
        'bootstrap.min': './src/app/bootstrap',
        vendor: [
            'react',
            'react-dom',
            'react-redux-i18n',
            'redux',
            'react-redux',
            'react-router',
            'react-router-redux',
            'axios',
            'moment-timezone',
            'decimal.js-light',
            'keyboardjs',
            'immutable',
            'prop-types',
        ]
    },
    output: {
        path: path.join(__dirname, '/public/js'), //path require file
        publicPath: '/public/',
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-decorators-legacy'],
                presets: ['react', 'es2015']
            }
        },
        { test: /\.css$/, loader: "style-loader!css-loader" }, {
            test: /\.(jpe?g|png|gif|svg|eot|svg|woff|woff2|ttf)$/i,
            loaders: [
                'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],
        alias: {
            Check$: path.resolve(__dirname, 'src/common/helpers/check.js'),
            Helper$: path.resolve(__dirname, 'src/common/helpers/index.js'),
            Config$: path.resolve(__dirname, 'src/common/config/index.js'),
            SportConfig$: path.resolve(__dirname, 'src/common/config/sport.js'),
            Routes$: path.resolve(__dirname, 'src/common/config/routes.js'),
            ScriptHOC$: path.resolve(__dirname, 'src/common/hoc/Script.js'),
            //component
            ButtonAddNew$: path.resolve(__dirname, 'src/common/components/ButtonAddNew.js'),
            //end component
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                LOCALHOST_PHOTO: JSON.stringify('http://localhost:1337/images/'),
                API_DOWNLOAD_FILE: JSON.stringify('http://localhost:1337/api/'),
                API_URL: JSON.stringify('http://localhost:1337/api/'),
                API_IMAGE: JSON.stringify('http://localhost:1337/api/image')
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.min.js' }),
        new webpack.ProvidePlugin({
            //plugin
            'React': 'react',
            'ReactDOM': 'react-dom',
            'ReactReduxI18n': 'react-redux-i18n',
            'Redux': 'redux',
            'ReactRedux': 'react-redux',
            'ReactRouter': 'react-router',
            'ReactRouterRedux': 'react-router-redux',
            'axios': 'axios',
            'moment': 'moment-timezone',
            'Decimal': 'decimal.js-light',
            'KeyboardJS': 'keyboardjs',
            'ScriptHOC': 'ScriptHOC',
            'Immutable': 'immutable',
            '_': 'lodash',
            'queryString': 'query-string',
            'uuidv4': 'uuid/v4',
            'PropTypes': 'prop-types',
            //end plugin

            //conf
            'Config': 'Config',
            'Check': 'Check',
            'Helper': 'Helper',
            'Routes': 'Routes',
            'BugsnagClient': 'BugsnagClient',
            //end conf

            //component
            'ButtonAddNew': 'ButtonAddNew'
            //end component
        })
    ]
};