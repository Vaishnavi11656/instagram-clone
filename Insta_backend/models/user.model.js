const mongoose = require('mongoose');
//step1:create a Schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String, default: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop" },
    bio: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
//step2:create a model from the schema
const userModel = mongoose.model("User", userSchema);
//step3:export/expose the model
module.exports = { userModel };