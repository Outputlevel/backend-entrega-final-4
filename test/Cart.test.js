import mongoose from "mongoose";
import Assert from 'assert'
import chai from "chai";

import { Cart } from "../src/dao/mongo/classes/index.js";

mongoose.connect('mongodb+srv://outputlevel10:KnneXOY0gNm7WAjk@cardealer.mkbx3tp.mongodb.net/carDealer?retryWrites=true&w=majority')

const assert = Assert.strict;
const expect = chai.expect

describe('Carts from DAO', ()=> {
    before(function() {
        this.cartDao = new Cart()
        this.mockCart = {
            products: [
                {
                    productId: '6507f1b39d0d417b0a25c486',
                    quantity: 3
                },
                {
                    productId: '65081005e8ccd2bea10833ed',
                    quantity: 2
                }
            ]
        }
    })
    beforeEach(function(){
        this.timeout(5000);
    })
    it('Get all carts', async function() {
        
        const result = await this.cartDao.getCarts();
        //console.log(result);
        expect(Array.isArray(result)).to.be.deep.equal(true) //chai version
        //assert.strictEqual(Array.isArray(result), true); //mocha version
    })
    it('Get cart by ID', async function() {
        const id = '6502398b65c42ccf972ce54b'
        const result = await this.cartDao.getCartById(id);
        //console.log(result);
        expect(typeof result === 'object').to.be.deep.equal(true) //chai version
        //assert.strictEqual(typeof result === 'object', true); //mocha version
        assert.ok(result._id)
    })
    it('Create cart, add vehicles to cart and deletes cart', async function() {
        //create empty cart
        const result = await this.cartDao.createCart();
        //update cart
        const dataUpdate = await this.cartDao.updateCart(result._id, this.mockCart)
        assert.ok(dataUpdate._id)
        //Deletes user after passing test
        await this.cartDao.deleteCartById(dataUpdate._id);
    })
})