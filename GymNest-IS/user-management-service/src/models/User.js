const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class User extends Model {

    static async findUserByUsername(username) {
        try {
            return await this.findOne({ where: { username } });
        }
        catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }

    static async deleteUserByUsername(username) {
        try {
            const result = await this.destroy({
                where: { username }
            });
            if (result === 0) {
                // Žádný záznam nebyl odstraněn, uživatel s tímto uživatelským jménem nebyl nalezen
                throw new Error(`Uživatel s uživatelským jménem "${username}" nebyl nalezen.`);
            }
            console.log(`Uživatel s uživatelským jménem "${username}" byl úspěšně odstraněn.`);
            return true;
        } catch (error) {
            console.error('Chyba při odstraňování uživatele:', error);
            throw error; // Předá chybu volajícímu
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
                delete updateValues.password; // Abychom nepředali plaintext heslo zpět
            }
            await user.update(updateValues);
            console.log(`Uživatel "${username}" byl aktualizován.`);
            return user;
        } catch (error) {
            console.error('Chyba při aktualizaci uživatele:', error);
            throw error;
        }
    }

    static async getUserByUsername(username) {
        try {
            const user = await this.findOne({
                where: { username },
                attributes: { exclude: ['passwordHash'] } // Vyjma hesla
            });
            if (!user) {
                throw new Error(`Uživatel s uživatelským jménem "${username}" nebyl nalezen.`);
            }
            return user;
        } catch (error) {
            console.error('Chyba při získávání uživatele:', error);
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
}

User.init({
    // Definice atributů modelu
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
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
