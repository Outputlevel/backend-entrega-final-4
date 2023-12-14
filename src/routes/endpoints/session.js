import {Router} from 'express';
import passport from 'passport';
import {githubLogin, githubCallback, login, register, failLogin, failRegister, logout, current} from '../../controller/userController.js'
import { logged } from '../../middlewares/auth.js';

const router = Router();

//-------------Pssport Strategy in config folder-------------//
//github-login
router.get("/github", passport.authenticate('github', {scope: ['user:email']}), githubLogin);

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/login'}), githubCallback);
//Local
router.post("/login",  passport.authenticate('login',{failureRedirect: '/api/sessions/failLogin'}),login, logged);
router.post("/register", passport.authenticate('register',{failureRedirect: '/api/sessions/failRegister'}), register);

//------------------------------------------------------------//

//Local-Fail
router.get("/failLogin", failLogin);
router.get("/failRegister", failRegister);
//Logout
router.get("/logout", logout );

router.get("/current", current)

export default router;