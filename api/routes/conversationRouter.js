const express = require('express');
const conversationCtrl = require('../controllers/conversationCtrl');
const router = express.Router();


router.post('/', conversationCtrl.newConversation )
router.get('/:userId', conversationCtrl.getConversation)
router.get('/find/:firstUserId/:secondUserId', conversationCtrl.getConversationsTwoUser)



module.exports = router;
