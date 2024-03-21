const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Profile extends Model {

    static async findByUserId(userId) {
        return await this.findOne({ where: { userId } });
    }

    static async createProfile(profileData) {
        try {
            return await this.create(profileData);
        } catch (error) {
            console.error('Nepodařilo se vytvořit profil:', error);
            throw error;
        }
    }

    static async updateProfile(userId, updateValues) {
        try {
            const profile = await this.findByUserId(userId);
            if (!profile) {
                throw new Error('Profil nebyl nalezen.');
            }
            return await profile.update(updateValues);
        } catch (error) {
            console.error('Nepodařilo se aktualizovat profil:', error);
            throw error;
        }
    }

    static async deleteProfile(userId) {
        try {
            const profile = await this.findByUserId(userId);
            if (!profile) {
                throw new Error('Profil nebyl nalezen.');
            }
            await profile.destroy();
            console.log('Profil byl úspěšně odstraněn.');
        } catch (error) {
            console.error('Nepodařilo se odstranit profil:', error);
            throw error;
        }
    }
}

Profile.init({
    // Definice atributů modelu
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Atribut nesmí být prázdný
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Atribut nesmí být prázdný
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Povolit, aby byl atribut volitelný
        validate: {
            isDate: true, // Atribut musí být platné datum
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Zajišťuje, že každý profil bude spojen s jedním uživatelem
        references: {
            model: 'Users', // 'Users' název tabulky pro User
            key: 'id', // Klíč, na který odkazujeme
        },
    },
}, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
    timestamps: true, // Sequelize automaticky přidá atributy createdAt a updatedAt
});

module.exports = Profile;
