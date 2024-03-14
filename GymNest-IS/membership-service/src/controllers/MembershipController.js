const MembershipService = require('../services/MembershipService');

class MembershipController {
    async createMembership(req, res) {
        try {
            const membership = await MembershipService.createMembership(req.body);
            res.status(201).json(membership);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateMembership(req, res) {
        try {
            const membership = await MembershipService.updateMembership(req.params.id, req.body);
            res.json(membership);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findMembershipById(req, res) {
        try {
            const membership = await MembershipService.findMembershipById(req.params.id);
            if (membership) {
                res.json(membership);
            } else {
                res.status(404).json({ message: 'Membership not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteMembership(req, res) {
        try {
            const result = await MembershipService.deleteMembership(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findAllMemberships(req, res) {
        try {
            const memberships = await MembershipService.findAllMemberships();
            res.json(memberships);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findMembershipsByUserId(req, res) {
        try {
            const memberships = await MembershipService.findMembershipsByUserId(req.params.userId);
            res.json(memberships);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new MembershipController();
