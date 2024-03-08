const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    async verifyPassword(password) {
        return bcrypt.compare(password, this.passwordHash);
    }

    static async createUser({ username, password, email, roleId }) {
        try {
            const hashedPassword = await this.hashPassword(password);
            const user = await this.create({
                username,
                passwordHash: hashedPassword,
                email,
                roleId
            });
            return user;
        } catch (error) {
            console.error('Chyba při vytváření uživatele:', error);
            throw error;
        }
    }

    static async findUserByUsername(username) {
        return this.findOne({ where: { username } });
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
    // Předpokládáme, že metoda verifyPassword již existuje jako instanční metoda
    static async loginUser(username, password) {
        try {
            const user = await this.findOne({ where: { username } });
            if (!user) {
                throw new Error(`Uživatelské jméno nebo heslo je nesprávné.`);
            }
            const isMatch = await user.verifyPassword(password);
            if (!isMatch) {
                throw new Error(`Uživatelské jméno nebo heslo je nesprávné.`);
            }
            console.log(`Uživatel "${username}" byl úspěšně ověřen.`);
            // Vrátí uživatele nebo token podle potřeby aplikace
            return user;
        } catch (error) {
            console.error('Chyba při ověřování uživatele:', error);
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

    // TODO - Další metody?
}

User.init({
    // Definice atributů modelu
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
            model: 'Roles', // Název modelu Role
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true // Sequelize automaticky přidá atributy createdAt a updatedAt
});

module.exports = User;
