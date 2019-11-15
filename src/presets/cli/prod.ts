import { format } from 'winston';
import { formatter } from '../../formatter';
import { STACKS } from '../../formatter/stacks';

const keys = [
  'level',
  'timestamp',
  'label',
  'message'
];

export const prod = format.combine(
  format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ'}),
  formatter.stacks({ cleanStackPaths: false }),
  formatter.padLevels({ keys }),
  formatter.join({ keys }),
  formatter.prettyJson({ excludeKeys: [...keys, STACKS] }),
  formatter.multiline({ keys: [STACKS] })
);
