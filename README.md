```
▄• ▄▌   ▐ ▄   .▄▄ ·    ▄▄·   ▄▄▄    ▪     ▄▄▄·  ▄▄▄▄▄▄
█▪██▌  •█▌▐█  ▐█ ▀.   ▐█ ▌▪  ▀▄ █·  ██   ▐█ ▄█  ▀•██ ▀
█▌▐█▌  ▐█▐▐▌  ▄▀▀▀█▄  ██ ▄▄  ▐▀▀▄   ▐█·   ██▀·    ▐█.▪
▐█▄█▌  ██▐█▌  ▐█▄▪▐█  ▐███▌  ▐█•█▌  ▐█▌  ▐█▪·•    ▐█▌·
 ▀▀▀   ▀▀ █▪   ▀▀▀▀   ·▀▀▀   .▀  ▀  ▀▀▀  .▀       ▀▀▀
```

![example usage](examples/full.svg)

[![NPM Version](https://img.shields.io/npm/v/unscript?style=flat)]()
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

_**Run npm scripts using automatically shortened script names**_

```bash
unscript [options] [query]
```


## What is unscript?
Unscript lets you query and run npm scripts from a list of shorthands. These shorthands are generated from the names of the scripts in your `package.json`. Unscript creates shorthands by combining the first letter of each word separated by a delimiter (`:` by default).

For example:

- `dev` would be shortened to `d`.
- `build:dev` would be shortened to `bd`.
- `lint:watch:dev` would be shortened to `lwd`.

If there are at least 2 identical shorthands then a prompt will appear to ask which of the results should be run.

For example:

- `build:dev` would be shortened to `bd`.
- `build:deploy` would also be shortened to `bd`.

If no query is passed then a list of all scripts in the `package.json` will be displayed.

## Why was this made?
There are many existing tools on npm that can run javascript files easily as a drop-in replacement for package.json scripts. Although these are helpful utilities I found that I wanted to create many small package.json scripts that I wouldn't need a full javascript file for. Unscript was created out of my own personal desire to quick run npm scripts using automatically generated shortened names.

## Options

| option              | default | description                                   |
| ------------------- | ------- | --------------------------------------------- |
| `-p`, `--path`      | `"."`   | Path to folder containing package.json.       |
| `-d`, `--delimiter` | `":"`   | Character to separate words by.               |
| `-a`, `--auto`      | `false` | Run the selected script without confirmation. |
| `-s`, `--scripts`   | `false` | Display scripts in found package.json.        |

## Usage

Unscript can be run using npx:

```bash
npx unscript lw
```

to save time writing that out it is recommended to alias the command to a shorter name:

```bash
# .bashrc .zshrc ...etc
alias un='npx unscript'
```
