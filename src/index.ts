#!/usr/bin/env node

import { Argument, program } from "commander";
import chalk from "chalk";
import packageJson from "../package.json";

import {
  findScript,
  getScripts,
  runScript,
  shortenScriptNames,
} from "./helpers";
import { delimiter } from "path";
import prompts from "prompts";

program
  .version(packageJson.version, "-v, --version")
  .description(packageJson.description)
  .addArgument(new Argument("shorthand"))
  .option("-p, --path <path>", "Path to folder containing package.json.", ".")
  .option("-d, --delimiter <delim>", "Character to separate words by.", ":")
  .option("-a, --auto", "Run the selected script without confirmation.", false)
  .option("-s, --scripts", "Display scripts in found package.json", false)
  .action(
    async (
      query: string,
      options: {
        path: string;
        delimiter: string;
        auto: boolean;
        scripts: boolean;
      }
    ) => {
      try {
        // Get package.json name and scripts
        const scripts = getScripts(options.path);

        if (options.scripts) {
          console.log(scripts);

          process.exit(0);
        }

        // Convert script names to expected shorthands (build:watch -> bw)
        const shortenedScripts = shortenScriptNames(scripts, delimiter);
        const foundScript = await findScript(shortenedScripts, query);

        // Run script if auto is true or if auto is false and user agreed
        if (
          foundScript &&
          (options.auto ||
            (
              await prompts({
                type: "confirm",
                name: "confirm",
                message: `npm run ${foundScript.name} (${foundScript.script})`,
                initial: true,
              })
            ).confirm)
        ) {
          runScript(foundScript, options.path);
        }
      } catch (err) {
        console.error(
          `${chalk.bgRed("ERROR:")} ${(err as Error).message || err}`
        );

        process.exit(1);
      }
    }
  );

program.parse(process.argv);
