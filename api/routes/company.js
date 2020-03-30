const express = require('express');
const router = express.Router();
const {auth, roleAuth} = require('../middleware/auth');

const CompanyController = require('../controllers/company');

router.put('/', auth(), roleAuth('company'), CompanyController.update);
router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.getById)
router.post('/search/', CompanyController.search);

module.exports = router;