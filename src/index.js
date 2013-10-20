var async = require('async'),
    logger = require('logmimosa');

var _execute = function( mimosaConfig, options, next ) {
  logger.debug( "Going to execute the following commands: ", mimosaConfig.postHook.commands);
  next();
};

var registration = function( mimosaConfig, register ) {
  register( [ 'postBuild' ], 'complete', _execute );
};

module.exports = {
  registration: registration,
  defaults:     config.defaults,
  placeholder:  config.placeholder,
  validate:     config.validate
};