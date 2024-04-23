const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Nastavení připojení k databázi

class Booking extends Model {
    // Vytvoření nové rezervace - reaktivace pokud jiz existuje shodna
    static async createBooking(details) {
        try {
            // Hledání existující rezervace s userId, scheduleId a stavem 'cancelled'
            const existingBooking = await this.findOne({
                where: {
                    userId: details.userId,
                    scheduleId: details.scheduleId,
                    status: 'cancelled'
                }
            });

            if (existingBooking) {
                // Nastaví existující rezervaci zpět na 'scheduled', pokud ji najde
                await existingBooking.update({ status: 'scheduled' });
                return existingBooking;
            } else {
                // Vytvoří novou rezervaci, pokud nebyla nalezena žádná odpovídající rezervace ve stavu 'cancelled'
                const booking = await this.create(details);
                return booking;
            }
        } catch (error) {
            throw error;
        }
    }

    // Aktualizace rezervace
    static async updateBooking(bookingId, updateDetails) {
        try {
            const booking = await this.findByPk(bookingId);
            if (!booking) {
                throw new Error('Booking not found');
            }
            await booking.update(updateDetails);
            return booking;
        } catch (error) {
            throw error;
        }
    }

    // Zrušení rezervace
    static async cancelBooking(bookingId) {
        try {
            const booking = await this.findByPk(bookingId);
            if (!booking) {
                throw new Error('Booking not found');
            }
            await booking.update({ status: 'cancelled' });
            return booking;
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání rezervace podle ID
    static async findBookingById(bookingId) {
        try {
            const booking = await this.findByPk(bookingId);
            if (!booking) {
                throw new Error('Booking not found');
            }
            return booking;
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání všech rezervací uživatele
    static async findBookingsByUserId(userId) {
        try {
            const bookings = await this.findAll({
                where: { userId }
            });
            return bookings;
        } catch (error) {
            throw error;
        }
    }

    // TODO - další metody?
}

Booking.init({
    // Definice atributů modelu
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'scheduled', // Možné hodnoty: 'scheduled', 'cancelled', 'completed'
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings' // Název tabulky v databázi
});

module.exports = Booking;
