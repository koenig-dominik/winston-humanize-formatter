import { Format, TransformableInfo } from 'logform';

export const STACKS = 'stacks';

export class Stacks implements Format {

  transform(info: TransformableInfo): TransformableInfo {

    for (const key of Object.keys(info)) {
      if (info[key] instanceof Error) {
        const error: Error = info[key];
        delete info[key];

        if(info[STACKS] === undefined) {
          info[STACKS] = [];
        }

        info[STACKS].push(error.stack);
      }
    }

    return info;
  }

}

export const stacks = (): Format => new Stacks();
