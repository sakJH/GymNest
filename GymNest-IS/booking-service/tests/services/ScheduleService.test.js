const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const ScheduleService = require('../../src/services/ScheduleService');
const Schedule = require('../../src/models/Schedule');

describe('ScheduleService', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Schedule, 'createSchedule');
        sandbox.stub(Schedule, 'updateSchedule');
        sandbox.stub(Schedule, 'deleteSchedule');
        sandbox.stub(Schedule, 'findScheduleById');
        sandbox.stub(Schedule, 'findAllSchedules');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a schedule', async function() {
        const scheduleDetails = { activityId: 1, startTime: new Date(), endTime: new Date(), capacity: 30 };
        Schedule.createSchedule.resolves(scheduleDetails);
        const result = await ScheduleService.createSchedule(scheduleDetails);
        expect(Schedule.createSchedule.calledOnceWithExactly(scheduleDetails)).to.be.true;
        expect(result).to.deep.equal(scheduleDetails);
    });

    it('should update a schedule', async function() {
        const scheduleId = 1;
        const updateDetails = { capacity: 25 };
        Schedule.updateSchedule.resolves(updateDetails);
        const result = await ScheduleService.updateSchedule(scheduleId, updateDetails);
        expect(Schedule.updateSchedule.calledOnceWithExactly(scheduleId, updateDetails)).to.be.true;
        expect(result).to.deep.equal(updateDetails);
    });

    it('should delete a schedule', async function() {
        const scheduleId = 1;
        Schedule.deleteSchedule.resolves({ message: 'Schedule successfully deleted' });
        const result = await ScheduleService.deleteSchedule(scheduleId);
        expect(Schedule.deleteSchedule.calledOnceWithExactly(scheduleId)).to.be.true;
        expect(result).to.deep.equal({ message: 'Schedule successfully deleted' });
    });

    it('should find a schedule by ID', async function() {
        const scheduleId = 1;
        const scheduleDetails = { id: scheduleId, capacity: 30 };
        Schedule.findScheduleById.resolves(scheduleDetails);
        const result = await ScheduleService.findScheduleById(scheduleId);
        expect(Schedule.findScheduleById.calledOnceWithExactly(scheduleId)).to.be.true;
        expect(result).to.deep.equal(scheduleDetails);
    });

    it('should find all schedules', async function() {
        const schedules = [{ id: 1, capacity: 30 }, { id: 2, capacity: 25 }];
        Schedule.findAllSchedules.resolves(schedules);
        const result = await ScheduleService.findAllSchedules();
        expect(Schedule.findAllSchedules.calledOnce).to.be.true;
        expect(result).to.deep.equal(schedules);
    });
});
