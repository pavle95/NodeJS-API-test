const Sequelize = require('sequelize');
const db = require('../database/database');

const Role = db.define('role', {
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

exports.Role = Role;