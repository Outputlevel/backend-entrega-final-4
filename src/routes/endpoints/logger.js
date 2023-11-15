import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    console.log("-----errors----\n")
    req.logger.warning('Alerta!!');
    req.logger.info('Informativo');
    req.logger.fatal('Error!');

    console.log("\n---------------")
    res.send({
        status: 'success',
        message: 'Logger Here!'
    });
});

export default router