const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/UserControllers');

 // router.route('/user').post(registerUser);
router.route('/api/users').post(registerUser);



module.exports = router;
