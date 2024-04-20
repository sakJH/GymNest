const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
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

            await expect(User.findUserByUsername('nonexistent')).to.be.rejectedWith('Error finding user by username: Uživatel s uživatelským jménem "nonexistent" nebyl nalezen.');
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

    describe('findUserByEmail', function () {
        it('should find a user by email', async function () {
            const mockUser = { id: 1, username: 'testUser', email: 'test@example.com' };
            sandbox.stub(User, 'findOne').resolves(mockUser);

            const result = await User.findUserByEmail('test@example.com');
            expect(User.findOne.calledWith({ where: { email: 'test@example.com' } })).to.be.true;
            expect(result).to.deep.equal(mockUser);
        });

        it('should throw an error if user not found', async function () {
            sandbox.stub(User, 'findOne').resolves(null);

            await expect(User.findUserByEmail('missing@example.com')).to.be.rejectedWith('Error finding user by email: Uživatel s emailem "missing@example.com" nebyl nalezen.');
        });
    });

        describe('updateUserByUsername', function () {
            it('should update a user', async function () {
                const mockUser = {
                    update: sinon.stub().resolves()
                };
                sandbox.stub(User, 'findOne').resolves(mockUser);

                const updateData = { email: 'updated@example.com' };
                const result = await User.updateUserByUsername('testUser', updateData);

                expect(User.findOne.calledWith({ where: { username: 'testUser' } })).to.be.true;
                expect(mockUser.update.calledWith(updateData)).to.be.true;
                expect(result).to.equal(mockUser);
            });

            it('should throw an error if the user does not exist', async function () {
                sandbox.stub(User, 'findOne').resolves(null);

                await expect(User.updateUserByUsername('nonexistentUser', {})).to.be.rejectedWith('Uživatel s uživatelským jménem "nonexistentUser" nebyl nalezen.');
            });
        });

        describe('getAllUsers', function () {
            it('should retrieve all users', async function () {
                const mockUsers = [{ username: 'testUser1' }, { username: 'testUser2' }];
                sandbox.stub(User, 'findAll').resolves(mockUsers);

                const result = await User.getAllUsers();
                expect(User.findAll.calledOnce).to.be.true;
                expect(result).to.deep.equal(mockUsers);
            });
        });

        describe('updatePreferences', function () {
            it('should update user preferences', async function () {
                const mockUser = {
                    update: sinon.stub().resolves()
                };
                sandbox.stub(User, 'findByPk').resolves(mockUser);
                const preferences = { colorScheme: 'dark' };

                const result = await User.updatePreferences(1, preferences);
                expect(User.findByPk.calledWith(1)).to.be.true;
                expect(mockUser.update.calledWith(preferences)).to.be.true;
                expect(result).to.equal(mockUser);
            });

            it('should throw an error if user for updating preferences does not exist', async function () {
                sandbox.stub(User, 'findByPk').resolves(null);

                await expect(User.updatePreferences(999, {})).to.be.rejectedWith('User not found');
            });
        });

        describe('resetPreferencesToDefault', function () {
            it('should reset user preferences to default', async function () {
                const mockUser = {
                    update: sinon.stub().resolves()
                };
                sandbox.stub(User, 'findByPk').resolves(mockUser);

                const result = await User.resetPreferencesToDefault(1);
                expect(User.findByPk.calledWith(1)).to.be.true;
                expect(mockUser.update.calledWith({
                    preferredCurrency: 'CZK',
                    colorScheme: 'light'
                })).to.be.true;
                expect(result).to.equal(mockUser);
            });

            it('should throw an error if user for resetting preferences does not exist', async function () {
                sandbox.stub(User, 'findByPk').resolves(null);

                await expect(User.resetPreferencesToDefault(999)).to.be.rejectedWith('User not found');
            });
        });
});
