const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../../src/app');
const MembershipService = require('../../src/services/MembershipService');
const membershipRouter = require('../../src/routes/membershipRoutes');

describe('MembershipController', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(MembershipService, 'createMembership').resolves();
        sandbox.stub(MembershipService, 'updateMembership').resolves();
        sandbox.stub(MembershipService, 'deleteMembership').resolves();
        sandbox.stub(MembershipService, 'findMembershipById').resolves();
        sandbox.stub(MembershipService, 'findAllMemberships').resolves();
        sandbox.stub(MembershipService, 'findMembershipsByUserId').resolves();
        sandbox.stub(MembershipService, 'findActive').resolves();
        sandbox.stub(MembershipService, 'pauseSubscription').resolves();
        sandbox.stub(MembershipService, 'reactivateSubscription').resolves();
        sandbox.stub(MembershipService, 'cancelSubscription').resolves();
        sandbox.stub(MembershipService, 'findByType').resolves();
        sandbox.stub(MembershipService, 'findByStatus').resolves();
        sandbox.stub(MembershipService, 'findExpiringSoon').resolves();
        sandbox.stub(MembershipService, 'changeMembershipType').resolves();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a membership', async () => {
        const membershipData = { userId: 1, membershipType: 'Basic', membershipPrice: 99.99 };
        MembershipService.createMembership.resolves(membershipData);
        const res = await chai.request(membershipRouter).post('/membership').send(membershipData);
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(membershipData);
    });

    it('should update a membership', async () => {
        const updateData = { membershipPrice: 199.99 };
        MembershipService.updateMembership.resolves({ message: 'Membership successfully updated' });
        const res = await chai.request(membershipRouter).put('/membership/1').send(updateData);
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Membership successfully updated');
    });

    it('should delete a membership', async () => {
        MembershipService.deleteMembership.resolves({ message: 'Membership successfully deleted' });
        const res = await chai.request(app).delete('/membership/1');
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Membership successfully deleted');
    });

    it('should find a membership by ID', async () => {
        const membershipData = { id: 1, userId: 1, membershipType: 'Basic', membershipPrice: 99.99 };
        MembershipService.findMembershipById.resolves(membershipData);
        const res = await chai.request(app).get('/membership/1');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(membershipData);
    });

    it('should return all memberships', async () => {
        const memberships = [
            { id: 1, userId: 1, membershipType: 'Basic', membershipPrice: 99.99 },
            { id: 2, userId: 2, membershipType: 'Premium', membershipPrice: 199.99 }
        ];
        MembershipService.findAllMemberships.resolves(memberships);
        const res = await chai.request(app).get('/memberships');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(memberships);
    });

    it('should find memberships by user ID', async () => {
        const memberships = [{ id: 1, userId: 1, membershipType: 'Basic', membershipPrice: 99.99 }];
        MembershipService.findMembershipsByUserId.resolves(memberships);
        const res = await chai.request(app).get('/memberships/user/1');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(memberships);
    });

    it('should find active memberships', async () => {
        const activeMemberships = [{ id: 1, userId: 1, membershipType: 'Basic', status: 'active' }];
        MembershipService.findActive.resolves(activeMemberships);
        const res = await chai.request(app).get('/memberships/active');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(activeMemberships);
    });

    it('should pause a membership', async () => {
        const pausedMembership = { id: 1, status: 'paused' };
        MembershipService.pauseSubscription.resolves(pausedMembership);
        const res = await chai.request(app).put('/membership/pause/1');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(pausedMembership);
    });

    it('should reactivate a membership', async () => {
        const reactivatedMembership = { id: 1, status: 'active' };
        MembershipService.reactivateSubscription.resolves(reactivatedMembership);
        const res = await chai.request(app).put('/membership/reactivate/1');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(reactivatedMembership);
    });

    it('should cancel a membership', async () => {
        const cancelledMembership = { id: 1, status: 'cancelled' };
        MembershipService.cancelSubscription.resolves(cancelledMembership);
        const res = await chai.request(app).put('/membership/cancel/1');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(cancelledMembership);
    });

    it('should find memberships by type', async () => {
        const membershipsByType = [{ id: 1, userId: 1, membershipType: 'Basic', status: 'active' }];
        MembershipService.findByType.resolves(membershipsByType);
        const res = await chai.request(app).get('/memberships/type/Basic');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(membershipsByType);
    });

    it('should find memberships by status', async () => {
        const membershipsByStatus = [{ id: 1, userId: 1, membershipType: 'Basic', status: 'cancelled' }];
        MembershipService.findByStatus.resolves(membershipsByStatus);
        const res = await chai.request(app).get('/memberships/status/cancelled');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(membershipsByStatus);
    });
});
