const express = require('express');
const router = express.Router();

const TagController = require('../controllers/tag');

router.get('/', TagController.getAll);
router.get('/:id', TagController.getById);
router.post('/', TagController.create);


module.exports = router;