import mongoose from "mongoose";
import Assert from 'assert'
import chai from "chai";

import { Product } from "../src/dao/mongo/classes/index.js";

mongoose.connect('mongodb+srv://outputlevel10:KnneXOY0gNm7WAjk@cardealer.mkbx3tp.mongodb.net/carDealer?retryWrites=true&w=majority')

const assert = Assert.strict;
const expect = chai.expect

describe('Products from DAO', ()=> {
    before(function() {
        this.productDao = new Product()
        this.mockProduct = {
            title: 'Toyota Tacoma',
            price: 36000,
            stock: 5,
            description: 'en oferta',
            code: 'coder2023'
        }
    })
    beforeEach(function(){
        this.timeout(5000);
    })
    it('Get all vehicles', async function() {
        
        const result = await this.productDao.getProducts();
        //console.log(result);
        expect(Array.isArray(result)).to.be.deep.equal(true) //chai version
        //assert.strictEqual(Array.isArray(result), true); //mocha version
    })
    it('Get vehicle by ID', async function() {
        const id = '6507f1b39d0d417b0a25c486'
        const result = await this.productDao.getProductById(id);
        //console.log(result);
        expect(typeof result === 'object').to.be.deep.equal(true) //chai version
        //assert.strictEqual(typeof result === 'object', true); //mocha version
        assert.ok(result._id)
    })
    it('Create vehicle', async function() {
        const result = await this.productDao.addProduct(this.mockProduct);
        //console.log(result);
        assert.ok(result._id)
        assert.deepStrictEqual(result.owner, "admin")
        //Deletes user after passing test
        await this.productDao.deleteProductById(result._id);
    })
})