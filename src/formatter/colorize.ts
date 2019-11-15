import { Format, TransformableInfo, format } from 'logform';
import { LEVEL, MESSAGE } from 'triple-beam';

export interface Options {
  keys: string[];
}

export class Colorizer implements Format {

  private borrowedColorize = format.colorize();

  constructor(private opts: Options) {

  }

  private getColorizer(levelInfo: { [key: string]: string }) {
    return (message: string): string => {
      levelInfo[MESSAGE] = message;
      levelInfo = this.borrowedColorize.transform(levelInfo as TransformableInfo, { all: true }) as TransformableInfo;
      return levelInfo[MESSAGE];
    }
  }

  transform(info: TransformableInfo): TransformableInfo {

    const levelInfo: { [key: string]: string } = {};
    levelInfo[LEVEL] = info[LEVEL];

    const colorize = this.getColorizer(levelInfo);

    for (const key of this.opts.keys) {
      if(info[key] instanceof Array) {
        (info[key] as string[]).forEach((message, index) => {
          if(typeof message !== 'string') {
            return;
          }
          info[key][index] = colorize(message);
        });
      } else {
        if(typeof info[key] !== 'string') {
          continue;
        }

        info[key] = colorize(info[key]);
      }
    }

    return info;
  }

}

export const colorize = (opts: Options): Format => new Colorizer(opts);
