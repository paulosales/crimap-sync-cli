# crime-sync-cli &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/paulosales/crimemap-sync-cli/blob/master/LICENSE) [![Build Status](https://travis-ci.com/paulosales/crimemap-sync-cli.svg?branch=master)](https://travis-ci.com/paulosales/crimemap-sync-cli) [![codecov](https://codecov.io/gh/paulosales/crimemap-sync-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/paulosales/crimemap-sync-cli)



**crime-sync-cli** is CLI tool that allows you to import crimes data to crimemap database.

## Installation

Install **crime-sync-cli** CLI with

```bash
$ npm install -g paulosales/crime-sync-cli
```

Test the installation with

```bash
$ crime-sync --help
```

## Usage

```text
Usage: crime-sync [command]

A syncronizer client tool to import crime data to crimemap database.

Options:
  -V, --version                output the version number
  -h, --help                   output usage information

Commands:
  login                        Log-in into crimemap database.
  logout                       Log-out from crimemap database.
  import <pdf-file>            Import crimes data from pdf file crimemap database.
  list-imports [options]       List the top 10 most recents data imports.
  remove-import <import-hash>  Remove a crime data import.

Examples:
  $ crime-sync import crimesdata.pdf
```

## Tech stack

* [Commander](https://github.com/tj/commander.js/)
* [MochaJs](https://mochajs.org/)

## License

[MIT](https://github.com/paulosales/crimemap-sync-cli/blob/master/LICENSE) © [paulosales](https://github.com/paulosales/)
