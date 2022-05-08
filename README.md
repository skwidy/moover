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
moover/0.0.0 darwin-x64 node-v14.18.2
$ moover --help [COMMAND]
USAGE
  $ moover COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`moover -f deezer -t spotify`](#moover-deezer-spotify)
* [`moover help [COMMAND]`](#moover-help-command)
* [`moover plugins`](#moover-plugins)
* [`moover plugins:install PLUGIN...`](#moover-pluginsinstall-plugin)
* [`moover plugins:inspect PLUGIN...`](#moover-pluginsinspect-plugin)
* [`moover plugins:install PLUGIN...`](#moover-pluginsinstall-plugin-1)
* [`moover plugins:link PLUGIN`](#moover-pluginslink-plugin)
* [`moover plugins:uninstall PLUGIN...`](#moover-pluginsuninstall-plugin)
* [`moover plugins:uninstall PLUGIN...`](#moover-pluginsuninstall-plugin-1)
* [`moover plugins:uninstall PLUGIN...`](#moover-pluginsuninstall-plugin-2)
* [`moover plugins update`](#moover-plugins-update)

## `moover -f deezer -t spotify`

Move Deezer music to Spotify

```
USAGE
  $ ./bin/dev moov -f deezer -t spotify

DESCRIPTION
  Move loved tracks on Deezer to Spotify 
```

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
<!-- commandsstop -->
