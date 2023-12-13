const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    groupAdmin: { type: mongoose.Types.ObjectId, ref: "User" },
    latestMessage: { type: mongoose.Types.ObjectId, ref: "Message"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
