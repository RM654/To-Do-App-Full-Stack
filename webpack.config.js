const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Add this

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    clean: true, // Optional: cleans build folder before each build
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Uses this as base HTML
    }),
  ],
};
