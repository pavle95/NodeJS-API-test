const express = require('express');
const router = express.Router();
const {roleAuth} = require('../middleware/auth');

const CompanyController = require('../controllers/company');

router.put('/', roleAuth('company'), CompanyController.update);
router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.getById)
router.post('/search/', CompanyController.search);

module.exports = router;