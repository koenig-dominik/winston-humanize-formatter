import { format } from 'winston';

export const humanize = format.combine(
  format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ'}),
  format.colorize({
    all: true
  }),
  format.errors({ stack: true }),
  format.printf((info) => {
    const {timestamp, label, level, message, stack} = info;
    delete info.timestamp;
    delete info.label;
    delete info.level;
    delete info.message;
    delete info.stack;

    return `${timestamp} | ${label} | ${level} | ${message} | ${JSON.stringify(info)}\n${stack}`;
  }),
);
