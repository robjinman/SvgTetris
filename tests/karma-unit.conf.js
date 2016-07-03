var conf = require("./karma-shared.conf.js")();

module.exports = function(config) {
  conf.files = conf.files.concat([
    'unit/spec.js'
  ]);

  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  conf.logLevel = config.LOG_INFO;

  config.set(conf);
};
