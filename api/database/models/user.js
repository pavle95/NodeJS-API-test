const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            field: 'username',
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            field: 'password',
            type: Sequelize.STRING
        },
        email: {
            field: 'email',
            type: Sequelize.STRING,
            unique: true
        },
        role_id: {
            field: 'role_id',
            type: Sequelize.STRING
        }

    }, {
        timestamps: false,
        freezeTableName: true
    });
    User.associate = function(models) {
        User.belongsTo(models.Role, {
            foreignKey: 'role_id',
            as: 'user'
        });
        User.hasOne(models.Company, {
            foreignKey: 'user_id',
            as: 'company'
        });
        User.hasOne(models.Applicant, {
            foreignKey: 'user_id',
            as: 'applicant'
        });
    };
    return User;
}