const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const nock = require('nock');

const AuthController = require('../../src/controllers/AuthController');
const AuthService = require('../../src/services/AuthService');
const User = require('../../src/models/User');
const Auth = require('../../src/models/Auth');

describe('AuthController', function() {
    let req, res, sandbox, statusStub, jsonStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            body: {},
            headers: {},
            logout: sandbox.spy()
        };
        statusStub = sandbox.stub();
        jsonStub = sandbox.stub();
        res = {
            status: statusStub,
            json: jsonStub,
            send: sandbox.stub(),
            redirect: sandbox.stub()
        };
        statusStub.returns(res);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('register', function() {
        it('should register user successfully', async function() {
            const userData = { username: 'testUser', password: 'testPass' };
            const newUser = { id: 1, username: 'testUser' };
            const token = 'jwtToken';
            const refreshToken = 'jwtRefreshToken';

            sandbox.stub(AuthService, 'register').resolves({ newUser, token, refreshToken });

            req.body = userData;
            await AuthController.register(req, res);

            expect(statusStub.calledWith(201)).to.be.true;
            expect(jsonStub.calledWith({
                message: 'User successfully registered',
                user: newUser,
                token,
                refreshToken
            })).to.be.true;
        });

        it('should handle errors during registration', async function() {
            const error = new Error('Registration failed');
            sandbox.stub(AuthService, 'register').rejects(error);

            req.body = { username: 'testUser', password: 'testPass' };
            await AuthController.register(req, res);

            expect(statusStub.calledWith(500)).to.be.true;
            expect(jsonStub.calledWith({
                message: 'Failed to register user'
            })).to.be.false;
        });
    });

    describe('login', function() {
        it('should login user successfully', async function() {
            const userCredentials = { username: 'testUser', password: 'testPass' };
            const user = { id: 1, username: 'testUser' };
            const token = 'jwtToken';
            const refreshToken = 'jwtRefreshToken';

            sandbox.stub(AuthService, 'login').resolves({ user, token, refreshToken });

            req.body = userCredentials;
            await AuthController.login(req, res);

            expect(statusStub.calledWith(200)).to.be.true;
            expect(jsonStub.calledWith({
                message: 'User successfully logged in',
                user,
                token,
                refreshToken
            })).to.be.true;
        });

        it('should handle login errors', async function() {
            const error = new Error('Login failed');
            sandbox.stub(AuthService, 'login').rejects(error);

            req.body = { username: 'wrongUser', password: 'wrongPass' };
            await AuthController.login(req, res);

            expect(statusStub.calledWith(401)).to.be.true;
            expect(jsonStub.calledWith({
                message: 'Login failed'
            })).to.be.true;
        });
    });

});
