const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const ActivityService = require('../../src/services/ActivityService');
const Activity = require('../../src/models/Activity');

describe('ActivityService', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Activity, 'createActivity');
        sandbox.stub(Activity, 'updateActivity');
        sandbox.stub(Activity, 'deleteActivity');
        sandbox.stub(Activity, 'findActivityById');
        sandbox.stub(Activity, 'findAllActivities');
        sandbox.stub(Activity, 'findActivitiesByTypeAndDate');
        sandbox.stub(Activity, 'findActivitiesByType');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create an activity', async function() {
        const activityDetails = { name: "Yoga Class", type: "Fitness", duration: 60 };
        Activity.createActivity.resolves(activityDetails);
        const result = await ActivityService.createActivity(activityDetails);
        expect(Activity.createActivity.calledOnceWithExactly(activityDetails)).to.be.true;
        expect(result).to.deep.equal(activityDetails);
    });

    it('should update an activity', async function() {
        const activityId = 1;
        const updateDetails = { name: "Advanced Yoga" };
        Activity.updateActivity.resolves(updateDetails);
        const result = await ActivityService.updateActivity(activityId, updateDetails);
        expect(Activity.updateActivity.calledOnceWithExactly(activityId, updateDetails)).to.be.true;
        expect(result).to.deep.equal(updateDetails);
    });

    it('should delete an activity', async function() {
        const activityId = 1;
        Activity.deleteActivity.resolves({ message: 'Activity successfully deleted' });
        const result = await ActivityService.deleteActivity(activityId);
        expect(Activity.deleteActivity.calledOnceWithExactly(activityId)).to.be.true;
        expect(result).to.deep.equal({ message: 'Activity successfully deleted' });
    });

    it('should find an activity by ID', async function() {
        const activityId = 1;
        const activityDetails = { id: activityId, name: "Yoga Class", type: "Fitness" };
        Activity.findActivityById.resolves(activityDetails);
        const result = await ActivityService.findActivityById(activityId);
        expect(Activity.findActivityById.calledOnceWithExactly(activityId)).to.be.true;
        expect(result).to.deep.equal(activityDetails);
    });

    it('should find all activities', async function() {
        const activities = [{ name: "Yoga" }, { name: "Pilates" }];
        Activity.findAllActivities.resolves(activities);
        const result = await ActivityService.findAllActivities();
        expect(Activity.findAllActivities.calledOnce).to.be.true;
        expect(result).to.deep.equal(activities);
    });

    it('should find activities by type and date', async function() {
        const type = "Fitness";
        const date = "2022-08-01";
        const activities = [{ name: "Yoga Class", type: "Fitness" }];
        Activity.findActivitiesByTypeAndDate.resolves(activities);
        const result = await ActivityService.findActivitiesByTypeAndDate(type, date);
        expect(Activity.findActivitiesByTypeAndDate.calledOnceWithExactly(type, date)).to.be.true;
        expect(result).to.deep.equal(activities);
    });

    it('should find activities by type', async function() {
        const type = "Fitness";
        const activities = [{ name: "Yoga Class", type: "Fitness" }];
        Activity.findActivitiesByType.resolves(activities);
        const result = await ActivityService.findActivitiesByType(type);
        expect(Activity.findActivitiesByType.calledOnceWithExactly(type)).to.be.true;
        expect(result).to.deep.equal(activities);
    });
});
