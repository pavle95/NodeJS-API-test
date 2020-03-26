const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const ApplicantAdvert = sequelize.define('applicant_advert', {
        id: {
            field: 'id', 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        applicant_id: {
            field: 'applicant_id',
            type: Sequelize.INTEGER,
        },
        advert_id: {
            field: 'advert_id',
            type: Sequelize.INTEGER
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    return ApplicantAdvert;
}