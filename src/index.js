var async = require( 'async' ),
    logger = require( 'logmimosa' ),
    config = require( './config' );

var _execute = function( mimosaConfig, options, next ) {
  var commands = mimosaConfig.postHook.commands;
  if ( commands ) {
    async.eachSeries( commands, function( command, cb ) {
      console.log( "will execute command: ", command )
      cb()
    });
  }

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