
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../config/generateToken');



const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Required fields must be filled" });
    }

    const userExists = await User.findOne({email});

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).json({ error: "Invalid user data" });
    }
});

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user= await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ error: "Invalid email or password" });
    }
});

const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],

    } : {};

    const users = await User.find(keyword);
    res.send(users);

});




module.exports = {registerUser, authUser, allUsers};
