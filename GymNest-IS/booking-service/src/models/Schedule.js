const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Schedule extends Model {
    // Vytvoření nového harmonogramu
    static async createSchedule(details) {
        try {
            const schedule = await this.create(details);
            return schedule;
        } catch (error) {
            throw error;
        }
    }

    // Aktualizace harmonogramu
    static async updateSchedule(scheduleId, updateDetails) {
        try {
            const schedule = await this.findByPk(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            await schedule.update(updateDetails);
            return schedule;
        } catch (error) {
            throw error;
        }
    }

    // Zrušení harmonogramu
    static async deleteSchedule(scheduleId) {
        try {
            const schedule = await this.findByPk(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            await schedule.destroy();
            return { message: 'Schedule successfully deleted' };
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání harmonogramu podle ID
    static async findScheduleById(scheduleId) {
        try {
            const schedule = await this.findByPk(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            return schedule;
        } catch (error) {
            throw error;
        }
    }

    // Získání všech harmonogramů
    static async findAllSchedules() {
        try {
            return await this.findAll();
        } catch (error) {
            throw error;
        }
    }

    // TODO - další metody dle potřeby
}

Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'activities',
            key: 'id'
        }
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Schedule',
    tableName: 'schedules'
});

module.exports = Schedule;
