const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const NotificationService = require('../../src/services/NotificationService');
const Notification = require('../../src/models/Notification');

describe('NotificationService', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Notification, 'createNotification');
        sandbox.stub(Notification, 'updateNotification');
        sandbox.stub(Notification, 'deleteNotification');
        sandbox.stub(Notification, 'findNotificationById');
        sandbox.stub(Notification, 'findAllNotifications');
        sandbox.stub(Notification, 'markAsRead');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a notification', async function() {
        const notificationDetails = { userId: 1, title: 'New Message', message: 'You have a new message.' };
        Notification.createNotification.resolves(notificationDetails);
        const result = await NotificationService.createNotification(notificationDetails);
        expect(Notification.createNotification.calledOnceWithExactly(notificationDetails)).to.be.true;
        expect(result).to.deep.equal(notificationDetails);
    });

    it('should update a notification', async function() {
        const notificationId = 1;
        const updateDetails = { title: 'Updated Message' };
        Notification.updateNotification.resolves(updateDetails);
        const result = await NotificationService.updateNotification(notificationId, updateDetails);
        expect(Notification.updateNotification.calledOnceWithExactly(notificationId, updateDetails)).to.be.true;
        expect(result).to.deep.equal(updateDetails);
    });

    it('should delete a notification', async function() {
        const notificationId = 1;
        Notification.deleteNotification.resolves({ message: 'Notification successfully deleted' });
        const result = await NotificationService.deleteNotification(notificationId);
        expect(Notification.deleteNotification.calledOnceWithExactly(notificationId)).to.be.true;
        expect(result).to.deep.equal({ message: 'Notification successfully deleted' });
    });

    it('should find a notification by ID', async function() {
        const notificationId = 1;
        const notificationDetails = { id: notificationId, title: 'New Message' };
        Notification.findNotificationById.resolves(notificationDetails);
        const result = await NotificationService.findNotificationById(notificationId);
        expect(Notification.findNotificationById.calledOnceWithExactly(notificationId)).to.be.true;
        expect(result).to.deep.equal(notificationDetails);
    });

    it('should find all notifications for a user', async function() {
        const userId = 1;
        const notifications = [{ id: 1, title: 'New Message' }];
        Notification.findAllNotifications.resolves(notifications);
        const result = await NotificationService.findAllNotifications(userId);
        expect(Notification.findAllNotifications.calledOnceWithExactly(userId)).to.be.true;
        expect(result).to.deep.equal(notifications);
    });

    it('should mark a notification as read', async function() {
        const notificationId = 1;
        const markedNotification = { id: notificationId, status: 'read' };
        Notification.markAsRead.resolves(markedNotification);
        const result = await NotificationService.markAsRead(notificationId);
        expect(Notification.markAsRead.calledOnceWithExactly(notificationId)).to.be.true;
        expect(result).to.deep.equal(markedNotification);
    });
});
