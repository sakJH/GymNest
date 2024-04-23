const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class User extends Model {

    static async findUserByUsername(username) {
        try {
            const user = await this.findOne({ where: { username } });
            if (!user) {
                throw new Error(`Error finding user by username: Uživatel s uživatelským jménem "${username}" nebyl nalezen.`);
            }
            return user;
        }
        catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }

    static async findUserByEmail(email) {
        try {
            const user = await this.findOne({ where: { email } });
            if (!user) {
                throw new Error(`Error finding user by email: Uživatel s emailem "${email}" nebyl nalezen.`);
            }
            return user;
        }
        catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async findUserByGoogleId(googleId) {
        try {
            const user = await this.findOne({ where: { googleId } });
            if (!user) {
                console.log(`User with Google ID "${googleId}" not found.`);
                return null;
            }
            return user;
        } catch (error) {
            console.error('Error finding user by Google ID:', error);
            throw error;  // Vrátí chybu jen pokud dojde k chybě při dotazu
        }
    }

    static async deleteUserByUsername(username) {
        try {
            const user = await this.findOne({ where: { username } });
            if (!user) {
                throw new Error(`Uživatel s uživatelským jménem "${username}" nebyl nalezen.`);
            }

            await user.destroy();

            console.log(`Uživatel s uživatelským jménem "${username}" byl úspěšně odstraněn.`);
            return true;
        } catch (error) {
            console.error('Chyba při odstraňování uživatele:', error);
            throw error;
        }
    }

    static async updateUserByUsername(username, updateValues) {
        try {
            const user = await this.findOne({ where: { username } });
            if (!user) {
                throw new Error(`Uživatel s uživatelským jménem "${username}" nebyl nalezen.`);
            }
            if (updateValues.password) {
                updateValues.passwordHash = await this.hashPassword(updateValues.password);
                delete updateValues.password;
            }
            await user.update(updateValues);
            console.log(`Uživatel "${username}" byl aktualizován.`);
            return user;
        } catch (error) {
            console.error('Chyba při aktualizaci uživatele:', error);
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            return await this.findAll({
                attributes: { exclude: ['passwordHash'] } // Vyjma hesla
            });
        } catch (error) {
            console.error('Chyba při získávání seznamu uživatelů:', error);
            throw error;
        }
    }

    // Metoda pro aktualizaci preferencí uživatele
    static async updatePreferences(userId, preferences) {
        try {
            const user = await this.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            await user.update(preferences);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro resetování preferencí na výchozí hodnoty
    static async resetPreferencesToDefault(userId) {
        try {
            const user = await this.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            await user.update({
                preferredCurrency: 'CZK', // Výchozí měna
                colorScheme: 'light', // Výchozí barevné schéma
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Metoda na získání kreditů uživatele
        static async getCredits(userId) {
            try {
                const user = await this.findByPk(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                return user.credits;
            } catch (error) {
                console.error('Error fetching user credits:', error);
                throw error;
            }
        }

    // Metoda pro přidání kreditů uživateli
    static async addCredits(userId, amountToAdd) {
        try {
            const user = await this.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            let newCredits = user.credits + amountToAdd;
            await user.update({ credits: newCredits });
            console.log(`Kredity byly přidány uživateli s ID ${userId}. Nový zůstatek: ${newCredits}`);
            return user;
        } catch (error) {
            console.error('Error adding credits:', error);
            throw error;
        }
    }

    // Metoda pro odebrání kreditů uživateli
    static async removeCredits(userId, amountToRemove) {
        try {
            const user = await this.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (user.credits < amountToRemove) {
                throw new Error('Not enough credits');
            }
            let newCredits = user.credits - amountToRemove;
            await user.update({ credits: newCredits });
            console.log(`Kredity byly odebrány uživateli s ID ${userId}. Nový zůstatek: ${newCredits}`);
            return user;
        } catch (error) {
            console.error('Error removing credits:', error);
            throw error;
        }
    }

}

User.init({
    // Definice atributů modelu
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    googleId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
        },
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    preferredCurrency: {
        type: DataTypes.STRING,
        defaultValue: 'CZK', // Výchozí měna
    },
    credits: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    colorScheme: {
        type: DataTypes.STRING,
        defaultValue: 'light', // Výchozí barevné schéma
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true // Sequelize automaticky přidá atributy createdAt a updatedAt
});

module.exports = User;
