const ActivityService = require('../services/ActivityService');

class ActivityController {
    async createActivity(req, res) {
        try {
            const details = req.body;
            const activity = await ActivityService.createActivity(details);
            res.status(201).json(activity);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateActivity(req, res) {
        try {
            const { activityId, updateDetails } = req.body;
            const updatedActivity = await ActivityService.updateActivity(activityId, updateDetails);
            res.json(updatedActivity);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteActivity(req, res) {
        try {
            const { activityId } = req.params;
            const message = await ActivityService.deleteActivity(activityId);
            res.json(message);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findActivityById(req, res) {
        try {
            const { activityId } = req.params;
            const activity = await ActivityService.findActivityById(activityId);
            if (!activity) {
                return res.status(404).json({ message: 'Activity not found' });
            }
            res.json(activity);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findAllActivities(req, res) {
        try {
            const activities = await ActivityService.findAllActivities();
            res.json(activities);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findActivitiesByTypeAndDate(req, res) {
        try {
            const { type, date } = req.query;
            let activities;
            if (date) {
                activities = await ActivityService.findActivitiesByTypeAndDate(type, date);
            } else {
                // Pokud datum není poskytnuto, vyhledejte všechny aktivity daného typu bez ohledu na datum
                activities = await ActivityService.findActivitiesByType(type);
            }
            res.json(activities);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ActivityController();
