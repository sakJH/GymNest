const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const MembershipController = require('../../src/controllers/MembershipController');
const MembershipService = require('../../src/services/MembershipService');

describe('MembershipController', function() {
    let req, res, sandbox, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            params: {},
            body: {}
        };
        res = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis(),
            send: sandbox.spy()
        };
        next = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createMembership', function() {
        it('should create a membership and return it', async function() {
            const membershipData = { type: 'Standard', duration: 12 };
            const createdMembership = { id: 1, ...membershipData };

            sandbox.stub(MembershipService, 'createMembership').resolves(createdMembership);
            req.body = membershipData;

            await MembershipController.createMembership(req, res);

            expect(MembershipService.createMembership.calledOnceWithExactly(membershipData)).to.be.true;
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(createdMembership)).to.be.true;
        });

        it('should handle errors when creating a membership', async function() {
            const errorMessage = 'Failed to create membership';
            sandbox.stub(MembershipService, 'createMembership').rejects(new Error(errorMessage));
            req.body = { type: 'Standard', duration: 12 };

            await MembershipController.createMembership(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: errorMessage })).to.be.true;
        });
    });

    describe('updateMembership', function() {
        it('should update a membership and return the result', async function() {
            const membershipData = { status: 'Active' };
            const updatedMembership = { id: 1, status: 'Active' };

            sandbox.stub(MembershipService, 'updateMembership').resolves(updatedMembership);
            req.params.id = 1;
            req.body = membershipData;

            await MembershipController.updateMembership(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(updatedMembership)).to.be.true;
        });

        it('should handle errors when updating a membership', async function() {
            const errorMessage = 'Failed to update membership';
            sandbox.stub(MembershipService, 'updateMembership').rejects(new Error(errorMessage));
            req.params.id = 1;
            req.body = { status: 'Active' };

            await MembershipController.updateMembership(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ message: errorMessage })).to.be.true;
        });
    });

});

