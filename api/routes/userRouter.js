const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const { registerRules, validator } = require('../middlewares/Validator');


router.post('/register',registerRules(), validator , userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/', userCtrl.getUser);
router.get("/all", userCtrl.getUsers)



module.exports = router;
