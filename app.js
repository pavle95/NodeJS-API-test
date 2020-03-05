const express = require('express');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

const users = require('./api/routes/user');
const company = require('./api/routes/company');
const applicant = require('./api/routes/applicant');
const advert = require('./api/routes/advert');
const tag = require('./api/routes/tag');

app.use('/api/users', users);
app.use('/api/company', company);
app.use('/api/applicant', applicant);
app.use('/api/advert', advert);
app.use('/api/tag', tag);

//db.sync({ force: false});


module.exports.app  = app;
