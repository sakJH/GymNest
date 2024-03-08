const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Role extends Model {}

Role.init({
    // Definice atributů modelu
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isIn: [['člen', 'trenér', 'admin']], // Předdefinovaný seznam rolí
        },
    },
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false, // V tomto případě nemusíme sledovat čas vytvoření a aktualizace
});

module.exports = Role;

// TODO - asi není hotové