const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { DataTypes } = require('sequelize');
const sequelize = require('../../src/sequelize');
const User = require('../../src/models/User');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(User, 'init').callsFake((attributes, options) => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('findUserByUsername', function () {
        it('should find a user by username', async function () {
            const mockUser = { id: 1, username: 'testUser', email: 'test@example.com' };
            sandbox.stub(User, 'findOne').resolves(mockUser);

            const result = await User.findUserByUsername('testUser');
            expect(User.findOne.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockUser);
        });

        it('should throw an error if user not found', async function () {
            sandbox.stub(User, 'findOne').resolves(null);

            await expect(User.findUserByUsername('nonexistent')).to.be.rejectedWith('Error finding user by username:');
        });
    });

    describe('deleteUserByUsername', function () {
        it('should delete a user by username', async function () {
            sandbox.stub(User, 'destroy').resolves(1);

            const result = await User.deleteUserByUsername('testUser');
            expect(User.destroy.calledOnce).to.be.true;
            expect(result).to.be.true;
        });

        it('should throw an error if no user is deleted', async function () {
            sandbox.stub(User, 'destroy').resolves(0);

            await expect(User.deleteUserByUsername('nonexistentUser')).to.be.rejectedWith('Uživatel s uživatelským jménem "nonexistentUser" nebyl nalezen.');
        });
    });
});
