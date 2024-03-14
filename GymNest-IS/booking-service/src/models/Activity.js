const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Importuje instance Sequelize pro připojení k DB

class Activity extends Model {
    // Metoda pro přepočet "hodin" na minuty
    static hoursToMinutes(hours) {
        const minutesInHour = 45; // Jedna "hodina" trvá 45 minut
        return hours * minutesInHour;
    }

    static async createActivity(details) {
        // Přepočet "hodin" na minuty pro ukládání do databáze
        if (details.durationHours) {
            details.duration = this.hoursToMinutes(details.durationHours);
            delete details.durationHours; // Odstraníme klíč durationHours, není potřeba ho ukládat
        }

        try {
            const activity = await this.create(details);
            return activity;
        } catch (error) {
            throw error;
        }
    }

    static async updateActivity(activityId, updateDetails) {
        // Stejný přepočet "hodin" na minuty jako u vytváření
        if (updateDetails.durationHours) {
            updateDetails.duration = this.hoursToMinutes(updateDetails.durationHours);
            delete updateDetails.durationHours;
        }

        try {
            const activity = await this.findByPk(activityId);
            if (!activity) {
                throw new Error('Activity not found');
            }
            await activity.update(updateDetails);
            return activity;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro zrušení aktivity
    static async deleteActivity(activityId) {
        try {
            const activity = await this.findByPk(activityId);
            if (!activity) {
                throw new Error('Activity not found');
            }
            await activity.destroy();
            return { message: 'Activity successfully deleted' };
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro vyhledání aktivity podle ID
    static async findActivityById(activityId) {
        try {
            const activity = await this.findByPk(activityId);
            if (!activity) {
                throw new Error('Activity not found');
            }
            return activity;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání všech aktivit
    static async findAllActivities() {
        try {
            return await this.findAll();
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro vyhledání aktivit podle typu a data
    static async findActivitiesByTypeAndDate(type, date) {
        try {
            const activities = await this.findAll({
                where: {
                    type: type,
                    date: date // Předpokládá se, že existuje atribut 'date' v modelu. Pokud ne, je třeba ho přidat nebo upravit tento příklad dle skutečné struktury databáze.
                }
            });
            return activities;
        } catch (error) {
            throw error;
        }
    }

    // TODO: Další metody dle potřeby???
}

Activity.init({
    // Definice atributů modelu
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Duration in minutes'
    },
    // Další atributy dle potřeby
}, {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities' // Název tabulky v databázi
});

module.exports = Activity;
