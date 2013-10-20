"use strict";

exports.defaults = function() {
  return {
    postHook: {
      commands:[]
    }
  };
};

exports.placeholder = function () {
  var ph = "  # postHook:     # config for postHook module" +
      "    # commands: []   # A list of strings, the commands/scripts to execute at the end of \n" +
      "                     # 'mimosa watch' startup processing. These would be how you would\n" +
      "                     # execute them at the command line. For example: [\"./doSomething\", \"rm foo.bar\"]\n\n";

  return ph;
};

exports.validate = function ( config, validators ) {
  var errors = [];
  if ( validators.ifExistsIsObject( errors, "postHook config", config.postHook ) ) {
    validators.ifExistsIsArrayOfStrings( errors, "postHook.commands", config.postHook.commands );
  }

  return errors;
};