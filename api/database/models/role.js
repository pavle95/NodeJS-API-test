const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define('role', {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: Sequelize.STRING,
            unique: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    Role.associate = function (models) {
        Role.hasMany(models.User, {
            foreignKey: 'role_id',
            as: 'role'
        });
    };
    return Role;
}
