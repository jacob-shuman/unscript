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


<a href="https://www.producthunt.com/posts/unscript?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-unscript" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=348724&theme=light" alt="Unscript - Run&#0032;npm&#0032;scripts&#0032;using&#0032;automatically&#0032;shortened&#0032;script&#0032;names | Product Hunt" style="width: 200px;" width="250" height="54" /></a>

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

## Installation

Unscript can be used by installing it globally

```bash
npm i -g unscript
```

or by using using npx:

```bash
npx unscript lw
```

to save time writing that out it is recommended to alias the command to a shorter name:

```bash
# .bashrc .zshrc ...etc
alias un='npx unscript'
```

## Usage

### Basic usage

In this case the `dev` script is run because `dev` is the only script that was automatically shortened to `d`.

```
unscript d
```

![basic shorthand example usage](examples/shorthand.svg)

### Handling multiple scripts with the same generated shorthands

When multiple scripts have the same generated shorthand then a prompt will appear to ask which of the results should be run.

![name collision example](examples/name-collision.svg)

### Run the selected script without prompting

Using the `-a` (auto) option will run the selected script without prompting for confirmation if there is only one script matching the shorthand query.

![auto option example](examples/auto-option.svg)
