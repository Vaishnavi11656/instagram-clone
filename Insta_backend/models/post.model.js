const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    commentCount: { type: Number, default: 0, minlength: 0 },
},
    { timestamps: true },
);


const postModel = mongoose.model("Post", postSchema);

module.exports = { postModel };