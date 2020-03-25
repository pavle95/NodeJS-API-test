const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const AdvertTag = sequelize.define('advert_tag', {
        id: {
            field: 'id', 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        advert_id: {
            field: 'advert_id',
            type: Sequelize.INTEGER,
        },
        tag_id: {
            field: 'tag_id',
            type: Sequelize.INTEGER
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    return AdvertTag;
}