

// // express server
// const express = require("express");

// const app = express();
// const PORT = 4000;

// // Middleware
// app.use(express.json());

// app.post("/login", (request, response) => {
//     console.log(request.body);
//     // response.send("<h1>Hello world</h1>");
//     response.sendStatus(200);
// });

// app.post("/signup", (request, response) => {
//     console.log(request.body);
//     // response.send("<h1>Hello world</h1>");
//     response.sendStatus(200);
// });

// app.listen(PORT, () => {
//     console.log("Listening on port ", PORT);
// });

// require('dotenv').config();
// const express = require("express");
// const mongoose = require("mongoose");
// const { userLogin, userSignup } = require("./controllers/auth.controller");

// const app = express();

// const PORT = process.env.PORT;
// const MONGODB_URI = process.env.MONGODB_URI;


// app.use(express.json());

// app.post("/login", userLogin);
// app.post("/signup", userSignup);
// app.get("/posts", (request, response) => {
//     console.log(request.body);
//     response.sendStatus(200)
// })

// app.listen(PORT, () => {
//     console.log("Listening on port ", PORT);
// });

// mongoose
//     .connect(MONGODB_URI)
//     .then(() => console.log("Connected to DB"))
//     .catch(() => console.log("Failed to connect :("));


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// //const { userLogin, userSignup } = require("./controllers/auth.controller");
// //const { getAllPosts, createPost, toggleLike, updatePost, deletePost } = require("./controllers/post.controller");
// const { verifyAuth } = require("./middlewares.js/verifyAuth");
// const { createComment, getAllComments, updateComment } = require("./controllers/comment.controller");
// const { userRouter } = require("./routers/user.router");
// const { postRouter } = require("./routers/post.router");
// const cors = require("cors");


// const app = express();
// const PORT = process.env.PORT;

// const MONGODB_URI = process.env.MONGODB_URI;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // app.post("/login", userLogin);

// // app.post("/signup", userSignup);

// app.use("/", userRouter);

// app.use("/posts", postRouter)

// // app.get('/posts', verifyAuth, getAllPosts);

// // app.post('/posts', verifyAuth, createPost);

// // app.post("/posts/like/:postId", verifyAuth, toggleLike)
// //method:put,route
// // app.put("/posts/:postId", verifyAuth, updatePost);

// // app.delete("/posts/:postId", verifyAuth, deletePost);

// app.post("/comments/:postId", verifyAuth, createComment);

// app.get("/comments/:postId", verifyAuth, getAllComments);

// app.patch("/comments/:commentId", verifyAuth, updateComment);

// app.listen(PORT, () => {
//     //console.log(process.env);
//     console.log("Listening on port ", PORT);
// });

// mongoose
//     .connect(MONGODB_URI)
//     .then(() => console.log("Connected to DB"))
//     .catch(() => console.log("Failed to connect :("))

// //password : Tj621jdOleLmPCID
// //username : 21r01a05r6_db_user


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//const { userLogin, userSignup } = require("./controllers/auth.controller");
//const { getAllPosts, createPost, toggleLike, updatePost, deletePost } = require("./controllers/post.controllers");
const { createComment, updateComment, getAllComments } = require("./controllers/comment.controller");
const { userRouter } = require("./routers/user.router");
const { postRouter } = require("./routers/post.router");
const { messagesRouter } = require("./routers/messages.router");
const { notificationsRouter } = require("./routers/notifications.router");
const cors = require("cors");
const { verifyAuth } = require("./middlewares.js/verifyAuth");


const app = express();
const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());

