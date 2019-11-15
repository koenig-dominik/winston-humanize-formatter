# Winston humanize formatter

Format winston logging in a human readable format

## Install

`npm install winston-humanize-formatter`

## Usage

You can either use the formatters directly or use one of the presets

``typescript
import { transports, createLogger } from 'winston';
import { presets } from 'winston-humanize-formatter';

createLogger({
  level: 'debug',
  format: presets.cli.dev,
  transports: [
    new transports.Console()
  ]
});
``

### available presets

``typescript
import { presets } from 'winston-humanize-formatter';

presets.cli.dev;
presets.cli.prod;
``

### available formatters

``typescript
import { formatter } from 'winston-humanize-formatter';

formatter.colorize({ keys: string[] });
formatter.join({ keys: string[] });
formatter.multiline({ keys: string[] });
formatter.padLevels({ keys: string[] });
formatter.prettyJson({ excludeKeys: string[], colorize?: boolean, depth?: number });
formatter.stacks({ cleanStackPaths: boolean });
``

## Examples

Preset cli dev
![CLI dev example](/screenshots/example-cli-dev.png?raw=true "CLI dev example")
