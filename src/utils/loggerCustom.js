import winston from 'winston';
import config  from 'dotenv';

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const loggerDev = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple()
        })        
    ]
});

const loggerProd = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            filename: './errors.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
        
    ]
});



export const addLogger = (req, res, next) => {
    //req.logger = process.env.ENV === 'prod' ? loggerProd : loggerDev;
    req.logger  = loggerDev
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);

    next();
}