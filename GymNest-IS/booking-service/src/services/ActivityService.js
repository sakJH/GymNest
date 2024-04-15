const Activity = require('../models/Activity');

class ActivityService {
    // Vytvoření nové aktivity
    async createActivity(details) {
        return await Activity.createActivity(details);
    }

    // Aktualizace aktivity
    async updateActivity(activityId, updateDetails) {
        return await Activity.updateActivity(activityId, updateDetails);
    }

    // Zrušení aktivity
    async deleteActivity(activityId) {
        return await Activity.deleteActivity(activityId);
    }

    // Vyhledání aktivity podle ID
    async findActivityById(activityId) {
        return await Activity.findActivityById(activityId);
    }

    // Získání všech aktivit
    async findAllActivities() {
        return await Activity.findAllActivities();
    }

    // Vyhledání aktivit podle typu a data
    async findActivitiesByTypeAndDate(type, date) {
        return await Activity.findActivitiesByTypeAndDate(type, date);
    }

    // Vyhledání aktivit podle typu
    async findActivitiesByType(type) {
    return await Activity.findActivitiesByType(type);
    }
}

module.exports = new ActivityService();
