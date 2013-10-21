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
  commands: []
```

* `commands`: a list of objects to configure commands to be run when the `mimosa watch` startup process ends.

## Example Config

```
postHook:
  commands: [{
    command: "./copylogs.sh"
  },{
    persistent:true
    command: "./startserver.sh"
  }]
```

* `persistent`: Whether or not the command results in something that stays running. Defaults to `false`.  If it stays running, it cannot be reliably be executed synchronously. If 10 commands need to be executed and they are all _not_ persistent, then they will all be executed synchronously.
* `command`: a string, required, the command to be executed

