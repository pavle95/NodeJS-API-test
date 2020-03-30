const express = require('express');
const router = express.Router();
const {auth, roleAuth, ownerCheck} = require('../middleware/auth');
const {checkCache} = require('../middleware/redis-cache');

const AdvertController = require('../controllers/advert');

router.post('/', auth(), roleAuth('company'), AdvertController.create);
router.get('/',AdvertController.getAll);
router.get('/:id', checkCache('advert'), AdvertController.getById);
router.get('/:id/applicant/', auth(), roleAuth('company'), ownerCheck(), AdvertController.getApplicants);
router.put('/:id/applicant/:applicant_id', auth(), roleAuth('company'), ownerCheck(), AdvertController.approveApplicant);

module.exports = router;