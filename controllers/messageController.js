const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

module.exports = {
    getAllMessages: async (req, res) => {
        try {
            const pageSize = 12;
            const page = req.query.page || 1;

            const skipMessages = (page - 1) * pageSize;

            var message = await Message.find({chat: req.params.id})
                .populate("sender", "username profile email")
                .populate("chat")
                .sort({createdAt: -1})
                .skip(skipMessages)
                .limit(pageSize);

            messages = await User.populate(message, {
                path: "chat.users",
                select: "username profile email"
            })

            return res.json(messages);
        } catch (error){
            res.status(500).json({error: "Couldn't retrieve messages"})
        }
    },

    sendMessage: async (req, res) => {
        const {content, chatId, receiver} = req.body;

        if (!content || !chatId) {
            console.log("invalid data");
            return res.status(400).json("Invalid Data");
        }

        var newMessage = {
            sender: req.user.id,
            content: content,
            receiver: receiver,
            chat: chatId
        };

        try {
            var message = await Message.create(newMessage);

            message = await message.populate("sender", "username profile email")
            message = await message.populate("chat")
            message = await User.populate(message, {
                path: "chat.users",
                select: "username profile email"
            });

            await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message})

            res.json(message)
        } catch (error) {
            res.status(400).json({error: error});
        }
    },
};
