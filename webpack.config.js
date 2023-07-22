const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devServer: {
        open: true,
        static: "./public"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Meal Planning App",
            scriptLoading: "module",
            template: path.join(__dirname, "public", "index.html")
        }),
        // hot module replacement
        new webpack.HotModuleReplacementPlugin() 
    ]
};
