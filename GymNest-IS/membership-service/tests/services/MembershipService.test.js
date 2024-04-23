const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const MembershipService = require('../../src/services/MembershipService');
const Membership = require('../../src/models/Membership');
const MembershipType = require('../../src/models/MembershipType');

describe('MembershipService', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createMembership', function() {
        it('should create a membership successfully', async function() {
            const membershipData = { userId: 1, typeId: 1 };
            const createdMembership = { id: 123, ...membershipData };

            sandbox.stub(Membership, 'createMembership').resolves(createdMembership);

            const result = await MembershipService.createMembership(membershipData);
            expect(result).to.eql(createdMembership);
        });

        it('should throw an error if creation fails', async function() {
            const membershipData = { userId: 1, typeId: 1 };
            const errorMessage = 'Error creating membership';
            sandbox.stub(Membership, 'createMembership').rejects(new Error(errorMessage));

            await expect(MembershipService.createMembership(membershipData)).to.be.rejectedWith(Error, errorMessage);
        });
    });

    describe('updateMembership', function() {
        it('should update a membership successfully', async function() {
            const updateData = { status: 'active' };
            const updatedMembership = { id: 123, status: 'active' };

            sandbox.stub(Membership, 'updateMembership').resolves(updatedMembership);

            const result = await MembershipService.updateMembership(123, updateData);
            expect(result).to.eql(updatedMembership);
        });

        it('should throw an error if update fails', async function() {
            const updateData = { status: 'active' };
            const errorMessage = 'Error updating membership';
            sandbox.stub(Membership, 'updateMembership').rejects(new Error(errorMessage));

            await expect(MembershipService.updateMembership(123, updateData)).to.be.rejectedWith(Error, errorMessage);
        });
    });

    describe('deleteMembership', function() {
        it('should delete a membership successfully', async function() {
            sandbox.stub(Membership, 'deleteMembership').resolves('Deleted');

            const result = await MembershipService.deleteMembership(123);
            expect(result).to.equal('Deleted');
        });

        it('should throw an error if deletion fails', async function() {
            const errorMessage = 'Error deleting membership';
            sandbox.stub(Membership, 'deleteMembership').rejects(new Error(errorMessage));

            await expect(MembershipService.deleteMembership(123)).to.be.rejectedWith(Error, errorMessage);
        });
    });

});

