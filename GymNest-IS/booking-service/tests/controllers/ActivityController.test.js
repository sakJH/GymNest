const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const ActivityController = require('../../src/controllers/ActivityController');
const ActivityService = require('../../src/services/ActivityService');

describe('ActivityController', function () {
    let app;
    let request;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        app = express();
        app.use(bodyParser.json());
        app.post('/activities', ActivityController.createActivity);
        app.put('/activities', ActivityController.updateActivity);
        app.delete('/activities/:activityId', ActivityController.deleteActivity);
        app.get('/activities/:activityId', ActivityController.findActivityById);
        app.get('/activities', ActivityController.findAllActivities);
        request = supertest(app);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('POST /activities', () => {
        it('should create an activity and return 201', async () => {
            const activityDetails = { name: 'Yoga Class', type: 'Fitness' };
            sandbox.stub(ActivityService, 'createActivity').resolves(activityDetails);

            const res = await request.post('/activities')
                .send(activityDetails)
                .expect(201);

            expect(res.body).to.deep.equal(activityDetails);
            expect(ActivityService.createActivity.calledOnceWithExactly(activityDetails)).to.be.true;
        });

        it('should handle errors and return 500', async () => {
            sandbox.stub(ActivityService, 'createActivity').throws(new Error('Internal server error'));

            const res = await request.post('/activities')
                .send({ name: 'Yoga Class', type: 'Fitness' })
                .expect(500);

            expect(res.body).to.deep.equal({ message: 'Internal server error' });
        });
    });

    describe('GET /activities', () => {
        it('should return all activities', async () => {
            const activities = [{ id: 1, name: 'Yoga Class' }, { id: 2, name: 'Pilates Class' }];
            sandbox.stub(ActivityService, 'findAllActivities').resolves(activities);

            const res = await request.get('/activities')
                .expect(200);

            expect(res.body).to.deep.equal(activities);
            expect(ActivityService.findAllActivities.calledOnce).to.be.true;
        });
    });
});
