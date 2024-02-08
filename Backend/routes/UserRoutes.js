const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/UserControllers');
const { authUser } = require('../controller/UserControllers');

 // router.route('/user').post(registerUser);
router.post('/register', registerUser);
router.post('/login', authUser);


module.exports = router;
