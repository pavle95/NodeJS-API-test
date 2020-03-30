const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Chat = sequelize.define('chat', {
        id: {
            field: 'id', 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_id: {
            field: 'company_id',
            type: Sequelize.INTEGER
        },
        applicant_id: {
            field: 'applicant_id',
            type: Sequelize.INTEGER
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    Chat.associate = function(models) {
        Chat.hasMany(models.Message, {
            foreignKey: 'chat_id',
            as: 'messages'
        });
    };
    return Chat;
}