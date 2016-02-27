var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel', // The module to load. "babel" is short for "babel-loader"
      include: path.join(__dirname, 'app') // This fixes bug Dnd bug not packing code
    }]
  }
};

module.exports = config;