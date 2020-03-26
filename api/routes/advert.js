const express = require('express');
const router = express.Router();
const {roleAuth, ownerCheck} = require('../middleware/auth');
const {checkCache} = require('../middleware/redis-cache');

const AdvertController = require('../controllers/advert');

router.post('/', roleAuth('company'), AdvertController.create);
router.get('/',AdvertController.getAll);
router.get('/:id', checkCache('advert'), AdvertController.getById);
router.get('/:id/applicant/', roleAuth('company'), ownerCheck(), AdvertController.getApplicants);

module.exports = router;