const { expect } = require('chai');
const {
    describeModel,
    itBehavesLikeAModel,
} = require('sequelize-test-helpers');
const sinon = require('sinon');

const sequelize = require('../../src/sequelize');
const Activity = require('../../src/models/Activity');

describe('Activity', () => {
    const Activity = sequelize.import('../path/to/models/Activity');

    describeModel(Activity, () => {
        itBehavesLikeAModel(Activity);

        describe('hoursToMinutes', () => {
            it('converts hours to minutes correctly', () => {
                expect(Activity.hoursToMinutes(2)).to.equal(90);
            });
        });

        describe('creating activities', () => {
            const fakeDetails = { name: 'Yoga Class', type: 'Exercise', durationHours: 1 };
            let createStub;

            beforeEach(() => {
                createStub = sinon.stub(Activity, 'create');
            });

            afterEach(() => {
                createStub.restore();
            });

            it('creates an activity successfully', async () => {
                createStub.resolves(fakeDetails);
                const activity = await Activity.createActivity(fakeDetails);
                expect(activity).to.equal(fakeDetails);
            });

            it('handles errors during activity creation', async () => {
                createStub.rejects(new Error('Something went wrong'));
                try {
                    await Activity.createActivity(fakeDetails);
                    expect.fail('Should not resolve');
                } catch (error) {
                    expect(error.message).to.equal('Something went wrong');
                }
            });
        });

        describe('updating activities', () => {
            const fakeActivity = { id: 1, name: 'Pilates', update: sinon.spy() };
            const updateDetails = { name: 'Advanced Pilates', durationHours: 2 };

            it('updates an activity successfully', async () => {
                sinon.stub(Activity, 'findByPk').resolves(fakeActivity);
                await Activity.updateActivity(fakeActivity.id, updateDetails);
                expect(fakeActivity.update.calledOnce).to.be.true;
            });
        });

        describe('deleting activities', () => {
            it('deletes an activity successfully', async () => {
                const destroyStub = sinon.stub().resolves(1);
                sinon.stub(Activity, 'findByPk').resolves({ destroy: destroyStub });

                const result = await Activity.deleteActivity(1);
                expect(destroyStub.calledOnce).to.be.true;
                expect(result.message).to.equal('Activity successfully deleted');
            });
        });
    });
});
