const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, require: true, unique: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        location: {type: String, require: true},
        isAdmin: {type: Boolean, default: false},
        isAgent: {type: Boolean, default: false},
        skills: {type: Array, default: false},
        profile: {type: String, require: true, default: "https://i.ibb.co/TkGSh0m/PP.jpg"},
        phone: {type: String, default: ""},
    }, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
