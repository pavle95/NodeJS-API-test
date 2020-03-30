const express = require('express');
const router = express.Router();
const {auth, roleAuth, ownerCheck, chatCheck} = require('../middleware/auth');
//const {checkCache} = require('../middleware/redis-cache');

const ChatController = require('../controllers/chat');

router.post('/:id', auth(), chatCheck(), ChatController.create);
router.get('/:id', auth(), chatCheck(), ChatController.getById);


module.exports = router;