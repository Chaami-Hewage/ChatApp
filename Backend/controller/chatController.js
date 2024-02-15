const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const accessChat = asyncHandler(async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var isUser = await User.findById(userId);
    }

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});


const fetchChat = asyncHandler(async (req, res) => {
    try {
        let result = await Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1});

        // Use User.populate directly with await
        result = await User.populate(result, {path: "latestMessage.sender", select: "name email"});

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({message: "Please add users"});
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).json({message: "Add more than two users. "});
    }

    users.push(req.user);

    try {
        const groupChat = new Chat({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user,
        });

        const fullChat = await groupChat.findOne({_id: groupChat._id}).populate(
            "users",
            "-password"
        ).populate("groupAdmin", "-password");

        res.status(200).json(fullChat);
    } catch (message) {
        res.status(400).json({message});
    }
});


const renameGroupChat = asyncHandler(async (req, res) => {
    const {chatId, newName} = req.body;

    // Convert chatId to ObjectId
    const chatObjectId = mongoose.Types.ObjectId(chatId);

    const updatedChat = await Chat.findByIdAndUpdate(
        chatObjectId,
        {chatName: newName},
        {
            new: true,
        }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(400).json({message: "Chat not found"});
    } else {
        res.status(200).json(updatedChat);
    }
});

const addGroupChatMember = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;

    // Convert chatId to ObjectId
    const chatObjectId = mongoose.Types.ObjectId(chatId);

    const updatedChat = await Chat.findByIdAndUpdate(
        chatObjectId,
        {$push: {users: userId}},
        {
            new: true,
        }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(400).json({message: "Chat not found"});
    } else {
        res.status(200).json(updatedChat);
    }
});

const leaveGroupChat = asyncHandler(async (req, res) => {
    const {chatId} = req.body;

    // Convert chatId to ObjectId
    const chatObjectId = mongoose.Types.ObjectId(chatId);

    const updatedChat = await Chat.findByIdAndUpdate(
        chatObjectId,
        {$pull: {users: req.user._id}},
        {
            new: true,
        }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(400).json({message: "Chat not found"});
    } else {
        res.status(200).json(updatedChat);
    }

});

module.exports = {accessChat, fetchChat, createGroupChat, renameGroupChat, addGroupChatMember, leaveGroupChat};
