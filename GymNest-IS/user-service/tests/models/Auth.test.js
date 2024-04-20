const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const Auth = require('../../src/models/Auth');
const {resolve} = require("node:path");

process.env.JWT_SECRET = 'GymNestUserServiceSecretPassWordForJWT';
process.env.JWT_REFRESH_SECRET = 'GymNestUserServiceRefreshSecretPassWordForJWT';

describe('Auth Model', () => {

    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('hashPassword', () => {
        it('should hash a password using bcrypt', async () => {
            const password = 'testPassword';
            const hashed = 'hashedPassword';

            sandbox.stub(bcrypt, 'hash').resolves(hashed);
            const result = await Auth.hashPassword(password);

            expect(result).to.equal(hashed);
            expect(bcrypt.hash.calledWith(password, 10)).to.be.true;
        });
    });

    describe('verifyPassword', () => {
        it('should verify a password against a hash', async () => {
            const password = 'testPassword';
            const hash = 'hashedPassword';

            sandbox.stub(bcrypt, 'compare').resolves(true);
            const result = await Auth.verifyPassword(password, hash);

            expect(result).to.be.true;
            expect(bcrypt.compare.calledWith(password, hash)).to.be.true;
        });
    });

    describe('generateToken', () => {
        it('should generate a JWT for a user', () => {
            const user = {
                id: 1,
                username: "testUser",
                passwordHash: "hashedPassword",
                email: "email@test.com"
            };
            const token = 'jwt.token.here';

            sandbox.stub(jwt, 'sign').returns(token);
            const result = Auth.generateToken(user);

            expect(result).to.equal(token);
            expect(jwt.sign.calledWith({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' })).to.be.true;
        });
    });

    describe('verifyToken', () => {
        it('should verify a JWT token', async () => {
            const token = 'jwt.token.here';

            sandbox.stub(jwt, 'verify').returns({ id: 1 });
            const result = await Auth.verifyToken(token);

            expect(result).to.eql({ id: 1 });
            expect(jwt.verify.calledWith(token, process.env.JWT_SECRET)).to.be.true;
        });

        it('should handle errors during token verification', async () => {
            const token = 'invalid.token';

            sandbox.stub(jwt, 'verify').throws(new Error('Invalid token'));
            const result = await Auth.verifyToken(token);

            expect(result).to.be.null;
        });
    });

    // Similar structure for verifyRefreshToken, verifyGoogleToken, and logout tests
});
