import path from "path";
import dotenv from 'dotenv';
import { Configuration as WebpackConfiguration, DefinePlugin, webpack } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const shellEnvironmentVariables = Object.entries(process.env).reduce<{[key: string]: string | boolean | number | undefined}>((acc, [key, value]) => {
    if (key.startsWith('REACT_APP_') === false) return acc;
    acc[key] = value;
    return acc;
}, {});

const config = ():Configuration => {
    // import environment variables
    const env = { ...shellEnvironmentVariables, ...dotenv.config().parsed ?? {} }
    const envKeys = Object.keys(env).reduce<Record<string, string>>((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        mode: "production",
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
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                "@": [
                    path.resolve(__dirname, 'src')
                ]
            }
        },
        plugins: [
            new DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                title: "Meal Planning App",
                template: path.join(__dirname, "public", "index.html"),
                favicon: path.join(__dirname, "public", "favicon.ico")
            }),
            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"]
            }),
            new ForkTsCheckerWebpackPlugin({
                async: false
            }),
            new DefinePlugin({
                REACT_APP_VERSION: JSON.stringify(require("./package.json").version)
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
};

export default config;
