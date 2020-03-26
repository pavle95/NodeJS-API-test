const Sequelize = require('sequelize');


module.exports = (sequelize) => {
    const Tag = sequelize.define('tag', {
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
    },{
        timestamps: false,
        freezeTableName: true
    });
    Tag.associate = function(models) {
        Tag.belongsToMany(models.Advert, {
            through: models.AdvertTag, 
            foreignKey: 'tag_id', 
            as: 'adverts'
        });
    };
    return Tag;
}