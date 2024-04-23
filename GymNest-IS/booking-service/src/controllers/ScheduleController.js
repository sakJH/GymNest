const ScheduleService = require('../services/ScheduleService');

class ScheduleController {
    async createSchedule(req, res) {
        try {
            const schedule = await ScheduleService.createSchedule(req.body);
            res.status(201).json(schedule);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSchedule(req, res) {
        try {
            const { scheduleId, updateDetails } = req.body;
            const updatedSchedule = await ScheduleService.updateSchedule(scheduleId, updateDetails);
            if (updatedSchedule) {
                res.json({ message: 'Schedule updated successfully', updatedSchedule });
            } else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteSchedule(req, res) {
        try {
            const { scheduleId } = req.params;
            const message = await ScheduleService.deleteSchedule(scheduleId);
            res.json(message);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findScheduleById(req, res) {
        try {
            const { scheduleId } = req.params;
            const schedule = await ScheduleService.findScheduleById(scheduleId);
            if (schedule) {
                res.json(schedule);
            } else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findAllSchedules(req, res) {
        try {
            const schedules = await ScheduleService.findAllSchedules();
            res.json(schedules);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findAllSchedulesByRange(req, res) {
        try {
            const { start, end } = req.query;
            let schedules;
            if (start && end) {
                schedules = await ScheduleService.findSchedulesByDateRange(start, end);
            } else {
                schedules = await ScheduleService.findAllSchedules();
            }
            res.json(schedules);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new ScheduleController();
