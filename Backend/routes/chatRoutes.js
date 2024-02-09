const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {accessChat } = require('../controller/chatController');




router.route('/api/chats').post(accessChat);

// router.route('/').get(protect, fetchChat);
// router.route('/group').post(protect, createGroupChat);
// router.route('/rename').put(protect, renameGroupChat);
// router.route('/add').put(protect, addGroupChatMember);
// router.route('/leave').delete(protect, leaveGroupChat);


module.exports = router;

