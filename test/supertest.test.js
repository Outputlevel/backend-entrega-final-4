import chai from "chai";
import supertest from "supertest";

const expect = chai.expect
const requester = supertest("http://localhost:8080")

let authCookie;
let userId;
let productId

const userMock = {
    first_name: 'Ricardo',
    last_name: 'Martinez',
    email: 'supertest@gmail.com',
    password: '1234'
}

const userMock1 = {
    first_name: 'Ricardo',
    last_name: 'Martinez',
    email: 'rix.mtz@gmail.com',
    password: '1234'
}

describe('Supertest', () => {
    describe('Will create user, cart, add new product. Will delete data afterwards', () => {
        it('Register User', async () => {
            const { statusCode, _body } = await requester.post('/api/sessions/register').send(userMock);
            console.log( _body )
            expect(statusCode).to.equal(200); // Assuming a successful registration returns status code 200
        });
        
        it('Login User and Store Cookie', async () => {
            const { statusCode, body } = await requester.post('/api/sessions/login').send({
                email: userMock.email,
                password: userMock.password
            });
            
            expect(statusCode).to.equal(200); // Assuming successful login returns status code 200
            //expect(body).to.have.property('cookie'); // Assuming the cookie is returned in the response body
            
            // Store the received authentication cookie
            //authCookie = body.headers['set-cookie'];
            userId = body.payload.passport.user
            console.log(userId)
        });

        it('Delete User', async () => {
            const { statusCode } = await requester.delete(`/api/users/${userId}`);
            expect(statusCode).to.equal(200); // Assuming a successful registration returns status code 200
        });

        it('User creates product with stored authentication cookie', async () => {
            const product = {
                title: "Toyota Sequoia",
                description: "en oferta",
                price: "47000",
                code: "coder2024",
                category: "suv",
                thumbnails: null,
                stock: 6
            };

            // Ensure authCookie is defined (user is logged in)
            //expect(authCookie).to.be.a('string').and.not.empty;

            // Make a request with the stored authentication cookie
            //const { statusCode } = await requester.post('/api/products').set('Cookie', authCookie).send(product);
            const { statusCode, body } = await requester.post('/api/products').send(product);
            productId = body.payload._id
            expect(statusCode).to.equal(200); // Assuming product creation returns status code 200
        }); 
        it('Delete product', async () => {
            const { statusCode } = await requester.delete(`/api/products/${productId}`);
            expect(statusCode).to.equal(200); // Assuming a successful registration returns status code 200
        });

        
    });
});

/* describe('Supertest', () => {

    describe('Will create user, cart, add new product. After that, will add product to cart, purchase and delete data afterwards', () => {
        beforeEach(function(){
            this.timeout(5000);
        })
        it('Register User', async ()=> {
            //console.log(userMock)
            const { statusCode, ok, _body } = await requester.post('/api/sessions/register').send(userMock); //will create user, cart and assign it to user   
            expect(statusCode).to.be.ok;
        });
        it('Login User', async ()=> {
            const { statusCode, ok, _body } = await requester.post('/api/sessions/login')
            .send({email: userMock1.email, password: userMock1.password})
            .end((err, res) => {
                if (err) return done(err);
                authCookie = _body.cookie; // Store the received cookie
            })   
            //console.log("aaa",_body);
            //expect(statusCode).to.be.ok;
        });
        it('User creates product', async ()=> {
            const product = {
                title: "Toyota Sequoia",
                description: "en oferta",
                price: "47000",
                code: "coder2024",
                category: "suv",
                thumbnails: null,
                stock: 6
              }
            const { statusCode, ok, _body } = await requester.post('/api/products').set('Cookie', authCookie).send(product) 
        });   
    })      
}) */