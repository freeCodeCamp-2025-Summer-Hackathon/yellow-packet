const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'frontend/src'),
    },
  },
  paths: {
    appSrc: path.resolve(__dirname, 'frontend/src'),
    appIndexJs: path.resolve(__dirname, 'frontend/src/index.js'),
    appBuild: path.resolve(__dirname, 'build'), // Ensure this points correctly to your build output
  },
};