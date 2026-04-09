const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const singleToken = (userId) => {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "7D" });
}

const userLogin = async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response
            .status(400)
            .json({ message: "please fill all the details" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return response.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    //if(user.password !== password)
    if (!isMatch) {
        return response.status(400).json({ message: "Invalid credentials" });
    }
    // console.log(request.body);
    // response.send("<h1>Hello world</h1>");
    const token = singleToken(user._id);
    const userObj = user.toObject();
    delete userObj.passwordHash;

    return response.status(200).json({ token, ...userObj });
};

const userSignup = async (request, response) => {
    const { username, email, password, name } = request.body;
    console.log(request.body);
    // response.send("<h1>Hello world</h1>");
    if (!username || !password || !email || !name) {
        return response
            .status(400)
            .json({ message: "please fill all the details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return response.status(400).json({
            message: "User already exists! please try a different email id.",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = userModel({ username, email, passwordHash, name });
    const savedUser = await newUser.save();

    if (!savedUser) {
        return response.status(500).json({ message: "Internal server error" });
    }

    //convert mongoose document to plain js object
    const token = singleToken(savedUser._id)
    const userObj = savedUser.toObject();
    delete userObj.passwordHash;

    return response.status(200).json({ token, ...userObj })
    return response.status(200).json(savedUser);
};


module.exports = { userLogin, userSignup };