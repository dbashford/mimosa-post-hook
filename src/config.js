"use strict";

var steps = ["init", "beforeOptimize", "optimize", "afterOptimize",
  "beforeServer", "server", "afterServer", "beforePackage", "package",
  "afterPackage", "beforeInstall", "install", "afterInstall", "complete"];

exports.defaults = function() {
  return {
    postHook: {
      workflowStep: "complete",
      commands:[]
    }
  };
};

exports.placeholder = function () {
  var ph = "\n\n  # postHook:        # config for postHook module\n" +
      "    # workflowStep: \"complete\"  # the 'postBuild' workflow step during which to execute \n" +
      "                     # the commands \n" +
      "    # commands: []   # A list of objects. Three properties in those objects. 'command' is the \n" +
      "                     # command to execute. 'persistent' is a flag that indicates whether or \n" +
      "                     # not the command results in something that stays running. 'callbackOn' \n" +
      "                     # indicates when to continue with mimosa processing when the command is \n" +
      "                     # 'persistent'. The command will execute during 'mimosa watch' startup\n" +
      "                     # processing at the postBuild workflow step from above.\n";

  return ph;
};

exports.validate = function ( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "postHook config", config.postHook ) ) {
    if ( validators.ifExistsIsArray( errors, "postHook.commands", config.postHook.commands ) ) {
      config.postHook.commands.forEach( function( command ) {
        validators.stringMustExist( errors, "postHook.commands.command", command.command );
        validators.ifExistsIsBoolean( errors, "postHook.commands.persistent", command.persistent );
        if ( command.callbackOn ) {
          if ( typeof command.callbackOn !== "number" && typeof command.callbackOn !== "string" ) {
            errors.push( "postHook.commands.callbackOn must be either a string or a number" );
          }
        }
      });
    }

    if ( validators.isString( errors, "postHook.workflowStep", config.postHook.workflowStep ) ) {
      if ( steps.indexOf(config.postHook.workflowStep) === -1 ) {
        errors.push("postHook.workflowStep must be one of the following: " + steps.join(',') + ".");
      }
    }
  }

  return errors;
};




