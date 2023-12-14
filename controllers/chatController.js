const Chat = require("../models/Chat");
const User = require("../models/User");

module.exports = {
    accessChat: async (req, res) => {
        const { userId } = req.body;
        
        if (!userId) {
            res.status(400).json("Invalid user id");
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: {$elemMatch: {$eq: req.user.id}}},
                { users: {$elemMatch: {$eq: userId}}},
            ]
        })
            .populate("users", "-password")
            .populate("latestMessage");
        
        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var ChatData = {
                chatName: req.user.id,
                isGroupChat: false,
                users: [
                    req.user.id, userId
                ],
            };

            try {
                const createdChat = await Chat.create(ChatData);
                const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
                res.status(200).json(fullChat);
            } catch (error) {
                res.status(400).json("Failed to retrieve chat")
            }
        }
    },

    getChat: async (req, res) => {
        try {
            Chat.find({users: {$elemMatch: {$eq: req.user.id}}})
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({updateAt: -1})
                .then(async (result) => {
                    result = await User.populate(result, {
                        path: "latestMessage.sender",
                        select: "username profile email"
                    });
                    res.status(200).send(result)
                });
        } catch (error) {
            res.status(500).json({error: "Failed to retrieve chat"})
        }
    }
}