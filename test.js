var log4js = require('log4js');
var path = require('path');

log4js.loadAppender(path.resolve('.') + '/index.js');

log4js.configure({
  'appenders': [
    {
      type      : 'console'
    },
    {
      type      : '/Users/jonathanlima/Code/pagarme/log4js-syslog/index'
    }
  ]
});

var logger = log4js.getLogger('TEST');

logger.warn('TESTE');

