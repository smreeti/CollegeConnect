const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", // production mode for smaller optimized build
  entry: "./src/app.jsx",
  output: {
    filename: "[name].bundle.js", // standard JS file
    path: path.resolve(__dirname, "build"), // output folder for Vercel
    publicPath: "/", // needed for React Router
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: "file-loader", options: { limit: 8192 } }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader", options: { presets: ["@babel/preset-env", "@babel/preset-react"] } },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // copy index.html to build/
    }),
  ],
  optimization: {
    splitChunks: { name: "vendor", chunks: "all" },
  },
};
