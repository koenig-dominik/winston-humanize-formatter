import {transports, createLogger} from 'winston';
import {presets} from '../src';

const logger = createLogger({
  level: 'debug',
  format: presets.cli.dev,
  transports: [
    new transports.Console()
  ]
});

const categoryLogger = logger.child({ label: 'Category'});

logger.debug('Standalone');
logger.info('Stanalone');
logger.debug('With meta', { meta1: 'Test meta 1', meta2: 'Test meta 2', nestedMeta: { meta1: 'Test meta 1', meta2: 'Test meta 2' }, number: 5, boolean: true });
logger.error('No stack');
logger.error('Single stack', { error: new Error('Meta stack') });
logger.error('With multiple stacks', { error: new Error('Meta stack 1'), error2: new Error('Meta stack 2') });
categoryLogger.debug('With category');
logger.debug('Should be indented');
