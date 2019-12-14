# crime-sync &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/paulosales/crimemap-sync-cli/blob/master/LICENSE) [![Build Status](https://travis-ci.com/paulosales/crimemap-sync-cli.svg?branch=master)](https://travis-ci.com/paulosales/crimemap-sync-cli)

**crime-sync** is CLI tool that allows you to import crimes data to crimemap database.

## Installation

Install crime-sync CLI with

```bash
$ npm install -g paulosales/crime-sync
```

Test the installation with

```bash
$ crime-sync --help
```

## Usage

```
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

## License

crime-sync is [MIT Licensed](https://github.com/paulosales/crimemap-sync-cli/blob/master/LICENSE)
