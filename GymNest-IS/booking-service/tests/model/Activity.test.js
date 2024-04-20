const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Activity = require('../../src/models/Activity');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Activity', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('hoursToMinutes', function () {
        it('should convert hours to minutes', function () {
            const result = Activity.hoursToMinutes(2);
            expect(result).to.equal(90);
        });
    });

    describe('createActivity', function () {
        it('should create an activity', async function () {
            const details = { name: 'Yoga Class', durationHours: 2 };
            const expectedActivity = { ...details, duration: 90 };

            sandbox.stub(Activity, 'create').resolves(expectedActivity);
            const result = await Activity.createActivity(details);

            expect(result).to.deep.include(expectedActivity);
        });

        it('should handle errors during activity creation', async function () {
            sandbox.stub(Activity, 'create').rejects(new Error('Database error'));
            await expect(Activity.createActivity({})).to.be.rejectedWith('Database error');
        });
    });

    describe('updateActivity', function () {
        it('should update an activity', async function () {
            const mockActivity = { id: 1, update: sinon.stub().resolves() };
            sandbox.stub(Activity, 'findByPk').resolves(mockActivity);

            const result = await Activity.updateActivity(1, { name: 'Updated Yoga Class' });
            expect(Activity.findByPk.calledWith(1)).to.be.true;
            expect(mockActivity.update.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockActivity);
        });

        it('should throw an error if activity is not found', async function () {
            sandbox.stub(Activity, 'findByPk').resolves(null);
            await expect(Activity.updateActivity(1, {})).to.be.rejectedWith('Activity not found');
        });
    });

    describe('deleteActivity', function () {
        it('should delete an activity', async function () {
            const mockActivity = { id: 1, destroy: sinon.stub().resolves() };
            sandbox.stub(Activity, 'findByPk').resolves(mockActivity);

            const result = await Activity.deleteActivity(1);
            expect(Activity.findByPk.calledWith(1)).to.be.true;
            expect(mockActivity.destroy.calledOnce).to.be.true;
            expect(result).to.deep.equal({ message: 'Activity successfully deleted' });
        });

        it('should throw an error if activity is not found', async function () {
            sandbox.stub(Activity, 'findByPk').resolves(null);
            await expect(Activity.deleteActivity(1)).to.be.rejectedWith('Activity not found');
        });
    });

    describe('findAllActivities', function () {
        it('should retrieve all activities', async function () {
            const mockActivities = [{ id: 1, name: 'Yoga' }, { id: 2, name: 'Pilates' }];
            sandbox.stub(Activity, 'findAll').resolves(mockActivities);

            const result = await Activity.findAllActivities();
            expect(Activity.findAll.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockActivities);
        });

        it('should handle errors when retrieving all activities', async function () {
            sandbox.stub(Activity, 'findAll').rejects(new Error('Database error'));
            await expect(Activity.findAllActivities()).to.be.rejectedWith('Database error');
        });
    });

    // Similar structure for other methods
});
