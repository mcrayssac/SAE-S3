const assert = require('assert');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
require("dotenv").config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../server');

const { generateAccessToken, login } = require('../../controllers/authentification_controllers')
const services = require("../../services/authentification_services");

chai.use(chaiHttp);

describe('generateAccessToken', () => {
    it('should generate a valid access token', async () => {
        // Mock user object
        const user = {
            id: 1234,
            email: 'test@example.com',
        };

        // Spy on the jwt.sign method to check if it is called correctly
        const signSpy = sinon.spy(jwt, 'sign');

        // Call the generateAccessToken method
        const token = await generateAccessToken(user);

        // Assert that the jwt.sign method was called with the correct arguments
        assert.ok(signSpy.calledOnceWith(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' }));

        // Assert that the token is not empty
        assert.ok(token);

        // Assert that the token is a string
        assert.strictEqual(typeof token, 'string');

        // Assert that the token can be verified with the secret
        assert.doesNotThrow(() => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET));
    });
});

/*Test que la fonction getUser est appelée avec les bonnes informations d'utilisateur :
créer un faux objet req contenant les informations d'utilisateur nécessaires
créer un espion (spy) pour surveiller l'appel à la fonction services.getUser
appeler la fonction exports.login avec l'objet req
vérifier que services.getUser a été appelé avec les bonnes informations d'utilisateur*/
describe('login', () =>{
    it('test good params getUser', async () =>{

        const req = {
            body:{
                email: 'thibgag@gmail.com',
                password: 'thibgag'
            }
        };

        const signSpy = sinon.spy(services, 'getUser');

        const log = await login(req,{});

        assert.ok(signSpy.calledOnceWith(req.body.email, req.body.password));
    })

    /*Test que la fonction renvoie une réponse 401 si aucun utilisateur n'est trouvé :
        créer un faux objet req contenant des informations d'utilisateur incorrectes
        appeler la fonction exports.login avec l'objet req
        vérifier que la réponse est une réponse 401 avec le message d'erreur approprié*/
    it('user does not exist bad information, login return 401 error', function(done){

        const req = {
            body:{
                email: 'existpas@gmail.com',
                password: 'existpas'
            }
        };

        chai.request(server)
            .post('/login')
            .send({
                body:{
                    email: 'existpas@gmail.com',
                    password: 'existpas'
                }
            })
            .end(function(err, res) {

                // the res object should have a status of 201
                res.should.have.status(401);
                // res.should.be.json;
                // res.body.should.have.property('text');
                // res.body.should.have.property('status');
                // res.body.should.have.property('_id');
                // res.body.text.should.equal('Cook Indomie');
                // res.body.status.should.equal(true);
                done();
            });
    })
})