const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Notification = require('../../src/models/Notification');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Notification', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createNotification', function () {
        it('should create a new notification', async function () {
            const details = { userId: 1, title: "New Message", message: "You have a new message", status: "unread" };
            const mockNotification = { ...details, id: 1 };

            sandbox.stub(Notification, 'create').resolves(mockNotification);

            const result = await Notification.createNotification(details);
            expect(Notification.create.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockNotification);
        });

        it('should handle errors during notification creation', async function () {
            const details = { userId: 1, title: "Error Message", message: "Error occurred", status: "unread" };
            const errorMessage = "Error creating notification";

            sandbox.stub(Notification, 'create').rejects(new Error(errorMessage));

            await expect(Notification.createNotification(details)).to.be.rejectedWith(Error, errorMessage);
        });
    });

    describe('updateNotification', function () {
        it('should update a notification', async function () {
            const notificationId = 1;
            const updateDetails = { title: "Updated Message", message: "Updated message content" };
            const existingNotification = { id: notificationId, ...updateDetails, status: "unread" };

            sandbox.stub(Notification, 'findByPk').resolves({
                ...existingNotification,
                update: sandbox.stub().resolves()
            });

            const result = await Notification.updateNotification(notificationId, updateDetails);
            expect(Notification.findByPk.calledOnce).to.be.true;
            expect(result.update.calledWith(updateDetails)).to.be.true;
        });

        it('should throw error if notification not found on update', async function () {
            const notificationId = 999; // Non-existing ID
            const updateDetails = { title: "Updated Message", message: "Updated message content" };

            sandbox.stub(Notification, 'findByPk').resolves(null);

            await expect(Notification.updateNotification(notificationId, updateDetails)).to.be.rejectedWith(Error, 'Notification not found');
        });
    });

});
