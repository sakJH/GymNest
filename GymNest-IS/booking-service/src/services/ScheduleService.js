const Schedule = require('../models/Schedule');

class ScheduleService {
    // Vytvoření nového harmonogramu
    async createSchedule(details) {
        try {
            return await Schedule.createSchedule(details);
        } catch (error) {
            console.error("Error creating schedule:", error);
            throw error;
        }
    }

    // Aktualizace harmonogramu
    async updateSchedule(scheduleId, updateDetails) {
        try {
            return await Schedule.updateSchedule(scheduleId, updateDetails);
        } catch (error) {
            console.error("Error updating schedule:", error);
            throw error;
        }
    }

    // Zrušení harmonogramu
    async deleteSchedule(scheduleId) {
        try {
            return await Schedule.deleteSchedule(scheduleId);
        } catch (error) {
            console.error("Error deleting schedule:", error);
            throw error;
        }
    }

    // Vyhledání harmonogramu podle ID
    async findScheduleById(scheduleId) {
        try {
            return await Schedule.findScheduleById(scheduleId);
        } catch (error) {
            console.error("Error finding schedule:", error);
            throw error;
        }
    }

    // Získání všech harmonogramů
    async findAllSchedules() {
        try {
            return await Schedule.findAllSchedules();
        } catch (error) {
            console.error("Error finding all schedule:", error);
            throw error;
        }
    }

}

module.exports = new ScheduleService();
