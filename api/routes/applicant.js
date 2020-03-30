const express = require('express');
const router = express.Router();
const {auth, roleAuth} = require('../middleware/auth');
const {checkCache} = require('../middleware/redis-cache');

const ApplicantController = require('../controllers/applicant');

router.put('/', auth(), roleAuth('applicant'), ApplicantController.update);
router.get('/', ApplicantController.getAll);
router.get('/:id', checkCache('applicant'), ApplicantController.getById);
router.post('/search/', ApplicantController.search);
router.post('/advert/:id', auth(), roleAuth('applicant'), ApplicantController.apply);

module.exports = router;