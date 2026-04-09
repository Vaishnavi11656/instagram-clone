const { response, request } = require("express");
const { postModel } = require("../models/post.model");
const { userModel } = require("../models/user.model");

const getAllPosts = async (request, response) => {
    try {
        const posts = await postModel.find().populate("author", "username email name profileImg").sort({ createdAt: -1 });

        return response.status(200).json(posts);
    } catch (err) {
        return response.status(500).json({ message: "Internal Server Error" });
    }
};

const createPost = async (request, response) => {
    const { imageUrl, caption } = request.body;

    if (!imageUrl) {
        return response.status(400).json({ message: "Please provide all the details" });
    }


    try {
        // const user = await userModel.findById(author);

        // if (!user) {
        //     return response.status(400).json({ message: "Invalid author" });
        // }
        const user = request.user;
        const post = new postModel({ author: user._id, imageUrl, caption });
        const savedPost = await post.save();

        if (!savedPost) {
            return response.status(500).json({ message: "Internal Server Error" });
        }

        const populatedPost = await postModel.findById(savedPost._id).populate(
            "author",
            "username name email profileImg",
        );
        return response.status(200).json(populatedPost);
    }


    catch (err) {
        return response.status(500).json({ message: "Internal Server Error" });
    }
};

const toggleLike = async (request, response) => {
    const { postId } = request.params;
    console.log(postId)
    try {
        const post = await postModel.findById(postId);
        console.log(post)

        if (!post) {
            return response.status(404).json({ message: "Post not found" });
        }

        const userId = request.user._id;
        const isLiked = post.likes.includes(userId);
        // Case 1: if already liked
        // then remove the user from likes array -> post.likes[]
        // do : remove user from post.likes
        if (isLiked) {
            post.likes = post.likes.filter(
                (uid) => uid.toString() !== userId.toString()
            );
        }
        // Case 2: if not liked
        // then add the user to likes array -> post.likes[]
        // do add user to post.likes
        else {
            post.likes.push(userId);
        }

        // Finally save the post
        const savedPost = await post.save();
        if (!savedPost) {
            return response.status(500).json({
                message: "Internal server error, error while saving the post",
            });
        }

        const populatedPost = await postModel.findById(savedPost._id).populate(
            "author",
            "username name email profileImg",
        );

        return response.status(200).json(populatedPost);
    } catch (err) {
        return response.status(500).json({ message: "Internal server error" });
    }
};


const updatePost = async (request, response) => {
    const { imageUrl, caption } = request.body;
    const { postId } = request.params;

    if (!imageUrl && !caption) {
        return response
            .status(400)
            .json({ message: "Atleast one field must be present" });
    }

    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return response.status(400).json({ message: "Post not found" });
        }

        if (request.user._id.toString() !== post.author.toString()) {
            return response
                .status(403)
                .json({ message: "Unauthorized to update the post" });
        }

        if (imageUrl) {
            post.imageUrl = imageUrl;
        }
        if (caption) {
            post.caption = caption;
        }

        const savedPost = await post.save();
        if (!savedPost) {
            return response.status(500).json({ message: "Internal server error" });
        }

        return response.status(200).json(savedPost);
    } catch (err) {
        return response.status(500).json({ message: err.message });
    }
};

const deletePost = async (request, response) => {
    const { postId } = request.params;
    try {



        const post = await postModel.findById(postId);
        if (!post) {
            return response.status(400).json({ message: "Post not found" });
        }
        if (request.user._id.toString() === post.author.toString()) {
            await postModel.deleteOne({ _id: postId });

            return response
                .status(200)
                .json({ message: "Post deleted successfully" })
        } else {
            return response
                .status(403)
                .json({ message: "You are not allowed to delete post" });
        }

    } catch (error) {
        return response.status(500).json({ message: "error.message" });
    }
};



module.exports = { getAllPosts, createPost, toggleLike, updatePost, deletePost };