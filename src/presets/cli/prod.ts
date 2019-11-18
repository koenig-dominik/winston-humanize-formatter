import { format } from 'winston';
import { formatter } from '../../formatter';
import { STACKS } from '../../formatter/stacks';
import { MESSAGE } from 'triple-beam';

const keys = [
  'level',
  'timestamp',
  'label'
];

export const prod = format.combine(
  format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ'}),
  formatter.stacks({ cleanStackPaths: false }),
  formatter.padLevels({ keys }),
  formatter.join({ keys: [...keys, MESSAGE] }),
  formatter.prettyJson({ excludeKeys: [...keys, STACKS, MESSAGE] }),
  formatter.multiline({ keys: [STACKS] })
);
