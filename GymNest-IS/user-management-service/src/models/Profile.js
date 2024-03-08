const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Profile extends Model {}

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
            model: 'Users', // 'Users' je název tabulky pro User
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
