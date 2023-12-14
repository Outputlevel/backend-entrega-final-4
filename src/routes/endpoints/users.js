import {Router} from 'express';
import passport from 'passport';
import {getUsers, deleteUser} from '../../controller/userController.js'

const router = Router();

//-------------Pssport Strategy in config folder-------------//
//github-login
router.get("/", getUsers);

router.delete("/:uid", deleteUser);


export default router;