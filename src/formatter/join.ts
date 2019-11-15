import { Format, TransformableInfo } from 'logform';
import { MESSAGE } from 'triple-beam';

export interface Options {
  keys: string[];
}

export class Join implements Format {

  private validKeys = new Set();

  constructor(private opts: Options) {}

  transform(info: TransformableInfo): TransformableInfo {
    const messages = [];
    for (const key of this.opts.keys) {
      if(!this.validKeys.has(key) && !info[key]) {
        continue;
      }

      this.validKeys.add(key);
      messages.push(info[key]);
    }

    info[MESSAGE] = messages.join(' | ');

    return info;
  }

}

export const join = (opts: Options): Format => new Join(opts);
