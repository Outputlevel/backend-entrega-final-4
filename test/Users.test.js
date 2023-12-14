import mongoose from "mongoose";
import Assert from 'assert'
import chai from "chai";

import { User } from "../src/dao/mongo/classes/userDAO.js";

mongoose.connect('mongodb+srv://outputlevel10:KnneXOY0gNm7WAjk@cardealer.mkbx3tp.mongodb.net/carDealer?retryWrites=true&w=majority')

const assert = Assert.strict;
const expect = chai.expect

describe('Users from DAO', ()=> {
    before(function() {
        this.userDao = new User()
        this.mockUser = {
            first_name: 'Ricardo',
            last_name: 'Martinez',
            email: 'r.martinez@test.com',
            password: '1234'
        }
    })
    beforeEach(function(){
        this.timeout(5000);
    })
    it('Get all users', async function() {
        
        const result = await this.userDao.getUsers();
        //console.log(result);
        expect(Array.isArray(result)).to.be.deep.equal(true) //chai version
        //assert.strictEqual(Array.isArray(result), true); //mocha version
    })
    it('Get user by ID', async function() {
        const id = '6512674fe6b1805f0f0de9e0'
        const result = await this.userDao.findUser(id);
        //console.log(result);
        expect(typeof result === 'object').to.be.deep.equal(true) //chai version
        //assert.strictEqual(typeof result === 'object', true); //mocha version
        assert.ok(result._id)
    })
    it('Create new User', async function() {
        const result = await this.userDao.createUser(this.mockUser);
        //console.log(result);
        assert.ok(result._id)
        assert.deepStrictEqual(result.cart, null)
        //Deletes user after passing test
        await this.userDao.deleteUser(result._id);
    })
})