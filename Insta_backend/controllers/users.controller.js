const { userModel } = require("../models/user.model");

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, bio, profileImg } = req.body;
        const user = await userModel.findByIdAndUpdate(
            userId,
            { name, bio, profileImg },
            { new: true }
        ).select("-password");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
};

// Follow user
const followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currUserId = req.body.currUserId;

        const user = await userModel.findById(userId);
        if (!user.followers.includes(currUserId)) {
            user.followers.push(currUserId);
            await user.save();
        }

        const currUser = await userModel.findById(currUserId);
        if (!currUser.following.includes(userId)) {
            currUser.following.push(userId);
            await currUser.save();
        }

        res.status(200).json({ message: "Followed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error following user", error: err.message });
    }
};

// Unfollow user
const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currUserId = req.body.currUserId;

        const user = await userModel.findById(userId);
        user.followers = user.followers.filter(id => id.toString() !== currUserId);
        await user.save();

        const currUser = await userModel.findById(currUserId);
        currUser.following = currUser.following.filter(id => id.toString() !== userId);
        await currUser.save();

        res.status(200).json({ message: "Unfollowed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error unfollowing user", error: err.message });
    }
};

// Search users
const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const users = await userModel
            .find({
                $or: [
                    { username: { $regex: query, $options: "i" } },
                    { name: { $regex: query, $options: "i" } },
                ],
            })
            .select("-password")
            .limit(10);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error searching users", error: err.message });
    }
};

// Get user followers
const getUserFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).populate("followers", "-password");
        res.status(200).json(user.followers);
    } catch (err) {
        res.status(500).json({ message: "Error fetching followers", error: err.message });
    }
};

// Get user following
const getUserFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).populate("following", "-password");
        res.status(200).json(user.following);
    } catch (err) {
        res.status(500).json({ message: "Error fetching following", error: err.message });
    }
};

// Get user posts
const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const { postModel } = require("../models/post.model");
        const posts = await postModel.find({ author: userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user posts", error: err.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    followUser,
    unfollowUser,
    searchUsers,
    getUserFollowers,
    getUserFollowing,
    getUserPosts,
};
