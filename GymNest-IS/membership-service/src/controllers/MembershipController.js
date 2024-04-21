const MembershipService = require('../services/MembershipService');

class MembershipController {

    async createMembership(req, res) {
        try {
            const membership = await MembershipService.createMembership(req.body);
            res.status(201).json(membership);
        } catch (error) {
            console.error('Error in createMembership:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateMembership(req, res) {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const result = await MembershipService.updateMembership(id, updateData);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error in updateMembership:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteMembership(req, res) {
        const { id } = req.params;
        try {
            const result = await MembershipService.deleteMembership(id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error in deleteMembership:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async findMembershipById(req, res) {
        const { id } = req.params;
        try {
            const membership = await MembershipService.findMembershipById(id);
            res.status(200).json(membership);
        } catch (error) {
            console.error('Error in findMembershipById:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async findAllMemberships(req, res) {
        try {
            const memberships = await MembershipService.findAllMemberships();
            res.status(200).json(memberships);
        } catch (error) {
            console.error('Error in findAllMemberships:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async findMembershipsByUserId(req, res) {
        const { userId } = req.params;
        try {
            const memberships = await MembershipService.findMembershipsByUserId(userId);
            res.status(200).json(memberships);
        } catch (error) {
            console.error('Error in findMembershipsByUserId:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async findActive(req, res) {
        try {
            const activeMemberships = await MembershipService.findActive();
            res.status(200).json(activeMemberships);
        } catch (error) {
            console.error('Error retrieving active memberships:', error);
            res.status(500).json({ message: error.message });
        }
    }

    // Metody pro vyhledávání členství
    async findByType(req, res) {
        const { type } = req.params;
        try {
            const membershipsByType = await MembershipService.findByType(type);
            res.status(200).json(membershipsByType);
        } catch (error) {
            console.error('Error retrieving memberships by type:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async findByStatus(req, res) {
        const { status } = req.params;
        try {
            const membershipsByStatus = await MembershipService.findByStatus(status);
            res.status(200).json(membershipsByStatus);
        } catch (error) {
            console.error('Error retrieving memberships by status:', error);
            res.status(500).json({ message: error.message });
        }
    }

    // Metoda pro nalezení všech členství, které brzy vyprší
    async findExpiringSoon(req, res) {
        const { days } = req.params;
        try {
            const expiringSoonMemberships = await MembershipService.findExpiringSoon(days);
            res.status(200).json(expiringSoonMemberships);
        } catch (error) {
            console.error('Error retrieving memberships expiring soon:', error);
            res.status(500).json({ message: error.message });
        }
    }

    // Metody pro změnu typu členství
    async changeMembershipType(req, res) {
        const { id } = req.params;
        const { newType } = req.body;
        try {
            const updatedMembership = await MembershipService.changeMembershipType(id, newType);
            res.status(200).json(updatedMembership);
        } catch (error) {
            console.error('Error changing membership type:', error);
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new MembershipController();
