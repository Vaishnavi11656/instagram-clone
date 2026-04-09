const express = require("express");
const {
    getAllPosts,
    createPost,
    toggleLike,
    updatePost,
    deletePost,
} = require("../controllers/post.controller");
const { verifyAuth } = require("../middlewares.js/verifyAuth");
const parser = require("../utilities/upload");

const postRouter = express.Router();

// method: get, route: /posts , middleware: NONE (public), controller: getAllPosts
postRouter.get("/", getAllPosts);

// Wrapper to handle async middleware errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Upload route - MUST come before generic :postId routes
postRouter.post("/upload", verifyAuth, asyncHandler((req, res, next) => {
    // Use multer to handle file upload
    parser.single("file")(req, res, (err) => {
        if (err) {
            console.error("File upload error:", err.message);
            return res.status(400).json({ message: err.message || "File upload failed" });
        }

        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            const url = req.file.path;
            return res.status(200).json({ imageurl: url });
        } catch (err) {
            console.error("Upload processing error:", err.message);
            return res.status(500).json({ message: err.message || "File processing failed" });
        }
    });
}));

// method: post, route: /posts , middleware: verifyAuth, controller: createPost
postRouter.post("/", verifyAuth, createPost);
// method: post, route: /posts/like/:postId, middleware: verifyAuth, controller: toggleLike
postRouter.post("/like/:postId", verifyAuth, toggleLike);
// method: patch, route: /posts/:postId, middleware: verifyAuth, controller: updatePost
postRouter.patch("/:postId", verifyAuth, updatePost);
postRouter.delete("/:postId", verifyAuth, deletePost);

module.exports = { postRouter };
