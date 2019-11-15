import { Format, TransformableInfo } from 'logform';
import { inspect } from 'util';
import { MESSAGE, SPLAT, LEVEL } from 'triple-beam';

export interface Options {
  excludeKeys: string[];
  depth?: number;
  colorize?: boolean;
}

export const PRETTY_JSON = 'prettyJson';

export class PrettyJson implements Format {

  constructor(private opts: Options) {}

  transform(info: TransformableInfo): TransformableInfo {
    const stripped = {...info};

    delete stripped[MESSAGE];
    delete stripped[LEVEL];
    delete stripped[SPLAT];

    for(const key of this.opts.excludeKeys) {
      delete stripped[key];
    }

    if (Object.keys(stripped).length > 0) {
      info[PRETTY_JSON] = inspect(stripped, false, this.opts.depth || null, this.opts.colorize);
    }

    return info;
  }

}

export const prettyJson = (opts: Options): Format => new PrettyJson(opts);
