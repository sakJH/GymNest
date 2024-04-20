const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const User = require('../../src/models/User');
const UserService = require('../../src/services/UserService');

describe('UserService', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('findUserByUsername', function() {
        it('should return a user if found', async function() {
            const mockUser = { id: 1, username: 'testUser' };
            sandbox.stub(User, 'findUserByUsername').resolves(mockUser);

            const user = await UserService.findUserByUsername('testUser');
            expect(user).to.equal(mockUser);
        });

        it('should throw an error if the user is not found', async function() {
            sandbox.stub(User, 'findUserByUsername').rejects(new Error('User not found'));

            await expect(UserService.findUserByUsername('nonexistent')).to.be.rejectedWith('User not found');
        });
    });

    describe('deleteUserByUsername', function() {
        it('should return true if the user was successfully deleted', async function() {
            sandbox.stub(User, 'deleteUserByUsername').resolves(true);

            const result = await UserService.deleteUserByUsername('testUser');
            expect(result).to.be.true;
        });

        it('should throw an error if the delete operation fails', async function() {
            sandbox.stub(User, 'deleteUserByUsername').rejects(new Error('Error deleting user'));

            await expect(UserService.deleteUserByUsername('testUser')).to.be.rejectedWith('Error deleting user');
        });
    });

    describe('updateUserByUsername', function() {
        it('should return updated user data if the update is successful', async function() {
            const updatedUserData = { username: 'updatedUser' };
            sandbox.stub(User, 'updateUserByUsername').resolves(updatedUserData);

            const result = await UserService.updateUserByUsername('testUser', updatedUserData);
            expect(result).to.equal(updatedUserData);
        });

        it('should throw an error if the update fails', async function() {
            sandbox.stub(User, 'updateUserByUsername').rejects(new Error('Error updating user'));

            await expect(UserService.updateUserByUsername('testUser', {})).to.be.rejectedWith('Error updating user');
        });
    });
});
