/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const program = require("commander");
const chalk = require("chalk");
const packageJson = require("../package.json");
const commands = require("./commands");

module.exports = function commandParser(argv) {
  const programName = "crime-sync";

  program
    .name(`${chalk.blueBright(programName)}`)
    .usage("[command]")
    .version(`version ${packageJson.version}`)
    .usage(`${chalk.blueBright("[command]")}`)
    .description(packageJson.description);

  program
    .command("login <username> <password>")
    .description("Log-in into crimemap database.")
    .action(commands.login);

  program
    .command("logout")
    .description("Log-out from crimemap database.")
    .action(commands.logout);

  program
    .command("import <pdf-url>")
    .description("Import crimes data from pdf file crimemap database.")
    .action(commands.import);

  program
    .command("list-imports")
    .description("List the top 10 most recents data imports.")
    .option("-a, --all", "List all imports.")
    .option("-t, --top <quantity>", "List the top <quantity> imports.", 10)
    .action(commands.listImports);

  program
    .command("remove-import <ID>")
    .description("Remove a crime data import.")
    .action(commands.removeImport);

  program.on("--help", () => {
    process.stdout.write("\n");
    process.stdout.write("Examples:\n");
    process.stdout.write(
      `  $ ${chalk.blueBright(`${programName} import`)} ${chalk.greenBright(
        "http://domain.com/files/crimesdata-2019-02-05.pdf"
      )}\n`
    );
  });

  // error on unknown commands
  program.on("command:*", function() {
    process.stderr.write(
      `Invalid command: ${program.args.join(
        " "
      )}\nSee --help for a list of available commands.\n`
    );
    //process.exit(1);
  });

  program.parse(argv);

  var NO_COMMAND_SPECIFIED = program.args.length === 0;

  if (NO_COMMAND_SPECIFIED) {
    program.help();
  }
};
