import winston from "winston";

//Crea instancia de logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'http'
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warn'
        })
    ]
});

//Funcion middleware de logger
export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);

    next();
}