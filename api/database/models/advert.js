const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Advert = sequelize.define('advert', {
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
        title: {
            field: 'title',
            type: Sequelize.STRING,
        },
        description: {
            field: 'description',
            type: Sequelize.TEXT,
        },
        from: {
            field: 'from',
            type: Sequelize.DATEONLY,
        },
        to: {
            field: 'to',
            type: Sequelize.DATEONLY
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    Advert.associate = function(models) {
        console.log(models);
        Advert.belongsToMany(models.Tag, {
            through: models.AdvertTag, 
            foreignKey: 'advert_id', 
            as: 'tags'
        });
        Advert.belongsToMany(models.Applicant, {
            through: models.ApplicantAdvert, 
            foreignKey: 'advert_id', 
            as: 'applicants'
        });
    };
    return Advert
}