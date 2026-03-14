const { Comment } = require("../models/comment.model");
const { Post } = require("../models/post.model");


const createComment = async (request, response) => {
    const { text } = request.body;
    const { postId } = request.params;
    // Step 1: check if text is undefined -> return error
    if (!text) {
        return response
            .status(400)
            .json({ message: "Please provide the text of the comment" });
    }

    try {
        // Step 2: find the post -> if no post, return error, else continue
        const post = await Post.findById(postId);
        if (!post) {
            return response.status(400).json({ message: "This post does not exist" });
        }

        // Step 3: Create a new comment
        const comment = new Comment({
            author: request.user._id,
            text,
            post: postId,
        });

        // Step 4: Save the comment
        const savedComment = await comment.save();
        if (!savedComment) {
            return response.status(500).json({ message: "Internal server error" });
        }

        // Step 5: Update the commentCount in the post and save the post
        post.commentCount = post.commentCount + 1;
        const savedPost = await post.save();
        if (!savedPost) {
            return response.status(500).json({ message: "Internal server error" });
        }

        // Step 6: successful response
        return response.status(200).json(savedComment);
    } catch (err) {
        console.error("createComment error:", err);
        return response.status(500).json({
            message: err.message || "Internal server error",
            // stack: err.stack, // uncomment for deeper debugging in dev
        });
    }
};



const getAllComments = async (request, response) => {
    try {
        const { postId } = request.params;

        const comments = await Comment.find({ post: postId })
            .populate("author", "username name email")
            .sort({ createdAt: -1 });

        return response.status(200).json({
            success: true,
            count: comments.length,
            comments,
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const updateComment = async (request, response) => {
    try {
        const { commentId } = request.params;
        const { text } = request.body;

        // validation
        if (!text) {
            return response.status(400).json({ message: "Please fill the updates text" });
        }

        // find comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return response.status(404).json({ message: "Invalid comment id" });
        }

        // authorization
        if (comment.author.toString() !== request.user.id.toString()) {
            return response.status(403).json({ message: "Unauthorized" });
        }

        // update
        comment.text = text;
        await comment.save();

        return response.status(200).json({
            message: "Comment updated successfully",
            comment
        });
    } catch (error) {
        return response.status(500).json({
            message: "Failed to update comment",
            error: error.message
        });
    }
};

module.exports = { createComment, getAllComments, updateComment };
