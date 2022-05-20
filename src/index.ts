#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import packageJson from "../package.json";
import {
  findScript,
  getScripts,
  runScript,
  shortenScriptNames,
} from "./helpers";
import prompts from "prompts";

program
  .version(packageJson.version, "-v, --version")
  .description(packageJson.description)
  .argument("[query]")
  .option("-p, --path <path>", "Path to folder containing package.json.", ".")
  .option("-d, --delimiter <delim>", "Character to separate words by.", ":")
  .option("-a, --auto", "Run the selected script without confirmation.", false)
  .option("-s, --scripts", "Display scripts in found package.json.", false)
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

        if (query) {
          // Convert script names to expected shorthands (build:watch -> bw)
          const shortenedScripts = shortenScriptNames(
            scripts,
            options.delimiter
          );
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
            console.info(
              `Converted ${chalk.blueBright(query)} -> ${chalk.blueBright(
                foundScript.name
              )}`
            );

            runScript(foundScript.name, options.path);
          }
        } else {
          // When no query is provided, display a list of all scripts
          const { selectedScript } = await prompts({
            type: "select",
            name: "selectedScript",
            message: "Select a script",
            choices: Object.entries(scripts).map(([k, v]) => ({
              title: k,
              value: k,
            })),
          });

          runScript(selectedScript, options.path);
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
