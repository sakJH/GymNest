const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const UserController = require('../../src/controllers/UserController');
const UserService = require('../../src/services/UserService');

describe('UserController', function() {
    let req, res, sandbox, statusStub, jsonStub, sendStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            params: {},
            body: {}
        };
        jsonStub = sandbox.stub();
        sendStub = sandbox.stub();
        statusStub = sandbox.stub();
        res = {
            json: jsonStub,
            send: sendStub,
            status: statusStub
        };
        statusStub.returns(res);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('findUserByUsername', function() {
        it('should return user if found', async function() {
            const user = { username: 'testUser', email: 'test@test.com' };
            sandbox.stub(UserService, 'findUserByUsername').resolves(user);

            req.params.username = 'testUser';
            await UserController.findUserByUsername(req, res);

            expect(statusStub.calledWith(200)).to.be.false; // not explicitly called, default 200 assumed
            expect(jsonStub.calledWith(user)).to.be.true;
        });

        it('should return 404 if no user found', async function() {
            sandbox.stub(UserService, 'findUserByUsername').resolves(null);

            req.params.username = 'unknownUser';
            await UserController.findUserByUsername(req, res);

            expect(statusStub.calledWith(404)).to.be.true;
            expect(sendStub.calledWith('Uživatel nebyl nalezen.')).to.be.true;
        });

        it('should handle errors', async function() {
            const error = new Error('Server error');
            sandbox.stub(UserService, 'findUserByUsername').rejects(error);

            req.params.username = 'testUser';
            await UserController.findUserByUsername(req, res);

            expect(statusStub.calledWith(500)).to.be.true;
            expect(sendStub.calledWith(error.message)).to.be.true;
        });
    });

    describe('deleteUserByUsername', function() {
        it('should delete user and respond successfully', async function() {
            sandbox.stub(UserService, 'deleteUserByUsername').resolves();

            req.params.username = 'testUser';
            await UserController.deleteUserByUsername(req, res);

            expect(statusStub.calledWith(200)).to.be.true;
            expect(sendStub.calledWith('Uživatel byl úspěšně odstraněn.')).to.be.true;
        });

        it('should handle errors during deletion', async function() {
            const error = new Error('Failed to delete user');
            sandbox.stub(UserService, 'deleteUserByUsername').rejects(error);

            req.params.username = 'testUser';
            await UserController.deleteUserByUsername(req, res);

            expect(statusStub.calledWith(500)).to.be.true;
            expect(sendStub.calledWith(error.message)).to.be.true;
        });
    });

});

