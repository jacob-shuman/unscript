import { readFileSync, existsSync } from "fs";
import { join, normalize } from "path";
import chalk from "chalk";
import { sync } from "cross-spawn";
import prompts from "prompts";
import { Scripts, ShortScript, ShortScripts } from "./types";

export const getScripts = (path: string): Scripts => {
  const packageJsonPath = join(normalize(path), "package.json");

  if (!existsSync(packageJsonPath)) {
    throw new Error(
      `couldn't find a ${chalk.red("package.json")} (${chalk.cyan(
        packageJsonPath
      )})`
    );
  }

  const fileContents = readFileSync(packageJsonPath);
  const scripts = JSON.parse(fileContents.toString()).scripts;

  if (!scripts || Object.keys(scripts).length < 1) {
    throw new Error(
      `packages.json has no scripts (${chalk.cyan(packageJsonPath)})`
    );
  }

  return scripts;
};

export const displayScripts = (scripts: Scripts, delimiter: string) => {
  const shorthandScripts: Record<string, string> = Object.entries(
    scripts
  ).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [`${k} (${shortenScriptName(k, delimiter)})`]: v,
    }),
    {}
  );

  console.log(shorthandScripts);
};

export const shortenScriptName = (
  scriptName: string,
  delimiter: string
): string =>
  scriptName
    .split(delimiter)
    .map((part) => part[0])
    .join("");

export const shortenScriptNames = (
  scripts: Record<string, string>,
  delimiter: string
): ShortScripts =>
  Object.entries(scripts).map(([key, value]) => ({
    short: shortenScriptName(key, delimiter),
    script: value,
    name: key,
  }));

export const findScript = async (
  scripts: ShortScripts,
  query: string
): Promise<ShortScript> => {
  const filteredScripts = scripts.filter((script) => script.short === query);

  if (filteredScripts.length < 1) {
    throw new Error(`couldn't find a script matching ${chalk.red(query)}`);
  }

  if (filteredScripts.length > 1) {
    const { selectedScript } = await prompts({
      type: "select",
      name: "selectedScript",
      message: "Select a script",
      choices: filteredScripts.map((s) => ({ title: s.name, value: s })),
    });

    return selectedScript;
  }

  return filteredScripts[0];
};

export const runScript = (script: string, path: string) => {
  sync("npm", ["run", script], {
    stdio: "inherit",
    cwd: normalize(path),
  });
};
