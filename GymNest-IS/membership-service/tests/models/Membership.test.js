const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const Membership = require('../../src/models/Membership');

describe('Membership Model', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Membership, 'init').callsFake((attributes, options) => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createMembership', function () {
        it('should successfully create a membership', async function () {
            const mockDetails = {
                userId: 1,
                membershipType: 'Gold',
                membershipPrice: 150.00,
                startDate: '2023-01-01',
                endDate: '2024-01-01',
                status: 'active'
            };
            const expectedResult = { ...mockDetails, id: 1 };

            sandbox.stub(Membership, 'create').resolves(expectedResult);

            const result = await Membership.createMembership(mockDetails);
            expect(result).to.deep.equal(expectedResult);
        });

        it('should throw an error if there is a problem creating the membership', async function () {
            const mockDetails = {
                userId: 1,
                membershipType: 'Gold',
                membershipPrice: 150.00,
                startDate: '2023-01-01',
                endDate: '2024-01-01',
                status: 'active'
            };

            sandbox.stub(Membership, 'create').rejects(new Error('Database error'));

            await expect(Membership.createMembership(mockDetails)).to.be.rejectedWith('Database error');
        });
    });

    describe('updateMembership', function () {
        it('should update a membership and return success message', async function () {
            const updateData = { membershipPrice: 200.00 };
            sandbox.stub(Membership, 'update').resolves([1]); // Simulace úspěšné aktualizace

            const result = await Membership.updateMembership(1, updateData);
            expect(result).to.deep.include({ message: 'Membership successfully updated' });
        });

        it('should throw an error if no membership found to update', async function () {
            const updateData = { membershipPrice: 200.00 };
            sandbox.stub(Membership, 'update').resolves([0]); // Žádné záznamy nebyly aktualizovány

            await expect(Membership.updateMembership(999, updateData)).to.be.rejectedWith('Membership not found or data identical');
        });
    });

    // Doplnění dalších testů pro ostatní metody podle vzoru
});