// CORS configuration - allow requests from frontend
const corsOptions = {
    origin: function (origin, callback) {
        // Allow localhost and 127.0.0.1 on any port for development
        if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors({
    origin: "*"
}));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/messages", messagesRouter);
app.use("/notifications", notificationsRouter);

// app.post("/login", userLogin);

// app.post("/signup", userSignup);

// app.get('/posts',verifyAuth, getAllPosts);

// app.post('/posts',verifyAuth,createPost);
// //method:post,route
// app.post("/posts/like/:postId",verifyAuth,toggleLike);

// //method:put,route:
// app.put("/posts/:postId",verifyAuth,updatePost);

// //method:Delect
// app.delete("/posts/:postId",verifyAuth,deletePost);

// comments routers,getallcomments,update comments
app.post("/comments/:postId", verifyAuth, createComment);
app.get("/comments/:postId", verifyAuth, getAllComments)
app.patch("/comments/:commentId", verifyAuth, updateComment)

// ================= AI CAPTION GENERATOR =================

app.post("/ai/caption", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                message: "Prompt is required",
            });
        }

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3.2:3b",
                prompt: `Generate a short, creative Instagram caption for this:

${prompt}

Rules:
- Give only one caption
- Keep it short
- Make it natural and engaging
- You may use 1-3 emojis
- Do not explain anything`,
                stream: false,
            }),
        });

        if (!response.ok) {
            throw new Error("Ollama request failed");
        }

        const data = await response.json();

        res.json({
            caption: data.response.trim(),
        });

    } catch (error) {
        console.error("AI caption error:", error);

        res.status(500).json({
            message: "Failed to generate caption",
        });
    }
});

// DEBUG: Create sample messages and notifications
app.get("/debug/create-test-data", verifyAuth, async (req, res) => {
    try {
        const { userModel } = require("./models/user.model");
        const { Conversation, Message } = require("./controllers/messages.controller");
        const { Notification } = require("./controllers/notifications.controller");

        const currentUser = req.user._id;

        const testUserNames = ["alex_smith", "john_doe", "emma_wilson"];
        const testUsers = [];

        for (const username of testUserNames) {
            let u = await userModel.findOne({ username });
            if (!u) {
                u = new userModel({
                    name: username.replace("_", " ").toUpperCase(),
                    username: username,
                    passwordHash: "dummy_" + Date.now(),
                    email: `${username}@example.com`,
                    profileImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
                });
                await u.save();
            }
            testUsers.push(u);
        }

        let messagesCount = 0;
        let createdConversations = [];

        for (const testUser of testUsers) {
            // Create test conversation
            let conversation = await Conversation.findOne({
                participants: { $all: [currentUser, testUser._id] }
            });

            if (!conversation) {
                conversation = new Conversation({
                    participants: [currentUser, testUser._id],
                    lastMessage: "Test message",
                    lastMessageTime: new Date()
                });
                await conversation.save();
            }
            createdConversations.push(conversation);

            // Create test messages
            const testMessages = [
                { conversationId: conversation._id, sender: testUser._id, text: "Hey! How are you?" },
                { conversationId: conversation._id, sender: currentUser, text: "I'm doing great! Thanks for asking" },
                { conversationId: conversation._id, sender: testUser._id, text: "Want to hang out later?" }
            ];

            for (const msgData of testMessages) {
                const existing = await Message.findOne({ conversationId: conversation._id, sender: msgData.sender, text: msgData.text });
                if (!existing) {
                    const msg = new Message(msgData);
                    await msg.save();
                    messagesCount++;
                }
            }

            // Create test notifications
            const testNotifications = [
                { recipient: currentUser, sender: testUser._id, type: "like", message: "liked your post" },
                { recipient: currentUser, sender: testUser._id, type: "follow", message: "started following you" }
            ];

            for (const notifData of testNotifications) {
                const existing = await Notification.findOne({ recipient: currentUser, sender: testUser._id, type: notifData.type });
                if (!existing) {
                    const notif = new Notification(notifData);
                    await notif.save();
                }
            }
        }

        res.json({
            message: "✅ Test data created! Check Messages and Notifications pages",
            conversations: createdConversations.length,
            messagesAdded: messagesCount
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating test data", error: err.message });
    }
});

app.listen(PORT, () => {
    //console.log(process.env);
    console.log("Listening on port ", PORT);
});

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Failed to connect :("))