const express = require('express');
const router = express.Router();
const { accessChat, fetchChats } = require('../controller/chatController');
const {registerUser, allUsers} = require("../controller/userController");
const {protect} = require("../middleware/authMiddleware");
// const {} = require("../controller/chatController");


router.route("/").post(protect, accessChat);
 router.route("/").get(protect, fetchChats);
// router.route('/group').post(protect, createGroupChat);
// router.route('/rename').put(protect, renameGroupChat);
// router.route('/add').put(protect, addGroupChatMember);
// router.route('/leave').delete(protect, leaveGroupChat);

module.exports = router;
