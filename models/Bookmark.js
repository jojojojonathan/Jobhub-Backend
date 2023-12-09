const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
    {
        job: {
            id: {type: String, require: true},
            title: {type: String, require: true},
            location: {type: String, require: true},
            company: {type: String, require: true},
            salary: {type: String, require: true},
            period: {type: String, require: true},
            contract: {type: String, require: true},
            imageUrl: {type: String, require: true},
            agentId: {type: String, require: true},
        },
        userId: {type: String, require: true},
    }, {timestamps: true}
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
