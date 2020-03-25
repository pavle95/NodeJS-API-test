require('dotenv').config();

module.exports = {
    dev: {
        username: 'postgres',
        password: 'pass123',
        database: 'test',
        host: 'localhost',
        dialect: 'postgres'
    },
    test: {
        username: 'postgres',
        password: 'pass123',
        database: 'test',
        host: 'localhost',
        dialect: 'postgres'
    }
}