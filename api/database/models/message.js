const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Message = sequelize.define('message', {
        id: {
            field: 'id', 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chat_id: {
            field: 'chat_id',
            type: Sequelize.INTEGER
        },
        user_id: {
            field: 'user_id',
            type: Sequelize.INTEGER
        },
        text: {
            field: 'text',
            type: Sequelize.TEXT
        },
        time: {
            field: 'time',
            type: Sequelize.DATE
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    Message.associate = function(models) {
        Message.belongsTo(models.Chat, {
            foreignKey: 'chat_id', 
            as: 'message'
        });
        Message.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        })
    };
    return Message;
}