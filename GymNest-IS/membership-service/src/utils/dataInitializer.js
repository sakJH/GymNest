const Membership = require('../models/Membership');
const Payment = require('../models/Payment');

async function createInitialMembership(userId, typeId) {
    const startDate = new Date();
    const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

    try {
        const exists = await Membership.findOne({ where: { userId, membershipTypeId: typeId } });
        if (!exists) {
            const membership = await Membership.create({
                userId,
                membershipTypeId: typeId,
                startDate,
                endDate,
                status: 'active'
            });
            console.log(`Membership created for user ID: ${userId}`);
            return membership;
        } else {
            console.log(`Membership already exists for user ID: ${userId}`);
            return exists;
        }
    } catch (err) {
        console.error(`Failed to create membership for user ID: ${userId}:`, err);
        throw err;
    }
}

async function createInitialPayment(membershipId, amount, status = 'completed') {
    const paymentDate = new Date();
    try {
        const payment = await Payment.create({
            amount,
            paymentDate,
            status,
            membershipId,
            description: 'Initial payment'
        });
        console.log(`Payment created for membership ID: ${membershipId}`);
        return payment;
    } catch (err) {
        console.error(`Failed to create payment for membership ID: ${membershipId}:`, err);
        throw err;
    }
}

async function initializeData() {
    const memberships = [
        { userId: 1, typeId: 2, paymentAmount: 1000 },
        { userId: 2, typeId: 2, paymentAmount: 500 },
        { userId: 3, typeId: 3, paymentAmount: 800 },
        { userId: 4, typeId: 1, paymentAmount: 400 }
    ];

    for (const { userId, typeId, paymentAmount } of memberships) {
        const membership = await createInitialMembership(userId, typeId);
        if (membership) {
            await createInitialPayment(membership.id, paymentAmount);
        }
    }
}

module.exports = {
    initializeData
};
