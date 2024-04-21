const Membership = require('../models/Membership');

class MembershipService {

    static async createMembership(data) {
        try {
            const membership = await Membership.createMembership(data);
            console.log('Membership created successfully:', membership);
            return membership;
        } catch (error) {
            console.error('Error creating membership:', error);
            throw error;
        }
    }

    static async updateMembership(id, updateData) {
        try {
            const result = await Membership.updateMembership(id, updateData);
            console.log('Membership updated successfully:', result);
            return result;
        } catch (error) {
            console.error('Error updating membership:', error);
            throw error;
        }
    }

    static async deleteMembership(id) {
        try {
            const result = await Membership.deleteMembership(id);
            console.log('Membership deleted successfully:', result);
            return result;
        } catch (error) {
            console.error('Error deleting membership:', error);
            throw error;
        }
    }

    static async findMembershipById(id) {
        try {
            const membership = await Membership.findMembershipById(id);
            console.log('Membership found:', membership);
            return membership;
        } catch (error) {
            console.error('Error finding membership:', error);
            throw error;
        }
    }

    static async findAllMemberships() {
        try {
            const memberships = await Membership.findAllMemberships();
            console.log('Memberships retrieved successfully:', memberships);
            return memberships;
        } catch (error) {
            console.error('Error retrieving memberships:', error);
            throw error;
        }
    }

    static async findMembershipsByUserId(userId) {
        try {
            const memberships = await Membership.findMembershipsByUserId(userId);
            console.log('Memberships for user retrieved successfully:', memberships);
            return memberships;
        } catch (error) {
            console.error('Error retrieving memberships by user ID:', error);
            throw error;
        }
    }

    // Metoda pro získání aktivních členství
    static async findActive() {
        try {
            const activeMemberships = await Membership.findActive();
            console.log('Active memberships retrieved successfully:', activeMemberships);
            return activeMemberships;
        } catch (error) {
            console.error('Error retrieving active memberships:', error);
            throw error;
        }
    }

    // Metody pro vyhledávání členství
    static async findByType(type) {
        try {
            const membershipsByType = await Membership.findByType(type);
            console.log('Memberships by type retrieved successfully:', membershipsByType);
            return membershipsByType;
        } catch (error) {
            console.error('Error retrieving memberships by type:', error);
            throw error;
        }
    }

    static async findByStatus(status) {
        try {
            const membershipsByStatus = await Membership.findByStatus(status);
            console.log('Memberships by status retrieved successfully:', membershipsByStatus);
            return membershipsByStatus;
        } catch (error) {
            console.error('Error retrieving memberships by status:', error);
            throw error;
        }
    }

    static async findExpiringSoon(days = 30) {
        try {
            const expiringSoonMemberships = await Membership.findExpiringSoon(days);
            console.log('Expiring soon memberships retrieved successfully:', expiringSoonMemberships);
            return expiringSoonMemberships;
        } catch (error) {
            console.error('Error retrieving memberships expiring soon:', error);
            throw error;
        }
    }

    static async renewMembership(id, durationMonths = 12) {
        try {
            const renewedMembership = await Membership.renewMembership(id, durationMonths);
            console.log('Membership renewed successfully:', renewedMembership);
            return renewedMembership;
        } catch (error) {
            console.error('Error renewing membership:', error);
            throw error;
        }
    }

    static async changeMembershipType(id, newType) {
        try {
            const updatedMembership = await Membership.changeMembershipType(id, newType);
            console.log('Membership type changed successfully:', updatedMembership);
            return updatedMembership;
        } catch (error) {
            console.error('Error changing membership type:', error);
            throw error;
        }
    }


    // Přidání dalších metod podle potřeby, jako je vyhledání podle typu, statusu apod.
}

module.exports = MembershipService;
