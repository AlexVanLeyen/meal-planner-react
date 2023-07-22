import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        publicPath: "/",
        filename: "bundle.[fullhash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node-modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Meal Planning App",
            template: path.join(__dirname, "public", "index.html")
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"]
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false
        })
    ],
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        open: true,
        port: 3000,
        static: "./public",
    },

};

export default config;
