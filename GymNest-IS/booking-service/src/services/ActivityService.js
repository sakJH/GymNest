const Activity = require('../models/Activity');

class ActivityService {
    // Vytvoření nové aktivity
    async createActivity(details) {
        try {
            return await Activity.createActivity(details);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Aktualizace aktivity
    async updateActivity(activityId, updateDetails) {
        try {
            return await Activity.updateActivity(activityId, updateDetails);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Zrušení aktivity
    async deleteActivity(activityId) {
        try {
            return await Activity.deleteActivity(activityId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Vyhledání aktivity podle ID
    async findActivityById(activityId) {
        try {
            return await Activity.findActivityById(activityId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Získání všech aktivit
    async findAllActivities() {
        try {
            return await Activity.findAllActivities();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Vyhledání aktivit podle typu a data
    async findActivitiesByTypeAndDate(type, date) {
        try {
            return await Activity.findActivitiesByTypeAndDate(type, date);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Vyhledání aktivit podle typu
    async findActivitiesByType(type) {
        try {
            return await Activity.findActivitiesByType(type);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = new ActivityService();
