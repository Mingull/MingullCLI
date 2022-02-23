# MingullCLI

This CLI is made to easily start an express.js *__(and more)__* projects

[![npm (scoped)](https://img.shields.io/npm/v/@mingull/mingullcli?color=lightgreen&style=for-the-badge)](https://www.npmjs.com/package/@mingull/mingullcli)

## Table of Contents

1. [Installation](#installation)
1. [Documentation](#documentation)

## Installation

Install MingullCLI with npm

```bash
npm install -g @mingull/mingullcli
```

## Documentation

```bash
mingullcli [<type> <command> <name> <template>] [--git] [--install] [--yes]
```

| Argument | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `Express\|Discord` | What the type of the project is  |
| `command` | `New\|Generate` | What the type of the project is  |
| `name` | `string` | What the name of your project is |
| `template` | `Javascript\|Typescript` | What the type of the project is  |
| `--git\|-g` | `string` | __Optional__. If a git should be initialized  |
| `--install\|-i` | `string` | __Optional__. If all dependencies should be installed  |
| `--yes\|-y` | `string` | __Optional__. If all prompts should be skipped  |

## License

[MIT](https://choosealicense.com/licenses/mit/)
