const User = require("../models/User");
const bc = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const secret = config.get("secret");

const userCtrl = {
    register: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            let existantUser = await User.findOne({ email });
            if (existantUser)
                return res.status(404).json({ msg: "user already exist" });
            let newUser = await new User({
            username,
            email,
            password,
            });

        var salt = await bc.genSalt(10);
        var hash = await bc.hash(password, salt);
        newUser.password = hash;

        await newUser.save();

        const payload = {
            id: newUser._id,
        };
        const token = await jwt.sign(payload, secret);
        res.json({
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
            },
        });
        // res.send(newUser);
        } catch (error) {
            res.status(500).json({msg: error.message });
        }
        },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            let existantUser = await User.findOne({ email });
            if (!existantUser)
            return res.status(402).json({ msg: "this user does not exist !!" });

            let isMatch = await bc.compare(password, existantUser.password);
            if (!isMatch) return res.status(402).json({ msg: "wrong credentials !!" });

            const payload = {
            id: existantUser._id,
            };
            const token = await jwt.sign(payload, secret);
            res.json({
            token,
            user: {
                _id: existantUser._id,
                username: existantUser.username,
                email: existantUser.email,
                password: existantUser.password,
                isAdmin: !existantUser.isAdmin,
                followers: existantUser.followers,
                followings: existantUser.followings
            },
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getUsers: async (req, res) =>{
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            res.status(500).json({msg: error.message });
        }
    },

    getUser: async (req, res) => {
        const userId = req.query.userId;
        const username = req.query.username;

        try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.json(other);
        } catch (error) {
        res.status(500).json({ msg: error.message });
        }
    },

}

module.exports = userCtrl;
