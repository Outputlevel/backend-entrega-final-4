import ErrorCodes from "./enums.js";

export default (error, req, res, next) => {
    console.log(error.cause);

    switch (error.code) {
        case 2:
            res.status(400).send({status: 'error', error: error.name});
            break;
        case ErrorCodes.INVALID_PARAM:
            res.status(400).send({status: 'error', error: error.name});
            break;
        default:
            res.status(500).send({status: 'error', error: 'Unhandled error'});
    }
}