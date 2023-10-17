const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  io.emit("status", true);

  socket.on("disconnect", () => {
    io.emit("status", false);
  });

  socket.on("chat message", (msg, callback) => {
    if (msg !== "test-ok") {
      console.log("message: " + msg);
      io.emit("chat message", msg);
      callback({
        status: "ok",
      });
    }
  });
});

server.listen(process.env.PORT || 7000, () => {
  console.log(`listening on *:${process.env.PORT || 7000}`);
});
