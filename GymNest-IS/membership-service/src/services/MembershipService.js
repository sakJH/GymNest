const Membership = require('../models/Membership');

class MembershipService {
    async createMembership(data) {
        return await Membership.createMembership(data);
    }

    async updateMembership(id, updateData) {
        return await Membership.updateMembership(id, updateData);
    }

    async findMembershipById(id) {
        return await Membership.findMembershipById(id);
    }

    async deleteMembership(id) {
        return await Membership.deleteMembership(id);
    }

    async findAllMemberships() {
        return await Membership.findAllMemberships();
    }

    async findMembershipsByUserId(userId) {
        return await Membership.findMembershipsByUserId(userId);
    }

}

module.exports = new MembershipService();
