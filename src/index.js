var cp = require('child_process'),
    spawn = cp.spawn,
    exec = cp.exec,

    async = require( 'async' ),
    config = require( './config' ),

    logger = null;

// for those that end right away
var _exec = function( command, cb ) {
  exec( command, function ( error, stdout, stderr ) {
    if ( error ) {
      logger.error( "Error occurred executing command [[ " + command + " ]]" );
      console.log( error );
    } else {
      if ( stdout && stdout.length > 0 ) {
        logger.info( stdout );
      }
      logger.success( "Command [[ " + command + " ]] ended");
    }
    cb();
  });
};

// for long running
var _spawn = function( command, callbackOn, cb ) {
  var commandPieces = command.split( ' ' ),
      commandStart = commandPieces.splice( 0, 1 )[0],
      error = null,
      cmd = spawn( commandStart, commandPieces );

  cmd.stdout.on( 'data', function( buffer ){
    var outStr = buffer.toString();
    console.log( outStr );
    if ( cb && typeof callbackOn === "string" ) {
      if ( outStr.indexOf( callbackOn ) > -1 ) {
        cb();
        cb = undefined;
      }
    }
  });

  cmd.stderr.on( 'error', function( buffer ){
    if ( !error ) {
      error = '';
    }
    error += buffer.toString();
  });

  cmd.on( 'close', function( code ){
    if ( error ) {
      logger.error( "Error occurred executing command [[ " + command + " ]]" );
      console.log( error );
    } else {
      logger.success( "Command [[ " + command + " ]] ended");
    }
  });

  if ( callbackOn ) {
    if ( typeof callbackOn === "number" ) {
      setTimeout(cb, callbackOn);
    }
  } else {
    cb();
  }
};

var _execute = function( mimosaConfig, options, next ) {
  var commands = mimosaConfig.postHook.commands;
  if ( commands ) {
    async.eachSeries( commands, function( command, cb ) {
      if (command.persistent) {
        _spawn( command.command, command.callbackOn, cb );
      } else {
        _exec( command.command, cb );
      }
    }, next);
  } else {
    next();
  }
};

var registration = function( mimosaConfig, register ) {
  logger = mimosaConfig.log;
  register( [ 'postBuild' ], mimosaConfig.postHook.workflowStep, _execute );
};

module.exports = {
  registration: registration,
  defaults:     config.defaults,
  placeholder:  config.placeholder,
  validate:     config.validate
};