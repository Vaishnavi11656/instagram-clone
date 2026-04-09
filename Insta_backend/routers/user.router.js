const express = require("express");
const { verifyAuth } = require("../middlewares.js/verifyAuth");
const { userLogin, userSignup } = require("../controllers/auth.controller");
const {
    getUserProfile,
    updateUserProfile,
    followUser,
    unfollowUser,
    searchUsers,
    getUserFollowers,
    getUserFollowing,
    getUserPosts,
} = require("../controllers/users.controller");
const userRouter = express.Router();

// Auth routes
userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignup);

// User profile routes
userRouter.get("/profile/:userId", verifyAuth, getUserProfile);
userRouter.put("/profile/:userId", verifyAuth, updateUserProfile);

// Follow/Unfollow routes
userRouter.post("/:userId/follow", verifyAuth, followUser);
userRouter.post("/:userId/unfollow", verifyAuth, unfollowUser);

// Search and get routes
userRouter.get("/search", verifyAuth, searchUsers);
userRouter.get("/:userId/followers", verifyAuth, getUserFollowers);
userRouter.get("/:userId/following", verifyAuth, getUserFollowing);
userRouter.get("/:userId/posts", verifyAuth, getUserPosts);

module.exports = { userRouter };