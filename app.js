const express = require('express');
//const db = require('./api/database/database');

const routes = require('./api/routes/index');

const app = express();

app.use(express.json());

app.use('/api/', routes);

module.exports.app = app;
