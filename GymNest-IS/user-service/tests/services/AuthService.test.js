const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const AuthService = require('../../src/services/AuthService');
const Auth = require('../../src/models/Auth');
const User = require('../../src/models/User');

describe('AuthService', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('register', function() {
        it('should register a user successfully', async function() {
            const userData = { username: 'newuser', password: 'password123', email: 'test@test.com' };
            const hashedPassword = 'hashedpassword123';
            const newUser = { id: 1, ...userData, passwordHash: hashedPassword };
            const token = 'jwtToken';
            const refreshToken = 'jwtRefreshToken';

            sandbox.stub(Auth, 'hashPassword').resolves(hashedPassword);
            sandbox.stub(User, 'create').resolves(newUser);
            sandbox.stub(Auth, 'generateToken').returns(token);
            sandbox.stub(Auth, 'generateRefreshToken').returns(refreshToken);

            const result = await AuthService.register(userData);
            expect(result).to.eql({ newUser, token, refreshToken });
        });

        it('should throw an error if registration fails', async function() {
            const userData = { username: 'newuser', password: 'password123', email: 'test@test.com' };
            sandbox.stub(User, 'create').rejects(new Error('Registration failed'));

            await expect(AuthService.register(userData)).to.be.rejectedWith('Služba - Registration failed');
        });
    });

    describe('login', function() {
        it('should throw an error if user not found', async function() {
            sandbox.stub(User, 'findOne').resolves(null);
            await expect(AuthService.login('testuser', 'password123')).to.be.rejectedWith('Služba - User not found');
        });

        it('should throw an error if password is invalid', async function() {
            const user = { id: 1, username: 'testuser', passwordHash: 'hashedpassword123' };
            sandbox.stub(User, 'findOne').resolves(user);
            sandbox.stub(Auth, 'verifyPassword').resolves(false);
            await expect(AuthService.login('testuser', 'password123')).to.be.rejectedWith('Služba - Invalid credentials');
        });
    });

    describe('refreshToken', function() {
        it('should refresh token successfully', async function() {
            const refreshToken = 'validRefreshToken';
            const userData = { id: 1 };
            const user = { id: 1, username: 'testuser' };
            const newToken = 'newJwtToken';

            sandbox.stub(Auth, 'verifyRefreshToken').resolves(userData);
            sandbox.stub(User, 'findByPk').resolves(user);
            sandbox.stub(Auth, 'generateToken').returns(newToken);

            const result = await AuthService.refreshToken(refreshToken);
            expect(result).to.eql({ user, token: newToken });
        });

        it('should throw an error if refresh token is invalid', async function() {
            const refreshToken = 'invalidRefreshToken';
            sandbox.stub(Auth, 'verifyRefreshToken').rejects(new Error('Invalid refresh token'));

            await expect(AuthService.refreshToken(refreshToken)).to.be.rejectedWith('Služba - Invalid refresh token');
        });
    });

    // Další metody, jako validateToken, logout atd., by měly být testovány podobně
});
