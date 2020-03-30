const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Applicant = sequelize.define('applicant', {
        id: {
            field: 'id', 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            field: 'user_id',
            type: Sequelize.INTEGER
        },
        first_name: {
            field: 'first_name',
            type: Sequelize.STRING,
            unique: true
        },
        last_name: {
            field: 'last_name',
            type: Sequelize.STRING,
            unique: true
        },
        bio: {
            field: 'bio',
            type: Sequelize.INTEGER
        },
        category: {
            field: 'category',
            type: Sequelize.STRING,
            unique: true
        },
        portfolio: {
            field: 'portfolio',
            type: Sequelize.STRING
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    Applicant.associate = function(models) {
        Applicant.belongsTo(models.User, {
            foreignKey: 'user_id', 
            as: 'user'
        });
        Applicant.belongsToMany(models.Advert, {
            through: models.ApplicantAdvert, 
            foreignKey: 'applicant_id', 
            as: 'adverts'
        });
        Applicant.hasMany(models.Chat, {
            foreignKey: 'applicant_id',
            as: 'chats'
        });
    };
    return Applicant;
}