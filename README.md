```
▄• ▄▌   ▐ ▄   .▄▄ ·    ▄▄·   ▄▄▄    ▪     ▄▄▄·  ▄▄▄▄▄▄
█▪██▌  •█▌▐█  ▐█ ▀.   ▐█ ▌▪  ▀▄ █·  ██   ▐█ ▄█  ▀•██ ▀
█▌▐█▌  ▐█▐▐▌  ▄▀▀▀█▄  ██ ▄▄  ▐▀▀▄   ▐█·   ██▀·    ▐█.▪
▐█▄█▌  ██▐█▌  ▐█▄▪▐█  ▐███▌  ▐█•█▌  ▐█▌  ▐█▪·•    ▐█▌·
 ▀▀▀   ▀▀ █▪   ▀▀▀▀   ·▀▀▀   .▀  ▀  ▀▀▀  .▀       ▀▀▀
```

_**Run npm scripts using shorthands**_

Unscript lets you run npm scripts using shorthands generated from the names of scripts in your `package.json`. Unscript creates shorthands by combining the first letter of each word separated by a delimiter (`:` by default).

For example:

- `dev` would be shortened to `d`.
- `build:dev` would be shortened to `bd`.
- `lint:watch` would be shortened to `lw`.

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
