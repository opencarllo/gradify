# [Gradify](https://github.com/opencarllo/gradify) &middot; ![License](https://img.shields.io/badge/License-BSD--3--Clause_Clear-dodgerblue?style=flat-square) ![Language](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square)

**Gradify** is a lightweight library for generating unique icons with vibrant gradients.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [generateIcon](#generateicon)
- [Development](#development)
- [License](#license)

## Installation

To install Gradify, ensure you have [Node.js](https://nodejs.org/) installed. Then, use the following command to install the dependencies:

```bash
npm install @opencarllo/gradify
```

## Usage

You can use Gradify to generate gradient icons directly from the command line. The following command will generate an icon with default dimensions (`512x512`) and save it in the current directory:

```bash
npx gradify generate icon
```

You can customize the icon's width, height, and target directory like this:

```bash
npx gradify generate icon --width 256 --height 256 --target ./icons
```

## API

### `generateIcon`

Generates a gradient icon with random colors.

#### Parameters

- **options** (object): The configuration options for generating the icon.
  - **width** (number): The width of the icon (default: 512).
  - **height** (number): The height of the icon (default: 512).
  - **targetDirectory** (string | undefined): The directory where the icon will be saved. If not specified, the icon will be saved in the current directory.

#### Example

```typescript
import Gradify from '@opencarllo/gradify';

Gradify.generateIcon({
  width: 256,
  height: 256,
  targetDirectory: './icons',
}).catch(console.error);
```

## Development

To build the project, use the following command:

```bash
npm run build
```

To run the project, execute:

```bash
node dist/core/index.js generate icon
```

## License

This project is licensed under the BSD 3-Clause Clear License. See the [LICENSE.md](LICENSE.md) file for details.