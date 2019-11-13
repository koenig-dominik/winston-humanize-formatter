import {transports, createLogger} from 'winston';
import {humanize} from '../src';

const logger = createLogger({
  level: 'debug',
  format: humanize,
  transports: [
    new transports.Console()
  ]
});

const categoryLogger = logger.child({ label: 'Category'});

logger.debug('Lorem ipsum');
logger.info('Lorem ipsum');
logger.info('Lorem ipsum', { test: 'Lorem ipsum'});
logger.error('Lorem ipsum');
logger.error('Lorem ipsum', { error: new Error('Lorem ipsum error') });
logger.error(new Error('Lorem ipsum error'));
logger.debug('Lorem ipsum');
categoryLogger.debug('Lorem ipsum');
