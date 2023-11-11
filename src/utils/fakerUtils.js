import {fakerDE as faker} from '@faker-js/faker'

faker.location = 'en_US'
let products = [];
/*
//----Estructura-------// 
Crear usuario, crear carrito, crear productos. Carrito se conecta a usuario. Productos se conectan a carrito
*/

//get random age
function getAge(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Random user 'role'
let role = ['user', 'admin']
let roleIndex = Math.floor(Math.random() * role.length ); 
let userRole = role[roleIndex];

export const generateUser = () => {
    let numOfProducts = faker.number.int({min: 1, max: 7});
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct());
    }
    let cart = generateCart()
    cart.products = products

    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        age: getAge(18,68),
        role: userRole,
        image: faker.internet.avatar(),
        email: faker.internet.email(),
        cart,
    }
}

export const generateCart = () => {
    return {
        id: faker.database.mongodbObjectId(),
        products
    }
}

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.number.int({min: 0, max: 100}),
        image: faker.image.url()
    }
}