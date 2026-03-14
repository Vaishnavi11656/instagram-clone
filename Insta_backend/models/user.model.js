const mongoose = require('mongoose');
//step1:create a Schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true },
});
//step2:create a model from the schema
const User = mongoose.model("User", userSchema);
//step3:export/expose the model
module.exports = { User };