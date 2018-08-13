const path = require('path');

const getPath = pathStr => path.resolve(__dirname, pathStr);

module.exports = {
  srcPath: getPath('../src'),
  distPath: getPath('../valuation'),
  templatePath: getPath('../public/index.html'),
};
