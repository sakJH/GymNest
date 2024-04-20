const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../../src/app');
const MembershipService = require('../../src/services/MembershipService');

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
        const res = await chai.request(app).post('/membership').send(membershipData);
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(membershipData);
    });

    it('should update a membership', async () => {
        const updateData = { membershipPrice: 199.99 };
        MembershipService.updateMembership.resolves({ message: 'Membership successfully updated' });
        const res = await chai.request(app).put('/membership/1').send(updateData);
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Membership successfully updated');
    });

    it('should delete a membership', async () => {
        MembershipService.deleteMembership.resolves({ message: 'Membership successfully deleted' });
        const res = await chai.request(app).delete('/membership/1');
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Membership successfully deleted');
    });



});
