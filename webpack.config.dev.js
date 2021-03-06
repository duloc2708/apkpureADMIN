var path = require("path");
var webpack = require("webpack");
module.exports = {
  cache: {
    type: "memory"
  },
  watchOptions: {
    ignored: /node_modules/,
    watch: false,
    hot: false,
    poll: 2000
  },
  entry: {
    "bootstrap.min": "./src/app/bootstrap",
    vendor: [
      "react",
      "react-dom",
      "react-redux-i18n",
      "redux",
      "react-redux",
      "react-router",
      "react-router-redux",
      "axios",
      "moment-timezone",
      "decimal.js-light",
      "keyboardjs",
      "immutable",
      "prop-types"
    ]
  },
  output: {
    path: path.join(__dirname, "/public/js"), //path require file
    publicPath: "/public/",
    filename: "[name].js",
    chunkFilename: "[name]-[chunkhash].js"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|woff|woff2|ttf)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve("./src"), "node_modules"],
    alias: {
      Check$: path.resolve(__dirname, "src/common/helpers/check.js"),
      Helper$: path.resolve(__dirname, "src/common/helpers/index.js"),
      Config$: path.resolve(__dirname, "src/common/config/index.js"),
      SportConfig$: path.resolve(__dirname, "src/common/config/sport.js"),
      Routes$: path.resolve(__dirname, "src/common/config/routes.js"),
      ScriptHOC$: path.resolve(__dirname, "src/common/hoc/Script.js"),
      //component
      Dimmer$: path.resolve(__dirname, "src/common/components/Dimmer.js"),
      ModalNoti$: path.resolve(__dirname, "src/common/components/ModalNoti.js"),
      Loader$: path.resolve(__dirname, "src/common/components/Loader.js"),
      Line: path.resolve(__dirname, "src/common/components/Line.js"),
      OddsTicket: path.resolve(
        __dirname,
        "src/common/components/OddsTicket.js"
      ),
      BugsnagClient: path.resolve(
        __dirname,
        "src/common/config/bugsnagClient.js"
      ),
      AlertCustom$: path.resolve(
        __dirname,
        "src/common/components/AlertCustom.js"
      ),
      ButtonPermission$: path.resolve(
        __dirname,
        "src/common/components/ButtonPermission.js"
      ),
      LinkProduct$: path.resolve(
        __dirname,
        "src/common/components/LinkProduct.js"
      ),
      Combobox$: path.resolve(__dirname, "src/common/components/Combobox.js"),
      ComboboxMultiple$: path.resolve(
        __dirname,
        "src/common/components/ComboboxMultiple.js"
      ),
      Cell$: path.resolve(__dirname, "src/common/components/Cell.js"),
      CustomTable$: path.resolve(
        __dirname,
        "src/common/components/CustomTable.js"
      ),
      InputNumberFormat$: path.resolve(
        __dirname,
        "src/common/components/InputNumberFormat.js"
      ),
      PagingTable$: path.resolve(
        __dirname,
        "src/common/components/PagingTable.js"
      ),
      InputDateFormat$: path.resolve(
        __dirname,
        "src/common/components/InputDateFormat.js"
      ),
      ConfigKeyCode$: path.resolve(
        __dirname,
        "src/common/components/ConfigKeyCode.js"
      )
      //end component
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        LOCALHOST_PHOTO: JSON.stringify("http://api.apksafety.com/images/"),
        API_DOWNLOAD_FILE: JSON.stringify("http://apkverified.com/api/"),
        API_URL: JSON.stringify("http://localhost:8080/"),
        API_IMAGE: JSON.stringify("https://api.apksafety.com/api/image")
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.min.js"
    }),
    new webpack.ProvidePlugin({
      //plugin
      React: "react",
      ReactDOM: "react-dom",
      ReactReduxI18n: "react-redux-i18n",
      Redux: "redux",
      ReactRedux: "react-redux",
      ReactRouter: "react-router",
      ReactRouterRedux: "react-router-redux",
      axios: "axios",
      moment: "moment-timezone",
      Decimal: "decimal.js-light",
      KeyboardJS: "keyboardjs",
      ScriptHOC: "ScriptHOC",
      Immutable: "immutable",
      _: "lodash",
      queryString: "query-string",
      uuidv4: "uuid/v4",
      PropTypes: "prop-types",
      //end plugin
      Config: "Config",
      SportConfig: "SportConfig",
      Check: "Check",
      Helper: "Helper",
      Routes: "Routes",
      BugsnagClient: "BugsnagClient",
      //end conf
      //component
      Dimmer: "Dimmer",
      ModalNoti: "ModalNoti",
      AlertCustom: "AlertCustom",
      ButtonPermission: "ButtonPermission",
      LinkProduct: "LinkProduct",
      Loader: "Loader",
      Line: "Line",
      OddsTicket: "OddsTicket",
      Combobox: "Combobox",
      ComboboxMultiple: "ComboboxMultiple",
      Cell: "Cell",
      Modal: "react-modal",
      InputNumberFormat: "InputNumberFormat",
      CustomTable: "CustomTable",
      PagingTable: "PagingTable",
      InputDateFormat: "InputDateFormat",
      ConfigKeyCode: "ConfigKeyCode"
      //end component
    })
  ]
};
