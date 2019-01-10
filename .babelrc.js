module.exports = {
  env: {
    production: {
      presets: [
        ['@babel/env', {
          modules: false,
          exclude: ['transform-async-to-generator', 'transform-regenerator'],
        }],
        '@babel/preset-react'
      ],
    }
  }
};
