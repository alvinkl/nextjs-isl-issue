module.exports = {
  webpack: (config, options) => {
    const { dev } = options

    const cssLoader = {
      test: /\.css$/,
      use: [
        'isomorphic-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: dev,
            localIdentName: '[name]-[local]-[hash:base64:5]',
          },
        },
      ],
    };

    config.module.rules.push(cssLoader);

    return config;
  }
}