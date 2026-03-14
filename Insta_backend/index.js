

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
const cors = require("cors");
const { verifyAuth } = require("./middlewares.js/verifyAuth");


const app = express();
const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/posts", postRouter);
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

//comments routers,getallcomments,update comments
app.post("/comments/:postId", verifyAuth, createComment);
app.get("/comments/:postId", verifyAuth, getAllComments)
app.patch("/comments/:commentId", verifyAuth, updateComment)

app.listen(PORT, () => {
    //console.log(process.env);
    console.log("Listening on port ", PORT);
});

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Failed to connect :("))