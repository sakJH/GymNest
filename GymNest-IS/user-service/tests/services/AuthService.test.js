const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const AuthService = require('../../src/services/AuthService');
const Auth = require('../../src/models/Auth');
const User = require('../../src/models/User');

describe('AuthService', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Auth, 'hashPassword').resolves('hashedPassword');
        sandbox.stub(Auth, 'generateToken').returns('fakeToken');
        sandbox.stub(Auth, 'generateRefreshToken').returns('fakeRefreshToken');
        sandbox.stub(Auth, 'verifyPassword').resolves(true);
        sandbox.stub(Auth, 'verifyRefreshToken').resolves({ id: 1 });
        sandbox.stub(Auth, 'verifyToken').resolves({ id: 1 });
        sandbox.stub(User, 'create').resolves({ id: 1, username: 'testUser' });
        sandbox.stub(User, 'findOne').resolves({ id: 1, username: 'testUser', passwordHash: 'hashedPassword' });
        sandbox.stub(User, 'findByPk').resolves({ id: 1, username: 'testUser' });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('register', () => {
        it('should register a user successfully', async () => {
            const userData = { username: 'testUser', password: 'password' };
            const result = await AuthService.register(userData);
            expect(result).to.have.property('newUser');
            expect(result).to.have.property('token', 'fakeToken');
            expect(result).to.have.property('refreshToken', 'fakeRefreshToken');
        });
    });

    describe('login', () => {
        it('should login successfully and return user data and tokens', async () => {
            const result = await AuthService.login('testUser', 'password');
            expect(result).to.have.property('user');
            expect(result.user).to.have.property('username', 'testUser');
            expect(result).to.have.property('token', 'fakeToken');
            expect(result).to.have.property('refreshToken', 'fakeRefreshToken');
        });

        it('should throw an error if password verification fails', async () => {
            Auth.verifyPassword.resolves(false);
            try {
                await AuthService.login('testUser', 'password');
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Služba - Invalid credentials');
            }
        });
    });

    describe('refreshToken', () => {
        it('should refresh token successfully', async () => {
            const result = await AuthService.refreshToken('validRefreshToken');
            expect(result).to.have.property('token', 'fakeToken');
        });
    });

    describe('validateToken', () => {
        it('should validate token successfully', async () => {
            const result = await AuthService.validateToken('someToken');
            expect(result).to.be.ok;
        });
    });

    describe('logout', () => {
        it('should handle logout process', async () => {
            // Assuming `Auth.logout` returns some success message or similar behavior
            Auth.logout.resolves('Logged out successfully');
            const result = await AuthService.logout('testUser');
            expect(result).to.equal('Logged out successfully');
        });
    });

    // Additional tests for other methods like validateGoogleToken, etc.
});
