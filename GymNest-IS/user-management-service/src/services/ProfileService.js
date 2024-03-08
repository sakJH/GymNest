const Profile = require('../models/Profile');

class ProfileService {
    static async findByUserId(userId) {
        try {
            return await Profile.findByUserId(userId);
        } catch (error) {
            console.error('Služba - Chyba při hledání profilu:', error);
            throw error;
        }
    }

    static async createProfile(profileData) {
        try {
            return await Profile.createProfile(profileData);
        } catch (error) {
            console.error('Služba - Chyba při vytváření profilu:', error);
            throw error;
        }
    }

    static async updateProfile(userId, updateValues) {
        try {
            return await Profile.updateProfile(userId, updateValues);
        } catch (error) {
            console.error('Služba - Chyba při aktualizaci profilu:', error);
            throw error;
        }
    }

    static async deleteProfile(userId) {
        try {
            return await Profile.deleteProfile(userId);
        } catch (error) {
            console.error('Služba - Chyba při odstraňování profilu:', error);
            throw error;
        }
    }

    // TODO - další metody?
}

module.exports = ProfileService;
