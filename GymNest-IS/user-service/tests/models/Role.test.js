const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Role = require('../../src/models/Role');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Role', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Role, 'init').callsFake((attributes, options) => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAllRoles', function () {
        it('should retrieve all roles', async function () {
            const mockRoles = [
                { roleName: 'user' },
                { roleName: 'member' },
                { roleName: 'coach' },
                { roleName: 'admin' }
            ];
            sandbox.stub(Role, 'findAll').resolves(mockRoles);

            const result = await Role.getAllRoles();
            expect(Role.findAll.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockRoles);
        });

        it('should handle errors when retrieving roles', async function () {
            sandbox.stub(Role, 'findAll').rejects(new Error('Database error'));

            await expect(Role.getAllRoles()).to.be.rejectedWith('Database error');
        });
    });

    describe('findUsersByRole', function () {
        it('should find users by role', async function () {
            const mockUsers = [{ id: 1, username: 'testUser' }];
            sandbox.stub(Role, 'findAll').resolves(mockUsers);

            const result = await Role.findUsersByRole('coach');
            expect(Role.findAll.calledWith({ where: { roleName: 'coach' } })).to.be.true;
            expect(result).to.deep.equal(mockUsers);
        });

        it('should handle errors when finding users by role', async function () {
            sandbox.stub(Role, 'findAll').rejects(new Error('Database error'));

            await expect(Role.findUsersByRole('coach')).to.be.rejectedWith('Database error');
        });
    });

    describe('setDefaultRole', function () {
        it('should set the default role for a user', async function () {
            const mockUser = { id: 1, username: 'testUser', roleId: null, save: sinon.stub().resolves() };
            sandbox.stub(Role, 'findOne').resolves(mockUser);

            const result = await Role.setDefaultRole(1);
            expect(Role.findOne.calledWith({ where: { id: 1 } })).to.be.true;
            expect(mockUser.save.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockUser);
        });

        it('should throw an error if user is not found', async function () {
            sandbox.stub(Role, 'findOne').resolves(null);

            await expect(Role.setDefaultRole(1)).to.be.rejectedWith('Uživatel s ID 1 nebyl nalezen.');
        });
    });

    // Implement similar tests for removeRoleToUser
});
