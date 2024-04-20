const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const MembershipService = require('../../src/services/MembershipService');
const Membership = require('../../src/models/Membership'); // Upravte cestu dle vaší struktury projektu

describe('MembershipService', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Membership, 'createMembership').resolves();
        sandbox.stub(Membership, 'updateMembership').resolves();
        sandbox.stub(Membership, 'deleteMembership').resolves();
        sandbox.stub(Membership, 'findMembershipById').resolves();
        sandbox.stub(Membership, 'findAllMemberships').resolves();
        sandbox.stub(Membership, 'findMembershipsByUserId').resolves();
        sandbox.stub(Membership, 'findActive').resolves();
        sandbox.stub(Membership, 'pauseSubscription').resolves();
        sandbox.stub(Membership, 'reactivateSubscription').resolves();
        sandbox.stub(Membership, 'cancelSubscription').resolves();
        sandbox.stub(Membership, 'findByType').resolves();
        sandbox.stub(Membership, 'findByStatus').resolves();
        sandbox.stub(Membership, 'findExpiringSoon').resolves();
        sandbox.stub(Membership, 'renewMembership').resolves();
        sandbox.stub(Membership, 'changeMembershipType').resolves();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a membership', async function () {
        const membershipData = { membershipType: 'Basic', membershipPrice: '100.00' };
        Membership.createMembership.resolves(membershipData);
        const result = await MembershipService.createMembership(membershipData);
        expect(Membership.createMembership.calledOnceWithExactly(membershipData)).to.be.true;
        expect(result).to.deep.equal(membershipData);
    });

    it('should update a membership', async function () {
        const updateData = { membershipPrice: '200.00' };
        const id = 1;
        Membership.updateMembership.resolves({ message: 'Membership successfully updated' });
        const result = await MembershipService.updateMembership(id, updateData);
        expect(Membership.updateMembership.calledOnceWithExactly(id, updateData)).to.be.true;
        expect(result).to.have.property('message', 'Membership successfully updated');
    });

    it('should delete a membership', async function () {
        const id = 1;
        Membership.deleteMembership.resolves({ message: 'Membership successfully deleted' });
        const result = await MembershipService.deleteMembership(id);
        expect(Membership.deleteMembership.calledOnceWithExactly(id)).to.be.true;
        expect(result).to.have.property('message', 'Membership successfully deleted');
    });

    it('should find a membership by ID', async function () {
        const id = 1;
        const membership = { id: id, membershipType: 'Basic', membershipPrice: '100.00' };
        Membership.findMembershipById.resolves(membership);
        const result = await MembershipService.findMembershipById(id);
        expect(Membership.findMembershipById.calledOnceWithExactly(id)).to.be.true;
        expect(result).to.deep.equal(membership);
    });

    it('should retrieve all memberships', async function () {
        const memberships = [{ id: 1, membershipType: 'Basic' }];
        Membership.findAllMemberships.resolves(memberships);
        const result = await MembershipService.findAllMemberships();
        expect(Membership.findAllMemberships.calledOnce).to.be.true;
        expect(result).to.deep.equal(memberships);
    });

});
