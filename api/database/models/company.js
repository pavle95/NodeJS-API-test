const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Company = sequelize.define('company', {
        id: {
            field: 'id', 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            field: 'user_id',
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        name: {
            field: 'name',
            type: Sequelize.STRING,
            unique: true
        },
        no_employees: {
            field: 'no_employees',
            type: Sequelize.INTEGER
        },
        category: {
            field: 'category',
            type: Sequelize.STRING,
            unique: true
        },
        working_time: {
            field: 'working_time',
            type: Sequelize.STRING
        },
        website: {
            field: 'website',
            type: Sequelize.STRING
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    Company.associate = function(models) {
        Company.hasMany(models.Advert, {
            foreignKey: 'company_id', 
            as: 'adverts'
        });
        Company.belongsTo(models.User, {
            foreignKey: 'user_id', 
            as: 'user'
        });
    };
    return Company;
}