import { Product } from '../sevices/productService.js'
import {Response} from '../routes/response.js'
import { generateUser } from '../utils/fakerUtils.js'
import CustomError from '../middlewares/errors/CustomError.js'
import ErrorCodes from '../middlewares/errors/enums.js'
import { generateProductErrorInfo } from '../middlewares/errors/info.js'
//Da de alta mi constructor

const data = new Product()
let response = {}
let arrProps = {}
let code = 200
let results = {}

//Gett all products
export const getProducts = async (req, res) => {
    try {
        
        const limit = Number(req.query.limit);
        const page = Number(req.query.page)
        const startIndex = ((page) - 1)*limit
        const endIndex = page * limit
        const vehicles = await data.getProducts()
        

        //pagination
        if(endIndex < vehicles.length){
            results.next =  { page: page + 1, limit: limit }
        }
        if(startIndex > 0){
            results.previous =  { page: page - 1, limit: limit }
        }
        //operacion
        results.data = vehicles.slice(startIndex, endIndex)

        
        if (!limit || !page) {
            response = new Response(code, "success", vehicles )
            return res.status(code).send(response);
        }
        //Trae objetos por numero de limite
        response = new Response(code, `success`, results )
        return res.status(code).send(response);
    } catch (err) {
        console.error(err)
        return []
    }
};

//Search products
export const searchProducts =  async (req, res) => {
    try {
        const itemParams = req.query;
        delete itemParams.page; delete itemParams.limit;
        const page = req.query.page || 0;
        const itemsPerPage = 2
        const limit = req.query.limit

        console.log(itemParams)
        if (!itemParams) {
            throw new Error('Insert filter param');
        }
        const vehicles = await data.searchProducts(itemParams)
        if(vehicles.length >= 1){
            response = new Response(code, "Product Found", vehicles )
            return res.status(code).send(response);
        }
        return res.status(403).send("Producto No Encontrado");
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
};

//Trae vehiculos por Id
export const getProductById =  async (req, res) => {
    try{
        const idParam = req.params.idVehicle;
        const filteredById = await data.getProductById(idParam)
        if(filteredById){
            response = new Response(code, "Product Found", filteredById )
            return res.status(code).send(response);
        }
        return res.status(403).send("Producto No Encontrado");
    } catch (err) {
        console.error(err)
        return []
    } 
};
//Agrega nuevo vehiculo
export const addProduct = async (req, res) => {
    try{
        console.log("11", req.session)
        const productData = {
           title: req.body.title,
           description: req.body.description ?? 'No description',
           price: req.body.price ?? "No price",
           code: req.body.code ?? "No code",
           category: req.body.category ?? "No category",
           thumbnails: req.body.thumbnails ?? null,
           stock: req.body.stock ?? "No stock",
           carts: []
        }
        if(!productData.title){
            CustomError.createError({
                name: 'Product creation error',
                cause: generateProductErrorInfo(productData),
                message: 'Error trying to create Product',
                code: ErrorCodes.INVALID_TYPES_ERROR
            });
        }
        if(productData.code ==='No code'){
            return res.status(403).send("Producto No Creado, prueba con otro codigo");
        }
        const createProduct = await data.addProduct(productData)
        if(createProduct){
            response = new Response(code, "Product added", createProduct )
            return res.status(code).send(response);
        }
    }catch(err) {
        console.error(err)
        return []
    }       
};
//Actualiza vehiculo
export const updateVehicle = async (req, res) => {
    try {
        //Encuentra vehiculo por id
        const idParam = req.params.idVehicle;
        const getVehicle = await data.getProductById(idParam)
        const productData = {
          title: req.body.title ?? getVehicle.title,
          description: req.body.description ?? getVehicle.description,
          price: req.body.price ?? getVehicle.price,
          //code: req.body.code ?? getVehicle.code,
          category: req.body.category ?? getVehicle.category,
          thumbnails: req.body.thumbnails ?? getVehicle.thumbnails,
          stock: req.body.stock ?? getVehicle.stock
        }
        const updatedProduct = await data.updateProduct(getVehicle.id, productData)
            if(updatedProduct) {
                response = new Response(code, "success", updatedProduct )
                return res.status(code).send(response);
            }
            return res.status(404).send("Producto NO Encontrado");
    } catch (err) {
        console.error(err)
        return []
    } 
    
};

//Elimina vehiculo por Id
export const deleteVehicleById = async (req, res) => {
    try{
        const idParam = req.params.idVehicle;
        const deleteProduct = await data.deleteProductById(idParam)
        response = new Response(code, "Product Deleted", deleteProduct )
        return res.status(code).send(response);
    } catch (err) {
        console.error(err)
        return []
    } 
};
///Realtime Products
export const realtimeProducts =  async (req, res) => {
    try {
        const limit = req.query.limit;
        const vehicles = await data.getProducts()
        if (!limit) {
            response = new Response(code, "Products Found", vehicles )
            return res.status(code).send(response);
        }
        //Trae objetos por numero de limite
        const arrLimit = vehicles.splice(0, limit);
        response = new Response(code, "Products Found", arrLimit )
        return res.status(code).send(response);
    } catch (err) {
        console.error(err)
        return []
    }
};

//Mocking products
export const mockingProducts = async (req, res) =>{
    const users = [];

    for (let i = 0; i < 50; i++) {
        users.push(generateUser());
    }

    res.send({
        status: 'success',
        payload: users
    });
}