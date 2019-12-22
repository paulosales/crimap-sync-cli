#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-env node */
const program = require('commander');
const chalk = require('chalk');
const packageJson = require('./package.json')
const commands = require('./commands');

const programName = 'crime-sync';

program
  .name(`${chalk.blueBright(programName)}`)
  .usage('[command]')
  .version(packageJson.version)
  .usage(`${chalk.blueBright('[command]')}`)
  .description(packageJson.description);

program
  .command('login')
  .description('Log-in into crimemap database.')
  .action(commands.login);

program
  .command('logout')
  .description('Log-out from crimemap database.')
  .action(commands.logout);

program
  .command('import <pdf-file>')
  .description('Import crimes data from pdf file crimemap database.')
  .action(commands.import);

program
  .command('list-imports')
  .description('List the top 10 most recents data imports.')
  .option('-a, --all', 'List all imports.')
  .option('-t, --top <quantity>', 'List the top <quantity> imports.', 10)
  .action(commands.listImports);

program
  .command('remove-import <import-hash>')
  .description('Remove a crime data import.')
  .action(commands.removeImport);

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log(`  $ ${chalk.blueBright(`${programName} import`)} ${chalk.greenBright('crimesdata.pdf')}`);
});

program.parse(process.argv);

var NO_COMMAND_SPECIFIED = program.args.length === 0;

if (NO_COMMAND_SPECIFIED) {
  program.help();
}
