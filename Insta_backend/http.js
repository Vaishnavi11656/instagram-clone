const http = require("http");

const PORT = 4000;

const server = http.createServer((request, response) => {
    const url = request.url;
    console.log(url, "Request recieved!!!");
    const obj = { name: "Vaishnavi" }
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end("Hello world");
    response.end(JSON.stringify(obj))
});

server.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});
