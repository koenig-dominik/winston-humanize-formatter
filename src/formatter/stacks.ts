import { Format, TransformableInfo } from 'logform';

export interface Options {
  cleanStackPaths: boolean;
}

export const STACKS = 'stacks';

const workingDirectory = process.env.INIT_CWD as string;

export class Stacks implements Format {

  constructor(private opts: Options) {}

  transform(info: TransformableInfo): TransformableInfo {

    for (const key of Object.keys(info)) {
      if (info[key] instanceof Error) {
        const error: Error = info[key];
        delete info[key];

        if(info[STACKS] === undefined) {
          info[STACKS] = [];
        }

        let stack = error.stack as string;
        if(this.opts.cleanStackPaths) {
          stack = stack.split(workingDirectory).join('.');
        }

        info[STACKS].push(stack);
      }
    }

    return info;
  }

}

export const stacks = (opts: Options): Format => new Stacks(opts);
