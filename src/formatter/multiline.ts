import { Format, TransformableInfo } from 'logform';
import { MESSAGE } from 'triple-beam';

export interface Options {
  keys: string[];
}

const padding = '    ';

export class Multiline implements Format {

  constructor(private opts: Options) {}

  transform(info: TransformableInfo): TransformableInfo {
    const messages = [];
    for (const key of this.opts.keys) {
      if(info[key] === undefined) {
        continue;
      }

      if(info[key] instanceof Array) {
        for (const message of info[key]) {
          messages.push(message);
        }
      } else {
        messages.push(info[key]);
      }
    }

    if(messages.length > 0) {
      const message = messages.join('\n\n').split('\n').join(`\n${padding}`);
      info[MESSAGE] += `\n${padding}${message}\n`;
    }

    return info;
  }

}

export const multiline = (opts: Options): Format => new Multiline(opts);
