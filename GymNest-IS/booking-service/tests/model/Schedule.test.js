const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Schedule = require('../../src/models/Schedule');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Schedule', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createSchedule', function () {
        it('should create a new schedule', async function () {
            const details = { activityId: 1, startTime: new Date(), endTime: new Date(), capacity: 30 };
            const mockSchedule = { ...details, id: 1 };

            sandbox.stub(Schedule, 'create').resolves(mockSchedule);

            const result = await Schedule.createSchedule(details);
            expect(Schedule.create.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockSchedule);
        });

        it('should handle errors during schedule creation', async function () {
            const details = { activityId: 1, startTime: new Date(), endTime: new Date(), capacity: 30 };
            const errorMessage = "Error creating schedule";

            sandbox.stub(Schedule, 'create').rejects(new Error(errorMessage));

            await expect(Schedule.createSchedule(details)).to.be.rejectedWith(Error, errorMessage);
        });
    });

    describe('updateSchedule', function () {
        it('should update a schedule', async function () {
            const scheduleId = 1;
            const updateDetails = { startTime: new Date(), endTime: new Date(), capacity: 25 };
            const existingSchedule = { id: scheduleId, ...updateDetails };

            sandbox.stub(Schedule, 'findByPk').resolves({
                ...existingSchedule,
                update: sandbox.stub().resolves()
            });

            const result = await Schedule.updateSchedule(scheduleId, updateDetails);
            expect(Schedule.findByPk.calledOnce).to.be.true;
            expect(result.update.calledWith(updateDetails)).to.be.true;
        });

        it('should throw error if schedule not found on update', async function () {
            const scheduleId = 999; // Non-existing ID
            const updateDetails = { startTime: new Date(), endTime: new Date(), capacity: 25 };

            sandbox.stub(Schedule, 'findByPk').resolves(null);

            await expect(Schedule.updateSchedule(scheduleId, updateDetails)).to.be.rejectedWith(Error, 'Schedule not found');
        });
    });

    describe('deleteSchedule', function () {
        it('should delete a schedule', async function () {
            const scheduleId = 1;
            const mockSchedule = {
                destroy: sandbox.stub().resolves()
            };

            sandbox.stub(Schedule, 'findByPk').resolves(mockSchedule);

            const result = await Schedule.deleteSchedule(scheduleId);
            expect(Schedule.findByPk.calledOnce).to.be.true;
            expect(mockSchedule.destroy.calledOnce).to.be.true; // Zajistěte, že je volána metoda destroy na objektu mockSchedule
        });

        it('should throw error if schedule not found on delete', async function () {
            const scheduleId = 999;

            sandbox.stub(Schedule, 'findByPk').resolves(null);

            await expect(Schedule.deleteSchedule(scheduleId)).to.be.rejectedWith(Error, 'Schedule not found');
        });
    });

    it('should throw error if schedule not found on delete', async function () {
            const scheduleId = 999;

            sandbox.stub(Schedule, 'findByPk').resolves(null);

            await expect(Schedule.deleteSchedule(scheduleId)).to.be.rejectedWith(Error, 'Schedule not found');
        });


});
