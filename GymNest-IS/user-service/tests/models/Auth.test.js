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
});
