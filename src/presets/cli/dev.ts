import { format } from 'winston';
import { formatter } from '../../formatter';
import { STACKS } from '../../formatter/stacks';
import { PRETTY_JSON } from '../../formatter/pretty-json';

const keys = [
  'level',
  'label',
  'message'
];

export const dev = format.combine(
  formatter.stacks({ cleanStackPaths: true }),
  formatter.padLevels({ keys }),
  formatter.colorize({ keys: [...keys, STACKS] }),
  formatter.join({ keys }),
  formatter.prettyJson({ excludeKeys: [...keys, STACKS], colorize: true }),
  formatter.multiline({ keys: [STACKS, PRETTY_JSON] })
);
