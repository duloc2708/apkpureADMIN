var path = require("path");
var webpack = require("webpack");
const OptimizeJsPlugin = require("optimize-js-plugin");
module.exports = {
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
      Loader$: path.resolve(__dirname, "src/common/components/Loader.js"),
      LoaderSidebar$: path.resolve(
        __dirname,
        "src/common/components/LoaderSidebar.js"
      ),
      Single$: path.resolve(__dirname, "src/common/components/Single.js"),
      Double$: path.resolve(__dirname, "src/common/components/Double.js"),
      SingleTicket$: path.resolve(
        __dirname,
        "src/common/components/SingleTicket.js"
      ),
      ComponentResetSidebar$: path.resolve(
        __dirname,
        "src/common/components/ComponentResetSidebar.js"
      ),
      ButtonAddNew$: path.resolve(
        __dirname,
        "src/common/components/ButtonAddNew.js"
      ),
      AlertCustom$: path.resolve(
        __dirname,
        "src/common/components/AlertCustom.js"
      ),
      Combobox: path.resolve(__dirname, "src/common/components/Combobox.js"),
      ComboboxMultiple$: path.resolve(
        __dirname,
        "src/common/components/ComboboxMultiple.js"
      )
      //end component
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        LOCALHOST_PHOTO: JSON.stringify("http://api.apksafety.com/images/"),
        API_DOWNLOAD_FILE: JSON.stringify("http://apkverified.com/api/"),
        API_URL: JSON.stringify("http://api.apksafety.com/api/"),
        API_IMAGE: JSON.stringify("https://api.apksafety.com/api/image")
      }
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
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
      Numeral: "numeral",
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

      //conf
      Config: "Config",
      SportConfig: "SportConfig",
      Check: "Check",
      Helper: "Helper",
      Routes: "Routes",
      //end conf

      //component
      Loader: "Loader",
      LoaderSidebar: "LoaderSidebar",
      Single: "Single",
      Double: "Double",
      SingleTicket: "SingleTicket",
      ComponentResetSidebar: "ComponentResetSidebar",
      ButtonAddNew: "ButtonAddNew",
      AlertCustom: "AlertCustom",
      Combobox: "Combobox",
      ComboboxMultiple: "ComboboxMultiple"

      //end component
    })
  ]
};
