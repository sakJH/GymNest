const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../../src/app');
const ActivityController = require('../../src/controllers/ActivityController');

describe('Activity Routes', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(ActivityController, 'createActivity').callsFake((req, res) => res.status(201).json(req.body));
        sandbox.stub(ActivityController, 'updateActivity').callsFake((req, res) => res.json({ message: 'Activity updated' }));
        sandbox.stub(ActivityController, 'deleteActivity').callsFake((req, res) => res.json({ message: 'Activity deleted' }));
        sandbox.stub(ActivityController, 'findActivityById').callsFake((req, res) => res.json({ id: req.params.activityId }));
        sandbox.stub(ActivityController, 'findAllActivities').callsFake((req, res) => res.json([]));
        sandbox.stub(ActivityController, 'findActivitiesByTypeAndDate').callsFake((req, res) => res.json([]));
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create an activity', async () => {
        const activityData = { name: 'Yoga Class', type: 'Wellness' };
        const res = await chai.request(app).post('/api/activities/create').send(activityData);
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(activityData);
    });

    it('should update an activity', async () => {
        const res = await chai.request(app).put('/api/activities/update').send({ activityId: '1', updateDetails: { name: 'Updated Yoga Class' } });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Activity updated');
    });

    it('should delete an activity by ID', async () => {
        const res = await chai.request(app).delete('/api/activities/delete/1');
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Activity deleted');
    });

    it('should find an activity by ID', async () => {
        const res = await chai.request(app).get('/api/activities/find/1');
        expect(res).to.have.status(200);
        expect(res.body.id).to.equal('1');
    });

    it('should return all activities', async () => {
        const res = await chai.request(app).get('/api/activities/all');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal([]);
    });

    it('should find activities by type and date', async () => {
        const res = await chai.request(app).get('/api/activities/searchTypeAndDate?type=Yoga&date=2023-04-01');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal([]);
    });
});
