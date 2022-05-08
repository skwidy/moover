oclif-moover
=================

Moover - Music Moover

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g moover
$ moover COMMAND
running command...
$ moover (--version)
moover/0.0.1 darwin-x64 node-v14.18.2
$ moover --help [COMMAND]
USAGE
  $ moover COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`moover help [COMMAND]`](#moover-help-command)
* [`moover moov`](#moover-moov)
* [`moover plugins`](#moover-plugins)
* [`moover plugins:install PLUGIN...`](#moover-pluginsinstall-plugin)
* [`moover plugins:inspect PLUGIN...`](#moover-pluginsinspect-plugin)
* [`moover plugins:install PLUGIN...`](#moover-pluginsinstall-plugin-1)
* [`moover plugins:link PLUGIN`](#moover-pluginslink-plugin)
* [`moover plugins:uninstall PLUGIN...`](#moover-pluginsuninstall-plugin)
* [`moover plugins:uninstall PLUGIN...`](#moover-pluginsuninstall-plugin-1)
* [`moover plugins:uninstall PLUGIN...`](#moover-pluginsuninstall-plugin-2)
* [`moover plugins update`](#moover-plugins-update)

## `moover help [COMMAND]`

Display help for moover.

```
USAGE
  $ moover help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for moover.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `moover moov`

Move music

```
USAGE
  $ moover moov -f <value> -t <value>

FLAGS
  -f, --from=<value>  (required) Source data to parse music from
  -t, --to=<value>    (required) Target data to import music to

DESCRIPTION
  Move music

EXAMPLES
  $ moov -f deezer -t spotify
```

_See code: [dist/commands/moov/index.ts](https://github.com/skwidy/moover/blob/v0.0.1/dist/commands/moov/index.ts)_

## `moover plugins`

List installed plugins.

```
USAGE
  $ moover plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ moover plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `moover plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ moover plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ moover plugins add

EXAMPLES
  $ moover plugins:install myplugin 

  $ moover plugins:install https://github.com/someuser/someplugin

  $ moover plugins:install someuser/someplugin
```

## `moover plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ moover plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ moover plugins:inspect myplugin
```

## `moover plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ moover plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ moover plugins add

EXAMPLES
  $ moover plugins:install myplugin 

  $ moover plugins:install https://github.com/someuser/someplugin

  $ moover plugins:install someuser/someplugin
```

## `moover plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ moover plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ moover plugins:link myplugin
```

## `moover plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ moover plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ moover plugins unlink
  $ moover plugins remove
```

## `moover plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ moover plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ moover plugins unlink
  $ moover plugins remove
```

## `moover plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ moover plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ moover plugins unlink
  $ moover plugins remove
```

## `moover plugins update`

Update installed plugins.

```
USAGE
  $ moover plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
