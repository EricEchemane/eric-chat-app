const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

// adding socket.io
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("user is connected");

  // fires when a user disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // listen on chat message
  socket.on("chat-message", (msg) => {
    io.emit("chat-message", { id: socket.id, message: msg.message });
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
