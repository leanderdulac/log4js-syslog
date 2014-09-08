var layouts = require('log4js').layouts;
var SysLogger = require('ain2');
var passThrough = layouts.messagePassThroughLayout;

var severityTable = {
	'TRACE': 'debug',
	'DEBUG': 'notice',
	'INFO': 'info',
	'WARN': 'alert',
	'ERROR': 'err',
	'FATAL': 'crit'
};

var appender = function(config, layout) {
	var client = new SysLogger();

	if (!config) {
		config = {};
	}

	client.setTag(config.tag || 'node');
	client.setFacility(config.facility || 'daemon');

	return function(event) {
		var msg = layout(event);

		client.send(msg, severityTable[event.level.levelStr] || 'notice');
	};
};

var configure = function(config) {
	var layout;

	if (!config) {
		config = {};
	}

	if (config.layout) {
		layout = layouts.layout(config.layout.type, config.layout);
	} else {
		layout = passThrough;
	}

	return appender(config, layout);
};

exports.name = 'syslog';
exports.appender = appender;
exports.configure = configure;

