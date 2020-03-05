const express = require('express');
const router = express.Router();
const {roleAuth} = require('../middleware/auth');
const {checkCache} = require('../middleware/redis-cache');

const ApplicantController = require('../controllers/applicant');

router.put('/', roleAuth('applicant'), ApplicantController.update);
router.get('/', ApplicantController.getAll);
router.get('/:id', checkCache('applicant'), ApplicantController.getById);
router.post('/search/', ApplicantController.search);

module.exports = router;