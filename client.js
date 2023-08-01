const { io } = require("socket.io-client");
const socket = io("https://socketio-whiteboard-zmx4.herokuapp.com/");

// connect with our server

socket.on("connect", () => {
  console.log(socket.id);

  // socket.connected ==> boolean
});

socket.on("disconnect", (data) => {
  // socket.connected ==> boolean

  console.log("Disconnected: ", data);
});

// trigger or emit something from the client side

setInterval(() => {
  socket.emit(
    "chat message",
    `${parseInt(Math.random() * 1000) + 999}`,
    (response) => {
      console.log(response.status);
    }
  );
}, 5000);
