const historyApiFallback = require('connect-history-api-fallback');
const logger = require('connect-logger');

module.exports = {
  server: true,
  port: 3000,
  index: 'index.html',
  files: 'build',
  open: false,
  notify: false,
  middleware: [logger(), historyApiFallback()],
};
