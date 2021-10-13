const express = require('express');
const messageCtrl = require('../controllers/messageCtrl');
const router = express.Router();


router.post('/', messageCtrl.newMessage)
router.get('/:conversationId', messageCtrl.getMessages)



module.exports = router;
