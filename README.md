mimosa-post-hook
===========
## Overview

For more information regarding Mimosa, see http://mimosa.io.

## Usage

Add `'post-hook'` to your list of modules.  That's all!  Mimosa will install the module for you when you start up.

## Functionality

At the very last step in `mimosa watch` startup, this module will execute any scripts/commands provided in the `commands` array.

It will write any output to the console.

Commands are executed in the order they are provided.  non-`persistent` commands will be executed synchronously.

## Default Config

```
postHook:
  workflowStep: "complete"
  commands: []
```

* `workflowStep`: The `postBuild` workflow step to execute the commands. Possible workflow steps include: `"init", "beforeOptimize", "optimize", "afterOptimize", "beforeServer", "server", "afterServer", "beforePackage", "package", "afterPackage", "beforeInstall", "install", "afterInstall", "complete"`.  Use this to move the commands to a different part of the workflow, if you need something to be executed during a different step.
* `commands`: a list of objects to configure commands to be run when the `mimosa watch` startup process ends.

## Example Config

```
postHook:
  workflowStep: "init"
  commands: [{
    command: "./copylogs.sh"
  },{
    command: "mongod"
    persistent: true
    callbackOn: "waiting for connections on port 27017"
  }]
```

* `persistent`: Whether or not the command results in something that stays running. Defaults to `false`.  If it stays running, it cannot be reliably be executed synchronously. If 10 commands need to be executed and they are all _not_ persistent, then they will all be executed synchronously.
* `command`: a string, required, the command to be executed
* `callbackOn`: a number or a string. Only valid when `persistent` is `true`. Because a `persistent` command never ends, post-hook does not know when to move on to the next command or when to hand control back over to mimosa to continue executing its workflows. If `callbackOn` is not provided when `persistent: true`, then post-hook continues immediately.  If a number is provided, then post-hook continues after that number of milliseconds.  If a string is provided, then post-hook continues after that string occurs in the stdout. The example above will start `mongod`, and then when the string "waiting for connections on port 27017" appears in the stdout, post-hook will continue.

