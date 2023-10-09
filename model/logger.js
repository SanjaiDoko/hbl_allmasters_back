const { createLogger,format,transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}

const filename = path.join(logDir,'result.log');

const logger = caller => { 
    return createLogger({
            level: env === 'development' ? 'debug' : 'info',
            format : format.combine(
                format.label({ label: path.basename(caller) }),
                format.colorize(),
                format.timestamp({
                    format : 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
            ),
            transports : [
                new transports.Console({
                    level : 'info',
                    format: format.combine(
                        format.label({ label: path.basename(caller) }),
                        format.colorize(),
                        format.printf(
                        info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                        )
                    )
                }),
                new transports.File({filename})
            ]
        });
    };


module.exports = logger;
