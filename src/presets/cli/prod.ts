import { format } from 'winston';
import { formatter } from '../../formatter';
import { STACKS } from '../../formatter/stacks';

const keys = [
  'level',
  'timestamp',
  'label'
];
const MESSAGE = 'message';

export const prod = format.combine(
  format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ'}),
  formatter.stacks({ cleanStackPaths: false }),
  formatter.padLevels({ keys }),
  formatter.join({ keys: [...keys, MESSAGE] }),
  formatter.prettyJson({ excludeKeys: [...keys, STACKS, MESSAGE] }),
  formatter.multiline({ keys: [STACKS] })
);
