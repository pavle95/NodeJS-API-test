const express = require('express');

const users = require('./user');
const company = require('./company');
const applicant = require('./applicant');
const advert = require('./advert');
const tag = require('./tag');
const chat = require('./chat');

const router = express.Router();

router.use('/users', users);
router.use('/company', company);
router.use('/applicant', applicant);
router.use('/advert', advert);
router.use('/tag', tag);
router.use('/chat', chat);

module.exports = router;