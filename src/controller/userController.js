import {UserService} from '../sevices/userService.js'
import passport from 'passport';
import { Cart } from '../sevices/cartService.js';

const US = new UserService();
const cart = new Cart()


const responseError = {
    status: 'error',
    error: 'Something went wrong, try again later'
};
// get users
export const getUsers = async (req, res) => {
    const result = await US.getUsers()
    res.send({
        status: 'success',
        message: 'Success',
        payload: result
    });
};


//github-login
export const githubLogin = (req, res) => {
    res.send({
        status: 'success',
        message: 'Success'
    });
};

export const githubCallback = (req, res) => {
    req.session.user = req.user;
    res.redirect('/views');
};
//Local

export const login = async (req, res) => {
    try{
        if (!req.user) {
            req.session.loginFailed = true;
            //res.redirect("/views/login");
            return res.status(400).send({status: "error", error: "Invalid credentials"});
        }
        req.session.user = {
            userId: req.user._id,
            username: req.user.username,
            name: req.user.name,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cart: req.user.cart
        }
        req.session.loginFailed = false;
        res.send({
            status: 200,
            message: 'Session found',
            payload: req.session
        });
        /* res.on('finish', ()=> {
            //redirect to /views
            res.redirect("/views/login");
        }) */ 
    }catch(e) {
    console.log(e)
    return res.send(e.message)
    }   
}

export const register = (req, res) => {
    res.redirect(200, "/views/login"); 
}
export const failLogin =(req, res) => {
    req.session.loginFailed = true;
    console.log('/failLogin, Invalid Credentials');
    res.redirect("/views/login");
}

export const failRegister = (req, res) => {
    req.session.registerFailed = true;
    console.log('Usuario no registrado');
    res.redirect("/views/register")
}

export const current = async (req, res) => {
    try{
        console.log("holaaa", req.user.session)
        //req.session.loginFailed = false;
        return res.send({
            status: 200,
            message: 'Session found',
            payload: req.cookie
        });
    }catch(e) {
    console.log(e)
    return res.send(e.message)
    }   
}

export const deleteUser = async (req, res) => {
    try{
        const idParam = req.params.uid;
        const user = await US.findUser(idParam)
        const cartDeleted = await cart.deleteCartById(user.cart)
        if(!cartDeleted){
            return res.status(400).send({status: "error", error: "cart not found"});
        }
        const userDeleted =  await US.deleteUser(user._id)
        if(!userDeleted){
            return res.status(400).send({status: "error", error: "user not found"});
        }
        return res.send({
            status: 200,
            message: 'User and cart deleted',
            payload: user
        });

    
    }catch(e) {
    console.log(e)
    return res.send(e.message)
    }   
}

///
/* export const getBussinessById = async (req, res) => {
    const { bid } = req.params;
    const result = await businessService.getBusinessById(bid);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

export const createBusiness = async (req, res) => {
    const business = req.body; //Tarea: validar los campos
    const result = await businessService.saveBusiness(business);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

export const addProduct = async (req, res) => {
    const product = req.body; //Tarea: validar los campos
    const business = await businessService.getBusinessById(req.params.bid);

    if (!business) return res.status(500).send(responseError);
    business.products.push(product);
    const result = await businessService.updateBusiness(business._id, business);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result: 'Business Updated!'});
} */

export const logout = (req, res) => {
    req.session.destroy( error => {
        if (!error) res.redirect(200, "/views/login");
        else res.send({status: 'Logout ERROR', body: error});
    });
}
