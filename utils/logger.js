const winston = require('winston');

const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            json: false,
            timestamp: true,
            colorize: true,
        }),
        new winston.transports.File({
            filename: './logs/debug.log',
            maxsize: 100000000,
            json: true
        })
    ],
    exitOnError: false
});

module.exports = logger;