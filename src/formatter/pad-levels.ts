import { Format, TransformableInfo } from 'logform';

export interface Options {
  keys: string[];
}

export class PadLevels implements Format {

  private maxLengths = new Map<string, number>();

  constructor(private opts: Options) {}

  transform(info: TransformableInfo): TransformableInfo {
    for (const key of this.opts.keys) {
      if(typeof info[key] !== 'string' && !this.maxLengths.has(key)) {
        continue;
      }

      const value: string = info[key] || '';

      if(!this.maxLengths.has(key)) {
        this.maxLengths.set(key, value.length);
      } else {
        this.maxLengths.set(key, Math.max(value.length, this.maxLengths.get(key) as number));
      }

      info[key] = value.padEnd(this.maxLengths.get(key) as number);
    }

    return info;
  }

}

export const padLevels = (opts: Options): Format => new PadLevels(opts);
