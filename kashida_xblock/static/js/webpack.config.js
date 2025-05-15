module.exports = {
    mode: 'production',
    entry: './kashida/static/js/src/index.js',
    output: {
      path: path.resolve(__dirname, 'kashida/static/js'),
      filename: 'kashida.bundle.js'
    },
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
        { test: /\.svg$/, use: 'raw-loader' },    // so we can import SVG content
        { test: /\.css$/, use: ['style-loader','css-loader'] }
      ]
    }
  };
  