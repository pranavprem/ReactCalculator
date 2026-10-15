const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ReactDeployer runs `npm run dev` and health-checks port 8080 through a
// load balancer. The dev server has to listen on every interface and accept
// whatever Host header the balancer sends.
const HOST = "0.0.0.0";
const PORT = 8080;

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    context: path.join(__dirname, "src"),
    entry: "./js/client.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "client.min.js",
      publicPath: "/",
      clean: true,
    },
    devtool: isProd ? false : "inline-source-map",
    devServer: {
      host: HOST,
      port: PORT,
      allowedHosts: "all",
      hot: true,
      compress: true,
      open: false,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/index.html"),
        inject: "body",
      }),
    ],
  };
};
